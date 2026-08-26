# IDTSPE Coherent Model v4

Status: clean reconstruction after evidence/revalidation/proof clarification and module-taxonomy simplification  
Working identifier: `IDTSPE`  
Repository mutation: none  
Role: candidate canonical planning model, replacing `idtspe-coherent-model-v3.md` as the current clean capture  
Provenance: earlier captures and discussion history remain historical evidence, not parallel authority

---

# 1. Definition

**IDTSPE** is a reusable closed-loop planning and target-evolution engine.

Its job is to take one bounded Need/problem, choose an appropriate Target/Scope, reuse trustworthy prior Sources of Truth, discover the questions that actually need resolution, evaluate candidate answers through applicable reusable Lenses, Q/R/P and Evidence, accept Decisions, project a complete Target State through the Target-specific contract, realize the result when separately authorized, and use practical evidence to reopen only the narrowest prior choice that has actually become questionable.

Canonical short form:

```text
TRIGGER
↓
understand NEED
↓
select TARGET / SCOPE
↓
resolve SOURCES OF TRUTH
↓
discover RESOLUTION QUESTIONS
↓
select applicable LENSES
↓
generate/reuse IDEAS / PATTERNS
↓
Q/R/P + EVIDENCE
↓
DECISIONS
↓
complete PROJECTED TARGET STATE
↓
dependency / WEUC / proof impacts
↓
PRE-UPDATE
↓
authorized REALIZATION
↓
PRACTICAL EVIDENCE
↓
SELECTIVE REVALIDATION
↓
ACCEPT
or reopen the narrowest invalid choice
```

IDTSPE is not itself semantic authority for every possible Target.

Scenario, Domain, Slice, Workspace UC, Documentation workflow, Planning Topology and other Target families keep their own semantic owners/contracts.

---

# 2. Fundamental Invariants

## 2.1 Need is the semantic root

```text
Trigger ≠ Need
Idea ≠ Need
Implementation request ≠ Need
```

A Trigger can enter at any level:

```text
"integrate Service X"
"test failed"
"deadline changed"
"ReviewDiff found a defect"
"here is a new idea"
```

IDTSPE must understand the relevant underlying Need before accepting a material Target/Scope.

It does not necessarily rediscover the Need from scratch if it is already an accepted Source of Truth.

## 2.2 Planning is scoped

One IDTSPE instance does not solve every Decision for an entire system.

It has one bounded Target/Scope.

```text
current Need
+ current Target/Scope
→ only material questions for this planning instance
```

Accepted work from other stages/instances is normally consumed as Source of Truth.

## 2.3 Planning should be predominantly one-directional

Preferred:

```text
Stage A
→ accepted Source A

Stage B
consumes A
→ accepted Source B

Stage C
consumes A + B
→ accepted Source C
```

Do not repeatedly reopen earlier work merely because a new planning session started.

Backward movement is challenge-driven.

## 2.4 Reuse prior accepted work by default

```text
accepted current Source/Decision
+ no material challenge
→ reuse freely
```

A later stage should not re-derive upstream meaning from scratch.

## 2.5 Reopen only on concrete challenge

Potential challenge sources:

- residual Q/R/P;
- new Practical Evidence;
- new WEUC Evidence;
- changed constraint;
- changed canonical Source;
- new Decision that conflicts/composes badly with an earlier Decision;
- explicit supersession.

## 2.6 Propagate corrections only through actual dependents

```text
changed upstream Source
↓
identify actual dependent Targets
↓
review affected meaning
↓
preserve unaffected downstream meaning
```

No broad reset.

## 2.7 Evidence does not silently become semantic authority

Implementation/test/runtime evidence may prove current semantics wrong.

The correction still goes through the owner that owns the semantic meaning.

## 2.8 Execution order is not semantic authority order

A later-layer insight can be useful before the upstream owner is formally changed.

Store it as provisional/carry-forward evidence/concern rather than silently rewriting upstream truth.

---

# 3. Core Concepts

## 3.1 Trigger

The event/input that starts an IDTSPE instance.

Examples:

- user request;
- new Ideas;
- runtime finding;
- test result;
- ReviewDiff;
- deadline change;
- returned implementation;
- architecture pressure.

Trigger is an entry point, not automatically truth.

## 3.2 Need

The reason the planning is worth doing.

Need expresses the real desired outcome/gap rather than a proposed implementation.

For complex Target families a durable Need representation may itself be a reusable Target/Source.

## 3.3 Target / Scope

The bounded problem/result of this IDTSPE instance.

A Target Scope includes:

```text
Need/problem being addressed
desired Target Result
boundary
non-goals / deferred concerns
Target Type / Target Contract
trusted upstream Sources
what output should become reusable Source of Truth
```

## 3.4 Source

Anything allowed to inform a Target as truth, evidence, constraint or planning state.

Sources are typed; not every input has equal authority.

## 3.5 Lens

A reusable evaluation perspective.

```text
Lens
= what dimension should we inspect/challenge?
```

A Lens generates prompts/archetypes.

It does not assert a concrete Q/R/P finding by itself.

## 3.6 Resolution Question (`RQ`, working term)

A scoped question whose possible answers are Ideas/Variants and whose accepted answer becomes a Decision.

Examples:

```text
Where should this Slice boundary be?
How should this integration be realized?
Should an existing Scenario change or should a new one exist?
Who owns this state?
```

`Resolution Question` is a working term. Final public naming remains open.

## 3.7 Idea / Variant

A candidate answer.

An Idea may be generated now or reused from a saved alternative/pattern library.

## 3.8 Pattern

A reusable Idea archetype.

Architecture patterns are candidate answers, not architecture goals or automatically correct Decisions.

## 3.9 Q/R/P

Concrete planning concerns:

```text
Q — material Question / unknown
R — material future Risk
P — known present Problem
```

A concrete Q/R/P belongs to the candidate or accepted Decision it actually challenges/monitors.

## 3.10 Concern Group

A grouping of several related Q/R/P that share one resolution surface.

The group is not semantic owner of its members.

## 3.11 Evidence

Observed/authoritative information that can influence Q/R/P, Ideas or Decisions.

Evidence remains separately inspectable as a Source.

## 3.12 Decision

An accepted answer to a planning choice.

A Decision may retain:

- rationale;
- Sources/Evidence;
- residual Q/R/P;
- reconsideration conditions;
- saved alternatives/fallbacks;
- supersession relations.

## 3.13 Target Contract

The target-family owner’s contract for a complete valid Target.

It defines shape/meaning, Sources, completeness and handoffs without making IDTSPE semantic owner.

## 3.14 Planning Topology

A reusable or one-off map of several Target stages:

```text
stage/result boundaries
rough order
Sources in
Target Contract
Lens preset
outputs becoming Sources of Truth
```

Its purpose is to reduce rework and enable one-directional planning.

---

# 4. Typed Source Contract

IDTSPE input is not an untyped bag of context.

A material instance resolves a typed Source Contract.

## 4.1 `TRIGGER_SOURCE`

Why the current invocation exists.

Not automatically canonical truth.

## 4.2 `IDEA_SOURCE`

Proposed candidate meaning/answers.

Optional.

Ideas are not the planning root.

## 4.3 `CANONICAL_SEMANTIC_SOURCE`

Current authoritative meaning owned elsewhere.

Examples:

- Need / Current Reality;
- Real-Life Scenario;
- Application Scenario;
- Behavior Item;
- DATA Object;
- Requirement;
- Screen;
- Domain owner/invariant/policy;
- Workspace UC;
- Documentation UC;
- current reusable workflow/model/template;
- current registry/Direction owner;
- accepted prior Target/Decision where it is canonical for later work.

## 4.4 `CURRENT_TARGET`

Existing Target baseline in INTEGRATE.

Examples:

- current Scenario;
- current Domain;
- current Slice;
- current Workspace UC;
- current documentation workflow;
- current Planning Topology.

