# Collect Ideas

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable Idea, SDS/UCDS and reviewability behavior remains in linked owner files.

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
  "description": "collect/review Ideas and update integrated current planning",
  "meaning": "Extract coherent Ideas/provenance from the selected source, preserve material non-Idea context, review necessity/better routes, resolve the affected Workspace Use Cases or Application Scenarios, and integrate selected meaning into one current plan. Q/R/P is derived only as an owner-attached unresolved/adverse delta; it is never the planning root.",
  "activeContextBehavior": "Use the explicitly selected or clearly active current source. When a current integrated plan is clearly selected, use it as the current baseline and update it rather than starting a parallel plan. For Workspace/documentation planning use UCDS (Use Case → Domain/Rules → Vertical Slice/Realization) proportionally: once the UC boundary is sufficiently grounded, normally review Step 1 + Step 2; Step 1 may stand alone while the target UC picture remains materially unresolved; include Step 3 when explicitly requested or realization is sufficiently grounded/useful. For Application planning use SDS (Scenario → Domain/Rules → Slice) proportionally. Mini is a compact representation; Modular separates owners/order as the plan grows; Full SDS uses the detailed SDS profile. Ask only when source/current-plan identity is genuinely missing or ambiguous.",
  "traversalReadMode": "Targeted/full by source size, current-plan/current-owner uncertainty, affected useful results and selected planning depth.",
  "ownerFiles": [
    "planning/documentation/idea-planning-principles-and-terminology.md",
    "planning/documentation/idea-review-and-planning-workflow.md",
    "planning/documentation/IDEA-REVIEW-TEMPLATE.md",
    "planning/documentation/ai-reviewability-and-directed-planning-principles.md",
    "planning/documentation/direction-and-use-case-registry-workflow.md",
    "planning/documentation/workspace-planning/workspace-planning-principles-and-terminology.md",
    "planning/documentation/workspace-planning/WORKSPACE-USE-CASE-PLANNING-TEMPLATE.md",
    "planning/documentation/profiles/sds-planning-profiles.md"
  ],
  "expectedOutput": "Source/Baseline/Real-Life Basis + Key Points + Related Ideas/provenance + affected Workspace UC/Application Scenario Current→Target planning in proportional UCDS/SDS + attached Q/R/P only when material unresolved deltas remain + Review Order lens only when useful + execution order/versions when selected + cross-unit review + Current Overall Conclusions + only genuinely unselected Better Routes.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Use the explicitly selected or clearly active current source; do not silently select an earlier archive, ledger or message.",
    "When a current integrated plan is clearly active, update that plan as baseline; do not create an append-only command-result ledger or parallel Goal Map.",
    "Ordinary chat text controls requested scope/depth/lens. Do not create a persistent Focus/H0-H1-H2 state or a command for each modifier.",
    "Not every source statement is an Idea; preserve relevant Existing Reality, constraints, decisions, corrections and questions with their proper meaning.",
    "Perform every mandatory Idea review check, but do not manufacture objections, risks or refinements merely to populate fields.",
    "Actively test whether each Idea deserves implementation and whether a genuinely simpler or better route exists.",
    "Idea remains the generic Idea entity; do not create Scenario Idea, Workspace-UC Idea, File-Update Idea or other context-specific Idea types.",
    "For material selected change, resolve affected existing/new Workspace UCs or Application Scenarios using current semantic owners and normal independent-usefulness/Scenario-boundary rules.",
    "Several Ideas affecting one UC/Scenario converge into one integrated target for that unit; one cross-cutting Idea is reviewed once and referenced from affected units with local impact only.",
    "For Workspace/documentation planning use UCDS: Step 1 Use Case → Step 2 Domain/Rules → Step 3 Vertical Slice/Realization. For Application planning use SDS: Scenario → Domain/Rules → Slice. The semantic rules do not become weaker in Mini form.",
    "Use planning dependency direction upstream → downstream. Preserve early later-step insight as provisional context, but do not let downstream convenience normally define upstream meaning.",
    "For Workspace/documentation planning, Step 1 + Step 2 is the normal default once the UC boundary is sufficiently grounded; Step 1 may stand alone while the target UC picture is materially unresolved; include Step 3 when explicitly requested or realization is sufficiently grounded/useful.",
    "Plan from Need/situation → UC/Scenario → Current→Target. Derive Q/R/P only after a concrete owner/current planned state exists; do not walk a FIND queue.",
    "Execution order is the selected route through planned work; represent genuine parallelism/dependencies rather than forcing a total order. Application execution order may group Slices by versions/releases.",
    "Current State normally uses a high-level summary + direct current-owner links. Target changed/new semantic meaning must be complete enough that implementation does not invent missing decisions; keep Current→Target Transition separate.",
    "When several UCs/Slices are affected, review their combined architecture effect, classify cross-Slice overlap and challenge the number/necessity of shared coordination owners.",
    "The command is an orchestration shortcut, not semantic authority. Read affected current UC/Scenario/Domain/Architecture owners instead of copying their contracts into the command.",
    "Potential Simplifications / Better Routes contains only not-yet-selected candidate changes to Current Plan and is removed once a candidate is selected.",
    "Apply Key Points / Review Priority and built-in recheck before returning material output; `крит` remains an optional separate adversarial review.",
    "When scope logging is already active, treat the material review result as a loggable source for the next approved mutation/package; this read-only command itself does not edit logs.",
    "Do not edit repository files, create an archive, commit or push."
  ],
  "userTarget": "<source/discussion to collect Ideas from>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
