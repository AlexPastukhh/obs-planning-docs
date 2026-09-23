# Plan Slice Strategy

Status: legacy compatibility command definition
Scope: historical invocation alias redirected to current IDTSPE/SDS authority; hidden from the primary palette.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_slice_strategy.plan",
  "file": "plan-slice-strategy.command.md",
  "command": "спланируй стратегию слайсов",
  "englishName": "plan slice strategy",
  "commandFamily": [
    "спланируй стратегию слайсов",
    "план стратегии слайсов"
  ],
  "description": "legacy compatibility alias routed to current transient Slice Discovery",
  "meaning": "Legacy Slice Strategy alias. TM-SLICE-STRATEGY is retired; route the request to TM-IMPLEMENTATION-SLICE for transient end-to-end Slice discovery/planning, using current Feature/Domain/Shared/Evolution/Lens coordination only when material. Do not recreate a portfolio/strategy Target family.",
  "activeContextBehavior": "Treat this legacy trigger as explicit compatibility intent inside always-active IDTSPE. Re-evaluate current Use-Case composition and route only to the current owners listed here; preserve local applicability/materiality gates and do not revive the retired Target family.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-IMPLEMENTATION-SLICE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md"
  ],
  "expectedOutput": "Current transient Slice Discovery result using TM-IMPLEMENTATION-SLICE, or no Slice Target when its Entry Point is not material. No Slice Strategy Target.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Legacy compatibility alias only; do not expose as a primary methodology surface.",
    "The historical Target family named by this command is retired and must not be recreated by invocation.",
    "Current Use Cases compose methodology use; current owner/Lens/Target contracts decide specialized work and materiality.",
    "This command is read-only planning/review and grants no implementation, test execution, repository mutation, commit or push permission."
  ],
  "userTarget": "<Slice implementation-strategy scope>",
  "palette": false,
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
