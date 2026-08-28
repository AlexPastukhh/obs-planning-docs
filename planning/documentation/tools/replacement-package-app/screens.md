# Replacement Package App — Screens / Visual Meaning

Status: current + selected target spatial owner; target controls may be unimplemented
Profile: Modular / Medium SDS

Scenario behavior remains owned by [`scenarios/`](scenarios/). This file owns spatial/presentation meaning and explicitly distinguishes current implementation from selected target UI.

## `SCR-RPKG-MAIN` — Main Work Surface

**Scenario coverage:** all three current target Scenarios.

### Current implementation areas

- Repository selector + Add/Remove/Export;
- repository identity;
- Archive ZIP + OBS-ACTION input;
- separate `Apply` and `Apply (wait for ZIP)` actions; ordinary Apply prepares immediately, while the wait action only retries missing-package Prepare for up to 12 seconds at 2-second cadence before entering the same decision/Execute path;
- Apply with asynchronous Prepare → optional decision → Execute stages; heavy Git/ZIP/filesystem work stays off EDT;
- linked Repository + ChangeSet selectors with local/global (`All repositories`) and history scope + status/ID;
- Review state + Refresh/Copy/Open;
- Review chat binding/delivery + `Review send retry [n] seconds` (1–60, default 6) + `Review title ignores [characters]` (empty default, literal Unicode character set) settings;
- commit message + Finalize/Retry Push;
- transient `Operation` status for work that has no authoritative ChangeSet yet (or is repository/settings/launcher scoped);
- ChangeSet-scoped session Output + Copy output;
- bridge/launcher status/actions.

### Selected target additions

- explicit `Change repository location` action next to registered repository management;
- `Reopen ChangeSet` recovery action shown only when `Show History` is enabled and the selected ChangeSet is Finalized;
- exact current Repository Target + current ChangeSet context after work selection;
- passive package/action context separated visually from Apply authority;
- small context message when Apply resolves/auto-selects another repository, e.g. `✓ Repository selected: <name>`; it means context changed, not Apply succeeded;
- prepare diagnostics such as no/ambiguous `chatTabTitle` match appear in Output rather than forcing a modal; confirmation dialog appears only when a unique action destination conflicts with an existing Review-chat binding and requires `Apply without rebind` / `Apply and rebind` / `Cancel`;
- Output follows the selected ChangeSet: changing the ChangeSet selector restores that work's session Output; packages for the same ChangeSet append attempts there, and output for another ChangeSet never replaces/mixes it merely because archive filename/path/package changes. There is no general Output history; unresolved/non-ChangeSet progress is shown in the transient `Operation` field;
- a completed background Refresh remains owned by the ChangeSet captured when Refresh started and never silently changes the current ChangeSet selector or selected Review/chat presentation after the user navigates elsewhere;
- compact latest operation error marker + concise reason for unfinished (Active/Publication Pending) work; Finalized history carries no persistent error marker;
- common External Interactions list/entry;
- separate technical diagnostics surface;
- tracked-operation result presentation consistent with Windows notifications.

### Visual Requirements

