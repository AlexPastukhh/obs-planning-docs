# Bootstrap Reusable Documentation Principles

Status: active project command definition
Scope: thin read-only shortcut for current methodology/documentation guidance; semantic authority remains in the mapped Documentation/IDTSPE/profile owners.

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
  "meaning": "Use current Documentation principles plus the Methodology Use-Case Registry Map to resolve relevant repository methodology guidance. This is a thin read-only shortcut; it does not create a separate Session/documentation runtime and does not enable IDTSPE.",
  "activeContextBehavior": "Resolve the current methodology-use situation through UC-DOC-USE-REPOSITORY-GUIDANCE and the registry map. Read only the relevant current Documentation/IDTSPE/profile owners. With no concrete task, perform a compact guidance orientation and stop without inventing a Target.",
  "traversalReadMode": "Targeted current guidance: Methodology Use-Case Registry Map + UC-DOC-USE-REPOSITORY-GUIDANCE + current Documentation principles; follow additional registries/owners only when their applicability is material.",
  "ownerFiles": [
    "planning/documentation/use-case-registry-map.md",
    "planning/documentation/use-cases/UC-DOC-USE-REPOSITORY-GUIDANCE.md",
    "planning/documentation/principles-and-terminology.md"
  ],
  "expectedOutput": "Compact read-only methodology guidance orientation: current applicable methodology Use Case(s), relevant owners/registries, contextual applicability/adaptation notes and any unresolved authority question; no forced Target and no repository mutation.",
  "permissionMode": "read-only",
  "keyReminders": [
    "This command is a thin shortcut to current methodology-use navigation, not a separate bootstrap mode or Session planning owner.",
    "Start from UC-DOC-USE-REPOSITORY-GUIDANCE and the Methodology Use-Case Registry Map; IDTSPE remains always active and proportionally composed.",
    "Recommended guidance is not automatically selected/executed: apply as-is, adapt, defer or omit according to current context and owner contracts.",
    "README/index navigation, commands, examples and Helper projections do not override canonical methodology/semantic owners.",
    "If no active task exists, orient to current guidance and stop instead of inventing a Target.",
    "Read-only: no file edits, archive, commit or push."
  ],
  "userTarget": "<documentation work in this session or none yet>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
