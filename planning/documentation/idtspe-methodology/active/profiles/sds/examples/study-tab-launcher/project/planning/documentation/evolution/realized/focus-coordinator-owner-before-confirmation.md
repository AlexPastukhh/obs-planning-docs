# EVO-STL-FOCUS-COORDINATOR-OWNER — Focus the coordinator owner before confirmation

Status: realized lineage from repository v0.15.0. Current behavior belongs to
the materialized Features and Scenarios.

## Entering From

[EVO-STL-ACTIVATE-VSCODE-BEFORE-PROJECT-LAUNCH](activate-vscode-before-project-launch.md).

## Realized transition

Required the URI-selected host to signal the loopback coordinator, after which
the coordinator-owning extension window focuses itself and acknowledges the
same live token. Redemption without owner acknowledgement launches nothing and
shows no project confirmation modal. This places prompts in the window that
owns the operation before a new/existing target window is selected.

## Materialized owners

- [F-STL-OPEN-LOCAL-PROJECT](../../features/open-local-project.md)
- [F-STL-COPY-TRUSTED-PROJECT](../../features/copy-trusted-project.md)
- [SCN-STL-OPEN-SELECTED-PROJECT](../../scenarios/open-selected-project.md)
- [SCN-STL-COPY-TRUSTED-PROJECT](../../scenarios/copy-trusted-project.md)

## Evidence and revalidation boundary

The current suite covers focus-owner acknowledgement and redemption, but
[`P-STL-HANDOFF-01`](../../shared/prepared-project-handoff.md#p-stl-handoff-01)
records the intermittent concurrent acknowledgement/redemption Problem. It is
an explicit current proof concern and prerequisite concern for
[EVO-STL-CLOSE-SUPERSEDED-PROJECT-WINDOWS](../unrealized/close-superseded-project-windows.md).
Live multi-window focus/modal placement remains host evidence.
