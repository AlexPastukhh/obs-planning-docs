# Replacement Package App — Current Application Plan

Status: current accumulating plan / preliminary reviewed
Profile: Modular / Medium SDS
Direction: `DIR-REPLACEMENT-PACKAGE-APP`

## Planning State

| Step | State | Current owner/result |
|---|---|---|
| Step 0 — Why / Solution Discovery | reviewed enough for existing application | Existing local Replacement Package App responsibility is confirmed; no whole-solution reassessment is performed by this migration. |
| Step 1 — Scenario | partial / current working boundaries | [`scenarios/`](scenarios/) + shared DATA/Behavior/Requirements below |
| Step 2 — Domain | partial / working model | [`domain-draft.md`](domain-draft.md) |
| Step 3 — Slices / Realization | reviewed current decomposition | [`slices.md`](slices.md) |
| Step 4 — Practical Realization Feedback | planned + existing evidence surfaces | [`testing-plan.md`](testing-plan.md), automated tests, [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md) |

Planning does not claim implementation/testing occurred merely because behavior/proof is described.

## Step 0 — Existing Application Responsibility

Replacement Package App is a local Java 21/Swing consumer that:
- applies deterministic replacement packages to explicitly registered local Git repositories;
- keeps one logical ChangeSet/work item coherent across package continuations, review state and publication;
- can export portable Local/Committed repository context;
- optionally hands exact repository/change context to ordinary ChatGPT conversations through a local browser companion.

Producer command semantics remain outside the app. Git/filesystem/state/bridge mechanics are downstream realization, not the reason Scenario boundaries exist.

## Step 1 — Current Scenario Inventory

| Scenario | Need / motivation | Independently meaningful observable result |
|---|---|---|
| [`SCN-RPKG-COMPLETE-REPOSITORY-WORK`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md) | Safely bring prepared work into one local repository and finish that logical work without losing/capturing unrelated work. | Intended repository work is applied, its current state is understandable, and completion/publication reaches a truthful final or recoverable pending state. |
| [`SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT`](scenarios/SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md) | Give further work an exact portable representation of repository state without mutating repository work. | Exact repository context exists as a snapshot artifact and, when selected, is attached to the intended ChatGPT conversation without auto-send. |
| [`SCN-RPKG-PROVIDE-CURRENT-CHANGE`](scenarios/SCN-RPKG-PROVIDE-CURRENT-CHANGE.md) | Give the intended ChatGPT conversation the exact current change for one logical work item without manual large-diff handling. | The intended conversation receives the exact current change once, or the application reports a truthful safe/uncertain delivery outcome without changing repository-work authority. |

Scenario boundaries remain preliminary until full Scenario review confirms that snapshot-only use does not need its own separate user-world Scenario.

## Shared Scenario DATA

These are user/scenario-relevant meanings, not Java DTO or persistence-schema definitions.

| DATA | Meaning |
|---|---|
| `DATA-RPKG-REPOSITORY-TARGET` | Concrete local repository currently intended for work/context. |
| `DATA-RPKG-REPLACEMENT-PACKAGE` | Prepared change input and its human-readable logical-work identity. |
| `DATA-RPKG-CHANGESET` | One logical repository-work item, readable label and current lifecycle/state. |
| `DATA-RPKG-APPLICABILITY` | Whether the package/work can be safely applied now; blocking reason when not. |
| `DATA-RPKG-CURRENT-CHANGE` | Current cumulative change belonging to one logical work item. |
| `DATA-RPKG-OPERATION-RESULT` | Success/failure/pending outcome plus actionable technical diagnostics where needed. |
| `DATA-RPKG-REPOSITORY-SNAPSHOT` | Exact portable repository-context artifact. |
| `DATA-RPKG-CHAT-CONVERSATION` | Intended ordinary ChatGPT destination. |
| `DATA-RPKG-DELIVERY-OUTCOME` | User-relevant delivery result: ready/sent/failed/uncertain/no-content as applicable. |

`ApplicationAttempt`, JSON filenames, Git index, commit graph, task lease and SHA/fingerprint fields are downstream realization unless a Scenario requires their meaning directly.

## Shared Behavior Items

