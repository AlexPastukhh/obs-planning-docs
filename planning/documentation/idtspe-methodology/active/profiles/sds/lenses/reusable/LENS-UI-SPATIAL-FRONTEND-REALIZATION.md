# LENS-UI-SPATIAL-FRONTEND-REALIZATION — Screen / UI / Frontend Realization

Lens ID: `LENS-UI-SPATIAL-FRONTEND-REALIZATION`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Evaluate spatial/UI/frontend realization while preserving Scenario/DATA/Behavior authority.

## Applicability Gate

Primary for Screen and Frontend; selected semantic/spatial sublenses may apply to Scenario/UI Slice.

## Target Inputs / Evidence

Scenario/Behavior, Scenario DATA, Screen Map/Drafts, must-hold conditions, Prototype/usability Evidence, current frontend and platform/design-system constraints.



## Analysis Surface

### Primary Result Units / Semantic Selectors

- `TM-SCREEN`: `RU-SCREEN-01..RU-SCREEN-02`
- `TM-FRONTEND-SLICE`: `RU-FE-01..RU-FE-05`

### Conditional Result Units / Semantic Selectors

- UI-heavy `TM-IMPLEMENTATION-SLICE`: `RU-SLICE-01`, `RU-SLICE-03`, `RU-SLICE-04`

### Relevant State Units

```text
Questions
Ideas / Planning Branches when comparison is material
Q/R/P
Decisions
Evidence / Evidence Needs
Revalidation state
```

### Context

- Scenario behavior/DATA
- selected Screen meaning
- shared frontend concerns
- current frontend implementation/workspace

Context availability does not mean this Lens audits all context. The deliberate focus remains the Result/State meaning named above.

## Supported Operations

```text
ANALYZE
CHECK
REFINE
CHALLENGE
```

- `ANALYZE` inspects the Analysis Surface through this Lens perspective.
- `CHECK` evaluates current meaning against this Lens's criteria/guards.
- `REFINE` surfaces a proposal for more precise/missing meaning where the semantic destination is already understood.
- `CHALLENGE` surfaces reasons selected/accepted meaning may be weak, stale, unsupported or wrong.

`REOPEN`, State-Unit creation/refinement, cross-owner handoff and Result Unit update after resolution are Core Finding-Disposition/lifecycle consequences, not Lens methods.

## Scenario-To-Screen Realization

Map Behavior/DATA to Screens without making placement part of Behavior identity.

## Spatial / Visibility Sufficiency

Check zones/hierarchy/visibility/availability/state needed to understand/complete selected Scenarios.

## Reversible Placement

Behavior/DATA identity should normally survive movement to another Screen/window.

## Frontend State Ownership

Classify URL/navigation, local ephemeral UI, shared client, server/cache, derived and persisted application/domain state. Prevent competing truth owners.

## Data Flow / Synchronization

Trace read/input/update/invalidation/optimistic/reconciliation paths.

## Navigation / Window Topology

Check entry/re-entry, routes/windows/modals, back/cancel/recovery and deep-link semantics when material.

## Async / Failure State

Check pending/loading/empty/error/retry/offline UI behavior against Scenario/must-hold truth.

## Component / Composition Boundary

Prefer cohesive responsibility/change-path boundaries rather than arbitrary component count.

## Design System / Accessibility

Apply shared visual/accessibility requirements without letting implementation own Screen semantics.

## Frontend Architecture Pattern Aids — Ideas, Not Presets

Evidence from Enman/current practice may seed Ideas such as:

```text
feature-oriented organization
feature-local api/model/ui
read/query vs command/mutation separation
typed request/response contracts
repository/gateway-like server integration boundary
shared transport helper
```

Select/reject them through Scope + L4/L5/L6 + normal Decisions. They are not mandatory Enman conventions.

## Frontend Change Paths

Examples for L4/L5: moving behavior, changing DATA presentation/navigation/validation/async state, reusing capability, changing server contract, diagnosing stale UI.

## Typical Findings

placement, state ownership, navigation, synchronization, component responsibility, async/failure behavior, architecture pattern Ideas and Q/R/P.



## Finding Contract

The items above are `Finding Candidates`, not Lens-owned State Unit kinds or direct Result mutations.

