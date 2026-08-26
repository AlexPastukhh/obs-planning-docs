# LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY — Shared / Cross-Cutting Ownership

Lens ID: `LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Determine whether a responsibility is genuinely shared and how consumers integrate it without duplicating authority or prematurely building a framework.

## Applicability Gate

Primary for Cross-Cutting Concern; useful whenever the same implementation responsibility appears across several Slices/Scenarios.

## Typical Sources / Evidence

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
WHEN: Lens establishes shared canonical responsibility across consumers
GUIDANCE: ROUTE_REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: Cross-Cutting Target after Target Formation
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
SEMANTIC_OWNER: local consumer owner
REPRESENTATION: EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <consumer-owner>
CONTENT: keep local; do not manufacture shared file
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../shared/artifact-placement-and-idtspe-response-contract.md).

When the Lens confirms genuine shared ownership, **REQUIRED** one canonical shared concern artifact/owner is preferred over duplicated consumer copies.

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

Finding:

```text
similar mechanism, no shared canonical guarantee
→ keep local
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
→ canonical XCUT-AUDIT
→ consumers keep only local integration obligations
```

### Result

The Lens can identify:

```text
sharedness
canonical owner
applicability matrix
local integration contract
exceptions
```

### Boundary / Lesson

“Cross-cutting” does not mean “anything used in several files”.

Shared ownership must reduce ambiguity/duplication without stealing local responsibility.

## Provenance

Pre-Lens Cross-Cutting specialized lenses.
