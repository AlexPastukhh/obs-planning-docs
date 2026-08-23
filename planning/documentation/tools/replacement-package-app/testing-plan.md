# Replacement Package App — Testing Strategy

Status: selected target cross-Slice strategy / current evidence tracked separately
Owner responsibility: `UC-PLAN-TEST-STRATEGY`
Related Slices: [`slices.md`](slices.md)

## Strategy

Use three proof responsibilities:

```text
1. Automated component/domain-style proof
2. Automated integration proof with real temporary Git/filesystem/state boundaries
3. Manual practical testing of real Swing/Windows/Edge/ChatGPT behavior
```

No automated browser/desktop E2E layer is selected. Selenium/Playwright/Swing-driving automation is not required merely to reproduce operated paths. Planned target proof, implemented tests and executed/current evidence remain distinct states.

## Layer Responsibilities

### Automated component/domain-style proof

Use for deterministic semantic/application rules:
- ChangeSet publication lifecycle, explicit Finalized→Active Reopen and repository-scoped ownership;
- Repository Target stable ID vs mutable location data rules;
- global work projection ordering/filtering from persisted lifecycle plus unfinished-work latest outcome;
- latest unfinished ChangeSet outcome replacement/persistence and no Finalized marker after failed Reopen;
- User Operation outcome→notification request mapping;
- External Interaction identity/semantic cancellation/terminal truth;
- parser/path validation and pure helpers.

### Automated integration proof

Use real temporary Git repositories/bare remotes/filesystems/state stores where boundaries matter:
- exact `PACKAGE.json.changeSetId` continuation resolution plus Apply target resolution/preflight/mutation/rollback;
- repository-scoped ownership across multiple repositories/clones;
- expected source-state comparison using real Git path semantics;
- Current ReviewDiff temporary-index isolation;
- Finalize/commit/push/publication recovery and guarded Reopen ownership reacquisition;
- repository location update + later operation revalidation;
- Repository Snapshot construction/stability/readiness;
- loopback bridge/service integration without claiming real browser success;
- persistence/restart of latest unfinished ChangeSet outcome and safety-critical External Interaction state.

For selected source-state design, integration tests must exercise a binary-safe Git canonical comparison equivalent to:

```text
expected bytes → git hash-object --stdin --path=<path> → canonical identity A
actual bytes   → git hash-object --stdin --path=<path> → canonical identity B
A == B → equivalent
```

Raw equality may short-circuit Git comparison. Git command/filter failure is fail-closed (`SOURCE_STATE_UNVERIFIABLE`/equivalent), not fallback to guessed normalization.

### Manual practical testing

Use actual application/environment for:
- Swing context/navigation/state presentation;
- global Existing Work UX;
- explicit repository location change;
- Windows launcher/clipboard/notifications;
- notification-click repository routing;
- dedicated technical diagnostics copy surface;
- Microsoft Edge extension pairing/reload;
- ordinary ChatGPT conversation discovery;
- real current-change small/native-large-paste and snapshot attachment readiness;
- External Interaction list + prepared-content-retained Cancel behavior;
- duplicate tabs/composer protection/no-auto-send/no-blind-retry.

