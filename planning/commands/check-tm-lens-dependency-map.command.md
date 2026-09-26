# check target module lens dependency map

Status: active project command definition; semantic behavior remains in linked owners.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.tm_lens_dependency_map.check",
  "file": "check-tm-lens-dependency-map.command.md",
  "command": "составь карту зависимостей таргет модулей и линз",
  "englishName": "build target module lens dependency audit map",
  "commandFamily": [
    "составь карту зависимостей таргет модулей и линз",
    "покажи зависимости таргет модулей и линз",
    "проверь карту зависимостей линз и таргет модулей",
    "build target module lens dependency audit map"
  ],
  "description": "Build a temporary Target Module/Lens semantic-dependency audit map",
  "meaning": "Read current Target Module/Lens Semantic Owner Dependency declarations and render an on-demand audit table and reverse lookup in the answer. No maintained dependency map file exists.",
  "activeContextBehavior": "Use the current repository or an explicitly supplied snapshot and state its identity and scope. Distinguish typed dependencies from ordinary links. Report sources and unresolved references. This is read-only; do not form a Target or update a map file.",
  "traversalReadMode": "Read current Core and active-profile Target Module/Lens registries, then the concrete owners in scope and DOC.SEMANTIC-OWNER-DEPENDENCY. Do not read a stored dependency map.",
  "ownerFiles": [
    "planning/documentation/principles-and-terminology.md"
  ],
  "expectedOutput": "Temporary table: dependent TM/Lens, dependency type, Responsibility ID, canonical owner link and source declaration link; optional reverse index. State basis, coverage, unknown IDs/links and unreadable sources. Do not claim completeness for unread files. Nothing is saved unless separately requested.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Only explicit typed Semantic Owner Dependency declarations form edges; ordinary Markdown links do not.",
    "For a full-scope request, enumerate every active Core/profile Target Module and Lens from registries, account for every typed declaration, then recheck each output row against its source link before answering.",
    "Show source links and unresolved or ambiguous references; do not hide uncertainty behind a PASS label.",
    "Keep Unit-to-Lens attachments out of this dependency view.",
    "No repair, file mutation, commit or push is authorized by this read-only command."
  ],
  "userTarget": "<current repository/snapshot, component, owner responsibility or bounded dependency scope>",
  "palette": true,
  "refinements": [],
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "DOC.SEMANTIC-OWNER-DEPENDENCY",
      "path": "planning/documentation/principles-and-terminology.md",
      "anchor": "doc-semantic-owner-dependency",
      "why": "Defines the typed dependency relation and distinguishes it from ordinary links.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
