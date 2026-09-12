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
  "meaning": "Run TM-IMPLEMENTATION-SLICE for transient whole-Slice implementation discovery. Resolve one bounded end-to-end realization from selected Feature behavior through semantic application entry/result, concrete step-by-step realization, material Domain/Shared/effect/recovery relations, integration proof and Evolution/OPEN pressure. Promote to TM-SLICE-OWNER only when durable Slice responsibility is independently useful.",
  "activeContextBehavior": "Treat the explicit command as selected invocation intent inside always-active IDTSPE. Re-evaluate current Use-Case composition, resolve/reuse a natural Target/context only when useful, confirm the selected Target Module Entry Point/local applicability gate, and then resolve CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from actual current Target state. Do not create a Target or Result Unit merely because the command exists.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-IMPLEMENTATION-SLICE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Applicable projection: RU-SLICE-01 Whole-Slice Responsibility / Candidate Structure; RU-SLICE-02 Semantic Application Entry / Result Boundary; RU-SLICE-03 Step-by-Step End-to-End Realization; RU-SLICE-04 Feature Integration Proof; RU-SLICE-05 Evolution / OPEN Slice Pressure. Zero/one durable Slice Owner handoff only when justified.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI-proposed material candidates are Proposals by default; they become Decisions/current owner meaning only when actually selected.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<one implementation Slice>",
  "palette": true,
  "helperPresentation": {
    "whenToUse": "Use when one selected Feature/result needs a bounded end-to-end implementation Slice discovery. This is transient discovery, not a Slice Strategy portfolio Target.",
    "whatYouGet": "Current RU-SLICE-01..05 projection at material depth, with Domain/Shared/proof/evolution handoffs and optional promotion to a durable Slice Owner.",
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
