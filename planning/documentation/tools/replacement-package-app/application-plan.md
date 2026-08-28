# Replacement Package App — Application Plan

Status: selected target plan / implementation pending
Profile: Modular / Medium SDS
Direction: `DIR-REPLACEMENT-PACKAGE-APP`

## Planning State

| Step | State | Current owner/result |
|---|---|---|
| Step 0 — Why / Solution Discovery | reviewed for the existing application responsibility | The local Replacement Package App remains the selected solution responsibility; this revision changes application behavior, not the overall solution choice. |
| Step 1 — Scenario | selected target | [`scenarios/`](scenarios/) + shared DATA/Behavior/Requirements below |
| Step 2 — Domain | selected target working model | [`domain-draft.md`](domain-draft.md) |
| Step 3 — Slices / Realization | selected target + explicit current realization | [`slices.md`](slices.md) |
| Step 4 — Practical Realization Feedback | target proof planned; current evidence remains separate | [`testing-plan.md`](testing-plan.md), automated tests, [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md) |

Planning may describe selected target behavior before code exists. Downstream implementation/contracts must distinguish **current implementation** from **selected target** and must not claim target proof until it exists.

## Step 0 — Application Responsibility

Replacement Package App is a local Java 21/Swing application responsible for:
- applying deterministic replacement packages to explicitly registered local Git repositories;
- keeping one logical ChangeSet coherent across package continuations, current-change inspection and publication/recovery;
- letting the user select the existing ChangeSet context they need, locally or across registered repositories;
- exporting portable Local/Committed repository context;
- optionally handing exact repository/change context to ordinary ChatGPT conversations through a local browser companion;
- reporting meaningful operation outcomes without turning notifications/navigation into repository-operation authority.

Producer command semantics remain outside the application. Git commands, persistence records, UI widgets and browser task mechanics remain downstream realization unless a Scenario/Domain rule explicitly depends on their meaning.

## Step 1 — Target Scenario Inventory

| Scenario | Need / motivation | Independently meaningful observable result | Target implementation status |
|---|---|---|---|
| [`SCN-RPKG-COMPLETE-REPOSITORY-WORK`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md) | Safely bring prepared work into the correct local repository and finish that logical work without losing/capturing unrelated work. | Intended work is applied and either finalized/published or left in a truthful recoverable publication-pending state; unrelated work is preserved. | current Scenario partly implemented; selected target expands Apply/readiness/source-state behavior |
| [`SCN-RPKG-PROVIDE-CURRENT-CHANGE`](scenarios/SCN-RPKG-PROVIDE-CURRENT-CHANGE.md) | Give the intended ChatGPT conversation the exact current change for one logical work item without manual large-diff handling. | The exact current change reaches the intended conversation once, or a truthful safe/failed/uncertain/cancelled result is retained without changing repository-work authority. | core delivery exists; selected target adds common External Interaction management |
| [`SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT`](scenarios/SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md) | Produce exact portable repository context and optionally hand it to the intended ChatGPT conversation without changing repository work. | A valid Repository Snapshot exists; optional handoff is either a ready unsent attachment or a guarded auto-sent message in the intended conversation according to the frozen initial choice. | current export plus destination-first attach-only / attach+Send use one generic attachment delivery engine while preserving independent export success |

Scenario identity remains bidirectionally independent from Slice identity. A new/changed UI, operation, recovery branch or implementation Slice is not a Scenario unless it has its own real-life Need/result; a Scenario change does not mechanically require a new Slice.

## Shared Scenario DATA

These are user/scenario-relevant meanings, not Java DTO/persistence schemas.