## 4.5 `PRACTICAL_EVIDENCE`

Observed reality:

- implementation;
- executed tests;
- Coverage result;
- runtime behavior;
- incident;
- ReviewDiff;
- user acceptance;
- observed maintenance/change cost.

Evidence may force correction.

It does not silently redefine upstream semantic authority.

## 4.6 `ARCHITECTURE_EVOLUTION_SOURCE`

Workspace evolution/architecture state:

- Workspace UCs;
- contextual WEUC;
- Understanding Paths;
- Change Paths;
- Verification Paths;
- Runtime/Operations paths;
- Change Pressure;
- Change Axes;
- Architecture Decisions/State;
- observed work cost.

## 4.7 `DELIVERY_CONSTRAINT`

- deadline;
- milestone;
- capacity;
- release order;
- external dependency;
- operational limit.

Constraint affects ordering/decomposition/staging.

It does not silently erase semantic Need/behavior.

## 4.8 `PLANNING_STATE_SOURCE`

Durable planning memory:

- Target-Scope Decision;
- Question-Set Decision;
- answer Decisions;
- Q/R/P;
- Concern Groups;
- saved/deferred/fallback Ideas;
- carry-forward findings;
- unresolved ownership concerns.

## 4.9 `DEPENDENCY_SOURCE`

Existing structural/review relation state:

- semantic source dependencies;
- owner relations;
- ordinary canonical links;
- Reference Objects;
- bounded Reference Object dependencies;
- Review Dependencies;
- generated/indexed dependency information;
- file/package relation state.

---

# 5. Conceptual Source Record

```text
Source:
  identity/path:
    <stable id and/or canonical path>

  role:
    <TRIGGER_SOURCE | IDEA_SOURCE | ...>

  relationToTarget:
    <derived-from | baseline | constrains | evidence-for |
     informs | covers | depends-on | ...>

  authority:
    canonical | evidence | constraint | planning-state | projection

  requiredness:
    required | proportional | optional

  freshness:
    current-required | best-available | historical-evidence

  reviewObligation:
    none | explicit-review-dependency | reference-object-dependency

  reason:
    <why this Source matters>
```

Exact repository syntax remains a later design Decision.

The Target Contract/preset decides required/proportional source classes.

The generic engine does not hard-code the complete Source taxonomy of every Target family.

---

# 6. Source Trust And Revalidation

No mandatory persisted Source-state enum is selected.

Conceptual words such as:

```text
trusted
challenged
superseded
historical
```

may be useful during reasoning.

But revalidation should primarily be derived from:

```text
current canonical Source
+ accepted Decisions
+ residual Q/R/P
+ Current WEUC State
+ accepted/observed WEUC impacts
+ Practical Evidence
+ changed constraints
+ explicit supersession
```

Rule:

```text
no material challenge
→ consume current Source confidently

material challenge
→ reopen the narrowest owner/Decision surface
```

Add a persistent source-state machine only if real workflows prove this derivation insufficient.

---

# 7. Engine Modes

## 7.1 CREATE

Target instance does not yet exist.

```text
Need
+ trusted upstream Sources
+ Target Contract
+ constraints/evidence
+ planning state
→ complete Projected Initial Target
```

`CURRENT_TARGET = none`.

CREATE does **not** imply rediscovering all upstream Sources.

Previously accepted upstream work remains reusable.

## 7.2 INTEGRATE

Target exists.

```text
Current Target
+ Need/change Trigger
+ trusted upstream Sources
+ new Ideas/Evidence
+ constraints
+ planning state
→ complete Projected Updated Target
+ Delta
+ Preserved Existing Meaning
```

### Preservation rule

Existing valid meaning remains unless a material reason changes it.

Material reasons include:

- upstream canonical Source changed;
- an accepted new Decision explicitly replaces it;
- Practical Evidence disproves it;
- Current Target conflicts with canonical owners;
- a new constraint invalidates its applicability;
- a later Decision explicitly supersedes it.

Do not rewrite for stylistic novelty.

## 7.3 EVIDENCE-DRIVEN RECONCILIATION

Return path after realization.

Conceptually reuses INTEGRATE semantics with new `PRACTICAL_EVIDENCE`.

Evidence itself does not have to be manufactured into an Idea.

## 7.4 SHOW CURRENT

Separate read-only operation:

```text
canonical Current Target
→ resolve/render current semantic state
```

No projected changes and no new Q/R/P merely because it was displayed.

## 7.5 PLAN TARGET

Direct target planning without requiring a fresh Idea source.

IDTSPE can still be the underlying decision/evidence engine.

---

# 8. The Three Generic Choice Lifecycles

There are exactly three generic selective re-open levels.

Every level follows the same lifecycle:

```text
candidate
↓
candidate Q/R/P
↓
accepted Decision
↓
residual Decision Q/R/P
↓
Evidence
↓
reaffirm or re-open
```

---

# 9. Choice Level 1 — Target / Scope

Question:

```text
What bounded problem/result should this IDTSPE instance solve?
```

Candidate examples:

- change existing Target;
- create new Target;
- split one problem into several Targets;
- defer one part;
- use another Target Type;
- reuse an already solved Target.

Candidate Q/R/P challenge:

- Need relevance;
- value;
- boundary;
- stage timing;
- missing prerequisite;
- scope breadth;
- wrong owner;
- duplicated work.

Accepted result:

```text
Target-Scope Decision
```

Residual Target-Scope Q/R/P define when the scope itself should be reconsidered.

---

# 10. Choice Level 2 — Resolution Question Set

After Target/Scope is selected:

```text
Which questions must be answered
to construct this Target well?
```

RQ candidates can be:

- accepted;
- rejected;
- split;
- merged;
- reframed;
- ordered;
- deferred;
- delegated;
- marked already answered by prior Decision.

Accepted result:

```text
Question-Set Decision
```

Residual Question-Set Q/R/P define when:

- an RQ was framed incorrectly;
- important questions are missing;
- two questions should merge/split;
- a question became irrelevant;
- a previously fixed decision type has become material.

---

# 11. Choice Level 3 — Answer / Idea

For each active RQ:

```text
Which answer should be selected?
```

Candidates:

- newly generated Ideas;
- saved alternatives;
- fallback Ideas;
- Patterns;
- Current Decision as “keep as-is”.

Ideas are evaluated through selected Lenses, Q/R/P and Evidence.

Accepted result:

```text
Decision
```

Residual Decision Q/R/P define when that accepted answer should be reconsidered.

---

# 12. Q/R/P Ownership

There are six physical owner contexts but three repeated methodologies.

## 12.1 Target/Scope Candidate Q/R/P

Owner: Target/Scope candidate.

After selection, unresolved material items move/attach to Target-Scope Decision.

## 12.2 Target-Scope Decision Q/R/P

Owner: accepted scope Decision.

Role: monitor whether the bounded problem/result remains appropriate.

## 12.3 RQ / Question-Set Candidate Q/R/P

Owner: RQ candidate or candidate question set.

Role: challenge whether these are the right questions.

After selection, unresolved material items attach to Question-Set Decision.

## 12.4 Question-Set Decision Q/R/P

Owner: accepted question-set Decision.

Role: monitor whether question framing/completeness remains valid.

## 12.5 Idea Q/R/P

Owner: Idea/Variant.

Role: evaluate candidate answer.

After selection, unresolved material items attach to answer Decision.

## 12.6 Decision Q/R/P

Owner: accepted answer Decision.

Role: monitor quality of the selected answer over time.

---

# 13. Q/R/P Semantics

## 13.1 Q — Question

A material unknown that can change:

- candidate viability/ranking;
- scope;
- RQ set;
- Decision confidence;
- future reconsideration.

Preferred fields:

```text
unknown
why it matters
Evidence needed
expected source
expected time/event
possible answers
impact of answers
```

For accepted Decision:

```text
what answer confirms?
what answer weakens?
what answer reopens?
what answer invalidates?
```

