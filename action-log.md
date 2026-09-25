# Scope Action Log

Scope: `SCOPE-REPOSITORY-SHELL`
Status: active cumulative high-level log

Logging starts only after explicit user instruction; no pre-start history is reconstructed automatically.

## Entries

### XREF-001 — Registered scope/log architecture bootstrap

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-005`  
**Reason:** this scope/log was established as part of the cross-scope registered-scope/log migration. Full rationale and application history are owned by the canonical entry.

### XREF-002 — Scope-direction registry alignment and Helper save recovery

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/tools/tampermonkey/chat-command-palette/action-log.md`  
**Entry:** `LOG-PH-003`  
**Reason:** the root Scope Registry gained Direction navigation metadata as part of the same cross-scope work item. Full reasoning and applied-state history are owned by the canonical Helper log entry.

### XREF-003 — UC/Scenario semantic discoverability consistency cleanup

**Type:** CROSS-SCOPE REFERENCE  
**Canonical Log:** `planning/documentation/action-log.md`  
**Entry:** `LOG-DOC-024`  
**Reason:** root README navigation is synchronized with the current Workspace/methodology Use-Case vs Application Scenario boundary; full consistency findings/rationale and applied state are owned by the canonical reusable-documentation log.


## v22 — explicit Lens apply semantics finalized

- Explicit semantic `APPLY / USE <named Lens>` now forces one real Lens Application on the bounded current Analysis Surface.
- Base Applicability / Usefulness remains explanatory relevance context and cannot cancel explicit apply intent.
- `APPLIED — no material finding / no useful change` is valid.
- One-shot explicit apply does not create or strengthen a persistent Unit Lens Attachment.
- Generic port/capability requirements remain applicability/traversal requirements and may still end `NOT_APPLICABLE`.
- Updated Lens Meta-Model, Lens selection/application commands, Runtime Composition Contract, and Command Surface Contract.

## v23 candidate — Unit-local Lens Attachment migration

- Added a visible `Lens Attachments` block to all 57 audited Result Units across 13 SDS + 5 inherited Core Target Modules.
- Every block shows `Core Lens Pack: INHERITED`; predictable additional attachments are expressed only as `REQUIRED [CLOSING]` or `TRIGGERED`.
- Removed migrated module-level `Lens Profile` routing so Unit owners are now normative.
- Added `profiles/sds/registries/LENS-ATTACHMENT-MAP.md` as a projection-only overview and linked it from SDS registry navigation.
- Generic Core Target Modules carry only generic Core Lens attachments; SDS-specific audit candidates for `RU-REAL-01` remain an explicit unresolved profile-extension ownership question rather than creating a Core → SDS dependency.

## v24 — Core Exact / SDS Code Realization split

- Kept Core `TM-EXACT-REALIZATION` broad/profile-neutral and added SDS `TM-CODE-REALIZATION` for source/test/codebase implementation.
- Updated SDS registry/command routing and the Lens attachment projection to 14 SDS + 5 inherited Core Target Modules / 58 Result Units.
- Moved SDS-specific realization Lens attachments to `RU-CODE-01` instead of introducing a Core→SDS Unit-attachment dependency.

## v26 — Post-split routing/evidence correction

- Generalized Core realization handoffs to the applicable realization owner: a narrower active-profile realization owner when one applies, otherwise Core `TM-EXACT-REALIZATION`.
- Updated Testing Knowledge, Test-Proof handoff, Pre-Update routing, Core Scenario/Navigation/Unit surfaces, SDS Domain/Evolution handoffs and active Application/Testing supporting docs.
- Refreshed current assembled-methodology consistency evidence to 5 generic Core Target Modules, 12 generic Core Lenses, 14 SDS Target Modules, 19 Target Modules in the SDS projection and 58 Result Units.
- Marked the old post-Pass4 mechanical check historical rather than current evidence.
- Rebuilt Helper projections; 299/299 tests, build parity and verify pass.
