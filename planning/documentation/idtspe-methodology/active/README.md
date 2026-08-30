# Active Methodology

Status: active package navigation

This directory is organized by **methodology zone**, not by one giant system map.
The README answers where authoritative material lives; each package owns its own
internal semantics.

## Generic IDTSPE Core

- [`idtspe-core/README.md`](idtspe-core/README.md) — generic planning runtime and semantic contracts.
- [`idtspe-core/BOOTSTRAP-IDTSPE.md`](idtspe-core/BOOTSTRAP-IDTSPE.md) — Core bootstrap.
- [`idtspe-core/IDTSPE-SHELL.md`](idtspe-core/IDTSPE-SHELL.md) — generic Target/Resolution shell.
- [`idtspe-core/target-modules/README.md`](idtspe-core/target-modules/README.md) — generic Target Modules.
- [`idtspe-core/lenses/README.md`](idtspe-core/lenses/README.md) — Core and installed Lens registry.
- [`idtspe-core/shared/`](idtspe-core/shared/) — reusable generic contracts/guides.

## Installed Profiles

- [`profiles/README.md`](profiles/README.md) — installed profile registry.
- [`profiles/sds/README.md`](profiles/sds/README.md) — SDS profile entry.

A profile may add Target Modules, Lenses, workflow direction, command surfaces,
representation guidance and examples without redefining IDTSPE Core.

## Independent Peer Concerns / Temporary Theory

- [`ai-reviewability/README.md`](ai-reviewability/README.md) — independent AI reviewability concern.
- [`theoretical-modules/README.md`](theoretical-modules/README.md) — reusable/raw theory not yet necessarily operationalized as a Target Module or Lens.

## Audits

Current active consistency audits live at this directory level. They verify the
assembled methodology; they are not semantic owners and do not replace package
READMEs, Target Modules, Lenses or shared contracts.

Legacy `active/target-modules`, `active/lenses`, `active/generic`, `active/shared`
and `active/examples` are compatibility navigation only. New canonical owners
belong in `idtspe-core/` or an explicit installed profile.
