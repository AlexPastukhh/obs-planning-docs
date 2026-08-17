# Build Replacement Archive

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "replacement_archive.create",
  "file": "build-replacement-archive.command.md",
  "command": "давай архив",
  "englishName": "build replacement archive",
  "commandFamily": [
    "давай архив",
    "собери архив",
    "give arch",
    "replacement package"
  ],
  "description": "output replacement package",
  "meaning": "Produce a replacement ZIP plus a short OBS-ACTION handoff. This is package-producer mode, not local apply/review/finalization mode and not archive read-source mode.",
  "activeContextBehavior": "Use the active approved scope and exact checked source state. An earlier-message archive is not current automatically. A source archive/snapshot may be selected for the active invocation when it is explicitly provided or selected for that invocation and, after inspection, matches the intended repository/target and completely covers the touched source. Otherwise use fully readable current repository files. Never guess touched base content.",
  "traversalReadMode": "Targeted/full depending on touched files and source certainty.",
  "ownerFiles": [
    "planning/documentation/build-replacement-archive-workflow.md"
  ],
  "expectedOutput": "One full replacement ZIP plus one short structured OBS-ACTION block; complete replacement/base payloads required by the package contract; no local apply/diff/finalization commands.",
  "permissionMode": "package-no-commit-push",
  "keyReminders": [
    "Package-producer mode, not archive read-source mode.",
    "An earlier-message archive is not current automatically.",
    "A source archive/snapshot explicitly provided or selected for the active invocation may be used only after verifying repository/target match and complete touched-source coverage.",
    "Otherwise use fully readable current repository files.",
    "Request only the minimum fresh source/snapshot when exact touched base content cannot be read reliably.",
    "Never guess expected base content for replace/delete operations.",
    "Produce one full replacement ZIP with PACKAGE.json, required base-files and replacement-files.",
    "Return one short OBS-ACTION whose packageId matches PACKAGE.json.",
    "Do not include clipboard/review-diff settings in OBS-ACTION.",
    "Do not apply locally, generate review/finalization commands, commit or push."
  ],
  "userTarget": "<what replacement package should include>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
