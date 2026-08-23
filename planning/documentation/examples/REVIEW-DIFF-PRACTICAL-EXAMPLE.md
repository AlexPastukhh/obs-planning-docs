# ReviewDiff Practical Example

Status: active practical example
Scope: demonstrate current semantic ReviewDiff output without owning methodology or transport/application mechanics.

Canonical owner: [`../review-diff-review-workflow.md`](../review-diff-review-workflow.md). Shared Planning Concern/Decision semantics live in [`../planning-concerns-and-decisions-model.md`](../planning-concerns-and-decisions-model.md); shared Idea semantics remain in the canonical Idea owners.

## Case A — Confirmed correction selected, but not yet present in reviewed transition

### Checked Scope / Owners

- selected ReviewDiff for one reusable documentation ChangeSet;
- current reusable scope/log workflow;
- current Scope Registry and scope action log;
- shared Idea review owners.

### Confirmed Findings

#### F1 — Cross-scope references use Entry IDs without a reusable stability contract

The reviewed transition requires `CROSS-SCOPE REFERENCE` records to identify a canonical log entry, but the reusable workflow does not yet state that Entry IDs are stable/non-reusable/non-renumberable or define minimum semantic anchors for the supported record kinds.

### Corrective Ideas

#### IDEA-RD-1 — Define stable identity inside the existing scope/log workflow

**Source / Status:** ReviewDiff finding; selected correction.

**Problem / Need:** reference-only logs require durable identity for the canonical record they point to.

**Proposed Answer:** add stable Scope ID + Log Entry ID rules and concise type-specific minimum record shapes to the existing reusable scope/log workflow.

**Necessity / Better-Route:** creating a separate schema file would add another owner for a small contract already inseparable from scope/log semantics.

**Local Consistency:** the project Scope Registry already uses stable Scope IDs, and current log records already use stable-looking Entry IDs.

**Integrated Consistency:** the correction strengthens existing cross-scope/package semantics without changing the package schema or creating a second log authority.

**Current Conclusion:** **keep / selected correction**.

### Current Conclusions / Current Plan

```text
Current Plan
= reviewed registered-scope/log transition
  + selected correction IDEA-RD-1

Selected correction
= add stable Scope ID / Entry ID invariants
  + type-specific minimum record anchors
  inside the existing reusable scope/log workflow
```

The correction is selected into Current Plan, but it is not yet present in the reviewed transition.

### Planning Concerns / Q/R/P

No material unresolved issues identified.

The absence of active Q/R/P does **not** make the reviewed transition approvable: the material correction is resolved conceptually but still unapplied. Its selected correction may still have retained Decision trace without becoming an active concern.

### ReviewDiff Verdict

**NEEDS CORRECTION**

Reason: a material confirmed correction is still absent from the reviewed transition even though its route is selected and active Q/R/P is empty.

### Scope-log handoff

Because logging is active and this review added material meaning, the next correction package must append a `REVIEW DIFF` record for F1/IDEA-RD-1 and then an `APPLIED` record for the correction it makes true. Older records are not rewritten.

---

## Case B — Follow-up correction transition contains the selected correction

### Checked Scope / Owners

- follow-up correction ReviewDiff;
- same current reusable scope/log workflow and affected owners.

### Confirmed Findings

No material correctness or ownership defect identified. The selected stable-ID/minimum-shape correction is present and integrated.

### Current Conclusions / Current Plan

```text
Current Plan
= reviewed correction transition as shown

No additional corrective route is selected.
```

### Planning Concerns / Q/R/P

No material unresolved issues identified.

### ReviewDiff Verdict

**APPROVABLE**

This is a semantic review conclusion only; it does not execute Finalize, commit or push.

### Scope-log handoff

The approval adds no new material meaning, so it does **not** create an approval-only action-log entry and does not require a closing package merely to record the verdict.

## Why this example is valid

It demonstrates three boundaries from the owner workflow:

1. a confirmed defect with a clearly selected correction belongs in Confirmed Findings + Current Plan, not active Q/R/P; material retained Decision/Concern trace is separate;
2. `NEEDS CORRECTION` can coexist with `No material unresolved issues identified.` when the correction is selected but still unapplied;
3. a later `APPROVABLE` with no new material meaning creates no log noise.
