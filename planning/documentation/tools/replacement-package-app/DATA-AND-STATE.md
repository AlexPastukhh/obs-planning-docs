# Replacement Package App Data And State

Status: active current state contract + selected target delta
Scope: application repository/settings state, persistent ChangeSet/ApplicationAttempt/ReviewDiff records, lifecycle authority, repository-snapshot boundary and browser-delivery side state.

## 1. Authorities

```text
Git HEAD       = committed repository state
working tree   = actual current file state
application ledger = logical ChangeSet ownership/history/review metadata
repository registry = local allowlist of Git work trees the app may mutate
```

Ledger disagreement with actual repository state never overrides Git/filesystem reality; unresolved disagreement becomes `STATE_DIVERGED`.

## 2. State Root

Default Windows root:

```text
%LOCALAPPDATA%\OBS\ReplacementPackageApp\
```

Fallback when `LOCALAPPDATA` is unavailable:

```text
$HOME\.obs\ReplacementPackageApp\
```

Structure:

```text
settings.json
changesets/<changeSetId>.json
attempts/<attemptId>.json
review-diffs/<changeSetId>/<attemptId>.diff
chat-bridge.json
chat-bindings/<changeSetId>.json
chat-handoffs/<taskId>.json
locks/state.lock
```

No ledger/state file is intentionally stored inside the target repository.

## 3. Settings / Repository Registry

`settings.json` schema 4 is consumer-only local configuration:

```json
{
  "schemaVersion": 4,
  "repositories": [
    {
      "id": "<local repository-record UUID>",
      "name": "OBS Planning",
      "path": "C:\\Users\\...\\obs-planning-docs",
      "repositoryIdentity": "github:AlexPastukhh/obs-planning-docs"
    }
  ],
  "selectedRepositoryId": "<repository-record UUID or null>",
  "selectedChangeSetId": "<changeSet UUID or null>",
  "reviewDiffHandling": "Clipboard",
  "reviewDiffSendRetrySeconds": 6,
  "reviewChatTitleIgnoredCharacters": ""
}
```

Rules:

- a repository is added only after Core verifies it is a Git work tree and derives supported GitHub identity from `remote.origin.url`;
- Apply/Finalize/Retry Push and Repository Snapshot export require the actual local work-tree root to match a registered path and current origin identity to match the stored identity;
- multiple registered local paths are allowed, including multiple clones of one repository identity;
- removing a repository with Active/`CommittedPendingPush` ChangeSets is blocked;
- `selectedRepositoryId` and `selectedChangeSetId` are navigation state, not mutation authority;
- `reviewDiffHandling` remains `Clipboard | RepoDiffFile | Both`;
- `reviewDiffSendRetrySeconds` is an application setting for ReviewDiff automatic Send-control attempts; default `6`, valid range `1..60` seconds. A queued ReviewDiff task captures the current value, so later Settings edits affect new tasks only;
- `reviewChatTitleIgnoredCharacters` is a local matching-policy setting for action-assisted Review-chat destination resolution. It defaults to empty and stores at most 128 literal Unicode characters/code points (no line breaks). Matching removes those configured characters from both the requested `chatTabTitle` and inventory titles, trims outer whitespace, then performs exact case-sensitive equality. It is not regex/fuzzy/case-folding configuration and is never supplied by `PACKAGE.json` or `OBS-ACTION`;
- older settings schemas are read compatibly: legacy schema-1 `repositoryRoot` is migrated to one repository record when that path can be verified, and schema-2/3 state receives missing defaults for newer application settings; package/OBS-ACTION data never supplies repository registration.

A registered path that is temporarily unavailable remains configuration; use-time verification blocks mutation rather than silently authorizing another path.

## 4. ChangeSet

Minimum persisted fields:

```text
schemaVersion
changeSetId
changeSetLabel
repositoryIdentity
repositoryRoot
ownedPaths[]
status
lastPackageId
currentReview { attemptId, diffPath, sha256, head }
commitSha
branch
createdAt
updatedAt
```

