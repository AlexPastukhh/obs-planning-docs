# IDTSPE Coherent Model v1 — Scoped Decisions, Sources, Lenses, Q/R/P and Evidence

Status: clean reconstruction candidate  
Purpose: rebuild the accumulated IDTSPE ideas into one internally consistent model instead of continuing append-only revisions.  
Repository mutation: none.  
Historical/provenance artifacts remain separate.

---

# 1. Core Definition

**IDTSPE** is a reusable closed-loop planning and evolution engine.

It takes one bounded Need/problem, selects a useful Target/Scope, reuses trustworthy Sources of Truth, chooses the relevant evaluation Lenses, discovers the questions that must be resolved, evaluates candidate Ideas through Q/R/P and Evidence, accepts Decisions, projects the Target State, plans/realizes the change when authorized, then uses Practical/WEUC Evidence to selectively reconsider only the decisions actually challenged.

Short form:

```text
Need
↓
Target / Scope
↓
Sources of Truth
↓
Lenses
↓
Resolution Questions
↓
Ideas
↓
Q/R/P + Evidence
↓
Decisions
↓
Target State
↓
Pre-Update / Realization
↓
Practical Evidence
↓
Selective Re-open
```

IDTSPE is generic. Application SDS is one rich pre-designed planning topology/preset over IDTSPE.

---

# 2. Fundamental Distinctions

## 2.1 Need

The reason this planning instance is worth doing.

A Trigger may point to a low-level symptom or proposed solution, but IDTSPE should understand the relevant Need before accepting the proposed scope.

```text
Trigger ≠ Need
```

## 2.2 Target / Scope

The bounded result/problem solved by this IDTSPE instance.

It defines:

- desired Target Result;
- boundaries;
- non-goals/deferred concerns;
- Target Type / Target Contract;
- which prior Sources can be reused;
- what new result should become reusable Source of Truth.

A single IDTSPE instance does not solve every question for the whole system.

## 2.3 Source

What we know, trust, observe or are constrained by.

Examples:

- accepted prior Target;
- accepted Decision;
- Scenario;
- Domain owner;
- Requirement;
- WEUC state;
- Practical Evidence;
- deadline;
- ReviewDiff;
- dependency/freshness state.

## 2.4 Lens

A reusable evaluation perspective.

It asks:

```text
What should we inspect/challenge here?
```

A Lens does not itself assert that a concrete problem exists.

It generates prompts/concern archetypes that become concrete Q/R/P only when applied to an owner.

## 2.5 Resolution Question (`RQ`, working term)

A scoped question whose candidate answers are Ideas/Variants and whose accepted answer becomes a Decision.

Working examples:

```text
Where should the Slice boundary be?
How should the integration be realized?
Should we create a new Scenario or change the existing one?
Which owner should control this state?
```

`Resolution Question` replaces the earlier working term `Decision Question`. Final naming remains open.

## 2.6 Idea / Variant

A candidate answer to one Resolution Question, or a deliberately coupled bundle of answers.

## 2.7 Decision

An accepted answer.

A Decision retains rationale, residual Q/R/P, Evidence relationships, reconsideration conditions and useful fallback/alternative Ideas when material.

## 2.8 Evidence

Observed or authoritative information capable of answering, supporting, weakening, measuring, triggering, contradicting or invalidating a concern/Decision.

Evidence remains a Source. It is not collapsed into Q/R/P.

## 2.9 Pattern

A reusable candidate answer/archetype.

Architecture patterns are reusable Ideas, not automatically correct Decisions.

## 2.10 Target Contract / Template

Defines the valid semantic form of the reusable Target result.

## 2.11 Planning Topology

A reusable or one-off map of several Target stages, their rough ordering, Sources, contracts and outputs.

Its purpose is to maximize one-directional planning and reuse of prior work.

---

# 3. What Is Fixed In Generic IDTSPE

The generic engine mechanics are stable:

