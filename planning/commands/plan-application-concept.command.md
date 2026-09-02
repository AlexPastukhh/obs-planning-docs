# Plan Application Concept

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_concept.plan",
  "file": "plan-application-concept.command.md",
  "command": "план концепции приложения",
  "englishName": "plan application concept",
  "commandFamily": [
    "план концепции приложения"
  ],
  "description": "focused SDS target",
  "meaning": "Run focused TM-APPLICATION-DEFINITION intent without creating a new Target type.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Concept-focused Application Definition refinement with selected concept, alternatives and material Q/R/P.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<Application concept focus>",
  "palette": true,
  "helperPresentation": {
    "whenToUse": "Use when Application Definition exists/needed and the immediate stable intent is concept/solution shape rather than the full umbrella.",
    "whatYouGet": "Concept-focused Application Definition refinement with selected concept, alternatives and material Q/R/P.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "01",
      "sectionLabel": "01 Application",
      "sectionOrder": 1,
      "itemOrder": 1,
      "kindLabel": "IDTSPE TARGET · FOCUSED",
      "parentId": "tmcmd.application.definition",
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE_FOCUSED",
    "targetModuleId": "TM-APPLICATION-DEFINITION",
    "lensId": null,
    "parentSurface": "tmcmd.application.definition",
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
