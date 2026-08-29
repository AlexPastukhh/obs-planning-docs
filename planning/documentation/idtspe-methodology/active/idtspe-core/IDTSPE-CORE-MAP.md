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
  IDTSPE State Units
    Sources / Questions / Ideas / Q-R-P / Decisions / Evidence / Revalidation
  ↕
  Lenses
  ↕
  Target Step Result Units
↓
Validation
↓
current P-14 / TF-10 Artifact Placement
↓
Handoff / next route
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
- [`shared/finding-disposition-contract.md`](shared/finding-disposition-contract.md)
- [`shared/target-module-model.md`](shared/target-module-model.md)
- [`shared/knowledge-basis-contract.md`](shared/knowledge-basis-contract.md) — shared `INLINE / REFERENCED / HYBRID` knowledge dependency contract used by Target Modules and Lenses.
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

Additional generic and profile-specific Lenses are selected by the `TF-06A` Lens Applicability Scan from required Core, active Target Module attachment policy, Core/profile registries and explicit user/agent selection. A Local Target Contract can use the same registry without a reusable Target Module. Target Modules and Lenses share the same inline/referenced/hybrid Knowledge Basis sub-contract. Each Lens separates its Operational Evaluation Contract from that Knowledge Basis; each Target Module separates its operational Target contract/Source Contract from its own Knowledge Basis. A Lens operates inside the IDTSPE Unit model through an Analysis Surface and supported operations (`ANALYZE / CHECK / REFINE / CHALLENGE`). It surfaces Finding Candidates; generic Core Finding Disposition resolves ownership/State/lifecycle consequences, and normal resolution may later update already-declared Result Units. The Lens does not define Unit kinds, Target output schema or semantic authority.

The generic reusable set includes [`LENS-LINKED-NOTES-USAGE-JUSTIFICATION`](lenses/reusable/LENS-LINKED-NOTES-USAGE-JUSTIFICATION.md), which justifies or rejects Linked Notes/backlink/query behavior. Linked Notes are not a Core storage tree or semantic owner.

## 5. Q/R/P Review Mechanics

`P-09` already carries `Question / Risk / Problem`. The lightweight extension at [`shared/qrp-priority-groups-and-decision-trace.md`](shared/qrp-priority-groups-and-decision-trace.md) adds only:

```text
P0 / P1 / P2 / P3 impact priority
related Q/R/P groups when causal/resolution linkage is useful
Decision.Addresses → Q/R/P handled by a Decision
Decision.Exposes   → Q/R/P revealed/created by a Decision
```

This is not a second Concern runtime or required global register.

## 6. Representation And Artifact Placement

Fundamental representation policy:

[`lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md)

Concrete placement/response contract:

[`shared/artifact-placement-and-idtspe-response-contract.md`](shared/artifact-placement-and-idtspe-response-contract.md)

Every material IDTSPE response can show:

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

The same Target may be viewed again through the IDTSPE Shell:

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

[`../ai-reviewability/README.md`](../ai-reviewability/README.md) is an independent peer concern. Its Key Points projection may be used by material IDTSPE outputs without becoming Target semantics.
