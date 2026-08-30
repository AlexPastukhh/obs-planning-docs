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
  "meaning": "Run conditional TM-TEST-STRATEGY only when several semantic owners/Slices genuinely need one shared proof-layer/non-duplication/environment/harness strategy. Skip it when proof is local/obvious.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-TEST-STRATEGY.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "One compact Shared Proof Strategy or a valid no-Strategy result routing proof locally; concrete test classes/helpers remain code authority and no class-level test-realization registry is required.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Use this Target only for independently useful shared testing responsibility/policy across several proofs; ordinary local proof does not require Strategy.",
    "Testing Knowledge Basis owns reusable mechanics and LENS-TEST-PROOF-EVIDENCE owns proof-quality evaluation; do not copy them into the Strategy result.",
    "Keep concrete test classes/fixtures/helpers as code authority; reference shared infrastructure only when the cross-owner relation is materially useful.",
    "This command is read-only planning; literal test code/execution belongs to Exact Realization under its authority boundary."
  ],
  "userTarget": "<one shared testing strategy>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-TESTING",
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": {
    "whenToUse": "Use only when multiple Slices/semantic owners need a shared proof policy, shared environment/harness decision, non-duplication boundary or selected critical E2E/Practical paths.",
    "whatYouGet": "A small shared proof strategy, or an explicit conclusion that local proof/Exact Realization is sufficient.",
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