```text
Need/root justification
Target/Scope Discovery
Source-of-Truth resolution/reuse
Lens selection
Resolution Question Discovery
Idea/Variant discovery
Q/R/P lifecycle
Evidence lifecycle
Decision lifecycle
Target projection
dependency/reuse review
Pre-Update boundary
Realization adapter
Practical Evidence
Selective Re-open
```

The engine does **not** hard-code:

- Application Scenario → Domain → Slice;
- WEUC for every target;
- every architecture principle;
- every possible Resolution Question;
- every Lens;
- every Pattern.

Those are supplied by presets, Target families, Sources and applicability rules.

---

# 4. Reusable Configurable Assets

```text
Planning Topologies
Target Contracts / Templates
Source Contracts
Lens definitions
Lens presets
Resolution Question archetypes
Pattern / Idea archetypes
Evidence contracts
realization adapters
testing/verification adapters
```

These provide reusable knowledge without predetermining the unique Target instance.

---

# 5. Dynamic State Of One IDTSPE Instance

```text
Concrete Need
Target/Scope candidates
selected Target/Scope
actual Sources of Truth
selected Lens Set
Resolution Question candidates
active Resolution Questions
Ideas / Variants
concrete Q/R/P
Evidence
Decisions
saved alternatives/fallbacks
Target Decision State
Projected/Current Target State
```

---

# 6. The Three Choice Levels

A clean model contains **three choice levels**.

Each level uses the same lifecycle:

```text
candidate
→ candidate Q/R/P
→ Decision
→ residual Decision Q/R/P
→ Evidence may later trigger selective re-open
```

This means there are not four unrelated Q/R/P systems. There are three choice-level profiles.

## Level 1 — Target / Scope Choice

Question:

```text
What bounded problem/result should this IDTSPE instance solve?
```

Candidates:

```text
Target/Scope Candidate A
Target/Scope Candidate B
...
```

Candidate Q/R/P challenge whether that scope is correct.

Accepted result:

```text
Target-Scope Decision
```

Residual Q/R/P monitor whether the chosen scope remains correct.

Selective re-open level:

```text
Target-Scope Decision Q/R/P
→ reopen Target/Scope Discovery
```

## Level 2 — Resolution Question Set Choice

Question:

```text
Which questions must be answered, in what framing/grouping/order,
to construct this Target well?
```

Candidates:

- candidate Resolution Questions;
- candidate question sets;
- split/merge/reframe/defer/delegate options.

Candidate Q/R/P challenge whether these are the correct questions.

Accepted result:

```text
Question-Set Decision
```

Residual Q/R/P monitor whether the chosen questions remain correct.

Selective re-open level:

```text
Question-Set Decision Q/R/P
→ reopen Resolution Question Discovery
```

## Level 3 — Answer / Idea Choice

For each active Resolution Question:

```text
Which candidate answer should be selected?
```

Candidates:

```text
Ideas / Variants / Patterns
```

Idea Q/R/P challenge each candidate answer.

Accepted result:

```text
Decision
```

Residual Decision Q/R/P monitor whether the answer remains good.

Selective re-open level:

```text
Decision Q/R/P
→ reopen that Resolution Question
```

---

# 7. Exact Q/R/P Ownership Model

## 7.1 Target/Scope Candidate Q/R/P

Owner: one Target/Scope Candidate.

Purpose:

- challenge Need/problem framing;
- challenge boundary;
- challenge reuse vs new Target;
- challenge whether the stage is worth doing now;
- detect missing upstream Sources/uncertainty.

After selection, unresolved material concerns transfer to the Target-Scope Decision.

## 7.2 Resolution Question Candidate / Question-Set Q/R/P

Owner: a candidate RQ or candidate RQ set/scope.

Purpose:

- challenge whether we are asking the right question;
- detect duplicated/already-answered question;
- detect hidden solution assumptions;
- detect wrong owner/stage;
- decide split/merge/defer/order.

After selection, unresolved material concerns transfer to the Question-Set Decision.

## 7.3 Idea Q/R/P

Owner: one Idea/Variant.

Purpose:

- evaluate whether this candidate is viable;
- compare it fairly to alternatives;
- detect known defects/costs;
- identify future failure modes;
- identify important unknowns/evidence needs.

