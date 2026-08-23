# Idea Review Template

Status: active reusable output template
Doc version: v1.3.0-shared-concern-model
Scope: recommended Markdown representation for Standard Idea Review, optional Deep Idea Planning and Idea relations to the shared Planning Concern/Decision model.

Shared Planning Concern semantics: [`planning-concerns-and-decisions-model.md`](planning-concerns-and-decisions-model.md)

Mandatory checks do not require empty fields to be printed.

## Standard Idea Review

```markdown
## IDEA-<ID> — <title>

**Source / Status:** <source/status>
**Problem / Need:** <need>
**Proposed Answer:** <idea>
**Relevance / Expected Effect:** <effect>

<!-- Print only when the required check finds material content. -->
**Necessity / Better-Route:** <finding>
**Possible Idea Refinement:** <finding>
**Local Consistency:** <finding>
**Integrated Consistency:** <finding>

**Current Conclusion:** <current meaning>
```

### Related Planning Concerns — When Applicable

Do not mirror a full Q/R/P body here merely because the Idea is related. Reference the one logical Concern/Concern Group and its primary detailed storage location:

```markdown
- `CG-<ID>` / `Q-<ID>` / `R-<ID>` / `P-<ID>` — <short title>; Stored At: `<path/section>`; Relation: <origin / candidate answer / affected by / other useful relation>.
```

If this Idea is itself the selected detailed storage owner for that concern/group, the full concern body may live here. Otherwise keep only the reference.

## Deep Planning Additions — When Useful

```markdown
### Constraints / Must Preserve
### Important Unknowns
### Idea Variants
#### Variant A — <name>
#### Variant B — <name>
**Current Selected Variant:** <variant/unresolved>
### Evidence / References / Tests
### Local Evaluation
### Integrated Evaluation
### Combination Evaluation
### Reconsider When
### Next Action
```

## Current Plan Snapshot — For Integrated Outputs

When the consuming route continues beyond local Idea review into useful-result planning, establish a short Current Plan baseline before deriving concern delta. Do **not** use final `Current Overall Conclusions` as a pre-integration baseline.

```markdown
# Current Plan Snapshot

- <selected/current baseline relevant to the integrated review>
- <affected useful-result owners / selected planning depth when material>
```

When no change/answer is selected for a scope, preserve the truthful no-change/current-state baseline rather than inventing a plan.

Top-level ordering belongs to the consuming route. For the current `собери идеи` command, use:

```text
Source / Baseline
→ Current Plan Snapshot
→ Active Planning Concerns / Q/R/P + Concern Groups when material
→ compact Cross-Cutting Ideas when material
→ affected UC / Scenario planning
→ cross-unit review when material
→ Current Overall Conclusions
→ Potential Simplifications / Better Routes
```

The component sections in this template are reusable shapes; their physical order here is not authority to override a command/workflow output contract.

## Active Planning Concerns / Q/R/P — Shared Shape

Use the shared Concern owner. A single concern may be represented as:

```markdown
### Q-<ID> — <title>

**Type:** Question / Risk / Problem
**Priority:** P0 / Critical | P1 / High | P2 / Normal | P3 / Low
**Concern Category:** <semantic / UX/product / domain/data / architecture / engineering/implementation / testing/verification / integration / operations / documentation/maintainability / contextual>
**Status:** <type-appropriate status>
**Owner / affected meaning:** <semantic owner>
**Current Plan:** <actual selected/current baseline>
**Origin / Provenance:** <when useful>
**Concern Group:** `CG-<ID>` <!-- when related -->
**Finding:** <material current question / risk / problem>
**Relation / Impact On Current Plan:** <why it matters>

**AI Comment:**
- Known / implied: <what current plan/evidence already establishes>
- Options / interpretation: <when useful>
- Technical/logical preference: <only when justified>
- User-owned unknown: <when applicable>
- Minimum useful user question: <only when the answer can change the decision>

**Recommendation:** <optional; only with sufficient grounds>
**Answer / Evidence:** <when applicable>
**Decision refs:** <only after selection/material>
**Residual state / treatment:** <when applicable>
**Stored At:** <when cross-file addressability matters>
```

A related cluster may instead be headed by one Concern Group with member references and one shared resolution surface/AI Comment while each member retains its own Type/Priority/Category/Status.

If there are no active concerns: `No material unresolved issues identified.`

Resolved trivial items leave active Q/R/P. Material answer/rationale/Decision trace may remain through the shared retention rules, and residual Risk/Problem remains active.

## Current Overall Conclusions — Final Integrated Summary

After useful-result integration and whole-plan review, summarize the selected integrated meaning. This is a final review projection, not the early baseline used to define concerns.

```markdown
# Current Overall Conclusions

- <selected integrated meaning>
```

For an Idea-review-only route with no wider UC/Scenario integration, summarize the resulting selected Idea meaning here after concern review.

## Material Simplifications — When Found

```markdown
# Potential Simplifications / Better Routes

### [S-<ID>] — <candidate better route>

**Related Idea(s):** `IDEA-<ID>` <!-- when applicable -->
**Current Plan:** <actual selected/current baseline>
**Candidate Better Route:** <not-yet-selected alternative>
**Change To Current Plan:** <what would change if accepted>
**Why Potentially Better:** <reason>
**Tradeoff / Evidence:** <when material>
**Status:** candidate / unresolved / needs decision
```

This section contains only unselected candidate changes to Current Plan. Once accepted, integrate the route into Current Conclusions and record a material Decision trace when useful.

## Practical Example

See [`examples/COLLECT-IDEAS-PRACTICAL-EXAMPLE.md`](examples/COLLECT-IDEAS-PRACTICAL-EXAMPLE.md) for a demonstration. The example demonstrates the method; it does not override canonical owners. If an old example still shows the former full Idea/QRP mirror, the shared Concern owner wins and the example must be corrected separately.
