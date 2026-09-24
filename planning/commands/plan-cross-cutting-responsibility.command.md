# Plan Cross-cutting Responsibility

Status: legacy compatibility command definition
Scope: historical invocation alias redirected to current IDTSPE/SDS authority; hidden from the primary palette.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.crosscut",
  "file": "plan-cross-cutting-responsibility.command.md",
  "command": "спланируй сквозную ответственность",
  "englishName": "plan cross-cutting responsibility",
  "commandFamily": [
    "спланируй сквозную ответственность"
  ],
  "description": "legacy compatibility alias for Shared Implementation Capability / sharedness evaluation",
  "meaning": "Legacy alias for shared/cross-cutting planning. Route genuine reusable multi-consumer implementation responsibility through TM-SHARED-IMPLEMENTATION-CAPABILITY after its temporal existence gate. Future consumers/capability meaning belong to a Target Shared Body in an Evolution Step; current Shared authority contains realized consumers only. Otherwise keep the concern in its natural owner/state and use the Core Shared/Cross-Cutting Lens when useful. TM-CROSS-CUTTING-CONCERN is retired.",
  "activeContextBehavior": "Treat this legacy trigger as explicit compatibility intent inside always-active IDTSPE. Re-evaluate current Use-Case composition and route only to the current owners listed here; preserve local applicability/materiality gates and do not revive the retired Target family.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/reusable/LENS-SHARED-CROSS-CUTTING-RESPONSIBILITY.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md"
  ],
  "expectedOutput": "A Shared Capability result in the correct temporal host: current owner for realized reusable responsibility or Target Shared Body for unrealized future responsibility; otherwise a natural-owner/local result. No retired Cross-Cutting Target is created.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Legacy compatibility alias only; do not expose as a primary methodology surface.",
    "The historical Target family named by this command is retired and must not be recreated by invocation.",
    "Current Use Cases compose methodology use; current owner/Lens/Target contracts decide specialized work and materiality.",
    "This command is read-only planning/review and grants no implementation, test execution, repository mutation, commit or push permission."
  ],
  "userTarget": "<one shared non-vertical responsibility>",
  "palette": false,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-SHARED-IMPLEMENTATION-CAPABILITY",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  },
  "includes": [
    "planning/commands/apply-idtspe-target-module.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "TM-SHARED-IMPLEMENTATION-CAPABILITY",
      "path": "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md",
      "anchor": "tm-shared-implementation-capability",
      "why": "Concrete Target Module Model semantics selected by this command; shared port/registry/Meta-Model references are inherited from included commands.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
