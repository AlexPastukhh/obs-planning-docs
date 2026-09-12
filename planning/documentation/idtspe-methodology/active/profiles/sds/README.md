# SDS Profile — Software / Application Planning on IDTSPE

Status: active synchronized profile

## Purpose

SDS is the IDTSPE profile for software/Application planning from real-world need/context through behavioral owners, implementation ownership, exact realization and Evidence.

SDS extends always-active IDTSPE with profile-specific **Target Modules, Lenses, reusable knowledge, terminology, representation guidance and semantic-owner relationships**. It does not replace generic Documentation Use Cases or create a second runtime workflow shell.

## Profile Bootstrap

This `README.md` is the canonical SDS profile bootstrap entry. SDS bootstrap is **incremental**: it assumes the primary bootstrap from [`planning/README.md`](../../../../../README.md) already established Session, Documentation and IDTSPE Core. If that prerequisite is not reliable, perform the primary bootstrap first, then return here.

For the SDS portion, read in order:

1. this `README.md`;
2. [`shared/methodology-registry-directory.md`](shared/methodology-registry-directory.md);
3. [`target-modules/README.md`](target-modules/README.md);
4. [`lenses/README.md`](lenses/README.md);
5. [`shared/directed-methodology-workflow-and-next-step-resolution.md`](shared/directed-methodology-workflow-and-next-step-resolution.md);
6. [`shared/requirement-ownership-and-exception-rule.md`](shared/requirement-ownership-and-exception-rule.md);
7. [`shared/reusable-guidance-model.md`](shared/reusable-guidance-model.md);
8. [`ARTIFACT-PLACEMENT-MAP.md`](ARTIFACT-PLACEMENT-MAP.md).

Specific Target Modules, Lenses, Programming Principle details, examples and supporting knowledge remain lazy/conditional reads after registry selection and local applicability. Profile bootstrap does not create an SDS-specific runtime Use Case or select a Target merely by being read.

## Authority Boundary

```text
Documentation methodology
→ Use Case / Process / Registry / shared documentation semantics

IDTSPE Core
→ always-active proportional Work Context
→ Core State/Target/Proposal/Q-R-P/Decision/Evidence/Finding/Integration/Representation mechanics

SDS
→ specialized software/Application Target Modules, Lenses, knowledge,
  semantic-owner topology and profile-specific readiness/representation guidance
```

The current SDS baseline defines **no separate runtime methodology-use Use Cases**. Generic Documentation + IDTSPE Use Cases discover and compose SDS components through the profile registry directory.

## Profile Registry Entry

Start SDS-specific dependency discovery at [`shared/methodology-registry-directory.md`](shared/methodology-registry-directory.md). That directory routes an already-selected IDTSPE Use-Case Process to the relevant Target Module, Lens, programming-principle, requirement, semantic-composition or representation owner.

Do not browse all profile components ceremonially.

## Compact Owner Topology

```text
optional Need / real-life solution discovery
→ conditional Application Definition

Feature ↔ Scenario ↔ Screen
  Feature  = primary behavior + semantic Feature data
  Scenario = journey composition / continuity / terminal Benefit
  Screen   = spatial/navigation composition

implementation pressure
→ transient Domain / Slice discovery when useful
→ durable Domain / Slice / Shared owners only when their own formation gates pass

known future transition
→ Evolution Step / Steps Map as applicable

sufficient accepted meaning
→ Core Exact Realization
→ implementation-native proof / Evidence
→ optional Practical Test for real-subject/environment observation
```

This is orientation only. Cross-owner readiness/direction is canonically owned by [`shared/directed-methodology-workflow-and-next-step-resolution.md`](shared/directed-methodology-workflow-and-next-step-resolution.md); each concrete Target Module/Lens owns its own formation/evaluation semantics.

## Key Profile Invariants

- Feature, Scenario and Screen are peer semantic owners; none silently edits another.
- Domain and Slice discovery are transient by default; discovery artifacts do not become durable authority merely by existing.
- Durable Requirements stay with exactly one natural owner; there is no baseline `TM-REQUIREMENT`.
- Shared capability formation is governed by its Target Module, not by generic “cross-cutting concern” status.
- There is no baseline Test Strategy/Test Design Target family; proof follows natural owners and Core proof/evidence evaluation.
- Programming Principles are reusable knowledge, not a mega-Lens and not live-inherited owner Requirements.
- Planning depth is guidance, not a one-active-level state machine or approval ladder.
- Discovery/planning results are non-persistent by default unless independent durable representation value exists.

## Canonical SDS Owners

- [`shared/directed-methodology-workflow-and-next-step-resolution.md`](shared/directed-methodology-workflow-and-next-step-resolution.md) — cross-owner semantic composition, readiness, upstream/downstream direction and planning-depth guidance.
- [`target-modules/README.md`](target-modules/README.md) — active SDS Target Module registry; concrete modules own their own production/formation rules.
- [`lenses/README.md`](lenses/README.md) — SDS Lens registry; concrete Lenses own specialized evaluation methods.
- [`shared/requirement-ownership-and-exception-rule.md`](shared/requirement-ownership-and-exception-rule.md) — natural Requirement ownership, BR/IR/PFR families and exceptions.
- [`shared/reusable-guidance-model.md`](shared/reusable-guidance-model.md) — `RG/RR/RRC` reusable-guidance semantics and no-live-inheritance rule.
- [`shared/programming-principles/README.md`](shared/programming-principles/README.md) — compact trigger registry for the reusable programming-principle corpus.
- [`ARTIFACT-PLACEMENT-MAP.md`](ARTIFACT-PLACEMENT-MAP.md) — SDS-specific owner → representation projection used with Core representation policy.

## Compatibility / Retired Families

Retired baseline Target families such as Requirement, Slice Strategy, Cross-Cutting Concern, Test Design and Test Strategy remain retired. Compatibility surfaces must route to current owners and must not revive their former semantic authority.
