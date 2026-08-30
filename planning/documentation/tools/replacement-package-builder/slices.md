# Replacement Package Builder Slices

Status: PB-01 implemented; later slices preliminary

## PB-01 — Build add/replace package from desired files

User result: given an exact locally readable repository, complete desired versions of selected files and ChangeSet context, produce one protocol-valid replacement-package ZIP.

```text
desired path absent in source              → add
desired path differs from source           → replace with exact base
desired path equals source                 → omitted as no-op
```

The Builder performs the mechanically derivable package work: source comparison, exact replace-base capture, operation derivation, existing-protocol materialization, package ID generation and final validation. AI-correctable input/state failures use one structured `VALIDATION_FAILED` surface with a specific reason and relevant facts; source absence must be provable before an `add` is emitted. Unexpected or ambiguous implementation/private-mechanics failures use `INTERNAL_ERROR` plus an investigation trace.

New and explicitly selected continuing ChangeSets use the same build path. ChangeSet openness/lifecycle authority remains outside the Builder.

Not in PB-01:

- delete operations;
- semantic edit generation;
- remote repository/source acquisition;
- expected-state derivation from prior packages;
- patch/diff input;
- action-log automation;
- package application/finalization;
- UI or ChatGPT integration.

## PB-02 — Explicit safe deletions

Preliminary next Slice: accept explicit repository-relative delete paths, capture their exact expected bases and emit protocol-valid delete operations through the same build pipeline.

## PB-03 — Build against derived expected state

Preliminary later Slice: derive an expected source from a known base plus an ordered chain of prior packages, then build the next package against that state without manual reconstruction by AI.

Possible future input adapter: exact/fail-closed patch or diff input when producing a complete desired copy of a very large file is itself a demonstrated bottleneck.
