# Idea Review And Planning Workflow

Status: active reusable cross-cutting workflow
Doc version: v1.1.0-current-plan-aggregate-contract
Scope: how to collect, review, deepen and integrate Ideas while preserving source meaning and surfacing only material findings that remain relevant relative to the current selected plan.

Canonical meanings: [`idea-planning-principles-and-terminology.md`](idea-planning-principles-and-terminology.md)

Recommended shape: [`IDEA-REVIEW-TEMPLATE.md`](IDEA-REVIEW-TEMPLATE.md)

Practical example: [`examples/COLLECT-IDEAS-PRACTICAL-EXAMPLE.md`](examples/COLLECT-IDEAS-PRACTICAL-EXAMPLE.md)

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

## 3. Collecting Ideas From Conversation Or Source

```text
selected source
→ preserve material context/provenance
→ extract coherent Ideas proportionally
→ preserve non-Idea facts/constraints/decisions/questions separately
→ group related Ideas when useful
→ Standard Idea Review for every Idea
→ Group Review when useful
→ Current Overall Conclusions / Current Selected Variants
→ establish Current Plan baseline for each affected scope
→ Questions / Risks / Problems for material unresolved/adverse delta only
→ Potential Simplifications / Better Routes for material unselected candidate changes only
```

One fragment may contribute to several Ideas and several fragments may contribute to one Idea.

## 4. Truth-Seeking Review

For Necessity / Better-Route, actively search for a real reason to omit, remove, reuse, simplify or choose another route. If a real reason exists, state it clearly; otherwise do not invent one.

Possible Idea Refinements are checked for every Idea but written only when a genuinely useful candidate exists.

## 5. Integration Loop

```text
local Idea / Variant
→ integrate selected meaning into real Workflow / Scenario / plan candidate
→ establish/update Current Plan
→ review whole candidate
→ revise local or wider meaning if necessary
→ remove resolved aggregate findings rather than preserving them as review history
```

## 6. Shared Aggregate-Finding Rule

Use the aggregate contract from `idea-planning-principles-and-terminology.md` in every consumer of this methodology.

For each real `Questions / Risks / Problems` unit:

```text
Current Plan:
  <actual selected/current baseline>

Finding:
  <unresolved question / residual risk / unresolved problem>

Relation / Impact On Current Plan:
  <why it still matters to that baseline>
```

Add `Related Idea(s)`, `Needed Resolution / Treatment`, `Fallback` and `Blocking` when applicable.

If no selected change exists yet, use the truthful baseline such as `no change selected yet; preserve current state` rather than inventing a plan.

A finding that has already been resolved/accepted is not an aggregate finding anymore.

## 7. Questions / Risks / Problems

Always include this aggregate section in collect/review Ideas outputs and File Update Plans. ReviewDiff uses the same unit semantics through its own workflow.

Every material Idea-derived aggregate finding identifies Related Idea ID(s). Keep detailed reasoning at the originating Idea.

Do not put these in the section:

```text
- confirmation that Variant A was selected;
- explanation that an already selected simplification is good;
- an ordinary current-plan boundary;
- a selected correction that already belongs to Current Conclusions / Update Steps;
- reasoning notes with no unresolved/adverse effect on Current Plan.
```

If empty: `No material unresolved issues identified.`

## 8. Potential Simplifications / Better Routes

When material, list only **unselected** simplifications/better routes that would change Current Plan.

Each unit states:

```text
Current Plan
Candidate Better Route
Change To Current Plan
Why Potentially Better
Status
```

Reference Related Idea IDs when applicable.

Once a better route is selected, move it into Current Conclusion / Current Plan and remove it from this section.

## 9. File Update Integration

```text
Idea
→ Idea Variants when material
→ Current Selected Variant
→ Current Conclusion
→ one Current File Update Plan
→ concrete Update Steps
```

Unresolved alternatives remain in `Questions / Risks / Problems`; they do not become alternate file-edit plans.

When the update is mechanical consequence of already selected meaning, skip manufactured Idea analysis.

## 10. ReviewDiff Integration

A ReviewDiff can contain confirmed defects whose correction is already clear. Such defects stay in `Confirmed Findings` / `Current Conclusions` and can require `NEEDS CORRECTION` even when aggregate Q/R/P is empty.

Use aggregate sections only for uncertainty/residual risk/unresolved problems or not-yet-selected better correction routes relative to the current review plan.

## 11. Checks Before Returning

```text
- Baseline Idea meaning is understandable.
- Mandatory checks were performed even when no finding is printed.
- No objection/refinement exists merely to satisfy the template.
- Current Conclusions / Current Selected Variants are established before aggregate delta is reported.
- Every aggregate unit states Current Plan and its relation/change to that plan.
- Aggregate sections contain no accepted/resolved confirmation items.
- Aggregate findings/simplifications reference Related Idea IDs when applicable.
- A selected simplification was removed from Potential Simplifications / Better Routes.
- A resolved Question/Problem was removed from Questions / Risks / Problems.
- A residual Risk states its remaining impact/treatment.
- Current Conclusion does not silently include unresolved refinements.
- Deep Planning surfaces appear only when useful.
- Source facts/constraints/decisions were not forced into Idea entities.
```

## 12. Scope-Log Handoff When Logging Is Active

The Idea review remains read-only. When the repository has active registered scope logs and the user has already started logging, the material `собери идеи` result becomes provenance for the next approved mutation/package affecting that scope.

Material ordinary messages after the review that change Idea meaning, Current Conclusion, constraints, resolved Q/R/P or selected implementation requirements are `IDEA CLARIFICATION` material and must be incorporated before the package's `APPLIED` target-state record. Do not require rerunning `собери идеи` merely to legitimize a material clarification, and do not log non-material chat noise.
