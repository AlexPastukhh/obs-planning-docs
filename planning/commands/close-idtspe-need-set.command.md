# Close IDTSPE Need Set

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable semantics remain in linked owners.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.needs.set.close",
  "file": "close-idtspe-need-set.command.md",
  "command": "закрой текущий набор нидов",
  "englishName": "close current IDTSPE need set",
  "commandFamily": [
    "закрой текущий набор нидов",
    "закрой need set",
    "close need set",
    "idtspe needs set close"
  ],
  "description": "Close the current Need Set for new intake while preserving all non-terminal tracked Needs and canonical downstream references.",
  "meaning": "Run Need Set Coordination close: move the selected ACTIVE Set to CLOSED, stop adding newly surfaced Needs to it, preserve every TRACKING item and its canonical downstream references, and persist the coordination update through P-14. Closing a Set never implies satisfaction, retirement, rejection or deletion of its unresolved Needs.",
  "activeContextBehavior": "Resolve the current/selected ACTIVE Need Set. Close only that coordination set; keep existing non-terminal items trackable for future synchronization. If the user explicitly requests supersession or retirement of particular Needs, preserve that separate explicit basis rather than inferring it from close.",
  "traversalReadMode": "Read Need Set Coordination and the current ledger/Set representation. Follow downstream owners only when needed to avoid writing stale references; do not reopen unrelated semantic work.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/needs/NEED-SET-COORDINATION.md",
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
  "expectedOutput": "The selected Need Set is CLOSED for new intake in the P-14-selected coordination representation; unresolved tracked Needs remain present and non-terminal, with no silent retirement/deletion.",
  "permissionMode": "bounded-repository-write-no-commit-push",
  "keyReminders": [
    "Close Set ≠ satisfy/retire its Needs.",
    "Do not delete unresolved tracked items or downstream references.",
    "Need Collection/Disposition semantics remain unchanged.",
    "Write only the selected Need Set coordination artifact; do not commit or push."
  ],
  "userTarget": "<current/selected active Need Set>",
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
