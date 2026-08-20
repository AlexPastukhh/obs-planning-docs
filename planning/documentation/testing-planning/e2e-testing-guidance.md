# E2E Testing Guidance

Status: active reusable supporting guidance

E2E proves selected **critical cross-layer actor paths**, not every branch already owned by API/component tests.

## Worthwhile E2E Signals

Use E2E when the result materially depends on several of:

```text
real browser / user entry
client routing/navigation
real HTTP/API wiring
auth/session/role behavior
server/application behavior
persistence or durable state
reload/re-navigation visibility
critical stale/access/failure path
```

## Boundary

Do not use E2E to exhaustively prove field-validation matrices, detailed ARIA mapping, every server validation branch, or component variants. Those usually belong to cheaper focused layers.

## Locators / Interaction

Prefer user-facing semantics:

- roles/names for buttons, links, headings, dialogs, alerts/navigation;
- labels for controls;
- visible text when role/label is not appropriate;
- test IDs only when no stable semantic locator exists.

Avoid CSS classes, DOM shape, nth-child and other internal selectors unless the structure itself is the selected contract.

## Data / Environment

Use unique/reproducible data. Tests must not depend on prior runs or execution order. Explicitly select/reset the test environment and prevent accidental use of developer/production data. Shared mutable environments require concurrency rules.

## Precondition Setup

A precondition may be created through API/fixture setup to keep the E2E path focused. The behavior being proved must still be exercised through the real user boundary.

## Communication / Final Outcome

When useful, observe the specific relevant server communication rather than broad arbitrary waits. Always assert the final actor-visible outcome; for durable behavior also prove it remains visible after the relevant reload/navigation/read path.
