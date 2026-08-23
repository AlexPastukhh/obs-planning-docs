# Bootstrap Application SDS Planning

Status: active project command definition
Scope: reusable Solution/Application SDS planning-governance bootstrap shortcut; semantic authority remains in linked registries/workflows/profiles/current owners.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "application_sds.bootstrap",
  "file": "bootstrap-application-sds-planning.command.md",
  "command": "бутстреп сдс",
  "englishName": "bootstrap application SDS planning",
  "commandFamily": [
    "бутстреп сдс",
    "бутстреп планирования приложения",
    "режим сдс",
    "режим планирования приложения",
    "прочитай принципы сдс",
    "прочти принципы сдс",
    "bootstrap application SDS planning",
    "bootstrap SDS planning",
    "SDS planning bootstrap",
    "read SDS planning principles"
  ],
  "description": "load complete Solution/Application SDS planning governance",
  "meaning": "Establish or refresh the complete reusable Solution/Application SDS planning governance: Step 0–4 planning, semantic ownership, Mini/Modular/Full profile invariants, Architecture/Testing handoffs and applicable current Application/project owners. This is governance bootstrap, not selection of the Full SDS profile and not task-specific planning execution.",
  "activeContextBehavior": "If an Application/project target is already clear, resolve its current Scenario/Domain/Slice/etc owners after loading governance. If no target is active, load governance and stop ready for the next Solution/Application planning task without inventing a target. Reuse a current reliable prior pass; refresh proportionally when only part may be stale.",
  "traversalReadMode": "Reuse current reliable SDS governance; targeted refresh when relevant owners/routes may be stale; full bootstrap only when no reliable sufficient pass exists or governance boundaries are materially uncertain.",
  "ownerFiles": [
    "planning/AI-WORKING-CONTRACT.md",
    "planning/documentation/application-planning/application-planning-governance-read-workflow.md",
    "planning/documentation/application-planning/direction-registry.md",
    "planning/documentation/application-planning/use-case-registry.md",
    "planning/documentation/profiles/sds-planning-profiles.md"
  ],
  "expectedOutput": "Compact SDS governance assimilation: bootstrap state, Step 0–4/profile/Architecture/Testing boundaries loaded, active target/current owners when any, permission boundary and material unresolved ownership/questions; no task-specific planning execution or repository mutation.",
  "permissionMode": "read-only",
  "keyReminders": [
    "This command bootstraps SDS governance; it does not select the Full SDS physical profile.",
    "Do not reread the complete SDS governance route when a sufficient current pass is confidently remembered.",
    "Use targeted refresh when only relevant registries/workflows/profiles/current owners may be stale or newly relevant.",
    "Use full bootstrap only when no reliable sufficient pass exists, ownership cannot be reconstructed confidently, or governance architecture changed materially.",
    "A new snapshot, commit, branch or repository state alone does not invalidate governance; refresh only when it can materially affect relevant routes, owners, rules or permissions.",
    "Preserve the complete Step 0–4 model: Why/Solution Discovery → Scenario + DATA/Behavior → Domain → Slices/Architecture/Verification Planning → Practical Realization Feedback.",
    "Mini, Modular/Medium and Full SDS have the same semantic quality; profile choice changes organization/addressability only.",
    "Scenario owns Application behavior; Screen owns spatial meaning; Domain owns explicit conceptual rules/invariants when justified; Slice owns implementation decomposition.",
    "Architecture Planning and Testing Planning are sibling Directions consumed when material and never replace Application behavior authority.",
    "If no active target exists, load governance and stop ready for the next Application planning task.",
    "This route is read-only: do not edit files, create packages, implement/test, commit or push."
  ],
  "userTarget": "<Solution/Application planning work in this session or none yet>",
  "palette": true,
  "directionIds": [
    "DIR-PLAN-SOLUTION"
  ],
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
