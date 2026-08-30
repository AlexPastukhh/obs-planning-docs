
# Directed Methodology Workflow And Next-Step Resolution

Status: active generic orchestration owner

## 1. Purpose

Define the **fixed direction and readiness gates** between recurring IDTSPE Target families without pretending that methodology execution is one rigid linear list of phases.

The workflow is a **directed graph / partial order**:

```text
some edges are required ordering constraints
some nodes are conditional
some Targets repeat for several owners
some Targets may be revisited/refined
actual Evidence may challenge an earlier owner; Core Finding Disposition may select revalidation/reopen
```

Numeric `workflow/00..11` files are navigation families. This file owns the actual cross-family direction.

## 2. IDTSPE Invocation Is A Planning View Over Persistent Owners

One IDTSPE invocation is a bounded planning instance, not the lifetime of a Target artifact.

```text
existing canonical owner/artifact(s)
+ new Sources / Evidence / planning-state
+ Target Module
+ applicable Lenses
↓
IDTSPE invocation
  CREATE | REFINE | EXTEND | REVALIDATE | REPAIR
↓
Questions / Ideas / QRP / Decisions
+ Target-specific output
+ Artifact Placement View
+ Methodology Direction View
↓
create/update/reuse canonical artifact(s)
↓
next invocation reads the updated artifacts again
```

So the same Target may be visited repeatedly.

Example:

```text
TM-DOMAIN-DRAFT / CaptureItem
  invocation 1 → create CaptureItem owner

later accepted Scenario / WEUC State or implementation Evidence provides normal refinement input
  invocation 2 → REFINE the same CaptureItem owner

post-code Evidence challenges one invariant
  → Finding Candidate
  → Core Finding Disposition
  → invocation 3 uses REVALIDATE / REPAIR on the same owner only when that lifecycle consequence is selected
```

Conceptually IDTSPE acts like a **planning viewport over the current Target and its files**. It is not itself a methodology `Lens`; `Lens` remains the technical term for reusable evaluation perspectives in IDTSPE Core / profile Lens owners.

## 3. Canonical Forward Direction

```text
Need / Reality
↓
Dynamic real-life solution Targets
↓
TM-APPLICATION-DEFINITION
├─→ TM-PROTOTYPE — conditional pre-implementation practical Evidence; may feed back into any affected owner
↓
TM-SCENARIO-PLANNING — one Target per independently meaningful Scenario; boundary discovery is part of Scenario evaluation
├─↔ TM-SCREEN — conditional after enough Scenario behavior/DATA exists
├─→ TM-REQUIREMENT — exceptional shared must-hold owner only when justified
│
├─→ TM-WEUC — may start EARLY once Application + core Scenario direction
│             are sufficient to interpret planned evolution;
│             may be refreshed later from Domain/Slice/actual work
│
↓
TM-DOMAIN-DISCOVERY — conditional
↓
TM-DOMAIN-DRAFT — zero/one/many Domain owners
↓
TM-TEST-DESIGN — optional per Domain owner only when proof design itself is non-trivial
↓
TM-SLICE-STRATEGY — Slice Implementation Strategy; may stay minimal when one obvious Slice needs no material strategy reasoning
↓
TM-TEST-STRATEGY — conditional shared strategy gate
↓
for each selected Slice:
  Target Formation — when independently bounded Slice planning is material
  → TM-IMPLEMENTATION-SLICE when selected/reused
    ↔ TM-TEST-DESIGN — optional when Slice proof design itself is non-trivial; otherwise exact tests may be realized directly
  ├─→ TM-FRONTEND-SLICE — conditional promotion
  └─→ TM-CROSS-CUTTING-CONCERN — conditional shared owner
↓
TM-PRACTICAL-TEST — Intent / Collection Plan may be prepared before realization when later implemented Evidence is material
↓
generic Core TM-EXACT-REALIZATION — when an exact directly integrable result is the next useful Target; code-first default, optional explicit integration/build/test/minor-repair loop
↓
TM-PRACTICAL-TEST — collect real implemented Evidence + Results / Interpretation when material
↓
LENS-TEST-PROOF-EVIDENCE coverage review when useful
↓
Core Finding Disposition / Decision Revalidation / Consistency Review
```

`TM-WEUC`, Screen, Requirements, Frontend, Cross-Cutting and implemented Practical Evidence are conditional/cross-cutting nodes. Their placement in the graph expresses their **earliest meaningful activation** and normal consumers, not a rule that they run exactly once.