[`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md) is the operated proof surface, not an automated E2E suite.

## Shared Harness / Data / Isolation

Automated tests should prefer:
- disposable per-test/per-group repository roots and isolated `StateStore` roots;
- temporary bare remotes for publication behavior;
- explicit fixture packages/snapshots/reviews/interactions/operation outcomes;
- repositories with configurable `core.autocrlf` and `.gitattributes`;
- no dependence on user's real repository/clipboard/browser profile/%LOCALAPPDATA% except tests specifically intended for those external boundaries;
- cleanup that never performs destructive operations against non-test repositories.

For repository-scope tests include:
- two unfinished ChangeSets in same concrete target;
- two different concrete targets with same relative path;
- two clones sharing one Repository Identity;
- one target location moved/changed explicitly to a matching-origin work tree.

## Target Cross-Slice Proof Map

| Slice | Automated responsibility | Manual practical responsibility |
|---|---|---|
| `SL-RPKG-01` Apply Replacement Work | passive input, target resolver, readiness, ownership, source-state Git equivalence, rollback/result | real Swing target switch/preflight/result/reason readability |
| `SL-RPKG-02` Inspect Current Change | cumulative ReviewDiff, persistence, corruption/stale detection, real-index isolation | Refresh/Copy/Open/restart/current-state presentation |
| `SL-RPKG-03` Finalize And Publish Work | owned-only commit, lifecycle, publication pending, safe recovery, guarded Finalized→Active Reopen, failed-Reopen no-marker rule | real Finalize/Retry/Reopen/remote-ahead UX/truthful state + notification on failed Reopen |
| `SL-RPKG-04` Export Repository Snapshot | exact/stable ZIP, readiness, index/output safety | export dialog, Repository Not Ready, destination/clipboard/open-folder |
| `SL-RPKG-05` Attach Snapshot | exact artifact/task integration | real Edge/ChatGPT attachment ready + Send untouched |
| `SL-RPKG-06` Deliver Current Change | exact delivery integration/dedupe/uncertainty | real small/native-large paste, duplicate tabs, send outcome |
| `SL-RPKG-07` Discover/Open Existing Work | Active/Pending default projection, history filter/order, unfinished latest outcome, exact target/set selection, history-only Reopen entry | real global list, unavailable target, exact repo+set navigation, Show History/Reopen control |
| `SL-RPKG-08` Manage External Interactions | semantic identity/state/cancel/history/persistence boundary | real list/select/cancel; prepared content retained; uncertainty truth |
| `SL-RPKG-09` Notify Operation Outcomes | User Operation result→one notification request; unfinished latest-outcome persistence; failed-Reopen notification without Finalized marker | real Windows success/failure notifications and click repository routing |

## Critical Negative Guarantees

The strategy must preserve explicit proof that:
- passive package input and any failed preflight cause no target mutation;
- one ChangeSet cannot capture sibling same-target ownership; another concrete repository does not conflict merely because relative paths match;
- real manual/out-of-band source change is not accepted merely because Git-controlled EOL/filter representations differ;
- Git-equivalent representation is not false-rejected;
- inability to prove source equivalence fails closed;
- repository without required first commit receives product-level Repository Not Ready rather than unsafe fallback;
- global work/navigation/notification click never becomes mutation authority or silent clone substitution;
- explicit location change preserves Target ID/ChangeSets and checks only selected registration contract, while later operations keep their normal guards;
- stale Current Change cannot be finalized;
- publication failure preserves successful local commit/work;
- selecting Finalized history never reopens automatically; explicit Reopen preserves identity/history, reacquires only safe historical ownership and fails with no partial transition on sibling-owner or unrelated dirty/unowned conflict;
- snapshot export does not mutate repository/index;
- External Interaction Cancel never auto-deletes prepared ChatGPT content and possible-send uncertainty is not rewritten;
- browser failure never rolls back/authorizes repository work;
- snapshot attachment never sends;
- notification delivery never repeats/executes the operation.

## Manual Practical Campaign Shape

```text
PA-SL01 Apply Replacement Work
PA-SL02 Inspect Current Change
PA-SL03 Finalize And Publish Work
PA-SL04 Export Repository Snapshot
PA-SL05 Attach Repository Snapshot To ChatGPT
PA-SL06 Deliver Current Change To ChatGPT
PA-SL07 Discover And Open Existing Work
PA-SL08 Manage External Interactions
PA-SL09 Notify Operation Outcomes
```

Cross-Slice repository-location and technical-diagnostics checks remain shared cards unless future delivery complexity justifies a separate Slice.

Each material manual card records target property/negative guarantee, environment/setup/data, action/path, observable evidence, pass/fail rule and execution state `planned | executed-pass | executed-fail | stale`.

## Evidence State / Operational Acceptance

Current source/tests only prove implemented responsibilities. Documentation of selected SL-07/08/09 and selected deltas in SL-01/04 does not make them implemented.

Automated `failed=0` is necessary for implemented automated responsibilities but does not establish live Edge/ChatGPT/Windows notification success. A Slice requiring real UI/browser/notification proof is operationally accepted only when relevant manual cards have current `executed-pass` evidence in intended environment.

## Selected Engineering/Proof Gates Before Target Acceptance

- source-state canonical Git comparison: `.gitattributes`, `core.autocrlf`, custom clean filters, binary files, dirty/manual content, continuing owned ChangeSet content, filter failure;
- live Edge/ChatGPT acceptance for SL-05/06/08;
- real Windows notification delivery/click for SL-09;
- repository-location change against same folder moved and explicit different matching-origin clone;
- Finalized ChangeSet Reopen with clean/safe historical paths, sibling-owner conflict, unrelated dirty/unowned conflict and restart/history UI entry conditions;
- restart persistence of compact latest ChangeSet operation outcome and safety-critical interaction state.

Revisit automated E2E only if repeated practical proof becomes materially expensive/unreliable and a real automation route can prove the same outcomes without excessive brittleness.
