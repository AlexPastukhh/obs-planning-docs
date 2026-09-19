# TM-PROTOTYPE — Prototype / Experiment

Entry Point: `tm.prototype`  
Role: practical-evidence Target Module before full implementation

## Purpose

Own one bounded practical inquiry where a **partial, simulated, mocked or throwaway subject is acceptable** and practical observation can reduce material uncertainty before the real implementation is complete.

The shared inquiry/collection mechanics are owned by [`Practical Evidence Method`](../../../idtspe-core/shared/practical-evidence-method.md). This module owns only the Prototype-specific Target/result.

## Boundary With Implemented Practical Evidence

```text
TM-PROTOTYPE
  partial / simulated / throwaway subject allowed
  useful before full implementation
  Evidence strength limited by what is fake/omitted

TM-PRACTICAL-TEST
  actual Evidence subject = real implemented subject/environment
  practical acceptance + post-implementation learning
```

Example:

```text
Question:
  can users discover Archive?

Prototype:
  clickable UI + mocked backend
→ useful discoverability Evidence
→ not proof that real archive persistence works
```

If the same question remains material later, preserve its useful context/limits and hand it to `TM-PRACTICAL-TEST` against the real implementation.

## Activation / Scope Gate

Use when:

```text
material uncertainty exists
+ practical observation is more discriminating than reasoning/research alone
+ a cheaper partial/simulated/throwaway subject can answer enough of the question credibly
```

Do not create prototype work for ceremony when the result cannot discriminate between meaningful alternatives.

## Upstream Source Contract

```text
material Q/R/P / assumption / unresolved Decision
affected Application / Scenario / Screen / Slice / other owner
accepted requirements/constraints relevant to the inquiry
existing research/reference Evidence
current implementation/platform facts when extending an existing solution
participant/operator/data/environment/time/privacy constraints
```

Current `TF-04 SOURCE_SET` remains authority.

## Knowledge Basis / Lens Profile

Shared method/Knowledge Basis:
- [`Practical Evidence Method`](../../../idtspe-core/shared/practical-evidence-method.md)

