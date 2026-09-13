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
  "meaning": "Run TM-IMPLEMENTATION-SLICE for transient whole-Slice implementation discovery. Resolve one bounded end-to-end realization from selected Feature/Step behavior through semantic application entry/result, concrete step-by-step realization, material Domain/Shared/effect/recovery relations, integration proof and Evolution/OPEN pressure. For unrealized work, independently useful durable Slice responsibility becomes a Target Slice Body in the active Evolution Step; it becomes current TM-SLICE-OWNER authority only after realization/materialization.",
  "activeContextBehavior": "Treat the explicit command as selected invocation intent inside always-active IDTSPE. Re-evaluate current Use-Case composition, resolve/reuse a natural Target/context only when useful, confirm the selected Target Module Entry Point/local applicability gate, and then resolve CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from actual current Target state. Do not create a Target or Result Unit merely because the command exists.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-IMPLEMENTATION-SLICE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Applicable projection: RU-SLICE-01 Whole-Slice Responsibility / Candidate Structure; RU-SLICE-02 Semantic Application Entry / Result Boundary; RU-SLICE-03 Step-by-Step End-to-End Realization; RU-SLICE-04 Feature Integration Proof; RU-SLICE-05 Evolution / OPEN Slice Pressure. Zero/one Target Slice Body handoff inside an Evolution Step for unrealized work, or current Slice-owner revalidation for already-realized truth.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI-proposed material candidates are Proposals by default; selection makes them accepted planning meaning only through normal authority. Under SDS, unrealized selected future meaning stays in the applicable Evolution Step/Target Body until realization/materialization rather than becoming current-owner truth merely by selection.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<one implementation Slice>",
  "palette": true,
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
