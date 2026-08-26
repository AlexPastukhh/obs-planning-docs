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
  "meaning": "Run TM-TEST-DESIGN through the IDTSPE Shell for the selected target.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-TEST-DESIGN.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Test Design obligations, layer choice, cases/oracles/data/environment and Evidence mapping.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<one Domain/Slice/etc proof target>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-TESTING",
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": {
    "whenToUse": "Use when a semantic owner needs executable/procedural proof design before or during realization.",
    "whatYouGet": "Test Design obligations, layer choice, cases/oracles/data/environment and Evidence mapping.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "05",
      "sectionLabel": "05 Proof Design",
      "sectionOrder": 5,
      "itemOrder": 0,
      "kindLabel": "IDTSPE TARGET",
      "viewOrder": 1
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
