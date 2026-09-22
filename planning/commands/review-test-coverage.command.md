# Review Test Coverage

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "test_coverage.review",
  "file": "review-test-coverage.command.md",
  "command": "проверь тестовое покрытие",
  "englishName": "review test coverage",
  "commandFamily": [
    "проверь тестовое покрытие"
  ],
  "description": "direct Test Proof Lens coverage review",
  "meaning": "Resolve/reuse the natural host Target/context and apply LENS-TEST-PROOF-EVIDENCE to current selected semantics + actual tests/checks/Practical Evidence. Review coverage/freshness/assertion strength/wrong-layer/Escape/Refactor issues without creating a TM-TEST-COVERAGE Target.",
  "activeContextBehavior": "Resolve or reuse the natural current IDTSPE Target/context; infer CREATE/REFINE/EXTEND/REVALIDATE/REPAIR from current state. Do not create a fake Target when the module/lens gate fails.",
  "traversalReadMode": "Reuse current reliable IDTSPE/SDS governance; targeted refresh of the selected owner route when uncertain; full bootstrap only when no reliable sufficient governance context exists.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md"
  ],
  "expectedOutput": "Test Proof Lens review: property→actual Evidence mapping, material strong/partial/missing/stale/wrong-layer/weak-assertion findings and natural correction/revalidation destinations; no separate Coverage Target.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "This is a direct reusable Lens review, not a Test Coverage Target Module invocation.",
    "Actual tests/run Evidence remain Evidence Sources; green test names do not become semantic authority.",
    "Material gaps go through Core Finding Disposition to Exact Realization, optional Test Design, Practical Evidence or the challenged semantic owner.",
    "This command is read-only planning; it does not implement tests or execute them."
  ],
  "userTarget": "<selected semantic/Evidence coverage scope>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": "SDS",
    "surfaceKind": "LENS",
    "targetModuleId": null,
    "lensId": "LENS-TEST-PROOF-EVIDENCE",
    "parentSurface": null,
    "hostTargetPolicy": "RESOLVE_OR_REUSE_TARGET"
  },
  "includes": [
    "planning/commands/work-through-idtspe.command.md",
    "planning/commands/recheck-idtspe-port-composition.command.md",
    "planning/commands/include-idtspe-trace-port.command.md",
    "planning/commands/idtspe-port-lens.command.md",
    "planning/commands/apply-idtspe-lens.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "LENS-TEST-PROOF-EVIDENCE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md",
      "anchor": "lens-test-proof-evidence-test-proof-evidence-quality",
      "why": "Concrete Lens Model semantics selected by this command; shared port/registry/Meta-Model references are inherited from included commands.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
