# Replacement Package App — Documentation Templates

Status: active recommended-template owner
Scope: recommended starting forms for Scenario/Screen design and maintenance, Scenario-owned Evolution Steps, evolution planning, Domain/Slice/shared implementation owners, local proof/Test Items and generated implementation-trace documentation.

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

Planning depth is intentionally progressive:

- during early Scenario design, `Application Benefit / Desired Result` + a candidate FI map + brief FI roles/local Results may be enough;
- deepen uncertain FIs only far enough to validate boundaries and compare designs;
- once behavior is selected/current, the Scenario owner should carry the complete Process Specification, including the needed FI Interaction Processes and BI.

The documentation process and terminology are owned by [`documentation-use-cases.md`](documentation-use-cases.md). The use cases link directly to the forms below at the step where each form is useful.

---

<a id="template-scenario-owner"></a>
## Template — Scenario owner

Use the same owner form for current and planned future Scenarios; make owner status explicit instead of changing semantic structure.

```text
# SCN-RPKG-<SEMANTIC-NAME> — <readable Scenario name>
Status: active current Scenario owner
# or: planned future Scenario owner

## Application Benefit / Desired Result
<what useful application result this Scenario realizes>

## Process Specification

### Scenario Process / Feature Interaction Map
<compact FI composition / ordering / cross-FI branches / loops / terminal outcomes>

### FI-RPKG-<SEMANTIC-NAME> — <readable Feature Interaction name>
<Feature Interaction form>

## Screen references
<only when selected Screen relationships are needed to understand the observable process; detailed Screen-owned requirements stay in the Screen owner>

## Scenario Process Alternatives
<only retained material alternatives>

## Evolution Steps
### EVO-RPKG-<SEMANTIC-NAME> — <readable behavioral change>
<Evolution Step form>
```

Notes:
- The Benefit / Desired Result explains why the Scenario exists; the selected FI composition is how the Scenario realizes it.
- Process Specification remains the complete behavioral specification: Scenario Process owns FI composition/transitions and detailed FI entries own FI-local runtime behavior.
- FI/component-local UI Requirements may live with the FI; Screen-owned spatial/window requirements live in the selected Screen owner.
- `Evolution Steps` contains Scenario-owned application-behavior changes, not lower-level implementation plans.
- Current Scenario truth is not called transitional merely because future evolution exists.
- Semantic IDs/names remain meaningful if file/roadmap order changes.

---

<a id="template-feature-interaction-entry"></a>
## Template — Feature Interaction entry

Use as a recommended local form inside a Scenario Process Specification and during behavioral design exploration.

```text
### FI-RPKG-<SEMANTIC-NAME> — <readable name>

Scenario Role / Local Purpose:
<why this selected behavior exists here and what it enables/prepares for the rest of the Scenario>

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

- FI is a selected behavioral means inside the Scenario, not an independent top-level product goal.
- `Scenario Role / Local Purpose` explains why the FI exists in this composition; `Why This Interaction Design` explains why this particular realization was selected.
- Context/Preconditions are not automatically Required Inputs.
- Result is not the same thing as Outputs; local Result helps define a useful FI boundary.
- Success, validation error, interruption and uncertainty are usually outcomes of the same FI while its Scenario-local role remains unchanged.
- Behavior Items are implementation-independent requirements needed for selected FI behavior to correctly realize the Scenario. FI/component-local UI Requirements may remain here; Screen-owned spatial/window requirements belong to the selected Screen owner and are referenced rather than duplicated.
- If one BI constrains the boundary between several Feature Interactions, define its `Requirement + Reason` once and reference the same BI identity from the other relevant interactions instead of duplicating/rewording it.
- Do not document accidental current layout as a durable UI requirement.
- Omit design-analysis headings for obvious/simple interactions when they add no information.

---

<a id="template-feature-interaction-variant-analysis"></a>
## Template — Feature Interaction Variant analysis

Use when a local interaction has materially different behavioral designs worth comparing.

```text
### <candidate / variant name>

Scenario Role / Local Purpose:
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

Use to compare materially different complete FI compositions for the same Scenario Benefit / desired result.

```text
### <Scenario Process Variant>

Application Benefit / Desired Result:
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

Compare both the interactions and the boundaries/contracts between them. Explore enough FI-local runtime behavior to judge whether the candidate boundaries are real; do not require full FI detail while the high-level composition is still moving. More interactions may add control/recovery points; fewer interactions may reduce user work while increasing partial-completion/recovery complexity.

---

<a id="template-screen-variant-analysis"></a>
## Template — Screen Set / Screen Variant analysis

Use during Scenario+Screen design exploration when materially different spatial/window realizations are worth comparing. A **Screen Set Variant** changes the overall Screen/window topology; an **individual Screen Variant** changes how one Screen responsibility is realized.

```text
### <candidate Screen Set / Screen Variant>

Scope:
<overall Screen Set | one Screen responsibility>