| DATA | Meaning |
|---|---|
| `DATA-RPKG-REPOSITORY-TARGET` | One concrete registered local repository target with stable target identity. |
| `DATA-RPKG-REPOSITORY-IDENTITY` | Logical GitHub repository identity such as `github:owner/repo`; several concrete targets/clones may share it. |
| `DATA-RPKG-REPOSITORY-LOCATION` | Mutable local filesystem location of one stable Repository Target. |
| `DATA-RPKG-REPLACEMENT-PACKAGE` | Prepared immutable change input/provenance for creating or continuing logical work. |
| `DATA-RPKG-CHANGESET` | One logical repository-work item with stable identity, readable label and publication lifecycle. |
| `DATA-RPKG-APPLICABILITY` | Whether the requested transition can be performed safely now; includes blocking reason when not. |
| `DATA-RPKG-CURRENT-CHANGE` | Current cumulative work belonging to one ChangeSet. |
| `DATA-RPKG-REPOSITORY-SNAPSHOT` | Exact portable repository-context artifact. |
| `DATA-RPKG-CHAT-CONVERSATION` | Intended ordinary ChatGPT destination. |
| `DATA-RPKG-EXTERNAL-INTERACTION` | One user-significant attempt to transfer one exact payload/artifact to one exact ChatGPT conversation. |
| `DATA-RPKG-USER-OPERATION` | Application-process record for a meaningful explicit user operation whose terminal outcome matters; not a Domain aggregate. |
| `DATA-RPKG-OPERATION-RESULT` | Semantic success/failure/action-required/uncertain result, concise reason and link to session diagnostics when relevant. |

`ApplicationAttempt`, JSON filenames, Git index, commit graph, task leases/tab IDs and hash fields remain downstream realization unless a Scenario requires their meaning directly.

## Shared Behavior Items

### `BI-RPKG-REVALIDATE-TARGET`
Repository operations capture/resolve one exact Repository Target and revalidate that exact target at invocation/execution time rather than trusting mutable UI selection.

### `BI-RPKG-PASSIVE-PACKAGE-INPUT`
Supplying/pasting/selecting a package or OBS-ACTION is passive. Repository resolution/applicability/mutation authority starts only when the user explicitly invokes Apply.

Swing exposes ordinary `Apply` plus a separate `Apply (wait for ZIP)` convenience action for the download-arrival race. The ordinary action is unchanged. The wait action freezes the current Archive ZIP field, OBS-ACTION text and current Repository Target ID at click time, then invokes the same `prepareApply(...)` logic immediately and every 2 seconds only while the result is `PACKAGE_NOT_FOUND`, for at most 12 seconds. Any other Prepare result/failure ends polling immediately. The first successful Prepare enters the existing decision/Execute path exactly once; polling never becomes package validation, target resolution or repository mutation authority of its own.

### `BI-RPKG-PREPARED-APPLY`
Explicit Apply first builds one prepared, non-repository-mutating operation context from the parsed OBS-ACTION, validated package, Repository Target candidates, current ChangeSet/binding state, current Review-chat title-matching policy and any uniquely resolved destination conversation. Parsing/title resolution is not repeated after repository mutation.

Prepare diagnostics that do not require authority (for example no/ambiguous ChatGPT title match) are written to Output. In the interactive Swing path, confirmation UI is reserved for material choices. A unique requested destination that differs from the existing binding requires a pre-mutation user choice: Apply without rebind, Apply and rebind after successful repository Apply, or cancel. Execute revalidates prepared ChangeSet/binding/target assumptions before mutation; stale prepared context blocks and must be prepared again. The current CLI `apply --action-file` compatibility path is non-interactive and, as an accepted divergence, defaults such a conflict to keep-existing/no action-driven rebind.

### `BI-RPKG-CHANGESET-OUTPUT`
The user-visible Swing Output is keyed by logical `changeSetId`. Selecting a ChangeSet renders that ChangeSet's session buffer. Further packages/Apply attempts for the same open ChangeSet append there; a different ChangeSet renders a different buffer regardless of archive path/name or `packageId`. `packageId` remains exact package/action correlation and appears only as per-attempt traceability together with the physical filename. It never chooses the Output owner.

There is no general/unresolved Output buffer. Before Prepare yields a valid `PreparedApply`, no authoritative package ChangeSet is available, so immediate `Preparing Apply…` progress and pre-Prepare failure use transient `Operation` status plus normal notification/Technical Diagnostics paths and do not become any ChangeSet Output history. Successful Prepare switches Output to `PreparedApply.packageData.manifest.changeSetId` before notices/decisions/Execute. ChangeSet-scoped asynchronous callbacks and Chat bridge events append by their captured/event `changeSetId`, not by whichever selector happens to be visible when the callback arrives. Output buffers are session-only presentation state and never mutation, review or Finalize authority.

