# SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT — Provide Repository Context For Further Work

Status: active current Scenario owner with selected planned evolution

The current implementation still contains in-application Snapshot Attach / Attach+Send compatibility. The selected target behavior below removes that handoff from this Scenario; documenting the target is not evidence that the implementation migration has already happened.

## Application Benefit / Desired Result

Create a trustworthy portable representation of one exact registered repository state and expose one exact future Snapshot path early enough that an independent consumer can begin waiting for that artifact before Snapshot materialization completes, without changing repository work.

The Replacement Package App target stops at the exact artifact/path boundary. It does not attach or send the Snapshot to ChatGPT. An external consumer may use the copied path to wait for the file and later attach/send it elsewhere; such automation is outside this Scenario.

## Current compatibility boundary

Current Snapshot exactness/read-only behavior remains authoritative until implementation migration. Existing built-in ChatGPT attachment/send controls are compatibility behavior to retire, not selected target behavior.

## Selected target Process Specification

### Scenario Process / Feature Interaction Map

```text
user starts Snapshot export
↓
FI-RPKG-ALLOCATE-SNAPSHOT-DESTINATION
↓
exact future path selected
↓
exact path copied to clipboard
↓
FI-RPKG-MATERIALIZE-REPOSITORY-CONTEXT starts
↓
"Snapshot path copied / creation started" notification
↓
capture/materialization continues
├─ exact Snapshot published at announced path → completion
└─ capture/publication failure → explicit failure; announced path is not silently changed
```

There is no selected target `Attach` / `Attach+Send` branch and no post-export path-copy dialog.

### FI-RPKG-ALLOCATE-SNAPSHOT-DESTINATION — Establish exact future Snapshot path

Scenario Role / Local Purpose:
Expose one exact future artifact location before the potentially long Snapshot capture starts, so the user or an independent external consumer can begin waiting for that exact file immediately.

Context / Preconditions:
One registered Repository Target, Snapshot mode (`Local` or `Committed`) and the configured Snapshot output directory are known.

Required Inputs:
Exact Repository Target, mode/source selection and output directory.

Interaction Process:
Before Snapshot capture begins, the application selects a new collision-resistant Snapshot filename/path, proves that the exact candidate path is not already occupied, and retries candidate selection when an exact-name collision is detected. Once one path is selected, the application copies that exact future path to the clipboard, starts Snapshot materialization, and reports that the path was copied and creation has started while materialization continues asynchronously from the user's perspective.

The selected target does not require the Snapshot file to exist at clipboard-copy time. The copied value is a promised destination for this operation, not a claim that creation has already completed.

Outcomes:
- exact unoccupied future path selected and copied → continue to materialization;
- candidate collision → select another candidate before exposing a path;
- output destination/path cannot be established safely → fail before announcing a future path.

Result:
One exact future Snapshot path is announced and available in the clipboard for this operation.

Outputs:
Exact announced Snapshot path and start notification.

Next Interactions:
`FI-RPKG-MATERIALIZE-REPOSITORY-CONTEXT`.

Behavior Items:

#### BI-RPKG-SNAPSHOT-FUTURE-PATH-BEFORE-CAPTURE — Future path is known before Snapshot capture
Requirement:
A successful Snapshot start must establish the exact future artifact path before the long-running capture/materialization work begins.

Reason:
An independent consumer must be able to begin waiting for the exact artifact without waiting for Snapshot completion first.

#### BI-RPKG-SNAPSHOT-FUTURE-PATH-NONCOLLIDING — Do not announce an already occupied path
Requirement:
Before exposing a candidate Snapshot path, the application must prove that the exact candidate filename/path is not already occupied; an exact-name collision must cause a new candidate to be selected rather than reusing or overwriting the existing path.

Reason:
The copied path must identify only this Snapshot operation and must not alias an older artifact.

#### BI-RPKG-SNAPSHOT-ANNOUNCED-PATH-IMMUTABLE — Announced path cannot silently change
Requirement:
After the exact future Snapshot path has been copied/announced, successful publication must use that same path. A later collision or publication problem must fail explicitly rather than silently choosing a different filename.

Reason:
An external waiter may already be watching the announced path.

#### BI-RPKG-SNAPSHOT-PATH-COPIED-ON-START — Copy exact path before capture continues
Requirement:
Once the future path is safely selected, the application must place that exact path in the clipboard, start Snapshot creation, and then notify the user that the path was copied and creation has started while the operation continues.

Reason:
The path itself is the early handoff result needed before the artifact exists.

#### BI-RPKG-SNAPSHOT-PATH-ANNOUNCEMENT-NOT-COMPLETION — Copied path does not claim file existence
Requirement:
Copying/announcing the future Snapshot path must not be represented as Snapshot completion; creation may still be in progress or may later fail.

Reason:
The external consumer is expected to wait for the file to appear at the announced path.

### FI-RPKG-MATERIALIZE-REPOSITORY-CONTEXT — Materialize exact Repository Snapshot

Scenario Role / Local Purpose:
Produce the exact portable repository-context artifact at the already-announced path without changing repository work.

Context / Preconditions:
One exact future Snapshot path has been announced and the exact Local or Committed source selection is known.

Required Inputs:
Exact Repository Target, exact mode/source selection and exact announced output path.

