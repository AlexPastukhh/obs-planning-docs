# UC-DOC-PLAN-DOCUMENTATION-CHANGE — Plan Repository Documentation Change

## Situation

A repository documentation capability, semantic owner structure, navigation model, dependency, or methodology needs a material change that cannot be resolved by simply reading a known owner or placing a file in an obvious existing responsibility.

## Result

The target documentation meaning is resolved to the needed depth, affected Use Cases and semantic owners are clear, and the change is ready for exact repository realization without implementation having to invent semantic decisions.

## Process

1. State the documentation need and the useful result being sought.
2. Check the current [`Documentation Use-Case Registry`](../use-case-registry.md) and reuse an existing Use Case when it already owns the required result.
3. If Use-Case identity/boundary must change, use [`UC-DOC-MAINTAIN-USE-CASE`](UC-DOC-MAINTAIN-USE-CASE.md).
4. Use the Session's current planning approach or another applicable planning methodology when material planning is needed; this Documentation Use Case does not require one specific planning runtime.
5. Read [`../principles-and-terminology.md`](../principles-and-terminology.md) proportionally and inspect only the current owners needed for this target.
6. Resolve semantic meaning before deciding exact files. Prefer one narrow complete owner per responsibility.
7. Use the relevant type-maintenance Use Cases when Principles & Terminology, Process, Template, Example, README, or Registry semantics themselves need maintenance.
8. Keep Process, local principles, and demonstrations inline when that remains clear. Extract supporting files only when size, reuse, or independent review responsibility justifies them.
9. Resolve README and Use-Case Registry consequences when structural or functional navigation changes.
10. When exact repository changes are selected, hand off to the applicable exact-realization/update mechanism rather than inventing a Documentation-specific transport lifecycle.
11. Route downstream contradictions or implementation discoveries back to the real semantic owner and re-plan narrowly when accepted meaning must change.

This Use Case does not require a new Use Case for every file, navigation row, dependency, template, example, command, or Process step.
