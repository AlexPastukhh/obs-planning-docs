# Idea Planning Principles And Terminology

Status: active reusable cross-cutting methodology owner
Doc version: v1.2.0-useful-result-integration
Scope: canonical reusable meanings and stable invariants for Idea review and deeper Idea planning across conversation review, solution/workflow planning, application planning, file-update planning and ReviewDiff semantic review. Generic Planning Concern/Q/R/P/Concern-Group/Decision lifecycle is owned separately by `planning-concerns-and-decisions-model.md`.

## 1. Purpose And Authority

An `Idea` is one possible answer to a Problem, Question, Need or other material answer-seeking concern.

This file owns shared Idea meanings. Repeated behavior is owned by [`idea-review-and-planning-workflow.md`](idea-review-and-planning-workflow.md); recommended shape by [`IDEA-REVIEW-TEMPLATE.md`](IDEA-REVIEW-TEMPLATE.md). Shared Planning Concern/Q/R/P/Concern Group/Decision trace semantics are owned by [`planning-concerns-and-decisions-model.md`](planning-concerns-and-decisions-model.md).

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

## 9.1 Impact On Useful Results

When an Idea is selected/material enough to imply a Workspace/Application change, review its impact on useful-result owners rather than jumping directly to files.

```text
Idea
→ affected existing Workspace UC(s)
→ candidate new Workspace UC only when normal independent-usefulness rules justify it
→ affected Application Scenario(s) when actor-visible behavior changes
```

Invariants:

```text
Idea ≠ automatically Use Case
Idea ≠ automatically Scenario

several Ideas
→ may converge into one integrated Target UC / Scenario

one Idea affecting several UCs/Scenarios
→ remains one Idea
→ downstream planning records each local impact
```

This is impact routing/integration, not a new Idea entity type. A cross-cutting Idea is reviewed once and referenced from affected useful-result plans rather than copied in full into each one.

## 10. Idea Groups

An `Idea Group` is lightweight navigation/integration grouping for related Ideas. It may contain Ideas, Group Review and Group Conclusion. It is not automatically a new canonical semantic owner.

## 11. Idea ↔ Planning Concern Relation

Idea review may expose or address material Planning Concerns, but Idea methodology does not own generic Q/R/P lifecycle. Use [`planning-concerns-and-decisions-model.md`](planning-concerns-and-decisions-model.md).

```text
Idea-local finding
→ Current Conclusion / Current Selected Variant when resolved
→ Planning Concern / Concern Group only while materially active/residual
→ retained Concern/Decision trace when material after closure
→ Potential Simplifications / Better Routes only while a better route remains unselected
→ Whole Review when broader
```

An Idea may be provenance for a Concern, one candidate answer to it, or be addressed/affected by a Decision. `Related Idea` is therefore an optional relation, not Q/R/P ownership.

### One Detailed Concern Storage Location

Do not maintain a full same-ID Q/R/P mirror inside an Idea merely for discoverability.

```text
one logical Concern / Concern Group
→ one primary detailed storage location selected by current context/profile/workflow

Related Idea
→ reference Concern/Group ID + location

If that Idea itself is the selected concern storage owner
→ full concern body may live there
```

When several Ideas relate to one concern/group, every affected Idea may reference the same ID/location without copying the full body. Resolution updates the canonical Concern/Group/Area Register once rather than synchronizing duplicate mirrors.

Idea-specific reasoning remains local. Concern Priority, Concern Category, Status, AI Comment, Recommendation, Decision relation, residual state and retention follow the shared Concern owner.

## 12. Current Plan Baseline

`Current Plan` is an output label for the currently selected baseline in the finding's scope. It is not a new semantic entity or repository artifact.

Depending on the use case it may mean:

```text
collect/review Ideas
  → current selected conclusion/variant for the relevant scope, plus the current integrated affected-UC/Scenario target when the selected command/workflow has continued into useful-result planning;

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

## 13. Questions / Risks / Problems In Idea Outputs

For outputs that collect/review Ideas and for File Update Plans, keep a visible current concern surface when material, but consume the shared [`planning-concerns-and-decisions-model.md`](planning-concerns-and-decisions-model.md) rather than maintaining an Idea-owned aggregate ontology.

The active projection remains delta to Current Plan. It may contain single concerns or Concern Groups and should make Priority / Concern Category / Status visible when material. AI Comment is normally useful for material AI-produced concerns, while Recommendation remains optional and Decision exists only after actual selection.

Resolved trivial items leave active Q/R/P. Material answers/rationale/Decision relations may remain in retained trace, and residual Risks/Problems remain active according to the shared lifecycle.

Physical placement is contextual: an Area Concern Register may be a section in the same plan or a separate area-root file; detailed concerns live once next to the appropriate owner and Ideas reference them when needed.

If there is no material active concern, `No material unresolved issues identified.` remains a valid compact active-projection statement.

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
- Do not leave an accepted alternative in active Planning Concerns / Q/R/P or Potential Simplifications / Better Routes; retain only material trace/residual state under the shared Concern owner.
- Do not call a fallback the Current Plan unless it was actually selected.
- Do not duplicate full Concern/Q/R/P bodies between Idea and aggregate/owner files; use one detailed storage location plus Concern/Group references and the Area Concern Register when material.
```

## Owner Attachment And Q/R/P Admission Gate

A candidate Question/Risk/Problem becomes an active finding only after attachment to real planned meaning:

```text
candidate concern
→ concrete UC / Scenario / semantic owner?
→ concrete Current/Target meaning?
→ material unresolved/adverse delta after cheap resolution against current principles/evidence?
```

If no owner can be named, keep the content as Idea/observation/evidence/context/note. If current selected principles already determine the answer, integrate the consequence and do not manufacture a FIND.

Every current UC/Scenario needs real provenance (Need, existing useful capability, Idea or evidence), but not a synthetic one-to-one Idea record.
