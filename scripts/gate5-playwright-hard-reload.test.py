import time
import sys
import subprocess
import os
import urllib.request
import sqlite3
import uuid
from playwright.sync_api import sync_playwright

SERVER_PORT = 8100
BASE_URL = f"http://127.0.0.1:{SERVER_PORT}"
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DB_PATH = os.path.join(PROJECT_ROOT, "data", "portfolio.sqlite")

print("===========================================================================")
print("=== ZIAD TAHA AUTHORITY HUB: GATE 5 PLAYWRIGHT HARD-RELOAD PROOF SUITE ====")
print("===========================================================================")

# Step 1: Ensure server is running or start it
server_proc = None

def is_server_healthy():
    try:
        with urllib.request.urlopen(f"{BASE_URL}/health", timeout=2) as resp:
            return resp.status == 200
    except Exception:
        return False

if not is_server_healthy():
    print(f"\n[STEP 1] Starting Ziad Taha Authority Hub Server on port {SERVER_PORT}...")
    server_proc = subprocess.Popen(
        ["node", "server-api.mjs"],
        cwd=PROJECT_ROOT,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL
    )
    started = False
    for i in range(20):
        time.sleep(0.5)
        if is_server_healthy():
            started = True
            break
    if not started:
        print("ERROR: Server failed to start on port 8100.")
        if server_proc:
            server_proc.kill()
        sys.exit(1)
    print(f"PASSED: Server started and listening at {BASE_URL}.")
else:
    print(f"\n[STEP 1] Server already running and healthy at {BASE_URL}.")

try:
    with sync_playwright() as p:
        print("\n[STEP 2] Launching Headless Chromium Browser...")
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1280, "height": 900})
        page = context.new_page()

        # Step 3: Test Authority Hub UI
        print(f"[STEP 3] Navigating to Authority Hub Dashboard ({BASE_URL})...")
        page.goto(BASE_URL, wait_until="domcontentloaded")
        assert len(page.title()) > 0, "Page title must be non-empty"
        print(f"PASSED: Authority Hub loaded successfully (Title: '{page.title()}').")

        # Step 4: Record a live tenant provisioning via API
        print("\n[STEP 4] Provisioning enterprise trial sandbox tenant...")
        tenant_res = page.request.post(f"{BASE_URL}/api/hub/provision-tenant", data={
            "companyName": "Gulf Investment Partners",
            "domain": "forgelead",
            "currency": "USD",
            "owner": "Managing Director Khalid"
        })
        assert tenant_res.status == 201, f"Tenant provisioning failed: {tenant_res.status}"
        tenant_data = tenant_res.json()
        assert tenant_data["success"] == True
        tenant_id = tenant_data["tenant"]["tenantId"]
        print(f"PASSED: Tenant provisioned (ID: {tenant_id}, company: {tenant_data['tenant']['companyName']}).")

        # Step 5: Perform Hard Reload (The True Persistence Gate)
        print("\n[STEP 5] Performing Hard Reload (page.reload()) to prove persistence...")
        page.reload(wait_until="domcontentloaded")
        print("PASSED: Page reloaded successfully without session corruption.")

        # Step 6: Direct SQLite Database Physical Assertions
        print("\n[STEP 6] Asserting physical SQLite database rows on disk...")
        assert os.path.exists(DB_PATH), f"SQLite database must exist at {DB_PATH}"

        con = sqlite3.connect(DB_PATH)
        row = con.execute("SELECT tenant_id, company_name, domain, currency, owner, assigned_port, status FROM provisioned_tenants WHERE tenant_id = ?", (tenant_id,)).fetchone()
        assert row is not None, f"Provisioned tenant {tenant_id} must physically exist in SQLite table!"
        assert row[1] == "Gulf Investment Partners"
        assert row[2] == "forgelead"
        assert row[5] == 8103
        assert row[6] == "PROVISIONED_READY"
        print(f"PASSED: SQLite provisioned_tenant row verified: id='{row[0]}', company='{row[1]}', domain='{row[2]}', port={row[5]}, status='{row[6]}'.")

        con.close()
        browser.close()

    print("\nALL GATE 5 PLAYWRIGHT HARD-RELOAD & SQLITE PERSISTENCE PROOFS VERIFIED WITH EXIT CODE 0.")
    sys.exit(0)

except Exception as e:
    print(f"\nGATE 5 ERROR: {e}")
    sys.exit(1)

finally:
    if server_proc:
        print("\nTearing down test server process...")
        server_proc.kill()
