# Proposal and Approval

Status: active normative detailed procedure
Use Case: DOC-UC-16
Planning levels: [`progressive-planning.md`](progressive-planning.md)

## Important durable meaning change approval boundary

The Requirement-specific approval rule is one instance of a broader governance principle:

> **AI must not autonomously change important durable product or methodology meaning.**

A change is material for approval purposes when it can affect **any owner anywhere**,
or when code/proof would realize a new constraint/pattern/structure not already explicitly approved in the concrete proposal.

Explicit user confirmation is required before materially changing durable meaning such as:

```text
Behavior / Scenario semantics
Feature or Slice boundaries
Domain / Aggregate ownership, identity, lifecycle or invariants
Shared Capability responsibility/contract
Implementation or Proof Requirements
durable Decisions carrying risk/question/problem/trade-off meaning
supported/unsupported behavior
trust / authority boundaries
Evolution meaning / Forced Migration decisions
active methodology rules and workflow
reusable guidance whose semantic content can materially affect future discovery
canonical Reusable Requirements
owner current/retired authority status
cross-owner ownership/authority relationships
```

Code changes that merely realize already approved Requirements are still proposal-first,
because the concrete realization itself may introduce classes, patterns, coupling, proof seams or other design choices.
No new Requirement needs to be invented merely because approval is required for the code change.

The same rule applies whether the proposed change came from:

```text
review finding
implementation evidence
test failure
refactoring
new reusable guidance
methodology cleanup
migration
AI reasoning
```

### Durable Requirement change approval

AI must not autonomously add, modify, weaken, strengthen, merge, replace, move, split or retire a durable Behavior/Scenario/IR/PFR Requirement.

When a finding suggests a Requirement change:

```text
classify the finding
→ identify affected Requirement(s)/owner
→ apply Behavioral Necessity / Relevance reasoning
→ show exact Requirement delta + important alternatives/risks
→ request user approval
→ only after approval update the natural durable owner
```

No “obvious” Requirement change bypasses this boundary. If implementation cannot proceed correctly without an unapproved Requirement decision, stop at that semantic boundary rather than silently creating durable truth.

### Approval representation

Do not add mandatory `APPROVED` metadata to every Requirement.

```text
Requirement already present in a current durable owner
→ approved current authority

proposed add/change/remove/move/merge/split
→ working/review proposal only
→ not normative current owner truth until user approval

after approval
→ update natural owner
→ current owner text becomes current authority
```

A semantic-preserving typo/grammar/readability/terminology correction may use a lightweight proposal, but it is still proposal-first and waits for confirmation. If scope, strength, ownership, supported behavior, exceptions or proof meaning could reasonably change, treat it as a semantic Requirement change.

### Durable Decision change approval

Code-only Decisions need no durable document merely because they exist, though changing code remains proposal-first.

A documented durable Decision is additionally protected when it preserves risk, question/problem, trade-off, trust/support assumption, reconsideration trigger or cross-owner maintenance reasoning. Do not silently replace, materially reinterpret or remove it. Show what becomes obsolete and what residual risk/problem remains, then update only after approval.

## Proposal-first execution rule

AI may autonomously **inspect, analyze, compare, reason, classify findings and prepare proposals**.

AI must **not execute a repository/application/documentation change before user confirmation**.

This includes changes that appear narrow or obvious:

```text
bug fix
refactor
new class / interface / module
new use of a pattern
change to an existing class
test/proof implementation change
implementation of an already documented Requirement
implementation of an undocumented but real code constraint/principle
editorial documentation change
derived/navigation synchronization
methodology/reusable-guidance change
replacement-package contents
```

The user decides how deeply a proposal needs to be inspected before approval.
AI does not downgrade an action to “no approval needed” merely because it looks small.

The distinction is:

```text
analysis / proposal
→ may happen autonomously

actual change
→ waits for user confirmation
```



## Proposal / clarification classification

Every material proposal or finding is classified by **planning impact**, not only by discovery location.

Use three distinct level concepts:

```text
Current planning level
= where the session is currently working.

Discovered at level
= where the evidence/finding/proposal first appeared.

Highest affected level
= the most upstream planning level whose accepted meaning may change.
```

Planning direction:

