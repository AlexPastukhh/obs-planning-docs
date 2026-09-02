# Replacement Package App — Documentation Templates

Status: active recommended-template owner
Scope: recommended starting forms for Scenario behavioral design/maintenance, Scenario-owned Application Evolution Steps, evolution planning, Domain/Slice changes by application evolution, Cross-cutting Capability and generated implementation-trace documentation.

## Template rule

These templates are **recommended forms, not schemas**.

A concrete document should contain the information needed to understand its owner or design decision. Sections may be omitted, combined, renamed, reordered or supplemented when another structure communicates the same meaning more clearly.

Presentation should preserve meaning while making it easy to recover:

- keep one connected idea as prose when prose is clearer;
- expose independent facts, conditions, exceptions or consequences as bullets/sub-bullets or another explicit structure;
- use readable entity names and pair technical IDs with human meaning;
- do not use arbitrary numeric IDs as roadmap/architecture order;
- never drop a condition merely to shorten the text.

Do not add empty sections merely to conform to a template. Do not turn template headings into a new bureaucracy, lifecycle or validation taxonomy.

The documentation process and terminology are owned by [`documentation-use-cases.md`](documentation-use-cases.md). The use cases link directly to the forms below at the step where each form is useful.

---

<a id="template-scenario-owner"></a>
## Template — Scenario owner

Use the same owner form for current and planned future Scenarios; make the owner status explicit instead of changing the semantic structure.

```text
# SCN-RPKG-<SEMANTIC-NAME> — <readable Scenario name>

Status: active current Scenario owner
# or: planned future Scenario owner

## User Goal
<meaningful end result sought by the user>

## Process Specification

### Process Map
<compact Feature Interaction topology, runtime branches, loops and terminal outcomes when useful>

### FI-RPKG-<SEMANTIC-NAME> — <readable Feature Interaction name>
<use the Feature Interaction entry form below>

### FI-RPKG-... — ...
...

## Screen UI Requirements
<only intentional UI requirements that cannot honestly be owned by one Feature Interaction>

## Scenario Process Alternatives
<only when retained alternatives remain useful to an active/material design decision>

## Evolution Steps

### EVO-RPKG-<SEMANTIC-NAME> — <readable application change>
<use the Application Evolution Step form below>
```

Notes:

- The Process Specification is the complete Scenario behavioral specification, not a short overview whose missing semantics appear only in BI/UI requirements.
- `Stage` is not a normative Scenario decomposition in this model.
- Feature Interaction, BI and UI requirement sections may be arranged differently when that makes the complete process clearer.
- `Evolution Steps` contains application-behavior changes canonically owned by this Scenario. It is not a lower-level implementation plan.
- Do not call a current Scenario “transitional” merely because known future changes exist; describe current truth as current truth and put known change in Evolution Steps.
- If a future target is clearer as a full Scenario, create a planned future Scenario owner and link it from the current Scenario's replacement Evolution Step.
- Semantic IDs/names should remain meaningful if file order or roadmap order changes.

---

<a id="template-feature-interaction-entry"></a>
## Template — Feature Interaction entry

Use as a recommended local form inside a Scenario Process Specification and during behavioral design exploration.

```text
### FI-RPKG-<SEMANTIC-NAME> — <readable name>

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

#### BI-RPKG-<SEMANTIC-NAME> — <readable requirement name>
Requirement:
<implementation-independent business/application behavior / invariant / rule>

Reason:
<why Scenario/FI correctness requires this behavior>

UI Requirements:

#### UI-REQ-RPKG-<SEMANTIC-NAME> — <readable UI requirement name>
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

<a id="template-application-evolution-step"></a>
## Template — Application Evolution Step

Use only in the canonical Scenario owner of the application change.

The entry describes **what changes in application/Scenario behavior**. It does not describe how Domain/Slice implementation changes.

```text
### EVO-RPKG-<SEMANTIC-NAME> — <readable application change>
Intent: URGENT | PLANNED | POSSIBLE <only when useful>

