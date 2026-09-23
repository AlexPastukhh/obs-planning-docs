# IDTSPE Lens And Coverage Audit

Status: completed conceptual audit  
Scope: `idtspe-coherent-model-v1.md` against accumulated discussion/provenance artifacts and current repository methodology  
Repository mutation: none

# 1. Audit Result

The overall direction of `idtspe-coherent-model-v1.md` is correct:

```text
Need
→ scoped Target
→ Sources of Truth
→ reusable Lenses
→ Resolution Questions
→ Ideas
→ Q/R/P + Evidence
→ Decisions
→ Target State
→ realization/evidence
→ selective re-open
```

However, v1 is **not yet sufficiently complete or internally normalized** to serve as the canonical planning capture.

Two classes of corrections are required:

1. **Lens normalization**
   - several proposed lenses overlap responsibility;
   - one important lens is missing;
   - one existing lens is too narrow;
   - some concepts are engine mechanisms/facets rather than independent peer lenses.

2. **Coverage restoration**
   - several earlier contracts are mentioned only in the v1 consistency checklist but their actual semantics were dropped from the body;
   - this includes Source Contract roles, CREATE/INTEGRATE preservation, Concern Groups, full WEUC reconciliation, full Pre-Update, provenance/output contracts and other important rules.

The desired result is therefore a clean `v2`, not another append-only revision.

---

# 2. Lens Design Rule

A peer Lens should represent a **distinct reusable evaluation dimension**.

It should answer a materially different question from other lenses.

A Lens is not:

- an engine stage;
- a Source;
- an output;
- a Target Contract;
- a realization adapter;
- a concrete Q/R/P;
- a Pattern.

Useful rule:

```text
Source
= what do we know / trust / observe?

Lens
= through which independent evaluation dimension do we inspect it?

Q/R/P
= what concrete concern did the inspection expose for this owner?

Pattern / Idea archetype
= what reusable answer could we try?

Decision
= what answer did we accept?

Target Contract
= what complete semantic result must selected Decisions produce?
```

A Lens may have **facets**. A facet should not become a peer Lens merely because it is convenient to name.

---

# 3. Lens Audit Table

| v1 concept | Audit | v2 disposition | Reason |
|---|---|---|---|
| Need / Scope Validity | too narrow | **Need / Value / Scope Lens** | Must also evaluate Expected Effect, necessity/better route, opportunity cost and whether an RQ materially contributes to the Target. |
| Source-of-Truth / Prior-Work Reuse | overlaps Consistency/Semantic Authority | **merge into Authority / Source-of-Truth / Reuse Lens** | Canonical authority, layer ownership, reuse and duplicate-truth avoidance are one resolution surface. |
| Prior-Decision Revalidation | valid, but both Lens and lifecycle mechanism | **Decision Compatibility & Revalidation Lens** + revalidation stage uses it | Important distinct question: do new Decisions/Evidence/WEUC/constraints challenge accepted Decisions, including composition effects? |
| Evidence / Assumption / Reversibility | valid | **Evidence / Uncertainty / Reversibility Lens** | Epistemic quality of a choice: assumptions, missing evidence, confidence, cost of being wrong, reversibility. |
| WEUC / Workspace Evolution | overlaps Architecture Pressure | **Workspace Evolution / WEUC Lens** | Change Pressure, Change Axes, path/work-cost and Architecture Tax are facets/derived evidence of the same workspace-evolution evaluation. |
| Dependency / Reuse / Impact | overlaps Change Surface and partially Source/Reuse | **Dependency & Change Impact Lens** | Structural dependency topology + affected surface + consumers/blast radius/freshness belong together. Semantic-authority reuse moves to Authority lens. |
| Change Surface | peer duplication | **facet of Dependency & Change Impact Lens** | Surface tells what units change; dependency impact tells how effects propagate. They are best evaluated together. |
| Architecture Pressure | peer duplication | **facet of Workspace Evolution / WEUC Lens** | Current architecture methodology already derives pressure/change axes from costly important Workspace work. |
| Verification / Testability | partially overlaps Evidence | **Proof / Verification / Operability Lens** | Keep separate: Evidence lens asks whether the decision is epistemically justified; Proof lens asks whether the selected target/realization can be proved, observed, diagnosed and operated. |
| Delivery / Timing | slight overlap with Need/Scope | **Constraint / Delivery Lens** | Constraint changes ordering/decomposition/staging, not semantic truth/value. Clarify boundary. |
| Consistency / Semantic Authority | peer duplication | **merge into Authority / Source-of-Truth / Reuse Lens** | Same owner/authority/source-of-truth resolution surface. |
| — missing — | critical omission | **Target Contract & Coverage Lens** | Needed to ensure projected Target actually satisfies target-specific workflow/template, source coverage, invariants and proof/handoff obligations. |