## 13.2 R — Risk

A credible future adverse condition.

Preferred fields:

```text
risk hypothesis
why it matters
leading indicators
Evidence source
likelihood/confidence
impact
horizon
reversibility
threshold/event
which Decision/Scope reopens
known fallback Ideas
```

A residual Risk is a future reconsideration map.

## 13.3 P — Problem

A known present defect/cost/contradiction.

Preferred fields:

```text
known problem
current impact
why tolerated now, if accepted
workaround / containment
Evidence / measurement
remediation condition
deadline / threshold / event
which Decision/Target reopens
```

---

# 14. Concern Groups

Concern Group combines multiple Q/R/P when they share one resolution surface.

Possible shared surface:

- same RQ;
- same Decision;
- same investigation;
- same Evidence need;
- same owner/boundary;
- same dependency contract.

Example:

```text
CG-INTEGRATION-BOUNDARY
├─ Q — external API capability unknown
├─ R — provider lock-in
├─ P — duplicate authority
└─ R — recurring change path may spread
```

Rules:

- mixed Q/R/P are allowed;
- Group does not become semantic owner;
- each concern retains its actual owner/status;
- one Decision can address several concerns;
- one concern may require several Decisions;
- residual material concerns remain active;
- resolved low-value items may leave active view while useful trace remains;
- one logical Concern/Group should have one detailed storage owner;
- review order is derived, not semantic root.

---

# 15. Existing Concern Metadata Compatibility

The future IDTSPE model should reuse, not unnecessarily replace, current concern concepts such as:

```text
Priority
Concern Category
Status
AI Comment / Recommendation
Decision trace
Origin / Provenance
Introduced / Exposed By
active vs retained trace
```

Important boundary:

```text
AI Recommendation ≠ Decision
```

Exact field evolution is a repository-level model Decision, not selected here.

---

# 16. Lenses — Design Contract

A Lens is a reusable concern-generation/evaluation mechanism.

Conceptual contract:

```text
Lens:
  identity
  purpose
  appliesWhen
  choiceLevels:
    Target/Scope | RQ Set | Idea | Decision monitoring
  prompts / concern archetypes
  Evidence prompts
  optional Pattern references
  optional facets
  related lenses
```

Lenses are selected proportionally.

A Lens may apply to one or several choice levels.

---

# 17. Planning Lens Taxonomy

Peer Lenses exist only to evaluate planning choices/meaning.

They are not conformance checks and they are not lifecycle stages.

## 17.1 L1 — Need / Value / Scope Lens

Core question:

```text
Are we solving a real/worthwhile Need
through the right bounded Target and useful planning questions?
```

Evaluates:

- Trigger vs Need;
- Expected Effect/value;
- necessity / Better Route;
- Target/Scope boundary;
- create vs reuse/change existing Target;
- scope too broad/narrow;
- premature stage;
- opportunity cost;
- whether an RQ materially contributes to the Target.

## 17.2 L2 — Authority / Source-of-Truth / Reuse Lens

Core question:

```text
Are we using the correct authoritative meaning
and reusing accepted work rather than duplicating/rederiving it?
```

Evaluates:

- canonical owner;
- Source authority;
- semantic layer ownership;
- projections/history/examples vs current truth;
- duplicate truth;
- unnecessary replanning;
- superseded prior work.

## 17.3 L3 — Uncertainty / Assumption / Reversibility Lens

Core question:

```text
What important uncertainty exists before this Decision,
what assumptions are we making,
and how expensive is being wrong?
```

This is primarily **prospective** and decision-time.

Evaluates:

- unknowns;
- assumptions;
- confidence;
- whether more Evidence is worth collecting before choosing;
- expected time/event when Evidence becomes available;
- prototype/experiment value;
- reversibility;
- cost of choosing too early;
- cost of delaying;
- cost of undoing the choice.

It produces Idea/Scope/RQ Q/R/P and Evidence needs.

It does **not** own the later revalidation loop.

`Evidence` is not part of the Lens name because Evidence is a Source/mechanism used by many parts of IDTSPE.

---

# 18. Contextual Planning Lenses

## 18.1 L4 — Dependency & Change Impact Lens

Core question:

```text
What dependency structure and concrete change surface does this option create?
```

Facets:

- dependency direction/coupling;
- affected consumers;
- files/artifacts;
- modules/packages;
- classes/interfaces;
- methods/functions;
- schemas/messages/state;
- tests/projections/runtime components;
- blast radius;
- compatibility/migration;
- freshness/review obligations.

## 18.2 L5 — Workspace Evolution / WEUC Lens

Core question:

```text
How does this option affect important recurring work
in the workspace/codebase/documentation/tool?
```

Evaluates:

- understanding paths;
- change/mutation paths;
- verification paths;
- runtime/operations/debugging paths;
- owners touched/locality;
- working-context load;
- coordination;
- recurring frequency;
- Change Pressure / Change Axes;
- preparation-now tax;
- deferred-change cost;
- Architecture Tax.

For workspace/code architecture, programming-principle-derived Ideas should normally be evaluated through this Lens.

## 18.3 L6 — Verifiability / Observability / Operability Lens

Core question:

```text
If we choose this Idea,
can the resulting behavior/state be verified, observed,
diagnosed and operated at acceptable cost?
```

This Lens evaluates candidate design quality.

It can generate Q/R/P such as:

```text
Q:
  can failure be observed reliably?

R:
  behavior may be impossible to diagnose in production

P:
  selected boundary cannot currently be tested without mutating external state
```

It can also produce a **Proof / Evidence Plan**:

```text
what acceptance Evidence should exist?
what tests/observations are needed?
what positive/negative guarantees must be shown?
```

Important distinction:

```text
Lens
→ asks whether verifiability/operability is good enough

Proof / test result / observation
→ Evidence

Argument for/against an Idea
→ reasoning/rationale that interprets Sources/Evidence/QRP
```

`Proof` is therefore not itself a Lens.

## 18.4 L7+ — Specialized Domain Quality Lenses

Examples:

- Security;
- Privacy;
- Performance;
- Reliability;
- Safety;
- Compliance;
- UX/Accessibility;
- domain-specific correctness.

Use only when material.

---

# 18.5 Delivery Constraints Are Sources, Not A Peer Lens

Remove `Delivery Constraint Rules Lens` from the peer Lens taxonomy.

Current model already has:

```text
DELIVERY_CONSTRAINT
```

for:

- deadline;
- capacity;
- milestone;
- release order;
- external dependency;
- operational limit.

These Sources influence:

- Target/Scope;
- RQ selection;
- Idea ranking;
- staging/decomposition;
- Pre-Update ordering.

Reusable Rules may say:

```text
constraint may alter split/order/staging
but must not silently erase semantic Need/behavior
```

A special delivery Lens is unnecessary unless a concrete target family later proves a distinct reusable evaluation methodology is missing.

---

# 18.6 Revalidation Is A Lifecycle Mechanism, Not A Peer Lens

Remove `Decision Revalidation Lens` from peer Lenses.

Revalidation happens **after** a Decision exists and new state appears.

Inputs:

```text
accepted Decision
+ residual Decision Q/R/P
+ new Evidence
+ new Decisions
+ changed Sources/constraints
+ current WEUC state/evidence
```

Mechanism:

```text
evaluate residual Q/R/P triggers
+ compare new state with Decision assumptions/rationale
↓
no material challenge
  → reaffirm

challenge answer
  → reopen one RQ

challenge question set
  → reopen RQ Discovery

challenge Target/Scope
  → reopen Target/Scope Discovery

challenge upstream canonical Source
  → explicit upstream correction
```

When a choice reopens, the normal planning Lenses are applied again.

Thus:

```text
Uncertainty / Assumption / Reversibility
= prospective evaluation before/while choosing

Decision Revalidation
= later lifecycle check using new state against an accepted Decision
```

They both use Evidence but have different temporal role and owner.



# 18A. Minimal Reusable Methodology Module System

