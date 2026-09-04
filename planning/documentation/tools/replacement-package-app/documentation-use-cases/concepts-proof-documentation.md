# Shared Concepts — Proof and Documentation

Status: physically separated part of the Replacement Package App documentation methodology.
Authority: this file remains part of the same documentation-methodology authority.

### Test Item

A Test Item is an optional durable **additional requirement on proof quality**. It is used when the tested BI/invariant/implementation requirement alone does not make the credible proof obligation obvious.

A Test Item may require, for example:

- proving no mutation in addition to an error result;
- exercising the correct public/application boundary;
- observing durable/persisted state rather than only a returned value;
- avoiding mock-only false confidence or internal call-order coupling;
- preserving isolation or deterministic failure injection;
- keeping proof stable across behavior-preserving refactoring and planned additive evolution.

A Test Item is not a new product/Domain/Slice requirement and does not create production architecture. If a stable port, compatibility rule or orchestration constraint is required, that requirement belongs to the appropriate BI/DI/SI/shared owner; the Test Item only says what additional proof quality is needed.

Refactor/evolution resilience means proof should stay stable while the property it proves remains unchanged. If an Evolution Step genuinely changes that property, changing or replacing the relevant Test Item/test is legitimate rather than a proof-stability failure.
### Test-first realization

When selected meaning and a credible executable proof boundary are known, production realization should normally be test-first:

```text
selected meaning
→ failing credible proof
→ implementation
→ green
→ behavior-preserving refactor
```

For pure refactoring, existing relevant proof should remain green; do not manufacture a failing test only to call the work TDD.

When realization/proof feasibility is genuinely unresolved, an experiment/prototype/spike may precede production realization. Use it to learn, then return to the normal test-first production path. Experimental code is not accepted merely because it works; if pragmatically retained, credible proof is still required before acceptance.

When a property fundamentally requires a real implemented environment, plan the Practical Acceptance inquiry first, implement the subject, then execute and record Evidence. Planned verification, implemented test/check and executed Evidence are distinct states.
### Test Strategy and Shared Test Capability

`testing-plan.md` is the shared Test Strategy owner when multiple semantic owners/Slices need coordinated proof-layer policy, non-duplication, shared environment/isolation, critical E2E boundaries or Practical Acceptance boundaries.

A **Shared Test Capability** is different: it owns real reusable test machinery/behavior such as a disposable Git repository fixture, deterministic failure-injection capability or bridge harness when several local suites genuinely depend on one reusable responsibility.

```text
Test Strategy
→ shared proof policy / allocation

Shared Test Capability
→ reusable test implementation responsibility

Aggregate / Slice / Shared Implementation Capability
→ local Tests / optional Test Items
```

Do not create a Shared Test Capability merely for a common testing principle; keep policy in Test Strategy and ordinary local mechanics in the consuming test suite/source.
### Generated Implementation Trace

A Generated Implementation Trace is a **derived, non-authoritative artifact produced from source**, intended to answer low-level questions such as current calls, callers, field reads/writes, referenced types or external boundaries.

It is not normative documentation and must not be manually maintained as part of a Scenario/Domain/Slice owner. Source remains authority for implementation mechanics. Generated traces should be source-revision-bound and replaceable by regeneration.

A future generator may materialize traces under:

```text
planning/documentation/tools/replacement-package-app/generated/implementation-traces/
```
### Template

A Template is a recommended starting form for an owner or entry, not a schema.

Canonical recommended forms live in [`documentation-templates.md`](../documentation-templates.md). Each Documentation Use Case below links directly to the concrete form at the process step where it is needed. A concrete situation may omit, combine, rename, reorder or add sections when another structure communicates the required meaning more clearly.

## Non-duplication, ownership, naming and presentation rules

Keep semantic documentation stable, local and intentionally readable.

- Do not manually duplicate information that can be read reliably from source and changes only because code was refactored.
- Do not manually maintain call chains, method/service routing, Java field inventories or code-shape traces in Scenario, Domain or Slice owners.
- Do not document accidental current UI layout merely because it can be observed; record only intentional UI constraints worth preserving.
- Record code-independent behavior, invariants, intentional UI requirements, architecture requirements, ownership and evolution pressure instead.
- Keep a small term, invariant, principle or decision inside its natural Use Case/owner when a separate file would add ceremony rather than clarity.
- Create a focused documentation owner only when an explicit use case/process needs that durable owner and independent/shared complexity justifies it. Documentation-process artifacts require a Documentation Use Case; application semantic/contract/proof owners may be justified by the Scenario, Slice, testing or acceptance process that needs them.
- Do not create orphan `terms.md`, `principles.md`, `notes.md` or similar files merely because the information seems generally useful. If no explicit use case/process creates, maintains or consumes the owner, either keep the information in its natural owner or define the missing use case first.
- Domain documentation is organized around semantic consistency boundaries, not Java classes. Prefer an Aggregate owner when several concepts share one consistency/invariant boundary.
- A separate Domain Object file is valid when that object has enough independent semantics, identity/lifecycle, cross-owner reuse or rules that an Aggregate file becomes less clear.
- One Java class does not imply one Domain Object owner, and one Domain Object owner does not imply one Java class.
- `Feature Interaction` is behavioral Scenario decomposition; `Slice` is implementation decomposition. Do not require 1:1 mapping.
- Scenario does not own implementation HOW, but it must retain material Realization Dependencies when feasibility assumptions/questions materially affect Scenario plausibility or runtime composition.
- Scenario/FI design is iterative: explore enough internal FI Interaction Process, candidate BI and material realization feasibility to judge boundaries, revise FI composition when that exploration or later implementation discovery exposes a better/necessary design, and do not fully detail every candidate FI before the high-level composition is stable enough to justify it.
- Prefer monotonic refinement and avoid unnecessary upstream churn, but never preserve an FI/process solely to avoid revisiting Scenario when implementation evidence invalidates its assumptions.
- Candidate/rejected design alternatives do not become current truth, Evolution Steps or architecture requirements automatically.
- Optimize prose for **semantic readability without semantic loss**, not for the fewest lines:
  - one connected idea may remain prose;
  - several independent facts, conditions, exceptions or consequences should be exposed as bullets/sub-bullets or another clear structure;
  - branches, outcomes, contracts, before/after and current/future contrasts should be visually explicit when that makes meaning easier to recover;
  - never delete a condition merely to make the document shorter;
  - do not turn every sentence into a list when prose carries one coherent thought better.
- Give every durable documentation entity an intuitive human-readable name. A technical ID may help stable references but must not substitute for meaning.
- Do not encode arbitrary display order in entity identity. Numeric suffixes such as `01`, `02`, `03` should not imply Scenario/Slice/FI/BI/EVO ordering unless the number has independent stable meaning. The Evolution Steps Map owns roadmap order.

`domain-evolution.md` is a cross-owner view of Domain changes caused by Scenario-owned Evolution Steps. It is not the primary Domain model and does not own the Evolution Steps themselves.

---
