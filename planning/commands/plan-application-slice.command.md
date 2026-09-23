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
  "meaning": "Run TM-IMPLEMENTATION-SLICE for bounded whole-Slice implementation discovery. Resolve one end-to-end realization from selected Feature/Step behavior through semantic application entry/result, concrete step-by-step realization, material Domain/Shared/effect/recovery relations, integration proof and Evolution/OPEN pressure. The working Target/artifact is transient by default. For unrealized work, selected useful Result Content may hand off to the applicable Step Evolution Impact; independently useful durable Slice responsibility becomes a Target Slice Body only when sufficiently resolved and becomes current TM-SLICE-OWNER authority only after realization/materialization.",
  "activeContextBehavior": "Treat the explicit command as selected invocation intent inside always-active IDTSPE. Re-evaluate current Use-Case composition, resolve/reuse a natural Target/context only when useful, confirm the selected Target Module Entry Point/local applicability gate, and then resolve CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from actual current Target state. Do not create a Target or Result Unit merely because the command exists.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-IMPLEMENTATION-SLICE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md"
  ],
  "expectedOutput": "Applicable Slice Discovery Working Plan projection: RU-SLICE-01 Whole-Slice Responsibility / Candidate Structure; RU-SLICE-02 Semantic Application Entry / Result Boundary; RU-SLICE-03 Step-by-Step End-to-End Realization; RU-SLICE-04 Feature Integration Proof; RU-SLICE-05 Evolution / OPEN Slice Pressure. For unrealized work, selected useful Result Content hands off to applicable Slice/Domain/Shared Evolution Impact(s); Target Slice/Domain/Shared Bodies are formed only when durable post-Step responsibility is sufficiently resolved. For already-realized truth, route to current-owner revalidation.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI-proposed material candidates are Proposals by default; selection makes them accepted planning meaning only through normal authority. Under SDS, unrealized selected future meaning stays in the applicable Evolution Step / Evolution Impact / Target Body according to its natural result destination until realization/materialization rather than becoming current-owner truth merely by selection.",
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
  },
  "includes": [
    "planning/commands/apply-idtspe-target-module.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "TM-IMPLEMENTATION-SLICE",
      "path": "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-IMPLEMENTATION-SLICE.md",
      "anchor": "tm-implementation-slice-slice-discovery-non-persistent-slice-planning",
      "why": "Concrete Target Module Model semantics selected by this command; shared port/registry/Meta-Model references are inherited from included commands.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
