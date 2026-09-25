# Apply Selected Idtspe Lenses

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.lenses.apply-selected",
  "file": "apply-selected-idtspe-lenses.command.md",
  "command": "примени выбранные линзы",
  "englishName": "apply selected IDTSPE Lenses",
  "commandFamily": [
    "примени выбранные линзы",
    "apply selected idtspe lenses"
  ],
  "description": "Apply the currently selected Lens Application requests through one shared Lens Port/Meta-Model prefix.",
  "meaning": "After canonical Lens applicability/selection has resolved selected Lens Application requests `(Lens Model, Analysis Surface, supported Operation, relevant basis)`, execute those applications proportionally through the Lens Meta-Model. Target context is resolved only when that Analysis Surface naturally belongs to Target work. Preserve materially distinct operations such as CHECK versus CHALLENGE; do not collapse them into one operation-less Lens execution. Execute only selected Lens Application requests. Normally confident `NOT_APPLICABLE` candidates are not selected; an explicitly forced APPLY/USE request preserved by selection is still executed and may validly finish with no material Finding. Do not manufacture Findings.",
  "activeContextBehavior": "Use the current selected Lens Application requests for the bounded Analysis Surface. If selection is stale or absent, the included selection command refreshes it first. For a direct non-Unit surface this remains one bounded application pass; do not synthesize Unit checkpoints. Reuse one Lens Port/Meta-Model prefix for several selected applications on an equivalent analysis surface/basis, while executing each materially distinct selected operation; do not create a Target merely to host selection/application.",
  "traversalReadMode": "Read the included Lens selection route plus Lens Meta-Model application/Finding boundary. Load each selected concrete Lens body and its Knowledge Basis only according to its own load policy.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-MODEL.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "LENS.META-MODEL",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-MODEL.md",
      "anchor": "lens-meta-model",
      "why": "Defines concrete Lens Application after applicability/selection and preserves the Lens Finding boundary.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "RESOLUTION.FINDING-DISPOSITION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md",
      "anchor": "resolution-finding-disposition",
      "why": "Routes any material Finding Candidates produced by selected Lens applications to their natural semantic destination.",
      "role": "VALIDATION_HANDOFF",
      "readMode": "ON_DEMAND"
    }
  ],
  "includes": [
    "planning/commands/work-through-idtspe.command.md",
    "planning/commands/recheck-idtspe-port-composition.command.md",
    "planning/commands/include-idtspe-trace-port.command.md",
    "planning/commands/idtspe-port-lens.command.md",
    "planning/commands/select-idtspe-lenses.command.md"
  ],
  "compositionContributions": [],
  "expectedOutput": "Proportional results for the currently selected `(Lens Model, Analysis Surface, Operation, basis)` applications, including only material Finding Candidates and their canonical disposition handoff.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Selection precedes application; do not treat registry membership as selection.",
    "The Analysis Surface is primary; Target context is optional and resolved only when natural.",
    "Several selected Lens Applications reuse the shared Lens Port/Meta-Model prefix, but materially distinct selected operations still execute as distinct applications.",
    "A Lens may finish with no Finding Candidate.",
    "A forced explicit APPLY/USE request remains an application even when normal applicability is confidently false; report the low/non-relevance context and allow a no-finding result.",
    "Finding Candidates never become accepted owner meaning directly."
  ],
  "userTarget": "<current selected Lens applications + analysis surface>",
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
