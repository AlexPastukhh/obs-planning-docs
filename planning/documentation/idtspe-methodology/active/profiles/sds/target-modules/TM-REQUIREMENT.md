# TM-REQUIREMENT — Exceptional Shared Must-Hold Condition

Entry Point: `tm.requirement`  
Role: exceptional supporting semantic Target Module; usually unused  
Target form: shared/multi-owner must-hold condition

## Purpose

Provide a standalone canonical owner only when a must-hold condition is genuinely shared or independently material enough that keeping it inside one normal semantic layer would create duplication/ambiguity.

Default:

```text
most requirements/must-hold rules live in their natural layer
TM-REQUIREMENT Target count may be 0
```

See `../shared/requirement-ownership-and-exception-rule.md`.



## High-Level Example — Self-Contained Walkthrough

### Situation

Several Scenarios already contain their own local rules.

For example, Capture Scenario owns:

```text
failed persistence must not report success
```

There is no reason to create a separate Requirement Target for that rule.

Later, an external regulation says:

```text
every operator-triggered state-changing action
must produce one immutable audit record
```

This condition applies to many Scenarios and Slices.

### Why This Module

`TM-REQUIREMENT` is an exceptional escape hatch for a genuinely shared must-hold condition that needs one canonical owner.

It is **not** a normal mandatory layer.

### Walkthrough

Before creating the Target, ask:

```text
Can Scenario own it?
Can Domain own it?
Can Screen own it?
Can Cross-Cutting concern own it?
Can an accepted architecture Decision own it?
```

Suppose no single local semantic owner is adequate because the externally imposed audit rule must remain identical across many consumers.

Then a standalone Requirement may define:

```text
Must-Hold:
  every accepted state-changing operator action
  emits one immutable audit record

Consumers:
  booking Scenario
  cancellation Scenario
  refund Scenario
  audit Cross-Cutting Concern
  Test Strategy
```

### Result

The result is one stable shared must-hold owner with explicit Sources, consumers, interpretation boundaries and revalidation triggers.

### Boundary / Lesson

Most projects may have **zero** standalone Requirement Targets.

Do not duplicate the same rule as equal authority in both Scenario and Requirement.

## Upstream Source Contract

### Direct Semantic Sources
```text
semantic owner(s) whose correctness depends on the shared condition
external/shared policy/contract establishing the condition
```

### Inherited Lineage
```text
Need / solution / Application lineage when relevant
```

### Evidence / Current-State Sources
```text
user/external/source Evidence
current compliance/implementation Evidence when reviewing
```

### Constraint / Planning-State Sources
```text
regulatory
contractual
operational
platform
external-system constraints
```

### Source Discovery Rule
Expected archetype only; current `TF-04 SOURCE_SET` remains authority.

## Knowledge Basis

Shared contract: [`knowledge-basis-contract.md`](../../../idtspe-core/shared/knowledge-basis-contract.md)

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- A Requirement is a must-hold condition/constraint and normally remains with its natural semantic owner.
- Standalone Requirement Target ownership is exceptional and requires independent cross-owner/revalidation value.
- Requirement persistence must not become a catch-all duplicate of Scenario/Domain/Slice meaning.

**Referenced Knowledge Owners:**

`NONE`

**Reference Load Policy:**

No additional Knowledge Basis body is required by default; the module's linked requirement-ownership rule remains operational supporting guidance.

**Operationalization Notes:**

This Knowledge Basis supports planning this recurring Target/result family. It is not a current Target Source, project truth or Decision. Reusable cross-Target evaluation knowledge remains in the Lens owners named by this module's `Lens Profile`; do not duplicate their Operational Evaluation Contract or Knowledge Basis here.

## Standalone-Target Gate

Before creating this Target ask:

```text
Can the condition live naturally in:
  Scenario / Behavior?
  Screen?
  Domain?
  Application Definition?
  a current architecture Answer Decision?
  Slice / Cross-Cutting owner?
```

If yes, keep it there.

Use `TM-REQUIREMENT` only when one shared canonical condition has independent ownership/revalidation value.

## Question Set Examples — Non-Exhaustive

Examples only.

