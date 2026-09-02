# UC-DOC-REVIEW-DOCUMENTATION — Review Repository Documentation

## Situation

The current repository documentation may contain stale routes, duplicate semantic authority, orphan methodology/supporting files, unclear Use-Case boundaries, misleading navigation, or inconsistent application of the current documentation contracts.

## Result

Material documentation findings are tied to their real semantic owners, verified and unverified areas are distinguished, and each required correction has a narrow current repair/change route without the review itself becoming new semantic authority.

## Process

1. Select the review scope. Do not broaden it merely to inspect every file.
2. Start from the applicable Use-Case Registry for functional coverage and README files for structural responsibility.
3. Check whether independently useful operational capabilities have current Use Cases.
4. Do not manufacture Use Cases for simple reading, obvious file placement, README responsibility mapping, or independent Theory.
5. For each reviewed Use Case, check that `Situation`, `Result`, and `Process` are sufficient and that the registry points to its canonical owner.
6. For reviewed operational methodology/supporting files, check that they are reachable from at least one current Use Case.
7. Treat README and independent Theory as deliberate reachability exceptions.
8. Check that Principles & Terminology remains term-centered and does not become a step-by-step Process owner.
9. Check that extracted Process files are justified by size/reuse/independent lifecycle and do not duplicate shared term definitions.
10. Check that Templates contain shape rather than semantic rules.
11. Check that Examples demonstrate rather than own meaning.
12. Check that README remains structural navigation and Use-Case Registry remains functional navigation.
13. Check for competing semantic owners, stale routes, unnecessary file splits, and supporting files that no current Use Case needs.
14. Use mechanical link/path checks as supporting evidence only; they do not prove semantic correctness or useful Use-Case boundaries.
15. Route each material finding to the real current owner and the appropriate current change/maintenance Use Case.
16. Use [`UC-DOC-PLAN-DOCUMENTATION-CHANGE`](UC-DOC-PLAN-DOCUMENTATION-CHANGE.md) when a material repair first needs semantic planning.

Shared review rules: [`../principles-and-terminology.md`](../principles-and-terminology.md)
