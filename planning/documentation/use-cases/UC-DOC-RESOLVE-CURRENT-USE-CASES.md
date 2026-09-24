# UC-DOC-RESOLVE-CURRENT-USE-CASES — Resolve Current Methodology Use Cases

Status: active fundamental methodology-guidance Use Case

Responsibility ID: `DOC.USE-CASE-APPLICABILITY-RESOLUTION`

## Situation

Any current Planning/repository work is starting or continuing, through an explicit Planning Command or ordinary natural-language work, and the current situation requires reaffirming which methodology-use capabilities are applicable now.

This Use Case is **always logically active for every current Planning/repository work entry**. Every Planning Command composes it explicitly/transitively; ordinary natural-language work applies the same ambient registry-level recheck through routing. That does not mean every registry or Use-Case body is reread or executed on every turn.

## Ownership Boundary

This Use Case owns the reusable **applicability-resolution Process** that produces the current applicable Use-Case composition. The [`Methodology Use-Case Registry Map`](../use-case-registry-map.md) owns cross-scope routing metadata; each scoped registry owns its compact rows; selected Use Cases own their own Results/Processes; command/Helper tooling owns concrete command-composition syntax.

The fundamental [`UC-IDTSPE-AI-WORKING-BOUNDARY`](../idtspe-methodology/active/idtspe-core/use-cases/ai-working-boundary/UC-IDTSPE-AI-WORKING-BOUNDARY.md#uc-idtspe-ai-working-boundary) is the mandatory authority-boundary companion for this resolver. It is reaffirmed on every current work entry before narrower functional work proceeds; it does not become a second registry-selection process.

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`AI Working Authority Boundary`](../idtspe-methodology/active/idtspe-core/use-cases/ai-working-boundary/UC-IDTSPE-AI-WORKING-BOUNDARY.md#uc-idtspe-ai-working-boundary) — `IDTSPE.UC.AI-WORKING-BOUNDARY`
> - `CONTEXTUALIZES` [`Use-Case Applicability Scan`](../principles-and-terminology.md#doc-use-case-applicability-scan) — `DOC.USE-CASE-APPLICABILITY-SCAN`
> - `CONTEXTUALIZES` [`Registry Scan`](../principles-and-terminology.md#doc-registry-scan) — `DOC.REGISTRY-SCAN`
> - `CONTEXTUALIZES` [`Functional Routing Ownership Chain`](../principles-and-terminology.md#doc-functional-routing-ownership) — `DOC.FUNCTIONAL-ROUTING-OWNERSHIP`

## Result

The fundamental AI working authority boundary is current and the current applicable Use-Case composition is known: still-applicable current Use Cases are retained, newly applicable Use Cases are added, no-longer-applicable assumptions are released, and only owner detail needed for the next material action is loaded.

<a id="doc-use-case-applicability-process"></a>
## Process

1. Start from the current USER request, current material work state, active methodology/profile scope and any still-trustworthy applicability result.
2. Reaffirm [`UC-IDTSPE-AI-WORKING-BOUNDARY`](../idtspe-methodology/active/idtspe-core/use-cases/ai-working-boundary/UC-IDTSPE-AI-WORKING-BOUNDARY.md#uc-idtspe-ai-working-boundary). Reuse trustworthy current authority/interaction context, but do not skip the boundary merely because no special command or Proposal workflow was requested.
3. Consult the [`Methodology Use-Case Registry Map`](../use-case-registry-map.md) for plausible scopes, then scan only plausibly applicable scoped registries using their compact `Situation` / `Result` routing summaries.
4. Retain already-active Use Cases whose Situation/Result remain valid; add newly applicable Use Cases; stop relying on Use Cases whose applicability no longer holds. The fundamental AI Working Boundary remains active independently of whether additional specialized rows are selected.
5. Open only newly selected or insufficiently-known Use-Case owners. Reuse already-known Process/registry metadata while authority/content remains trustworthy.
6. Return the current Use-Case composition and reaffirmed AI working boundary to the active work. This Use Case **selects/composes Use Cases; it does not execute their specialized Result work**.
7. For every current Planning/repository work entry, perform this compact fundamental pass even when registry metadata can be reused. Every Planning Command guarantees the pass through command composition; ordinary natural-language work reaches the same ambient resolver through normal routing. Also re-evaluate after material context, owner, profile, Finding/Evidence/Decision, revalidation, authority/permission or scope changes. Mechanical substeps inside one already-composed command/pass do not require ceremonial rescanning unless they materially change applicability or authority.

## Fundamental Composition Rule

Every current Planning/repository work entry MUST pass through this ambient applicability resolver and its mandatory `UC-IDTSPE-AI-WORKING-BOUNDARY` companion before its narrower functional route proceeds. Every Planning Command/tooling invocation MUST compose the resolver through the registered command dependency graph so no command can silently bypass the current methodology Use-Case registry surface or AI authority boundary; ordinary natural-language work reaches the same pair through normal methodology routing.

`planning/commands` owns the concrete command `includes` syntax. Command `includes` contains canonical repository paths to other direct Planning Command definition files; it does not contain Use-Case or methodology-owner paths. This Use Case owns only the applicability process, and the AI Working Boundary Use Case owns only authority-boundary orchestration. The registry pass may validly select no additional specialized methodology Use Case for repository-operational work.

If this Use Case is already the active applicability resolver, its scan does not recursively select another copy of itself. If the AI Working Boundary is already current, reaffirm it proportionally rather than re-running unrelated downstream lifecycle work.

```text
current Planning/repository work entry
→ UC-DOC-RESOLVE-CURRENT-USE-CASES
→ UC-IDTSPE-AI-WORKING-BOUNDARY
→ Methodology Use-Case Registry Map / plausible scoped registries
→ current specialized Use-Case composition
→ narrowest functional route
```

```text
scan
≠ select every row

selected Use Case
≠ executed Use Case

AI Working Boundary active
≠ execute every GIP / Proposal / Decision lifecycle

registry metadata reused
≠ registry applicability skipped
```

## Explicit Registry Traversal Trace

When the USER explicitly asks to inspect/scan methodology registries, this Use Case may project the traversal without changing the applicability semantics:

```text
Registry Traversal Trace
Context
Fundamental authority boundary
  UC-IDTSPE-AI-WORKING-BOUNDARY reaffirmed / material refresh reason
Use-Case registry traversal
  registry + why scanned + applicable UC rows
Active / selected Use Cases
Downstream registry traversal reached by selected Use-Case Processes
  registry + why scanned + plausibly applicable components
Registries not scanned + reason
Unresolved applicability
Execution: NONE
```

Guards:

```text
SCANNED ≠ APPLICABLE
APPLICABLE ≠ SELECTED
SELECTED ≠ EXECUTED
```

Do not globally scan every Target/Lens/theory/component registry. Downstream registries are reached only through the selected Use-Case Processes that need them.

Shared meaning: [`Use-Case Applicability Scan`](../principles-and-terminology.md#doc-use-case-applicability-scan), [`Registry Scan`](../principles-and-terminology.md#doc-registry-scan), and [`Functional Routing Ownership Chain`](../principles-and-terminology.md#doc-functional-routing-ownership).