`changeSetId` remains the stable logical identity required by the package protocol. `changeSetLabel` is human-readable presentation metadata, not continuation authorization. For a new ChangeSet the package label initializes the persisted label. For an existing exact `changeSetId`, the persisted label remains authoritative; a different package label is retained only as an Apply diagnostic and does not overwrite the stored label or block an otherwise valid continuation. Swing may additionally show a short UUID suffix to disambiguate duplicate labels.

`ownedPaths[]` is the union of paths intentionally claimed by successful/continuing overlays until ownership is released.

## 5. ApplicationAttempt

```text
schemaVersion
attemptId
timestamp
name
repositoryIdentity
repositoryRoot
archivePath
archiveSha256
packageId
changeSetId
result: SUCCESS | FAILED
code
message
reviewDiffPath
reviewDiffSha256
```

Failed attempts are retained when enough identity/state is known to write a meaningful record.

## 6. ReviewDiff Identity And Implicit Finalize Baseline

Each successful apply creates a new **cumulative** review record from current `HEAD` to current working tree for all owned paths. Explicit `Refresh Review` also replaces and persists the captured ChangeSet's `currentReview`. Refresh completion is ChangeSet state, not navigation authority: a background Refresh for X does not mutate Swing's current selector/presentation if the user has moved to Y. Older review records remain history but are stale/non-current after a later overlay/refresh.

On restart or ChangeSet selection, a persisted current review may be reconstructed only when its canonical diff file exists and exact SHA-256 still matches the recorded value.

The persisted `currentReview.sha256` binds the current ReviewDiff to exact canonical bytes and is the implicit Finalize baseline. It is internal application state, not user approval input. Normal Swing/CLI workflows do not require the user to view, copy or enter a SHA.

`Copy ReviewDiff` / `Open ReviewDiff` are optional inspection conveniences and are never prerequisites for Finalize. Apply or Refresh Review replaces the persisted baseline. Swing Review actions resolve the latest persisted ChangeSet/currentReview state when invoked, so they do not depend on a background Refresh callback rewriting the selected-work UI cache.

Finalize integrity-checks the persisted canonical ReviewDiff, regenerates the cumulative diff and compares the internal fingerprints. A mismatch is `REVIEW_STALE`; the user refreshes ReviewDiff before retrying Finalize.

## 7. Lifecycle

```text
Active
  → successful apply keeps Active and replaces currentReview
  → explicit Refresh Review keeps Active and replaces currentReview
  → successful commit + successful push → Finalized
  → successful commit + failed push → CommittedPendingPush

CommittedPendingPush
  → Retry Push success → Finalized
  → Retry Push failure → remains CommittedPendingPush
```

`Finalized` releases path ownership. Historical files remain. Current implementation treats this as terminal; selected target Reopen behavior is documented in the target delta below.

## 8. Path Ownership / Dirty State

For one repository identity/local repository root, active/CommittedPendingPush ChangeSets reserve their `ownedPaths`.

A new ChangeSet cannot claim a path that is already dirty relative to HEAD/staged state unless that path is already owned by the same continuing ChangeSet. V0.1 has no implicit "adopt dirty unowned path" operation.

An explicitly declared package `add` may target a path matched by `.gitignore` when the path is actually absent at preflight. After successful package validation/mutation that path is explicit ChangeSet ownership, so canonical ReviewDiff and Finalize may force-add only that owned path. Ignore rules never authorize adoption of a pre-existing unowned file.

## 9. Repository Snapshot Output Is Not Ledger State

Repository snapshot ZIPs are user-selected external output artifacts. Their destination path, export history and clipboard status are not persisted in `settings.json`, ChangeSets or ApplicationAttempts.

The ZIP itself carries its portable identity beside the exported `snapshot/` folder:

```text
SNAPSHOT.json
BASE-COMMIT.txt + WORKING-TREE.diff   (Local)
COMMIT.txt                            (Committed)
```

Creating a snapshot does not claim paths, change ChangeSet lifecycle or become a prerequisite for Apply/Review/Finalize.

## 10. ChatGPT Bridge State