```text
Why can this condition not live cleanly in one existing semantic owner?
Which owners/Scenarios/Slices consume the same condition?
What exact must-hold statement is shared?
What Source/Evidence establishes it?
What is explicitly outside?
How stable is it?
What change/revalidation trigger can invalidate it?
Would Application/Domain/Screen/Cross-Cutting/current architecture Decision be a better authority?
```

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/README.md):
- [`LENS-NEED-VALUE-SCOPE`](../../../idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) — L1.
- [`LENS-AUTHORITY-SOT-REUSE`](../../../idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) — L2.
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../../../idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) — L3; required check may resolve as `no material uncertainty`.
- [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — Documentation / Representation; required materialization-stage check that may resolve as `NO_PERSISTENCE_NEEDED` or implementation-native/existing-owner representation.

Frequent conditional Lens(es):
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — when the shared condition is a quality/risk property
- [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md) — when consumers/dependency surface makes shared ownership material
- [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md) — when credible evolution/change pressure justifies the condition
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — when proof/observation/operation is part of the guarantee

## Resolution / Production Method

This module uses the existing `Upstream Source Contract`, `Question Set Examples`, `Lens Profile`, Knowledge Basis and any module-specific Idea/branch/pattern aids to produce/refine the declared Result Units. Concrete Questions, Ideas, Q/R/P, Decisions and Evidence remain Core State Units.

Default reusable production path:

```text
prove standalone/shared ownership is justified → resolve exact must-hold meaning and authority → record consumers/local interpretation boundary → define revalidation trigger
```

Ordinary Scenario/Behavior-local must-hold meaning stays with its local owner; this module remains exceptional/shared when standalone ownership is justified.

A Lens may surface Finding Candidates while this method runs. Their State/lifecycle/owner destination is resolved by the Core [`Finding Disposition Contract`](../../../idtspe-core/shared/finding-disposition-contract.md); a Lens does not directly mutate accepted Result Units.

## Target Step-Result Contract

**Target Step Result:** `Canonical Requirement Definition`

The possible result surface is proportional/sparse. Generic IDTSPE State is not duplicated as target-specific fields.

| Result Unit | Meaning | Current projection detail |
|---|---|---|
| `RU-REQ-01` | Requirement Definition | Requirement ID + Must-Hold Statement + owner rationale + Source/rationale + consumers + local interpretation boundaries + revalidation trigger |

Only applicable/material Result Units are projected for one concrete Target step. Result Unit identity does not imply a separate Target or file.



**Requirement ID** — stable shared identity.  
**Must-Hold Statement** — exact condition.  
**Canonical Scope / Owner Reason** — why standalone ownership is justified.  
**Source / Rationale** — accepted basis/Evidence.  
**Consumers** — owners relying on it.  
**Local Interpretation Boundaries** — what consumers may specialize without redefining it.  
**Expected Stability / Revalidation Trigger** — when it must be reconsidered.

## Artifact / File Contract

### Structured Artifact / File Proposals

These proposal records are the Target Module's local placement guidance. [`ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) projects them into the annotated SDS materialization tree; this Target Module remains the source.

```text
ARTIFACT_PROPOSAL
ID: AP-REQ-01
CONTENT_KIND: SHARED_MUST_HOLD
WHEN: exceptional standalone shared/multi-owner Requirement Target is selected
GUIDANCE: REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Requirement Target
REPRESENTATION: NEW_OR_EXISTING_CANONICAL_ARTIFACT_OR_REGISTER_ENTRY
FILE_OR_ARTIFACT: <shared-requirement-owner>
CONTENT: one canonical must-hold statement; Sources; consumers; interpretation boundaries; revalidation trigger
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

**REQUIRED only when this exceptional Target exists** — the shared canonical must-hold condition must have stable persistent addressability because multiple owners reference it.

Representation may be a dedicated Requirement artifact or a stable entry in an existing shared Requirement/register owner, depending on workspace conventions.

**Do not create** a standalone Requirement artifact when the condition naturally belongs to Scenario/Behavior, Screen, Domain, Application, Architecture Decision or Slice/Cross-Cutting owner.

Consumers should reference the canonical condition rather than copy it as equal authority.

`P-14` must expose whether standalone persistence is truly required; `UNRESOLVED` is valid until the standalone-owner gate is resolved.

## Guards

```text
standalone ownership is genuinely useful
no existing owner is more natural
condition is not duplicated as an equal authority elsewhere
consumers reference rather than copy/redefine it
```

## Handoff

Consumers reference this canonical condition; testing consumes it as a must-hold Source when relevant.
