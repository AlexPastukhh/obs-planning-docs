# IDTSPE Core Map — Generic Runtime, Target System, Lens System And Persistence

Status: active generic methodology map

## 1. Core Formula

```text
Trigger / Invocation
↓
Target Formation
↓
Target Module or Local Target Contract
  → Target Step-Result Contract
  → Resolution / Production Method
+
typed Sources
+
selected/applicable Lenses
↓
iterative IDTSPE work
  Broad Discussion
    material logical parts → Key Points
    material Ideas explicit → Addresses Target Goal / Question / Problem
    no mandatory per-response Intake Summary / block-owner record
  ↕
  periodic Integration Checkpoint
    Target Goal / Desired Outcome context
    IDTSPE State Units
      Sources / Questions / Ideas / Q-R-P / Decisions / Evidence / Revalidation
    ↕ Lenses / consistency checks
    ↕ Target Step Result Units
    ↕ semantic retention
    ↕ P-14 / TF-10 only when physical placement is material
↓
continue discussion / Handoff / next route
↓
Evidence / selective Revalidation
```

Canonical runtime: [`IDTSPE-SHELL.md`](IDTSPE-SHELL.md). Optional default operating mode: [`IDTSPE-DEFAULT-WORK-MODE.md`](IDTSPE-DEFAULT-WORK-MODE.md).

## 2. Generic Owner Hierarchy

```text
PLANNING-GOVERNANCE
  ↓
shared generic model owners
  Target / Unit / Target Module / Lens / Decision / persistence models
  ↓
IDTSPE-SHELL
  runtime/composition contract over those owners
  ↓
Target Module / Lens contract
  ↓
concrete Target Instance
  ↓
persisted semantic/planning owner
```

Examples, profile workflow files and command/helper UI are projections; they are never stronger semantic authorities than these owners.

## 3. Target Module System

Generic mechanics:

- [`target-modules/README.md`](target-modules/README.md)
- [`shared/idtspe-unit-and-target-step-result-model.md`](shared/idtspe-unit-and-target-step-result-model.md)
- [`shared/broad-discussion-and-integration-checkpoint-model.md`](shared/broad-discussion-and-integration-checkpoint-model.md)
- [`shared/finding-disposition-contract.md`](shared/finding-disposition-contract.md)
- [`shared/target-module-model.md`](shared/target-module-model.md)
- [`shared/knowledge-basis-contract.md`](shared/knowledge-basis-contract.md) — lightweight theory-to-application Knowledge Basis guidance used by Target Modules and Lenses when useful.
- [`shared/target-module-creation-and-integration-use-case.md`](shared/target-module-creation-and-integration-use-case.md)
- [`shared/target-module-output-template-and-question-set-rule.md`](shared/target-module-output-template-and-question-set-rule.md)

A Target Module defines one recurring Target/Step-Result family. It defines target-specific Result Units plus reusable ways to resolve/produce them, while generic Questions/Ideas/Q-R-P/Decisions/Evidence remain Core State Units. It separates its current Target-instance Source Contract from its reusable `Knowledge Basis`. A profile installs concrete modules. IDTSPE Core itself does not require Application/Scenario/Domain/Slice Target types.

## 4. Lens System

Generic Lens semantics:

- [`lenses/LENS-MODEL.md`](lenses/LENS-MODEL.md)
- [`lenses/README.md`](lenses/README.md)

Every material IDTSPE uses the required Core Pack proportionally:

```text
L1 Need / Value / Scope
L2 Authority / SoT / Reuse
L3 Uncertainty / Assumption / Reversibility
Documentation / Representation / Artifact Boundary
  required when material output may persist
```

Additional generic and profile-specific Lenses are selected by the `TF-06A` Lens Applicability Scan from required Core, active Target Module attachment policy, Core/profile registries and explicit user/agent selection. A Local Target Contract can use the same registry without a reusable Target Module. Target Modules and Lenses share the same Knowledge Basis boundary: reusable theory may be selected/referenced and interpreted for the consumer without becoming current project input/evidence. Knowledge Basis representation is free-form and optional when no separate theory bridge adds value. Each Lens separates current Target inputs from reusable knowledge; each Target Module separates current Sources from reusable knowledge. A Lens operates inside the IDTSPE Unit model through an Analysis Surface and supported operations (`ANALYZE / CHECK / REFINE / CHALLENGE`). It may contribute explanatory Broad Discussion/Key Points without creating State; material meaning needing ownership/State/lifecycle disposition surfaces as a Finding Candidate. Generic Core Finding Disposition resolves those consequences, and normal resolution may later update already-declared Result Units. The Lens does not define Unit kinds, Target output schema or semantic authority.

