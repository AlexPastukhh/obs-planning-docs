# Slice Planning Workflow

Status: active supporting/compatibility workflow; **not** current SDS Target-family authority
Scope: preserve useful decomposition/order heuristics plus one-Slice planning guidance. The former Slice Strategy may exist only as a derived supporting coordination view; the current SDS Slice route is `TM-IMPLEMENTATION-SLICE` (transient discovery) → optional `TM-SLICE-OWNER` (durable responsibility).

Canonical cross-cutting context: [`requirements-and-change-context.md`](requirements-and-change-context.md)
Recommended shapes:

- [`templates/SLICE-STRATEGY-DRAFT-TEMPLATE.md`](templates/SLICE-STRATEGY-DRAFT-TEMPLATE.md)
- [`templates/IMPLEMENTATION-SLICE-DRAFT-TEMPLATE.md`](templates/IMPLEMENTATION-SLICE-DRAFT-TEMPLATE.md)

## 1. Current Ownership Boundary

```text
optional derived decomposition/order coordination
→ supporting view only; no Target/Result-family authority

one concrete whole-Slice discovery
→ TM-IMPLEMENTATION-SLICE / RU-SLICE-01..05

independently durable Slice responsibility
→ optional TM-SLICE-OWNER
```

A project may use these decomposition/order heuristics when they reduce coordination cost, but no `TM-SLICE-STRATEGY` Target is formed. The coordination view is omitted entirely when it adds no independent value.

## 2. Slice Strategy Inputs

Read proportionally:

```text
selected Feature behavior / BR-*
Scenario journey composition when relevant
current natural-owner requirements
canonical Screens where frontend spatial work matters
Domain owners/invariants when present
prototype evidence when still decision-relevant
Change Axes / Change Pressure with evidence/confidence
Domain verification meaning when present
application-realization findings when present
implementation-scoped Proposals
technical/integration/operational constraints
existing implementation state when extending an application
```

## 3. Slice Strategy Goal

Prefer small **vertical**, usable/checkable increments that deliver or validate meaningful application behavior. Vertical Slice means locality of capability-specific change and end-to-end verification, not a mandatory one-folder-per-Slice directory convention. Genuinely shared cohesive Domain invariants remain shared rather than copied into each Slice merely for physical verticality.

Evaluate candidate decompositions against:

```text
earliest useful result
end-to-end checkability
Feature behavior / journey coverage
dependency order
risk/uncertainty reduction
learning/prototype opportunity
integration/migration constraints
likely change pressure
ability to defer unnecessary infrastructure
implementation sequence vs product/Feature priority when they differ materially
```

Do not assume a horizontal sequence such as `generic backend framework → generic domain engine → frontend` is good slicing merely because it separates technical layers.

A foundation Slice is justified when it has a real delivery/risk/dependency reason, not because architecture can be designed in isolation.

### Product Priority Vs Implementation Sequence — When Material

Product/Feature priority says **what should matter sooner**. Slice Strategy may recommend a different technical order when a prerequisite/seam/foundation materially lowers the cost or risk of delivering the priority result and likely subsequent work. It does not redefine product priority.

When the orders differ, make the recommendation explicit:

```text
Product / Feature priority
Implementation sequence recommendation
Why they differ
Minimum prerequisite work actually needed
Lower-priority feature work intentionally NOT pulled forward
architecture/evolution evidence supporting the sequence
Cost of doing priority work directly now
Cost/tax of preparing for later work now
Revisit trigger when future work is uncertain
```

Do not fully implement a lower-priority feature merely because its architecture is convenient. Ask whether the future instance is sufficiently likely/near/material, whether only a small reusable seam is needed now, whether deferral creates real rework, and what permanent Architectural Tax is paid if that future never happens.

## 4. Candidate Slice Decomposition

For each candidate Slice state:

```text
Slice ID / label
Deliverable/checkable result
Covered Feature behavior / journey needs / natural-owner constraints
Relevant Domain meaning
Dependencies
Main uncertainty/risk reduced
Why this boundary is vertical enough
Expected order
```

Compare alternative decompositions when the difference is material. Select one current strategy/order.

## 5. Change-Axis Review

Change Axes influence coupling/boundary evaluation but do not automatically create extension mechanisms.

Ask:

```text
Will this Slice hard-wire several unrelated likely-variable concerns together?
Would a small seam now materially reduce evidence-backed future change cost?
Is the proposed seam actually required now or merely speculative?
```

Prefer simple current delivery plus cheap justified evolution over maximum theoretical flexibility.