### `BI-RPKG-REFRESH-UI-OWNERSHIP`
`Refresh Review` captures one `changeSetId` when invoked. Core may replace that ChangeSet's persisted current ReviewDiff and queue it to the bound Review chat, while the Swing completion callback records success/failure against the captured ChangeSet only. The callback does not assign `selectedChangeSet` or rewrite selected Review/chat presentation after completion. User navigation remains selector-owned. Copy/Open resolve the latest persisted current Review for the ChangeSet selected at invocation time, so fresh Review state does not depend on callback-maintained UI cache.

### `BI-RPKG-APPLY-TARGET-RESOLUTION`
At Apply time:
- `PACKAGE.json.changeSetId` is the exact logical-work identity. If that exact ChangeSet exists and is Active, only that ChangeSet may be continued; current UI selection, label, recency or another Active ChangeSet in the repository cannot substitute for it. The existing persisted `changeSetLabel` remains presentation authority: a different package label is diagnostic-only, does not rename the ChangeSet and does not block an otherwise valid continuation. If the exact ID is Finalized, Apply blocks and explicit Reopen is required before a later continuation package;
- continuation of an existing ChangeSet uses that ChangeSet's stored concrete Repository Target as authority;
- for new work, a matching current target is kept, exactly one other matching registered target may be selected automatically, several matching clones require concrete user selection, and no match blocks before mutation;
- automatic context switch remains selected even if later preflight fails;
- package Repository Identity never silently re-homes an existing ChangeSet.

### `BI-RPKG-PRESERVE-OTHER-WORK`
One logical work item must not silently adopt, commit, overwrite or release another unfinished work item's paths or unrelated local changes. Exclusive ownership is scoped by **concrete Repository Target + repository-relative path**, not by relative path globally and not by Repository Identity alone.

When Apply blocks on path ownership/adoptability, the semantic result identifies the exact path and Repository Target, the applying ChangeSet, and the ownership truth: either `Unowned — no unfinished ChangeSet owns this path` or the owning unfinished ChangeSet's label/status/ID. Do not emit an owner-looking path error without stating whether an owner actually exists.

### `BI-RPKG-EXPECTED-SOURCE-STATE`
For `replace`/`delete`, Apply proves that the current touched content still represents the source state from which the package was prepared:

```text
raw expected-base bytes == actual bytes
→ source match

otherwise compare expected-base and actual content
through this repository/path's Git clean/filter semantics
→ Git-equivalent: source match
→ different: source changed, block
→ cannot verify safely: block
```

No global LF/CRLF replacement and no separate `tracked?` semantic prerequisite is selected. `add` continues to use path-absence/adoptability rules. Local Snapshot is the normal way to intentionally give the producer current manual/local content, but it does not replace Apply-time freshness proof.

### `BI-RPKG-REPOSITORY-LOCATION`
`Repository Target identity ≠ filesystem location`. `Change Repository Location` is an explicit operation/button: require a valid Git work tree and matching Repository Identity/origin, then update the mutable location while preserving Target ID and all ChangeSet associations. Automatic clone substitution is forbidden.

### `BI-RPKG-REPOSITORY-READY`
When an operation genuinely requires committed baseline/HEAD/ref semantics and the Git repository has no first commit, report `Repository Not Ready` with actionable guidance to create an initial commit and retry; do not invent an empty-tree fallback.

### `BI-RPKG-SELECT-EXISTING-WORK-CONTEXT`
The existing `ChangeSet` selector is the single work-context navigation surface; there is no separate `Existing work` workflow/window. By default it shows unfinished Active + Publication Pending ChangeSets for the current Repository Target. `All repositories` expands the same selector to unfinished ChangeSets across registered targets. `Show history` adds Finalized records within whichever scope is selected.

When `All repositories` is enabled, each row identifies its Repository Target. Selecting a ChangeSet whose exact target is registered switches the Repository selector to that exact target and makes the ChangeSet current. Same-origin clones remain distinct. A stored ChangeSet whose target is unavailable remains truthful query state and must not crash the selector or silently substitute another target. Selection is navigation only and never Applies, Reopens, Finalizes, sends or otherwise becomes mutation authority. Unfinished error markers still sort first; Finalized history is never pulled into the default list by failure.

