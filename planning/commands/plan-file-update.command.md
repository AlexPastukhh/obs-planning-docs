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
    "пред-апдейт",
    "спланируй обновление файлов",
    "спланируй архив",
    "plan file update",
    "archive plan",
    "pre-update",
    "спланируй изменения файлов"
  ],
  "description": "Pre-Update / concrete file plan",
  "meaning": "Explicit Pre-Update continuation: translate current selected semantic planning meaning into one ordered concrete repository/file update plan with exact owners, files, add/replace/delete actions, dependencies and verification. This is plan-only and is not Application SDS Step 3 or implementation permission.",
  "activeContextBehavior": "Use the clearly selected current semantic planning result as input. Ask target/scope only when active context does not make it clear. If invoked after collect-ideas work, continue from that selected/current semantic integration instead of reopening the whole Idea review unless material uncertainty remains.",
  "traversalReadMode": "Reuse/targeted/full by update risk.",
  "ownerFiles": [
    "planning/use-cases/UC-REPO-PLAN-UPDATE.md",
    "planning/documentation/planning-concerns-and-decisions-model.md",
    "planning/documentation/idea-planning-principles-and-terminology.md",
    "planning/documentation/idea-review-and-planning-workflow.md"
  ],
  "expectedOutput": "Pre-Update / File Update Plan from one Current Selected Meaning: Current Conclusions and active concerns when material, then ordered concrete steps, exact files/actions/dependencies/checks, explicit boundaries and next authorized action.",
  "permissionMode": "plan-only",
  "keyReminders": [
    "`Pre-Update` / `пред-апдейт` invokes UC-REPO-PLAN-UPDATE for generic repository update planning; it is not a global rename for SDS/UCDS Step 3 or an implementation permission.",
    "Do not treat contextual `давай шаг 3` as a global command alias because Step 3 already has canonical meanings in SDS/UCDS; resolve it from active context instead.",
    "Plan file/docs/code/archive update only.",
    "Treat only explicit user statements and checked source facts as confirmed.",
    "Use shared Idea review only when the update contains material conceptual uncertainty; do not manufacture Idea analysis for mechanical updates.",
    "When alternatives are material, keep them as Idea Variants and identify one Current Selected Variant before concrete file steps.",
    "Possible Idea Refinements are not file edits and do not become selected changes automatically.",
    "Establish the one Current Plan from Current Selected Meaning before aggregate findings.",
    "For every material active Planning Concern/Group, use the shared owner/current-plan attachment and Priority/Concern Category/Status/grouping/AI Comment lifecycle; Related Ideas reference the canonical Concern/Group location rather than duplicate bodies.",
    "Potential Simplifications / Better Routes contains only not-yet-selected candidate changes to Current Plan and states Current Plan plus Change To Current Plan; accepted simplifications belong in Current Conclusions/Update Steps instead.",
    "Do not use aggregate sections to confirm selected routes, repeat ordinary boundaries, or preserve completed reasoning.",
    "For unresolved important choices, keep current selected meaning explicit and surface alternatives/questions separately.",
    "End with `План файл-обновление` in planned mode.",
    "Do not edit files.",
    "Do not create archive unless separately requested.",
    "Use the shared Planning Concern/Decision owner rather than a File-Update-specific Q/R/P ontology. Group concerns sharing one resolution surface and keep Priority separate from Concern Category/status.",
    "AI Comment may explain/recommend from sufficient evidence but must not invent user-owned Need/preferences/risk tolerance. Decision exists only after actual selection.",
    "One logical Concern/Group has one detailed storage location; Related Ideas/other files reference its ID/location. Resolved trivial items leave active Q/R/P while material retained trace/residual Risk/Problem remains when useful."
  ],
  "userTarget": "<what update/archive should be planned>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
