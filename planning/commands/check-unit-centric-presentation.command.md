# check target presentation

Status: active project command definition; semantic behavior remains in linked owners.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "lenscmd.unit.centric.presentation.check",
  "file": "check-unit-centric-presentation.command.md",
  "command": "проверь представление таргета",
  "englishName": "check target presentation",
  "commandFamily": [
    "проверь представление таргета",
    "проверь юнит-центричность",
    "check target presentation"
  ],
  "description": "Check Unit visibility and supporting-context disclosure",
  "meaning": "Apply LENS-UNIT-CENTRIC-PRESENTATION with CHECK to the supplied Target presentation; return located findings and proposed formatting adjustments under its criteria.",
  "activeContextBehavior": "Reuse the supplied Target presentation/owner context. Do not create a Target merely to check formatting. Preserve accepted content and authority.",
  "traversalReadMode": "Read the selected Lens and its required owner references; reuse current shared governance from the included Lens dispatcher.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/frequent/LENS-UNIT-CENTRIC-PRESENTATION.md"
  ],
  "expectedOutput": "Presentation check with precise locations, suggested corrections and any renderer uncertainty; a checked no-change result is valid.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Use CHECK for this shortcut; generic Lens invocation remains available for other supported operations.",
    "All disclosure criteria are owned by the linked Lens.",
    "Do not create a Target or mutate files under this check command."
  ],
  "userTarget": "<Target presentation / document / chat result>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "LENS",
    "targetModuleId": null,
    "lensId": "LENS-UNIT-CENTRIC-PRESENTATION",
    "parentSurface": null,
    "hostTargetPolicy": "RESOLVE_OR_REUSE_TARGET"
  },
  "includes": [
    "planning/commands/apply-idtspe-lens.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "LENS-UNIT-CENTRIC-PRESENTATION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/frequent/LENS-UNIT-CENTRIC-PRESENTATION.md",
      "anchor": "lens-unit-centric-presentation",
      "why": "Owns the presentation criteria and CHECK method; shared Lens lifecycle/registry routes are inherited from the dispatcher.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
