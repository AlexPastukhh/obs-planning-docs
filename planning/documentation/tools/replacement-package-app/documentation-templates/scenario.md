# Templates — Scenario and Feature Interaction

Status: physically separated part of the recommended-template owner. Templates remain recommended forms, not schemas.

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

## Realization Dependencies / Questions / Candidates
<only material implementation-feasibility dependencies, assumptions, questions or candidate realizations on which Scenario plausibility or selected runtime composition depends>

### <readable dependency / question>
Relevant Scenario / FI behavior:
<what selected behavior depends on this feasibility question>

Dependency / Question:
<what must be technically possible or understood>

Current assumption / candidate realization:
<non-authoritative idea/assumption only; omit when none>

Investigate during:
<Domain | Slice | Shared Implementation | source/infrastructure investigation | prototype/spike | other>

Scenario impact if invalidated:
<which FI/process/boundary may need Scenario feedback/revision>

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
- `Realization Dependencies / Questions / Candidates` is optional Scenario-owned feasibility memory. It may preserve implementation questions, assumptions and candidate HOW only when Scenario plausibility or runtime composition depends on them. It is not implementation authority and does not create `DI-*` / `SI-*` / shared Implementation Items.
- When downstream implementation planning resolves one of these entries, the selected durable HOW belongs to its natural Domain/Slice/Shared/source owner. Keep only the Scenario-relevant dependency/result here.
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
