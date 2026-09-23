# IDTSPE Complete Picture v5 — Full Flow, Lens Map, Rules, Q/R/P and Evidence

Status: current clean conceptual model after consistency audit  
Working identifier: `IDTSPE`  
Repository mutation: none  
Current authority status:
- `SELECTED MODEL` = selected conceptual direction from the discussion;
- `CURRENT REPO CONFIRMED` = already supported by current repository owners;
- `OPEN` = terminology/representation/ownership still requires a future planning decision.

This file is intended to replace `idtspe-coherent-model-v4.md` as the current complete planning capture.

---

# 0. One-Screen Summary

```text
TRIGGER
↓
0. Resolve route / Mode / permissions / applicable methodology packs
↓
1. Resolve or reuse the underlying NEED
↓
2. Use or design a PLANNING TOPOLOGY when the problem is multi-stage
↓
3. Discover/select TARGET / SCOPE
   → Target-Scope Decision
↓
4. Resolve typed SOURCES OF TRUTH
↓
5. EARLY PRIOR-DECISION CHALLENGE SCAN
   → reuse trusted prior Decisions
   → or reopen the narrowest invalid prior choice
↓
6. Discover/select RESOLUTION QUESTION SET
   → Question-Set Decision
↓
7. Select applicable LENSES / Rules for each active RQ
↓
8. Generate/reuse IDEAS / VARIANTS / PATTERNS
↓
9. Evaluate Ideas:
   Lenses
   → evaluation findings
   → concrete Q/R/P
   → Evidence needs / Evidence
   → projected impacts
↓
10. Select ANSWER DECISION
    → residual Decision Q/R/P
    → revalidation hooks
    → retained alternatives/fallbacks
↓
repeat 8–10 for active RQs in dependency/order
↓
11. INTEGRATE ALL DECISIONS
    + composition review against old/new Decisions
↓
12. Build TARGET DECISION STATE
↓
13. Project complete TARGET through Target Contract
    → Target Projection Conformance validation
↓
14. Aggregate dependency / WEUC / proof / handoff impact
↓
15. PRE-UPDATE, only when explicitly invoked
    → exact realization plan
    → still plan-only
↓
16. REALIZATION, only when separately authorized
↓
17. Capture PRACTICAL / TEST / REVIEW / WEUC EVIDENCE
↓
18. DECISION REVALIDATION
    → ACCEPT
    → LOCAL CORRECTION
    → add mitigation/additional Decision while preserving current answer
    → reopen Answer
    → reopen RQ Set
    → reopen Target/Scope
    → explicit upstream Source correction
↓
19. Persist/reconcile current Target, Decisions, Q/R/P, Evidence, WEUC
    → trusted Sources for the next IDTSPE
```

Central optimization:

```text
do expensive thinking once at the right planning stage
→ make the result a trustworthy Source of Truth
→ reuse it later with confidence
→ reopen only when a concrete challenge justifies it
```

---

# 1. What IDTSPE Is

**SELECTED MODEL**

IDTSPE is a reusable closed-loop planning and target-evolution engine.

It is not:

- an Application-only methodology;
- an Idea-only workflow;
- a fixed Need → Scenario → Domain → Slice ladder;
- a single monolithic checklist;
- a second semantic owner over every Target type.

It is:

```text
generic planning mechanics
+
Target-family semantics
+
typed Sources
+
applicable reusable Lenses
+
Q/R/P / Evidence / Decisions
+
validation / guards / rules
+
realization / evidence loop
```

A concrete Target family supplies its own:

```text
Target Contract
Source requirements
RQ archetypes when useful
Lens presets
Patterns
proof expectations
handoffs
```

---

# 2. Status Of The Main Concepts

| Concept | Status | Meaning |
|---|---|---|
| Need as semantic root | SELECTED MODEL, partly repo-supported | Trigger/Idea is not the root; current `UC-PLAN-REALITY` supports reality grounding, but formal Need owner remains open. |
| Trigger | SELECTED MODEL | Entry event; not automatically semantic truth. |
| Target / Scope | SELECTED MODEL | Bounded result/problem of one IDTSPE instance. |
| Planning Topology | SELECTED MODEL / OPEN representation | Pre-designed or one-off map of Target stages/Sources/order. SDS/UCDS already exhibit this behavior. |
| Idea | CURRENT REPO CONFIRMED | One possible answer to a Need/Problem/Question/answer-seeking concern. |
| Resolution Question (`RQ`) | SELECTED MODEL / OPEN name/storage | Question whose candidate answers are Ideas/Variants and whose selected answer becomes Decision. |
| Decision | CURRENT REPO CONFIRMED + extended use | Selected choice with trace/rationale; future model uses it at three choice levels. |
| Q/R/P | CURRENT REPO CONFIRMED | Shared concern semantics already canonical. |
| Concern Group | CURRENT REPO CONFIRMED | Mixed Q/R/P sharing one resolution surface. |
| Evidence | CURRENT REPO CONFIRMED conceptually | Current concern/architecture workflows already use answer/evidence/tests/runtime findings. |
| Source Contract | SELECTED MODEL | Typed explicit context contract; exact repository schema open. |
| Lens | SELECTED MODEL built from existing “lens/check” behavior | Reusable planning evaluation dimension. |
| Validator | SELECTED MODEL | Checks methodology/process/output conformance. |
| Guard | SELECTED MODEL | Protects hard permission/authority invariant. |
| Rule | SELECTED MODEL | Other reusable methodology invariant/process rule. |
| Pack | SELECTED MODEL | Reusable composition of Lenses/Validators/Guards/Rules. |
| WEUC | CURRENT REPO CONFIRMED + extended loop | Current repo has Workspace UC/change-pressure model; full projected→accepted→observed→reconciled loop is target-state refinement. |
| Pre-Update | CURRENT REPO CONFIRMED | Explicit plan-only file/repository transition planning. |
| Target Projection Conformance Validator | SELECTED MODEL | Future reusable check that output/file representation fully reflects selected Target. |
| Decision Revalidation Readiness Validator | SELECTED MODEL, strongly aligned with existing `Reconsider When` / `Revisit Trigger` | Checks future reconsideration hooks on residual Q/R/P. |

---

# 3. Core Semantic Distinctions

## 3.1 Trigger ≠ Need

```text
Trigger:
  "integrate Service X"

Need:
  <why the user/system actually needs a different real-world result>
```

The Trigger can be:

- proposed solution;
- bug;
- test result;
- runtime evidence;
- new Idea batch;
- deadline;
- returned files;
- architecture finding.

The Trigger starts the engine.

It does not automatically define the Target.

## 3.2 Need ≠ Target

Need:

```text
why anything should change
```

Target:

```text
which bounded result this planning instance will produce
```

A single Need may require several sequential Targets.

## 3.3 Target ≠ file

A Target is semantic.

It may later be represented in:

- one file;
- several owner files;
- registry + owner files;
- generated projections.

Physical layout is downstream.

## 3.4 Source ≠ Lens

```text
Source
= what do we know/trust/observe?

Lens
= through which evaluation dimension should we inspect a choice?
```

Example:

```text
Current WEUC State
= Source

Workspace Evolution / WEUC Lens
= evaluation method

Projected WEUC Impact
= analysis result

Observed WEUC Evidence
= later Source
```

## 3.5 Lens ≠ Q/R/P

Lens:

```text
"evaluate recurring Workspace work"
```

Concrete result:

```text
R:
  Idea A makes add-provider touch 7 owners
```

The Lens is reusable.

The Q/R/P belongs to the concrete planning subject.

## 3.6 Evidence ≠ Q/R/P ≠ rationale

```text
Evidence:
  actual add-provider change touched 7 owners

P/R:
  this architecture creates excessive recurring work cost

Evaluation/rationale:
  Idea B is preferable because its change path is local
  and current evidence shows this operation is frequent
```

No first-class `Argument` entity is selected.

Positive/negative reasoning can remain in Idea evaluation and Decision rationale unless a real persistence/query use case appears.

## 3.7 Proof ≠ Lens

Lens:

```text
Verifiability / Observability / Operability
```

It asks whether a candidate can be verified/observed/diagnosed/operated.

Planned proof:

```text
Evidence plan / test plan / acceptance plan
```

Executed proof:

```text
Evidence
```

---

# 4. Concern Ownership — Three Different Meanings

This distinction is required for consistency with current repository semantics.

## 4.1 Semantic owner

**CURRENT REPO CONFIRMED**

Generic Q/R/P / Concern Group / Decision trace semantics are owned by:

```text
planning/documentation/planning-concerns-and-decisions-model.md
```

IDTSPE does not create a parallel Q/R/P ontology.

## 4.2 Concern subject / attachment

**SELECTED MODEL**

The concrete thing challenged/monitored:

```text
Target/Scope Candidate
Target-Scope Decision
RQ / Question-Set Candidate
Question-Set Decision
Idea / Variant
Answer Decision
```

Earlier shorthand:

```text
Idea owns Q/R/P
Decision owns residual Q/R/P
```

should be understood as:

```text
concern is attached to / challenges / monitors that Idea or Decision
```

not as semantic-methodology ownership.

## 4.3 Detailed storage owner

**CURRENT REPO CONFIRMED principle**

The full concern body should have one detailed storage location.

Other Ideas/Targets/Decisions reference it.

Do not maintain duplicate full concern mirrors.

---

# 5. Typed Source Contract

**SELECTED MODEL**

A material IDTSPE instance resolves typed Sources.

## `TRIGGER_SOURCE`

Why this invocation exists.

## `IDEA_SOURCE`

Candidate answer meaning.

Optional.

## `CANONICAL_SEMANTIC_SOURCE`

