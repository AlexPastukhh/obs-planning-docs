# Maintain Application Evolution Map

Status: active project command definition
Scope: one concrete OBS Planning command route.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_evolution_map.maintain",
  "file": "maintain-application-evolution-map.command.md",
  "command": "веди карту эволюции приложения",
  "englishName": "maintain application evolution map",
  "commandFamily": [
    "веди карту эволюции приложения"
  ],
  "description": "Direct SDS evolution-map planning route",
  "meaning": "Maintain the accepted Application-development manifest, material Application/Scenario driver coverage and concrete Step routing/readiness without copying Step Target Bodies.",
  "activeContextBehavior": "Treat the explicit command as selected invocation intent inside always-active IDTSPE. Re-evaluate current Use-Case composition, resolve/reuse a natural Target/context only when useful, confirm the selected Target Module Entry Point/local applicability gate, and then resolve CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from actual current Target state. Do not create a Target or Result Unit merely because the command exists.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEPS-MAP.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md"
  ],
  "expectedOutput": "One bounded Evolution Steps Map with driver coverage, concrete Step refs and later UNESTABLISHED horizon when applicable.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI-proposed material candidates are Proposals by default; selection makes them accepted planning meaning only through normal authority. Under SDS, unrealized selected future meaning stays in the applicable Evolution Step/Target Body until realization/materialization rather than becoming current-owner truth merely by selection.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<Application development / concrete evolution-map context>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-EVOLUTION-STEPS-MAP",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  },
  "includes": [
    "planning/commands/apply-idtspe-target-module.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "TM-EVOLUTION-STEPS-MAP",
      "path": "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-EVOLUTION-STEPS-MAP.md",
      "anchor": "tm-evolution-steps-map",
      "why": "Direct route to the natural SDS Target Module owner.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
