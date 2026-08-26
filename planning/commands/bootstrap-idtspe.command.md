# Bootstrap Idtspe

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.bootstrap",
  "file": "bootstrap-idtspe.command.md",
  "command": "бутстреп idtspe",
  "englishName": "bootstrap IDTSPE",
  "commandFamily": [
    "бутстреп idtspe",
    "bootstrap idtspe"
  ],
  "description": "Load generic IDTSPE Core orientation.",
  "meaning": "Establish or refresh generic IDTSPE Core governance and installed profile indexes without selecting a concrete Target.",
  "activeContextBehavior": "Load or refresh IDTSPE governance only. If a current Target/context already exists, report or reuse it for orientation without changing it. If no Target exists, stop ready for later planning. Do not perform Target Formation, select a Target, infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR, or execute Target work.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/BOOTSTRAP-IDTSPE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Compact IDTSPE governance assimilation, installed profiles, permission boundary and current Target context when any.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "Bootstrap is governance orientation only: no Target Formation, invocation-mode selection or Target execution.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<IDTSPE governance / no Target required>",
  "palette": true,
  "directionIds": [
    "DIR-REPOSITORY"
  ],
  "helperPresentation": {
    "whenToUse": "When IDTSPE governance is not current or you want explicit orientation before planning.",
    "whatYouGet": "Compact IDTSPE governance assimilation, installed profiles, permission boundary and current Target context when any.",
    "navigation": {
      "viewId": "IDTSPE",
      "viewLabel": "IDTSPE",
      "sectionId": "core",
      "sectionLabel": "IDTSPE Core",
      "sectionOrder": 0,
      "itemOrder": 0,
      "kindLabel": "BOOTSTRAP",
      "viewOrder": 0
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "BOOTSTRAP",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "NONE"
  }
}
[/PLANNING_COMMAND_DEFINITION]
