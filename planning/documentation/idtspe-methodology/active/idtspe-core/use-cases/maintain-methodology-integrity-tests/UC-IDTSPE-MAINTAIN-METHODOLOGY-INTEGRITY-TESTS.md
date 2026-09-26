<a id="uc-idtspe-maintain-methodology-integrity-tests"></a>
# UC-IDTSPE-MAINTAIN-METHODOLOGY-INTEGRITY-TESTS — Create / Review / Maintain Methodology Integrity Tests

Status: active methodology Use Case

Responsibility ID: `IDTSPE.UC.MAINTAIN-METHODOLOGY-INTEGRITY-TESTS`

Purpose: create, review or revise repository tests that protect IDTSPE methodology declarations/projections from accidental partial change without making tests a second semantic authority.

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Test Proof / Evidence Quality Lens](../../lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md#lens-test-proof-evidence) — `LENS-TEST-PROOF-EVIDENCE`.
> - `CONTEXTUALIZES` [Methodology Integrity Testing Contract](../../knowledge-bases/testing/METHODOLOGY-INTEGRITY-TESTING-CONTRACT.md#testing-methodology-integrity) — `TESTING.METHODOLOGY-INTEGRITY`.
> - `CONTEXTUALIZES` [Methodology Integrity Test Maintenance Process](../../use-case-processes/METHODOLOGY-INTEGRITY-TEST-MAINTENANCE.use-case-process.md#idtspe-methodology-integrity-test-maintenance-process) — `IDTSPE.METHODOLOGY-INTEGRITY-TEST-MAINTENANCE`.

## Situation

Use when one or more of these are materially true:

```text
a methodology map/catalog/Helper projection needs a hard parity guard
command ownerRefs or another typed reference needs canonical identity checking
bootstrap/registry routing needs structural integrity protection
an existing methodology test has frozen counts, prose regex coupling or another false-failure risk
shared path/anchor/owner-resolution test mechanics are duplicated/inconsistent
a methodology change broke an integrity test and intent vs accidental drift must be distinguished
a new methodology relation requires positive/negative regression controls
```

Do not use merely because ordinary product/application code needs tests. That remains normal Test Proof + realization work.

## Inputs

Read proportionally:

```text
canonical owner(s) / registry / command declaration being protected
existing derived maps/catalogs/Helper consumers when applicable
existing integrity tests and their failure history
Methodology Integrity Testing Contract
Test Proof / Evidence Quality Lens
applicable Exact Realization owner for literal .test/helper changes
current repository verification/build routes
```

## Process

Use the canonical [`Methodology Integrity Test Maintenance Process`](../../use-case-processes/METHODOLOGY-INTEGRITY-TEST-MAINTENANCE.use-case-process.md#idtspe-methodology-integrity-test-maintenance-process).

Key orchestration boundary:

```text
canonical owner decides meaning
→ this Use Case resolves how integrity must be guarded
→ Exact Realization owns literal test/helper changes
→ executed tests/build/verify become Evidence
```

When a test failure follows an intended methodology change, first inspect the canonical declaration and affected projections/consumers. Do not update expected values or weaken assertions merely to restore green status.

## Result

```text
one current methodology-integrity guard design/maintenance result
+ canonical authority/projection direction made explicit
+ hard-vs-lint classification
+ minimal derived invariant(s)
+ direct/inherited/delegated proof boundaries when relevant
+ shared resolver/parser boundary when relevant
+ positive + negative controls proportional to risk
+ actionable failure diagnostics/comment contract
+ exact realization + verification consequences
```

The independently useful result is the **maintained methodology integrity guard contract and its integration consequences**, not a generic Test Design artifact.

## Boundaries

Do not:

```text
turn test expected values into a second registry/catalog
freeze current profile/TM/Lens/edge counts unless cardinality itself is canonical meaning
infer semantic relations from ordinary Markdown links
merge dependency, attachment, command-owner and bootstrap relations into one untyped graph
use one untested parser as both producer and unquestioned oracle
make harmless prose/layout refactors fail a hard guard when structure is unchanged
interpret a failing test as proof that the intended methodology change is wrong
edit the test first merely to make CI green
```

## Handoffs

```text
proof-quality question
→ LENS-TEST-PROOF-EVIDENCE

literal test/helper/source change
→ applicable Exact Realization owner
→ SDS TM-CODE-REALIZATION when source/test/codebase realization is the active profile-specific owner

real semantic/projection inconsistency found by the guard
→ canonical owner + normal Finding/Revalidation route

subjective architecture-quality concern without a structured invariant
→ applicable Lens/review Finding; not hard-integrity assertion
```
