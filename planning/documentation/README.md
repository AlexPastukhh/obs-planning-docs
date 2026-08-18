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
documentation-update-plan-workflow.md
documentation-update-workflow.md
file-update-overview-workflow.md
FILE-UPDATE-OVERVIEW-TEMPLATE.md
build-replacement-archive-workflow.md
parallel-work-scope-and-action-log-workflow.md
status-reconciliation-workflow.md
example-coverage-workflow.md
```

Shared Idea owners remain at this reusable root. Solution/application planning lives under `application-planning/`.

ReviewDiff semantic correctness review is owned by `review-diff-review-workflow.md`; `review-diff-file-workflow.md` is only an optional legacy transfer/capture route.

## File-Type Rule

```text
README/index → navigation
Direction Registry → broad work directions
Use-Case Registry → semantic supported capabilities
Scenario → detailed application behavior
principles → stable reusable definitions/invariants
workflow → repeated process
template → recommended shape
profile → optional specialization
field kit → bootstrap only
example → demonstration only
command routing/definition → executable shortcut layer
```

## Runtime Vs Bootstrap

Runtime starts from repository navigation/registries. Field kits are used only before their runtime owners exist. `Use-Case Map / UCM` is not a current generic file type; executable shortcuts use Command Routing while semantic capabilities live in Use-Case Registries.

## Solution / Application Planning

See `application-planning/README.md`. Active topology is whole solution/workflow planning followed, when an Application responsibility exists, by optional Spine Scenario(s), Scenario discovery and Scenario Drafts. Planning Item / Planning Draft / Full Picture Matrix are historical/retired concepts rather than active stages.

## Application / Tool Roots

Current application subtrees maintain their own Direction Registry + Use-Case Registry + Scenario owners and link implementation/tests as supporting evidence.

## Parallel Work / Action Logs

Reusable semantics are owned by [`parallel-work-scope-and-action-log-workflow.md`](parallel-work-scope-and-action-log-workflow.md). Each repository keeps its fixed scope roots in a mandatory project-specific Scope Registry and stores actual cumulative `action-log.md` state at each registered scope root. The superseded temporary shadow-workspace/sync model is not an alternate current route.
