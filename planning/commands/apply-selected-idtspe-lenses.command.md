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
  "description": "Apply the currently selected applicable Lens Models through one shared Lens Port/Meta-Model prefix.",
  "meaning": "After canonical Lens applicability/selection has resolved the current selected Lens Models, apply those selected Models proportionally to the current analysis surface through the Lens Meta-Model. Do not apply NOT_MATERIAL / NOT_APPLICABLE / DEFERRED Lens entries and do not manufacture Findings.",
  "activeContextBehavior": "Use the current selected Lens applicability result. If selection is stale or absent, the included selection command refreshes it first. Reuse one Lens Port/Meta-Model prefix for several selected Lens Models on an equivalent analysis surface/basis.",
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
    "idtspe.work",
    "idtspe.port-composition.recheck",
    "idtspe.port.trace",
    "idtspe.port.lens",
    "idtspe.lenses.select"
  ],
  "compositionContributions": [],
  "expectedOutput": "Proportional applications/results for the currently selected applicable Lens Models, including only material Finding Candidates and their canonical disposition handoff.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Selection precedes application; do not treat registry membership as selection.",
    "Several selected Lenses reuse the shared Lens Port/Meta-Model prefix.",
    "A Lens may finish with no Finding Candidate.",
    "Finding Candidates never become accepted owner meaning directly."
  ],
  "userTarget": "<current selected Lens set + analysis surface>",
  "palette": true,
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
