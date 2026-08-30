# Apply Registered IDTSPE Lens

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.lens.apply",
  "file": "apply-idtspe-lens.command.md",
  "command": "примени линзу",
  "englishName": "apply registered IDTSPE lens",
  "commandFamily": [
    "примени линзу",
    "используй линзу"
  ],
  "description": "Apply one named registered Lens to a resolved/reused IDTSPE Target/context.",
  "meaning": "Resolve/reuse the natural host Target, resolve the named Lens from the Core/active-profile registry, read its Operational Evaluation Contract and Knowledge Basis according to its load policy, and apply that perspective inside the current IDTSPE lifecycle. The command itself is a generic dispatcher and does not own the selected Lens semantics.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; a Local Target Contract is valid when no reusable Target Module fits. Explicit user selection may activate a registered Lens, but material Lens output remains a Finding Candidate until Core Finding Disposition resolves the actual State/owner/lifecycle consequence; Lens activation does not create a Lens-owned Target.",
  "traversalReadMode": "Resolve the requested Lens through current Core/profile registries, then read that Lens body and only the referenced Knowledge Basis owners required by its Reference Load Policy. Refresh Target/profile governance proportionally when uncertain.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-MODEL.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/README.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/resolution-slot-and-target-formation-resolution-set.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Selected Lens applicability/disposition plus explanatory analysis and material Finding Candidates. Core Finding Disposition resolves any Evidence/Idea/Q-R-P/Decision/owner/revalidation consequences; Lens-owned supporting-artifact guidance remains separate from semantic ownership.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "This is a dispatcher to the selected registered Lens; command text never becomes Lens authority.",
    "A Lens may be explicitly applied even when no Target Module pre-attached it, subject to the natural host Target/context.",
    "Knowledge Basis references are read according to the Lens load policy and remain separate knowledge owners.",
    "Lens activation does not create a Lens-owned Target; independent problems escalate only through generic Target Formation when justified.",
    "This command is read-only planning; it does not mutate repository files, commit or push."
  ],
  "userTarget": "<lens> к <target/context>",
  "palette": true,
  "directionIds": [
    "DIR-REPOSITORY"
  ],
  "helperPresentation": {
    "whenToUse": "Use when you already know which registered Lens perspective you want to apply, including a Lens normally reached through another Target Module.",
    "whatYouGet": "Material analysis/findings from that Lens inside the resolved IDTSPE Target context, with its Knowledge Basis loaded proportionally and material Finding Candidates crossing Core Finding Disposition before owner/State/lifecycle consequences.",
    "navigation": {
      "viewId": "IDTSPE",
      "viewLabel": "IDTSPE",
      "sectionId": "lens-operations",
      "sectionLabel": "Lens Operations",
      "sectionOrder": 1,
      "itemOrder": 1,
      "kindLabel": "LENS OPERATION",
      "viewOrder": 0
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "ORCHESTRATION",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "RESOLVE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