After selection, unresolved material concerns transfer to the accepted Decision.

## 7.4 Residual Decision Q/R/P

Owners:

```text
Target-Scope Decision
Question-Set Decision
Target/answer Decision
```

Purpose: future monitoring and selective reconsideration.

These are not unfinished notes. They are reconsideration contracts.

---

# 8. Q/R/P Semantics

## Q — Question

A material unknown.

A good Q should state:

- what is unknown;
- why it matters;
- what Evidence can answer it;
- expected source/time/event;
- how different answers affect ranking/Decision/re-open.

For a post-decision Q:

```text
Which future answer would confirm, weaken, reopen or invalidate the Decision?
```

## R — Risk

A credible future condition that may make a candidate/Decision/scope worse.

A good Risk should state:

- risk hypothesis;
- leading indicators;
- Evidence source;
- expected horizon;
- impact;
- reversibility;
- threshold/event;
- which Decision/scope should reopen;
- fallback Ideas when known.

For accepted Decisions, Risk becomes a future reconsideration map.

## P — Problem

A known present defect, contradiction, cost or invalid condition.

A good Problem should state:

- what is already wrong;
- current impact;
- why it is tolerated, if accepted;
- workaround/containment;
- Evidence/measurement;
- remediation or reconsideration threshold;
- affected Decision/Target.

---

# 9. Lenses

A Lens is a reusable mechanism for deriving relevant Q/R/P.

Conceptual Lens contract:

```text
Lens
  purpose
  appliesWhen
  targetLifecycleLevels
  prompts / concern archetypes
  evidence prompts
  optional Pattern references
  optional related lenses
```

A Lens can apply at:

```text
Target/Scope choice
Resolution Question choice
Idea choice
Decision monitoring
```

Not every Lens applies at every level.

---

# 10. Core Lens Candidates Derived From The Accumulated Ideas

The following are strong generic or near-generic candidates.

## 10.1 Need / Scope Validity Lens

Purpose:

```text
Are we solving the right problem, at the right level, now?
```

Checks:

- fundamental Need;
- Trigger vs Need confusion;
- wrong Target;
- scope too broad/narrow;
- premature stage;
- independent concerns mixed together;
- important problem omitted;
- existing Target could be reused/changed instead.

Applies strongly at Target/Scope and RQ discovery.

## 10.2 Source-of-Truth / Prior-Work Reuse Lens

Purpose:

```text
What already accepted work can be reused confidently?
What are we accidentally re-planning or duplicating?
```

Checks:

- current canonical owner;
- accepted upstream Decisions;
- duplicated semantic truth;
- non-authoritative copy used as Source;
- unnecessary revalidation;
- missing Source;
- superseded Decision.

This protects one-directional staged planning.

## 10.3 Prior-Decision Revalidation Lens

Purpose:

```text
Do new Decisions, Q/R/P, WEUC findings or Evidence challenge
any previously accepted Decision the current Target relies on?
```

Inputs:

- residual Q/R/P of prior Decisions;
- new Practical Evidence;
- new WEUC Evidence;
- changed constraints;
- changed canonical Sources;
- newly selected Decisions.

Checks three re-open levels:

```text
answer wrong?
→ Decision re-open

questions wrong/incomplete?
→ Question-Set re-open

scope/Target wrong?
→ Target-Scope re-open
```

This Lens is especially important during INTEGRATE and post-realization reconciliation.

## 10.4 Evidence / Assumption / Reversibility Lens

Purpose:

- expose unsupported assumptions;
- distinguish known fact from hypothesis;
- ask what Evidence is worth collecting;
- avoid irreversible Decisions before needed Evidence exists;
- evaluate cost of being wrong.

Useful at all three choice levels.

## 10.5 WEUC / Workspace Evolution Lens

Purpose:

```text
How does this option affect recurring work in the workspace/tool/codebase/docs?
```

Checks:

- understanding paths;
- change paths;
- verification paths;
- operational/debugging paths;
- owners touched;
- knowledge required;
- coordination;
- recurring frequency;
- future Change Pressure;
- expected work-cost.

