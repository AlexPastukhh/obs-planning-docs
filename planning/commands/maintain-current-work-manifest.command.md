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
  "meaning": "Maintain/reconcile the accepted WORK-MANIFEST.md under its natural owner. When substantive Manifest reconciliation is the selected WR-3 subject, route it through SHELL preparation, Question sweep and the default archive/continuation boundary before forming a Proposal and complete candidate target Manifest. Factual/exact selected synchronization remains governed by its own direct owner and the same default preparation boundary when it is a selected task; ambient WR-2 triage is not a separate Manifest task. Session State supplies representation; AI-derived prospective changes remain Proposal-first.",
  "activeContextBehavior": "Use the current Session State and canonical owner state. Reuse the accepted Manifest and synchronize only established consequences; if a new Session State needs its minimal accepted orientation, follow the Work Record bootstrap rule. A tiny turn does not force substantive Manifest replanning or a P-14 Work Context Bundle. Current USER input and canonical owner state override stale projections.",
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
  "expectedOutput": "After verified preparation and continuation, the accepted Manifest is synchronized or a formal Proposal + complete candidate target Manifest + PRS review state is produced; the preparation response itself reports only checked coverage and archive.",
  "permissionMode": "artifact-no-commit-push",
  "keyReminders": [
    "The Manifest is accepted session-scale work state, not a semantic super-owner.",
    "Exact USER-selected prospective meaning may integrate directly with authority trace and prior-revision preservation.",
    "AI-derived material prospective change is Proposal-first.",
    "Every accepted Manifest write preserves a recoverable previous revision.",
    "Session State representation is ambient; external/durable artifact placement remains a P-14 concern.",
    "This root action and execution-bearing dependencies wait after the default preparation archive until USER continuation; includes alone do not create that pause."
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
    "planning/commands/sweep-session-work-questions.command.md"
  ]
}
[/PLANNING_COMMAND_DEFINITION]
