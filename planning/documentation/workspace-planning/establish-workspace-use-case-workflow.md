# Establish Workspace Use Case Workflow

Status: active reusable Use-Case owner workflow
Main owner for `UC-PLAN-WORKSPACE-ESTABLISH-UC`.
Scope: determine whether a useful Workspace result needs a new UC and, when justified, establish one coherent target UC contract plus proportional semantic/realization planning.

Canonical planning principles: [`workspace-planning-principles-and-terminology.md`](workspace-planning-principles-and-terminology.md)
Canonical generic UC semantics: [`../principles-and-terminology.md`](../principles-and-terminology.md)
Recommended integrated shape: [`WORKSPACE-USE-CASE-PLANNING-TEMPLATE.md`](WORKSPACE-USE-CASE-PLANNING-TEMPLATE.md)

## 1. Current State / Need

Establish the useful Workspace result being sought. Read current relevant Use-Case registries and owners proportionally. Summarize current state at high level and link exact current owners rather than copying complete current bodies.

## 2. Step 1 — Target UC

1. Search current UCs for an existing capability that already owns the result.
2. If an existing UC covers it, do not create a duplicate; hand off to `UC-PLAN-WORKSPACE-CHANGE-UC`.
3. Otherwise apply the canonical independent-usefulness check.
4. Define one Target UC Contract: stable identity/status, purpose, trigger/input, result/end state, boundaries, topology/optionality, owner route, required supporting reads, related Scenario/command when real, dependencies/handoffs and open decisions when material.
5. Resolve semantic UC relations and check nearby UCs for overlap/redundancy.
6. Preserve any already-known Step-2/Step-3 meaning as Carry-Forward Context.

Do not create a UC merely for a file, workflow step, command, model/template or implementation module.

## 3. Step 2 — Target Domain / Rules

Review proportionally the concepts/rules/relationships needed to keep this UC correct:

```text
concept identity when real
state/lifecycle when real
relationships
invariants vs selected policy vs implementation mechanism
model/template/representation needs
semantic owner placement
verification meaning
```

Reuse current owners before creating new ones. A valid result is that no separate Model owner is justified and simple meaning remains in a workflow/principles/template owner.

## 4. Step 3 — Target Vertical Realization

When selected/grounded:

1. state the deliverable/checkable UC result;
2. trace the expected Workspace Change Path;
3. apply current Architecture Planning path/lens proportionally before fixing exact files;
4. select one coherent vertical Slice by default, or several increments only for real delivery/risk/dependency reasons;
5. identify local semantic owners, genuinely shared semantic owners and orchestration/routing/projection owners;
6. identify exact files to add/replace/delete/check and why each is required;
7. record materially checked but intentionally unchanged files;
8. state dependencies/handoffs and verification;
9. ensure implementation would not need to invent missing upstream semantic decisions.

## 5. Target Semantic State

For each changed/new semantic owner, provide complete planned target meaning. When the primary UC workflow is changing/new and review is sufficiently complete at the selected depth, include the complete planned future workflow body as it should semantically exist after implementation; do not substitute an approximate summary, TODO or implementation-time design gap.

Keep `Current`, `Target` and `Transition` distinct. The Transition Review states what changed, why and where current/target authority lives.

## 6. Cross-UC Review

If establishing this UC changes several existing UC boundaries/relations, route the integrated multi-UC question to `UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY` rather than hiding topology changes inside one local plan.

## 7. Exit

A sufficient plan at its selected depth has:

```text
Current State + owner links
Planned Change — High Level
Target UC contract
reviewed Step-2 meaning to selected depth
reviewed Step-3 realization/file surface when selected
Target semantic-owner meaning
Current → Target Transition
current Area Concern Register + active/residual Planning Concerns/Q/R/P + retained trace when material
```

This workflow is planning only; repository mutation follows a separately authorized route.

## Current Entry / Reuse / Dependency Rules

Start from Real-Life Basis + the candidate/current useful result. Reuse the existing UC when it already owns the Need/result. A separate UC is justified when its result is independently useful/reusable, not merely because a check repeats.

Only after the semantic owner is grounded may a material Planning Concern become active under the shared Concern model; group related Q/R/P by shared resolution surface, preserve residual state/retained trace, and do not invent user-owned preferences in AI Comment. Step 3 identifies Target Dependencies before selecting exact Linked Notes/file realization when material.
