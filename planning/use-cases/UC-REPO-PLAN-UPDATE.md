# UC-REPO-PLAN-UPDATE — Plan Repository Update

## Situation

Selected semantic meaning needs a concrete repository/file transition before mutation, or an explicit Pre-Update is useful for reviewing what will change.

## Result

One concrete repository update plan exists with the affected current owners/paths, reviewable proposed file-operation entries (`add` / `change` / `replace` / `delete` / `move` as applicable), intended content/semantic delta and accepted basis or Finding/Proposal driver for each entry, material ordering/dependencies, preservation boundaries, and verification. An operation entry is plan content, not automatically a formal IDTSPE Proposal or permission to mutate.

## Process

1. Start from the current selected semantic meaning; do not reopen settled design without a material conflict.
2. Inspect only the current owners/files needed to make the update concrete and safe.
3. Resolve the intended affected paths, natural owners and proposed operation entries. Give each material entry an exact path, action, intended delta, driver, preservation boundary and verification check; when an exact path is not yet knowable, state the bounded selection rule and blocker rather than guessing.
4. State ordering/dependencies only where they materially affect correctness.
5. State what must be preserved and how the resulting transition will be verified.
6. Hand off to the selected realization/package route when requested; this Use Case does not itself mutate the repository.

## Related

- [`../commands/plan-pre-update.command.md`](../commands/plan-pre-update.command.md) — current explicit Pre-Update command route.

Within the always-active IDTSPE work context, Core `TM-PRE-UPDATE-PLAN` is the reusable methodology component for a separately useful Pre-Update result; this repository Use Case supplies repository-specific file-transition semantics and does not create a competing planning runtime.
