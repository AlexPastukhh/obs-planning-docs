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

A physical Mini plan may contain several semantic sections in one file. When growth makes review/navigation expensive, split it into a Modular structure while preserving the same semantic owners/meaning. Structural split is not a new plan or automatic semantic redesign.

## 4. Useful-Result Integration: UCDS And SDS

Idea Review does not become the semantic owner of Use Cases, Scenarios, Domain rules or Slices.

Workspace/documentation planning uses the current Workspace owners through the proportional **UCDS** pattern:

```text
Use Case
→ Domain / Rules / semantic meaning
→ Vertical Slice / Realization
```

Application planning uses current Application owners through the proportional **SDS** pattern:

```text
Scenario
→ Domain / Rules when useful
→ Slice Strategy / Slices when useful
```

Mini/Modular/Full are representation/depth choices, not weaker semantic correctness. Full SDS is the rich detailed profile; Mini/Modular can also plan a bounded change/action rather than an entire application.

Several Ideas affecting one UC/Scenario converge into one integrated target. One cross-cutting Idea remains one Idea and is referenced from affected units with local impact only.

## 5. Directed Integration

A provisional whole-picture pass is allowed to reveal integration and later-layer implications, but selection/review should stabilize dependency direction upstream → downstream. Preserve later-step insight as Carry-Forward/provisional context; do not let downstream convenience normally define upstream meaning.

For Workspace planning, Step 1/2/3 remain depths inside the selected UC and use current Architecture Planning proportionally before exact files when architecture is material.

## 6. Presentation Order

The Current Plan must be semantically established before aggregate findings are derived even when the consuming command shows Q/R/P early.

For `собери идеи`, a material result normally projects:

```text
Source / Baseline
→ Key Points + Review Priority
→ short Current Plan Snapshot
→ Questions / Risks / Problems
→ compact Cross-Cutting Ideas when material
→ affected UC / Scenario planning in current UCDS/SDS representation
→ Execution Order / versions when selected and useful
→ cross-unit review when material
→ Current Overall Conclusions
→ Potential Simplifications / Better Routes
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

Every real Q/R/P unit states Current Plan, Finding and Relation / Impact On Current Plan. Add Related Idea(s), treatment/fallback/blocking only when useful. Resolved/accepted meaning leaves Q/R/P and candidate Better Routes.

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
- no parallel Goal Map/result ledger duplicates the current plan;
- Mini→Modular structural growth preserves semantic ownership;
- dependency direction is upstream→downstream and any backflow is an explicit evidence finding;
- execution order does not masquerade as semantic dependency;
- aggregate findings are real current-plan delta only;
- Key Points/Review Priority and built-in recheck were applied proportionally;
- final Current Overall Conclusions follow useful-result integration.
```

## 11. Scope-Log Handoff When Logging Is Active

The Idea review remains read-only. When scope logging is active, the material `собери идеи` result becomes provenance for the next approved mutation/package. Later material chat clarification remains `IDEA CLARIFICATION` provenance and must be included before the next `APPLIED` target-state record; non-material chat noise is not logged.
