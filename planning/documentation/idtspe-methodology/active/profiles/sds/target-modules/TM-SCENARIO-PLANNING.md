# TM-SCENARIO-PLANNING — Scenario Journey Composition

Entry Point: `tm.scenario`  
Role: journey-composition Target Module  
Compatibility rule: canonical ID/path `TM-SCENARIO-PLANNING` is retained; the semantic owner is Scenario Journey Composition.

## Purpose

Own one coherent actor-to-benefit journey composition across Feature results, Screens and external contexts.

Scenario does **not** own Feature behavior, Feature semantic data, implementation Slice topology, Domain semantics or target-state implementation requirements.

## Owned Meaning

A Scenario may own proportionally:

- participating actor(s) / external parties;
- participating Features and contextual links;
- linking actor/external actions between Feature results;
- ordering, branching, convergence, optional paths and re-entry;
- result/context continuity from one step to the next;
- Screen/external-system participation when journey-significant;
- terminal Benefit closure / what makes the journey complete;
- journey-level must-hold constraints that are not merely copied Feature behavior;
- optional E2E Proof Intent when whole-journey proof is independently useful.

## Source Contract

Typical sources:

- Need / Benefit / Application Definition when applicable;
- selected Features;
- Screen topology;
- external actor/system facts;
- current implementation/Evidence;
- Prototype / Practical Test findings;
- relevant Evolution Step(s);
- accepted Proposal/Decision material affecting journey composition.

## Production Method

```text
identify actor + terminal Benefit
→ select/reconcile participating Feature results
→ establish order / branch / convergence / re-entry
→ preserve result/context continuity
→ map material Screen/external participation
→ capture sparse journey must-holds
→ optionally capture E2E Proof Intent
↺ reconcile with Feature / Screen peers
```

Scenario formation is non-linear. A finding in journey composition may challenge a Feature or Screen through normal Proposal/revalidation; it does not directly mutate them.

## Target Step-Result Contract

**Target Step Result:** `Scenario Journey Composition`

| Result Unit | Meaning |
|---|---|
| `RU-SCEN-01` | Journey Composition — actor/external participation, Feature/context links, order/branch/convergence/re-entry, continuity, terminal Benefit closure, sparse journey must-holds and optional E2E Proof Intent |

### Result Unit Applicability / Materiality

Declared Result Units are a possible semantic surface, not a mandatory form. Apply the Core [`Unit Applicability / Materiality / Omission Contract`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5a-unit-applicability--materiality--omission-contract).

| Result Unit | Make explicit when | Omit / keep sparse when |
|---|---|---|
| `RU-SCEN-01` | when journey composition across actors/features/screens/external steps has independent planning value | omit optional branches/must-holds/E2E intent that are not material to continuity or terminal Benefit |

Do not create `N/A` placeholders. Re-evaluate a previously omitted Unit only when its trigger/materiality changes.

One RU is intentionally broad because these aspects jointly define one journey graph. Internal objects/steps/branches remain addressable within it when useful without becoming separate target-state Result Units.

## Journey Shape

A compact representation may look like:

```text
Scenario: <ID / name>
Actor / context: ...
Terminal Benefit: ...

Journey:
  Feature A result
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
Application Definition / Need / Benefit when relevant
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

Fresh R2 permits `SR-*` labels for journey-level requirements. This migration preserves the **journey must-hold meaning** but does not establish a target-state `SR-*` Requirement family.

Use stable local addressability only when the journey constraint needs independent reference/revalidation. Do not copy Feature `BR-*` text.

## Evolution / Change Outlook

Scenario may surface that current journey composition is affected by known future change, but it does not own a durable “Scenario Development/Change Outlook” roadmap.

```text
known future journey/capability change
→ TM-EVOLUTION-STEP complete target state
→ Scenario appears in that Step when journey composition changes
→ current Scenario revalidation when appropriate
```

## Representation / Artifact Contract

Use Core Artifact Boundary/Addressability rules.

Valid forms include:
- inline Scenario section;
- several small Scenarios in one owner file;
- dedicated Scenario file when independently reviewed/reused.

Preserve Scenario identity, actor/context where material, Feature references, branch/convergence/re-entry, continuity, Screen/external participation and terminal Benefit. Do not turn a journey representation into a second Feature behavior catalog.

## Validators

```text
journey boundary has coherent starting context + terminal Benefit/result
participating Feature results are truthful references to Feature authority
linking actor/external actions are explicit when they matter
branch paths converge/re-enter/stop explicitly
continuity identity/Data/context is preserved across steps
Screen participation is spatial/contextual, not behavior ownership
journey must-holds are truly cross-Feature/context and do not duplicate BRs
optional E2E proof intent remains proof intent, not test catalog
known future change is routed through Evolution Step rather than hidden here
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

Scenario findings route to the natural owner through Proposal/revalidation. Implementation work starts from selected Feature meaning; Scenario remains a source when whole-journey continuity or E2E proof matters.