Browser integration is consumer-only local delivery state and does not enter `PACKAGE.json` or `OBS-ACTION`.

`chat-bridge.json` stores the random loopback pairing token and fixed V1 port. `chat-bindings/<changeSetId>.json` stores one optional ChangeSet → ordinary ChatGPT conversation binding (`conversationKey`, last-known title/URL, bound timestamp). This binding survives continuation/correction packages because they keep the same `changeSetId`.

`PreparedApply` / `AuthorizedApply` are transient in-memory operation records, not persistent ledger files. Prepare freezes parsed `OBS-ACTION`, validated `PackageData`, Repository Target candidates, the ChangeSet state token, the current binding key and any unique title-resolved destination `conversationKey`. The user decision to keep/rebind is also transient. Execute revalidates the frozen ChangeSet/binding assumptions before repository mutation; actual binding persistence is written only after successful Apply when rebind/use-hint was authorized.

Swing ChangeSet Output buffers are transient session state. The main work surface keeps one in-memory text buffer per `changeSetId` and no general/unresolved Output buffer. Package filename and `packageId` may be recorded inside an Apply-attempt line for traceability, but neither is an Output-state key. ChangeSet selection changes which buffer is rendered; ChatGPT delivery events append to the buffer named by their `changeSetId`. Progress/errors without an authoritative ChangeSet identity use the separate transient `Operation` field plus normal notification/Technical Diagnostics paths instead of becoming Output history. No Output buffer is written to the repository or consumer ledger and no Output text becomes mutation/finalization authority.

`chat-handoffs/<taskId>.json` records ReviewDiff/snapshot delivery tasks. Every deliverable task records the exact artifact path, byte length and SHA-256 captured at enqueue; payload delivery requires those bytes still to match. ReviewDiff tasks also reference the canonical `reviewAttemptId` and capture `sendRetryIntervalSeconds` from Settings at enqueue; automatic creation is idempotent for one `changeSetId + reviewAttemptId`. Snapshot handoff records may reference an already-created snapshot ZIP, but this is delivery state rather than repository-snapshot export history and does not change the snapshot contract.

Task lifecycle is independent from ChangeSet lifecycle:

```text
ReviewDiff:
Pending → Claimed → Preparing → SendClicked → Sent | UnknownAfterSend
Pending → Cancelled
Claimed → FailedBeforeSend | Cancelled
Preparing → PreparedUnsent
empty ReviewDiff → NoChanges
claim loss while Claimed → Pending

Snapshot:
Pending → Claimed → Preparing → Attached
Claimed → FailedBeforeSend
Preparing → PreparedUnsent
```

All terminal states (`Sent`, `Attached`, `UnknownAfterSend`, `PreparedUnsent`, `FailedBeforeSend`, `NoChanges`, `Cancelled`) are immutable. `UnknownAfterSend` is never automatically retried. Chat delivery status never authorizes Finalize and a missing/failed bridge never converts a successful Apply/Refresh Review/export into failure.

Open-tab inventory is runtime memory only and is refreshed by the extension; it is not persisted as authoritative state. A claim is valid only while the recorded tab remains in the recorded conversation, and at most one task per conversation may be in `Claimed`/`Preparing`/`SendClicked` at a time. For ReviewDiff delivery the extension stages `Preparing` only after the exact `.diff` attachment is visible and upload-ready in the intended composer; failure before confirmed attachment preparation remains `FailedBeforeSend`. Technical `SendClicked` is projected semantically as `Sending`. While the exact prepared attachment remains in the same composer, the same interaction may make repeated guarded Send-control attempts at its frozen interval. This does not create/reuse a terminal interaction. If the attachment disappears without a confirmed outgoing user turn, the task becomes `UnknownAfterSend` and automatic attempts stop. Rebind/unbind cancels only `Pending`/`Claimed` ReviewDiff tasks and refuses to move a binding while a task is `Preparing` or `SendClicked`; expired in-flight leases are normalized first. Older automatic `Pending`/`Claimed` ReviewDiff tasks are superseded when a newer current ReviewDiff is queued, while an already `Preparing` task is allowed to finish to avoid leaving an unowned composer attachment.

