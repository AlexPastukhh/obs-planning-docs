# Replacement Package App — Screens / Visual Meaning

Status: supporting spatial owner / current implementation-aligned
Profile: Modular / Medium SDS

Scenario behavior remains owned by [`scenarios/`](scenarios/). This file owns only spatial/presentation meaning useful across Scenarios.

## `SCR-RPKG-MAIN` — Main Work Surface

**Scenario coverage:**
- complete prepared repository work;
- provide current change to ChatGPT;
- entry to repository-context export.

**Current implementation areas:**
- Repository selector + Add/Remove/Export;
- repository identity;
- Archive ZIP + OBS-ACTION input;
- Apply;
- ChangeSet selector/history + status/ID;
- Review state + Refresh/Copy/Open;
- Review chat binding/delivery;
- commit message + Finalize/Retry Push;
- Output + Copy output;
- bridge/launcher status/actions.

### Visual Requirements

- `VR-RPKG-MAIN-01` — before mutation, the user can identify the current concrete repository target and package/action context together.
- `VR-RPKG-MAIN-02` — active, publication-pending and finalized work states are distinguishable without requiring SHA interpretation.
- `VR-RPKG-MAIN-03` — current-change availability/staleness is visible independently from whether the diff was opened/copied.
- `VR-RPKG-MAIN-04` — a failure requiring user action exposes a route to complete technical diagnostics; the semantic work state is not hidden inside raw Output only.
- `VR-RPKG-MAIN-05` — browser delivery state is visually downstream from repository-work state and must not look like Finalize authority.

## `SCR-RPKG-EXPORT-SNAPSHOT` — Repository Snapshot Export Dialog

**Scenario:** provide repository context for further work.

Must make visible:
- selected repository;
- Local vs Committed mode;
- commit/ref only when relevant;
- destination directory;
- result artifact path/outcome.

`Local` and `Committed` semantics are not presentation-only choices; labels must remain consistent with `REPOSITORY-SNAPSHOT.md`.

## `SCR-RPKG-ATTACH-SNAPSHOT` — Snapshot Chat Destination

**Scenario:** provide repository context for further work.

Must make the selected ordinary ChatGPT conversation explicit before queueing the attach-only handoff. The surface must not imply that attachment will send the message.

## `SCR-RPKG-BRIDGE-OPTIONS` — Companion Pairing / Connection

Supporting external-extension surface for one-time pairing/connection checks. Pairing token handling is technical integration behavior, not a Scenario.

## External Surface Boundary

The ordinary ChatGPT composer is an external surface, not a Screen owned by this application. The application nevertheless has observable requirements over its interaction:
- exact intended payload;
- no mixing with unrelated existing composer content;
- snapshot attach-only never clicks Send;
- uncertain current-change send is not blindly repeated.
