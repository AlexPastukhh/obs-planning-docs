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
  "description": "direct Test Proof Lens coverage review",
  "meaning": "Resolve/reuse the natural host Target/context and apply LENS-TEST-PROOF-EVIDENCE to current selected semantics + actual tests/checks/Practical Evidence. Review coverage/freshness/assertion strength/wrong-layer/Escape/Refactor issues without creating a TM-TEST-COVERAGE Target.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Test Proof Lens review: property→actual Evidence mapping, material strong/partial/missing/stale/wrong-layer/weak-assertion findings and natural correction/revalidation destinations; no separate Coverage Target.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "This is a direct reusable Lens review, not a Test Coverage Target Module invocation.",
    "Actual tests/run Evidence remain Evidence Sources; green test names do not become semantic authority.",
    "Material gaps go through Core Finding Disposition to Exact Realization, optional Test Design, Practical Evidence or the challenged semantic owner.",
    "This command is read-only planning; it does not implement tests or execute them."
  ],
  "userTarget": "<selected semantic/Evidence coverage scope>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-TESTING",
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": {
    "whenToUse": "Use when you want to check whether current actual tests/Evidence really prove current semantic obligations, including freshness, assertion strength, false-confidence Escape Risk and refactor fragility.",
    "whatYouGet": "A Test Proof Lens coverage review and material Findings without creating a separate coverage owner/Target.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "lens",
      "sectionLabel": "IDTSPE Lens Checks — SDS",
      "sectionOrder": 9,
      "itemOrder": 2,
      "kindLabel": "IDTSPE LENS",
      "viewOrder": 1,
      "badges": [
        "DIRECT LENS REVIEW"
      ]
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "LENS",
    "targetModuleId": null,
    "lensId": "LENS-TEST-PROOF-EVIDENCE",
    "parentSurface": null,
    "hostTargetPolicy": "RESOLVE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
