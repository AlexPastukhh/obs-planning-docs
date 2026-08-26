# Plan Domain

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_domain.plan",
  "file": "plan-domain.command.md",
  "command": "спланируй домен",
  "englishName": "plan domain",
  "commandFamily": [
    "спланируй домен",
    "план домена приложения"
  ],
  "description": "domain draft",
  "meaning": "Run TM-DOMAIN-DRAFT through the IDTSPE Shell for the selected target.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-DRAFT.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Current Domain semantics/rules/invariants and implementation/testing/evolution handoffs; dedicated file is not automatic.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<one Domain owner>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": {
    "whenToUse": "Use when one Domain owner is materially justified and needs deeper planning/revalidation.",
    "whatYouGet": "Current Domain semantics/rules/invariants and implementation/testing/evolution handoffs; dedicated file is not automatic.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "04",
      "sectionLabel": "04 Domain",
      "sectionOrder": 4,
      "itemOrder": 1,
      "kindLabel": "IDTSPE TARGET",
      "badges": [
        "PRIMARY OPTIONAL"
      ],
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-DOMAIN-DRAFT",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
