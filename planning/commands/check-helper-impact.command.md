# check helper impact

Status: active project command definition; semantic behavior remains in linked owners.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "helper.impact.check",
  "file": "check-helper-impact.command.md",
  "command": "проверь влияние изменений на хелпер",
  "englishName": "check helper impact",
  "commandFamily": [
    "проверь влияние изменений на хелпер",
    "проверь влияние документации на хелпер",
    "check helper impact"
  ],
  "description": "Assess documentation changes against Helper routes and projections",
  "meaning": "Execute UC-REPO-CHECK-HELPER-IMPACT on the supplied proposed/applied change basis.",
  "activeContextBehavior": "Reuse the bounded current change context; state plan-versus-applied basis and missing evidence. Do not require a new Target.",
  "traversalReadMode": "Read the impact Use Case and inspect only affected command/registry/owner/projection inputs required by its process.",
  "ownerFiles": [
    "planning/use-cases/UC-REPO-CHECK-HELPER-IMPACT.md"
  ],
  "expectedOutput": "Evidence-backed no-impact result or concrete affected references/catalogs, useful command candidates and update/verification requirements; distinguish planned and executed checks.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Check both existing references and reachability of newly introduced capabilities.",
    "Apply the linked process; do not duplicate its checklist in this command.",
    "No new command, rebuild, repository mutation, commit or push is automatically authorized.",
    "Documentation mutation processes call the impact owner by a process link, not by a prerequisite includes edge."
  ],
  "userTarget": "<proposed/applied documentation change, diff or file scope>",
  "palette": true,
  "refinements": [],
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "HELPER.CHANGE-IMPACT",
      "path": "planning/use-cases/UC-REPO-CHECK-HELPER-IMPACT.md",
      "anchor": "uc-repo-check-helper-impact",
      "why": "Owns impact assessment, command-candidate routing, no-impact evidence and actual-change recheck.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
