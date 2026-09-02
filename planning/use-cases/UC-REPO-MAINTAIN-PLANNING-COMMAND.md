# UC-REPO-MAINTAIN-PLANNING-COMMAND — Maintain Planning Command

## Situation

A stable executable Planning Command is useful, or an existing command trigger, route, output contract, presentation, or permission boundary is stale.

## Result

A valid current direct `planning/commands/*.command.md` definition exists and routes to the correct semantic capability/supporting owners without becoming semantic authority itself.

## Process

1. Confirm that a reusable executable invocation surface is useful rather than creating a command merely for navigation text.
2. Resolve the semantic capability and supporting owner route the command invokes.
3. Define/update the command family, active-context behavior, traversal mode, expected output, and permission boundary.
4. Keep algorithms and reusable semantic meaning in their proper owners; keep the command thin.
5. Validate the complete command catalog and synchronize generated projections when affected.

## Related

- [`../commands/README.md`](../commands/README.md) — command-definition contract and catalog rules.
- [`../documentation/command-planning-workflow.md`](../documentation/command-planning-workflow.md) — existing supporting planning Process pending later decomposition.
- [`../documentation/command-routing-workflow.md`](../documentation/command-routing-workflow.md) — existing supporting routing Process.
