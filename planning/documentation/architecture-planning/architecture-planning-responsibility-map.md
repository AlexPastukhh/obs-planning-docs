# Workspace Architecture Planning Responsibility Map

Status: active reusable nested responsibility map

| Responsibility | Owner |
|---|---|
| Core Architecture Lens concepts/invariants | `architecture-planning-principles-and-terminology.md` |
| Generic Workspace Use-Case identity / contract | sibling `../direction-and-use-case-registry-workflow.md` |
| Canonical Workspace UC establish/change/topology planning | sibling `../workspace-planning/` |
| Architecture objective + Work-Cost model + Architecture-input Workspace UC Types/importance + Work Paths / Extensions / Change Pressure / Change Axis / Hot Path semantics | `workspace-use-cases-and-change-pressure.md` |
| Workspace Use-Case discovery process | `workspace-use-case-discovery-workflow.md` |
| Contextual WEUC Type/Instance discovery and evaluation | `workspace-evolution-use-case-discovery-workflow.md` |
| Architecture-relevant path analysis | `architecture-path-analysis-workflow.md` |
| Change-pressure / Change-Axis analysis | `architecture-change-pressure-workflow.md` |
| Architecture State review | `architecture-state-review-workflow.md` |
| One material Architecture Decision | `architecture-decision-workflow.md` |
| Coherent Architecture Evolution | `architecture-evolution-workflow.md` |
| Semantic Direction identity | `direction-registry.md` |
| Semantic Architecture Use Cases | `use-case-registry.md` |
| Path-analysis recommended shape | `templates/ARCHITECTURE-PATH-ANALYSIS-TEMPLATE.md` |
| Change-pressure recommended shape | `templates/CHANGE-PRESSURE-REVIEW-TEMPLATE.md` |
| Architecture-decision recommended shape | `templates/ARCHITECTURE-DECISION-TEMPLATE.md` |
| Integrated worked example | `examples/ARCHITECTURE-PLANNING-WORKED-EXAMPLE.md` |
| Application-specific Scenario/Domain/Realization/Slice semantics and concrete runtime-cost evidence | sibling `../application-planning/` owners (`UC-PLAN-REALIZATION` for runtime handoff) |

Architecture Planning is reusable across Workspace types. Do not move application behavior/Domain truth into this family merely because architecture analysis consumes it.

## Discover WEUC Responsibility

`UC-PLAN-ARCH-DISCOVER-WEUC` owns contextual Workspace-evolution-use discovery and the bounded handoff result.

Broad current/candidate Workspace-use discovery remains under `UC-PLAN-ARCH-WORKSPACE-USES`. Architecture Pressure consumes either/both as evidence. Workspace Planning retains canonical ordinary Workspace UC establishment/change/topology authority.
