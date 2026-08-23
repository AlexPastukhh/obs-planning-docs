# Replacement Package App — Screens / Visual Meaning

Status: current + selected target spatial owner; target controls may be unimplemented
Profile: Modular / Medium SDS

Scenario behavior remains owned by [`scenarios/`](scenarios/). This file owns spatial/presentation meaning and explicitly distinguishes current implementation from selected target UI.

## `SCR-RPKG-MAIN` — Main Work Surface

**Scenario coverage:** all four target Scenarios.

### Current implementation areas

- Repository selector + Add/Remove/Export;
- repository identity;
- Archive ZIP + OBS-ACTION input;
- Apply;
- repository-filtered ChangeSet selector/history + status/ID;
- Review state + Refresh/Copy/Open;
- Review chat binding/delivery;
- commit message + Finalize/Retry Push;
- Output + Copy output;
- bridge/launcher status/actions.

### Selected target additions

- explicit `Change repository location` action next to registered repository management;
- repository-independent Existing Work entry/list;
- `Reopen ChangeSet` recovery action shown only when `Show History` is enabled and the selected ChangeSet is Finalized;
- exact current Repository Target + current ChangeSet context after work selection;
- passive package/action context separated visually from Apply authority;
- small context message when Apply resolves/auto-selects another repository, e.g. `✓ Repository selected: <name>`; it means context changed, not Apply succeeded;
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

## `SCR-RPKG-GLOBAL-WORK` — Existing Work

**Scenario:** find and open existing repository work.

Target list behavior:

```text
default:
- Active
- Publication Pending

Show History:
+ all Finalized

unfinished ordering:
1. error-marked unfinished first
2. then most recently active
```

Each row makes work label, concrete repository name/target and lifecycle distinguishable. Active/Publication Pending rows may also show the latest failure marker/reason. Finalized history rows do not carry a persistent error marker. Selecting a row selects the exact Repository Target + ChangeSet. An unavailable target stays visible and is not silently replaced by another clone.

When `Show History` is enabled and the selected row is Finalized, show an explicit `Reopen ChangeSet` action near the ChangeSet controls. The button is absent/disabled for Active or Publication Pending work and when Finalized history is not selected. Clicking it starts a separate guarded recovery operation; merely selecting the row never changes lifecycle.

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
- Repository Not Ready reason when no required commit baseline exists;
- result artifact path/outcome.

`Local` and `Committed` semantics are not presentation-only choices; labels must remain consistent with `REPOSITORY-SNAPSHOT.md`.

## `SCR-RPKG-EXTERNAL-INTERACTIONS` — ChatGPT Handoffs

**Scenario coverage:** provide current change; provide repository context.

One target list contains only user-significant payload-to-conversation attempts:
- Deliver Current Change;
- Attach Repository Snapshot;
- future equivalent explicit payload handoffs.

It excludes pairing/heartbeat/poll/claim/lease/tab mechanics.

Each row exposes kind, source/work context, destination conversation, semantic state/result and Cancel only when truthful. For prepared-unsent content, target presentation is explicitly `Cancelled — prepared content retained`; no UI promise of automatic cleanup is made. Current-session terminal history remains visible; ordinary completed success history need not persist across restart.

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
- snapshot attach-only never clicks Send;
- Cancel after prepared content does not delete it automatically and prevents further automation while cancellation is still truthful;
- possible-send uncertainty is not rewritten or blindly retried.
