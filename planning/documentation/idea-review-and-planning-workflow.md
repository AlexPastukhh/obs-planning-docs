# Idea Review And Planning Workflow

Status: active reusable cross-cutting workflow
Doc version: v1.4.0-accumulating-current-plan
Scope: collect, review, deepen and integrate Ideas while preserving source meaning and updating one current selected plan rather than accumulating a transcript of planning outputs.

Canonical meanings: [`idea-planning-principles-and-terminology.md`](idea-planning-principles-and-terminology.md)
Recommended shape: [`IDEA-REVIEW-TEMPLATE.md`](IDEA-REVIEW-TEMPLATE.md)
AI reviewability: [`ai-reviewability-and-directed-planning-principles.md`](ai-reviewability-and-directed-planning-principles.md)

## 1. Standard Idea Review

For every Idea:

```text
1. Preserve Source / Status.
2. State Problem / Need.
3. State Proposed Answer.
4. State Relevance / Expected Effect.
5. Perform Necessity / Better-Route Check.
6. Perform Possible Idea Refinements check.
7. Perform Local Consistency check.
8. Perform Integrated Consistency check.
9. Record Current Conclusion.
10. Propagate only material findings that remain unresolved/adverse after the current conclusion is established.
```

Checks 5–8 are mandatory. Their output is conditional.

## 2. Deep Idea Planning

Starts from Standard Review and expands only useful surfaces: clarify Need/Prompt, constraints/unknowns, generate/discover Idea Variants, evaluate risks/assumptions/dependencies, use evidence/tests, perform Local/Integrated/Combination evaluation, explore refinements, select Current Selected Variant and record reconsideration/next action.

Do not force deliberate Variant generation during ordinary review when no material alternative is visible or needed.

## 3. Collecting Ideas Into A Current Plan

```text
selected source
+ selected current integrated plan when one clearly exists
→ preserve material context/provenance
→ extract coherent Ideas proportionally
→ preserve non-Idea facts/constraints/decisions/questions separately
→ Standard Idea Review
→ integrate selected meaning into affected current useful-result owners
→ update one coherent Current Plan
→ derive Q/R/P as unresolved/adverse delta
→ whole-plan review
→ Current Overall Conclusions
→ unselected Potential Simplifications / Better Routes only
```

Do not create an append-only `собери идеи` result ledger. A later invocation should normally revise/expand the same current plan when that plan is clearly selected.

For Application planning, Mini is one accumulating application-plan file. When growth makes review/navigation expensive, Modular/Medium splits the same reviewed meaning into a small growing file set; Full increases stable addressability. Structural change is never permission to drop Scenario DATA, Behavior Items or other selected meaning.

## 4. Useful-Result Integration: UCDS And SDS

Idea Review does not become the semantic owner of Use Cases, Scenarios, Domain rules or Slices.

Workspace/documentation planning uses the current Workspace owners through the proportional **UCDS** pattern:

```text
Use Case
→ Domain / Rules / semantic meaning
→ Vertical Slice / Realization
```

Application planning uses the same-quality **SDS** Step 0–4 pattern:

```text
STEP 0 — Real-Life Need / Current Reality / solution alternatives
→ Application Concept / Responsibility / Prototype when useful

STEP 1 — Application Scenario
+ Scenario DATA + Behavior Items
+ Requirements / Screens when material

STEP 2 — Domain Draft / Rules when material

STEP 3 — Slice Strategy / Slices
+ contextual WEUC instances / likelihood / Workspace Change Paths
+ Change Pressure / Architecture Decisions when material

STEP 4 — implementation / practical testing / ReviewDiff / actual evidence
```

Mini/Modular/Full change physical organization/addressability only. They do not weaken semantic correctness; reviewed Scenario DATA/Behavior and other selected meaning survive profile changes.

Several Ideas affecting one UC/Scenario converge into one integrated target. One cross-cutting Idea remains one Idea and is referenced from affected units with local impact only.

## 5. Directed Integration

A provisional whole-picture pass is allowed to reveal integration and later-layer implications, but selection/review should stabilize dependency direction upstream → downstream. Preserve later-step insight as Carry-Forward/provisional context; do not let downstream convenience normally define upstream meaning.

For Workspace planning, Step 1/2/3 remain depths inside the selected UC and use current Architecture Planning proportionally before exact files when architecture is material. For Application SDS Step 3, concrete target code/workspace realization should use `UC-PLAN-ARCH-DISCOVER-WEUC` when future-change pressure is material, so architecture decisions are driven by contextual instances/change paths rather than generic flexibility.

## 6. Presentation Order

Planning presentation follows semantic ownership, not a FIND-first queue.

For `собери идеи`, a material result normally projects:

```text
Source / Baseline / Real-Life Basis
→ Key Points + Review Priority
→ Related Ideas / provenance
→ affected Workspace UC / Application Scenario
→ Current → Target planning in UCDS or Application SDS Step 0–4
→ attached Questions / Risks / Problems only where unresolved/material
→ Review Order lens only when several attached deltas need ordering
→ Execution Order / versions when selected and useful
→ cross-unit review when material
→ Current Overall Conclusions
→ Potential Simplifications / Better Routes only while genuinely unselected
```

## 7. Execution Order Boundary

Execution order is a current route through already planned work, not a second semantic authority. It may be a section in Mini form or a separate file/projection in Modular form.

Represent genuine partial order:

```text
A
→ B || C
→ D after B+C
```

Application execution order may group selected Slices into versions/releases. Version grouping does not become a semantic layer between Scenario and Slice.

## 8. Shared Aggregate Findings

Use the aggregate contract from `idea-planning-principles-and-terminology.md`.

Every real Q/R/P unit states Origin/Provenance, affected semantic owner, Current/Target planned meaning, Finding and Relation/Impact. Add Related Idea(s), treatment/fallback/blocking only when useful. Resolved/accepted meaning leaves Q/R/P and candidate Better Routes.

Apply the shared same-Finding-ID discoverability rule between aggregate findings and affected Ideas.

If no material unresolved issue remains: `No material unresolved issues identified.`

## 9. File Update And ReviewDiff Integration

UC/Scenario planning may already establish an exact realization/file surface. An explicit ordered File Update Plan remains separate only when selected/useful.

After materialization, semantic ReviewDiff reviews the actual transition against selected current owners. A confirmed implementation defect does not require a new Idea unless a material answer-seeking correction/alternative exists.

## 10. Checks Before Returning

```text
- selected source and current-plan baseline are explicit;
- mandatory Idea checks were performed without manufactured objections;
- selected meaning is integrated into real useful-result owners;
- no second plan/result ledger duplicates the selected accumulating Current Plan;
- Mini→Modular structural growth preserves semantic ownership;
- dependency direction is upstream→downstream and any backflow is an explicit evidence finding;
- execution order does not masquerade as semantic dependency;
- aggregate findings are real current-plan delta only;
- Key Points/Review Priority and built-in recheck were applied proportionally;
- final Current Overall Conclusions follow useful-result integration.
```

## 11. Scope-Log Handoff When Logging Is Active

The Idea review remains read-only. When scope logging is active, the material `собери идеи` result becomes provenance for the next approved mutation/package. Later material chat clarification remains `IDEA CLARIFICATION` provenance and must be included before the next `APPLIED` target-state record; non-material chat noise is not logged.