Scenario / Feature Interaction coverage:
<which selected/candidate behavior this variant must realize>

Screen topology / routes:
<screens, entry/exit and navigation/window relations when material>

Per-Screen responsibilities:
<what each Screen makes available or controls>

Meaningful visible / input / action states:
...

Candidate Screen Behavior Items:
<only durable Screen-owned requirements exposed by this variant>

Impact on Scenario/FI contracts:
<hidden/manual context transfer, changed outputs, recovery/control boundaries or other feedback into behavioral design>

Strengths:
...

Problems:
...

Complexity:
<user / spatial / navigation / implementation / testing / evolution where material>

Risks:
...

Questions:
...

Decision / rationale:
<selected / rejected / still open only when useful>
```

Do not force every visual alternative into a retained artifact. Preserve a variant only while its comparison/rationale remains material to an active design decision.

---

<a id="template-ui-requirement"></a>
## Template — UI / Screen requirement forms

### Interaction/component-local UI Requirement

```text
#### UI-REQ-RPKG-<SEMANTIC-NAME> — <readable UI requirement>
Requirement:
<intentional interaction/component presentation requirement>

Reason:
<why it matters, when useful>
```

Keep this with the owning Feature Interaction when the meaning is genuinely local.

### Screen Behavior Item

Use only when canonical meaning belongs to a Screen/spatial/window context. A technical prefix such as `SBI-*` may be used if/when the application adopts it, but readable semantic identity is more important than inventing a mandatory prefix now.

```text
#### <semantic Screen requirement ID/name> — <readable Screen behavior requirement>
Requirement:
<intentional Screen/spatial/window behavior or visibility/availability rule>

Reason:
<why the Screen realization requires it>
```

Current pixels/layout facts do not become durable requirements automatically.

---

<a id="template-evolution-step"></a>
## Template — Evolution Step

Use only in the canonical Scenario owner. The entry describes **what changes in application/Scenario behavior**, not Domain/Slice/Screen/test implementation delta.

```text
### EVO-RPKG-<SEMANTIC-NAME> — <readable application change>
Intent: URGENT | PLANNED | POSSIBLE <only when useful>

Change:
<what changes for the user/application process>

Scenario Process / Feature Interaction impact:
<added/removed/replaced/composed/split behavior when material>

Contract / Behavior Item / local UI impact:
<only selected behavioral requirement changes>

Affected Screen realization:
<references when useful; detailed Screen delta stays in Screen Evolution Impact>

Related / Replacement Scenario:
<references only when useful>
```

Intent does not define exact roadmap timing/likelihood/order; the Evolution Steps Map owns those planning relations.

---

<a id="template-evolution-impact"></a>
## Template — Evolution Impact

Use inside Domain, Slice, Screen or Shared Implementation Capability owners to describe **future owner delta** caused by a canonical Scenario-owned Evolution Step.

```text
## Evolution Impact

### EVO-RPKG-<SEMANTIC-NAME> — <readable application change>
Canonical Scenario step:
<link / Scenario owner>

Expansion:
<additive capability/composition/port/consumer/test-proof delta, only when present>

Refactoring:
<behavior-preserving implementation or test-suite structural improvement, only when useful>

Forced Migration:
<existing logic/authority/representation that must move because additive realization is not practical; only when real>
```

Omit empty kinds. `Evolution Impact` does not repeat current `DI-*` / `SI-*` / shared Implementation Item `Requirement + Reason`. Those items shape the owner now; reference them only when needed to understand the future delta.

When Tests are embedded in the owner, material test-suite change belongs in the same `Evolution Impact` and may be an Expansion or Refactoring; do not create a parallel test-evolution owner merely to say tests change. Most Evolution Steps need no separate test-suite note.

---

<a id="template-evolution-steps-map-entry"></a>
## Template — Evolution Steps Map entry

```text
### <readable Evolution Step name>
Evolution Step:
<link to canonical Scenario-owned EVO>

Rough horizon / likelihood:
<only when useful>

Depends on:
- ...

Enables:
- ...

Can run in parallel with:
- ...

Readiness / gate:
<only when useful>

Materially independent local impact timing:
- <lower-owner Evolution Impact reference> — <before/with/after/conditional/rough likelihood>
```

Keep WHAT behavior/owner delta in the canonical owners; this entry is planning relationships only.

---

<a id="template-aggregate-domain-owner"></a>
## Template — Aggregate Domain owner

```text
# <Aggregate>

## Responsibility
<business/domain responsibility and consistency boundary>

## Behavior Items implemented
- BI-...

## Domain Concepts / Invariants
<semantic meaning, not class/field inventory>

## Domain Implementation Items
### DI-...
Requirement:
<durable current architecture requirement>
Reason:
<why it matters for current correctness/quality or materially known evolution>
Derived from:
<BI / invariant / Evolution Impact / concrete architecture pressure, when useful>

## Tests
### Test Items
<only non-obvious durable proof-quality requirements>

