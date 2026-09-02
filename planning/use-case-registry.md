# Repository Use-Case Registry

Status: transitional current functional overview

Groups are navigation only. Detailed `Situation`, `Result`, and `Process` meaning lives in the Use-Case owner.

## Session Work

| ID | Use Case | Owner |
|---|---|---|
| `UC-SESSION-ESTABLISH-WORKFLOW` | Establish / Adjust Session Workflow | [`session/use-cases/UC-SESSION-ESTABLISH-WORKFLOW.md`](session/use-cases/UC-SESSION-ESTABLISH-WORKFLOW.md) |
| `UC-SESSION-USE-REPOSITORY-GUIDANCE` | Use Repository Guidance In Current Session | [`session/use-cases/UC-SESSION-USE-REPOSITORY-GUIDANCE.md`](session/use-cases/UC-SESSION-USE-REPOSITORY-GUIDANCE.md) |
| `UC-SESSION-MAINTAIN-STATE` | Maintain Session State | [`session/use-cases/UC-SESSION-MAINTAIN-STATE.md`](session/use-cases/UC-SESSION-MAINTAIN-STATE.md) |
| `UC-SESSION-CHECKPOINT` | Integrate Current Session Checkpoint | [`session/use-cases/UC-SESSION-CHECKPOINT.md`](session/use-cases/UC-SESSION-CHECKPOINT.md) |

## Documentation — Fundamental Current Capabilities

| ID | Use Case | Owner |
|---|---|---|
| `UC-DOC-PLAN-DOCUMENTATION-CHANGE` | Plan Repository Documentation Change | [`documentation/use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md`](documentation/use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md) |
| `UC-DOC-REVIEW-DOCUMENTATION` | Review Repository Documentation | [`documentation/use-cases/UC-DOC-REVIEW-DOCUMENTATION.md`](documentation/use-cases/UC-DOC-REVIEW-DOCUMENTATION.md) |
| `UC-DOC-MAINTAIN-USE-CASE` | Establish / Change Repository Use Case | [`documentation/use-cases/UC-DOC-MAINTAIN-USE-CASE.md`](documentation/use-cases/UC-DOC-MAINTAIN-USE-CASE.md) |
| `UC-DOC-MAINTAIN-PRINCIPLES-TERMINOLOGY` | Maintain Principles & Terminology | [`documentation/use-cases/UC-DOC-MAINTAIN-PRINCIPLES-TERMINOLOGY.md`](documentation/use-cases/UC-DOC-MAINTAIN-PRINCIPLES-TERMINOLOGY.md) |
| `UC-DOC-MAINTAIN-PROCESS` | Maintain Reusable Process | [`documentation/use-cases/UC-DOC-MAINTAIN-PROCESS.md`](documentation/use-cases/UC-DOC-MAINTAIN-PROCESS.md) |
| `UC-DOC-MAINTAIN-TEMPLATE` | Maintain Documentation Template | [`documentation/use-cases/UC-DOC-MAINTAIN-TEMPLATE.md`](documentation/use-cases/UC-DOC-MAINTAIN-TEMPLATE.md) |
| `UC-DOC-MAINTAIN-EXAMPLE` | Maintain Documentation Example | [`documentation/use-cases/UC-DOC-MAINTAIN-EXAMPLE.md`](documentation/use-cases/UC-DOC-MAINTAIN-EXAMPLE.md) |
| `UC-DOC-MAINTAIN-README` | Maintain README Navigation | [`documentation/use-cases/UC-DOC-MAINTAIN-README.md`](documentation/use-cases/UC-DOC-MAINTAIN-README.md) |
| `UC-DOC-MAINTAIN-USE-CASE-REGISTRY` | Maintain Use-Case Registry | [`documentation/use-cases/UC-DOC-MAINTAIN-USE-CASE-REGISTRY.md`](documentation/use-cases/UC-DOC-MAINTAIN-USE-CASE-REGISTRY.md) |

## Existing Current Repository Capabilities — Pending Reconciliation

These capabilities have **not** been retired or made legacy by the fundamental migration. Their previous contracts remain current pending an explicit `KEEP / FOLD / MOVE / RETIRE` review.

| ID | Use Case | Owner / Current Route |
|---|---|---|
| `UC-REPO-ORIENT` | Orient In Repository And Resolve Work Route | `README.md` → `planning/README.md` → registries |
| `UC-REPO-CURRENT-STATE` | Report Current Repository / Planning State | this registry → `documentation/status-reconciliation-workflow.md` → selected current owners |
| `UC-REPO-PLAN-NEXT` | Plan The Next Concrete Step | selected Direction/Use Case/current owners |
| `UC-REPO-CRITICAL-REVIEW` | Critically Review A Claim / Plan / Diff | shared Idea owners + selected target/current owners + `documentation/review-diff-review-workflow.md` when target is ReviewDiff |
| `UC-REPO-USE-ARCHIVE-SOURCE` | Use An Explicit Archive As Read Source | selected archive + applicable owners |
| `UC-REPO-DEFINE-PARALLEL-SCOPES` | Define / Maintain Fixed Parallel-Work Scopes | `../parallel-work-scope-registry.md` + `documentation/parallel-work-scope-and-action-log-workflow.md` |
| `UC-REPO-PARALLEL-WORK` | Work In Registered Parallel Scope(s) | `../parallel-work-scope-registry.md` + `documentation/parallel-work-scope-and-action-log-workflow.md` |
| `UC-REPO-REFINE-CURRENT-PLAN` | Refine The Current Plan | `documentation/idtspe-methodology/active/idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md` + `documentation/idtspe-methodology/active/idtspe-core/IDTSPE-SHELL.md` |
| `UC-REPO-AUDIT-REVIEW` | Audit Review Coverage And Quality | `documentation/review-audit-workflow.md` |
| `UC-REPO-REVIEW-PLANNING-FINDINGS` | Review Planning Findings / Q/R/P Completeness | `documentation/planning-findings-review-workflow.md` + `documentation/planning-concerns-and-decisions-model.md` |
| `UC-IDTSPE-REVIEW-CONSISTENCY` | Review IDTSPE Plan Consistency | `documentation/idtspe-methodology/active/idtspe-core/shared/consistency-review-use-case.md` |

The exact pre-fundamental registry is preserved at [`legacy/use-case-registry.pre-fundamental-uc.md`](legacy/use-case-registry.pre-fundamental-uc.md) as provenance only; it is not the semantic owner of these capabilities.

Existing narrower family registries remain current for their unreviewed capabilities until they are explicitly reconciled into this repository-wide overview.
