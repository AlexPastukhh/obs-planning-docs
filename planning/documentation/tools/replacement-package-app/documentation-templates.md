# Replacement Package App — Documentation Templates

Status: active recommended-template owner
Scope: recommended starting forms for Scenario behavioral design/maintenance, Evolution, Domain, Slice, Cross-cutting Capability and generated implementation-trace documentation.

## Template rule

These templates are **recommended forms, not schemas**.

A concrete document should contain the information needed to understand its owner or design decision. Sections may be omitted, combined, renamed, reordered or supplemented when another structure communicates the same meaning more clearly.

Do not add empty sections merely to conform to a template. Do not turn template headings into a new bureaucracy, lifecycle or validation taxonomy.

The documentation process and terminology are owned by [`documentation-use-cases.md`](documentation-use-cases.md). The use cases link directly to the forms below at the step where each form is useful.

---

<a id="template-scenario-owner"></a>
## Template — Scenario owner

```text
# SCN-RPKG-... — <Scenario>

## User Goal
<meaningful end result sought by the user>

## Process Specification

### Process Map
<compact Feature Interaction topology, runtime branches, loops and terminal outcomes when useful>

### FI-RPKG-... — <Feature Interaction>
<use the Feature Interaction entry form below>

### FI-RPKG-... — ...
...

## Screen UI Requirements
<only intentional UI requirements that cannot honestly be owned by one Feature Interaction>

## Scenario Process Alternatives
<only when retained alternatives remain useful to an active/material design decision>

## Migration Delta

### EVO-RPKG-... — <user-visible/application behavioral change>
Status: URGENT | PLANNED | POSSIBLE
<use the Evolution Step form below when helpful>
```

Notes:

- The Process Specification is the complete Scenario behavioral specification, not a short overview whose missing semantics appear only in BI/UI requirements.
- `Stage` is not a normative Scenario decomposition in this model.
- Feature Interaction, BI and UI requirement sections may be arranged differently when that makes the complete process clearer.
- Migration Delta contains only still-unimplemented selected/plausible behavior, not every candidate/rejected design alternative.

---

<a id="template-feature-interaction-entry"></a>
## Template — Feature Interaction entry

Use as a recommended local form inside a Scenario Process Specification and during behavioral design exploration.

```text
### FI-RPKG-... — <name>

Goal:
<local meaningful result sought>

Scenario Role:
<why this interaction exists here and what it enables/prepares for the rest of the Scenario>

Context / Preconditions:
<relevant already-established state>

Required Inputs:
<input/artifact/action actually consumed by this interaction>

Interaction Process:
<observable user/application behavior; include meaningful automatic continuation>

Outcomes:
- <outcome / condition / resulting behavior>
- ...

Result:
<meaningful application/user-world truth established by the main/relevant outcome>

Outputs:
<information/artifacts/identity/state available to later interactions>

Next Interactions:
<outcome → next FI / loop / termination>

Behavior Items:

#### BI-RPKG-..-...
Requirement:
<implementation-independent business/application behavior / invariant / rule>

Reason:
<why Scenario/FI correctness requires this behavior>

UI Requirements:

#### UI-REQ-RPKG-...
Requirement:
<intentional visual/interaction requirement>

Reason:
<why the presentation/interaction constraint matters, when useful>

Why This Interaction Design:
<why these inputs/actions/process/result/outputs/control points are selected>

Strengths:
<only when analysis remains useful>

Problems:
<known inherent trade-offs, only when useful>

Complexity:
<neutral complexity and where it is placed, only when useful>

Risks:
<potential/conditional issues, only when useful>

Questions:
<still-open material questions, only when useful>
```

Notes:

