# Plan File Update

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "file_update.plan",
  "file": "plan-file-update.command.md",
  "command": "план файл-обновление",
  "englishName": "plan file update",
  "commandFamily": [
    "план файл-обновление",
    "спланируй обновление файлов",
    "спланируй архив",
    "plan file update",
    "archive plan"
  ],
  "description": "file plan",
  "meaning": "Produce one concrete file/docs/code/archive update plan from current selected planning meaning.",
  "activeContextBehavior": "Ask target/scope only when active context does not make it clear.",
  "traversalReadMode": "Reuse/targeted/full by update risk.",
  "ownerFiles": [
    "planning/documentation/idea-planning-principles-and-terminology.md",
    "planning/documentation/idea-review-and-planning-workflow.md",
    "planning/documentation/file-update-overview-workflow.md",
    "planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md"
  ],
  "expectedOutput": "Idea-aware File Update Plan from one Current Selected Meaning: Current Conclusions, mandatory Current-Plan-relative Questions / Risks / Problems, unselected Potential Simplifications / Better Routes when material, then ordered concrete steps/files/checks/next action.",
  "permissionMode": "plan-only",
  "keyReminders": [
    "Plan file/docs/code/archive update only.",
    "Treat only explicit user statements and checked source facts as confirmed.",
    "Use shared Idea review only when the update contains material conceptual uncertainty; do not manufacture Idea analysis for mechanical updates.",
    "When alternatives are material, keep them as Idea Variants and identify one Current Selected Variant before concrete file steps.",
    "Possible Idea Refinements are not file edits and do not become selected changes automatically.",
    "Establish the one Current Plan from Current Selected Meaning before aggregate findings.",
    "Every real Questions / Risks / Problems unit states Current Plan, the unresolved/adverse finding, and its relation or impact on that plan; reference Related Idea IDs when applicable.",
    "Potential Simplifications / Better Routes contains only not-yet-selected candidate changes to Current Plan and states Current Plan plus Change To Current Plan; accepted simplifications belong in Current Conclusions/Update Steps instead.",
    "Do not use aggregate sections to confirm selected routes, repeat ordinary boundaries, or preserve completed reasoning.",
    "For unresolved important choices, keep current selected meaning explicit and surface alternatives/questions separately.",
    "End with `План файл-обновление` in planned mode.",
    "Do not edit files.",
    "Do not create archive unless separately requested."
  ],
  "userTarget": "<what update/archive should be planned>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
