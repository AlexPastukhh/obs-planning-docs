<a id="lens-shared-cross-cutting-responsibility"></a>
# LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY — Shared / Cross-Cutting Ownership

Lens ID: `LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY`

## Purpose

Determine whether a responsibility is genuinely shared and how consumers integrate it without duplicating authority or prematurely building a framework.

## Analysis Surface

This Lens evaluates the bounded planning/implementation surface where the following concern is materially present:

> The same responsibility/guarantee appears across multiple consumers and genuine sharedness, canonical ownership, applicability/exceptions, integration contract or continued shared ownership is uncertain/changing.

Context may inform the evaluation, but context availability alone does not make the entire context part of this Lens's Analysis Surface.

## Applicability & Temporal Triggers

### Base Applicability / Usefulness

The same responsibility/guarantee appears across multiple consumers and genuine sharedness, canonical ownership, applicability/exceptions, integration contract or continued shared ownership is uncertain/changing.

### Opening Triggers

A new Shared candidate, reclassification question, duplicate responsibility across consumers, or renewed canonical-ownership doubt exists.

### During-work Recheck / Invalidation Triggers

Consumer set/requirements, responsibility semantics, shared-vs-local boundary, applicability matrix, exceptions/bypasses, integration contract, or canonical owner changes.

### Closing Triggers / Revalidation Conditions

The result forms/reclassifies/changes a Shared responsibility or bindings in a way that could alter genuine sharedness/canonical ownership; revalidate before closing.

### Confident-False / Stop Conditions

Similarity is superficial, semantics differ by consumer, or responsibility is naturally Domain-owned/Slice-local.

### False-negative Risks

Common utility code is not proof of common semantic responsibility; trigger on guarantee/responsibility, not code reuse.

Trigger semantics follow the canonical Lens Model:

```text
TRUE      → APPLY
FALSE     → NOT_APPLICABLE
UNCERTAIN → APPLY
```

A Unit-level `REQUIRED [phase]` attachment bypasses the apply/skip decision at that phase and requires this Lens to cover the current Analysis Surface. These Lens-owned triggers still govern useful earlier application and recheck/invalidation.

## Inputs / Evidence
Shared policies/must-hold conditions, affected Scenarios/Slices, current duplicated/shared implementation, incidents/operational Evidence and evolution context.

## Evaluation Contract

Apply only the dimensions material to the current question. The domain-specific questions, methods, facets, checks, examples, and pattern guidance below constitute this Lens's evaluation workflow; they are not mandatory checklist items unless the current Analysis Surface makes them material.

## Sharedness

Verify one real common responsibility rather than coincidentally similar local cases.

## Canonical Ownership

Choose one owner and prevent every consumer from redefining the concern.

## Applicability Matrix

`applies / not applicable / conditional / exception`.

## Local Integration

Define consumer obligations without transferring shared authority.

## Generalization Pressure

Require Evidence before building a common framework. Concrete known evolution pressure may be consumed as input when available; this Lens does not invoke another Lens to establish it.

## Runtime / Failure / Bypass

Trace shared mechanism behavior and bypass/failure paths.

## Operability

When logs/metrics/traces/audit/diagnosis/recovery are part of the shared-responsibility question, evaluate their ownership/integration implications here. Already-available operability findings may be consumed as evidence; this Lens does not invoke another Lens.

## Quality Dimensions

When security/privacy/reliability/compliance/etc. materially affect shared responsibility, evaluate their ownership/integration implications here. Already-available quality/risk findings may be consumed as evidence; this Lens does not invoke another Lens.


## Domain Interaction Guard

A shared concern may reference/consume Domain identity, events or selected semantics when materially necessary, but must not silently become owner of Aggregate state, invariants, lifecycle/transitions or Domain policy. Such pressure becomes a Finding Candidate for normal Domain/owner Resolution.

## Evolution Ownership

When selected future Shared capability meaning changes, `TM-EVOLUTION-STEP` owns that future target state. Current Shared/Slice owners reference the Step and keep only current meaning/local impact; they do not duplicate a second evolution roadmap.

## Findings / Outcomes

Valid invocation outcomes:

```text
APPLIED — no material finding
APPLIED — one or more material Finding Candidates
NOT_APPLICABLE — short confident-FALSE reason when application is not forced at this checkpoint
```

