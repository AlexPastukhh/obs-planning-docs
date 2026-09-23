# Build Proposal Archive

Status: active project command definition
Scope: one focused review-artifact producer route. It creates a proposal ZIP for human/AI review and never masquerades as a Replacement Package.

Canonical supporting concepts: [UC-DOC-PLAN-DOCUMENTATION-CHANGE](../documentation/use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md) and [Use Case — Situation + Result + Process](../documentation/principles-and-terminology.md#doc-use-case).

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "proposal_archive.create",
  "file": "build-proposal-archive.command.md",
  "command": "дай архив proposal",
  "englishName": "build proposal archive",
  "commandFamily": [
    "дай архив proposal",
    "дай архив пропозал",
    "собери proposal archive",
    "proposal archive",
    "давай пропозал архив",
    "сделай пропозал архив",
    "собери пропозал архив"
  ],
  "description": "produce one review-only proposal ZIP",
  "meaning": "Create one review-only coherent candidate workspace view from an explicit or smallest useful bounded scope and current Planning Resolution State. Select a compatible Proposal set; render candidate and accepted artifacts at their intended final workspace paths. A PRS authority projection identifies ACCEPTED vs PROPOSED per Target/Unit/Unit Slot, with Proposal identity, status, scope/view identity and snapshot/branch/commit basis. File path or physical persistence does not confer semantic acceptance. Conflicting versions of one path need separate views. This ZIP is never a Replacement Package and MUST NOT contain PACKAGE.json, base-files/, replacement-files/ or OBS-ACTION apply.",
  "activeContextBehavior": "Use the active selected proposal scope and current checked source/context needed to make that proposal self-contained. Do not silently convert accepted current repository state into a proposal or a proposal into accepted current semantic authority. When the proposal concerns documentation change, route its semantic planning through [UC-DOC-PLAN-DOCUMENTATION-CHANGE](../documentation/use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md) and keep Documentation Change Coverage when the change is substantial. A Use Case is a Situation + independently useful Result + Process capability; see [Use Case — Situation + Result + Process](../documentation/principles-and-terminology.md#doc-use-case) rather than inventing a new Use Case merely because a proposal archive is being produced.",
  "traversalReadMode": "Targeted/full depending on proposal scope and whether the review archive must include multiple owners/projections.",
  "ownerFiles": [
    "planning/documentation/use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md",
    "planning/documentation/principles-and-terminology.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PLANNING-RESOLUTION-STATE.md"
  ],
  "expectedOutput": "One review-only Proposal Workspace Archive: coherent final-shaped workspace paths, PRS with semantic status and recursive Proposal/Q/R/P graph, view identity/basis/scope, and navigation. No Replacement Package payload or automatic selection/persistence.",
  "permissionMode": "artifact-no-commit-push",
  "keyReminders": [
    "This command produces a review artifact, not a Replacement Package.",
    "Never include PACKAGE.json or replacement-package base-files/replacement-files protocol structure.",
    "State clearly that the archive is REVIEW-ONLY / PROPOSAL when that is the selected meaning.",
    "Include enough navigation/context that a reviewer can understand the proposal without relying on hidden chat context.",
    "A proposal archive does not create a new Use Case; reuse current semantic owners and Use Cases.",
    "Documentation-change route: [UC-DOC-PLAN-DOCUMENTATION-CHANGE](../documentation/use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md).",
    "Use Case definition/reference: [Use Case — Situation + Result + Process](../documentation/principles-and-terminology.md#doc-use-case).",
    "Do not apply locally, commit or push."
  ],
  "userTarget": "<proposal/planning scope to package for review>",
  "palette": true,
  "refinements": [],
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "UC-DOC-PLAN-DOCUMENTATION-CHANGE",
      "path": "planning/documentation/use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md",
      "anchor": "uc-doc-plan-documentation-change-plan-repository-documentation-change",
      "why": "Owns planning of a documentation change before a proposal archive is packaged; the command must preserve that planning boundary.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TM-PLANNING-RESOLUTION-STATE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PLANNING-RESOLUTION-STATE.md",
      "anchor": "tm-planning-resolution-state",
      "why": "Defines the authority projection for candidate workspace view.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
