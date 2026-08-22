# Reference Objects Direct Repository Authoring

Status: active repository-facing workflow
Scope: procedure order for humans or AI agents intentionally creating or maintaining OBS Linked Notes Reference Objects directly in repository files.

This file owns **procedure order only**. Canonical semantics and formats live in [`REFERENCE-OBJECTS.md`](REFERENCE-OBJECTS.md); current routing/index/review state lives in [`reference-objects.json`](reference-objects.json).

## 1. Decide Whether This Workflow Applies

1. Read the applicable rules in [`REFERENCE-OBJECTS.md`](REFERENCE-OBJECTS.md).
2. If the task only consumes an existing materialized use, follow the ordinary-consumption rule and stop unless authoring/freshness work is actually required.
3. If the task only expresses an ordinary semantic relation with no literal synchronization or review obligation, use plain repository content/links instead of creating Reference Object metadata.

## 2. Create A New Reference Object

1. Read the current Definitions File.
2. Choose a new unique stable `ro_*` ID.
3. Add exactly one canonical `obs-ref:def` occurrence.
4. Add the matching registry record, including correct initial `uses` / `depends` indexes.
5. Validate the resulting state.

## 3. Add A Literal Use

1. Resolve the existing object and current definition.
2. Insert a complete `obs-ref:use` whose inner value equals the current definition.
3. Update the object's `uses[]` routing/index metadata.
4. Validate.

## 4. Add A Dependent Fragment

1. Resolve the existing object and current canonical definition.
2. Confirm the intended fragment has a real semantic review obligation on that value and is not merely related text.
3. Choose an unused positive file-local `dep` number.
4. Wrap the exact bounded fragment in `obs-ref:depend id="..." dep="N"` markers; do not insert a fingerprint into the working file.
5. Add `depends[]` routing metadata for `path + dep`.
6. If the fragment was actually reviewed as part of this operation, store the exact canonical-value SHA-256 in `reviewedAgainst` **and** the exact bounded-fragment SHA-256 in `reviewedFragment`; otherwise leave the acknowledgement absent so the dependency is `NEEDS REVIEW`.
7. Validate the resulting marker/index state.

## 5. Change The Canonical Definition

1. Change only the inner text of the canonical `obs-ref:def`.
2. Treat existing literal uses as potentially stale.
3. Treat registered dependent fragments whose source or fragment review fingerprint no longer matches as `NEEDS REVIEW`.
4. Do not automatically rewrite uses or dependent fragments.

## 6. Synchronize Stale Uses

1. Resolve the current definition.
2. Check the indexed uses.
3. Replace only stale `obs-ref:use` inner values when synchronization is intended.
4. Rebuild affected use line metadata.
5. Validate.

## 7. Complete A Dependency Review

1. Resolve the current canonical definition and its exact-value fingerprint.
2. Resolve the registered dependent fragment by `path + dep` and confirm exactly one live marker exists.
3. Read the complete bounded fragment and any needed surrounding context.
4. Review its semantic correctness against the current canonical value.
5. Edit the fragment only when the review requires a content change.
6. After review is actually complete, set `reviewedAgainst` to the current canonical fingerprint and `reviewedFragment` to the current exact fragment fingerprint; refresh line hints.
7. If the definition is pending local state, publish the definition and acknowledgement coherently; do not publish the Definitions File alone ahead of its pending definition.
8. Validate.

## 8. Registry / Index Maintenance After Direct Edits

Reconcile only entries affected by the intended edit. `uses[].line` and dependency `line` / `lineOccurrence` are rebuildable. Dependency `path + dep` is identity and must not be silently reassigned to a different fragment. Preserve acknowledgement only when the current bounded inner content still matches `reviewedFragment`; otherwise clear/invalidate it pending review.

If repair is ambiguous, diagnose rather than invent repository state.

## 9. Undefined Operations

If a desired operation is not defined by the canonical contract, resolve the contract gap first instead of inventing semantics in this procedure document.
