# Documentation Responsibility Map

Status: active reusable documentation-layer responsibility map
Scope: route reusable documentation material to its immediate canonical owner type/family.

| Information type | Owner |
|---|---|
| Architecture/discoverability/source-of-truth invariants | `planning-docs-architecture-principles.md` |
| Reusable documentation bootstrap/preflight | `documentation-principles-read-workflow.md` |
| Responsibility-zone classification | `documentation-responsibility-zone-review-workflow.md` |
| Documentation Direction identity | `direction-registry.md` |
| Documentation Use Cases | `use-case-registry.md` |
| Repository navigation/read order | affected README/index files; governed by architecture principles/responsibility rules and maintained through `UC-DOC-MAINTAIN-NAVIGATION` |
| Direction/Use-Case registry methodology | `direction-and-use-case-registry-workflow.md` |
| Registry shapes | `DIRECTION-REGISTRY-TEMPLATE.md`, `USE-CASE-REGISTRY-TEMPLATE.md` |
| Repository discoverability/coverage review | `repository-navigation-and-use-case-coverage-review-workflow.md` |
| Command routing methodology | `command-routing-workflow.md` |
| Command routing shape | `COMMAND-ROUTING-TEMPLATE.md` |
| Concrete project commands | project `command-routing.md` + `commands/*.command.md` |
| Command planning | `command-planning-workflow.md` |
| Documentation update planning/application | `documentation-update-plan-workflow.md`, `documentation-update-workflow.md` |
| Concrete File Update Plan | `file-update-overview-workflow.md`, `FILE-UPDATE-OVERVIEW-TEMPLATE.md` |
| Replacement package producer | `build-replacement-archive-workflow.md` |
| ReviewDiff semantic correctness review | `review-diff-review-workflow.md` + shared Idea owners |
| Shared Idea methodology / aggregate Current-Plan contract | Idea principles/workflow/template |
| Solution/application planning | `application-planning/` |
| Detailed application behavior | project/application Scenario owner(s) |
| Optional Scenario/Domain/Slice specialization | `profiles/scenario-domain-slice-*` |
| Status reconciliation | `status-reconciliation-workflow.md` |
| Example coverage/examples | `example-coverage-workflow.md`, `examples/` |
| Fixed parallel-work scope + scope-log methodology | `parallel-work-scope-and-action-log-workflow.md`; project roots/boundaries live in the root Scope Registry |
| Actual high-level action history/rationale | canonical `action-log.md` at the registered scope root |
| Planning Helper projection | `tampermonkey-command-projection-workflow.md` + tool docs/source |

README/index files own navigation/read order only. They do not duplicate complete semantic bodies.

## Placement Checks

1. reusable or project-specific?
2. Direction/Use Case/Scenario/principle/workflow/template/profile/field-kit/example/tool/current state?
3. what is the narrowest canonical owner?
4. is that owner already reachable from a current Use Case?
5. would a new file duplicate an existing owner?
6. does natural README/index/Direction navigation need maintenance through `UC-DOC-MAINTAIN-NAVIGATION`?
7. does a semantic Direction/Use-Case contract need maintenance through `UC-DOC-MAINTAIN-REGISTRIES`?
8. if a command is involved, is it only an executable shortcut to a semantic capability?