### `BI-RPKG-LAST-CHANGESET-OUTCOME`
For Active or Publication Pending work, persist a compact latest relevant outcome summary (`success/failure`, concise reason, timestamp) for the unfinished-work error marker. Latest failure shows the marker/reason and a later relevant success clears it. Finalized history does not carry a persistent ChangeSet error marker; in particular, a failed Reopen remains Finalized and is surfaced through the operation result, Windows notification and diagnostics.

### `BI-RPKG-REOPEN-FINALIZED-CHANGESET`
A Finalized ChangeSet may be returned to Active only through an explicit user recovery action. Reopen preserves the same ChangeSet identity and historical finalization evidence, revalidates the exact Repository Target and may reacquire the ChangeSet's historical paths only when no unfinished sibling owns them and no unrelated dirty/unowned state would be silently adopted. Any conflict blocks before lifecycle/ownership mutation. Reopen never occurs implicitly from package Apply or history selection. A failed Reopen leaves the ChangeSet Finalized, emits the normal failed-operation notification/result/diagnostics and does not create a persistent ChangeSet error marker.

### `BI-RPKG-EXTERNAL-INTERACTION`
External Interaction is user-significant payload-to-conversation work, not pairing/heartbeat/claim/lease/tab mechanics. The application exposes a common interaction list with selection/state, Cancel when truthful and separate Dismiss acknowledgement for terminal uncertainty that cannot truthfully be cancelled.

Cancel semantics:
- before external preparation: `Cancelled`, no further automation;
- prepared unsent content: `Cancelled — prepared content retained`; do not automatically delete composer text/attachment and do not continue/send;
- once Send may have happened, preserve truthful `Sent`/uncertain outcome rather than rewriting it to `Cancelled`.

The user-facing interaction list is a current/actionable/attention projection, not a terminal-attempt history. Show interactions that can still progress/cancel plus unacknowledged `UnknownAfterSend` (or equivalent uncertainty that still requires attention). Repeating the same user intent while an equivalent interaction is still actionable reuses that existing External Interaction identity rather than creating an indistinguishable duplicate: equivalence requires the same interaction kind, exact source/payload identity, destination conversation and applicable ChangeSet/ReviewDiff identity. A materially different source/payload or destination remains independent. Ordinary terminal `Cancelled`, `Sent`, `Attached`, `NoChanges`, `FailedBeforeSend` and `PreparedUnsent` results leave this list after their result is surfaced through Output/notification. `UnknownAfterSend` remains immutable terminal delivery truth and cannot be cancelled, but the user may `Dismiss interaction`; dismissal persists acknowledgement, hides that terminal row across restart and does not delete/rewrite the underlying task/result. Technical terminal/tombstone state may persist only where recovery, uncertainty, idempotency or duplicate prevention requires it. After a terminal outcome, a later retry is a new External Interaction; a cancelled or dismissed interaction is never restored/reused.

For Repository Snapshot automatic handoff, destination and send intent are operation input rather than late post-export choices. The dialog exposes `Export only`, `Export + Attach`, and `Export + Attach + Send`; either automatic option requires an explicitly selected currently open ordinary conversation and freezes its `conversationKey` plus `autoSend`. The exact ZIP must succeed before an External Interaction is created. Snapshot never substitutes a later/current chat or mutates Review-chat binding. `Export only` retains the result dialog with path/copy/open-folder controls; automatic handoff suppresses that second modal. The fixed 10-minute confirmation deadline still bounds `Pending`/`Claimed`/`Preparing`; before auto-send may click, Java atomically establishes `SendArmed` while the Snapshot deadline is still live; definitive no-click returns to the original absolute deadline, while actual click advances to `SendClicked` and ordinary send uncertainty.

### `BI-RPKG-REVIEW-CHAT-BINDING`
Manual Review-chat selection remains an explicit binding method and persists with the ChangeSet. `OBS-ACTION/1` may additionally carry an optional `chatTabTitle` hint so the producer can request the same binding path without creating a parallel delivery mechanism.

