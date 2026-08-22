# Idea Review Template

Status: active reusable output template
Doc version: v1.2.0-integrated-output-order
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

### Related Q/R/P — When Applicable

If a material Q/R/P relates to exactly this one Idea, mirror the full aggregate unit here with the **same Finding ID**:

```markdown
### [Q/R/P-<ID>] — <finding title>

**Type:** Question / Risk / Problem
**Current Plan:** <same selected/current baseline used by the aggregate finding>
**Finding:** <same logical unresolved/adverse finding>
**Relation / Impact On Current Plan:** <same material relation>
**Needed Resolution / Treatment:** <when applicable>
**Blocking:** <yes / no, when useful>
```

If the same finding relates to several Ideas, do not copy the full body into every Idea. Add a lightweight reference inside each affected Idea:

```markdown
- `[Q/R/P-<ID>]` — <short title>; Related Ideas: `IDEA-A`, `IDEA-B`; see the aggregate Q/R/P for the full Current-Plan-relative finding.
```

Use one stable Finding ID across aggregate and Idea-side representations. Remove/update both sides together when the finding resolves or its Related-Idea set changes.

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

When the consuming route continues beyond local Idea review into useful-result planning, establish a short Current Plan baseline before deriving aggregate delta. Do **not** use final `Current Overall Conclusions` as a pre-integration baseline.

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
→ Questions / Risks / Problems
→ compact Cross-Cutting Ideas when material
→ affected UC / Scenario planning
→ cross-unit review when material
→ Current Overall Conclusions
→ Potential Simplifications / Better Routes
```

The component sections in this template are reusable shapes; their physical order here is not authority to override a command/workflow output contract.

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

## Current Overall Conclusions — Final Integrated Summary

After useful-result integration and whole-plan review, summarize the selected integrated meaning. This is a final review projection, not the early baseline used to define Q/R/P.

```markdown
# Current Overall Conclusions

- <selected integrated meaning>
```

For an Idea-review-only route with no wider UC/Scenario integration, summarize the resulting selected Idea meaning here after aggregate review.

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

## Q/R/P Provenance / Owner Attachment

When a related Q/R/P is material, use:

```markdown
### <FIND/Q/R/P ID> — <title>
**Origin / Provenance:** ...
**Affected UC / Scenario / semantic owner:** ...
**Current Planned State / Target meaning:** ...
**Finding:** ...
**Relation / Impact:** ...
**Treatment / Needed Resolution:** ... # only when useful
```

No owner/current planned state → do not promote to active FIND. If the answer is already forced by current selected principles/evidence, integrate it instead of preserving a ceremonial Q/R/P.
