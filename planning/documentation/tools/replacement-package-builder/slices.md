# Replacement Package Builder Slices

Status: PB-01, PB-02 and PB-03 implemented

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

User result: explicitly name repository-relative files to remove and produce protocol-valid `delete` operations without inferring deletion from desired-tree absence.

```text
explicit delete path
+ proven existing regular source file
→ exact base-files/<path>
→ action=delete
→ no replacement-files/<path>
```

`--delete` is repeatable and can be used alone or together with PB-01 desired input. Missing delete targets, desired/delete path overlap, Windows-normalized collisions, symlinks/non-regular targets and unverifiable source state fail closed. Captured delete bases use the same source-observation recheck as replacements before publication.

## PB-03 — Advance expected state by confirmed applied package

User result: after Replacement Package App confirms that package `P` was successfully applied, advance the exact expected-state workspace with that same package so the next Builder invocation starts from the resulting state without transporting ReviewDiff back into chat.

```text
expected state S0
+ package P
+ externally confirmed packageId(P)
→ validate P against S0
→ shared PackageStateApplier
→ expected state S1
```

`advance-state` accepts a normal directory workspace rather than a Git repository. It requires the archive package ID to equal the externally confirmed `--expected-package-id`, validates package structure/payload correspondence, requires raw exact base equality for replace/delete and proven absence for add, then uses the shared deterministic applier for mutation/result verification/rollback. Any applicability failure happens before mutation; private mutation/rollback failures remain internal errors.

PB-03 does not infer that the real repository Apply succeeded, does not consume ReviewDiff, does not replay an ordered historical package chain, and does not build the next package itself. Its only responsibility is `S0 + confirmed P → S1`; ordinary PB-01/PB-02 build then uses the advanced state selected by the caller.

Possible future input adapter: exact/fail-closed patch or diff input when producing a complete desired copy of a very large file is itself a demonstrated bottleneck.
