# Plan Domain / Aggregate

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
  "description": "focused Domain / Aggregate Modeling",
  "meaning": "Run a bounded/deep Domain / Aggregate Modeling focus through TM-DOMAIN-DISCOVERY; this is the same recurring Target family as shallow/supporting Domain modeling, not a separate Domain Draft Target.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-DISCOVERY.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Selected Domain / Aggregate Model at the depth justified by the current problem; dedicated prose artifact remains optional.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<one bounded Domain / Aggregate modeling problem>",
  "palette": true,
  "helperPresentation": {
    "whenToUse": "Use when one Domain/Aggregate problem needs independently deep modeling/revalidation rather than only shallow Strategy support.",
    "whatYouGet": "Selected Domain / Aggregate Model at the depth justified by the current problem; dedicated prose artifact remains optional.",
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
    "surfaceKind": "TARGET_MODULE_FOCUSED",
    "targetModuleId": "TM-DOMAIN-DISCOVERY",
    "lensId": null,
    "parentSurface": "application_domain.discover",
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
