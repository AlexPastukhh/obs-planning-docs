# Testing Planning Principles And Terminology

Status: active reusable canonical owner

## Semantic Authority Boundary

```text
Scenario / Requirement / Domain / Slice → selected meaning
Tests / checks / manual acceptance → evidence about that meaning
```

Tests never become semantic authority merely because they are executable.

## Behavior Coverage Vs Test Coverage

Behavior Coverage asks what selected behavior is implemented. Test Coverage asks how that behavior/outcome is proved. Do not replace either with test filenames.

## Evidence States

Keep distinct:

```text
planned verification
implemented test/check
checked-current test/check
executed evidence
passing evidence
manual acceptance result
```

Never infer later states from an earlier one.

## Test Layer Responsibility

| Layer | Primarily proves | Does not primarily own |
|---|---|---|
| Domain unit | invariants, lifecycle/transitions, invalid-transition/no-mutation behavior | HTTP, persistence, browser wiring |
| API / integration | orchestration, auth/access, public contract, persistence effects, read-after-command state | exhaustive UI state, browser wiring |
| Client / component | visible UI state, form/validation/error/accessibility behavior against controlled external results | real server persistence |
| E2E | critical cross-layer actor paths through real browser/client/API/server/session/persistence to visible outcome | exhaustive field/server branch matrices |
| Contract/generated checks | drift prevention for selected external/generated contracts | replacement for behavior proof |

Choose the cheapest layer that proves the material outcome without excessive escape/refactor risk. E2E is not inherently superior.

## Public-Boundary Proof

Direct setup may arrange a precondition (DB/API fixture, auth/session fixture). Behavior proof should still execute through the public boundary whose behavior matters. Direct persisted-state reads/assertions may observe the outcome.

## No-Mutation Proof

For failed state-changing behavior ask `What must not change?`. An error/status assertion alone may be insufficient. Prove preservation of material state, including absence of partial writes and unintended side effects.

## Escape Risk

Ask: `Can a bad vertical implementation pass this test and still produce undesirable selected behavior?` Rate Low/Medium/High with a short reason.

## Refactor Risk

Ask: `Can a behavior-preserving refactor break this test?` Rate Low/Medium/High with a short reason. Internal call-order/mock assertions often increase this risk.

## Representative Proof

Do not create matrix explosion by default. Use representative cases when they convincingly prove a stable rule; expand when distinct risk/behavior requires it. E2E should cover critical cross-layer paths, not duplicate every API/component branch.

## Cross-Side / Paired Proof

One side of a distributed concern does not prove the other. Example: server rejection of a missing token does not prove the client sends it; a client header assertion does not prove the server enforces it. Pair proof only where both guarantees are selected behavior.

## Test Abstraction Boundary

Helpers/Page Objects/Component Objects may hide repeated mechanics, stable locators, setup and low-level waits. Keep unique scenario path, important inputs/actions, key assertions and final outcome visible. Do not hide the story behind `performEverythingAndCheckEverything()`.

## Test Data / Isolation

Tests should not rely on order or previous runs. Use unique/reproducible data and explicit reset/isolation appropriate to the layer. Shared mutable environments require concurrency/isolation rules.

## Screenshot / Evidence Artifact Boundary

Screenshots/demonstration artifacts can be valuable evidence, but are not ordinary behavior proof unless the selected requirement specifically concerns visual evidence/output.
