# Plan Practical Test

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "practical_testing.plan",
  "file": "plan-practical-testing.command.md",
  "command": "спланируй практический тест",
  "englishName": "plan practical test",
  "commandFamily": [
    "спланируй практический тест",
    "план практического тестирования"
  ],
  "description": "implemented practical evidence",
  "meaning": "Run TM-PRACTICAL-TEST as the implemented-practical-Evidence pair to Prototype: plan the inquiry when useful, but collect actual Evidence/results only from the real implemented subject/environment.",
  "activeContextBehavior": "Treat the explicit command as selected invocation intent inside always-active IDTSPE. Re-evaluate current Use-Case composition, resolve/reuse a natural Target/context only when useful, confirm the selected Target Module Entry Point/local applicability gate, and then resolve CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from actual current Target state. Do not create a Target or Result Unit merely because the command exists.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-PRACTICAL-TEST.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md"
  ],
  "expectedOutput": "Implemented Practical Evidence Intent/Real Subject + proportional Observation Plan and, only after real implementation exists, actual Evidence Results/Interpretation for acceptance and/or learning.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI-proposed material candidates are Proposals by default; selection makes them accepted planning meaning only through normal authority. Under SDS, unrealized selected future meaning stays in the applicable Evolution Step/Target Body until realization/materialization rather than becoming current-owner truth merely by selection.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<one practical Evidence target>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-PRACTICAL-TEST",
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
      "responsibilityId": "TM-PRACTICAL-TEST",
      "path": "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-PRACTICAL-TEST.md",
      "anchor": "tm-practical-test-implemented-practical-evidence-acceptance",
      "why": "Concrete Target Module Model semantics selected by this command; shared port/registry/Meta-Model references are inherited from included commands.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