Do not create many first-class module kinds.

The public reusable taxonomy should stay minimal:

```text
Lens
Validator
Guard
Rule
Pack
```

## Lens

Evaluates planning choices/meaning and can generate Q/R/P, Evidence needs and candidate-comparison findings.

## Validator

Checks whether a required methodology/result contract was executed correctly.

## Guard

Protects a hard invariant or permission/authority boundary.

## Rule

Any other reusable methodology invariant/process rule that does not justify another first-class type.

## Pack

A reusable composition of Lenses, Validators, Guards and Rules.

This is enough modularity for the current model.

---

# 18B. Evaluation Versus Command/Process Correctness

Two independent correctness dimensions exist.

## Planning / semantic correctness

```text
Did we choose the right Need/Scope?
Did we ask the right RQs?
Did we select good answers?
```

Handled by:

```text
Lenses
+ Q/R/P
+ Evidence
+ Decisions
+ Target-specific methodology
```

## Command / process / representation correctness

```text
Did the command execute the required methodology correctly?
Did it resolve required Sources?
Did it preserve Decisions/QRP?
Did it render/save the selected Target completely?
Did it prepare future revalidation hooks?
Did it stay inside permissions?
```

Handled by:

```text
Validators
+ Guards
+ Rules
+ Target Contract
```

Keep these two correctness dimensions separate.

---

# 18C. Core Validator Candidates

## V1 — Target Projection Conformance Validator

Checks that the selected Target Decision State was represented/saved according to the Target Contract.

It validates representation/process correctness, not whether the Target itself was the right semantic choice.

## V2 — Source Contract Validator

Checks that required/proportional Sources were resolved, typed and used with correct authority.

## V3 — Q/R/P Lifecycle Validator

Checks concern ownership and transition:

```text
candidate Q/R/P
→ candidate owner

accepted Decision
→ unresolved material Q/R/P retained as residual Decision Q/R/P
```

It also checks that a Lens prompt is not mistakenly stored as ownerless concrete Q/R/P.

## V4 — Decision Persistence Validator

Checks material Decisions, rationale/provenance, residual Q/R/P, Evidence links and supersession state are retained.

## V5 — Decision Revalidation Readiness Validator

Whenever an accepted Decision retains material Q/R/P, this Validator checks that future reconsideration helpers exist.

For retained `Q`:

```text
unknown
why it matters
Evidence that may answer it
expected source/time/event
which answer confirms / weakens / reopens / invalidates
```

For retained `R`:

```text
risk hypothesis
leading indicators
Evidence source
horizon
threshold/event
which Decision/RQ/Scope reopens
known fallback Idea when useful
```

For retained `P`:

```text
known current Problem
why it is acceptable now
severity measurement
tolerance threshold/deadline/event
remediation/reopen action
```

Valid no-op:

```text
no material residual Q/R/P
→ validator passes without manufacturing fake concerns
```

This turns residual Q/R/P into actionable future reconsideration contracts.

## V6 — Evidence Trace Validator

Checks that Evidence remains traceable to the Q/R/P/Idea/Decision it affected and is not silently converted into semantic authority.

## V7 — WEUC Loop Validator

Checks the full WEUC Source → projected impact → accepted impact → observed evidence → reconciliation loop when applicable.

## V8 — Dependency Relation Validator

Checks relation-type correctness and prevents false freshness/review cascades.

## V9 — Pre-Update Conformance Validator

Checks the eight-part Pre-Update contract when material.

## V10 — Mode Separation Validator

Protects:

```text
SHOW CURRENT
≠ CREATE
≠ INTEGRATE
≠ REVIEW
≠ REALIZATION
```

## V11 — Rule Set Coverage Validator

Checks whether the current Mode/Target/Topology/environment required a Lens, Validator, Guard or Rule that was accidentally omitted.

---

# 18D. Core Guard Candidates

Keep Guards only for hard boundaries.

Examples:

```text
Permission Guard
Semantic Authority Guard
Dependency/Review-Obligation Guard
No-Silent-Upstream-Redefinition Guard
```

Do not create a Guard for every best practice.

---

# 18E. Rule Packs / Presets

Reusable methodology can be composed as:

```text
IDTSPE Core Pack
+
Target-family Pack
+
Workspace Pack when applicable
+
specialized domain Pack when applicable
+
command Permission Pack
```

Possible generic core pack:

```text
Need / Value / Scope Lens
Authority / Source-of-Truth / Reuse Lens
Uncertainty / Assumption / Reversibility Lens

Source Contract Validator
Q/R/P Lifecycle Validator
Decision Persistence Validator
Decision Revalidation Readiness Validator
Target Projection Conformance Validator
Mode Separation Validator

core Guards / Rules
```

Workspace Pack:

```text
Dependency & Change Impact Lens
Workspace Evolution / WEUC Lens
Verifiability / Observability / Operability Lens

WEUC Loop Validator
Dependency Relation Validator
```

A Pack references modules owned by their correct semantic methodology owners.

---

# 18F. Command / UC Composition

Example conceptual composition:

```text
собери идеи слайса
=
route / permission rules
+ IDTSPE Core Pack
+ Application SDS topology
+ Slice Target Contract
+ Slice Source Contract
+ Slice RQ/preset rules
+ Workspace Pack when applicable
+ Idea Review
+ projection adapter
+ Slice Target Projection Validator
+ Pre-Update handoff
```

This makes omitted methodology detectable without requiring a hand-authored composition graph.

---

# 18G. Automated Methodology Validation Direction

Stable rule identities/applicability can eventually support checks such as:

```text
INTEGRATE
→ Current Target must be resolved

accepted Decision with residual Q/R/P
→ Revalidation Readiness Validator must pass

workspace-oriented Target
→ WEUC applicability checked

plan-only route
→ Permission Guard active

Slice projection
→ Slice Target representation conformance passes
```

Do not automate rules that still require unresolved semantic judgment.


# 19. Lens Selection

Do not apply every Lens to every Target.

Lens Set may come from:

```text
core/default Lens candidates
+ Planning Topology stage
+ Target-family preset
+ Target Contract
+ Source-triggered applicability
+ Evidence-triggered applicability
+ explicit user/agent choice
```

Lens selection itself may become an RQ for complex/high-impact Targets.

Simple/preset cases can inherit it mechanically.

---

# 20. Suggested Core-Lens Candidates

Strong generic planning Lens candidates:

```text
Need / Value / Scope
Authority / Source-of-Truth / Reuse
Uncertainty / Assumption / Reversibility
```

These are still proportional rather than mandatory noise-generators.

Contextual Lenses are selected by Target/Topology/environment/applicability.

Revalidation, projection completeness, Source correctness, persistence correctness and permission correctness are handled by lifecycle Rules / Validators / Guards, not by adding peer Lenses.

# 21. Workspace / Codebase Preset

Likely default contextual Lens Set:

```text
Need / Value / Scope
Authority / Source-of-Truth / Reuse
Uncertainty / Assumption / Reversibility

Dependency & Change Impact
Workspace Evolution / WEUC
Verifiability / Observability / Operability
```

Domain-specific quality lenses are added when relevant.

---

# 22. Documentation / Repository Preset

Likely Lens Set:

```text
Need / Value / Scope
Authority / Source-of-Truth / Reuse
Uncertainty / Assumption / Reversibility

Dependency & Change Impact
Workspace Evolution / WEUC
Verifiability / Observability / Operability
```

Important documentation-specific checks can live in Target Contract/Lens presets rather than becoming generic peer lenses.

---

# 23. Programming Principles And Architecture Heuristics

Do not treat principles such as:

```text
DRY
SRP
OCP
high cohesion
low coupling
encapsulation
dependency inversion
```

as isolated normative architecture goals.

Preferred model:

```text
principle
→ risk/problem situation archetype
→ concrete Lens prompts
→ detect a real problem signature
→ formulate RQ / candidate Idea / Pattern
→ evaluate through contextual Lenses
```