Interaction Process:
The application revalidates target identity/readiness, freezes one exact Local or Committed source identity and builds the Snapshot ZIP. Local capture must represent one stable selected repository state; Committed capture must represent one immutable selected commit. Snapshot creation does not mutate repository work.

Successful publication must create the Snapshot at exactly the announced path without overwriting another artifact. The application must not change the filename/path after announcement.

Outcomes:
- exact Snapshot published at the announced path;
- Repository Not Ready / unsupported entry / unstable source / confinement/publication failure → explicit failure, no misleading final ZIP and no alternate silently chosen path.

Result:
One exact Repository Snapshot artifact exists at the previously announced path, or creation failed truthfully without changing repository work.

Outputs:
Snapshot ZIP at the announced path and exact source metadata.

Next Interactions:
Scenario terminates with success/failure notification. There is no target post-export path-copy window and no in-application ChatGPT attachment/send step.

Behavior Items:

#### BI-RPKG-SNAPSHOT-READ-ONLY — Snapshot export is repository-read-only
Requirement:
Snapshot export must not mutate ChangeSet, ownership, index, checkout, commit or publication state.

Reason:
Repository context is an observation artifact, not repository work.

#### BI-RPKG-SNAPSHOT-EXACT-SOURCE — Snapshot identifies one exact source
Requirement:
The produced Snapshot must be derived from one exact selected Local or Committed source identity and must not silently substitute another repository/ref/state.

Reason:
A portable context is useful only if its provenance is trustworthy.

#### BI-RPKG-SNAPSHOT-NO-MIXED-CAPTURE — Local Snapshot must not mix moving source states
Requirement:
If the Local source changes such that one stable capture cannot be proven, export must fail rather than publish a ZIP containing a mixture of different repository states.

Reason:
A self-inconsistent context artifact cannot be treated as one repository state.

#### BI-RPKG-SNAPSHOT-SUCCESS-AT-ANNOUNCED-PATH — Successful Snapshot appears at the copied path
Requirement:
A successful Snapshot operation must publish the exact artifact at the same exact path that was copied before capture.

Reason:
The announced path is the external waiting contract for this operation.

#### BI-RPKG-SNAPSHOT-NO-POST-EXPORT-COPY-STEP — No completion dialog is required to obtain the path
Requirement:
The selected target must not require a post-export window/dialog whose purpose is to let the user copy the Snapshot path; that path was already delivered at operation start.

Reason:
Waiting for completion before learning the path defeats the external-waiter use case and adds an unnecessary interaction.

#### BI-RPKG-SNAPSHOT-APP-STOPS-AT-PATH-BOUNDARY — App does not attach/send Snapshot in the target flow
Requirement:
After Snapshot creation starts and the future path is copied, Replacement Package App must not make ChatGPT attachment/send a required or selected target step of this Scenario.

Reason:
The exact pre-announced path is sufficient for an independent external consumer to wait for and handle the artifact.

## Why This Interaction Design

The future artifact path is exposed before materialization so an independent external consumer may begin waiting for that exact file before export completes. One intended example is a separate script that accepts the copied path, polls/waits for the file to appear, and then attaches/sends it to ChatGPT. That script, its polling strategy and ChatGPT automation are outside this Scenario and do not create Replacement Package App authority.

## Screen references

Current selected Screen owner remains [`../screens.md`](../screens.md). The selected target specifically removes the need for a post-export copy-path dialog and in-application Snapshot Attach/Attach+Send controls; exact future spatial changes remain Screen-owned.

## Realization Dependencies / Questions / Candidates

These entries record Scenario-relevant feasibility only and do not select implementation ownership.

### Pre-announced path can be published without overwrite/collision races
Relevant Scenario / FI behavior:
`FI-RPKG-ALLOCATE-SNAPSHOT-DESTINATION`, `BI-RPKG-SNAPSHOT-FUTURE-PATH-NONCOLLIDING`, `BI-RPKG-SNAPSHOT-ANNOUNCED-PATH-IMMUTABLE`.

Dependency / Question:
How can the application safely announce one exact future path and later publish only to that path without overwriting an existing file or silently switching names if filesystem state changes?

Current assumption / candidate realization:
Use a high-entropy generated identifier in the Snapshot filename, check exact candidate absence before announcement and regenerate on collision, then use fail-closed/create-new final publication semantics. Exact identifier format, reservation/publication mechanism and implementation owner remain downstream HOW.

Investigate during:
Snapshot implementation Requirements Discovery + filesystem publication Proof Requirements Discovery.

Scenario impact if invalidated:
The early path-handoff contract would need a stronger reservation/ownership boundary before the path can be copied.

## Evolution Steps

<a id="evo-rpkg-preannounce-snapshot-path-and-remove-inapp-handoff"></a>
### EVO-RPKG-PREANNOUNCE-SNAPSHOT-PATH-AND-REMOVE-INAPP-HANDOFF — Move Snapshot handoff to exact future path
Intent: PLANNED

Change:
Allocate one collision-resistant exact future Snapshot path before capture, copy it to the clipboard, notify that creation started, publish success only at that exact path, remove the post-export path-copy dialog, and retire in-application Snapshot ChatGPT Attach/Attach+Send from the selected Scenario.

Scenario Process / Feature Interaction impact:
Current built-in Snapshot delivery compatibility is replaced by an early exact-path boundary. External automation may consume that path but remains outside Replacement Package App Scenario behavior.
