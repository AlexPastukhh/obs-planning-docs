# External Interaction

Status: active current Aggregate owner

## Responsibility

Own one exact external handoff intent and its truthful lifecycle: exact source/artifact + exact destination + semantic attach/send/cancel/failure/post-Send uncertainty state.

External browser state must not rewrite repository or Repository Snapshot truth.

## Behavior Items implemented

Snapshot:
- `BI-RPKG-SNAPSHOT-HANDOFF-EXACT-ARTIFACT`
- `BI-RPKG-SNAPSHOT-HANDOFF-FROZEN-DESTINATION`
- `BI-RPKG-SNAPSHOT-DELIVERY-DOES-NOT-CHANGE-REVIEW-BINDING`
- `BI-RPKG-SNAPSHOT-DELIVERY-FAILURE-DOES-NOT-INVALIDATE-EXPORT`

Legacy Current Change:
- `BI-RPKG-LEGACY-CURRENT-CHANGE-EXACT-ARTIFACT`
- `BI-RPKG-LEGACY-CURRENT-CHANGE-FROZEN-DESTINATION`
- `BI-RPKG-LEGACY-CURRENT-CHANGE-UNCERTAINTY-TRUTHFUL`
- `BI-RPKG-LEGACY-BROWSER-DOES-NOT-AUTHORIZE-REPOSITORY`

## Domain Concepts / Invariants

- source/artifact + destination + mode identify actionable semantic intent;
- ordinary terminal outcomes do not need accumulated working-list history;
- `UnknownAfterSend` is attention truth and cannot be rewritten into clean unsent state;
- cancellation before possible Send stops future automation; after possible Send it cannot claim non-delivery;
- retry after a terminal outcome is a new interaction identity;
- destination changes may cancel only safely cancellable older work; already-preparing/possible-Send tasks retain frozen destination.

## Domain Implementation Items

### DI-RPKG-EXTERNAL-INTERACTION-TRUTHFUL-UNCERTAINTY — Preserve externally uncertain side effects
Requirement:
Once an external Send may have occurred, the Aggregate must preserve that uncertainty until stronger evidence resolves it; UI dismissal may hide attention but cannot rewrite semantic truth.

Reason:
Blind retry or false cancellation could duplicate external effects.

## Tests

Local Aggregate/bridge proof is realized mainly by `SL-RPKG-08` and the shared ChatGPT handoff capability.

## Evolution Impact

### EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC
Refactoring:
Legacy Current Change delivery may leave the ordinary target path. External Interaction remains necessary for Repository Snapshot delivery and any retained optional diagnostic handoff.
