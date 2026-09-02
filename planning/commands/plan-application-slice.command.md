# Plan Implementation Slice

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_slice.plan",
  "file": "plan-application-slice.command.md",
  "command": "спланируй слайс",
  "englishName": "plan implementation slice",
  "commandFamily": [
    "спланируй слайс",
    "план слайса приложения"
  ],
  "description": "implementation slice",
  "meaning": "Run TM-IMPLEMENTATION-SLICE through the IDTSPE Shell; normal Target Formation decides reuse/handoff/new bounded Target formation and may reuse RU-SSTRAT-03 semantic identity/addressability when TM-IMPLEMENTATION-SLICE is selected.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-IMPLEMENTATION-SLICE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Slice outcome/obligations/proof intent, material Domain/Cross-Cutting/dependency use boundary, optional Runtime Path and owner-local Evolution Steps; material Strategy/Domain mismatch surfaces a Finding Candidate for Core disposition.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; they become Decisions only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<one implementation Slice>",
  "palette": true,
  "helperPresentation": {
    "whenToUse": "Use when one selected Slice needs independently bounded realization planning; Target Formation must select/reuse/form that bounded Target rather than treating the Strategy owner register as creation authority.",
    "whatYouGet": "Slice outcome/obligations/proof intent, material Uses/ownership boundary, optional Runtime Path and owner-local Evolution Steps; accepted upstream changes occur only after Core Finding Disposition.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "07",
      "sectionLabel": "07 Slice Realization",
      "sectionOrder": 7,
      "itemOrder": 0,
      "kindLabel": "IDTSPE TARGET",
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-IMPLEMENTATION-SLICE",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
