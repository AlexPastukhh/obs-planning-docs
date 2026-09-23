# Replacement Package App — Documentation Use Cases: Implementation Discovery & Proof

Status: active normative Documentation Use Case group
Root authority: [`../documentation-use-cases.md`](../documentation-use-cases.md)

This group owns when Domain/Slice/Shared discovery, owner-local Implementation Requirements selection and proof planning run. Detailed reusable DDD / Vertical Slice / Programming Principles reasoning is referenced from `../methodology-guidance/`.

`DOC-UC-02` and `DOC-UC-03` own Domain/Slice-specific discovery. Generic exact classes/methods/files/call-flow/test realization belongs to `DOC-UC-18`.

## DOC-UC-02 — Perform non-persistent Aggregate / Domain discovery

### Goal

Understand only the Domain meaning needed to realize selected behavior: semantic facts, identity, state, lifecycle, invariants, consistency boundaries and Domain ownership, without turning a working plan into a durable owner.

### Process

1. Start from exact Feature/Scenario meaning, referenced `BR-*`/`SR-*`, relevant implementation concerns and known Evolution Steps.
2. Consult [`../methodology-guidance/reusable-ddd-domain-discovery.md`](../methodology-guidance/reusable-ddd-domain-discovery.md).
3. Determine which facts/rules genuinely belong in Domain and which remain application orchestration, infrastructure, UI or Shared Capability.
4. Identify natural Aggregate/Entity/Value Object ownership, lifecycle/consistency boundary, semantic operations and material failure/result semantics.
5. Identify Domain-specific proof needs at the semantic boundary.
6. If a durable owner-local constraint becomes material, invoke DOC-UC-14 rather than hiding it in the working plan.
7. If exact classes/methods/files/unit tests are useful, invoke DOC-UC-18. A concrete exact plan may contain Domain-specific literal detail, but the generic exact-planning method remains owned by DOC-UC-18.
8. If Domain evidence challenges Feature/Slice or other upstream ownership, re-enter the appropriate upstream Use Case.
9. Delete the working Domain plan by default after its value is exhausted. Persistence does not promote it into semantic authority.

### Principles

- Domain owner answers semantic rules; it does not own the whole technical execution path.
- A Feature may use several Aggregates.
- Value/Object/Entity/Aggregate classification follows semantic identity/lifecycle, not field count.
- Exact source topology is not a Domain Requirement. The DDD guide contains a recommended generalized owner-centered model.
- No global deep Domain model is required upfront.

---

## DOC-UC-03 — Perform Slice / end-to-end implementation discovery

### Goal

Make one selected Feature's end-to-end implementation responsibility understandable enough to validate the Slice boundary, owners, dependencies, side effects/recovery and proof boundary without duplicating generic exact implementation planning.

### Process

1. Start from selected Feature behavior, `BR-*`, Scenario/Screen constraints, material implementation concerns and relevant Evolution Steps.
2. Re-run the same **Shared Feature/Slice Boundary Method** used by DOC-UC-13, now with stronger implementation Evidence, using [`../methodology-guidance/reusable-vertical-slice-discovery.md`](../methodology-guidance/reusable-vertical-slice-discovery.md).
3. Identify the semantic application entry, end-to-end responsibility, meaningful Result, Domain/Shared dependencies and side-effect/persistence/external boundaries.
4. Understand material failure, retry, recovery, uncertainty and branch/module/entry-adapter concerns.
5. Consult [`../methodology-guidance/reusable-programming-principles.md`](../methodology-guidance/reusable-programming-principles.md) where generic design-quality reasoning is relevant.
6. Identify Slice-local proof needs through the meaningful application boundary.
7. If a durable owner-local constraint becomes material, invoke DOC-UC-14.
8. When exact classes/modules/methods/signatures/files/call/data/state flow/tests/edit sequence are useful, invoke DOC-UC-18.
9. If stronger implementation evidence contradicts the Feature/Slice hypothesis or other upstream meaning, re-enter the natural owner process before descending further.
10. Delete the working Slice Discovery/Planning artifact by default after implementation/proof or when no longer useful.

### Principles

- Slice discovery/planning is optional working activity, not a durable semantic phase.
- Slice independence means change locality, not dependency absence.
- Do not create frontend/backend/database Slices by technical layer.
- Exact planning may contain Slice-specific literals, but generic exact-planning methodology has one owner.

---

## DOC-UC-04 — Maintain Shared Implementation Capability when shared responsibility is real

### Goal

Extract and maintain reusable non-end-to-end implementation responsibility only when several Slices genuinely need the same coherent capability.

### Process

1. Start from repeated Feature Implementation Concerns or implementation evidence across Slices.
2. Ask whether the shared meaning is coherent and reusable rather than accidental code similarity.
3. Keep use-case-specific policy/result behavior in consumer Slices.
4. Define consumers and semantic boundary/contract.
5. Perform owner-local Implementation Requirements Discovery through DOC-UC-14 when durable constraints are material.
6. Recheck relevant Evolution Steps and change locality.

