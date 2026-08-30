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
  "meaning": "Run the SDS governance bootstrap over IDTSPE Core: establish or refresh the 15 SDS Target Modules plus inherited generic Core TM-PRE-UPDATE-PLAN and TM-EXACT-REALIZATION, SDS Lens pack, directed workflow and representation/materialization policy. This is governance bootstrap, not selection of the Full SDS profile and not task-specific planning execution.",
  "activeContextBehavior": "Load or refresh SDS profile governance over IDTSPE Core only. If a current Target/context already exists, report or reuse it for orientation without changing it. If no Target exists, stop ready for later SDS planning. Do not perform Target Formation, select a Target, infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR, or execute a Target Module.",
  "traversalReadMode": "Reuse current reliable SDS governance and current IDTSPE Core context; targeted refresh of the selected owner route when uncertain; full SDS governance preflight only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/BOOTSTRAP-SDS.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Compact SDS profile assimilation with current/next owner context when any; no task-specific Target is invented.",
  "permissionMode": "read-only",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "Bootstrap is governance orientation only: no Target Formation, invocation-mode selection or Target Module execution.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<SDS profile governance / no Target required>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-SOLUTION"
  ],
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
