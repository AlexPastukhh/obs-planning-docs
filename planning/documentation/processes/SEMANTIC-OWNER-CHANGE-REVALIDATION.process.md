# SEMANTIC-OWNER-CHANGE-REVALIDATION — Revalidate Semantic Owner Change

Status: active reusable Documentation Process

Responsibility ID: `DOC.SEMANTIC-OWNER-CHANGE-REVALIDATION`

Purpose: revalidate tracked consumers and navigation after a canonical semantic responsibility changes, without turning consumer repetitions/projections into competing owners.

## Inputs

- changed canonical semantic owner;
- affected semantic responsibility/Responsibilities and their explicit stable anchors when present;
- current repository documentation/navigation state.

## Result

All known semantic dependents and relevant navigation/projection surfaces affected by the owner change have been reviewed proportionally, stale/broken owner references are surfaced, and unchanged dependents are explicitly reusable rather than mechanically rewritten.

## Process

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Semantic Owner`](../principles-and-terminology.md#doc-semantic-owner) — `DOC.SEMANTIC-OWNER`
> - `CONTEXTUALIZES` [`Semantic DRY Principle`](../principles-and-terminology.md#doc-semantic-dry) — `DOC.SEMANTIC-DRY`
> - `CONTEXTUALIZES` [`Responsibility Map`](../principles-and-terminology.md#doc-responsibility-map) — `DOC.RESPONSIBILITY-MAP`
> - `CONTEXTUALIZES` [`Explicit Stable Semantic Anchor`](../principles-and-terminology.md#doc-explicit-stable-semantic-anchor) — `DOC.EXPLICIT-STABLE-SEMANTIC-ANCHOR`
> - `CONTEXTUALIZES` [`Semantic Owner Dependency`](../principles-and-terminology.md#doc-semantic-owner-dependency) — `DOC.SEMANTIC-OWNER-DEPENDENCY`
> - `CONTEXTUALIZES` [`Responsibility / Anchor Audit Coverage`](../principles-and-terminology.md#doc-responsibility-anchor-audit-coverage) — `DOC.RESPONSIBILITY-ANCHOR-AUDIT-COVERAGE`


1. Identify which semantic responsibility/Responsibilities changed. Distinguish semantic meaning change from purely editorial/layout/path work.
2. Resolve the current canonical owner and any explicit stable semantic anchors for the affected responsibility. Preserve stable Responsibility IDs across physical moves when the meaning remains the same responsibility.
3. Find inbound references to each changed owner file and affected explicit anchor. Treat ordinary links as navigation evidence; do not infer semantic dependency merely from link existence.
4. Find tracked `Semantic Owner Dependency` consumers of the affected responsibility/owner and classify them by `RESTATES`, `CONTEXTUALIZES`, `EXTENDS`, `REPRESENTS`, or `MIGRATES`.
5. Revalidate each semantic dependent against the changed owner. Update only dependents whose local repetition/context/delta/projection/migration meaning actually changed. An unchanged dependent may be marked/reported `REUSED` by the calling review/change flow rather than rewritten.
6. Revalidate Responsibility Maps, Use-Case/other registries, README/navigation, command projections, templates, examples, scenarios, generated/helper projections and tests only where they route to or materially represent the changed responsibility. These are projections/consumers unless their own contract says otherwise.
7. Search proportionally for **untracked normative-looking duplicates** of the changed meaning, especially `MUST`/`REQUIRED` rules, qualification criteria, state vocabularies, exact identity/address grammars or copied schemas. Treat a discovered competing owner as an ownership finding, not as another copy to synchronize automatically.
8. Validate owner paths/fragments. When an affected semantic section has an explicit stable anchor, detect section-specific inbound links that still use its generated heading fragment and migrate those reviewed links to the explicit anchor unless a declared compatibility route is required. An explicit anchor with zero inbound references produces a warning: first audit misspelled, stale, broken or incorrectly routed links. Remove the anchor only when it is genuinely unused; retain compatibility anchors only with an explicit compatibility purpose.
9. Update responsibility/navigation routing when the canonical owner moved or the responsibility boundary changed. Do not duplicate the semantic contract in the routing map.
10. Report unresolved dependency/ownership ambiguity back to the calling Documentation Use Case rather than inventing authority inside this Process. When the caller is performing a dedicated scoped responsibility/anchor audit, provide enough scope/result information for the caller to update the audit coverage evidence; this Process does not mark zones closed by itself.

## Reuse Boundary

This Process is reusable from Documentation planning/review/maintenance Use Cases. It owns the owner-change **revalidation flow**, not the semantic responsibility being changed, the Responsibility Map body, or concrete Helper/command implementation.

Shared rules: [`Semantic Owner`](../principles-and-terminology.md#doc-semantic-owner), [`Semantic DRY Principle`](../principles-and-terminology.md#doc-semantic-dry), [`Responsibility Map`](../principles-and-terminology.md#doc-responsibility-map), [`Explicit Stable Semantic Anchor`](../principles-and-terminology.md#doc-explicit-stable-semantic-anchor), and [`Semantic Owner Dependency`](../principles-and-terminology.md#doc-semantic-owner-dependency).