Change:
<concise statement of what changes for the user/application process>

Scenario Process Change:
<added/removed/replaced/composed/split behavior when material>

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

Related Scenarios:
<references only when the same application change affects another Scenario>

Replacement Scenario:
<planned future Scenario link only when this change is too broad to remain understandable as a local delta>
```

Omit any field that adds no information.

Rules:

- One Application Evolution Step has one canonical Scenario owner.
- The step says **what** application behavior changes; Domain/Slice implementation response belongs in `Changes by Application Evolution Step`.
- Use semantic identity such as `EVO-RPKG-GIT-DERIVED-CURRENT-CHANGE`; do not encode roadmap position as `001/002/...` when the number has no independent meaning.
- Intent does not define exact sequence; [`evolution-steps-map.md`](evolution-steps-map.md) owns planned order/dependencies.
- A merely considered/rejected design alternative is not automatically an Evolution Step.

---

<a id="template-changes-by-application-evolution-step"></a>
## Template — Changes by Application Evolution Step

Use inside Domain, Slice or Cross-cutting Capability owners to describe **how that owner must change** to realize a Scenario-owned Application Evolution Step.

```text
## Changes by Application Evolution Step

### EVO-RPKG-<SEMANTIC-NAME> — <readable application change>
Canonical Scenario step:
<link / Scenario owner>

Owner Change:
<Domain semantic/invariant/authority change OR Slice/cross-cutting responsibility/composition change>

Behavior contribution:
<BI contribution changes when useful>

Implementation Items:
<DI/SI/local implementation-item changes only when useful>

Compatibility / transition:
<only when a temporary implementation rule materially matters>

Architecture decision:
<only when material>
```

Do not copy the Scenario-owned behavioral step into the lower owner. Reference it and document only this owner's response.

---

<a id="template-evolution-steps-map-entry"></a>
## Template — Evolution Steps Map entry

Use in [`evolution-steps-map.md`](evolution-steps-map.md) to plan sequence/dependencies without redefining the step.

```text
### <readable Application Evolution Step name>
Evolution Step:
<link to canonical Scenario-owned EVO>

Depends on:
- <step / condition>

Enables:
- <step / future Scenario / capability>

Can run in parallel with:
- <step, when useful>

Planning note:
<only ordering/dependency information; do not restate the behavioral delta>
```

The map order may change without changing Evolution Step identity.

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

## Changes by Application Evolution Step
<use the Changes by Application Evolution Step form when this Domain owner must change for a Scenario-owned step>
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

## Changes by Application Evolution Step
<use the Changes by Application Evolution Step form when this Domain Object must change for a Scenario-owned step>
```

A separate source class is not by itself a reason to create this file.

---

<a id="template-slice-owner"></a>
## Template — Slice owner

```text
# SL-RPKG-<SEMANTIC-NAME> — <readable Slice name>

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

## Changes by Application Evolution Step
<use the Changes by Application Evolution Step form for each Scenario-owned application step that changes this Slice>
```

Feature Interaction is behavioral decomposition and Slice is implementation decomposition; no 1:1 mapping is required. `Slice Implementation Items` are optional. `Changes by Application Evolution Step` describes how this Slice changes; it does not make the Slice an owner of the Application Evolution Step. Do not put current method names, service call chains, Java fields or adapter routing here just to describe the code.

---

<a id="template-cross-cutting-capability-owner"></a>
## Template — Cross-cutting Capability owner

Use only when one real shared implementation responsibility spans several Slices.

```text
# CC-RPKG-<SEMANTIC-NAME> — <readable Cross-cutting Capability name>

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

## Changes by Application Evolution Step
<use the Changes by Application Evolution Step form when a Scenario-owned application step changes this shared capability>
```

A common principle such as DRY, logging or composition is not by itself a Cross-cutting Capability. A repeated Feature Interaction name is also not by itself proof of a shared implementation owner. Cross-cutting owners reference Scenario-owned Application Evolution Steps and document only their implementation response.

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
