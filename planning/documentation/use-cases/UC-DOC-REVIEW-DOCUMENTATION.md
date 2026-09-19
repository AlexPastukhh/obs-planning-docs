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
9. Check that extracted Process files are justified by size/reuse/independent lifecycle, are actually orchestration for one or more Use-Case Results, and do not duplicate shared term definitions. Component-local sequences belong to the appropriate Component Method, Operation, Guidance or Checkpoint role rather than being mislabeled as Process.
10. For reviewed or moved supporting artifacts, check **semantic role + primary consumer + natural semantic owner** before judging path/name. Flag materially ambiguous catch-all names such as `shared`, `helper`, generic `workflow`, incorrectly used `process`, or unqualified `method` when they obscure ownership that can be stated more precisely.
11. Check that consumer-qualified filenames/folders are used where needed to distinguish Lens/Target-Module/Unit/other supporting roles, without treating the filename as semantic authority.
12. Check that Templates contain shape rather than semantic rules.
13. Check that Examples demonstrate rather than own meaning.
14. Check that README remains structural navigation and Use-Case Registry remains functional navigation.
15. Check for competing semantic owners, stale routes, unnecessary file splits, and supporting files that no current Use Case needs.
16. Use mechanical link/path checks as supporting evidence only; they do not prove semantic correctness or useful Use-Case boundaries. For Markdown documentation, also check useful direct relative links, fragment validity, misleading links to stale/non-authoritative artifacts, and important bare path/ID references that force unnecessary manual search.
17. Treat ordinary Markdown links as navigation/addressability only; do not infer semantic ownership, synchronization or review-on-change authority from link existence. Prefer registry or Linked Notes/tracked relations only when their stronger behavior is independently justified.
18. Route each material finding to the real current owner and the appropriate current change/maintenance Use Case.
19. Use [`UC-DOC-PLAN-DOCUMENTATION-CHANGE`](UC-DOC-PLAN-DOCUMENTATION-CHANGE.md) when a material repair first needs semantic planning.

Shared review rules: [`../principles-and-terminology.md`](../principles-and-terminology.md)