WEUC is simultaneously:

```text
Current WEUC State → Source
WEUC Lens → evaluator
Projected WEUC Impact → analysis
Observed WEUC Evidence → later Evidence
```

Applies by default to workspace-oriented presets, not to every possible IDTSPE.

## 10.6 Dependency / Reuse / Impact Lens

Purpose:

- ownership boundaries;
- dependency direction;
- coupling;
- reuse;
- semantic duplication;
- consumers;
- stale/review obligations;
- blast radius.

Useful for documentation, code, file structures, APIs, modules, OOP and repositories.

## 10.7 Change Surface Lens

A practical specialization of dependency/workspace evaluation.

Purpose:

```text
What concrete change surface does this option create?
```

Possible surfaces:

- files;
- artifacts;
- modules;
- packages;
- classes;
- interfaces;
- methods/functions;
- schemas;
- tests;
- generated projections;
- runtime components.

This is useful while comparing Ideas.

It is **not** Pre-Update.

Pre-Update later produces the exact realization plan for the selected option.

## 10.8 Architecture Pressure Lens

Purpose:

- identify likely change axes;
- identify lock-in/coupling pressure;
- determine whether architectural preparation is justified;
- compare present preparation cost vs future change cost.

Often paired with WEUC.

## 10.9 Verification / Testability Lens

Purpose:

- can the proposed Target/Decision be verified?
- what positive and negative evidence proves it?
- are boundaries observable?
- can failure/no-mutation guarantees be tested?
- does the design make proof disproportionately expensive?

Especially relevant for Slices, implementation and operational workflows.

## 10.10 Delivery / Timing Lens

Purpose:

- deadline;
- capacity;
- sequencing;
- dependency availability;
- reversible staging;
- what can be deferred without changing semantic truth.

This Lens affects decomposition/order, not silent removal of Need/behavior.

## 10.11 Consistency / Semantic Authority Lens

Purpose:

- contradictory owners;
- wrong semantic layer;
- duplicate authority;
- projection presented as owner;
- downstream layer silently redefining upstream meaning.

This is related to Source-of-Truth Lens but may justify a distinct reusable profile in documentation/SDS work.

---

# 11. Programming Principles As Lenses, Not Laws

Principles such as:

```text
DRY
SRP
OCP
high cohesion
low coupling
encapsulation
dependency inversion
```

should not normally be applied as isolated "must comply" rules.

Better model:

```text
Principle
→ risk/problem detector / Lens archetype
→ find a concrete problematic situation
→ generate candidate Idea/Pattern
→ evaluate candidate through WEUC + other relevant Lenses
```

Example — DRY:

```text
Observation:
  duplicated logic exists

DRY Lens:
  is this duplication likely to diverge incorrectly?
  is knowledge duplicated?
  will recurring changes require synchronized edits?

Candidate Idea:
  extract shared abstraction

WEUC Lens:
  does extraction reduce recurring change cost?
  or does it couple two change paths that actually evolve independently?
```

Therefore:

```text
principle compliance
≠ automatic architecture quality
```

For workspace systems, programming-principle Lenses should generally be paired with WEUC/work-cost evaluation.

---

# 12. Risk-Situation / Pattern Knowledge Library

Architecture/reusable methodology can accumulate richer knowledge than static principles.

A reusable item may contain:

```text
Problem/Risk Situation Archetype
applicability conditions
observable signals
Resolution Question archetype
candidate Patterns/Ideas
known Q/R/P prompts
typical WEUC effects
counterexamples
Evidence expectations
known failure modes
```

Example:

```text
Risk Situation:
  one recurring change requires synchronized edits across many owners

Possible RQ:
  how should the responsibility/extension boundary be changed?

Candidate Patterns:
  registry
  plugin/adapter
  data-driven configuration
  intentionally keep duplication

Lenses:
  WEUC
  dependency/reuse
  reversibility
  verification
```

This gives IDTSPE reusable intelligence without hard-coding the answer.

---

# 13. Lens Selection

A concrete Lens Set should be assembled proportionally.

