# SDS Global Planning State Layout

Status: active Artifact Guidance
Scope: one project/application SDS planning workspace

Global planning-state layout only. Whole-workspace physical representation is adaptive; see the coordinator [`../SDS-PHYSICAL-PLANNING-TREE.md`](../SDS-PHYSICAL-PLANNING-TREE.md) and the annotated materialization tree [`../ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md).

## Default Physical Layout

```text
SDS-PLANNING-STATE/
├── README.md
├── SDS-EVOLUTION-MAP.md
├── SDS-WORKSPACE-EVOLUTION.md
└── ideas/
    ├── INBOX.md
    ├── early/
    │   └── IDEAS.md
    ├── scenario/
    │   └── IDEAS.md
    ├── domain/
    │   └── IDEAS.md
    └── realization/
        └── IDEAS.md
```

`ideas/`, `SDS-EVOLUTION-MAP.md` and `SDS-WORKSPACE-EVOLUTION.md` are siblings under one global planning-state owner.

## ideas/INBOX.md

Fast unstructured capture when the layer/owner is not yet clear.

An Inbox item stays `UNROUTED` until routing matters.

## ideas/early/IDEAS.md

For loose ideas from:

```text
Solution planning
Application Definition
market/reference research
Prototype
```

## ideas/scenario/IDEAS.md

For:

```text
Scenario Planning
preliminary Screen/window ideas
Scenario DATA / Behavior ideas
local Requirement ideas
secondary/future Scenario ideas
```

## ideas/domain/IDEAS.md

For:

```text
Domain candidates not selected
alternative Domain boundaries
future invariants/policies
Aggregate / Value Object ideas
```

## ideas/realization/IDEAS.md

For:

```text
WEUC / Architecture
Slice Strategy / Implementation Slice
Frontend / Cross-Cutting
Testing
implementation patterns
future technical mechanisms
```

## Evolution Map

`SDS-EVOLUTION-MAP.md` is not an Idea Register.

Promote only when the future development itself is worth tracking:

```text
loose Idea
→ evidence / accepted future intent
→ Evolution Item
```

## Workspace Evolution Interpretation

`SDS-WORKSPACE-EVOLUTION.md` is the canonical project-global owner for both (a) the current architecture position that independent Targets need to share and (b) the future Workspace-change interpretation of the main Evolution Map.

```text
SDS-EVOLUTION-MAP
= what/when is planned or credibly expected

SDS-WORKSPACE-EVOLUTION / Current Global Architecture Position
= current project-global architecture decisions/defaults/conventions

SDS-WORKSPACE-EVOLUTION / future sections
= what accepted/plausible evolution means for Workspace change paths,
  isolation, prepared extension points and future architecture transitions
```

It is owned/updated through `TM-WEUC` and consumed by the WEUC Lens. The current architecture subsection is project-global architecture guidance; future paths remain planning projections.

It may start as free-form interpretation and later contain literal `[NEW]/[EXTEND]/[REUSE]` paths.

Optional local `<owner>.evolution.md` companions hold detailed future paths for Domain/Slice/Frontend/etc. and are referenced from the global map.

## Small Workspace

A very small project may use:

```text
SDS-PLANNING-STATE/
├── SDS-EVOLUTION-MAP.md
├── SDS-WORKSPACE-EVOLUTION.md
└── ideas/
    └── IDEAS.md
```

with sections `INBOX / EARLY / SCENARIO / DOMAIN / REALIZATION`.

The invariant is one global Ideas location plus the product Evolution Map and its Workspace Evolution interpretation next to it. A tiny workspace may collapse the Workspace Evolution interpretation into an explicit section of `SDS-EVOLUTION-MAP.md`, but the semantic roles remain distinct.
