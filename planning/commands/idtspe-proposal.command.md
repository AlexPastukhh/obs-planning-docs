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
    "idtspe пропозалы",
    "дай пропозалы",
    "дай пропозалы по текущему контексту",
    "разбери пропозал"
  ],
  "description": "Discover, form, review and refine material IDTSPE Proposals from the current context through canonical Proposal/Decision lifecycle + Resolution Context Lens under USER-gated selection.",
  "meaning": "Use the current IDTSPE Work Context to discover/form only material candidate Proposals or review/refine a supplied Proposal. Canonical Proposal/Decision lifecycle owns candidate/selection semantics; LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT evaluates each material Proposal/Decision context and checks optional related QRPE; Proposal Semantic Change Impact remains lifecycle-owned. Keep candidates UNSELECTED until actual USER/authorized selection, integrate selected meaning into its natural/temporal owner, and refresh Resolution Carry-Forward only for surviving material open/deferred/residual state.",
  "activeContextBehavior": "Reuse current Sources, accepted Results, Decisions and Carry-Forward references first. Resolve genuinely required USER-only grounding before presenting the affected material candidate. For each material Proposal run the Resolution Context Lens, surface only material QRPE, then perform canonical Proposal Semantic Change Impact Review. AI recommendation is not selection. After valid selection, disposition Proposal QRPE into Decision context, integrate selected meaning into the natural owner and update Carry-Forward for surviving state. Under SDS, unrealized selected future meaning remains Evolution Step/Target Body hosted until realization/materialization.",
  "traversalReadMode": "Reuse current reliable Core governance. Otherwise read the current composition/state model plus canonical Proposal/Decision and Q/R/P lifecycle owners, and the Session USER-gated interaction owner. Load profile/Target/Lens detail only when the current composition makes it applicable.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-command-surface-contract.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/compose-current-work-use-case.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/maintain-current-work-state-use-case.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/user-input-decision-and-answer-intake-rule.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/qrp-lifecycle-and-review-contract.md",
    "planning/session/principles-and-terminology.md",
    "planning/session/session-runtime-contract.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/required/LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/resolution-carry-forward-projection-contract.md"
  ],
  "expectedOutput": "Material Proposals from the current context are reviewable but remain UNSELECTED until actual authority selects them; optional related QRPE is evaluated/dispositioned, selected meaning integrates into its natural/temporal owner, and only surviving material open/deferred/residual state is projected into Resolution Carry-Forward.",
  "permissionMode": "read-only-planning-unless-separately-authorized",
  "keyReminders": [
    "Lifecycle contracts own Proposal/Decision/Q/R/P/Evidence semantics; the Resolution Context Lens is the operational evaluator and QRPE is only a compact view.",
    "AI recommendation is not selection; do not convert nearby AI suggestions into Decisions.",
    "Use \"none material\" when no related QRPE exists; do not force an empty QRPE form.",
    "After selection, disposition Proposal QRPE individually rather than copying it mechanically into Decision context.",
    "Resolution Carry-Forward stores compact continuation refs/status only; it is not a second semantic owner.",
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
