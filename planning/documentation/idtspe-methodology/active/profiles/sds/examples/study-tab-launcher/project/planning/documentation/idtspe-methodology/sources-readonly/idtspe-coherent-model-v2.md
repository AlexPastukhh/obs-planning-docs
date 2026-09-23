# IDTSPE Coherent Model v2

Status: clean reconstruction after Lens + coverage audit  
Working identifier: `IDTSPE`  
Repository mutation: none  
Role: candidate canonical planning model, replacing `idtspe-coherent-model-v1.md` as the current clean capture  
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

# 17. Revised Non-Overlapping Lens Taxonomy

## 17.1 L1 — Need / Value / Scope Lens

Core question:

```text
Are we solving a real/worthwhile Need
through the right bounded result and useful planning questions?
```

Evaluates:

- Trigger vs Need;
- real desired outcome;
- Expected Effect;
- value;
- necessity;
- Better Route;
- opportunity cost;
- reuse existing Target vs create new;
- scope too broad/narrow;
- independent problems mixed;
- premature stage;
- deferred/non-goal boundary;
- whether an RQ materially contributes to the Target.

This Lens applies strongly to Target/Scope and RQ-set choice and can also evaluate whether an Idea actually delivers the expected effect.

## 17.2 L2 — Authority / Source-of-Truth / Reuse Lens

Core question:

```text
Are we using the right authoritative meaning
and preserving/reusing prior work correctly?
```

Evaluates:

- canonical owner;
- Source roles/authority;
- semantic layer ownership;
- non-authoritative projection/example/history use;
- duplicate truth;
- re-derivation;
- silent downstream redefinition;
- accepted prior work;
- superseded Decisions;
- unnecessary replanning.

This Lens absorbs the earlier separate:
- Source-of-Truth/Reuse;
- Consistency/Semantic Authority.

## 17.3 L3 — Evidence / Uncertainty / Reversibility Lens

Core question:

```text
What is fact vs assumption,
what Evidence is worth getting,
and how expensive is being wrong?
```

Evaluates:

- uncertainty;
- confidence;
- missing Evidence;
- evidence timing;
- prototype/experiment value;
- irreversible commitment;
- reversibility;
- decision-delay cost;
- wrong-decision correction cost.

## 17.4 L4 — Decision Compatibility & Revalidation Lens

Core question:

```text
Does new state challenge any accepted prior Decision?
```

Inputs:

- new Decisions;
- residual Q/R/P;
- Practical Evidence;
- WEUC Evidence;
- changed canonical Sources;
- changed constraints.

Evaluates:

- contradiction;
- supersession;
- composition effects;
- residual risk/question trigger;
- answer-level invalidation;
- RQ-set invalidation;
- Target-Scope invalidation.

Example composition effect:

```text
D1 is reasonable alone
D2 is reasonable alone
D1 + D2
→ duplicated owner / expensive WEUC / unwanted coupling
→ reopen relevant earlier Decision
```

This is both:
- a reusable Lens;
- the main Lens invoked during explicit reconciliation/revalidation stage.

## 17.5 L5 — Target Contract & Coverage Lens

Core question:

```text
Does the resulting Target completely satisfy
the canonical Target-specific contract?
```

Evaluates:

- required/proportional Target fields;
- source coverage;
- semantic invariants;
- required Decisions/results;
- acceptance/proof obligations;
- handoffs;
- INTEGRATE preservation;
- missing canonical target frame.

The target-specific owner/template supplies these checks.

This Lens prevents Idea-focused output from replacing the canonical Target shape.

---

# 18. Contextual Lenses

## 18.1 L6 — Dependency & Change Impact Lens

Core question:

```text
What structural dependency and concrete change impact does this option create?
```

### Dependency facet
- direction;
- coupling;
- consumers;
- structural reuse;
- compatibility/migration relation;
- ownership edge changes.

### Change Surface facet
Potential affected units:

- files/artifacts;
- modules/packages;
- classes/interfaces;
- methods/functions;
- schemas/messages;
- persisted data;
- tests/fixtures;
- generated projections;
- runtime components.

### Freshness/review facet
- semantic dependent review;
- Reference Objects;
- bounded dependent-fragment review;
- Review Dependencies;
- stale obligations.

### Impact facet
- blast radius;
- synchronized edits;
- migration;
- rollback;
- consumer update set.

This merges earlier `Dependency/Reuse/Impact` and `Change Surface`.

Semantic-authority reuse belongs to L2.

## 18.2 L7 — Workspace Evolution / WEUC Lens

Core question:

```text
How does this option affect important recurring work
in the workspace/tool/codebase/documentation system?
```

Evaluates:

- Workspace UCs;
- contextual WEUC;
- understanding/discovery path;
- mutation/change path;
- verification path;
- runtime/operations/debugging path;
- frequency;
- owner count/locality;
- working-context load;
- coordination;
- failure/debugging complexity;
- future Change Pressure;
- Change Axes;
- preparation-now cost;
- deferred-change cost;
- Architecture Tax;
- migration/reversibility where architecture-relevant.

`Architecture Pressure` is a facet/derived finding, not a peer Lens.

## 18.3 L8 — Proof / Verification / Operability Lens

Core question:

```text
Can the Target/Decision be proved correct and operated safely?
```

Evaluates:

- acceptance;
- testability;
- positive proof;
- negative/no-mutation proof;
- observability;
- diagnosis;
- failure handling;
- operational verification;
- proof cost.

