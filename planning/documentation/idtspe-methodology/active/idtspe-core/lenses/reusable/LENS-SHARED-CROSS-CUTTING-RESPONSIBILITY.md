# LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY — Shared / Cross-Cutting Ownership

Lens ID: `LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Determine whether a responsibility is genuinely shared and how consumers integrate it without duplicating authority or prematurely building a framework.

## Applicability Gate

Primary for Cross-Cutting Concern; useful whenever the same implementation responsibility appears across several Slices/Scenarios.

## Target Inputs / Evidence

Shared policies/must-hold conditions, affected Scenarios/Slices, current duplicated/shared implementation, incidents/operational Evidence and evolution context.

## Sharedness

Verify one real common responsibility rather than coincidentally similar local cases.

## Canonical Ownership

Choose one owner and prevent every consumer from redefining the concern.

## Applicability Matrix

`applies / not applicable / conditional / exception`.

## Local Integration

Define consumer obligations without transferring shared authority.

## Generalization Pressure

Require Evidence before building a common framework; compose with L5 for evolution pressure.

## Runtime / Failure / Bypass

Trace shared mechanism behavior and bypass/failure paths.

## Operability

Compose with L6 for logs/metrics/traces/audit/diagnosis/recovery when material.

## Quality Dimensions

Compose with Quality/Risk for security/privacy/reliability/compliance/etc.

## Findings / Outputs

sharedness, canonical owner, applicability matrix, local integration contract, exceptions/bypass, shared mechanism Ideas and Q/R/P.

## Typical Consumers

Cross-Cutting Concern, Slice, Frontend, Test Strategy and L5 architecture decisions.

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
SEMANTIC_OWNER: resolved Cross-Cutting/shared Target after Core Finding Disposition / Target Formation
REPRESENTATION: NEW_OR_EXISTING_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <shared-concern-owner>
CONTENT: shared guarantee/mechanism/applicability; consumer artifacts keep local refs
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
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
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../shared/artifact-placement-and-idtspe-response-contract.md).

When the Lens surfaces a strong sharedness finding and Core Finding Disposition / Target Formation confirms genuine shared ownership, **REQUIRED** one canonical shared concern artifact/owner is preferred over duplicated consumer copies.

Consumer artifacts store only local integration obligations + references.

If sharedness is not established, keep content local and do not manufacture a common file.

## Guards

Generic Q/R/P Concern ≠ implementation Cross-Cutting Concern.

## Composition

L4/L5/L6 and Quality/Risk are frequent companions.

## Escalation / Revalidation

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

Pre-Lens Cross-Cutting specialized lenses.