For workspace/codebase architecture, pair principle-based candidates with Workspace Evolution/WEUC.

Example:

```text
duplicated code/knowledge observed
↓
DRY-derived prompt:
  do these sites represent one piece of knowledge
  and do they repeatedly require synchronized edits?
↓
Idea:
  extract abstraction
↓
Dependency Lens:
  would abstraction create unwanted coupling?
↓
WEUC:
  does actual recurring work become cheaper?
↓
Decision
```

The correct Decision may intentionally preserve duplication.

```text
pattern/principle purity
≠ architecture objective
```

---

# 24. Reusable Risk-Situation / Pattern Knowledge

Architecture and other methodology areas can accumulate:

```text
Problem/Risk Situation Archetype
applicability conditions
observable signals
RQ archetypes
candidate Patterns/Ideas
Lens prompts
typical WEUC effects
counterexamples
Evidence expectations
failure modes
```

This is reusable planning intelligence without hard-coded answers.

---

# 25. Idea Review — Current Mapping

Earlier `собери идеи` Standard Review checks remain useful but are now mapped into engine mechanics/Lenses.

Original-style checks:

```text
Source / Status
Problem / Need
Proposed Answer
Expected Effect
Necessity / Better Route
Possible Refinements
Local Consistency
Integrated Consistency
Current Conclusion
```

Modern mapping:

### Source / Status
Source Contract + planning state.

### Problem / Need
Need / Value / Scope Lens.

### Proposed Answer
Idea/Variant.

### Expected Effect
Need / Value / Scope Lens.

### Necessity / Better Route
Need / Value / Scope + Authority/Reuse.

### Possible Refinements
Idea/Variant discovery.

### Local Consistency
Target Contract + relevant contextual Lenses.

### Integrated Consistency
Authority/Source + Dependency Impact + Decision Compatibility.

### Current Conclusion
Decision / defer / reject / keep-open.

Deep Review additionally includes:

- constraints/unknowns;
- variants;
- assumptions;
- dependencies;
- Evidence/tests;
- combination evaluation;
- selected variant;
- reconsideration triggers.

These map into current Lenses/QRP rather than forming a duplicate fixed checklist.

---

# 26. Shared Evaluation Lenses For Ideas

An accepted RQ can have a selected Lens Set applied to every candidate Idea.

Example:

```text
RQ:
  How should external delivery be realized?

Lens Set:
  Dependency & Change Impact
  Workspace Evolution / WEUC
  Evidence / Reversibility
  Proof / Verification
```

The Lens itself does not assert:

```text
R: lock-in is high
```

Instead it prompts each Idea to produce its concrete finding:

```text
Idea A
→ R-A-lockin: high because ...

Idea B
→ R-B-lockin: low because ...
```

Thus:

```text
Idea concern surface
=
concerns instantiated through shared Lens Set
+
Idea-specific Q/R/P
```

---

# 27. Idea Split / Bundle Methodology

## Split when

- parts can be accepted independently;
- one part can fail without invalidating the other;
- parts answer different RQs;
- they have different Q/R/P;
- different Sources/Lenses/Evidence evaluate them;
- different owners are responsible;
- realization/reconsideration horizons differ.

## Bundle when

- value exists only together;
- one answer semantically requires another;
- split produces fake/non-viable combinations;
- Evidence and concerns apply to the integrated package;
- the architecture pattern is genuinely a coupled answer.

The same split/merge logic applies to RQ discovery.

---

# 28. Saved Idea Portfolio

Useful unselected Ideas may be retained:

```text
Alternative Idea
Fallback Idea
Deferred Idea
Adjacent Idea
Unreviewed-but-worth-preserving Idea
```

Retain when:

- plausible future alternative;
- known fallback for residual Risk;
- expensive to rediscover;
- useful Evidence/QRP already attached;
- deferred due to timing/constraint rather than low value;
- belongs to another useful future RQ/Target.

Do not store every brainstorm fragment.

---

# 29. Evidence Model

Evidence relations may include:

```text
SUPPORTS
WEAKENS
ANSWERS
RESOLVES
MEASURES
TRIGGERS
CONTRADICTS
INVALIDATES
```

Examples:

```text
API docs
  ANSWERS Q-17

runtime incident
  TRIGGERS R-22

WEUC observation
  MEASURES P-31

Practical Test
  WEAKENS D-07 rationale
```

A material Q/R/P may define an Evidence Contract:

```text
evidenceNeeded
expectedSource
expectedTimeOrEvent
measurement
threshold
evaluationRule
DecisionImpact
```

Actual Evidence remains a separately traceable Source.

---

# 30. Evidence By Concern Type

## Question

Evidence answers or narrows an unknown.

## Risk

Evidence updates indicators/likelihood and may cross a reconsideration trigger.

## Problem

Evidence measures present severity or proves remediation.

---

# 31. Decision Reconsideration Contracts

Residual Q/R/P are durable planning memory.

## Residual Risk

Should tell future planning:

- what to watch;
- where Evidence comes from;
- what threshold/event matters;
- when to revisit;
- which Decision/RQ/Scope reopens;
- which fallbacks exist.

## Residual Question

Should tell:

- what answer is missing;
- when/how it may become available;
- which answers confirm/weaken/reopen/invalidate.

## Residual Problem

Should tell:

- what known defect is tolerated;
- why now;
- what measurement matters;
- when tolerance ends;
- what Decision/Target must change.

---

# 32. Decision Revalidation Lifecycle

Revalidation is not a peer Lens.

It is a lifecycle mechanism applied to accepted Decisions when new state appears.

Inputs:

```text
Current Target
Target-Scope Decision
Question-Set Decision
answer Decisions
residual Q/R/P
new Decisions
new Practical Evidence
new WEUC Evidence
changed canonical Sources
changed constraints
```

The primary future-review helpers are the residual Q/R/P reconsideration contracts prepared at Decision time.

Evaluation:

```text
Did a residual Q receive a material answer?
Did a residual Risk indicator/threshold fire?
Did an accepted Problem cross its tolerance limit?
Does new Evidence contradict an assumption/rationale?
Does a new Decision compose badly with an older Decision?
Did a relevant Source/constraint materially change?
```

Disposition:

```text
no material challenge
→ reaffirm

answer-level challenge
→ reopen one RQ

question-set/framing challenge
→ reopen RQ Discovery

Target/problem-boundary challenge
→ reopen Target/Scope Discovery

upstream semantic Source challenge
→ explicit owner correction
```

When a choice reopens, the normal applicable planning Lenses run again.

The separate command/process conformance requirement is:

```text
Decision Revalidation Readiness Validator
```

which checks that retained material Q/R/P contain enough future Evidence/trigger information for this lifecycle to work.

---

# 33. WEUC As Source + Lens + Feedback Loop

WEUC has multiple distinct roles.

## 33.1 Current WEUC State — Source

Current Workspace evolution knowledge:

- Workspace UCs;
- contextual WEUC;
- work paths;
- current pressure;
- architecture state;
- observed work cost.

## 33.2 WEUC Lens — Evaluation

Candidate Ideas/Decisions are evaluated against recurring workspace work.

## 33.3 Projected WEUC Impact

Expected effect of candidate/Decision:

- work paths;
- owners touched;
- context load;
- coordination;
- verification;
- debugging/operations;
- blast radius;
- frequency;
- preparation-now/deferred cost.

## 33.4 Accepted WEUC Impact

When Decision is selected:

```text
Projected WEUC Impact
→ accepted expectation/rationale attached to Decision
```

## 33.5 Observed WEUC Evidence

After realization:

```text
actual development/maintenance/verification work
→ observed WEUC evidence
```

## 33.6 WEUC State Reconciliation

```text
previous Current WEUC State
+ accepted WEUC Impact
+ observed WEUC Evidence
→ updated normalized Current WEUC State
```

Updated state becomes Source for later IDTSPE.

