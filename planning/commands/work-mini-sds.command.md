# Work In Mini Sds

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_sds.mini",
  "file": "work-mini-sds.command.md",
  "command": "мини сдс",
  "englishName": "work in mini SDS",
  "commandFamily": [
    "мини сдс",
    "mini sds",
    "work in mini sds"
  ],
  "description": "work in one-file Application SDS",
  "meaning": "Continue the current Application plan in Mini SDS: one complete accumulating application-plan file with the same semantic quality as larger profiles.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner/profile and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/application-planning/direction-registry.md",
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/idea-review-and-planning-workflow.md",
    "planning/documentation/profiles/sds-planning-profiles.md",
    "planning/documentation/architecture-planning/workspace-evolution-use-case-discovery-workflow.md",
    "planning/documentation/testing-planning/practical-testing-plan-workflow.md"
  ],
  "expectedOutput": "Updated one-file Current Application Plan containing the material Step 0–4 meaning, including Scenario DATA/Behavior and material WEUC/testing evidence.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Work on the one clearly selected accumulating Current Application Plan; this command changes the SDS physical/profile choice, not semantic authority.",
    "Preserve the full Step 0–4 Application planning reasoning: Why/Solution Discovery → Scenario + DATA/Behavior → Domain Draft → Slices + contextual WEUC/architecture evidence → Practical Realization Feedback.",
    "Scenario DATA and Behavior Items have the same quality requirement in Mini, Modular/Medium and Full SDS; profile changes must not summarize away reviewed meaning.",
    "Plan from Real-Life Need/situation into Scenario ownership before Domain/realization. Planning Concerns/Q/R/P remain a secondary owner-attached active/residual lens with shared grouping/priority/category/AI-comment/Decision-retention semantics; never the planning root.",
    "For architecture, prefer concrete contextual WEUC instances with likelihood/value/timing and expected Workspace Change Paths; generic future flexibility alone does not justify complexity.",
    "Do not claim implementation/testing occurred while planning. Practical execution/evidence remains downstream.",
    "Do not edit repository files, create an archive, commit or push.",
    "Mini is appropriate only while the full-quality plan remains genuinely small and reviewable in one file."
  ],
  "userTarget": "<Application / bounded change to plan in Mini SDS>",
  "palette": true,
  "refinements": [],
  "directionIds": [
    "DIR-PLAN-SOLUTION"
  ]
}
[/PLANNING_COMMAND_DEFINITION]
