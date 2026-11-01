import test from "node:test";
import assert from "node:assert/strict";
import {
  PORTFOLIO_SITES,
  PRODUCTION_LEVERS,
  PortfolioRegistryAggregate,
} from "../lib/domain/portfolio-authority-registry.mjs";

test("Ziad Taha Authority Hub Gate 2: Pure Domain Invariants Suite", async (t) => {
  await t.test("Invariant 1: Master registry exposes exactly 81 verified production web deployments", () => {
    assert.equal(PORTFOLIO_SITES.length, 81, "Must contain exactly 81 verified sites");
    for (const site of PORTFOLIO_SITES) {
      assert.ok(site.url.startsWith("https://"), `Site ${site.id} must have secure HTTPS URL`);
      assert.ok(site.cluster, `Site ${site.id} must be assigned to a cluster`);
      assert.ok(site.intendedIcp, `Site ${site.id} must specify target ICP`);
    }
  });

  await t.test("Invariant 2: Production levers catalog defines exactly 8 canonical levers with ports in 8000 range", () => {
    assert.equal(PRODUCTION_LEVERS.length, 8, "Must define exactly 8 production levers");
    for (const lever of PRODUCTION_LEVERS) {
      assert.ok(lever.port >= 8000 && lever.port <= 9000, `Lever ${lever.name} must use port in 8000 range`);
      assert.equal(lever.status, "VERIFIED");
    }
  });

  await t.test("Invariant 3: Verified Client ROI accounts carry valid cryptographic audit proofs", () => {
    const dossier = PortfolioRegistryAggregate.getDossier();
    assert.ok(dossier.verifiedClientRoiAccounts.length >= 6);

    for (const account of dossier.verifiedClientRoiAccounts) {
      assert.ok(account.auditProofHash, `Account ${account.id} must have an audit proof hash`);
      assert.ok(account.auditProofHash.length >= 60, `Audit hash for ${account.id} must be cryptographic string`);
      assert.ok(account.verifiedMetrics, `Account ${account.id} must have verified metrics`);
    }
  });

  await t.test("Invariant 4: Cluster filtering accurately segments domains without item loss", () => {
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

  await t.test("Invariant 5: Authority Dossier lists all active domain clusters and canonical metadata", () => {
    const dossier = PortfolioRegistryAggregate.getDossier();
    assert.equal(dossier.developer, "Ziad Taha");
    assert.equal(dossier.totalDeployments, 81);
    assert.equal(dossier.clusters.length, 8);
    assert.equal(dossier.activeLevers.length, 8);
  });
});