Thus:

```text
IDTSPE N
consumes WEUC State N
→ Decision + Accepted WEUC Impact

realization
→ Observed WEUC Evidence
→ WEUC State N+1

IDTSPE N+1
consumes WEUC State N+1
```

This is cumulative architecture learning.

---

# 34. Documentation / Repository WEUC Maintenance

For a material documentation/repository change:

```text
resolve affected Workspace/documentation UC
↓
resolve current relevant WEUC
↓
project impact
↓
Decision
↓
realize
↓
observe actual recurring work/path effect
↓
update WEUC only when materially changed
```

Valid result:

```text
WEUC checked
→ no material impact
→ no WEUC update
```

Do not manufacture WEUC for every Markdown/code edit.

---

# 35. Dependency Semantics

Dependency/relation mechanisms must remain distinct.

## Semantic source / derivation

One meaning derives from/depends semantically on another owner.

## Composition / reuse

One capability/workflow reuses another component.

## Ordinary navigation

Link only.

## Reference Object

Literal/shared exact meaning synchronization.

## Bounded Reference Object dependent fragment

A bounded consumer fragment requiring review/sync semantics.

## Whole-file Review Dependency

Source change requires consumer semantic review.

## Ordered Reference List

Order/projection semantics.

## Generated projection/index

Non-authoritative derived view.

Critical rule:

```text
semantic dependency
≠ automatically Review Dependency
```

Use the narrowest mechanism that matches actual freshness/review obligation.

---

# 36. Dependency & Change Impact Output

When material, candidate/selected Decision analysis can record:

```text
affected semantic owners
affected dependency edges
affected files/modules/classes/methods/schemas/etc
consumers
blast radius
migration/compatibility
freshness/review obligations
reusable components
```

This is evaluation/planning information.

It does not itself grant mutation.

---

# 37. Target Contract

Every material Target Type should conceptually define:

```text
Target Type
identity rules
semantic owner
valid Target State contract/template

Source Contract:
  required/proportional Sources

Lens preset:
  recommended/required contextual lenses

RQ archetypes:
  common questions when material

evidence boundary:
  what Evidence may challenge/refine it

proof / acceptance obligations

downstream handoffs
```

The contract does not mean every Target needs one physical file.

Semantic identity and physical organization remain separate.

---

# 38. Target Projection Conformance

After planning has selected a Target Decision State:

```text
Target Decision State
+ Target Contract
↓
Projection / rendering / persistence
↓
Target Projection Conformance Validator
```

This validator asks whether the command/engine represented the selected Target correctly.

It does **not** decide whether the Target itself was semantically wise.

Checks:

- every required/proportional Target area represented;
- all material selected meaning projected;
- unchanged accepted meaning preserved in INTEGRATE;
- correct canonical owners used;
- no required target frame omitted;
- no Idea-local view substituted for complete Target representation;
- delegated/later/outside/non-goal meaning retained where the contract requires it;
- proof and handoffs represented where required.

Target semantic correctness remains owned by Target-specific methodology plus planning Lenses/Decisions.

# 39. Target As Decision State

For one scoped IDTSPE:

```text
Target Decision State
=
Target-Scope Decision
+ Question-Set Decision
+ Active RQs
+ answer Decisions
+ residual Q/R/P
+ Concern Groups
+ retained Ideas
+ Evidence links
```

The domain-specific Target is a semantic projection of this state through its Target Contract.

This means planning can be viewed as a system of questions/answers/Decisions while still preserving target-specific semantic ownership.

---

# 40. Planning Topology

Complex Needs may benefit from a pre-designed map:

```text
Overall Need
↓
Stage A Target
  Source Contract
  Target Contract
  Lens preset
  output Source of Truth
↓
Stage B
  consumes A
  ...
↓
Stage C
```

Purpose:

- maximize one-directional planning;
- isolate concerns by stage;
- resolve high-cost uncertainty early;
- produce reusable Sources;
- reduce later invalidation;
- avoid mixing every concern into one giant planning session.

A Planning Topology may be:

- reusable for a problem family;
- one-off for an important complex Need.

Planning Topology can itself be an IDTSPE Target.

---

# 41. Presets

A preset can bundle reusable configuration:

```text
Target family / topology
Target Contract
Source Contract
Lens preset
RQ archetypes
Pattern library references
Evidence expectations
handoffs
```

Preset:

```text
reduces discovery cost
≠ pre-decides concrete Target
```

Concrete Need/Target/RQs/Ideas/Decisions remain contextual.

---

# 42. SDS Placement

Application SDS is a rich pre-designed Application Planning Topology / Target-family preset.

Canonical directed meaning to preserve:

```text
REAL-LIFE NEED / CURRENT REALITY / REAL-LIFE SCENARIO
↓
APPLICATION RESPONSIBILITY / CONCEPT
↓
APPLICATION SCENARIO
↓
BEHAVIOR ITEMS + DATA OBJECTS
↓
REQUIREMENTS / SCREENS when material
↓
DOMAIN DISCOVERY
  repeated behavior/data/rules → candidates
↓
CANONICAL DOMAIN
  Entities
  Value Objects
  Aggregates / Roots
  invariants
  policies
  lifecycle
  ownership / references
↓
SLICE STRATEGY
↓
INDEPENDENT / DELIVERABLE / TESTABLE SLICES
↓
REALIZATION / PRACTICAL EVIDENCE
↓
explicit correction upstream only when Evidence requires it
```

This is SDS-specific topology, not generic IDTSPE hard-code.

---

# 43. Need And Real-Life Scenario — SDS Follow-Up Direction

The discussion exposed an important SDS gap.

Need and Real-Life Scenario should be considered for stronger first-class representation, comparable in discipline to Scenario/Slice.

## Need candidate contract

Could include:

```text
Identity
Actor / Stakeholder
Desired Real-World Outcome
Current Reality
Gap / Pressure
Why It Matters
Evidence
Constraints
Success Meaning
Boundaries
Related Real-Life Scenarios
Decisions / Q/R/P
```

## Real-Life Scenario candidate contract

Should represent the whole real-world sequence:

```text
Need arises
↓
actor acts in real life
↓
reaches a point where Application may help
↓
Application interaction
↓
Application result
↓
actor returns to real-world process
↓
uses result
↓
real-world outcome
```

Application Scenario remains only Application behavior authority within that wider real-life flow.

Exact repository realization is not selected here.

---

# 44. Slice Target Example — Coverage Principle

A Slice IDTSPE Target Contract may require, when material:

```text
selected Application Scenario(s)
Covered Behavior Items
DATA Objects
Requirements
Screens/spatial meaning
Canonical Domain owners/invariants
Current Slice baseline for INTEGRATE
architecture/WEUC evidence
delivery constraints
testing/proof obligations
```

The Target Projection Conformance Validator ensures the output remains a full Slice plan rather than just a list of implementation ideas.

---

# 45. Pre-Update

Pre-Update is the bridge from selected Target State into exact realization planning.

It is **not** a Lens.

Full contract:

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

Pre-Update remains plan-only.

It does not inherit mutation/implementation/commit/push permission.

Before Decision, candidate choices can be evaluated by Dependency & Change Impact and WEUC Lenses.

After Decision, Pre-Update plans exact transition.

---

# 46. Realization Boundary

The complete methodology lifecycle includes realization, but planning permission does not imply realization permission.

Depending on target, realization can mean:

- documentation edits;
- code changes;
- package generation;
- local execution;
- tests;
- prototype;
- deployment/operation;
- user acceptance.

Each adapter keeps its own permission contract.

---

# 47. Practical Evidence Collection

After realization collect material evidence:

- implementation result;
- tests;
- Coverage;
- runtime behavior;
- ReviewDiff;
- user acceptance;
- operations;
- performance;
- observed work cost;
- returned files/artifacts.

Compare:

```text
Projected Target
vs
Actual Realized State
```

and when relevant:

