# Review / Change Workspace Use Case Workflow

Status: active reusable Use-Case owner workflow
Main owner for `UC-PLAN-WORKSPACE-CHANGE-UC`.
Scope: integrate all currently selected change meaning for one existing Workspace UC into one coherent Target UC and proportional vertical realization plan.

Canonical planning principles: [`workspace-planning-principles-and-terminology.md`](workspace-planning-principles-and-terminology.md)
Canonical generic UC semantics: [`../principles-and-terminology.md`](../principles-and-terminology.md)
Recommended integrated shape: [`WORKSPACE-USE-CASE-PLANNING-TEMPLATE.md`](WORKSPACE-USE-CASE-PLANNING-TEMPLATE.md)

## 1. Current State

Resolve the current UC contract and all canonical/supporting owners. Summarize current state at high level and link those owners. Do not duplicate complete current file bodies merely to make the plan self-contained.

## 2. Related Ideas / Inputs

Gather every selected local Idea/input affecting this UC. Reference each cross-cutting Idea once and state only its UC-specific impact here.

Invariant:

```text
several Ideas affecting one UC
→ one integrated Target UC
```

State `Planned Change — High Level` before detailed Step review so the complete intended UC change is understandable without reading every local Idea/finding.

## 3. Step 1 — Target UC

Review:

```text
purpose
trigger/input
result/end state
behavior / useful capability
boundaries
identity continuity
relations / dependencies / handoffs
```

Confirm whether the same UC identity still holds. Possible conclusions include unchanged, change, split, merge, replace or retire; these outcomes do not automatically become separate peer UCs.

Preserve already-known later-layer meaning as Carry-Forward Context.

## 4. Step 2 — Target Domain / Rules

Integrate affected semantic meaning:

```text
concepts
state/lifecycle when real
relationships
rules
invariants
selected policies
models / templates / representations
owner responsibilities
verification meaning
```

Implementation convenience does not redefine unresolved UC/Domain meaning. Reuse current owners before adding new ones; create a separate Model owner only when independently justified.

Preserve already-known realization implications as Carry-Forward Context.

## 5. Step 3 — Target Vertical Realization

When selected/grounded:

1. state the end-to-end deliverable/checkable UC result;
2. trace the expected Workspace Change Path;
3. use current Architecture Planning path/lens proportionally;
4. choose the lowest-cost correct vertical Slice boundary rather than optimizing raw step/file count;
5. identify local semantic owners;
6. identify genuinely shared semantic owners and orchestration/routing/projection owners;
7. identify exact affected files and files materially checked but unchanged;
8. state dependencies and verification;
9. classify every planned cross-Slice owner/file overlap and challenge whether the shared coordination is necessary;
10. verify that the realization does not require downstream implementation to invent missing semantic decisions.

One coherent UC change normally strives for one coherent vertical Slice, but several independently checkable Slices are allowed for real delivery/risk/dependency reasons.

## 6. Target Semantic State

For every new/changed owner, provide complete planned target meaning. For the primary future workflow/UC owner, use a full planned future semantic body when review is sufficiently complete, not merely a note saying to update it later.

Unchanged owners remain linked rather than copied.

## 7. Transition Review

Keep a separate Current → Target projection:

```text
responsibility
current meaning + current owner
planned target meaning + target owner
why the transition is required
file action when Step 3 is selected
```

## 8. Cross-UC Review

When several UC boundaries/relations are materially affected, use `UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY` for the integrated graph question. After local plans exist, review combined architecture/Slice overlap rather than assuming locally best realizations compose into the best whole.

## 9. Exit

Return the selected planning depth plus the current Area Concern Register and only material active/residual Planning Concerns/Q/R/P relative to the Current Plan, with retained trace when useful. Planning is read-only unless a separate mutation/package route is explicitly invoked.

## Current Entry / Reuse / Dependency Rules

Start from Real-Life Basis + the candidate/current useful result. Reuse the existing UC when it already owns the Need/result. A separate UC is justified when its result is independently useful/reusable, not merely because a check repeats.

Only after the semantic owner is grounded may a material Planning Concern become active under the shared Concern model; group related Q/R/P by shared resolution surface, preserve residual state/retained trace, and do not invent user-owned preferences in AI Comment. Step 3 identifies Target Dependencies before selecting exact Linked Notes/file realization when material.