---

# 4. Revised Orthogonal Lens Taxonomy

## 4.1 Core / Near-Core Lenses

These are strong candidates for most material IDTSPE work, subject to proportionality.

### L1 — Need / Value / Scope Lens

Core question:

```text
Are we solving a real and worthwhile Need,
with the right bounded Target,
at the right level,
through questions that materially help produce the result?
```

Evaluates:

- Trigger vs fundamental Need;
- Desired real-world outcome;
- Expected Effect / value;
- necessity;
- better existing route;
- reuse/change-existing vs create-new;
- target boundary;
- scope too broad/narrow;
- opportunity cost;
- premature planning stage;
- whether an RQ actually contributes to the Target;
- whether work should be deferred/delegated/split.

This absorbs the positive planning checks that v1 lost by focusing mostly on challenge/failure.

### L2 — Authority / Source-of-Truth / Reuse Lens

Core question:

```text
Are we using the correct authoritative meaning
and reusing accepted work without creating duplicate truth?
```

Evaluates:

- canonical owner;
- Source role and authority;
- semantic layer ownership;
- current accepted upstream Decisions/Targets;
- non-authoritative projections/examples/history;
- duplicated semantic truth;
- reuse opportunities;
- downstream re-derivation;
- downstream layer silently redefining upstream semantics;
- superseded owners/Decisions;
- unnecessary re-planning.

This merges v1 `Source-of-Truth / Reuse` and `Consistency / Semantic Authority`.

### L3 — Evidence / Uncertainty / Reversibility Lens

Core question:

```text
What do we actually know,
what remains an assumption,
what Evidence is worth acquiring,
and how expensive is being wrong now?
```

Evaluates:

- assumptions;
- confidence;
- missing Evidence;
- evidence contracts;
- time/event when Evidence becomes available;
- decision under uncertainty;
- reversibility;
- lock-in due only to premature commitment;
- experimentation/prototype value;
- cost of delaying vs cost of choosing too early.

### L4 — Decision Compatibility & Revalidation Lens

Core question:

```text
Do new Decisions, Evidence, Q/R/P, WEUC findings or constraints
challenge any accepted Decision this Target relies on?
```

Evaluates:

- direct contradiction;
- supersession;
- residual Q/R/P trigger;
- new practical evidence;
- new WEUC evidence;
- changed constraints;
- changed canonical Sources;
- composition effects between individually reasonable Decisions;
- whether answer, RQ set, or Target/Scope is the narrowest invalid level.

This Lens is also invoked by the explicit post-realization revalidation mechanism.

### L5 — Target Contract & Coverage Lens

Core question:

```text
Does the resulting Target fully satisfy the canonical contract
for this Target Type?
```

Evaluates:

- target-specific required/proportional fields;
- semantic completeness;
- required Source coverage;
- target-specific invariants;
- required Decision Questions/results;
- acceptance/proof obligations;
- required handoffs;
- preserved existing meaning in INTEGRATE;
- no omitted canonical frame.

This is the Lens that prevents a `собери идеи слайса` result from omitting canonical Scenario → Behavior → Requirements → Domain → Slice coverage merely because the local ideas focused on implementation.

The Target-specific owner/template supplies the checks; IDTSPE does not hard-code them.

---

## 4.2 Contextual Lenses

### L6 — Dependency & Change Impact Lens

Core question:

```text
What structural dependency and concrete change impact does this choice create?
```

Facets:

#### Dependency topology
- owner dependencies;
- dependency direction;
- coupling;
- consumer relations;
- structural reuse;
- dependency fan-in/fan-out;
- compatibility/migration propagation.

#### Change Surface
- files/artifacts;
- modules/packages;
- classes/interfaces;
- methods/functions;
- schemas/messages;
- persisted state;
- tests/fixtures;
- generated projections;
- runtime components.

