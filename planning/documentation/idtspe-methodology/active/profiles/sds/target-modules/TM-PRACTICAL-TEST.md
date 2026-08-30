# TM-PRACTICAL-TEST — Implemented Practical Evidence / Acceptance

Entry Point: `tm.test.practical`  
Role: implemented practical-evidence Target Module  
Compatibility name: `TM-PRACTICAL-TEST` is retained so command/routing identity does not require a migration.

## Purpose

Own one practical Evidence inquiry whose **actual Evidence subject is the real implemented system/environment**, for acceptance and/or post-implementation learning.

The Target may be planned before realization so implementation can make later observation possible. Actual Evidence/results begin only when the real implemented subject exists.

Shared inquiry/collection mechanics are owned by [`Practical Evidence Method`](../../../idtspe-core/shared/practical-evidence-method.md); this module should not duplicate that method.

## Paired Boundary With Prototype

```text
TM-PROTOTYPE
  partial/simulated/throwaway subject allowed
  pre-implementation practical learning

TM-PRACTICAL-TEST
  real implemented subject/environment required for actual Evidence
  acceptance + post-implementation learning
```

Paired example:

```text
Prototype:
  4/5 users find Archive in clickable mock

Implemented Practical Evidence:
  only 2/5 complete the real flow because real server latency makes UI appear stalled
```

Same concern may continue; Evidence authority differs because the observed subject differs.

## Activation / Scope Gate

Use when the real implementation/environment is materially necessary to answer the acceptance/learning question credibly, for example:

```text
real interaction/usability
real provider/integration behavior
operational diagnosis
production/staging telemetry patterns
performance under representative conditions
support/incident/real-data learning
```

Do not create this Target merely because a feature shipped or because automated tests ran.

Build/compile/unit/integration/E2E checks performed while realizing code remain Core Evidence in `TM-EXACT-REALIZATION` unless a separately useful real operated Evidence inquiry exists.

## Upstream Source Contract

```text
intended/actual implemented Application / Scenario / Slice / Screen / Cross-Cutting subject
selected property/Requirement/invariant or Test Design when acceptance is the purpose
residual Q/R/P / Prototype question requiring the real implementation
actual implemented version/build before Evidence collection
representative users/operators/data/environments
existing telemetry/logs/analytics/support/incident Evidence when relevant
privacy/safety/window/reset constraints
```

Current `TF-04 SOURCE_SET` remains authority.

## Knowledge Basis / Lens Profile

Shared method/Knowledge Basis:
- [`Practical Evidence Method`](../../../idtspe-core/shared/practical-evidence-method.md)

Primary Lens:
- [`LENS-PRACTICAL-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-PRACTICAL-EVIDENCE.md)

Conditional:
- [`LENS-TEST-PROOF-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md) when acceptance/proof is primary.
- Verifiability/Observability/Operability when the real result is hard to observe/diagnose.
- Quality/Risk/Materiality when representative quality/risk behavior is the subject.

## Resolution / Production Method

Use the shared Practical Evidence Method rather than restating collection mechanics here.

Implemented-specific flow:

```text
establish what real implemented subject/property must be accepted or learned from
→ plan observation proportionally; this may happen before realization
→ ensure actual version/environment boundary is explicit
→ wait for real implemented subject before claiming Evidence
→ collect actual Evidence through the shared method
→ organize Evidence Results / Interpretation
→ send material consequences through Core Finding Disposition / Decision Revalidation
```

Existing telemetry/logging is Evidence Source. This Target does not own permanent observability architecture; missing observability becomes a Finding Candidate for implementation/Cross-Cutting/Exact Realization work when warranted.

## Target Step-Result Contract

**Target Step Result:** `Implemented Practical Evidence Result`

| Result Unit | Meaning |
|---|---|
| `RU-PTEST-01` | Evidence Intent / Real Subject — what real implementation/property will be observed and why real Evidence is needed |
| `RU-PTEST-02` | Observation / Data Collection Plan — proportional planned observation against the intended/actual real subject |
| `RU-PTEST-03` | Evidence Results / Interpretation — actual real-subject Evidence refs, material limitations and acceptance/learning interpretation |

`RU-PTEST-03` is absent until real implemented Evidence has actually been collected.

The shared method's detailed inquiry fields are guidance, not a mandatory duplicated schema.

## Artifact / File Contract

```text
ARTIFACT_PROPOSAL
ID: AP-PTEST-01
CONTENT_KIND: IMPLEMENTED_PRACTICAL_EVIDENCE_RESULT
WHEN: real implemented observation is independently material to acceptance/learning/revalidation
GUIDANCE: REQUIRED_IF_TARGET_EXISTS
PERSISTENCE_GUIDANCE: CONDITIONAL
PLACEMENT_DIRECTIVE: PLACE_OR_EMBED
SEMANTIC_OWNER: current TM-PRACTICAL-TEST Target
REPRESENTATION: EXISTING_OWNER_OR_PRACTICAL_EVIDENCE_ARTIFACT
CONTENT: real subject/intent; proportional observation plan; Evidence refs; material limits; interpretation/follow-up
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-PTEST-02
CONTENT_KIND: PRACTICAL_RAW_EVIDENCE
WHEN: logs/media/measurements/run records are bulky or independently reviewed/reused
GUIDANCE: OPTIONAL
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Practical Evidence Target as interpreter; raw observation remains Evidence
REPRESENTATION: SUPPORTING_EVIDENCE_ARTIFACT
CONTENT: permitted raw Evidence with version/environment/time/window provenance and material limits
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

Small intent/plan/result may live together. Persist a dedicated Implemented Practical Evidence owner only when the inquiry/result needs independent review/traceability.

Bulky raw Evidence may live in supporting artifacts with version/environment/time/window provenance. Never persist sensitive data merely because Evidence has a place in the methodology.

## Guards

```text
planned real-subject inquiry ≠ actual Evidence
prototype Evidence ≠ implemented Evidence
automated build/test run ≠ automatically TM-PRACTICAL-TEST
measurement ≠ interpretation
implemented Evidence ≠ product semantic authority
TM-PRACTICAL-TEST ≠ permanent telemetry/logging owner
```

## Handoff

```text
Evidence Results / Interpretation
→ Core Finding Disposition / Decision Revalidation
→ natural Scenario/Screen/Slice/Application/Cross-Cutting/other owner when warranted

simple missing automated proof
→ TM-EXACT-REALIZATION

non-trivial proof-design problem
→ optional TM-TEST-DESIGN

missing durable observability
→ implementation / Cross-Cutting / Exact Realization candidate through normal disposition
```
