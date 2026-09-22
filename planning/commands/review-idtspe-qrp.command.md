# Review IDTSPE Question Risk Problem State

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.qrp.review",
  "file": "review-idtspe-qrp.command.md",
  "command": "разбери q/r/p",
  "englishName": "review IDTSPE Question Risk Problem state",
  "commandFamily": [
    "разбери q/r/p"
  ],
  "description": "Review/disposition current material Question/Risk/Problem items through the canonical Q/R/P lifecycle.",
  "meaning": "Check owner attachment/admission, impact priority, status/lifecycle, answer/evidence/proposal/decision boundary and retained active projection for current material Q/R/P items.",
  "activeContextBehavior": "Compose with the current command set. Fully expand and merge all selected roots before semantic execution; reuse equivalent current work and follow the resulting dependencies-first plan.",
  "traversalReadMode": "Read this command own canonical references plus included-command references proportionally. Do not duplicate reads already satisfied by an unchanged trustworthy shared prefix.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "RESOLUTION.QRP-LIFECYCLE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md",
      "anchor": "resolution-qrp-lifecycle",
      "why": "Owns Q/R/P admission, review categories, lifecycle/status and relation to evidence/proposal/decision resolution.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ],
  "includes": [
    "idtspe.work",
    "idtspe.port-composition.recheck",
    "idtspe.port.trace",
    "idtspe.port.qrp"
  ],
  "expectedOutput": "Current material Q/R/P lifecycle state with resolved/deferred/escalated items routed correctly.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Do not create Q/R/P items for every uncertainty.",
    "Retained trace is not a duplicate semantic owner."
  ],
  "userTarget": "<current IDTSPE subject/context>",
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
  }
}
[/PLANNING_COMMAND_DEFINITION]
