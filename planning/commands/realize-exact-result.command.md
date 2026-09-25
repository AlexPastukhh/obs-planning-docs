# Exact Realization

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.exact.realization",
  "file": "realize-exact-result.command.md",
  "command": "сделай точную реализацию",
  "englishName": "exact realization",
  "commandFamily": [
    "сделай точную реализацию",
    "реализуй точный результат",
    "exact realization"
  ],
  "description": "Produce a broad/profile-neutral exact directly integrable realization.",
  "meaning": "Run generic Core TM-EXACT-REALIZATION for a sufficiently determined literal/directly-integrable artifact. Produce the exact candidate first; integrate/validate/execute only under explicit authority for the selected environment, and repair only within the bounded minor-repair rule. Active profiles may define a narrower realization owner for specialized artifact families; when such an owner applies, route there instead of treating Core Exact as the specialized owner.",
  "activeContextBehavior": "Resolve or reuse the natural bounded Exact Realization Target from sufficiently determined upstream meaning and current destination Sources. Use it for broad/profile-neutral literal artifact realization; under SDS, codebase-oriented realization routes to TM-CODE-REALIZATION. Exact-result review may stop before integration. Integration attempts depend on explicit authority and do not imply commit/push/deploy/release.",
  "traversalReadMode": "Reuse current reliable IDTSPE governance; read TM-EXACT-REALIZATION completely, inspect the exact current destination Sources needed for the bounded result, and refresh applicable upstream owners/Lenses proportionally when material.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-EXACT-REALIZATION.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md"
  ],
  "expectedOutput": "RU-REAL-01 Exact Realization: a complete broad/profile-neutral directly integrable current candidate, plus only the integration/validation Evidence, bounded repairs, Findings/revalidation and final exact review requested/authorized for this invocation.",
  "permissionMode": "exact-realization-explicit-authority-no-commit-push",
  "keyReminders": [
    "Core Exact Realization is broad/profile-neutral; do not force specialized code semantics into it when an active profile defines a narrower realization owner.",
    "Producing the exact candidate does not itself authorize destination mutation, validation/execution or automatic repair.",
    "With repair authority, fix only local/minor in-scope defects that preserve accepted upstream semantics and material Decisions; never change out-of-scope owners silently.",
    "A material semantic/architectural/out-of-scope conflict becomes a Finding Candidate/Problem for Core disposition and possible upstream revalidation/user Decision.",
    "Do not commit, push, deploy or release unless a separate explicit host workflow grants that authority."
  ],
  "userTarget": "<broad/profile-neutral exact directly integrable realization scope>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-EXACT-REALIZATION",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  },
  "includes": [
    "planning/commands/apply-idtspe-target-module.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "TM-EXACT-REALIZATION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-EXACT-REALIZATION.md",
      "anchor": "tm-exact-realization",
      "why": "Concrete generic Target Module semantics selected by this command; shared port/registry/Meta-Model references are inherited from included commands.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