Current authoritative semantic truth.

Examples:

- Need / Current Reality;
- Real-Life Scenario;
- Application Scenario;
- Behavior/DATA;
- Requirement;
- Domain owner/invariant;
- Workspace UC;
- Documentation UC;
- current workflow/model/template/Direction;
- accepted current Target/Decision when it is the reusable authority for the next stage.

## `CURRENT_TARGET`

Existing baseline for INTEGRATE.

## `PRACTICAL_EVIDENCE`

- implementation;
- tests;
- Coverage;
- runtime;
- ReviewDiff;
- acceptance;
- incidents;
- observed maintenance/change cost.

## `ARCHITECTURE_EVOLUTION_SOURCE`

- Workspace UCs;
- WEUC;
- understanding/change/verification/runtime paths;
- Change Pressure;
- Change Axes;
- Architecture State/Decisions;
- observed work cost.

## `DELIVERY_CONSTRAINT`

- deadline;
- milestone;
- capacity;
- release order;
- external dependency;
- operational constraint.

Delivery constraints are Sources, not peer Lenses.

## `PLANNING_STATE_SOURCE`

- prior Decisions;
- residual Q/R/P;
- Concern Groups;
- saved/fallback/deferred Ideas;
- carry-forward findings.

## `DEPENDENCY_SOURCE`

- semantic dependencies;
- owner relations;
- Reference Objects;
- bounded review dependencies;
- whole-file Review Dependencies;
- ordinary links;
- generated dependency projections.

---

# 6. Source Record

Conceptual:

```text
Source:
  identity/path
  role
  relationToTarget
  authority:
    canonical | evidence | constraint | planning-state | projection
  requiredness:
    required | proportional | optional
  freshness:
    current-required | best-available | historical-evidence
  reviewObligation:
    none | explicit-review-dependency | reference-object-dependency
  reason
```

Exact repository syntax remains OPEN.

---

# 7. Source Trust Rule

No mandatory persisted enum such as `TRUSTED_CURRENT` is selected.

Default:

```text
current canonical Source/Decision
+ no concrete challenge
→ reuse confidently
```

Challenge signals:

- residual Q/R/P;
- new Evidence;
- WEUC finding;
- changed constraint;
- changed canonical Source;
- new Decision composition;
- supersession.

Then:

```text
reopen only the narrowest affected prior choice/owner
```

---


# 7A. Target-Specific Justification Lineage

**SELECTED MODEL**

Every material Target should be able to answer:

```text
Why does this Target exist?
Which accepted higher-level Need/Decision/Source justifies it?
```

Generic IDTSPE does **not** hard-code one universal lineage.

The Target family / Planning Topology / Source Contract defines the relevant upstream chain.

Conceptual generic relation:

```text
Need
→ accepted higher-level planning result(s)
→ current Target
```

Application SDS example:

```text
Need
→ Real-Life Scenario
→ Application Responsibility
→ Application Scenario
→ Behavior / DATA
→ Domain where justified
→ Slice
→ Realization
```

Documentation/Workspace example may be much shorter:

```text
Need
→ Workspace / Documentation UC
→ methodology/owner Target
→ file/artifact realization
```

A small one-off Target may have:

```text
Need
→ Target
```

## Default use

If the lineage is current and no Evidence/Q/R/P challenges it:

```text
reuse it
```

Do not physically reread/replan every ancestor merely to prove it exists.

## Reverse trace

Reverse traversal is challenge-driven:

```text
current Trigger/Evidence
↓
which assumption/Decision does it challenge?
↓
which upstream Source owns that meaning?
↓
is that Source still trustworthy?
```

Only when needed:

```text
Target
↑
relevant prior Source/Decision
↑
...
↑
Need
```

This preserves:

```text
root-first semantic justification
+
proportional physical traversal
```

## Necessity / alternative check

At every choice level, L1 may ask:

```text
why does this candidate exist?
is this level/choice actually required?
can a trusted existing route satisfy the same higher-level Need?
is there a cheaper/safer alternative?
```

But this is proportional and does not reopen trusted ancestors without a concrete reason.

---

# 8. Engine Modes

## CREATE

```text
Current Target = none
```

Build a complete initial Target from Need + Sources + Decisions.

Previously accepted upstream Sources are still reused.

## INTEGRATE

```text
Current Target exists
```

Default:

```text
preserve existing valid meaning
```

Output:

```text
Projected Updated Target
Delta From Current
Preserved Existing Meaning
```

Change current meaning only when justified by:

- changed upstream Source;
- accepted replacing Decision;
- disproving Evidence;
- owner conflict;
- invalidating constraint;
- explicit supersession.

## PLAN TARGET

Planning without requiring a new Idea Source.

## SHOW CURRENT

Read-only rendering of current canonical Target.

Must not manufacture:

- new Ideas;
- new projected state;
- new Q/R/P merely because it was shown.

## EVIDENCE-DRIVEN RECONCILIATION

Entry from actual implementation/test/runtime/review evidence.

Evidence is not forced into an Idea.

---

# 9. Three Generic Choice Lifecycles

## Level 1 — Target / Scope

```text
Target/Scope candidates
→ Q/R/P
→ Target-Scope Decision
→ residual Q/R/P
```

## Level 2 — Resolution Question Set

```text
RQ candidates / question-set variants
→ Q/R/P
→ Question-Set Decision
→ residual Q/R/P
```

## Level 3 — Answer / Idea

```text
Ideas / Variants / Patterns
→ Q/R/P
→ Answer Decision
→ residual Q/R/P
```

Same lifecycle at each level:

```text
candidate
→ evaluate
→ decide
→ preserve residual reconsideration state
→ later Evidence
→ reaffirm/reopen
```

---

# 10. Q/R/P Semantics

## Q — Question

A material unknown that can change planning.

Good `Q`:

```text
unknown
why material
Evidence that can answer it
expected source
expected time/event
impact of possible answers
```

Residual Decision Q additionally explains:

```text
which answer confirms
which weakens
which reopens
which invalidates
```

## R — Risk

A material future adverse possibility.

Good `R`:

```text
risk hypothesis
why material
leading indicators
Evidence source
likelihood/confidence
impact
horizon
reversibility
threshold/event
reopen target
fallback Idea when useful
```

## P — Problem

A known current adverse state.

Good `P`:

```text
problem
current impact
why accepted/tolerated now, if applicable
measurement
workaround/containment
tolerance threshold/deadline/event
remediation/reopen action
```

---

# 11. Q/R/P Admission Rule

Do not create Q/R/P for every thought.

Before durable Q/R/P:

```text
candidate finding
↓
can a concrete subject/affected meaning be named?
↓
is it material?
↓
is it unresolved/adverse enough to affect planning?
```

If no:

```text
keep as:
  Evidence
  evaluation finding
  Idea refinement
  obvious integrated consequence
  context
```

This preserves current repository's concern admission-gate principle.

---

# 12. Concern Groups

**CURRENT REPO CONFIRMED**

Group mixed Q/R/P when they materially share one resolution surface:

```text
same Decision
same RQ
same investigation/Evidence
same owner/boundary
same dependency contract
```

Example:

```text
CG-INTEGRATION
├─ Q: API capability unknown
├─ R: provider lock-in
├─ P: duplicate authority exists
└─ R: recurring add-provider work may spread
```

Group does not replace individual concern ownership/attachment.

---

# 13. Minimal Reusable Methodology Module Types

**SELECTED MODEL**

Keep public taxonomy small:

```text
Lens
Validator
Guard
Rule
Pack
```

## Lens

Evaluates planning choices.

## Validator

Checks process/result conformance.

## Guard

Protects hard invariant/permission/authority boundary.

## Rule

Other reusable process/methodology invariant.

## Pack

Reusable composition.

Do not create separate public first-class types for every transition/persistence/derivation nuance.

---

# 14. Planning Lens Catalog

Current peer Lens set:

```text
CORE / NEAR-CORE

L1 Need / Value / Scope
L2 Authority / Source-of-Truth / Reuse
L3 Uncertainty / Assumption / Reversibility

CONTEXTUAL

L4 Dependency & Change Impact
L5 Workspace Evolution / WEUC
L6 Verifiability / Observability / Operability
L7+ specialized domain-quality Lenses
```

Not peer Lenses:

```text
Revalidation
Target projection completeness
Delivery constraints
Proof
Pre-Update
```

---

# 15. L1 — Need / Value / Scope Lens

## Purpose

```text
Are we solving a real/worthwhile Need
through the right bounded Target
and useful Resolution Questions?
```

## Inputs

- Trigger;
- current/reused Need;
- Current Reality;
- current Target;
- Planning Topology;
- alternative existing capabilities;
- constraints;
- relevant Evidence.

## At Need grounding

Ask:

```text
What real outcome is needed?
What is current reality/gap?
Why does it matter?
What Evidence supports that Need?
Is the Trigger only a proposed solution?
Is this worth solving now?
```

## At Target/Scope discovery

Ask:

```text
What bounded result should this IDTSPE produce?
Can existing Target be reused/changed?
Do we need a new Target?
Is scope too broad?
Is scope too narrow?
Are independent problems mixed?
What should be deliberately deferred/non-goal?
Will this output be useful as a Source for later stages?
```

## At RQ discovery

Ask:

```text
Does this question materially help produce the Target?
Is it really necessary now?
Is it subordinate to another question?
Does it smuggle in an unjustified solution?
Should it be split/merged/deferred/delegated?
```

## At Idea evaluation

Ask:

```text
Does this Idea actually produce the desired effect?
Is there a simpler/better route?
Does an existing solution already satisfy the Need?
Is the Idea redundant with another Idea?
Does its value justify its cost/complexity?
```

