# Progressive Plan Refinement Workflow

Status: active supporting workflow for IDTSPE-directed current-plan refinement
Methodology authority: [`idtspe-methodology/active/idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md`](idtspe-methodology/active/idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md) + [`idtspe-methodology/active/idtspe-core/IDTSPE-SHELL.md`](idtspe-methodology/active/idtspe-core/IDTSPE-SHELL.md)
This file is not a repository-level Use-Case owner.
Shared Concern semantics: [`planning-concerns-and-decisions-model.md`](planning-concerns-and-decisions-model.md)

## Purpose

Integrate clarification/review/change into one accumulating Current Plan without turning Q/R/P or chat-control metadata into the planning root.

## Primary Traversal

```text
Real-Life Need / situation / desired result
→ selected solution / responsibility
→ UC / Scenario
→ Current → Target
→ Domain / Rules
→ Target Dependencies when material
→ realization / verification when useful
```

Real-Life Basis may be `known | partial | unknown`; do not invent a formal Need/RLUC merely to fill a field.

## Review Lenses

- Real-Life;
- UC / Scenario;
- Planning Concerns / Q/R/P (owner-attached active/residual state plus retained trace when material);
- Concern Group (shared resolution surface when several Q/R/P are causally coupled);
- Review Order (derived priority/dependency/blast-radius ordering of attached concerns);
- Realization / Evolution.

Ordinary chat text controls current scope/depth/lens/redirection. No persistent Focus/H0-H1-H2 ontology is required.

## Concern Admission

```text
candidate concern
→ concrete affected semantic owner?
→ concrete Current/Target planned meaning?
→ material Question/Risk/Problem after cheap check?
```

If no: integrate the obvious consequence, or keep as Idea/observation/evidence/context rather than an active concern.

If several admitted concerns substantially share one answer/evidence/decision surface, group them rather than creating independent pseudo-problems.

## AI Comment / User-Owned Boundary

When the refinement result keeps a material concern/group, include a useful AI Comment proportionally. It may expose implications/options and a technical/logical recommendation when justified, but must name user-owned unknowns rather than inventing unrecorded Need/preferences/feelings/business priority/risk tolerance.

`Recommendation` is optional. `Decision` is recorded only when actually selected.

## Related / Affected Units

Default to enough current-state/impact review to trust the current decision. Deepen only when explicitly requested, current correctness depends on it, or bounded feasibility evidence is needed.

## Accepted-Decision Recheck

```text
integrate selected meaning into real semantic owner
→ record generic Decision trace only when material
→ update Addresses Concerns / Introduced-Exposed Concerns when useful
→ check known immediate upstream/downstream units actually affected
→ update Review Currency only where material
→ update active/residual concern lifecycle with valid closure basis
→ preserve only material retained answer/rationale/decision trace
→ update Area Concern Register routing/status when material
→ recompute Review Order only if its basis changed
```

No broad automatic rediscovery by default.

## Physical Storage

This workflow does not require a universal Q/R/P file. Use the current profile/workflow/command physical shape:

```text
small/mini area
→ inline Concern Register + detailed concern bodies may live in the same owner file

larger/modular/full area
→ register may live at area root while detailed concerns remain next to Scenario/Domain/Slice/Workspace owners
```

One logical Concern/Group has one primary detailed storage location; Ideas/other owners reference it instead of mirroring full bodies.

## Exit

Return current owner(s), selected meaning, truthful reviewed/partial/unchecked state, current Area Concern Register/active-residual Q/R/P/retained trace when material, and next semantic planning unit/realization handoff.
