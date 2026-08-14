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
  "ownerFiles": [],
  "expectedOutput": "Honest verdict with strengths, weaknesses, risks, assumptions and alternatives.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Treat target as hypothesis, not accepted truth.",
    "Give honest verdict with risks and assumptions.",
    "Do not edit files, create archives, commit or push."
  ],
  "userTarget": "<what should be critically reviewed>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