- `VR-RPKG-MAIN-01` — before mutation, exact concrete Repository Target and package/action context are identifiable, while passive package input does not imply repository/apply authority.
- `VR-RPKG-MAIN-02` — Active, Publication Pending and Finalized lifecycle remain distinguishable without SHA interpretation.
- `VR-RPKG-MAIN-03` — latest operation failure/error marker is visibly separate from lifecycle for unfinished work; failed Reopen remains Finalized and is communicated by notification/result/diagnostics rather than a persistent history-row marker.
- `VR-RPKG-MAIN-04` — Current Change availability/staleness is visible independently from Copy/Open.
- `VR-RPKG-MAIN-05` — failures expose separate complete technical diagnostics; raw Output is not the only semantic result surface.
- `VR-RPKG-MAIN-06` — repository work state and External Interaction state are visually distinct; browser delivery never looks like Finalize authority.
- `VR-RPKG-MAIN-07` — Repository Not Ready/source-changed/source-unverifiable are actionable product results, not raw Git exception text.
- `VR-RPKG-MAIN-08` — heavyweight Apply/Refresh/Finalize/Snapshot work never freezes the Swing Event Dispatch Thread; progress/result Output can repaint while background work runs.
- `VR-RPKG-MAIN-09` — Review-chat title matching policy is editable as a normal application setting, and a rebind confirmation identifies both current and requested conversations before any repository mutation.
- `VR-RPKG-MAIN-10` — the visible Output surface is labeled/contextualized by the selected ChangeSet semantics: selection switches session buffers, same-ChangeSet Apply attempts accumulate, and late asynchronous events from another ChangeSet remain outside the current text surface; no generic Output buffer is shown.
- `VR-RPKG-MAIN-11` — transient non-ChangeSet progress/errors use `Operation`, and background Refresh completion cannot change the user's current ChangeSet selection or selected Review/chat presentation.
- `VR-RPKG-MAIN-12` — `Apply (wait for ZIP)` is visibly a separate convenience action from ordinary `Apply`; it freezes the current package/action/repository inputs, waits only for `PACKAGE_NOT_FOUND`, and never suggests that polling weakens or replaces normal Apply validation.

## ChangeSet Selector Scope — part of `SCR-RPKG-MAIN`

There is no separate `Existing work` button/dialog. `Repository` and `ChangeSet` are linked current-context selectors on the main screen.

```text
ChangeSet [ <Repository> · <work> ▼ ]
          [ ] All repositories  [ ] Show history
```

- every row begins with its Repository Target display name, including repository-scoped and global views;
- default: unfinished ChangeSets for the selected Repository Target;
- `All repositories`: same selector expands to unfinished ChangeSets across registered targets;
- `All repositories` and `Show history` controls are placed directly below the selector so the selector keeps the full available row width;
- `Show history`: adds Finalized within the current scope;
- selecting a global row switches `Repository` only to that row's exact registered target;
- unavailable target is shown truthfully in the projection and never substituted by a same-origin clone;
- selection alone performs no lifecycle/Git/browser operation.

## `SCR-RPKG-REPOSITORY-MANAGEMENT` — Registered Repository Context

Repository target management exposes Add/Remove plus explicit `Change repository location`.

Location change UI must make clear that:
- it updates the selected registered Repository Target rather than creating/rebinding individual ChangeSets;
- new path must be a Git work tree with matching Repository Identity/origin;
- all ChangeSets remain associated with the same Target ID;
- automatic clone substitution is not performed.

## `SCR-RPKG-EXPORT-SNAPSHOT` — Repository Snapshot Export Dialog

**Scenario:** provide repository context for further work.

Must make visible:
- selected exact Repository Target;
- Local vs Committed mode;
- commit/ref only when relevant;
- destination directory;
- one currently open ordinary ChatGPT conversation selector used by either automatic ChatGPT handoff path;
- three explicit actions: `Export only`, `Export + Attach`, and `Export + Attach + Send` (plus Cancel), with no separate attach toggle;
- Repository Not Ready reason when no required commit baseline exists;
- for `Export only`, a post-export result dialog with artifact path / Copy path / Open folder; for either automatic ChatGPT handoff, no second result modal and downstream state is reported through Operation / External Interactions / notification.

For either `Export + Attach` or `Export + Attach + Send`, the selected conversation is chosen before export begins and its exact `conversationKey` plus send intent are frozen for this operation. The later export completion must not reopen chat selection, read another current chat, substitute a different conversation or alter the ChangeSet Review-chat binding. The snapshot is created first. If enqueue immediately knows the frozen conversation is unavailable, report successful snapshot creation plus handoff-not-started status without showing the export-only path modal. If a task was queued but never reaches its selected terminal handoff result, its 10-minute Snapshot confirmation window bounds `Pending`/`Claimed`/`Preparing` as `Cancelled` before confirmed preparation or `PreparedUnsent` after preparation began. Once auto-send crosses the possible-Send boundary into `SendClicked`, the Snapshot deadline no longer governs and ordinary `Sent` / `UnknownAfterSend` truth applies. `Export only` remains usable without any open ChatGPT conversation and retains the path/copy/open-folder result dialog.

