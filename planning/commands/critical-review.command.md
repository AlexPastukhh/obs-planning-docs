# Critical Review

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "critical_review.apply",
  "file": "critical-review.command.md",
  "command": "крит",
  "englishName": "critical review",
  "commandFamily": [
    "крит",
    "crit",
    "critical review"
  ],
  "description": "critical review",
  "meaning": "Critically evaluate the target/diff/plan/claim as a hypothesis rather than accepted truth.",
  "activeContextBehavior": "Use the provided target; ask only if the target is missing.",
  "traversalReadMode": "Targeted/full by risk and evidence needs.",
  "ownerFiles": [
    "planning/documentation/planning-concerns-and-decisions-model.md",
    "planning/documentation/idea-planning-principles-and-terminology.md",
    "planning/documentation/idea-review-and-planning-workflow.md",
    "planning/documentation/review-diff-review-workflow.md"
  ],
  "expectedOutput": "Truth-seeking verdict grounded in checked owners/evidence; material corrective Ideas use shared Idea review; material Planning Concerns use shared Concern/Decision semantics; ReviewDiff targets use the ReviewDiff semantic-review workflow.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Treat target as hypothesis, not accepted truth.",
    "Use shared Idea review for material answer-seeking corrective alternatives; do not manufacture Ideas for mechanical findings.",
    "When the target is a ReviewDiff, distinguish technical integrity from semantic correctness and follow the ReviewDiff semantic-review workflow.",
    "Surface material Planning Concerns through the shared model and ask the user only for genuinely unresolved user-owned choices; AI Comment may recommend technical/logical routes when justified but must not invent preferences or mark them selected.",
    "Do not edit files, create archives, commit or push.",
    "Surface material Planning Concerns through the shared model: group one-resolution-surface Q/R/P, state priority/category/status when useful, add AI Comment without inventing user-owned preferences, recommend only when justified, and keep Decision separate until selected."
  ],
  "userTarget": "<what should be critically reviewed>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
