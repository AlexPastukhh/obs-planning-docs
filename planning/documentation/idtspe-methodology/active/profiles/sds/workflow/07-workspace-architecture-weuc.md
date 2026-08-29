
# Phase 07 — Workspace Evolution / WEUC / Architecture — Generic

Status: active optional orchestration phase

## Purpose

Coordinate two distinct mechanisms:

```text
TM-WEUC
  owns/updates the global Workspace Evolution Map

WEUC Lens / L5
  applies the current map to a concrete Target/Idea/Decision
```

This is still not a mandatory separate Architecture Target stage.

## Early Route — Build The Interpretation

When product evolution is understood enough but architecture is still early:

```text
SDS-EVOLUTION-MAP
+ Application Definition / Scenario direction
↓
TM-WEUC
↓
SDS-WORKSPACE-EVOLUTION.md
  mostly narrative interpretation is valid
↓
Domain / Slice / architecture planning consumes it through L5
```

## Later Route — Project Concrete Workspace Evolution

Once architecture/code owners exist:

```text
current SDS-WORKSPACE-EVOLUTION
+ current Workspace
+ local owner plans
↓
TM-WEUC refresh
↓
projected [NEW]/[EXTEND]/[REUSE] high-level paths
prepared extension points
transition triggers
local *.evolution.md refs
```

## Global Architecture Position Route

When the concern is not local to one Domain/Slice but is a project-global architecture posture:

```text
Target = whole Workspace architecture
↓
TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION
+ WEUC Lens / L5
↓
compare global architecture Ideas against:
  current Workspace
  current Global Architecture Position
  planned/probable evolution paths
  prepared extension points / transition triggers
↓
select/revalidate project-global decisions/defaults/conventions
↓
UPDATE SDS-WORKSPACE-EVOLUTION.md
  / Current Global Architecture Position
```

Typical topics include project-specific vertical-slice posture, Domain-modeling posture, folder/package organization, dependency direction, shared-vs-local ownership and adapter/integration conventions.

No mandatory `TM-ARCH` is introduced.

## Per-Target Lens Route

Inside Domain/Slice/Frontend/etc.:

```text
current Target
+ SDS-WORKSPACE-EVOLUTION
↓
L4 current dependency/change surface
↓
WEUC Lens / L5
  relevant future paths
  target evolution pressure/proposals
  change-isolation / leakage
  prepared extension-point reuse
  architecture fitness
  prepare-now vs defer
↓
L6 proof/diagnosis/operation observations when material
↓
Finding Candidate(s)
↓
Core Finding Disposition
├→ accepted local Answer-Decision input / Q/R/P / Evidence Need / evolution meaning when the current Target is resolved as owner
└→ `AG-L5-02` may propose a local evolution representation only over accepted local evolution meaning
   → Documentation / Representation + P-14 / TF-10 decide actual companion materialization
```

If L5 discovers that the global map is stale/incomplete:

```text
map/global-architecture update Finding Candidate + likely TM-WEUC owner hint
→ Core Finding Disposition
→ TM-WEUC refresh/revalidation when that owner/lifecycle is selected
```

## Reusable Lens Command

```text
проверь эволюцию и архитектуру <target>
→ LENS-WORKSPACE-EVOLUTION-ARCHITECTURE
```

For an ordinary Target, this is a Lens pass inside that Target. For `Target = whole Workspace architecture`, resolve the `TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION` scope so accepted global architecture content has one canonical owner.

## Cross-Cutting Rule

The WEUC Lens is not confined to Phase 07. It may activate inside Application Definition, Domain, Slice Strategy, Implementation Slice, Frontend, Cross-Cutting, Artifact/File decisions, Testing, Branch Comparison or Revalidation.

`TM-WEUC` runs when the canonical global Workspace Evolution Map needs creation/refinement/extension/reconciliation **or when the Current Global Architecture Position needs project-wide formation/revalidation**.

## Architecture Boundary

```text
architecture answer within current local Target
→ ordinary Answer Decision

local Decision may become project-global principle/default
→ global-architecture update Finding Candidate + likely TM-WEUC owner hint
→ Core Finding Disposition
→ TM-WEUC / Current Global Architecture Position update when selected

whole Workspace architecture review
→ TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION + L5

bounded architecture problem has independent useful output + material choice space
→ Target Formation candidate
→ Target Formation decides reuse existing Target / handoff existing owner / form new bounded architecture Target
```

There is no mandatory Architecture Target Module.
