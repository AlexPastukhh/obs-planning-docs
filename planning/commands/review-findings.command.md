# Review Findings Analysis

Status: active project command definition
Scope: optional generic Core Review Finding Analysis Target.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.review.findings",
  "file": "review-findings.command.md",
  "command": "разбери находки ревью",
  "englishName": "review finding analysis",
  "commandFamily": [
    "разбери находки ревью",
    "review findings analysis"
  ],
  "description": "Produce an optional bounded Review Finding Analysis Target with one Collection Unit: each evidence-backed observation is followed immediately by its impact and escalation diagnosis.",
  "meaning": "Apply generic Core TM-REVIEW-FINDINGS only when a separately addressable diagnostic result is useful. Establish CURRENT_BASIS Review Coverage before Validation/Lens checks, then resolve the single RU-RFIND-01 / RFIND-FINDINGS Collection. Within each Finding item, present its observation and Evidence followed immediately by canonical materiality, Review Priority, RE-* escalation, natural owner, upstream/downstream consequences and USER-attention diagnosis. Hand material Findings to the Proposal lifecycle as a separate action; its candidate may be presented immediately after that Finding\u0027s diagnosis. This diagnostic result does not by itself complete idtspe.review when linked Proposals remain pending.",
  "activeContextBehavior": "Use the current bounded Review Subject/Scope/Basis and trustworthy prior coverage. Do not create a Pre-Update Plan or reinterpret an existing plan as a required review stage. Reuse valid prior checks with provenance and inspect materially applicable current cells; form or reuse a Review Findings Target only when its result has independent value.",
  "traversalReadMode": "Read the selected TM and Review Strategy/coverage owner plus included command references proportionally. Inspect only current authoritative Sources needed for the bounded subject and checks.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-REVIEW-FINDINGS.md",
    "planning/documentation/idtspe-methodology/active/ai-reviewability/REVIEW-STRATEGY-AND-COVERAGE-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md"
  ],
  "expectedOutput": "One RU-RFIND-01 / RFIND-FINDINGS Collection, each item ordered observation/Evidence, diagnosis with grounded Priority/RE/owner/consequences, and explicit Proposal handoff; a related Core Proposal may follow the item; the canonical Review Coverage Record remains separate and full review completion waits for linked Proposals.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "This is an optional Review Finding Analysis Target, not a mandatory Target for every review.",
    "Present each observation immediately followed by its diagnosis; a related Proposal may follow as separate Core State. Review Priority and RE-* answer different questions.",
    "Do not report a complete idtspe.review while a material Finding lacks its required linked Proposal.",
    "No destination mutation, tests, commit or push is authorized."
  ],
  "userTarget": "<bounded current review subject/scope/basis>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-REVIEW-FINDINGS",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  },
  "compositionContributions": [
    {
      "kind": "REVIEW_COVERAGE_MODE",
      "value": "CURRENT_BASIS",
      "why": "Derive bounded current-basis review cells before Validation/Lens semantic actions execute."
    }
  ],
  "includes": [
    "planning/commands/apply-idtspe-target-module.command.md",
    "planning/commands/idtspe-port-validation.command.md",
    "planning/commands/apply-selected-idtspe-lenses.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "IDTSPE.COMMAND-SURFACE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md",
      "anchor": "idtspe-command-surface",
      "why": "Defines the generic user invocation and review composition boundary for this Target command.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TM-REVIEW-FINDINGS",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-REVIEW-FINDINGS.md",
      "anchor": "tm-review-findings",
      "why": "Owns the optional bounded diagnostic Target result and its single Unit pairing each Finding with its diagnosis.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "REVIEW.STRATEGY-COVERAGE",
      "path": "planning/documentation/idtspe-methodology/active/ai-reviewability/REVIEW-STRATEGY-AND-COVERAGE-CONTRACT.md",
      "anchor": "review-strategy-coverage",
      "why": "Owns review cells, basis, coverage provenance and the complete-review boundary.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "RESOLUTION.FINDING-DISPOSITION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md",
      "anchor": "resolution-finding-disposition",
      "why": "Owns materiality, Resolution Escalation routing and natural Finding destinations; AI Reviewability owns the separate Review Priority scale.",
      "role": "VALIDATION_HANDOFF",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
