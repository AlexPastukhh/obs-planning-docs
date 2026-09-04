# SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT — Provide Repository Context For Further Work

Status: active current Scenario owner

## Application Benefit / Desired Result

Create a trustworthy portable representation of one exact registered repository state and, when useful, make that exact artifact available in one intended ordinary ChatGPT conversation without changing repository work.

## Process Specification

### Scenario Process / Feature Interaction Map

```text
FI-RPKG-MATERIALIZE-REPOSITORY-CONTEXT
├─ Export only → terminal exact Snapshot
└─ Attach / Attach+Send
     ↓
   FI-RPKG-DELIVER-REPOSITORY-CONTEXT
```

### FI-RPKG-MATERIALIZE-REPOSITORY-CONTEXT — Materialize exact Repository Snapshot

Scenario Role / Local Purpose:
Produce the exact portable repository-context artifact independently of any downstream browser result.

Context / Preconditions:
One registered Repository Target and Snapshot mode (`Local` or `Committed`) are selected.

Required Inputs:
Exact Repository Target, exact mode/source selection and output location.

Interaction Process:
The application revalidates target identity/readiness, freezes one exact Local or Committed source identity and builds the Snapshot ZIP. Local capture must represent one stable selected repository state; Committed capture must represent one immutable selected commit. Snapshot creation does not mutate repository work.

Outcomes:
- exact Snapshot published to a unique output path;
- Repository Not Ready / unsupported entry / unstable source / confinement failure → no misleading final ZIP.

Result:
One exact Repository Snapshot artifact exists or export has failed without changing repository work.

Outputs:
Snapshot ZIP, path and exact source metadata.

Next Interactions:
Export-only → terminal. Attach/Attach+Send → `FI-RPKG-DELIVER-REPOSITORY-CONTEXT`.

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

### FI-RPKG-DELIVER-REPOSITORY-CONTEXT — Deliver exact Snapshot to one conversation

Scenario Role / Local Purpose:
Optionally make the already-created exact Snapshot available in the conversation selected for this export while keeping browser truth separate from repository/Snapshot truth.

Context / Preconditions:
Snapshot export succeeded and Attach or Attach+Send was selected before export.

Required Inputs:
Exact Snapshot artifact, frozen `conversationKey`, frozen attach/send mode.

Interaction Process:
Only after exact ZIP creation does the application attempt the selected Attach or Attach+Send interaction for the frozen artifact/destination/mode. Attach-only ends at confirmed `Attached`; Attach+Send preserves the distinction between failure before a possible Send and uncertainty after Send may have occurred. Snapshot delivery never changes the persisted Review-chat binding.

Outcomes:
- Attached / Sent / NoChanges-equivalent terminal result where applicable;
- FailedBeforeSend / PreparedUnsent / Cancelled;
- `UnknownAfterSend` when Send may have happened but cannot be proven.

Result:
The exact Snapshot is delivered to the frozen destination, or delivery truth remains explicit without invalidating the successful export.

Outputs:
External Interaction terminal/attention state.

Next Interactions:
Scenario terminates; retry after terminal outcome is a new interaction identity.

Behavior Items:

#### BI-RPKG-SNAPSHOT-HANDOFF-EXACT-ARTIFACT — Deliver the exact exported artifact
Requirement:
Automatic handoff must attach the exact Snapshot bytes/fingerprint produced by this operation, not a later or similarly named artifact.

Reason:
The conversation must receive the same repository context artifact whose successful export the application reported.

#### BI-RPKG-SNAPSHOT-HANDOFF-FROZEN-DESTINATION — Do not retarget Snapshot handoff
Requirement:
Automatic Snapshot delivery must remain bound to the exact conversation and attach/send intent frozen with the export operation.

Reason:
Snapshot intent is captured with one conversation and must not follow later UI/browser movement.

#### BI-RPKG-SNAPSHOT-DELIVERY-DOES-NOT-CHANGE-REVIEW-BINDING — Snapshot destination is not Review-chat binding
Requirement:
Snapshot delivery must not create, replace or reinterpret the ChangeSet's Review-chat binding.

Reason:
Repository-context sharing and ChangeSet review destination are separate user intents.

#### BI-RPKG-SNAPSHOT-DELIVERY-FAILURE-DOES-NOT-INVALIDATE-EXPORT — Browser failure does not erase Snapshot success
Requirement:
Failure, cancellation or uncertainty in ChatGPT handoff must not rewrite a successfully created Snapshot as if export failed.

Reason:
The Snapshot artifact already exists independently of whether a browser interaction later succeeds.

## Screen references

The Snapshot dialog and handoff-related current screen rules are documented in [`../screens.md`](../screens.md).

## Evolution Steps

No selected application-behavior Evolution Step currently changes the core Snapshot benefit. Shared handoff implementation may evolve while these BIs remain stable.
