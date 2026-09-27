# Discover Application Scenarios

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_scenarios.discover",
  "file": "discover-application-scenarios.command.md",
  "command": "собери сценарии приложения",
  "englishName": "discover application scenarios",
  "commandFamily": [
    "собери сценарии приложения"
  ],
  "description": "scenario boundary discovery",
  "meaning": "Focused Scenario-boundary entry: inspect Application Definition/Benefit intent, actor and external paths, current evidence and any already-resolved Feature results for independently meaningful real-life journeys. Discover every materially distinct Application Contribution and Benefit manifestation/closure path; form each selected Scenario Target through normal Target Formation and TM-SCENARIO-PLANNING. A Step-owned Scenario Target Body may carry provisional behavior planning with Feature Resolution OPEN and zero resolved Features; no Feature identity or separate Scenario Discovery catalog is required first. When Feature ownership is resolved, reference the Feature/result without copying its detailed behavior. Represent equivalent recurring instances as a Scenario family only with explicit coverage rationale/Decision.",
  "activeContextBehavior": "Treat the explicit command as selected invocation intent inside always-active IDTSPE. Re-evaluate current Use-Case composition, resolve/reuse a natural Target/context only when useful, confirm the selected Target Module Entry Point/local applicability gate, and then resolve CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from actual current Target state. Do not create a Target or Result Unit merely because the command exists.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SCENARIO-PLANNING.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md"
  ],
  "expectedOutput": "Materially distinct Scenario Target candidates and Application Contributions, Step-owned when unrealized; unresolved Feature refs remain OPEN and equivalent-family coverage Decisions are recorded when material.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI-proposed material candidates are Proposals by default; selection makes them accepted planning meaning only through normal authority. Under SDS, unrealized selected future meaning stays in the applicable Evolution Step/Target Body until realization/materialization rather than becoming current-owner truth merely by selection.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<Application behavior space / Scenario boundary candidates>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE_FOCUSED",
    "targetModuleId": "TM-SCENARIO-PLANNING",
    "lensId": null,
    "parentSurface": "tmcmd.scenario.plan",
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  },
  "includes": [
    "planning/commands/work-through-idtspe.command.md",
    "planning/commands/recheck-idtspe-port-composition.command.md",
    "planning/commands/idtspe-port-target.command.md",
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
