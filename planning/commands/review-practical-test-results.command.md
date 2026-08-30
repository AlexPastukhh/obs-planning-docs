# Review Practical Test Results

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.test.practical.review",
  "file": "review-practical-test-results.command.md",
  "command": "разбери результаты практического теста",
  "englishName": "review practical test results",
  "commandFamily": [
    "разбери результаты практического теста"
  ],
  "description": "focused SDS target",
  "meaning": "Run focused TM-PRACTICAL-TEST results interpretation for actual implemented Evidence without creating a new Target type.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-PRACTICAL-TEST.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Evidence Results / Interpretation: acceptance and/or learning, limitations/confounders, residual questions and revalidation/follow-up; not restricted to pass/fail.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<practical test with actual Evidence>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-TESTING",
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": {
    "whenToUse": "Use when the real implemented subject has produced actual observations/data that should update the same TM-PRACTICAL-TEST Target.",
    "whatYouGet": "Implemented Evidence interpretation for acceptance and/or learning, limitations/confounders, residual questions and revalidation/follow-up.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "08",
      "sectionLabel": "08 Evidence & Coverage",
      "sectionOrder": 8,
      "itemOrder": 1,
      "kindLabel": "IDTSPE TARGET · FOCUSED",
      "parentId": "practical_testing.plan",
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE_FOCUSED",
    "targetModuleId": "TM-PRACTICAL-TEST",
    "lensId": null,
    "parentSurface": "practical_testing.plan",
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
