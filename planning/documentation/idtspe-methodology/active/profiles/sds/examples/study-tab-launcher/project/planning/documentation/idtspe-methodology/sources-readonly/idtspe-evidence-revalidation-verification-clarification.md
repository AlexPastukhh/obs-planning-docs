# IDTSPE Clarification — Evidence, Revalidation, Verification and Revalidation Readiness

Status: focused clarification supporting `idtspe-coherent-model-v4.md`

# 1. Evidence / Uncertainty / Reversibility vs Revalidation

These were too close in earlier wording because both mentioned Evidence.

They are different by **time, owner and purpose**.

## Before / while choosing — Uncertainty / Assumption / Reversibility Lens

```text
candidate Scope / RQ / Idea
↓
what don't we know?
what assumptions are we making?
what Evidence is worth acquiring before deciding?
how reversible is the choice?
how expensive is being wrong?
↓
Q/R/P + Evidence needs
↓
Decision
```

This Lens improves the current Decision.

## After Decision — Decision Revalidation Lifecycle

```text
accepted Decision
+ residual Q/R/P
+ later Evidence
+ later Decisions
+ changed Sources/constraints
↓
does anything now challenge the accepted Decision?
↓
reaffirm
or reopen the narrowest choice
```

Revalidation is not a peer Lens.

It is a later engine lifecycle.

When it reopens a choice, ordinary planning Lenses run again.

# 2. Revalidation Readiness

At Decision time, IDTSPE should prepare future reconsideration helpers.

This is command/process correctness, not another semantic evaluation Lens.

Use:

```text
Decision Revalidation Readiness Validator
```

It checks retained material residual Q/R/P.

## Residual Q

Required/proportional helpers:

```text
unknown
why it matters
what Evidence may answer it
expected source
expected time/event
which answer:
  confirms
  weakens
  reopens
  invalidates
```

## Residual R

```text
risk hypothesis
leading indicators
Evidence source
monitoring horizon
threshold/event
what should reopen
known fallback Idea
```

## Residual P

```text
known current Problem
why accepted now
severity measurement
tolerance threshold/deadline/event
remediation/reopen action
```

No material residual Q/R/P:

```text
validator passes without manufacturing fake concerns
```

# 3. Evidence, Criticism and Arguments

Keep layers separate.

## Evidence

Raw/authoritative observation or fact source.

Examples:

```text
test failed
API supports only X
runtime path touched 7 owners
user completed flow in 12 seconds
```

Evidence is not automatically an argument or Q/R/P.

## Q/R/P

Planning interpretation of a material challenge.

Example:

```text
Evidence:
  add-provider touched 7 owners

R/P:
  current architecture creates excessive recurring workspace cost
```

## Evaluation finding / argument

Reasoning that connects Sources/Evidence/Lenses/QRP to a candidate comparison.

Example:

```text
Idea A is preferable because:
  observed change path is local,
  projected WEUC cost is lower,
  no canonical owner is duplicated,
  verification remains simple.
```

Negative material findings normally become Q/R/P.

Positive findings can remain in Idea evaluation / Decision rationale.

Do not introduce a new first-class `Argument` entity yet unless persistence/query needs prove it useful.

## Decision rationale

The accepted interpretation:

```text
Sources
+ Evidence
+ candidate Q/R/P
+ comparative findings
→ why this answer was selected
```

# 4. Proof / Verification / Operability

Earlier `Proof / Verification / Operability Lens` mixed evaluation with Evidence.

Use:

```text
Verifiability / Observability / Operability Lens
```

It asks before Decision:

```text
Can this candidate be tested/verified?
Can important state/failure be observed?
Can failures be diagnosed?
Can it be operated at acceptable cost?
```

It may generate:

- Q/R/P;
- testability concerns;
- observability concerns;
- proof requirements;
- Evidence plan.

Then:

```text
planned proof
→ Evidence contract / test plan

executed proof/test/observation
→ Evidence
```

Proof is not an argument by itself.

Its Evidence can support or weaken an Idea/Decision.

# 5. Delivery / Constraint

Do not use a peer `Constraint / Delivery Lens` for now.

Delivery information is already a Source role:

```text
DELIVERY_CONSTRAINT
```

Examples:

- deadline;
- capacity;
- milestone;
- release order;
- external dependency;
- operational constraint.

These Sources influence normal planning:

```text
Target/Scope
RQ set
Idea ranking
staging
split/order
Pre-Update
```

Rule:

```text
delivery constraint
→ may change decomposition/order/staging
≠ silently erase semantic Need/behavior
```

If later a distinct reusable delivery-evaluation methodology appears, it can become a Lens then.

# 6. Minimal Public Module Taxonomy

Avoid taxonomy explosion.

Current selected public reusable categories:

```text
Lens
Validator
Guard
Rule
Pack
```

## Lens

Evaluates planning choices.

## Validator

Checks process/result conformance.

## Guard

Protects a hard boundary/invariant.

## Rule

Other reusable methodology invariant/process rule.

## Pack

Reusable composition.

Do not introduce more first-class types without concrete need.

# 7. Current Planning Lenses

Core/near-core:

```text
Need / Value / Scope
Authority / Source-of-Truth / Reuse
Uncertainty / Assumption / Reversibility
```

Contextual:

```text
Dependency & Change Impact
Workspace Evolution / WEUC
Verifiability / Observability / Operability
specialized quality/domain lenses
```

Revalidation is lifecycle, not peer Lens.

Target projection completeness is Validator, not peer Lens.

Delivery constraints are Sources + Rules, not peer Lens.

# 8. Current Strong Validators

```text
Target Projection Conformance
Source Contract
Q/R/P Lifecycle
Decision Persistence
Decision Revalidation Readiness
Evidence Trace
WEUC Loop
Dependency Relation
Pre-Update Conformance
Mode Separation
Rule Set Coverage
```

Guards remain limited to hard boundaries such as permission and semantic-authority violations.
