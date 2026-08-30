# Phase 10 — Exact Realization / Authorized Integration — Generic

Status: active SDS navigation phase; generic realization authority is Core `TM-EXACT-REALIZATION`

## Purpose

Navigate from sufficiently determined SDS planning meaning to generic Core [`TM-EXACT-REALIZATION`](../../../idtspe-core/target-modules/TM-EXACT-REALIZATION.md) when the useful next result is an exact directly integrable implementation/artifact.

This phase file is an SDS workflow projection, not a second realization owner.

## IDTSPE Boundary

```text
accepted Domain / Slice / Test / Frontend / Cross-Cutting / other meaning
+ current destination state
↓ when exact realization is independently useful
TM-EXACT-REALIZATION
→ RU-REAL-01 Exact Realization
→ optional explicitly authorized Integration Attempt / build / tests / minor repair
→ Evidence / Findings / current exact result
```

The common code path uses the Core module's code-first workflow: exact code candidate, optional review, explicit integration/verification choice, bounded minor repair, optional final exact-code review and destination handoff/apply according to authority.

A purely mechanical copy/apply of an already exact accepted payload is **not automatically another semantic Target**. Use the existing host/application mechanism and explicit mutation authority for that mechanical step.

If integration exposes a real unresolved semantic/architecture/behavior choice:

```text
stop silent choice
→ capture Evidence / Finding Candidate
→ Core Finding Disposition
→ reuse/revalidate the narrowest existing Target when owned there
  OR surface a Target Formation candidate when independent ownership is needed
→ Target Formation decides reuse / handoff / new bounded Target
→ update/retry Exact Realization only after the material meaning is resolved
```

## Inputs

```text
accepted upstream Target Result Units / Decisions
current codebase/destination state
selected proof obligations when relevant
exact bounded realization scope
integration / verification / repair / destination authority as explicitly granted
```

## Outputs

```text
RU-REAL-01 Exact Realization
actual integration/build/test Evidence when authorized and run
unexpected Finding Candidates / Problems
revalidation handoffs when material
current integrated state when the selected environment was itself the intended destination
```

Implementation convenience never silently rewrites Scenario/Domain/Slice truth, accepted architecture or out-of-scope owners.
