# EVO-STL-DEFER-VSCODE-HANDOFF — Defer VS Code activation until project arrival

Status: realized lineage from repository v0.12.0. Current behavior belongs to
the materialized Features and Scenarios.

## Entering From

[EVO-STL-PROJECT-ARRIVAL-POLLING](project-arrival-polling.md).

## Realized transition

Moved absence polling to the loopback-only coordinator so clicking a project
action does not activate VS Code while the source is missing. A found source
produces a bounded opaque single-use token; only then does the browser invoke a
VS Code URI and redeem the prepared operation. Timeout or preparation failure
causes no application switch.

## Materialized owners

- [F-STL-OPEN-LOCAL-PROJECT](../../features/open-local-project.md)
- [F-STL-COPY-TRUSTED-PROJECT](../../features/copy-trusted-project.md)
- [SCN-STL-OPEN-SELECTED-PROJECT](../../scenarios/open-selected-project.md)
- [SCN-STL-COPY-TRUSTED-PROJECT](../../scenarios/copy-trusted-project.md)

## Evidence and revalidation boundary

Code/tests own token expiry, replay rejection and deferred-handoff evidence.
Browser protocol behavior and final foreground presentation remain live host
evidence.
