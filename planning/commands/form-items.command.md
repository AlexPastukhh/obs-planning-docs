# Form Items

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "planning_items.form",
  "file": "form-items.command.md",
  "command": "сформируй айтемы",
  "englishName": "form items",
  "commandFamily": [
    "сформируй айтемы",
    "form items"
  ],
  "description": "full-message Planning Item formation",
  "meaning": "Form complete reviewable Planning Items from the selected discussion/message/file/ledger.",
  "activeContextBehavior": "Use the explicitly selected or clearly active current source; ask only when missing or ambiguous.",
  "traversalReadMode": "Targeted/full by source size and current-owner uncertainty.",
  "ownerFiles": [
    "planning/documentation/application-planning/planning-item-formation-workflow.md",
    "planning/documentation/application-planning/templates/PLANNING-ITEM-REVIEW-TEMPLATE.md",
    "planning/planning-input-conventions.md"
  ],
  "expectedOutput": "Complete Planning Items For Review with complete source context, Source Contributions and transformations.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Use the explicitly selected or clearly active current source; do not silently select an earlier archive, ledger or message.",
    "Preserve complete source messages, accumulating item meanings and typed Source Contributions.",
    "Perform a proportional current-owner check and show Current, Incoming and Resulting meanings for non-trivial transformations.",
    "Preserve optional relation-backed Implementation Ideas as separate Planning Items rather than copied text.",
    "Explicit review remains required.",
    "Do not edit repository files, create an archive, commit or push."
  ],
  "userTarget": "<source/discussion to form items from>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
