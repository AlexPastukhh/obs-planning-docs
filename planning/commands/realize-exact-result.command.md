# Exact Realization

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.exact.realization",
  "file": "realize-exact-result.command.md",
  "command": "реализуй код",
  "englishName": "exact realization",
  "commandFamily": [
    "реализуй код",
    "сделай точную реализацию",
    "exact realization"
  ],
  "description": "Produce an exact directly integrable realization; code is the default archetype.",
  "meaning": "Run generic Core TM-EXACT-REALIZATION. Produce the exact candidate result first. For code, default to literal project-native code/test/config payloads rather than another implementation plan. Integrate/build/test only under explicit user authority for the selected environment; automatically repair only when explicitly authorized and only for local/minor in-scope defects that do not change accepted architecture, Domain/product semantics or material upstream decisions. Material semantic/architectural/out-of-scope problems go through normal Finding Disposition/revalidation instead of silent repair.",
  "activeContextBehavior": "Resolve or reuse the natural bounded Exact Realization Target from sufficiently determined upstream meaning and current destination/codebase Sources. A direct small code/config change may form this Target without a Slice/Domain Target when no upstream semantic work is needed. Exact-result review may stop before integration. Integration attempts may be scratch, staging, user-local or the intended destination according to explicit authority; do not invent a mandatory temporary-then-final pair.",
  "traversalReadMode": "Reuse current reliable IDTSPE governance; read TM-EXACT-REALIZATION completely, inspect the exact current destination/codebase Sources needed for the bounded result, and refresh applicable upstream owners/Lenses proportionally when material.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-EXACT-REALIZATION.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "RU-REAL-01 Exact Realization: a complete directly integrable current candidate (code-first by default), plus only the integration/build/test Evidence, bounded repairs, Findings/revalidation and final exact review requested/authorized for this invocation.",
  "permissionMode": "exact-realization-explicit-authority-no-commit-push",
  "keyReminders": [
    "Code is the primary/default archetype: exact method bodies/files/patches belong here, not in TM-IMPLEMENTATION-SLICE.",
    "Producing the exact candidate does not itself authorize destination mutation, build/test execution or automatic repair.",
    "With repair authority, fix only local/minor in-scope defects that preserve accepted architecture, Domain/product semantics and material upstream Decisions; never change out-of-scope owners silently.",
    "A material semantic/architectural/out-of-scope conflict becomes a Finding Candidate/Problem for Core disposition and possible upstream revalidation/user Decision.",
    "Candidate build/automated-test verification is Core Evidence inside Exact Realization; it is not automatically TM-PRACTICAL-TEST.",
    "Do not commit, push, deploy or release unless a separate explicit host workflow grants that authority."
  ],
  "userTarget": "<code or other exact directly integrable realization scope>",
  "palette": true,
  "directionIds": [
    "DIR-REPOSITORY"
  ],
  "helperPresentation": {
    "whenToUse": "Use when upstream meaning is sufficiently determined and you want the literal exact result that could be integrated now; for code, this is the default implementation route and can optionally continue into explicitly authorized build/test/minor-repair work.",
    "whatYouGet": "Exact current directly integrable realization, code-first by default, with optional review → authorized integration/verification → bounded repair → final exact review loop.",
    "navigation": {
      "viewId": "IDTSPE",
      "viewLabel": "IDTSPE",
      "sectionId": "core",
      "sectionLabel": "IDTSPE Core",
      "sectionOrder": 0,
      "itemOrder": 6,
      "kindLabel": "IDTSPE TARGET",
      "viewOrder": 0
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-EXACT-REALIZATION",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
