
# Phase 06 — Slice Portfolio + Shared Testing Strategy — Research Capture

Status: active worked example

## Invocation A — Slice Strategy

Prerequisites:

```text
selected Scenario semantics
selected Domain owners
material Domain Test Designs already planned
```

```text
TM-SLICE-STRATEGY
→ CREATE slices/SLICE-STRATEGY.md
```

Selected portfolio:

```text
SL-RC-01 — durable core capture
SL-RC-02 — optional short thought extension
```

## Invocation B — Test Strategy

Now the Slice portfolio is known and several proof layers need coordination:

```text
TM-TEST-STRATEGY
→ CREATE testing/TEST-STRATEGY.md
```

Strategy selects:

```text
CaptureItem / SourceContext complex isolated rules
→ unit tests

SL-RC-01 / SL-RC-02 vertical orchestration
→ integration tests

whole-system E2E
→ selective, not per Slice

reading→capture→resume human flow
→ Practical Test
```

## Why Strategy Is Here

It runs **after** Domain proof planning and **after** the Slice portfolio becomes known, but **before** detailed per-Slice proof coordination.

## Next

```text
TM-IMPLEMENTATION-SLICE / SL-RC-01
```
