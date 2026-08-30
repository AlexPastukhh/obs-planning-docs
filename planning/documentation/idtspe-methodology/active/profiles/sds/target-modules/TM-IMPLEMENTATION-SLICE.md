# TM-IMPLEMENTATION-SLICE — One Vertical Implementation Slice

Entry Point: `tm.slice.plan`  
Role: primary Target Module  
Target form: `VERTICAL_SLICE`

## Purpose

Plan one selected vertical implementation increment for exactly one Primary Scenario.

The Slice realizes one accepted `Useful Vertical Result Definition` without redefining Scenario/DATA/Behavior/Screen/Domain truth for implementation convenience.



## High-Level Example — Self-Contained Walkthrough

### Situation

Slice Strategy selected:

```text
SL-CAP-01

Primary Scenario:
  Capture Material

Useful Vertical Result:
  user can durably save selected material
  and receive truthful success/failure
```

The semantic behavior is known, but the codebase-level realization is not.

### Why This Module

`TM-IMPLEMENTATION-SLICE` plans one vertical implementation result end-to-end.

It bridges accepted semantics to a **pre-implementation codebase picture** without redefining Scenario/Domain/Screen meaning.

### Walkthrough

First, semantic obligations:

```text
Behavior:
  accept capture
  truthful success/failure

DATA:
  selected material

Invariant:
  no false success after persistence failure

Domain:
  CaptureItem

Screen:
  capture action + result feedback
```

Runtime Path:

```text
user submits capture
→ application receives semantic input
→ Domain/application validation
→ persistence
→ commit/failure
→ result
→ visible feedback
```

Codebase Integration Path:

```text
CaptureScreen.onSave()
→ CaptureController.capture(command)
→ CaptureApplicationService.capture(command)
→ CaptureItem.create(...)
→ CaptureRepository.save(item)
→ CaptureController.toResponse(result)
→ CaptureScreen.applyCaptureResult(result)
```

The Runtime Path describes what the running system does.

The Codebase Integration Path describes which significant codebase owners/calls will realize it.

If `CaptureRepository.save()` needs a simple known mapping algorithm, a lightweight Part Plan is enough.

If the team still must choose among several persistence/transaction strategies with materially different consequences, a newly surfaced issue starts as a Finding Candidate. Core Finding Disposition decides whether accepted meaning creates/refines Question / Idea / Q/R/P / Decision input or another lifecycle consequence. When the problem is independently substantial, Core disposition may surface a Target Formation candidate; Target Formation decides reuse/handoff/new child Target.

### Result

The Slice output contains:

```text
Useful Vertical Result Definition
Domain Elements Used
shared/cross-cutting local obligations
dependencies/handoffs
Runtime Path
call-level Codebase Integration Path
optional focused Part Plans
RU-SLICE-01 verification / test-handoff meaning
```

### Boundary / Lesson

Exact method bodies/files/final patches belong to generic Core [`TM-EXACT-REALIZATION`](../../../idtspe-core/target-modules/TM-EXACT-REALIZATION.md) when an exact realization Target is selected. This Slice Target deliberately stops at call-level/codebase realization meaning.

Implementation convenience cannot silently change Scenario behavior or Domain invariants.

## Upstream Source Contract

### Direct Semantic Sources
```text
selected Slice semantic identity/address from `TM-SLICE-STRATEGY / RU-SSTRAT-03` when Strategy was used
related `RU-SSTRAT-01 Slice Portfolio / Realization Map` meaning
related `RU-SSTRAT-02 Domain / Aggregate Realization Map` meaning
or locally established minimum Slice semantic meaning when Strategy was skipped

Primary Scenario
Scenario DATA used/produced by the result
Behavior Items realized
local/shared must-hold conditions / negative guarantees
Screen meaning when UI
selected/current Domain meaning when present
```

### Inherited Lineage
```text
Fundamental Need
selected real-world solution
Application Definition
```

### Evidence / Current-State Sources
```text
Application feasibility / Prototype Evidence when relevant
current implementation/workspace state
SDS-WORKSPACE-EVOLUTION.md when material future evolution intersects the Slice
observed runtime/work/change Evidence
```

### Constraint / Planning-State Sources
```text
Target Formation resolution selecting/reusing this bounded `TM-IMPLEMENTATION-SLICE` Target
accepted architecture Answer Decisions
Cross-Cutting Concern contracts
delivery/dependency constraints
```

### Source Discovery Rule
Expected archetype only; current `TF-04 SOURCE_SET` remains authority.

## Knowledge Basis

