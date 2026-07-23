# Documentation Workbench Direction Registry

Status: active project-local semantic Direction Registry
Doc version: v0.1.0-initial-workbench-directions
Scope: project-local Directions for Documentation Workbench planning and documentation behavior.

Parent root registry: [`planning/direction-registry.md`](../../direction-registry.md)

Local Use-Case Registry: [`use-case-registry.md`](use-case-registry.md)

## 1. Direction Index

| Direction ID | Semantic name | Status | Parent/root Direction | Owner |
|---|---|---|---|---|
| `DIR-DOCUMENTATION-WORKBENCH` | Develop And Maintain Documentation Workbench | active | `DIR-PLAN-SOLUTION` | [`full-picture.md`](full-picture.md) |
| `DIR-DW-PLANNING-DOCS` | Maintain Documentation Workbench Planning Documentation | active supporting | `DIR-MAINTAIN-DOCS-ROUTES` | this area plus reusable documentation owners |

## 2. `DIR-DOCUMENTATION-WORKBENCH` — Develop And Maintain Documentation Workbench

### Purpose

Plan a workbench over real repository documentation that supports authoring, managed references, Planning Items, Full Pictures, dependency review, navigation, history and AI-oriented workflows without pretending unimplemented runtime behavior exists.

### Topology

```text
Planning Item And Full Picture workflow
  → explicit handoff to Documentation And Reference Object workflow;

independently triggered supporting capability:
  Structured User Message Composer;

supporting model:
  Reference Object Model And Lifecycle;

provisional candidate:
  Chat/AI/Work-State Trace.
```

### Child Use Cases

| Use Case | Status | Owner |
|---|---|---|
| `UC-DW-DOC-REF` — Documentation And Reference Object End-To-End Workflow | accepted | `documentation-and-reference-object-end-to-end-workflow.md` |
| `UC-DW-ITEM-FULL-PICTURE` — Planning Item And Full Picture End-To-End Workflow | accepted | `complete-pictures/planning-items-and-full-picture/full-picture.md` |
| `UC-DW-STRUCTURED-MESSAGE` — Structured User Message Composer | active supporting | `ITEM-121` in `planning-item-register.md` |

### Boundary

- Reference Object model is supporting, not a peer workflow.
- Chat/AI/Work-State remains provisional.
- Runtime architecture/storage/parser/UI remain unresolved.
- Registry entries do not imply code implementation.

## 3. `DIR-DW-PLANNING-DOCS` — Maintain Documentation Workbench Planning Documentation

### Purpose

Keep project-local Planning Items, Full Pictures, workflows, models, registries and root synchronization consistent with reusable owners and reviewed repository transitions.

### Supported Activities

```text
maintain local Direction/Use-Case entries;
reconcile item meaning;
update workflow/model owners;
update Application Root summaries;
maintain root source/activation/navigation references;
plan replacement archives/diffs separately.
```

No local registry activation grants edit/archive/commit/push permission.
