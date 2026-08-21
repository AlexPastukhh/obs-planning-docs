# Workspace Planning Use-Case Registry

Status: active reusable-family semantic registry
Parent Direction Registry: [`direction-registry.md`](direction-registry.md)

## `UC-PLAN-WORKSPACE-ESTABLISH-UC` — Establish Workspace Use Case

**Status:** active
**Parent Direction:** `DIR-PLAN-WORKSPACE`
**Purpose:** determine whether a useful Workspace result needs a new Use Case and, when justified, establish one coherent target UC contract and owner route.
**Trigger / accepted input:** a Need, Idea, Extension or observed Workspace result is not clearly owned by a current Workspace Use Case.
**Result / end state:** either an existing UC is confirmed as the correct owner and work hands off to `UC-PLAN-WORKSPACE-CHANGE-UC`, or one justified new Target UC contract + graph placement is established, with Step-2 semantic meaning and Step-3 vertical realization/file surface included only when those depths are selected and reviewed.
**Boundaries:** files, workflow steps, commands, models/templates or implementation modules do not become UCs merely because they are addressable; this UC does not itself mutate repository state.
**Topology / optionality:** independently activatable; Step 1/2/3 are proportional depths inside this UC plan.
**Owner route:** [`establish-workspace-use-case-workflow.md`](establish-workspace-use-case-workflow.md) + [`workspace-planning-principles-and-terminology.md`](workspace-planning-principles-and-terminology.md)
**Required supporting reads:** [`../direction-and-use-case-registry-workflow.md`](../direction-and-use-case-registry-workflow.md); Architecture Planning only when Step 3 exposes material path/architecture pressure.
**Related command:** none required; `собери идеи` may route here when selected Ideas reveal a candidate new Workspace capability.
**Dependencies / handoffs:** may hand off to `UC-PLAN-WORKSPACE-CHANGE-UC` when current coverage exists and to `UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY` when several UC boundaries/relations require integrated review.

## `UC-PLAN-WORKSPACE-CHANGE-UC` — Review / Change Workspace Use Case

**Status:** active
**Parent Direction:** `DIR-PLAN-WORKSPACE`
**Purpose:** integrate all currently selected change meaning for one existing Workspace UC into one coherent Target UC and realization plan.
**Trigger / accepted input:** Ideas, requirements, evidence, corrections or change pressure materially affect a current Workspace Use Case.
**Result / end state:** the current UC is intentionally unchanged, or one integrated Target UC plan is established to the selected planning depth: Target UC meaning at Step 1, plus Step-2 semantic rules and Step-3 vertical realization/file surface only when those depths are selected and reviewed.
**Boundaries:** several Ideas affecting one UC do not become several competing UC plans; implementation mechanisms do not redefine unresolved UC/Domain meaning; no repository mutation permission is implied.
**Topology / optionality:** independently activatable; Step 1/2/3 are proportional depths inside this UC plan.
**Owner route:** [`review-change-workspace-use-case-workflow.md`](review-change-workspace-use-case-workflow.md) + [`workspace-planning-principles-and-terminology.md`](workspace-planning-principles-and-terminology.md)
**Required supporting reads:** current UC registry/workflow/semantic owners; Architecture Planning proportionally for Step 3.
**Related command:** none required; `собери идеи` may route here for affected existing Workspace UCs.
**Dependencies / handoffs:** use `UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY` when the independently useful result is coherent boundaries/relations across several UCs.

## `UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY` — Review Workspace Use-Case Topology

**Status:** active proportional
**Parent Direction:** `DIR-PLAN-WORKSPACE`
**Purpose:** produce a coherent graph/boundary model when several Workspace Use Cases must be reviewed together.
**Trigger / accepted input:** overlap, split/merge/extraction pressure, changed dependencies/handoffs, or a cross-cutting Idea that creates a material boundary/relationship question affects several UCs and makes coherent topology review independently useful.
**Result / end state:** coherent selected UC boundaries + semantic relationships + one local Target UC projection for every affected UC, with Step-2/Step-3 meaning and cross-UC/cross-Slice architecture findings included only to the selected/reviewed depth.
**Boundaries:** topology is a graph when that is more accurate than a tree; a cross-cutting Idea is not itself a UC relationship; file dependency is not automatically UC dependency.
**Topology / optionality:** activate only when the multi-UC topology result is independently useful; ordinary one-UC changes remain in the single-UC workflows.
**Owner route:** [`review-workspace-use-case-topology-workflow.md`](review-workspace-use-case-topology-workflow.md) + [`workspace-planning-principles-and-terminology.md`](workspace-planning-principles-and-terminology.md)
**Required supporting reads:** affected UC registries/owners; Architecture Planning proportionally when combined realization changes architecture.
**Related command:** none required; `собери идеи` may route here when one reviewed source raises an independently useful multi-UC boundary/relationship/topology question, not merely because one Idea affects several otherwise independent UCs.
**Dependencies / handoffs:** resulting local UC plans use the Establish/Change workflows as applicable; unresolved architecture decisions route to sibling Architecture Planning rather than being hidden in file planning.
