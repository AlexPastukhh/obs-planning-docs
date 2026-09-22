# Plan Domain / Aggregate

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_domain.plan",
  "file": "plan-domain.command.md",
  "command": "спланируй домен",
  "englishName": "plan domain",
  "commandFamily": [
    "спланируй домен",
    "план домена приложения"
  ],
  "description": "establish or revalidate one durable Domain semantic owner",
  "meaning": "Run TM-DOMAIN-OWNER when one coherent Domain responsibility has independent durable ownership/review/revalidation value. TM-DOMAIN-DISCOVERY may supply transient Source material, but discovery does not become durable authority merely because it was performed.",
  "activeContextBehavior": "Treat the explicit command as selected invocation intent inside always-active IDTSPE. Re-evaluate current Use-Case composition, resolve/reuse a natural Target/context only when useful, confirm the selected Target Module Entry Point/local applicability gate, and then resolve CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from actual current Target state. Do not create a Target or Result Unit merely because the command exists.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-OWNER.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/lenses/reusable/LENS-DOMAIN-MODELING-DDD.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md"
  ],
  "expectedOutput": "Durable Domain Owner Contract: RU-DOWN-01 Domain Semantic Contract and, only when material, RU-DOWN-02 owner-local IR-DOMAIN-*/PFR-* constraints; representation may remain implementation-native.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI-proposed material candidates are Proposals by default; selection makes them accepted planning meaning only through normal authority. Under SDS, unrealized selected future meaning stays in the applicable Evolution Step/Target Body until realization/materialization rather than becoming current-owner truth merely by selection.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<one durable Domain responsibility, when independently useful>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE_FOCUSED",
    "targetModuleId": "TM-DOMAIN-OWNER",
    "lensId": null,
    "parentSurface": "application_domain.discover",
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
      "responsibilityId": "TM-DOMAIN-OWNER",
      "path": "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-DOMAIN-OWNER.md",
      "anchor": "tm-domain-owner-durable-domain-semantic-owner",
      "why": "Concrete Target Module Model semantics selected by this command; shared port/registry/Meta-Model references are inherited from included commands.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
