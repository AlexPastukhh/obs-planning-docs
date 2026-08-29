
# Phase 09 — Verification Coordination / Consistency View — Research Capture

Status: active navigation chapter; not the chronological start of testing

By the time this chapter summarizes proof planning, these artifacts already exist:

```text
testing/domain/CaptureItem.test-design.md
testing/domain/SourceContext.test-design.md
testing/TEST-STRATEGY.md
testing/slices/SL-RC-01.test-design.md
testing/slices/SL-RC-02.test-design.md
```

## Current Proof Allocation

```text
isolated Domain rule space
→ unit tests

Slice vertical orchestration
→ integration tests

whole-system E2E
→ selective only

human reading/capture/orientation
→ Practical Test
```

## Practical Test Planning

```text
TM-PRACTICAL-TEST
→ CREATE testing/practical/PT-RC-CAPTURE.md
```

The file is still `PLANNED`; it is not Evidence until executed.

## Consistency Review

Check:

```text
Tests do not redefine Scenario behavior.
Domain unit tests do not pretend to prove persistence orchestration.
Slice integration tests do not duplicate every Domain rule case.
Screen/prototype does not become behavioral authority.
Architecture does not weaken durable-success semantics.
```

Contradictions are Finding Candidates; Core Finding Disposition selects the real owner and any revalidation/reopen consequence.
