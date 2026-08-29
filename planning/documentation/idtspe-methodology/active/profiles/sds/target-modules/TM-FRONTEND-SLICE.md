# TM-FRONTEND-SLICE — Frontend Realization Slice

Entry Point: `tm.slice.frontend`  
Role: specialized implementation Target Module  
Target form: `FRONTEND_SLICE`

Methodology note: this is a new extension. Current repo/Enman routing supports separate client/server planning surfaces, while core planning states that Screen owns spatial meaning, Scenario owns behavior and frontend planning owns realization. It does not already define this exact module.

## Purpose

Plan frontend realization when UI/frontend responsibility has enough independent complexity that keeping all reasoning in the integrated vertical Slice would hide important architecture/state/navigation decisions.

```text
Scenario / Behavior
→ what must happen and what it means

Scenario DATA
→ information meaning

Screen
→ window/layout/visibility meaning

TM-FRONTEND-SLICE
→ frontend architecture/implementation that realizes them
```



## High-Level Example — Self-Contained Walkthrough

### Situation

A vertical Slice already says the user must capture material and receive feedback.

A simple frontend Part Plan initially seems enough, but the frontend now has material unresolved choices:

```text
overlay vs dedicated window
URL vs local vs shared state
read/query vs command/mutation split
server-data synchronization
error/pending/offline behavior
feature ownership boundaries
```

### Why This Module

Frontend remains a Part Plan by default.

`TM-FRONTEND-SLICE` is a **promotion** only when frontend realization itself has enough independent Scope, Questions, Ideas and Decisions to deserve a Target.

### Walkthrough

The module starts from existing semantic Sources:

```text
Scenario behavior
Scenario DATA
Screen Map/Drafts
Useful Vertical Result
must-hold conditions
current frontend
```

Candidate architectures might be:

```text
A:
  component calls fetch directly

B:
  feature-local command/query + server gateway

C:
  generic shared API repository
```

L4/L5 can compare real change paths such as:

```text
add second server-backed action
change response contract
move interaction to another Screen
reuse feature elsewhere
```

An accepted call-level frontend plan might become:

```text
CaptureOverlay.onSubmit()
→ captureFeature.commands.capture(input)
→ captureServerGateway.capture(request)
→ captureFeature.applyResult(response)
→ CaptureOverlay.renderResult()
```

### Result

The output defines frontend realization:

```text
Screen/Behavior realization
state ownership
data-flow/synchronization
navigation
async/failure behavior
selected frontend architecture responsibilities
call-level frontend plan
```

### Boundary / Lesson

Feature folders, command/query split and gateway/repository-like boundaries are candidate patterns, including patterns observed in Enman.

They are not mandatory frontend architecture.

## Promotion From A Part Plan

Default:

```text
frontend Part Plan inside TM-IMPLEMENTATION-SLICE
→ normal case

TM-FRONTEND-SLICE
→ promotion only when frontend itself has material independent:
   Target-Scope choices
   Question-Set choices
   state/navigation/data-flow architecture alternatives
   Q/R/P / Branches / Decisions
   revalidation value
```

A separate frontend Target is not justified merely because a `frontend.md` file exists.

## Upstream Source Contract

### Direct Semantic Sources
```text
Primary Scenario
Useful Vertical Result Definition or its frontend portion
Behavior Obligations
Scenario DATA
Requirements / negative guarantees
Screen Map
relevant Screen Drafts
Scenario ↔ Screen relations
```

### Inherited Lineage
```text
Need / selected real-world solution
Application Definition / Responsibility Boundary
integrated parent Slice when present
```

### Evidence / Current-State Sources
```text
current frontend implementation
Prototype/UI Evidence
observed UX/performance/maintenance Evidence
```

### Constraint / Planning-State Sources
```text
frontend-relevant Architecture Decisions
SDS-WORKSPACE-EVOLUTION.md when material frontend evolution is already interpreted
design system / accessibility constraints
Cross-Cutting Concern contracts
platform/browser/window constraints
```

### Source Discovery Rule
Expected archetype only. Resolve actual Sources in `TF-04 SOURCE_SET`.

## Knowledge Basis

