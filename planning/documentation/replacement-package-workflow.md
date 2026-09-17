# Replacement Package Workflow

Status: active shared navigation owner
Purpose: provide one entry point for the current producer → package contract → consumer workflow without duplicating behavior ownership.

## Ownership map

```text
Current package producer
  semantic owner:
  - planning/use-cases/UC-REPO-BUILD-REPLACEMENT-PACKAGE.md
  detailed process:
  - planning/documentation/build-replacement-archive-workflow.md
  direct command route:
  - planning/commands/build-replacement-archive.command.md
        ↓ exact protocol-valid package + handoff
Package contract
  - tools/replacement-package-app/PACKAGE-PROTOCOL.md
        ↓ OBS-ACTION apply-package
Replacement Package App
  - tools/replacement-package-app/README.md
  - tools/replacement-package-app/scenarios/
```

This file is navigation only. It does not own Builder behavior, package schema, consumer behavior, Domain semantics, implementation mechanics or proof requirements.


Canonical current TOOL / REPOSITORY working Scenario:

- [`repository-scenarios/SCN-06-BUILD-AND-VERIFY-REPLACEMENT-PACKAGE.md`](repository-scenarios/SCN-06-BUILD-AND-VERIFY-REPLACEMENT-PACKAGE.md)

The older `replacement-package-builder/features/*` and `replacement-package-builder/scenarios/*` target drafts are **legacy Source/Evidence**, not current or selected future semantic authority. Selected future Builder product meaning is owned by:

- [`tools/replacement-package-app/evolution-steps/EVO-RPKG-ESTABLISH-REPLACEMENT-PACKAGE-CONSTRUCTION.md`](tools/replacement-package-app/evolution-steps/EVO-RPKG-ESTABLISH-REPLACEMENT-PACKAGE-CONSTRUCTION.md)
- then [`tools/replacement-package-app/evolution-steps/EVO-RPKG-ADD-LOCAL-PACKAGE-VERIFICATION.md`](tools/replacement-package-app/evolution-steps/EVO-RPKG-ADD-LOCAL-PACKAGE-VERIFICATION.md)

Detailed app-specific/external realization composition: [`replacement-package-realization-composition.md`](replacement-package-realization-composition.md). It composes current IDTSPE Exact/Revalidation mechanics with the current generic producer and App realization while preserving each owner boundary.

## Current vs target boundary

**Current producer boundary:** exact readable source → replacement ZIP → OBS-ACTION → stop.

Current producer semantics do not include Builder-owned Issue creation, semantic work-branch creation or semantic review authority. AI/human owns those semantic work decisions according to the current Application Definition boundary.

**Selected future Builder behavior:** exact package construction is re-established first through `EVO-RPKG-ESTABLISH-REPLACEMENT-PACKAGE-CONSTRUCTION`; local verification is a later selected Step. Existing Builder code/docs may be reused only as Evidence under `KEEP / MODIFY / REPLACE`.

**Current consumer capability:** follow the current Replacement Package App Scenario/Feature owners. Snapshot, VS Code composition, notifications and other future behavior remain Step-owned until realized/materialized.

The package protocol remains the contract seam. Producer and consumer documentation must link through it rather than duplicating its schema rules.
