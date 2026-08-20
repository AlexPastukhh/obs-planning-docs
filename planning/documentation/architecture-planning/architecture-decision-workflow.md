# Architecture Decision Workflow

Status: active reusable workflow
Scope: plan/review one material Architecture Decision as a testable current hypothesis about important Workspace/runtime paths.

Recommended shape: [`templates/ARCHITECTURE-DECISION-TEMPLATE.md`](templates/ARCHITECTURE-DECISION-TEMPLATE.md)
Generic Idea/Variant semantics: [`../idea-planning-principles-and-terminology.md`](../idea-planning-principles-and-terminology.md)

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
future UC / Extension effects
Change-Axis effects
locality / coupling / change fan-out
Discoverability / Comprehension Cost / Working-Context Load
verification / debugging
runtime / transaction / failure / operational effect
migration effect
reversibility
Architectural Tax vs payoff
```

Ask explicitly whether the decision creates more future actions, synchronized edits or facts that must be remembered to avoid mistakes.

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
