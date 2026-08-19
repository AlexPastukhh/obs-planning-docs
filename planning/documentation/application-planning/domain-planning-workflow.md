# Domain Planning Workflow

Status: active reusable workflow
Scope: plan/review an optional Domain owner from current application behavior, requirements and justified expected change without over-generalizing for speculative futures.

Canonical cross-cutting context: [`requirements-and-change-context.md`](requirements-and-change-context.md)
Recommended Domain shape: [`templates/DOMAIN-DRAFT-TEMPLATE.md`](templates/DOMAIN-DRAFT-TEMPLATE.md)
Shared draft-state contract: [`detailed-planning/README.md`](detailed-planning/README.md)

## 1. Purpose

Domain planning exists when a separate conceptual language/lifecycle/rules/boundary owner materially improves clarity, consistency or change cost.

Primary goal:

```text
make stable meaning explicit and hard to violate
+
make justified likely variation local/easy enough to change
+
keep the current model as simple as possible
```

Not:

```text
make everything extensible
build abstractions for every imaginable future
translate UI/data structures directly into domain objects
```

## 2. Inputs

Read proportionally:

```text
selected Application Concept / responsibility
current Application Use Cases
current detailed Scenarios
Scenario DATA / Behavior Items
current Screen meaning when it constrains domain semantics
confirmed Requirements
prototype evidence when relevant
Future Scenario Ideas / Change Axes with evidence/confidence
relevant implementation-scoped Ideas
existing Domain/current implementation evidence when reviewing an existing system
```

Current Requirements and selected Scenario meaning outrank speculative future possibilities.

## 3. Identify Stable Semantic Core

Ask:

```text
What identities/concepts must remain understandable across Scenarios?
What relationships are semantically meaningful rather than implementation convenience?
What lifecycle/state meaning is observable or rule-relevant?
Which rules must never be violated?
Which terms need one canonical language?
Which current behaviors are merely presentation/workflow choices rather than Domain truth?
```

Keep only concepts justified by current selected meaning.

## 4. Separate Invariant From Policy / Variation

For each rule/relationship ask whether it is:

```text
Invariant
→ must remain true for the current model to be correct

Policy / selected current rule
→ current choice that may legitimately vary

Implementation mechanism
→ how selected meaning is realized; normally not Domain truth
```

Do not freeze an implementation mechanism into Domain semantics merely because it exists today.

## 5. Evaluate Change Axes

For each material Change Axis:

```text
current assumption
likely variation
evidence/confidence
what Domain meaning would need to change
how far that change would propagate under the candidate model
whether an abstraction/boundary now is actually cheaper than direct future change
```

Use high-confidence likely change to evaluate boundaries. Record speculative possibilities but do not let them force generalization.

## 6. Candidate Domain Design

Plan proportionally:

```text
concepts / identities
relationships
lifecycle / states
invariants
policies / variation points
conceptual boundaries
interfaces between Domain areas when meaningful
```

A Domain workspace may have Variants when there are genuinely distinct integrated Domain designs. Do not create Variants for small implementation alternatives.

## 7. Stress Checks

### Current-Scenario Check

Walk current Scenarios/Behavior through the candidate Domain:

```text
Can required current behavior be expressed simply?
Are any Scenario rules contradicted?
Is important user-visible meaning missing?
Did Domain planning accidentally invent behavior?
```

### Likely-Evolution Check

Use only justified likely change:

```text
If this Change Axis moves, what changes?
Does one local concept/policy change or does meaning leak across the system?
Would a small boundary now materially reduce future cost?
```

### Premature-Generalization Check

```text
Is this abstraction needed by current requirements?
If not, is there evidence-backed likely change that justifies it?
If both answers are no, remove/simplify it.
```

## 8. Select And Integrate

Selected Domain meaning belongs in the Domain owner/template, with material rationale in Current Decisions when useful.

Implementation-scoped Ideas that become selected Domain meaning are marked promoted/rejected in their Idea owner; the Domain becomes current semantic authority.

If Domain planning exposes an upstream requirement/Scenario problem, create an explicit review finding rather than silently changing upstream meaning.

## 9. Exit Criteria

A useful Domain plan has:

```text
clear purpose/boundary
stable semantic core
canonical concepts/relationships
lifecycle/rules/invariants when needed
explicit policy/variation where materially useful
traceability to current Scenarios/Requirements
justified Change-Axis reasoning
no unsupported future abstractions
current draft state / decisions / findings
```

A valid result may also be: `no separate Domain owner is justified; keep meaning in existing Scenario/Requirement owners`.
