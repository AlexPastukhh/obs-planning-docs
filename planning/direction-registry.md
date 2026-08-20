# OBS Root Direction Registry

Status: active project-specific root semantic Direction Registry
Scope: root orientation across all current semantic work/application families.

## Registry Index

| Direction ID | Semantic name | Complete owner | Primary semantic registry / owner |
|---|---|---|---|
| `DIR-REPOSITORY` | Orient In And Work With The Repository | this file | [`use-case-registry.md`](use-case-registry.md) |
| `DIR-PLAN-SOLUTION` | Plan A Solution / Workflow / Application | [`documentation/application-planning/direction-registry.md`](documentation/application-planning/direction-registry.md) | [`documentation/application-planning/use-case-registry.md`](documentation/application-planning/use-case-registry.md) |
| `DIR-PLAN-ARCHITECTURE` | Plan / Review Workspace Architecture | [`documentation/architecture-planning/direction-registry.md`](documentation/architecture-planning/direction-registry.md) | [`documentation/architecture-planning/use-case-registry.md`](documentation/architecture-planning/use-case-registry.md) |
| `DIR-PLAN-TESTING` | Plan / Review Verification And Testing | [`documentation/testing-planning/direction-registry.md`](documentation/testing-planning/direction-registry.md) | [`documentation/testing-planning/use-case-registry.md`](documentation/testing-planning/use-case-registry.md) |
| `DIR-DOCUMENTATION` | Use And Maintain Repository Documentation | [`documentation/direction-registry.md`](documentation/direction-registry.md) | [`documentation/use-case-registry.md`](documentation/use-case-registry.md) |
| `DIR-DOCUMENTATION-WORKBENCH` | Develop And Maintain Documentation Workbench | [`areas/documentation-workbench/direction-registry.md`](areas/documentation-workbench/direction-registry.md) | [`areas/documentation-workbench/use-case-registry.md`](areas/documentation-workbench/use-case-registry.md) |
| `DIR-PLANNING-RUNTIME` | Use The OBS Planning Runtime | [`areas/planning-system/direction-registry.md`](areas/planning-system/direction-registry.md) | [`areas/planning-system/use-case-registry.md`](areas/planning-system/use-case-registry.md) |
| `DIR-PLANNING-HELPER` | Use And Maintain Planning Helper | [`documentation/tools/tampermonkey/chat-command-palette/direction-registry.md`](documentation/tools/tampermonkey/chat-command-palette/direction-registry.md) | [`documentation/tools/tampermonkey/chat-command-palette/scenarios/README.md`](documentation/tools/tampermonkey/chat-command-palette/scenarios/README.md) |
| `DIR-LINKED-NOTES` | Use And Maintain Linked Notes | [`documentation/tools/tampermonkey/linked-notes/direction-registry.md`](documentation/tools/tampermonkey/linked-notes/direction-registry.md) | [`documentation/tools/tampermonkey/linked-notes/scenarios/README.md`](documentation/tools/tampermonkey/linked-notes/scenarios/README.md) |
| `DIR-REPLACEMENT-PACKAGE-APP` | Apply / Review / Finalize Replacement Packages | [`documentation/tools/replacement-package-app/direction-registry.md`](documentation/tools/replacement-package-app/direction-registry.md) | [`documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md`](documentation/tools/replacement-package-app/USE-CASE-REGISTRY.md) |

## Direction Rule

A Direction groups independently useful semantic work/capabilities around one broad work/result/responsibility zone. Workspace/methodology Directions normally expose Use Cases; Application Directions expose Scenarios. Child entries may be optional, conditional, alternative or repeated; registry order is not automatically workflow order.

## Command Boundary

Executable shortcuts live in [`command-routing.md`](command-routing.md) + [`commands/`](commands/). Commands are not a parallel semantic catalogue.

## Semantic Registry Rule

```text
Workspace / methodology Direction → Workspace Use-Case Registry
Application Direction → Scenario Catalog / Scenario owners
```

The primary semantic child is not required to be a Use-Case Registry for an Application Direction.
