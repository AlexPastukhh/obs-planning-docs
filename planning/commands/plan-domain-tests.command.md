# Plan Domain Tests

Status: legacy compatibility command definition
Scope: historical invocation alias redirected to current IDTSPE/SDS authority; hidden from the primary palette.

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
  "description": "legacy compatibility shortcut for Domain-focused proof evaluation/planning",
  "meaning": "Legacy Domain Test Design shortcut. TM-TEST-DESIGN is retired; apply LENS-TEST-PROOF-EVIDENCE to the current Domain proof need and keep any non-trivial proof plan transient with the Domain owner. Literal test realization routes to TM-EXACT-REALIZATION when requested/authorized.",
  "activeContextBehavior": "Treat this legacy trigger as explicit compatibility intent inside always-active IDTSPE. Re-evaluate current Use-Case composition and route only to the current owners listed here; preserve local applicability/materiality gates and do not revive the retired Target family.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-OWNER.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-command-surface-contract.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Domain-focused proof finding/plan at the natural owner, optionally followed by Exact test realization; no Test Design Target.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Legacy compatibility alias only; do not expose as a primary methodology surface.",
    "The historical Target family named by this command is retired and must not be recreated by invocation.",
    "Current Use Cases compose methodology use; current owner/Lens/Target contracts decide specialized work and materiality.",
    "This command is read-only planning/review and grants no implementation, test execution, repository mutation, commit or push permission."
  ],
  "userTarget": "<Domain owner>",
  "palette": false,
  "helperPresentation": {
    "whenToUse": "Only when using this historical command phrase/automation; prefer the current semantic owner or generic `idtspe` component dispatch for new work.",
    "whatYouGet": "Domain-focused proof finding/plan at the natural owner, optionally followed by Exact test realization; no Test Design Target.",
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
    "surfaceKind": "LENS",
    "targetModuleId": null,
    "lensId": "LENS-TEST-PROOF-EVIDENCE",
    "parentSurface": null,
    "hostTargetPolicy": "RESOLVE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