## Typical Q/R/P generated

```text
Q:
  do we actually need this capability now?

R:
  current scope may lock us into a solution before upstream Need is clear

P:
  proposed Target duplicates an existing reusable capability
```

## Output

- scope/effect findings;
- candidate Q/R/P;
- alternative Target/RQ/Idea suggestions;
- Target-Scope / Question-Set / Answer Decision rationale.

---

# 16. L2 — Authority / Source-of-Truth / Reuse Lens

## Purpose

```text
Are we planning from the correct authoritative meaning
and reusing accepted work instead of duplicating or re-deriving it?
```

## Inputs

- Source Contract;
- current owners;
- Current Target;
- prior Decisions;
- dependency relations;
- generated projections/history/examples.

## At Need/Target/Source stages

Ask:

```text
Who owns this meaning?
Is this Source canonical or only Evidence/projection/history?
Is current accepted work reusable?
Has it been superseded?
Are we reopening it without a concrete challenge?
```

## At RQ discovery

Ask:

```text
Is this question already answered by a trusted Decision?
Does another owner already own this choice?
Would this RQ duplicate an existing planning surface?
```

## At Idea evaluation

Ask:

```text
Does the Idea duplicate semantic authority?
Does it create a second owner?
Does it copy upstream meaning downstream?
Can an existing reusable mechanism be used instead?
Does the Idea preserve derivation direction?
```

## At Target integration

Ask:

```text
Did any new Decision silently redefine an upstream owner?
Are projections being mistaken for authority?
Did we preserve unaffected accepted meaning?
```

## Typical Q/R/P

```text
P:
  two files now claim canonical ownership of the same rule

R:
  downstream Slice representation may drift from Scenario authority

Q:
  which owner should hold this cross-cutting Decision?
```

## Output

- trusted Source set;
- reuse route;
- authority findings;
- owner/handoff requirements;
- candidate Q/R/P.

---

# 17. L3 — Uncertainty / Assumption / Reversibility Lens

## Purpose

```text
Before choosing:
what do we not know,
what assumptions are we making,
what Evidence is worth acquiring,
and how expensive is being wrong?
```

This is **prospective**.

It is not revalidation.

## Inputs

- candidate Target/RQ/Idea;
- available Evidence;
- assumptions;
- constraints;
- timing/horizon;
- possible experiments/prototypes.

## Ask

```text
Which claim is an assumption rather than established Source?
How confident are we?
Could the answer materially change ranking/selection?
When will better Evidence become available?
Can we cheaply test/prototype first?
How reversible is the choice?
What is migration/reversal cost?
What is the cost of delaying?
What is the cost of choosing too early?
Can we keep the option open?
```

## At Target/Scope

Example:

```text
R:
  choosing a narrow Target now may force a later redesign
  because a material upstream fact is still unknown
```

## At RQ set

Example:

```text
Q:
  we cannot know whether provider selection is material
  until the external contract is confirmed
```

## At Idea

Example:

```text
Q:
  can Service X support resumable uploads?

R:
  custom abstraction may be costly to reverse
  if the provider API changes next quarter
```

## Output

- Q/R/P;
- Evidence needs;
- prototype/research suggestions;
- reversibility findings;
- Decision rationale.

---

# 18. L4 — Dependency & Change Impact Lens

## Applicability

Use when the Target/Idea changes a structured system with meaningful dependency/consumer/change relations.

Examples:

- repository;
- documentation;
- codebase;
- API;
- data/schema;
- OOP/modules;
- file system;
- integration graph.

## Purpose

```text
What dependency structure and concrete change impact does this option create?
```

## Dependency facet

Ask:

```text
Which owners/components depend on which?
What dependency direction changes?
Does coupling increase/decrease?
Are independent change paths being tied together?
Which consumers need compatibility/migration/review?
```

## Change Surface facet

Inspect affected:

```text
files / artifacts
modules / packages
classes / interfaces
methods / functions
schemas / messages
persisted state
tests / fixtures
generated projections
runtime components
```

## Freshness/review facet

Ask:

```text
Which semantic dependents need actual review?
Which relation is only navigation?
Which needs Reference Object exact synchronization?
Which needs bounded dependent-fragment review?
Which needs whole-file Review Dependency?
```

## Blast-radius facet

Ask:

```text
How many owners/consumers are affected?
What synchronized edits are required?
What migration/rollback surface exists?
```

## Typical Q/R/P

```text
P:
  one change currently requires synchronized edits in 5 owners

R:
  extracting this abstraction couples two independently evolving modules

Q:
  which consumers require compatibility support during migration?
```

## Output

- dependency graph subset;
- change surface;
- consumer impact;
- freshness/review obligations;
- migration/rollback concerns;
- projected change impact.

---

# 19. L5 — Workspace Evolution / WEUC Lens

## Applicability

Use when the thing being designed is itself a Workspace/tool/codebase/documentation system used repeatedly to perform work.

High relevance:

- codebase architecture;
- documentation architecture;
- repository tooling;
- developer workflows;
- planning tools.

Not a universal Lens for every real-world decision.

## Purpose

```text
How does this option affect important recurring work in the Workspace?
```

## Input Source

```text
Current WEUC State
Workspace UCs
contextual WEUC instances
Understanding Paths
Change Paths
Verification Paths
Runtime/Operations/Debugging Paths
Change Pressure
Change Axes
Architecture State/Decisions
observed work cost
```

## Evaluate each serious Idea/Decision

### Understanding / discovery

```text
How much must a maintainer know?
Is the canonical owner easy to find?
How many files/concepts must be loaded into working context?
```

### Mutation / evolution

```text
How local is a recurring change?
How many owners must be touched?
Are synchronized edits required?
Does the choice create a hot path?
```

### Verification / diagnosis

```text
How much proof/review is required after change?
How expensive is debugging?
```

### Runtime / operations

```text
What operational path/cost/failure complexity changes?
```

### Frequency / expected value

```text
How often is this work expected?
What is confidence/horizon?
Is current-work overlap high?
```

### Preparation vs deferral

```text
What does preparing now cost?
What is Architectural Tax if future work never comes?
What is deferred/rework cost if we wait?
```

### Change Pressure / Axes

```text
Which recurring/future change dimensions cross this boundary?
```

## Programming principles

DRY/SRP/OCP/etc may detect a problem signature or candidate Pattern.

Do not accept the Pattern because it is elegant.

Evaluate actual recurring work through WEUC.

Example:

```text
DRY suggests extraction
↓
WEUC asks:
  do these sites really change together?
  does extraction reduce synchronized edits?
  or couple independent paths?
```

## Outputs

```text
Projected WEUC Impact
work-cost findings
Architecture Pressure / Change-Axis findings
Q/R/P
architecture Idea refinements
Decision rationale
```

After Decision:

```text
Accepted WEUC Impact
```

After realization:

```text
Observed WEUC Evidence
→ WEUC State Reconciliation
```

---

# 20. L6 — Verifiability / Observability / Operability Lens

## Applicability

Use when correctness/failure/state must be demonstrably checked or safely operated.

Especially useful for:

- implementation Slices;
- integrations;
- runtime workflows;
- critical documentation/tooling automations;
- architecture with difficult failure modes.

## Purpose

```text
If we choose this Idea,
can the resulting state/behavior be verified,
observed,
diagnosed
and operated at acceptable cost?
```

## Verifiability

Ask:

```text
What proves success?
What proves failure?
Can positive behavior be tested?
Can negative/no-mutation guarantees be tested?
Are important invariants observable?
Can the boundary be verified independently?
```

## Observability

Ask:

```text
Can we tell what state the system is in?
Can important failures be detected?
Is Evidence available at the right boundary?
```

## Diagnosability

Ask:

```text
If something fails, can we determine why?
What context/logs/state are needed?
```

## Operability

Ask:

```text
Can a human/tool operate and recover the result safely?
What manual/operational burden exists?
What rollback/recovery path exists?
```

## Proof cost

Ask:

```text
Does this architecture make verification disproportionately expensive?
Would another boundary make proof simpler?
```

## Outputs

- Q/R/P;
- proof/Evidence requirements;
- test/acceptance plan handoff;
- observability/diagnosis requirements;
- Decision rationale.

Executed proof/test/observation later becomes Evidence.

---

# 21. Specialized Lenses

Examples:

```text
Security
Privacy
Performance
Reliability
Safety
Compliance
UX / Accessibility
domain-specific correctness
```

Each specialized Lens should define:

```text
purpose
appliesWhen
prompts
Evidence needs
possible risk/problem archetypes
```

Do not make all specialized Lenses universal defaults.

---

# 22. Lens Selection

Lens Set is built proportionally from:

```text
core/near-core candidates
+ Target-family preset
+ Planning Topology stage
+ RQ type
+ environment type
+ detected risk/problem archetype
+ current Sources/Evidence
+ explicit user/agent selection
```

A valid result:

```text
Lens checked
→ no material concern
```

is acceptable.

Do not create concerns merely to justify having selected a Lens.

---

# 23. Reusable Risk/Pattern Knowledge

A reusable methodology library may store:

```text
Problem/Risk Situation Archetype
applicability conditions
observable signals
RQ archetype
candidate Patterns/Ideas
recommended Lenses
known WEUC effects
counterexamples
Evidence expectations
failure modes
```

Programming principles fit here well.

Example:

```text
risk situation:
  recurring change touches many synchronized owners

possible RQ:
  how should extension responsibility be reorganized?

candidate Patterns:
  registry
  adapter/plugin
  configuration
  intentionally keep duplication

recommended Lenses:
  Dependency & Change Impact
  WEUC
  Uncertainty/Reversibility
  Verifiability
```

