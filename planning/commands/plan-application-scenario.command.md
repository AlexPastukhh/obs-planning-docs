# Plan Application Scenario

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_scenario.plan",
  "file": "plan-application-scenario.command.md",
  "command": "спланируй сценарий",
  "englishName": "plan application scenario",
  "commandFamily": [
    "спланируй сценарий",
    "план сценария приложения"
  ],
  "description": "Scenario journey, normative SPS/SR and Application Contribution planning with Feature OPEN or resolved",
  "meaning": "Run TM-SCENARIO-PLANNING for one real-life actor/external/Application journey. Compose normative SPS steps across actor/external/Application participation, Application Contributions, order/branch/convergence/re-entry, continuity, material Screen/external participation, step-attached and Scenario-wide SR must-holds, and optional E2E Proof Intent. While Feature ownership is OPEN, plan the required Application outcome and bounded provisional behavior inside the same Step-owned Scenario Target Body without requiring a Feature file. Prefer a separate external-event SPS and Application trigger/entry SPS when that distinction materially clarifies downstream realization. When ownership is resolved, reference the selected Feature/result and move detailed Feature behavior and semantic data to TM-FEATURE. Keep one Scenario identity and its represented family/coverage boundary through that maturity change.",
  "activeContextBehavior": "Treat the explicit command as selected invocation intent inside always-active IDTSPE. Re-evaluate current Use-Case composition, resolve/reuse a natural Target/context only when useful, confirm the selected Target Module Entry Point/local applicability gate, and then resolve CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from actual current Target state. Do not create a Target or Result Unit merely because the command exists.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md"
  ],
  "expectedOutput": "One Step-owned or current Scenario journey with normative SPS path, Application Contributions, step-attached and Scenario-wide SRs when material, Feature OPEN or resolved refs, Screen/external participation, continuity and applicable Unit dispositions.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI-proposed material candidates are Proposals by default; selection makes them accepted planning meaning only through normal authority. Under SDS, unrealized selected future meaning stays in the applicable Evolution Step/Target Body until realization/materialization rather than becoming current-owner truth merely by selection.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<one Scenario>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-SCENARIO-PLANNING",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  },
  "includes": [
    "planning/commands/apply-idtspe-target-module.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "TM-SCENARIO-PLANNING",
      "path": "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md",
      "anchor": "tm-scenario-planning",
      "why": "Concrete Target Module Model semantics selected by this command; shared port/registry/Meta-Model references are inherited from included commands.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
