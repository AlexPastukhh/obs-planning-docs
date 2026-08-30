# IDTSPE — Work / Invoke Registered Component

Status: active project command definition
Scope: generic IDTSPE work-mode and installed-component dispatcher.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "idtspe.work",
  "file": "work-through-idtspe.command.md",
  "command": "idtspe",
  "englishName": "work through or invoke IDTSPE",
  "commandFamily": [
    "idtspe",
    "работай через idtspe",
    "режим idtspe"
  ],
  "description": "Enter ordinary IDTSPE work or invoke one registered Target Module/Lens by semantic selector.",
  "meaning": "Bare `idtspe` enters ordinary IDTSPE work. When text after `idtspe` names an installed Target Module or Lens, resolve that selector through the current Core/profile registries and dispatch to that semantic component without creating a second command ontology. Exact `TM-*` / `LENS-*` IDs always work; `tm <alias>` / `target <alias>` and `lens <alias>` use registry aliases; a unique bare alias may resolve directly. Ambiguous or unknown selectors are not guessed.",
  "activeContextBehavior": "If no component selector is supplied, resolve/reuse the natural current IDTSPE Target/context and continue ordinary work. If a Target Module selector is supplied, invoke that recurring family through normal Target Formation/invocation. If a Lens selector is supplied, resolve/reuse the host Target, apply the selected Lens, and route material Finding Candidates through Core Finding Disposition. A selector never creates new semantic authority by itself.",
  "traversalReadMode": "Read current Core/profile Target Module and Lens registry summaries first. For an exact/unique selector, read only the selected component body plus the minimum Core/profile governance it requires. Do not scan/load every module or Lens body. Reuse current reliable governance; targeted refresh when uncertain.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/README.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/README.md",
    "planning/documentation/idtspe-methodology/active/profiles/README.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "Ordinary IDTSPE planning when no selector is supplied, or the selected Target Module/Lens result/evaluation inside the normal IDTSPE lifecycle. For Lens work, material findings remain Finding Candidates until Core Finding Disposition resolves State/owner/lifecycle consequences.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Canonical semantic selectors are TM-* Target Module IDs and LENS-* Lens IDs; short aliases are registry navigation only.",
    "Prefer `idtspe tm <alias>` or `idtspe lens <alias>` when a bare alias could be ambiguous; never guess between multiple matches.",
    "Repository command IDs such as application_slice.plan and historical tmcmd.* keys are implementation/compatibility details, not user semantic ontology.",
    "A Lens surfaces Finding Candidates; Core Finding Disposition resolves the actual State/owner/lifecycle consequence.",
    "Do not infer a dedicated file from Target identity; use Documentation / Representation when persistence is material.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<optional TM/LENS selector + target/context, or current planning work>",
  "palette": true,
  "directionIds": ["DIR-REPOSITORY", "DIR-PLAN-SOLUTION"],
  "helperPresentation": {
    "whenToUse": "Use `idtspe` for ordinary planning, or append a Target Module/Lens ID or short alias when you already know the component you want.",
    "whatYouGet": "One registry-driven entry to ordinary IDTSPE work and installed Target Module/Lens dispatch without memorizing repository command IDs.",
    "navigation": {
      "viewId": "IDTSPE",
      "viewLabel": "IDTSPE",
      "sectionId": "core",
      "sectionLabel": "IDTSPE Core",
      "sectionOrder": 0,
      "itemOrder": 1,
      "kindLabel": "WORK / DISPATCH",
      "viewOrder": 0
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "WORK_MODE",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "NONE"
  }
}
[/PLANNING_COMMAND_DEFINITION]