During Prepare, both requested and inventory titles are normalized only by removing literal Unicode characters configured in the local `reviewChatTitleIgnoredCharacters` setting, then compared by exact case-sensitive equality. The setting defaults to empty, so literal matching remains the default; it is local application configuration and never enters `OBS-ACTION`. Zero or multiple matches never guess and are Output warnings with manual binding fallback. A unique match on an unbound ChangeSet becomes a prepared destination. A unique match equal to the current binding needs no prompt. A unique different destination requires explicit pre-Apply keep/rebind/cancel authority; rebind is unavailable when the existing bridge safety rule says composer preparation/Send is in progress.

Actual bind/rebind happens only after successful repository Apply and uses the already prepared `conversationKey` through the same `ChatBridgeService.bind(...)` path used by manual selection. Failed Apply leaves binding unchanged; post-Apply code does not rematch the title. The hint identifies a conversation inventory entry, not a physical duplicate browser tab; existing conversation-key / duplicate-tab claim serialization remains the delivery authority after binding.

Known accepted concurrency risk: the binding/stale guard is checked before mutation, not continuously through background Execute. A manual Bind/Unbind performed after Execute starts may therefore be overwritten by a previously authorized prepared rebind when Apply succeeds. This revision does not serialize those two user actions; users should not manually rebind while Apply Execute is active.

### `BI-RPKG-CURRENT-CHANGE-DELIVERY-PREPARATION`
Current-change delivery must prepare the intended ChatGPT composer without requiring foreground document focus, browser Clipboard API write permission or large rich-text editor insertion. Live practical evidence supersedes the earlier direct-text realization: every non-empty ReviewDiff is now prepared as an exact `.diff` attachment through the reusable browser attachment primitive, followed by verification that the exact file is visible and upload-ready.

Delivery state follows externally meaningful evidence:
- before confirmed `.diff` attachment preparation, failure is `FailedBeforeSend`;
- only after the exact attachment is visible/upload-ready may the interaction enter `Preparing`;
- failure after confirmed preparation but before the possible-Send phase is `PreparedUnsent`;
- technical `SendClicked` is projected as semantic `Sending`; while the same attachment remains prepared in the same exact conversation, guarded Send-control attempts may repeat at the interval captured for that interaction;
- after a possible Send, once the exact prepared attachment has left the composer, a new user turn after the preparation baseline is sufficient to confirm `Sent`; a turn-local file/attachment surface exposing the exact queued filename is stronger optional proof when ChatGPT exposes it, for either `.diff` or `.zip`; if the attachment disappears after a possible Send and no such post-baseline user turn is observed, result is `UnknownAfterSend` and automation stops.

There is no small/large ReviewDiff threshold: exact attachment delivery is the single path. ReviewDiff and Snapshot use the same generic attachment/optional-Send module; only artifact content type, Snapshot timeout staging, and whether `autoSend` is selected differ. The existing persisted retry setting is frozen into every auto-send task. Bridge protocol `4` validates the generic claimed-task contract before payload/composer mutation; stale app/extension pairs and malformed send fields are `FailedBeforeSend`, not post-Send uncertainty.

### `BI-RPKG-OPERATION-NOTIFICATION`
Track meaningful nontrivial user operations, including Apply, Finalize, Retry Push, explicit Reopen ChangeSet, Repository Snapshot export, ChatGPT handoff interactions and Change Repository Location. Terminal success always produces a simple Windows notification; failure/action-required always produces a notification with concise reason. Passive navigation and trivial Copy/Open actions are excluded.

Notification click opens/foregrounds the application and, when the result has a Repository Target, selects that exact repository context only. It does not auto-select a ChangeSet and never retries/mutates/finalizes.

### `BI-RPKG-TECHNICAL-DIAGNOSTICS`
Semantic result is concise and authoritative. Complete useful non-secret technical command/error detail is separately accessible in a clean copyable/PowerShell-friendly session diagnostic surface. Diagnostics never gate Apply/Finalize/Retry or become operation authority.

## Shared Requirements

