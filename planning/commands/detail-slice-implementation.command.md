# Detail Slice Implementation

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.slice.implementation.detail",
  "file": "detail-slice-implementation.command.md",
  "command": "детализируй реализацию слайса",
  "englishName": "detail slice implementation",
  "commandFamily": [
    "детализируй реализацию слайса"
  ],
  "description": "focused SDS target",
  "meaning": "Run focused TM-IMPLEMENTATION-SLICE intent on the same selected transient Slice Discovery Target; deepen only the material current RU-SLICE-02..05 semantics without creating a second Slice identity.",
  "activeContextBehavior": "Treat the explicit command as selected invocation intent inside always-active IDTSPE. Re-evaluate current Use-Case composition, resolve/reuse a natural Target/context only when useful, confirm the selected Target Module Entry Point/local applicability gate, and then resolve CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from actual current Target state. Do not create a Target or Result Unit merely because the command exists.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-IMPLEMENTATION-SLICE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Refined semantic application entry/result boundary, concrete step-by-step end-to-end realization, Feature integration proof and material Evolution/OPEN pressure for the same Slice Discovery Target; no new Target identity.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI-proposed material candidates are Proposals by default; they become Decisions/current owner meaning only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<existing Slice>",
  "palette": true,
  "helperPresentation": {
    "whenToUse": "Use when an existing bounded Slice Discovery needs deeper entry/result, end-to-end realization, integration-proof or evolution/open-pressure detail.",
    "whatYouGet": "A deeper current RU-SLICE-02..05 projection for the same Slice Discovery, with no separate Runtime Path or Slice Strategy authority.",
    "navigation": {
      "viewId": "SDS",
      "viewLabel": "SDS — IDTSPE Profile",
      "sectionId": "07",
      "sectionLabel": "07 Slice Realization",
      "sectionOrder": 7,
      "itemOrder": 1,
      "kindLabel": "IDTSPE TARGET · FOCUSED",
      "parentId": "application_slice.plan",
      "viewOrder": 1
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE_FOCUSED",
    "targetModuleId": "TM-IMPLEMENTATION-SLICE",
    "lensId": null,
    "parentSurface": "application_slice.plan",
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
