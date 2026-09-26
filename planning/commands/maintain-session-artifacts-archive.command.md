# Maintain Session Artifacts In Archive

Status: active project command definition
Scope: one direct portable Work Context Bundle/archive maintenance route built on normal session-artifact maintenance.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.current-work.artifacts.archive",
  "file": "maintain-session-artifacts-archive.command.md",
  "command": "веди сессионные артефакты в архиве",
  "englishName": "maintain current work artifacts in archive",
  "commandFamily": [
    "веди сессионные артефакты в архиве",
    "веди артефакты сессии в архиве",
    "обнови архив сессионных артефактов",
    "синхронизируй архив сессионных артефактов",
    "maintain session artifacts in archive",
    "maintain current work artifacts archive"
  ],
  "description": "Maintain the current work artifact set and materialize/rematerialize it as one portable Work Context Bundle/archive.",
  "meaning": "Run normal current-work artifact maintenance first, then require a portable P-14 Work Context Bundle/archive representation for the resulting material artifact set. Reuse/update the existing bundle when suitable; otherwise materialize/rematerialize one with the Current Work Manifest (normally `WORK-MANIFEST.md` or an established equivalent) as the primary entry point. Archive membership is representation only and never changes Need/PRS/Review/P-02/Revalidation semantic authority.",
  "activeContextBehavior": "Use the artifact set/inventory produced by the included session-artifact maintenance command. If a current suitable Work Context Bundle already exists, update/rematerialize it rather than creating parallel archives. Include only materially useful working artifacts/evidence and canonical references needed for portable re-entry. When archive writing/placement is unavailable, report BLOCKED/DEFERRED while preserving the synchronized loose-artifact state.",
  "traversalReadMode": "After the included artifact-maintenance route completes, read the P-14 Work Context Bundle representation section and the synchronized Manifest/inventory. Inspect only artifact bytes/references needed to produce or refresh the portable bundle.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-current-work-state/UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "REPRESENTATION.ARTIFACT-PLACEMENT",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md",
      "anchor": "work-context-bundle",
      "why": "Owns the portable Work Context Bundle/archive representation, primary Manifest entry, member-role labeling and rematerialization boundary.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.UC.MAINTAIN-CURRENT-WORK-STATE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-current-work-state/UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE.md",
      "anchor": "current-work-manifest",
      "why": "Provides the primary cross-pass Manifest/inventory entry that the portable archive exposes without taking over its semantic coordination role.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ],
  "expectedOutput": "A synchronized current-work artifact set plus one current portable Work Context Bundle/archive with an obvious Manifest primary entry, materially useful members/references, explicit representation roles and no semantic-authority transfer. If archive materialization is unavailable, explicit BLOCKED/DEFERRED rather than false archive success.",
  "permissionMode": "artifact-no-commit-push",
  "keyReminders": [
    "This command includes normal session-artifact maintenance; do not reimplement its inventory/currentness semantics.",
    "Archive representation is additional to artifact maintenance, not a new semantic lifecycle.",
    "Prefer update/rematerialization of one existing suitable Work Context Bundle over parallel archives.",
    "The Manifest is the portable entry point; bundle membership never establishes semantic authority.",
    "Do not commit or push."
  ],
  "userTarget": "<current Work Context artifact set to keep in a portable archive>",
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
    "planning/commands/maintain-session-artifacts.command.md"
  ]
}
[/PLANNING_COMMAND_DEFINITION]
