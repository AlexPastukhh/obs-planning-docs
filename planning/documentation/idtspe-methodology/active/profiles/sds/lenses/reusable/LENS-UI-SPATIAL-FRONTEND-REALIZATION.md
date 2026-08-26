# LENS-UI-SPATIAL-FRONTEND-REALIZATION — Screen / UI / Frontend Realization

Lens ID: `LENS-UI-SPATIAL-FRONTEND-REALIZATION`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Evaluate spatial/UI/frontend realization while preserving Scenario/DATA/Behavior authority.

## Applicability Gate

Primary for Screen and Frontend; selected semantic/spatial sublenses may apply to Scenario/UI Slice.

## Target Inputs / Evidence

Scenario/Behavior, Scenario DATA, Screen Map/Drafts, must-hold conditions, Prototype/usability Evidence, current frontend and platform/design-system constraints.

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

## Findings / Outputs

placement, state ownership, navigation, synchronization, component responsibility, async/failure behavior, architecture pattern Ideas and Q/R/P.

## Typical Consumers

Screen, Frontend Slice, UI/full-stack Slice, Scenario handoff and Practical Evidence.

## Artifact / File Implications

`NONE_DIRECT / RETURN_TO_TARGET_OWNER`, except that future-evolution findings are handed to L5/WEUC when that perspective is active.

Selected Screen spatial meaning is represented through `TM-SCREEN`; selected frontend realization is represented through the parent Slice or promoted `TM-FRONTEND-SLICE` Target. This Lens owns UI/spatial/frontend evaluation, not a duplicate artifact contract. Material future frontend evolution is canonical L5/WEUC Lens guidance (`AG-L5-02`), which may later justify an Evolution section or promoted companion.

## Guards

Screen owns spatial meaning; Scenario/Behavior owns behavior; Scenario DATA owns information meaning; frontend realizes them.

## Composition

L4 structural impact; L5 recurring frontend evolution/architecture; L6 proof/diagnosis/operation; Quality/Risk for UX/accessibility/performance/etc.

## Escalation / Revalidation

Frontend Part Plan is default. Promote to `TM-FRONTEND-SLICE` only when independent planning depth becomes material.

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

The Lens can feed decisions about:

```text
state ownership
data flow/synchronization
navigation
async/failure handling
component/feature boundaries
server integration boundary
```

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
