# Reconcile Planning Items

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "planning_items.reconcile",
  "file": "reconcile-planning-items.command.md",
  "command": "сверь айтемы",
  "englishName": "reconcile planning items",
  "commandFamily": [
    "сверь айтемы",
    "сверь айтемы с документацией",
    "проверь айтемы по репозиторию",
    "reconcile planning items",
    "reconcile items"
  ],
  "description": "workflow integrity + traceable item transformations",
  "meaning": "Reconcile selected working/local/unprocessed Planning Items against current owners and workflow integrity.",
  "activeContextBehavior": "Use the clearly active item set or same-message attached item source; ask only when missing or ambiguous.",
  "traversalReadMode": "Targeted/full by independent End-To-End Workflow or affected non-workflow review object.",
  "ownerFiles": [
    "planning/documentation/application-planning/application-planning-drafting-workflow.md"
  ],
  "expectedOutput": "Read-only reconciliation with workflow-integrity verdicts, traceable transformations and resulting canonical item set.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Reconcile the selected working, local or unprocessed Planning Items with relevant current repository documentation.",
    "Identify each genuinely independent End-To-End Workflow and each affected non-workflow primary review object.",
    "For every End-To-End Workflow, trace trigger, preconditions, mandatory stages, branches/loops, review gates and result/end state, then report the workflow-integrity verdict.",
    "Do not split one mandatory workflow into peer workflow candidates or slices. If one owns a missing mandatory stage, combine the slices or reclassify them as supporting artifacts.",
    "Treat Planning Drafts, models, views, terminology, root summaries and capability/detail slices as supporting or non-workflow primary review objects unless they have an independent trigger-to-result lifecycle.",
    "Review several End-To-End Workflows separately only when each is independently traversable; then check cross-workflow and resulting-item-set consistency.",
    "Show the complete before/after workflow or non-workflow review object, including changed and preserved parts, purpose, boundaries, conflicts and unresolved choices.",
    "For each selected workflow/review object, show the current canonical item set, incoming meanings with semantic names and IDs only as secondary traceability, proposed actions and the resulting canonical item set.",
    "For every non-trivial transformation, show original/current item(s), every incoming/expanding/correcting meaning and resulting item(s) separately in one small variable-row table; use — where a field does not apply and do not show only the result.",
    "Do not assume one incoming item becomes one new canonical item: it may keep, update, rename, add, merge, split, move, link, defer, supersede, remove or reject meaning.",
    "Preserve relevant hypothesis, risk, key-situation and prototype/test context through item transformations; report a compact prototype/risk follow-up without creating a prototype or accepting architecture.",
    "Do not edit files, update item registers, create an archive, commit or push."
  ],
  "userTarget": "<which items or item source should be reconciled>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
