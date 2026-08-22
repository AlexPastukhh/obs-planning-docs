# Dependency Management Planning Workflow

Status: active reusable workflow
Owner Use Cases:
- `UC-DOC-ESTABLISH-DEPENDENCY`
- `UC-DOC-CONFIGURE-REVIEW-DEPENDENCIES`
- `UC-DOC-REVIEW-DEPENDENTS`
- `UC-DOC-MAINTAIN-SHARED-EXACT-MEANING`
- `UC-DOC-REVIEW-DEPENDENCY-COVERAGE`

## Purpose

Own the reusable semantic dependency-management family:

```text
establish / classify dependency intent
→ configure explicit review obligation when needed
→ review known dependents after material source change
→ maintain shared exact literal meaning only when truly required
→ review whether material dependency obligations are represented
```

Use the narrowest semantic relation/mechanism that preserves correctness. Ordinary Markdown relation remains navigation only; Linked Notes is downstream realization when tracking/synchronization is actually required.

## Configure Review Dependency Branch

For `UC-DOC-CONFIGURE-REVIEW-DEPENDENCIES`, register cases where an upstream file/owner change must produce a **required semantic review signal** for one or more downstream consumers even when no exact literal copy exists.

## Relationship Types

```text
ordinary link
→ navigation only

Review Dependency
→ consumer derives/depends on source meaning
→ source change requires explicit consumer review

Reference Object
→ canonical materialized meaning/value
→ tooling can additionally detect stale materialized uses
→ stale use may require semantic review before synchronization
```

Do not duplicate Review Dependency stale tracking for an existing materialized Reference Object use unless there is an additional independent semantic dependency.

## Minimum Dependency Meaning

```text
source file / owner
consumer file / owner
reason / meaning consumed
optional review scope
reviewed-against source identity/fingerprint
review status
```

If source identity changes after the consumer's `reviewed-against` state, the consumer becomes `NEEDS REVIEW`. Completing review may result in `no semantic change needed` or `consumer updated`; both can return the dependency to current against the new source state.

## Cascade Rule

Do not create blind transitive avalanche:

```text
A changes → B needs review
B reviewed, B meaning unchanged → stop
B reviewed, B meaning changed → B's registered consumers may now need review
```

Potential downstream chains may be shown diagnostically but do not become required-review state until their immediate source meaning changes.

## Linked Notes Handoff

Linked Notes is the selected tool mechanism for configuring/tracking repository Review Dependencies when implemented. This reusable workflow owns the semantic capability; Linked Notes owns its application behavior/runtime implementation.

## Selected Dependency-Management UC Family — Contract Recap

The selected family remains:

- `UC-DOC-ESTABLISH-DEPENDENCY` — establish/classify dependency intent;
- existing `UC-DOC-CONFIGURE-REVIEW-DEPENDENCIES` — register explicit whole/fragment review obligation when memory is insufficient;
- `UC-DOC-REVIEW-DEPENDENTS` — review known consumers after material change;
- `UC-DOC-MAINTAIN-SHARED-EXACT-MEANING` — exact synchronized literal meaning when truly required;
- `UC-DOC-REVIEW-DEPENDENCY-COVERAGE` — review whether material dependency obligations are represented.

Manual-first invocation: check on explicit request, known material dependency/change, or when current correctness cannot be trusted without it. Do not broaden every planning pass merely to search for dependency opportunities.

Semantic intent precedes mechanism. Linked Notes realization remains:

- `obs-ref:def` / `obs-ref:use` — exact synchronized literal;
- `obs-ref:depend` — bounded semantic-fragment review dependency;
- Review Dependency — whole-file source→consumer review obligation;
- Ordered Reference Lists — structural ordering.

Ordinary Markdown relation carries no tracking by itself.
