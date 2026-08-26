# UC-IDTSPE-REVIEW-CONSISTENCY — Review Cross-Owner Consistency

Status: active methodology Use Case  
Repository provenance: current `UC-PLAN-CONSISTENCY`, detailed-planning integration/change review.

## Capability

Check selected semantic/planning owners after creation/change/reopen and route contradictions or stale relationships back to the **real owners**.

```text
Consistency Review
= methodology capability / validator composition
≠ semantic Target type
≠ new canonical owner
```

## Trigger

Typical triggers:
```text
owner/Decision changed
new Scenario/DATA/Behavior/Screen/Domain/Slice relation introduced
upstream Target reopened
implementation/Evidence contradicts selected planning meaning
pre-realization or pre-handoff consistency gate requested
```

## Inputs

```text
changed owner / Decision / relation
affected Source-consumer graph
selected semantic owners in review scope
actual Evidence/current state when relevant
```

## Algorithm

1. Identify the changed/reopened owner and review scope.
2. Expand direct affected Sources/consumers/relations proportionally.
3. Run applicable owner-specific validators and relation checks.
4. Check Source meaning vs consumer meaning.
5. Detect contradictions, stale references, missing reciprocal relations and silently weakened guarantees.
6. Distinguish representation/file drift from semantic drift.
7. Route every material finding to the real owner that must reopen/update.
8. Re-run focused checks after owner updates when needed.
9. Record review result/evidence; do not create a substitute semantic authority.

## Example Checks

```text
Scenario ↔ Screen relations remain reciprocal
Domain did not invent/redefine Scenario behavior
Slice did not weaken Requirement/Domain guarantees
frontend realization still matches Screen/Behavior meaning
tests prove current rather than historical meaning
Cross-Cutting local obligations still point to canonical owner
downstream Evidence requiring upstream reopen was routed correctly
```

These are examples, not an exhaustive fixed checklist.

## Result

```text
checked owner set / review scope
consistency findings
contradiction / stale / missing-relation findings
real owner(s) to reopen/update
unchanged confirmations when useful
review Evidence / completion status
```

The result is a review record, not a Target Instance representing new domain/application semantics.

## Boundary

If review exposes a real unresolved design choice:
```text
route/reopen the relevant existing Target
or create the appropriate real Target through normal Target Formation
```

Do not turn the review itself into a Target merely because it produced findings.
