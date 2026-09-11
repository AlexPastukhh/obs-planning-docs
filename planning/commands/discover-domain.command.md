# Discover Domain

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_domain.discover",
  "file": "discover-domain.command.md",
  "command": "исследуй домен",
  "englishName": "discover domain",
  "commandFamily": [
    "исследуй домен",
    "исследуй домен приложения"
  ],
  "description": "domain discovery",
  "meaning": "Run TM-DOMAIN-DISCOVERY through the IDTSPE Shell for the selected target.",
  "activeContextBehavior": "Treat the explicit command as selected invocation intent inside always-active IDTSPE. Re-evaluate current Use-Case composition, resolve/reuse a natural Target/context only when useful, confirm the selected Target Module Entry Point/local applicability gate, and then resolve CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from actual current Target state. Do not create a Target or Result Unit merely because the command exists.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-DISCOVERY.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Transient Domain discovery findings/candidates, material rules/invariants/boundaries, proportional Core State and promotion handoffs; may validly end without a durable Domain owner.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<Domain candidate space>",
  "palette": true,
  "helperPresentation": {
    "whenToUse": "Use when selected Feature behavior, current Domain facts, Slice/Shared implementation pressure, Evidence or Evolution suggests domain concepts, invariants, lifecycle, ownership or candidate boundaries should be discovered.",
    "whatYouGet": "Transient Domain discovery findings/candidates and material promotion handoffs; a durable Domain owner is created only when independent semantic ownership becomes useful.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "04",
      "sectionLabel": "04 Domain",
      "sectionOrder": 4,
      "itemOrder": 0,
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
    "targetModuleId": "TM-DOMAIN-DISCOVERY",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
