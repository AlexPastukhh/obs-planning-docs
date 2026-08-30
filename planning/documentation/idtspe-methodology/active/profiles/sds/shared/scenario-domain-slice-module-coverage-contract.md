# Scenario → Domain → Slice Module Coverage Contract

Status: active SDS consistency contract  
Purpose: guarantee that Scenario planning produces enough selected meaning for Domain planning, and Domain/Scenario meaning produces enough selected meaning for Slice planning without hidden documentation gaps.

---

# 1. Scenario System Inputs

```text
Application Definition / Responsibility Boundary
Application Concept — useful context
Prototype Evidence — when current
Requirements/constraints already accepted
selected whole-solution Sources
```

---

# 2. Scenario Planning Output

Must establish proportionally:

```text
Scenario inventory
independently meaningful Need/result boundary per selected Scenario
overlap/split/merge disposition
coverage of Application Definition / Responsibility Boundary
Future Scenario Ideas kept separate
```

Each material independently meaningful Scenario is owned/planned through `TM-SCENARIO-PLANNING`; boundary discovery is part of that module evaluation rather than a separate Scenario-discovery result.

---

# 3. Detailed Scenario Completeness

A Scenario Planning is not complete merely because its main flow exists.

Required proportional coverage:

```text
Identity / actor / context
Need / goal / observable result
entry/re-entry / preconditions where material
main behavior
material alternate/failure behavior
postconditions / observable outcomes
Acceptance

Scenario DATA
  all behavior-critical semantic inputs/outputs are discoverable

Behavior Items
  stable/addressable material behavior is discoverable
  negative/no-mutation guarantees captured when material

Requirements / Invariants
  must-hold conditions dispositioned/owned by real semantic owners

Screen relations
  reciprocal when spatial owner is material
  Screen Map / Scenario×Screen / Behavior-DATA availability / routes coherent when UI planning is material

Q/R/P
  blocking concerns resolved
  residual concerns retained

Decisions / Revalidation
  material selected choices persisted
```

Discovery loop:

```text
Scenario ↔ DATA ↔ Behavior ↔ Requirements
```

may surface a Finding Candidate; Core Finding Disposition may reopen Scenario scope when warranted.

---

# 4. Domain Discovery Source Contract

Trusted Sources can include:

```text
current Scenario owners
Scenario DATA owners
Behavior Items
Requirements
Prototype Evidence still relevant
Change Axes with evidence
existing Domain/implementation Evidence when reviewing
```

The handoff list is not a closed Source whitelist.

---

# 5. Domain Discovery Must Not Miss

```text
semantic facts / recurring concepts
identity clues
lifecycle/state clues
relationships
pre/post/through invariants
impossible states/combinations
policy vs invariant distinction
value-integrity candidates
ownership/consistency candidates
external references / cross-boundary coordination
no-Domain option
```

DDD patterns are candidate reasoning aids, never noun→pattern rules.

---

# 6. Domain Draft Completeness

Before Slice planning trusts a separate Domain owner:

```text
purpose/boundary
stable semantic core
terms/concepts/relationships
selected lifecycle/rules/invariants
policies/likely variation when useful
Value Object choices when justified
Aggregate/Root choices when justified
explicit outside/external references
cross-boundary coordination
Scenario/Requirement stress check
premature-generalization check
Domain Verification Meaning
residual Q/R/P + revalidation
```

Valid alternative:

```text
no separate Domain owner
→ Scenario/Requirement owners remain Sources for Slice planning
```

---

# 7. Slice Strategy Inputs

```text
Scenario(s) being decomposed
Scenario DATA
Behavior Items
local/shared must-hold conditions / negative guarantees
Screens when material
Domain / Domain Verification Meaning when selected
current realization Evidence
dispositioned L4/L5/L6-derived State / accepted architecture Decisions when material
delivery/dependency constraints
```

Slice Strategy is optional when one obvious small Slice exists.

For every selected normal Slice it establishes a `Useful Vertical Result Definition`:

```text
Slice ID
Slice Role: INITIAL_VERTICAL | EXTENDING_VERTICAL
Primary Scenario
Extends / Baseline Guarantees — when extending
Useful Vertical Result
Behavior Obligations
DATA Obligations
Requirement / Invariant Obligations
Screen Obligations — when UI
Domain Obligations — when useful at Strategy depth
Dependencies/order
```

Shared work across several Scenarios/Slices surfaces an ownership finding; Core Finding Disposition may hand off to `TM-CROSS-CUTTING-CONCERN` or another real shared owner, using Target Formation when independent ownership itself must be resolved.

---

# 8. One Slice Draft Completeness

Before implementation:

```text
one Primary Scenario
selected Useful Vertical Result Definition
INITIAL/EXTENDING role coherent
Behavior obligations understood
DATA obligations understood
must-hold/negative guarantees understood
Screen obligations understood when UI
Domain Elements Used identified when Domain exists
shared/cross-cutting local obligations referenced
dependencies/handoffs explicit
Runtime Path coherent
call-level Codebase Integration Path coherent
Part Plans only for mostly-understood local work
child IDTSPE used for genuine unresolved local design space
```

A Slice does not redefine upstream semantic truth.

---

# 9. Testing Handoff

Selected proof Sources:

```text
Useful Vertical Result Definition
Scenario Acceptance
Behavior Items
Scenario DATA
local/shared must-hold conditions / negative guarantees
Domain invariants / Domain Verification Meaning
selected implementation boundary
```

→ optional `TM-TEST-DESIGN` when the proof method itself is non-trivial; otherwise exact tests may be realized directly through Core `TM-EXACT-REALIZATION`.

Shared proof responsibility → `TM-TEST-STRATEGY` only when cross-owner coordination is independently useful.

Operated real-implementation evidence → `TM-PRACTICAL-TEST` when useful.

Actual Evidence later → direct `LENS-TEST-PROOF-EVIDENCE` coverage review / Finding Disposition / revalidation when useful.

---

# 10. Completeness Invariant

```text
Scenario Planning ready
≠ main flow written

Domain Draft ready
≠ nouns modeled

Slice Draft ready
≠ files/tasks listed

Testing ready
≠ test names listed
```

Readiness is defined by semantic/decision/source/proof coverage above.