### `BI-RPKG-REVALIDATE-TARGET`
Before any repository mutation/publication/export, the application revalidates the concrete registered repository and expected repository identity rather than trusting navigation selection alone.

### `BI-RPKG-PRESERVE-OTHER-WORK`
One logical work item must not silently adopt, commit, overwrite or release another unfinished work item's paths or unrelated local changes.

### `BI-RPKG-TRUTHFUL-STATE`
After success, partial success or failure, visible/logged state must represent the authoritative resulting work state rather than the action that was attempted.

### `BI-RPKG-CURRENT-CHANGE-INTEGRITY`
Inspection/finalization/handoff operate on the current change of the selected logical work item; stale or changed representations are not treated as current.

### `BI-RPKG-DOWNSTREAM-HANDOFF-INDEPENDENCE`
Clipboard/browser/chat handoff failures do not roll back or authorize upstream repository work.

### `BI-RPKG-TECHNICAL-DIAGNOSTICS`
When an operation fails, preserve useful technical command/error detail for diagnosis while keeping product state/result distinct from the diagnostic mechanism.

## Shared Requirements

- `REQ-RPKG-01` — no target-file mutation before complete applicable-package preconditions pass.
- `REQ-RPKG-02` — unfinished path ownership is scoped by concrete repository + repository-relative path.
- `REQ-RPKG-03` — independent work receives independent ChangeSet identity; continuation of the same logical work preserves identity.
- `REQ-RPKG-04` — user-visible inspection actions are not Finalize approval gates and no user SHA entry is required.
- `REQ-RPKG-05` — finalization commits only the selected logical work and releases ownership only when that work is truly finalized.
- `REQ-RPKG-06` — publication failure after successful local commit preserves the work as recoverable publication-pending state rather than pretending the whole operation failed.
- `REQ-RPKG-07` — repository snapshot export is read-only relative to repository work and does not become ledger/mutation authority.
- `REQ-RPKG-08` — snapshot attachment never auto-sends the ChatGPT message.
- `REQ-RPKG-09` — current-change delivery must avoid blind duplicate send when post-send outcome is uncertain.
- `REQ-RPKG-10` — real Swing/Windows/Edge/ChatGPT behavior is accepted through manual practical testing; automated bridge/component tests do not by themselves establish live-browser success.

## Current Known Implementation Divergences / Q-R-P

### `P-RPKG-OWNERSHIP-SCOPE`
**Current plan:** ownership is `(concrete repository, relative path)` scoped.  
**Finding:** current Core ownership conflict detection compares active ChangeSet relative paths without first constraining the comparison to the same repository, producing false conflicts across unrelated repositories.  
**Impact:** `SL-RPKG-01` implementation violates `REQ-RPKG-02`.

### `P-RPKG-BASE-EQUIVALENCE`
**Current plan:** package applicability must distinguish true content divergence from an unchanged tracked file represented differently in the Windows working tree.  
**Finding:** protocol/current Core use raw-byte expected-base comparison; Git clean/filter equivalence for tracked files is not yet selected/implemented, producing observed false `BASE_MISMATCH` under line-ending conversion.  
**Impact:** policy remains unresolved; do not silently normalize bytes in Java or weaken binary/untracked checks.

### `Q-RPKG-UNBORN-REPOSITORY`
Should a valid Git repository with no first commit be fully supported through an empty-tree baseline, or be explicitly reported as repository-not-ready? Current selected near-term route is not finalized.

### `P-RPKG-BROWSER-ACCEPTANCE`
**Finding:** bridge implementation/tests exist, but live Edge/ChatGPT delivery has not been established as reliably operational in current practical use.  
**Impact:** `SL-RPKG-05/06` require manual practical acceptance before claiming operational success.

## Current Conclusions

- Application semantics now route through user-world Scenarios rather than operation-shaped application Use Cases.
- Domain remains intentionally small and evidence-backed.
- Six implementation Slices represent current realization and are independently checkable even when several implement one Scenario.
- Architecture/persistence/contracts remain downstream owners and evidence.
- Cross-Slice testing strategy uses automated component/integration proof plus manual practical testing; no automated E2E layer is selected.