Patterns remain candidate Ideas.

---

# 24. Minimal Validators

Validators check command/process/output correctness, not semantic preference.

## V1 — Source Contract Validator

Checks:

- required/proportional Sources considered;
- actual Sources named;
- authority typed correctly;
- Current Target present in INTEGRATE;
- Evidence not mistaken for semantic owner;
- projections/history not substituted for canonical truth;
- missing required Source surfaced.

## V2 — Q/R/P Lifecycle Validator

Checks:

- concern subject/attachment correct;
- candidate concern stays attached to candidate;
- unresolved material concern follows selected Decision;
- resolved concern does not remain falsely active;
- Lens prompt is not stored as ownerless concrete concern.

## V3 — Decision Persistence Validator

Checks:

- material selected choice is retained;
- rationale/provenance retained when useful;
- supersession explicit;
- residual Q/R/P retained;
- Evidence relations retained;
- useful fallback Ideas retained;
- accepted WEUC impact retained when applicable.

## V4 — Decision Revalidation Readiness Validator

Runs on accepted Decision with material residual Q/R/P.

Checks future helper contract described in Section 31.

## V5 — Evidence Trace Validator

Checks:

- Evidence identity/source preserved;
- relation to Q/R/P/Idea/Decision visible;
- Evidence not silently rewritten as semantic authority;
- Evidence Contract updated/closed when evidence arrives.

## V6 — Target Projection Conformance Validator

Checks:

```text
Target Decision State
+ Current Target for INTEGRATE
+ Target Contract
vs
Projected/rendered/saved Target
```

Ensures:

- selected meaning not omitted;
- valid existing meaning preserved;
- required Target sections/owners represented;
- non-goals/delegated/later/outside state preserved;
- required proof/handoffs represented;
- Idea-local view not substituted for full Target.

This is command/output correctness, not Target semantic correctness.

## V7 — WEUC Loop Validator

When applicable:

```text
Current WEUC State reviewed?
Projected WEUC Impact produced?
Accepted impact retained?
Observed Evidence collected when available?
WEUC State reconciled?
```

Valid:

```text
checked → no material WEUC impact
```

## V8 — Dependency Relation Validator

Checks that relation types are not conflated.

## V9 — Pre-Update Conformance Validator

Checks current/target Pre-Update contract when explicitly invoked.

## V10 — Mode Separation Validator

Protects:

```text
SHOW CURRENT
CREATE
INTEGRATE
REVIEW
PRE-UPDATE
REALIZATION
```

from accidental semantic/permission merging.

## V11 — Rule Set Coverage Validator

Checks whether required Lens/Validator/Guard/Rule was accidentally omitted based on:

```text
Mode
Target Type
Planning Topology
environment
Sources
command route
```

---

# 25. Minimal Guards

Keep Guard category only for hard boundaries.

## Permission Guard

Examples:

```text
plan-only → no mutation
review-only → no mutation
package build → no local apply unless explicitly authorized
mutation → no automatic commit/push
```

## Semantic Authority Guard

Examples:

```text
downstream Target must not silently redefine upstream owner
projection/index must not become semantic authority
implementation evidence must route correction to owner
```

Other correctness checks should usually be Validators or ordinary Rules rather than new Guards.

---

# 26. Ordinary Core Rules

Examples:

```text
INTEGRATE preserves valid current meaning by default

Idea accepted
→ selected answer becomes Decision

material unresolved candidate Q/R/P
→ attach to accepted Decision as residual state

semantic dependency
≠ automatically Review Dependency

delivery constraint
→ may alter order/split/staging
≠ silently erase semantic Need

new Evidence challenge
→ reopen narrowest planning level

corrected upstream Source
→ review actual dependents only
```

---

# 27. Rule Packs

Possible composition:

```text
IDTSPE Core Pack
Target-family Pack
Workspace Pack
Documentation/Repository Pack
Specialized quality Pack
Command Permission Pack
```

## Core Pack candidate

```text
L1 Need / Value / Scope
L2 Authority / Source-of-Truth / Reuse
L3 Uncertainty / Assumption / Reversibility

Source Contract Validator
Q/R/P Lifecycle Validator
Decision Persistence Validator
Decision Revalidation Readiness Validator
Target Projection Conformance Validator
Mode Separation Validator

Permission/Semantic Authority Guards when route requires
core Rules
```

## Workspace Pack

```text
L4 Dependency & Change Impact
L5 Workspace Evolution / WEUC
L6 Verifiability / Observability / Operability

WEUC Loop Validator
Dependency Relation Validator
workspace-specific Rules
```

Target family may add/remove lenses proportionally.

---

# 28. FULL FLOW — STEP 0: Route, Mode And Methodology Composition

## Goal

Establish what operation is being performed and what it is allowed to do.

## Inputs

```text
user Trigger
command/UC route when any
current Target family
current repository governance
```

## Actions

1. Resolve operation:

```text
SHOW CURRENT
CREATE
INTEGRATE
PLAN TARGET
EVIDENCE-DRIVEN RECONCILIATION
PRE-UPDATE
REALIZATION
REVIEW
```

2. Resolve Target family/preset if known.

3. Resolve permission boundary.

4. Compose initial Rule Packs.

5. Determine whether the operation is material enough for full IDTSPE or only a mechanical/read-only route.

## Lenses

Normally none yet.

If route itself embeds a questionable solution/Target assumption, L1 may start immediately.

## Validators / Guards

```text
Mode Separation Validator
Rule Set Coverage — preliminary
Permission Guard
```

## Output

```text
Invocation Contract
Mode
Target-family context
Permission mode
initial Rule Set
```

---

# 29. STEP 1: Need Grounding / Reuse

## Goal

Know why the planning work exists without unnecessarily reopening established Need/reality.

## Inputs

- Trigger;
- existing Need/Current Reality Sources;
- current accepted upstream Decisions;
- practical Evidence if Trigger came from reality.

## Actions

```text
Trigger
↓
is relevant Need already established/current?
  yes → reuse
  no → derive/clarify Need
↓
does current Evidence challenge established Need?
  no → preserve
  yes → explicit upstream Need/Reality review
```

## L1 — primary

Use Need/Value/Scope Lens:

```text
what real-world/useful result is needed?
what is current gap?
why material?
is Trigger only a proposed implementation?
is this still worth solving?
```

## L2 — supporting

```text
which owner/source currently owns Need/reality?
is this current or only historical/projection?
```

## L3 — supporting when uncertain

```text
which Need assumptions are weak?
what Evidence is missing?
```

## Q/R/P subject

Need/Target framing candidate or existing upstream Decision when challenged.

## Output

```text
Need Basis
Need Source(s)
Need-related Q/R/P when material
```

---

# 30. STEP 2: Planning Topology Selection / Design — Conditional

## Goal

For a complex multi-stage Need, decide how to split planning into reusable Target stages before doing all detailed work.

## Skip when

- one small Target is obvious;
- an existing preset/topology already fits and is not challenged.

## Inputs

- Need;
- existing topology/preset;
- expected complexity;
- Sources;
- Workspace/architecture context when relevant.

## Actions

```text
reuse existing topology?
adapt existing topology?
design one-off topology?
design reusable topology?
```

Define:

```text
Target stages
rough order
Source inputs
Target outputs
which outputs become Sources of Truth
default Lens Packs
handoffs
major uncertainty that should be resolved early
```

## L1 — primary

```text
what decomposition minimizes later rework?
are stages independently useful?
are scopes too broad/narrow?
what uncertainty must be resolved early?
```

## L2 — primary

```text
which existing planning system/preset can be reused?
which stage already has trusted Sources?
```

## L3 — primary for uncertain topology

```text
which stage boundary is based on weak assumptions?
can we defer commitment?
```

## L4 — contextual

Use when dependency topology itself drives stage boundaries.

## L5 — contextual

Use when stage order should minimize recurring Workspace/architecture cost or early architecture uncertainty.

## L6 — contextual

Use when deliverable/testable boundaries should drive stage decomposition.

## Output

```text
Planning Topology / selected stage
or
explicit decision that no reusable topology is necessary
```

---

# 31. STEP 3: Target / Scope Discovery

## Goal

Choose the bounded result of this IDTSPE instance.

## Inputs

- Need;
- selected topology stage;
- Current Target if any;
- existing reusable Targets;
- constraints;
- relevant Sources.

## Candidate routes

```text
reuse current Target
change current Target
create new Target
split into several Targets
merge with another Target
defer/delegate a part
select another Target Type
```

## L1 — primary

Inside L1 ask:

```text
what exact problem/goal belongs to this stage?
what Target Result should exist?
what boundary/non-goals?
is Target useful/reusable downstream?
is there a better route?
```

## L2 — primary

```text
does a current Target already own this result?
can it be extended instead of duplicated?
```

## L3 — primary when uncertainty matters

```text
what unknown could invalidate this scope later?
how costly is choosing the wrong boundary now?
```

## L4 — contextual

Use if dependency/change boundary materially affects sensible Target scope.

## L5 — contextual

Use if Workspace hot paths/change pressure materially affect scope/seam.

## L6 — contextual

Use if the Target must be split/defined around independently verifiable behavior.

## Q/R/P

Attach to Target/Scope candidates.

## Decision

```text
Target-Scope Decision
```

## Validators after selection

```text
Q/R/P Lifecycle
Decision Persistence
Decision Revalidation Readiness
```

## Output

```text
selected Target / Scope
boundary / non-goals
Target Type/Contract binding
Target-Scope Decision
residual Target-Scope Q/R/P
```

---

# 32. STEP 4: Source Contract Resolution

## Goal

Know exactly what current information is allowed to influence this Target and with what authority.

## Inputs