Shared contract: [`knowledge-basis-contract.md`](../../../idtspe-core/shared/knowledge-basis-contract.md)

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- An Implementation Slice plans one Useful Vertical Result end to end rather than a horizontal technical layer.
- Runtime path, Codebase Integration Path and part detail remain subordinate to the selected Slice semantic result.
- Future evolution pressure is evaluated through WEUC/L5; the Target Module does not propose evolution companions itself.

**Referenced Knowledge Owners:**

`NONE`

**Reference Load Policy:**

No additional Knowledge Basis body is required by default; reusable Slice verticality/evolution/simplicity evaluation knowledge remains in Lenses.

**Operationalization Notes:**

This Knowledge Basis supports planning this recurring Target/result family. It is not a current Target Source, project truth or Decision. Reusable cross-Target evaluation knowledge remains in the Lens owners named by this module's `Lens Profile`; do not duplicate their Operational Evaluation Contract or Knowledge Basis here.

## Question Set Examples — Non-Exhaustive

Examples only.

```text
Is the selected Useful Vertical Result still one coherent vertical result?
What exact Behavior/DATA/Requirement/Screen obligations must become real?
Which Domain elements/rules are used, changed or preserved?
What dependencies/handoffs materially affect the result?
Which shared/cross-cutting concerns apply locally and who owns them?
What Runtime Path must occur?
Which concrete codebase responsibilities/calls will realize it?
Which local work is simple enough for a Part Plan, and which independently substantial unresolved work should become Target Formation input?
Does substantial frontend work warrant Target Formation consideration with `TM-FRONTEND-SLICE` as a likely module family?
Which dispositioned L4/L5/L6-derived State / accepted Decisions materially constrain implementation?
Which implementation Finding Candidate could, after Core Finding Disposition, warrant revalidation/reopen of Scenario/Domain/Screen/Application?
```

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/README.md):
- [`LENS-NEED-VALUE-SCOPE`](../../../idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) — L1.
- [`LENS-AUTHORITY-SOT-REUSE`](../../../idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) — L2.
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../../../idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) — L3; required check may resolve as `no material uncertainty`.
- [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — Documentation / Representation; required materialization-stage check that may resolve as `NO_PERSISTENCE_NEEDED` or implementation-native/existing-owner representation.

Primary reusable Lens Pack(s):
- [`LENS-SLICE-VERTICALITY-INTEGRATION`](../lenses/reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md) — required for result integrity, obligations and runtime/call-path consistency

Additional reusable Lens Pack(s):
- [`LENS-UI-SPATIAL-FRONTEND-REALIZATION`](../lenses/reusable/LENS-UI-SPATIAL-FRONTEND-REALIZATION.md) — for UI/full-stack Slices

Frequent conditional Lens(es):
- [`LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY`](../lenses/frequent/LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY.md) — when candidate structure may contain avoidable abstractions/entities/steps/test machinery; simplify only after checking global/local evolution constraints
- [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md) — dependency/change surface and consumers
- [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md) — WEUC/change-path/architecture pressure
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — proof/observation/diagnosis/operation
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — material cross-cutting quality risks

## Resolution / Production Method

This module uses the existing `Upstream Source Contract`, `Question Set Examples`, `Lens Profile`, Knowledge Basis and any module-specific Idea/branch/pattern aids to produce/refine the declared Result Units. Concrete Questions, Ideas, Q/R/P, Decisions and Evidence remain Core State Units.

Default reusable production path:

```text
stabilize Slice Outcome Definition → resolve responsibility/dependency boundary → derive Runtime Path → map it into Codebase Integration Path → add Focused Part Plans only for already-selected local responsibilities → hand RU-SLICE-01 verification meaning to Test Design → hand sufficiently determined whole-Slice or selected implementation scope to TM-EXACT-REALIZATION when literal realization is the next useful Target
```

Proof/Test Handoff is folded into RU-SLICE-01 by default. Future Slice evolution companion is supporting L5/WEUC meaning, not a Slice Result Unit.

A Lens may surface Finding Candidates while this method runs. Their State/lifecycle/owner destination is resolved by the Core [`Finding Disposition Contract`](../../../idtspe-core/shared/finding-disposition-contract.md); a Lens does not directly mutate accepted Result Units.

## Target Step-Result Contract

**Target Step Result:** `Implementation Slice Plan`

The possible result surface is proportional/sparse. Generic IDTSPE State is not duplicated as target-specific fields.

| Result Unit | Meaning | Current projection detail |
|---|---|---|
| `RU-SLICE-01` | Slice Outcome Definition | Slice Identity + Useful Vertical Result Definition + verification/proof-handoff meaning |
| `RU-SLICE-02` | Responsibility / Dependency Boundary | Domain Elements Used + Shared/Cross-Cutting Obligations + Dependencies/Handoffs + implemented/delegated/later/outside meaning |
| `RU-SLICE-03` | Runtime Path | Runtime Path |
| `RU-SLICE-04` | Codebase Integration Path | Codebase Integration Path + Implementation Realization Notes |
| `RU-SLICE-05` | Focused Part Plan(s) — optional | Focused Part Plans |

Only applicable/material Result Units are projected for one concrete Target step. Result Unit identity does not imply a separate Target or file.



### Slice Identity

**Slice ID** — stable identity.

**Primary Scenario** — exactly one Scenario for a normal vertical Slice.

**Related Slice Strategy / Semantic Owner** — Strategy + selected owner-register reference when one exists. `RU-SSTRAT-03` did not itself create this bounded Target; normal Target Formation selected/reused it. This Target refines the same Slice semantic meaning rather than creating a duplicate Slice owner.

**Existing baseline / extension position — when useful** — prior accepted Slice/result/capability baseline and guarantees that must continue to hold. `INITIAL_VERTICAL` / `EXTENDING_VERTICAL` may be used descriptively, but are not required classification enums.

### Useful Vertical Result Definition

**Useful Vertical Result** — concise actor/user-facing observable result.

Good:
```text
User can save selected material and receive truthful durable success/failure feedback.
```

Normally bad:
```text
Implement repository layer.
```

A technical prerequisite is exceptional and requires evidence that it is independently useful/checkable.

**Behavior Obligations** — behavior that must become real.

**DATA Obligations** — semantic information accepted/read/produced/changed/presented.

**Requirement / Invariant Obligations** — must-hold and negative guarantees.

**Screen Obligations — when UI** — selected spatial/window meaning.

These are the exact semantic decomposition of the Useful Vertical Result.

### Domain Elements Used

List only selected Domain meaning actually consumed:

| Domain owner / element | Kind | How this Slice uses it |
|---|---|---|
| `<ref>` | Entity / Value Object / Aggregate / Policy / Invariant / Service / coordination | creates / loads / changes / checks / coordinates / preserves |

This section does not redesign Domain. When a related `RU-SSTRAT-02 Domain / Aggregate Realization Map` exists, detailed Slice planning should confirm/refine which Domain elements this Slice actually uses. A material mismatch becomes a Finding Candidate; Core Finding Disposition decides whether bounded revalidation of Strategy/Domain/another owner is warranted instead of silently drifting accepted meaning.

Canonical planning relation direction is `Slice → Uses → Aggregate/domain concept`; one Slice may use several Domain owners and one Domain owner may be used by several Slices.

### Shared / Cross-Cutting Obligations

| Concern | Canonical owner | Local obligation in Slice | Shared/delegated remainder |
|---|---|---|---|
| `<ref>` | `<owner>` | `<integration responsibility>` | `<what stays shared>` |

### Dependencies / Handoffs

Record only dependencies that materially affect delivery/runtime/order.

Dependency is not automatically a semantic Source.

### Runtime Path

`Runtime Path` is the **descriptive running-system path** when the Useful Vertical Result is exercised.

```text
Actor/UI trigger
→ semantic DATA
→ frontend/local state/validation
→ application/server entry
→ orchestration
→ Domain rule/state transition
→ persistence/query
→ external integration
→ consistency/commit boundary
→ result/error
→ user-visible state
```

For each material hop capture:

```text
input/state
runtime responsibility
read/mutation
sync/async/transaction boundary
failure/branch
observable effect
```

`Runtime Path` is not a task/file/class plan.

### Codebase Integration Path

`Codebase Integration Path` is the **pre-implementation codebase call-level picture** for the whole Slice.

Default granularity:

```text
one plan step
≈ one significant method/function/handler/repository/query/integration call
or one equally significant implementation operation
```

Example:

```text
CaptureScreen.onSave()
→ CaptureController.capture(command)
→ CaptureApplicationService.capture(command)
→ CaptureItem.create(...)
→ CaptureRepository.save(captureItem)
→ CaptureController.toResponse(result)
→ CaptureScreen.applyCaptureResult(result)
```

Naming rule:

```text
existing owner/method known
→ use exact current name

new owner/method selected
→ use selected planned name, optionally [NEW]

responsibility selected but name not yet material
→ precise placeholder:
   [planned CaptureApplicationService].capture(...)
```

Avoid vague steps such as `handle request`, `process domain`, `save data` when the current codebase can identify the real controller/service/repository/feature operation.

For each significant step capture proportionally:

```text
Call / operation
Owner — existing/new/extended
Input
Responsibility
Output / next call
Important boundary — transaction/async/remote/persistence/cross-cutting/failure
```

The Codebase Integration Path should traverse applicable responsibilities:

```text
entry/interaction
application orchestration
Domain calls
query/repository/integration
frontend calls/state
Cross-Cutting integration
result/error propagation
migration/config — when material
```

It is intentionally one level before coding: concrete owners + significant calls + order + responsibility, but not method bodies/full pseudocode/exact diff.

### Runtime Path vs Codebase Integration Path

```text
Runtime Path
= system execution view

Codebase Integration Path
= codebase call-level pre-implementation view
```

They must map to each other but are not duplicates.

### Focused Part Plans — Optional

A Part Plan is a **lightweight decomposition of one already-selected significant call/responsibility**.

Use it for a mostly understood local:

```text
algorithm
mapping
query
transformation
migration
integration step
```

If the local question is still:

```text
which approach/state model/algorithm/integration architecture should we choose?
```

do not inflate the Part Plan. Keep the unresolved choice in normal Core State and, when independently substantial, surface a Target Formation candidate. Target Formation decides whether to reuse an existing Target, hand off to another owner, or form a bounded child Target; any accepted external result then becomes Source/input for parent Slice refinement.

Default:

```text
Slice Codebase Integration Path
├─ optional frontend Part Plan
├─ optional server Part Plan
└─ optional other focused Part Plan
```

`frontend.md`/`server.md` ≠ separate product Slice/Use Case by default.

### Implementation Realization Notes — Optional

Keep only implementation commitments useful before Artifact/File planning:

```text
responsibility boundaries
interfaces/seams
transaction/consistency boundaries
selected integration style
selected state ownership
migration constraints
```


### RU-SLICE-01 Verification / Test Handoff Detail

The verification/proof handoff is part of `RU-SLICE-01 Slice Outcome Definition`, not a separate Result Unit by default.

`TM-TEST-DESIGN` consumes:

```text
Useful Vertical Result Definition
Primary Scenario Acceptance
Behavior Obligations
DATA Obligations
must-hold / negative guarantees
Domain Verification Meaning when present
Screen expectations when relevant
selected implementation boundary
```

Default proof split for the Slice:

```text
Slice orchestration / collaboration among implemented owners
→ integration-test responsibility

isolated complex business/Domain rules used by the Slice
→ focused unit-test responsibility
```

`TM-TEST-DESIGN` decides the concrete proof design and may override the default when another layer is the cheapest credible way to prove the actual property.

No separate proof-target entity is introduced.

## Supporting Evolution Handoff — L5/WEUC

When material planned/probable future evolution surrounds this Slice, apply WEUC/L5 as supporting evaluation. That Lens may surface a future-path Finding Candidate / likely-owner hint; Core Finding Disposition resolves the actual owner/handoff. This Target Module does **not** propose or require a Slice evolution companion.

If `AG-L5-02` justifies durable target-local evolution, Documentation / Representation decides whether it should persist and P-14 resolves an embedded Evolution section versus a separate companion. Example after L5/P-14 placement:

```text
slices/SL-CAP-01.md
slices/SL-CAP-01.evolution.md
```

The selected/materialized evolution companion, after Core disposition + Documentation / Representation + P-14 placement, may contain literal approximate future paths:

```text
EV-17 PDF Capture

[NEW] PdfCaptureEntry
→ [REUSE] captureFeature.commands.capture(...)
→ [REUSE] CaptureController.capture(...)
→ [REUSE] CaptureApplicationService.capture(...)
→ [NEW] PdfCaptureIntegrationTest
```

Use `[NEW?]` when the exact future owner/call is not yet selected.

Also record prepared extension points that future work is expected to reuse and transitions that should happen only under a stated trigger.

The selected Slice semantic identity remains stable across representations. `RU-SSTRAT-03` may already address it as an inline slot, but that register does not form a bounded Target. After Target Formation selects/reuses this `TM-IMPLEMENTATION-SLICE` Target, this module refines the same Slice meaning. Its current representation may remain a `SLICE-STRATEGY.md` section, use implementation-native code/tests plus planning residue, or split to a dedicated Slice artifact under ordinary representation pressure. A `.evolution.md` companion is future planning only and appears only after separate evolution pressure.

## Artifact / File Contract

### Structured Artifact / File Proposals

These proposal records are the Target Module's local placement guidance. [`ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) projects them into the annotated SDS materialization tree; this Target Module remains the source.

```text
ARTIFACT_PROPOSAL
ID: AP-SLICE-01
CONTENT_KIND: IMPLEMENTATION_SLICE_PLAN
WHEN: accepted Slice is ready for implementation/testing
GUIDANCE: REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Implementation Slice Target
REPRESENTATION: EXISTING_STRATEGY_SECTION_OR_DEDICATED_ARTIFACT_OR_IMPLEMENTATION_NATIVE_WITH_PLANNING_RESIDUE
FILE_OR_ARTIFACT: <slice-strategy-owner>#<slice> or <slice-owner> or implementation + planning residue
CONTENT: Useful Vertical Result; obligations; RU-SLICE-01 verification/test-handoff meaning; Domain elements used; Runtime Path; call-level Codebase Integration Path; shared obligations
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-SLICE-02
CONTENT_KIND: SLICE_PART_PLAN
WHEN: one local call/responsibility needs extra detail but not independent Target
GUIDANCE: OPTIONAL_EMBED_DEFAULT
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Slice Target
REPRESENTATION: EMBED_CURRENT_OWNER_OR_SUPPORTING_CHILD_ARTIFACT
FILE_OR_ARTIFACT: <slice-strategy-owner>#<slice> or <slice-owner> or <slice-part-plan-artifact>
CONTENT: lightweight local algorithm/query/mapping/integration decomposition
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```



Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

**REQUIRED meaning, not REQUIRED dedicated file** — an accepted Slice used for realization/testing must preserve its Useful Vertical Result and material Decisions/QRP/implementation obligations somewhere durable enough for the current project. When Strategy already registered stable Slice semantic identity/addressability, reuse that meaning rather than creating a duplicate owner; a bounded `TM-IMPLEMENTATION-SLICE` Target still exists only after normal Target Formation selects/reuses it. The preferred starting representation may therefore remain the existing `SLICE-STRATEGY.md#SL-<id>` slot plus implementation-native names/types/tests/code where sufficient. A dedicated `SL-<id>.md` is promoted only when independent planning/review/addressability is useful.

**CONSOLIDATE by default** — testing/frontend/Part details remain sections of the current Slice representation or strategy coordinator unless independent size/reuse/review/lifecycle pressure justifies separation. Future evolution is not a Slice AP responsibility: WEUC/L5 first surfaces future-evolution Finding Candidate(s); after Core Finding Disposition accepts/resolves local evolution meaning, `AG-L5-02` may propose an Evolution section or companion representation.

**Evolution companion ownership** — `<slice-owner>.evolution.md` is an optional representation of accepted local evolution meaning, not L5/WEUC Lens output and not an intrinsic `TM-IMPLEMENTATION-SLICE` result. The Slice module owns the current Useful Vertical Result / Runtime / Codebase Integration Path; L5 may surface a Finding Candidate, Core Finding Disposition resolves local meaning/owner, and only then may `AG-L5-02` propose a supporting representation. Documentation / Representation + P-14 / TF-10 decide embed vs companion.

**Separate Frontend Target artifact** only after `TM-FRONTEND-SLICE` promotion; a `frontend.md` file by itself is not proof of a new Target.

`P-14` must show Slice owner, optional Part Plan artifacts, evolution companion and any accepted related-Target output destination separately.

## Validators

```text
one Primary Scenario
Useful Vertical Result meaningful/checkable and normally actor/user-facing
existing-baseline / extension position coherent when used
semantic obligations match upstream owners
Domain Elements Used do not redefine Domain
shared concerns preserve canonical ownership
Runtime Path and Codebase Integration Path realize the same result
Part Plans do not replace integrated Slice authority
testing can derive proof directly from Useful Vertical Result Definition
```

## Methodology Direction / Test-Design Interleave

A Slice Target may be invoked more than once around its Test Design.

Standard:

```text
TM-IMPLEMENTATION-SLICE CREATE/REFINE
→ detailed Slice plan
→ TM-TEST-DESIGN
→ TM-EXACT-REALIZATION for exact code/test realization
```

TDD:

```text
TM-IMPLEMENTATION-SLICE
  select/stabilize Useful Vertical Result + semantic obligations
→ TM-TEST-DESIGN
  design integration proof / reuse existing Domain unit proof
→ TM-IMPLEMENTATION-SLICE REFINE
  finish call-level implementation plan with proof seams visible
→ TM-EXACT-REALIZATION for exact code/tests
```

The same logical Slice owner is updated across invocations; its physical representation may stay consolidated or later be promoted/split. A second planning pass does not create a second Slice identity or force a second file.


## Handoff

```text
TM-TEST-DESIGN
TM-TEST-STRATEGY when proof responsibility is shared
TM-FRONTEND-SLICE only when promoted
TM-EXACT-REALIZATION when exact directly integrable code/artifacts are the next useful result
Artifact/File Pack
```
