# Bootstrap Sds Planning

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

Repository: [obs-planning-docs](https://github.com/AlexPastukhh/obs-planning-docs). The user's bootstrap message may include an attached repository snapshot; check for it and identify its revision before treating it as current repository state.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_sds.bootstrap",
  "file": "bootstrap-application-sds-planning.command.md",
  "command": "бутстреп sds",
  "englishName": "bootstrap SDS planning",
  "commandFamily": [
    "бутстреп sds",
    "бутстреп сдс",
    "bootstrap SDS planning"
  ],
  "description": "Load the SDS profile over IDTSPE Core.",
  "meaning": "Refresh SDS governance over always-active IDTSPE Core: the current profile Target Module and Lens registries, profile registry directory and semantic composition/readiness guidance. Resolve optional inherited Core components and representation/materialization policy from their current owners only when applicable. This is governance bootstrap, not task-specific planning execution.",
  "activeContextBehavior": "Load or refresh SDS profile governance only. The SDS README assumes the primary bootstrap is current; if not, follow its prerequisite back to planning/README.md first. Preserve current Use-Case-driven Work Context if one exists. Do not perform Target Formation, select a Target, infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR, or execute a Target Module merely because bootstrap was requested.",
  "traversalReadMode": "Reuse current reliable SDS governance and current IDTSPE Core context; targeted refresh of the selected owner route when uncertain; full SDS governance preflight only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/README.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md"
  ],
  "expectedOutput": "Compact SDS profile assimilation with current/next owner context when any; no task-specific Target is invented.",
  "permissionMode": "read-only",
  "keyReminders": [
    "The user may have attached a repository snapshot to the bootstrap message. Check for it and identify its revision before treating it as current repository state; the repository URL is https://github.com/AlexPastukhh/obs-planning-docs.",
    "Bootstrap is governance orientation only; IDTSPE is already active.",
    "Read the current SDS and Core registries for applicable Target Modules and Lenses; do not use a frozen inventory in this command.",
    "SDS has no separate runtime methodology Use Cases in the current baseline; IDTSPE Use Cases compose SDS components.",
    "Do not infer a fixed Mini/Modular/Full workflow or mandatory Target sequence.",
    "This command grants no repository mutation, implementation, test, commit or push permission."
  ],
  "userTarget": "<SDS profile governance / no Target required>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "BOOTSTRAP",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "NONE"
  },
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "SDS.PROFILE-BOOTSTRAP",
      "path": "planning/documentation/idtspe-methodology/active/profiles/sds/README.md",
      "anchor": "sds-profile-bootstrap",
      "why": "Defines the SDS profile bootstrap and the profile-local methodology surface this command activates.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
