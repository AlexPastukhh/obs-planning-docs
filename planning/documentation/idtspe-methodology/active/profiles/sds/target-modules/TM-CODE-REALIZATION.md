<a id="tm-code-realization"></a>
# TM-CODE-REALIZATION — Code Realization / Integration

> Semantic Owner Dependencies
> - `EXTENDS` [Target Module Meta-Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model) — `TARGET-MODULE.META-MODEL`.
> - `CONTEXTUALIZES` [SDS Semantic Composition / Readiness](../profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md#sds-semantic-composition-readiness) — `SDS.SEMANTIC-COMPOSITION-READINESS`.
> - `CONTEXTUALIZES` [Core Exact Realization](../../../idtspe-core/target-modules/TM-EXACT-REALIZATION.md#tm-exact-realization) — generic literal/directly-integrable realization outside the narrower SDS code owner.

Entry Point: `tm.sds.code.realization`
Role: SDS profile Target Module
Target family / archetype: `CODE_REALIZATION`

## Purpose

Produce the **exact current codebase realization** of sufficiently accepted SDS meaning in a form that can be reviewed and, when authorized, directly integrated into the selected codebase/environment without another material semantic/design pass.

This module is the SDS owner for code-oriented realization:

```text
accepted SDS meaning / selected Evolution Step body
+ current codebase state
+ bounded code realization scope
↓
RU-CODE-01 Exact Code Realization
↓ optional / explicitly authorized
integration + build/test/static/runtime Evidence
↓
minor in-scope repair OR material Finding / upstream revalidation
↓
updated RU-CODE-01
```

The module owns **literal implementation realization**, not upstream product/Domain/Slice/Shared semantics. If the work is still materially deciding behavior, Domain ownership, Slice responsibility, Shared extraction, durable requirements or future target state, resolve that meaning in its natural SDS owner before treating the work as Code Realization.

## Scope Boundary / Relation To Core Exact Realization

Use `TM-CODE-REALIZATION` when the primary requested result is codebase implementation under active SDS context, including source code, test code and codebase-integral implementation wiring needed to make that implementation directly integrable.

Use Core [`TM-EXACT-REALIZATION`](../../../idtspe-core/target-modules/TM-EXACT-REALIZATION.md) for broad non-code or profile-neutral exact realization, for example a standalone configuration payload, schema/document/workflow/manifest replacement or another directly-integrable artifact whose primary responsibility is not SDS code implementation.

A code change may incidentally include build/project configuration, local migration/wiring or schema-adjacent material when that material is an inseparable implementation consequence of the bounded code change. If the non-code artifact is independently substantial, form/use its natural owner or Core Exact Realization instead of hiding it inside Code Realization.

## Activation / Scope Gate

Use this Target Module when all are materially true:

```text
SDS profile is active
+ a bounded codebase implementation result is requested/useful
+ upstream semantic/planning meaning is sufficient for exact code realization
+ the relevant current codebase/project state can be inspected or explicitly bounded
+ the useful result is the exact codebase candidate itself
```

Do not use this module merely to encode unresolved design choices as code.

Small implementation-local choices may remain inside Code Realization when they do not alter accepted upstream meaning, natural-owner boundaries or material Decisions.

## Upstream Source Contract

### Accepted meaning sources

Use whichever are material to the bounded realization:

```text
current Feature / BR-* meaning
current Scenario / SR-* meaning
current Screen/UI constraints
current Domain owner semantics / IR-DOMAIN-*
current Slice owner semantics / IR-SLICE-*
current Shared capability semantics / IR-SHARED-*
selected TM-EVOLUTION-STEP Target Bodies and transition obligations
accepted Decisions / Proposals / Pre-Update Plan when present
selected proof intent / durable PFR-* when applicable
```

Selected unrealized future meaning remains Step-owned planning authority until implementation/proof/materialization establishes the new current-owner state.

### Current codebase sources

```text
current source/test files
existing types/APIs/contracts
project/module/package structure
current dependencies and build configuration
current persistence/integration adapters
existing tests and test conventions
current runtime/configuration assumptions material to the code change
known implementation Evidence/failures
```

Inspect the real codebase rather than inventing project names/APIs when current sources are available.

## Target Step-Result Contract

**Target Step Result:** `Code Realization`

| Result Unit | Meaning |
|---|---|
| `RU-CODE-01` | Exact Code Realization — the current complete directly-integrable codebase candidate for the selected bounded scope |

### `RU-CODE-01` Unit Definition

**Responsibility.** Produce the complete exact codebase realization for the selected bounded scope without silently redefining accepted upstream SDS meaning.

**Purpose.** Convert sufficiently accepted SDS semantics into project-native source/test/implementation material that can be reviewed, integrated and verified without another material semantic/design pass.

**Result Content Contract.** One complete current exact codebase candidate, including the source/test code and codebase-integral wiring needed for direct integration, plus enough baseline/destination identity to interpret/apply it safely.

This Unit is simple by default. Questions, Problems, Proposals, Decisions, Findings and executed Evidence remain generic Core State around the Unit unless a true terminal sub-responsibility requires an explicit Slot.

### Result Unit Applicability / Materiality

Apply the Core [`Unit Applicability / Materiality / Disposition Contract`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-disposition). Unit presence/disposition mechanics follow the Core; this module owns only the local Code Realization materiality trigger.

| Result Unit | Substantive resolution is material when | Unit disposition when substantive resolution is not material |
|---|---|---|
| `RU-CODE-01` | always once a Code Realization Target is formed; it owns the exact codebase candidate for the bounded scope | no Unit-level omission after Target formation; if accepted semantics/readiness/current codebase context are insufficient, do not form the Target or keep the formed Unit `OPEN` with the blocker |

### Lens Attachments

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../../../idtspe-core/lenses/LENS-REGISTRY.md)
- **TRIGGERED:**
  - [`LENS-DOMAIN-MODELING-DDD`](../lenses/reusable/LENS-DOMAIN-MODELING-DDD.md)
  - [`LENS-SLICE-VERTICALITY-INTEGRATION`](../lenses/reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md)
  - [`LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY`](../lenses/reusable/LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY.md)
  - [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md)
  - [`LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY`](../lenses/frequent/LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY.md)
  - [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md)
  - [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md)
  - [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md)
  - [`LENS-TEST-PROOF-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md)

These attachments do not make Code Realization a second semantic owner for Domain/Slice/Requirement/Evolution meaning. A triggered Lens may surface a Finding or upstream revalidation need; durable meaning stays with the natural owner.

## Explicit Unit Checkpoint Placement

`RU-CODE-01` inherits the generic [`Unit Applicability Envelope`](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-envelope).

<a id="ru-code-01-processing-envelope"></a>
#### `RU-CODE-01` processing envelope

1. **Opening Unit Checkpoint — `RU-CODE-01`** — inspect the current codebase and accepted upstream meaning; evaluate inherited/attached/discovered Lens triggers before material code work.
2. **Unit Work — `RU-CODE-01`** — produce/refine the exact code candidate; re-evaluate affected Lens triggers whenever the implementation surface changes materially.
3. **Closing Unit Checkpoint — `RU-CODE-01`** — evaluate the actual final code candidate, final trigger state, proof/Evidence implications and unresolved Findings before treating the Unit as current-for-handoff.

## Resolution / Production Method

### 1. Resolve the bounded code realization scope

Establish:

```text
accepted upstream meaning that must not drift
current codebase files/APIs/types/dependencies that constrain realization
files/modules/owners explicitly inside and outside scope
what exact codebase state counts as completion
which proof/checks are required or materially useful
```

### 2. Use transient exact implementation planning when useful

When exact code cannot responsibly be produced in one direct pass, use transient internal reasoning such as:

```text
affected files/modules/classes
responsibility allocation already accepted upstream
inputs/outputs/side effects/dependencies
state/data flow
failure/retry/uncertainty flow
candidate signatures/call flow
source/test changes
build/config/wiring consequences
proof strategy/checks
open implementation-local details
```

This working plan is disposable and non-authoritative. Durable meaning discovered here must be routed to the natural owner rather than becoming true merely because implementation needs it.

### 3. Produce the complete project-native candidate

Prefer exact project-native source/test files or a directly applicable patch over prose pseudocode. Use current project names/APIs/conventions. Keep unresolved material assumptions explicit.

Literal tests may be part of `RU-CODE-01` when tests are in scope. Test/proof **strategy** remains governed by the Test Proof Lens and natural-owner proof obligations; executed tests become Evidence only when actually run.

### 4. Review before execution is valid

The user may request exact code only and stop before mutation/build/test activity. Producing `RU-CODE-01` does not itself authorize destination mutation, command execution or repair.

### 5. Resolve integration / verification authority

When authorized, apply/integrate the candidate into the selected available environment and run proportionate checks such as:

```text
build / compile
unit / integration / E2E tests
static / type / lint checks
focused runtime/startup checks
selected behavior/scenario checks
```

Never report an unexecuted or unavailable check as passing.

### 6. Minor repair boundary

Automatic repair is allowed only when authorized and only for local implementation defects inside scope that do not change accepted product/Domain/Slice/Shared semantics, material upstream Decisions or out-of-scope owners.

Typical local repairs:

```text
syntax/compile defects
imports
mechanical API/signature mismatch against inspected current sources
local wiring/configuration mismatch
local implementation bug directly contradicting accepted intent
```

Anything requiring a material semantic/architecture/ownership choice becomes a Finding/revalidation problem, not silent code repair.

### 7. Finding / upstream revalidation boundary

```text
implementation Evidence / Lens analysis
→ material Finding Candidate / Problem
→ Core Finding Disposition
→ natural SDS owner / Decision / Evolution Step revalidation when required
→ updated accepted meaning
→ updated RU-CODE-01
```

The code candidate becomes stale when newly accepted upstream meaning invalidates an assumption used by it.

### 8. Handoff

The current accepted code realization may become input to an authorized integration/application mechanism and later Evidence/revalidation. Code Realization does not imply Git commit/push, deployment or production release.

## Validators / Guards

```text
code candidate is directly integrable at the chosen representation granularity
accepted upstream SDS meaning is not silently redefined
real current codebase sources were inspected or explicitly bounded
Domain/Slice/Shared ownership is not invented inside code
implementation requirements are not silently created by literal implementation
future selected meaning is not treated as current-owner truth before realization/materialization
build/test/runtime claims distinguish executed Evidence from planned/not-runnable checks
repair stays inside explicit authority and bounded scope
current RU-CODE-01 reflects accepted repairs/revalidation
commit/push/deploy/release is never implied
```

## Relationship To Other Realization / Evidence Targets

```text
SDS semantic/design owners
→ define accepted meaning

TM-PRE-UPDATE-PLAN [optional Core]
→ reviewable intended concrete change before mutation when useful

TM-CODE-REALIZATION
→ exact SDS codebase realization

TM-EXACT-REALIZATION [Core]
→ broad/profile-neutral non-code or otherwise generic exact directly-integrable realization

TM-PRACTICAL-TEST
→ separately useful real-subject operated Evidence inquiry when automation/build integration Evidence is insufficient
```

## Artifact / File Contract

The natural representation of `RU-CODE-01` is implementation-native:

```text
source code
test code
exact code patch
codebase-integral build/wiring/config material when inseparable from the code change
```

Do not create a Markdown planning artifact merely because this Target exists. Representation/P-14 governs any additional durable supporting artifact.

## Handoff / Revalidation

If later codebase/destination changes make the realization stale, reuse/revalidate the same Target while the bounded code responsibility remains the same. Form another Target only through normal Target Formation when the responsibility itself materially changes.