`TM-SLICE-STRATEGY` owns the current Slice portfolio/Behavior realization map, a broad/shallow Domain/Aggregate realization map and selected Slice semantic-owner register. The register supplies identity/addressability, not bounded Target creation; Target Formation remains responsible for any independently bounded `TM-IMPLEMENTATION-SLICE` Target. Separate `TM-DOMAIN-DISCOVERY` / `TM-DOMAIN-DRAFT` remain available when independently deeper Domain planning is material; their presence does not remove Strategy responsibility for `Slice → Uses → Aggregate/domain concept` planning relations. Detailed Slice work that challenges Strategy surfaces a Finding Candidate, crosses Core Finding Disposition, and revalidates the bounded owner only when selected.

For `TM-PRACTICAL-TEST`, early activation may produce only Evidence Intent / Subject and an Observation / Data Collection Plan. Actual Evidence collection and Results / Interpretation require the real implemented subject/environment; the distinction from `TM-PROTOTYPE` is the Evidence subject, not merely when the Target record was first created.

`TM-PRE-UPDATE-PLAN` and `TM-EXACT-REALIZATION` are generic Core nodes reused by SDS rather than SDS modules. Pre-Update is optional review-first change planning; Exact Realization owns literal directly integrable production/test code. It is **not mandatory after every semantic Target**. It may follow a sufficiently determined Domain owner (for example to implement/test an Aggregate before Slice work), a Slice/Test Design combination, a Cross-Cutting/Frontend result, or a direct bounded local change. A purely mechanical application of an already exact accepted payload does not require another Target. Candidate build/automated-test verification inside Exact Realization remains Core Evidence; implemented practical acceptance/learning stays `TM-PRACTICAL-TEST`.

## 4. Fixed Testing Direction

Testing has its own explicit partial order.

### 4.1 Domain Proof Comes Before Shared Test Strategy

After a Domain owner is selected, its isolated proof can be planned immediately:

```text
TM-DOMAIN-DRAFT / Domain Owner A
→ TM-TEST-DESIGN / Domain Owner A

TM-DOMAIN-DRAFT / Domain Owner B
→ TM-TEST-DESIGN / Domain Owner B
```

Typical default:

```text
isolated complex Domain/business rule
→ unit-test design
```

Before opening `TM-TEST-STRATEGY`, all **material isolated Domain proof responsibilities in the currently selected Domain set** should be one of:

```text
PLANNED
EXPLICITLY NOT APPLICABLE
EXPLICITLY DEFERRED with reason
```

This prevents Test Strategy from rediscovering local Domain proof responsibilities that already have natural owners.

### 4.2 Slice Portfolio Then Shared Test Strategy

`TM-TEST-STRATEGY` becomes useful only after enough of the Slice portfolio is known to coordinate shared/layer proof responsibilities.

Normal gate:

```text
selected deeper Domain owners / Domain proof positions resolved when applicable
+ Slice Implementation Strategy / selected Slice portfolio known
↓
TM-TEST-STRATEGY — if shared coordination is material
```

It then establishes defaults such as:

```text
Domain/business isolated complexity
→ unit proof

Slice orchestration / multi-owner vertical collaboration
→ integration proof

few critical whole-system paths
→ selective E2E

human/operated/environment property
→ Practical Test
```

If proof ownership is simple/local, `TM-TEST-STRATEGY` is skipped. If the concrete proof is also obvious, `TM-TEST-DESIGN` may be skipped too and exact production/test code may be realized directly through `TM-EXACT-REALIZATION`.

### 4.3 Per-Slice Test Design

Each selected Slice gets its own proof design once its semantic result is stable enough.

Standard route:

```text
TM-IMPLEMENTATION-SLICE
  Useful Vertical Result + obligations + implementation boundary
↓
TM-TEST-DESIGN / that Slice
↓
TM-EXACT-REALIZATION / exact production + test realization
```

TDD route:

```text
TM-IMPLEMENTATION-SLICE
  stabilize Slice identity
  + Useful Vertical Result
  + Behavior/DATA/Requirement/Domain obligations
↓
TM-TEST-DESIGN / that Slice
  design integration/unit proof before detailed implementation
↓
repeat TM-IMPLEMENTATION-SLICE
  REFINE call-level plan around the selected proof seams
↓
TM-EXACT-REALIZATION / exact production + test realization
```

TDD therefore changes the **interleaving**, not semantic authority. Test Design still consumes the Slice's accepted semantic result and cannot invent Scenario/Domain behavior.

## 5. Readiness Gates

### Scenario → Domain

Domain work requires enough accepted Scenario meaning to avoid inventing Domain semantics during modeling:

```text
Need/result/scope
material Behavior
material Scenario DATA
must-hold / negative guarantees when present
acceptance/failure meaning
```

### Domain → Domain Test Design

A Domain owner must have selected meaning/invariants/verification meaning precise enough to name the property to prove.

### Domain Proof → Slice Strategy

Material isolated Domain proof obligations for the current Domain set should already be planned/not-applicable/deferred explicitly. Slice planning may still reveal new Domain questions/findings; Core Finding Disposition may select Domain-owner revalidation/reopen when warranted.