A material finding may expose proportionally:

```text
Meaning
Affected Unit(s) / fields — when known
Evidence / rationale
Materiality hint — optional
Likely semantic owner — optional hint
Suggested lifecycle consequence — optional hint
```

Core [`Finding Disposition`](../../../../idtspe-core/shared/finding-disposition-contract.md) resolves the actual State/lifecycle/owner destination. Normal authority/resolution must occur before accepted Result Unit meaning changes.

This Lens does not define new Result Units or target-result fields. If repeated findings reveal missing target-result meaning, revise the appropriate Target Module/Local Target Contract or let Core disposition the finding to another owner.

## Typical Consumers

Screen, Frontend Slice, UI/full-stack Slice, Scenario handoff and Practical Evidence.

## Artifact / File Implications

`NONE_DIRECT / NO_DISTINCT_SUPPORTING_ARTIFACT`. Core Finding Disposition may resolve current UI/frontend meaning back to the current Target. A material future-evolution Finding Candidate may call for WEUC/L5 evaluation; only suspected project-global meaning may carry `TM-WEUC` as a likely-owner hint, and Core resolves the actual owner/handoff.

Selected Screen spatial meaning is represented through `TM-SCREEN`; selected frontend realization is represented through the parent Slice or promoted `TM-FRONTEND-SLICE` Target. This Lens owns UI/spatial/frontend evaluation, not a duplicate artifact contract. Material future frontend evolution first surfaces through WEUC/L5 as a Finding Candidate; after Core Finding Disposition accepts/resolves local evolution meaning, `AG-L5-02` may propose an Evolution section or promoted companion representation, and Documentation / Representation + P-14 / TF-10 decide materialization.

## Guards

Screen owns spatial meaning; Scenario/Behavior owns behavior; Scenario DATA owns information meaning; frontend realizes them.

## Composition

L4 structural impact; L5 recurring frontend evolution/architecture; L6 proof/diagnosis/operation; Quality/Risk for UX/accessibility/performance/etc.

## Escalation / Revalidation

Frontend Part Plan is default. When independent planning depth becomes material, surface a Target Formation candidate for a possible `TM-FRONTEND-SLICE`; Target Formation decides whether promotion/new Target is warranted.

## High-Level Example — Self-Contained Walkthrough

### Situation

Scenario says:

```text
user can capture selected material
```

Screen planning places capture on a reading overlay.

Frontend implementation still must decide how state/data/server interaction should work.

### Why This Lens

The UI/Frontend Lens keeps three authorities separate:

```text
Scenario:
  behavior meaning

Screen:
  spatial/window meaning

Frontend:
  realization/state/data-flow mechanism
```

### Walkthrough

Frontend architecture Ideas:

```text
A:
  component calls server directly

B:
  feature-local command/query + gateway

C:
  one generic global API repository
```

Compare real change paths:

```text
change server response contract
move capture to another Screen
reuse capture capability
add offline/pending behavior
```

State ownership questions:

```text
what belongs in local UI state?
what belongs in shared client state?
what remains server truth?
what is derived?
```

### Result

The Lens surfaces Finding Candidates about:

```text
state ownership
data flow/synchronization
navigation
async/failure handling
component/feature boundaries
server integration boundary
```

Core Finding Disposition decides whether accepted meaning becomes/refines local Idea/Q/R/P/Answer-Decision input or belongs to another owner.

### Boundary / Lesson

Moving capture to another Screen should not change Scenario behavior identity.

Enman-like feature/API/gateway patterns are options, not required architecture.

## Knowledge Basis

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- UI spatial/window/component choices realize selected Scenario behavior and DATA; they do not redefine it.
- State/data-flow/navigation boundaries should remain understandable, reversible and aligned with the parent useful result.

**Referenced Knowledge Owners:**

- `NONE`

**Reference Load Policy:**

No external knowledge body is required for normal use.

**Operationalization Notes:**

Design-system/platform facts are Target Inputs; this Lens owns the reusable UI/spatial/frontend realization perspective.

## Provenance

Pre-Lens Screen/Frontend lenses + source-grounded Enman feature/API boundary evidence as non-binding patterns.
