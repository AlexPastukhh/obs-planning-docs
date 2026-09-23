# EVO-RPKG-STANDARDIZE-OPERATION-RESULTS — Standardize Typed Operation Results

[← Evolution Steps Map](../navigation/EVOLUTION-STEPS-MAP.md)

Planning Position: **Selected / Planned**  
Change Surface: **Implementation**  
Evolution Role: **Foundation / evolution-enabling**  
Target Resolution: **Complete Target**  
Behavior Change: **None intended**

## Driven By Application Definition
- [Know Repository Work Outcome](../application-definition.md#ab-rpkg-know-repository-work-outcome-02)
- [Delegate Mechanical Repository Work](../application-definition.md#ab-rpkg-delegate-mechanical-repository-work-04)

## Entering From
- current realized product semantics

## Step Purpose

Establish one reusable typed operation-result mechanism **before** implementing the selected future operations so later Features/Slices/Shared capabilities do not each create incompatible temporary result/error shapes that must be rewritten.

This Step intentionally changes implementation contracts, not product behavior/error semantics.

## Existing Implementation Evidence

Existing generic result types/mechanics such as `Result<T,E>` / `OperationResult<E>` are Source/Evidence and realization candidates, not proof that this selected Shared contract is already established. Exact Realization should inspect them against the IRs below and **REUSE / MODIFY / REPLACE** as appropriate before materializing the Shared capability.

## Owner Impacts

### Shared Implementation Capability — NEW
Create `SHARED-RPKG-TYPED-OPERATION-RESULTS` as generic typed result transport/mechanics.

### Feature/Scenario behavior — UNCHANGED
Behavior expected errors remain owned by their Features/Scenarios. This Step must not create a global application error ontology.

### Existing implementation — CHANGED as needed
Current operation boundaries may be migrated where useful to establish the foundation. Exact class/package/API shape is an Exact realization choice constrained by the Shared IRs below.

## Complete Target Shared Implementation Capability Body

<a id="shared-rpkg-typed-operation-results"></a>
# SHARED-RPKG-TYPED-OPERATION-RESULTS — Typed Operation Results

## Responsibility

Provide reusable typed result mechanics for synchronous/asynchronous operation boundaries while preserving consumer-owned semantic outcome/error types.

## Consumers

Expected consumers include Apply/Commit/Publish realization, Builder construction/verification, Finalize, Snapshot, notifications coordination and VS Code/opening adapters where an operation boundary needs a typed result.

Consumer existence does not move semantic errors into this Shared owner.

## Implementation Requirements

| IR | Type | Plain implementation requirement | QRPE / Examples |
|---|---|---|---|
| <a id="ir-shared-rpkg-preserve-consumer-error-type-01"></a>**Preserve Consumer Error Type**<br><code>IR-SHARED-RPKG-PRESERVE-CONSUMER-ERROR-TYPE-01</code> | Boundary / Isolation | Generic result mechanics carry the consumer-defined expected-error type without replacing it with a global RPKG enum. | Problem Example: every operation maps to `GLOBAL_ERROR.UNKNOWN`. |
| <a id="ir-shared-rpkg-expected-outcomes-typed-02"></a>**Expected Outcomes Are Typed**<br><code>IR-SHARED-RPKG-EXPECTED-OUTCOMES-TYPED-02</code> | Proof / Observability | Expected handleable outcomes are represented by typed success/error result values rather than message-string parsing. | Target Good Example: caller exhaustively handles operation-specific E. |
| <a id="ir-shared-rpkg-do-not-hide-programmer-failures-03"></a>**Do Not Hide Programmer Failures**<br><code>IR-SHARED-RPKG-DO-NOT-HIDE-PROGRAMMER-FAILURES-03</code> | Recovery / Truthfulness | Programmer defects and unclassified infrastructure failures remain exceptions/failures unless a boundary can truthfully map them to a selected expected outcome. | Problem Example: NPE becomes semantic `Rejected`. |
| <a id="ir-shared-rpkg-preserve-uncertainty-04"></a>**Preserve Uncertainty**<br><code>IR-SHARED-RPKG-PRESERVE-UNCERTAINTY-04</code> | Recovery / Uncertainty | Result transport must allow consumers to preserve an owner-defined uncertain outcome instead of coercing it to success/failure. | Target Good Example: publication result remains unconfirmed after ambiguous transport. |
| <a id="ir-shared-rpkg-adapter-maps-at-boundary-05"></a>**Adapter Maps Only At Truthful Boundary**<br><code>IR-SHARED-RPKG-ADAPTER-MAPS-AT-BOUNDARY-05</code> | Adapter / Equivalence | Transport/framework exceptions are translated only where the adapter has enough evidence to classify the owner-defined outcome. | Problem Example: all IOExceptions are treated as “not applied”. |
| <a id="ir-shared-rpkg-result-mechanics-owner-neutral-06"></a>**Result Mechanics Stay Owner-Neutral**<br><code>IR-SHARED-RPKG-RESULT-MECHANICS-OWNER-NEUTRAL-06</code> | Shared Mechanism | Shared types/mechanics contain no package/Feature-specific policy beyond generic transport/composition behavior. | — |

## Candidate implementation shape

`Result<T,E>` and `OperationResult<E>` are acceptable candidate names/shapes, not semantic requirements. Exact Java/API design remains Exact realization so long as the IRs hold.

## Materialization Set

- `SHARED-RPKG-TYPED-OPERATION-RESULTS` — `CREATE`.

Downstream Steps list this as a **Realization prerequisite** where their implementation should consume the foundation. They do not inherit its IRs as product behavior.

## Step Readiness

Readiness: **READY**

Current semantic Entry State is available, there is no realization prerequisite, and the Shared Target Body plus Materialization Set are complete enough to begin Exact Realization.

### Step Q/R/P
- No blocking Q/R/P currently.
- R [NON_BLOCKING]: Exact API/class shape may differ from candidate `Result<T,E>` / `OperationResult<E>` names; realization must still satisfy the Shared IRs.
