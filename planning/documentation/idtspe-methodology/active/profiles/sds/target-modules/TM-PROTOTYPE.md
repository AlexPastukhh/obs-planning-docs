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

## Target Step-Result Contract

**Target Step Result:** `Prototype Evidence Result`

| Result Unit | Meaning |
|---|---|
| `RU-PROTO-01` | Prototype Intent / Question — what uncertainty/property this Prototype exists to investigate and why it matters |
| `RU-PROTO-02` | Prototype Subject / Observation Plan — minimum credible prototype, material real-vs-simulated boundary and proportional collection plan |
| `RU-PROTO-03` | Prototype Results / Interpretation — actual Evidence refs, material limitations and interpretation relative to the inquiry |

The shared method's full inquiry fields are guidance, not mandatory duplicated Result fields.

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
WHEN: experiment produces an unselected product/UI/technical Idea
GUIDANCE: OPTIONAL
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: UNRESOLVED until selected by natural owner
REPRESENTATION: EXISTING_IDEA_STATE_OR_REGISTER
CONTENT: unselected Idea with Prototype provenance; not Prototype truth
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
