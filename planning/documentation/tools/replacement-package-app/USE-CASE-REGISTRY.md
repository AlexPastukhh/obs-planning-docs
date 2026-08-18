# Replacement Package App Use-Case Registry

Status: active application semantic registry
Scope: independently useful user outcomes of the local Replacement Package App. Buttons, state records and implementation helpers do not receive UC IDs merely because they exist.

Scenario catalog: [`scenarios/README.md`](scenarios/README.md)
Shared protocol: [`PACKAGE-PROTOCOL.md`](PACKAGE-PROTOCOL.md)

## 1. Registry Rules

```text
- One current application outcome has one canonical UC-RPKG-* ID.
- One UC may span Java Core, Swing/CLI hosts and persistent local state.
- ZIP discovery, repository registry, ChangeSet browsing, history, settings and ledger mechanics support UCs; they are not standalone semantic outcomes merely because they exist.
- Command meaning remains owned by planning/commands; this registry owns application outcomes only.
```

## 2. Current Use Cases

| ID | Name | Status | Successful result |
|---|---|---|---|
| `UC-RPKG-APPLY` | Apply Verified Replacement Package | active V0.1 | A validated package is overlaid only onto an allowed repository in exact expected/owned local state; an ApplicationAttempt and new cumulative ReviewDiff identity are recorded. |
| `UC-RPKG-REVIEW` | Inspect Current ChangeSet Review State | active V0.1 | The user selects a readable persisted ChangeSet and obtains its current path-scoped cumulative `HEAD → working tree` diff without mutating the real Git index; exact fingerprinting remains internal. |
| `UC-RPKG-FINALIZE` | Finalize Current ChangeSet | active V0.1 | The persisted current cumulative ReviewDiff baseline is revalidated automatically, only owned paths are committed, push is attempted, and push-failure recovery preserves the already-created commit. |
| `UC-RPKG-EXPORT-REPOSITORY` | Export Repository Snapshot ZIP | active V1 | The selected allowed repository is exported read-only as either a Local working-tree snapshot with root diff/base marker or an exact selected committed snapshot with root commit marker; the final ZIP path is copied to clipboard when available. |
| `UC-RPKG-DELIVER-REVIEW` | Deliver Current ReviewDiff to ChatGPT | active V1 | A ChangeSet-bound ordinary ChatGPT conversation receives the exact current ReviewDiff once: native paste remains text or ChatGPT itself converts a large paste to an attachment; Send occurs only after the composer is ready. |
| `UC-RPKG-ATTACH-SNAPSHOT` | Attach Repository Snapshot to ChatGPT | active V1 | A user-selected ordinary ChatGPT conversation receives the app-created Repository Snapshot ZIP as a ready attachment; the extension never presses Send for this use case. |

## 3. Supporting Capabilities

```text
allowed repository registry + persisted selection
OBS-ACTION/archive resolution
package validation
ChangeSet ledger/path ownership + readable browser/history
ApplicationAttempt history
persisted current ReviewDiff restore/refresh
optional Copy/Open ReviewDiff
review-diff handoff setting
repo diff-file service artifact
read-only Local/Committed repository snapshot ZIP export
verified clipboard path handoff
open ordinary ChatGPT conversation inventory + duplicate-tab grouping
ChangeSet → ChatGPT conversation binding
loopback pairing/task queue + one-tab claim
CommittedPendingPush recovery
```

These support the UCs above and do not expand the ChatGPT command protocol.

## Complete Semantic Entries

### `UC-RPKG-APPLY` — Apply Verified Replacement Package

**Status:** active current
**Parent Direction:** `DIR-REPLACEMENT-PACKAGE-APP`
**Purpose:** apply a validated replacement package only when repository identity, ownership and exact base preconditions are satisfied.

**Trigger / accepted input:** user supplies an `OBS-ACTION/1` and/or explicitly selected ZIP plus a selected repository from the local allowed-repository registry.

**Result / end state:** the selected local repository is revalidated against its registered path/origin identity; package/repository/path/base validation completes before mutation; add/replace/delete result bytes are verified; one successful ApplicationAttempt is persisted; ChangeSet ownership is updated; a new cumulative ReviewDiff becomes current and the readable ChangeSet entry becomes selectable without manual UUID entry.

