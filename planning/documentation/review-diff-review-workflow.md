# ReviewDiff Semantic Review Workflow

Status: active reusable documentation-layer workflow
Scope: truth-seeking semantic review of a repository ReviewDiff after changes are applied or otherwise presented for review. This workflow does not own ReviewDiff transport, package integrity, application persistence, Git staging, Finalize or commit/push mechanics.

Use with:

```text
planning/documentation/idea-planning-principles-and-terminology.md
planning/documentation/idea-review-and-planning-workflow.md
planning/documentation/documentation-responsibility-map.md
selected current semantic/documentation/application owners affected by the diff
```

Practical example: [`examples/REVIEW-DIFF-PRACTICAL-EXAMPLE.md`](examples/REVIEW-DIFF-PRACTICAL-EXAMPLE.md)

## 1. Core Distinction

```text
ReviewDiff technical integrity
≠
ReviewDiff semantic correctness
```

A diff is evidence of a concrete repository transition. It is not semantic authority and does not prove that the selected change is correct, necessary, complete or well integrated.

## 2. Entry

Use this workflow when a ReviewDiff is pasted, attached, delivered by an application, or otherwise selected for semantic review.

Before concluding:

1. identify the repository/change scope represented by the diff;
2. resolve the applicable Direction / Use Case and current canonical owner(s);
3. distinguish checked source facts from inference;
4. inspect enough surrounding owner context to judge meaning, not only changed lines.

If the diff or required owners are incomplete, report the missing evidence instead of guessing.

## 3. Finding And Idea Boundary

Do not manufacture an Idea for every typo or mechanical defect.

```text
confirmed mechanical defect
→ factual finding
→ direct corrective recommendation when one route is clearly justified;

material answer-seeking uncertainty / alternative correction
→ ordinary Idea / Idea Variants
→ shared Standard Idea Review;

unresolved product / architecture / ownership choice
→ explicit user-decision candidate only when evidence cannot justify one route safely.
```

A confirmed problem is not itself automatically an Idea. A proposed semantic correction can be an Idea and is reviewed with the same methodology used by `собери идеи`.

## 4. Standard Review For Material Corrective Ideas

For each material corrective Idea, apply the shared checks proportionally:

```text
Source / Status
Problem / Need
Proposed Answer
Relevance / Expected Effect
Necessity / Better-Route
Possible Idea Refinements
Local Consistency
Integrated Consistency
Current Conclusion
```

`required check ≠ required populated field`. Do not invent risks, alternatives or refinements when none are material.

The review tests whether the correction deserves implementation; it does not defend a change merely because it already appears in the diff.

## 5. Current Review Plan And Finding Propagation

Establish `Current Conclusions` before aggregate delta.

For ReviewDiff output:

```text
Current Plan
= the reviewed repository transition
  plus the currently selected corrective route(s) from this review.
```

`Current Plan` is an output baseline, not an application approval state and not proof that selected corrections have already been applied.

A confirmed defect with one clearly selected correction belongs in `Confirmed Findings` + `Current Conclusions`. It does **not** stay in aggregate `Questions / Risks / Problems` merely because the correction has not yet been applied.

Material local findings propagate only as far as needed:

```text
changed line/file finding
→ affected owner / Use Case / Scenario
→ Current Conclusion / selected correction when resolved
→ Questions / Risks / Problems only when unresolved/adverse relative to Current Plan
→ whole-change conclusion when broader
```

Use these review conclusions when useful:

```text
Fix Recommended
No Change
Needs Evidence
Needs User Decision
```

Ask the user only when a material choice remains unresolved after owner/evidence review. A clearly justified mechanical correction should not be turned into a user question.

When alternatives are material:

```text
Idea Variants
→ Current Selected Variant when one route is justified/selected
→ selected route becomes Current Plan
→ only unresolved alternatives remain explicit in Questions / Risks / Problems
```

## 6. Aggregate Questions / Risks / Problems

Use the shared aggregate contract from the generic Idea methodology.

Every real unit states at minimum:

```text
Current Plan
Finding
Relation / Impact On Current Plan
```

