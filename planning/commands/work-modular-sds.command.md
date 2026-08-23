# Work In Modular Sds

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_sds.modular",
  "file": "work-modular-sds.command.md",
  "command": "модульный сдс",
  "englishName": "work in modular SDS",
  "commandFamily": [
    "модульный сдс",
    "медиум сдс",
    "modular sds",
    "medium sds",
    "work in modular sds",
    "work in medium sds"
  ],
  "description": "work in Modular/Medium Application SDS",
  "meaning": "Continue the current Application plan in Modular/Medium SDS: same-quality planning split into a small file set that grows only as reviewability requires.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Reuse current reliable SDS governance; targeted refresh by selected owner/profile and current-plan uncertainty; full SDS governance preflight only when no reliable sufficient pass exists.",
  "ownerFiles": [
    "planning/documentation/application-planning/application-planning-governance-read-workflow.md",
    "planning/documentation/application-planning/direction-registry.md",
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/idea-review-and-planning-workflow.md",
    "planning/documentation/profiles/sds-planning-profiles.md",
    "planning/documentation/architecture-planning/workspace-evolution-use-case-discovery-workflow.md",
    "planning/documentation/testing-planning/practical-testing-plan-workflow.md"
  ],
  "expectedOutput": "Updated Modular/Medium Current Application Plan, normally application-plan + domain-draft + slice file(s), with extra WEUC/order/testing/scenario files only when useful.",
  "permissionMode": "read-only",
  "keyReminders": [
    "This result-producing command assumes current SDS governance: reuse a reliable prior pass, refresh only affected governance when material, and perform the full SDS preflight internally only when no reliable sufficient pass exists; do not ask the user to invoke `бутстреп сдс` separately.",
    "Work on the one clearly selected accumulating Current Application Plan; this command changes the SDS physical/profile choice, not semantic authority.",
    "Preserve the full Step 0–4 Application planning reasoning: Why/Solution Discovery → Scenario + DATA/Behavior → Domain Draft → Slices + contextual WEUC/architecture evidence → Practical Realization Feedback.",
    "Scenario DATA and Behavior Items have the same quality requirement in Mini, Modular/Medium and Full SDS; profile changes must not summarize away reviewed meaning.",
    "Plan from Real-Life Need/situation into Scenario ownership before Domain/realization. Planning Concerns/Q/R/P remain a secondary owner-attached active/residual lens with shared grouping/priority/category/AI-comment/Decision-retention semantics; never the planning root.",
    "For architecture, prefer concrete contextual WEUC instances with likelihood/value/timing and expected Workspace Change Paths; generic future flexibility alone does not justify complexity.",
    "Do not claim implementation/testing occurred while planning. Practical execution/evidence remains downstream.",
    "Do not edit repository files, create an archive, commit or push.",
    "Default physical split: application-plan.md owns Step 0 + Scenario/DATA/Behavior; domain-draft.md owns Step 2; slices.md or slices/ owns Step 3. Grow further only when useful."
  ],
  "userTarget": "<Application / bounded change to plan in Modular/Medium SDS>",
  "palette": true,
  "refinements": [],
  "directionIds": [
    "DIR-PLAN-SOLUTION"
  ]
}
[/PLANNING_COMMAND_DEFINITION]