Primary Lens:
- [`LENS-PRACTICAL-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-PRACTICAL-EVIDENCE.md)

Conditional Core Lenses include Verifiability/Observability/Operability and Quality/Risk/Materiality when the inquiry needs them. UI/DDD/Test/etc Lenses are selected only when their perspective is materially relevant.

## Resolution / Production Method

Use the shared Practical Evidence Method rather than duplicating its observation discipline here.

Prototype-specific work is simply:

```text
identify material uncertainty
→ select the minimum credible prototype subject
→ make the material real/simulated boundary explicit
→ use shared method/Lens to plan and run only discriminating observation
→ organize actual Prototype Evidence + interpretation
→ return material learning through Core Finding Disposition / Decision Revalidation
```

A Prototype shape does not become canonical product/UI/architecture meaning merely because it was tested.

## Unit Contract Conformance

This module specializes the Core [Target Module Model](../../../idtspe-core/shared/target-module-model.md) and [Unit / Target Step Result Model](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md). The Core owners define generic Unit lifecycle, complete-inventory/disposition and Proposal/Core-State semantics; this module defines only its SDS-specific Unit responsibilities, local materiality, production guidance, validators and handoffs below.

## Target Step-Result Contract

**Target Step Result:** `Prototype Evidence Result`

| Result Unit | Meaning |
|---|---|
| `RU-PROTO-01` | Prototype Intent / Question — what uncertainty/property this Prototype exists to investigate and why it matters |
| `RU-PROTO-02` | Prototype Subject / Observation Plan — minimum credible prototype, material real-vs-simulated boundary and proportional collection plan |
| `RU-PROTO-03` | Prototype Results / Interpretation — actual Evidence refs, material limitations and interpretation relative to the inquiry |

### Result Unit Applicability / Materiality

Unit presence/disposition mechanics follow the Core [`Unit Applicability / Materiality / Disposition Contract`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5a-unit-applicability--materiality--disposition-contract). The table below owns only this module's local substantive-materiality and omission-rationale triggers.

| Result Unit | Substantive resolution is material when | Unit disposition when substantive resolution is not material |
|---|---|---|
| `RU-PROTO-01` | always once a Prototype Target is formed; it owns the inquiry identity/property being tested | no Unit-level omission: when no concrete uncertainty/property justifies empirical inquiry, the Target-level activation gate fails and the Prototype Target should not be formed |
| `RU-PROTO-02` | when the minimum credible subject/observation boundary must be selected before running the inquiry | `OMITTED` when the credible subject/observation boundary is already sufficiently established and needs no independent resolution |
| `RU-PROTO-03` | when the prototype actually produced observations worth interpreting | `OPEN` while planned prototype observations are still pending; otherwise `OMITTED` with a concise reason when observed-outcome interpretation is not material; never invent results |


The shared method's full inquiry fields are guidance, not mandatory duplicated Result fields.


### Explicit Unit Checkpoint Placement

Each material Unit below inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/shared/idtspe-unit-and-target-step-result-model.md#5b-unit-applicability-envelope--opening--in-unit--closing-checkpoints). Opening/Closing are mandatory logical applicability boundaries; registries may also be checked during Unit work whenever new material pressure appears.

#### `RU-PROTO-01` processing envelope

1. **Opening Unit Checkpoint — `RU-PROTO-01`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-PROTO-01`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-PROTO-01`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-PROTO-02` processing envelope

1. **Opening Unit Checkpoint — `RU-PROTO-02`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-PROTO-02`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-PROTO-02`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

#### `RU-PROTO-03` processing envelope

1. **Opening Unit Checkpoint — `RU-PROTO-03`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-PROTO-03`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-PROTO-03`** — evaluate the actual candidate Unit result, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

## Artifact / File Contract

```text
ARTIFACT_PROPOSAL
ID: AP-PROT-01
CONTENT_KIND: PROTOTYPE_INQUIRY_PLAN_AND_RESULT
WHEN: Prototype practical Evidence is independently material
GUIDANCE: REQUIRED_IF_TARGET_EXISTS
PERSISTENCE_GUIDANCE: CONDITIONAL
PLACEMENT_DIRECTIVE: PLACE_OR_EMBED
SEMANTIC_OWNER: current Prototype Target
REPRESENTATION: EXISTING_OWNER_OR_PROTOTYPE_ARTIFACT
CONTENT: intent/question; prototype subject/real-vs-simulated boundary; proportional observation plan; Evidence refs; material limits; interpretation/follow-up
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-PROT-02
CONTENT_KIND: PRACTICAL_EVIDENCE_RUN_DATA
WHEN: raw run data/media/logs/measurements are bulky or independently reused
GUIDANCE: OPTIONAL
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Prototype Target as interpreter; raw observation remains Evidence
REPRESENTATION: SUPPORTING_EVIDENCE_ARTIFACT
CONTENT: actual observation/run records with provenance and material limits
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-PROT-03
CONTENT_KIND: PREMATURE_IDEA
WHEN: experiment produces an unselected product/UI/technical Proposal
GUIDANCE: OPTIONAL
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: UNRESOLVED until selected by natural owner
REPRESENTATION: EXISTING_IDEA_STATE_OR_REGISTER
CONTENT: unselected proposal with Prototype provenance; formalize as IDTSPE Proposal only when addressable lifecycle/review is useful
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

Small Prototype intent/plan/result may live together in one existing/current owner. A separate Prototype artifact is justified when the inquiry/result is independently reviewed or reused.

Raw logs/media/measurements may be separate supporting Evidence only when volume/reuse/review requires it.

Do not persist a prototype implementation shape as product semantic authority.

## Guards

```text
prototype ≠ final implementation
prototype shape ≠ canonical product/UI/architecture
prototype success ≠ proof the real implementation works
planned observation ≠ executed Evidence
measurement ≠ interpretation
simulated boundary limits Evidence strength
```

## Handoff

```text
Prototype Results / Interpretation
→ Core Finding Disposition / Decision Revalidation
→ affected natural owner when warranted

question still requires real implementation
→ preserve useful inquiry context + prototype limits
→ TM-PRACTICAL-TEST later
```

## Evolution Horizon Extension

Prototype is optional and never automatic merely because an Evolution Step exists. A Prototype Target may investigate one Step, one Planning Branch, or the cumulative projected state of several selected/planned Steps.

Record material baseline/predecessor status (`REALIZED / PARTIAL / SIMULATED / STUBBED`), projected target set, fidelity by dimension, explicit side-effect boundary, and link to a separate physical prototype artifact when one exists.

```text
evolution-steps/
  EVO-....md
  PROTO-....md       # TM-PROTOTYPE Target instance

prototypes/
  PROTO-.../         # executable/mock/throwaway subject
```

`Prototype Target ≠ Prototype Artifact`; `prototype success ≠ Step realized`.
