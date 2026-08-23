# Collect Modular Application Plan

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "ideas.collect.application.modular",
  "file": "collect-modular-application-ideas.command.md",
  "command": "собери модульный план приложения",
  "englishName": "collect modular application plan",
  "commandFamily": [
    "собери модульный план приложения",
    "собери идеи приложения модульно",
    "собери модульные идеи приложения",
    "modular application ideas"
  ],
  "description": "coordinate Scenario → Domain → Slice Idea accumulators in a Modular Application plan",
  "meaning": "Coordinate the existing collect-ideas Scenario, Domain and Slice semantic routes as one high-level Modular Application planning pass. Preserve one Application Current Plan while making Scenario/Domain/Slice work areas independently addressable; Ideas, concerns and Decisions may be split by area when useful without forcing one file per entity.",
  "activeContextBehavior": "Use the selected Application and Modular/Medium SDS profile as the physical/addressability preference. Run focused Scenario → Domain → Slice passes only where each area is material, then integrate cross-area conclusions. Exact filenames remain contextual and are selected only in explicit Pre-Update.",
  "traversalReadMode": "Reuse current reliable SDS governance; targeted refresh by selected owner/current-plan uncertainty/source-justified planning depth; full SDS governance preflight only when no reliable sufficient pass exists.",
  "ownerFiles": [
    "planning/documentation/application-planning/application-planning-governance-read-workflow.md",
    "planning/documentation/planning-concerns-and-decisions-model.md",
    "planning/documentation/idea-planning-principles-and-terminology.md",
    "planning/documentation/idea-review-and-planning-workflow.md",
    "planning/documentation/IDEA-REVIEW-TEMPLATE.md",
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/application-planning/detailed-planning/README.md",
    "planning/documentation/application-planning/domain-discovery-workflow.md",
    "planning/documentation/application-planning/domain-planning-workflow.md",
    "planning/documentation/application-planning/slice-planning-workflow.md",
    "planning/documentation/profiles/sds-planning-profiles.md",
    "planning/documentation/architecture-planning/use-case-registry.md",
    "planning/documentation/testing-planning/use-case-registry.md"
  ],
  "expectedOutput": "One Modular Application Current Plan with coordinated Scenario/Domain/Slice Idea work areas, per-area semantic integration/Q/R/P/Decision trace and cross-area conclusions; no fixed file count and no automatic Pre-Update.",
  "permissionMode": "read-only",
  "keyReminders": [
    "This result-producing command explicitly depends on complete SDS governance: reuse a reliable prior pass, refresh only affected governance when material, and perform the full SDS preflight internally only when no reliable sufficient pass exists; do not ask the user to invoke `бутстреп сдс` separately.",
    "This is a high-level accumulator/orchestration command, not a new semantic Use Case. Follow the current canonical UC/Scenario owners linked by ownerFiles.",
    "This command is an orchestration/profile shortcut over existing semantic UCs; do not create a Modular-Application semantic UC for it.",
    "Prefer separately addressable Scenario/Domain/Slice Idea/Concern/Decision work areas when reviewability benefits, but do not mandate `ideas.md`, `concerns.md` and `decisions.md` everywhere.",
    "Use one accumulating Current Plan for the selected target; do not create an append-only command-result ledger.",
    "Use the shared Planning Concern/Decision model for Q/R/P, grouping, Priority/Category/Status, AI Comment, Decision and retained/residual trace.",
    "Automatic scope stops after the selected/source-justified semantic integration. Exact repository files/actions require explicit Pre-Update; implementation/executed proof/ReviewDiff evidence is downstream and explicit.",
    "Do not edit repository files, create an archive, commit or push."
  ],
  "userTarget": "<selected source/current planning target>",
  "palette": true,
  "refinements": [],
  "directionIds": [
    "DIR-PLAN-SOLUTION"
  ]
}
[/PLANNING_COMMAND_DEFINITION]
