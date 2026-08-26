# LENS-UI-SPATIAL-FRONTEND-REALIZATION — Screen / UI / Frontend Realization

Lens ID: `LENS-UI-SPATIAL-FRONTEND-REALIZATION`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Evaluate spatial/UI/frontend realization while preserving Scenario/DATA/Behavior authority.

## Applicability Gate

Primary for Screen and Frontend; selected semantic/spatial sublenses may apply to Scenario/UI Slice.

## Typical Sources / Evidence

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

### Structured Artifact / File Guidance

These records describe conditional placement guidance produced by this Lens. They never create semantic ownership by themselves.

```text
ARTIFACT_GUIDANCE
ID: AG-UI-01
CONTENT_KIND: SCREEN_SPATIAL_MEANING
WHEN: spatial/window placement is selected
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Screen Target
REPRESENTATION: EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <screen-map-owner> or <screen-draft-owner>
CONTENT: Screen Map/spatial/visibility/navigation meaning
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_GUIDANCE
ID: AG-UI-02
CONTENT_KIND: FRONTEND_REALIZATION
WHEN: frontend realization remains part of current Slice
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: parent Slice Target
REPRESENTATION: EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <slice-owner>
CONTENT: frontend state/data-flow/navigation/server-integration realization
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_GUIDANCE
ID: AG-UI-03
CONTENT_KIND: FRONTEND_EVOLUTION
WHEN: material future frontend change/prepared seam should persist
GUIDANCE: ADVISORY_PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: frontend or parent Slice base owner remains current truth
REPRESENTATION: COMPANION_ARTIFACT
FILE_OR_ARTIFACT: <frontend-owner>.evolution.md or <slice-owner>.evolution.md
CONTENT: future frontend evolution path
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

Screen spatial meaning persists in Screen owners; frontend realization persists in parent Slice or promoted Frontend Target owner.

**PREFERRED evolution companion** for material future frontend change paths/prepared seams, normally colocated with the owning Slice/Frontend artifact.

Do not duplicate Scenario behavior/DATA definitions in UI/frontend artifacts as equal authority.

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

## Provenance

Pre-Lens Screen/Frontend lenses + source-grounded Enman feature/API boundary evidence as non-binding patterns.
