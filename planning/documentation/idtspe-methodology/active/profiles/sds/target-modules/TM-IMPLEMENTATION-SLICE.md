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

Integrated Implementation Plan:

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

The Integrated Plan describes which significant codebase owners/calls will realize it.

If `CaptureRepository.save()` needs a simple known mapping algorithm, a lightweight Part Plan is enough.

If the team still must choose among several persistence/transaction strategies with materially different consequences, that local problem becomes a child IDTSPE Target instead.

### Result

The Slice output contains:

```text
Useful Vertical Result Definition
Domain Elements Used
shared/cross-cutting local obligations
dependencies/handoffs
Runtime Path
call-level Integrated Implementation Plan
optional focused Part Plans
testing handoff
```

### Boundary / Lesson

Exact method bodies and final diffs belong to implementation.

Implementation convenience cannot silently change Scenario behavior or Domain invariants.

## Upstream Source Contract

### Direct Semantic Sources
```text
selected Slice Definition from TM-SLICE-STRATEGY
or locally formed Useful Vertical Result Definition when Strategy was skipped

Primary Scenario
Scenario DATA used/produced by the result
Behavior Items included
local/shared must-hold conditions / negative guarantees
Screen Map / Screen Drafts when UI
selected Domain meaning when present
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
accepted architecture Answer Decisions
Cross-Cutting Concern contracts
delivery/dependency constraints
```

### Source Discovery Rule
Expected archetype only; current `TF-04 SOURCE_SET` remains authority.

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
Which local call is simple enough for a Part Plan vs complex enough for child IDTSPE?
Does substantial frontend work justify a promoted TM-FRONTEND-SLICE?
What L4/L5/L6 findings materially constrain implementation?
What implementation finding would require reopening Scenario/Domain/Screen/Application?
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

## Target-Specific Output Template

Generic IDTSPE state is not repeated here.

### Slice Identity

**Slice ID** — stable identity.

**Slice Role** — `INITIAL_VERTICAL` or `EXTENDING_VERTICAL`.

**Primary Scenario** — exactly one Scenario for a normal vertical Slice.

**Related Slice Strategy** — Strategy/Slice Definition ref when one exists.

**Extends — when EXTENDING_VERTICAL** — prior accepted Slice/result/capability baseline.

**Baseline Guarantees To Preserve — when EXTENDING_VERTICAL** — accepted behavior/invariants/negative guarantees that must continue to hold.

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

This section does not redesign Domain.

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

### Integrated Implementation Plan

`Integrated Implementation Plan` is the **pre-implementation codebase call-level picture** for the whole Slice.

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

The integrated plan should traverse applicable responsibilities:

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

### Runtime Path vs Integrated Implementation Plan

```text
Runtime Path
= system execution view

Integrated Implementation Plan
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

do not inflate the Part Plan. Open a bounded child IDTSPE Target and feed its accepted result back to the parent Slice.

Default:

```text
slice integrated plan
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

### Slice Evolution Companion — Conditional

When material planned/probable future evolution surrounds this Slice, persist an optional companion:

```text
slices/SL-CAP-01.md
slices/SL-CAP-01.evolution.md
```

The companion may contain literal approximate future paths:

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

The logical Slice Target remains the semantic owner. Its current representation may be a `SLICE-STRATEGY.md` section, implementation-native code/tests plus planning residue, or a dedicated Slice artifact. A `.evolution.md` companion is future planning only and appears only after separate evolution pressure.

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
CONTENT: Useful Vertical Result; obligations; Domain elements used; Runtime Path; call-level Integrated Implementation Plan; shared obligations; testing handoff
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

```text
ARTIFACT_PROPOSAL
ID: AP-SLICE-03
CONTENT_KIND: SLICE_EVOLUTION_COMPANION
WHEN: material future extension/change path should be remembered
GUIDANCE: PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Slice owner as current truth; companion is supporting future plan
REPRESENTATION: EMBED_CURRENT_OWNER_OR_COMPANION_ARTIFACT
FILE_OR_ARTIFACT: <slice-strategy-owner>#<slice>/Evolution or <slice-owner>#Evolution or <slice-owner>.evolution.md
CONTENT: future [NEW]/[EXTEND]/[REUSE]/[NEW?] code/test paths; prepared seams; transition triggers
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

**REQUIRED meaning, not REQUIRED dedicated file** — an accepted Slice used for realization/testing must preserve its Useful Vertical Result and material Decisions/QRP/implementation obligations somewhere durable enough for the current project. The preferred starting point is the existing `SLICE-STRATEGY.md` Slice section plus implementation-native names/types/tests/code where sufficient. A dedicated `SL-<id>.md` is promoted only when independent planning/review/addressability is useful.

**CONSOLIDATE by default** — testing/evolution/frontend/Part details remain sections of the current Slice representation or strategy coordinator unless independent size/reuse/review/lifecycle pressure justifies separation.

**PREFERRED companion only after pressure** — small future paths stay in the current Slice/strategy Evolution section. `<slice-owner>.evolution.md` appears when future paths, prepared seams or revalidation triggers become independently useful.

**Separate Frontend Target artifact** only after `TM-FRONTEND-SLICE` promotion; a `frontend.md` file by itself is not proof of a new Target.

`P-14` must show Slice owner, optional Part Plan artifacts, evolution companion and any child Target output destination separately.

## Validators

```text
one Primary Scenario
Useful Vertical Result meaningful/checkable and normally actor/user-facing
INITIAL/EXTENDING role coherent
semantic obligations match upstream owners
Domain Elements Used do not redefine Domain
shared concerns preserve canonical ownership
Runtime Path and call-level Integrated Plan realize the same result
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
→ realization
```

TDD:

```text
TM-IMPLEMENTATION-SLICE
  select/stabilize Useful Vertical Result + semantic obligations
→ TM-TEST-DESIGN
  design integration proof / reuse existing Domain unit proof
→ TM-IMPLEMENTATION-SLICE REFINE
  finish call-level implementation plan with proof seams visible
→ realization/tests
```

The same logical Slice owner is updated across invocations; its physical representation may stay consolidated or later be promoted/split. A second planning pass does not create a second Slice identity or force a second file.

## Testing Handoff

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

## Handoff

```text
TM-TEST-DESIGN
TM-TEST-STRATEGY when proof responsibility is shared
TM-FRONTEND-SLICE only when promoted
Artifact/File Pack
Authorized Realization
```