The generic reusable set includes [`LENS-LINKED-NOTES-USAGE-JUSTIFICATION`](lenses/reusable/LENS-LINKED-NOTES-USAGE-JUSTIFICATION.md), which justifies or rejects Linked Notes/backlink/query behavior. Linked Notes are not a Core storage tree or semantic owner.

## 5. Ideas, Q/R/P And Decision Trace

Every material Idea is explicitly surfaced and carries `Addresses → current Target Goal / Question / Problem`; the Target Goal remains Target/scope context rather than a new Generic State Unit. When a Target Module is active its Target Goal plus Question/Problem candidates are the ordinary starting driver set, while new drivers/Ideas from other accepted inputs remain equal Core meaning. Ideas may compete, complement, require/conflict with one another, or compose into a lightweight Candidate Bundle / Option Group. Bundles are grouping/comparison projections by default, not new required State Units or Planning Branches. Canonical working model: [`shared/broad-discussion-and-integration-checkpoint-model.md`](shared/broad-discussion-and-integration-checkpoint-model.md).


`P-09` already carries `Question / Risk / Problem`. The lightweight extension at [`shared/qrp-priority-groups-and-decision-trace.md`](shared/qrp-priority-groups-and-decision-trace.md) adds only:

```text
P0 / P1 / P2 / P3 impact priority
related Q/R/P groups when causal/resolution linkage is useful
Decision.Addresses → Goal / Question / Problem / Q-R-P handled by a Decision
Decision.Selected  → selected Idea(s) / Candidate Bundle when useful
Decision.Rationale / Why → optional selection reasoning, distinct from Evidence
Decision.Exposes   → Q/R/P revealed/created by a Decision
```

This is not a second Concern runtime or required global register.

## 6. Representation And Artifact Placement

Fundamental representation policy:

[`lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md)

Concrete placement/response contract:

[`shared/artifact-placement-and-idtspe-response-contract.md`](shared/artifact-placement-and-idtspe-response-contract.md)

An Integration Checkpoint or other persistence-sensitive structured output can show physical placement when material:

```text
Content
Semantic Owner
Persistence Guidance
Destination
Action
Placement Status
Guidance Source(s)
```

Profile Target Modules/Lenses add `AP-*` / `AG-*` source proposals. The Documentation / Representation Lens decides whether/how meaning should materialize; `P-14 / TF-10` resolves the concrete path/section/code/generated destination and action.

## 7. Repeat Invocation

The same Target may be viewed again through the IDTSPE Shell. A repeated full Target integration pass may serve as an Integration Checkpoint without creating a new invocation mode or Target:

```text
CREATE
REFINE
EXTEND
REVALIDATE
REPAIR
```

Existing owner representations become current Sources. A repeated call updates/reuses the same logical owner unless Target Formation proves that a new independently useful Target exists; this does not imply a dedicated file for either owner.

## 8. Profile Boundary

```text
IDTSPE Core
↓
profile manifest
↓
profile Target Modules + profile Lenses + workflow + artifact topology
↓
concrete planning workspace
```

Current installed profile: [`../profiles/sds/README.md`](../profiles/sds/README.md).

Future profiles may coexist without being forced into SDS concepts.

## 9. Theoretical Modules And Peer Concerns

[`../theoretical-modules/README.md`](../theoretical-modules/README.md) defines a separate staging type for useful knowledge that is not yet operationalized as a Target Module/Lens. Bootstrap discovers the registry; raw bodies are read only when useful.

[`../ai-reviewability/README.md`](../ai-reviewability/README.md) is an independent peer concern. Its generic Key Points contract applies proportionally to material outputs; within Broad Discussion, Key Points structure material logical parts. Broad Discussion Summary is a separate optional checkpoint-level retrospective projection. No mandatory block-owner or per-response Intake Summary is introduced, and none of these review projections becomes Target semantics.
