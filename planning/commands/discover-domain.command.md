# Discover Domain

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_domain.discover",
  "file": "discover-domain.command.md",
  "command": "исследуй домен",
  "englishName": "discover domain",
  "commandFamily": [
    "исследуй домен",
    "исследуй домен приложения"
  ],
  "description": "domain discovery",
  "meaning": "Run TM-DOMAIN-DISCOVERY as transient Domain discovery through current Use-Case-driven IDTSPE composition and the selected Target Module entry point. The working Target/artifact is transient by default; selected useful Result Content may hand off to a Step Evolution Impact without becoming durable Domain authority.",
  "activeContextBehavior": "Treat the explicit command as selected invocation intent inside always-active IDTSPE. Re-evaluate current Use-Case composition, resolve/reuse a natural Target/context only when useful, confirm the selected Target Module Entry Point/local applicability gate, and then resolve CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from actual current Target state. Do not create a Target or Result Unit merely because the command exists.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-DISCOVERY.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md"
  ],
  "expectedOutput": "Domain Discovery Working Plan with proportional findings/candidates, material rules/invariants/boundaries and Core State. For unrealized work, selected useful Result Content hands off to the applicable Evolution Impact(s) in the active Evolution Step; zero/one/several Target Domain Bodies are formed only when durable post-Step Domain meaning is sufficiently resolved. Direct current Domain-owner handoff applies only to realized/current-state revalidation. A zero-owner/body result remains valid.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI-proposed material candidates are Proposals by default; selection makes them accepted planning meaning only through normal authority. Under SDS, unrealized selected future meaning stays in the applicable Evolution Step / Evolution Impact / Target Body according to its natural result destination until realization/materialization rather than becoming current-owner truth merely by selection.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<Domain candidate space>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-DOMAIN-DISCOVERY",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  },
  "includes": [
    "idtspe.work",
    "idtspe.port-composition.recheck",
    "idtspe.port.trace",
    "idtspe.port.target",
    "idtspe.target-module.apply"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "TM-DOMAIN-DISCOVERY",
      "path": "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-DISCOVERY.md",
      "anchor": "tm-domain-discovery-transient-domain-discovery",
      "why": "Concrete Target Module Model semantics selected by this command; shared port/registry/Meta-Model references are inherited from included commands.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
