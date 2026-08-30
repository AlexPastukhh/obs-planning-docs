# TM-DOMAIN-DISCOVERY — Domain / Aggregate Modeling

Compatibility ID: `TM-DOMAIN-DISCOVERY`  
Entry Point: `tm.domain.discovery`  
Role: primary/optional **and supporting** Target Module

## Purpose

Produce the smallest useful selected Domain/Aggregate model for the current
behavioral problem without forcing a persistent Domain-planning layer or a
Discovery→Draft waterfall.

This one Target family replaces the former `TM-DOMAIN-DISCOVERY` +
`TM-DOMAIN-DRAFT` split.

Normal modes:

```text
SUPPORTING / SHALLOW
  help Slice Strategy discover candidate Aggregate/domain boundaries and useful
  semantic operations without forming a child Target

PRIMARY / BOUNDED DEEP
  resolve one independently material Domain/Aggregate modeling problem
```

A valid result may conclude that no distinct Domain model/owner is useful.

## High-Level Example — Self-Contained Walkthrough

### Situation

Scenario behavior repeatedly uses captured item, source context, accepted/rejected
state and later review. Several Slices may use the same concepts.

### Shallow Strategy use

Enough meaning may be:

```text
SL-CAPTURE
  Uses → CaptureItem
    needs: create valid item; preserve capture invariant
  Uses → SourceContext
    needs: represent semantic source context

SL-REVIEW
  Uses → CaptureItem
    needs: expose reviewable state
```

No dedicated Domain Target/file is required merely to obtain this map.

### Deep bounded use

When `CaptureItem` itself has material state/rule choices, Resolution may inspect:

```text
identity
state/condition dimensions
valid/impossible combinations
invariants vs policies
lifecycle/transitions
what must remain consistent together
Aggregate/root boundary
Domain-owned behavior vs application/external coordination
useful semantic/public Domain operations
```

A state/condition matrix is a reasoning aid, not a required artifact.

### Result

Selected meaning may be:

```text
CaptureItem
  stable identity
  invariant: accepted item always has durable content + source context
  lifecycle: captured → accepted/rejected
  public semantic operations: accept(...), reject(...)
  outside: destination transfer orchestration
```

or simply:

```text
no distinct Domain owner needed
```

## Upstream Source Contract

### Direct Semantic Sources

```text
selected Scenario behavior / Requirements
Scenario DATA / Behavior Items
must-hold conditions / negative guarantees
Slice Strategy scope / Slice→Domain use needs when used supportingly
```

### Evidence / Current-State Sources

```text
existing Domain/current implementation Evidence
Prototype/Practical Evidence when relevant
external contracts/constraints
```

### Planning-State Sources

```text
accepted Decisions
material Q/R/P
accepted/planned evolution pressure when it can change the model
```

Source list is an archetype only; current `TF-04 SOURCE_SET` remains authority.

## Knowledge Basis

Shared contract: [`knowledge-basis-contract.md`](../../../idtspe-core/shared/knowledge-basis-contract.md)

Mode: `INLINE`

Principles:

- model semantic responsibility, not nouns/tables/classes by name alone;
- ask what identity/state/invariants must remain correct together;
- distinguish invariants from configurable/current policy;
- distinguish Domain-owned behavior from application/external/presentation/shared coordination;
- DDD patterns are candidate reasoning aids, not mandatory result shapes;
- implementation-native code/types/tests may be the best durable Domain representation.

Reusable detailed evaluation knowledge belongs to
[`LENS-DOMAIN-MODELING-DDD`](../lenses/reusable/LENS-DOMAIN-MODELING-DDD.md).

## Question Set Examples — Non-Exhaustive

```text
What has stable semantic identity?
Which state/condition dimensions matter?
Which combinations are valid or impossible?
Which rules are invariants vs policies?
Which transitions/lifecycle changes are meaningful?
What must remain correct/consistent together?
Which Aggregate/root boundary is justified, if any?
Which behavior belongs to the Domain vs application/external coordination?
Which semantic/public Domain operations are useful?
Which Scenarios/Slices use this meaning?
Is a distinct Domain model/owner useful at all?
```

