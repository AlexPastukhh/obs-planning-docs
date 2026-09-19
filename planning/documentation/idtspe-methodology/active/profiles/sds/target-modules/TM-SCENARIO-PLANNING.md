# TM-SCENARIO-PLANNING — Scenario Journey Composition

Entry Point: `tm.scenario`  
Role: journey-composition Target Module  
Compatibility rule: canonical ID/path `TM-SCENARIO-PLANNING` is retained; the semantic owner is Scenario Journey Composition.

## Purpose

Own one coherent actor/external journey composition across Feature results, Screens and external contexts, including where one or more upstream Application Benefits manifest or close.

Scenario does **not** own Feature behavior, Feature semantic data, implementation Slice topology, Domain semantics or target-state implementation requirements.

## Temporal Authority / Evolution-Step Hosting

A canonical Scenario owner describes the realized/current journey composition. For a journey that is only planned, changed or newly introduced in an unrealized future state, use this module inside `TM-EVOLUTION-STEP` to produce a **Target Scenario Body**.

Selected future journey meaning remains Step-owned until realization/materialization. Current Scenario `RU-SCEN-02` specializes the shared Current-Owner Evolution Impact Projection Contract for journey-composition revalidation; it does not own a second future roadmap.

## Owned Meaning

A Scenario may own proportionally:

- participating actor(s) / external parties;
- participating Features and contextual links;
- linking actor/external actions between Feature results;
- ordering, branching, convergence, optional paths and re-entry;
- result/context continuity from one step to the next;
- Screen/external-system participation when journey-significant;
- Benefit manifestation/closure / what makes the journey complete;
- stable `SR-*` Scenario Requirements for journey-level must-holds that are not merely copied Feature behavior;
- optional stable `SPS-*` Scenario Path Step identities when a path step needs independent cross-reference/revalidation;
- optional E2E Proof Intent when whole-journey proof is independently useful;
- journey-wide realization/proof/integration concerns whose natural subject is the Scenario rather than one Feature or exact implementation mechanism.

## Source Contract

Typical sources:

- Application Definition / Need / one or more `AB-*` Benefits when applicable;
- selected Features;
- Screen topology;
- external actor/system facts;
- current implementation/Evidence;
- Prototype / Practical Test findings;
- relevant Evolution Step(s);
- accepted Proposal/Decision material affecting journey composition.

## Production Method

```text
identify actor + Benefit manifestation/closure
→ select/reconcile participating Feature results
→ establish order / branch / convergence / re-entry
→ preserve result/context continuity
→ map material Screen/external participation
→ capture sparse journey must-holds
→ optionally capture E2E Proof Intent
→ resolve journey-wide realization/proof/integration concerns when material
↺ reconcile with Feature / Screen peers
```

Scenario formation is non-linear. A finding in journey composition may challenge a Feature or Screen through normal Proposal/revalidation; it does not directly mutate them.

## Unit Contract Conformance

This module specializes the Core [Target Module Model](../../../idtspe-core/shared/target-module-model.md) and [Unit / Target Step Result Model](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md). The Core owners define generic Unit lifecycle, complete-inventory/disposition and Proposal/Core-State semantics; this module defines only its SDS-specific Unit responsibilities, local materiality, production guidance, validators and handoffs below.

## Target Step-Result Contract

**Target Step Result:** `Scenario Journey Composition`

| Result Unit | Meaning |
|---|---|
| `RU-SCEN-01` | Journey Composition — actor/external participation, Feature/context links, order/branch/convergence/re-entry, continuity, Benefit manifestation/closure, sparse journey must-holds and optional E2E Proof Intent |
| `RU-SCEN-02` | Evolution Impact — Scenario-local current-owner reverse navigation/revalidation under the shared projection contract |
| `RU-SCEN-03` | Journey Realization Concerns — Scenario-wide realization/proof/integration pressure without exact mechanism ownership |

### Result Unit Applicability / Materiality

Unit presence/disposition mechanics follow the Core [`Unit Applicability / Materiality / Disposition Contract`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5a-unit-applicability--materiality--disposition-contract). The table below owns only this module's local substantive-materiality and omission-rationale triggers.

