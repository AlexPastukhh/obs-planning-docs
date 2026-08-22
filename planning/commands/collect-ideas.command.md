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
  "activeContextBehavior": "Use the explicitly selected or clearly active current source. When a current integrated plan is clearly selected, use it as the current baseline and update it rather than starting another plan. For Workspace/documentation planning use UCDS proportionally. For Application planning use the same-quality SDS Step 0–4 contract from `sds-planning-profiles.md`: Why/Solution Discovery → Scenario with DATA/Behavior → Domain Draft → Slices plus contextual WEUC/architecture evidence → Practical Realization Feedback. Mini is one accumulating application-plan file; Modular/Medium splits that same meaning into a small growing file set; Full uses rich stable owners. Ask only when source/current-plan identity is genuinely missing or ambiguous.",
  "traversalReadMode": "Targeted/full by source size, current-plan/current-owner uncertainty, affected useful results and selected planning depth.",
  "ownerFiles": [
    "planning/documentation/idea-planning-principles-and-terminology.md",
    "planning/documentation/idea-review-and-planning-workflow.md",
    "planning/documentation/IDEA-REVIEW-TEMPLATE.md",
    "planning/documentation/ai-reviewability-and-directed-planning-principles.md",
    "planning/documentation/direction-and-use-case-registry-workflow.md",
    "planning/documentation/workspace-planning/workspace-planning-principles-and-terminology.md",
    "planning/documentation/workspace-planning/WORKSPACE-USE-CASE-PLANNING-TEMPLATE.md",
    "planning/documentation/profiles/sds-planning-profiles.md",
    "planning/documentation/application-planning/direction-registry.md",
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/architecture-planning/workspace-evolution-use-case-discovery-workflow.md",
    "planning/documentation/testing-planning/practical-testing-plan-workflow.md"
  ],
  "expectedOutput": "Source/Baseline/Real-Life Basis + Key Points + Related Ideas/provenance + affected Workspace UCDS or Application SDS Current Plan. For Application planning, preserve Step 0 Why/Solution Discovery, Step 1 Scenario + DATA/Behavior, Step 2 Domain Draft, Step 3 Slices + material contextual WEUC/architecture evidence, and Step 4 practical realization-feedback plan; then attached Q/R/P only for material unresolved deltas, execution/review projections when useful, Current Overall Conclusions and only genuinely unselected Better Routes.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Use the explicitly selected or clearly active current source; do not silently select an earlier archive, ledger or message.",
    "When a current integrated plan is clearly active, update that plan as baseline; do not create an append-only command-result ledger or a second competing current plan.",
    "Ordinary chat text controls requested scope/depth/lens. Do not create a persistent Focus/H0-H1-H2 state or a command for each modifier.",
    "Not every source statement is an Idea; preserve relevant Existing Reality, constraints, decisions, corrections and questions with their proper meaning.",
    "Perform every mandatory Idea review check, but do not manufacture objections, risks or refinements merely to populate fields.",
    "Actively test whether each Idea deserves implementation and whether a genuinely simpler or better route exists.",
    "Idea remains the generic Idea entity; do not create Scenario Idea, Workspace-UC Idea, File-Update Idea or other context-specific Idea types.",
    "For material selected change, resolve affected existing/new Workspace UCs or Application Scenarios using current semantic owners and normal independent-usefulness/Scenario-boundary rules.",
    "Several Ideas affecting one UC/Scenario converge into one integrated target for that unit; one cross-cutting Idea is reviewed once and referenced from affected units with local impact only.",
    "For Workspace/documentation planning use UCDS: Step 1 Use Case → Step 2 Domain/Rules → Step 3 Vertical Slice/Realization.",
    "For Application planning preserve the full SDS reasoning shape: Step 0 Real-Life Need → Current Reality → solution alternatives → Application Concept/responsibility/prototype; Step 1 Scenario + Scenario DATA + Behavior Items + material Requirements/Screens; Step 2 Domain Draft; Step 3 Slice Strategy/Slices + material contextual WEUC instances/likelihood/change paths/architecture evidence; Step 4 practical realization-feedback planning.",
    "Mini, Modular/Medium and Full SDS have the same semantic quality. Mini keeps the complete plan in one file; Modular reorganizes without losing reviewed DATA/Behavior or other selected meaning; Full increases stable addressability.",
    "For Step 3 architecture judgment, prefer concrete contextual WEUC instances with likelihood/value/timing and expected Workspace Change Paths over generic future flexibility; derive Change Pressure/Architecture Decisions only when evidence supports them.",
    "Use planning dependency direction upstream → downstream. Preserve early later-step insight as provisional context, but do not let downstream convenience normally define upstream meaning.",
    "For Workspace/documentation planning, Step 1 + Step 2 is the normal default once the UC boundary is sufficiently grounded; Step 1 may stand alone while the target UC picture is materially unresolved; include Step 3 when explicitly requested or realization is sufficiently grounded/useful.",
    "Plan from Need/situation → UC/Scenario → Current→Target. Derive Q/R/P only after a concrete owner/current planned state exists; do not walk a FIND queue.",
    "Execution order is the selected route through planned work; represent genuine parallelism/dependencies rather than forcing a total order. Application execution order may group Slices by versions/releases.",
    "Current State normally uses a high-level summary + direct current-owner links. Target changed/new semantic meaning must be complete enough that implementation does not invent missing decisions; keep Current→Target Transition separate.",
    "When several UCs/Slices are affected, review their combined architecture effect, including material WEUC/change-path evidence, and challenge unnecessary shared coordination owners.",
    "The command is read-only orchestration, not semantic authority. Read affected current Solution/Scenario/Domain/Slice/Architecture/Testing owners instead of copying their contracts into the command.",
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
