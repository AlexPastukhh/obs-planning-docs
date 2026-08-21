# Documentation Reusable Layer Index

Status: active reusable documentation layer index
Scope: reusable documentation governance, planning methodology, command routing, templates/profiles/examples and tool projection.

## Natural Entry

```text
planning/README.md
→ planning/direction-registry.md
→ planning/documentation/direction-registry.md
→ planning/documentation/use-case-registry.md
→ selected documentation owner
```

For AI/chat work also read `planning/AI-WORKING-CONTRACT.md`.

## Core Owners

```text
planning-docs-architecture-principles.md
documentation-responsibility-map.md
documentation-principles-read-workflow.md
documentation-responsibility-zone-review-workflow.md
direction-registry.md
use-case-registry.md
direction-and-use-case-registry-workflow.md
DIRECTION-REGISTRY-TEMPLATE.md
USE-CASE-REGISTRY-TEMPLATE.md
repository-navigation-and-use-case-coverage-review-workflow.md
command-routing-workflow.md
COMMAND-ROUTING-TEMPLATE.md
command-planning-workflow.md
prompt-maintenance-workflow.md
reviewable-agent-output-and-commands-workflow.md
documentation-update-plan-workflow.md
documentation-update-workflow.md
file-update-overview-workflow.md
FILE-UPDATE-OVERVIEW-TEMPLATE.md
build-replacement-archive-workflow.md
parallel-work-scope-and-action-log-workflow.md
status-reconciliation-workflow.md
example-coverage-workflow.md
review-dependency-planning-workflow.md
testing-planning/
workspace-planning/
```

Shared Idea owners remain at this reusable root. Solution/application planning lives under `application-planning/`. Reusable Workspace capability planning lives under `workspace-planning/`; Universal Workspace Architecture Planning lives under `architecture-planning/`. These are peer reusable families with distinct semantic responsibilities rather than application-implementation subfolders.

ReviewDiff semantic correctness review is owned by `review-diff-review-workflow.md`; `review-diff-file-workflow.md` is only an optional legacy transfer/capture route.

## File-Type Rule

```text
README/index → navigation
Direction Registry → broad work directions
Use-Case Registry → semantic supported capabilities
Scenario → detailed application behavior
principles → stable reusable definitions/invariants
workflow → repeated process/orchestration
model → focused concepts/state/lifecycle/relationships/invariants when separately justified
template → recommended shape
profile → optional specialization
example → demonstration only
command routing/definition → executable shortcut layer
```

## Runtime Vs Bootstrap

Runtime starts from current repository navigation/Direction/Use-Case/Scenario owners. Bootstrap aids do not remain a separate active file type once runtime owners exist.

## Workspace Planning

See `workspace-planning/direction-registry.md` + `workspace-planning/use-case-registry.md`. Workspace Planning establishes/reviews useful Workspace UCs and keeps Step 1 (UC), Step 2 (Domain/rules) and Step 3 (vertical realization) inside the selected UC plan. It consumes current Architecture Planning proportionally before exact files when Step 3 exposes material architecture/path pressure.

The generic UC identity/contract owner remains `direction-and-use-case-registry-workflow.md`; Workspace Planning does not create a second Use-Case model authority.

## Workspace Architecture Planning

See `architecture-planning/README.md`. Architecture Planning starts from important Workspace Use Cases (including read-only/understanding work), Workspace Change Cases, Extensions, Requirements/constraints and their Work/Runtime paths; it derives Change Pressure/Change Axes and evaluates architecture proportionally rather than targeting patterns.

## Solution / Application Planning

See `application-planning/README.md`. Active topology is whole solution/workflow planning followed, when an Application responsibility exists, by Prototype when useful, Scenario discovery and Scenario Drafts. Planning Item / Planning Draft / Full Picture Matrix are historical/retired concepts rather than active stages.

## Application / Tool Roots

Current application subtrees maintain their own Direction Registry + Scenario Catalog + Scenario owners and link implementation/tests as supporting evidence. Workspace/methodology families use Use-Case Registries.

## Parallel Work / Action Logs

Reusable semantics are owned by [`parallel-work-scope-and-action-log-workflow.md`](parallel-work-scope-and-action-log-workflow.md). Each repository keeps its fixed scope roots in a mandatory project-specific Scope Registry and stores actual cumulative `action-log.md` state at each registered scope root. The superseded temporary shadow-workspace/sync model is not an alternate current route.

## Testing Planning

Sibling reusable family: `testing-planning/` owns Testing Strategy, behavior-specific Test Design and Current Test Coverage/Evidence Review.

## Review Dependencies

`UC-DOC-CONFIGURE-REVIEW-DEPENDENCIES` + `review-dependency-planning-workflow.md` own required downstream semantic-review signals. Linked Notes is the selected implementation mechanism when available.
