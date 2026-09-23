# Replacement Package App — Documentation Use Cases: AI Session Work

Status: active normative Documentation Use Case group
Root authority: [`../documentation-use-cases.md`](../documentation-use-cases.md)
Detailed procedure: [`../session-methodology/README.md`](../session-methodology/README.md)

These Use Cases own session intent/input/result/composition. Detailed procedure belongs to the matching `session-methodology/*` file.

## DOC-UC-15 — Progressively Plan Change with AI

Intent:

```text
move from the highest relevant planning level toward exact realization
without silently skipping unresolved upstream meaning
```

Entry may be a new behavior/owner question, a lower-level implementation change whose upper authority is settled, or a finding that requires re-entry.

Principal result:

```text
current planning level materially closed
+
proposals/findings belonging to that level resolved/approved/deferred
+
backward consistency known
+
next-level transition explicitly offered when useful
```

Detailed procedure: [`../session-methodology/progressive-planning.md`](../session-methodology/progressive-planning.md).

---

## DOC-UC-16 — Review and Approve Proposed Change

Intent:

```text
present every actual change as a reviewable proposal
at the highest planning level it can affect
```

Principal result:

```text
approved | rejected | revise | defer
```

The proposal proportionally includes affected authority/owners, Requirement delta, upstream/downstream consequence, complexity consequence, real competing options and AI recommendation.

Detailed procedure: [`../session-methodology/proposal-and-approval.md`](../session-methodology/proposal-and-approval.md).

---

## DOC-UC-17 — Handle Finding and Re-enter Planning

Intent:

```text
classify new evidence/finding,
identify its highest affected planning meaning,
and route it to the correct planning / Requirement / behavior owner
```

Principal result:

```text
realization-only route
| Requirement revalidation
| upstream revalidation
| no change
```

Detailed procedure: [`../session-methodology/review-findings.md`](../session-methodology/review-findings.md).

---

## DOC-UC-18 — Develop Exact Implementation Candidate

May be invoked from DOC-UC-02 / DOC-UC-03 after Domain/Slice-specific discovery has established enough owner/boundary meaning.

Intent:

```text
turn approved L0-L2 meaning into an exact L3/L4 candidate
without creating new upstream meaning silently
```

Principal result:

```text
exact implementation candidate
+
exact proof plan/result where possible
+
known file/state/call-flow delta
+
backward consistency result
```

DOC-UC-18 owns the generic exact-planning procedure; the calling Use Case retains ownership of Domain/Slice-specific discovery.

Detailed procedure: [`../session-methodology/exact-implementation-planning.md`](../session-methodology/exact-implementation-planning.md).

---

## DOC-UC-19 — Execute Selected Implementation Workflow

Intent:

```text
realize/review the approved exact candidate
using the workflow appropriate to the work context
```

Predefined variants:
- Workflow A — ChatGPT-local implementation/test/review then package;
- Workflow B — Builder candidate package/replay/review then exact consumer handoff/application verification.

Principal result:

```text
approved realized result
or
finding/re-entry to DOC-UC-17 / DOC-UC-15
```

Detailed procedure: [`../session-methodology/implementation-workflows.md`](../session-methodology/implementation-workflows.md).

## Composition

```text
DOC-UC-15
→ invokes DOC-UC-16 whenever proposal approval is needed
→ invokes DOC-UC-17 whenever new evidence/finding appears
→ invokes DOC-UC-18 when exact realization is useful
→ invokes DOC-UC-19 when an exact candidate is ready for realization workflow
```

This is not a rigid sequence.