Extension tab-agent identity is transient browser state, not application ledger state. `runtimeGeneration` lives in `chrome.storage.session`: it survives service-worker suspension/restart but is replaced by extension reload/update/browser-session replacement. `agentInstanceId` is per injected ChatGPT document agent; the background keeps only the currently accepted id per tab in service-worker memory and relearns it from a generation-matching ping after worker restart. Neither value is persisted in ChangeSet/task JSON or used as package/Review identity. `Pending` means the Java task is durable but no browser tab has yet claimed it; Swing projects this as `Waiting for ChatGPT tab`. `Claimed` is projected as `Delivering`.

## 11. Repo Review Artifact

Optional `_ai-review-diffs/**` files are service artifacts. They are deliberately outside ChangeSet ownership and Finalize staging; users may delete them independently.

## 12. Selected Target State Delta — Not Yet Implemented

The current schemas/records above describe current implementation. The following state meaning is selected for the next implementation revision and must not be read as already materialized on disk.

### Repository Target Identity / Mutable Location

Repository registry record UUID becomes the stable `Repository Target` identity. The current persisted `path` field is the implementation representation of mutable `Repository Location`, not target identity.

Target operation:

```text
Change Repository Location
→ explicit user action
→ new path is valid Git work tree
→ current origin maps to stored Repository Identity
→ update the existing repository record's location/path
→ preserve repository record UUID
→ preserve every ChangeSet association
```

No per-ChangeSet rebind is performed. A different clone with the same Repository Identity may be deliberately selected by this explicit operation; the application never substitutes a clone automatically.

ChangeSet persistence should migrate toward a stable `repositoryTargetId` reference. Current `repositoryRoot`/`repositoryIdentity` fields may remain compatibility/evidence fields during migration but must not make the filesystem path the ChangeSet's identity.

### Package ChangeSet Identity Resolution

`PACKAGE.json.changeSetId` is the exact logical-work key for Apply. An existing record is resolved by that ID before continuation semantics are chosen. `selectedChangeSetId` is navigation/UI state and cannot substitute another Active, similarly labelled or more recent ChangeSet. An exact Finalized record blocks Apply until explicit Reopen; Apply itself never changes that identity or reopens it.

### Finalized ChangeSet Reopen

Selected target adds an explicit recovery transition without changing ChangeSet identity:

```text
Finalized
+ explicit Reopen ChangeSet
+ exact Repository Target valid
+ historical paths can be reacquired safely
→ Active
```

Reopen does not erase prior finalize/commit/ApplicationAttempt history. Because Finalized released live ownership, Reopen must establish a new live ownership reservation for the ChangeSet's historical owned paths only after checking that no unfinished sibling owns them and no unrelated dirty/unowned state would be silently adopted. A failed guard leaves lifecycle and ownership unchanged; its failure is reported through the User Operation result/Windows notification/session diagnostics and does not create a persistent error marker on the Finalized history record.

The target must retain enough historical path information after Finalize to evaluate safe Reopen even though those paths are no longer live reservations. Current `ownedPaths[]` may be preserved as historical membership while live-reservation calculation remains status-aware, or an equivalent schema may separate historical membership from live ownership. Exact storage shape is downstream design.

A successful Reopen should invalidate/refresh completion-specific `currentReview` state so later continuation/finalization uses a current baseline rather than a pre-Finalize review. Prior review/finalization artifacts remain history/evidence.

### Global Existing-Work Projection

Target query/read model spans persisted ChangeSets across repository records:

```text
default rows
= Active
+ CommittedPendingPush / Publication Pending

Show History
= default rows + all Finalized

unfinished ordering
= error-marked unfinished first, then most recently active
```

Selecting a row writes ordinary navigation state (`selectedRepositoryId`, `selectedChangeSetId`) for that exact stored Repository Target/ChangeSet. If the target path is unavailable, the row remains visible; no other same-origin repository record becomes authoritative automatically.

### Compact Latest ChangeSet Operation Outcome

