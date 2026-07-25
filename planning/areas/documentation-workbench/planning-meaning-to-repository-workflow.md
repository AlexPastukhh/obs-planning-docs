# Planning Meaning To Repository Workflow

Status: active accepted project-local End-To-End Workflow
Doc version: v1.0.0-repository-native
Scope: preserve source meaning, form/reconcile Planning Items, maintain one Planning Draft and hand reviewed meaning to repository file/diff work.

## 1. Trigger And Result

**Trigger:** free-form or structured source, existing Planning Items, a current Planning Draft or repository meaning requiring reconciliation.

**Result:** reviewed canonical Planning Items, one current Planning Draft and an explicit repository/file-update handoff, or a documented unresolved/deferred end state.

## 2. Preconditions

- selected source is explicit;
- current repository owners can be read or their limitation is stated;
- repository write permission is separate from planning/reconciliation;
- complete source context is preserved.

## 3. End-To-End Flow

```text
source
  → preserve literal messages and relevant context
  → form or select Planning Items
  → targeted current-owner check
  → show Current / Incoming / Resulting transformations
  → explicit acceptance
  → update one item-backed Planning Draft
  → compare alternatives and no-change
  → deepen questions/risks/tests only where justified
  → reconcile with current repository owners
  → produce a File Update Plan
  → separately authorized replacement package
  → literal diff review
  → documented / unresolved / deferred result.
```

## 4. Mandatory Stages

### Stage 1 — Select And Preserve Source

Record exact messages, files or checked facts. Do not silently choose an old archive or shortened paraphrase as the sole source.

### Stage 2 — Form Or Select Planning Items

Each item owns a complete reusable meaning. A source fragment may update, merge, split, relate, defer or retire meaning; one incoming fragment does not imply one new item.

### Stage 3 — Reconcile Current Owners

Inspect relevant current items, principles, workflows, decisions and owner files. Show transformations before literal repository changes.

### Stage 4 — Accept The Canonical Item Set

User acceptance applies to meanings and dispositions, not to implementation or repository writes.

### Stage 5 — Maintain One Planning Draft

Organize items, alternatives, high-level Scenarios, questions, risks, evidence and selected depth. Do not create a parallel Full Picture body owner.

### Stage 6 — Deepen Proportionally

Research, prototypes, concerns, Domain or Slice work are optional and justified by uncertainty or coordination needs.

### Stage 7 — Repository Semantic Handoff

Map accepted meaning to existing/new owners and produce an ordered File Update Plan.

### Stage 8 — Literal File And Diff Handoff

A separately authorized package replaces complete files, verifies exact base blobs and returns the full diff for review.

## 5. Branches And Loops

| Situation | Behavior |
|---|---|
| Existing owner already covers meaning | keep/link it; do not duplicate |
| Incoming meaning extends/corrects | show explicit transformation |
| Direct conflict lacks a decision | stop with prioritized question and conservative fallback |
| Implementation Idea appears | link it separately; do not accept architecture |
| Evidence changes a decision | return to affected items and Planning Draft |
| Repository base changed | stop package application before changes |
| Diff reveals semantic error | return to reconciliation; do not commit |

## 6. Review Gates

| Gate | Review object | Required result |
|---|---|---|
| Source gate | selected messages/files | source scope explicit |
| Item gate | Current/Incoming/Resulting rows | accepted canonical meanings/dispositions |
| Planning gate | Planning Draft | coherent current direction and depth |
| Repository gate | File Update Plan | explicit owners/actions/boundaries |
| Literal gate | Git diff | approved exact file transition |

## 7. Boundaries

This workflow does not require:

- application-native managed Planning Items;
- App Memory;
- Semantic Home;
- a separate Planning Full Picture;
- detailed Scenario artifacts;
- automatic repository writes;
- one implementation platform.

It does not own direct documentation editing that starts without solution planning; that belongs to [`repository-documentation-change-and-reference-review-workflow.md`](repository-documentation-change-and-reference-review-workflow.md).

## 8. Current Owners

```text
planning-item-register.md
planning-draft.md
../../documentation/application-planning/planning-item-formation-workflow.md
../../documentation/application-planning/application-planning-drafting-workflow.md
../../documentation/file-update-overview-workflow.md
```

No stage authorizes commit or push without separate explicit permission.
