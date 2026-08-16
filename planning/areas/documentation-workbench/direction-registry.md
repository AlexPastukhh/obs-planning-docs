# Documentation Workbench Direction Registry

Status: active project-local semantic Direction Registry
Doc version: v1.3.0-linked-notes-current-semantics-migrated
Scope: project-local Directions for repository-native Documentation Workbench planning and helper capabilities. Current Linked Notes application Use Cases are owned by the Linked Notes-local registry.

Parent root registry: [`planning/direction-registry.md`](../../direction-registry.md)

Local Use-Case Registry: [`use-case-registry.md`](use-case-registry.md)

Current Linked Notes semantic registry: [`USE-CASE-REGISTRY.md`](../../documentation/tools/tampermonkey/linked-notes/USE-CASE-REGISTRY.md)

## 1. Direction Index

| Direction ID | Semantic name | Status | Parent/root Direction | Owner |
|---|---|---|---|---|
| `DIR-DOCUMENTATION-WORKBENCH` | Maintain Repository-Native Documentation Planning And Tools | active | `DIR-PLAN-SOLUTION` | [`planning-draft.md`](planning-draft.md) |
| `DIR-DW-PLANNING-DOCS` | Maintain Documentation Workbench Planning Documentation | active supporting | `DIR-MAINTAIN-DOCS-ROUTES` | this area plus reusable owners |

The stable Direction ID is preserved for compatibility. Its current meaning does not require one monolithic application.

## 2. `DIR-DOCUMENTATION-WORKBENCH`

### Purpose

Maintain a portable Markdown/Git documentation workspace with stable links, explicit affected-use review, bounded AI transfer and durable linked Notes. Add independently useful small tools only when existing editors, links, search and Git review do not provide the required result.

### Topology

```text
Planning Meaning To Repository workflow
  → optional explicit handoff
  → Repository Documentation Change And Reference Review workflow;

current Linked Notes application semantics:
  migrated to planning/documentation/tools/tampermonkey/linked-notes/USE-CASE-MAP.md;

independently useful supporting capability:
  Structured User Message Composer;

optional Implementation Ideas:
  Reference Impact Checker;
  AI Transfer Expander;
  Tampermonkey Linked Notes And GitHub Widget;

deferred alternative:
  application-heavy managed Reference Object model.
```

### Child Use Cases

| Use Case | Status | Owner |
|---|---|---|
| `UC-DW-DOC-REF` — Repository Documentation Change And Reference Review | accepted current | `repository-documentation-change-and-reference-review-workflow.md` |
| `UC-DW-ITEM-FULL-PICTURE` — Planning Meaning To Repository | accepted current; legacy ID retained | `planning-meaning-to-repository-workflow.md` |
| `UC-DW-STRUCTURED-MESSAGE` — Structured User Message Composer | active supporting | `ITEM-121` in `planning-item-register.md` |

### Boundaries

- Planning Draft is the high-level owner.
- Complete Key Scenarios and one Full Picture Matrix are the selected local planning representation.
- Full Picture is not a separate current artifact.
- Reference Object model is deferred, not a peer workflow.
- Detailed project-local SDS planning is not selected for this solution now.
- Current Linked Notes behavior/Use-Case identity is not owned by this direction registry; use the Linked Notes-local semantic map/registry.
- Tool ideas do not imply implementation.
- Direction activation grants no edit/archive/commit/push permission.

## 3. `DIR-DW-PLANNING-DOCS`

### Purpose

Keep project-local Planning Items, Planning Draft, workflow owners, compatibility paths and later root/projection synchronization consistent with reusable planning owners.

### Supported Activities

```text
capture exact source;
reconcile current/deferred/retired item meaning;
maintain the Planning Draft and its Key Scenarios;
maintain independently traversable current workflows;
preserve historical item bodies;
retire obsolete local deep-planning files;
keep root and projection routes aligned with current owners.
```

No local registry activation grants repository permission.
