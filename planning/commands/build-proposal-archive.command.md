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
    "proposal archive"
  ],
  "description": "produce one review-only proposal ZIP",
  "meaning": "Package the currently selected proposal/planning target into one review-only ZIP that is easy to inspect, discuss and compare. The archive is descriptive planning output, not an executable repository transition: it MUST NOT contain PACKAGE.json, base-files/replacement-files replacement protocol payloads or OBS-ACTION apply instructions. Preserve enough README/navigation/context inside the archive for a reviewer to understand what is proposed, what is intentionally not current truth, and which questions or migration consequences remain open.",
  "activeContextBehavior": "Use the active selected proposal scope and current checked source/context needed to make that proposal self-contained. Do not silently convert accepted current repository state into a proposal or a proposal into accepted current semantic authority. When the proposal concerns documentation change, route its semantic planning through [UC-DOC-PLAN-DOCUMENTATION-CHANGE](../documentation/use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md) and keep Documentation Change Coverage when the change is substantial. A Use Case is a Situation + independently useful Result + Process capability; see [Use Case — Situation + Result + Process](../documentation/principles-and-terminology.md#doc-use-case) rather than inventing a new Use Case merely because a proposal archive is being produced.",
  "traversalReadMode": "Targeted/full depending on proposal scope and whether the review archive must include multiple owners/projections.",
  "ownerFiles": [
    "planning/documentation/use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md",
    "planning/documentation/principles-and-terminology.md"
  ],
  "expectedOutput": "One review-only proposal ZIP with clear proposal status/readme and the complete selected proposal artifacts needed for review. No PACKAGE.json, no replacement-package base/replacement payloads, no apply/finalize/commit/push instructions and no claim that proposed target meaning is already current.",
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
    "methodology.use_cases.recheck"
  ]
}
[/PLANNING_COMMAND_DEFINITION]
