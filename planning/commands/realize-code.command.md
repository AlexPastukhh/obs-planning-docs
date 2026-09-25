# SDS Code Realization

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.sds.code.realization",
  "file": "realize-code.command.md",
  "command": "реализуй код",
  "englishName": "SDS code realization",
  "commandFamily": [
    "реализуй код",
    "сделай реализацию кода",
    "code realization"
  ],
  "description": "Produce the exact SDS codebase realization of sufficiently accepted meaning.",
  "meaning": "Run SDS TM-CODE-REALIZATION. Produce the exact project-native source/test/codebase candidate first. Integrate/build/test only under explicit user authority for the selected environment; automatically repair only when explicitly authorized and only for local/minor in-scope defects that do not change accepted Feature/Domain/Slice/Shared semantics, Evolution meaning or material upstream Decisions. Material semantic/ownership/out-of-scope problems go through normal Finding Disposition/revalidation instead of silent repair.",
  "activeContextBehavior": "Resolve or reuse the natural bounded SDS Code Realization Target from sufficiently determined upstream SDS meaning and current codebase Sources. A direct small code change may form this Target without separate Slice/Domain discovery when no upstream semantic work is needed. Exact-code review may stop before integration. Purely non-code broad literal artifacts route to Core TM-EXACT-REALIZATION instead.",
  "traversalReadMode": "Reuse current reliable IDTSPE + SDS governance; read TM-CODE-REALIZATION completely, inspect the exact current codebase Sources needed for the bounded result, and refresh applicable upstream owners/Lenses proportionally when material.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-CODE-REALIZATION.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md"
  ],
  "expectedOutput": "RU-CODE-01 Exact Code Realization: a complete directly integrable project-native codebase candidate, plus only the build/test/runtime Evidence, bounded repairs, Findings/revalidation and final code review requested/authorized for this invocation.",
  "permissionMode": "exact-realization-explicit-authority-no-commit-push",
  "keyReminders": [
    "Literal SDS source/test code and codebase-integral implementation wiring belong to TM-CODE-REALIZATION, not Core TM-EXACT-REALIZATION.",
    "Producing the code candidate does not itself authorize repository mutation, build/test execution or automatic repair.",
    "With repair authority, fix only local/minor in-scope defects that preserve accepted Feature/Domain/Slice/Shared/Evolution semantics and material upstream Decisions.",
    "A material semantic/ownership/out-of-scope conflict becomes a Finding Candidate/Problem for Core disposition and upstream SDS revalidation when needed.",
    "Executed build/test/runtime checks are Evidence; planned or unavailable checks are not passing Evidence.",
    "Do not commit, push, deploy or release unless a separate explicit host workflow grants that authority."
  ],
  "userTarget": "<bounded SDS codebase realization scope>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-CODE-REALIZATION",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  },
  "includes": [
    "planning/commands/apply-idtspe-target-module.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "TM-CODE-REALIZATION",
      "path": "planning/documentation/idtspe-methodology/active/profiles/sds/target-modules/TM-CODE-REALIZATION.md",
      "anchor": "tm-code-realization",
      "why": "Concrete SDS code-realization Target Module selected by this command; shared Core runtime/Target Module contracts are inherited through included commands.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
