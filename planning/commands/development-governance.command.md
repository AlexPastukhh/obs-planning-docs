# Development Governance Mode

Status: active project command definition
Scope: working-context governance shortcut; semantic authority remains in linked registries/principles.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "palette": true,
  "refinements": [],
  "id": "governance.development",
  "file": "development-governance.command.md",
  "command": "режим разработки",
  "englishName": "development governance mode",
  "commandFamily": [
    "режим разработки",
    "development governance mode"
  ],
  "description": "load planning + documentation governance",
  "meaning": "Establish planning-governed application-development context and documentation governance without authorizing edits by itself.",
  "activeContextBehavior": "Use the active application/repository target when clear.",
  "traversalReadMode": "Full for governance/root planning owners; targeted for selected planning Use Cases and application Scenarios/current owners.",
  "ownerFiles": [
    "planning/AI-WORKING-CONTRACT.md",
    "planning/README.md",
    "planning/direction-registry.md",
    "planning/documentation/application-planning/application-planning-principles-and-terminology.md",
    "planning/documentation/application-planning/solution-and-scenario-planning-workflow.md",
    "planning/documentation/principles-and-terminology.md"
  ],
  "expectedOutput": "Established development governance route: selected planning Workspace Use Case and/or application Scenario/current owner plus documentation owner when docs are affected; no mutation permission implied.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Develop from current selected planning meaning, not an unreviewed Idea or conversational assumption.",
    "Resolve current Direction / Application Scenario / Scenario owner before materially changing behavior.",
    "Implementation Idea is not selected architecture.",
    "Documentation changed during development must follow reusable documentation principles.",
    "Code does not silently create a second documentation owner.",
    "This command establishes working rules only; actual edits require the applicable authorization."
  ],
  "userTarget": "<application/development work in this session>"
}
[/PLANNING_COMMAND_DEFINITION]
