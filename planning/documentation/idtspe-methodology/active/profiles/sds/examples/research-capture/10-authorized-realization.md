
# Phase 10 — Exact Realization / Authorized Integration — Research Capture

Status: active worked example

Planning artifacts now exist before mutation:

```text
Domain owners + Domain unit Test Designs
Slice Strategy + shared Test Strategy
Slice owners + Slice integration Test Designs
Practical Test plan
```

Use generic Core `TM-EXACT-REALIZATION` to produce the literal implementation. A normal code-first path here is:

```text
accepted Slice + Domain + Test Design meaning
→ exact production/test code candidate
→ optional human review
→ explicit authorization for integration/build/tests
→ integrate into selected available project environment
→ build + automated proof
→ minor in-scope repairs only when authorized
→ final exact realization / optional final review
```

The same Core module can also be used earlier for a selected Domain Aggregate when implementing/testing that exact Domain form before the full Slice is useful. Practical Test remains separate and runs when the real implemented subject/environment is ready.

If implementation reveals an impossible semantic assumption, do not silently patch the test or code around it:

```text
actual Evidence / Finding Candidate
→ Core Finding Disposition
→ revalidate/reopen narrowest Scenario/Domain/Slice/Architecture Decision when warranted
```

Exact Realization/integration Evidence is current implementation evidence, not automatic semantic authority. Candidate build/tests inside Exact Realization are not automatically `TM-PRACTICAL-TEST`.
