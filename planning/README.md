# Planning

This area contains repository-level planning, reusable methodology, Session work guidance, documentation methodology, command routing/tooling, and project planning state.

## Current Structural Navigation

- [`use-case-registry.md`](use-case-registry.md) — repository-specific operational Use Cases.
- [`use-cases/`](use-cases/) — canonical owners for those repository-specific Use Cases.
- [`session/`](session/) — generic active-session workflow, guidance, state, Checkpoint capabilities, and its scoped Use-Case Registry.
- [`documentation/`](documentation/) — generic reusable repository-documentation methodology and its scoped Use-Case Registry.
- [`AI-WORKING-CONTRACT.md`](AI-WORKING-CONTRACT.md) — current AI/chat working contract.
- [`command-routing.md`](command-routing.md) and [`commands/`](commands/) — executable command routing and command definitions.
- [`areas/`](areas/) — project-local planning/application state.
- [`helper-library/`](helper-library/) — Planning Helper source/library material.
- [`dashboard/`](dashboard/) — current dashboard/view projections.
- [`planning-input-conventions.md`](planning-input-conventions.md) — input conventions used by current planning interaction.
- [`documentation/idtspe-methodology/`](documentation/idtspe-methodology/) — IDTSPE methodology; separate from generic Documentation, Session, and repository operational capability layers.

## Semantic Navigation

README navigation is structural. Select the relevant area, then follow that area's own current navigation to its semantic owner. A Use-Case Registry covers the Use Cases in its declared functional scope; it is not a repository-wide aggregation layer for neighboring Session, Documentation, IDTSPE/SDS, application, or other semantic systems.

## Migration / Provenance

Documentation fundamental-UC identity reconciliation is complete. The former repository-wide transitional UC aggregation is retired: Session, Documentation, repository-specific operational capabilities, and specialized methodologies now keep their current semantic navigation within their own scopes.

Exact pre-fundamental root navigation snapshots remain under [`legacy/`](legacy/) as provenance, not current semantic owners.

README owns structural navigation only. Functional capability meaning belongs in the applicable current semantic owner.