## Evolution Impact
<Evolution Impact form for affected future steps>
```

`DI-*`, Tests/Test Items and Evolution Impact are optional when their information is obvious/unneeded. Aggregate tests normally cover included Domain Objects unless independent ownership makes a separate proof owner clearer.

---

<a id="template-domain-object-owner"></a>
## Template — Domain Object owner

Use separately only when independent semantics, identity/lifecycle, reuse or rule volume makes this clearer than keeping the object inside its Aggregate.

```text
# <Domain Object>

## Responsibility / Meaning
...
## Behavior Items implemented
- BI-...
## Identity / Relationships / Invariants
...
## Domain Implementation Items
<DI-* only when useful>
## Tests
<only when independent test ownership is clearer than Aggregate-level proof>
## Evolution Impact
<only affected future steps>
```

A source class is not by itself a reason to create this owner.

---

<a id="template-slice-owner"></a>
## Template — Slice owner

```text
# SL-RPKG-<SEMANTIC-NAME> — <readable Slice name>

## Result / Responsibility
...

## Scenario behavior realized
Feature Interaction context:
- FI-... <navigation only when useful>
Behavior Items realized:
- BI-...

## Domain / Shared capabilities used
- ...

## Slice Implementation Items
### SI-...
Requirement:
<durable orchestration/composition/recovery/port/reuse requirement>
Reason:
<why current quality or materially known evolution needs it>
Derived from:
<BI / Domain constraint / Evolution Impact / concrete architecture pressure>

## Tests
### Test Items
<only non-obvious durable proof-quality requirements>

## Evolution Impact
<Evolution Impact form>
```

Feature Interaction and Slice decompositions are not 1:1. A known future capability may justify a port/composition seam now without implementing that future capability prematurely.

---

<a id="template-shared-implementation-capability-owner"></a>
## Template — Shared Implementation Capability owner

Use only when one real reusable implementation responsibility is consumed by several Slices.

```text
# <semantic Shared Implementation Capability name>

## Responsibility
...
## Behavior Items / implementation requirements realized
<references only when genuinely shared>
## Domain used
...
## Consumers
- SL-...
## Implementation Items
<durable shared contract/composition/evolution requirements>
## Tests
### Test Items
<only when useful>
## Evolution Impact
<only affected future steps>
```

Do not create one for generic DRY/logging/composition principles or merely similar helper code.

---

<a id="template-screen-owner"></a>
## Template — Screen owner

Default selected model may live in one `screens.md`; split individual Screen files only when independently useful.

```text
# Replacement Package App — Screens

## Screen Map
<screen inventory / routes / global spatial constraints>

## Scenario × Screen
...
## Feature Interaction × Screen
...

## <Screen readable name>
Purpose:
...
Scenario roles:
...
Feature Interactions:
...
Meaningful visible/input/action states:
...
Screen Behavior Items:
<use Screen requirement form>
Routes / transitions:
...
Spatial / accessibility constraints:
<only intentional material constraints>

## Evolution Impact
<only affected future steps>
```

Screen is spatial/window meaning, not Scenario behavior authority or a frontend Slice.

---

<a id="template-test-item"></a>
## Template — Test Item

```text
### TST-RPKG-<SEMANTIC-NAME> — <readable proof requirement>
Requirement:
<additional condition needed for credible proof>

Reason:
<false-positive / boundary / no-mutation / persistence / isolation / refactor-evolution reason>
```

Do not restate every BI/invariant as a Test Item. Normal proof responsibility is already derived from the owning semantics. Refactor/evolution resilience means proof should remain stable while the property it proves remains unchanged; when an Evolution Step genuinely changes that property, the Test Item/test may legitimately change.

---

<a id="template-shared-test-capability"></a>
## Template — Shared Test Capability

Use only for real reusable test machinery/behavior shared by several suites.

```text
# <readable Shared Test Capability>
Responsibility:
...
Consumers:
- <test suite/owner>
Requirements:
<durable reusable test-capability requirements only when useful>
Evolution Impact:
<only when future evolution changes this shared test machinery>
```

Testing policy belongs in Test Strategy, not here.

---

<a id="template-test-design"></a>
## Template — Optional Test Design

Use only when how to prove a selected property credibly is itself non-trivial.

```text
Property / authority:
<BI / invariant / SI/DI / Screen requirement / contract>
Proof layer / public boundary:
...
Setup / action / observation / assertions:
...
False-confidence / no-mutation / isolation considerations:
...
Decision:
...
```

Embed locally by default; separate only when independently substantial.

---

<a id="template-practical-acceptance"></a>
## Template — Practical Acceptance plan and Evidence

```text
## Acceptance Plan
Target property:
Operator / environment:
Setup:
Action:
Observable evidence:
Pass/fail rule:

## Evidence Campaign
Date/build/environment:
Acceptance plan ref:
Result: PASS | FAIL | STALE
Evidence:
Limitations:
```

A plan is not executed Evidence.

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
