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
  "description": "Explicit navigation/dispatch shortcut inside the always-active proportional IDTSPE work context.",
  "meaning": "IDTSPE is already active. Bare `idtspe` explicitly refreshes/reaffirms `UC-IDTSPE-COMPOSE-CURRENT-WORK` and continues with the smallest useful current composition, which may remain Broad Discussion only. When text after `idtspe` names a registered Target Module or Lens, treat that selector as explicit user invocation intent, resolve it through current Core/profile registries, and still apply the current Use-Case/context and local applicability/materiality gates. Exact `TM-*` / `LENS-*` IDs always work; `tm <alias>` / `target <alias>` and `lens <alias>` use registry aliases; a unique bare alias may resolve directly. Ambiguous or unknown selectors are not guessed.",
  "activeContextBehavior": "Start from the current Use-Case-driven IDTSPE Work Context. With no selector, continue proportionally without forcing a Target, State Unit, Lens or Integration Checkpoint. With a Target Module selector, resolve/create a Target only when the selected module Entry Point and current situation make it useful. With a Lens selector, resolve/reuse the natural host Target when material, apply the Lens, and route material Finding Candidates through Core Finding Disposition. The command never enables IDTSPE and never creates semantic authority.",
  "traversalReadMode": "Read current Core/profile Target Module and Lens registry summaries first. For an exact/unique selector, read only the selected component body plus the minimum Core/profile governance it requires. Do not scan/load every module or Lens body. Reuse current reliable governance; targeted refresh when uncertain.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/compose-current-work-use-case.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-methodology-use-case-registry.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/README.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/README.md",
    "planning/documentation/idtspe-methodology/active/profiles/README.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "The smallest useful current IDTSPE composition (including a valid Broad-Discussion-only result) or the explicitly selected applicable Target Module/Lens result/evaluation. No command invocation makes optional structure mandatory.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "IDTSPE is always active in this methodology environment; this command is a convenience/navigation surface, not a mode switch.",
    "Canonical semantic selectors are TM-* Target Module IDs and LENS-* Lens IDs; short aliases are registry navigation only.",
    "An explicit component selector is strong invocation intent but still respects Use-Case/context composition plus the component local applicability/materiality gate.",
    "A Lens surfaces Finding Candidates; Core Finding Disposition resolves actual State/owner/lifecycle consequences.",
    "Broad Discussion may remain sufficient; do not create a Target, State Unit or Checkpoint merely because `idtspe` was invoked.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<optional TM/LENS selector + target/context, or current planning work>",
  "palette": true,
  "helperPresentation": {
    "whenToUse": "Use when you want to explicitly reaffirm current IDTSPE composition or directly name a known Target Module/Lens. Ordinary methodology-guided work already uses IDTSPE without this command.",
    "whatYouGet": "A registry-driven convenience route that preserves Use-Case-first, proportional IDTSPE behavior.",
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
