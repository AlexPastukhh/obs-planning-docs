# check target module lens dependency map

Status: active project command definition; semantic behavior remains in linked owners.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.tm_lens_dependency_map.check",
  "file": "check-tm-lens-dependency-map.command.md",
  "command": "проверь карту зависимостей линз и таргет модулей",
  "englishName": "check target module lens dependency map",
  "commandFamily": [
    "проверь карту зависимостей линз и таргет модулей",
    "проверь зависимости линз и таргет модулей",
    "check target module lens dependency map"
  ],
  "description": "Check current Target Module/Lens Semantic Owner Dependency projection parity",
  "meaning": "Execute IDTSPE.TM-LENS-DEPENDENCY-PROJECTION-INTEGRITY against every current Target Module and Lens plus the active dependency projection.",
  "activeContextBehavior": "Use the current repository basis or explicitly supplied snapshot/archive basis. Do not form a Target; report exact dependency parity, incoming/outgoing impact or concrete drift.",
  "traversalReadMode": "Read the integrity owner, dependency map, current active TM/Lens owners and DOC.SEMANTIC-OWNER-DEPENDENCY as required to prove exact parity.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/navigation/TARGET-MODULE-LENS-DEPENDENCY-MAP-INTEGRITY.md",
    "planning/documentation/idtspe-methodology/active/navigation/TARGET-MODULE-LENS-DEPENDENCY-MAP.md"
  ],
  "expectedOutput": "PASS with component/dependency/direct-edge counts, or precise DRIFT records by consumer and owner edge; when asked for impact, list the exact current incoming/outgoing declared semantic dependencies. BLOCKED only when required basis is unreadable.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Component Semantic Owner Dependency declarations are normative; the map is projection only.",
    "Ordinary Markdown links are navigation and must not be promoted to dependency edges.",
    "Keep Unit-to-Lens attachment/applicability topology in its own attachment projection.",
    "Treat direct concrete TM/Lens dependencies as exceptional; prefer stable shared contracts when a reusable responsibility is the real dependency.",
    "No repair, rebuild, file mutation, commit or push is authorized by this check command."
  ],
  "userTarget": "<current repository/snapshot, component, owner responsibility or bounded dependency scope>",
  "palette": true,
  "refinements": [],
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "IDTSPE.TM-LENS-DEPENDENCY-PROJECTION-INTEGRITY",
      "path": "planning/documentation/idtspe-methodology/active/navigation/TARGET-MODULE-LENS-DEPENDENCY-MAP-INTEGRITY.md",
      "anchor": "idtspe-tm-lens-dependency-projection-integrity",
      "why": "Owns exact component-declaration-to-map parity, dependency-edge validation and recheck conditions.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.TM-LENS-DEPENDENCY-PROJECTION",
      "path": "planning/documentation/idtspe-methodology/active/navigation/TARGET-MODULE-LENS-DEPENDENCY-MAP.md",
      "anchor": "idtspe-tm-lens-dependency-map",
      "why": "The cross-Core/profile dependency projection and direct component topology being checked.",
      "role": "REGISTRY",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "DOC.SEMANTIC-OWNER-DEPENDENCY",
      "path": "planning/documentation/principles-and-terminology.md",
      "anchor": "doc-semantic-owner-dependency",
      "why": "Defines which explicit relations are semantic dependencies and why ordinary links do not create edges.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
