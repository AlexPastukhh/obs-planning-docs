# Replacement Package App — Test Strategy

Status: active shared Test Strategy
Scope: proof-layer allocation, non-duplication rules, shared test environment decisions and critical cross-owner proof boundaries. Canonical behavior remains in Scenario BI; local implementation proof belongs with Domain/Slice/shared implementation owners.

## Proof authority rule

```text
Scenario / Screen / Domain / Slice requirement
→ selected property
→ smallest credible proof boundary
→ automated test and/or Practical Acceptance
→ executed Evidence
```

Tests prove required meaning; they do not create application semantics.

A failed/passing test run is Evidence only for the exact source/build/environment exercised. This file does not claim tests have passed merely because a responsibility is documented.

## Test-first default

Once selected meaning and a credible executable proof boundary are known:
1. express/identify the authoritative BI/invariant/DI/SI/Screen requirement;
2. add or change the smallest failing proof that can credibly observe it;
3. implement the production change;
4. refactor while keeping the selected property proved.

Use experiments/prototypes only for genuinely unresolved feasibility/design/proof questions. Return to the test-first path after the uncertainty is resolved.

## Proof layers

1. **Deterministic/component proof** — parsing, validation, pure projection/state/invariant/helper rules.
2. **Repository/integration proof** — disposable real Git repositories, worktrees, indexes, filesystems, state stores and bare remotes when Git/file/durable-state semantics are the property.
3. **Bridge/DOM proof** — Java bridge task truth and deterministic extension/adapter behavior that does not require claiming a live external browser session.
4. **Practical Acceptance / Evidence** — real Swing/Windows/Edge/ChatGPT/GitHub authentication/network properties not established by deterministic automation.

`run-tests.cmd` remains the standard automated entry for the current implementation; exact test composition is source authority and may evolve.

## Local proof ownership

Focused owners now carry the detailed proof responsibilities:
- Domain owners: semantic invariants/identity/consistency proof where independently useful.
- [`slices/`](slices/) — orchestration, repository boundary, recovery, integration and local Test Items.
- [`shared-implementation/chatgpt-handoff.md`](shared-implementation/chatgpt-handoff.md) — shared bridge/DOM proof quality.
- [`screens.md`](screens.md) — current Screen BIs; automated source/UI contracts may support them, while real usability/layout stays practical.

[`behavior-realization-map.md`](behavior-realization-map.md) is derived navigation from BI to those owners; it is not a second test specification.

## Critical cross-owner guarantees

Automated proof should continue to cover, at the smallest credible integration boundary:
- invalid package/target/source/ownership/workspace preflight causes no repository mutation;
- exact Git-backed execution is pinned to persisted Repository Target / branch / worktree / commit identities rather than mutable UI/current-checkout convenience;
- uncertain external or remote side effects are reconciled before retry can repeat them;
- target-mode package Apply mutates only the isolated ChangeSet workspace, Commit captures only intended package paths, and Publish cannot overwrite an unexpected remote tip;
- legacy owned-path Finalize cannot capture unrelated repository work;
- Current Change/Snapshot derivation does not perturb the real Git index;
- Local Snapshot cannot publish a mixed moving-state artifact;
- browser delivery cannot become repository authorization;
- possible-Send uncertainty cannot be rewritten into false clean cancellation or blindly resent.

## Planned reviewed-result / route proof

Planned proof must establish the Scenario contract without preselecting production owners:
- Apply Only stops at applied/uncommitted and performs no implicit commit/publish/integration;
- Apply And Publish proves actual published result == reviewed predicted result and stops pre-integration;
- Apply And Finalize uses the same prior exactness proof, integrates only approved reviewed content, persists `## Final Work Record`, then closes the managed Issue;
- modular/manual continuation establishes the same results as composed routes;
- cross-discovery production/proof requirements become Items in their selected natural owners and coupled Items are grouped.


The selected planned Scenario requires new proof before promotion to current:
- Builder review identity is accepted only for the exact package/source/predicted-result tuple;
- after consumer publication, actual Git tree identity equals the reviewed predicted result tree;
- mismatch/uncertainty fails closed and preserves useful evidence;
- equality proof avoids a redundant second semantic review;
- exactly one correct/current integration PR represents the ChangeSet;
- target movement that preserves reviewed result does not automatically stale approval;
- content-changing reconciliation invalidates prior approval before Finalize;
- finalized target work is closed to silent package continuation.

These are proof obligations, not claims of current implementation or passing tests.

## Shared environment / non-duplication rules

- Prefer real disposable Git repositories/remotes when Git object/ref/index/worktree semantics are under test; mocking Git commands is not equivalent proof.
- Do not restate every BI as a Test Item. Add a Test Item only for non-obvious proof quality such as no-mutation, durable restart, isolation, public-boundary observation or false-positive prevention.
- Do not reproduce class/method call graphs in documentation; source/test code owns exact mechanics.
- Do not create a Shared Test Capability merely because multiple suites use ordinary test utilities. Add one only when reusable test machinery has its own durable responsibility.

## Practical boundary

Real Swing responsiveness/layout, Windows notifications, installed Edge extension lifecycle, live ChatGPT conversation discovery/attachment/Send behavior, current DOM compatibility and live GitHub CLI auth/network behavior require Practical Acceptance and executed Evidence where they materially matter.

Current operated checklist/evidence remains in [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md) until a later acceptance-owner migration is justified.