### Principles

- Shared capability is not a dumping ground for common utilities.
- Extraction should reduce forced cross-Slice change coupling, not create a central god-owner.
- Shared owner dependencies are normal and do not eliminate Slice independence.

---

## DOC-UC-05 — Maintain evolution-aware implementation architecture

### Goal

Use known Evolution Steps to make current Feature/Slice/Aggregate/Shared boundaries easier to evolve without prematurely implementing future behavior.

### Process

1. Inspect relevant known Steps during Feature/Slice boundary checks and owner-local Requirements Discovery (DOC-UC-14).
2. Ask whether repeated future changes stay within one cohesive Slice/module/branch or reveal distinct evolution lines.
3. Distinguish a stable semantic seam needed now from speculative abstraction.
4. Record a durable current Implementation Requirement only when known evolution materially justifies it.
5. Record future owner delta as Evolution Impact rather than pretending it is current behavior; classify the local evolution with the common Evolution Kinds where useful.
6. Treat semantic/product/architecture/documentation migration as Evolution. Keep migration work inside the canonical Step / affected Evolution Impacts rather than creating a competing roadmap.
7. Re-evaluate after Evidence or new Steps invalidate an earlier assumption.

### Principles

- Prefer change locality across the known evolution chain.
- Avoid both premature implementation and avoidable forced migration.
- Evolution fitness belongs to both production and proof.

---

## DOC-UC-06 — Inspect current implementation without duplicating source documentation

### Goal

Use current source/tests as exact realization Evidence while keeping normative docs focused on semantic behavior, boundaries and durable Requirements.

### Process

1. Read only source/test areas needed to answer the current planning question.
2. Treat class/method/package mechanics as source authority.
3. Promote a fact into normative documentation only when it is durable semantic/boundary/Requirement meaning.
4. Use generated traces/maps as derived navigation only; regenerate rather than hand-maintain when source changes.
5. Feed material implementation findings into Feature Implementation Concerns, owner-local Requirements Discovery or DOC-UC-17 finding handling as appropriate.

---

## DOC-UC-12 — Plan and realize credible proof

### Goal

Turn selected behavior, owner semantics and applicable Implementation Requirements into convincing proof without letting tests become a second semantic authority.

### Process

1. Start from relevant Feature/Scenario/Domain/Slice/Shared meaning and applicable `IR-*`.
2. Consume a `PFR-*` only when an approved durable non-obvious proof-realization constraint actually exists.
3. Prefer a failing executable proof before production realization when a credible test boundary exists.
4. Use Domain unit proof for Domain semantics, Feature integration proof for Slice behavior and E2E proof when Scenario journey truth requires it.
5. Use Practical Acceptance when real environment behavior cannot be credibly automated.
6. Keep shared Test Strategy only for genuinely cross-owner proof coordination.
7. Execute proof and record Evidence against the exact build/state/environment exercised.
8. If Evidence contradicts accepted meaning/requirements/boundaries, open narrow revalidation instead of weakening proof silently.

### Principles

- Tests prove selected truth; they do not create it.
- `1 Requirement = 1 test` is not required.
- `PFR-*` is not a catalog of expected tests.
- Refactoring-resilient proof prefers semantic inputs/outputs/state/evidence over incidental private HOW.
- Keep local proof with its Slice/Domain/Shared owner by default. Use a separate Shared Test Capability / Test Strategy only for coherent reusable/cross-owner proof responsibility, and separate Test Design only when proof design is independently non-trivial.

---

## DOC-UC-14 — Perform owner-local Implementation Requirements Discovery

### Goal

Select only durable owner-local implementation constraints that are materially needed for one Slice, Domain or Shared Capability, without forcing a mandatory late pass or a rigid output shape.

This Use Case may run before/during implementation discovery when a durable constraint becomes material and may re-enter after Evidence. It may legitimately produce **no durable Requirement**.

### Sources

Inspect only the relevant subset:

```text
current behavioral meaning
Feature Step + referenced BR-* identities
Scenario / Screen Requirements
Feature Implementation Concerns
Domain / Shared meaning
known Evolution Steps
current implementation/proof Evidence
relevant reusable guidance
```

### Process

1. Ask what must remain durably true for correct realization, local reasoning/maintenance or known Evolution fitness.
2. Consult relevant reusable guidance as a preferred ready-made discovery model, not as automatic Requirement authority.
3. Distinguish:
   - an owner-local durable `IR-*`;
   - a non-obvious durable proof-realization `PFR-*`;
   - an optional durable Decision/Risk/Question/Known Problem;
   - a working implementation choice that can stay only in code/plan;
   - no durable output.
