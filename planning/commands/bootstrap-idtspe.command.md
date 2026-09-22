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
  "description": "Load the primary planning bootstrap through IDTSPE Core, excluding profiles.",
  "meaning": "Establish or refresh the primary planning environment from planning/README.md: Session ambient rules, repository working contract, generic Documentation navigation and IDTSPE Core. Stop before profile bootstrap and do not select a concrete Target.",
  "activeContextBehavior": "Load or refresh the primary generic governance bootstrap only. If a current Target/context already exists, report or reuse it for orientation without changing it. If no Target exists, stop ready for later planning. Do not perform Target Formation, select a Target, infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR, or execute Target work.",
  "traversalReadMode": "Reuse a current reliable primary bootstrap; otherwise read planning/README.md and follow its child README read sets. Do not bootstrap an installed profile unless it is separately applicable.",
  "ownerFiles": [
    "planning/README.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md"
  ],
  "expectedOutput": "Primary bootstrap current through IDTSPE Core, with Session/Documentation/Core boundaries understood and no profile selected by bootstrap.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI-proposed material candidates are Proposals by default; selection makes them accepted planning meaning only through normal authority. Under SDS, unrealized selected future meaning stays in the applicable Evolution Step/Target Body until realization/materialization rather than becoming current-owner truth merely by selection.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "Bootstrap is governance orientation only: no Target Formation, invocation-mode selection or Target execution.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<IDTSPE governance / no Target required>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
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
      "responsibilityId": "IDTSPE.COMMAND-SURFACE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md",
      "anchor": "idtspe-command-surface",
      "why": "Defines the canonical IDTSPE command surface and bootstrap/work boundary used by this command.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