| Result Unit | Substantive resolution is material when | Unit disposition when substantive resolution is not material |
|---|---|---|
| `RU-SCEN-01` | when journey composition across actors/features/screens/external steps has independent planning value | `OMITTED` when no independently material journey-composition result is needed beyond referenced owner meaning |
| `RU-SCEN-02` | for a current realized Scenario, when any concrete unrealized Step materially affects its journey composition; depth follows what that Step has actually resolved | use `OMITTED` with a concise reason when no concrete unrealized Step materially affects this Scenario; in a future Target Scenario Body keep `RU-SCEN-02` present but `OMITTED` because current-owner reverse projection is not applicable inside Step-owned future meaning |
| `RU-SCEN-03` | when a journey-wide realization/proof/integration concern can materially change feasibility, continuity or proof allocation and is not owned by one Feature/Screen/Domain/Slice/Shared owner | `OMITTED` with a concise reason when no Scenario-wide realization/proof/integration concern exists |


`RU-SCEN-01` is intentionally broad because its journey aspects jointly define one graph. `RU-SCEN-02` is separate because current-owner evolution navigation/revalidation has a different responsibility. `RU-SCEN-03` is separate because journey-wide realization/proof pressure is not journey composition itself and can be consumed by Step-wide implementation-concern analysis. Internal journey objects/steps/branches remain addressable within `RU-SCEN-01` when useful without becoming separate target-state Result Units.


### Explicit Unit Checkpoint Placement

Each material Unit below inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5b-unit-applicability-envelope--opening--in-unit--closing-checkpoints). Opening/Closing are mandatory logical applicability boundaries; registries may also be checked during Unit work whenever new material pressure appears.

#### `RU-SCEN-01` processing envelope

1. **Opening Unit Checkpoint — `RU-SCEN-01`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-SCEN-01`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-SCEN-01`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-SCEN-02` processing envelope

1. **Opening Unit Checkpoint — `RU-SCEN-02`** — determine whether this Scenario's journey composition is materially affected, then apply the shared [Current-Owner Evolution Impact Projection Contract](../shared/current-owner-evolution-impact-projection-contract.md).
2. **Unit Work — `RU-SCEN-02`** — produce the Scenario-local reverse navigation/revalidation projection under that shared contract.
3. **Closing Unit Checkpoint — `RU-SCEN-02`** — validate Scenario-local revalidation/handoff needs and the shared projection-contract guards.

#### `RU-SCEN-03` processing envelope

1. **Opening Unit Checkpoint — `RU-SCEN-03`** — inspect journey composition plus owner-local Feature/Screen/Domain/Slice/Shared concerns and proof pressure; bind supporting methods before applying them.
2. **Unit Work — `RU-SCEN-03`** — retain only Scenario-wide realization/proof/integration pressure that can change journey feasibility/continuity/proof; route owner-local concerns to their owners and literal mechanisms to Exact.
3. **Closing Unit Checkpoint — `RU-SCEN-03`** — ensure concern meaning does not become a duplicate Feature implementation concern, Slice plan or exact mechanism.

### RU-SCEN-02 — Evolution Impact

This Scenario-local Unit specializes the shared [Current-Owner Evolution Impact Projection Contract](../shared/current-owner-evolution-impact-projection-contract.md). Its local affected surface is **journey composition**. The shared contract owns inclusion threshold across candidate/selected/conditional/deferred Steps, truthful planning-position projection, depth/no-copy rules and post-realization removal from active future impact. This Target Module owns only the Unit identity, Scenario-specific materiality test and local revalidation/handoff use.

### RU-SCEN-03 — Journey Realization Concerns

Own only material realization/proof/integration concerns whose smallest natural subject is the Scenario journey as a whole, for example cross-Feature correlation/continuity pressure, whole-journey observability/proof pressure or external-context handoff constraints that can change Scenario feasibility.

Do not copy one Feature's `RU-FEAT-04`, one owner-local IR/PFR or exact transport/mechanism detail. Reference those owners. A future Target Scenario Body carries future Scenario-wide concerns; a current Scenario keeps only currently realized concerns with independent semantic value.

## Journey Shape

A compact representation may look like:

```text
Scenario: <ID / name>
Actor / context: ...
Benefit refs: <AB-* ...>   # one or several when material

Journey:
  Feature A result
    → [AB-01 manifests/closes]   # optional path-step annotation when useful
  → actor/external linking action
  → Feature B result
  ├─ branch ...
  └─ branch ...
  → convergence / re-entry ...

Continuity:
  <what context/result survives between steps>

Journey must-holds:
  <only constraints natural to the whole journey>

E2E Proof Intent: optional
```


Application Benefits remain upstream Application Definition authority. A Scenario may manifest/close one or several `AB-*` items across different `SPS-*` path steps or at the terminal journey result. Those markers express where the user experiences upstream value; they do not transfer Benefit semantics into the Scenario.

## Peer Boundaries

```text
Feature
  owns behavior and principal result semantics

Scenario
  owns journey composition across those results