4. Keep production and proof discovery bidirectional: proof difficulty may reveal a required production seam; production design may reveal proof obligations.
5. If an `IR/PFR` is adopted, record it only in the natural durable owner.
6. If a reusable `RR/RRC` informed the result, provenance may be noted when useful, but there is no live inheritance and later reusable-guidance edits do not mutate the owner Requirement.
7. If discovery changes behavior/owner/boundary assumptions, re-enter the appropriate upstream Use Case.
8. Apply proposal/approval rules before any durable Requirement change or actual implementation change.

### Behavioral Necessity / Relevance Lens

Every proposed or existing IR/PFR should be tested against selected behavior and natural ownership:

```text
Which Behavior Requirement / Scenario Requirement / Domain invariant does this protect?
What required behavior breaks if the Requirement is removed?
Is this a durable constraint, or only a current implementation habit?
Can the same behavior be achieved more simply by changing a code-level Decision?
Does another owner already own this constraint?
Is the Requirement stronger than the selected behavior needs?
Is it too weak to prevent a known failure class?
Is it relevant only in a rare/unsupported/trusted-environment case?
Does its persistent complexity exceed the risk it addresses?
Does known Evolution still justify it?
```

Possible outcomes include:

```text
KEEP
REFINE / WEAKEN / STRENGTHEN
MERGE
REPLACE DECISION
RETIRE
ADD NEW
REOPEN BEHAVIOR / OWNER / BOUNDARY
ACCEPT RISK WITHOUT NEW REQUIREMENT
```

Requirements Discovery is not monotonic accumulation.

### Rare cases, trust boundaries and accepted risk

A rare case is not automatically ignored. Classify it first when material:

```text
supported normal behavior
supported but rare edge case
abnormal but plausible operating condition
trusted-environment customization/misconfiguration
explicitly unsupported condition
outside selected trust boundary
host compromise
```

Then decide whether a durable Requirement is justified. If not, an optional durable Decision/Risk may record why the case is accepted and what Evidence/Evolution/support change should trigger reconsideration.

Accepted risk/problem is **not** permission to silently violate a Requirement. If an accepted known problem means an existing Requirement is not fully satisfied, state that explicitly (`PARTIAL / KNOWN EXCEPTION`) and preserve the reason work may proceed. If the case should not be supported at all, revalidate the upstream behavior/contract instead of carrying a permanent contradiction.

### Proof findings and Proof Requirement anti-accumulation

A proof weakness re-enters proof/Requirement discovery; it does not automatically create another PFR or test.

Typical sources include bug escapes, false positives/negatives, weak assertions, nondeterministic proof, production-boundary bypasses, refactoring-fragile private call-order assertions, poor isolation and weak diagnostics.

Before adding/changing proof ask:

```text
Was the existing PFR actually too weak?
Was the PFR correct but exact proof realization wrong?
Can existing PFRs be simplified/merged?
Is the test coupled to incidental HOW?
Is a new durable proof-realization constraint actually needed?
Does proof difficulty instead reveal a poorly shaped production IR/realization?
```

Ordinary obligation to prove selected behavior/IRs is already implied by the proof workflow. Create a PFR only for an additional durable non-obvious constraint on **how proof itself is implemented/executed**. PFR primarily applies to automated executable proof, and may also apply to Practical Acceptance when the execution method itself must satisfy such a durable proof constraint.

### Finding pressure and legacy normative meaning

Findings are Sources, not durable owners. New Evidence may add, refine, weaken, merge, replace or retire an IR/PFR/Decision, but no new Requirement is created merely because a finding exists.

Legacy normative labels such as `SI-*`, `DI-*` and `TST-*` are migration/discovery sources only:

```text
legacy normative meaning
→ inspect semantic meaning + natural owner
→ propose target IR/PFR delta
→ user approval
→ only then write current normative owner authority
```

Do not silently reclassify legacy labels into new IR/PFR authority.

### Optional 3×2 reasoning lens

When useful, ask across:

```text
                         IMPLEMENTATION              PROOF
Correctness              Correct Realization         Correct Proof
Local Reasoning          Maintainability /           Proof Maintainability /
                         Local Reasoning              Local Reasoning
Evolution Fitness        Evolution Fitness           Proof Evolution Fitness
```

This is a reusable reasoning aid, not mandatory headings or output fields.

### Principles

- Applicable durable constraints only.
- PFR only for non-obvious proof-realization constraints.
- Requirement discovery is not necessarily “later”.
- Discovery may result in code-only decision/no durable Requirement.
- Do not atomize algorithms/invariants/order merely to fit a list.

## Implementation/proof representation guidance

- Working Slice/Domain plans are non-persistent by default.
- Exact classes/methods/files/tests route through DOC-UC-18.
- Domain semantic proof stays local to Domain meaning; Slice integration proof exercises the meaningful Feature boundary.
- Test names describe expected behavior/result rather than tested private method/class names.
