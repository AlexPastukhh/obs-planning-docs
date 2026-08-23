# Discover Workspace Use Cases

Status: active project command definition
Scope: one concrete OBS Planning command route. Canonical Workspace Use-Case identity/lifecycle remains in current Workspace registries; Architecture Planning consumes/discovers architecture-relevant work evidence.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "workspace_uses.discover",
  "file": "discover-workspace-use-cases.command.md",
  "command": "изучи внутренние юзкейсы",
  "englishName": "discover workspace use cases",
  "commandFamily": [
    "изучи внутренние юзкейсы",
    "исследуй внутренние юзкейсы",
    "изучи workspace use cases",
    "discover workspace use cases"
  ],
  "description": "discover/review important Workspace uses and their architecture relevance",
  "meaning": "Invoke UC-PLAN-ARCH-WORKSPACE-USES to understand important current canonical Workspace UCs, architecture-relevant candidate useful results/types and qualitative importance/cost evidence without taking canonical Workspace UC establishment/change authority.",
  "activeContextBehavior": "Use the selected/current workspace/application realization target. Prefer concrete current canonical Workspace UCs and evidence-backed candidate useful results relevant to the target rather than scanning every repository capability.",
  "traversalReadMode": "Targeted/full by selected workspace area, current UC registry coverage and architecture relevance.",
  "ownerFiles": [
    "planning/documentation/architecture-planning/use-case-registry.md",
    "planning/documentation/architecture-planning/workspace-use-case-discovery-workflow.md",
    "planning/documentation/architecture-planning/workspace-use-cases-and-change-pressure.md"
  ],
  "expectedOutput": "Important current canonical Workspace UCs + architecture-relevant candidate useful results/types + relevance/frequency/importance/cost evidence when useful + canonical Workspace Planning handoff when establishment/change/topology is required.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Workspace Use Cases describe independently useful work/results with the Workspace; they are not Application user-visible Scenarios and not implementation tasks.",
    "Read/understand/find/trace/verify/diagnose work is first-class architecture evidence, not only mutation work.",
    "Architecture Planning consumes canonical Workspace UC identity and may surface candidates/types for analysis, but does not canonically establish/change ordinary Workspace UCs.",
    "Do not confuse current/candidate Workspace Uses with contextual WEUC evolution instances: use UC-PLAN-ARCH-DISCOVER-WEUC when the result needed is a concrete future change against a current/target owner/surface.",
    "No repository mutation, archive, commit or push is implied."
  ],
  "userTarget": "<workspace/application realization area whose internal useful-result picture matters>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
