# Collect Scenario Ideas

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "ideas.collect.scenario",
  "file": "collect-scenario-ideas.command.md",
  "command": "собери идеи сценария",
  "englishName": "collect scenario ideas",
  "commandFamily": [
    "собери идеи сценария",
    "scenario ideas"
  ],
  "description": "accumulate Ideas around Application Scenario meaning",
  "meaning": "Run the shared collect-ideas shell with the integration target fixed to an Application Scenario. Integrate Ideas into observable actor/user goal/result behavior, Scenario DATA and Behavior Items, adding Requirements/Screens when material; preserve Domain/Slice findings as downstream handoffs.",
  "activeContextBehavior": "Use the clearly selected/current Scenario, or identify the candidate Scenario when the source makes it clear. Do not broaden into Domain/Slice planning merely because downstream implications are visible.",
  "traversalReadMode": "Targeted/full by selected owner, current-plan uncertainty and source-justified planning depth.",
  "ownerFiles": [
    "planning/documentation/planning-concerns-and-decisions-model.md",
    "planning/documentation/idea-planning-principles-and-terminology.md",
    "planning/documentation/idea-review-and-planning-workflow.md",
    "planning/documentation/IDEA-REVIEW-TEMPLATE.md",
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/application-planning/application-planning-principles-and-terminology.md",
    "planning/documentation/application-planning/detailed-planning/README.md",
    "planning/documentation/application-planning/templates/SCENARIO-DRAFT-TEMPLATE.md"
  ],
  "expectedOutput": "Reviewed Scenario Ideas + current/preliminary Scenario integration + DATA/Behavior + material Requirements/Screens + Q/R/P/Decisions + downstream handoffs.",
  "permissionMode": "read-only",
  "keyReminders": [
    "This is a high-level accumulator/orchestration command, not a new semantic Use Case. Follow the current canonical UC/Scenario owners linked by ownerFiles.",
    "Scenario identity is a user/actor Need/goal/desired result reached through observable useful behavior; internal implementation operations are not Scenarios by themselves.",
    "Stop before Domain planning unless the user intentionally expands scope.",
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