### Slice Strategy → Test Strategy

A selected Slice portfolio / Useful Vertical Result set must be known. Test Strategy should not invent Slices or treat `RU-SSTRAT-03` as formation of bounded Implementation Slice Targets.

### Slice → Slice Test Design

At minimum the Slice must have stable:

```text
Primary Scenario
Useful Vertical Result
Behavior/DATA/Requirement obligations
Domain obligations when present
```

A detailed call-level implementation plan is optional before Test Design in TDD mode.

### Test Design → Exact Realization

Material proof designs needed for the selected realization path should be persisted/addressable before or during implementation according to the chosen implementation/TDD mode. When literal code/config/test artifacts are the next useful result, generic Core `TM-EXACT-REALIZATION` owns that exact directly integrable result and may practically integrate/verify it only under explicit user authority.

### Execution / Current Evidence → Test Proof Lens Coverage Review

Coverage requires actual Evidence. Planned tests alone are not coverage.

## 6. Methodology Direction View — Checkpoint / Handoff Projection

At an Integration Checkpoint, explicit handoff, or whenever methodology direction materially changes/blocks the current discussion, state the likely methodology continuation. Ordinary Broad Discussion does not append the full direction projection mechanically on every turn.

Minimum shape:

```text
Methodology Direction
  Current node / Target:
  Invocation mode:
  Exit gate:
  Recommended next Target / action:
  Why this is next:
  Conditional alternatives:
  Repeat-current trigger:
  Backward-reopen trigger:
```

The recommendation is not permission to execute the next Target automatically.

## 7. Next-Step Resolution Algorithm

After current Target evaluation:

```text
1. Is the current Exit Gate unsatisfied because the same Target still has
   material unresolved Questions/Decisions?
   → recommend REFINE current Target.

2. Did new Evidence challenge an accepted upstream semantic owner?
   → surface/disposition the Finding Candidate through Core Finding Disposition;
   → when disposition selects revalidation, recommend REVALIDATE/REPAIR the narrowest challenged owner.

3. Is the current Target complete enough to produce downstream Sources?
   → follow the canonical forward graph.

4. Are several conditional next Targets ready?
   → choose one recommended next step based on blocking value / dependency /
     earliest useful downstream progress;
   → list the other ready Targets as conditional alternatives.

5. Is a downstream Target not ready because a prerequisite artifact/owner is
   missing?
   → recommend the missing prerequisite Target, not an invented workaround.

6. Does no new Target need work?
   → say that the methodology path is currently complete / awaiting execution
     or Evidence.
```

## 8. Artifact Progression Rule

Methodology progress should be visible through durable natural representations when material — code/tests/types, discovery/strategy sections, owner artifacts, global maps — not only as chat history.

```text
Target invocation
↓
P-14 Artifact Placement View
↓
CREATE / UPDATE / EMBED / REUSE / UNRESOLVED
↓
canonical owner representations accumulate
↓
later IDTSPE invocation reads them as current Target/Source context
```

When AP/AG guidance says a separate owner/register/companion is required/preferred, the IDTSPE response should show it even when mutation is not authorized.

The absence of a file may itself be a methodology finding:

```text
Persistence REQUIRED
Destination UNRESOLVED
→ do not invent a path
→ expose UNRESOLVED_PLACEMENT
```

## 9. Repetition Is Normal

The graph orders **meaning**, not chat turns.

Valid patterns include:

```text
Scenario Planning
→ Screen
→ Scenario Planning REFINE

Domain Draft
→ Domain Test Design
→ Slice planning exposes missing-invariant Finding Candidate
→ Core Finding Disposition
→ Domain Draft REPAIR only when selected
→ Domain Test Design REFINE after accepted Domain correction when needed

Slice Plan
→ Slice Test Design (TDD)
→ Slice Plan REFINE

TM-WEUC early interpretation
→ accepted Domain/Slice decisions
→ global-update Finding Candidate + likely TM-WEUC owner hint when project-global interpretation may have changed
→ Core Finding Disposition
→ TM-WEUC REFRESH only when that owner/lifecycle consequence is selected
```

A repeated IDTSPE invocation is not duplication when new Sources, unresolved Decisions or downstream feedback justify it.

## 10. Guards

```text
numeric phase order ≠ rigid execution order
next-step recommendation ≠ automatic execution permission
IDTSPE planning viewport ≠ Lens technical type
persistent artifact ≠ Target Instance itself
Test Strategy ≠ prerequisite for local Domain Test Design
Test Design ≠ semantic owner
TDD ≠ permission for tests to invent behavior
forward graph ≠ prohibition on Core-disposition-driven narrow revalidation/reopen
```
