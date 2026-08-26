# Review Test Coverage

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "test_coverage.review",
  "file": "review-test-coverage.command.md",
  "command": "проверь тестовое покрытие",
  "englishName": "review test coverage",
  "commandFamily": [
    "проверь тестовое покрытие"
  ],
  "description": "test coverage",
  "meaning": "Run TM-TEST-COVERAGE through the IDTSPE Shell for the selected target.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-TEST-COVERAGE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Coverage review, uncovered/overstated proof, Evidence gaps and upstream correction/revalidation routes.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<selected semantic/Evidence coverage scope>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-TESTING",
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": {
    "whenToUse": "Use when implemented/planned proof coverage should be reconciled against semantic obligations and Evidence.",
    "whatYouGet": "Coverage review, uncovered/overstated proof, Evidence gaps and upstream correction/revalidation routes.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "08",
      "sectionLabel": "08 Evidence & Coverage",
      "sectionOrder": 8,
      "itemOrder": 2,
      "kindLabel": "IDTSPE TARGET",
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-TEST-COVERAGE",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