- `Goal`, `Scenario Role` and `Why This Interaction Design` are different meanings; do not collapse them into one vague reason.
- Context/Preconditions are not automatically Required Inputs.
- Result is not the same thing as Outputs.
- Success, validation error, interruption and uncertainty are usually outcomes of the same FI while the local goal remains unchanged.
- Behavior Items are Scenario behavioral requirements; UI Requirements are a separate class.
- If one BI constrains the boundary between several Feature Interactions, define its `Requirement + Reason` once and reference the same BI identity from the other relevant interactions instead of duplicating/rewording it.
- Do not document accidental current layout as a durable UI requirement.
- Omit design-analysis headings for obvious/simple interactions when they add no information.

---

<a id="template-feature-interaction-variant-analysis"></a>
## Template — Feature Interaction Variant analysis

Use when a local interaction has materially different behavioral designs worth comparing.

```text
### <candidate / variant name>

Local Goal:
...

Context / Preconditions:
...

Required Inputs:
...

Interaction Process:
...

Outcomes:
...

Result:
...

Outputs:
...

Impact on neighboring interactions:
<what inputs/outputs/control points become easier, harder, unnecessary or newly required>

Strengths:
...

Problems:
...

Complexity:
<user / process / behavioral / implementation / recovery / testing / evolution where material>

Risks:
...

Questions:
...

Decision / rationale:
<selected / rejected / still open only when useful; do not invent a lifecycle taxonomy>
```

Variants are not required to preserve the same input/output contract. A stronger Result/Output or easier Input contract may legitimately remove another interaction from the Scenario.

---

<a id="template-scenario-process-variant"></a>
## Template — Scenario Process Variant

Use to compare materially different complete compositions for the same Scenario Goal.

```text
### <Scenario Process Variant>

Scenario Goal:
...

Initial Context / Inputs:
...

Process Composition:
FI-A
→ FI-B
→ FI-C

Interaction Contracts:
A.outputs → B.context/inputs
B.outputs → C.context/inputs

Final Result:
...

Final Outputs:
...

Strengths:
...

Problems:
...

Complexity:
<include complexity placement when material>

Risks:
...

Questions:
...

Decision / rationale:
<when useful>
```

Compare both the interactions and the boundaries/contracts between them. More interactions may add control/recovery points; fewer interactions may reduce user work while increasing partial-completion/recovery complexity.

---

<a id="template-ui-requirement"></a>
## Template — UI Requirement forms

### Interaction/component-local

```text
#### UI-REQ-RPKG-...
Requirement:
<intentional presentation/interaction constraint>

Reason:
<why it matters, when useful>
```

A meaningful component may group several UI Requirements inside one Feature Interaction without becoming a separate product/domain owner.

### Screen-level

```text
## Screen UI Requirements

### <screen/context>

#### UI-REQ-RPKG-...
Requirement:
<cross-interaction visual/interaction constraint>

Reason:
...
```

Use screen-level ownership only when no one Feature Interaction honestly owns the rule. Current pixel/layout facts do not become requirements automatically.

---

<a id="template-evolution-step"></a>
## Template — Evolution Step entry

Use when an `EVO-*` needs a focused representation inside an owner.

```text
### EVO-RPKG-... — <change>
Status: URGENT | PLANNED | POSSIBLE | IMPLEMENTED
Scenario: <SCN owner>

Scenario Process Change:
<what changes in the user/application process>

Feature Interaction Impact:
- adds: ...
- changes: ...
- removes: ...
- composes: ...
- splits: ...
- replaces: ...

Contract Changes:
<context/input/result/output/transition changes when material>

Behavior Items:
- adds: BI-...
- changes: BI-...
- removes: BI-...

UI Requirements:
- adds: UI-REQ-...
- changes: UI-REQ-...
- removes: UI-REQ-...

Owner impact:
<Domain / Slice / cross-cutting impact relevant to this owner>

Implementation requirements:
<DI/SI references only when they exist>

Architecture decision:
<only when material>
```

Omit any field that adds no information. One Evolution Step remains one coherent user-visible/application behavioral evolution, not a technical refactor.

