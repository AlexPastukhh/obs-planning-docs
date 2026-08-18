# Idea Planning Principles And Terminology

Status: active reusable cross-cutting methodology owner
Doc version: v1.1.0-current-plan-aggregate-contract
Scope: canonical reusable meanings and stable invariants for Idea review and deeper Idea planning across conversation review, solution/workflow planning, application planning, file-update planning and ReviewDiff semantic review.

## 1. Purpose And Authority

An `Idea` is one possible answer to a Problem, Question, Need or other material answer-seeking concern.

This file owns shared Idea meanings. Repeated behavior is owned by [`idea-review-and-planning-workflow.md`](idea-review-and-planning-workflow.md); recommended shape by [`IDEA-REVIEW-TEMPLATE.md`](IDEA-REVIEW-TEMPLATE.md).

Use one Idea concept at different scopes. Do not create `Scenario Idea`, `Workflow-Step Idea`, `File-Update Idea`, `Review Idea` or `Deep Idea` entity types merely because the surrounding owner differs.

## 2. Two Global Analysis Depths

### Standard Idea Review

Default lightweight depth. Preserve material source meaning and perform the mandatory checks.

### Deep Idea Planning

The same Idea at greater depth. It may add:

```text
Problem / Prompt clarification
Constraints / Must Preserve
Important Unknowns
Idea Variants
Strengths / Limitations
Risks / Assumptions / Dependencies
Evidence / References / Tests
Local Evaluation
Integrated Evaluation
Combination Evaluation
Refinement Options
Reconsider When
Current Conclusion
Next Action
```

These are planning surfaces, not a fixed checklist that must always be populated.

## 3. Baseline Idea Meaning

A reviewable Idea normally makes these meanings understandable:

```text
Source / Status
Problem / Need
Proposed Answer
Relevance / Expected Effect
Current Conclusion
```

## 4. Required Checks Vs Populated Fields

For every reviewed Idea perform:

```text
Necessity / Better-Route Check
Possible Idea Refinements
Local Consistency
Integrated Consistency
```

Invariant:

```text
required check ≠ required populated field
```

If a check finds no material supported finding, do not manufacture one merely to fill a section.

Failure to find a valid objection is acceptable. Fabricating one is not.

## 5. Necessity / Better-Route

Actively test whether the Idea deserves implementation or preservation:

```text
Can it be omitted?
Can the underlying problem be removed/avoided instead?
Does an existing solution/mechanism already cover the Need?
Is a smaller change sufficient?
Is there a simpler or materially better route?
Does another Idea make it redundant?
Is added complexity/cost disproportionate to value?
```

Do not defend an Idea merely because it was proposed. Do not invent objections merely to appear critical.

## 6. Idea Variant

An `Idea Variant` is one materially different possible answer/form for the same scoped concern.

```text
Idea
→ Idea Variants
→ evaluation
→ Current Selected Variant
```

Use `Current Selected Variant` for the current selected/best-supported form. Use `fallback` only when it is genuinely a fallback.

## 7. Possible Idea Refinement

A `Possible Idea Refinement` is a candidate improvement to the Idea itself without necessarily rejecting its core meaning.

It may simplify, narrow, strengthen, clarify, split/merge, move a boundary, remove an unnecessary part or make a risky part conditional.

A refinement is not automatically accepted. When plausible but unresolved, surface it as a question such as:

```text
Should we apply refinement X here,
or preserve the current Idea unchanged?
```

Do not translate an unresolved Idea refinement directly into a file edit or implementation action.

## 8. Evaluation Scales

```text
Local Evaluation
  → how well the Idea/Variant answers its scoped Need;
Integrated Evaluation
  → how good it becomes in the real surrounding plan/workflow;
Combination Evaluation
  → how multiple Ideas/Variants behave together.
```

Invariant:

```text
best local variant ≠ automatically best integrated whole solution
```

## 9. Scoped Ownership

Idea work belongs to the narrowest real owner where the question is meaningful. Shared questions stay parent-level; Variant/Version-specific questions stay local. A small question may remain inline.

Semantic ownership does not imply one folder/file per Idea.

## 10. Idea Groups

An `Idea Group` is lightweight navigation/integration grouping for related Ideas. It may contain Ideas, Group Review and Group Conclusion. It is not automatically a new canonical semantic owner.

