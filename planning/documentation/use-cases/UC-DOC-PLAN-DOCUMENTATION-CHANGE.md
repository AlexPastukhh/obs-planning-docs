# UC-DOC-PLAN-DOCUMENTATION-CHANGE — Plan Repository Documentation Change

## Situation

A repository documentation capability, semantic owner structure, navigation model, dependency, or methodology needs a material change that cannot be resolved by simply reading a known owner or placing a file in an obvious existing responsibility.

## Documentation Change Coverage

For a substantial change that can affect several owners/projections, produce this proportional reviewable result before Exact realization:

```text
Semantic owners to change
Existing artifacts to change
New owners/artifacts, if any
Registries/catalogs affected
Commands/direct invocation projections affected
Canonical methodology scenarios affected
Helper/generated projections affected
Examples/tests/audits requiring revalidation
```

A small obvious local correction does not require a separate coverage rendering. This result is not a new Target Module; it is a completeness checkpoint of this Use Case.

## Result

The target documentation meaning is resolved to the needed depth, affected Use Cases and semantic owners are clear, and the change is ready for exact repository realization without implementation having to invent semantic decisions.

## Process

1. State the documentation need and the useful result being sought.
2. Consume/reaffirm the current applicable Use-Case composition from [`UC-DOC-RESOLVE-CURRENT-USE-CASES`](UC-DOC-RESOLVE-CURRENT-USE-CASES.md). Do not independently rerun the scoped registry-selection Process here; route any newly discovered applicability change back through the fundamental resolver.
3. If Use-Case identity/boundary must change, use [`UC-DOC-MAINTAIN-USE-CASE`](UC-DOC-MAINTAIN-USE-CASE.md).
4. Use the Session's current planning approach or another applicable planning methodology when material planning is needed; this Documentation Use Case does not require one specific planning runtime.
5. Read [`../principles-and-terminology.md`](../principles-and-terminology.md) proportionally and inspect only the current owners needed for this target.
6. Before selecting exact files or paths, classify each material artifact by **semantic role + primary consumer + natural semantic owner**. Distinguish Use-Case Process from Component Method, Operation, Guidance, Checkpoint, knowledge/theory, representation and other current owner types instead of using `shared`, `helper`, `workflow`, `process`, or generic `method` as catch-all categories.
7. Resolve semantic meaning before deciding exact files. Prefer one narrow complete owner per responsibility; path/name follows the classified role and must not create or transfer semantic authority.
8. Use the relevant type-maintenance Use Cases when Principles & Terminology, Process, Template, Example, README, or Registry semantics themselves need maintenance. Supporting Component Methods, Operations, Guidance and Checkpoints remain governed by their natural methodology/component owners; do not force them through `UC-DOC-MAINTAIN-PROCESS` merely because they contain steps.
9. Keep Process, local principles, and demonstrations inline when that remains clear. Extract supporting files only when size, reuse, or independent review responsibility justifies them; when extracted, use consumer-qualified naming where ambiguity would otherwise hide ownership.
10. Resolve README and Use-Case Registry consequences when structural or functional navigation changes.

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Semantic Owner`](../principles-and-terminology.md#doc-semantic-owner) — `DOC.SEMANTIC-OWNER`
> - `CONTEXTUALIZES` [`Semantic DRY Principle`](../principles-and-terminology.md#doc-semantic-dry) — `DOC.SEMANTIC-DRY`
> - `CONTEXTUALIZES` [`Explicit Stable Semantic Anchor`](../principles-and-terminology.md#doc-explicit-stable-semantic-anchor) — `DOC.EXPLICIT-STABLE-SEMANTIC-ANCHOR`
> - `CONTEXTUALIZES` [`Semantic Owner Dependency`](../principles-and-terminology.md#doc-semantic-owner-dependency) — `DOC.SEMANTIC-OWNER-DEPENDENCY`

11. For every **semantic responsibility whose meaning changes**, resolve its canonical owner and run [`SEMANTIC-OWNER-CHANGE-REVALIDATION`](../processes/SEMANTIC-OWNER-CHANGE-REVALIDATION.process.md) proportionally. Use tracked Semantic Owner Dependencies to find known contextual repetitions/projections, then search proportionally for untracked competing normative copies instead of assuming grep-visible copies should all be synchronized.
12. When a non-owner needs to repeat or clarify owner semantics for local comprehension/execution, create a tracked `Semantic Owner Dependency` (`RESTATES` / `CONTEXTUALIZES` / `EXTENDS` / `REPRESENTS` / `MIGRATES`) and link to the canonical owner. If this is the first real need for a stable section-level reference, add an explicit stable semantic anchor to the owner; do not mass-create anchors for unrelated headings. When an already-referenced section gains that explicit anchor, migrate the reviewed section-specific inbound links from generated heading fragments to the explicit anchor in the same change unless a declared compatibility reason requires retaining the old route.
13. Before exact realization, identify **derived projections/examples/integration surfaces** whose projected meaning may change because the semantic owner changed: Responsibility Maps, registries/navigation, command routes, Planning Helper semantic-command projection, methodology scenarios, generated catalogs, templates, examples and tests. Update only affected projections; do not create a new semantic owner merely for a projection.
14. When an owner referenced by a canonical methodology scenario changes materially, rerun the affected scenario as an explanatory/integration test and update scenario prose only when its illustrated composition actually changed.
15. When exact repository changes are selected, hand off to the applicable exact-realization/update mechanism rather than inventing a Documentation-specific transport lifecycle.
16. Route downstream contradictions or implementation discoveries back to the real semantic owner and re-plan narrowly when accepted meaning must change.

This Use Case does not require a new Use Case for every file, navigation row, dependency, template, example, command, or Process step.