Sources:

```text
Core/default Lenses
+ Target-family preset
+ Target Contract
+ Planning Topology stage
+ Source-triggered applicability
+ Evidence-triggered applicability
+ explicit user/agent selection
```

Lens selection can itself be a Resolution Question when material.

For simple cases, it can be inherited automatically from a preset.

---

# 14. Lens Presets

Examples.

## 14.1 Workspace / Codebase Preset

Likely default Lens Set:

```text
Need / Scope Validity
Source-of-Truth / Reuse
Prior-Decision Revalidation
Evidence / Reversibility
WEUC
Dependency / Reuse / Impact
Change Surface
Architecture Pressure
Verification / Testability
```

## 14.2 Documentation / Repository Preset

Likely default Lens Set:

```text
Need / Scope Validity
Source-of-Truth / Reuse
Prior-Decision Revalidation
WEUC
Dependency / Reuse / Impact
Change Surface
Consistency / Semantic Authority
Evidence / Reversibility
```

Pre-Update remains the downstream exact file-transition adapter.

## 14.3 Small One-Off Decision

Possible Lens Set:

```text
Need / Scope Validity
Evidence / Reversibility
one or two domain-specific Lenses
```

No reason to load the full workspace architecture stack.

---

# 15. Planning Topology

For a difficult multi-stage Need, it is often beneficial to design a rough planning map first.

```text
Overall Need
↓
Stage A Target
  Sources
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

Goals:

- one-directional planning;
- early discovery of expensive uncertainty;
- minimal cross-stage concern mixing;
- durable reusable Sources;
- minimum later invalidation.

Planning Topology can itself be an IDTSPE Target if no suitable preset exists.

---

# 16. SDS Placement

**SDS is a rich Application-specific Planning Topology / Target-family preset.**

It provides reusable:

- Target Types;
- Target Contracts/templates;
- rough directional flow;
- Source dependencies;
- RQ archetypes;
- Lens presets;
- handoffs;
- verification expectations.

Example:

```text
Need / Real-Life
→ Application Scenario
→ Behavior / DATA
→ Domain
→ Slice
→ Realization / Evidence
```

Concrete Targets remain unique.

Even with SDS, every IDTSPE instance proportionally checks:

- concrete Target/Scope;
- reuse vs create;
- relevant Sources;
- relevant RQs;
- new Evidence challenging previous Decisions.

---

# 17. Sources Of Truth And One-Directional Planning

Default:

```text
previous accepted planning result
→ reusable Source of Truth
```

Do not routinely reopen it.

New IDTSPE work should ask:

```text
Does current Q/R/P, new Evidence, WEUC findings,
changed constraints or new Decisions materially challenge it?
```

If no:

```text
reuse freely
```

If yes:

```text
reopen the narrowest affected choice level
```

---

# 18. Prior-Decision Revalidation

This is now explicit enough to be both a Lens and a lifecycle mechanism.

Inputs:

```text
Current Target
accepted Decisions
Target-Scope Decision
Question-Set Decision
residual Q/R/P
Current WEUC State
Observed WEUC Evidence
Practical Evidence
changed Sources/constraints
new selected Decisions
```

Evaluation:

```text
Does anything challenge the selected answer?
→ reopen one RQ

Does anything challenge the chosen RQ set/framing?
→ reopen RQ Discovery

Does anything challenge the chosen Target/problem boundary?
→ reopen Target/Scope Discovery