- selected Target/Scope;
- Target Contract;
- Planning Topology;
- Current Target;
- repository owners;
- Evidence;
- planning state.

## Actions

For every required/proportional Source role:

```text
resolve concrete identity/path
classify role
classify authority
classify freshness
classify review obligation
state reason
```

## L2 — primary

```text
is this the right owner?
is there a more authoritative Source?
are we duplicating Source meaning?
which accepted prior Decisions are reusable?
```

## L3 — supporting

```text
is Source reliability/freshness uncertain?
what Evidence is needed before trusting it?
```

## Validators

```text
Source Contract Validator
Evidence Trace Validator when Evidence included
```

## Output

```text
Source-of-Truth Context
Current Target baseline
Planning State sources
Evidence/constraint sources
Dependency sources
```

---

# 33. STEP 5: Early Prior-Decision Challenge Scan

## Goal

Do not continue planning on top of a prior Decision that current known Evidence already invalidates.

This is **Decision Revalidation Lifecycle**, not a peer Lens.

## Inputs

```text
reused prior Decisions
their residual Q/R/P
new Trigger/Evidence
changed Sources
changed constraints
current WEUC State/Evidence
```

## Actions

For every material reused Decision:

```text
did a residual Q get a material answer?
did a Risk indicator/threshold fire?
did an accepted Problem cross tolerance?
does new Evidence contradict assumptions/rationale?
has a Source/constraint changed?
```

## If no challenge

```text
Decision remains trusted
→ continue forward
```

## If challenge

Route to:

```text
answer re-open
question-set re-open
Target-Scope re-open
upstream Source owner correction
```

Then re-enter the relevant earlier step and apply normal planning Lenses.

## Output

```text
validated prior Source/Decision basis
or
explicit re-open before downstream planning
```

---

# 34. STEP 6: Resolution Question Discovery

## Goal

Identify the actual questions that need answers to construct the selected Target.

## Inputs

- Target/Scope;
- Target Contract/template;
- Source Context;
- current Decisions;
- RQ archetypes/preset;
- current Q/R/P;
- risk/problem pattern library.

## Actions

Generate candidate RQs from:

```text
Target Contract gaps
Need/Scope
Source conflicts
unresolved choices
known target-family archetypes
dependency/WEUC pressure
verification needs
specialized domain risks
saved/deferred questions
```

Then for each RQ candidate:

```text
needed?
already answered?
wrong owner?
too broad?
too narrow?
solution-shaped?
split?
merge?
defer?
delegate?
order/dependency?
```

## L1 — primary

```text
does this question materially help the Target?
is it worth answering now?
```

## L2 — primary

```text
is this already answered by trusted prior Decision?
does another owner own the question?
```

## L3 — primary

```text
can we answer it with current Evidence?
is asking now premature?
```

## L4 — contextual discovery source

Dependency analysis may reveal RQs such as:

```text
who should own this boundary?
how should migration be handled?
```

## L5 — contextual discovery source

WEUC may reveal:

```text
how should this recurring change path be localized?
```

## L6 — contextual discovery source

Verification may reveal:

```text
where should boundary be placed so result is independently provable?
```

## Specialized Lenses

May reveal domain-specific RQs.

## Q/R/P

Attach to RQ candidates / candidate question-set meaning.

## Decision

```text
Question-Set Decision
```

## Validators after selection

```text
Q/R/P Lifecycle
Decision Persistence
Decision Revalidation Readiness
```

## Output

```text
Active RQ Set
RQ order/dependencies
deferred/delegated RQs
Question-Set Decision
residual Question-Set Q/R/P
```

---

# 35. STEP 7: Lens / Rule Set Selection Per RQ

## Goal

Build the evaluation contract for each active RQ without hard-coding every check globally.

## Inputs

```text
RQ
Target Type
Planning Topology stage
environment
Sources
known risk/problem archetypes
Target-family preset
```

## Actions

Select shared Lens Set.

Example:

```text
RQ: choose integration mechanism

selected:
  L1 Need/Value/Scope
  L2 Authority/Reuse
  L3 Uncertainty/Reversibility
  L4 Dependency/Change Impact
  L5 WEUC
  L6 Verifiability/Operability
```

A different RQ may not need all of these.

Also select:

- specialized Lenses;
- applicable Validators;
- applicable Guards;
- ordinary Rules.

## Lens selection itself

Usually mechanical/preset-driven.

If material uncertainty exists about the right evaluation criteria, it can become a separate RQ.

## Validator

```text
Rule Set Coverage Validator
```

## Output

```text
RQ Evaluation Contract
Shared Lens Set
required Evidence checks
applicable validation/guard set
```

---

# 36. STEP 8: Idea / Variant / Pattern Discovery

## Goal

Create or reuse candidate answers to one active RQ.

## Inputs

- RQ;
- Sources;
- saved Ideas;
- Pattern/risk-situation library;
- current selected answer as “keep current” option when applicable;
- constraints.

## Actions

Candidates can come from:

```text
new Idea generation
existing mechanism
saved Alternative
Fallback
Deferred Idea
architecture Pattern
current answer unchanged
combination/bundle
```

Apply split/bundle rule:

### Split when

- parts selectable independently;
- different RQs;
- different Q/R/P;
- different owners/evidence;
- different reconsideration horizons.

### Bundle when

- value only exists together;
- one answer requires another;
- split creates fake combinations.

## L1 — supporting

```text
is there a simpler/better route?
does existing solution already satisfy Need?
```

## L2 — supporting

```text
can an existing reusable mechanism answer this RQ?
```

## L3 — supporting

Avoid generating candidates that depend on obviously untestable/irreversible assumptions without surfacing them.

## Output

```text
Idea/Variant candidate set
```

No requirement to generate many alternatives when one route is already clearly sufficient and no material alternative exists.

---

# 37. STEP 9: Idea Evaluation

This is the main shared-Lens application stage.

For every serious candidate:

```text
Idea
+ same shared Lens Set
+ Idea-specific applicable Lenses
↓
evaluation findings
↓
Q/R/P
Evidence needs / Evidence
projected impacts
refinements
```

This is how “shared Q/R/P” is implemented cleanly:

```text
shared Lens
→ same evaluation dimension for every candidate
→ candidate-specific concrete findings
```

---

## 37.1 Apply L1 Need / Value / Scope

For Idea:

```text
does it answer the RQ?
does that answer materially help the Target?
does it satisfy Need/Expected Effect?
is it necessary?
is there a better route?
does it create unnecessary scope?
```

Possible output:

```text
Idea A:
  low added value → reject/defer

Idea B:
  directly satisfies Target with less scope
```

---

## 37.2 Apply L2 Authority / Source / Reuse

```text
does Idea preserve canonical owners?
does it duplicate truth?
can current mechanism be reused?
does it silently redefine upstream meaning?
```

---

## 37.3 Apply L3 Uncertainty / Assumption / Reversibility

```text
what assumptions?
what unknowns affect ranking?
what Evidence is worth collecting?
how reversible?
what migration/undo cost?
should we prototype first?
```

---

## 37.4 Apply L4 Dependency & Change Impact — when applicable

```text
what dependency edges change?
what files/classes/methods/modules/etc are affected?
what consumers?
what blast radius?
what migration/freshness/review?
```

---

## 37.5 Apply L5 WEUC — when applicable

```text
what Workspace work changes?
how frequent?
how many owners?
what context/coordination?
what verification/debugging burden?
what Change Pressure/Axis?
what preparation tax?
what deferral cost?
```

---

## 37.6 Apply L6 Verifiability / Observability / Operability — when applicable

```text
can behavior/state be proved?
can failure be observed?
can it be diagnosed?
can it be operated/recovered?
what proof Evidence will be required?
```

---

## 37.7 Apply specialized Lenses

Only when relevant.

---

## 37.8 Interpret findings

### Evidence

Keep raw observation/source separately.

### Positive finding

Keep in evaluation/rationale if useful.

### Material unresolved negative finding

Create:

```text
Q / R / P
```

attached to the Idea.

### Obvious resolved issue

Integrate refinement/reject route without manufacturing durable Q/R/P.

---

# 38. STEP 10: Answer Decision

## Goal

Select/reaffirm/reject/defer candidate answers for one RQ.

## Inputs

```text
Ideas
evaluation findings
Q/R/P
Evidence
projected WEUC/dependency/proof impacts
constraints
```

## Actions

```text
compare
refine
collect additional Evidence when worth it
select one / select bundle
or keep current answer
or defer Decision
```

## Decision rationale

May include:

- Need fit;
- key Sources;
- decisive Evidence;
- comparative findings;
- addressed Q/R/P;
- accepted residual Q/R/P;
- WEUC impact;
- rejected complexity;
- constraints.

## Residual Q/R/P transfer

Selected Idea's material unresolved concerns become attached to the accepted Decision/current selected meaning.

Shared unresolved question-set/scope concerns remain at their own Decision level.

## Saved Ideas

Retain when useful:

```text
Alternative
Fallback
Deferred
Adjacent
Unreviewed-but-worth-preserving
```

Do not preserve every brainstorm fragment.

## Validators

```text
Q/R/P Lifecycle
Decision Persistence
Decision Revalidation Readiness
Evidence Trace
WEUC impact persistence when applicable
```

## Output

```text
Answer Decision
residual Decision Q/R/P
reconsideration helpers
saved alternatives/fallbacks
```

Repeat Steps 8–10 for active RQs.

Question order can matter:

```text
Decision for RQ-A
→ becomes Source/constraint for RQ-B
```

---

# 39. Decision Revalidation Readiness — Exact Future Helper Contract

This is a Validator, not a Lens.

## For residual Q

