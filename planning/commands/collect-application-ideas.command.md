# Collect Application Ideas

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "ideas.collect.application",
  "file": "collect-application-ideas.command.md",
  "command": "собери идеи приложения",
  "englishName": "collect application ideas",
  "commandFamily": [
    "собери идеи приложения",
    "application ideas",
    "собери план приложения"
  ],
  "description": "accumulate whole-Application Ideas into one SDS Current Plan",
  "meaning": "Run the shared collect-ideas shell with the integration target fixed to the whole accumulating Application Current Plan. Know the complete SDS Step 0–4 lifecycle, but automatically traverse only the semantic depth justified by the source/current plan and stop before explicit Pre-Update and practical realization/evidence.",
  "activeContextBehavior": "Use the selected Application/current plan. Start from unresolved upstream meaning when needed and move through Reality/Solution/Application Concept/Scenario/Domain/Slices only as justified; preserve later-layer insights as carry-forward rather than forcing every lifecycle phase.",
  "traversalReadMode": "Reuse current reliable SDS governance; targeted refresh by selected owner/current-plan uncertainty/source-justified planning depth; full SDS governance preflight only when no reliable sufficient pass exists.",
  "ownerFiles": [
    "planning/documentation/application-planning/application-planning-governance-read-workflow.md",
    "planning/documentation/planning-concerns-and-decisions-model.md",
    "planning/documentation/idea-planning-principles-and-terminology.md",
    "planning/documentation/idea-review-and-planning-workflow.md",
    "planning/documentation/IDEA-REVIEW-TEMPLATE.md",
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/application-planning/application-planning-principles-and-terminology.md",
    "planning/documentation/application-planning/solution-and-scenario-planning-workflow.md",
    "planning/documentation/application-planning/detailed-planning/README.md",
    "planning/documentation/profiles/sds-planning-profiles.md",
    "planning/documentation/architecture-planning/use-case-registry.md",
    "planning/documentation/testing-planning/use-case-registry.md"
  ],
  "expectedOutput": "One integrated Application Current Plan at source-justified SDS depth, with reviewed Ideas, current/preliminary integration, Q/R/P/Decisions and downstream handoffs; no automatic Pre-Update or Step 4 execution.",
  "permissionMode": "read-only",
  "keyReminders": [
    "This result-producing command explicitly depends on complete SDS governance: reuse a reliable prior pass, refresh only affected governance when material, and perform the full SDS preflight internally only when no reliable sufficient pass exists; do not ask the user to invoke `бутстреп сдс` separately.",
    "This is a high-level accumulator/orchestration command, not a new semantic Use Case. Follow the current canonical UC/Scenario owners linked by ownerFiles.",
    "`собери идеи приложения` already represents the full semantic Application SDS lifecycle; do not invent a separate `full application ideas` command. Mini/Modular/Full are physical/addressability profiles, not quality levels.",
    "Preserve Step 0 Need/Solution, Step 1 Scenario+DATA+Behavior, Step 2 Domain and Step 3 Slice/WEUC/Architecture/Testing meaning when material; Step 4 actual realization/evidence remains explicit downstream work.",
    "Use one accumulating Current Plan for the selected target; do not create an append-only command-result ledger.",
    "Use the shared Planning Concern/Decision model for Q/R/P, grouping, Priority/Category/Status, AI Comment, Decision and retained/residual trace.",
    "Automatic scope stops after the selected/source-justified semantic integration. Exact repository files/actions require explicit Pre-Update; implementation/executed proof/ReviewDiff evidence is downstream and explicit.",
    "Do not edit repository files, create an archive, commit or push."
  ],
  "userTarget": "<selected source/current planning target>",
  "palette": true,
  "refinements": [],
  "directionIds": [
    "DIR-PLAN-SOLUTION"
  ]
}
[/PLANNING_COMMAND_DEFINITION]
