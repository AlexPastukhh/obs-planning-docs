# IDTSPE Proposal-Driven Work

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.proposal",
  "file": "idtspe-proposal.command.md",
  "command": "idtspe пропозал",
  "englishName": "IDTSPE proposal-driven work",
  "commandFamily": [
    "idtspe пропозал",
    "idtspe proposal",
    "idtspe proposals",
    "idtspe пропозалы"
  ],
  "description": "Work through the current IDTSPE context with canonical Proposal/Q-R-P/Decision lifecycle under USER-gated interaction.",
  "meaning": "Apply the Session USER-gated proposal-driven interaction policy and compose the current IDTSPE Work Context through canonical Core Proposal/Decision and Q/R/P lifecycle semantics. Material candidate Unit/Target/owner meaning remains Proposal until selected through the canonical lifecycle; material unresolved Question/Risk/Problem meaning remains governed by the Q/R/P owner. This command creates no parallel Proposal, Decision or Q/R/P semantics.",
  "activeContextBehavior": "Use the current Work Context and re-evaluate UC-IDTSPE-COMPOSE-CURRENT-WORK proportionally. Express material candidate meaning as formal IDTSPE Proposal State only when lifecycle/addressability/review is useful, link material Q/R/P through their canonical owner, perform proportional candidate review, and wait for USER selection at material gates. Selected meaning may then flow to Decision / Target Result / natural-owner state under normal authority.",
  "traversalReadMode": "Reuse current reliable Core governance. Otherwise read the current composition/state model plus canonical Proposal/Decision and Q/R/P lifecycle owners, and the Session USER-gated interaction owner. Load profile/Target/Lens detail only when the current composition makes it applicable.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/compose-current-work-use-case.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/maintain-current-work-state-use-case.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/qrp-lifecycle-and-review-contract.md",
    "planning/session/principles-and-terminology.md",
    "planning/session/session-runtime-contract.md"
  ],
  "expectedOutput": "Current useful IDTSPE work is USER-gated and represented canonically: material candidate meaning remains Proposal, relevant Q/R/P remains linked through its lifecycle, proportional candidate review is performed when useful, and only USER-selected/otherwise-authoritatively selected meaning becomes Decision / Target Result / natural-owner state.",
  "permissionMode": "read-only-planning-unless-separately-authorized",
  "keyReminders": [
    "The Session policy owns when AI must stop for USER input; IDTSPE Core owns formal Proposal/Q/R/P/Decision semantics.",
    "AI recommendation is not selection; Proposal becomes Decision/current owner meaning only through normal authority.",
    "Do not manufacture formal Proposal State for trivial/local candidate text that does not benefit from lifecycle/addressability/review.",
    "Q/R/P remains secondary material attached to the actual current owner and uses the canonical Q/R/P lifecycle.",
    "This command does not itself grant repository/file/application mutation, commit or push permission."
  ],
  "userTarget": "<current IDTSPE work context / target / candidate meaning>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "ORCHESTRATION",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "NONE"
  }
}
[/PLANNING_COMMAND_DEFINITION]
