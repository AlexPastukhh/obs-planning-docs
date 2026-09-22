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
  "meaning": "IDTSPE is already active. Bare `idtspe` explicitly refreshes/reaffirms the current methodology Use-Case applicability, composes current IDTSPE work through `UC-IDTSPE-COMPOSE-CURRENT-WORK`, ALWAYS refreshes/reaffirms the current Port Requirement Set through `IDTSPE.PORT-COMPOSITION-REFRESH`, and then continues through one normal Shell pass with the smallest useful current composition, which may remain Broad Discussion only. Explicit registered Target Module/Lens selectors remain subject to current applicability/materiality gates.",
  "activeContextBehavior": "Treat bare `idtspe` as ordinary current-work continuation. `idtspe <TM-ID|LENS-ID|tm alias|lens alias> <context>` contributes explicit registered component intent before composition refresh; exact `TM-*` / `LENS-*` IDs always work, registry aliases resolve only when unique, and ambiguous or unknown selectors are not guessed.",
  "traversalReadMode": "Read current Core/profile Target Module and Lens registry summaries first. For an exact/unique selector, read only the selected component body plus the minimum Core/profile governance it requires. Do not scan/load every module or Lens body. Reuse current reliable governance; targeted refresh when uncertain.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/USE-CASE-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/profiles/PROFILE-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md"
  ],
  "expectedOutput": "The refreshed/reaffirmed Use-Case and Port Requirement composition plus the smallest useful current IDTSPE result (including a valid Broad-Discussion-only result) or explicitly selected applicable Target Module/Lens result/evaluation. No command invocation makes optional structure mandatory.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "IDTSPE is always active in this methodology environment; this command is a convenience/navigation surface, not a mode switch.",
    "Every normal Shell pass refreshes/reaffirms the Port Requirement Set even when the prior composition is reusable.",
    "Canonical semantic selectors are TM-* Target Module IDs and LENS-* Lens IDs; short aliases are registry navigation only.",
    "An explicit component selector is strong invocation intent but still respects Use-Case/context composition plus the component local applicability/materiality gate.",
    "A Lens surfaces Finding Candidates; Core Finding Disposition resolves actual State/owner/lifecycle consequences.",
    "Broad Discussion may remain sufficient; do not create a Target, State Unit or Checkpoint merely because `idtspe` was invoked.",
    "This command plans/reviews only; it does not edit repository files, implement, test, commit or push."
  ],
  "userTarget": "<optional TM/LENS selector + target/context, or current planning work>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "WORK_MODE",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "NONE"
  },
  "includes": [
    "idtspe.port.trace",
    "methodology.use_cases.recheck",
    "idtspe.compose-current-work",
    "idtspe.port-composition.recheck"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "IDTSPE.DEFAULT-WORK-MODE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/IDTSPE-DEFAULT-WORK-MODE.md",
      "anchor": "core-rule",
      "why": "Defines the normal proportional meaning of working through IDTSPE; broad discussion can remain sufficient.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.CONTEXTUAL-APPLICATION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md",
      "anchor": "1-core-invariant",
      "why": "Defines contextual methodology activation/deactivation and guards against forcing optional structure.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.UC.COMPOSE-CURRENT-WORK",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/compose-current-work/UC-IDTSPE-COMPOSE-CURRENT-WORK.md",
      "anchor": "process",
      "why": "Composes the currently useful IDTSPE work after the mandatory Use-Case applicability recheck.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.RUNTIME-COMPOSITION",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md",
      "anchor": "idtspe-port-p01",
      "why": "Defines normal Shell invocation and the runtime frame entered after composition refresh.",
      "role": "RUNTIME_ENTRY",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
