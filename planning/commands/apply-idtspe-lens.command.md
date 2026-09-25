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
  "description": "Apply one named registered Lens through an explicit/resolved supported operation to a bounded IDTSPE Analysis Surface; Target context is optional and resolved only when natural.",
  "meaning": "Resolve the named Lens from the Core/active-profile registry, resolve the bounded Analysis Surface and the supported Lens operation requested or naturally required by the caller, read its Operational Evaluation Contract and Knowledge Basis according to its load policy, and execute that `(Lens Model, Analysis Surface, Operation, basis)` application inside the current IDTSPE lifecycle. This command is explicit APPLY intent: the Lens is applied even when its Base Applicability / Usefulness is confidently false; that assessment remains explanatory relevance context and the valid result may simply be `APPLIED — no material finding / no useful change`. Do not create or resolve a Target merely to host a Lens over broader semantic meaning. The command itself is a generic dispatcher and does not own the selected Lens semantics.",
  "activeContextBehavior": "Use the natural current Analysis Surface; it may be Target work, Core Resolution State, a cross-owner semantic subject, or another bounded context. Resolve/reuse Target context only when the surface naturally belongs to Target work. Explicit APPLY/USE of a registered Lens creates a one-shot application obligation on the current bounded surface even when the Lens would otherwise report confident non-applicability. Inside Unit work this does not create or strengthen a persistent Unit Lens Attachment. Material Lens output remains a Finding Candidate until Core Finding Disposition resolves the actual State/owner/lifecycle consequence; Lens application never creates a Lens-owned Target.",
  "traversalReadMode": "Resolve the requested Lens through current Core/profile registries, then read that Lens body and only the referenced Knowledge Basis owners required by its Reference Load Policy. Refresh Target/profile governance proportionally when uncertain.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-MODEL.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md"
  ],
  "expectedOutput": "`APPLIED` result for the explicitly requested Lens operation over the bounded Analysis Surface, including explanatory relevance/applicability context and any material Finding Candidates. `APPLIED — no material finding / no useful change` is valid even when Base Applicability would otherwise be confidently false. Core Finding Disposition resolves any Evidence/Proposal/Q-R-P/Decision/owner/revalidation consequences; no Target is manufactured merely to host the Lens.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "This is a dispatcher to the selected registered Lens; command text never becomes Lens authority.",
    "A named registered Lens requested through explicit APPLY/USE is actually applied to the current bounded Analysis Surface; low or confidently false normal applicability does not turn the requested application into NOT_APPLICABLE.",
    "Preserve the selected supported operation; do not silently treat CHECK, REFINE and CHALLENGE as the same application.",
    "Resolve/reuse a Target only when the Analysis Surface naturally belongs to Target work.",
    "Knowledge Basis references are read according to the Lens load policy and remain separate knowledge owners.",
    "Lens activation does not create a Lens-owned Target; independent problems escalate only through generic Target Formation when justified.",
    "This command is read-only planning; it does not mutate repository files, commit or push."
  ],
  "userTarget": "<lens> [operation] к <analysis surface / target / context>",
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
    "planning/commands/idtspe-port-lens.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "LENS.META-MODEL",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-MODEL.md",
      "anchor": "lens-meta-model",
      "why": "Defines Lens Meta-Model → selected Lens Model → concrete Lens Application and its Finding boundary.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "LENS.DISCOVERY",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-REGISTRY.md",
      "anchor": "lens-discovery-registry",
      "why": "Resolves the selected registered Lens and active profile pack without scanning unrelated Lens bodies.",
      "role": "REGISTRY",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "RESOLUTION.FINDING-DISPOSITION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md",
      "anchor": "resolution-finding-disposition",
      "why": "Routes material Lens Finding Candidates to their natural destination instead of letting the Lens own semantic meaning.",
      "role": "VALIDATION_HANDOFF",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
