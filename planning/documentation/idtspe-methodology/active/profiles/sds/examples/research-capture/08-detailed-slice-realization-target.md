
# Phase 08 — Per-Slice Planning + Test Design — Research Capture

Status: active worked module-driven example

## SL-RC-01 — Standard Route

### Slice Planning

```text
TM-IMPLEMENTATION-SLICE / SL-RC-01
→ CREATE slices/SL-RC-01.md
```

The file contains:

```text
Useful Vertical Result
semantic obligations
Runtime Path
call-level Codebase Integration Path
```

### Slice Test Design

```text
TM-TEST-DESIGN / SL-RC-01
→ CREATE testing/slices/SL-RC-01.test-design.md
```

Default proof:

```text
real Slice orchestration / persistence / failure propagation
→ integration tests
```

Domain unit cases are referenced rather than duplicated.

## SL-RC-02 — TDD Interleave

### First Slice Invocation

```text
TM-IMPLEMENTATION-SLICE / SL-RC-02
Mode: CREATE
```

Only the semantic Slice contract is stabilized first:

```text
Useful Vertical Result
baseline guarantees
Behavior/DATA/Domain obligations
```

### Early Test Design

```text
TM-TEST-DESIGN / SL-RC-02
→ CREATE testing/slices/SL-RC-02.test-design.md
```

### Repeat Same Slice Target

```text
TM-IMPLEMENTATION-SLICE / SL-RC-02
Mode: REFINE
→ UPDATE slices/SL-RC-02.md
```

The call-level implementation plan is finalized with the chosen proof seams visible.

No second Slice identity/file is created.

## Next

```text
TM-PRACTICAL-TEST planning when operated Evidence is material
then generic Core `TM-EXACT-REALIZATION` for exact code + explicitly authorized integration/automated-test execution
```
