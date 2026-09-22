# Define Application

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.application.definition",
  "file": "define-application.command.md",
  "command": "определи приложение",
  "englishName": "define application",
  "commandFamily": [
    "определи приложение"
  ],
  "description": "application definition",
  "meaning": "Run TM-APPLICATION-DEFINITION through current Use-Case-driven IDTSPE composition and the selected Target Module entry point for the selected target.",
  "activeContextBehavior": "Treat the explicit command as selected invocation intent inside always-active IDTSPE. Re-evaluate current Use-Case composition, resolve/reuse a natural Target/context only when useful, confirm the selected Target Module Entry Point/local applicability gate, and then resolve CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from actual current Target state. Do not create a Target or Result Unit merely because the command exists.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md"
  ],
  "expectedOutput": "Application Definition with need/value/scope, selected responsibility, material alternatives, Q/R/P and Decisions.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI-proposed material candidates are Proposals by default; selection makes them accepted planning meaning only through normal authority. Under SDS, unrealized selected future meaning stays in the applicable Evolution Step/Target Body until realization/materialization rather than becoming current-owner truth merely by selection.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<one Application Definition>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-APPLICATION-DEFINITION",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  },
  "includes": [
    "idtspe.work",
    "idtspe.port-composition.recheck",
    "idtspe.port.trace",
    "idtspe.port.target",
    "idtspe.target-module.apply"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "TM-APPLICATION-DEFINITION",
      "path": "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md",
      "anchor": "tm-application-definition-application-definition",
      "why": "Concrete Target Module Model semantics selected by this command; shared port/registry/Meta-Model references are inherited from included commands.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
