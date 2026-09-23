# Read Full Project Documentation Example

Status: active project command definition
Scope: read the independent Study Tab Launcher documentation example through the canonical Documentation Example Reading contract.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "documentation.example.full.read",
  "file": "read-full-documentation-example.command.md",
  "command": "посмотри полный пример документации",
  "englishName": "read full project documentation example",
  "commandFamily": [
    "посмотри полный пример документации",
    "прочитай полный пример документации",
    "read full documentation example"
  ],
  "description": "Посмотреть полный сохранённый пример документации Study Tab Launcher и связи между его владельцами.",
  "meaning": "Read the complete Study Tab Launcher documentation example through its case guide at planning/documentation/idtspe-methodology/active/profiles/sds/examples/study-tab-launcher/README.md and copied project entry at planning/documentation/idtspe-methodology/active/profiles/sds/examples/study-tab-launcher/project/planning/documentation/README.md. Follow DOC.EXAMPLE-READING to understand the connected application documentation: Application Definition, Features, Scenarios, Screen, Domain, Slices, Shared capabilities, evolution and practical evidence. Use the guide's current Target Module links when comparing the example with current contracts.",
  "activeContextBehavior": "The example is fixed by this command, so no existing Target or user-supplied example path is required. Preserve any current Work Context. Give a connected overview of the full project example, then read deeper where the current request needs detail; do not substitute a single isolated Target Module example for the project overview.",
  "traversalReadMode": "Read or validly reuse planning/documentation/idtspe-methodology/active/profiles/sds/examples/study-tab-launcher/README.md, then planning/documentation/idtspe-methodology/active/profiles/sds/examples/study-tab-launcher/project/planning/documentation/README.md and its linked project documentation. Cover the document families and follow at least one connected Feature → Scenario → Slice path together with current/unrealized ownership and open Evidence. Expand remaining project files where materially needed for the request. The embedded historical methodology/source-context is supporting provenance, not a requirement to read every historical file or bootstrap from its registries.",
  "ownerFiles": [
    "planning/documentation/principles-and-terminology.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/examples/study-tab-launcher/README.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/examples/study-tab-launcher/project/planning/documentation/README.md"
  ],
  "expectedOutput": "A compact linked map of the full documentation example: its document families and relationships, which Target Modules it illustrates, one connected owner path, current versus unrealized meaning, and open Problems/practical evidence. Identify what was read or reused and any task-relevant deeper reading still needed; do not claim all files were read merely from reading the index.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Start with the copied full-project example: planning/documentation/idtspe-methodology/active/profiles/sds/examples/study-tab-launcher/README.md.",
    "Then open the copied project documentation: planning/documentation/idtspe-methodology/active/profiles/sds/examples/study-tab-launcher/project/planning/documentation/README.md.",
    "Read the independent example inside methodology; do not resolve it through a live application workspace.",
    "Current methodology contracts retain authority over the dated embedded snapshot.",
    "Preserve the unrealized Step and OPEN P-STL-HANDOFF-01/practical evidence as recorded.",
    "Reading this example does not authorize Target formation, Proposal selection, edits, implementation, tests, commit or push."
  ],
  "userTarget": "<full copied Study Tab Launcher documentation example>",
  "palette": true,
  "refinements": [],
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "DOC.EXAMPLE-READING",
      "path": "planning/documentation/principles-and-terminology.md",
      "anchor": "doc-example-reading",
      "why": "Owns example reading, relevance/basis checks and the explanatory authority boundary. The concrete copied example is supplied through ownerFiles and explicit route paths.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