## Lens Profile

Required Core Pack applies.

Primary:
- [`LENS-DOMAIN-MODELING-DDD`](../lenses/reusable/LENS-DOMAIN-MODELING-DDD.md)

Conditional:
- [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md)
- [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md) — semantic role: Evolution / Change Isolation
- [`LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY`](../lenses/frequent/LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY.md)
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md)
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md)

## Resolution / Production Method

Use only the modeling depth needed.

Reusable production path:

```text
behavior/DATA/must-hold Evidence
→ candidate identity
→ material state/condition dimensions
→ state/condition matrix when useful
→ valid/impossible combinations
→ invariants/policies
→ transitions/lifecycle
→ what must remain consistent together
→ Aggregate/root boundary
→ Domain-owned vs application/external coordination
→ useful semantic/public operations
→ simplicity challenge
→ selected sparse model
```

Concrete Questions, Ideas, Q/R/P, Decisions and Evidence remain Core State.
Individual alternatives stay Ideas/Branches until selected.

Supporting use projects only enough selected modeling meaning back to the host
Target; it does not force a separate child Target or file.

## Target Step-Result Contract

**Target Step Result:** `Domain / Aggregate Modeling Result`

### RU-DOM-01 — Selected Domain / Aggregate Model

Sparse/proportional meaning may include:

```text
Domain/Aggregate identity / purpose / boundary
stable semantic concepts/relationships
identity/lifecycle/state meaning
state/condition matrix conclusions when material
impossible states/combinations
invariants/policies
Value semantics
Aggregate/root/consistency boundary
Domain-owned semantic/public operations
external/application coordination boundary
Scenario/Slice use relations
verification meaning when non-trivial
rejected premature generalizations when useful
explicit no-distinct-Domain result
```

The RU stores selected target-specific meaning. It does not reproduce the generic
Question/Idea/Decision history used to resolve it.

In supporting/shallow mode only the relevant subset is projected, for example a
candidate Aggregate + semantic behavior/rule/action needed by a Slice.

## Representation / Artifact Contract

Accepted Domain meaning must be recoverable/durable enough for downstream work,
but that does **not** imply a Domain Markdown file.

Default durable representation after implementation may be:

```text
code / types / executable invariants / tests
```

A human-readable Domain artifact is optional and justified only by independent
review/reuse/complexity pressure.

```text
ARTIFACT_PROPOSAL
ID: AP-DOM-01
CONTENT_KIND: DOMAIN_MODELING_RESULT
WHEN: selected non-code Domain meaning has independent continuing review/reuse value
GUIDANCE: OPTIONAL
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: PLACE_OR_NONE
SEMANTIC_OWNER: current Domain Modeling Target / natural implementation owner
REPRESENTATION: IMPLEMENTATION_NATIVE_OR_EXISTING_OWNER_OR_DEDICATED_ARTIFACT
FILE_OR_ARTIFACT: implementation code/types/tests and/or <domain-model-owner>
CONTENT: only selected semantic meaning not adequately represented implementation-natively
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

Do not create a `.evolution.md` Domain companion by default. Future Domain pressure
is derived from Slices using the object and their owner-local Evolution Steps.

## Domain Evolution Query

```text
Strategy RU-SSTRAT-02
→ find Slices that use the affected Domain object
→ inspect those Slice Evolution Steps
→ apply L5 Evolution / Change Isolation for cross-Slice interaction
```

A separate canonical Domain evolution map is not required.

## Handoff

- supporting Strategy use → return only the required shallow model;
- deep selected Domain meaning → `TM-IMPLEMENTATION-SLICE` / consumers;
- literal code/types/tests → Core `TM-EXACT-REALIZATION`;
- independently non-trivial proof design → optional `TM-TEST-DESIGN`.

## Validators

```text
model traces to accepted behavior/DATA/must-hold meaning
identity/state/invariant claims have evidence/rationale
Aggregate boundary follows consistency meaning, not naming convention
application/external coordination is not silently absorbed into Domain
no-Domain result remains valid
selected result is proportional
representation does not create a stale shadow of current code
```
