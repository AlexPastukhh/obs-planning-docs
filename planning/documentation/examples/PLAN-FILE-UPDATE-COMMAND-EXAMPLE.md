# Plan File Update Command Example

Status: active practical example
Scope: demonstrate the current `план файл-обновление` output shape without owning methodology.

Canonical owners: [`../file-update-overview-workflow.md`](../file-update-overview-workflow.md), [`../FILE-UPDATE-OVERVIEW-TEMPLATE.md`](../FILE-UPDATE-OVERVIEW-TEMPLATE.md).

## План файл-обновление

**Статус:** planned

### Command metadata

| Field | Value |
|---|---|
| Canonical command | `план файл-обновление` |
| English name | `plan file update` |
| Permission mode | `plan-only` |

### Target

Extend the reusable scope-log workflow with stable record identity semantics and add practical ReviewDiff example coverage.

### Checked sources

- current scope/log workflow;
- current ReviewDiff semantic workflow;
- current examples index;
- root Parallel Work Scope Registry;
- current scope action log.

### Idea analysis

#### IDEA-UPD-1 — Keep the identity contract inside the existing scope/log workflow

**Source / Status:** confirmed ReviewDiff finding; correction route selected for planning.

**Problem / Need:** cross-scope references depend on Entry IDs, but reusable semantics do not yet say that those IDs are stable or what minimum fields make the main record kinds usable.

**Idea Variants:**

- **Variant A:** create a separate log schema/specification file;
- **Variant B:** add one focused identity/minimum-shape section to the existing reusable scope/log workflow.

**Necessity / Better-Route:** a separate schema would add another owner for a small contract already inseparable from scope/log semantics.

**Current Selected Variant:** **Variant B** — extend the existing workflow; do not create a new schema file.

**Current Conclusion:** keep the correction local to the current owner and demonstrate it through examples rather than duplicating rules in examples.

### Current Plan / Current conclusions

```text
parallel-work-scope-and-action-log-workflow.md
→ stable Scope ID + Entry ID invariants
→ type-specific minimum record anchors

review-diff-review-workflow.md
→ links one practical semantic ReviewDiff example

examples/
→ update File Update example
→ add ReviewDiff practical example
→ index both as examples only
```

### Questions / Risks / Problems

No material unresolved issues identified.

### Registered Parallel-Work Scopes / Logs

```text
Affected Scope(s):
  SCOPE-REUSABLE-DOCUMENTATION

Canonical Log For This Work:
  planning/documentation/action-log.md

Reference-Only Logs:
  none
```

Logging is already active, so the implementation package must accumulate the material ReviewDiff correction and this later clarification before its `APPLIED` target-state record.

### Update Step 1 — Correct reusable log identity semantics

**Objective:** make cross-scope Entry references stable without introducing a second schema owner.

#### Actions

1. Add stable Scope ID and canonical Log Entry ID invariants to the scope/log workflow.
2. Add concise minimum semantic anchors for each supported record kind.
3. Keep the format flexible; do not turn the workflow into a serialization schema.

#### Files changed in this step

| Change | File | R | What changes | Why |
|---|---|---|---|---|
| Updated | `planning/documentation/parallel-work-scope-and-action-log-workflow.md` | reusable scope/log semantics | stable identity + minimum record shapes | cross-scope references need durable identity |

### Update Step 2 — Add practical output coverage

**Objective:** make the current ReviewDiff and File Update output shapes easy for future chats to reproduce correctly.

#### Actions

1. Update this File Update example to demonstrate command metadata, selected variant, Current Plan-relative aggregates and registered scope/log planning.
2. Add a ReviewDiff example where a selected unapplied correction yields `NEEDS CORRECTION` even with empty Q/R/P.
3. In the same ReviewDiff example, show the follow-up `APPROVABLE` case and the rule that approval-only results do not create log events.
4. Link both examples from their owner workflows and the examples index.

#### Files changed in this step

| Change | File | R | What changes | Why |
|---|---|---|---|---|
| Updated | `planning/documentation/file-update-overview-workflow.md` | file-update planning behavior | link practical example | discoverability |
| Updated | `planning/documentation/review-diff-review-workflow.md` | ReviewDiff semantic review | link practical example | discoverability |
| Updated | `planning/documentation/examples/PLAN-FILE-UPDATE-COMMAND-EXAMPLE.md` | example only | current complete example shape | practical coverage |
| New | `planning/documentation/examples/REVIEW-DIFF-PRACTICAL-EXAMPLE.md` | example only | selected-correction + approval follow-up cases | practical coverage |
| Updated | `planning/documentation/examples/README.md` | examples navigation | index current examples | discoverability |

### Update Step 3 — Preserve cumulative scope-log state

**Objective:** keep repository state and material reasoning/application history coherent after the package applies.

#### Actions

1. Append the material ReviewDiff finding and selected correction.
2. Append the user's later practical-example requirement as a material clarification.
3. Append `APPLIED` for the exact package target state.

#### Files changed in this step

| Change | File | R | What changes | Why |
|---|---|---|---|---|
| Updated | `planning/documentation/action-log.md` | canonical scope history | cumulative REVIEW DIFF → clarification → APPLIED records | package final-state invariant |

### Boundaries / intentionally unchanged

- `COLLECT-IDEAS-PRACTICAL-EXAMPLE.md` remains unchanged because it already demonstrates the current shared Idea review and Current-Plan-relative aggregate contract.
- No new log schema/template file is created.
- No repository-wide aggregate log is introduced.
- This plan does not edit files or create a package by itself.

### Checks / exit criteria

1. Every new/changed example points back to canonical owners and does not become semantic authority.
2. ReviewDiff example distinguishes selected correction from unresolved Q/R/P.
3. File Update example includes command metadata, one selected route, scope/log planning, boundaries and checks.
4. No broken Markdown links.
5. Existing repository tests/verify remain green.

### Package/source/delivery status

```text
Package: not created in plan-only mode
Source: current checked repository state
Delivery: requires separate `давай архив` authorization
```

### Следующее действие

Build a continuation replacement package only after separate authorization.

**План файл-обновление**
