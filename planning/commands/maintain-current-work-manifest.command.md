# Maintain Current Work Manifest

Status: active project command definition
Scope: one direct cross-pass current-work coordination route. Reusable semantics remain in linked owners.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.current-work.manifest.maintain",
  "file": "maintain-current-work-manifest.command.md",
  "command": "веди сессионный манифест",
  "englishName": "maintain current work manifest",
  "commandFamily": [
    "веди сессионный манифест",
    "обнови сессионный манифест",
    "синхронизируй сессионный манифест",
    "веди current work manifest",
    "maintain session manifest",
    "maintain current work manifest"
  ],
  "description": "Maintain/reconcile the accepted Session State Current Work Manifest and its re-entry/navigation projection.",
  "meaning": "Maintain the accepted WORK-MANIFEST.md owned by UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE. Synchronize factual execution consequences and cross-turn coordination directly, while material AI-derived prospective plan changes remain Proposal-first through Core PRS/Proposal semantics. Session State supplies the ambient representation; P-14 is not the reason the Manifest exists.",
  "activeContextBehavior": "Use the current Work Context and current canonical owner state. Reuse an existing trustworthy Manifest when present; refresh only materially changed coordination/inventory/re-entry information. Current USER input and canonical owner state override stale Manifest projections. When no dedicated Manifest is material, report NOT_APPLICABLE/CHECKED_NO_CHANGE rather than inventing one for tiny one-pass work.",
  "traversalReadMode": "Read Maintain Current Work State plus only the current owner/artifact references needed to synchronize the Manifest. Do not reread or duplicate full Need/PRS/Review/Turn-Work-Record bodies when compact canonical references are sufficient.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-current-work-state/UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "IDTSPE.UC.MAINTAIN-CURRENT-WORK-STATE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-current-work-state/UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE.md",
      "anchor": "current-work-manifest",
      "why": "Owns the Current Work Manifest as cross-pass coordination/navigation projection while preserving the natural semantic owners it references.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "REPRESENTATION.ARTIFACT-PLACEMENT",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md",
      "anchor": "representation-artifact-placement",
      "why": "Owns the Manifest's physical representation, placement/reuse/update and persistence permission boundary.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ],
  "expectedOutput": "The accepted Current Work Manifest is synchronized or a formal Proposal + complete candidate target Manifest + PRS review state is produced when prospective accepted-plan meaning would change.",
  "permissionMode": "artifact-no-commit-push",
  "keyReminders": [
    "The Manifest is accepted session-scale work state, not a semantic super-owner.",
    "Exact USER-selected prospective meaning may integrate directly with authority trace and prior-revision preservation.",
    "AI-derived material prospective change is Proposal-first.",
    "Every accepted Manifest write preserves a recoverable previous revision.",
    "Session State representation is ambient; external/durable artifact placement remains a P-14 concern."
  ],
  "userTarget": "<current substantial Work Context / session continuity scope>",
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