```text
Projected/Accepted WEUC Impact
vs
Observed WEUC Evidence
```

---

# 48. Reconciliation Outcomes

## 48.1 ACCEPT

Target and observed impact are acceptable.

## 48.2 LOCAL CORRECTION

Realization defect; planning Decisions remain valid.

```text
same Target
→ fix implementation/materialization
```

## 48.3 ANSWER RE-OPEN

Evidence challenges an accepted answer.

```text
Decision residual Q/R/P
→ reopen one RQ
```

## 48.4 QUESTION-SET RE-OPEN

Evidence challenges which questions were asked.

```text
Question-Set Decision residual Q/R/P
→ reopen RQ Discovery
```

## 48.5 TARGET-SCOPE RE-OPEN

Evidence challenges bounded problem/result.

```text
Target-Scope Decision residual Q/R/P
→ reopen Target/Scope Discovery
```

## 48.6 UPSTREAM SEMANTIC CORRECTION

Evidence proves upstream canonical meaning wrong/incomplete.

```text
Evidence
→ explicit upstream owner correction
→ review actual downstream dependents
```

No silent backflow.

---

# 49. Full Modular IDTSPE Loop

```text
TRIGGER
↓
resolve / reuse NEED
↓
use / design PLANNING TOPOLOGY when warranted
↓
TARGET / SCOPE DISCOVERY
  candidates
  Need/Value/Scope Lens
  other applicable Lenses
  candidate Q/R/P
↓
TARGET-SCOPE DECISION
  residual Q/R/P
↓
resolve typed SOURCE CONTRACT
  reuse accepted Sources of Truth
↓
RESOLUTION QUESTION DISCOVERY
  RQ candidates
  question-set alternatives
  applicable Lenses
  candidate Q/R/P
↓
QUESTION-SET DECISION
  residual Q/R/P
↓
for each ACTIVE RQ:
    select Lens Set
    load/generate Ideas / Patterns
    instantiate Lens-driven Q/R/P
    add Idea-specific Q/R/P
    collect/use Evidence
    compare candidates
    review Dependency / WEUC / Proof / Constraints when applicable
    select Decision
    attach residual Q/R/P
    retain useful alternatives/fallbacks
↓
TARGET DECISION STATE
↓
TARGET CONTRACT PROJECTION
↓
TARGET PROJECTION CONFORMANCE VALIDATION
↓
complete PROJECTED TARGET STATE
↓
Dependency / Change Impact
+ Projected / Accepted WEUC Impact
+ handoffs
↓
PRE-UPDATE
↓
explicit authorization
↓
REALIZATION
↓
PRACTICAL / TEST / REVIEW / WEUC EVIDENCE
↓
DECISION REVALIDATION LIFECYCLE
↓
ACCEPT
or
LOCAL CORRECTION
or reopen:
  answer
  question set
  target scope
  explicit upstream source
↓
loop
```

---

# 50. Planning Output Contract

A full material planning pass should be able to expose:

```text
Target Identity / Type
Mode: CREATE | INTEGRATE
Need / Target Scope
Target-Scope Decision

Source Contract
Sources actually used
Source roles / authority

Current Target
  none for CREATE

Current relevant WEUC State

Question-Set Decision
Active Resolution Questions

Ideas / Variants
Q/R/P
Concern Groups
Decisions
retained Alternatives / Fallbacks

Projected Target State

INTEGRATE:
  Delta From Current
  Preserved Existing Meaning

Dependency & Change Impact
Projected WEUC Impact
Accepted WEUC Impact when Decision selected

Proof / Architecture / Testing / other handoffs

Current Overall Conclusions
Pre-Update readiness
```

---

# 51. Post-Realization Output Contract

```text
Actual Realization Evidence
Actual Coverage / proof
ReviewDiff findings when relevant
Observed WEUC Evidence / Impact
Target Reconciliation Result
WEUC State Reconciliation
correction / re-open / accept disposition
updated residual Q/R/P / Decisions
```

---

# 52. Provenance Chain

When present, relations should be inspectable:

```text
Source
→ Trigger / Idea / Evidence / Constraint
→ Q/R/P
→ Concern Group
→ Idea / Variant
→ Decision
→ Projected Target change
→ Dependency impact
→ WEUC impact
→ Realization
→ Practical Evidence
→ Reconciled state
```

Not every simple planning task needs every node.

---

# 53. Current Repository UC / Command Crosswalk

This is a conceptual crosswalk, not a proposal to make IDTSPE a new semantic root above all UCs.

## 53.1 Current generic Idea ingress

```text
UC-PLAN-COLLECT-IDEAS
command: собери идеи
```

This is the closest current user-facing use of the methodology from which IDTSPE evolved.

Its current placement/ownership should be reviewed if IDTSPE becomes explicitly cross-cutting.

## 53.2 Workspace Target adapters

```text
UC-PLAN-WORKSPACE-ESTABLISH-UC
→ CREATE-like Workspace Target

UC-PLAN-WORKSPACE-CHANGE-UC
→ INTEGRATE-like Workspace Target

UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY
→ multi-target/topology review
```

## 53.3 Application/SDS target adapters

Existing Need/Solution/Scenario/Domain/Realization/Slice/Consistency UCs remain target-specific semantic owners or analyzers.

IDTSPE orchestrates; it does not copy their methodology.

## 53.4 Architecture / WEUC analyzers

Existing architecture UCs for:

- Architecture State;
- Workspace Uses;
- Paths;
- Change Pressure;
- Architecture Decision;
- Architecture Evolution;
- WEUC discovery

supply Sources, Lenses/analyzers and Decisions when material.

## 53.5 Testing adapters

Existing Testing Strategy, Test Design, Practical Test Plan and Coverage UCs supply proof planning and Evidence.

## 53.6 Documentation/repository adapters

Existing documentation planning/update/file-update/package/ReviewDiff/returned-file routes map to:

- target planning;
- Pre-Update;
- realization/materialization;
- evidence/reconciliation.

## 53.7 `собери идеи X`

Conceptually:

```text
IDTSPE
+ target/preset binding
```

Examples already current include Application/Scenario/Domain/Slice variants.

`собери идеи документации` remains a proposed direction until exact repository route is selected.

---

# 54. IDTSPE Semantic Ownership Question

Do not automatically create one universal semantic UC called IDTSPE.

Likely clean model:

```text
IDTSPE
= reusable methodology / orchestration engine

UC-PLAN-COLLECT-IDEAS
= one current user-facing invocation/use

Target UCs
= semantic owners of independently useful Target results
```

Whether a distinct reusable documentation/Workspace UC is needed remains a planning question.

---

# 55. Linked Notes Direction

Desired eventual query/resolution support:

```text
resolveTarget(...)
sources(target)
contextBundle(target | uc | command)
dependencies(target)
dependents(source)
reviewState(target)
weucContext(target)
Decision/QRP/Evidence relations
impact(changedSources)
validateSources(target)
```

Linked Notes remains:

```text
resolver / navigation / query / projection / freshness mechanism
≠ semantic authority
```

Do not turn every semantic relation into Review Dependency.

A read-only agent/tool surface should come only after relation semantics are stable.

---

# 56. Graph Question

Still open:

```text
Q-GRAPH:
Do generated UC/command composition graphs provide enough value
after Target Contracts, Sources, Lenses and explicit handoffs exist?
```

Potential benefit:

- inspect composition;
- detect omitted stage;
- context bundles;
- impact navigation.

Potential cost:

- extra schema/tooling;
- duplicate projection;
- mistaken authority;
- maintenance burden.

Current rule:

```text
IDTSPE must not depend on graph support.
```

Never maintain a second hand-authored graph authority merely for visualization.

---

# 57. Naming Questions

## IDTSPE

`Idea-Driven` is no longer semantically exact:

```text
Need is root
Ideas are candidate answers
```

Keep acronym/working name until public terminology is intentionally selected.

## Resolution Question

Current working term is clearer than `Decision Question`.

