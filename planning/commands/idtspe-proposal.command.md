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
    "разбери пропозал",
    "сделай пропозалы",
    "сформируй пропозалы",
    "сделай proposals"
  ],
  "description": "Explicitly discover, form, review and refine material IDTSPE Proposals from current context, supplied Findings or a supplied Proposal through the canonical Proposal/Decision lifecycle under USER-gated selection.",
  "meaning": "Use the current IDTSPE Work Context to discover/form material candidate Proposals, form linked Proposals for supplied material Findings, or review/refine a supplied Proposal. When Findings are the input, preserve their Finding Disposition/RE-* state: deterministic/local candidates remain inside accepted meaning, RE-3 stays BLOCKED_BY_REVALIDATION, and RE-2/RE-4 remain semantic-change candidates requiring normal selection. Canonical Proposal/Decision lifecycle owns candidate/selection semantics; Proposal existence never implies persistence. Keep candidates UNSELECTED unless their route is an already-entailed RE-0 correction that needs no semantic selection, and integrate actually selected semantic change only through normal authority.",
  "activeContextBehavior": "Reuse current Sources, accepted Results, Decisions, Findings and Carry-Forward references first. If explicit Proposal formation targets Findings, consume their current Finding Disposition rather than rerunning Review; form/refine the smallest linked candidate and preserve revalidation blocks. Resolve genuinely required USER-only grounding before presenting a selectable material candidate. For each material selectable Proposal run the Resolution Context Lens and canonical Proposal Semantic Change Impact Review proportionally. Use optional TM-PROPOSAL-WORKUP only when a bounded candidate-resolution brief has independent Target value; ordinary transient Proposal work remains this operation. AI recommendation is not selection. Retention/file persistence is a separate proportional decision.",
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
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PLANNING-RESOLUTION-STATE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PROPOSAL-WORKUP.md"
  ],
  "expectedOutput": "Material Proposals requested from current context or supplied Findings are formed and reviewable with truthful relation to their driver/owner and selectable/blocked state. Findings have linked Proposals without requiring persisted files; RE-3 remains BLOCKED_BY_REVALIDATION; semantic-change candidates remain UNSELECTED until actual authority selects them.",
  "permissionMode": "read-only-planning-unless-separately-authorized",
  "keyReminders": [
    "Lifecycle contracts own Proposal/Decision/Q/R/P/Evidence semantics; the Resolution Context Lens is the operational evaluator and QRPE is only a compact view.",
    "An explicit “сделай/дай пропозалы” request uses this same canonical lifecycle; when Findings are supplied, form linked Proposals from their current disposition rather than creating a second proposal mechanism.",
    "Formal/linked Proposal existence does not imply dedicated file, register entry or other physical persistence.",
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
    "planning/commands/work-through-idtspe.command.md",
    "planning/commands/recheck-idtspe-port-composition.command.md",
    "planning/commands/include-idtspe-trace-port.command.md",
    "planning/commands/idtspe-port-proposal.command.md"
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
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PLANNING-RESOLUTION-STATE.md",
      "anchor": "tm-planning-resolution-state",
      "why": "Retains only surviving material open/deferred/residual continuation after Proposal work.",
      "role": "VALIDATION_HANDOFF",
      "readMode": "ON_DEMAND"
    },
    {
      "responsibilityId": "TM-PROPOSAL-WORKUP",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PROPOSAL-WORKUP.md",
      "anchor": "tm-proposal-workup",
      "why": "Optional independently useful bounded candidate-resolution Target result; ordinary Proposal work does not require it.",
      "role": "POSSIBLE_DESTINATION",
      "readMode": "ON_DEMAND"
    },
    {
      "responsibilityId": "RESOLUTION.FINDING-DISPOSITION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md",
      "anchor": "resolution-finding-disposition",
      "why": "When explicit Proposal formation starts from Findings, preserves their materiality, natural subject and RE-* revalidation/selection state.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
