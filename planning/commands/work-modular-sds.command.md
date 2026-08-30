# Modular SDS Representation — Compatibility Alias

Status: legacy compatibility command definition
Scope: representation preference only; no separate SDS runtime/profile.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_sds.modular",
  "file": "work-modular-sds.command.md",
  "command": "модульный сдс",
  "englishName": "modular SDS",
  "commandFamily": [
    "модульный сдс",
    "медиум сдс",
    "modular sds",
    "medium sds",
    "work in modular sds",
    "work in medium sds"
],
  "description": "legacy compatibility alias; prefer MIXED / ASYMMETRIC SDS representation",
  "meaning": "Apply the MIXED / ASYMMETRIC owner/file representation preference from the canonical SDS Artifact Placement Map to the current IDTSPE/SDS planning state. This changes representation preference only; it does not select a different semantic profile, require a fixed file tree, or change Target authority.",
  "activeContextBehavior": "Reuse the current semantic owners. Consolidate/promote representation only when the MIXED / ASYMMETRIC example and current representation pressure justify it; owner identity does not change when content moves inline or to a dedicated file.",
  "traversalReadMode": "Reuse current IDTSPE/SDS governance and read the canonical Artifact Placement Map plus Documentation / Representation Lens proportionally. Do not load retired SDS profile files.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/README.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md"
  ],
  "expectedOutput": "A representation recommendation/update for the same semantic owners using the MIXED / ASYMMETRIC topology as an example, with any promotion/demotion justified by addressability/review/lifecycle pressure.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Compatibility alias only; Mini/Modular/Full are not current SDS semantic profiles.",
    "The Artifact Placement Map examples are guidance, not schemas or mandatory directories.",
    "Semantic owner != Target instance != Markdown file.",
    "Do not create Domain Draft, Frontend Slice or WEUC Target families.",
    "Do not edit repository files, create an archive, commit or push."
  ],
  "userTarget": "<current SDS plan / owner set>",
  "palette": false,
  "refinements": [],
  "directionIds": ["DIR-PLAN-SOLUTION"]
}
[/PLANNING_COMMAND_DEFINITION]
