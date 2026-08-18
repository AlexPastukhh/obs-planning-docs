# AI Working Contract

Status: mandatory repository working contract
Scope: AI/chat sessions that plan, develop or materially change repository documentation or application meaning.

## Mandatory Rule

Before material work, resolve the applicable Direction / Use Case and follow its canonical owner route. Conversation memory, examples, generated projections, historical artifacts and implementation alone are not semantic authority.

## Documentation Work

Read and follow:

```text
planning/documentation/planning-docs-architecture-principles.md
planning/documentation/documentation-responsibility-map.md
planning/documentation/documentation-principles-read-workflow.md
planning/documentation/use-case-registry.md
```

Then resolve the narrowest applicable workflow/template/current owner.

## Planning / Application Work

Start from:

```text
planning/README.md
planning/direction-registry.md
relevant Use-Case Registry
```

For material answer-seeking uncertainty use the shared Idea methodology. For an application, detailed behavior belongs to Scenario owners reached from Application Use Cases.

## ReviewDiff Work

A technically valid or integrity-verified ReviewDiff is not automatically a semantically correct change.

When a ReviewDiff is supplied for review:

```text
planning/documentation/use-case-registry.md
→ UC-DOC-REVIEW-DIFF
→ planning/documentation/review-diff-review-workflow.md
→ affected current owners
→ shared Idea methodology for material corrective alternatives
```

Do not imply semantic approval or Finalize while material correctness/ownership issues remain unresolved.

## Application Development + Documentation

Implementation must follow current selected planning meaning. If implementation changes accepted behavior, architecture, interfaces or another documented responsibility, reconcile the actual semantic owner and follow documentation ownership rules. Code does not silently become a second documentation owner.

## No Silent Promotion

```text
Idea ≠ decision
implementation idea ≠ selected architecture
example ≠ authority
projection ≠ canonical state
historical record ≠ current ontology
```

## Authority

This contract routes to canonical owners. If it conflicts with a linked canonical principle/workflow owner, the canonical owner wins and this contract must be corrected.
