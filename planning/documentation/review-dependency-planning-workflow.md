# Review Dependency Planning Workflow

Status: active reusable workflow
Owner Use Case: `UC-DOC-CONFIGURE-REVIEW-DEPENDENCIES`

## Purpose

Register cases where an upstream file/owner change must produce a **required semantic review signal** for one or more downstream consumers even when no exact literal copy exists.

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