**Boundaries:** Detailed behavior and implementation boundaries are owned by the related Scenario and focused owners.

**Scenario owner:** [`SCN-RPKG-APPLY`](scenarios/SCN-RPKG-APPLY.md)



**Owner route:** this registry entry → [`SCN-RPKG-APPLY`](scenarios/SCN-RPKG-APPLY.md) → focused implementation/test owners linked from that Scenario.

### `UC-RPKG-REVIEW` — Inspect Current ChangeSet Review State

**Status:** active current
**Parent Direction:** `DIR-REPLACEMENT-PACKAGE-APP`
**Purpose:** inspect and refresh the current ChangeSet ReviewDiff integrity state without mutating the real Git index.

**Trigger / accepted input:** successful Apply, selecting a persisted ChangeSet, or explicit Refresh Review.

**Result / end state:** the user navigates ChangeSets by `changeSetLabel · status · short UUID` within the selected repository. A valid persisted `currentReview` can be reopened after application restart only after its canonical diff file and internal fingerprint are reverified. Refresh Review generates/persists a new cumulative `HEAD → working tree` diff scoped to ChangeSet-owned paths, including untracked adds, without changing `.git/index`. `Copy ReviewDiff` and `Open ReviewDiff` operate on that same integrity-verified canonical file.

**Boundaries:** repo-stored review diff files are service artifacts, never ChangeSet-owned content and never Finalize staging targets. Integrity verification/currentReview fingerprinting proves the technical baseline only; it does not establish semantic correctness. Semantic review belongs to `UC-DOC-REVIEW-DIFF` / `planning/documentation/review-diff-review-workflow.md`.

**Scenario owner:** [`SCN-RPKG-REVIEW`](scenarios/SCN-RPKG-REVIEW.md)



**Owner route:** this registry entry → [`SCN-RPKG-REVIEW`](scenarios/SCN-RPKG-REVIEW.md) → focused implementation/test owners linked from that Scenario.

### `UC-RPKG-FINALIZE` — Finalize Current ChangeSet

**Status:** active current
**Parent Direction:** `DIR-REPLACEMENT-PACKAGE-APP`
**Purpose:** explicitly commit/push the current ChangeSet only after its persisted technical ReviewDiff baseline is revalidated.

**Trigger / accepted input:** selected Active ChangeSet and commit message; or Retry Push for `CommittedPendingPush`.

**Result / end state:** Core requires the ChangeSet repository to remain registered, revalidates current origin, loads the persisted current ReviewDiff baseline, regenerates the canonical cumulative diff and requires exact internal fingerprint equality; requires clean real index; stages only ChangeSet-owned paths; verifies the staged diff against the same baseline; commits and pushes. Ownership is released only after successful push. No Open/Copy ReviewDiff action or user-supplied SHA is required.

**Boundaries:** Finalize revalidates technical ReviewDiff identity and performs an explicit user-triggered Git transition. That integrity gate is not an AI/semantic approval flag and does not replace `UC-DOC-REVIEW-DIFF`. Detailed mechanics are owned by the related Scenario/focused owners.

**Scenario owner:** [`SCN-RPKG-FINALIZE`](scenarios/SCN-RPKG-FINALIZE.md)



**Owner route:** this registry entry → [`SCN-RPKG-FINALIZE`](scenarios/SCN-RPKG-FINALIZE.md) → focused implementation/test owners linked from that Scenario.

### `UC-RPKG-EXPORT-REPOSITORY` — Export Repository Snapshot ZIP

**Status:** active current
**Parent Direction:** `DIR-REPLACEMENT-PACKAGE-APP`
**Purpose:** export a read-only Local or Committed repository snapshot ZIP under the documented snapshot contract.

**Trigger / accepted input:** selected allowed repository, export mode `Local working tree + diff` or `Committed snapshot`, output directory, and optional commit/ref for Committed mode.