#### Freshness/review impact
- semantic dependents;
- Reference Objects;
- bounded dependent fragments;
- Review Dependencies;
- stale/review obligations.

#### Blast radius
- consumers requiring review;
- synchronized edits;
- migration surface;
- rollback/compatibility surface.

This merges v1 `Dependency / Reuse / Impact` + `Change Surface`.

Semantic-authority reuse belongs to L2.

### L7 — Workspace Evolution / WEUC Lens

Core question:

```text
How does this option affect important recurring work in the workspace?
```

Inputs/facets:

- Workspace UCs;
- contextual WEUCs;
- understanding paths;
- change/mutation paths;
- verification paths;
- runtime/operations/debugging paths;
- work frequency;
- owners touched;
- working-context load;
- coordination;
- locality;
- failure/debugging burden;
- Change Pressure;
- Change Axes;
- preparation-now tax;
- deferred-change cost;
- Architecture Tax;
- migration/reversibility when architecture-relevant.

Outputs:

```text
Projected WEUC Impact
Accepted WEUC Impact
Observed WEUC Evidence
updated Current WEUC State
```

`Architecture Pressure` is not a peer Lens. It is a facet/derived finding within workspace-evolution analysis.

### L8 — Proof / Verification / Operability Lens

Core question:

```text
Can the selected Target/Decision be proved and safely operated?
```

Evaluates:

- testability;
- observable acceptance;
- positive proof;
- negative proof;
- no-mutation guarantees;
- failure behavior;
- diagnosis;
- observability;
- operational support;
- proof cost;
- whether architecture makes verification disproportionately expensive.

Boundary from L3:

```text
L3 Evidence/Uncertainty
→ should we believe/select this answer?

L8 Proof/Verification/Operability
→ can the resulting target/realization be demonstrably correct and operable?
```

### L9 — Constraint / Delivery Lens

Core question:

```text
How should real constraints affect ordering, decomposition and staging?
```

Evaluates:

- deadline;
- milestone;
- capacity;
- release order;
- external dependencies;
- operational limits;
- reversible staging;
- what can be deferred;
- sequence constraints.

Invariant:

```text
constraint
→ may alter order/split/staging
≠ silently erase semantic Need/behavior
```

### L10 — Specialized Domain Quality Lenses

Examples:

- security;
- privacy;
- performance;
- reliability;
- safety;
- compliance;
- UX/accessibility;
- business/economic cost;
- domain-specific correctness.

These are selected only when applicability is material.

---

# 5. What Is Not A Peer Lens

The following should not become peer lenses:

## Source Resolution
Engine mechanism.

## Target Projection
Engine mechanism.

## Pre-Update
Post-decision realization planning adapter.

## Evidence Collection
Engine/evidence mechanism.

## Reconciliation
Lifecycle mechanism.

## CREATE / INTEGRATE
Engine modes.

## Concern Group
Grouping/projection mechanism over Q/R/P.

## Architecture Pattern
Reusable Idea/Pattern archetype.

## DRY / SRP / OCP
Usually principle/risk-situation heuristics feeding Lens prompts, not normative peer lenses.

---

# 6. Programming Principles Audit

The user's proposed correction is valid:

```text
abstract principle quality
≠ practical architecture quality
```

For workspace/codebase decisions, programming principles should generally be evaluated with real workspace-evolution cost.

Preferred model:

```text
principle
→ detect a possible risk/problem signature
→ formulate concrete Q/R/P or RQ
→ generate/reuse candidate Pattern/Idea
→ evaluate candidate with:
     Workspace Evolution / WEUC
     Dependency & Change Impact
     Evidence / Reversibility
     other applicable Lenses
```

Example:

```text
DRY observes duplicated knowledge
↓
possible Problem:
  synchronized recurring edits are costly/error-prone
↓
Idea:
  extract one abstraction
↓
Dependency Lens:
  does this couple independent change paths?
↓
WEUC:
  what happens to the actual recurring change operation?
↓
Decision
```

The correct answer may deliberately keep duplication when it preserves independent evolution and lowers real work-cost.

Architecture knowledge should therefore accumulate:

```text
Problem/Risk Situation Archetypes
+ RQ archetypes
+ candidate Patterns
+ Lens prompts
+ known WEUC consequences
+ counterexamples
+ Evidence expectations
```

rather than pattern-compliance rules.

