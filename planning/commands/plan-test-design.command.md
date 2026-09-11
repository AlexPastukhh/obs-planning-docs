# Plan Test Design

Status: legacy compatibility command definition
Scope: historical invocation alias redirected to current IDTSPE/SDS authority; hidden from the primary palette.

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
  "description": "legacy compatibility shortcut for natural-owner proof planning/evaluation",
  "meaning": "Legacy Test Design shortcut. TM-TEST-DESIGN is retired. Use LENS-TEST-PROOF-EVIDENCE to evaluate the selected property/proof route; retain a transient proof plan only when how-to-prove is independently non-trivial, and route literal tests to TM-EXACT-REALIZATION. No standalone Test Design Target is created.",
  "activeContextBehavior": "Treat this legacy trigger as explicit compatibility intent inside always-active IDTSPE. Re-evaluate current Use-Case composition and route only to the current owners listed here; preserve local applicability/materiality gates and do not revive the retired Target family.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-EXACT-REALIZATION.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-command-surface-contract.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "A material proof evaluation/transient natural-owner proof plan, or direct Exact-test route when obvious; no Test Design Target.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Legacy compatibility alias only; do not expose as a primary methodology surface.",
    "The historical Target family named by this command is retired and must not be recreated by invocation.",
    "Current Use Cases compose methodology use; current owner/Lens/Target contracts decide specialized work and materiality.",
    "This command is read-only planning/review and grants no implementation, test execution, repository mutation, commit or push permission."
  ],
  "userTarget": "<one Domain/Slice/etc proof target>",
  "palette": false,
  "helperPresentation": {
    "whenToUse": "Only when using this historical command phrase/automation; prefer the current semantic owner or generic `idtspe` component dispatch for new work.",
    "whatYouGet": "A material proof evaluation/transient natural-owner proof plan, or direct Exact-test route when obvious; no Test Design Target.",
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
    "surfaceKind": "LENS",
    "targetModuleId": null,
    "lensId": "LENS-TEST-PROOF-EVIDENCE",
    "parentSurface": null,
    "hostTargetPolicy": "RESOLVE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
