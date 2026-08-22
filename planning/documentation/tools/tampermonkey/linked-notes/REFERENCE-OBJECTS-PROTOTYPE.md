# Repository Reference Objects Prototype Slice

Status: implementation prototype / automated focused evidence available / browser and real-GitHub acceptance pending
Prototype host: Linked Notes `0.10.0-prototype`
Definitions File: `.linked-notes/reference-objects.json` schema v2
Owner: [`scenarios/README.md`](scenarios/README.md) / `SCN-LN-REFERENCE-OBJECTS`

## 1. Purpose

The Files workspace provides a narrow repository-native Reference Object helper. One stable `ro_*` object can have one canonical definition, literal materialized uses and bounded semantic dependent fragments.

```text
<!-- obs-ref:def id="ro_example" -->canonical value<!-- /obs-ref:def -->
<!-- obs-ref:use id="ro_example" -->materialized value<!-- /obs-ref:use -->
<!-- obs-ref:depend id="ro_example" dep="1" -->derived content that must be reviewed after source change<!-- /obs-ref:depend -->
```

`use` is literal synchronization. `depend` is semantic review, not propagation. A dependency may contain `use` markers; nested dependencies and definitions inside dependencies are invalid.

## 2. Definitions File And Review State

`.linked-notes/reference-objects.json` stores `id`, mutable display name, definition path, rebuildable uses and dependencies. Version 1 registries are read as `depends: []`; writes use schema v2.

Each dependency has a positive number unique in its file, path/line hints plus optional `reviewedAgainst` and `reviewedFragment`. The first is SHA-256 of the **exact canonical definition inner text**; the second is SHA-256 of the **exact bounded fragment inner content** last reviewed. Neither hash is placed in consumer Markdown.

Canonical value remains only in the one `obs-ref:def`.

## 3. Local-First State

Reference Object edits, use refreshes, dependency creation/review metadata and registry reindexing use the common workspace/repository/branch pending-file queue with first verified base SHA. They perform no GitHub write.

If the Definitions File acknowledgement is based on a pending definition, `Update current file` blocks publishing the Definitions File alone; `Update all` publishes the coherent pending definition/registry/consumer set through the common one-commit boundary.

## 4. Use Freshness

`Check uses` follows the Definitions File, definition path and indexed use paths. It compares literal inner values, reports current/stale/unresolved and never writes. `Update uses locally` changes stale literal inner values only.

## 5. Dependent Fragments

`Add dependency` exact-matches a selected fragment, assigns the next free file-local `dep` number, wraps the fragment and records it as reviewed against the current definition. The working file contains no fingerprint.

`Check dependencies` reads the Definitions File, canonical definition and indexed dependency consumer paths only. A dependency is CURRENT only when `path + dep` resolves to exactly one live marker and both source and fragment fingerprints match; changed content becomes NEEDS REVIEW and a missing/ambiguous marker becomes UNRESOLVED. No unrelated repository crawl occurs.

`Review complete` opens/validates the selected `path + dep`, requires exactly one live marker, expects the user/AI to perform semantic review and then records the current canonical and fragment fingerprints in the Definitions File. If the fragment remains correct, its file is unchanged. No action automatically edits derived content.

## 6. Validation And Diagnostics

`Validate tags` checks indexed definition/use/dependency routes for marker errors, identity/index drift, duplicate file-local dependency numbers and missing/unknown occurrences. `Deep validate repo` is the only bounded repository-wide discovery path.

Files diagnostics show stale/unresolved literal uses separately from dependency fragments needing review/unresolved.

## 7. UI

Each Reference Object exposes Copy reference, Add dependency, Open definition, Check uses, Check dependencies, Update uses locally, Rename, expandable Uses and Dependencies lists. Dependency rows expose Open and Review complete.

## 8. Safety

- no source guessing or fuzzy wrapping;
- no automatic use insertion;
- no automatic stale propagation;
- no automatic rewriting of dependent fragment content;
- no fingerprint in working `obs-ref:depend` markup;
- dependency `path + dep` is stable routing identity while line fields are rebuildable;
- fragment edits invalidate acknowledgement until review is completed again;
- duplicate marker attributes are invalid rather than last-wins;
- indexed checks avoid unrelated repository traversal;
- pending-source acknowledgements must publish coherently with their source definition;
- common publication keeps SHA/absence preflight and exact verification.

## 9. Evidence

Focused tests cover dependency parsing/nesting/duplicate-attribute rules, v1→v2 registry migration, file-local dependency identity, source+fragment hashing, indexed consumer integrity checks, Review complete validation, fragment-edit invalidation, local runtime creation/acknowledgement and publication safety, alongside existing Reference Object literal-use tests. Browser and real-GitHub acceptance remains required.
