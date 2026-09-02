# Pre-Update Plan

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "tmcmd.pre.update",
  "file": "plan-pre-update.command.md",
  "command": "составь предапдейт план",
  "englishName": "pre-update plan",
  "commandFamily": [
    "составь предапдейт план",
    "предапдейт план",
    "сначала план обновления",
    "pre-update plan"
  ],
  "description": "Produce a concrete read-only plan of the intended update before actual mutation.",
  "meaning": "Run generic Core TM-PRE-UPDATE-PLAN. Use current accepted prior meaning, current context and only the current destination facts the update actually depends on. Resolve material Questions/Risks/Problems/Ideas/Evidence/Decisions through ordinary IDTSPE state when needed, then return one concrete RU-PUPDATE-01 Pre-Update Plan. Do not reopen settled design or create a QRPE form when no real choice/uncertainty exists.",
  "activeContextBehavior": "Create or reuse the natural bounded Pre-Update Plan Target only when reviewing the intended changes before mutation is independently useful. Skip the module for a tiny/obvious change when the user asks for direct realization. The result may hand off to TM-EXACT-REALIZATION but does not authorize repository/destination mutation.",
  "traversalReadMode": "Reuse current reliable IDTSPE governance and accepted prior context; inspect only the exact current code/files/configuration/owner state the update plan materially depends on. Surface a real missing-source Question instead of guessing current state.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PRE-UPDATE-PLAN.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-command-surface-contract.md"
  ],
  "expectedOutput": "RU-PUPDATE-01 Pre-Update Plan: concrete intended changes, preserve boundary, material order/dependencies and post-update verification, with unresolved material issues only when they actually remain.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Use accepted previous meaning/current context as the basis; do not redesign it without a material new conflict.",
    "Use ordinary Q/R/P/Evidence + Ideas/Decisions only where they help resolve a real consequential choice; do not dump a mandatory QRPE form.",
    "Inspect current destination state only as needed for a concrete safe plan and never guess consequential missing source facts.",
    "The plan does not mutate files, execute tests, commit or push; actual update authority belongs to the later host/Exact Realization workflow.",
    "Skip this Target when the change is trivial and the user explicitly wants direct realization."
  ],
  "userTarget": "<update scope>",
  "palette": true,
  "helperPresentation": {
    "whenToUse": "Use when you want to review exactly what will change before code/files/configuration are actually updated.",
    "whatYouGet": "A concise concrete pre-update plan derived from accepted context/current state, including preserve boundaries and verification without another design pass unless a real issue requires it.",
    "navigation": {
      "viewId": "IDTSPE",
      "viewLabel": "IDTSPE",
      "sectionId": "core",
      "sectionLabel": "IDTSPE Core",
      "sectionOrder": 0,
      "itemOrder": 5,
      "kindLabel": "IDTSPE TARGET",
      "viewOrder": 0
    }
  },
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "TARGET_MODULE",
    "targetModuleId": "TM-PRE-UPDATE-PLAN",
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "CREATE_OR_REUSE_TARGET"
  }
}
[/PLANNING_COMMAND_DEFINITION]
