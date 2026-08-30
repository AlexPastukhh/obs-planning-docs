# TM-IMPLEMENTATION-SLICE — One Vertical Implementation Slice

Entry Point: `tm.slice.plan`  
Role: primary Target Module  
Target form: one vertical Slice

## Purpose

Plan one independently useful/checkable implementation increment for exactly one
Primary Scenario at enough semantic/realization depth to support exact
implementation without maintaining a stale parallel code map.

A Slice may require any technical responsibilities necessary for its useful
result. Frontend/backend/server/Domain/persistence are not mandatory SDS Result
Units and are not separate Slice identities by default.

Application-development theory may be supplied through Knowledge Basis/Lenses when
useful; the Target contract itself stays semantic.

## High-Level Example

```text
SL-CANCEL-ORDER
Primary Scenario: SCN-CANCEL-ORDER
Useful result:
  actor cancels a cancellable order and receives a truthful result
```

Possible selected meaning:

```text
Domain Elements Used:
  Order
    cancel(...)
    canCancel(...)

Cross-Cutting local obligation:
  XC-AUDIT receives cancellation actor/context

Runtime Path — only if material:
  request → application coordination → Order cancellation → persistence/result

Evolution Step:
  Add cancellation reason categories
  Slice Change: reason becomes required for selected categories
  Domain Changes: Order cancellation semantics accept selected reason meaning
  Implementation Outlook:
    keep reason policy near cancellation behavior;
    do not build a generic workflow engine.
```

No separate frontend/backend Slice is created.

## Upstream Source Contract

### Direct Semantic Sources

```text
selected Slice identity / Strategy meaning when present
Primary Scenario
Behavior Items + Scenario DATA
must-hold / negative guarantees
Screen meaning when UI/spatial obligations exist
current/selected Domain meaning
Cross-Cutting owners
Scenario RU-SCEN-03 / Strategy May Change / planned Slice meaning
```

### Evidence / Current-State Sources

```text
current code / implementation
current dependency/integration facts
Prototype / Practical Evidence when relevant
```

### Planning-State Sources

```text
accepted Decisions
material Q/R/P
external/compatibility constraints
quality/risk/proof constraints
```

## Knowledge Basis

Reusable implementation/application theory may be used when material, but it does
not define a mandatory layer chain.

Principles:

- preserve one useful vertical result;
- exact current code topology remains code authority;
- use explicit seams/contracts only when a real boundary/evolution need pays for them;
- Runtime Path is optional and explains semantic runtime behavior, not classes/methods for their own sake;
- future implementation meaning is resolved as owner-local Evolution Steps.

## Question Set Examples — Non-Exhaustive

```text
What exactly becomes useful/checkable after this Slice?
Which behavior/DATA/must-hold obligations must it realize?
Which Domain elements/semantic operations does it use?
Which Cross-Cutting guarantees apply and what remains local?
Which external/dependency/handoff relations are materially important?
Is runtime sequence/state/failure/async meaning non-obvious enough to record?
Which accepted/planned future changes touch this Slice?
For each material Evolution Step, what implementation meaning should be resolved now vs deferred?
What proof is obvious vs independently non-trivial?
```

## Lens Profile

Required Core Pack applies.

Primary:
- [`LENS-SLICE-VERTICALITY-INTEGRATION`](../lenses/reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md)

Conditional:
- [`LENS-DOMAIN-MODELING-DDD`](../lenses/reusable/LENS-DOMAIN-MODELING-DDD.md)
- [`LENS-UI-SPATIAL-FRONTEND-REALIZATION`](../lenses/reusable/LENS-UI-SPATIAL-FRONTEND-REALIZATION.md) for UI-heavy Slice meaning
- L4 Dependency / Change Impact
- L5 Evolution / Change Isolation
- Simplicity / Implementation Economy
- L6 Verifiability / Observability / Operability
- Quality / Risk Materiality
- Shared / Cross-Cutting Responsibility
- Test Proof / Evidence when proof is material

## Resolution / Production Method

1. Stabilize the useful Slice outcome and semantic obligations.
2. Resolve which Domain elements/shared owners the Slice uses.
3. Resolve only material dependencies/handoffs.
4. Add Runtime Path only when runtime sequence/state/failure/async/transaction
   meaning materially helps understanding or decision-making.
5. Resolve named planned/probable Evolution Steps touching the Slice.
6. For each material Evolution Step use normal Core Resolution:
   - surface material Questions/Problems;
   - develop materially different Ideas where alternatives exist;
   - apply relevant Lenses/Evidence;
   - resolve material choices under normal authority;
   - project the selected Slice-specific consequence into `Implementation Outlook`.
7. Hand sufficiently determined exact realization to Core `TM-EXACT-REALIZATION`.

Do **not** create a hand-written `Codebase Integration Path` call-level mirror.

Local implementation subproblems remain ordinary Core State/Resolution. When one
becomes independently substantial, normal Target Formation may form/reuse a Local
Target Contract. This does not split the product Slice into technical-layer Slices.

## Target Step-Result Contract

**Target Step Result:** `Implementation Slice Plan`

