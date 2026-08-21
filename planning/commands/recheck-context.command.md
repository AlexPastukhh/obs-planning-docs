# Recheck Context

Status: retired compatibility project command definition
Scope: legacy explicit recheck shortcut retained only for compatibility; current material-answer quality is owned by built-in AI reviewability principles.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "context_recheck.apply",
  "file": "recheck-context.command.md",
  "command": "обс",
  "englishName": "recheck context",
  "commandFamily": [
    "обс",
    "chat rech",
    "recheck"
  ],
  "description": "legacy context recheck",
  "meaning": "Legacy explicit recheck shortcut; current material answers use built-in focus and integration recheck before return.",
  "activeContextBehavior": "If explicitly invoked for compatibility, recheck the selected current target using the current reviewability principles; do not treat this shortcut as a separate current planning capability.",
  "traversalReadMode": "Targeted/full by risk and current owner uncertainty.",
  "ownerFiles": [
    "planning/documentation/ai-reviewability-and-directed-planning-principles.md"
  ],
  "expectedOutput": "Corrected current answer/review only when material new findings exist; otherwise a compact confirmation that no material omission was found.",
  "permissionMode": "read-only",
  "keyReminders": [
    "This command is legacy compatibility, not the current reviewability architecture.",
    "Use current canonical owners and checked evidence rather than rereading prior prose as authority.",
    "Preserve accepted decisions and constraints unless evidence challenges them.",
    "Do not edit files, create archives, commit or push."
  ],
  "userTarget": "<legacy explicit recheck target>",
  "palette": false,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
