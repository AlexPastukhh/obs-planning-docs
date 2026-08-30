# Plan Domain Tests

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.test.design.domain",
  "file": "plan-domain-tests.command.md",
  "command": "спланируй тесты домена",
  "englishName": "plan domain tests",
  "commandFamily": [
    "спланируй тесты домена"
  ],
  "description": "focused SDS target",
  "meaning": "Run focused optional TM-TEST-DESIGN intent without creating a new Target type.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-TEST-DESIGN.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Domain-focused Test Design, normally unit-test-oriented for isolated complex rules.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Use only when proof design is independently non-trivial; obvious unit/integration test realization may go directly to Exact Realization.",
    "LENS-TEST-PROOF-EVIDENCE owns proof-quality/risk evaluation; Test Design owns only the selected proof method.",
    "This command is read-only planning; exact test code/execution belongs to Exact Realization."
  ],
  "userTarget": "<Domain owner>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-TESTING",
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": {
    "whenToUse": "Use when a Domain owner needs focused unit/domain-rule proof design.",
    "whatYouGet": "Domain-focused Test Design, normally unit-test-oriented for isolated complex rules.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "05",
      "sectionLabel": "05 Proof Design",
      "sectionOrder": 5,
      "itemOrder": 1,
      "kindLabel": "IDTSPE TARGET · FOCUSED",
      "parentId": "test_design.plan",
      "viewOrder": 1,
      "badges": [
        "CONDITIONAL"
      ]
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE_FOCUSED",
    "targetModuleId": "TM-TEST-DESIGN",
    "lensId": null,
    "parentSurface": "test_design.plan",
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