## 6. Planning One Slice

After a Slice is selected, plan its integrated delivery:

```text
Deliverable result
Covered Feature behavior / BR-*
Natural-owner requirements constraining implementation
Relevant Domain meaning / verification contract
Vertical boundary
Dependencies / handoffs
Integrated implementation plan
owner-local implementation detail when materially useful; independently substantial subproblems use normal Local Target Formation
migration/integration concerns when material
Change Axes considered
implementation-scoped Proposals promoted/rejected
verification target/evidence
```

Also apply a proportional Implementation Complexity Lens:

```text
Expected Runtime Path
→ calls / state changes / queries / remote calls
→ branches / transaction / concurrency
→ algorithm / data-volume concerns

Implementation Path
→ Domain work
→ orchestration
→ persistence
→ adapters / integrations
→ API/UI
→ configuration / migrations
→ verification

Workspace Change Impact
→ existing owners touched
→ new owners introduced
→ cross-Slice/shared changes

Risks
→ coupling
→ performance
→ operations
→ migration
→ testability
```

Use the Architecture Planning path concepts where useful. The goal is to see whether the Slice is genuinely local/vertical or only named that way.

The current Slice semantic owner remains integrated authority. SDS does not prescribe frontend/server part-plan files. Physical split is decided by Documentation / Representation; independently substantial unresolved local design may become a normal Local Target Contract without creating frontend/backend Slice families.

## 7. Requirement And Owner Boundary

```text
Feature / Scenario / Screen / Domain / Shared
→ define selected meaning the Slice must realize

Slice
→ implementation/delivery plan
```

A Slice may discover that an upstream Feature/Scenario/Domain/Shared choice is inconsistent, expensive or impossible. Return that as an explicit finding/review need. Do not redefine upstream meaning for implementation convenience.

## 7.1 Shared / Cross-Cutting Applicability Vs Ownership

A concern may apply to this Slice without becoming owned by this Slice.

```text
shared/cross-cutting rule applies here
≠ this Slice owns the whole concern
```

For material cases record:

```text
what applies here
canonical owner
what this Slice implements/integrates locally
what remains delegated/shared
what verification obligation still applies to this Slice
```

Examples include authentication policy, audit/logging, shared Domain invariants, retry policy, observability and common validation. Avoid copying semantic authority into each Slice.

## 7.2 Expected Realization Vs Semantic Drift

Expected files/classes/methods/paths are realization hypotheses unless explicitly selected as a hard contract.

```text
class/file/method renamed or locally reorganized
→ not automatically Slice drift

selected behavior changed
responsibility moved to the wrong owner/layer
invariant/consistency guarantee weakened
unexpected mutation/failure behavior appeared
verification guarantee weakened
→ real semantic / responsibility drift
```

Implementation/review should compare actual realization to the selected Slice result and responsibility boundaries rather than defending provisional names.

## 8. Verification

Derive verification from semantic owners:

```text
Feature behavior / BR-*
+ Scenario journey needs when relevant
+ natural-owner requirements
+ Domain invariants when present
+ Slice deliverable target
+ positive outcomes
+ negative / no-mutation guarantees when material
→ verification plan/evidence
```

Tests are evidence, not semantic authority.

## 9. Exit Criteria

A derived Slice coordination view is useful only when decomposition/order is understandable enough to reduce real coordination cost; it is never a readiness gate for forming a Slice Discovery Target.

One Slice plan is ready when its vertical result, semantic coverage, dependencies, implementation boundary and verification target are clear enough for implementation without inventing product behavior during coding.

## Feature Behavior Coverage / Proof Coverage Boundary

Keep these distinct:

```text
Scope → what delivery increment is included
Feature Behavior Coverage → which selected Feature behavior / BR-* this Slice realizes
Test Coverage → how selected behavior/outcomes are proved
```

For non-trivial work, record material related behavior that is **not** implemented by this Slice, its owner/destination and reason. This protects vertical Slice boundaries from scope creep.

When proof allocation is material, apply Core `LENS-TEST-PROOF-EVIDENCE`; keep non-trivial proof planning transient with the natural owner and route literal tests through Exact Realization. A vague `covered by integration tests` statement is not sufficient Evidence.

## Target Dependencies / Practical Acceptance Handoff

For one selected Slice, record material **Target Dependencies** before choosing exact mechanism/files. Plan the whole vertical result before implementation when nontrivial. Verification may hand off to Testing Planning, including project-local Practical Acceptance when the property is best proved through operated human/AI/E2E behavior rather than a narrow automated assertion.
