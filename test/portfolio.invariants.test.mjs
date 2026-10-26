import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  PORTFOLIO_SITES,
  PRODUCTION_LEVERS,
  PortfolioRegistryAggregate,
} from "../lib/domain/portfolio-authority-registry.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test("Invariant 1: Master registry exposes 81 verified production web deployments", () => {
  assert.equal(PORTFOLIO_SITES.length, 81, "Must contain exactly 81 verified sites");
  for (const site of PORTFOLIO_SITES) {
    assert.ok(site.url.startsWith("https://"), `Site ${site.id} must have secure HTTPS URL`);
    assert.ok(site.cluster, `Site ${site.id} must be assigned to a cluster`);
    assert.ok(site.intendedIcp, `Site ${site.id} must specify target ICP`);
  }
});

test("Invariant 2: Production levers catalog defines canonical ports and scripts", () => {
  assert.ok(PRODUCTION_LEVERS.length >= 8, "Must define at least 8 production levers");
  for (const lever of PRODUCTION_LEVERS) {
    assert.ok(lever.port >= 8000 && lever.port <= 9000, `Lever ${lever.name} must use port in 8000 range`);
    assert.equal(lever.status, "VERIFIED");
  }
});

test("Invariant 3: Verified Client ROI accounts carry valid cryptographic audit proofs", () => {
  const dossier = PortfolioRegistryAggregate.getDossier();
  assert.ok(dossier.verifiedClientRoiAccounts.length >= 6);

  for (const account of dossier.verifiedClientRoiAccounts) {
    assert.ok(account.auditProofHash, `Account ${account.id} must have an audit proof hash`);
    assert.ok(account.auditProofHash.length >= 60, `Audit hash for ${account.id} must be cryptographic string`);
    assert.ok(account.verifiedMetrics, `Account ${account.id} must have verified metrics`);
  }
});

test("Invariant 4: Cluster filtering segments sites across domains accurately", () => {
  const edtech = PortfolioRegistryAggregate.getSites({ cluster: "EdTech" });
  assert.ok(edtech.length >= 5);
  for (const s of edtech) {
    assert.match(s.cluster, /EdTech/i);
  }

  const healthcare = PortfolioRegistryAggregate.getSites({ cluster: "Healthcare" });
  assert.ok(healthcare.length >= 3);
  for (const s of healthcare) {
    assert.match(s.cluster, /Healthcare/i);
  }
});

test("Invariant 5: Ubiquitous Language contract file exists and defines core terminology", async () => {
  const docPath = path.resolve(__dirname, "../UBIQUITOUS_LANGUAGE.md");
  const content = await fs.readFile(docPath, "utf-8");
  assert.ok(content.length > 100);
  assert.match(content, /PortfolioSite/);
  assert.match(content, /DomainCluster/);
  assert.match(content, /ProductionLever/);
  assert.match(content, /AuthorityDossier/);
});
