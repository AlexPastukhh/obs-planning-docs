# Check Linked Notes Justification

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "lenscmd.linked-notes.justify",
  "file": "check-linked-notes-justification.command.md",
  "command": "проверь оправданы ли linked notes",
  "englishName": "check linked notes justification",
  "commandFamily": [
    "проверь оправданы ли linked notes"
  ],
  "description": "direct IDTSPE Lens check",
  "meaning": "Resolve/reuse the natural host Target and apply LENS-LINKED-NOTES-USAGE-JUSTIFICATION without creating a Lens-owned Target.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/reusable/LENS-LINKED-NOTES-USAGE-JUSTIFICATION.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "JUSTIFIED / NOT_JUSTIFIED / route-to-reference-object with the concrete navigation job; no notes storage tree.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Resolve or reuse the natural IDTSPE Target/owner context before applying the Lens.",
    "A direct Lens command never creates a Lens-owned Target or a parallel runtime.",
    "Return findings to the natural semantic owner and use P-14 only after representation/placement is actually needed.",
    "This command is read-only planning; it does not mutate repository files, commit or push."
  ],
  "userTarget": "<target/result>",
  "palette": true,
  "helperPresentation": {
    "whenToUse": "Use when several existing owners may benefit from backlinks/query/traversal and you want to prove that Linked Notes is worth it.",
    "whatYouGet": "JUSTIFIED / NOT_JUSTIFIED / route-to-reference-object with the concrete navigation job; no notes storage tree.",
    "navigation": {
      "viewId": "IDTSPE",
      "viewLabel": "IDTSPE",
      "sectionId": "lens-operations",
      "sectionLabel": "Lens Operations",
      "sectionOrder": 1,
      "itemOrder": 3,
      "kindLabel": "IDTSPE LENS",
      "viewOrder": 0
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "LENS",
    "targetModuleId": null,
    "lensId": "LENS-LINKED-NOTES-USAGE-JUSTIFICATION",
    "parentSurface": null,
    "hostTargetPolicy": "RESOLVE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