- `REQ-RPKG-01` — no target-file mutation before all required package/repository/path/source-state preconditions pass.
- `REQ-RPKG-02` — unfinished path ownership is scoped by concrete Repository Target + repository-relative path.
- `REQ-RPKG-03` — independent work receives independent ChangeSet identity; `PACKAGE.json.changeSetId` is the exact continuation identity and UI selection/label/recency cannot substitute another ChangeSet.
- `REQ-RPKG-04` — user-visible inspection actions are not Finalize approval gates and no user SHA entry is required.
- `REQ-RPKG-05` — finalization commits only selected logical work and releases ownership only when truly Finalized.
- `REQ-RPKG-06` — successful local commit followed by publication failure preserves one recoverable Publication Pending logical work item.
- `REQ-RPKG-07` — repository snapshot export is read-only relative to repository work and does not become ledger/mutation authority.
- `REQ-RPKG-08` — Snapshot automatic handoff is an explicit initial choice: `Export + Attach` leaves the exact ZIP unsent, while `Export + Attach + Send` reuses the same generic guarded attachment+Send engine as ReviewDiff. Either mode selects and freezes one exact conversation before export starts, creates the handoff only after successful export, never substitutes a later/current chat, and never changes Review-chat binding state. One fixed 10-minute Snapshot confirmation deadline bounds `Pending`/`Claimed`/`Preparing` as `Cancelled` or `PreparedUnsent`; after `SendArmed`, the browser cannot race the Snapshot deadline; definitive no-click restores the original deadline and actual click advances to `SendClicked` / ordinary send uncertainty.
- `REQ-RPKG-09` — current-change delivery may repeat guarded Send-control attempts only while the same exact prepared attachment remains in the same interaction; after attachment disappearance/post-Send uncertainty it must stop and must not blindly resend.
- `REQ-RPKG-10` — real Swing/Windows/Edge/ChatGPT behavior requires manual practical evidence; automated bridge/component tests alone do not establish live-browser success.
- `REQ-RPKG-11` — Git-controlled representation differences must not cause false source-state mismatch, while true source change or unverifiable equivalence blocks before mutation.
- `REQ-RPKG-12` — Repository Target identity survives explicit repository-location change; all associated ChangeSets remain attached to that target.
- `REQ-RPKG-13` — ChangeSet context selection uses one selector with current-repository/global scope; global selection switches only to the exact registered Repository Target and never silently substitutes another clone for unavailable work.
- `REQ-RPKG-14` — External Interaction cancellation never implies automatic cleanup of already-prepared external content and never rewrites possible-send uncertainty.
- `REQ-RPKG-15` — tracked meaningful User Operations notify on terminal success/failure; notification navigation has no operation authority.
- `REQ-RPKG-16` — a compact latest ChangeSet-linked operation outcome survives restart for error-marker/reason presentation without requiring a generic persistent operation-history list.
- `REQ-RPKG-17` — baseline/ref-dependent operations report actionable Repository Not Ready when no first commit exists.
- `REQ-RPKG-18` — explicit Reopen may transition a selected Finalized ChangeSet back to Active without changing its identity/history, but only after exact-target revalidation and safe path-ownership/unowned-work checks; no implicit reopen is allowed.
- `REQ-RPKG-19` — current-change preparation must not require foreground/document focus, successful Clipboard API write or direct rich-text insertion; `Preparing` is reached only after the intended ReviewDiff `.diff` attachment is actually visible and upload-ready in the composer.
- `REQ-RPKG-20` — External Interactions terminal ordinary results do not accumulate in the user-facing list; an equivalent repeat while the current interaction is still actionable reuses that interaction identity, while a retry after terminal outcome creates a new identity. Unacknowledged `UnknownAfterSend` remains visible for attention, but a persisted Dismiss acknowledgement may remove only that working-list row without rewriting terminal truth.
- `REQ-RPKG-21` — ownership/adoptability failures identify exact path + Repository Target + applying ChangeSet and explicitly distinguish `Unowned` from a concrete owning unfinished ChangeSet.
- `REQ-RPKG-22` — ReviewDiff automatic Send retry interval is persisted application configuration (default 6 seconds, valid 1–60), captured per newly queued interaction/task and supplied to the extension; it is not a browser-extension timing constant.
- `REQ-RPKG-23` — Java ↔ extension task delivery uses an explicit compatible bridge protocol and validates all deterministic claimed-task/send prerequisites before external preparation; version/contract mismatch is `FailedBeforeSend` and must never be mislabeled `UnknownAfterSend`.
- `REQ-RPKG-24` — optional `OBS-ACTION.chatTabTitle` is resolved during prepared Apply into at most one concrete conversation identity; in interactive Swing Apply a unique different destination may rebind existing work only after explicit pre-mutation user authorization, actual bind/rebind occurs after successful repository Apply through the same persisted binding service as manual selection, and zero/ambiguous matches never guess. The non-interactive CLI keep-existing behavior is a documented accepted divergence rather than equivalent rebind authorization.
- `REQ-RPKG-25` — action-assisted title matching uses persisted local `reviewChatTitleIgnoredCharacters`: remove only those configured Unicode characters from requested/current titles, trim outer whitespace, then compare case-sensitively; empty default preserves literal matching and the setting is never producer/action authority.
- `REQ-RPKG-26` — heavyweight Swing operations (Apply Prepare/Execute, Refresh Review, Finalize/Retry Push and Repository Snapshot export) execute off the Event Dispatch Thread; Output/confirmation/UI rendering stays on EDT and one background application operation runs at a time.
- `REQ-RPKG-27` — visible Swing Output is session-scoped only by `changeSetId`; continuation/correction package attempts and asynchronous ChangeSet/Chat events append to that logical-work buffer, while archive path/name and `packageId` remain non-routing trace/package-verification metadata; no general Output history exists and unresolved/non-ChangeSet operations use transient `Operation` status.
- `REQ-RPKG-28` — background Refresh Review updates the captured ChangeSet's persisted Review state/Output without reassigning current Swing selection or selected Review/chat presentation; Review actions resolve latest persisted Review state when invoked.