Persist one compact latest relevant operation summary for **unfinished** ChangeSet error-marker/reason presentation across restart, for example:

```text
lastOperationOutcome {
  status: SUCCESS | FAILED | ACTION_REQUIRED | UNCERTAIN
  code
  message
  timestamp
}
```

A later relevant success replaces/clears the previous failure marker while the ChangeSet remains unfinished. This field is presentation/query state separate from publication lifecycle. Finalized rows do not retain this persistent error marker; failed Reopen remains a failed User Operation result/notification/diagnostic while lifecycle stays Finalized. No full generic persistent User Operation history is selected.

### User Operation Runtime Model

Meaningful nontrivial explicit operations produce a process/outcome record during execution, including Apply, Finalize, Retry Push, explicit Reopen ChangeSet, Repository Snapshot export, current-change/snapshot ChatGPT handoff and Change Repository Location. Passive navigation/selection and trivial Copy/Open actions are excluded.

Target outcome set:

```text
Running
Succeeded
Failed
Action Required
Uncertain
```

Terminal results drive Windows notification requests. Only the compact latest outcome used by Active/Publication Pending work-list markers is required to survive restart; a failed Reopen on Finalized history does not create that marker. Session diagnostics remain session-scoped.

### External Interaction Semantic State

Current `chat-handoffs/<taskId>.json` technical task records remain implementation evidence. Target user-facing `External Interaction` identity is one user-significant exact payload/artifact → exact conversation attempt.

The target list includes current-change delivery and snapshot attachment, but excludes pairing, polling, heartbeat, claim/lease/tab mechanics.

Semantic cancellation:
- before external preparation → `Cancelled`, no future automation;
- prepared unsent text/attachment → `Cancelled` plus `preparedContentRetained=true` (or equivalent semantic result), no automatic deletion and no future Send;
- possible/actual Send → preserve Sent/uncertain truth; never rewrite to Cancelled.

The user-facing interaction projection shows active/actionable interactions plus `UnknownAfterSend` (or equivalent attention-requiring uncertainty); it is not terminal history. Ordinary terminal `Cancelled`, `Sent`, `Attached`, `NoChanges`, `FailedBeforeSend` and `PreparedUnsent` interactions leave the projection after their result is surfaced. Across restart persist only records/states needed for recovery, uncertainty truth, idempotency or duplicate prevention. A retry is a new External Interaction identity; a terminal/cancelled interaction is not resumed.

### ReviewDiff External Preparation Boundary

For current-change delivery, selected target semantic state follows external evidence rather than attempt timing:

```text
before exact ReviewDiff attachment is confirmed upload-ready
→ not Prepared
→ failure = FailedBeforeSend

exact ReviewDiff `.diff` attachment confirmed in intended composer
→ Preparing / externally prepared

possible-Send phase
→ technical SendClicked / semantic Sending
→ repeated guarded Send-control attempts only while the same attachment remains prepared
→ confirmed outgoing user turn = Sent
→ attachment disappears without confirmation = UnknownAfterSend; stop automatic attempts
```

ReviewDiff preparation uses the shared browser attachment primitive for every non-empty diff, so it does not depend on foreground document focus, Clipboard API write permission or rich-text insertion size. The retry interval is local application configuration captured per task, not extension-local hardcoded timing. Snapshot preparation may reuse the same technical primitive, but snapshot remains attach-only in this correction.

### Source-State Applicability Result

Target Apply distinguishes:

```text
EXACT_SOURCE_MATCH
GIT_EQUIVALENT_SOURCE_MATCH
SOURCE_STATE_CHANGED
SOURCE_STATE_UNVERIFIABLE
```

Names are implementation choices, but the semantic distinction is required. `BASE_MISMATCH` may remain a compatibility machine code during migration; user-facing meaning should describe changed/unverifiable source state rather than raw byte mismatch.

### Repository Not Ready

Repository-without-first-commit is not a ChangeSet lifecycle state. When a requested operation requires HEAD/commit/ref baseline semantics, target result is Application-level `Repository Not Ready` with actionable initial-commit guidance and no unsafe fallback/mutation.
