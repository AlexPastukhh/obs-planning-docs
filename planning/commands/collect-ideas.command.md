# Collect Ideas

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable Idea behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "ideas.collect",
  "file": "collect-ideas.command.md",
  "command": "собери идеи",
  "englishName": "collect ideas",
  "commandFamily": [
    "собери идеи",
    "collect ideas"
  ],
  "description": "collect and review Ideas from selected source",
  "meaning": "Extract coherent Ideas from the selected discussion/message/file/source, preserve material non-Idea context and perform the shared Standard Idea Review.",
  "activeContextBehavior": "Use the explicitly selected or clearly active current source; ask only when the source is genuinely missing or ambiguous.",
  "traversalReadMode": "Targeted/full by source size and current-owner uncertainty.",
  "ownerFiles": [
    "planning/documentation/idea-planning-principles-and-terminology.md",
    "planning/documentation/idea-review-and-planning-workflow.md",
    "planning/documentation/IDEA-REVIEW-TEMPLATE.md"
  ],
  "expectedOutput": "Reviewed Ideas/Idea Groups with Current Conclusions established before aggregate delta; mandatory Questions / Risks / Problems whose real units state Current Plan and impact; Potential Simplifications / Better Routes only for unselected candidate changes.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Use the explicitly selected or clearly active current source; do not silently select an earlier archive, ledger or message.",
    "Not every source statement is an Idea; preserve relevant Existing Reality, constraints, decisions, corrections and questions with their proper meaning.",
    "Perform every mandatory Idea review check, but do not manufacture objections, risks or refinements merely to populate fields.",
    "Actively test whether each Idea deserves implementation and whether a genuinely simpler or better route exists.",
    "Possible Idea Refinements change the Idea itself and are not accepted automatically.",
    "Establish Current Conclusions / Current Selected Variants before aggregate findings; when nothing is selected, preserve the truthful no-change/current-state baseline.",
    "Every real Questions / Risks / Problems unit states Current Plan, the unresolved/adverse finding, and its relation or impact on that plan; reference Related Idea IDs when applicable.",
    "Potential Simplifications / Better Routes contains only not-yet-selected candidate changes to Current Plan and states Current Plan plus Change To Current Plan; remove a candidate once it is selected.",
    "Do not use aggregate sections to confirm accepted decisions, repeat current boundaries, or preserve completed reasoning.",
    "When scope logging is already active, treat the material review result as a loggable source for the next approved mutation/package; this read-only command itself does not edit logs.",
    "Do not edit repository files, create an archive, commit or push."
  ],
  "userTarget": "<source/discussion to collect Ideas from>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
