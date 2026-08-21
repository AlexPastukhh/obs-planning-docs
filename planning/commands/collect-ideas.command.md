# Collect Ideas

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable Idea and Workspace-planning behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "ideas.collect",
  "file": "collect-ideas.command.md",
  "command": "собери идеи",
  "englishName": "collect ideas",
  "commandFamily": [
    "собери идеи",
    "collect ideas"
  ],
  "description": "collect/review Ideas and integrate affected useful-result planning",
  "meaning": "Extract coherent Ideas from the selected source, preserve material non-Idea context, perform the shared Standard Idea Review, resolve affected/new Workspace Use Cases or Application Scenarios and return one integrated plan grouped by those useful-result owners to the requested/justified planning depth.",
  "activeContextBehavior": "Use the explicitly selected or clearly active current source; ask only when the source is genuinely missing or ambiguous. Use an explicitly requested planning depth when stated. For documentation/Workspace planning, normally continue through Step 1 + Step 2 when the UC boundary is sufficiently grounded; include Step 3 only when requested or realization is sufficiently grounded. For Application behavior, use current Scenario/Application Planning owners proportionally rather than forcing the Workspace planning shape onto the application boundary.",
  "traversalReadMode": "Targeted/full by source size, current-owner uncertainty, affected useful results and selected planning depth.",
  "ownerFiles": [
    "planning/documentation/idea-planning-principles-and-terminology.md",
    "planning/documentation/idea-review-and-planning-workflow.md",
    "planning/documentation/IDEA-REVIEW-TEMPLATE.md",
    "planning/documentation/direction-and-use-case-registry-workflow.md",
    "planning/documentation/workspace-planning/workspace-planning-principles-and-terminology.md",
    "planning/documentation/workspace-planning/WORKSPACE-USE-CASE-PLANNING-TEMPLATE.md"
  ],
  "expectedOutput": "Source/Baseline + Current Plan Snapshot + early Current-Plan-relative Questions/Risks/Problems + compact cross-cutting Ideas when material + detailed groups by affected/new Workspace UC or Application Scenario, each planned to the requested/justified depth + Resolved UC Graph/Cross-UC or Cross-Slice Architecture Review when several units are materially involved + Current Overall Conclusions + only unselected Potential Simplifications/Better Routes.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Use the explicitly selected or clearly active current source; do not silently select an earlier archive, ledger or message.",
    "Not every source statement is an Idea; preserve relevant Existing Reality, constraints, decisions, corrections and questions with their proper meaning.",
    "Perform every mandatory Idea review check, but do not manufacture objections, risks or refinements merely to populate fields.",
    "Actively test whether each Idea deserves implementation and whether a genuinely simpler or better route exists.",
    "Idea remains the generic Idea entity; do not create Scenario Idea, Workspace-UC Idea, File-Update Idea or other context-specific Idea types.",
    "For material selected change, resolve affected existing/new Workspace UCs or Application Scenarios using current semantic owners and normal independent-usefulness/Scenario-boundary rules.",
    "Several Ideas affecting one UC/Scenario converge into one integrated target for that unit; do not create one competing target per Idea.",
    "One cross-cutting Idea that affects several units is reviewed once and referenced from each affected unit with only its local impact.",
    "Keep Questions / Risks / Problems near the beginning after a short Current Plan Snapshot; aggregate units remain unresolved/adverse delta to Current Plan, not a confirmation log.",
    "For each affected Workspace UC, keep Step 1, Step 2 and Step 3 inside the same UC block. Preserve earlier later-step knowledge as Carry-Forward Context; do not silently finalize it before its dedicated review.",
    "For documentation/Workspace planning, Step 1 + Step 2 is the normal default once the target UC boundary is grounded. Step 1 may stand alone when the target UC/Scenario picture is still materially unresolved.",
    "Step 3 includes expected Workspace Change Path + proportional current Architecture Lens before exact files when architecture is material; do not optimize raw step/file count.",
    "Current State normally uses a high-level summary + direct current-owner links. Target changed/new semantic meaning must be complete enough that implementation does not invent missing decisions; keep Current→Target Transition separate.",
    "When several UCs/Slices are affected, review their combined architecture effect, classify cross-Slice overlap and challenge the number/necessity of shared coordination owners.",
    "The command is an orchestration shortcut, not semantic authority. Read the affected current UC/Scenario/Domain/Architecture owners instead of copying their contracts into the command.",
    "Potential Simplifications / Better Routes contains only not-yet-selected candidate changes to Current Plan and is removed once a candidate is selected.",
    "When scope logging is already active, treat the material review result as a loggable source for the next approved mutation/package; this read-only command itself does not edit logs.",
    "Do not edit repository files, create an archive, commit or push."
  ],
  "userTarget": "<source/discussion to collect Ideas from>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
