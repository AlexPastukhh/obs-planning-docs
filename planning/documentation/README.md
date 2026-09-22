# Documentation

Generic reusable methodology for repository documentation. The fundamental Documentation capabilities are independent of IDTSPE and other project methodologies. The physical location of a specialized methodology under `planning/documentation/` does not make that methodology's semantic units part of generic Documentation methodology.

## Bootstrap

When the primary bootstrap reaches this package, read:

1. this `README.md`;
2. [`principles-and-terminology.md`](principles-and-terminology.md);
3. [`use-cases/UC-DOC-RESOLVE-CURRENT-USE-CASES.md`](use-cases/UC-DOC-RESOLVE-CURRENT-USE-CASES.md) — ambient applicability Process for every current Planning/repository work entry;
4. [`use-case-registry-map.md`](use-case-registry-map.md) — cross-scope routing metadata consumed by that Process;
5. [`use-case-registry.md`](use-case-registry.md) — generic Documentation routing rows consumed when this scope is plausible.

Other Documentation Use-Case bodies are read only when the current applicable Use-Case composition requires them. The Registry Map remains routing metadata; [`UC-DOC-RESOLVE-CURRENT-USE-CASES`](use-cases/UC-DOC-RESOLVE-CURRENT-USE-CASES.md) owns applicability resolution.

## Current Owners

- [`principles-and-terminology.md`](principles-and-terminology.md) — documentation vocabulary and stable semantic rules.
- [`use-case-registry-map.md`](use-case-registry-map.md) — cross-scope methodology-use routing metadata consumed by the fundamental applicability resolver.
- [`use-case-registry.md`](use-case-registry.md) — current generic Documentation capabilities, with compact applicability/result summaries.
- [`use-cases/`](use-cases/) — current Documentation Use-Case owners, including the fundamental methodology applicability Use Case.
- [`processes/`](processes/) — reusable Documentation Processes reached from Use Cases; they do not replace Use-Case Results or semantic owners.
- [`templates/`](templates/) — shape-only templates introduced by the fundamental layer.

## Existing Supporting Areas — Pending File-Level Decomposition

Older workflows, models, templates, tools, and methodology areas may still contain useful supporting meaning. Their former pre-fundamental `UC-DOC-*` identity does not remain current merely because a supporting file still exists.

In particular, existing `idtspe-methodology/`, application/workspace/architecture/testing planning areas, `tools/`, and root supporting workflows remain available according to their own current owners/routes while later cleanup decides `KEEP / FOLD / MOVE / RETIRE` at file/meaning level.

## Provenance

Exact pre-fundamental `README.md` and `use-case-registry.md` snapshots remain under [`legacy/`](legacy/) as provenance. They are not current semantic owners, and relative links inside them may reflect their former canonical location.
