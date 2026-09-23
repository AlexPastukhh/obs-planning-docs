# EVO-STL-PROJECT-ARRIVAL-POLLING — Wait for a selected project source to appear

Status: realized lineage from repository v0.10.0. Current behavior belongs to
the materialized Features and Scenarios.

## Entering From

[EVO-STL-TRUSTED-PROJECT-COPY](trusted-project-copy.md).

## Realized transition

Added a bounded 0–300 second source-arrival preference shared by both project
actions. The exact directory and optional ZIP candidates are checked
immediately; only absence is polled. Collisions and permission/I/O failures are
not hidden as timeouts, and one terminal launch occurs at most once.

## Materialized owners

- [F-STL-OPEN-LOCAL-PROJECT](../../features/open-local-project.md)
- [F-STL-COPY-TRUSTED-PROJECT](../../features/copy-trusted-project.md)
- [SCN-STL-OPEN-SELECTED-PROJECT](../../scenarios/open-selected-project.md)
- [SCN-STL-COPY-TRUSTED-PROJECT](../../scenarios/copy-trusted-project.md)

## Evidence and revalidation boundary

Current tests own immediate-found, delayed-found, zero-wait, timeout and
non-retryable failure evidence. Live delayed download arrival remains a host
observation. This file is transition lineage, not another current owner.
