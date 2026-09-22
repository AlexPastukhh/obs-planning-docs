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
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-current-work-state/UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md",
    "planning/session/principles-and-terminology.md",
    "planning/session/session-runtime-contract.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/required/LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/continuation/RESOLUTION-CARRY-FORWARD-PROJECTION.md"
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
  },
  "includes": [
    "idtspe.work",
    "idtspe.port-composition.recheck",
    "idtspe.port.trace",
    "idtspe.port.proposal"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "RESOLUTION.PROPOSAL-DECISION-LIFECYCLE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md",
      "anchor": "resolution-proposal-decision-lifecycle",
      "why": "Owns formal IDTSPE Proposal identity, candidate semantics, review, selection boundary and integration.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.USER-INPUT-INTAKE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md",
      "anchor": "idtspe-user-input-intake",
      "why": "Grounds required USER-only information before presenting an affected material candidate.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/required/LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT.md",
      "anchor": "lens-proposal-decision-resolution-context",
      "why": "Evaluates the material Proposal/Decision resolution context without becoming Proposal authority.",
      "role": "VALIDATION_HANDOFF",
      "readMode": "ON_DEMAND"
    },
    {
      "responsibilityId": "RESOLUTION.QRP-LIFECYCLE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md",
      "anchor": "resolution-qrp-lifecycle",
      "why": "Potentially routes material related unresolved Q/R/P surfaced during Proposal review.",
      "role": "POSSIBLE_DESTINATION",
      "readMode": "DESTINATION_ONLY"
    },
    {
      "responsibilityId": "RESOLUTION.CARRY-FORWARD",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/continuation/RESOLUTION-CARRY-FORWARD-PROJECTION.md",
      "anchor": "resolution-carry-forward",
      "why": "Retains only surviving material open/deferred/residual continuation after Proposal work.",
      "role": "VALIDATION_HANDOFF",
      "readMode": "ON_DEMAND"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