Alternatives remain open:

- Resolution Question;
- Solution Question;
- Choice Question;
- Planning Question.

Avoid conflating with `Q` in Q/R/P.

---

# 58. Current Selected Model Decisions

## D-01 — Need-rooted scoped engine
IDTSPE starts semantically from Need and works within one selected Target/Scope.

## D-02 — Typed Sources
Every material Target uses an explicit Source Contract with role/authority distinctions.

## D-03 — Prior work reusable by default
Accepted current work becomes Source of Truth for later instances unless concretely challenged.

## D-04 — No fixed reverse ladder
Target/Planning Topology defines prior Sources/stages; revalidation is challenge-driven.

## D-05 — Three choice lifecycles
Target/Scope, RQ Set and Answer/Idea are the three generic choice/re-open levels.

## D-06 — Q/R/P lifecycle
Candidate Q/R/P evaluates a possible choice; unresolved material Q/R/P becomes residual accepted-Decision reconsideration state.

## D-07 — Revalidation readiness is validated at Decision time
Whenever material residual Q/R/P remain, the Decision Revalidation Readiness Validator ensures Questions have answer/evidence hooks, Risks have indicators/triggers, and Problems have tolerance/remediation thresholds.

## D-08 — Revalidation is lifecycle, not Lens
Later new Evidence/Decisions/Sources are checked against accepted Decisions and residual Q/R/P; the narrowest invalid choice reopens.

## D-09 — Evidence is Source, not argument
Evidence is observed/authoritative input. Q/R/P and Decision rationale interpret it.

## D-10 — Proof is Evidence output, not peer Lens
The planning Lens is Verifiability / Observability / Operability. Planned/actual proof becomes Evidence.

## D-11 — Delivery constraints are Sources
Deadline/capacity/release/external constraints influence scope/ideas/order through rules; no peer Delivery Lens is selected.

## D-12 — Concern Groups preserved
Related mixed Q/R/P may group by shared resolution surface without losing individual ownership.

## D-13 — Minimal module taxonomy
Use only Lens, Validator, Guard, ordinary Rule and Pack as first-class reusable methodology categories for now.

## D-14 — Target Projection Conformance is validation
Representation completeness/correctness is a Validator concern, distinct from semantic Target correctness.

## D-15 — Rule Packs compose reusable methodology
Target families, environments and commands can reuse selected modules/rules without copying methodology prose.

## D-16 — WEUC full feedback loop
Current state → projected impact → accepted impact → observed evidence → reconciled state → later Source.

## D-17 — Programming principles conditional
Principles/patterns are heuristics/problem signatures, evaluated against actual contextual Lenses, especially WEUC in workspace architecture.

## D-18 — Dependency mechanisms remain distinct
Semantic relation, synchronization and review obligations are not collapsed.

## D-19 — Pre-Update stays post-decision and plan-only
Use the full eight-part dependency-aware Pre-Update contract.

## D-20 — SDS is a preset/topology
SDS is a rich Application-specific Planning Topology/Target family, not the generic engine.

## D-21 — Graph remains open
No generated graph requirement yet.

---

# 59. Open Questions

## Q-REVAL-01 — Revalidation Readiness contract

Which residual Q/R/P fields are mandatory versus proportional?

## Q-EVAL-01 — Positive evaluation findings

Do positive arguments/rationale need a first-class structured representation, or is Decision rationale + cited Evidence sufficient?

Current direction:
do not add a new entity until a real use case requires it.

## Q-MODULE-01 — Minimal module taxonomy

Current selected public types are:

```text
Lens
Validator
Guard
Rule
Pack
```

Do not expand without demonstrated need.


## Q-RULE-01 — Rule Module representation

Should reusable Rule Modules have stable IDs/metadata or remain semantic sections indexed/generated for discovery?

## Q-RULE-02 — Minimal module schema

Which fields are worth persisting versus deriving from methodology owners?

## Q-RULE-03 — Pack composition

Should Rule Packs be explicit declarations or derived from Target Contract/workflow/route references?

## Q-RULE-04 — Automated semantic tests

Which methodology rules are precise enough for mechanical validation?

## Q-RULE-05 — Rule Set Coverage

Can applicability validation avoid becoming another brittle global authority?


## Q-01 — Final IDTSPE public name

Need-driven semantics make “Idea-Driven” imperfect.

## Q-02 — Final name for Resolution Question

Working term only.

## Q-03 — Minimal persistent Source Contract schema

Conceptual roles are selected; repository syntax is not.

## Q-04 — Minimal persistent Lens contract

Which fields need stable identity vs workflow prose?

## Q-05 — Core Lens preset

Are all five core/near-core lenses needed by every material target, or should only some be globally default?

## Q-06 — Lens discovery/index

Should semantic owners keep lenses locally with only a generated catalog/index?

## Q-07 — Programming-principle library shape

Individual lenses vs risk-situation archetypes vs a combined architecture knowledge library.

Current direction favors risk/problem archetypes + Pattern candidates + Lens prompts.

## Q-08 — Explicit RQ identity/storage

When should RQs/Decisions become stable independently addressable entities vs embedded target planning state?

## Q-09 — Planning Topology durability threshold

When is a one-off topology worth a reusable owner?

## Q-10 — Formal Need / Real-Life Scenario repository realization

SDS-specific follow-up.

## Q-11 — Linked Notes typed Source/Evidence/Decision relations

Exact relation schema/tooling remains open.

## Q-12 — Graph value

Still evidence/prototype question.

---

# 60. Consistency Checklist Against Accumulated Discussion

This v3 intentionally preserves:

- Need/Reality as semantic root;
- Trigger as entry point only;
- generic target-driven topology rather than fixed SDS ladder;
- SDS as rich Application preset/topology;
- Source-of-Truth reuse by default;
- one-directional staged planning;
- challenge-driven reverse traversal;
- bounded correction propagation;
- typed Source Contract;
- Target Contract;
- CREATE;
- INTEGRATE;
- preservation + Delta;
- SHOW CURRENT separation;
- Evidence-driven reconciliation;
- Target as scoped Decision State;
- Target/Scope choice before RQ discovery;
- RQ candidates and Question-Set Decision;
- Ideas as candidate answers;
- Patterns as reusable candidate answers;
- Idea split/bundle rules;
- saved alternatives/fallbacks;
- three repeated Q/R/P choice lifecycles;
- Concern Groups;
- Evidence contracts/relations;
- residual Q/R/P as reconsideration contracts;
- no mandatory persisted Source-state enum;
- Lenses as reusable planning-evaluation concern generators;
- Validators/Guards as separate command/process/output correctness mechanisms;
- Target Projection Conformance as a Validator;
- reusable Rule Packs and Rule Set Coverage validation direction;
- Lens applicability/presets;
- WEUC as Source + Lens + feedback loop;
- Accepted WEUC Impact;
- WEUC State Reconciliation;
- documentation/repository proportional WEUC maintenance;
- programming principles contextualized by WEUC;
- dependency relation distinctions;
- dependency/change-surface evaluation;
- Pre-Update separate from Lens evaluation;
- full eight-part Pre-Update;
- explicit permission boundary;
- realization/evidence loop;
- ACCEPT / LOCAL CORRECTION / three selective re-open levels / upstream correction;
- Target-specific semantic authority;
- full Projected Target as main planning result;
- output/provenance contracts;
- Linked Notes as infrastructure, not authority;
- current UC/command crosswalk;
- formal Need/Real-Life Scenario SDS direction;
- graph as open question;
- naming as open question.

No earlier selected semantic direction is intentionally discarded.

Where earlier drafts conflicted, this v3 prefers:

```text
orthogonal peer Lenses
+ typed reusable Rule Modules / Validators / Guards
+ composable Rule Packs
+ three repeated choice lifecycles
+ target-specific contracts
+ explicit Source/Evidence/Decision provenance
```

over duplicated checklists and overlapping abstractions.
