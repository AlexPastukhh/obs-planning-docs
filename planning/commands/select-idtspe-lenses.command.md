# Select Applicable IDTSPE Lenses

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.lenses.select",
  "file": "select-idtspe-lenses.command.md",
  "command": "подбери линзы",
  "englishName": "select applicable IDTSPE lenses",
  "commandFamily": [
    "подбери линзы",
    "проверь какими линзами посмотреть",
    "выбери линзы"
  ],
  "description": "Run the proportional IDTSPE Lens Applicability Scan for a Target/context.",
  "meaning": "Resolve/reuse the natural IDTSPE Target or bounded Target candidate and resolve TF-06A LENS_SET by scanning required Core, active Target Module attachment policy when any, registered Core/profile Lens gates and explicit user/agent Lens choices. Do not execute every Lens body merely because it exists.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context. If no reusable Target Module fits, use the current Local Target Contract/Target Formation rather than inventing a module. Recompute TF-06A when material Scope/Sources/Questions changed.",
  "traversalReadMode": "Read current Core/profile Lens registries and applicability summaries first; read full Lens bodies and referenced Knowledge Basis only for selected or plausibly applicable candidates. Reuse current reliable IDTSPE/profile governance; targeted refresh when uncertain.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-MODEL.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md"
  ],
  "expectedOutput": "Lens Applicability View with REQUIRED_CORE / REQUIRED_BY_TARGET_PROFILE / APPLICABLE / NOT_MATERIAL / NOT_APPLICABLE / EXPLICITLY_REQUESTED / DEFERRED dispositions and the resolved TF-06A Lens Set; no fake Lens findings.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "The active Target Module is one Lens-selection source, not the whole Lens universe.",
    "A Local Target Contract may use any registered applicable Core/profile Lens.",
    "Registry discovery does not mean loading or applying every Lens body.",
    "Knowledge Basis references are Lens knowledge dependencies, not Target Sources.",
    "This command is read-only planning; it does not mutate repository files, commit or push."
  ],
  "userTarget": "<target/context>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "ORCHESTRATION",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
