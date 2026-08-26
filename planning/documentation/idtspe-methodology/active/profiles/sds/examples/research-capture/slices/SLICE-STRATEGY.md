
# Research Capture — Slice Strategy

Target Module: `TM-SLICE-STRATEGY`

## Selected Portfolio

### SL-RC-01 — INITIAL_VERTICAL

```text
Primary Scenario:
  SCN-RC-CAPTURE

Useful Vertical Result:
  user can durably preserve selected material + source context
  and receive truthful success/failure feedback
```

### SL-RC-02 — EXTENDING_VERTICAL

```text
Primary Scenario:
  SCN-RC-CAPTURE

Extends:
  SL-RC-01

Useful Vertical Result:
  user may also attach an optional short thought
  without breaking SL-RC-01 durability/feedback guarantees
```

Review/triage realization is deferred to a later portfolio.

## Why Vertical

Rejected decomposition:

```text
database Slice
backend Slice
frontend Slice
```

because these do not independently deliver the Scenario result.

## Testing-Aware Handoff

All material selected Domain Test Designs already exist:

```text
testing/domain/CaptureItem.test-design.md
testing/domain/SourceContext.test-design.md
```

The Slice portfolio is now known, so shared proof coordination can be evaluated.

Recommended next:

```text
TM-TEST-STRATEGY
```

because this worked example has:
- reusable Domain unit proof;
- two Slice integration paths;
- one later practical capture path;
- shared persistence/test-environment concerns.
