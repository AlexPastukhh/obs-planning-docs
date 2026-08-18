# Documentation Workbench Use-Case Registry

Status: active project-local semantic registry / Linked Notes current IDs migrated
Doc version: v1.7.0-linked-notes-migration
Scope: current non-Linked-Notes Documentation Workbench Use Cases plus compatibility mapping for former Linked Notes `UC-DW-*` IDs.

Parent Direction Registry: [`direction-registry.md`](direction-registry.md)
Current Linked Notes registry: [`USE-CASE-REGISTRY.md`](../../documentation/tools/tampermonkey/linked-notes/USE-CASE-REGISTRY.md)

## 1. Current Registry Index

| Use-Case ID | Semantic name | Status | Direction | Main owner | Related command |
|---|---|---|---|---|---|
| `UC-DW-DOC-REF` | Repository Documentation Change And Reference Review | accepted current | `DIR-DOCUMENTATION-WORKBENCH` | [`repository-documentation-change-and-reference-review-workflow.md`](repository-documentation-change-and-reference-review-workflow.md) | none |
| `UC-DW-ITEM-FULL-PICTURE` | Planning Meaning To Repository | accepted current; legacy ID retained | `DIR-DOCUMENTATION-WORKBENCH` | [`planning-meaning-to-repository-workflow.md`](planning-meaning-to-repository-workflow.md) | none |
| `UC-DW-STRUCTURED-MESSAGE` | Structured User Message Composer | retired; legacy ID only | `DIR-DOCUMENTATION-WORKBENCH` | historical `ITEM-121` only; no current owner | none |

Current Linked Notes application Use Cases are deliberately **not duplicated in this index**.

## 2. `UC-DW-DOC-REF` — Repository Documentation Change And Reference Review

**Trigger/input:** repository/file/folder/stable section selected for direct documentation work or accepted planning meaning handed off for materialization.

**Result:** complete changed Markdown, validated stable links, resolved or explicit affected-use review state and a reviewable Git diff, or an unresolved/deferred result.

Owner route:

```text
planning-draft.md for broader planning context
repository-documentation-change-and-reference-review-workflow.md
planning-draft.md / current workflow owners for current planning meaning; historical `planning-item-register.md` only when provenance is materially useful.
```

## 3. `UC-DW-ITEM-FULL-PICTURE` — Planning Meaning To Repository

**Trigger/input:** selected free-form/structured source, current Planning Draft, scoped Ideas/current conclusions or repository owners requiring integration.

**Result:** reviewed current planning meaning and an explicit repository/File Update handoff, or a documented unresolved/deferred state.

The ID is retained for compatibility only; current semantics do not depend on Planning Item formation/reconciliation.

Owner route:

```text
planning-draft.md
planning-meaning-to-repository-workflow.md
../../documentation/idea-review-and-planning-workflow.md when Idea review is material
../../documentation/file-update-overview-workflow.md
```

## 4. `UC-DW-STRUCTURED-MESSAGE` — Retired Legacy Capability

The former capability is preserved only through historical `ITEM-121` provenance. No current independent owner was identified during Planning Item retirement, so it is not an active Use Case. Ordinary source structuring remains valid input behavior and `собери идеи` accepts free-form source without this intermediate entity.

## 5. Linked Notes Migration / Compatibility Aliases

The current Linked Notes application now owns its semantic registry next to its application documentation:

- [`linked-notes/USE-CASE-MAP.md`](../../documentation/tools/tampermonkey/linked-notes/USE-CASE-MAP.md);
- [`linked-notes/USE-CASE-REGISTRY.md`](../../documentation/tools/tampermonkey/linked-notes/USE-CASE-REGISTRY.md).

Former IDs remain only so old planning links/history can be interpreted:

| Former ID | Current canonical mapping | Compatibility meaning |
|---|---|---|
| `UC-DW-LINKED-NOTES` | `UC-LN-NOTES` | former Note lifecycle ID |
| `UC-DW-REPOSITORY-FILES-CATEGORIES` | `UC-LN-FILES` + `UC-LN-CATEGORIES` + `UC-LN-PUBLISH` | old combined row split by current local-first semantics |
| `UC-DW-IMAGE-AWARE-MARKDOWN-TRANSFER` | `UC-LN-NOTE-TRANSFER` | former Note transfer ID |

Do not activate these former IDs as current Linked Notes semantic owners.

## 6. Deferred Candidate — Chat/AI/Work-State Trace

Related historical/deferred ITEM-* records remain in the provenance register. Their existence does not create a current Linked Notes Use Case.

Promotion into the actual application requires a separately implemented independently useful trigger-to-result lifecycle and then an update to the current Linked Notes map/registry.

## 7. Supporting Artifacts That Are Not Current Linked Notes Authority

```text
planning-draft.md → broader planning/history;
planning-item-register.md → historical ITEM-* provenance/migration source;
retired-planning-items.md → historical inactive item owner;
legacy Linked Notes workflow files in this area → compatibility/planning history;
Tampermonkey Linked Notes USE-CASE-MAP / USE-CASE-REGISTRY → current application semantics.
```

## 8. Activation

Activation of this registry grants no repository permission. For current Linked Notes behavior, route directly to the Linked Notes semantic map/registry rather than traversing this compatibility layer.
