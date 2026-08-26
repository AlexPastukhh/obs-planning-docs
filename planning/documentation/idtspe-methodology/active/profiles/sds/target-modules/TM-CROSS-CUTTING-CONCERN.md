# TM-CROSS-CUTTING-CONCERN — Shared Implementation Cross-Cutting Concern

Entry Point: `tm.implementation.crosscut`  
Role: shared non-vertical implementation Target Module  
Target form: `CROSS_CUTTING_CONCERN`

Repository provenance: current Slice workflow section `Shared / Cross-Cutting Applicability Vs Ownership`, `requirements-and-change-context.md`, Architecture Planning.

## Naming Boundary

This entity is a shared implementation responsibility.

```text
Implementation Cross-Cutting Concern
≠ generic IDTSPE Planning Concern / Q/R/P
```

Prefer stable IDs such as:
```text
XCUT-AUTH
XCUT-AUDIT
XCUT-OBSERVABILITY
```

## Purpose

Plan one shared implementation responsibility that applies across several Slices/Scenarios but is not itself a vertical user-facing Slice.

Examples:
```text
authentication/session handling
authorization
audit logging
observability/telemetry
retry policy
shared error handling
shared validation infrastructure
feature flags
caching policy
security mechanism
design-system infrastructure
shared accessibility infrastructure
```

Repeated implementation alone is not enough; the shared responsibility must be independently useful to plan/review/revalidate.



## High-Level Example — Self-Contained Walkthrough

### Situation

Three different vertical Slices all require authentication and audit behavior.

If each Slice independently designs session validation and audit semantics, the system will quickly create duplicate/conflicting shared mechanisms.

### Why This Module

A Cross-Cutting Concern is a **shared non-vertical implementation responsibility**.

It exists when one canonical implementation concern genuinely applies across several consumers.

### Walkthrough

For authentication:

```text
Shared guarantee:
  protected operations execute only for a valid authenticated actor

Canonical owner:
  XCUT-AUTH

Affected consumers:
  booking Slice
  cancellation Slice
  account-management Slice
```

Each Slice keeps only its local obligation:

```text
booking Slice:
  supply actor context
  handle unauthorized result

XCUT-AUTH:
  session validation
  expiration policy
  canonical unauthorized semantics
```

Applicability matrix can say:

```text
public status page:
  NOT_APPLICABLE

booking:
  APPLIES

admin override:
  APPLIES_WITH_EXCEPTION
```

### Result

The concern output contains one canonical shared guarantee/mechanism, applicability, local integration contracts and exceptions.

### Boundary / Lesson

“Shared code exists” is not enough to justify a Cross-Cutting Target.

The concern does not become a user-facing vertical Slice.

## Upstream Source Contract

### Direct Semantic Sources
```text
Requirements/policies establishing the shared guarantee
affected Scenarios
affected Behavior Items
Scenario DATA when information handling is constrained
Domain invariants/policies when relevant
Screens/frontend targets when UI-wide
affected Slice definitions
```

### Inherited Lineage
```text
Need / selected real-world solution / Application Definition / Responsibility Boundary
```

### Evidence / Current-State Sources
```text
current shared implementation/workspace
incidents/failures/operational Evidence
observed duplication/change cost
SDS-WORKSPACE-EVOLUTION.md / WEUC evolution evidence
```

### Constraint / Planning-State Sources
```text
Architecture Decisions
security/compliance/platform constraints
delivery/migration constraints
```

### Source Discovery Rule
The actual impacted owner set is resolved through the current Target scope/source decisions.

## Knowledge Basis

Shared contract: [`knowledge-basis-contract.md`](../../../idtspe-core/shared/knowledge-basis-contract.md)

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- A Cross-Cutting Concern Target owns one genuinely shared non-vertical implementation responsibility rather than duplicating it inside multiple Slices.
- Shared ownership is justified by independent reuse/change/revalidation pressure, not merely by repeated vocabulary.
- Current Scenario/Domain/Slice semantics remain upstream truth; the concern must not redefine them for implementation convenience.

**Referenced Knowledge Owners:**

`NONE`

**Reference Load Policy:**

No additional Knowledge Basis body is required by default.

**Operationalization Notes:**

This Knowledge Basis supports planning this recurring Target/result family. It is not a current Target Source, project truth or Decision. Reusable cross-Target evaluation knowledge remains in the Lens owners named by this module's `Lens Profile`; do not duplicate their Operational Evaluation Contract or Knowledge Basis here.

## Question Set Examples — Non-Exhaustive

Examples only. Current `TF-06 QUESTION_SET` may add/remove/split/merge questions.

