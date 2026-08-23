# Architecture Decision Workflow

Status: active reusable workflow
Scope: plan/review one material Architecture Decision as a testable current hypothesis about important Workspace/runtime paths.

Recommended shape: [`templates/ARCHITECTURE-DECISION-TEMPLATE.md`](templates/ARCHITECTURE-DECISION-TEMPLATE.md)
Generic Idea/Variant semantics: [`../idea-planning-principles-and-terminology.md`](../idea-planning-principles-and-terminology.md)
Shared Planning Concern / generic Decision trace semantics: [`../planning-concerns-and-decisions-model.md`](../planning-concerns-and-decisions-model.md)

## 1. Establish Trigger And Current Baseline

State the current Workspace goal/work being supported and the material pressure/problem. Do not start with a favorite pattern.

## 2. Identify Affected Work

Read/reuse:

```text
current Workspace UC being implemented/reviewed
other important Workspace UCs crossing the decision
Workspace Change Cases
Planned/Likely Extensions and expected future UCs
Requirements / Domain invariants
Change Axes crossing this exact decision
representative affected Workspace / Runtime paths
```

Also identify important UCs largely unaffected so one future case does not dominate the decision.

## 3. Form Candidate Idea Variants

When alternatives are material, represent materially different architecture answers as generic `Idea Variants` under the scoped Architecture Decision concern. Do not create a separate Architecture-Variant ontology. Small implementation alternatives can remain ordinary Ideas or local implementation choices.

## 4. Evaluate Each Candidate

Check proportionally:

```text
current correctness
complexity introduced
current UC effect
other current UC effects
future UC / contextual WEUC / Extension effects
WEUC likelihood/horizon/value/confidence and current-work overlap when material
preparation-now vs deferred/rework cost
Change-Axis effects
Understanding / analytical cost
Mutation / evolution cost
verification / diagnosis / operation cost
representative Application Scenario / runtime cost
migration effect
reversibility
Architectural Tax vs payoff
```

Ask explicitly whether the decision creates more future actions, synchronized edits or facts that must be remembered to avoid mistakes.

## 4.1 Priority / Implementation Sequence Decision — When Material

When the architecture choice changes delivery order, keep product priority separate from technical sequence. State:

```text
Product / Scenario priority supplied by application/product context
Recommended implementation sequence
Why the sequence differs, if it does
Minimum prerequisite/seam needed before the priority result
Lower-priority feature work intentionally deferred
WEUC/path evidence
Architectural Tax if anticipated future work never happens
```

Do not infer that a technically convenient lower-priority feature is product-important. Architecture Planning owns the technical sequence recommendation and trade-off; external application/product context owns priority unless explicitly delegated.

## 5. Apply Conditional Heuristics

Use DRY, composition/inheritance, Port/interface, dependency stability, state ownership, persistence, async, test seams and other principles as candidate reasoning rules, never as mandatory target architecture.

## 6. Select And Integrate

Record:

```text
Current Selected Variant
Architecture Intent
Why it pays for itself now
Affected owners / paths
Rejected Complexity
Revisit Trigger when useful
```

Selected meaning belongs in the narrowest real semantic/architecture owner; the decision record must not become a competing definition of Domain/Scenario/Requirement truth.


## Concern / Decision Trace — When Material

Architecture choice remains owned here or in the narrower semantic owner according to Decision Scope. Use the shared Planning Concern model for supporting Q/R/P:

```text
Architecture Concern / Concern Group
→ Priority + Concern Category + Status
→ AI Comment / optional Recommendation
→ selected Architecture Decision only when actually chosen
→ Addresses Concerns / Introduced-Exposed Concerns when useful
→ residual Risk/Problem remains active
→ material rationale/Decision trace retained when useful
```

Do not infer product/user priority or risk tolerance merely because one architecture route is technically cleaner. If user-owned input is missing, keep it explicit in AI Comment.

## 7. Exit Criteria

One current route is selected, its important path trade-offs are understood, and intentionally rejected complexity/revisit evidence is explicit where future pressure matters.

## Decision Scope / Semantic Owner Routing

Architecture reasoning does not steal semantic authority from Scenario, Screen, Domain, Realization or Slice owners. For each material decision record:

```text
Primary Decision Scope
Primary Owner
Affected Owners
Affected Scenario actor paths when relevant
Affected Runtime paths when relevant
Affected Workspace paths when relevant
```

Recommended Primary Decision Scope values:

```text
Scenario Interaction
Screen / Spatial
Domain / Semantic / Consistency
Application Realization / Runtime
Slice Strategy / Delivery
Implementation Slice
Workspace / Cross-cutting Architecture
```

Materialize selected meaning in the narrowest real semantic owner by default. Keep a separate Architecture Decision owner only when the decision is genuinely cross-owner or needs independent review/history/navigation. Temporary analysis need not persist as a separate artifact.
