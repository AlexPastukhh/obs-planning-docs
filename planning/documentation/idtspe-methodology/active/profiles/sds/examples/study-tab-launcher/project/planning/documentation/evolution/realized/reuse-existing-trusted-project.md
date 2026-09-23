# EVO-STL-REUSE-EXISTING-TRUSTED-PROJECT — Reopen an existing destination child

Status: realized lineage from repository v0.13.0. Current behavior belongs to
the trusted-copy Feature and Scenario.

## Entering From

[EVO-STL-DEFER-VSCODE-HANDOFF](defer-vscode-handoff.md).

## Realized transition

Changed an exact existing destination child from an unconditional collision to
a safe reuse branch. Only a canonical real directory is accepted; links,
junctions, files and redirected roots remain rejected. Reuse performs no copy,
extraction, merge, overwrite or confirmation intended for new publication.

## Materialized owners

- [F-STL-COPY-TRUSTED-PROJECT](../../features/copy-trusted-project.md)
- [SCN-STL-COPY-TRUSTED-PROJECT](../../scenarios/copy-trusted-project.md)

## Evidence and revalidation boundary

Repository tests own safe-directory reuse, unsafe collision and no-mutation
evidence. Installed existing-child/window behavior remains live host evidence.