---

# 7. Three Choice Lifecycles — Confirmed

The accumulated model supports exactly three generic selective re-open levels:

```text
1. Target / Scope
2. Resolution Question Set
3. Answer / Idea
```

Each repeats the same lifecycle:

```text
candidate
↓
candidate Q/R/P
↓
accepted Decision
↓
residual Decision Q/R/P
↓
new Evidence
↓
reaffirm or selective re-open
```

Thus:

```text
Target-Scope Decision Q/R/P
→ reopen Target/Scope Discovery

Question-Set Decision Q/R/P
→ reopen Resolution Question Discovery

Answer Decision Q/R/P
→ reopen one Resolution Question
```

There are **six owner contexts** if pre- and post-decision concern ownership is counted physically:

```text
Target/Scope Candidate Q/R/P
Target-Scope Decision Q/R/P

RQ/Question-Set Candidate Q/R/P
Question-Set Decision Q/R/P

Idea Q/R/P
Answer Decision Q/R/P
```

But there are only **three methodological choice lifecycles**, not six unrelated concern methodologies.

---

# 8. Concern Groups — Missing From v1

Concern Group semantics must be restored.

A Concern Group combines multiple related Q/R/P, possibly mixed types, when they share one resolution surface:

```text
same evidence/investigation
or
same owner/boundary
or
same Decision/RQ
or
same dependency contract
```

Example:

```text
CG-DELIVERY-BOUNDARY
├─ Q — external API limit unknown
├─ R — provider lock-in
├─ P — duplicate delivery authority
└─ R — recurring add-provider work may spread
```

Rules:

- group is not semantic owner of members;
- each concern keeps its actual owner/state;
- one Decision may address several concerns;
- one concern may require several Decisions;
- resolved concerns may leave active projection while useful trace remains;
- residual Risks/Problems stay active while material;
- one logical Concern/Group should have one detailed storage owner;
- AI recommendation is not Decision;
- review order is derived, not planning root.

---

# 9. Typed Source Contract — Missing From v1

v1 reduced Sources to examples. Restore a typed Source Contract.

Minimum source roles:

```text
TRIGGER_SOURCE
IDEA_SOURCE
CANONICAL_SEMANTIC_SOURCE
CURRENT_TARGET
PRACTICAL_EVIDENCE
ARCHITECTURE_EVOLUTION_SOURCE
DELIVERY_CONSTRAINT
PLANNING_STATE_SOURCE
DEPENDENCY_SOURCE
```

Important:

```text
IDEA_SOURCE is optional and is not the semantic root.
TRIGGER_SOURCE is entry evidence, not automatically truth.
```

Conceptual Source record:

```text
Source
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

The Target Contract/preset owns required/proportional Source classes.

Generic IDTSPE does not hard-code Application source taxonomy.

---

# 10. Engine Modes — Missing From v1 Body

Restore four distinct operations.

## CREATE

```text
Current Target = none
+ Need
+ trusted upstream Sources
+ constraints/evidence
→ initial complete Projected Target
```

No existing target baseline, but previously accepted upstream Sources remain reusable.

## INTEGRATE

```text
Current Target
+ new Ideas/Evidence/constraints
+ trusted upstream Sources
→ Projected Updated Target
+ Delta
+ Preserved Existing Meaning
```

Default:

```text
preserve existing valid meaning
unless a material reason changes it
```

Material reasons include:

- upstream canonical Source changed;
- accepted new Decision replaces it;
- Practical Evidence disproves it;
- current Target conflicts with canonical owners;
- new constraint invalidates applicability;
- explicit Decision supersedes it.

## EVIDENCE-DRIVEN RECONCILIATION

Return path after realization.

Evidence is a Source and need not be converted into an Idea.

## SHOW CURRENT

Separate read-only capability.

```text
canonical Current Target
→ render current state
```

No projected change/QRP merely because it was displayed.

---

# 11. Target Contract & Projected Target Completeness

A full Target Contract should conceptually include:

```text
Target Type
identity rule
semantic owner
valid state contract/template
Source Contract
required/proportional Lens preset
RQ archetypes when useful
evidence boundary
proof/acceptance obligations
downstream handoffs
```

Main invariant:

```text
IDTSPE owns planning orchestration.
Target-specific owner owns semantic validity.
```

The `Target Contract & Coverage Lens` verifies that the selected Decision State projects into a complete valid target.

---

# 12. Idea Review — Restore As Lens-Mapped Methodology

Earlier Idea Review contained useful checks that should not disappear, but they should not become a second fixed global checklist.

Previous Standard checks:

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

Deep checks:

```text
constraints / unknowns
Variants
assumptions / dependencies
Evidence / tests
combination evaluation
selected variant
reconsideration triggers
```

Map them into current model:

```text
Problem / Need
Expected Effect
Necessity / Better Route
→ Need / Value / Scope Lens

