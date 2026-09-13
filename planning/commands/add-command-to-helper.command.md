# Add Command To Planning Helper

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "helper.command.add",
  "file": "add-command-to-helper.command.md",
  "command": "добавь команду в хелпер",
  "englishName": "add command to planning helper",
  "commandFamily": [
    "добавь команду в хелпер",
    "создай команду в хелпере",
    "add command to helper"
  ],
  "description": "Create or update one real Planning Command and synchronize its Planning Helper projection.",
  "meaning": "Create or update one current direct Planning Command through UC-REPO-MAINTAIN-PLANNING-COMMAND, then synchronize only the affected Planning Helper projection and generated artifacts. The direct planning/commands/*.command.md definition remains command authority; Planning Helper remains a projection.",
  "activeContextBehavior": "Use the command intent already supplied in the current conversation. Ask only when the intended trigger, semantic capability, owner route or permission boundary is materially unresolved and cannot be derived from current authority. If the required semantic capability does not yet exist, establish/route that semantic work to its proper owner before creating the command.",
  "traversalReadMode": "Scan planning/use-case-registry.md and follow UC-REPO-MAINTAIN-PLANNING-COMMAND, the command registry/routing workflow and the Helper projection workflow. Inspect Helper README, build/runtime projection and relevant tests only to the depth needed for this command. Compare the complete current command catalog for ID/canonical-trigger/alias collisions before writing.",
  "ownerFiles": [
    "planning/use-case-registry.md",
    "planning/use-cases/UC-REPO-MAINTAIN-PLANNING-COMMAND.md",
    "planning/command-routing.md",
    "planning/commands/README.md",
    "planning/documentation/command-planning-workflow.md",
    "planning/documentation/command-routing-workflow.md",
    "planning/documentation/tampermonkey-command-projection-workflow.md",
    "planning/documentation/tools/tampermonkey/chat-command-palette/README.md",
    "planning/documentation/tools/tampermonkey/chat-command-palette/build-chat-command-palette.mjs",
    "planning/documentation/tools/tampermonkey/chat-command-palette/package.json"
  ],
  "expectedOutput": "One valid current direct Planning Command with the correct semantic owner route, aliases, permissions and output contract; only the affected Planning Helper projection/runtime classification is changed where needed, generated artifacts are rebuilt rather than hand-edited, and catalog/build/test/verify checks pass.",
  "permissionMode": "bounded-repository-write-no-commit-push",
  "keyReminders": [
    "The real command authority is planning/commands/*.command.md; Planning Helper must not become a second command authority.",
    "Resolve the semantic capability and owner route before creating the command; do not invent reusable semantics inside the command body.",
    "Create or update exactly one direct command definition for one command identity per invocation.",
    "Check IDs, canonical triggers and aliases against the complete current command catalog.",
    "Do not add Helper-only When To Use / What You Get semantic prose.",
    "Normally change the direct command and let the Helper build regenerate seed/commands.json and the generated userscript.",
    "Do not hand-edit generated seed files or the generated userscript.",
    "Update catalog-order.json only when an explicit durable presentation position is useful.",
    "Edit Planning Helper runtime/build source only when the command needs projection behavior the existing model cannot derive, such as Tools / Repository classification.",
    "After changes run the Planning Helper build, tests, build:check and verify.",
    "Do not create a replacement package, commit or push unless separately requested."
  ],
  "userTarget": "<new or changed command trigger, intended meaning and relevant context>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
