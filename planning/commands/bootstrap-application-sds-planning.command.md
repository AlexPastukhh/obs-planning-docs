# Bootstrap Sds Planning

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

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
  "meaning": "Refresh SDS governance over always-active IDTSPE Core: the 13 active SDS Target Modules plus inherited generic Core TM-PRE-UPDATE-PLAN and TM-EXACT-REALIZATION, the current SDS Lens pack, profile registry directory, semantic composition/readiness guidance and representation/materialization policy. This is governance bootstrap, not task-specific planning execution.",
  "activeContextBehavior": "Load or refresh SDS profile governance only. The SDS README assumes the primary bootstrap is current; if not, follow its prerequisite back to planning/README.md first. Preserve current Use-Case-driven Work Context if one exists. Do not perform Target Formation, select a Target, infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR, or execute a Target Module merely because bootstrap was requested.",
  "traversalReadMode": "Reuse current reliable SDS governance and current IDTSPE Core context; targeted refresh of the selected owner route when uncertain; full SDS governance preflight only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/README.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Compact SDS profile assimilation with current/next owner context when any; no task-specific Target is invented.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Bootstrap is governance orientation only; IDTSPE is already active.",
    "The active SDS baseline has 13 profile Target Modules plus 2 inherited generic Core Target Modules.",
    "SDS has no separate runtime methodology Use Cases in the current baseline; IDTSPE Use Cases compose SDS components.",
    "Do not infer a fixed Mini/Modular/Full workflow or mandatory Target sequence.",
    "This command grants no repository mutation, implementation, test, commit or push permission."
  ],
  "userTarget": "<SDS profile governance / no Target required>",
  "palette": true,
  "helperPresentation": {
    "whenToUse": "When SDS profile governance is not current or you want explicit orientation before Application/Scenario/Domain/Slice planning.",
    "whatYouGet": "Compact SDS profile assimilation with current/next owner context when any; no task-specific Target is invented.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "00",
      "sectionLabel": "00 Bootstrap",
      "sectionOrder": 0,
      "itemOrder": 0,
      "kindLabel": "BOOTSTRAP",
      "badges": [
        "SDS PROFILE"
      ],
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "BOOTSTRAP",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "NONE"
  }
}
[/PLANNING_COMMAND_DEFINITION]
