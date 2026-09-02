# UC-REPO-REVIEW-DIFF — Review Repository ReviewDiff

## Situation

A ReviewDiff representing a proposed/applied repository transition is selected for semantic review.

## Result

The transition has a grounded semantic verdict — `APPROVABLE`, `NEEDS CORRECTION`, or `BLOCKED BY MATERIAL DECISION` — with material findings and the required correction direction when applicable.

## Process

1. Establish what transition the ReviewDiff actually represents and whether the diff is technically interpretable enough to review.
2. Resolve the affected current semantic owners and relevant accepted constraints.
3. Check necessity, correctness, consistency, ownership, navigation/integration consequences, and preservation of accepted meaning.
4. Distinguish mechanical/technical integrity findings from semantic findings.
5. Surface only material unresolved decisions as decisions; do not manufacture choices for deterministic corrections.
6. Return the verdict and concise correction plan when correction is required. Review does not itself mutate the repository.

## Related

- [`../documentation/review-diff-review-workflow.md`](../documentation/review-diff-review-workflow.md) — current extracted detailed ReviewDiff Process.
