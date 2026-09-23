# UC-DOC-MAINTAIN-RESPONSIBILITY-MAP — Maintain Responsibility Map

## Situation

Semantic responsibilities/owners were added, moved, split, merged or clarified; a scope has enough sibling/cross-area owners that ownership is hard to infer; or an existing Responsibility Map may be stale, ambiguous or duplicating owned meaning.

## Result

The smallest useful current Responsibility Map routes each material responsibility in its declared scope to one canonical semantic owner, exposes useful ownership boundaries/child-map routes, and does not duplicate the semantic contracts it routes to.

## Process

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Responsibility Map`](../principles-and-terminology.md#doc-responsibility-map) — `DOC.RESPONSIBILITY-MAP`
> - `CONTEXTUALIZES` [`Semantic DRY Principle`](../principles-and-terminology.md#doc-semantic-dry) — `DOC.SEMANTIC-DRY`
> - `CONTEXTUALIZES` [`Semantic Owner`](../principles-and-terminology.md#doc-semantic-owner) — `DOC.SEMANTIC-OWNER`


1. Define the map scope and the ownership/navigation problem it needs to solve. Do not create a map merely because a folder exists.
2. Inventory the material semantic responsibilities in that scope and resolve the canonical owner of each through the current methodology/navigation.
3. Record responsibility → canonical owner routing and only the boundary distinction needed to disambiguate neighboring responsibilities. Do not copy the owner's contract body.
4. When a child area contains several sibling owners, route to a narrower child Responsibility Map only when that hierarchy materially simplifies navigation. Do not require a map at every folder level.
5. Check that one responsibility does not route to competing canonical owners. Supporting/projection owners may be shown only when their non-owner role is clear.
6. When owner location/boundary changed, use [`SEMANTIC-OWNER-CHANGE-REVALIDATION`](../processes/SEMANTIC-OWNER-CHANGE-REVALIDATION.process.md) proportionally for affected inbound/dependent routes.
7. Check parity with README structural navigation and functional Use-Case registries where they touch the same owners; preserve the distinction between structural, functional and cross-cutting semantic routing.
8. Remove stale map entries and collapse unnecessary map layers when direct routing is clearer.

Shared meaning: [`Responsibility Map`](../principles-and-terminology.md#doc-responsibility-map), [`Semantic DRY Principle`](../principles-and-terminology.md#doc-semantic-dry), and [`Semantic Owner`](../principles-and-terminology.md#doc-semantic-owner).