Source
Local/Integrated Consistency
→ Authority / Source-of-Truth / Reuse Lens

unknowns / assumptions / Evidence
→ Evidence / Uncertainty / Reversibility Lens

dependencies
→ Dependency & Change Impact Lens

workspace change cost
→ Workspace Evolution / WEUC Lens

tests/proof
→ Proof / Verification / Operability Lens

reconsideration triggers
→ residual Decision Q/R/P + Revalidation Lens
```

Thus prior useful methodology is preserved without hard-coded duplication.

---

# 13. Idea Split / Bundle Rules — Missing From v1

Split an Idea/Decision surface when:

- parts can be selected independently;
- one part can be rejected without invalidating the other;
- parts answer different RQs;
- they have materially different Q/R/P;
- different owners/evidence/lenses evaluate them;
- implementation/reconsideration horizons differ.

Keep a bundle when:

- value exists only together;
- splitting creates non-viable fake combinations;
- one semantic choice requires the other;
- evidence and concerns genuinely apply to the integrated bundle.

Same principle applies while discovering RQs.

---

# 14. Saved Ideas — Preserve

Useful unselected Ideas may be retained as:

```text
Alternative
Fallback
Deferred
Adjacent
Unreviewed-but-worth-preserving
```

Retention is justified when rediscovery is expensive, it is a credible fallback, it carries useful Evidence/QRP, or it was deferred for timing rather than quality.

Do not preserve every brainstorm fragment.

---

# 15. Full WEUC Feedback Loop — Incomplete In v1

Restore all stages:

```text
Current WEUC State
↓
WEUC Source
↓
evaluate candidate Ideas/Decisions
↓
Projected WEUC Impact
↓
selected Decision
↓
Accepted WEUC Impact
↓
Realization
↓
Observed WEUC Evidence
↓
WEUC State Reconciliation
↓
Updated Current WEUC State
↓
Source for later IDTSPE
```

Important:

```text
Projected impact ≠ current truth
```

Reconciliation:

```text
previous Current WEUC State
+ accepted impact
+ observed evidence
→ updated normalized Current WEUC State
```

For material documentation/repository changes:

```text
resolve affected Workspace UCs / WEUC
→ review projected impact
→ after realization observe impact
→ update WEUC only if recurring work/path/cost materially changed

