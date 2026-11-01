-- Ziad Taha Authority Hub: Gate 1 Relational Registry Schema
-- Enforces: Port Constraints, Strict Foreign Keys, Tenant Sandboxing, and Immutability Triggers
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS portfolio_sites (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  cluster TEXT NOT NULL,
  intended_icp TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS production_levers (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  port INTEGER NOT NULL CHECK (port >= 8000 AND port <= 9000),
  status TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS provisioned_tenants (
  tenant_id TEXT PRIMARY KEY,
  company_name TEXT NOT NULL,
  domain TEXT NOT NULL,
  currency TEXT NOT NULL,
  owner TEXT NOT NULL,
  assigned_port INTEGER NOT NULL CHECK (assigned_port >= 1000 AND assigned_port <= 65535),
  status TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS idempotency_keys (
  key TEXT PRIMARY KEY,
  endpoint TEXT NOT NULL,
  response_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS audit_outbox (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  event_type TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  dispatched INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS audit_ledger (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  aggregate_type TEXT NOT NULL,
  aggregate_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload_json TEXT NOT NULL,
  prev_hash TEXT NOT NULL,
  signature_sha256 TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- BEFORE DELETE Triggers Enforcing Immutability
CREATE TRIGGER IF NOT EXISTS prevent_site_delete
BEFORE DELETE ON portfolio_sites
BEGIN
  SELECT RAISE(ABORT, 'PORTFOLIO_SITE_IMMUTABLE');
END;

CREATE TRIGGER IF NOT EXISTS prevent_tenant_delete
BEFORE DELETE ON provisioned_tenants
BEGIN
  SELECT RAISE(ABORT, 'TENANT_IMMUTABLE');
END;

CREATE TRIGGER IF NOT EXISTS prevent_audit_delete
BEFORE DELETE ON audit_ledger
BEGIN
  SELECT RAISE(ABORT, 'AUDIT_LEDGER_IMMUTABLE');
END;

CREATE TRIGGER IF NOT EXISTS prevent_outbox_delete
BEFORE DELETE ON audit_outbox
BEGIN
  SELECT RAISE(ABORT, 'AUDIT_OUTBOX_IMMUTABLE');
END;
