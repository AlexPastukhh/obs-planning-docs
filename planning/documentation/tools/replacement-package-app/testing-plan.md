# Replacement Package App — Testing Strategy

Status: current cross-Slice testing strategy
Owner responsibility: `UC-PLAN-TEST-STRATEGY`
Related Slices: [`slices.md`](slices.md)

## Strategy

Use three proof responsibilities:

```text
1. Automated component/domain-style proof
2. Automated integration proof with real temporary Git/filesystem/state boundaries
3. Manual practical testing of the real Swing/Windows/Edge/ChatGPT workflow
```

No automated browser/desktop E2E layer is selected. Selenium/Playwright/Swing-driving automation is not required merely to reproduce the manual operated path.

Planned proof, implemented tests and executed/current evidence are distinct states.

## Layer Responsibilities

### Automated component/domain-style proof

Use for deterministic rules/state transitions that can be exercised cheaply without the real external UI:
- ChangeSet lifecycle/state rules;
- path-ownership decisions;
- current-review integrity/state reconstruction;
- bridge binding/task lifecycle/idempotency/terminal-state rules;
- parser/path validation and pure helper rules.

### Automated integration proof

Use real temporary Git repositories/bare remotes/filesystems/state stores where correctness depends on those boundaries:
- Apply mutation/rollback/no-write guarantees;
- Git dirty/index/origin/ownership behavior;
- ReviewDiff generation using temporary index while real index remains unchanged;
- Finalize/commit/push/publication recovery;
- repository snapshot construction/stability;
- loopback bridge/service contract where browser UI itself is not required.

Current `CoreTests`, `ChatBridgeTests` and launcher tests are evidence surfaces. Their names/existence do not by themselves establish semantic coverage; actual coverage is reviewed separately through `UC-PLAN-TEST-COVERAGE`.

### Manual practical testing

Use the actual application/environment for properties that automated Java tests cannot establish convincingly:
- Swing workflow/state presentation;
- Windows launcher/Desktop/clipboard behavior;
- real Git/remote user flow where operational behavior matters;
- Microsoft Edge extension pairing/reload;
- ordinary ChatGPT conversation discovery;
- actual small-paste and native large-paste behavior;
- actual attachment readiness;
- duplicate tabs and composer-content protection as observed in the real UI;
- no-auto-send snapshot guarantee;
- understandable failure/pending/recovery presentation.

[`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md) remains the operated checklist/evidence surface. It is manual practical testing, not an automated E2E suite.

## Shared Harness / Data / Isolation

Automated tests should prefer:
- disposable per-test/per-group repository roots;
- temporary bare remotes for publication behavior;
- isolated `StateStore` roots;
- explicit fixture packages/snapshots/reviews;
- no dependence on the user's real repository, clipboard, browser profile or `%LOCALAPPDATA%` except tests specifically intended to prove those external boundaries;
- cleanup that never requires destructive operations against non-test repositories.

For repository-scoped ownership tests, always include at least:
- two unfinished ChangeSets in the same concrete repo;
- two different concrete repos with the same relative path;
- where useful, two clones sharing one logical `repositoryIdentity`.

## Cross-Slice Proof Map

| Slice | Automated responsibility | Manual practical responsibility |
|---|---|---|
| `SL-RPKG-01` Apply Replacement Work | package/applicability/rollback/ownership/base/Git state | real Swing Apply target/result/failure readability |
| `SL-RPKG-02` Inspect Current Change | cumulative ReviewDiff, persistence, corruption/stale detection, real-index isolation | Refresh/Copy/Open/restart and visible Current state |
| `SL-RPKG-03` Finalize And Publish Work | owned-only commit, lifecycle, publication pending, safe recovery | real Finalize/Retry/remote-ahead UX and truthful state |
| `SL-RPKG-04` Export Repository Snapshot | exact/stable ZIP semantics, index/output safety | export dialog, destination, clipboard/open-folder |
| `SL-RPKG-05` Attach Snapshot | bridge artifact/task rules | real Edge/ChatGPT attachment ready + Send untouched |
| `SL-RPKG-06` Deliver Current Change | binding/queue/claim/dedupe/uncertainty rules | real ChatGPT small/large paste, duplicate tabs, send outcome |

## Critical Negative Guarantees

The strategy must preserve explicit proof for:
- preflight failure does not mutate targets;
- one ChangeSet does not capture unrelated local/parallel work;
- different repositories do not conflict merely because relative paths match;
- stale current change cannot be finalized;
- publication failure does not discard successful local commit/work;
- snapshot export does not mutate repository work/index;
- browser failure does not roll back Apply/Finalize or authorize them;
- snapshot attachment never sends;
- uncertain post-send current-change delivery is not blindly retried.

## Manual Practical Campaign Shape

Manual testing is organized by Slice/result rather than by internal class:

```text
PA-SL01 Apply Replacement Work
PA-SL02 Inspect Current Change
PA-SL03 Finalize And Publish Work
PA-SL04 Export Repository Snapshot
PA-SL05 Attach Repository Snapshot To ChatGPT
PA-SL06 Deliver Current Change To ChatGPT
```

Each material manual card records:
- target property / negative guarantee;
- environment/setup/data;
- user action/path;
- observable evidence;
- pass/fail rule;
- execution state `planned | executed-pass | executed-fail | stale`.

Do not create one manual card for every trivial assertion; use representative operated paths plus important negative guarantees.

## Evidence State / Operational Acceptance

Automated `failed=0` is necessary evidence for implemented automated responsibilities but does not establish live Edge/ChatGPT success.

A Slice requiring real browser/UI proof is operationally accepted only when the relevant manual practical cards have current executed-pass evidence in the intended environment.

## Current Material Gaps / Revisit Triggers

- `SL-RPKG-01`: add explicit regression proof for repository-scoped ownership and the selected tracked-file base-equivalence policy once resolved.
- `SL-RPKG-05/06`: live Edge/ChatGPT acceptance must be rerun after bridge/ChatGPT UI changes; current implementation should not be documented as operationally accepted solely from bridge tests.
- Revisit automated E2E only if repeated manual proof becomes materially expensive/unreliable and a real automation route can prove the same outcomes without excessive brittleness.
