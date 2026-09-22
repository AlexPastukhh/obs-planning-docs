# UC-DOC-RESOLVE-CURRENT-USE-CASES — Resolve Current Methodology Use Cases

Status: active fundamental methodology-guidance Use Case

Responsibility ID: `DOC.USE-CASE-APPLICABILITY-RESOLUTION`

## Situation

Any current Planning/repository work is starting or continuing, through an explicit Planning Command or ordinary natural-language work, and the current situation requires reaffirming which methodology-use capabilities are applicable now.

This Use Case is **always logically active for every current Planning/repository work entry**. Every Planning Command composes it explicitly/transitively; ordinary natural-language work applies the same ambient registry-level recheck through routing. That does not mean every registry or Use-Case body is reread or executed on every turn.


## Ownership Boundary

This Use Case owns the reusable **applicability-resolution Process** that produces the current applicable Use-Case composition. The [`Methodology Use-Case Registry Map`](../use-case-registry-map.md) owns cross-scope routing metadata; each scoped registry owns its compact rows; selected Use Cases own their own Results/Processes; command/Helper tooling owns concrete command-composition syntax.

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Use-Case Applicability Scan`](../principles-and-terminology.md#doc-use-case-applicability-scan) — `DOC.USE-CASE-APPLICABILITY-SCAN`
> - `CONTEXTUALIZES` [`Registry Scan`](../principles-and-terminology.md#doc-registry-scan) — `DOC.REGISTRY-SCAN`
> - `CONTEXTUALIZES` [`Functional Routing Ownership Chain`](../principles-and-terminology.md#doc-functional-routing-ownership) — `DOC.FUNCTIONAL-ROUTING-OWNERSHIP`

## Result

The current applicable Use-Case composition is known: still-applicable current Use Cases are retained, newly applicable Use Cases are added, no-longer-applicable assumptions are released, and only owner detail needed for the next material action is loaded.

## Process

1. Start from the current USER request, current material work state, active methodology/profile scope and any still-trustworthy applicability result.
2. Consult the [`Methodology Use-Case Registry Map`](../use-case-registry-map.md) for plausible scopes, then scan only plausibly applicable scoped registries using their compact `Situation` / `Result` routing summaries.
3. Retain already-active Use Cases whose Situation/Result remain valid; add newly applicable Use Cases; stop relying on Use Cases whose applicability no longer holds.
4. Open only newly selected or insufficiently-known Use-Case owners. Reuse already-known Process/registry metadata while authority/content remains trustworthy.
5. Return the current Use-Case composition to the active work. This Use Case **selects/composes Use Cases; it does not execute their specialized Result work**.
6. For every current Planning/repository work entry, perform the compact registry applicability recheck even when registry metadata can be reused. Every Planning Command guarantees this through command composition; ordinary natural-language work reaches the same ambient resolver through normal routing. Also re-evaluate after material context, owner, profile, Finding/Evidence/Decision, revalidation or scope changes. Mechanical substeps inside one already-composed command/pass do not require ceremonial rescanning unless they materially change applicability.

## Fundamental Composition Rule

Every current Planning/repository work entry MUST pass through this ambient applicability resolver before its narrower functional route proceeds. Every Planning Command/tooling invocation MUST compose it through the registered command-prefix graph so no command can silently bypass the current methodology Use-Case registry surface; ordinary natural-language work reaches it through normal routing. `planning/commands` owns the concrete `includes` syntax; this Use Case owns only the applicability process. The registry pass may validly select no additional specialized methodology Use Case for repository-operational work.

If this Use Case is already the active applicability resolver, its scan does not recursively select another copy of itself.

```text
scan
≠ select every row

selected Use Case
≠ executed Use Case

registry metadata reused
≠ registry applicability skipped
```

## Explicit Registry Traversal Trace

When the USER explicitly asks to inspect/scan methodology registries, this Use Case may project the traversal without changing the applicability semantics:

```text
Registry Traversal Trace
Context
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