Otherwise:
→ preserve prior work
```

---

# 19. Evidence Model

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

A material Q/R/P may define an Evidence Contract:

```text
evidence needed
expected source
expected time/event
measurement
threshold
evaluation rule
Decision impact
```

Evidence remains separately inspectable.

---

# 20. Ideas And Saved Alternatives

Useful unselected Ideas may be retained:

```text
Alternative Idea
Fallback Idea
Deferred Idea
Adjacent Idea
Unreviewed-but-worth-preserving Idea
```

They can keep their own Q/R/P and Evidence.

On re-open:

```text
current Sources
+ current Lenses
+ residual Q/R/P
+ saved Ideas
+ new Evidence
→ re-rank
→ generate new Ideas only if useful
```

---

# 21. Pattern Use

Patterns are reusable Idea archetypes.

They may carry:

- applicability conditions;
- related RQs;
- typical Lens set;
- known Risks/Problems;
- evidence prompts;
- typical WEUC effects;
- counterexamples.

Pattern use still produces a concrete Idea that must be evaluated in the current context.

---

# 22. Target As Decision State

For one scoped IDTSPE:

```text
Target Decision State
=
Target-Scope Decision
+ Question-Set Decision
+ active Resolution Questions
+ accepted answer Decisions
+ residual Q/R/P
+ retained Ideas
+ Evidence links
```

The Target Contract projects this into the domain-specific semantic representation.

Examples:

- Scenario document;
- Domain model;
- Slice;
- documentation workflow;
- Workspace UC;
- Planning Topology.

---

# 23. Full Modular IDTSPE Loop

```text
TRIGGER
↓
understand NEED
↓
use/design PLANNING TOPOLOGY if warranted
↓
TARGET/SCOPE DISCOVERY
  candidates
  applicable Lenses
  candidate Q/R/P
↓
TARGET-SCOPE DECISION
  residual Q/R/P
↓
resolve/reuse SOURCES OF TRUTH
↓
RESOLUTION QUESTION DISCOVERY
  RQ candidates/set
  applicable Lenses
  candidate Q/R/P
↓
QUESTION-SET DECISION
  residual Q/R/P
↓
for each ACTIVE RQ:
    select applicable LENSES
    load/generate IDEAS / PATTERNS
    instantiate shared Lens checks
    add Idea-specific Q/R/P
    collect/use EVIDENCE
    evaluate WEUC/dependencies/change surface/etc
    select DECISION
    transfer residual Q/R/P
    retain useful alternatives
↓
TARGET DECISION STATE
↓
TARGET CONTRACT / TEMPLATE PROJECTION
↓
DEPENDENCY / REUSE IMPACT
↓
PRE-UPDATE
↓
authorized REALIZATION
↓
PRACTICAL / WEUC / TEST / REVIEW EVIDENCE
↓
PRIOR-DECISION REVALIDATION
↓
reopen narrowest level:
  answer Decision
  Question Set
  Target Scope
or
  ACCEPT
