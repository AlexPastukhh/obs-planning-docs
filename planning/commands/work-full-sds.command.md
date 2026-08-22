# Work In Full Sds

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_sds.full",
  "file": "work-full-sds.command.md",
  "command": "фулл сдс",
  "englishName": "work in full SDS",
  "commandFamily": [
    "фулл сдс",
    "full sds",
    "work in full sds"
  ],
  "description": "work in rich Full Application SDS",
  "meaning": "Continue the current Application plan in Full SDS using rich stable Scenario/DATA/Behavior/Requirement/Screen/Domain/Slice owners and durable architecture/testing evidence where justified.",
  "activeContextBehavior": "Use the clearly selected/current target and accumulating plan; ask only when target identity is genuinely ambiguous.",
  "traversalReadMode": "Targeted/full by selected owner/profile and current-plan uncertainty.",
  "ownerFiles": [
    "planning/documentation/application-planning/direction-registry.md",
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/idea-review-and-planning-workflow.md",
    "planning/documentation/profiles/sds-planning-profiles.md",
    "planning/documentation/architecture-planning/workspace-evolution-use-case-discovery-workflow.md",
    "planning/documentation/testing-planning/practical-testing-plan-workflow.md",
    "planning/documentation/profiles/scenario-domain-slice-docs-profile.md",
    "planning/documentation/architecture-planning/templates/WEUC-INSTANCE-REGISTER-TEMPLATE.md"
  ],
  "expectedOutput": "Updated Full SDS owner topology preserving the same Step 0–4 meaning, with material contextual WEUC instances transferred to the project-local register and architecture decisions linked to driving evidence.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Work on the one clearly selected accumulating Current Application Plan; this command changes the SDS physical/profile choice, not semantic authority.",
    "Preserve the full Step 0–4 Application planning reasoning: Why/Solution Discovery → Scenario + DATA/Behavior → Domain Draft → Slices + contextual WEUC/architecture evidence → Practical Realization Feedback.",
    "Scenario DATA and Behavior Items have the same quality requirement in Mini, Modular/Medium and Full SDS; profile changes must not summarize away reviewed meaning.",
    "Plan from Real-Life Need/situation into Scenario ownership before Domain/realization. Q/R/P stays attached unresolved/adverse delta, never the planning root.",
    "For architecture, prefer concrete contextual WEUC instances with likelihood/value/timing and expected Workspace Change Paths; generic future flexibility alone does not justify complexity.",
    "Do not claim implementation/testing occurred while planning. Practical execution/evidence remains downstream.",
    "Do not edit repository files, create an archive, commit or push.",
    "Full increases addressability, not semantic quality. Transfer material durable contextual WEUC instances into the project-local WEUC Instance Register; do not leave architecture decisions justified only by abstract axes."
  ],
  "userTarget": "<Application to plan in Full SDS>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
