# Shared Implementation Capability — Exact ChatGPT Handoff

Status: active current Shared Implementation Capability owner for retained legacy/diagnostic handoff; Snapshot-related implementation is **Source/Evidence only** until Snapshot Evolution is realized.

## Responsibility

Provide one reusable implementation boundary for exact artifact attachment and guarded optional Send to one frozen ordinary ChatGPT conversation, while preserving truthful cancellation/failure/post-Send uncertainty.

This is an implementation owner, not Scenario behavior authority. Current semantic use is limited to retained legacy/diagnostic handoff. Existing Snapshot attachment/export mechanics demonstrate implementation feasibility but do **not** establish current Snapshot product semantics.

## Current behavior / implementation requirements realized

Current semantic consumer:
- `SL-RPKG-06 — Deliver Current Change To ChatGPT` where that legacy diagnostic path remains active.

Relevant legacy Behavior Items:
- `BI-RPKG-LEGACY-CURRENT-CHANGE-EXACT-ARTIFACT`
- `BI-RPKG-LEGACY-CURRENT-CHANGE-FROZEN-DESTINATION`
- `BI-RPKG-LEGACY-CURRENT-CHANGE-UNCERTAINTY-TRUTHFUL`
- `BI-RPKG-LEGACY-BROWSER-DOES-NOT-AUTHORIZE-REPOSITORY`

## Snapshot implementation Evidence

Existing code/tests may already contain exact-artifact, frozen-destination and delivery-failure mechanics previously used for Repository Snapshot handoff. Treat those mechanics as implementation Evidence / reuse candidates for [`EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW`](../evolution-steps/EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW.md), not as current `BI-RPKG-SNAPSHOT-*` authority and not as a current `SL-RPKG-05` consumer. Exact realization may KEEP / MODIFY / REPLACE them after the Step target is complete enough.

## Domain used

External Interaction plus the immutable exact source/artifact identity supplied by the consuming current Slice. Future Snapshot use must be revalidated from the Snapshot Step.

## Implementation Items

### SHI-RPKG-HANDOFF-EXACT-SOURCE — Revalidate exact source before composer mutation
Requirement:
The shared handoff engine must verify the task-specific source identity/fingerprint used for attachment before it mutates the ChatGPT composer.

### SHI-RPKG-HANDOFF-DESTINATION-IMMUTABLE — Prepared destination is frozen
Requirement:
Once the shared handoff task is prepared for one conversation, later tab/navigation changes must not silently retarget it.

### SHI-RPKG-HANDOFF-GUARDED-SEND — Establish a possible-Send boundary
Requirement:
Automatic Send must verify exact destination, clean/safe composer state and upload-ready exact attachment, obtain Java-owned Send authorization before the first application-controlled click, and preserve uncertainty after a click may have happened.

### SHI-RPKG-HANDOFF-RUNTIME-FENCING — Stale agents cannot act as current task authority
Requirement:
Bridge/extension agents from an obsolete runtime generation or instance must not claim or execute current delivery work.

## Tests / Evidence

The former `ChatBridgeTests` source is preserved under `legacy/tests/` as historical evidence only and is not current passing regression proof. Current executable evidence is limited to tests compiled by `build.cmd` plus the browser-adapter tests and current source/contracts. A passing Snapshot-related test proves code behavior only; it does not materialize Snapshot Feature/Scenario/Slice semantics.

## Evolution Impact

- [`EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW`](../evolution-steps/EVO-RPKG-INTRODUCE-REPOSITORY-SNAPSHOT-WORKFLOW.md) may reuse this capability after its exact Snapshot target/owners are resolved.
- Legacy Current Change delivery may reduce or retire independently without converting Snapshot Evidence into current semantics.
