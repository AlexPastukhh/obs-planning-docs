# Helper Command — давай арх

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "command",
  "id": "item-1qgcw7x-j0mc7l",
  "title": "давай арх",
  "text": "[PLANNING_COMMAND]\ncommand: давай архив\n\nThis is a legacy Planning Helper insertion wrapper, not command authority.\n\nResolve the current package-producer route from:\n1. planning/command-routing.md\n2. planning/commands/build-replacement-archive.command.md\n3. only the current ownerFiles named by that command.\n\nCurrent compatibility meaning:\n- Produce the replacement package only under the current command/owner contract and exact checked source state.\n- An earlier archive is not current automatically; verify any selected source archive/snapshot before using it.\n- Never guess touched base content.\n- Preserve current ChangeSet/package continuity rules from the command owner instead of reconstructing retired Scope Registry/action-log behavior here.\n- Return the package + OBS-ACTION handoff required by the current command.\n- Producer route only: do not Apply, ReviewDiff/Finalize, commit or push unless a separate current authorized route explicitly does so.\n\nuser_target: <what replacement package should include>\n[/PLANNING_COMMAND]",
  "createdAt": "2026-08-17T11:54:46.152Z",
  "updatedAt": "2026-09-11T00:00:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
