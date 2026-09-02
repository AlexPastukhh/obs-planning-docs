# Plan Prototype

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_prototype.plan",
  "file": "prototype-application.command.md",
  "command": "спланируй прототип",
  "englishName": "plan prototype",
  "commandFamily": [
    "спланируй прототип",
    "прототип приложения"
  ],
  "description": "prototype practical evidence",
  "meaning": "Run TM-PROTOTYPE through the IDTSPE Shell to plan or review one bounded pre-implementation prototype/experiment and its practical Evidence.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-PROTOTYPE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Prototype Intent / Questions, Prototype Plan, and—when run—Prototype Results / Evidence with limitations and revalidation handoff; may validly conclude no prototype is justified.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<one bounded uncertainty / prototype subject>",
  "palette": true,
  "helperPresentation": {
    "whenToUse": "Use when material uncertainty is best reduced before full implementation through a prototype, experiment, mock, simulation, spike or partial implementation.",
    "whatYouGet": "Prototype Intent / Questions, Prototype Plan, and—when run—Prototype Results / Evidence with limitations and revalidation handoff.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "01",
      "sectionLabel": "01 Application",
      "sectionOrder": 1,
      "itemOrder": 3,
      "kindLabel": "IDTSPE TARGET",
      "badges": [
        "CONDITIONAL",
        "EVIDENCE-DRIVEN"
      ],
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-PROTOTYPE",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
