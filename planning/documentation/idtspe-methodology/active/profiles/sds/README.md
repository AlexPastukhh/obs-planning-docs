# SDS Profile — Software / Application Planning on IDTSPE

Status: active synchronized profile

## Purpose

SDS is the IDTSPE profile for software/Application planning from real-world need/context through behavioral owners, implementation ownership, exact realization and Evidence.

SDS extends always-active IDTSPE with profile-specific **Target Modules, Lenses, reusable knowledge, terminology, representation guidance and semantic owner relationships**. It does not replace generic Documentation Use Cases or create a second runtime workflow shell.

## Profile Bootstrap

This `README.md` is the canonical SDS profile bootstrap entry. SDS bootstrap is **incremental**: it assumes the primary bootstrap from [`planning/README.md`](../../../../../README.md) has already established Session, Documentation and IDTSPE Core. If that prerequisite is not reliable, perform the primary bootstrap first, then return here.

For the SDS portion, read in order:

1. this `README.md`;
2. [`shared/methodology-registry-directory.md`](shared/methodology-registry-directory.md);
3. [`target-modules/README.md`](target-modules/README.md);
4. [`lenses/README.md`](lenses/README.md);
5. [`shared/directed-methodology-workflow-and-next-step-resolution.md`](shared/directed-methodology-workflow-and-next-step-resolution.md);
6. [`shared/requirement-ownership-and-exception-rule.md`](shared/requirement-ownership-and-exception-rule.md);
7. [`shared/reusable-guidance-model.md`](shared/reusable-guidance-model.md);
8. [`ARTIFACT-PLACEMENT-MAP.md`](ARTIFACT-PLACEMENT-MAP.md).

Specific Target Modules, Lenses, Programming Principles, examples and supporting knowledge remain lazy/conditional reads after registry selection and local applicability. Profile bootstrap does not create an SDS-specific runtime Use Case or select a Target merely by being read.

## Authority Boundary

```text
Documentation methodology
→ defines Use Case / Process / Registry / Principles & Terminology / Templates / Examples

IDTSPE Core
→ always-active proportional Work Context
→ Use Cases compose methodology use
→ Core State/Target/Proposal/QRP/Decision/Evidence/Finding/Checkpoint/Exact mechanics

SDS
→ specialized software/Application methodology components
```

The current baseline has **no SDS-specific runtime Use Cases**. `UC-IDTSPE-COMPOSE-CURRENT-WORK` reaches the SDS registry directory when the active profile is relevant. Add a profile-specific Use Case only if a future Methodology Use-Case Scenario reveals an independently useful *methodology-documentation-use* result that Core Use Cases cannot express.

## SDS Registry Entry

Start profile-specific dependency discovery at [`shared/methodology-registry-directory.md`](shared/methodology-registry-directory.md), then use the relevant Target/Lens/knowledge registry. Do not browse all profile components ceremonially.

## Selected Owner Topology

```text
optional Need / real-life solution discovery
→ conditional TM-APPLICATION-DEFINITION

Feature ↔ Scenario ↔ Screen
  Feature  = primary behavior + semantic Feature data
  Scenario = journey composition / continuity / terminal Benefit
  Screen   = spatial/navigation composition

Feature / implementation pressure
↕
TM-DOMAIN-DISCOVERY       transient
TM-IMPLEMENTATION-SLICE   transient Slice Discovery
↕
TM-DOMAIN-OWNER           durable Domain semantics + Domain IR
TM-SLICE-OWNER            durable end-to-end Slice responsibility + Slice IR
TM-SHARED-IMPLEMENTATION-CAPABILITY
                         durable reusable non-end-to-end responsibility + Shared IR

known future transition
→ TM-EVOLUTION-STEP
→ TM-EVOLUTION-STEPS-MAP for lazy registry/readiness routing

sufficient accepted meaning
→ Core TM-EXACT-REALIZATION
→ implementation-native proof / Evidence
→ optional TM-PRACTICAL-TEST when real environment observation is required
```

`TM-PROTOTYPE` remains optional empirical pre-commit inquiry and is never current product authority by itself.

## Preferred Semantic Direction

The profile direction is guidance, not orchestration authority:

```text
Need / existing-solution context when needed
→ Application Definition when contribution/boundary/feasibility is material
→ Feature ↔ Scenario ↔ Screen co-formation
→ Domain / Slice / Shared implementation discovery and owner-local IR discovery
→ Exact Realization
→ Evidence / focused revalidation
```

Use [`shared/directed-methodology-workflow-and-next-step-resolution.md`](shared/directed-methodology-workflow-and-next-step-resolution.md) for semantic composition/readiness questions after an IDTSPE Use Case has made that profile guidance relevant.

## Recommended SDS Planning Depth

The depth ladder is profile guidance, not a one-active-level state machine and not an approval ladder:

