# Slice Planning Workflow

Status: active reusable workflow
Scope: distinguish implementation Slice Strategy (decomposition/order) from planning one selected separately deliverable/checkable Implementation Slice.

Canonical cross-cutting context: [`requirements-and-change-context.md`](requirements-and-change-context.md)
Recommended shapes:

- [`templates/SLICE-STRATEGY-DRAFT-TEMPLATE.md`](templates/SLICE-STRATEGY-DRAFT-TEMPLATE.md)
- [`templates/IMPLEMENTATION-SLICE-DRAFT-TEMPLATE.md`](templates/IMPLEMENTATION-SLICE-DRAFT-TEMPLATE.md)

## 1. Two Planning Results

```text
UC-PLAN-SLICE-STRATEGY
→ choose/review a decomposition and delivery order

UC-PLAN-SLICE
→ plan/review one selected Slice
```

These are distinct outcomes. A project may skip explicit Slice Strategy when work is too small/simple to benefit from a decomposition artifact.

## 2. Slice Strategy Inputs

Read proportionally:

```text
current Scenarios / Behavior Items
confirmed Requirements
canonical Screens where frontend spatial work matters
Domain owners/invariants when present
prototype evidence when still decision-relevant
Change Axes / Change Pressure with evidence/confidence
Domain verification meaning when present
application-realization findings when present
implementation-scoped Ideas
technical/integration/operational constraints
existing implementation state when extending an application
```

## 3. Slice Strategy Goal

Prefer small **vertical**, usable/checkable increments that deliver or validate meaningful application behavior. Vertical Slice means locality of capability-specific change and end-to-end verification, not a mandatory one-folder-per-Slice directory convention. Genuinely shared cohesive Domain invariants remain shared rather than copied into each Slice merely for physical verticality.

Evaluate candidate decompositions against:

```text
earliest useful result
end-to-end checkability
Scenario/Requirement coverage
dependency order
risk/uncertainty reduction
learning/prototype opportunity
integration/migration constraints
likely change pressure
ability to defer unnecessary infrastructure
```

Do not assume a horizontal sequence such as `generic backend framework → generic domain engine → frontend` is good slicing merely because it separates technical layers.

A foundation Slice is justified when it has a real delivery/risk/dependency reason, not because architecture can be designed in isolation.

## 4. Candidate Slice Decomposition

For each candidate Slice state:

```text
Slice ID / label
Deliverable/checkable result
Covered Scenarios / Behavior / Requirements
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
Covered Scenarios / Behavior Items
Requirements implemented / constraining implementation
Relevant Domain meaning / verification contract
Vertical boundary
Dependencies / handoffs
Integrated implementation plan
frontend/server/other implementation-part plans when useful
migration/integration concerns when material
Change Axes considered
implementation-scoped Ideas promoted/rejected
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

`slice.md` remains integrated authority. `frontend.md`, `server.md`, `verification.md` or other focused files are implementation-part plans, not new Use Cases by default.

## 7. Requirement And Owner Boundary

```text
Scenario / Screen / Requirement / Domain
→ define selected meaning the Slice must realize

Slice
→ implementation/delivery plan
```

A Slice may discover that an upstream Requirement/Scenario/Domain choice is inconsistent, expensive or impossible. Return that as an explicit finding/review need. Do not redefine upstream meaning for implementation convenience.

## 8. Verification

Derive verification from semantic owners:

```text
Scenario Acceptance
+ Behavior Items
+ Requirements
+ Domain invariants when present
+ Slice deliverable target
→ verification plan/evidence
```

Tests are evidence, not semantic authority.

## 9. Exit Criteria

Slice Strategy is ready when decomposition/order is understandable and justified enough to select the next Slice.

One Slice plan is ready when its vertical result, semantic coverage, dependencies, implementation boundary and verification target are clear enough for implementation without inventing product behavior during coding.

## Behavior Coverage / Test Coverage Boundary

Keep these distinct:

```text
Scope → what delivery increment is included
Behavior Coverage → which selected behavior this Slice implements
Test Coverage → how selected behavior/outcomes are proved
```

For non-trivial work, record material related behavior that is **not** implemented by this Slice, its owner/destination and reason. This protects vertical Slice boundaries from scope creep.

When verification is material, build or route a Behavior-to-Test Trace through `../testing-planning/test-design-workflow.md`. A vague `covered by integration tests` statement is not a proof plan.

## Target Dependencies / Practical Acceptance Handoff

For one selected Slice, record material **Target Dependencies** before choosing exact mechanism/files. Plan the whole vertical result before implementation when nontrivial. Verification may hand off to Testing Planning, including project-local Practical Acceptance when the property is best proved through operated human/AI/E2E behavior rather than a narrow automated assertion.
