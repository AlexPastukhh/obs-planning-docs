# Shared Implementation Capability — Exact ChatGPT Handoff

Status: active current Shared Implementation Capability owner

## Responsibility

Provide one reusable implementation boundary for exact artifact attachment and guarded optional Send to one frozen ordinary ChatGPT conversation, while preserving truthful cancellation/failure/post-Send uncertainty.

This is an implementation owner, not Scenario behavior authority. Snapshot and legacy Current Change Scenarios keep their own BI meaning.

## Behavior Items / implementation requirements realized

Consumed behavior includes:
- `BI-RPKG-SNAPSHOT-HANDOFF-EXACT-ARTIFACT`
- `BI-RPKG-SNAPSHOT-HANDOFF-FROZEN-DESTINATION`
- `BI-RPKG-SNAPSHOT-DELIVERY-FAILURE-DOES-NOT-INVALIDATE-EXPORT`
- `BI-RPKG-LEGACY-CURRENT-CHANGE-EXACT-ARTIFACT`
- `BI-RPKG-LEGACY-CURRENT-CHANGE-FROZEN-DESTINATION`
- `BI-RPKG-LEGACY-CURRENT-CHANGE-UNCERTAINTY-TRUTHFUL`
- `BI-RPKG-LEGACY-BROWSER-DOES-NOT-AUTHORIZE-REPOSITORY`

## Consumers

- `SL-RPKG-05 — Attach Repository Snapshot To ChatGPT`
- `SL-RPKG-06 — Deliver Current Change To ChatGPT`

## Domain used

External Interaction plus the immutable exact source/artifact identity supplied by the consuming Slice.

## Implementation Items

### SHI-RPKG-HANDOFF-EXACT-SOURCE — Revalidate exact source before composer mutation
Requirement:
The shared handoff engine must verify the task-specific source identity/fingerprint used for attachment before it mutates the ChatGPT composer.

Reason:
A stale path or similarly named artifact must not become the delivered content.

### SHI-RPKG-HANDOFF-DESTINATION-IMMUTABLE — Prepared destination is frozen
Requirement:
Once the shared handoff task is prepared for one conversation, later tab/navigation changes must not silently retarget it.

Reason:
Delivery semantics belong to the captured operation intent.

### SHI-RPKG-HANDOFF-GUARDED-SEND — Establish a possible-Send boundary
Requirement:
Automatic Send must verify exact destination, clean/safe composer state and upload-ready exact attachment, obtain Java-owned Send authorization before the first application-controlled click, and preserve uncertainty after a click may have happened.

Reason:
Browser automation cannot reliably infer “definitely unsent” after a possible external Send side effect.

### SHI-RPKG-HANDOFF-RUNTIME-FENCING — Stale agents cannot act as current task authority
Requirement:
Bridge/extension agents from an obsolete runtime generation or instance must not claim or execute current delivery work.

Reason:
Multiple tabs/extension reloads can otherwise create duplicate or misdirected external actions.

## Tests

Primary automated responsibility:
- `ChatBridgeTests` for Java-side task/interaction/protocol truth;
- Node `chatgpt-adapter-dom.test.js` for deterministic adapter/DOM regression.

### Test Items

#### TST-RPKG-HANDOFF-NO-FALSE-CLEAN-CANCELLATION-AFTER-POSSIBLE-SEND
Requirement:
Cases crossing the possible-Send boundary must prove that later cancellation/timeout/restart cannot convert uncertainty into a clean unsent result.

#### TST-RPKG-HANDOFF-EXACT-ATTACHMENT-IDENTITY
Requirement:
Attachment tests must assert exact task/source fingerprint identity rather than only filename/presence.

Real Edge/ChatGPT DOM compatibility, actual upload readiness and actual Send confirmation remain Practical Acceptance/Evidence.

## Evolution Impact

### EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC
Refactoring:
`SL-RPKG-06` may cease being part of the ordinary target workflow, but this shared capability remains used by Snapshot delivery and any retained optional diagnostic delivery.
