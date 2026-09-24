# Plan Shared Requirement

Status: legacy compatibility command definition
Scope: historical invocation alias redirected to current IDTSPE/SDS authority; hidden from the primary palette.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.requirement",
  "file": "plan-shared-requirement.command.md",
  "command": "спланируй общее требование",
  "englishName": "plan shared requirement",
  "commandFamily": [
    "спланируй общее требование"
  ],
  "description": "legacy compatibility alias for owner-local implementation-requirement discovery",
  "meaning": "Legacy alias for requirement planning. TM-REQUIREMENT is retired: evaluate whether material implementation constraints need to become/change/retire owner-local IR/PFR through LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY and the requirement-ownership rule. Future IR/PFR for unrealized state stays in the corresponding Evolution Step Target Body; current owner Requirements describe realized truth. A Shared Capability/current or Target Shared Body is formed only through its temporal existence gate.",
  "activeContextBehavior": "Treat this legacy trigger as explicit compatibility intent inside always-active IDTSPE. Re-evaluate current Use-Case composition and route only to the current owners listed here; preserve local applicability/materiality gates and do not revive the retired Target family.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/lenses/reusable/LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/profile-contracts/requirements/REQUIREMENT-OWNERSHIP-AND-NATURAL-OWNER.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md"
  ],
  "expectedOutput": "Owner-family IR/PFR disposition in the correct temporal host: current realized owner or Evolution Step Target Body, plus a Shared Capability binding only when independently justified. No standalone Requirement Target.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Legacy compatibility alias only; do not expose as a primary methodology surface.",
    "The historical Target family named by this command is retired and must not be recreated by invocation.",
    "Current Use Cases compose methodology use; current owner/Lens/Target contracts decide specialized work and materiality.",
    "This command is read-only planning/review and grants no implementation, test execution, repository mutation, commit or push permission."
  ],
  "userTarget": "<one exceptional shared must-hold candidate>",
  "palette": false,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "LENS",
    "targetModuleId": null,
    "lensId": "LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY",
    "parentSurface": null,
    "hostTargetPolicy": "RESOLVE_OR_REUSE_TARGET"
  },
  "includes": [
    "planning/commands/apply-idtspe-lens.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY",
      "path": "planning/documentation/idtspe-methodology/active/profiles/sds/lenses/reusable/LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY.md",
      "anchor": "lens-implementation-requirements-discovery",
      "why": "Concrete Lens Model semantics selected by this command; shared port/registry/Meta-Model references are inherited from included commands.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