| Result Unit | Meaning |
|---|---|
| `RU-SLICE-01` | Outcome / semantic obligations / proof intent |
| `RU-SLICE-02` | Domain Elements Used + Cross-Cutting/local shared obligations + material dependencies/handoffs |
| `RU-SLICE-03` | Runtime Path — optional |
| `RU-SLICE-04` | Evolution Steps |

### RU-SLICE-01 — Outcome / Obligations / Proof Intent

Record proportionally:

```text
Slice ID
Primary Scenario
Useful Vertical Result
Behavior/DATA obligations
must-hold / negative guarantees
Screen obligations when material
proof intent / verification obligation
```

Proof routing:

```text
obvious proof
→ Exact Realization can produce exact production/test code

independently non-trivial proof design
→ optional TM-TEST-DESIGN
```

### RU-SLICE-02 — Uses / Ownership Boundary

Record only material relations:

```text
Domain Elements Used
  + semantic Domain operations/rules used
Cross-Cutting local obligations + canonical owner refs
external/dependency/handoff relations
implemented/delegated/later/outside meaning when useful
```

Do not manufacture interfaces/contracts merely for completeness. Stable
contracts/seams are justified by real semantic/shared/external/compatibility/
consistency/independent-evolution pressure.

### RU-SLICE-03 — Runtime Path — Optional

Use when runtime flow itself carries important meaning such as:

```text
state transition
sync/async boundary
retry/failure/recovery
transaction/consistency boundary
externally observable order
material coordination
```

Describe semantic/runtime responsibilities. Omit when obvious. Do not turn this
into an internal class/method call graph.

### RU-SLICE-04 — Evolution Steps

Named planned/probable application-evolution increments touching this Slice.

Prefer **named headings**. Do not number/order steps unless order/dependency itself
is meaningful.

Sparse step shape:

```text
### <Evolution Step Name>

Behavioral Source / Future Meaning
  Scenario RU-SCEN-03 / Strategy May Change / accepted future behavior ref

Slice Change
  what behavior/responsibility changes in this Slice

Domain Changes
  changes expected in Domain objects/operations used by this Slice

Implementation Outlook
  resolved target-specific implementation consequences from this Step's normal
  Core Resolution, for example:
    planned seam/port/variation boundary
    placement of changeable behavior
    support for multiple types/variants
    current preparation needed
    reuse/extend/defer direction
    intentionally rejected abstraction/framework
    explicitly nothing special needed

Proof Impact
  only when proof responsibility materially changes

Depends on / After
  another named Evolution Step only when a real dependency exists

Cross-Cutting Impact
  local obligation/reference only;
  actual shared concern change belongs to the Cross-Cutting owner's Evolution Step
```

`Implementation Outlook` is **not** a Lens output and not a Generic Decision
register. It stores the selected target-specific consequence after Resolution.
A Generic Decision may be referenced for traceability when useful, but the Outlook
must contain the selected consequence itself rather than only a Decision ID.

A current implementation may intentionally include a seam/port with only one
current variant when the resolved known Evolution Step justifies that preparation.
Conversely, accepted future meaning may resolve to “do not prepare now”.

## Domain Evolution Query

To understand future pressure on a Domain object:

```text
Strategy RU-SSTRAT-02
→ find Slices using it
→ inspect those Slice owners' Evolution Steps
→ evaluate interaction with L5 Evolution / Change Isolation
```

No separate canonical Domain evolution map is required.

## Representation / Artifact Contract

```text
ARTIFACT_PROPOSAL
ID: AP-SLICE-01
CONTENT_KIND: IMPLEMENTATION_SLICE_PLAN
WHEN: selected Slice meaning is used for realization/review
GUIDANCE: REQUIRED_IF_TARGET_EXISTS
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE_OR_EMBED
SEMANTIC_OWNER: current Slice owner
REPRESENTATION: INLINE_OWNER_SLOT_OR_DEDICATED_SLICE_ARTIFACT_OR_IMPLEMENTATION_NATIVE_RESIDUE
FILE_OR_ARTIFACT: <slice-owner>
CONTENT: applicable RU-SLICE-01..04
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

Small Slice owners may remain inline in `SLICE-STRATEGY.md`. Dedicated files are
pressure-driven. Evolution normally stays in the same owner; a physically separate
`<owner>.evolution.md` is only a representation split of that same owner under
real size/review/update pressure.

## Validators / Guards

```text
one normal Slice → one Primary Scenario
Slice ≠ technical layer
frontend/backend are not separate SDS Slice identities by default
application layer theory ≠ mandatory Result schema
Runtime Path is optional
Codebase Integration Path is not a Result Unit
Generic Decisions remain Generic State
Cross-Cutting evolution stays with Cross-Cutting owner
exact code/test implementation belongs to Exact Realization
```

## Handoff

```text
TM-IMPLEMENTATION-SLICE
→ TM-TEST-DESIGN only when proof design is independently non-trivial
→ TM-EXACT-REALIZATION for exact code/config/tests
→ Practical Evidence / revalidation as useful
```
