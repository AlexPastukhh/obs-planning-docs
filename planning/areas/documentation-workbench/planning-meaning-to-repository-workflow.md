# Planning Meaning To Repository Workflow

Status: active accepted project-local End-To-End Workflow
Doc version: v1.0.0-repository-native
Scope: preserve source meaning, review scoped Ideas/current owners when material, maintain one Planning Draft and hand reviewed meaning to repository file/update work.

## 1. Trigger And Result

**Trigger:** free-form or structured source, scoped Ideas/current conclusions, a current Planning Draft or repository meaning requiring integration.

**Result:** reviewed current planning meaning, one current Planning Draft when useful and an explicit repository/file-update handoff, or a documented unresolved/deferred end state.

## 2. Preconditions

- selected source is explicit;
- current repository owners can be read or their limitation is stated;
- repository write permission is separate from planning/reconciliation;
- complete source context is preserved.

## 3. End-To-End Flow

```text
source / current owner
  → preserve literal messages and relevant context
  → collect/review scoped Ideas when answer-seeking work is material
  → targeted current-owner check
  → show Current / Incoming / Resulting transformations when non-trivial
  → explicit current conclusion / unresolved decision
  → update one current Planning Draft when useful
  → compare alternatives and no-change
  → deepen questions/risks/tests only where justified
  → reconcile with current repository owners
  → produce an Idea-aware File Update Plan
  → separately authorized replacement package
  → literal diff review
  → documented / unresolved / deferred result.
```

## 4. Mandatory Stages

### Stage 1 — Select And Preserve Source

Record exact messages, files or checked facts. Do not silently choose an old archive or shortened paraphrase as the sole source.

### Stage 2 — Review Ideas / Current Meaning When Material

Use the shared Idea methodology for answer-seeking work. Preserve facts, constraints and decisions as their own meanings; one incoming fragment does not imply one new Idea.

### Stage 3 — Reconcile Current Owners

Inspect relevant current owners, principles, workflows, decisions, scoped Ideas and historical provenance only when useful. Show transformations before literal repository changes.

### Stage 4 — Establish Current Conclusions

Select, modify, defer/reject or leave unresolved the relevant Ideas/current meanings. Acceptance of planning meaning does not authorize implementation or repository writes.

### Stage 5 — Maintain One Planning Draft

Organize current conclusions, alternatives, high-level Scenarios, questions, risks, evidence and selected depth. Do not create a parallel Full Picture body owner.

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
| Evidence changes a decision | return to affected current owners / Ideas and Planning Draft |
| Repository base changed | stop package application before changes |
| Diff reveals semantic error | return to reconciliation; do not commit |

## 6. Review Gates

| Gate | Review object | Required result |
|---|---|---|
| Source gate | selected messages/files | source scope explicit |
| Meaning gate | Ideas/current-owner transformations | current selected/unresolved meanings explicit |
| Planning gate | Planning Draft | coherent current direction and depth |
| Repository gate | File Update Plan | explicit owners/actions/boundaries |
| Literal gate | Git diff | approved exact file transition |

## 7. Boundaries

This workflow does not require:

- a universal Planning Item layer;
- App Memory;
- Semantic Home;
- a separate Planning Full Picture;
- detailed Scenario artifacts;
- automatic repository writes;
- one implementation platform.

It does not own direct documentation editing that starts without solution planning; that belongs to [`repository-documentation-change-and-reference-review-workflow.md`](repository-documentation-change-and-reference-review-workflow.md).

## 8. Current Owners

```text
planning-draft.md
../../documentation/idea-review-and-planning-workflow.md
../../documentation/application-planning/application-planning-drafting-workflow.md
planning-item-register.md  # provenance/history only
../../documentation/file-update-overview-workflow.md
```

No stage authorizes commit or push without separate explicit permission.
