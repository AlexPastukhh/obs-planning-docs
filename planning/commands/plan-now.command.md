# Plan Now

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "plan.now",
  "file": "plan-now.command.md",
  "command": "планируй",
  "englishName": "plan now",
  "commandFamily": [
    "планируй",
    "plan now"
  ],
  "description": "plan now",
  "meaning": "Ask the always-active IDTSPE work context to plan the smallest useful next planning action from current context. This may remain Broad Discussion, refine sparse State, form/reuse a Target, consult a registry, apply a relevant component, integrate or revalidate; no structural step is mandatory.",
  "activeContextBehavior": "Re-evaluate current methodology Use Cases, normally UC-IDTSPE-COMPOSE-CURRENT-WORK. Use the active concern/context when clear. If a Target or specialized component is not yet useful, continue Broad Discussion rather than inventing one.",
  "traversalReadMode": "Reuse/targeted by uncertainty.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/compose-current-work-use-case.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-methodology-use-case-registry.md"
  ],
  "expectedOutput": "The smallest useful next planning action/composition for current context, including Broad Discussion/no structural change when that is sufficient.",
  "permissionMode": "plan-only",
  "keyReminders": [
    "IDTSPE is already active; this command does not enable a planning mode.",
    "Re-evaluate current Use-Case composition before choosing deeper methodology machinery.",
    "Do not manufacture a Target, Checkpoint, State Unit, Target Module or Lens merely to produce structure.",
    "Treat only explicit user statements and checked source facts as confirmed.",
    "Use component-local applicability/materiality when a Target Module/Lens/Unit is considered.",
    "Do not edit files or create an archive unless separately requested and authorized."
  ],
  "userTarget": "<what should be planned>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
