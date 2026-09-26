# IDTSPE Capture / Review Selected Decisions

Status: active project command definition
Scope: generic Core Decision capture/review entry; it never grants selection authority.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.decisions.capture",
  "file": "idtspe-decisions-capture.command.md",
  "command": "зафиксируй решения",
  "englishName": "IDTSPE capture/review selected decisions",
  "commandFamily": [
    "зафиксируй решения",
    "зафиксируй принятые решения",
    "выдели решения из текущего контекста",
    "разбери принятые решения",
    "idtspe decisions"
  ],
  "description": "Extract and review actual selected material Decisions from current context without inventing selection authority.",
  "meaning": "Classify current USER/context meaning through the canonical USER Input Decision And Answer Intake Rule. Only actual material selections become Decision semantics; AI-only candidates/suggestions remain Proposal/Source/Answer/unresolved state as appropriate. Review each material Decision through the Proposal/Decision Resolution Context Lens, disposition related QRPE, apply the canonical Decision retention contract and Carry-Forward admission before keeping a separate carried record, integrate selected meaning into its natural/temporal owner, and refresh Resolution Carry-Forward for surviving material residual/reconsider state.",
  "activeContextBehavior": "Reuse current context and existing Decisions first. Extract exact selected meaning only where actual USER/applicable authority selection exists; never select unresolved alternatives on the USER's behalf. Run LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT for material captured/reviewed Decisions, classify residual QRPE through canonical lifecycle owners, integrate selected meaning into the correct owner, and project surviving continuation/revalidation items into Resolution Carry-Forward when useful.",
  "traversalReadMode": "Read USER-input intake + Proposal/Decision lifecycle + Resolution Context Lens first; use Q/R/P, Decision Revalidation Helper, Carry-Forward and natural owner/Target detail only where the captured Decision requires them.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/required/LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/DECISION-REVALIDATION.resolution-projection.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PLANNING-RESOLUTION-STATE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/maintain-current-work-state/UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE.md"
  ],
  "expectedOutput": "Actual selected material Decisions are identified without promoting AI-only candidates, their exact selected meaning/integration owner and material QRPE disposition are clear, separate carried Decision records are represented in PRS only after Carry-Forward admission under the Core retention contract, and surviving residual/revalidation state is discoverable through Carry-Forward.",
  "permissionMode": "read-only-planning-unless-separately-authorized",
  "keyReminders": [
    "Actual material selection is required; this command does not grant AI selection authority.",
    "USER facts/preferences/corrections/candidates are not Decisions unless the intake/lifecycle rules establish actual selection.",
    "QRPE is a review view over canonical Q/R/P/Evidence owners, not a new State kind.",
    "A separate carried Decision record follows Core retention and Carry-Forward admission/exit; PRS only represents admitted bounded state. Selected meaning integrates into normal natural Unit content; this command defines no alternate Decision owner.",
    "This command does not itself grant repository/file/application mutation, commit or push permission."
  ],
  "userTarget": "<current context / selected Decisions to capture or review>",
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
    "planning/commands/idtspe-port-decision.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "IDTSPE.USER-INPUT-INTAKE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md",
      "anchor": "idtspe-user-input-intake",
      "why": "Classifies exact USER/context input so only actual selected meaning becomes Decision semantics.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "RESOLUTION.PROPOSAL-DECISION-LIFECYCLE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md",
      "anchor": "resolution-decision-retention",
      "why": "Owns Decision semantics and the retention boundary; this command only projects the current rule.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "RESOLUTION.QRP-LIFECYCLE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md",
      "anchor": "resolution-qrp-lifecycle",
      "why": "Routes related unresolved Q/R/P without collapsing them into the Decision.",
      "role": "POSSIBLE_DESTINATION",
      "readMode": "DESTINATION_ONLY"
    },
    {
      "responsibilityId": "RESOLUTION.CARRY-FORWARD",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md",
      "anchor": "resolution-carry-forward-decision-retention",
      "why": "Owns qualifying Decision admission/exit and continuation eligibility; concrete PRS representation remains a downstream realization.",
      "role": "VALIDATION_HANDOFF",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