Shared contract: [`knowledge-basis-contract.md`](../../../idtspe-core/shared/knowledge-basis-contract.md)

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- Frontend Slice plans frontend realization for one useful vertical result without turning UI architecture patterns into mandatory presets.
- UI/spatial state, user action, feedback and integration remain traced to upstream Scenario/Slice meaning.
- A frontend-specific Target is justified only when its realization has independent useful/revalidatable choice surface.

**Referenced Knowledge Owners:**

`NONE`

**Reference Load Policy:**

No additional Knowledge Basis body is required by default; reusable UI/spatial/evolution evaluation knowledge remains in Lenses.

**Operationalization Notes:**

This Knowledge Basis supports planning this recurring Target/result family. It is not a current Target Source, project truth or Decision. Reusable cross-Target evaluation knowledge remains in the Lens owners named by this module's `Lens Profile`; do not duplicate their Operational Evaluation Contract or Knowledge Basis here.

## Question Set Examples — Non-Exhaustive

Examples only. Current `TF-06 QUESTION_SET` may add/remove/split/merge questions.

```text
Which user-visible part of the Useful Vertical Result is this frontend target responsible for?
Through which Screens/windows does the Primary Scenario pass?
Which Behavior Items must be invokable/observable on each Screen?
Which DATA is displayed, entered, edited, selected or derived?
Where should frontend state live: URL, local UI, shared client, server/cache or derived?
What navigation/routing/window transitions are required?
How are loading/empty/error/retry/pending states represented?
What component/composition boundaries keep the UI understandable and changeable?
How is remote DATA fetched/cached/synchronized/invalidated?
Is optimistic UI justified and what guarantees constrain it?
Which validation is presentation-only vs shared/domain behavior?
Which design-system/accessibility/responsive constraints apply?
Which frontend concerns are shared/cross-cutting?
What frontend architecture choice materially affects WEUC/change cost?
What should remain movable between Screens as the Screen Map evolves?
```

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/README.md):
- [`LENS-NEED-VALUE-SCOPE`](../../../idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) — L1.
- [`LENS-AUTHORITY-SOT-REUSE`](../../../idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) — L2.
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../../../idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) — L3; required check may resolve as `no material uncertainty`.
- [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — Documentation / Representation; required materialization-stage check that may resolve as `NO_PERSISTENCE_NEEDED` or implementation-native/existing-owner representation.

Primary reusable Lens Pack(s):
- [`LENS-UI-SPATIAL-FRONTEND-REALIZATION`](../lenses/reusable/LENS-UI-SPATIAL-FRONTEND-REALIZATION.md) — required
- [`LENS-SLICE-VERTICALITY-INTEGRATION`](../lenses/reusable/LENS-SLICE-VERTICALITY-INTEGRATION.md) — required to stay tied to the parent Useful Vertical Result

Frequent conditional Lens(es):
- [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md) — frontend dependency/change surface
- [`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`](../lenses/frequent/LENS-WORKSPACE-EVOLUTION-ARCHITECTURE.md) — frontend WEUC/state seams/architecture tax
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — proof/diagnosis/operation
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — material UX/accessibility/performance/security/etc

## Architecture Pattern Ideas — Not Presets

Source-grounded Enman examples can seed Ideas such as:

```text
feature-oriented organization
feature-local api/model/ui boundaries
read/query vs command/mutation split
typed request/response contracts
feature/server integration gateway
shared transport helper
```

Select/reject these through current Scope + L4/L5/L6 + ordinary IDTSPE Decisions. Do not copy Enman structure by default.

## Resolution / Production Method

This module uses the existing `Upstream Source Contract`, `Question Set Examples`, `Lens Profile`, Knowledge Basis and any module-specific Idea/branch/pattern aids to produce/refine the declared Result Units. Concrete Questions, Ideas, Q/R/P, Decisions and Evidence remain Core State Units.

Default reusable production path:

```text
anchor frontend work to one selected Slice/Scenario/Screen meaning → resolve state/navigation/composition → resolve DATA/async/shared concern boundaries → trace frontend runtime → map it into concrete/planned frontend codebase owners/calls
```

A Frontend evolution companion is only an `AG-L5-02` representation proposal over accepted local evolution meaning; it is not direct WEUC/L5 output and not an intrinsic Frontend Result Unit.

A Lens may surface Finding Candidates while this method runs. Their State/lifecycle/owner destination is resolved by the Core [`Finding Disposition Contract`](../../../idtspe-core/shared/finding-disposition-contract.md); a Lens does not directly mutate accepted Result Units.

## Target Step-Result Contract

**Target Step Result:** `Frontend Realization Plan`

The possible result surface is proportional/sparse. Generic IDTSPE State is not duplicated as target-specific fields.

| Result Unit | Meaning | Current projection detail |
|---|---|---|
| `RU-FE-01` | Frontend Outcome / Scenario-Screen Map | Frontend Target Identity + Scenario → Screen → Behavior Map |
| `RU-FE-02` | Frontend State / Navigation Model | Frontend State Model + Navigation / Window Plan + UI Composition Responsibilities |
| `RU-FE-03` | Frontend DATA / Async / Shared-Concern Integration | DATA Access / Synchronization + Async/Error/Empty/Pending + Design/Accessibility/Responsive + Shared/Cross-Cutting concerns |
| `RU-FE-04` | Frontend Runtime Path | Frontend Runtime Path |
| `RU-FE-05` | Frontend Codebase Integration Path | Frontend Codebase Integration Path |

Only applicable/material Result Units are projected for one concrete Target step. Result Unit identity does not imply a separate Target or file.



### Frontend Target Identity

**Frontend Target ID** — stable identity.

**Primary Scenario** — one Scenario.

**Useful Vertical Result Ref** — selected user-facing result whose frontend part is realized.

**Related Screen Map / Screens** — spatial owners being implemented.

### Scenario → Screen → Behavior Map

For each relevant Screen/window:

```text
Screen
Scenario role on this Screen
Behavior Items available/observable
DATA visible/input/editable
entry/exit/navigation relation
```

### Frontend State Model

For each material state item:

```text
semantic meaning
owner class:
  URL
  local UI
  shared client
  server/cache
  derived
source of truth
lifetime
update path
reconciliation/invalidation
```

### Navigation / Window Plan

Explain:
```text
routes/windows/modals
entry/re-entry
transitions
back/cancel/recovery
deep-link/share semantics when material
```

### UI Composition Responsibilities

Describe responsibility boundaries:
```text
screen shell
interaction area
form/input responsibility
result/list/detail region
shared navigation
feedback/error surface
```

Do not freeze exact component/file names unless selected as hard contracts.

### DATA Access / Synchronization

Explain:
```text
semantic DATA entering frontend
load/submit/update path
cache/server ownership
staleness/invalidation
optimistic behavior
conflict/reconciliation
```

### Async / Error / Empty / Pending States

Map UI state to selected Behavior/Requirements so presentation cannot imply a semantic result that did not occur.

### Design / Accessibility / Responsive Realization

Explain implementation-level decisions needed to realize Screen requirements:
```text
design-system primitives
keyboard/focus
accessibility semantics
window/responsive behavior
density/hierarchy constraints
```

### Shared / Cross-Cutting Frontend Concerns

Reference shared owners for:
```text
auth session handling
global error policy
telemetry/logging
feature flags
design system
shared cache/data policy
accessibility infrastructure
```

### Frontend Runtime Path

Trace:
```text
user interaction
→ local/UI state
→ validation
→ request/action
→ pending state
→ response/domain outcome
→ cache/state reconciliation
→ Screen update
→ error/recovery
```

### Frontend Codebase Integration Path

Frontend-specific **pre-implementation call-level codebase picture**.

Use concrete existing/planned feature owners and significant calls when known.

Command path example:

```text
CaptureScreen.onSave()
→ captureFeature.commands.capture(input)
→ captureServerGateway.capture(requestContract)
→ captureFeature.applyCaptureResult(responseContract)
→ CaptureScreen renders selected state
```

Read path example:

```text
InboxScreen.onEnter()
→ inboxFeature.queries.loadItems()
→ inboxServerGateway.getItems(queryContract)
→ inboxFeature.mapResponse(...)
→ inboxState.replace(items)
→ InboxScreen renders items
```

`commands`, `queries`, `gateway`, feature folders or repository-like integration boundaries are **candidate architecture Ideas**, not required conventions.

For each significant frontend call capture:

```text
owner / feature
existing vs new/extended
method/operation
input/output contract
state read/change
server/integration boundary
next call
material async/error behavior
```

The plan maps selected Screen/Behavior/DATA semantics into the actual/planned frontend codebase without method-body pseudocode.

A simple local call may get a Part Plan. A newly surfaced material architecture/state/algorithm issue starts as a Finding Candidate; Core Finding Disposition decides whether accepted meaning creates/refines Question / Idea / Q/R/P / Decision input or another lifecycle consequence. When the problem is independently substantial, Core disposition may surface a Target Formation candidate; Target Formation decides reuse/handoff/new child Target.



## Supporting Frontend Evolution Handoff — WEUC/L5

When future state/navigation/data-flow/integration evolution is material, WEUC/L5 surfaces a Finding Candidate; Core Finding Disposition resolves any accepted local evolution meaning/owner. Only then may `AG-L5-02` propose a local evolution representation; Documentation / Representation + P-14 / TF-10 decide whether `<frontend-owner>.evolution.md` is actually created/updated.

Keep current frontend truth in this Target. When a companion representation is actually selected, keep approximate future `[NEW]/[EXTEND]/[REUSE]/[NEW?]` paths there and reference accepted project-global implications from the Workspace Evolution Map when warranted.

## Artifact / File Contract

### Structured Artifact / File Proposals

These proposal records are the Target Module's local placement guidance. [`ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) projects them into the annotated SDS materialization tree; this Target Module remains the source.

```text
ARTIFACT_PROPOSAL
ID: AP-FE-01
CONTENT_KIND: FRONTEND_REALIZATION
WHEN: frontend remains ordinary Part Plan
GUIDANCE: PREFERRED_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: parent Implementation Slice Target
REPRESENTATION: EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <parent-slice-owner>
CONTENT: frontend state/data-flow/navigation/call-level realization sufficient for current Slice
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-FE-02
CONTENT_KIND: PROMOTED_FRONTEND_TARGET
WHEN: frontend has independent Scope/Questions/Ideas/Decisions/revalidation depth
GUIDANCE: REQUIRED_IF_PROMOTED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Frontend Slice Target
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <frontend-owner>
CONTENT: selected frontend state ownership; navigation/data-flow; architecture responsibilities; call-level plan
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```



Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

**REQUIRED only when Frontend is promoted to an independent Target** — selected frontend state/data-flow/navigation/architecture realization must have a canonical persistent Frontend Target owner.

**Otherwise** frontend planning stays inside the parent Slice artifact as a Part Plan.

**Evolution companion handoff** — this Target Module does not propose an evolution companion. When L5/WEUC finds material future-path pressure, it surfaces a Finding Candidate; Core Finding Disposition resolves any accepted local evolution meaning/owner. `AG-L5-02` may then propose an Evolution section, `<frontend-owner>.evolution.md`, or the parent Slice evolution companion as representation guidance. This Frontend Target may consume/reference the accepted/dispositioned local evolution meaning, while Documentation / Representation + P-14 / TF-10 choose embed vs split and prevent duplicate future plans.

Current Screen semantics remain in Screen owners; frontend artifacts reference rather than redefine them.

`P-14` must explicitly show whether frontend content stays embedded in the parent Slice or is promoted to a separate owner.

## Validators

```text
Screen remains spatial authority
Scenario/Behavior remains behavioral authority
DATA meaning is not replaced by DTO/component state
frontend state has one understandable source-of-truth story
placement remains reversible when semantics allow
shared frontend concerns are not copied into every target
frontend architecture is justified by current/change-path evidence
```

## Handoff

```text
integrated parent Slice / Authorized Realization
TM-TEST-DESIGN
Artifact/File Pack
apply `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` when material future-path pressure exists
→ Lens may surface a Finding Candidate / likely-owner hint
→ Core Finding Disposition resolves owner/lifecycle
→ independently substantial architecture work may become a Target Formation candidate
→ Target Formation decides reuse / handoff / new bounded local Target
```
