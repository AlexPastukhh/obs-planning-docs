# Plan Testing Strategy

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "testing_strategy.plan",
  "file": "plan-testing-strategy.command.md",
  "command": "спланируй стратегию тестирования",
  "englishName": "plan testing strategy",
  "commandFamily": [
    "спланируй стратегию тестирования",
    "стратегия тестирования"
  ],
  "description": "test strategy",
  "meaning": "Run TM-TEST-STRATEGY through the IDTSPE Shell for the selected target.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-TEST-STRATEGY.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Testing Strategy or a valid no-Strategy result routing proof design locally; when useful, include a compact Test Realization / Topology Registry mapping Slice/Domain proof owners to concrete test suites/classes/setups/fixtures/harnesses/helpers, with optional promoted supporting map only under independent pressure.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "When shared test realization mapping is useful, reference concrete test classes/setups/helpers from the Strategy; do not copy test bodies or make test code semantic authority.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<one shared testing strategy>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-TESTING",
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": {
    "whenToUse": "Use when proof concerns genuinely need a shared cross-owner strategy/environment/layer policy or when the cross-Slice test-realization topology is hard to understand from code alone.",
    "whatYouGet": "Testing Strategy or a valid no-Strategy result; when useful, a compact registry-like map of Slice/Domain proof → test suite/class → setup/fixture/harness/helper without duplicating test bodies.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "06",
      "sectionLabel": "06 Slice Portfolio",
      "sectionOrder": 6,
      "itemOrder": 1,
      "kindLabel": "IDTSPE TARGET",
      "badges": [
        "CONDITIONAL"
      ],
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-TEST-STRATEGY",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
