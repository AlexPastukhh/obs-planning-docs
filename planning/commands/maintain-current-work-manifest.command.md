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
  "description": "Maintain the central cross-pass Current Work Manifest and re-entry route for substantial IDTSPE work.",
  "meaning": "Maintain/reuse the Current Work Manifest owned by UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE. Synchronize the current USER goal/wanted-outcome references, current focus, cross-pass planned actions, material artifact inventory, Need Set / PRS / Review Coverage / Revalidation / recent P-02 references, blockers and re-entry route without copying those owners' semantic bodies. Route the physical Manifest representation through P-14; the command does not turn the Manifest into a Need Set, PRS, Review authority, P-02 trace or Session-owned planning runtime.",
  "activeContextBehavior": "Use the current Work Context and current canonical owner state. Reuse an existing trustworthy Manifest when present; refresh only materially changed coordination/inventory/re-entry information. Current USER input and canonical owner state override stale Manifest projections. When no dedicated Manifest is material, report NOT_APPLICABLE/CHECKED_NO_CHANGE rather than inventing one for tiny one-pass work.",
  "traversalReadMode": "Read Maintain Current Work State plus only the current owner/artifact references needed to synchronize the Manifest. Do not reread or duplicate full Need/PRS/Review/P-02 bodies when compact canonical references are sufficient.",
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
  "expectedOutput": "A synchronized Current Work Manifest or an explicit no-change/not-applicable result. When material, the Manifest exposes current cross-pass goals/actions, compact owner/artifact inventory, revalidation/review/P-02 references and a usable re-entry route without duplicating their semantic ownership.",
  "permissionMode": "artifact-no-commit-push",
  "keyReminders": [
    "Current Work Manifest is coordination/navigation, not a global semantic owner or backlog.",
    "Reference Need Set, PRS, Review Coverage, Revalidation Impact and P-02 instead of copying their semantic bodies.",
    "Current USER/canonical owner state wins over stale Manifest projection.",
    "Use P-14 for the physical representation; this command grants no commit/push authority."
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
    "planning/commands/include-idtspe-trace-port.command.md",
    "planning/commands/idtspe-port-persistence.command.md"
  ]
}
[/PLANNING_COMMAND_DEFINITION]
