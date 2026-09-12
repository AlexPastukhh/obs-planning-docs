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
    "planning/documentation/idtspe-methodology/active/ai-reviewability/README.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/qrp-lifecycle-and-review-contract.md",
    "planning/documentation/review-diff-review-workflow.md"
  ],
  "expectedOutput": "Truth-seeking verdict grounded in checked owners/evidence; material corrective candidate answers are Proposals under the canonical Proposal lifecycle; material Q/R/P uses the Core Q/R/P contract; ReviewDiff targets use the ReviewDiff semantic-review workflow.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Treat target as hypothesis, not accepted truth.",
    "Use Proposal candidate review for material answer-seeking corrective alternatives; do not manufacture Proposals for mechanical findings.",
    "When the target is a ReviewDiff, distinguish technical integrity from semantic correctness and follow the ReviewDiff semantic-review workflow.",
    "Surface material Q/R/P through the Core contract; AI review may recommend technical/logical routes when justified but must not invent user-owned preferences or mark them selected.",
    "Do not edit files, create archives, commit or push."
  ],
  "userTarget": "<what should be critically reviewed>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