```text
UPSTREAM
= toward more semantic/authoritative planning
= toward L0

DOWNSTREAM
= toward more concrete realization
= toward L4
```

A finding may propagate **upstream**.

An approved upstream change propagates **downstream**
through revalidation or invalidation of dependent plans.

Recommended planning-level identities:

```text
PL-L0-BEHAVIOR-AND-OWNER
PL-L1-IMPLEMENTATION-REQUIREMENTS
PL-L2-IMPLEMENTATION-ARCHITECTURE
PL-L3-EXACT-IMPLEMENTATION-PLAN
PL-L4-LITERAL-CODE-AND-PACKAGE
```

Recommended `Change kind` values:

```text
BEHAVIOR-CLARIFICATION
BEHAVIOR-CHANGE
OWNER-OR-BOUNDARY-CHANGE

IMPLEMENTATION-REQUIREMENT-CLARIFICATION
IMPLEMENTATION-REQUIREMENT-CHANGE
PROOF-REQUIREMENT-CHANGE

IMPLEMENTATION-APPROACH
NEW-IMPLEMENTATION-STRUCTURE
PATTERN-SELECTION
REFACTOR
REALIZATION-FIX
PROOF-REALIZATION-CHANGE

METHODOLOGY-CHANGE
REUSABLE-GUIDANCE-CHANGE
DERIVED-SYNCHRONIZATION
```

Recommended `Clarification kind` values:

```text
MISSING-DETAIL
ASSUMPTION-CHECK
DESIGN-CHOICE
REQUIREMENT-IMPACT
BEHAVIOR-IMPACT
OWNER-BOUNDARY-IMPACT
RISK-OR-KNOWN-PROBLEM
EVIDENCE-GAP
CONSISTENCY-REVALIDATION
EVOLUTION-IMPACT
NEXT-LEVEL-TRANSITION
```

### Level-prioritized proposal / finding review

Within a session, proposals/findings should be reviewable by their **Highest affected level**.

Default ordering:

```text
all items whose Highest affected level = L0
→ close/reconcile L0
→ backward/forward consistency
→ ask whether to proceed to L1

all items whose Highest affected level = L1
→ close/reconcile L1
→ consistency
→ ask whether to proceed to L2

...
→ L4 literal result
```

This lets the user:
- inspect high-impact semantic items in detail;
- approve a group of lower-level proposals more quickly when desired;
- request only disputed lower-level items;
- avoid mixing an L0 owner/boundary question into a long L3 code review.

AI still proposes every actual change.
The user controls **review depth**, not whether the proposal exists.

Example:

```text
Finding discovered at: L3
Highest affected level: L1
Affected levels: L1, L2, L3

Upstream revalidation:
REQUIRED — L1

If approved:
dependent L2/L3 planning
→ INVALIDATED-PENDING-REVALIDATION
```

### Complexity delta

Every material proposal should consider not only consistency impact but also how the decision changes the system's persistent and temporary complexity.

Use:

```text
Complexity delta:
REDUCES | ROUGHLY-NEUTRAL | ADDS
```

with a short **Complexity consequence** explanation.

Evaluate only dimensions that are relevant:

```text
Semantic complexity
→ new concepts / states / rules

Ownership complexity
→ new owners / capabilities / boundaries

Structural complexity
→ classes / interfaces / adapters / layers / patterns

State & lifecycle complexity
→ persisted state / transitions / concurrency / retry / recovery

Coupling / locality
→ how many neighboring parts must know/change together

Maintenance burden
→ what must continue to be maintained/synchronized

Proof burden
→ tests / fixtures / integration or E2E proof / special seams

Operational complexity
→ failure modes / diagnostics / configuration / recovery

Migration cost
→ existing code/docs/state that must be moved

Evolution consequence
→ effect on known future change locality

Cognitive load
→ context a maintainer must understand to change the area safely
```

Do not equate fewer classes with lower system complexity.

A proposal may add structure while reducing coupling, duplicated logic, maintenance burden, or future-change cost.

For real competing options, compare them against the criteria that matter in the current situation rather than mechanically scoring a universal winner.

Example:

```text
Option A
- lower immediate implementation cost
- no new owner
- higher coupling
- higher future maintenance spread

Option B
- introduces one Shared Capability
- adds one boundary/proof responsibility
- reduces cross-Slice knowledge
- localizes known Evolution
```

