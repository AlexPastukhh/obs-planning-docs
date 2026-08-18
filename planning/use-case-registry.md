# OBS Root Use-Case Registry

Status: active project-specific semantic registry
Scope: repository-wide capabilities that do not belong more narrowly to one local application/methodology family.

Parent Direction Registry: [`direction-registry.md`](direction-registry.md)

## Current Use Cases

| ID | Name | Status | Parent Direction | Purpose | Trigger / input | Result / end state | Boundaries | Owner route | Related command |
|---|---|---|---|---|---|---|---|---|---|
| `UC-REPO-ORIENT` | Orient In Repository And Resolve Work Route | active | `DIR-REPOSITORY` | find the correct semantic route before material work | new/uncertain repository task | relevant Direction, Use Case, owners and governance identified | orientation grants no edit/command permission | `README.md` → `planning/README.md` → registries | `режим разработки` when development governance is requested |
| `UC-REPO-CURRENT-STATE` | Report Current Repository / Planning State | active | `DIR-REPOSITORY` | report checked current state without inventing certainty | state/status question | checked known/local/unknown state + next safe action | reporting does not mutate repository state | this registry → `documentation/status-reconciliation-workflow.md` → selected current owners | `положняк` |
| `UC-REPO-PLAN-NEXT` | Plan The Next Concrete Step | active | `DIR-REPOSITORY` | select one justified next action from current context | active context needs immediate next planning step | one justified next step + unresolved blockers | not a substitute for full solution planning when broader work is required | selected Direction/Use Case/current owners | `планируй` |
| `UC-REPO-RECHECK-CONTEXT` | Recheck Current Context Before Continuing | active | `DIR-REPOSITORY` | verify potentially stale/wrong context before continuation | previous answer/source/context may be stale or wrong | checked corrections / confirmed context | verification alone does not accept new meaning or authorize edits | selected current owners + checked source | `обс` |
| `UC-REPO-CRITICAL-REVIEW` | Critically Review A Claim / Plan / Diff | active | `DIR-REPOSITORY` | truth-seek against a target instead of accepting it as given | target should be tested as hypothesis | supported strengths/issues/counterevidence/conclusion; material corrective Ideas reviewed proportionally | do not manufacture criticism; ReviewDiff targets use `UC-DOC-REVIEW-DIFF`; read-only | shared Idea owners + selected target/current owners + `documentation/review-diff-review-workflow.md` when target is ReviewDiff | `крит` |
| `UC-REPO-USE-ARCHIVE-SOURCE` | Use An Explicit Archive As Read Source | active | `DIR-REPOSITORY` | establish a bounded readable source snapshot | user selects archive/snapshot for reading | checked source identity/coverage + source-bounded work context | read-source mode is not replacement-package producer mode | selected archive + applicable owners | `арх` |
| `UC-REPO-PARALLEL-WORK` | Start A Parallel Staging Workspace | active | `DIR-REPOSITORY` | isolate parallel planning/documentation staging from canonical state | work needs isolated parallel staging | bounded staging workspace + explicit sync boundary | staging copy is never canonical merely because it exists | `documentation/parallel-work/` | `начни параллельную работу` |

Every entry explicitly owns purpose, trigger, result, boundaries and owner route. Use-Case activation grants no repository edit/commit/push permission. Capabilities with a narrower family owner belong in that family's registry rather than being copied here.
