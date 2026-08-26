
# Phase 05 — Domain + Early Domain Proof — Research Capture

Status: active worked module-driven example

This chapter intentionally demonstrates that testing does **not** wait for the later numeric Verification chapter.

## Invocation A — Domain Discovery

```text
TM-DOMAIN-DISCOVERY
→ CREATE domain/DOMAIN-DISCOVERY.md
```

Selected Domain candidates:

```text
CaptureItem
SourceContext
```

## Invocation B — CaptureItem Domain Draft

```text
TM-DOMAIN-DRAFT / CaptureItem
→ CREATE domain/CaptureItem.md
```

Its selected `Domain Verification Meaning` says the isolated rule/state space should be unit-tested.

### Immediate Next Step

```text
TM-TEST-DESIGN / CaptureItem
→ CREATE testing/domain/CaptureItem.test-design.md
```

This occurs **before Slice Strategy**.

## Invocation C — SourceContext Domain Draft

```text
TM-DOMAIN-DRAFT / SourceContext
→ CREATE domain/SourceContext.md
```

### Immediate Next Step

```text
TM-TEST-DESIGN / SourceContext
→ CREATE testing/domain/SourceContext.test-design.md
```

## Domain Proof Gate

For the currently selected Domain set:

```text
CaptureItem isolated proof → PLANNED
SourceContext isolated proof → PLANNED
```

Now Domain-local proof responsibilities no longer need to be rediscovered by shared Test Strategy.

## Next

```text
TM-SLICE-STRATEGY
```