sharedness, canonical owner, applicability matrix, local integration contract, exceptions/bypass, shared mechanism Proposals and Q/R/P.

## Non-Normative Navigation — Typical Surfaces

This section is navigation only. It does not create or strengthen Unit attachment; normative predictable attachment belongs beside the natural Unit and registry discovery remains projection-only.

Shared Capability, Slice, architecture/evolution and proof-coordination evaluation where shared ownership is material.

## Artifact / File Implications

### Structured Artifact / File Guidance

These records describe conditional placement guidance produced by this Lens. They never create semantic ownership by themselves.

```text
ARTIFACT_GUIDANCE
ID: AG-XCUT-01
CONTENT_KIND: GENUINE_SHARED_CONCERN
WHEN: Lens surfaces a Finding Candidate that shared canonical responsibility may exist across consumers
GUIDANCE: ROUTE_REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: resolved Shared Implementation Capability or other natural owner after Core Finding Disposition / Target Formation
REPRESENTATION: NEW_OR_EXISTING_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <shared-capability-or-natural-owner>
CONTENT: shared guarantee/mechanism/applicability; consumer artifacts keep local refs
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

```text
ARTIFACT_GUIDANCE
ID: AG-XCUT-02
CONTENT_KIND: NOT_GENUINELY_SHARED
WHEN: similar local mechanisms lack one shared guarantee
GUIDANCE: ROUTE_LOCAL
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: local consumer owner when Core Finding Disposition confirms local ownership
REPRESENTATION: EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <consumer-owner>
CONTENT: keep local; do not manufacture shared file
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```


Shell placement semantics: [`planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md`](../../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md).

When the Lens surfaces a strong sharedness finding and Core Finding Disposition / Target Formation confirms genuine shared ownership, **REQUIRED** one canonical semantic shared destination/representation is preferred over duplicated equal-authority consumer copies. The active profile decides whether that destination is current realized owner state or future-transition target state; under SDS unrealized Shared meaning belongs to an Evolution Step Target Shared Body.

Consumer artifacts store only local integration obligations + references.

If sharedness is not established, keep content local and do not manufacture a common file.

## Guards / Boundaries
Generic Q/R/P Concern ≠ Shared Implementation Capability.

## Finding / Lifecycle Boundary

Temporal revalidation timing is owned by `Applicability & Temporal Triggers` above. The remaining guidance here concerns Finding/lifecycle routing rather than checkpoint trigger ownership.

Repeated local concern becomes shared only when canonical ownership adds real value.

## High-Level Example — Self-Contained Walkthrough

### Situation

Five Slices all contain logging code.

The team considers creating one global Logging Concern.

### Why This Lens

Repeated code alone does not prove there is one shared semantic/implementation responsibility.

The Lens tests whether common ownership is genuinely useful.

### Walkthrough

Case A:

```text
each Slice writes local debug information
with different purpose/lifecycle
```

Finding Candidate:

```text
similar mechanism, no shared canonical guarantee
→ likely local-owner / no-shared-Target outcome hint
→ Core Finding Disposition confirms or rejects that owner/lifecycle consequence
→ keep local only after local ownership is accepted
```

Case B:

```text
every state-changing operator action
must create one audit record
under the same policy
```

Finding:

```text
genuine shared guarantee
→ likely shared-owner candidate: XCUT-AUDIT
→ Core Finding Disposition / Target Formation confirms or rejects that owner
→ consumers keep only local integration obligations after ownership is accepted
```

### Result

The Lens can identify:

```text
sharedness
likely canonical-owner hint
applicability matrix
local integration contract
exceptions
```

### Boundary / Lesson

“Cross-cutting” does not mean “anything used in several files”.

Shared ownership must reduce ambiguity/duplication without stealing local responsibility.

## Knowledge Basis

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- Repeated code alone does not prove one shared responsibility.
- Shared ownership is justified by one stable shared guarantee/mechanism with explicit consumer applicability and local integration boundaries.

**Referenced Knowledge Owners:**

- `NONE`

**Reference Load Policy:**

No external knowledge body is required for normal use.

**Operationalization Notes:**

Cross-cutting implementation facts are Target Inputs; the sharedness/ownership test is owned here.

## Provenance

Pre-Lens shared/cross-cutting specialized evaluation.
