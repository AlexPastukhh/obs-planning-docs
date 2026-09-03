# Audit Review Coverage And Quality

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable review-audit behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "review_audit.recheck",
  "file": "review-audit.command.md",
  "command": "перепроверь",
  "englishName": "audit review coverage and quality",
  "commandFamily": [
    "перепроверь",
    "перепроверь нормально",
    "audit review coverage",
    "recheck review coverage"
  ],
  "description": "incrementally recheck review coverage/quality and expose evidence",
  "meaning": "Report what was actually checked, what remains partial/unchecked, whether prior review is sufficient, and what the current repeat review newly added without blindly replaying already-current sufficient checks.",
  "activeContextBehavior": "Use the selected current target and the most relevant prior review evidence when available. On repeated review, first target changed/stale/unchecked/partial/weak/newly relevant material and only resample already-current sufficient material when risk, dependency changes, explicit full repetition or validation sampling justifies it.",
  "traversalReadMode": "Incremental targeted/full by requested claim, prior coverage, freshness, risk, dependency impact and unresolved gaps.",
  "ownerFiles": [
    "planning/documentation/review-audit-workflow.md",
    "planning/documentation/ai-reviewability-and-directed-planning-principles.md"
  ],
  "expectedOutput": "Checked files/semantic units + Not Checked/Partial + Review Quality/Sufficiency + Material Findings/Corrections + Review Delta vs prior relevant review + Next Useful Checks.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Name files actually inspected and material semantic units; file count alone is not review evidence.",
    "Never claim a file/unit checked when it was not actually inspected to the depth required by the claim.",
    "On repeat review, prefer changed, stale, previously unchecked, partial/weak, dependency-affected or newly relevant material over mechanically rechecking everything.",
    "Already-current sufficient material may still be sampled for high risk, weak prior evidence, changed dependencies, explicit full repetition or validation sampling.",
    "If no meaningful new review work was possible, say so instead of presenting repetition as progress.",
    "This command audits review coverage/quality; it does not replace the semantic review being audited and grants no repository mutation, archive, commit or push permission."
  ],
  "userTarget": "<review target / prior review / claim to recheck>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
