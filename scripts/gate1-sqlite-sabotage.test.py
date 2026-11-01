import sqlite3
import sys
import os
import uuid

db_path = os.path.join(os.path.dirname(__file__), "..", "data", "portfolio.sqlite")
schema_path = os.path.join(os.path.dirname(__file__), "..", "schema.sql")

os.makedirs(os.path.dirname(db_path), exist_ok=True)
con = sqlite3.connect(db_path)
con.execute("PRAGMA foreign_keys = ON;")

if os.path.exists(schema_path):
    with open(schema_path, "r", encoding="utf-8") as f:
        con.executescript(f.read())

passed = 0
failed = 0

print("=== ZIAD TAHA AUTHORITY HUB: GATE 1 RAW SQLITE SABOTAGE TEST ===")

# --- TEST 1: port out of bounds (< 8000) CHECK Constraint Sabotage ---
print("\n[TEST 1] Attempting to insert port = 7000 into production_levers...")
try:
    con.execute("""
        INSERT INTO production_levers (id, name, port, status)
        VALUES (99, 'Illegal Port Lever', 7000, 'VERIFIED')
    """)
    con.commit()
    print("FAILED: port = 7000 was accepted! CHECK constraint failed.")
    failed += 1
except sqlite3.IntegrityError as e:
    print(f"PASSED: SQLite engine rejected insertion as expected: {e}")
    passed += 1

# --- TEST 2: assigned_port < 1000 CHECK Constraint Sabotage ---
print("\n[TEST 2] Attempting to insert assigned_port = 80 into provisioned_tenants...")
try:
    con.execute("""
        INSERT INTO provisioned_tenants (tenant_id, company_name, domain, currency, owner, assigned_port, status)
        VALUES ('tnt-sabotage-port', 'Sabotage Corp', 'forgelead', 'USD', 'Hacker', 80, 'PROVISIONED_READY')
    """)
    con.commit()
    print("FAILED: assigned_port = 80 was accepted! CHECK constraint failed.")
    failed += 1
except sqlite3.IntegrityError as e:
    print(f"PASSED: SQLite engine rejected insertion as expected: {e}")
    passed += 1

# Unique IDs for trigger tests
test_run_id = uuid.uuid4().hex[:8]
site_id = 9999 + int(test_run_id[:4], 16)
tenant_id = f"tnt-sabotage-{test_run_id}"
audit_id = f"audit-sabotage-{test_run_id}"

# --- TEST 3: Append-Only Trigger Sabotage (DELETE Blocked on portfolio_sites) ---
print("\n[TEST 3] Inserting valid portfolio_site, then attempting DELETE...")
con.execute("""
    INSERT INTO portfolio_sites (id, title, url, cluster, intended_icp)
    VALUES (?, 'Test Site', 'https://test.pages.dev', 'Agency', 'Founders')
""", (site_id,))
con.commit()

try:
    con.execute("DELETE FROM portfolio_sites WHERE id = ?", (site_id,))
    con.commit()
    print("FAILED: Portfolio site was deleted! Immutability trigger failed.")
    failed += 1
except sqlite3.DatabaseError as e:
    if "PORTFOLIO_SITE_IMMUTABLE" in str(e):
        print(f"PASSED: SQLite BEFORE DELETE trigger successfully blocked site deletion: {e}")
        passed += 1
    else:
        print(f"FAILED: Unexpected error: {e}")
        failed += 1

# --- TEST 4: Append-Only Trigger Sabotage (DELETE Blocked on provisioned_tenants) ---
print("\n[TEST 4] Inserting valid provisioned_tenant, then attempting DELETE...")
con.execute("""
    INSERT INTO provisioned_tenants (tenant_id, company_name, domain, currency, owner, assigned_port, status)
    VALUES (?, 'Valid Tenant', 'forgelead', 'USD', 'Client', 8103, 'PROVISIONED_READY')
""", (tenant_id,))
con.commit()

try:
    con.execute("DELETE FROM provisioned_tenants WHERE tenant_id = ?", (tenant_id,))
    con.commit()
    print("FAILED: Tenant was deleted! Immutability trigger failed.")
    failed += 1
except sqlite3.DatabaseError as e:
    if "TENANT_IMMUTABLE" in str(e):
        print(f"PASSED: SQLite BEFORE DELETE trigger successfully blocked tenant deletion: {e}")
        passed += 1
    else:
        print(f"FAILED: Unexpected error: {e}")
        failed += 1

# --- TEST 5: Append-Only Trigger Sabotage (DELETE Blocked on audit_ledger) ---
print("\n[TEST 5] Inserting valid audit record, then attempting DELETE...")
con.execute("""
    INSERT INTO audit_ledger (aggregate_type, aggregate_id, event_type, payload_json, prev_hash, signature_sha256)
    VALUES ('AUTHORITY', ?, 'TEST_AUDIT', '{"test": true}', '0000000000000000000000000000000000000000000000000000000000000000', 'mock_hash')
""", (audit_id,))
con.commit()

row = con.execute("SELECT id FROM audit_ledger WHERE aggregate_id = ?", (audit_id,)).fetchone()
inserted_audit_pk = row[0]

try:
    con.execute("DELETE FROM audit_ledger WHERE id = ?", (inserted_audit_pk,))
    con.commit()
    print("FAILED: Audit record was deleted! Immutability trigger failed.")
    failed += 1
except sqlite3.DatabaseError as e:
    if "AUDIT_LEDGER_IMMUTABLE" in str(e):
        print(f"PASSED: SQLite BEFORE DELETE trigger successfully blocked audit deletion: {e}")
        passed += 1
    else:
        print(f"FAILED: Unexpected error: {e}")
        failed += 1

con.close()

print(f"\nGate 1 Verification Summary: {passed} PASSED, {failed} FAILED.")
if failed > 0:
    sys.exit(1)
print("ALL GATE 1 SQLITE SABOTAGE PROOFS VERIFIED WITH EXIT CODE 0.")
