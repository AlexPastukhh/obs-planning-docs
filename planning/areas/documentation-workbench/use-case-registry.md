# Documentation Workbench Use-Case Registry

Status: active project-local semantic Use-Case Registry
Doc version: v1.6.0-current-prototype-evidence-alignment
Scope: independently useful current Documentation Workbench workflows/capabilities, supporting prototype workflows and explicit deferred candidates.

Parent Direction Registry: [`direction-registry.md`](direction-registry.md)

## 1. Registry Index

| Use-Case ID | Semantic name | Status | Direction | Main owner | Related command |
|---|---|---|---|---|---|
| `UC-DW-DOC-REF` | Repository Documentation Change And Reference Review | accepted current | `DIR-DOCUMENTATION-WORKBENCH` | [`repository-documentation-change-and-reference-review-workflow.md`](repository-documentation-change-and-reference-review-workflow.md) | none |
| `UC-DW-ITEM-FULL-PICTURE` | Planning Meaning To Repository | accepted current; legacy ID retained | `DIR-DOCUMENTATION-WORKBENCH` | [`planning-meaning-to-repository-workflow.md`](planning-meaning-to-repository-workflow.md) | `сверь айтемы` for reconciliation stage only |
| `UC-DW-LINKED-NOTES` | Create, Link And Manage Repository Notes | working / current `0.8.0` prototype evidence; acceptance pending | `DIR-DOCUMENTATION-WORKBENCH` | [`linked-notes-end-to-end-workflow.md`](linked-notes-end-to-end-workflow.md) | none |
| `UC-DW-REPOSITORY-FILES-CATEGORIES` | Browse Repository Files And Manage Categories | working / current `0.8.0` prototype evidence; acceptance pending | `DIR-DOCUMENTATION-WORKBENCH` | [`repository-file-browser-and-categories-workflow.md`](repository-file-browser-and-categories-workflow.md) | none |
| `UC-DW-IMAGE-AWARE-MARKDOWN-TRANSFER` | Copy A Linked Note And Repository Images | working / current `0.8.0` prototype retains this capability; acceptance pending | `DIR-DOCUMENTATION-WORKBENCH` | [`image-aware-markdown-transfer-workflow.md`](image-aware-markdown-transfer-workflow.md) | none |
| `UC-DW-STRUCTURED-MESSAGE` | Structured User Message Composer | active supporting | `DIR-DOCUMENTATION-WORKBENCH` | `ITEM-121` in `planning-item-register.md` | none |

Current supporting prototype workflows that are **not promoted here to new Use-Case IDs** are listed in Section 12.

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

## 4. `UC-DW-LINKED-NOTES` — Create, Link And Manage Repository Notes

**Trigger/input:** the user opens the Notes work surface to create, edit, link, save or navigate a Note.

**Candidate result:** a durable repository-owned Markdown Note with working links, or an explicit local-only, unresolved or failed state.

**Owner route:**

```text
planning-draft.md for selected behavior and implementation questions
linked-notes-end-to-end-workflow.md for trigger-to-result continuity
ITEM-124 in planning-item-register.md for current canonical capability meaning
ITEM-114 for stable file/section targets.
```

The Use Case supports links to complete repository files, stable anchored fragments/sections and other Notes. It does not accept a generic Reference Object runtime, a specific userscript, a final Note storage layout or a token-storage architecture.

The Use Case and `ITEM-124` are current selected behavior. The current `0.8.0-prototype` is implementation evidence only and remains pending browser/real-GitHub acceptance where the workflow requires it.

## 5. `UC-DW-REPOSITORY-FILES-CATEGORIES` — Browse Repository Files And Manage Categories

**Trigger/input:** the user selects one configured GitHub workspace and explicitly opens Files or Categories to browse, preview, author bounded text, define, assign or inspect repository content.

**Result:** a selected supported file is readable inside the helper and retains its exact GitHub URL; bounded text create/edit can be explicitly verified; category definitions/descriptions/memberships are reconstructible from repository Markdown; explicit writes are conflict-protected and verified, or a visible recoverable failure is returned.

**Owner route:**

```text
planning-draft.md for selected behavior and implementation questions
repository-file-browser-and-categories-workflow.md for trigger-to-result continuity
files-centric-repository-workspace-extension.md for adjacent Files-only prototype extensions
ITEM-97 and ITEM-118 in planning-item-register.md for categories and views
ITEM-126 and ITEM-127 for file viewing and category relations
ITEM-128 for the selected bounded definition-file prototype
ITEM-129 for the deferred file-local metadata alternative.
```

