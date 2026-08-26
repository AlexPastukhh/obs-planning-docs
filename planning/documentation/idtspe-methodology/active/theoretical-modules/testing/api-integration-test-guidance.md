# API / Integration Test Guidance

Status: active reusable supporting guidance

Use from `UC-PLAN-TEST-DESIGN` / `UC-PLAN-TEST-STRATEGY` when public server/application boundaries and persistence effects matter.

## Read / Query Behavior

Primary proof usually exercises the public API/application boundary and checks:

- access/visibility/auth behavior;
- input/validation contract when material;
- projection/filter/sort correctness that is selected behavior;
- stable external error/result shape;
- absence of unintended mutation when meaningful.

Do not add unit tests by default for thin query plumbing. Unit-test reusable helper/algorithm logic when it has non-trivial branching or independently important semantics.

## State-Changing Commands

Prefer public-boundary integration proof with persisted/result-state assertions. For each material path check:

```text
precondition state
→ public command/action
→ external result
→ persisted/read-visible state
```

For rejected/failed commands explicitly prove material no-mutation guarantees. Repository/handler mock call counts are not primary behavior proof unless that internal interaction is itself an owned contract.

## Validation / Error Contract

Representative cases should prove the stable public contract: status/category, field/path when material, stable code/message shape when truly contractual. Avoid exhaustive matrices when one shared rule is already convincingly proved.

## Setup / Observation

Direct DB/fixture setup may arrange preconditions. The behavior under test should still pass through the relevant public boundary. Direct DB reads/assertions may observe persisted results.


## Idempotency / No-Op Behavior — When Relevant

When repeating a command is selected to succeed/no-op, prove both the public result and preservation guarantees: no duplicate object/write, stable identity/fields remain stable, and unrelated state is unchanged. Do not infer idempotency from a success status alone.

## Stable / Unrelated State Safety

For material state transitions, identify not only what changes but what must remain unchanged: prior rows that must survive, ownership/identity fields, unrelated records and other lifecycle state. This is especially useful where a superficially correct command could corrupt neighboring state.

## Regression Guards Across Owners

A focused regression guard is useful when current behavior relies on a selected boundary owned elsewhere. Link the upstream owner/evidence and prove only the dependency needed here; do not duplicate the entire upstream test matrix.

## Current Scope Vs Future Types

Prove current supported types/states. Record justified future coverage separately; do not expand Domain/API behavior merely to satisfy a test for a future type that is not current selected meaning.
