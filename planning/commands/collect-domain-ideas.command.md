# Collect Domain Ideas

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "ideas.collect.domain",
  "file": "collect-domain-ideas.command.md",
  "command": "собери идеи домена",
  "englishName": "collect domain ideas",
  "commandFamily": [
    "собери идеи домена",
    "domain ideas"
  ],
  "description": "accumulate Ideas around evidence-backed Domain meaning",
  "meaning": "Run the shared collect-ideas shell with the integration target fixed to Domain meaning. Use Domain Discovery when candidate exploration is useful, then integrate selected/current concepts, identity/lifecycle, rules/invariants/policies and VO/Aggregate/Root/ownership boundaries only when evidence justifies them.",
  "activeContextBehavior": "Use current Scenario/DATA/Behavior/Requirements and existing Domain meaning as evidence. Discovery is proportional; no explicit Aggregate is a valid result. Stop before Slice planning unless scope is expanded.",
  "traversalReadMode": "Targeted/full by selected owner, current-plan uncertainty and source-justified planning depth.",
  "ownerFiles": [
    "planning/documentation/planning-concerns-and-decisions-model.md",
    "planning/documentation/idea-planning-principles-and-terminology.md",
    "planning/documentation/idea-review-and-planning-workflow.md",
    "planning/documentation/IDEA-REVIEW-TEMPLATE.md",
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/application-planning/application-planning-principles-and-terminology.md",
    "planning/documentation/application-planning/domain-discovery-workflow.md",
    "planning/documentation/application-planning/domain-planning-workflow.md",
    "planning/documentation/application-planning/templates/DOMAIN-DRAFT-TEMPLATE.md"
  ],
  "expectedOutput": "Reviewed Domain Ideas + evidence/candidates when useful + current/preliminary selected Domain meaning + Q/R/P/Decisions + realization handoffs.",
  "permissionMode": "read-only",
  "keyReminders": [
    "This is a high-level accumulator/orchestration command, not a new semantic Use Case. Follow the current canonical UC/Scenario owners linked by ownerFiles.",
    "Do not infer Domain entities/ownership from nouns, tables, ORM or database shape alone.",
    "Select/split/merge/reject candidates from behavior/state/rule evidence; `no explicit Aggregate needed` remains valid.",
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
