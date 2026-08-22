# Scenario / Domain / Slice (SDS) Planning Profiles

Status: active reusable profile family
Scope: proportional representations of the same directed Application planning semantics for bounded changes through full detailed planning.

Canonical Application owners remain under `../application-planning/`. This profile family changes representation/physical modularity, not Scenario/Domain/Slice semantic authority.

## Core Pattern

```text
Scenario
→ Domain / Rules when useful
→ Slice Strategy / Slices
```

Planning dependency direction is upstream→downstream. A later stage consumes selected upstream meaning. It may expose a genuine contradiction or newly available evidence, but implementation convenience does not normally redesign upstream behavior.

## Mini SDS

Use Mini SDS when the current plan remains reviewable as one compact planning surface.

A proportional shape may include:

```text
Desired Result / selected context
Shared Ideas when material
Planning State (Scenario / Domain / Slice: reviewed / partial / not selected)
Scenarios
Domain / Rules when material
Slice Strategy / Slices
Execution Order
Questions / Risks / Problems
```

The sections still route to the normal Scenario/Domain/Slice meanings. One physical file does not create a new monolithic semantic owner.

Repeated `собери идеи` may update this same current plan: selected new meaning replaces/extends the current representation rather than accumulating an append-only transcript.

Keep a compact **Planning State** projection for the three SDS depths so later work can distinguish reviewed upstream meaning from partial/not-selected downstream planning. This state does not replace the canonical Scenario/Domain/Slice owners or their own draft/review state.

## Modular SDS

Use Modular SDS when independent review/change cadence, shared meaning, Variants or Working-Context Load makes the compact surface hard to review.

One possible physical shape is:

```text
planning/
├── execution-order.md
├── shared-ideas/
├── scenarios/
├── domain/
├── slice-strategy.md
└── slices/
```

This is illustrative, not a mandatory directory schema. Shared Ideas are defined once and referenced with local impact from affected Scenarios/Slices. A root/index surface should retain the compact Planning State projection when useful. `execution-order.md` is a current delivery projection, not behavior/domain authority and does not replace Planning State.

Mini→Modular is structural growth only. A project may begin Modular immediately when that is clearer.

## Full SDS

Full SDS is the existing rich detailed documentation route in [`scenario-domain-slice-docs-profile.md`](scenario-domain-slice-docs-profile.md) together with the canonical detailed-planning owners under `../application-planning/detailed-planning/`.

It adds proportional Scenario workspaces, DATA/Behavior Items, Requirements, Screens, optional Domain/Slice workspaces, Variants, visual material and verification surfaces. It does not change the core Scenario→Domain→Slice dependency direction.

## Execution Order And Versions

Execution order is distinct from planning dependency direction.

```text
Scenario → Domain → Slice
= semantic dependency direction

SL-1 → {SL-2 || SL-3} → SL-4
= selected execution order
```

Execution order may be partial. Show parallel groups when sequence is not meaningful; state real dependencies when it is.

Application delivery may group selected Slices by version/release:

```text
Version 1
  SL-1
  SL-2 || SL-3

Version 2
  SL-4
```

A Version is delivery grouping, not another semantic planning layer.

## Post-Planning Realization Feedback

After enough Scenario/Domain/Slice meaning is selected, actual implementation is downstream:

```text
selected Slice/change
→ implementation attempt
→ ordinary local adaptation if semantics stay unchanged
→ explicit upstream finding only for genuine new evidence / contradiction / infeasibility
→ rebuild affected downstream meaning when an upstream correction is selected
→ semantic ReviewDiff of the actual uncommitted transition
```

This feedback loop normally repeats per implemented Slice/change. Frequent upstream backflow is a planning-quality signal: review the earlier completion contract, stage order or responsibility boundaries.

## Goal Map Boundary

The reusable Goal Map is retired. Its useful current-plan function is covered by the current Mini/Modular/Full SDS representation plus the selected Execution Order projection. Historical rationale remains in Git / registered scope Action Logs, not in the current plan.

## Current Planning Lenses

Mini/Modular/Full are representation scales, not different semantic correctness levels. Across profiles, use the same lenses over one current plan:

```text
Real-Life
UC / Scenario
Q/R/P (attached unresolved delta only)
Review Order (derived ordering lens)
Realization / Evolution
```

Application Scenario remains the behavioral planning owner. Workspace/methodology Use Case remains the useful-capability owner. Promote selected local meaning into its real canonical owner; do not keep a parallel plan merely because Modular splits files.