Add Related Idea IDs when applicable. For Idea-related Q/R/P, also apply the shared bidirectional discoverability rule: one Related Idea gets the full same-ID Idea-local mirror; several Related Ideas get lightweight same-ID references inside every affected Idea while the aggregate keeps the one full cross-Idea body. Add Needed Resolution / Treatment, fallback and Blocking only when useful.

Examples of valid aggregate content:

```text
- evidence needed before a selected correction can be judged safe;
- a material user/product choice still unresolved;
- a residual risk that remains under the current correction plan;
- an unresolved conflict between current owners.
```

Not valid here:

```text
- confirmation that a selected correction is correct;
- a mechanical fix already selected into Current Conclusions;
- an ordinary ReviewDiff boundary;
- reasoning notes with no unresolved/adverse effect on Current Plan.
```

If empty: `No material unresolved issues identified.`

## 7. Potential Simplifications / Better Routes

Use this section only for a material **not-yet-selected** alternative that would change the Current Plan/correction route.

Each unit states:

```text
Current Plan
Candidate Better Route
Change To Current Plan
Why Potentially Better
Status
```

Reference Related Idea IDs when applicable. Once selected, move the route into Current Conclusions / Current Plan and remove it from this section.

## 7.1 Architecture Work-Cost Regression Check — When Material

For a material implementation diff, ask whether actual code materially changed an important Workspace Understanding/Change/Verify path or representative Application Runtime path. Do not run full architecture ceremony for every diff.

```text
material path changed?
  no → no architecture-cost finding required
  yes → compare expected vs actual:
         understanding / analytical cost
         mutation / evolution cost
         verification / diagnosis / operation cost
         runtime / Scenario cost when applicable
         Architectural Tax / reversibility

→ no concern
  | accepted explicit trade-off
  | architecture correction/review needed
```

Use the canonical Architecture Work-Cost Model and relevant `UC-PLAN-ARCH-*` owner when a real concern appears. A rename/file movement alone is not a regression; increased hidden context, duplicated semantic logic, broader synchronized edits, new verification/migration burden or materially worse runtime behavior can be.

## 8. Required Review Output

For a non-trivial ReviewDiff review, produce a compact reviewable structure:

```text
Checked Scope / Owners
Confirmed Findings
Corrective Ideas / Idea Variants when material
Current Conclusions / Current Plan
Questions / Risks / Problems
Potential Simplifications / Better Routes when material
ReviewDiff Verdict
```

Material Idea-derived aggregate findings reference their Idea IDs and remain discoverable from each affected Idea through the shared same-Finding-ID mirror/reference rule.

Allowed whole-diff verdicts:

```text
APPROVABLE
NEEDS CORRECTION
BLOCKED BY MATERIAL DECISION
```

Verdict rules:

```text
APPROVABLE
  → no material unapplied correctness correction remains
    and no material unresolved correctness/ownership issue remains;

NEEDS CORRECTION
  → a material confirmed correction is still absent from the reviewed transition,
    even when Questions / Risks / Problems is empty because the correction route is already selected;

BLOCKED BY MATERIAL DECISION
  → a material choice/evidence/authority gap prevents safe selection of the correction/current route.
```

`APPROVABLE` is a semantic review conclusion only. It does not execute or authorize Replacement Package App Finalize, Git staging, commit or push; those remain explicit user/application actions under their own permissions.

## 9. Boundaries

- Do not treat successful Apply, fingerprint equality or a persisted currentReview as semantic approval.
- Do not require an AI approval flag in application state merely to use this methodology.
- Do not create a parallel ReviewDiff-specific Idea ontology.
- Do not rewrite historical provenance just to remove old wording.
- Do not silently promote implementation details into accepted architecture.
- Do not approve a diff while a material unapplied correction or unresolved correctness/ownership issue remains hidden.
- Do not use aggregate sections as a log of selected corrections or completed reasoning.

## 10. Scope-Log Handoff When Logging Is Active

A ReviewDiff result changes a scope log only when it adds material semantic meaning such as a confirmed defect, selected correction, changed rationale/constraint or other material clarification.

The next correction replacement package uses the latest log bytes as exact base, appends the material ReviewDiff/correction meaning and an `APPLIED` record for what that package makes true. Do not rewrite older records as though later review knowledge existed earlier.

`APPROVABLE` with no new material meaning is not an action-log event and does not require a closing package solely for the verdict.
