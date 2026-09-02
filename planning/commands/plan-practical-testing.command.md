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
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-PRACTICAL-TEST.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Implemented Practical Evidence Intent/Real Subject + proportional Observation Plan and, only after real implementation exists, actual Evidence Results/Interpretation for acceptance and/or learning.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<one practical Evidence target>",
  "palette": true,
  "helperPresentation": {
    "whenToUse": "Use when the question/property genuinely requires observation of the real implemented system/environment; ordinary automated build/test Evidence inside Exact Realization is not enough or is not the inquiry.",
    "whatYouGet": "A real-subject practical Evidence inquiry/results, explicitly distinct from Prototype Evidence and from ordinary automated test execution.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "08",
      "sectionLabel": "08 Evidence & Coverage",
      "sectionOrder": 8,
      "itemOrder": 0,
      "kindLabel": "IDTSPE TARGET",
      "badges": [
        "CONDITIONAL",
        "IMPLEMENTED-EVIDENCE"
      ],
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-PRACTICAL-TEST",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