**Result / end state:** Core revalidates the registered repository path/origin and creates one read-only ZIP whose repository files are under `snapshot/`. Local mode places `SNAPSHOT.json`, `BASE-COMMIT.txt` and `WORKING-TREE.diff` beside the folder and exports tracked + untracked non-ignored current files without touching the real Git index. Committed mode places `SNAPSHOT.json` and `COMMIT.txt` beside the folder and reads exact regular-file blobs from the resolved commit object database, independent of dirty working-tree content.

**Boundaries:** Detailed behavior and implementation boundaries are owned by the related Scenario and focused owners.

**Scenario owner:** [`SCN-RPKG-EXPORT-REPOSITORY`](scenarios/SCN-RPKG-EXPORT-REPOSITORY.md)



**Owner route:** this registry entry → [`SCN-RPKG-EXPORT-REPOSITORY`](scenarios/SCN-RPKG-EXPORT-REPOSITORY.md) → focused implementation/test owners linked from that Scenario.

### `UC-RPKG-DELIVER-REVIEW` — Deliver Current ReviewDiff to ChatGPT

**Status:** active current
**Parent Direction:** `DIR-REPLACEMENT-PACKAGE-APP`
**Purpose:** deliver the exact current ReviewDiff to the selected ordinary ChatGPT conversation for downstream semantic review.

**Trigger / accepted input:** a selected ChangeSet has a persisted ordinary ChatGPT conversation binding and a new current ReviewDiff is created by successful Apply/Refresh Review; or the user explicitly chooses `Send current ReviewDiff`.

**Result / end state:** the Java bridge queues the exact canonical ReviewDiff by `changeSetId + reviewAttemptId` together with its byte length/SHA-256; Java verifies the queued artifact again before payload delivery and the extension verifies the received bytes before paste. One open browser tab for the bound conversation claims the task. The extension requires an empty composer and pastes the exact ReviewDiff text. If ChatGPT keeps the paste as text, it sends that text. If ChatGPT's own native large-paste behavior converts it into an attachment, the extension waits until conversion/upload is complete before clicking Send. `Sent` requires both cleared composer/attachment state and observation of a new user-message turn. An empty ReviewDiff is `NoChanges` and sends nothing.

**Boundaries:** the application proves/delivers exact current ReviewDiff bytes; it does not decide semantic correctness. After successful delivery, semantic review belongs to `UC-DOC-REVIEW-DIFF` / `planning/documentation/review-diff-review-workflow.md`. Delivery does not authorize Finalize.

**Scenario owner:** [`SCN-RPKG-DELIVER-REVIEW`](scenarios/SCN-RPKG-DELIVER-REVIEW.md)



**Owner route:** this registry entry → [`SCN-RPKG-DELIVER-REVIEW`](scenarios/SCN-RPKG-DELIVER-REVIEW.md) → focused implementation/test owners linked from that Scenario.

### `UC-RPKG-ATTACH-SNAPSHOT` — Attach Repository Snapshot to ChatGPT

**Status:** active current
**Parent Direction:** `DIR-REPLACEMENT-PACKAGE-APP`
**Purpose:** attach an already-created Repository Snapshot ZIP to a selected ChatGPT conversation without sending the message.

**Trigger / accepted input:** a Repository Snapshot ZIP has already been created successfully and the user explicitly chooses `Attach to ChatGPT` plus one currently open ordinary ChatGPT conversation.

**Result / end state:** the Java side validates that the selected artifact has the Repository Snapshot root contract, queues an attach-only task and gives the claimed ChatGPT tab a short-lived artifact ticket. The extension attaches the exact ZIP and waits until ChatGPT shows the attachment as ready. It records `Attached` and stops.

**Boundaries:** Detailed behavior and implementation boundaries are owned by the related Scenario and focused owners.

**Scenario owner:** [`SCN-RPKG-ATTACH-SNAPSHOT`](scenarios/SCN-RPKG-ATTACH-SNAPSHOT.md)



**Owner route:** this registry entry → [`SCN-RPKG-ATTACH-SNAPSHOT`](scenarios/SCN-RPKG-ATTACH-SNAPSHOT.md) → focused implementation/test owners linked from that Scenario.