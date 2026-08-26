# Plan Cross-cutting Responsibility

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.crosscut",
  "file": "plan-cross-cutting-responsibility.command.md",
  "command": "спланируй сквозную ответственность",
  "englishName": "plan cross-cutting responsibility",
  "commandFamily": [
    "спланируй сквозную ответственность"
  ],
  "description": "cross cutting concern",
  "meaning": "Run TM-CROSS-CUTTING-CONCERN through the IDTSPE Shell for the selected target.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-CROSS-CUTTING-CONCERN.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Cross-Cutting owner/consumer obligations when justified, otherwise a local/reuse route; distinct from Q/R/P Concern groups.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<one shared non-vertical responsibility>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-SOLUTION"
  ],
  "helperPresentation": {
    "whenToUse": "Use when a genuine shared implementation responsibility spans consumers and should not be duplicated locally.",
    "whatYouGet": "Cross-Cutting owner/consumer obligations when justified, otherwise a local/reuse route; distinct from Q/R/P Concern groups.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "07",
      "sectionLabel": "07 Slice Realization",
      "sectionOrder": 7,
      "itemOrder": 4,
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
    "targetModuleId": "TM-CROSS-CUTTING-CONCERN",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
