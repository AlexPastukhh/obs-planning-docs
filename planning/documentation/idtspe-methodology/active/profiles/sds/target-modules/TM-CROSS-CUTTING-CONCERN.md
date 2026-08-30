# TM-CROSS-CUTTING-CONCERN — Shared Implementation Cross-Cutting Concern

Entry Point: `tm.implementation.crosscut`  
Role: shared non-vertical/conditional Target Module

## Purpose

Own one genuinely shared implementation responsibility whose guarantee/mechanism
is reused across several Slices/Scenarios and should not be duplicated as local
Slice truth.

Repeated code alone is not proof of shared semantic responsibility.

Cross-Cutting is normally **Domain-agnostic**. Narrow explicit interaction with
Domain identity/events/semantics is allowed when materially necessary, but the
shared concern must not become a hidden owner of Aggregate state/invariants/
lifecycle/policy.

## High-Level Example

```text
XC-AUDIT
Shared guarantee:
  material accepted operations produce an auditable event

Consumers:
  SL-CAPTURE
  SL-EXPORT

Local Slice obligation:
  supply actor/workspace/action context

Shared owner:
  owns event normalization/delivery/observation guarantee
```

If a future change says “record automated execution origin”, that shared change
belongs to `XC-AUDIT` Evolution Steps. A Slice only records its local impact/ref.

## Upstream Source Contract

```text
consumer Slice/Scenario obligations
shared/external must-hold conditions
current shared implementation Evidence
quality/operability constraints
Domain identity/events/semantic facts only when materially required
accepted/planned future pressure
```

## Knowledge Basis

Principles:

- prove sharedness before creating a shared owner;
- one canonical owner holds the shared guarantee/mechanism;
- consumer-local behavior/inputs remain local;
- generalization cost must be paid by real reuse/coordination value;
- Domain interaction is narrow/explicit and cannot steal Domain semantic ownership.

## Question Set Examples

```text
What exact guarantee/responsibility is genuinely shared?
Which consumers need it?
What remains local to each consumer?
Would reuse/reference or even local duplication be simpler than a shared framework?
What runtime/failure/bypass/operability behavior is material?
Does the concern interact with Domain meaning, and if so what semantic ownership must remain in Domain?
Which planned future changes belong to the shared owner itself?
```

## Lens Profile

Required Core Pack applies.

Primary:
- [`LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY`](../../../idtspe-core/lenses/reusable/LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY.md)

Conditional:
- L4 Dependency / Change Impact
- L5 Evolution / Change Isolation
- Simplicity / Implementation Economy
- L6 Verifiability / Observability / Operability
- Quality / Risk Materiality
- DDD Lens when Domain ownership interaction is ambiguous

## Resolution / Production Method

1. Prove that one shared owner is useful.
2. Resolve the shared guarantee/responsibility and explicit outside.
3. Resolve applicability/consumers and local consumer obligations.
4. Resolve the smallest shared mechanism/ownership boundary that pays for itself.
5. Resolve runtime/operability/migration meaning only when material.
6. Resolve future shared changes as owner-local named Evolution Steps.
7. Challenge premature common frameworks with Shared Responsibility + Simplicity.

Generic Questions/Ideas/QRP/Decisions/Evidence remain Core State.

## Target Step-Result Contract

**Target Step Result:** `Cross-Cutting Concern Definition`

| Result Unit | Meaning |
|---|---|
| `RU-XC-01` | Shared Responsibility / Guarantee |
| `RU-XC-02` | Applicability / Local Integration Contract |
| `RU-XC-03` | Canonical Ownership / Shared Mechanism |
| `RU-XC-04` | Runtime / Operability / Migration Position — optional |
| `RU-XC-05` | Evolution Steps — optional |

### RU-XC-01 — Shared Responsibility / Guarantee

What this owner guarantees and what is explicitly outside.

### RU-XC-02 — Applicability / Local Integration Contract

Which consumers use it and what local obligation each consumer retains. Include
exceptions/bypass rules only when real.

### RU-XC-03 — Canonical Ownership / Shared Mechanism

Selected shared semantic/mechanism boundary at planning depth. Exact code remains
implementation-native/Exact Realization authority.

### RU-XC-04 — Runtime / Operability / Migration Position — Optional

Only material shared runtime/failure/observation/operation/compatibility/migration
meaning.

### RU-XC-05 — Evolution Steps — Optional

Named planned/probable changes to the shared concern itself.

Possible sparse content:

```text
Behavioral / external source
Shared guarantee/mechanism change
Consumer impact
Implementation Outlook
Migration/proof/operation impact
real dependency on another named Evolution Step
```

The shared owner stores the shared change. Consumer Slice Evolution Steps may only
reference it and state local impact/dependency.

## Domain Ownership Guard

Cross-Cutting may:

- reference Domain identity;
- consume selected Domain events/facts;
- invoke semantic Domain operations when required.

It must not silently own:

```text
Aggregate state
Aggregate invariant
Domain lifecycle/transition
Domain policy
```

If such ownership pressure is discovered, surface a Finding Candidate for normal
Domain/owner Resolution.

## Representation / Artifact Contract

```text
ARTIFACT_PROPOSAL
ID: AP-XC-01
CONTENT_KIND: CROSS_CUTTING_OWNER
WHEN: shared responsibility has stable multi-consumer meaning
GUIDANCE: REQUIRED_IF_TARGET_EXISTS
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE_OR_EMBED
SEMANTIC_OWNER: current Cross-Cutting owner
REPRESENTATION: INLINE_STRATEGY_OWNER_OR_DEDICATED_ARTIFACT
FILE_OR_ARTIFACT: <cross-cutting-owner>
CONTENT: applicable RU-XC-01..05
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

Keep small shared owners inline near Slice Strategy when economical. Promote only
under real independent review/reuse/size/lifecycle pressure.

## Validators / Guards

```text
repeated code ≠ shared responsibility
shared concern ≠ fake multi-Scenario Slice
consumer-local behavior stays local
Cross-Cutting owner does not steal Domain invariants/state
shared evolution belongs to the shared owner
file split ≠ second semantic owner
```

## Handoff

Consumers reference the canonical shared owner and keep local obligations. Exact
shared code/config/tests hand off to Core Exact Realization. Material future shared
change remains in `RU-XC-05` and is evaluated through L5 when interaction/change
isolation is material.