`Local` and `Committed` semantics are not presentation-only choices; labels must remain consistent with `REPOSITORY-SNAPSHOT.md`.

## `SCR-RPKG-EXTERNAL-INTERACTIONS` — ChatGPT Handoffs

**Scenario coverage:** provide current change; provide repository context.

One target list contains only user-significant payload-to-conversation attempts:
- Deliver Current Change;
- Attach Repository Snapshot / Send Repository Snapshot;
- future equivalent explicit payload handoffs.

It excludes pairing/heartbeat/poll/claim/lease/tab mechanics.

The selector gets the full available row width. `Refresh interactions`, `Cancel interaction` and `Dismiss interaction` are placed on the row directly below it so long interaction text cannot push the actions off-screen.

Each row exposes kind, source/work context, destination conversation, semantic state/result and Cancel only when truthful. The list is a current/actionable/attention projection: active/cancellable work, active `Sending`, plus unacknowledged `UnknownAfterSend` (or equivalent uncertainty requiring attention). One equivalent still-actionable payload-to-conversation request is represented by one interaction identity: repeating the same current ReviewDiff request or the same snapshot artifact + destination + frozen attach-only/auto-send intent while it is `Pending`/claimed/preparing/sending reuses the existing interaction rather than adding an indistinguishable Pending row. Attach-only and attach+Send for the same Snapshot are different intents and therefore different interactions. A materially different source remains independent. `Sending` may include repeated internal Send-control attempts for the same exact prepared auto-send attachment; these are not separate interaction rows. Ordinary terminal `Cancelled`, `Sent`, `Attached`, `NoChanges`, `FailedBeforeSend` and `PreparedUnsent` rows disappear after their result is surfaced through Output/notification. `UnknownAfterSend` cannot be cancelled or rewritten, but `Dismiss interaction` acknowledges that terminal attention item and removes only its working-list row while persisted truth remains. For prepared-unsent content, Cancel may report `Cancelled — prepared content retained` before the row leaves the list; no UI promise of automatic cleanup is made. A later retry after terminal outcome appears as a new interaction rather than restoring the old row.

## `SCR-RPKG-DIAGNOSTICS` — Technical Diagnostics

Cross-Slice support surface for complete useful non-secret technical output:
- clean text/PowerShell-friendly copy;
- semantic error/result remains visible separately;
- secrets/tokens are protected;
- diagnostics never gate Apply/Finalize/Retry or become approval authority.

## `SCR-RPKG-BRIDGE-OPTIONS` — Companion Pairing / Connection

Supporting extension setup surface for pairing/connection checks. Pairing token handling is technical integration behavior, not a Scenario or External Interaction entry.

## Windows Notification Surface

For tracked meaningful User Operations, terminal success always emits a simple Windows notification and terminal failure/action-required emits one with concise reason.

Click behavior:

```text
open/foreground application
→ if exact Repository Target is known, select that Repository Target
→ do not auto-select ChangeSet
→ do not retry/apply/finalize/send
```

## External Surface Boundary

The ordinary ChatGPT composer is external. Observable requirements remain:
- exact intended payload/destination;
- no mixing with unrelated existing composer content;
- Snapshot `Export + Attach` stops at `Attached`; `Export + Attach + Send` uses the same guarded Send engine as ReviewDiff;
- Cancel after prepared content does not delete it automatically and prevents further automation while cancellation is still truthful;
- ReviewDiff may repeat guarded Send-control attempts only while the same exact prepared attachment remains in the same conversation; after a possible Send, prepared-attachment departure plus a new post-baseline user turn confirms `Sent`, while absence of such a turn preserves `UnknownAfterSend` and stops blind retry;
- ReviewDiff and Snapshot reuse one generic exact-attachment module; auto-send tasks additionally reuse one generic guarded Send/confirmation module with exact-filename proof;
