# Maintain Session Artifacts

Status: active project command definition
Scope: one direct artifact-maintenance route for the current substantial work/session context.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.current-work.artifacts.maintain",
  "file": "maintain-session-artifacts.command.md",
  "command": "веди сессионные артефакты",
  "englishName": "maintain current work artifacts",
  "commandFamily": [
    "веди сессионные артефакты",
    "обнови сессионные артефакты",
    "синхронизируй сессионные артефакты",
    "веди артефакты текущей работы",
    "maintain session artifacts",
    "maintain current work artifacts"
  ],
  "description": "Synchronize the material artifact set, inventory, currentness and placement for the current work context.",
  "meaning": "Maintain the material working artifacts for the current Work Context through P-14 Persistence / Artifact Maintenance. First synchronize the Current Work Manifest/inventory, then reconcile material artifact identity, currentness, placement, reuse/update/rematerialization and canonical references. This command does not require an archive representation by itself and never transfers semantic authority from Need/PRS/Review/P-02/Revalidation owners to P-14 or the Manifest.",
  "activeContextBehavior": "Use the current Work Context and synchronized Current Work Manifest as the inventory/navigation entry. Maintain only materially useful artifacts; mark current/historical/stale/superseded representation state proportionally, repair missing/stale placement/navigation where authorized, and preserve canonical owner references. Do not create duplicate artifacts merely to satisfy a layout. Archive/bundle materialization is not forced by this command; use the archive-specific command when an archive is explicitly required.",
  "traversalReadMode": "Read P-14 Artifact Placement/Maintenance and the synchronized Manifest inventory, then inspect only artifacts whose representation/currentness/placement may need action. Follow semantic owners only when needed to avoid stale/misleading representation.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-current-work-state/UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "REPRESENTATION.ARTIFACT-PLACEMENT",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md",
      "anchor": "work-context-bundle",
      "why": "Owns artifact maintenance, inventory-location reconciliation, representation reuse/update/rematerialization and optional Work Context Bundle selection.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.UC.MAINTAIN-CURRENT-WORK-STATE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-current-work-state/UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE.md",
      "anchor": "current-work-manifest",
      "why": "Provides the current cross-pass artifact inventory/navigation projection that artifact maintenance synchronizes rather than replacing.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ],
  "expectedOutput": "A synchronized material artifact set and Current Work Manifest inventory: artifacts are discoverable, currentness/representation roles are explicit, stale/superseded representations are not misleading, and placement/reuse/update/rematerialization actions are completed or explicitly BLOCKED/DEFERRED. No archive is required solely by invoking this generic maintenance command.",
  "permissionMode": "artifact-no-commit-push",
  "keyReminders": [
    "Artifact maintenance is representation work; semantic owners remain authoritative.",
    "Synchronize the Current Work Manifest/inventory before relying on it for artifact maintenance.",
    "Do not duplicate files merely to satisfy a session layout.",
    "This generic command does not force archive materialization.",
    "Physical writes remain bounded by current host/user authority; do not commit or push."
  ],
  "userTarget": "<current Work Context artifact set>",
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
    "planning/commands/maintain-current-work-manifest.command.md"
  ]
}
[/PLANNING_COMMAND_DEFINITION]
