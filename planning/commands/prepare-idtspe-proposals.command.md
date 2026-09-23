# Prepare Bounded IDTSPE Proposals

Status: active project command definition
Scope: optional generic Core Proposal Workup Target.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.proposal.workup",
  "file": "prepare-idtspe-proposals.command.md",
  "command": "подготовь пропозалы",
  "englishName": "prepare bounded IDTSPE proposals",
  "commandFamily": [
    "подготовь пропозалы",
    "proposal workup"
  ],
  "description": "Produce an optional bounded candidate-resolution brief when Proposal development and review have independent Target value.",
  "meaning": "Apply generic Core TM-PROPOSAL-WORKUP only when a bounded candidate-resolution result is independently useful. Form or refine canonical IDTSPE Proposals for grounded Goal/Q/R/P/Finding drivers at the smallest natural affected subjects, then review material candidates through the Resolution Context Lens and Proposal Semantic Change Impact Review. Keep recommendation distinct from USER/owner selection and preserve blocked RE-3 state.",
  "activeContextBehavior": "Reuse current accepted meaning, Sources, Findings and their RE-* dispositions. Do not rerun Finding discovery merely because a Finding drives a Proposal; do not form a Target for a trivial/transient candidate when ordinary idtspe.proposal work suffices. If the affected semantic subject is unresolved, surface an ownership Question instead of using this Target as a substitute owner.",
  "traversalReadMode": "Read TM-PROPOSAL-WORKUP and canonical Proposal/Decision lifecycle plus included shared Target/Proposal routes. Open profile/affected owner and Lens detail only where material to the bounded candidate review.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PROPOSAL-WORKUP.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/required/LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT.md"
  ],
  "expectedOutput": "A bounded Proposal Workup with grounded canonical Proposal references, affected natural subjects, material alternatives/dependencies, proportionate review and truthful selectable/blocked/USER-selection handoff; no implied acceptance or file persistence.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Canonical Proposal/Decision lifecycle owns candidate identity, review, selection and integration; the Target owns only the bounded workup result.",
    "A supplied material Finding keeps its existing RE-* classification and becomes the driver of one or more linked Proposals.",
    "No destination mutation, tests, commit or push is authorized."
  ],
  "userTarget": "<material driver and affected natural subject>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-PROPOSAL-WORKUP",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  },
  "includes": [
    "planning/commands/apply-idtspe-target-module.command.md",
    "planning/commands/idtspe-port-proposal.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "IDTSPE.COMMAND-SURFACE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md",
      "anchor": "idtspe-command-surface",
      "why": "Defines the generic user invocation boundary for an optional Proposal Workup Target.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TM-PROPOSAL-WORKUP",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PROPOSAL-WORKUP.md",
      "anchor": "tm-proposal-workup",
      "why": "Owns the optional bounded candidate-resolution Target result without replacing canonical Proposal State.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/required/LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT.md",
      "anchor": "lens-proposal-decision-resolution-context",
      "why": "Evaluates each material candidate's resolution context before a selection handoff.",
      "role": "VALIDATION_HANDOFF",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