## 11. Material Finding Propagation

```text
Idea-local finding
→ Group Review when group-relevant
→ Current Conclusion / Current Selected Variant when resolved
→ aggregate Questions / Risks / Problems only while materially unresolved/adverse
→ Potential Simplifications / Better Routes only while a better route remains unselected
→ Whole Review when broader
```

Promote only material findings. Detailed reasoning remains local; aggregate findings/simplifications reference Related Idea IDs when applicable.

## 12. Current Plan Baseline

`Current Plan` is an output label for the currently selected baseline in the finding's scope. It is not a new semantic entity or repository artifact.

Depending on the use case it may mean:

```text
collect/review Ideas
  → current selected conclusion/variant for the relevant scope;

File Update Plan
  → the one current selected file-update route represented by Current Conclusions and Update Steps;

ReviewDiff semantic review
  → the current reviewed transition plus any already selected corrective plan used as the review baseline.
```

If no change or answer has been selected yet, do not invent one. State the actual baseline, for example:

```text
Current Plan:
  no change selected yet; preserve current state
```

## 13. Aggregate Questions / Risks / Problems

For outputs that collect/review Ideas and for File Update Plans, `Questions / Risks / Problems` is mandatory as an aggregate section. ReviewDiff semantic review uses the same aggregate contract.

The section is **delta to Current Plan**, not a summary of completed reasoning.

Each material unit states at minimum:

```text
Current Plan
Finding
Relation / Impact On Current Plan
```

Add Related Idea IDs when the finding came from Idea review. Add Needed Resolution / Treatment, Fallback and Blocking only when meaningful.

Allowed content:

```text
Question
  → a material choice/evidence gap still unresolved relative to Current Plan;

Risk
  → a material residual risk that still exists under Current Plan;

Problem
  → a material unresolved defect/conflict that still affects Current Plan.
```

Do not use the section to confirm a route that is already selected, explain why an accepted decision was correct, or restate an ordinary boundary/Update Step.

Lifecycle:

```text
resolved Question
→ integrate answer into Current Conclusion / Current Plan
→ remove from aggregate section;

fixed/resolved Problem
→ integrate correction
→ remove from aggregate section;

Risk fully eliminated
→ remove;

Risk still materially residual
→ may remain, but must state its impact/treatment relative to Current Plan.
```

It may state `No material unresolved issues identified.` when genuinely empty. Do not invent content to avoid an empty result.

## 14. Potential Simplifications / Better Routes

This section is also **delta to Current Plan**.

A unit belongs here only when review finds a material **not-yet-selected** candidate that would change the Current Plan.

Each material unit states at minimum:

```text
Current Plan
Candidate Better Route
Change To Current Plan
Why Potentially Better
Status: candidate / unresolved / needs decision
```

Add Related Idea IDs when applicable and tradeoffs/evidence when material.

Lifecycle:

```text
candidate better route accepted
→ update Current Selected Variant / Current Conclusion / Current Plan
→ remove it from Potential Simplifications / Better Routes.
```

Do not list an already accepted simplification here. Do not use this section to praise or confirm the Current Plan.

## 15. Fallback Boundary

A fallback is not the Current Plan unless it is explicitly promoted/selected.

When a real fallback is useful inside an aggregate unit, state its relation explicitly:

```text
Fallback:
  <fallback route>

Fallback Relation:
  fallback only; not Current Plan
```

An unanswered question does not automatically create a fallback.

## 16. Source Meaning Is Not Automatically An Idea

A source may also contain Existing Reality/checked facts, Constraints, Decisions, Questions, Corrections and Provenance. Do not force every extracted meaning into an Idea.

## 17. Do Not

```text
- Do not manufacture objections, risks or refinements.
- Do not preserve an Idea merely because the user proposed it.
- Do not create a separate Idea type per planning use case.
- Do not create folder/file per Idea by default.
- Do not let an unresolved refinement silently enter Current Conclusion.
- Do not treat a local win as proof of whole-plan quality.
- Do not turn historical source records into Ideas mechanically.
- Do not use aggregate sections as a reasoning transcript or confirmation log.
- Do not leave an accepted alternative in Questions / Risks / Problems or Potential Simplifications / Better Routes.
- Do not call a fallback the Current Plan unless it was actually selected.
```
