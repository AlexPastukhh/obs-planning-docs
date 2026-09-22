# Scan Methodology Registries

Status: active project command definition
Scope: focused read-only invocation of the existing Documentation methodology-use capability.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "methodology.registries.scan",
  "file": "scan-methodology-registries.command.md",
  "command": "пройди регистры методологии",
  "englishName": "scan methodology registries",
  "commandFamily": [
    "пройди регистры методологии",
    "проверь регистры методологии",
    "scan methodology registries"
  ],
  "description": "show current methodology registry traversal and applicability without executing components",
  "meaning": "Use UC-DOC-USE-REPOSITORY-GUIDANCE to traverse the current Methodology Use-Case Registry Map and only downstream registries reached by applicable Use-Case Processes, then return a Registry Traversal Trace.",
  "activeContextBehavior": "Reuse current trustworthy methodology-use context, refresh only stale/needed registry orientation, and show the semantic traversal. Do not automatically apply discovered components.",
  "traversalReadMode": "Start at planning/documentation/use-case-registry-map.md; scan applicable scoped Use-Case registries; open selected Use-Case owners; follow only registry directories/components reached by those Processes; load detail lazily.",
  "ownerFiles": [
    "planning/documentation/use-case-registry-map.md",
    "planning/documentation/use-cases/UC-DOC-USE-REPOSITORY-GUIDANCE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/navigation/METHODOLOGY-REGISTRY-DIRECTORY.md"
  ],
  "expectedOutput": "Registry Traversal Trace with context, scanned registries and reasons, applicable Use Cases/components, skipped registries, unresolved applicability, and Execution: NONE.",
  "permissionMode": "read-only",
  "keyReminders": [
    "SCANNED is not APPLICABLE; APPLICABLE is not SELECTED; SELECTED is not EXECUTED.",
    "Do not emit a file-read log.",
    "Do not bypass Use-Case Processes to scan all component registries globally.",
    "Do not mutate repository state."
  ],
  "userTarget": "<methodology-use context>",
  "palette": true,
  "refinements": [],
  "includes": [
    "methodology.use_cases.recheck"
  ]
}
[/PLANNING_COMMAND_DEFINITION]
