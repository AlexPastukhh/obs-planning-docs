# Plan Documentation Change

Status: active project command definition
Scope: direct invocation backing the existing documentation-change Use-Case card.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "documentation.change.plan",
  "file": "plan-documentation-change.command.md",
  "command": "спланируй изменение документации",
  "englishName": "plan documentation change",
  "commandFamily": [
    "спланируй изменение документации",
    "спланируй изменение методологии",
    "plan documentation change",
    "plan methodology change"
  ],
  "description": "Plan a documentation or methodology change through its existing Use Case",
  "meaning": "Invoke UC-DOC-PLAN-DOCUMENTATION-CHANGE through its current owner Process. Resolve documentation meaning, ownership and affected projections to the depth needed for exact realization; the Use Case remains semantic authority.",
  "activeContextBehavior": "Use the current documentation/methodology change need and accepted context. Follow UC-DOC-PLAN-DOCUMENTATION-CHANGE, including its applicability and proportionality. Preserve the current IDTSPE Work Context. This is planning; do not invent a separate Target or restart settled upstream work merely because a command was selected.",
  "traversalReadMode": "Resolve the current UC through the Methodology Use-Case Registry Map and its documentation registry, then read/reuse the owner and relevant downstream contracts proportionally.",
  "ownerFiles": [
    "planning/documentation/use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "UC-DOC-PLAN-DOCUMENTATION-CHANGE",
      "path": "planning/documentation/use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md",
      "anchor": "uc-doc-plan-documentation-change-plan-repository-documentation-change",
      "why": "Owns documentation/methodology change planning, semantic boundaries and downstream handoffs.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ],
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md"
  ],
  "processCalls": [
    {
      "id": "helper-impact",
      "commandPath": "planning/commands/check-helper-impact.command.md",
      "at": {
        "path": "planning/documentation/use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md",
        "anchor": "doc-helper-impact-before-handoff"
      },
      "when": "Apply the Planning Helper repository applicability gate at this owner point before handing off the documentation change.",
      "context": "Use the current proposed documentation/methodology delta, affected owners and planning basis. Consume concrete Helper consequences or evidenced no-impact before realization handoff; reuse a matching assessment already completed through owner revalidation. Actual post-realization verification remains a later applied-basis check."
    }
  ],
  "expectedOutput": "Documentation change meaning and affected owners/projections resolved proportionally under UC-DOC-PLAN-DOCUMENTATION-CHANGE, with its Helper impact obligation completed/reused or explicitly inapplicable on evidence, ready for the authorized realization route.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "The UC owns the process; this command supplies explicit invocation and traversal only.",
    "Invoke Helper Impact at its declared process point, not as a prerequisite before the documentation delta is known.",
    "A matching assessment reached through the owner links can be reused with evidence; reading a link alone is not execution.",
    "Proposed-change assessment does not prove verification of the later applied change.",
    "This invocation grants no mutation, build/test, commit or push permission."
  ],
  "userTarget": "<documentation or methodology change need and current context>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