```text
Question:
  what remains unknown?

Importance:
  why can this affect Decision quality?

Expected Evidence:
  what can answer it?

Expected source/time/event:
  when might answer become available?

Decision interpretation:
  answer A → confirm
  answer B → weaken
  answer C → reopen
  answer D → invalidate
```

## For residual R

```text
Risk:
  what adverse future condition may emerge?

Leading indicators:
  what early signs show it is becoming real?

Evidence source:
  what observes those indicators?

Horizon:
  when relevant?

Threshold/event:
  when does it become material?

Reopen:
  answer Decision / RQ set / Target Scope?

Fallback:
  what saved Idea is useful?
```

## For residual P

```text
Problem:
  what known adverse state remains?

Why accepted:
  why is current Decision still preferable?

Measurement:
  how do we know severity?

Tolerance:
  what threshold/deadline/event ends acceptability?

Action:
  remediate / add a mitigation Decision / reopen current Decision?
```

## Valid empty result

```text
no material residual concerns
→ no hooks required
```

---

# 40. STEP 11: Cross-Decision Integration And Composition Review

## Goal

Ensure the full selected Decision set is coherent.

This step is important even if each individual RQ was solved well.

## Inputs

```text
prior accepted Decisions
new selected Decisions
Question-Set Decision
Target-Scope Decision
Current Target
Sources
```

## Actions

Compose all selected meaning into one provisional Target Decision State.

Then run a **Decision Revalidation / compatibility scan**:

```text
does new Decision contradict old Decision?
do two new Decisions conflict?
does their combination trigger residual Risk?
does combination create new duplicate authority?
does combined dependency surface explode?
does combined WEUC become worse?
does verification become impossible?
does combined state violate Target Scope?
```

## L2 — primary

Authority / source consistency.

## L4 — contextual primary for structured systems

Combined dependency/change impact.

## L5 — contextual primary for workspace systems

Combined WEUC impact.

## L6 — contextual

Combined verifiability/operability.

## L1 — contextual

Check combined state still satisfies Need/Target and has not expanded scope.

## L3 — contextual

If integration exposes new uncertain/irreversible assumptions.

## Results

```text
coherent
→ continue

answer conflict
→ reopen affected RQ

question-set flaw
→ reopen RQ discovery

scope flaw
→ reopen Target/Scope
```

## Output

```text
coherent Target Decision State
aggregate concerns/impacts
```

---

# 41. STEP 12: Build Target Decision State

Conceptual internal planning representation:

```text
Target Decision State
=
Target-Scope Decision
+ Question-Set Decision
+ Active RQs
+ Answer Decisions
+ residual Q/R/P
+ Concern Groups
+ retained Ideas
+ Evidence links
+ accepted impacts
```

This is not necessarily one physical artifact.

It is the provenance/decision model from which the Target is projected.

---

# 42. STEP 13: Project Complete Target Through Target Contract

## Goal

Translate selected planning meaning into the target-family canonical semantic representation.

Examples:

- Scenario;
- Domain;
- Slice;
- Workspace UC;
- documentation workflow/model;
- Architecture Decision;
- Planning Topology.

## Inputs

```text
Target Decision State
Target Contract/template/workflow
Current Target for INTEGRATE
canonical Sources
```

## Actions

```text
project selected Decisions into target fields/sections
preserve valid current meaning
represent deferred/delegated/later/outside meaning
include required Source/coverage references
include proof/handoffs
```

This is not another Idea Review.

The target-specific owner defines valid Target shape.

## Validator

```text
Target Projection Conformance Validator
```

## Validator asks

```text
Did command/output omit selected meaning?
Did it omit required target frame?
Did it preserve unchanged meaning?
Did it put meaning under correct owners?
Did it turn an Idea list into a substitute for full Target?
```

## Important distinction

```text
L1 / target-specific planning
→ was the Target semantically right?

Target Projection Validator
→ did we represent that selected Target correctly?
```

## Output

```text
complete Projected Target State
Delta From Current
Preserved Existing Meaning
```

---

# 43. STEP 14: Aggregate Impact / Handoffs

Some impact was already used during Idea evaluation.

Now aggregate it for the selected whole Target.

## L4 — when applicable

Produce final selected:

```text
Dependency & Change Impact
affected owners/components
consumer impact
migration/freshness/review obligations
```

## L5 — when applicable

Produce:

```text
Projected WEUC Impact
```

When Decision is accepted:

```text
Projected WEUC Impact
→ Accepted WEUC Impact / Decision rationale
```

## L6 — when applicable

Produce:

```text
Proof / verification / observability / operations handoff
```

## Specialized handoffs

Examples:

```text
Testing
Architecture
Security
Research
Prototype
Workspace UCDS
Application SDS
```

## Validators

```text
Dependency Relation Validator
WEUC Loop Validator — planning side
Rule Set Coverage Validator
```

## Output

```text
selected impact picture
handoffs
Pre-Update readiness
```

---

# 44. STEP 15: Pre-Update — Explicit Continuation

**CURRENT REPO CONFIRMED boundary**

Pre-Update is not automatic semantic planning and does not grant mutation.

```text
selected semantic Target
→ exact repository/file transition plan
→ still plan-only
```

## Current repository already requires

- target + checked Sources;
- current conclusions/selected variant;
- material Q/R/P;
- ordered steps;
- numbered actions;
- affected files;
- dependencies/resulting state;
- boundaries/unchanged artifacts;
- checks/exit criteria;
- route/package metadata when relevant.

## Selected expanded direction

When material, organize around:

```text
1. Owner / Reuse Plan
2. Source / Dependency Plan
3. WEUC / Workspace Evolution Impact Plan
4. File / Artifact Relation Plan
5. Freshness / Review Plan
6. Generated Projection / Index Plan
7. Ordered File Update Plan
8. Validation / Closure Plan
```

This eight-part structure is target-state refinement, not yet exact current repository canonical wording.

## No planning Lens is mandatory merely because Pre-Update started

If conceptual uncertainty reappears:

```text
route back to IDTSPE planning
```

## Validators / Guards

```text
Pre-Update Conformance Validator
Dependency Relation Validator
Permission Guard
Mode Separation Validator
```

## Output

```text
exact plan
no mutation
```

---

# 45. STEP 16: Realization — Separately Authorized

Depending on Target:

- documentation edit;
- code implementation;
- package build;
- prototype;
- test execution;
- runtime operation;
- user acceptance.

## Guard

```text
Permission Guard
```

The planning result does not inherit:

- mutation;
- archive build;
- local apply;
- commit;
- push.

Those are route-specific permissions.

## Output

```text
Actual Realized State
raw practical Evidence
```

---

# 46. STEP 17: Evidence Capture

## Evidence sources

- implementation result;
- test result;
- Coverage;
- ReviewDiff;
- runtime;
- user acceptance;
- incident;
- performance;
- operational observation;
- observed workspace change cost;
- returned files/artifacts.

## Actions

Preserve raw/source meaning separately.

Link to:

```text
Q/R/P
Idea
Decision
Target
WEUC impact expectation
```

## Validator

```text
Evidence Trace Validator
```

## WEUC

When workspace work was materially affected:

```text
Observed WEUC Evidence
```

## Output

```text
Evidence Set
Actual vs Projected facts
```

---

# 47. STEP 18: Decision Revalidation Lifecycle

Revalidation is not a peer Lens.

It is a lifecycle mechanism using already prepared reconsideration contracts.

## Inputs

```text
accepted Decisions
residual Q/R/P
new Evidence
new Decisions
changed Sources
changed constraints
Observed WEUC Evidence
Actual Realized State
```

## Check residual Q

```text
did expected Evidence arrive?
what answer did it provide?
does answer confirm/weaken/reopen/invalidate?
```

## Check residual R

```text
did leading indicator appear?
did threshold/event fire?
has likelihood/impact materially changed?
```

## Check residual P

```text
is current Problem still within tolerance?
did severity cross threshold?
is accepted workaround still cheaper/better?
```

## Additional checks

```text
does actual result contradict Decision rationale/assumption?
did a new Decision create a composition problem?
did a relevant Source/constraint change?
```

## Dispositions

### ACCEPT

No material challenge.

### LOCAL CORRECTION

Implementation/materialization defect only.

```text
same planning Decisions
→ fix realization
```

### MITIGATION / ADDITIVE DECISION

The current Decision may remain valid, but a residual Risk/Problem now requires an additional choice/action.

Example:

```text
existing Decision remains beneficial
+
accepted Risk begins to materialize
↓
create/reopen an RQ for mitigation
↓
select additional Decision
```

This is **not** a fourth generic re-open level.

The new RQ belongs inside the existing Question-Set/Target Scope when that scope remains valid; if the question set must expand materially, update/reopen the Question-Set Decision explicitly.

### ANSWER RE-OPEN

```text
reopen one RQ
→ return to Idea/Decision flow
```

### QUESTION-SET RE-OPEN

```text
reopen Resolution Question Discovery
```

### TARGET-SCOPE RE-OPEN

```text
reopen Target/Scope Discovery
```

### UPSTREAM SEMANTIC CORRECTION

```text
Evidence proves canonical Source wrong
→ explicit owner correction
→ review actual dependents
```

## After re-open

Use normal planning Lenses again.

Revalidation itself is not a replacement for them.

---

# 48. STEP 19: Persistence / State Reconciliation

## Persist current planning state

When material:

```text
Current Target
selected Decisions
residual Q/R/P
Concern Groups
Decision rationale/provenance
saved Alternatives/Fallbacks
Evidence relations
```

## WEUC reconciliation

```text
previous Current WEUC State
+ Accepted WEUC Impact
+ Observed WEUC Evidence
→ updated normalized Current WEUC State
```

