# Parallel Work Scope Registry

Status: active project-specific canonical registry
Scope: fixed independent parallel-work scopes for this repository. Scope boundaries are not rediscovered ad hoc by chats.

Reusable methodology: [`planning/documentation/parallel-work-scope-and-action-log-workflow.md`](planning/documentation/parallel-work-scope-and-action-log-workflow.md)

## Registry Rules

```text
registered scope
= stable scope ID
+ fixed repository root
+ canonical scope action log at that root

path ownership
= deepest active registered scope root containing the path

registered child scope
= excluded from its registered parent scope
```

A folder does not become a parallel-work scope merely because it exists. Creating, moving, splitting, merging or retiring a scope is an explicit registry change. Normal work reads this registry and uses existing boundaries.

Scope design is informed by the repository Direction / Use-Case architecture: independently coordinated scopes should normally follow coherent broad work families when practical, but Direction and scope are not the same type and there is no mandatory 1:1 mapping. `Related Direction(s)` below is navigation metadata only; Direction / Use-Case Registries remain semantic authority. Cross-Direction Use Cases may keep explicit integration/dependency/handoff links without merging their scopes.

Each active scope root contains `action-log.md`. The log file makes the registered boundary visible in the tree, but this registry is the canonical authority for the boundary.

## Active Scopes

| Scope ID | Root | Canonical log | Related Direction(s) | Purpose / responsibility boundary |
|---|---|---|---|---|
| `SCOPE-REPOSITORY-SHELL` | `.` | `action-log.md` | `DIR-REPOSITORY` | repository-root orientation/configuration files not owned by a registered child scope |
| `SCOPE-PLANNING-ROOT` | `planning/` | `planning/action-log.md` | `DIR-REPOSITORY` | planning root navigation, commands, helper-library and other planning-root material not owned by a registered child scope |
| `SCOPE-REUSABLE-DOCUMENTATION` | `planning/documentation/` | `planning/documentation/action-log.md` | `DIR-DOCUMENTATION` | reusable documentation/planning methodology not owned by a registered child scope |
| `SCOPE-APPLICATION-PLANNING` | `planning/documentation/application-planning/` | `planning/documentation/application-planning/action-log.md` | `DIR-PLAN-SOLUTION` | reusable solution/application-planning methodology |
| `SCOPE-DOCUMENTATION-WORKBENCH` | `planning/areas/documentation-workbench/` | `planning/areas/documentation-workbench/action-log.md` | `DIR-DOCUMENTATION-WORKBENCH` | Documentation Workbench project/application state |
| `SCOPE-PLANNING-SYSTEM` | `planning/areas/planning-system/` | `planning/areas/planning-system/action-log.md` | `DIR-PLANNING-RUNTIME` | Planning Runtime project/application state |
| `SCOPE-PLANNING-DASHBOARD` | `planning/dashboard/` | `planning/dashboard/action-log.md` | `DIR-PLANNING-RUNTIME` | Dashboard-specific planning surface/state |
| `SCOPE-PLANNING-HELPER` | `planning/documentation/tools/tampermonkey/chat-command-palette/` | `planning/documentation/tools/tampermonkey/chat-command-palette/action-log.md` | `DIR-PLANNING-HELPER` | Planning Helper application/source/tests/generated artifact |
| `SCOPE-LINKED-NOTES-APP` | `planning/documentation/tools/tampermonkey/linked-notes/` | `planning/documentation/tools/tampermonkey/linked-notes/action-log.md` | `DIR-LINKED-NOTES` | Linked Notes application/source/tests/generated artifact |
| `SCOPE-REPLACEMENT-PACKAGE-APP` | `planning/documentation/tools/replacement-package-app/` | `planning/documentation/tools/replacement-package-app/action-log.md` | `DIR-REPLACEMENT-PACKAGE-APP` | Replacement Package App documentation/source/tests |
| `SCOPE-LINKED-NOTES-REPOSITORY-STATE` | `.linked-notes/` | `.linked-notes/action-log.md` | `DIR-LINKED-NOTES` | repository-facing Linked Notes contracts/state |
| `SCOPE-PLANNING-OPERATIONS` | `-Planning/` | `-Planning/action-log.md` | `DIR-PLANNING-RUNTIME` | operational planning day/templates/workflows material |

## Cross-Scope Work

When one intentional work item affects several registered scopes:

1. select one affected scope log as the canonical log for that work;
2. keep the full material records only in that log;
3. add a `CROSS-SCOPE REFERENCE` in every other affected scope log, pointing to the canonical log path + entry ID;
4. keep the same canonical log owner through correction/review packages for that work.

Do not duplicate the full Idea Review, rationale or ReviewDiff correction record across scope logs.
