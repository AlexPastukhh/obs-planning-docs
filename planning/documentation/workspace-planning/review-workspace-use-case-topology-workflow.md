# Review Workspace Use-Case Topology Workflow

Status: active proportional reusable Use-Case owner workflow
Main owner for `UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY`.
Scope: review several Workspace UCs together when coherent boundaries/relations/topology are the independently useful result.

Canonical planning principles: [`workspace-planning-principles-and-terminology.md`](workspace-planning-principles-and-terminology.md)
Canonical generic UC semantics: [`../direction-and-use-case-registry-workflow.md`](../direction-and-use-case-registry-workflow.md)
Recommended integrated shape: [`WORKSPACE-USE-CASE-PLANNING-TEMPLATE.md`](WORKSPACE-USE-CASE-PLANNING-TEMPLATE.md)

## 1. Resolve The Multi-UC Concern

Read every affected current UC and its owners. Identify the common cross-cutting concern, overlap, split/merge/extraction pressure or changed relationship that makes multi-UC review independently useful.

Keep a cross-cutting Idea as one Idea; affected UCs reference it and state only local impact.

## 2. Step 1 — UC Boundaries / Graph

Compare useful results and boundaries. Test proportionally:

```text
keep current boundaries
split one UC
merge UCs
extract a genuinely shared capability
change relationships / handoffs
retire/replace an obsolete capability
```

Use semantic graph relations only when real, such as `uses`, `depends on`, `includes when applicable`, `hands off to`, `reviews` and `produces input for`. Do not force a parent/child tree when a graph is more accurate. File dependency is not automatically a UC relationship.

Produce one local Target UC projection for every affected UC.

## 3. Step 2 — Shared / Local Domain Meaning

Review whether apparently shared meaning is genuinely one canonical rule/model responsibility or only duplicated/similar local meaning. Check that orchestration owners have not accidentally become semantic owners for capability-local rules.

Keep shared semantic ownership only when consumers genuinely must remain canonical together for the same semantic reason.

## 4. Step 3 — Local Realizations Then Combined Review

Plan Step 3 inside each affected UC using its Establish/Change workflow. Then compare the resulting planned Slice surfaces.

For every overlapping owner/file classify:

```text
orchestration / routing / projection
shared Domain
capability-local semantic
generated / mechanical
historical / logging
other
```

Ask why each shared owner exists and whether its cross-capability payoff justifies coordination cost. Capability-local overlap is a reason to recheck UC/owner boundaries. Shared Domain overlap may justify one explicit shared semantic change/Slice only when the shared meaning is real. Generated overlap may suggest derivation/automation.

## 5. Combined Architecture Review

Use the current generic Architecture Lens proportionally on the combined expected Workspace paths. Do not assume the best local realization for each UC is automatically the least-complex coherent architecture for all affected UCs together.

## 6. Output

Return:

```text
Current Plan Snapshot
Current-Plan-relative Q/R/P
compact cross-cutting Ideas when present
one full block per affected UC
Resolved UC Graph
cross-UC / cross-Slice architecture findings
Current Overall Conclusions
unselected Potential Simplifications only
```

This workflow is planning/review only and grants no repository mutation permission.

## Reuse-First Topology Boundary

Topology review is selected because the multi-UC boundary/relationship result is independently useful. It must not become a way to manufacture UCs or FINDs.

When extraction/reuse pressure appears, ask whether the candidate supporting capability has an independently useful result, distinct trigger/result and meaningful consumers, and whether an existing owner already covers it. `Review Order` may order attached unresolved topology deltas but never replaces the UC graph.
