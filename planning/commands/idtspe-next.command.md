# Show Methodology Next Step

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.next",
  "file": "idtspe-next.command.md",
  "command": "что дальше по методологии",
  "englishName": "show methodology next step",
  "commandFamily": [
    "что дальше по методологии"
  ],
  "description": "Show the currently useful methodology action without executing it.",
  "meaning": "Recheck current methodology Use-Case applicability, refresh/reaffirm current IDTSPE composition and Port Requirement Set, then resolve the smallest useful next methodology action from the current Work Context and surface that action as a Generic AI Proposal (GIP). Stop without executing the proposed action. P-02 owns Shell visibility; this command does not.",
  "activeContextBehavior": "Use current Work Context plus mandatory current Use-Case/port-composition rechecks. Do not invent a Target or component to satisfy a fixed sequence. Produce a GIP only for the next useful action/direction and preserve USER steering and permission boundaries.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/USE-CASE-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md"
  ],
  "expectedOutput": "One grounded Generic AI Proposal (GIP) for the smallest useful next methodology action, with concise basis/alternatives/recheck trigger only when useful; no proposed action executed. Any route visibility comes from P-02.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "IDTSPE is already active; this shortcut does not enable a mode.",
    "Use Cases compose methodology use; Target Modules/Lenses own specialized work.",
    "Broad Discussion or NO_ADDITIONAL_STRUCTURE is a valid proportional outcome.",
    "Ordinary in-scope progression is not an approval gate; explicit mutation/commit/push permissions remain separate.",
    "This command produces a GIP recommendation/action proposal; it does not own P-02 visibility and does not itself create a formal IDTSPE Proposal."
  ],
  "userTarget": "<current planning state>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "ORCHESTRATION",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "NONE"
  },
  "includes": [
    "idtspe.work",
    "idtspe.port-composition.recheck",
    "idtspe.port.trace"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "IDTSPE.COMMAND-SURFACE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md",
      "anchor": "idtspe-command-surface",
      "why": "Owns the canonical next-step command meaning: resolve the smallest useful next methodology action as a GIP and stop without executing it.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.UC.COMPOSE-CURRENT-WORK",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md",
      "anchor": "uc-idtspe-compose-current-work",
      "why": "Provides the current methodology composition from which navigation/continuation is resolved.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