checked → no material WEUC impact
```

is a valid result.

Do not create/update WEUC for every Markdown/code edit.

---

# 16. Dependency Relation Semantics — Restore

Do not collapse all relations into one dependency type.

Keep distinct:

```text
semantic source / derivation
composition / reuse
ordinary navigation
literal Reference Object synchronization
bounded Reference Object dependent-fragment review
whole-file Review Dependency
ordering
generated projection / index
```

Critical rule:

```text
semantic relation
≠ automatically Review Dependency
```

Otherwise false stale cascades become large and expensive.

---

# 17. Full Dependency-Aware Pre-Update — Restore

Pre-Update remains post-decision and plan-only.

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

It does not inherit repository mutation/implementation permission.

`Dependency & Change Impact Lens` evaluates candidate choices before Decision.

Pre-Update plans the exact transition after Decision.

---

# 18. Reconciliation Outcomes — Restore And Normalize

After realization/evidence:

## ACCEPT

Realized state and observed impact are acceptable.

## LOCAL CORRECTION

Realization is defective but selected Target/Decisions remain correct.

```text
same Target Decision State
→ fix realization
```

## ANSWER RE-OPEN

Evidence challenges an accepted answer.

```text
Decision Q/R/P
→ reopen one RQ
```

## QUESTION-SET RE-OPEN

Evidence shows the wrong/incomplete questions were asked.

```text
Question-Set Decision Q/R/P
→ reopen RQ Discovery
```

## TARGET-SCOPE RE-OPEN

Evidence shows the bounded problem/result itself is wrong.

```text
Target-Scope Decision Q/R/P
→ reopen Target/Scope Discovery
```

## UPSTREAM SEMANTIC CORRECTION

Evidence proves an upstream canonical Source itself is wrong/incomplete.

This is an explicit owner correction, not silent downstream backflow.

After correction:

```text
changed Source
→ review actual dependents only
→ preserve unaffected downstream meaning
```

---

# 19. Source Trust / Revalidation State

Do **not** introduce a mandatory persisted Source-state enum yet.

Reasoning vocabulary such as:

```text
trusted
challenged
superseded
historical
```

can be useful internally.

But current revalidation can be derived from:

```text
current canonical Source
+ accepted Decisions
+ residual Q/R/P
+ Current WEUC State
+ Accepted/Observed WEUC Impact
+ Practical Evidence
+ explicit supersession
```

Add a persisted Source state machine only if real workflows prove derivation insufficient.

---

# 20. Source-To-Output Provenance — Missing From v1

Preserve inspectable trace when nodes exist:

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

Not every node is mandatory for every simple decision.

---

# 21. Output Contract — Restore

A material planning pass should be able to expose:

```text
Target Identity / Type
Mode
Need / Target Scope
Target-Scope Decision
Source Contract + Sources actually used
Current Target when INTEGRATE
current relevant WEUC State
Question-Set Decision
Active RQs
Ideas / Variants
Q/R/P / Concern Groups
Decisions
retained Alternatives/Fallbacks
Projected Target State
Delta From Current
Preserved Existing Meaning
Dependency & Change Impact
Projected / Accepted WEUC Impact
Proof/Architecture/Testing/other handoffs
Current Overall Conclusions
Pre-Update readiness
```

After realization:

```text
Actual Realization Evidence
Actual Coverage / proof result
ReviewDiff findings when relevant
Observed WEUC Impact
Target reconciliation result
WEUC State reconciliation
re-open/correction disposition
```

---

# 22. One-Directional Planning — Restore Strong Formulation

Preferred:

```text
Stage A
→ produces accepted Source A

Stage B
→ consumes A
→ produces B

Stage C
→ consumes A + B
→ produces C
```

Later stages do not routinely reinterpret earlier stages.

Backward movement is exception-driven:

```text
material challenge
→ narrowest prior Decision/source owner
→ explicit correction
→ bounded dependent review
```

Important distinction:

```text
semantic dependency direction
≠ execution order
```

A useful later-layer insight may be stored as provisional/carry-forward context without silently redefining its upstream owner.

Physical traversal is proportional even though root justification ultimately traces to Need.

---

# 23. SDS-Specific Coverage Restored

Application SDS remains one rich Planning Topology/preset:

```text
Need / Current Reality / Real-Life Scenario
→ Application Responsibility / Concept
→ Application Scenario
→ Behavior Items + DATA
→ Requirements / Screens when material
→ Domain Discovery
→ Canonical Domain
→ Slice Strategy
→ independent/deliverable/testable Slices
→ realization / practical evidence
```

Important open SDS work from the discussion must remain visible:

- formalize `Need` as a first-class documented planning entity/contract when useful;
- formalize `Real-Life Scenario` as the full real-world workflow around Application use, not just in-app behavior;
- preserve Application Scenario as Application behavior authority;
- preserve WEUC as architecture/workspace evidence, not Application behavior authority.

These are SDS-specific target-family developments, not generic IDTSPE hard-code.

---

# 24. Current Repository UC / Command Crosswalk — Restore As Appendix

The clean model should retain a crosswalk because it was an explicit earlier requirement.

Conceptual mapping:

## Current generic ingress

```text
UC-PLAN-COLLECT-IDEAS
собери идеи
```

Current closest user-facing use of the reusable methodology.

Whether its current semantic placement should change if IDTSPE becomes cross-cutting remains open.

## Workspace target adapters

```text
UC-PLAN-WORKSPACE-ESTABLISH-UC
→ CREATE-like Workspace Target

UC-PLAN-WORKSPACE-CHANGE-UC
→ INTEGRATE-like Workspace Target

