# Documentation Workbench Use-Case Registry

Status: active project-local semantic Use-Case Registry
Doc version: v1.0.0-repository-native-use-cases
Scope: independently useful current Documentation Workbench workflows/capabilities and explicit deferred candidates.

Parent Direction Registry: [`direction-registry.md`](direction-registry.md)

## 1. Registry Index

| Use-Case ID | Semantic name | Status | Direction | Main owner | Related command |
|---|---|---|---|---|---|
| `UC-DW-DOC-REF` | Repository Documentation Change And Reference Review | accepted current | `DIR-DOCUMENTATION-WORKBENCH` | `repository-documentation-change-and-reference-review-workflow.md` | none |
| `UC-DW-ITEM-FULL-PICTURE` | Planning Meaning To Repository | accepted current; legacy ID retained | `DIR-DOCUMENTATION-WORKBENCH` | `planning-meaning-to-repository-workflow.md` | `сверь айтемы` for reconciliation stage only |
| `UC-DW-STRUCTURED-MESSAGE` | Structured User Message Composer | active supporting | `DIR-DOCUMENTATION-WORKBENCH` | `ITEM-121` in `planning-item-register.md` | none |

## 2. `UC-DW-DOC-REF` — Repository Documentation Change And Reference Review

**Trigger/input:** repository/file/folder/section selected for direct documentation work or accepted planning meaning handed off for materialization.

**Result:** complete changed Markdown, validated stable links, resolved or explicit affected-use review state and a reviewable Git diff, or an unresolved/deferred result.

**Owner route:**

```text
planning-draft.md for current boundaries
repository-documentation-change-and-reference-review-workflow.md
planning-item-register.md for affected requirements.
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

## 4. `UC-DW-STRUCTURED-MESSAGE` — Structured User Message Composer

**Purpose:** structure long literal input into addressable topics, questions, corrections and examples without rewriting meaning.

**Result:** one ordinary user message whose fragments may contribute to several Planning Items.

**Boundary:** does not require every fragment to become an item or depend on a broad Workbench application.

Owner: `ITEM-121 / STRUCTURED-USER-MESSAGE-COMPOSER`.

## 5. Deferred Candidate — Chat/AI/Work-State Trace

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

## 6. Detailed Scenario Boundary

Project-local `scenarios/**` remains only as a preliminary migration source until Batch 3B coverage audit. It is not a current local product Use Case and does not activate reusable `UC-AP-SCENARIO`.

## 7. Supporting Artifacts That Are Not Use Cases

```text
planning-draft.md → high-level owner;
planning-item-register.md → current item/source owner;
retired-planning-items.md → historical inactive item owner;
reference-object-model-and-lifecycle.md → deferred alternative;
registries/templates/views → semantic or supporting artifacts.
```

## 8. Activation

Adaptive: use remembered current local context when clearly sufficient.

Full: read this registry, the selected complete workflow, the Planning Draft and targeted item/source records.

Activation grants no repository permission.
