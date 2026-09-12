# Planning

This area contains repository-level planning, reusable methodology, Session interaction guidance, documentation methodology, command routing/tooling, and project planning state.

## Primary Bootstrap

This README is the **primary bootstrap entry from zero or unreliable planning context**. It establishes the generic environment through Session, Documentation and IDTSPE Core, and intentionally stops before any profile.

Read in this order:

1. [`session/README.md`](session/README.md) — follow its `Bootstrap` section to establish the ambient USER↔AI interaction contract.
2. [`AI-WORKING-CONTRACT.md`](AI-WORKING-CONTRACT.md) — repository-level working/authority boundary.
3. [`documentation/README.md`](documentation/README.md) — follow its `Bootstrap` section for generic Documentation and methodology-use navigation.
4. [`documentation/idtspe-methodology/active/idtspe-core/README.md`](documentation/idtspe-methodology/active/idtspe-core/README.md) — follow its `Bootstrap` section for the generic IDTSPE Core.

After those reads, the primary bootstrap is established. Do **not** load an IDTSPE profile merely because it is installed. If a profile becomes applicable, bootstrap that profile from its own `README.md`; profile bootstrap is incremental and assumes this primary bootstrap is already current.

Bootstrap establishes methodology knowledge only. It does not create a Target, State Unit, Lens result, Checkpoint, profile selection, filesystem artifact, or repository mutation by itself.

## Current Structural Navigation

- [`use-case-registry.md`](use-case-registry.md) — repository-specific operational Use Cases.
- [`use-cases/`](use-cases/) — canonical owners for those repository-specific Use Cases.
- [`session/`](session/) — thin generic USER↔AI interaction/runtime contract; no current Session-owned planning methodology Use Cases.
- [`documentation/`](documentation/) — generic reusable repository-documentation methodology and the functional methodology Use-Case entry.
- [`AI-WORKING-CONTRACT.md`](AI-WORKING-CONTRACT.md) — mandatory repository working/authority contract.
- [`command-routing.md`](command-routing.md) and [`commands/`](commands/) — executable command routing and command definitions.
- [`areas/`](areas/) — project-local planning/application state.
- [`helper-library/`](helper-library/) — Planning Helper source/library material.
- [`dashboard/`](dashboard/) — current dashboard/view projections.
- [`planning-input-conventions.md`](planning-input-conventions.md) — input conventions used by current planning interaction.
- [`documentation/idtspe-methodology/`](documentation/idtspe-methodology/) — IDTSPE methodology workspace; generic Core and installed profiles keep separate bootstrap/read boundaries.

## Semantic Navigation

README navigation is structural/bootstrap navigation. After primary bootstrap, methodology-use work starts from [`documentation/use-case-registry-map.md`](documentation/use-case-registry-map.md). Select the relevant scope, then follow the selected Use Case Process and current semantic owner. A Use-Case Registry covers the Use Cases in its declared functional scope; it is not a repository-wide aggregation layer for neighboring Session, Documentation, IDTSPE/SDS, application, or other semantic systems.

## Migration / Provenance

Documentation fundamental-UC identity reconciliation is complete. The former repository-wide transitional UC aggregation is retired: Session, Documentation, repository-specific operational capabilities, and specialized methodologies now keep their current semantic navigation within their own scopes.

Exact pre-fundamental root navigation snapshots remain under [`legacy/`](legacy/) as provenance, not current semantic owners.

README owns structural/bootstrap navigation only. Functional capability meaning belongs in the applicable current semantic owner.
