# Documentation Workbench Use-Case Registry

Status: active project-local semantic Use-Case Registry
Doc version: v1.2.0-scenarios-and-proposed-notes
Scope: independently useful current Documentation Workbench workflows/capabilities and explicit deferred candidates.

Parent Direction Registry: [`direction-registry.md`](direction-registry.md)

## 1. Registry Index

| Use-Case ID | Semantic name | Status | Direction | Main owner | Related command |
|---|---|---|---|---|---|
| `UC-DW-DOC-REF` | Repository Documentation Change And Reference Review | accepted current | `DIR-DOCUMENTATION-WORKBENCH` | [`repository-documentation-change-and-reference-review-workflow.md`](repository-documentation-change-and-reference-review-workflow.md) | none |
| `UC-DW-ITEM-FULL-PICTURE` | Planning Meaning To Repository | accepted current; legacy ID retained | `DIR-DOCUMENTATION-WORKBENCH` | [`planning-meaning-to-repository-workflow.md`](planning-meaning-to-repository-workflow.md) | `сверь айтемы` for reconciliation stage only |
| `UC-DW-LINKED-NOTES` | Create, Link And Manage Repository Notes | proposed / canonical item transition pending | `DIR-DOCUMENTATION-WORKBENCH` | [`linked-notes-end-to-end-workflow.md`](linked-notes-end-to-end-workflow.md) | none |
| `UC-DW-STRUCTURED-MESSAGE` | Structured User Message Composer | active supporting | `DIR-DOCUMENTATION-WORKBENCH` | `ITEM-121` in `planning-item-register.md` | none |

## 2. `UC-DW-DOC-REF` — Repository Documentation Change And Reference Review

**Trigger/input:** repository/file/folder/stable section selected for direct documentation work or accepted planning meaning handed off for materialization.

**Result:** complete changed Markdown, validated stable links, resolved or explicit affected-use review state and a reviewable Git diff, or an unresolved/deferred result.

**Owner route:**

```text
planning-draft.md for current boundaries and Key Scenarios
repository-documentation-change-and-reference-review-workflow.md
planning-item-register.md for affected canonical requirements.
```

The workflow does not require managed Reference Objects, App Memory, Semantic Home or a custom editor.

## 3. `UC-DW-ITEM-FULL-PICTURE` — Planning Meaning To Repository

The stable ID remains for compatibility; the semantic name and current result changed.

**Trigger/input:** free-form/structured source, Planning Items, current Planning Draft or repository owners requiring reconciliation.

**Result:** reviewed canonical Planning Items, one item-backed Planning Draft, proportional alternatives/deepening, repository semantic reconciliation and a File Update Plan/diff handoff.

**Owner route:**

```text
planning-draft.md
planning-meaning-to-repository-workflow.md
planning-item-register.md
reusable Planning Item formation/drafting owners.
```

`сверь айтемы` activates only the read-only reconciliation stage under root UCM permissions.

## 4. Proposed `UC-DW-LINKED-NOTES` — Create, Link And Manage Repository Notes

**Trigger/input:** the user opens the Notes work surface to create, edit, link, save or navigate a Note.

**Candidate result:** a durable repository-owned Markdown Note with working links, or an explicit local-only, unresolved or failed state.

**Owner route:**

```text
planning-draft.md for selected behavior and implementation questions
linked-notes-end-to-end-workflow.md for trigger-to-result continuity
ITEM-124 in planning-item-register.md for current canonical capability meaning
ITEM-114 for stable file/section targets.
```

The incoming Use Case would support links to complete repository files, stable anchored fragments/sections and other Notes. It does not accept a generic Reference Object runtime, a specific userscript, a Note storage layout or a token-storage architecture.

The Use Case identity, expanded `ITEM-124` meaning and Tampermonkey/GitHub Implementation Idea remain pending explicit Planning Item review and prototype evidence.

## 5. `UC-DW-STRUCTURED-MESSAGE` — Structured User Message Composer

**Purpose:** structure long literal input into addressable topics, questions, corrections and examples without rewriting meaning.

**Result:** one ordinary user message whose fragments may contribute to several Planning Items.

**Boundary:** does not require every fragment to become an item or depend on a broad Workbench application.

Owner: `ITEM-121 / STRUCTURED-USER-MESSAGE-COMPOSER`.

## 6. Deferred Candidate — Chat/AI/Work-State Trace

Related items remain deferred:

```text
ITEM-11B
ITEM-12A
ITEM-12B
ITEM-109
ITEM-115
ITEM-116
```

Promotion requires one independently traversable trigger-to-result lifecycle and evidence that Git history/current tools are insufficient.

## 7. Detailed Scenario Boundary

The former project-local `SCN-DW-*`, DATA and Behavior files are no longer selected and are removed by Batch 3B. Their useful current meaning is represented by complete Key Scenarios in [`planning-draft.md`](planning-draft.md), existing Planning Items and the current workflow owners.

No project-local Scenario catalog/tombstone remains. The reusable `UC-AP-SCENARIO` route is activated only when the specialized profile is explicitly selected.

## 8. Supporting Artifacts That Are Not Use Cases

```text
planning-draft.md → high-level owner;
planning-item-register.md → current item/source owner;
retired-planning-items.md → historical inactive item owner;
reference-object-model-and-lifecycle.md → deferred alternative;
registries/templates/matrices → semantic or supporting artifacts;
Tampermonkey implementation candidate → Implementation Idea, not a Use Case owner.
```

## 9. Activation

Adaptive: use remembered current local context when clearly sufficient.

Full: read this registry, the selected complete workflow, the Planning Draft and targeted item/source records.

Activation grants no repository permission.
