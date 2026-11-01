import { test, describe, before, after } from "node:test";
import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, "../data/portfolio.sqlite");

describe("Ziad Taha Authority Hub Gate 3: Stateful API, Idempotency & Outbox Suite", () => {
  let baseUrl;
  let serverInstance = null;
  const idempotencyKey = `idem_tenant_${Date.now()}`;

  before(async () => {
    try {
      const probe = await fetch("http://127.0.0.1:8100/health");
      if (probe.ok) {
        baseUrl = "http://127.0.0.1:8100";
        return;
      }
    } catch {
      // background server not up; spin up test server
    }

    process.env.NODE_ENV = "test";
    const mod = await import("../server-api.mjs");
    serverInstance = mod.server;
    await new Promise((resolve) => {
      serverInstance.listen(0, "127.0.0.1", () => {
        const port = serverInstance.address().port;
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    if (serverInstance && serverInstance.listening) {
      await new Promise((resolve) => serverInstance.close(resolve));
    }
  });

  let initialResponseJson;
  let createdTenantId;

  test("POST 1: Initial tenant provisioning with Idempotency-Key writes to SQLite and outbox", async () => {
    const payload = {
      companyName: "Acme Enterprise AI",
      domain: "forgelead",
      currency: "USD",
      owner: "CTO John",
    };

    const res = await fetch(`${baseUrl}/api/hub/provision-tenant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(payload),
    });

    assert.equal(res.status, 201, "First provisioning POST must succeed with 201 Created");
    initialResponseJson = await res.json();
    assert.equal(initialResponseJson.success, true);
    assert.ok(initialResponseJson.tenant.tenantId);
    createdTenantId = initialResponseJson.tenant.tenantId;

    // Verify physical SQLite row persistence
    const db = new DatabaseSync(dbPath);
    const tenantRow = db.prepare("SELECT * FROM provisioned_tenants WHERE tenant_id = ?").get(createdTenantId);
    assert.ok(tenantRow, "Tenant must physically exist in SQLite provisioned_tenants table");
    assert.equal(tenantRow.company_name, "Acme Enterprise AI");
    assert.equal(tenantRow.domain, "forgelead");
    assert.equal(tenantRow.assigned_port, 8103);
    assert.equal(tenantRow.status, "PROVISIONED_READY");

    // Verify idempotency cache in SQLite
    const idemRow = db.prepare("SELECT * FROM idempotency_keys WHERE key = ?").get(idempotencyKey);
    assert.ok(idemRow, "Idempotency key must be stored in SQLite idempotency_keys table");

    // Verify audit outbox row
    const outboxRows = db.prepare("SELECT * FROM audit_outbox WHERE event_type = ?").all("TENANT_PROVISIONED");
    assert.ok(outboxRows.length >= 1, "Audit outbox must contain TENANT_PROVISIONED event");
    db.close();
  });

  test("POST 2: Duplicate POST with identical Idempotency-Key returns cached response without duplicate side effects", async () => {
    const db = new DatabaseSync(dbPath);
    const countBefore = db.prepare("SELECT COUNT(*) as cnt FROM provisioned_tenants WHERE tenant_id = ?").get(createdTenantId).cnt;
    db.close();

    const payload = {
      companyName: "Acme Enterprise AI",
      domain: "forgelead",
      currency: "USD",
      owner: "CTO John",
    };

    const res = await fetch(`${baseUrl}/api/hub/provision-tenant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(payload),
    });

    assert.equal(res.status, 200, "Idempotent retry must return 200 OK");
    assert.equal(res.headers.get("x-cache"), "HIT-IDEMPOTENCY", "Response must carry X-Cache: HIT-IDEMPOTENCY");

    const duplicateResponseJson = await res.json();
    assert.deepEqual(duplicateResponseJson, initialResponseJson, "Payload must match initial response exactly");

    // Verify no duplicate rows were inserted
    const db2 = new DatabaseSync(dbPath);
    const countAfter = db2.prepare("SELECT COUNT(*) as cnt FROM provisioned_tenants WHERE tenant_id = ?").get(createdTenantId).cnt;
    db2.close();

    assert.equal(countAfter, countBefore, "Row count must remain exactly 1 after duplicate idempotent request");
  });
});
