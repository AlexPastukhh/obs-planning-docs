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

## 5. Finding Propagation And User Intervention

Material local findings propagate only as far as needed:

```text
changed line/file finding
→ affected owner / Use Case / Scenario
→ Questions / Risks / Problems when unresolved
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
→ unresolved alternatives remain explicit in Questions / Risks / Problems
```

## 6. Required Review Output

For a non-trivial ReviewDiff review, produce a compact reviewable structure:

```text
Checked Scope / Owners
Confirmed Findings
Corrective Ideas / Idea Variants when material
Current Conclusions
Questions / Risks / Problems
Potential Simplifications / Better Routes when material
ReviewDiff Verdict
```

Material Idea-derived findings reference their Idea IDs. If no material unresolved issues exist, say:

`No material unresolved issues identified.`

Allowed whole-diff verdicts:

```text
APPROVABLE
NEEDS CORRECTION
BLOCKED BY MATERIAL DECISION
```

`APPROVABLE` is a semantic review conclusion only. It does not execute or authorize Replacement Package App Finalize, Git staging, commit or push; those remain explicit user/application actions under their own permissions.

## 7. Boundaries

- Do not treat successful Apply, fingerprint equality or a persisted currentReview as semantic approval.
- Do not require an AI approval flag in application state merely to use this methodology.
- Do not create a parallel ReviewDiff-specific Idea ontology.
- Do not rewrite historical provenance just to remove old wording.
- Do not silently promote implementation details into accepted architecture.
- Do not approve a diff while a material unresolved correctness/ownership issue remains hidden.
