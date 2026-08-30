# Plan Test Design

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "test_design.plan",
  "file": "plan-test-design.command.md",
  "command": "спланируй тесты",
  "englishName": "plan test design",
  "commandFamily": [
    "спланируй тесты",
    "спланируй проверку поведения"
  ],
  "description": "test design",
  "meaning": "Run optional TM-TEST-DESIGN only when how to prove the selected property is independently non-trivial. Straightforward proof should go directly from accepted semantics to TM-EXACT-REALIZATION for exact test code.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-TEST-DESIGN.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "RU-TDES-01: concise selected property-to-proof design (credible layer/operator + setup/action/observation + required assertions/signals) only when separate proof planning is actually useful.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Do not create a Test Design Target for an obvious local test merely because the module exists.",
    "LENS-TEST-PROOF-EVIDENCE owns Escape Risk, Refactor Fragility, assertion strength, wrong-layer/duplication and Evidence-freshness evaluation; retain those only when material rationale/findings matter.",
    "Test Design is not exact test code and not executed Evidence; literal tests/build execution belong to Exact Realization under explicit authority.",
    "This command is read-only planning and does not mutate repository files."
  ],
  "userTarget": "<one Domain/Slice/etc proof target>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-TESTING",
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": {
    "whenToUse": "Use when the proof method itself is non-trivial: layer choice, failure injection, concurrency/distributed behavior, no-mutation observation, special environment/harness, or automated-vs-practical boundary needs an independent decision.",
    "whatYouGet": "A concise selected property-to-proof design; if proof is straightforward, the module may be skipped in favor of Exact Realization.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "05",
      "sectionLabel": "05 Proof Design",
      "sectionOrder": 5,
      "itemOrder": 0,
      "kindLabel": "IDTSPE TARGET",
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
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-TEST-DESIGN",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
