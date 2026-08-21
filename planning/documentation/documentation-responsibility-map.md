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
| Direction / Workspace-methodology Use-Case registry methodology + Application Scenario-Catalog boundary + canonical generic UC identity/relationship contract | `direction-and-use-case-registry-workflow.md` |
| Workspace UC change planning (Step 1/2/3) | `workspace-planning/` |
| Focused semantic model owner, when separately justified | narrow `*-model.md` owner routed from the relevant UC/workflow; do not duplicate registry/workflow/principles authority |
| Registry shapes | `DIRECTION-REGISTRY-TEMPLATE.md`, `USE-CASE-REGISTRY-TEMPLATE.md` |
| Repository discoverability/coverage review | `repository-navigation-and-use-case-coverage-review-workflow.md` |
| Command routing methodology | `command-routing-workflow.md` |
| Command routing shape | `COMMAND-ROUTING-TEMPLATE.md` |
| Concrete project commands | project `command-routing.md` + `commands/*.command.md` |
| Command planning | `command-planning-workflow.md` |
| Documentation update planning/application | `documentation-update-plan-workflow.md`, generic `workspace-planning/` when UC-centric semantic planning is needed, `documentation-update-workflow.md` for approved application |
| Concrete File Update Plan | `file-update-overview-workflow.md`, `FILE-UPDATE-OVERVIEW-TEMPLATE.md` |
| Replacement package producer | `build-replacement-archive-workflow.md` |
| ReviewDiff semantic correctness review | `review-diff-review-workflow.md` + shared Idea owners |
| Shared Idea methodology / aggregate Current-Plan contract | Idea principles/workflow/template |
| Solution/application planning | `application-planning/` |
| Universal Workspace Architecture Planning | `architecture-planning/` |
| Reusable Testing Planning | `testing-planning/` |
| Required semantic downstream review dependencies | `review-dependency-planning-workflow.md` + `UC-DOC-CONFIGURE-REVIEW-DEPENDENCIES` |
| Detailed application behavior | project/application Scenario owner(s) |
| Optional Scenario/Domain/Slice specialization | `profiles/scenario-domain-slice-docs-profile.md` |
| Status reconciliation | `status-reconciliation-workflow.md` |
| Example coverage/examples | `example-coverage-workflow.md`, `examples/` |
| Fixed parallel-work scope + scope-log methodology | `parallel-work-scope-and-action-log-workflow.md`; project roots/boundaries live in the root Scope Registry |
| Actual high-level action history/rationale | canonical `action-log.md` at the registered scope root |
| Planning Helper projection | `tampermonkey-command-projection-workflow.md` + tool docs/source |

README/index files own navigation/read order only. They do not duplicate complete semantic bodies.

## Placement Checks

1. reusable or project-specific?
2. Direction / Use Case / Scenario / principle / workflow / template / profile / example / tool / current state?
3. what is the narrowest canonical owner?
4. is that owner already reachable from the applicable current semantic entry (Workspace/methodology Use Case or Application Scenario) or an explicit supporting-owner route?
5. would a new file duplicate an existing owner?
6. does natural README/index/Direction navigation need maintenance through `UC-DOC-MAINTAIN-NAVIGATION`?
7. does a Direction/Workspace-methodology Use-Case routing contract need maintenance through `UC-DOC-MAINTAIN-REGISTRIES`, or does Application Scenario meaning need its current Application Planning owner?
8. if a command is involved, is it only an executable shortcut to a semantic capability?
