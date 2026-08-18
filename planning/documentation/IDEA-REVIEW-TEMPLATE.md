# Idea Review Template

Status: active reusable output template
Doc version: v1.1.0-current-plan-aggregate-contract
Scope: recommended Markdown representation for Standard Idea Review, optional Deep Idea Planning and aggregate findings relative to Current Plan.

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

## Current Overall Conclusions

Establish the selected/current baseline before printing aggregate delta.

```markdown
# Current Overall Conclusions

- <selected/current meaning>
```

When no change/answer is selected for a scope, preserve that truth explicitly rather than inventing a plan.

## Required Aggregate

```markdown
# Questions / Risks / Problems

### [Q-<ID>] — <finding title>

**Related Idea(s):** `IDEA-<ID>` <!-- when applicable -->
**Current Plan:** <actual selected/current baseline>
**Finding:** <material unresolved question / residual risk / unresolved problem>
**Relation / Impact On Current Plan:** <why it still matters>
**Needed Resolution / Treatment:** <when applicable>
**Fallback:** <only when real>
**Fallback Relation:** fallback only; not Current Plan
**Blocking:** <yes / no, when useful>
```

Omit meaningless optional fields. `Current Plan`, `Finding`, and `Relation / Impact On Current Plan` are required for every real unit.

If none: `No material unresolved issues identified.`

Do not place accepted/resolved conclusions in this section.

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

This section contains only unselected candidate changes to Current Plan. Once accepted, integrate the route into Current Conclusions and remove the candidate from this section.

## Practical Example

See [`examples/COLLECT-IDEAS-PRACTICAL-EXAMPLE.md`](examples/COLLECT-IDEAS-PRACTICAL-EXAMPLE.md) for a full demonstration. The example demonstrates the method; it does not override the canonical Idea owners.
