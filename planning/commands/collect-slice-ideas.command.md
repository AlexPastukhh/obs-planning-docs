# Collect Slice Ideas

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "ideas.collect.slice",
  "file": "collect-slice-ideas.command.md",
  "command": "собери идеи слайса",
  "englishName": "collect slice ideas",
  "commandFamily": [
    "собери идеи слайса",
    "slice ideas"
  ],
  "description": "accumulate Ideas around Slice Strategy or one implementation Slice",
  "meaning": "Run the shared collect-ideas shell with the integration target fixed to Slice Strategy when decomposition is unresolved, otherwise to one selected Slice. Integrate vertical useful-result boundaries, dependencies, technical sequence, proof obligations and material Architecture/Testing evidence through their current UCs.",
  "activeContextBehavior": "Use selected Scenario/Behavior/Requirements and Domain meaning when material. Route architecture/testing questions to their current registries; do not copy those methodologies into the command or let technical sequencing redefine product priority.",
  "traversalReadMode": "Targeted/full by selected owner, current-plan uncertainty and source-justified planning depth.",
  "ownerFiles": [
    "planning/documentation/planning-concerns-and-decisions-model.md",
    "planning/documentation/idea-planning-principles-and-terminology.md",
    "planning/documentation/idea-review-and-planning-workflow.md",
    "planning/documentation/IDEA-REVIEW-TEMPLATE.md",
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/application-planning/slice-planning-workflow.md",
    "planning/documentation/application-planning/templates/SLICE-STRATEGY-DRAFT-TEMPLATE.md",
    "planning/documentation/application-planning/templates/IMPLEMENTATION-SLICE-DRAFT-TEMPLATE.md",
    "planning/documentation/architecture-planning/use-case-registry.md",
    "planning/documentation/testing-planning/use-case-registry.md"
  ],
  "expectedOutput": "Reviewed Slice Ideas + selected/current Slice Strategy or Slice integration + dependencies/technical sequence/proof obligations + Q/R/P/Decisions + material Architecture/Testing handoffs.",
  "permissionMode": "read-only",
  "keyReminders": [
    "This is a high-level accumulator/orchestration command, not a new semantic Use Case. Follow the current canonical UC/Scenario owners linked by ownerFiles.",
    "Product/Scenario priority is upstream input and is distinct from recommended technical implementation sequence.",
    "Testing Strategy/Test Design/Practical Test Plan may be Step-3 planning evidence when material; actual coverage/executed evidence remains downstream.",
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
