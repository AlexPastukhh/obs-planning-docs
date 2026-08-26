
# CaptureItem — Current Domain Owner

Target Module: `TM-DOMAIN-DRAFT`

## Meaning

`CaptureItem` represents one accepted temporary research capture that survives into later review.

## Identity / Lifecycle

```text
created from valid capture input
→ accepted durable capture
→ later reviewed/triaged
```

## Selected Rules

```text
CaptureItem cannot be accepted without selected material.
CaptureItem cannot be accepted without valid SourceContext.
Accepted capture meaning must be compatible with durable-success Scenario semantics.
```

## Domain Verification Meaning

Prove isolated construction/state rules directly without requiring UI/server/persistence orchestration.

Default proof layer:

```text
unit tests
```

## Change Isolation

New capture-source adapters should not require provider-specific branches inside `CaptureItem`.

Future planning: `CaptureItem.evolution.md`.

## Methodology Direction

```text
Exit Gate:
  Domain meaning + rules + Verification Meaning selected

Recommended next:
  testing/domain/CaptureItem.test-design.md
  via TM-TEST-DESIGN
```
