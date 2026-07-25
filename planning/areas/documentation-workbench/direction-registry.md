# Documentation Workbench Direction Registry

Status: active project-local semantic Direction Registry
Doc version: v1.0.0-repository-native-direction
Scope: project-local Directions for repository-native Documentation Workbench planning and optional helper capabilities.

Parent root registry: [`planning/direction-registry.md`](../../direction-registry.md)

Local Use-Case Registry: [`use-case-registry.md`](use-case-registry.md)

## 1. Direction Index

| Direction ID | Semantic name | Status | Parent/root Direction | Owner |
|---|---|---|---|---|
| `DIR-DOCUMENTATION-WORKBENCH` | Maintain Repository-Native Documentation Planning And Tools | active | `DIR-PLAN-SOLUTION` | [`planning-draft.md`](planning-draft.md) |
| `DIR-DW-PLANNING-DOCS` | Maintain Documentation Workbench Planning Documentation | active supporting | `DIR-MAINTAIN-DOCS-ROUTES` | this area plus reusable owners |

The stable Direction ID is preserved for compatibility. Its current meaning does not require one monolithic application.

## 2. `DIR-DOCUMENTATION-WORKBENCH`

### Purpose

Maintain a portable Markdown/Git documentation workspace and add independently useful small tools only when existing editors, links, search and Git review do not provide the required result.

### Topology

```text
Planning Meaning To Repository workflow
  → optional explicit handoff
  → Repository Documentation Change And Reference Review workflow;

independently useful capability:
  Structured User Message Composer;

optional Implementation Ideas:
  Reference Impact Checker;
  AI Transfer Expander;
  Notes helper/index;

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
- Full Picture is not a separate current artifact.
- Reference Object model is deferred, not a peer workflow.
- Detailed SDS profile is not selected for this solution now.
- Tool ideas do not imply implementation.
- Direction activation grants no edit/archive/commit/push permission.

## 3. `DIR-DW-PLANNING-DOCS`

### Purpose

Keep project-local Planning Items, Planning Draft, workflow owners, compatibility paths and later root/projection synchronization consistent with reusable planning owners.

### Supported Activities

```text
capture exact source;
reconcile current/deferred/retired item meaning;
maintain the Planning Draft;
maintain two current end-to-end workflows;
preserve historical item bodies;
plan Scenario migration;
align root and projection routes in a later reviewed batch.
```

No local registry activation grants repository permission.