| Level | Recommended meaning | Typical SDS participation |
|---|---|---|
| `PL-L0-BEHAVIOR-AND-OWNER` | application/behavioral meaning and semantic ownership | Application Definition when needed; Feature ↔ Scenario ↔ Screen; Domain semantic-owner questions |
| `PL-L1-IMPLEMENTATION-REQUIREMENTS` | durable implementation/proof constraints | owner-local `IR-*`; rare owner-local `PFR-*`; Feature implementation concerns as inputs |
| `PL-L2-IMPLEMENTATION-ARCHITECTURE` | implementation responsibility/boundary/relations | Domain/Slice/Shared owners, dependencies/change locality, proof boundary |
| `PL-L3-EXACT-IMPLEMENTATION-PLAN` | transient exact working plan | Core `TM-EXACT-REALIZATION` internal production reasoning |
| `PL-L4-LITERAL-CODE-AND-PACKAGE` | literal directly-integrable result | Core `RU-REAL-01`; package/app materialization where applicable |

Several levels may participate together. Ordinary depth movement is not a USER gate. Core Lens aliases `L1/L2/L3` are unrelated historical aliases.

## Behavioral Owners

### Application Definition
Conditional owner for own-Application contribution, build/buy/adapt/integrate position, core real-life paths, responsibility boundary and feasibility. Do not instantiate it merely because a project has an application.

### Feature
`TM-FEATURE` owns intent/principal result/semantic entry, behavior-facing semantic data, durable `BR-*`, implementation concerns and selected Feature/Slice boundary meaning.

### Scenario
Compatibility ID/path remains `TM-SCENARIO-PLANNING`. SDS Scenario means actor/external participation, Feature composition, linking actions, order/branch/convergence/re-entry, continuity, Screen/external participation and terminal Benefit closure. It is **not** a Methodology Use-Case Scenario.

### Screen
Screen owns spatial/navigation composition and Screen-specific contextual/accessibility/platform constraints; it does not own Feature behavior, Domain semantics or frontend implementation topology.

## Implementation Owners

### Domain
`TM-DOMAIN-DISCOVERY` is transient/non-persistent bounded discovery. It may produce zero, one or several `TM-DOMAIN-OWNER` durable owners. Domain owners own semantic identity/state/lifecycle/invariants/operations/failure-result meaning and owner-local `IR-DOMAIN-*`.

### Slice
`TM-IMPLEMENTATION-SLICE` is the compatibility ID for transient Slice Discovery. `TM-SLICE-OWNER` owns durable end-to-end implementation responsibility + `IR-SLICE-*`. There is no independent Slice Strategy owner.

### Shared Implementation Capability
`TM-SHARED-IMPLEMENTATION-CAPABILITY` owns coherent reusable non-end-to-end responsibility with concrete Slice consumers. Default formation pressure is 2+ selected consumer Slices; the one-current-consumer exception requires a selected known Evolution Step establishing another concrete consumer and a seam justified now.

## Requirements / Proof / Evolution

A durable Requirement belongs to exactly one natural owner; see [`shared/requirement-ownership-and-exception-rule.md`](shared/requirement-ownership-and-exception-rule.md). Zero durable Requirements from discovery is valid. Reusable `RG/RR/RRC` guidance never live-inherits into owner-local `IR/PFR`.

Proof follows natural ownership: focused Domain proof, whole-Slice/Feature integration proof, Shared local tests only where useful plus consumer Slice integration, optional Scenario E2E intent, and Practical Test for real-subject/environment observation. There is no baseline Test Strategy/Test Design Target family.

Evolution is cross-cutting. Lazily scan `TM-EVOLUTION-STEPS-MAP`; open Step bodies only when useful. Current-owner impact remains owner-local; no generic Evolution Impact Target exists.

## Programming Principles

There is **no Programming Principles mega-Lens**. The full 22-group corpus lives in [`shared/programming-principles/README.md`](shared/programming-principles/README.md) as a compact trigger registry plus selectively addressable knowledge details. Applicable Lenses/Target Production own the actual evaluation; reusable principle knowledge does not create Findings or project truth by itself.

## Representation

Use [`ARTIFACT-PLACEMENT-MAP.md`](ARTIFACT-PLACEMENT-MAP.md) together with Core `LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY` / P-14. Discovery and planning results are non-persistent by default unless independent durable representation value exists.

## Key Profile Files

- [`shared/methodology-registry-directory.md`](shared/methodology-registry-directory.md)
- [`target-modules/README.md`](target-modules/README.md)
- [`lenses/README.md`](lenses/README.md)
- [`shared/directed-methodology-workflow-and-next-step-resolution.md`](shared/directed-methodology-workflow-and-next-step-resolution.md)
- [`shared/requirement-ownership-and-exception-rule.md`](shared/requirement-ownership-and-exception-rule.md)
- [`shared/reusable-guidance-model.md`](shared/reusable-guidance-model.md)
- [`shared/programming-principles/README.md`](shared/programming-principles/README.md)
- [`ARTIFACT-PLACEMENT-MAP.md`](ARTIFACT-PLACEMENT-MAP.md)
