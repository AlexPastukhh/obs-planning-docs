# Synchronize IDTSPE Need Set

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable semantics remain in linked owners.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.needs.set.sync",
  "file": "sync-idtspe-need-set.command.md",
  "command": "веди текущие ниды",
  "englishName": "synchronize current IDTSPE need set",
  "commandFamily": [
    "веди текущие ниды",
    "синхронизируй текущий набор нидов",
    "обнови текущие ниды",
    "sync need set",
    "idtspe needs set sync"
  ],
  "description": "Synchronize the current Need Set with canonical Need Collection/Disposition results and downstream fulfillment Evidence.",
  "meaning": "Run Need Set Coordination synchronization for the selected current Set. Use canonical Need Candidate Collection for new USER/Source wanted outcomes, canonical Need Candidate Disposition for routing, and current downstream owners/Evidence for fulfillment. Update only coordination references/status and the P-14-selected ledger representation; never reimplement Need detection/routing or treat a downstream artifact as satisfied merely because it was planned.",
  "activeContextBehavior": "Resolve the current/selected Need Set and sync context. For an ACTIVE Set, collect newly surfaced USER/Source Needs through the existing Collection owner and disposition them as needed; for CLOSED Sets, update only already tracked items. Refresh downstream refs/Evidence and mark SATISFIED/RETIRED/SUPERSEDED only from the canonical evidence/explicit basis defined by Need Set Coordination.",
  "traversalReadMode": "Read Need Set Coordination, then follow Need Candidate Collection/Disposition and only the downstream owner/Evidence references needed for affected tracked items. Reuse unchanged items and current owner state rather than rereading unrelated work.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/needs/NEED-SET-COORDINATION.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/needs/NEED-CANDIDATE-COLLECTION.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/needs/NEED-CANDIDATE-DISPOSITION.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "RESOLUTION.NEED-SET-COORDINATION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/needs/NEED-SET-COORDINATION.md",
      "anchor": "resolution-need-set-coordination",
      "why": "Owns persistent Need Set grouping/tracking/fulfillment coordination while preserving Need Collection, Disposition and downstream semantic authority.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ],
  "expectedOutput": "The selected Need Set ledger is synchronized with grounded Need Candidates, current disposition/destination references and fulfillment Evidence; no duplicate downstream semantic bodies are created and non-terminal Needs remain visible.",
  "permissionMode": "bounded-repository-write-no-commit-push",
  "keyReminders": [
    "Preserve exact USER/Source provenance separately from normalized wanted outcome.",
    "Use existing Collection and Disposition contracts; do not classify/reroute Needs inside the ledger logic.",
    "SATISFIED requires Evidence that the wanted outcome is achieved, not merely a Proposal/Requirement/Feature/task.",
    "A CLOSED Set receives no new Needs but may update existing tracked items.",
    "Write only the selected Need Set coordination artifact; do not commit or push."
  ],
  "userTarget": "<current/selected Need Set + USER/Source context to synchronize>",
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
    "planning/commands/work-through-idtspe.command.md",
    "planning/commands/recheck-idtspe-port-composition.command.md",
    "planning/commands/idtspe-port-persistence.command.md"
  ]
}
[/PLANNING_COMMAND_DEFINITION]
