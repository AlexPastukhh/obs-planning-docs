# Bootstrap Reusable Documentation Principles

Status: active project command definition
Scope: thin read-only shortcut for using current Documentation guidance in the active Session; semantic authority remains in the current Session/Documentation owners.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "documentation_principles.read",
  "file": "read-documentation-principles.command.md",
  "command": "бутстреп документации",
  "englishName": "bootstrap reusable documentation principles",
  "commandFamily": [
    "бутстреп документации",
    "бутстреп принципов документации",
    "режим документации",
    "прочитай принципы документации",
    "прочти принципы документации",
    "принципы документации",
    "bootstrap reusable documentation principles",
    "documentation governance mode",
    "read documentation principles",
    "documentation principles",
    "docs principles"
  ],
  "description": "read current documentation guidance",
  "meaning": "Use current Documentation principles and the current Documentation Use-Case registry as repository guidance for the active Session without recreating the retired UC-DOC-ORIENT/bootstrap runtime.",
  "activeContextBehavior": "When an active documentation target is clear, use Session guidance to resolve the relevant current Documentation Use Case and owners. If no task is active, read the current Documentation principles/registry and stop without inventing a target.",
  "traversalReadMode": "Targeted current guidance: Session repository-guidance owner plus current Documentation principles and Use-Case registry; do not traverse the retired bootstrap/responsibility-map chain by default.",
  "ownerFiles": [
    "planning/session/use-cases/UC-SESSION-USE-REPOSITORY-GUIDANCE.md",
    "planning/documentation/principles-and-terminology.md",
    "planning/documentation/use-case-registry.md"
  ],
  "expectedOutput": "Compact read-only Documentation guidance orientation: relevant current Documentation Use Case/owners when applicable, current principles/registry guidance, material applicability notes or unresolved ownership questions, and the preserved permission boundary; no repository mutation.",
  "permissionMode": "read-only",
  "keyReminders": [
    "This alias is a thin invocation shortcut, not a separate Documentation orientation Use Case.",
    "Use UC-SESSION-USE-REPOSITORY-GUIDANCE for Session-level guidance selection and the current Documentation P&T/registry for Documentation meaning/navigation.",
    "Resolve the applicable current Documentation Use Case and canonical owner when one is needed; do not revive the retired pre-fundamental UC-DOC-ORIENT route.",
    "README/index navigation, commands, examples, helper projections and implementation do not override canonical semantic owners.",
    "If no active task exists, read the current guidance and stop instead of inventing a target.",
    "This command is read-only and does not authorize file edits, archive creation, commit or push."
  ],
  "userTarget": "<documentation work in this session or none yet>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