Then state:

```text
Decision priorities for this situation:
1. ...
2. ...
3. ...

AI recommendation:
...

What the recommendation sacrifices:
...
```

Never optimize only for immediate implementation simplicity.

Compare:

```text
current change cost
+
persistent complexity introduced
+
persistent complexity removed
+
proof/operational burden
+
known Evolution consequence
```

### Compact proposal / finding header

Recommended form:

```text
Change kind:
...

Current planning level:
L0 | L1 | L2 | L3 | L4

Discovered at level:
L0 | L1 | L2 | L3 | L4

Highest affected level:
L0 | L1 | L2 | L3 | L4

Affected levels:
...

Clarification kind:
<when applicable>

Affected authority / owner:
...

Durable Requirement delta:
NONE | CLARIFICATION | PROPOSED CHANGE

Upstream revalidation:
NONE | POSSIBLE | REQUIRED

Downstream consequence if accepted:
NONE | REVALIDATE <levels> | INVALIDATE <levels>

Complexity delta:
REDUCES | ROUGHLY-NEUTRAL | ADDS

Complexity consequence:
...

User confirmation required:
YES
```

These labels are transient interaction aids, not durable product ontology.


## Proposal quality obligation

Because work is proposal-driven, AI must take proposal quality seriously.

A proposal should be concrete enough to be meaningfully accepted or rejected:

```text
what will change
why it should change
which current authority/Requirement/behavior it serves
which owners/files/implementation areas are affected
whether durable Requirements/Decisions change
expected proof
material risks/problems/trade-offs
known Evolution consequences
what will intentionally remain unchanged
```

Do not ask the user to make a design decision that AI can narrow through analysis first.

Proposal granularity is situational and user-driven.
AI should not force one universal amount of pre-planning.
It follows the user's chosen depth while making meaningful commitment increases visible.


Where one approach is clearly strongest and alternatives are not materially competitive,
AI may recommend one approach directly and explain the important trade-offs.

Where several **real competing candidates** exist, AI should present them even when it prefers one:

```text
Option A
- how it satisfies the need
- benefits
- risks / problems / downsides
- follow-up questions
- proof implications
- Evolution implications

Option B
- same

Recommended option:
<AI recommendation + why>
```

Do not manufacture alternatives merely for symmetry.
Show alternatives when they are genuinely plausible and choosing between them changes meaningful trade-offs.

## Change proposal workflow

```text
inspect current authority / implementation / evidence
→ identify needed or candidate change
→ evaluate through Behavior/Implementation relevance lens
→ identify affected owners and Requirement impact
→ determine whether competing solutions exist
→ produce concrete proposal
→ surface material questions/risks/problems
→ request user confirmation
→ only after confirmation execute the approved change
→ report exact executed delta + proof
```

If the approved scope becomes invalid during execution because new evidence reveals a materially different change,
stop and return with a revised proposal rather than silently expanding scope.



## Derived/navigation synchronization after approved semantic changes

After a semantic/product/methodology change is approved, AI should inspect derived/navigation owners
that may now be stale, such as:

```text
README navigation
slices.md
domain/README.md
behavior-realization maps
Evolution maps where relationship text is derived
generated traces
testing navigation
```

AI should **propose** the corresponding synchronization rather than silently editing it.

The proposal should distinguish:

```text
required synchronization of already approved meaning
vs
new semantic change discovered while synchronizing
```

Even purely derived synchronization waits for user confirmation before execution.
If synchronization exposes new semantic inconsistency, return with a new proposal rather than “fixing” it implicitly.

---


---

## Replacement package proposal boundary

A replacement package is an **execution artifact**, not the place where unapproved durable meaning is introduced.

For any proposed Requirement/Decision/methodology/product-semantic change:

```text
analyze
→ show proposal/delta to user
→ receive approval
→ only then place the approved change into replacement-files/PACKAGE contents
```

Do not create a package whose normative owner files already contain unapproved Requirement or semantic changes
and then treat “Apply Package” as the first approval opportunity.

A package may include:
- already approved semantic/durable changes;
- already approved code/proof realization changes;
- already approved derived/documentation synchronization.

If package preparation reveals an additional important change that was not approved,
stop package construction and propose that change first.

---

