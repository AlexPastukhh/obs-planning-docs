# UC-DOC-MAINTAIN-PROCESS — Maintain Reusable Process

## Situation

A repeated way of reaching one or more Use-Case Results needs to be established, clarified, changed, reused across Use Cases, or extracted because inline Process has become too substantial.

## Result

The reusable Process is represented at the smallest useful scope, remains reachable from the Use Cases that need it, and does not become a competing owner of shared terminology or result meaning.

## Process

1. Start from the Use Case(s) whose Result the Process helps produce.
2. Confirm the candidate really is Use-Case orchestration. If the reusable steps only implement a Lens, Target Module, Unit or another component's own responsibility, classify them as the appropriate Component Method, Operation, Guidance or Checkpoint and maintain them through that natural owner instead of this Use Case.
3. Keep the Process inline while that is readable and not duplicated.
4. Extract a separate Process file only when reuse, size, independent review, or lifecycle makes the split materially useful.
5. Keep the Process focused on actions/flow; reference Principles & Terminology for shared meaning.
6. Preserve situational flexibility: the reusable Process recommends a stable approach but concrete use may extend/contextualize it.
7. Do not create a parallel canonical `Workflow` documentation type for the same reusable meaning, and do not use `Process` as a generic label for component-local mechanics.
8. Ensure every extracted Process remains reachable from at least one current Use Case.
9. Retire stale extracted Process files when no current Use Case needs them.

Shared meaning: [`../principles-and-terminology.md`](../principles-and-terminology.md)