Boundary:

```text
Evidence/Uncertainty Lens
→ should we believe/select this candidate?

Proof/Verification Lens
→ can the selected result be demonstrated and operated correctly?
```

## 18.4 L9 — Constraint / Delivery Lens

Core question:

```text
How do real constraints affect order, split and staging?
```

Evaluates:

- deadline;
- milestone;
- capacity;
- external dependencies;
- release order;
- operational limits;
- reversible staging;
- deferral.

Constraint affects realization strategy, not semantic truth.

## 18.5 L10 — Specialized Quality Lenses

Examples:

- Security;
- Privacy;
- Performance;
- Reliability;
- Safety;
- Compliance;
- UX/Accessibility;
- Business/Economic Cost;
- domain-specific correctness.

Applicability is contextual.

---

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

Strong generic candidates:

```text
Need / Value / Scope
Authority / Source-of-Truth / Reuse
Evidence / Uncertainty / Reversibility
Decision Compatibility & Revalidation
Target Contract & Coverage
```

Whether all five are mandatory for every “material” IDTSPE remains an empirical design question.

They should still be proportional.

---

# 21. Workspace / Codebase Preset

Likely default contextual Lens Set:

```text
Need / Value / Scope
Authority / Source-of-Truth / Reuse
Evidence / Uncertainty / Reversibility
Decision Compatibility & Revalidation
Target Contract & Coverage

Dependency & Change Impact
Workspace Evolution / WEUC
Proof / Verification / Operability
Constraint / Delivery when material
```

Domain-specific quality lenses are added when relevant.

---

# 22. Documentation / Repository Preset

Likely Lens Set:

```text
Need / Value / Scope
Authority / Source-of-Truth / Reuse
Evidence / Uncertainty / Reversibility
Decision Compatibility & Revalidation
Target Contract & Coverage

Dependency & Change Impact
Workspace Evolution / WEUC
Proof / Verification / Operability
Constraint / Delivery when material
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

# 32. Decision Compatibility & Revalidation

This applies during ordinary INTEGRATE planning and after realization.

Inputs:

```text
Current Target
Target-Scope Decision
Question-Set Decision
answer Decisions
residual Q/R/P
new Decisions
Current WEUC State
Observed WEUC Evidence
Practical Evidence
changed Sources
changed constraints
```

Evaluation:

```text
Does anything challenge only an answer?
→ reopen one RQ

Does anything challenge the question set/framing?
→ reopen RQ Discovery

Does anything challenge Target/problem boundary?
→ reopen Target/Scope Discovery

Does Evidence prove an upstream canonical Source itself wrong?
→ explicit upstream owner correction

Otherwise:
→ preserve prior accepted work
```

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

# 38. Target Contract & Coverage Lens

Before declaring a Projected Target complete:

```text
Target Decision State
↓
Target Contract projection
↓
Coverage Lens
```

Check:

- every required semantic area covered;
- no target-specific invariant omitted;
- all material Sources accounted for;
- INTEGRATE preserved valid meaning;
- handoffs explicit;
- proof obligations explicit;
- no idea-focused local output substituted for full target shape.

---

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

The Target Contract & Coverage Lens ensures the output remains a full Slice plan rather than just a list of implementation ideas.

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
TARGET CONTRACT & COVERAGE CHECK
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
DECISION COMPATIBILITY & REVALIDATION
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

```text
Target/Scope
RQ Set
Answer/Idea
```

are the three generic choice/re-open levels.

## D-06 — Q/R/P lifecycle

Candidate Q/R/P evaluates a possible choice; unresolved material Q/R/P becomes residual accepted-Decision monitoring/reconsideration state.

## D-07 — Concern Groups preserved

Related mixed Q/R/P may group by shared resolution surface without losing individual ownership.

## D-08 — Evidence distinct

Evidence remains a Source linked to concerns/Decisions; it is not collapsed into Q/R/P.

## D-09 — Orthogonal Lens taxonomy

Peer lenses are normalized to reduce duplicated responsibilities.

## D-10 — Target Contract Coverage

Complete projected target state is checked against target-specific canonical contract/template.

## D-11 — WEUC full feedback loop

Current state → projected impact → accepted impact → observed evidence → reconciled state → later Source.

## D-12 — Programming principles conditional

Patterns/principles are reusable heuristics/problem signatures, evaluated against actual contextual Lenses, especially WEUC for workspace architecture.

## D-13 — Dependency mechanisms remain distinct

Semantic relation, synchronization and review obligations are not collapsed.

## D-14 — Pre-Update stays post-decision and plan-only

Use the full eight-part dependency-aware Pre-Update contract.

## D-15 — Selective reconciliation

After Evidence, reopen only the narrowest invalid choice/owner; preserve unaffected accepted work.

## D-16 — SDS is a preset/topology

SDS is a rich Application-specific Planning Topology/Target family, not the generic engine.

## D-17 — Graph remains open

No generated graph requirement yet.

---

# 59. Open Questions

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

This v2 intentionally preserves:

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
- Lenses as reusable concern generators;
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

Where earlier drafts conflicted, this v2 prefers:

```text
orthogonal peer Lenses
+ three repeated choice lifecycles
+ target-specific contracts
+ explicit Source/Evidence/Decision provenance
```

over duplicated checklists and overlapping abstractions.
