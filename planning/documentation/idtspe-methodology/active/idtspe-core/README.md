# IDTSPE Core

Status: active canonical generic methodology package  
Scope: reusable planning runtime independent of SDS/Application-specific Target Modules.

## Boundary

```text
IDTSPE Core
= how a bounded planning Target is formed, evaluated, decided, persisted and revalidated

SDS Profile
= one installed family of concrete Target Modules, profile-specific Lenses,
  directed workflow and artifact conventions built on IDTSPE Core
```

IDTSPE Core must remain usable when another profile/family is added later. It therefore does not define Scenario, Domain, Slice, Screen, Application or SDS-specific Workspace Evolution semantics.

## Start Here

1. [`BOOTSTRAP-IDTSPE.md`](BOOTSTRAP-IDTSPE.md) — whole-methodology/core bootstrap contract.
2. [`IDTSPE-CORE-MAP.md`](IDTSPE-CORE-MAP.md) — generic owner/dependency map.
3. [`shared/idtspe-unit-and-target-step-result-model.md`](shared/idtspe-unit-and-target-step-result-model.md) — canonical Target Step Result + IDTSPE Unit model.
4. [`shared/broad-discussion-and-integration-checkpoint-model.md`](shared/broad-discussion-and-integration-checkpoint-model.md) — normal Broad Discussion ↔ Integration Checkpoint working model, Idea relations and semantic-retention boundary.

5. [`shared/finding-disposition-contract.md`](shared/finding-disposition-contract.md) — generic producer → finding → ownership/State/lifecycle disposition bridge.
6. [`IDTSPE-SHELL.md`](IDTSPE-SHELL.md) — generic runtime/composition contract; current 15 port IDs remain stable technical navigation.
7. [`IDTSPE-DEFAULT-WORK-MODE.md`](IDTSPE-DEFAULT-WORK-MODE.md) — optional default operating mode for material AI planning.
8. [`../PLANNING-GOVERNANCE.md`](../PLANNING-GOVERNANCE.md) — authority/interaction rules.
9. [`target-modules/README.md`](target-modules/README.md) — Target Module framework and installed-family boundary.
10. [`shared/knowledge-basis-contract.md`](shared/knowledge-basis-contract.md) — shared Knowledge Basis contract used by Target Modules and Lenses.
11. [`lenses/README.md`](lenses/README.md) — generic Lens registry plus installed profile Lens references.
12. [`shared/idtspe-command-surface-contract.md`](shared/idtspe-command-surface-contract.md) — generic Core command/navigation surface and host-target policies.
13. [`lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — fundamental Documentation / Representation policy and worked materialization topologies.
14. [`../profiles/README.md`](../profiles/README.md) — installed planning profiles/families.

Material Broad Discussion uses Key Points to structure material logical parts; material Ideas are explicit and carry `Addresses → current Target Goal / Question / Problem`. No mandatory block-owner or per-response Intake Summary is required. When a Target Module is active, its Target Goal plus Question/Problem candidates are the ordinary starting driver set, not an exclusive intake gate.

## Generic Core Owners

`shared/` contains reusable concepts that are not owned by any one profile:

```text
Target Formation / Resolution Slots
Target / Source / Relation model
Target Step Result + IDTSPE Unit model
Broad Discussion / Key Points / Integration Checkpoint working model
Idea driver/alternative/bundle relations + semantic retention
Finding Disposition / producer → Core state-lifecycle bridge
Target Module model + maintenance UC
shared Target Module/Lens Knowledge Basis contract
Lens model + maintenance UC
Planning Branches
Decision intake / persistence / revalidation
Q/R/P priority / related groups / Decision Addresses-Exposes trace
Documentation / Representation + Artifact Placement / file realization
Practical Evidence
Consistency Review
command-helper presentation contract
```


## Target Step Result / Unit Boundary

```text
Target
→ bounded planning/resolution responsibility

Target Step Result
→ target-specific output wanted from the current bounded IDTSPE work step

IDTSPE Unit
├─ Target Step Result Unit — defined by Target Module / Local Target Contract
└─ IDTSPE State Unit — generic Core kind such as Question / Idea / QRP / Decision / Evidence
```

State Units can themselves be useful output of a pass. One Target does not imply one Result Unit or one file.

Lenses operate **inside** IDTSPE over an Analysis Surface through reusable operations `ANALYZE / CHECK / REFINE / CHALLENGE`. They may contribute Broad Discussion analysis/Key Points without creating State; only material newly surfaced meaning that needs ownership/State/lifecycle disposition becomes a Finding Candidate. Generic Core Finding Disposition resolves those consequences; normal authority/resolution may later update already-declared Result Units. Lenses do not define Unit kinds or become routing/semantic authority.

Canonical Unit owner: [`shared/idtspe-unit-and-target-step-result-model.md`](shared/idtspe-unit-and-target-step-result-model.md).  
Canonical finding-disposition owner: [`shared/finding-disposition-contract.md`](shared/finding-disposition-contract.md).


## Broad Discussion / Integration Checkpoint Boundary

Normal IDTSPE work does not require a full Unit/template dump in every conversational turn.

- **Broad Discussion** is the exploratory multi-turn workspace. Material Ideas may appear inline with related Q/R/P/Evidence and remain related to the Goal/Question/Problem they address.
- **Key Points** are the peer reviewability structure of logical discussion parts; they are not Units.
- **Integration Checkpoint** is a periodic whole-state integration pass that reconciles accumulated discussion into current Generic State + applicable Target Result Units, applies relevant Lens/consistency checks and preserves unresolved alternatives.
- accepted material Decisions are retained semantically by default; optional `Rationale / Why` and material rejected alternatives are retention choices discussed with the user.
- semantic retention at a checkpoint is distinct from physical file/artifact persistence.

Canonical owner: [`shared/broad-discussion-and-integration-checkpoint-model.md`](shared/broad-discussion-and-integration-checkpoint-model.md).

## Installed Profile Rule

A profile may contribute:

```text
Target Modules
profile-specific reusable Lenses
workflow/readiness graph
profile artifact/tree conventions
profile command surfaces
worked examples
```

A profile cannot redefine the generic IDTSPE Shell or generic Lens/Target mechanics locally. If it needs a different generic rule, that change is resolved at IDTSPE Core ownership first.

## Adjacent Packages

- [`../ai-reviewability/README.md`](../ai-reviewability/README.md) — independent peer concern for Key Points/review projection.
- [`../theoretical-modules/README.md`](../theoretical-modules/README.md) — raw temporary theory registry. Core may discover these packages without treating them as Target/Lens authority.