```text
What exact shared guarantee/responsibility exists?
Why is it genuinely shared rather than coincidentally repeated?
Which Scenarios/Slices/Frontend targets does it apply to?
What is the canonical shared owner?
What must each consumer integrate locally?
What remains centrally/shared-owned?
What exceptions/opt-outs are valid?
What bypass/failure behavior must be impossible?
What runtime path does the shared concern add?
What observability/diagnosis/operation is required?
What migration/rollout/backward-compatibility issue exists?
What common implementation mechanism is justified now?
What should remain local instead of being generalized?
What WEUC/change evidence supports the shared seam?
How should proof cover shared guarantee plus local integration?
```

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/README.md):
- [`LENS-NEED-VALUE-SCOPE`](../../../idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) — L1.
- [`LENS-AUTHORITY-SOT-REUSE`](../../../idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) — L2.
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../../../idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) — L3; required check may resolve as `no material uncertainty`.
- [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — Documentation / Representation; required materialization-stage check that may resolve as `NO_PERSISTENCE_NEEDED` or implementation-native/existing-owner representation.

Primary reusable Lens Pack(s):
- [`LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY`](../../../idtspe-core/lenses/reusable/LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY.md) — required

Additional reusable Lens Pack(s):
- [`LENS-SLICE-VERTICALITY-INTEGRATION`](../lenses/reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md) — when integrating the shared concern into a vertical Slice

Frequent conditional Lens(es):
- [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md) — consumer/dependency/blast-radius surface
- [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md) — shared seam vs local duplication under credible evolution
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — runtime failure/diagnosis/operation
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — material security/privacy/reliability/compliance/etc

## Target-Specific Output Template

Generic IDTSPE state is not repeated here.

### Concern Identity And Guarantee

**Cross-Cutting ID / Name** — stable shared identity.

**Shared Guarantee / Responsibility** — what must consistently be true/provided.

**Why Shared** — evidence that one canonical shared owner is useful.

### Applicability Matrix

| Consumer Target / Scenario | Applies? | Local obligation | Exception / notes |
|---|---|---|---|
| `<ref>` | yes / no / conditional | `<integration responsibility>` | `<why>` |

### Canonical Owner

Explain:
```text
where shared implementation responsibility lives
which semantic/policy Source it realizes
what consumers may depend on
```

### Shared Mechanism / Responsibility

Describe responsibility-level implementation meaning:
```text
policy evaluation
shared service/middleware
shared state/session
logging/telemetry pipeline
validation mechanism
retry/backoff mechanism
```

Avoid premature file/class layout.

### Local Integration Contract

For each consumer:
```text
what it supplies
what the shared concern guarantees/returns
what it handles locally
what it must not override
```

### Exceptions / Bypass Rules

List permitted exceptions and impossible bypasses when material.

### Runtime Path

Trace how the concern participates in representative requests/actions/events and where it can fail.

### Operability / Observation

Describe logs/metrics/traces/audit/diagnosis/alerts only when material.

### Migration / Rollout

Describe coexistence/backfill/flags/compatibility only when needed.

## Artifact / File Contract

### Structured Artifact / File Proposals

These proposal records are the Target Module's local placement guidance. [`ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) projects them into the annotated SDS materialization tree; this Target Module remains the source.

```text
ARTIFACT_PROPOSAL
ID: AP-XCUT-01
CONTENT_KIND: CROSS_CUTTING_OWNER
WHEN: genuine shared non-vertical concern is selected
GUIDANCE: REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Cross-Cutting Target
REPRESENTATION: EXISTING_SHARED_OWNER_OR_IMPLEMENTATION_NATIVE_OR_DEDICATED_ARTIFACT
FILE_OR_ARTIFACT: <shared-concern-owner> or implementation/config + planning owner/reference
CONTENT: shared guarantee/mechanism; applicability; exceptions; canonical policy; integration contract
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-XCUT-02
CONTENT_KIND: CONSUMER_LOCAL_OBLIGATION
WHEN: a Slice consumes the shared concern
GUIDANCE: REQUIRED_LOCAL_REF
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: consumer Slice/Frontend Target
REPRESENTATION: EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <consumer-owner>
CONTENT: only local integration obligation + canonical shared-owner reference; no duplicate full concern
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

**REQUIRED canonical shared meaning when a genuine shared concern Target is selected** — multiple consumers need one authority, but that authority is not automatically a new Markdown file. The Documentation / Representation Lens may select an existing shared owner, implementation/config representation with durable rationale/reference, or a dedicated artifact when independently useful.

Consumer Slices persist only their local integration obligation + reference to the shared owner; they should not copy the full concern as equal authority.

**PREFERRED** — separate artifact when the concern has independent reuse/review/revalidation lifecycle across many consumers.

**Do not create** a shared artifact merely because similar helper code appears in several places.

`P-14` must show canonical concern owner, consumer-local placements and generated/index projections separately.

## Validators

```text
concern genuinely shared
one canonical owner
consumers record local obligations instead of cloning authority
shared mechanism justified by evidence
exceptions explicit
runtime/failure implications understood
generic Q/R/P Concern not confused with this target
```

## Handoff

Affected implementation Targets consume the selected Cross-Cutting contract as a planning/constraint Source and record only their local obligation.

Testing may consume both the shared guarantee and per-consumer integration obligations.
