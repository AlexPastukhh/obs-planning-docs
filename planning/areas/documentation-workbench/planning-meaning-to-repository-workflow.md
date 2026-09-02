# Planning Meaning To Repository Workflow

Status: active accepted project-local End-To-End Workflow
Doc version: v1.1.0-uc-centric-repository-handoff
Scope: preserve source meaning, review scoped Ideas/current owners when material, integrate selected meaning into real current owners and hand reviewed meaning to repository realization without forcing a duplicate ordered File Update Plan.

## 1. Trigger And Result

**Trigger:** free-form or structured source, scoped Ideas/current conclusions, or repository/current-owner meaning requiring integration.

**Result:** reviewed selected planning meaning integrated into the appropriate real current owner(s), plus a concrete reviewable repository realization/handoff surface to the selected depth or a documented unresolved/deferred end state. An ordered File Update Plan is produced only when that separate route is selected/useful.

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
  → integrate selected meaning into the real affected current owner(s)
  → compare alternatives and no-change
  → deepen questions/risks/tests only where justified
  → resolve affected Workspace UC(s) / other semantic owners
  → use current Workspace Planning Step 1/2/3 proportionally for Workspace/documentation change
  → reconcile with current repository owners
  → when Step 3 already supplies a sufficient exact realization/file surface, hand it directly to the next separately authorized update/package route
  → otherwise, when an explicit ordered concrete transition is selected/useful, produce a File Update Plan
  → literal diff review after authorized materialization
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

### Stage 5 — Integrate Selected Meaning Into Real Current Owners

Update/link the actual current Use Cases, Scenarios, workflows, decisions or other semantic owners that own the selected meaning. Keep cross-owner navigation where useful, but do not create a generic Current Planning Meaning, Planning Draft or Full Picture body as a parallel owner.

### Stage 6 — Deepen Proportionally

Research, prototypes and concerns remain proportional. For Workspace/documentation change, use current generic Workspace Planning as applicable:

```text
Step 1 — affected/new Workspace UC
Step 2 — Domain / rules / semantic owners
Step 3 — Workspace Change Path + proportional Architecture Lens + vertical realization / exact files / verification
```

Application actor-visible behavior continues through its Scenario/Application Planning owners rather than being forced into the Workspace planning shape.

### Stage 7 — Repository Semantic Handoff

Map accepted meaning to existing/new owners and select the narrowest sufficient repository handoff:

```text
UC-centric Step 3 already has a complete exact realization/file surface
→ hand that reviewed surface directly to the next separately authorized update/package route

ordered concrete transition is separately requested/useful
→ use the active File Update Plan capability
```

Do not force a second ordered file plan merely because a repository transition follows semantic planning.

### Stage 8 — Literal File And Diff Handoff

A separately authorized package/update route uses the selected exact transition, verifies required base state and returns/exposes the resulting diff for review.

## 5. Branches And Loops

| Situation | Behavior |
|---|---|
| Existing owner already covers meaning | keep/link it; do not duplicate |
| Incoming meaning extends/corrects | show explicit transformation |
| Direct conflict lacks a decision | stop with prioritized question and conservative fallback |
| Implementation Idea appears | link it separately; do not accept architecture |
| Evidence changes a decision | return to affected current owners / Ideas |
| Repository base changed | stop package application before changes |
| Diff reveals semantic error | return to reconciliation; do not commit |

## 6. Review Gates

| Gate | Review object | Required result |
|---|---|---|
| Source gate | selected messages/files | source scope explicit |
| Meaning gate | Ideas/current-owner transformations | current selected/unresolved meanings explicit |
| Planning gate | selected current owners | coherent selected meaning and integration state |
| Repository gate | reviewed Step-3 exact realization/file surface or explicitly selected File Update Plan | explicit owners/actions/boundaries sufficient for the next authorized route |
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
current-context.md
../../documentation/idea-review-and-planning-workflow.md
../../documentation/workspace-planning/workspace-planning-principles-and-terminology.md
../../documentation/workspace-planning/use-case-registry.md
../../documentation/application-planning/solution-and-scenario-planning-workflow.md
planning-item-register.md  # provenance/history only
../../use-cases/UC-REPO-PLAN-UPDATE.md  # only when explicit ordered repository update planning is selected/useful
```

No stage authorizes commit or push without separate explicit permission.
