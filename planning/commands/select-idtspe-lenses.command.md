# Select Applicable IDTSPE Lenses

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.lenses.select",
  "file": "select-idtspe-lenses.command.md",
  "command": "подбери линзы",
  "englishName": "select applicable IDTSPE lenses",
  "commandFamily": [
    "подбери линзы",
    "проверь какими линзами посмотреть",
    "выбери линзы"
  ],
  "description": "Run the proportional IDTSPE Lens Applicability Scan for a bounded Analysis Surface and select materially useful supported Lens operations; a Target is optional context, not a prerequisite.",
  "meaning": "Resolve the bounded current Analysis Surface and run the canonical Lens applicability/selection mechanism across the inherited Core pack, Unit-local/rare Target-wide Lens Attachments when Unit/Target work is relevant, registered Generic Core/profile Lens discovery and explicit user/agent Lens choices. Explicit CONSIDER/SELECT choices follow normal applicability. If the caller carries an explicit APPLY/USE instruction for a named Lens, preserve it as a forced one-shot Lens Application request: evaluate applicability as relevance context, but do not reject the requested application merely because applicability is confidently false. For each selected/forced Lens, preserve the supported operation(s) and relevant basis as Lens Application requests `(Lens Model, Analysis Surface, Operation, basis)`. Do not create or resolve a Target merely to select Lenses for a broader semantic subject; there is no fixed Target Lens Set field.",
  "activeContextBehavior": "Use the natural current Analysis Surface, which may be Target work, Core Resolution State, a cross-owner semantic subject, or another bounded context. Resolve/reuse Target context only when that surface naturally belongs to Target work. Inside Unit work, use the Unit Opening / During-change / Closing lifecycle. Outside Unit work, perform one bounded direct applicability pass using Base Applicability / Usefulness; no synthetic Unit checkpoints are created.",
  "traversalReadMode": "Read current Core/profile Lens registries and applicability summaries first; read full Lens bodies and referenced Knowledge Basis only for selected or plausibly applicable candidates. Reuse current reliable IDTSPE/profile governance; targeted refresh when uncertain.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-MODEL.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/target-work/RESOLUTION-SLOT-AND-TARGET-FORMATION-SET.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md"
  ],
  "expectedOutput": "Lens Applicability View over the bounded Analysis Surface showing candidate source — INHERITED_CORE / UNIT_REQUIRED[phase] / UNIT_TRIGGERED / REGISTRY_DISCOVERED / EXPLICIT_REQUEST — separately from applicability result and explicit intent. Emit Lens Application requests `(Lens Model, Analysis Surface, supported Operation, relevant basis)` for applicable candidates and forced explicit APPLY/USE requests. Emit `NOT_APPLICABLE — <short reason>` only for candidates whose application is not explicitly forced; no fake Target and no fixed Target Lens Set field.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "The Analysis Surface is primary; Target context is resolved only when the reviewed/analyzed surface naturally belongs to Target work.",
    "Unit-local / rare Target-wide attachments are one Lens-selection source when present, not the whole Lens universe.",
    "A Local Target Contract may use any registered applicable Core/profile Lens, but non-Target semantic surfaces may use the same Lens registry without creating a Target.",
    "Registry discovery does not mean loading or applying every Lens body.",
    "Selection must preserve supported operation(s); CHECK and CHALLENGE over the same Lens/surface remain distinct when both are materially useful.",
    "Explicit APPLY/USE intent forces that named Lens application for the current bounded surface; confident low/non-applicability may explain a no-finding outcome but does not cancel the requested application.",
    "Knowledge Basis references are Lens knowledge dependencies, not Target Sources.",
    "This command is read-only planning; it does not mutate repository files, commit or push."
  ],
  "userTarget": "<analysis surface / target / context>",
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
    "planning/commands/idtspe-port-lens.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "LENS.META-MODEL",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-MODEL.md",
      "anchor": "lens-applicability-scan",
      "why": "Defines the applicability/selection scan; selecting applicable Lenses is distinct from applying each Lens.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "LENS.DISCOVERY",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-REGISTRY.md",
      "anchor": "lens-discovery-registry",
      "why": "Provides compact registry metadata and profile routing for the applicability scan.",
      "role": "REGISTRY",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
