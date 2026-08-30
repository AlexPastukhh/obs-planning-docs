# Work Through Idtspe

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.work",
  "file": "work-through-idtspe.command.md",
  "command": "работай через idtspe",
  "englishName": "work through IDTSPE",
  "commandFamily": [
    "работай через idtspe",
    "режим idtspe"
  ],
  "description": "Use IDTSPE as the default material-planning operating mode.",
  "meaning": "Resolve scope/Target and continue material planning through the IDTSPE Shell. Broad Discussion may span turns; material logical parts use Key Points proportionally, and material Ideas are explicit and Address the current Target Goal/Question/Problem without a mandatory block-owner or per-response Intake Summary. Periodic Integration Checkpoints reconcile Target Goal context + coherent Generic State + Target Result. AI proposals remain Ideas until selected.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/broad-discussion-and-integration-checkpoint-model.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Broad Discussion with proportional Key Points for material logical parts and explicit Idea → current Target Goal/Question/Problem relations; no mandatory block-owner or per-response Intake Summary. When a whole-state view is requested/useful, an Integration Checkpoint reconciles Target Goal context, coherent Generic State, applicable Target Result Units, Lens/consistency review, Decision retention/rationale/alternative choices and physical Artifact Placement only when material.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "SDS is an IDTSPE profile, not a second runtime.",
    "AI proposals are Ideas by default; every material Idea is explicit, carries Addresses → current Target Goal/Question/Problem and becomes a Decision only when actually selected.",
    "Broad Discussion is not a full state dump; material logical parts use Key Points proportionally and no block-owner/per-response Intake Summary is mandatory. An Integration Checkpoint is the periodic whole-state reconciliation and does not imply completion or file persistence.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation and P-14 when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<current planning work>",
  "palette": true,
  "directionIds": [
    "DIR-REPOSITORY"
  ],
  "helperPresentation": {
    "whenToUse": "When you want subsequent material planning to run through IDTSPE without choosing an SDS module manually; use normal discussion for exploration and ask for/checkpoint the integrated whole when useful.",
    "whatYouGet": "Broad Discussion with proportional Key Points for material logical parts and explicit Idea → driver relations, plus periodic Integration Checkpoints that reconcile Target Goal context + Generic State + Target Result, preserve unresolved alternatives and separate semantic Decision retention from physical persistence.",
    "navigation": {
      "viewId": "IDTSPE",
      "viewLabel": "IDTSPE",
      "sectionId": "core",
      "sectionLabel": "IDTSPE Core",
      "sectionOrder": 0,
      "itemOrder": 1,
      "kindLabel": "WORK MODE",
      "viewOrder": 0
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "WORK_MODE",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "NONE"
  }
}
[/PLANNING_COMMAND_DEFINITION]