## Current Implementation Divergences / Target Work

| ID | Current finding | Selected target | Priority / Slice |
|---|---|---|---|
| `P-RPKG-OWNERSHIP-SCOPE` | Core can conflict equal relative paths across different repositories. | Scope ownership by concrete Repository Target. | P0 / SL-01 |
| `P-RPKG-BASE-MISMATCH` | Current raw-byte base comparison false-fails Git-equivalent checkout representations. | Raw exact match or Git path-semantic equivalence; different/unverifiable source blocks. | P0 / SL-01 |
| `P-RPKG-MANUAL-PACKAGE-TARGETING` | Apply assumes repository context is selected first. | Package input passive; resolve concrete target on Apply. | P0 / SL-01 |
| `P-RPKG-BROWSER-ACCEPTANCE` | Bridge/state-machine tests do not prove live Edge/ChatGPT operation. | Manual practical evidence remains required. | P0 proof / SL-05,06,08 |
| `P-RPKG-UNBORN-LOW-LEVEL-ERROR` | Missing first commit can surface low-level HEAD/Git failure. | Repository Not Ready with initial-commit guidance when baseline/ref is required. | P1 / SL-01,04 |
| `P-RPKG-SPLIT-EXISTING-WORK-UI` | First implementation added a separate `Existing work` dialog; practical use showed this duplicates the existing ChangeSet selector and one unavailable target can abort the dialog. | One ChangeSet selector + `All repositories` + `Show history`; exact-target switch on selection; unavailable target is query state, not projection failure. | P0 practical correction / SL-07 |
| `P-RPKG-NO-REPOSITORY-LOCATION-EDIT` | Registered target path cannot be explicitly changed while preserving target identity/work. | Dedicated Change Repository Location action. | P1 behavior |
| `P-RPKG-BROWSER-UNFOCUSED-PREPARATION` | Clipboard preparation previously failed with `Document is not focused`; later direct-text practical tests showed small content could prepare while Send remained unreliable and large direct insertion could freeze the whole ChatGPT tab. | One exact `.diff` attachment path for all ReviewDiff sizes through the shared attachment primitive; confirm upload-ready before `Preparing`; configurable guarded MAIN-world Send attempts while the same attachment remains. | P0 practical correction / SL-06 |
| `P-RPKG-BRIDGE-VERSION-SKEW` | Live attachment test prepared the exact `.diff` but then surfaced `UnknownAfterSend · Invalid ReviewDiff send retry interval`, showing a deterministic Java↔extension contract mismatch can be discovered after the possible-Send boundary. | Explicit bridge protocol v4 + complete claimed-task preflight before payload/composer mutation; actionable mismatch is `FailedBeforeSend`; retry interval is carried prevalidated across `SendClicked`. | P0 practical correction / SL-06 |
| `P-RPKG-NO-UNIFIED-EXTENSION-INTERACTION-LIST` | Bridge tasks are implementation mechanics, not one user-facing interaction surface; terminal cancelled attempts can accumulate as useless list history. | Semantic current/actionable External Interaction list + truthful Cancel; ordinary terminal results leave the list and retries create new interactions. | P1 / SL-08 |
| `P-RPKG-NO-OPERATION-NOTIFICATIONS` | No Windows terminal-result notification layer. | Notify tracked operations on every terminal success/failure. | P1 / SL-09 |
| `P-RPKG-NO-DEDICATED-DIAGNOSTIC-SURFACE` | Existing Output/Copy is not the selected clean technical diagnostic surface. | Cross-Slice session diagnostic surface. | P1 behavior |
| `P-RPKG-NO-FINALIZED-REOPEN` | Current lifecycle treats Finalized as terminal in normal UI; no explicit recovery action returns the same logical ChangeSet to Active. | `Reopen ChangeSet` on explicitly selected Finalized history work, with exact-target + ownership/unowned-work safety guards. | P1 / SL-03 + SL-07 entry |

