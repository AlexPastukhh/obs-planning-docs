# Review Documentation Links

Status: active project command definition
Scope: focused read-only documentation-navigation review routed through the existing documentation review Use Case.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "documentation.links.review",
  "file": "review-documentation-links.command.md",
  "command": "проверь связность документации",
  "englishName": "review documentation links",
  "commandFamily": [
    "проверь связность документации",
    "проверь markdown-ссылки",
    "проверь ссылки документации",
    "review documentation links"
  ],
  "description": "focused Markdown navigation and link correctness review",
  "meaning": "Review one selected documentation scope for useful direct Markdown navigation, broken path/fragment targets, misleading links to stale or non-authoritative artifacts, and cases where a registry or stronger tracked relation is actually justified. This is a focused invocation of the existing documentation-review capability, not a new semantic Use Case and not a generic repository-link crawler by default.",
  "activeContextBehavior": "Use the explicitly selected documentation file/folder/scope. Start from current semantic owners and navigation expectations. Treat ordinary relative Markdown links as the default lightweight navigation relation when a reader materially benefits from direct traversal. Do not turn every textual mention into a link and do not infer semantic ownership, synchronization or review-on-change obligations merely from a valid link.",
  "traversalReadMode": "Targeted to selected documentation scope plus current navigation/owner routes needed to judge the links.",
  "ownerFiles": [
    "planning/documentation/use-cases/UC-DOC-REVIEW-DOCUMENTATION.md",
    "planning/documentation/principles-and-terminology.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md"
  ],
  "expectedOutput": "One compact Documentation Link Review containing scope, Broken Links, Missing Useful Direct Links, Misleading/Stale Links, Wrong Navigation Mechanism when material, and verdict OK or NEEDS_CORRECTION. Distinguish mechanical link validity from semantic/navigation correctness.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Ordinary relative Markdown links are the default lightweight navigation mechanism when direct traversal is materially useful.",
    "A Markdown link is navigation/addressability only; it does not create semantic ownership, dependency, synchronization or review-on-change authority.",
    "Broken paths or fragments are documentation defects, but zero broken links does not prove useful navigation.",
    "Flag important plain-text references that should be direct links when readers otherwise must search manually.",
    "Flag links that technically resolve but lead to stale, legacy or non-authoritative destinations when a current owner exists.",
    "Use a registry for useful many-owner overview and Linked Notes/tracked relations only when their stronger behavior is justified.",
    "Do not mutate repository files under this command."
  ],
  "userTarget": "<documentation file/folder/scope to review>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