Valid:

```text
checked
→ no material WEUC change
→ no WEUC state update
```

## Dependency/freshness

Update only actual review/synchronization obligations.

Do not inflate ordinary semantic relations into stale dependencies.

## Validators

```text
Decision Persistence
Q/R/P Lifecycle
Decision Revalidation Readiness
Evidence Trace
WEUC Loop when applicable
Dependency Relation
```

## Output

```text
trusted current Sources for next IDTSPE
```

This closes the one-directional learning loop.

---

# 49. Lens Application Matrix

Legend:

```text
P = primary Lens for this step
C = contextual / applies when material
R = used after a re-open, not by the revalidation mechanism itself
— = normally not a planning Lens at this step
```

| Flow Step | L1 Need/Value/Scope | L2 Authority/SoT/Reuse | L3 Uncertainty/Reversibility | L4 Dependency/Impact | L5 WEUC | L6 Verifiability/Operability | Specialized |
|---|---|---|---|---|---|---|---|
| 0 Route/Mode | C | C | — | — | — | — | — |
| 1 Need grounding | P | C | C | — | — | — | C |
| 2 Planning Topology | P | P | P | C | C | C | C |
| 3 Target/Scope | P | P | P | C | C | C | C |
| 4 Source resolution | C | P | C | C | C | — | C |
| 5 Early revalidation | R | R | R | R | R | R | R |
| 6 RQ discovery | P | P | P | C | C | C | C |
| 7 Lens/Rule selection | C | C | C | applicability | applicability | applicability | applicability |
| 8 Idea generation | C | C | C | C | C | C | C |
| 9 Idea evaluation | P/C | P/C | P/C | C/P | C/P | C/P | C/P |
| 10 Answer Decision | C | C | C | C | C | C | C |
| 11 Composition review | C | P | C | P when structured | P when workspace | C/P | C |
| 12 Decision State | — | C | — | — | — | — | — |
| 13 Target projection | semantic owner, not Lens-only | C | — | C | C | C | C |
| 14 Aggregate impact | C | C | C | P when applicable | P when applicable | P when applicable | C |
| 15 Pre-Update | return to planning if needed | C | — | uses selected impact | uses selected impact | uses proof handoff | C |
| 16 Realization | — | Guard | — | — | — | — | — |
| 17 Evidence capture | — | C | — | C | C | C | C |
| 18 Revalidation | R | R | R | R | R | R | R |
| 19 Persistence | — | C | — | C | C | — | — |

Important:

```text
Step 5/18 revalidation
does not "apply all Lenses"
by itself.

It detects challenge.
If challenge exists,
the engine re-enters the relevant choice stage
where applicable Lenses run normally.
```

---

# 50. What Each Lens Produces

| Lens | Primary outputs |
|---|---|
| Need / Value / Scope | Target/RQ/Idea value findings, better-route findings, Q/R/P, scope alternatives |
| Authority / SoT / Reuse | trusted Source route, owner/reuse findings, Q/R/P, authority handoffs |
| Uncertainty / Assumption / Reversibility | Q/R/P, Evidence needs, prototype/research suggestions, reversibility findings |
| Dependency & Change Impact | dependency/change surface, consumer/freshness/migration findings, Q/R/P |
| Workspace Evolution / WEUC | Projected WEUC Impact, architecture pressure/findings, Q/R/P, architecture refinements |
| Verifiability / Observability / Operability | Q/R/P, proof/Evidence plan, test/observability/operations handoff |
| Specialized | domain-specific findings/Q/R/P/Evidence needs |

Lenses can also produce positive evaluation findings used in comparison/rationale.

They are not required to produce Q/R/P when no material concern exists.

---

# 51. Planning Findings Pipeline

```text
Source / Evidence
↓
Lens evaluation
↓
finding
```

Then classify:

## Fact/observation only

```text
Evidence
```

## Candidate improvement

```text
Idea refinement / new Idea
```

## Material unknown

```text
Q
```

## Material future adverse possibility

```text
R
```

## Material known adverse state

```text
P
```

## Positive comparison

```text
evaluation finding
→ possibly Decision rationale
```

## Obvious resolved consequence

```text
integrate directly
→ no durable concern required
```

---

# 52. Shared Lens Set vs “Shared Q/R/P”

Do not store:

```text
shared Risk:
  lock-in is high
```

when the risk value differs by candidate.

Store:

```text
Shared Lens prompt:
  evaluate lock-in / dependency stability
```

Then:

```text
Idea A
→ R-A: high lock-in because ...

Idea B
→ no material lock-in Risk

Idea C
→ R-C: moderate lock-in, reversible
```

This preserves:

```text
concrete Q/R/P challenges its concrete subject
```

---

# 53. Revalidation Readiness Is Command Correctness

This belongs to the mandatory methodology shape of a material Decision when residual concerns survive.

It is not another opinion about whether the Decision is good.

Difference:

```text
Uncertainty Lens:
  should we select this Decision now?

Decision Revalidation Readiness Validator:
  if we select it with uncertainty/risk/problem,
  did we leave enough future hooks to know when to reconsider?

Revalidation Lifecycle:
  later, did those hooks actually fire?
```

---

# 54. Decision State And Target Projection

Internal planning view:

```text
Target Decision State
```

External semantic owner view:

```text
Target Contract projection
```

Example Slice:

```text
Decision State:
  scope Decisions
  RQ Decisions
  residual Risks
  saved alternatives

↓ projection through Slice workflow/template

Slice representation:
  Scenario coverage
  Behavior coverage
  Requirements
  Domain
  implemented/delegated/later/outside
  vertical boundary
  dependencies
  proof obligations
  realization plan
```

The Target representation remains semantic authority according to current owner rules.

Decision state is planning provenance/support, not necessarily a parallel public semantic body.

---

# 55. Application SDS As Planning Topology

**CURRENT REPO CONFIRMED in substance; generic topology label is SELECTED MODEL**

Current direction:

```text
Need / Current Reality / Real-Life Scenario
↓
Application Responsibility / Concept
↓
Application Scenario
↓
Behavior Items + DATA
↓
Requirements / Screens when material
↓
Domain Discovery
↓
Canonical Domain
↓
Slice Strategy
↓
Slices
↓
Realization / Evidence
```

Each downstream stage should consume trusted upstream Sources.

Do not re-derive them.

---

# 56. Need / Real-Life Scenario SDS Direction

**OPEN repository realization**

Need should be formal enough to retain:

```text
actor/stakeholder
desired real-world outcome
Current Reality
gap/pressure
why it matters
Evidence
constraints
success meaning
boundaries
related Real-Life Scenarios
Decisions/QRP
```

Real-Life Scenario should capture:

```text
Need appears
→ actor acts in reality
→ Application touchpoint if useful
→ Application result
→ actor returns to real-world flow
→ uses result
→ real-world outcome
```

Application Scenario remains only Application behavior authority.

Before adding new owners/templates, inspect/reuse current:

```text
UC-PLAN-REALITY
UC-PLAN-SOLUTION
UC-PLAN-APP-CONCEPT
UC-PLAN-SCENARIO-DISCOVERY
```

---

# 57. Workspace / Documentation IDTSPE Preset

Likely selected Pack:

```text
Core:
  L1 Need/Value/Scope
  L2 Authority/SoT/Reuse
  L3 Uncertainty/Reversibility

Workspace:
  L4 Dependency/Change Impact
  L5 WEUC
  L6 Verifiability/Observability/Operability

Validators:
  Source Contract
  QRP Lifecycle
  Decision Persistence
  Revalidation Readiness
  Target Projection
  WEUC Loop
  Dependency Relation
  Rule Set Coverage

Guards:
  Permission
  Semantic Authority
```

Not every Lens must produce a visible section.

Proportional `checked → no material issue` is valid.

---

# 58. Programming Principles Placement

Programming principles are not automatic target architecture.

Example conceptual library:

```text
DRY
→ detects possible duplicated-knowledge risk situation

SRP
→ detects possible mixed-responsibility/change-axis situation

OCP
→ detects possible recurring extension-cost situation

DIP
→ detects possible dependency-direction/substitutability pressure
```

Flow:

```text
principle/risk archetype
↓
is the problematic situation actually present?
↓
if yes:
  create RQ / Idea / Pattern candidate
↓
evaluate with contextual Lenses
especially:
  Dependency & Change Impact
  WEUC
↓
Decision
```

A “violation” may be intentionally preferable if real work-cost is lower.

---

# 59. WEUC Full Loop

```text
Current WEUC State
↓ Source

candidate Idea/Target
↓ WEUC Lens

Projected WEUC Impact
↓ Decision

Accepted WEUC Impact
↓ realization

Observed WEUC Evidence
↓ reconciliation

Updated Current WEUC State
↓
Source for next IDTSPE
```

Do not treat Projected Impact as observed truth.

---

# 60. Dependency Relation Types

Keep distinct:

```text
semantic source / derivation
composition / reuse
ordinary navigation
Reference Object exact synchronization
bounded dependent-fragment review
whole-file Review Dependency
ordered projection/reference list
generated projection/index
```

Critical:

```text
semantic relation
≠ automatically Review Dependency
```

---

# 61. Linked Notes Future Role

Potential queries:

```text
sources(target)
contextBundle(target)
dependencies(target)
dependents(source)
reviewState(target)
weucContext(target)
decisions(target)
concerns(decision)
evidence(concern)
revalidationHooks(decision)
ruleSet(target/command)
validateSources(target)
impact(changedSource)
```

Linked Notes remains infrastructure:

```text
resolver / query / projection / freshness
≠ semantic authority
```

---

# 62. Command Composition Example — `собери идеи слайса`