```

---

# 24. Pre-Update Placement

Pre-Update is not an evaluation Lens.

Before Decision:

```text
Change Surface Lens
Dependency Lens
WEUC Lens
→ compare candidate Ideas
```

After Target is selected:

```text
Pre-Update
→ exact Owner/Reuse Plan
→ exact Source/Dependency Plan
→ exact file/artifact relation plan
→ exact freshness/review plan
→ ordered realization steps
```

---

# 25. Linked Notes Placement

Desired future role:

- resolve Sources;
- navigate owners;
- expose dependencies;
- expose Evidence relations;
- expose residual Q/R/P/Decision relations;
- provide WEUC context;
- show impacted consumers;
- freshness/review state;
- context bundles.

Linked Notes remains resolver/projection/validation infrastructure, not semantic authority.

Generated graphs remain an open question, not a dependency of IDTSPE.

---

# 26. Current Lens Inventory Status

## Strong candidates to retain

```text
Need / Scope Validity Lens
Source-of-Truth / Reuse Lens
Prior-Decision Revalidation Lens
Evidence / Assumption / Reversibility Lens
WEUC / Workspace Evolution Lens
Dependency / Reuse / Impact Lens
Change Surface Lens
Architecture Pressure Lens
Verification / Testability Lens
Delivery / Timing Lens
Consistency / Semantic Authority Lens
```

## Likely specialized Lens families

```text
Security
Performance
Reliability
Operations
Privacy
Cost/business
UX/accessibility
domain-specific safety/compliance
```

These should not become universal defaults merely because they exist.

## Programming principles

Prefer representing them as:

```text
principle/risk Lens archetype
+ known problematic situations
+ candidate Patterns
```

and, in workspace contexts, evaluate them jointly with WEUC.

---

# 27. Open Questions

## Q-LENS-01 — Minimal Lens contract

Which fields are actually needed for reusable Lens definitions?

## Q-LENS-02 — Lens discovery/index

Should Lens definitions remain with semantic methodology owners and have only a generated discovery index?

## Q-LENS-03 — Core Lens set

Which Lenses are sufficiently generic to be default for all material IDTSPE work?

Current strong candidates:

```text
Need / Scope Validity
Source-of-Truth / Reuse
Evidence / Reversibility
Prior-Decision Revalidation
```

But even this should be tested.

## Q-LENS-04 — Programming principle representation

Should DRY/SRP/OCP/etc be individual Lenses, one Architecture Principle Lens library, or problem-situation archetypes?

Current direction:

```text
problem/risk archetypes + reusable Lens prompts,
always contextualized by WEUC when workspace evolution matters
```

## Q-RQ-NAME-01

Final public name for `Resolution Question`.

## Q-TOPOLOGY-01

When is a Planning Topology durable enough to deserve its own reusable owner?

## Q-GRAPH-01

Do generated composition/dependency graphs provide enough benefit after typed Sources/Lenses/Decisions exist?

Still open.

---

# 28. Decisions / Current Conclusions

## D-01 — Modular engine

IDTSPE is assembled from reusable Sources, Lenses, Contracts, Patterns, RQ archetypes and Evidence, not from one hard-coded global checklist.

## D-02 — Three choice levels

Use exactly three generic choice/re-open levels:

```text
Target/Scope
Resolution Question Set
Answer/Idea
```

Each has candidate Q/R/P and residual accepted-Decision Q/R/P.

## D-03 — Lenses generate concrete concerns

A Lens provides reusable evaluation prompts. Concrete Q/R/P belongs to the object challenged.

## D-04 — Prior-Decision Revalidation is explicit

New Decisions/Evidence/WEUC findings are evaluated against relevant prior Decisions, and only the narrowest invalidated level reopens.

## D-05 — WEUC is contextual but high-value

WEUC is a Source + Lens + Impact/Evidence loop for workspace-oriented Targets.

## D-06 — Programming principles are contextual heuristics

DRY/SRP/etc should detect candidate problem situations and generate solution Ideas/Patterns, but their value must be checked against real WEUC and other material Lenses.

## D-07 — Change Surface is separate from Pre-Update

Change Surface evaluates candidate impact; Pre-Update plans exact realization after selection.

## D-08 — Planning Topology handles complex multi-stage work

SDS is one rich pre-designed Application topology/preset. One-off or new problem families can design their own topology through IDTSPE.

## D-09 — Accumulated prior work is preserved

Existing accepted Targets/Decisions are Sources of Truth by default. Q/R/P + WEUC + Evidence provide explicit challenge signals.

---

# 29. Consistency Check Against Accumulated Ideas

The clean model intentionally preserves these earlier directions:

- CREATE/INTEGRATE share one engine.
- Current Target is baseline for INTEGRATE.
- Projected Target State remains the central planning result.
- SHOW CURRENT remains separate from planning.
- Sources are typed and explicitly named.
- Previous accepted work is reused by default.
- Reverse checking is target/challenge-driven, not a fixed global ladder.
- Application Need → Scenario → Behavior/DATA → Domain → Slice is SDS-specific topology, not generic IDTSPE.
- WEUC is both source and feedback loop.
- Q/R/P and Evidence remain distinct.
- Useful Ideas can be retained beside Decisions.
- Residual Q/R/P are reconsideration contracts.
- Target is represented as scoped Decision State.
- Resolution Question discovery happens after Target/Scope selection.
- Lenses replace hard-coded shared concern lists.
- Architecture Patterns are reusable Ideas, not authority.
- Dependency/Linked Notes support is infrastructural.
- Pre-Update remains a permission/realization boundary.
- Step 4 practical evidence loops back into selective re-planning.
- Graphs remain a question.

No intentional accumulated idea was dropped; conflicting earlier formulations were normalized into the three-choice-level + Lens model.
