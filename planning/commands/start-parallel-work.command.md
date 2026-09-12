# Start Parallel Work — Legacy Compatibility

Status: legacy compatibility command definition
Scope: retired fixed parallel-work-scope invocation. No current branch-based coordination methodology is defined by this command.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "parallel_workspace.start",
  "file": "start-parallel-work.command.md",
  "command": "начни параллельную работу",
  "englishName": "start parallel work",
  "commandFamily": [
    "начни параллельную работу",
    "start parallel work",
    "parallel workspace"
  ],
  "description": "legacy compatibility command for retired fixed parallel-work scopes",
  "meaning": "Legacy fixed-parallel-scope trigger. The old Scope Registry/action-log architecture is retired. If the current work genuinely benefits from parallel lines, route through UC-IDTSPE-COMPOSE-CURRENT-WORK and current Work Context using multiple Targets and/or a Planning Branch only when their independent lifecycle/comparison value is material; otherwise continue one ordinary work line.",
  "activeContextBehavior": "Do not resurrect fixed registered scopes or legacy action logs. Re-evaluate current Use-Case composition; introduce multiple Targets/Planning Branch state only when the current Core applicability/materiality contracts justify them.",
  "traversalReadMode": "Current navigation only; legacy provenance may be read only when historical analysis is explicitly requested.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/compose-current-work-use-case.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/IDTSPE-SHELL.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md"
  ],
  "expectedOutput": "A current proportional work composition: one line when sufficient, or explicit multi-Target/Planning-Branch structure when independently useful. No fixed Scope Registry/action-log runtime.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Legacy compatibility alias only; fixed parallel-work scopes/action logs are retired.",
    "Multiple Targets or a Planning Branch are optional current IDTSPE structures, not a replacement fixed-scope runtime.",
    "Apply their local materiality gates; do not create parallel structure merely because this alias was used.",
    "This compatibility command grants no edit, archive, commit or push permission."
  ],
  "userTarget": "<parallel workstream target>",
  "palette": false,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
