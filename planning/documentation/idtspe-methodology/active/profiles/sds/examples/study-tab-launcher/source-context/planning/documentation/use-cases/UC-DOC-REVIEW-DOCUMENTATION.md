<a id="uc-doc-review-documentation"></a>
# UC-DOC-REVIEW-DOCUMENTATION — Review Repository Documentation

## Situation

The current repository documentation may contain stale routes, duplicate semantic authority, orphan methodology/supporting files, unclear Use-Case boundaries, misleading navigation, or inconsistent application of the current documentation contracts.

## Result

Material documentation findings are tied to their real semantic owners, verified and unverified areas are distinguished, and each material Finding has a linked Proposal that makes its current correction/change/revalidation route explicit without the review itself becoming new semantic authority. Proposal persistence is separate and remains proportional.

### Audit-style Review

A documentation **audit** is this same Review performed with an explicitly declared bounded scope and coverage claim. It uses the same review basis, findings, owner routing, Finding Disposition and repair/change routes; it is not a separate methodology lifecycle or semantic authority. Audit-specific reports/evidence may be retained when useful for the reviewed invocation, but no permanent audit-coverage ledger is required or maintained as methodology state.

## Process

1. Select the review scope. Do not broaden it merely to inspect every file.
2. Consume/reaffirm the current applicable Use-Case composition from [`UC-DOC-RESOLVE-CURRENT-USE-CASES`](UC-DOC-RESOLVE-CURRENT-USE-CASES.md), then use README files for structural responsibility and the selected scoped registries only as routing evidence. Do not make this review Use Case a second applicability resolver.
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

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Semantic Owner`](../principles-and-terminology.md#doc-semantic-owner) — `DOC.SEMANTIC-OWNER`
> - `CONTEXTUALIZES` [`Semantic DRY Principle`](../principles-and-terminology.md#doc-semantic-dry) — `DOC.SEMANTIC-DRY`
> - `CONTEXTUALIZES` [`Responsibility Map`](../principles-and-terminology.md#doc-responsibility-map) — `DOC.RESPONSIBILITY-MAP`
> - `CONTEXTUALIZES` [`Explicit Stable Semantic Anchor`](../principles-and-terminology.md#doc-explicit-stable-semantic-anchor) — `DOC.EXPLICIT-STABLE-SEMANTIC-ANCHOR`
> - `CONTEXTUALIZES` [`Semantic Owner Dependency`](../principles-and-terminology.md#doc-semantic-owner-dependency) — `DOC.SEMANTIC-OWNER-DEPENDENCY`
> - `CONTEXTUALIZES` [`Markdown Link Navigation Rule`](../principles-and-terminology.md#doc-markdown-link-navigation) — `DOC.MARKDOWN-LINK-NAVIGATION`
> - `CONTEXTUALIZES` [`Finding Disposition`](../../../../project/planning/documentation/idtspe-methodology/active/idtspe-core/resolution/findings/FINDING-DISPOSITION.md#resolution-finding-disposition) — `RESOLUTION.FINDING-DISPOSITION`
> - `CONTEXTUALIZES` [`Proposal / Decision Lifecycle`](../../../../project/planning/documentation/idtspe-methodology/active/idtspe-core/resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`

15. Check for competing semantic owners, stale routes, unnecessary file splits, and supporting files that no current Use Case needs. Apply the Semantic DRY test: one normative responsibility has one canonical owner; a synchronized-looking duplicate is still a defect when it can independently drift.
16. For normative-looking meaning in a non-owner, check whether it is legitimately local. Material quotation/restatement/clarification/contextualization/extension/representation/migration is allowed for local comprehension, but it must carry a tracked `Semantic Owner Dependency` with a direct canonical-owner link; when it targets one semantic section, use that section's stable explicit anchor. The dependent passage may own only its local delta/consequence, not the repeated base meaning. Untracked independent normative copies are ownership findings.
17. Check Responsibility Maps proportionally: they should route responsibility → one canonical owner, may route hierarchically only when useful, and must not copy the semantic contract body. Also challenge map entries or surrounding prose that silently become second owners of routed meaning. Use [`UC-DOC-MAINTAIN-RESPONSIBILITY-MAP`](UC-DOC-MAINTAIN-RESPONSIBILITY-MAP.md) for material map repair.
18. Use mechanical link/path checks as supporting evidence only; they do not prove semantic correctness or useful Use-Case boundaries. For Markdown documentation, also check useful direct relative links, fragment validity, misleading links to stale/non-authoritative artifacts, and important bare path/ID references that force unnecessary manual search.
19. Treat ordinary Markdown links as navigation/addressability only; do not infer semantic ownership, synchronization or review-on-change authority from link existence. For explicit stable semantic anchors, check inbound references: zero inbound refs are a warning that requires a broken/misspelled/stale-reference audit before removing the anchor. When a reviewed semantic section already has an explicit stable anchor, flag section-specific inbound links that still rely on its generated heading fragment and migrate them to the explicit anchor unless a declared compatibility reason requires the old route.
20. When a reviewed semantic owner changed, use [`SEMANTIC-OWNER-CHANGE-REVALIDATION`](../processes/SEMANTIC-OWNER-CHANGE-REVALIDATION.process.md) to review tracked dependents and affected projections.
21. Route each material Finding through canonical Finding Disposition to the real current owner and the appropriate current change/maintenance Use Case.
22. For every material Finding, form or refine a linked IDTSPE Proposal that records the current candidate correction/result/realization route. `RE-0` may use a deterministic-correction Proposal; `RE-3` uses a non-selectable revalidation-gated Proposal until upstream revalidation completes; `RE-2`/`RE-4` use the formal semantic-change Proposal required before selection. Do not require a dedicated file merely because the Proposal exists.
23. Use [`UC-DOC-PLAN-DOCUMENTATION-CHANGE`](UC-DOC-PLAN-DOCUMENTATION-CHANGE.md) when a material repair first needs semantic planning.

Shared review rules: [`../principles-and-terminology.md`](../principles-and-terminology.md)
