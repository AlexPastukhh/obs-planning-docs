# Plan Slice Strategy

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_slice_strategy.plan",
  "file": "plan-slice-strategy.command.md",
  "command": "спланируй стратегию слайсов",
  "englishName": "plan slice strategy",
  "commandFamily": [
    "спланируй стратегию слайсов",
    "план стратегии слайсов"
  ],
  "description": "slice strategy",
  "meaning": "Run TM-SLICE-STRATEGY through the IDTSPE Shell for the selected target.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SLICE-STRATEGY.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Slice portfolio, useful vertical results, ordering/dependencies and per-Slice planning entry points; may validly conclude no separate strategy artifact is needed.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<Slice portfolio/decomposition>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": {
    "whenToUse": "Use when decomposition/order/dependencies across several vertical results are material rather than obvious.",
    "whatYouGet": "Slice portfolio, useful vertical results, ordering/dependencies and per-Slice planning entry points; may validly conclude no separate strategy artifact is needed.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "06",
      "sectionLabel": "06 Slice Portfolio",
      "sectionOrder": 6,
      "itemOrder": 0,
      "kindLabel": "IDTSPE TARGET",
      "badges": [
        "OPTIONAL WHEN DECOMPOSITION IS OBVIOUS"
      ],
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-SLICE-STRATEGY",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
