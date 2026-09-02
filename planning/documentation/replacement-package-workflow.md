# Replacement Package Workflow

Status: active shared navigation owner
Purpose: provide one entry point for the producer → package contract → consumer workflow without duplicating behavior ownership.

## Ownership map

```text
Replacement Package Builder
  current producer mechanics:
  - planning/commands/build-replacement-archive.command.md
  - planning/use-cases/UC-REPO-BUILD-REPLACEMENT-PACKAGE.md
  - planning/documentation/build-replacement-archive-workflow.md
  target Scenario:
  - replacement-package-builder/scenarios/SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE.md
        ↓ exact reviewed package + handoff identity
Package contract
  - tools/replacement-package-app/PACKAGE-PROTOCOL.md
        ↓ OBS-ACTION apply-package
Replacement Package App
  - tools/replacement-package-app/README.md
  - tools/replacement-package-app/scenarios/
```

This file is navigation only. It does not own Builder behavior, package schema, consumer behavior, Domain semantics, implementation mechanics or proof requirements.

## Current vs target boundary

**Current producer boundary:** exact readable source → replacement ZIP → OBS-ACTION → stop.

**Selected target producer behavior:** exact build context → candidate → exact package → clean replay → semantic review of predicted result → APPROVABLE exact package/result identity → exact handoff → stop.

**Current consumer capability:** Work Intent + isolated workspace + Apply/Commit/Publish are implemented for Git-backed work; Git-derived Current Change, reviewed-result confirmation, PR readiness and target Finalize semantics are not yet fully migrated.

The package protocol remains the contract seam. Producer and consumer documentation must link through it rather than duplicating its schema rules.
