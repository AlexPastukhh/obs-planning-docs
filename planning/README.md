# Planning

This area contains repository-level planning, reusable methodology, Session work guidance, documentation methodology, command routing/tooling, and project planning state.

## Current Structural Navigation

- [`use-case-registry.md`](use-case-registry.md) — repository-wide functional Use-Case overview.
- [`use-cases/`](use-cases/) — repository-level Use-Case owners that are not Documentation- or Session-specific.
- [`session/`](session/) — generic active-session workflow, guidance, state, and Checkpoint capabilities.
- [`documentation/`](documentation/) — generic reusable repository-documentation capabilities and methodology areas.
- [`AI-WORKING-CONTRACT.md`](AI-WORKING-CONTRACT.md) — current AI/chat working contract.
- [`command-routing.md`](command-routing.md) and [`commands/`](commands/) — executable command routing and command definitions.
- [`direction-registry.md`](direction-registry.md) — existing Direction navigation, still current pending explicit reconciliation.
- [`areas/`](areas/) — project-local planning/application state.
- [`helper-library/`](helper-library/) — Planning Helper source/library material.
- [`dashboard/`](dashboard/) — current dashboard/view projections.
- [`planning-input-conventions.md`](planning-input-conventions.md) — input conventions used by current planning interaction.
- `documentation/idtspe-methodology/` — IDTSPE methodology; separate from the generic Documentation, Session, and repository capability layers.

## Migration / Provenance

Documentation UC identity reconciliation is complete: folded/retired pre-fundamental Documentation UCs are no longer current, while surviving cross-cutting capabilities are owned by repository-level UCs. Older supporting files remain until separate file-level decomposition proves what can be folded or retired safely.

Exact pre-fundamental root navigation snapshots remain under [`legacy/`](legacy/) as provenance, not current semantic owners.

README owns structural navigation only. Functional capability meaning belongs in Use-Case owners reached through the registries.
