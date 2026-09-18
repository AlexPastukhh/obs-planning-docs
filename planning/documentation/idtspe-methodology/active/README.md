# Active Methodology

Status: active package navigation

This directory is organized by **methodology zone**, not by one giant system map.
The README answers where authoritative material lives; each package owns its own
internal semantics.

## Generic IDTSPE Core

- [`METHODOLOGY-RESPONSIBILITY-MAP.md`](METHODOLOGY-RESPONSIBILITY-MAP.md) — cross-Core/profile responsibility → current canonical owner routing; the destination owner remains semantic authority.
- [`idtspe-core/README.md`](idtspe-core/README.md) — generic IDTSPE Core bootstrap/navigation + semantic contracts.
- [`idtspe-core/IDTSPE-SHELL.md`](idtspe-core/IDTSPE-SHELL.md) — generic Target/Resolution shell.
- [`idtspe-core/target-modules/README.md`](idtspe-core/target-modules/README.md) — generic Target Modules.
- [`idtspe-core/lenses/README.md`](idtspe-core/lenses/README.md) — Core and installed Lens registry.
- [`idtspe-core/shared/`](idtspe-core/shared/) — reusable generic contracts/guides.

## Installed Profiles

- [`profiles/README.md`](profiles/README.md) — installed profile registry.
- [`profiles/sds/README.md`](profiles/sds/README.md) — SDS profile entry.
- [`profiles/visual-production-2d/README.md`](profiles/visual-production-2d/README.md) — 2D Visual Production profile entry.
- [`profiles/reference-knowledge/README.md`](profiles/reference-knowledge/README.md) — Reference Knowledge profile entry.

A profile may add Target Modules, Lenses, workflow direction, command surfaces,
representation guidance and examples without redefining IDTSPE Core.

## Methodology Evolution

- [`METHODOLOGY-EVOLUTION-STEPS.md`](METHODOLOGY-EVOLUTION-STEPS.md) — deferred methodology/runtime improvements. Entries are backlog/design signals only; they do not become current Use Cases, Target Modules, Lenses or mandatory workflow merely by appearing here.

## Independent Peer Concerns / Temporary Theory

- [`ai-reviewability/README.md`](ai-reviewability/README.md) — independent AI reviewability concern.
- [`theoretical-modules/README.md`](theoretical-modules/README.md) — reusable/raw theory not yet necessarily operationalized as a Target Module or Lens.

## Audits

Top-level `*AUDIT.md` files, including [`POST-PASS12-CONSISTENCY-AUDIT.md`](POST-PASS12-CONSISTENCY-AUDIT.md), are retained as dated consistency checkpoints/evidence, not semantic authority. Installing or changing profiles may make an older audit incomplete for the newly assembled state.

Current registries, Use Cases, Target Modules, Lenses and shared contracts remain the owners and must be preferred whenever an audit differs from current installed state.

Legacy `active/target-modules`, `active/lenses`, `active/generic`, `active/shared`
and `active/examples` are compatibility navigation only. New canonical owners
belong in `idtspe-core/` or an explicit installed profile.
