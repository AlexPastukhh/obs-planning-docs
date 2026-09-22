# Cross-Owner Consistency Review Process

Status: active reusable Core Process; former `UC-IDTSPE-REVIEW-CONSISTENCY` compatibility owner

This is no longer a standalone runtime Use Case. Its independently useful effect belongs inside [`UC-IDTSPE-REVALIDATE-CURRENT-WORK`](../use-cases/revalidate-current-work/UC-IDTSPE-REVALIDATE-CURRENT-WORK.md) and, when integration itself exposes plausible drift, [`UC-IDTSPE-INTEGRATE-CURRENT-WORK`](../use-cases/integrate-current-work/UC-IDTSPE-INTEGRATE-CURRENT-WORK.md).

## Purpose

Check only the owners/relations/projections plausibly affected by a material change and surface real semantic/projection drift for normal Finding Disposition/revalidation.

## Process

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `TWU.SUBJECT-REFERENCE`
> Owner: [Target Work Subject Reference Contract](../runtime/target-work/TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md#target-work-subject-reference)

1. Identify the changed/reopened smallest natural subject: Collection surface, Collection item, Unit Resolution Slot, Unit/Result owner, Decision, Source, relation, Target/cross-owner relation or representation fact. When the subject is inside Target Work, use `TWU.SUBJECT-REFERENCE` rather than a process-local address grammar.
2. Enumerate only direct/material consumers and dependent owners that can actually be affected.
3. Compare current meaning across those owners/projections.
4. Distinguish:
   - semantic contradiction;
   - stale projection/navigation;
   - missing revalidation;
   - harmless representational difference;
   - verified unaffected meaning.
5. Surface material issues as Finding Candidates; do not silently rewrite another owner.
6. Route lifecycle/ownership consequences through Core Finding Disposition.
7. Preserve unaffected accepted meaning.
8. Expand the review only when new evidence shows a broader dependency cone.

## Boundary

```text
consistency review
≠ Target family
≠ blanket repository audit
≠ Lens-owned lifecycle
≠ automatic reopen of every downstream owner
```

Mechanical path/link checks may support the review but never prove semantic consistency alone.
