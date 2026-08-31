# Repository Integration / Migration Provenance

Status: historical migration/provenance index; **not** current methodology, command-routing, or Planning Helper authority.

The IDTSPE/SDS repository migration represented here is complete. Detailed staged audits, snapshot reconciliations, command-readiness tables and pre-final Helper navigation plans were removed from the working tree after finalization because they duplicated superseded topology and produced false-positive “current” search results. Git history remains the provenance source when those intermediate details are needed.

## Current Authority

Use current owners directly:

- [`../active/README.md`](../active/README.md) — active methodology navigation.
- [`../active/idtspe-core/README.md`](../active/idtspe-core/README.md) — IDTSPE Core.
- [`../active/profiles/sds/README.md`](../active/profiles/sds/README.md) — canonical SDS profile.
- [`../../../command-routing.md`](../../../command-routing.md) + `planning/commands/*.command.md` — executable command routing.
- [`../../tools/tampermonkey/chat-command-palette/README.md`](../../tools/tampermonkey/chat-command-palette/README.md) — current Planning Helper implementation/navigation contract.
- Planning Helper generated catalogs + tests — mechanical projection/consistency evidence.

## Boundary

This directory must not accumulate a second current methodology description.

```text
current semantic/routing question
→ active Core/Profile/command owner

current Helper/navigation question
→ command metadata + Helper implementation/tests

historical migration question
→ Git history
```

Do not reintroduce historical SDS Target Module counts, retired `TM-WEUC` / `TM-DOMAIN-DRAFT` / `TM-FRONTEND-SLICE` topology, old `tmcmd.*` surface arithmetic, or earlier Helper tab counts as current integration documentation.
