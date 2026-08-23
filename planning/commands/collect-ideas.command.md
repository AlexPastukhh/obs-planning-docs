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
  "description": "collect/review Ideas with contextual semantic integration",
  "meaning": "Use the generic Idea/Concern working shell: extract coherent Ideas and provenance, preserve material non-Idea meaning, review Ideas, determine the real contextual semantic integration target when useful, and show current/preliminary integration without inventing a planning unit. Q/R/P follows the shared Concern/Decision model. The command stops before explicit Pre-Update/file realization and before practical realization/evidence.",
  "activeContextBehavior": "Use the explicitly selected or clearly active source and one current plan when one exists. Infer the useful integration target from context (for example Workspace UC, Application Scenario, Domain, Slice or another real owner); if no grounded integration surface exists, pure Idea + Concern work is valid. Traverse UCDS/Application SDS only to the semantic depth justified by the source/current plan. Full lifecycle awareness does not authorize automatic Pre-Update or Step 4 execution.",
  "traversalReadMode": "Targeted/full by source size, current-plan/current-owner uncertainty, affected useful results and selected planning depth.",
  "ownerFiles": [
    "planning/documentation/planning-concerns-and-decisions-model.md",
    "planning/documentation/idea-planning-principles-and-terminology.md",
    "planning/documentation/idea-review-and-planning-workflow.md",
    "planning/documentation/IDEA-REVIEW-TEMPLATE.md",
    "planning/documentation/ai-reviewability-and-directed-planning-principles.md",
    "planning/documentation/direction-and-use-case-registry-workflow.md",
    "planning/documentation/workspace-planning/use-case-registry.md",
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/architecture-planning/use-case-registry.md",
    "planning/documentation/testing-planning/use-case-registry.md",
    "planning/documentation/profiles/sds-planning-profiles.md"
  ],
  "expectedOutput": "Source/Baseline/Real-Life Basis + Key Points/Review Priority + reviewed Ideas/provenance + contextual Current/Preliminary Integration when useful + Area Concern Register/active-residual Concern state when material + Current Overall Conclusions + explicit downstream handoff. Exact file Pre-Update and practical realization/evidence are not executed unless separately requested.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Use the explicitly selected or clearly active current source; do not silently select an earlier archive, ledger or message.",
    "When a current integrated plan is clearly active, update that plan as baseline; do not create an append-only command-result ledger or a second competing current plan.",
    "Ordinary chat text controls requested scope/depth/lens. Do not create a persistent Focus/H0-H1-H2 state or a command for each modifier.",
    "The automatic collect-ideas lifecycle is Phase 1 Idea/Concern Review + Phase 2 Semantic Integration when grounded. Phase 3 Pre-Update (exact owners/files/actions/checks) and Phase 4 Realization/Evidence/Review are explicit continuations only.",
    "When several Ideas combine around one meaningful unit, propose a contextual preliminary integration/draft view so their combined effect can be reviewed. Mark it current-selected, preliminary, candidate/draft or explanatory; never silently promote provisional meaning to canonical truth.",
    "Do not manufacture a Scenario/UC/Domain/Slice merely because Ideas exist. Pure Idea/Q/R/P work is a valid result when no useful integration target is grounded.",
    "Not every source statement is an Idea; preserve relevant Existing Reality, constraints, decisions, corrections and questions with their proper meaning.",
    "Perform every mandatory Idea review check, but do not manufacture objections, risks or refinements merely to populate fields.",
    "Actively test whether each Idea deserves implementation and whether a genuinely simpler or better route exists.",
    "Idea remains the generic Idea entity; do not create Scenario Idea, Workspace-UC Idea, File-Update Idea or other context-specific Idea types.",
    "For material selected change, resolve affected existing/new Workspace UCs or Application Scenarios using current semantic owners and normal independent-usefulness/Scenario-boundary rules.",
    "Several Ideas affecting one UC/Scenario converge into one integrated target for that unit; one cross-cutting Idea is reviewed once and referenced from affected units with local impact only.",
    "For Workspace/documentation planning, use current Workspace UCs proportionally for semantic integration. Do not enter exact file realization merely because UCDS has a Step 3; exact files/actions belong to explicit Pre-Update for this command family.",
    "For Application planning, know the full SDS lifecycle: Step 0 Why/Solution → Step 1 Scenario + DATA/Behavior → Step 2 Domain → Step 3 Slices plus material WEUC/architecture/testing planning → Step 4 implementation/executed proof/actual evidence. Traverse only the source-justified semantic depth automatically; Step 4 is downstream, not automatic collect-ideas scope.",
    "Mini, Modular/Medium and Full SDS have the same semantic quality. Mini keeps the complete plan in one file; Modular reorganizes without losing reviewed DATA/Behavior or other selected meaning; Full increases stable addressability.",
    "For Step 3 architecture judgment, prefer concrete contextual WEUC instances with likelihood/value/timing and expected Workspace Change Paths over generic future flexibility; derive Change Pressure/Architecture Decisions only when evidence supports them.",
    "Use planning dependency direction upstream → downstream. Preserve early later-step insight as provisional context, but do not let downstream convenience normally define upstream meaning.",
    "For Workspace/documentation planning, Step 1 + Step 2 remains a normal semantic depth once the UC boundary is grounded. Carry high-level realization implications forward when useful, but require explicit Pre-Update before choosing concrete repository files/actions.",
    "Plan from Need/situation → UC/Scenario → Current→Target. Derive Q/R/P only after a concrete owner/current planned state exists; do not walk a FIND queue.",
    "Execution order is the selected route through planned work; represent genuine parallelism/dependencies rather than forcing a total order. Application execution order may group Slices by versions/releases.",
    "Current State normally uses a high-level summary + direct current-owner links. Target changed/new semantic meaning must be complete enough that implementation does not invent missing decisions; keep Current→Target Transition separate.",
    "When several UCs/Slices are affected, review their combined architecture effect, including material WEUC/change-path evidence, and challenge unnecessary shared coordination owners.",
    "The command is read-only orchestration, not semantic authority. Read affected current Solution/Scenario/Domain/Slice/Architecture/Testing owners instead of copying their contracts into the command.",
    "Potential Simplifications / Better Routes contains only not-yet-selected candidate changes to Current Plan and is removed once a candidate is selected.",
    "Apply Key Points / Review Priority and built-in recheck before returning material output; `крит` remains an optional separate adversarial review.",
    "When scope logging is already active, treat the material review result as a loggable source for the next approved mutation/package; this read-only command itself does not edit logs.",
    "Do not edit repository files, create an archive, commit or push.",
    "Use the shared Planning Concern/Decision owner for Q/R/P semantics: group related concerns by one resolution surface; keep member Priority/Concern Category/Status; one logical Concern/Group has one detailed storage location plus Area Concern Register routing when material.",
    "For material active concerns, provide a useful AI Comment that separates plan/evidence implications from user-owned Needs/preferences/feelings/business priority/risk tolerance. Recommendation is optional and Decision exists only after actual selection.",
    "Answered/resolved/eliminated items leave active Q/R/P; retain material answer/rationale/Decision trace when useful and keep residual Risk/Problem active."
  ],
  "userTarget": "<source/discussion to collect Ideas from>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
