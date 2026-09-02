# UC-DOC-MAINTAIN-USE-CASE-REGISTRY — Maintain Use-Case Registry

## Situation

Use-Case identity, location, current/legacy status, or coverage changed, or readers cannot reliably discover the current functional capability landscape.

## Result

The registry for the selected scope lists every current Use Case and its canonical owner, with navigation-only grouping and without duplicating Use-Case bodies.

## Process

1. Determine the registry scope.
2. Include one row for every current Use Case in that scope.
3. Use the minimal row contract:
   - `ID`
   - `Use Case`
   - `Owner`
4. Use group headings only for navigation/readability.
5. Do not use Direction/group identities as additional semantic capability owners.
6. Do not duplicate Situation, Result, Process, permissions, or detailed methodology bodies in registry rows.
7. At repository root, expose the complete current landscape; during staged migration, make compatibility/legacy gaps explicit rather than silently dropping them.
8. Update rows when UC identity/location/status changes.
9. Keep legacy registries as provenance when migration requires exact previous contracts.

Shared meaning: [`../principles-and-terminology.md`](../principles-and-terminology.md)
