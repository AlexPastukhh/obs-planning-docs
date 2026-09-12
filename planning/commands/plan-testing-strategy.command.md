# Plan Testing Strategy

Status: legacy compatibility command definition
Scope: historical invocation alias redirected to current IDTSPE/SDS authority; hidden from the primary palette.

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
  "description": "legacy compatibility shortcut for conditional cross-owner proof coordination",
  "meaning": "Legacy Test Strategy shortcut. TM-TEST-STRATEGY is retired. Start with LENS-TEST-PROOF-EVIDENCE; keep proof local when possible. If several owners genuinely need shared proof coordination, represent it transiently through current Proposal/Decision/supporting guidance, or form TM-SHARED-IMPLEMENTATION-CAPABILITY only when a reusable implementation responsibility independently passes its existence gate.",
  "activeContextBehavior": "Treat this legacy trigger as explicit compatibility intent inside always-active IDTSPE. Re-evaluate current Use-Case composition and route only to the current owners listed here; preserve local applicability/materiality gates and do not revive the retired Target family.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Local proof route by default; only material transient cross-owner proof coordination or a separately justified Shared Capability. No Test Strategy Target.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Legacy compatibility alias only; do not expose as a primary methodology surface.",
    "The historical Target family named by this command is retired and must not be recreated by invocation.",
    "Current Use Cases compose methodology use; current owner/Lens/Target contracts decide specialized work and materiality.",
    "This command is read-only planning/review and grants no implementation, test execution, repository mutation, commit or push permission."
  ],
  "userTarget": "<one shared testing strategy>",
  "palette": false,
  "helperPresentation": {
    "whenToUse": "Only when using this historical command phrase/automation; prefer the current semantic owner or generic `idtspe` component dispatch for new work.",
    "whatYouGet": "Local proof route by default; only material transient cross-owner proof coordination or a separately justified Shared Capability. No Test Strategy Target.",
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
    "surfaceKind": "ORCHESTRATION",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "RESOLVE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