## Accepted Low-Frequency Implementation Risks

These are known implementation-hardening risks, not blockers for the current revision:

- `R-RPKG-SL01-PACKAGE-RE-READ` — current Apply realization may resolve target/work from one ZIP read and read the package again for actual Apply, including after explicit choice among same-identity Repository Targets. An externally replaced ZIP in that short interval could differ from the resolved input. Accepted for now; future hardening is one captured immutable/prepared Apply context or an exact package fingerprint recheck before mutation.
- `R-RPKG-SL06-POST-BASELINE-FOREIGN-TURN` — current weaker post-Send fallback compares user-turn count against the attachment-preparation baseline, not a click-specific baseline. In a rare same-conversation concurrency window, an unrelated user turn created after preparation but before this task's possible-Send click could already satisfy the count increase; if the prepared attachment later disappears after an ineffective/ambiguous click, that older unrelated turn could falsely satisfy the weak `Sent` fallback. Accepted for now as a known risk rather than a blocker. Future hardening is a per-click user-turn baseline captured immediately before the Java-authorized MAIN-world Send click, while retaining turn-local exact queued-filename attachment evidence as stronger proof when available. Because Snapshot auto-send now reuses this same confirmation module, this accepted fallback risk applies to every auto-send attachment task, not only ReviewDiff.

## Selected Engineering Direction / Proof Requirement

No product/UX question remains open in this revision.

Source-state equivalence implementation is selected to use Git's own path semantics rather than manual newline conversion. The target architecture should first accept raw equality, then use a binary-safe Git operation equivalent to `git hash-object --stdin --path=<repo-relative-path>` for expected and actual content and compare the resulting canonical blob identities. Failure to establish equivalence fails closed. Automated integration proof must cover `.gitattributes`, `core.autocrlf`, custom filters, binary content, dirty/manual changes and continuation ChangeSets before implementation is accepted.

## Current Conclusions

- Three user-world Scenarios define current target application meaning. The retired Find Existing Work draft is now shared navigation behavior, while explicit Finalized→Active Reopen remains a recovery branch inside Complete Repository Work rather than a separate Scenario.
- `Repository Work` remains the strong core aggregate candidate; `External Interaction` is a second strong integration aggregate candidate; `User Operation` remains Application process/outcome state.
- After this package, source/tests realize the corrected SL-06 attachment/configurable-send-retry behavior plus prior SL-07/08/09 work; live Edge practical evidence remains required before operational acceptance.
- Testing remains automated component/integration proof plus Manual Practical Testing; no full Swing/Edge browser E2E layer is selected.