Conceptual future composition:

```text
Route / permission contract

+ IDTSPE Core Pack

+ Application SDS topology

+ Slice Target Contract
  current Slice workflow/template

+ Slice Source Contract
  Scenario
  Behavior/DATA
  Requirements
  Domain
  Current Slice when INTEGRATE
  architecture/WEUC Sources
  constraints/evidence

+ RQ discovery/archetypes

+ selected Lens Set
  L1/L2/L3
  L4/L5/L6 when material

+ Idea Review component

+ Q/R/P / Decision lifecycle

+ Target Decision State

+ Slice projection

+ Target Projection Conformance Validator

+ persistence/revalidation-readiness validation

+ Pre-Update handoff
```

This composition can potentially be derived/indexed later rather than hand-maintained as a second graph authority.

---

# 63. Current Repository Confirmed Crosswalk

## Idea methodology

```text
planning/documentation/idea-planning-principles-and-terminology.md
planning/documentation/idea-review-and-planning-workflow.md
```

Already owns candidate-Idea semantics and Standard/Deep Idea review.

## Q/R/P / Decisions

```text
planning/documentation/planning-concerns-and-decisions-model.md
```

Already owns generic concern/Decision semantics, retention, `Reconsider When`, Answer/Evidence, residual state.

## Application target family

```text
planning/documentation/application-planning/use-case-registry.md
```

Current UCs already provide Reality/Solution/Scenario/Domain/Realization/Slice/etc semantic adapters.

## Architecture / WEUC

```text
planning/documentation/architecture-planning/
```

Already provides Workspace UC, Change Pressure, Change Axes, Decision workflow, WEUC discovery/evolution analysis.

## Pre-Update

```text
planning/documentation/file-update-overview-workflow.md
```

Already explicit plan-only continuation.

## Dependency review

```text
planning/documentation/review-dependency-planning-workflow.md
.linked-notes/*
```

Already has dependency/freshness machinery that future IDTSPE should reuse rather than replace.

---

# 64. Selected Model Extensions Requiring Future Repository Planning

Not current canonical entities yet:

```text
generic IDTSPE owner/placement
Target-Scope Decision formalization
Question-Set Decision formalization
Resolution Question stable model/name
typed Source Contract schema
Lens contract/index
Validator/Guard/Rule/Pack representation
Rule Set Coverage validation
Decision Revalidation Readiness validator
Target Projection Conformance validator
generic Planning Topology representation
generic Target Decision State representation
formal Need / Real-Life Scenario model
full WEUC accepted-impact/reconciliation persistence
expanded eight-part Pre-Update structure
```

Future Pre-Update should inspect existing owners first and evolve/reuse them rather than creating parallel methodology files.

---

# 65. Important Migration Compatibility Issue — Q/R/P And Ideas

Current repository explicitly says:

```text
Idea methodology does not own generic Q/R/P lifecycle
Related Idea is optional relation
```

Selected IDTSPE model says:

```text
candidate-specific concern should challenge/attach to Idea
```

These are compatible only if future wording is:

```text
Planning Concern model
= semantic lifecycle owner

Idea
= concern subject/attachment/provenance when concern is candidate-specific

detailed concern stored once
```

Do not create a duplicate Idea-local Q/R/P ontology.

---

# 66. Full Output Contract — Planning

A material IDTSPE pass should be able to expose:

```text
Mode
Trigger
Need basis

Planning Topology / stage when relevant

Target Identity / Type / Scope
Target-Scope Decision
Target-Scope residual Q/R/P

Source Contract
Sources actually used
Source roles/authority
Current Target if INTEGRATE

Early prior-Decision challenge result

Question-Set Decision
Active RQs
RQ order/dependencies
Question-Set residual Q/R/P

per RQ:
  Lens Set
  Ideas / Variants
  Q/R/P
  Evidence
  evaluation findings
  projected impacts
  Answer Decision
  residual Q/R/P
  revalidation hooks
  saved alternatives

Cross-Decision composition result

Target Decision State

Complete Projected Target State

INTEGRATE:
  Delta
  Preserved Existing Meaning

Dependency & Change Impact
Projected/Accepted WEUC Impact
proof/testing/architecture/other handoffs

Current Overall Conclusions
Pre-Update readiness
```

---

# 67. Full Output Contract — Post-Realization

```text
Actual Realized State
Practical/Test/Review Evidence
Actual Coverage/proof
Observed WEUC Evidence
Evidence links to Q/R/P/Decisions
Decision Revalidation result

Disposition:
  ACCEPT
  LOCAL CORRECTION
  MITIGATION / ADDITIVE DECISION
  ANSWER RE-OPEN
  QUESTION-SET RE-OPEN
  TARGET-SCOPE RE-OPEN
  UPSTREAM SEMANTIC CORRECTION

WEUC State Reconciliation
updated Target/Decision/QRP state
dependent review state
```

---

# 68. Provenance Chain

When useful:

```text
Trigger
↓
Need / Source
↓
Target-Scope Candidate
↓ Q/R/P
Target-Scope Decision
↓
RQ Candidate / Question Set
↓ Q/R/P
Question-Set Decision
↓
Idea / Variant
↓ Lens findings
↓ Evidence
↓ Q/R/P
Answer Decision
↓
Target Decision State
↓
Projected Target
↓
Dependency / WEUC / proof impact
↓
Realization
↓
Practical Evidence
↓
Revalidation / reconciliation
↓
Current Target + trusted Sources for later work
```

Not every simple target needs every durable node.

---

# 69. What Is Fixed vs Configurable vs Dynamic

## Fixed generic mechanics

```text
Need grounding
Target/Scope choice
typed Source reuse
three choice lifecycles
Lens applicability
Q/R/P + Evidence
Decision lifecycle
revalidation readiness
Target projection
validation
realization boundary
revalidation/reconciliation
```

## Reusable configurable assets

```text
Planning Topologies
Target Contracts/templates
Source Contracts
Lens definitions/presets
RQ archetypes
Pattern/risk libraries
Validators/Guards/Rules
Packs
Evidence/test adapters
handoffs
```

## Dynamic per invocation

```text
actual Need
actual Target/Scope
actual Sources
active RQs
selected Lens Set
Ideas
Q/R/P
Evidence
Decisions
saved alternatives
Target State
actual realization
```

---

# 70. Full Consistency Invariants

## Semantic

```text
Need is root
Trigger is entry only
Target is scoped
Target-specific owner owns semantic validity
IDTSPE orchestrates
```

## Source

```text
reuse prior accepted work by default
do not copy/rederive upstream semantic truth
do not treat Evidence as semantic owner
```

## Q/R/P

```text
Q/R/P only when material
shared model owns semantics
concern attaches to concrete subject
residual concerns become reconsideration contracts
```

## Decision

```text
Idea = candidate answer
Decision = selected answer
Recommendation ≠ Decision
saved alternatives are not Current Plan
```

## Lens

```text
Lens = reusable evaluation dimension
Lens prompt ≠ concrete concern
not every Lens applies everywhere
```

## Validation

```text
semantic Target correctness
≠ command/output conformance correctness
```

## WEUC

```text
workspace architecture judged by actual important work
Projected Impact ≠ observed truth
```

## Dependency

```text
semantic relation ≠ Review Dependency
use narrowest relation mechanism
```

## Permission

```text
planning ≠ realization
Pre-Update ≠ mutation permission
review ≠ mutation permission
package ≠ apply/commit/push
```

## Revalidation

```text
do not reopen old work without challenge
when challenged:
  preserve valid Decisions when possible
  add mitigation Decision when sufficient
  otherwise reopen narrowest invalid choice
```

---

# 71. Open Questions

## Naming

- final public name for IDTSPE;
- final name for `Resolution Question`.

## Persistence

- when Target-Scope / Question-Set / RQ need stable IDs;
- exact Decision/QRP storage/projection;
- exact Source Contract schema;
- exact Lens/Rule metadata.

## Module discovery

- local semantic owners + generated index?
- explicit Packs vs derived composition?
- how much Rule Set Coverage can be mechanically validated?

## Positive reasoning

- is Decision rationale enough?
- only introduce first-class Arguments if real query/persistence use case appears.

## Planning Topology

- durability threshold;
- exact representation.

## SDS

- formal Need / Real-Life Scenario ownership;
- relation to current `UC-PLAN-REALITY` / Solution / Concept / Scenario Discovery.

## WEUC

- exact persistent form of Accepted WEUC Impact and reconciliation.

## Linked Notes

- typed Source/Decision/QRP/Evidence/rule relations.

## Graphs

Still open.

Derived Rule/Pack composition may reduce need for a separate hand-authored UC/command graph.

---

# 72. Final Compact Model

```text
IDTSPE
=
Need-rooted scoped planning
+
trusted Source reuse
+
target-specific justification lineage
+
3 repeated choice lifecycles
+
applicable reusable Lenses
+
Q/R/P + Evidence
+
selected Decisions
+
future revalidation hooks
+
Target-specific projection
+
Validators / Guards / Rules
+
explicit realization boundary
+
practical Evidence
+
narrow selective re-open
```

The most important operational rule:

```text
PLAN FORWARD BY DEFAULT.

REUSE PREVIOUS ACCEPTED WORK.

BEFORE USING IT:
  check whether anything concrete challenges it.

WHEN MAKING A NEW DECISION:
  evaluate through the applicable Lenses.

WHEN ACCEPTING UNCERTAINTY/RISK/PROBLEM:
  leave usable future reconsideration hooks.

AFTER COMBINING DECISIONS:
  check the composition.

AFTER REALIZATION:
  compare expected vs observed.

REOPEN ONLY THE NARROWEST INVALID CHOICE.
```
