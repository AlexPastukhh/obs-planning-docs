# Review Documentation Ownership / Semantic DRY

Status: active project command definition
Scope: focused read-only Documentation Review projection for semantic ownership, contextual duplication, tracked owner dependencies and Responsibility Maps.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "documentation.ownership.review",
  "file": "review-documentation-ownership.command.md",
  "command": "проверь ownership документации",
  "englishName": "review documentation ownership",
  "commandFamily": [
    "проверь ownership документации",
    "проверь semantic dry",
    "проверь ответственность документации",
    "проверь responsibility maps",
    "review documentation ownership"
  ],
  "description": "Focused Documentation Review for one-owner semantics, contextual duplication/clarification discipline, tracked Semantic Owner Dependencies, stable owner anchors and Responsibility Map routing.",
  "meaning": "Invoke the existing Documentation Review capability over semantic ownership and routing. Verify that each normative responsibility has one canonical owner; contextual quotation/restatement/clarification is allowed when useful but material non-owner copies must track the canonical owner through Semantic Owner Dependency and a direct stable owner anchor when section-level meaning is referenced. Check Responsibility Maps as routing-only projections rather than second semantic owners.",
  "activeContextBehavior": "Use the explicitly selected documentation scope and its natural owners/consumers. Inspect enough neighboring context to distinguish harmless repetition from material normative duplication. For each material non-owner restatement/clarification, verify an appropriate RESTATES/CONTEXTUALIZES/EXTENDS/REPRESENTS/MIGRATES dependency, Responsibility ID where one exists, direct owner path and stable explicit anchor for section-specific dependence. Challenge synchronized normative copies, competing owners, misleading map bodies and stale generated-heading fragments. Route repairs to the real owner/map-maintenance Use Case; do not mutate under this command.",
  "traversalReadMode": "Targeted to selected documentation scope plus canonical owners, declared semantic dependents and Responsibility Maps needed to judge ownership/DRY correctness.",
  "ownerFiles": [
    "planning/documentation/use-cases/UC-DOC-REVIEW-DOCUMENTATION.md",
    "planning/documentation/principles-and-terminology.md",
    "planning/documentation/use-cases/UC-DOC-MAINTAIN-RESPONSIBILITY-MAP.md"
  ],
  "expectedOutput": "One compact Documentation Ownership Review: canonical responsibilities/owners checked, contextual duplicate/clarification passages and dependency status, Responsibility Map routing/body findings, unstable/missing owner-anchor findings, material Findings with linked Proposal(s), and verdict OK or NEEDS_CORRECTION.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Semantic DRY applies to normative meaning, not every repeated sentence.",
    "Material contextual quotation/restatement/clarification is allowed, but it must point to the canonical owner through a tracked Semantic Owner Dependency; the local passage owns only its local delta/consequence.",
    "For section-specific semantic dependence, use the owner's stable explicit anchor rather than a generated Markdown heading slug.",
    "Responsibility Maps own routing only and must not duplicate the routed contract body.",
    "If one rule needs synchronized normative edits across several apparent owners, treat that as an ownership smell before synchronizing copies.",
    "Every material Finding surfaced by this review completes Finding Disposition and gets a linked Proposal; persistence is separate.",
    "Do not mutate repository files under this command."
  ],
  "userTarget": "<documentation file/folder/scope to review>",
  "palette": true,
  "refinements": [],
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "UC-DOC-REVIEW-DOCUMENTATION",
      "path": "planning/documentation/use-cases/UC-DOC-REVIEW-DOCUMENTATION.md",
      "anchor": "uc-doc-review-documentation",
      "why": "Owns the Documentation Review operation, including semantic-owner, Semantic DRY and Responsibility Map checks.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "DOC.SEMANTIC-DRY",
      "path": "planning/documentation/principles-and-terminology.md",
      "anchor": "doc-semantic-dry",
      "why": "Owns the one-canonical-owner rule and contextual repetition/clarification boundary.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "DOC.SEMANTIC-OWNER-DEPENDENCY",
      "path": "planning/documentation/principles-and-terminology.md",
      "anchor": "doc-semantic-owner-dependency",
      "why": "Owns tracked non-owner semantic dependency and revalidation semantics.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "DOC.RESPONSIBILITY-MAP",
      "path": "planning/documentation/principles-and-terminology.md",
      "anchor": "doc-responsibility-map",
      "why": "Owns Responsibility Map routing-only semantics and boundary against copied contract bodies.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "DOC.EXPLICIT-STABLE-SEMANTIC-ANCHOR",
      "path": "planning/documentation/principles-and-terminology.md",
      "anchor": "doc-explicit-stable-semantic-anchor",
      "why": "Owns stable explicit anchor semantics for section-specific semantic references.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