UC-PLAN-WORKSPACE-REVIEW-TOPOLOGY
→ multi-target/topology review
```

## Application/SDS target adapters

Scenario, Domain, Slice, realization and consistency UCs remain semantic owners/adapters.

## Architecture/WEUC analyzers

Architecture State, Workspace Uses, Paths, Pressure, Decisions, Evolution and Discover-WEUC provide contextual analyses/sources/lenses.

## Testing adapters

Testing Strategy, Design, Practical Test Plan and Coverage supply proof planning/evidence.

## Documentation transition adapters

Documentation plan/update, file Pre-Update, update, replacement package, ReviewDiff and returned-file reconciliation map to realization/evidence stages.

## `собери идеи X`

Conceptually:

```text
IDTSPE
+ Target/preset binding
```

not independent methodologies.

`собери идеи документации` remains a proposed command direction unless/until repository routing selects it.

---

# 25. Linked Notes Direction

Desired future support:

```text
resolve typed Sources
contextBundle(Target)
dependency/consumer queries
Evidence relations
Decision/QRP provenance
WEUC context
freshness/review obligations
impact of changed Sources
```

Linked Notes is resolver/query/projection/validation infrastructure, not semantic authority.

Generated per-UC/per-command graphs remain an open value question.

---

# 26. Naming

The working name `Idea-Driven Target-State Planning Engine` is now semantically imperfect:

```text
Need is root
Ideas are candidate answers
```

Do not rename prematurely.

Keep `IDTSPE` as a working identifier while public terminology is reviewed.

Likewise `Resolution Question` is a working term; it is clearer than `Decision Question`, but final naming remains open.

---

# 27. Main Corrections Selected By This Audit

```text
MERGE:
  Source-of-Truth/Reuse
  + Consistency/Semantic Authority
  → Authority / Source-of-Truth / Reuse

MERGE:
  Dependency/Impact
  + Change Surface
  → Dependency & Change Impact
    with Change Surface facet

MERGE:
  WEUC
  + Architecture Pressure
  → Workspace Evolution / WEUC
    with Change Pressure/Axes facets

KEEP DISTINCT:
  Evidence / Uncertainty / Reversibility
  vs
  Proof / Verification / Operability

BROADEN:
  Need / Scope
  → Need / Value / Scope

ADD:
  Target Contract & Coverage

KEEP AND CLARIFY:
  Decision Compatibility & Revalidation
  = reusable Lens
  + invoked by explicit lifecycle revalidation stage
```

---

# 28. v1 Omissions That Must Be Restored In v2

Checklist:

- [x] Typed Source Contract roles/authority.
- [x] Source record concept.
- [x] CREATE mode.
- [x] INTEGRATE mode.
- [x] preservation + Delta.
- [x] Evidence-driven reconciliation.
- [x] SHOW CURRENT boundary.
- [x] Target-specific semantic authority.
- [x] Target Contract completeness checks.
- [x] Concern Groups.
- [x] current concern/Decision trace concepts.
- [x] Idea Review positive checks mapped to Lenses.
- [x] Idea split/bundle methodology.
- [x] retained Ideas/fallbacks.
- [x] Accepted WEUC Impact.
- [x] WEUC State Reconciliation.
- [x] documentation/workspace WEUC maintenance rule.
- [x] dependency relation type distinctions.
- [x] full eight-part Pre-Update.
- [x] explicit permission boundary.
- [x] reconciliation outcome taxonomy.
- [x] bounded downstream correction.
- [x] no mandatory Source-state enum.
- [x] Source-to-output provenance.
- [x] full planning/post-realization output contract.
- [x] one-directional staged planning.
- [x] execution order ≠ semantic dependency.
- [x] UC/command crosswalk.
- [x] formal Need / Real-Life Scenario as SDS-specific open direction.
- [x] IDTSPE naming question.

---

# 29. Audit Conclusion

The user's latest direction is consistent after these corrections.

The strongest stable model is:

```text
IDTSPE mechanics
+ Target/Planning Topology preset
+ typed Sources of Truth
+ orthogonal Lens Set
+ three choice lifecycles
+ Q/R/P as candidate-quality and Decision-reconsideration contracts
+ Evidence
+ Target Contract projection
+ realization
+ narrow selective re-open
```

The central optimization objective remains:

```text
do the expensive thinking once at the correct stage,
produce a trustworthy reusable Source of Truth,
reuse it confidently later,
and reopen it only when a concrete challenge justifies doing so.
```
