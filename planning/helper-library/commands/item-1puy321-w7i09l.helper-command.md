# Helper Command — собери идеи

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "command",
  "id": "item-1puy321-w7i09l",
  "title": "собери идеи",
  "text": "[PLANNING_COMMAND]\nRead this whole command body before answering.\nDo not ignore `key_reminders`.\n\ncommand:\n  собери идеи\n\nenglish_name:\n  collect ideas\n\ncommand_family:\n  `собери идеи`\n  / `collect ideas`\n\ncommand_definition:\n  planning/commands/collect-ideas.command.md\n\nsource_of_truth:\n  Start from `planning/command-routing.md`.\n  Then read `planning/commands/collect-ideas.command.md`\n  and its linked owner files for this command route.\n\nroute_read_rule:\n  Read or reread the route when it is not current, remembered or certain.\n  Do not reconstruct command behavior from this compact prompt when the repository command definition and owner files are available.\n\nkey_reminders:\n  - Use the explicitly selected or clearly active current source; do not silently select an earlier archive, ledger or message.\n  - Preserve material non-Idea facts, constraints, decisions, corrections and questions with their real meaning.\n  - Perform every mandatory Idea review check without manufacturing objections, risks or refinements.\n  - Idea remains the generic Idea entity; do not create Scenario Idea, Workspace-UC Idea or File-Update Idea types.\n  - Resolve affected existing/new Workspace UCs or Application Scenarios using current semantic owners.\n  - Several Ideas affecting one UC/Scenario converge into one integrated target; keep one cross-cutting Idea body and reference local impact from affected units.\n  - Keep a short Current Plan Snapshot then Questions / Risks / Problems near the beginning; Q/R/P is unresolved/adverse delta to Current Plan.\n  - For each affected Workspace UC, keep Step 1, Step 2 and Step 3 inside the same UC block; preserve later-step knowledge as Carry-Forward until reviewed.\n  - For documentation/Workspace planning, Step 1 + Step 2 is the normal default once the UC boundary is grounded; Step 3 includes Workspace Change Path + proportional Architecture Lens before exact files when selected.\n  - Current State normally summarizes/links current owners; Target changed/new meaning must be complete enough to avoid implementation-time semantic invention; keep Transition separate.\n  - When several UCs/Slices are affected, review combined architecture, overlap and shared coordination owners.\n  - The command is read-only orchestration, not semantic authority; Potential Simplifications contains only unselected changes to Current Plan.\n  - Do not edit repository files, create an archive, commit or push.\n\nuser_target:\n  <source/discussion to collect Ideas from>\n[/PLANNING_COMMAND]",
  "createdAt": "2026-08-18T08:43:13.127Z",
  "updatedAt": "2026-08-21T10:32:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
