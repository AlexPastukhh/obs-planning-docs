# Idea Review Template

Status: active reusable output template
Doc version: v1.0.0-shared-idea-review
Scope: recommended Markdown representation for Standard Idea Review and optional Deep Idea Planning.

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

## Required Aggregate

```markdown
# Questions / Risks / Problems

### [IDEA-<ID>] — <finding title>
<material unresolved finding>
```

If none: `No material unresolved issues were identified in the current review.`

## Material Simplifications — When Found

```markdown
# Potential Simplifications / Better Routes

### [IDEA-<ID>, IDEA-<ID>] — <simplification>
<why>
```

## Practical Example

See [`examples/COLLECT-IDEAS-PRACTICAL-EXAMPLE.md`](examples/COLLECT-IDEAS-PRACTICAL-EXAMPLE.md) for a full demonstration. The example demonstrates the method; it does not override the canonical Idea owners.
