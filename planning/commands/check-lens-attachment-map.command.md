# check lens attachment map

Status: active project command definition; semantic behavior remains in linked owners.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "sds.lens_attachment_map.check",
  "file": "check-lens-attachment-map.command.md",
  "command": "проверь карту атачментов линз",
  "englishName": "check lens attachment map",
  "commandFamily": [
    "проверь карту атачментов линз",
    "проверь корректность карты атачментов линз",
    "check lens attachment map"
  ],
  "description": "Check SDS Unit-to-Lens attachment projection parity",
  "meaning": "Execute SDS.LENS-ATTACHMENT-PROJECTION-INTEGRITY against the current Core+SDS Target Module Unit owners, Lens registries and SDS Lens Attachment Map.",
  "activeContextBehavior": "Use the current repository basis or explicitly supplied snapshot/archive basis. Do not form a Target; report exact projection parity or concrete drift.",
  "traversalReadMode": "Read the integrity owner, current SDS Lens Attachment Map, current Core+SDS Target Module owners and the Core+SDS Lens registries required to prove exact parity.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/registries/LENS-ATTACHMENT-MAP-INTEGRITY.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/registries/LENS-ATTACHMENT-MAP.md"
  ],
  "expectedOutput": "PASS with module/unit/REQUIRED/TRIGGERED counts, or precise DRIFT records by TM/RU showing owner expectation versus projection and defect kind; BLOCKED only when required basis is unreadable.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Unit owners are normative; the map is projection only.",
    "Compare exact attachment membership and strength, not counts alone.",
    "Validate every projected Lens identity against current Core/SDS registries.",
    "No repair, rebuild, file mutation, commit or push is authorized by this check command."
  ],
  "userTarget": "<current repository/snapshot or bounded map/owner scope>",
  "palette": true,
  "refinements": [],
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "SDS.LENS-ATTACHMENT-PROJECTION-INTEGRITY",
      "path": "planning/documentation/idtspe-methodology/active/profiles/sds/registries/LENS-ATTACHMENT-MAP-INTEGRITY.md",
      "anchor": "sds-lens-attachment-projection-integrity",
      "why": "Owns the exact Unit-owner-to-map parity algorithm, result contract and recheck conditions.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "SDS.LENS-ATTACHMENT-MAP",
      "path": "planning/documentation/idtspe-methodology/active/profiles/sds/registries/LENS-ATTACHMENT-MAP.md",
      "anchor": "sds-lens-attachment-map",
      "why": "The projection being checked; never used as normative attachment authority.",
      "role": "REGISTRY",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