The Use Case distinguishes read-only repository navigation from explicit verified writes. UI-only groups do not classify files; repository-backed implications may derive category membership. Current Files extensions such as repository templates or add-only structure/copy remain prototype implementation details unless their semantic meaning is separately reconciled.

## 6. `UC-DW-IMAGE-AWARE-MARKDOWN-TRANSFER` — Copy A Linked Note And Repository Images

**Trigger/input:** the user opens a verified repository-backed Note, selects a same-owner/repository/branch Markdown target and create or append mode, reviews image classifications/destinations and explicitly starts the transfer.

**Result:** visible Note Markdown is created/appended at the target; supported repository images are copied or safely reused under a target-owned asset folder; relative image destinations and all successful remote writes are verified, or an explicit partial/conflict result is returned.

**Owner route:**

```text
planning-draft.md for selected boundaries and evidence status
image-aware-markdown-transfer-workflow.md for trigger-to-result continuity
ITEM-134 in planning-item-register.md for canonical capability meaning
ITEM-124 for source Note/image authoring
ITEM-132 for safe image interpretation and rendering
ITEM-34B for repository review/conflict boundaries.
```

The bounded prototype copies rather than moves, preserves source Note/assets, remains in one owner/repository/branch, does not auto-download external images and does not promise multi-file atomicity or automatic orphan cleanup.

## 7. `UC-DW-STRUCTURED-MESSAGE` — Structured User Message Composer

**Purpose:** structure long literal input into addressable topics, questions, corrections and examples without rewriting meaning.

**Result:** one ordinary user message whose fragments may contribute to several Planning Items.

**Boundary:** does not require every fragment to become an item or depend on a broad Workbench application.

Owner: `ITEM-121 / STRUCTURED-USER-MESSAGE-COMPOSER`.

## 8. Deferred Candidate — Chat/AI/Work-State Trace

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

## 9. Detailed Scenario Boundary

The former project-local `SCN-DW-*`, DATA and Behavior files are no longer selected. Their useful current meaning is represented by complete Key Scenarios in [`planning-draft.md`](planning-draft.md), existing Planning Items and the current workflow owners.

No project-local Scenario catalog/tombstone remains. The reusable `UC-AP-SCENARIO` route is activated only when the specialized profile is explicitly selected.

## 10. Supporting Artifacts That Are Not Use Cases

```text
planning-draft.md → high-level owner;
planning-item-register.md → current item/source owner;
retired-planning-items.md → historical inactive item owner;
linked-notes-prototype-roadmap.md → current implementation priorities, not canonical item meaning;
reference-object-model-and-lifecycle.md → deferred alternative;
registries/templates/matrices → semantic or supporting artifacts;
Tampermonkey implementation → prototype evidence, not a Use Case owner.
```

## 11. Activation

Adaptive: use remembered current local context when clearly sufficient.

Full: read this registry, the selected complete workflow, the Planning Draft and targeted item/source records.

Activation grants no repository permission.

## 12. Current Supporting Prototype Workflows Without New Use-Case IDs

The current `0.8.0-prototype` contains supporting workflows/extensions that are independently documented but are **not promoted by this registry update into new semantic Use-Case IDs**:

| Supporting workflow / extension | Current owner | Boundary |
|---|---|---|
| Files-centric repository workspace extensions | [`files-centric-repository-workspace-extension.md`](files-centric-repository-workspace-extension.md) | adjacent implementation slice under repository Files behavior |
| Repository-native Reference Objects | [`reference-object-definition-and-materialized-use-workflow.md`](reference-object-definition-and-materialized-use-workflow.md) | bounded repository-native slice; not the deferred generic managed-object runtime |
| Chat Response Reader | [`chat-response-reader-workflow.md`](chat-response-reader-workflow.md) | local response-reading workflow; semantic promotion not decided here |
| Full App State Export | [`full-app-state-export-workflow.md`](full-app-state-export-workflow.md) | diagnostic state export; not normal content-copy or restore workflow |

Semantic promotion, if later desired, requires separate workflow/item/use-case reconciliation.

## 13. Shared Supporting Capabilities

`UC-DW-LINKED-NOTES`, `UC-DW-REPOSITORY-FILES-CATEGORIES` and `UC-DW-IMAGE-AWARE-MARKDOWN-TRANSFER` share `ITEM-130` contextual errors, `ITEM-131` target picking/bounded search, `ITEM-132` rich Markdown/images and `ITEM-133` managed Note relation metadata. These are supporting capabilities, not additional independently traversable Use Cases.

The current prototype may also reuse implementation infrastructure such as the safe Markdown renderer, workspace/GitHub adapter and diagnostic App State snapshot without changing semantic Use-Case identity.
