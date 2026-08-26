
# Phase 10 — Authorized Realization — Research Capture

Status: active worked example

Planning artifacts now exist before mutation:

```text
Domain owners + Domain unit Test Designs
Slice Strategy + shared Test Strategy
Slice owners + Slice integration Test Designs
Practical Test plan
```

After separate authorization:

```text
implement SL-RC-01 / SL-RC-02
+ implement Domain unit tests
+ implement Slice integration tests
+ execute automated proof
+ execute Practical Test when environment is ready
```

If implementation reveals an impossible semantic assumption, do not silently patch the test or code around it:

```text
actual Evidence
→ reopen narrowest Scenario/Domain/Slice/Architecture Decision
```

Implementation is Evidence/current state, not automatic semantic authority.