Screen
  owns spatial/navigation composition and Feature presence
```

The same Feature may participate in several Scenarios. A Scenario may traverse several Screens. Neither relationship transfers semantic authority.

## Source Discovery Rule

Prefer selected semantic owners and current Evidence over stale copied scenario prose.

```text
Application Definition / Need / one or more `AB-*` Benefits when relevant
+ selected Feature results
+ selected Screen/external context
+ current implementation/Evidence
+ relevant Evolution Steps
→ current Scenario journey question
```

A current implementation fact may challenge the journey but does not become Scenario authority merely because it exists.

## Lens Profile

Required Core Lens pack applies.

Conditional SDS/Core Lenses:
- UI/Spatial when Screen participation/navigation is material;
- Vertical Slice when the journey exposes a missing/merged/split Feature or weak Feature/Slice boundary;
- Test Proof when E2E proof intent/allocation is non-trivial;
- Evolution when known Steps change journey composition;
- Representation when persistence/addressability is material.

## Journey Constraint Identity

Scenario owns a stable `SR-*` Requirement family for independently useful journey-level must-holds. Use the shared [`Requirement Classification And Representation Contract`](../shared/requirement-classification-and-representation-contract.md) for Type/QRPE semantics.

When addressable Scenario Requirements are material, use the exact reusable table schema:

```text
Scenario Requirement | Type | Plain required interaction/journey meaning | QRPE / Examples
```

When stable `SPS-*` identities are material, use the exact reusable path schema:

```text
Scenario Path Step | Actor / application interaction | Feature / participant | Data/result | Benefit manifestation / closure | Attached SR | QRPE / Examples
```

```text
journey must-hold natural to the Scenario
→ SR-*

Feature behavior must-hold
→ BR-* in Feature; Scenario references it rather than copying it
```

Use stable `SPS-*` identities for Scenario path steps only when cross-reference/revalidation benefits from identity. Order/branch/path structure may itself be selected normative journey structure without becoming an SR merely by existing.

A Scenario may reference Feature-owned `FDO-*` to make inter-step data/result continuity explicit.

## Evolution / Change Outlook

Scenario does not own a second future roadmap. `RU-SCEN-02` exposes only current-owner reverse navigation/revalidation; the applicable Evolution Step owns the future impact.

```text
known future journey/capability change
→ TM-EVOLUTION-STEP / RU-EVO-02 Scenario impact
→ optional complete Target Scenario Body when candidate/selected journey meaning is sufficiently resolved for the requested Target Result depth; selection is still required for canonical integration/materialization
→ RU-SCEN-02 in current Scenario references that Step when useful
→ realization/materialization updates current Scenario authority
```

## Representation / Artifact Contract

Use Core Artifact Boundary/Addressability rules.

Valid forms include:
- inline Scenario section;
- several small Scenarios in one owner file;
- dedicated Scenario file when independently reviewed/reused.

Preserve Scenario identity, actor/context where material, Feature references, branch/convergence/re-entry, continuity, Screen/external participation and Benefit manifestation/closure. Do not turn a journey representation into a second Feature behavior catalog.

## Validators

```text
journey boundary has coherent starting context + truthful Benefit manifestation/closure and journey result
participating Feature results are truthful references to Feature authority
linking actor/external actions are explicit when they matter
branch paths converge/re-enter/stop explicitly
continuity identity/Data/context is preserved across steps
Screen participation is spatial/contextual, not behavior ownership
journey must-holds are truly cross-Feature/context and do not duplicate BRs
optional E2E proof intent remains proof intent, not test catalog
known future change is routed through Evolution Step rather than hidden here
current-owner reverse impact includes every concrete materially relevant unrealized Step with truthful planning position
journey realization concerns are Scenario-wide rather than copied owner-local/exact mechanism detail
representation remains proportional/addressable
```

## Repository / Source Provenance

When current repository/app examples are used as Evidence, retain enough source identity/version/context for later revalidation. Provenance supports the Scenario; it is not the journey authority.

## Guards

```text
Scenario ≠ behavior catalog
Scenario ≠ data owner
Scenario ≠ Screen flowchart only
Scenario ≠ implementation Slice
journey must-hold ≠ copied Feature BR
E2E Proof Intent ≠ mandatory test catalog
```

## Handoff

Scenario findings route to the natural owner through Proposal/revalidation. Implementation work starts from selected Feature meaning; Scenario remains a source when whole-journey continuity, `RU-SCEN-03` realization concerns or E2E proof matters. Evolution Step `RU-EVO-03` may reference Scenario realization concerns when their composition creates Step-wide pressure.
