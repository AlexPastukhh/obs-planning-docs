# EVO-STL-TRUSTED-PROJECT-COPY — Publish a project under a chosen parent

Status: realized lineage from repository v0.9.0. This file no longer owns a
future target body; current meaning is materialized in the owners linked below.

## Entering From

None. This was the first recorded project-publication transition.

## Realized transition

Added a separate, explicitly confirmed action that preserves a folder/ZIP
source, publishes a complete child under the machine-configured parent and
opens the child under forced-new-window policy. Workspace Trust remained a
VS Code/user decision; the launcher did not grant it.

## Materialized owners

- [F-STL-COPY-TRUSTED-PROJECT](../../features/copy-trusted-project.md)
- [SCN-STL-COPY-TRUSTED-PROJECT](../../scenarios/copy-trusted-project.md)

Later Steps refined arrival waiting, deferred activation, safe existing-child
reuse and coordinator focus. Their current results are already reflected in
those owners.

## Evidence and revalidation boundary

Repository code/tests retain deterministic parser, publication, cancellation,
source-preservation and safety evidence. Installed Tampermonkey → VS Code →
Workspace Trust observation remains host evidence, not a reason to keep a
duplicate future Feature/Scenario body here.