---

<a id="template-aggregate-domain-owner"></a>
## Template — Aggregate Domain owner

Use an Aggregate owner by default when several Domain concepts share one consistency/invariant boundary.

```text
# <Aggregate>

## Responsibility
<business/domain responsibility and consistency boundary>

## Behavior Items implemented
- BI-...

## Domain Concepts
<semantic identities, states, relationships and business operations needed
 to understand the Aggregate; not a class/field inventory>

## Invariants
<domain invariants not already clear from BI references>

## Domain Implementation Items

### DI-...
Requirement:
<durable domain architecture requirement>

Reason:
<why it is needed>

Derived from:
<BI / EVO / invariant / concrete architecture pressure, when useful>

## Evolution Steps
### EVO-...
...
```

`Domain Implementation Items` are optional. A Domain owner that can be understood completely from its BI and invariants does not need artificial `DI-*` entries.

---

<a id="template-domain-object-owner"></a>
## Template — Domain Object owner

Use a separate Domain Object file only when independent semantics, identity/lifecycle, cross-owner reuse or rule volume make it clearer than keeping the object in its Aggregate owner.

```text
# <Domain Object>

## Responsibility / Meaning
...

## Behavior Items implemented
- BI-...

## Identity / Relationships
<only semantic facts that matter>

## Invariants
...

## Domain Implementation Items
### DI-...
Requirement:
...
Reason:
...
Derived from:
...

## Evolution Steps
...
```

A separate source class is not by itself a reason to create this file.

---

<a id="template-slice-owner"></a>
## Template — Slice owner

```text
# SL-RPKG-... — <Slice>

## Result / Responsibility
<application capability/result this Slice owns>

## Scenario behavior realized
Feature Interaction context:
- FI-... <only when useful for navigation/context>

Behavior Items realized:
- BI-...

## Domain used
- <Aggregate / Domain capability>

## Slice Implementation Items

### SI-...
Requirement:
<durable orchestration/composition/recovery/architecture requirement>

Reason:
<why this implementation constraint matters>

Derived from:
<BI / EVO / Domain constraint / concrete architecture concern, when useful>

## Evolution Steps
### EVO-...
Behavior contribution:
...
Domain impact:
...
Implementation Items:
...
Architecture decision:
...
```

Feature Interaction is behavioral decomposition and Slice is implementation decomposition; no 1:1 mapping is required. `Slice Implementation Items` are optional. Do not put current method names, service call chains, Java fields or adapter routing here just to describe the code.

---

<a id="template-cross-cutting-capability-owner"></a>
## Template — Cross-cutting Capability owner

Use only when one real shared implementation responsibility spans several Slices.

```text
# CC-RPKG-... — <Cross-cutting Capability>

## Responsibility
...

## Behavior Items realized
- BI-...

## Domain used
...

## Implementation Items
### <local implementation item>
Requirement:
...
Reason:
...
Derived from:
...

## Consumers
- SL-...

## Evolution Steps
...
```

A common principle such as DRY, logging or composition is not by itself a Cross-cutting Capability. A repeated Feature Interaction name is also not by itself proof of a shared implementation owner.

---

<a id="template-generated-implementation-trace"></a>
## Recommended generated implementation-trace output

Generated traces are derived artifacts, not normative owners. Their exact generator/output format may evolve.

Recommended discoverability fields when tooling supports them:

```text
Generated: yes
Source revision: <commit SHA>
Root symbol: <symbol>

Calls / callers:
...

Fields read / written:
...

Referenced types:
...

External boundaries:
...

Branches / results:
<only when derivable with confidence>
```

Recommended location when a generator is introduced:

```text
planning/documentation/tools/replacement-package-app/generated/implementation-traces/
```

Regenerate these artifacts instead of manually maintaining them. They never replace Scenario Process Specification, BI, UI Requirements, Domain invariants, Slice implementation requirements or source authority.
