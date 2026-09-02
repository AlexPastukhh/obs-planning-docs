# Plan Frontend Realization — Compatibility Alias

Status: legacy compatibility command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.slice.frontend",
  "file": "plan-frontend-slice.command.md",
  "command": "спланируй frontend",
  "englishName": "plan frontend slice",
  "commandFamily": [
    "спланируй frontend"
  ],
  "description": "legacy compatibility alias; frontend realization stays in the vertical Slice",
  "meaning": "Legacy frontend-planning alias. Resolve/reuse the parent TM-IMPLEMENTATION-SLICE and apply the UI / Spatial / Frontend Realization Lens proportionally; if a frontend-specific problem is independently substantial, normal Target Formation may create a Local Target Contract. Do not create a Frontend Slice Target family.",
  "activeContextBehavior": "Resolve or reuse the natural current vertical Slice/Target. Keep frontend realization inside that Slice by default; use normal Target Formation only for independently substantial unresolved local design space.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-IMPLEMENTATION-SLICE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/lenses/reusable/LENS-UI-SPATIAL-FRONTEND-REALIZATION.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Frontend-specific realization meaning resolved inside the current vertical Slice, or a normal Local Target Formation candidate when independently substantial.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Compatibility alias only; SDS has no TM-FRONTEND-SLICE Target family.",
    "A Slice remains one useful vertical result; frontend/backend are not separate Slice identities by default.",
    "Use the UI/Spatial/Frontend Lens as a reusable evaluation perspective when useful.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<current vertical Slice / frontend realization problem>",
  "palette": false,
  "helperPresentation": null,
  "refinements": [],
  "methodologyBinding": null
}
[/PLANNING_COMMAND_DEFINITION]
