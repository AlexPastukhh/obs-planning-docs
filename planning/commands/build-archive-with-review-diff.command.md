# Build Archive With Review Diff

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "replacement_archive.review_diff.create",
  "file": "build-archive-with-review-diff.command.md",
  "command": "давай архив с review diff file",
  "englishName": "build archive with review diff",
  "commandFamily": [
    "давай архив с review diff file",
    "give arch rev dif",
    "archive with review diff file"
  ],
  "description": "output package + repo review diff",
  "meaning": "Produce a replacement archive plus the explicitly requested repository-stored review diff flow.",
  "activeContextBehavior": "Use only when review-diff-file transfer is explicitly requested. This is a legacy reviewable package route: source selection, exact local-base verification, apply/diff and review behavior come from this command's own ownerFiles, not from the producer-only build replacement archive route.",
  "traversalReadMode": "Targeted/full depending on touched files.",
  "ownerFiles": [
    "planning/documentation/reviewable-agent-output-and-commands-workflow.md",
    "planning/documentation/review-diff-file-workflow.md",
    "planning/documentation/documentation-update-workflow.md"
  ],
  "expectedOutput": "Replacement archive plus the approved review-diff-file flow; reviewed diff before commit/push.",
  "permissionMode": "package-no-commit-push",
  "keyReminders": [
    "Output-package mode with review-diff-file transfer explicitly requested.",
    "Follow this legacy route's ownerFiles for source selection, exact local-base verification, apply/diff and review.",
    "Use the review-diff-file workflow only for the approved repository-stored diff path.",
    "Produce full replacement files and apply/diff commands.",
    "Do not commit or push before the pasted diff is reviewed."
  ],
  "userTarget": "<what archive/package and review diff should include>",
  "palette": false,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
