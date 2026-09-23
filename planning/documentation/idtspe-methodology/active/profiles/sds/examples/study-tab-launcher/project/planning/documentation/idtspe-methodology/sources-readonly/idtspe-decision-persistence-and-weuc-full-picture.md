# IDTSPE Decision Persistence And WEUC Full-Picture Operational Model

Status: selected conceptual operational model  
Purpose: make the three Decision types durable and define a concrete end-to-end WEUC portfolio process usable during Application SDS and later evolution.  
Repository mutation: none.

Important consistency rule:

```text
current repository has similar concepts
≠ current concepts already mean exactly what this model selects
```

Existing Decision/QRP/WEUC/Linked Notes owners are reuse candidates only after explicit consistency review.

---

# 1. Three Generic Decision Types — Must Be Persisted

For every **material** IDTSPE instance, the selected model contains exactly three generic choice levels:

```text
1. Target-Scope Decision
2. Question-Set Decision
3. Answer Decision
```

The important correction is:

```text
these are not ephemeral reasoning steps
```

When material, they must survive the chat turn sufficiently to be reused/revalidated later.

This does not require:

```text
one file per Decision
```

It does require:

```text
durable planning state / trace
```

---

# 2. Why All Three Must Be Saved

## 2.1 Target-Scope Decision

Without it, later planning cannot answer:

```text
why did we solve this bounded problem?
why is this outside scope?
why did we create/change this Target rather than another?
what Evidence should cause us to reopen the scope?
```

If only the final Target file remains, scope exclusions and rejected alternative scopes may disappear.

## 2.2 Question-Set Decision

Without it, later planning cannot answer:

```text
why were these questions considered sufficient?
which questions were deliberately deferred?
which RQ was split/merged?
why was one possible concern considered irrelevant?
what Evidence should cause question discovery to reopen?
```

This is especially important when a later failure is not:

```text
wrong answer
```

but:

```text
we asked the wrong/incomplete question
```

## 2.3 Answer Decision

Without it, later planning cannot answer:

```text
which candidate answer was selected?
why?
what alternatives existed?
what residual Q/R/P was accepted?
what future Evidence should cause reconsideration?
```

---

# 3. Persistence Invariant

For a material IDTSPE Target:

```text
Current Target State
+
Target-Scope Decision
+
Question-Set Decision
+
material Answer Decisions
+
residual Q/R/P
+
Evidence relations
+
saved useful alternatives
```

together form the reusable planning basis.

Later IDTSPE should not reconstruct this reasoning from prose if durable state already exists.

---

# 4. Decision Record — Recommended Semantic Fields

Conceptual record:

```text
Decision ID

Decision Type:
  Target-Scope
  Question-Set
  Answer

Target:
  stable Target identity/type

Decision Scope / Subject:
  what choice was made?

Selected:
  selected scope / question set / answer

Status:
  selected | superseded | reaffirmed | obsolete

Need / Higher-Level Basis:
  why this choice exists

Sources:
  canonical Sources
  constraints
  Evidence
  prior Decisions

Rationale:
  decisive comparative reasoning

Addresses Concerns:
  Q/R/P / Concern Groups

Introduced / Exposed Concerns:
  concerns created/revealed by selection

Residual Q/R/P:
  material surviving uncertainty/risk/problem

Revalidation Hooks:
  Evidence source
  expected answer/event
  leading indicator
  tolerance/threshold
  reopen route

Related WEUC:
  contextual WEUC instances
  Accepted WEUC Impact

Affected Owners:
  semantic/workspace owners affected

Supersedes:
  prior Decision when applicable

Superseded By:
  later Decision when applicable

Saved Alternatives:
  Alternative / Fallback / Deferred Ideas

Created / Reaffirmed From:
  planning instance / evidence event when useful
```

Exact syntax/storage remains OPEN.

---

# 5. Stable IDs — Proportional Rule

Every material Decision should be durable.

Not every Decision needs a globally stable ID.

Use stable ID when:

- cross-file reference exists;
- Linked Notes should index it;
- residual Q/R/P points back to it;
- WEUC impact references it;
- future revalidation is expected;
- it supersedes another Decision;
- it affects multiple owners;
- history/navigation matters.

Tiny local Decision:

```text
can remain local if it never leaves one target section
```

But the three major shell Decisions of a complex IDTSPE:

```text
Target-Scope
Question-Set
major Answer Decisions
```

will often justify stable addressability.

---

# 6. Where Decisions Should Live

Do not create one universal manually maintained Decision file as a second semantic authority.

Preferred conceptual ownership:

## Target-Scope Decision

Usually lives in:

```text
Target root / Current Plan / target planning state
```

because it defines the shell/boundary of that Target.

## Question-Set Decision

Usually lives in:

```text
Target planning state
```

near the RQ inventory.

It explains how the Target was decomposed into choices.

## Answer Decision

Selected semantic meaning should be integrated into:

```text
narrowest real semantic owner
```

Decision trace may live:

- beside that owner;
- in a cross-cutting Architecture Decision record when genuinely cross-owner;
- in shared planning state when that is the narrowest correct place.

This matches the existing repository principle:

```text
Decision record must not become a competing definition
of Scenario / Domain / Requirement truth
```

---

# 7. Decision Portfolio View — Linked Notes Direction

The user needs a place to see the **whole Decision picture**.

Do not solve that by copying all Decisions manually into one source-of-truth file.

Preferred future direction:

```text
distributed canonical Decision traces
↓
Linked Notes / generated index
↓
Decision Portfolio View
```

Possible generated view:

| Decision | Type | Target | Status | Selected | Residual Q/R/P | Reconsider When | Related WEUC | Supersedes |
|---|---|---|---|---|---|---|---|---|

Possible queries:

```text
decisions(target)
decisions(area)
decisionsByType(Target-Scope)
activeResidualConcerns(decision)
revalidationHooks(decision)
decisionsAffectedBy(WEUC-INS-X)
supersededDecisions(area)
```

Linked Notes is projection/query infrastructure.

It must not become the semantic owner of the Decision body.

---

# 8. Why Decision Portfolio Matters For WEUC

Architecture/WEUC reasoning is rarely one isolated Decision.

The full workspace picture may contain:

```text
D1:
  local persistence owner

D2:
  static exporter registry

D3:
  capability model

D4:
  test seam

D5:
  repository/module split
```

Each Decision can have its own effect on:

- add provider;
- change rule;
- diagnose failure;
- migrate schema;
- understand ownership.

A portfolio view allows:

```text
WEUC instance
→ which Decisions shape its path?

Decision
→ which WEUC instances justify or challenge it?
```

This is required for full-picture revalidation.

---

# 9. What "Full WEUC Picture" Means

It should **not** mean:

```text
one global numeric architecture score
```

It should mean a structured portfolio:

```text
A. Important Workspace UC / WEUC demand
B. Concrete contextual WEUC instances
C. Current/expected work paths
D. Work-cost / friction / risk
E. Driving Decisions
F. Accepted architecture expectations
G. Observed Evidence
H. Derived hot paths / pressure / change axes
I. Open uncertainty / revalidation hooks
```

The picture is multi-dimensional.

Different work can legitimately pull architecture in different directions.

---

# 10. Four Layers Of WEUC Knowledge

## Layer 1 — WEUC Type

Reusable class:

```text
Add export provider
Migrate schema
Change Domain rule
Split owner
Add integration route
Diagnose failed export
```

Type helps discovery.

Type does not justify architecture.

## Layer 2 — Contextual WEUC Instance

Concrete:

```text
Add Zotero provider to Research Capture export subsystem
```

This is the primary architecture evidence unit.

## Layer 3 — Portfolio / Current WEUC Picture

Set of current material instances plus summary relations.

## Layer 4 — Observed WEUC Evidence

Actual performed work:

```text
adding Readwise touched 9 files and 4 owners
```

This updates instance confidence/path and architecture Decisions.

---

# 11. Additional WEUC Instance Fields Required By The Discussion

Current repository already has a useful instance shape, but the selected model needs an explicit **Need / Demand Basis** and alternative-route check.

Conceptual instance:

```text
Instance ID

Type

Concrete Workspace area / owner

Potential / Current Need:
  what future/current useful real result would cause this Workspace work?

Demand Basis:
  current Scenario
  roadmap
  Requirement
  repeated observed request
  current maintenance work
  explicit assumption
  incident/history

Alternative Route:
  can the Need be satisfied:
    without code change?
    without changing this area?
    by configuration?
    by existing capability?
    by another application/process?
    by deferring it?

Expected Workspace useful result:
  what workspace change would actually be needed?

Likelihood:
  high | medium | low | unknown

Horizon:
  now | near | planned | plausible later | unknown

Value / consequence:
  qualitative

Confidence:
  high | medium | low / explanation

Current-work overlap:
  does preparing for it overlap the area already changing?

Preparation-now cost

Deferred/rework cost

Expected/current Workspace Change Path

Understanding effect

Mutation/evolution effect

Verification/diagnosis/operation effect

Runtime effect when applicable

Dependency / change surface

Reversibility

Architectural Tax

Driving / affected Decisions

Residual Q/R/P / Evidence hooks

Observed Evidence

State:
  candidate
  reviewed
  selected-evidence
  observed
  obsolete/stale
```

Exact repository merge with the current WEUC template requires a consistency audit.

---

# 12. Probability / Likelihood Rule

The user correctly needs to evaluate:

```text
how likely is this future need/change?
how soon?
why would it arise?
```

Do not create pseudo-precise probability by default.

Preferred qualitative model:

```text
Likelihood:
  high | medium | low | unknown

Horizon:
  now | near | planned | plausible later | unknown

Confidence:
  high | medium | low
```

Always attach basis:

```text
observed repeatedly
explicit roadmap
already requested
planned Scenario
known external contract change
historical pattern
only speculative assumption
```

Numeric probability is allowed only when actual data supports it and it improves the decision.

Never invent numbers for appearance of rigor.

---

# 13. Future Need Justification For WEUC

Before accepting a future WEUC as architecture pressure, ask:

```text
What Need would cause this change?
Who/what would need it?
What real result would it produce?
Why is that Need plausible?
Could the Need be satisfied without this Workspace change?
How soon could it matter?
What is the consequence if unsupported?
```

This is effectively application of:

```text
Need / Value / Scope Lens
```

to the candidate WEUC itself.

Example:

```text
Candidate:
  "support arbitrary exporter plugins"

Potential Need:
  external third parties install exporters

Evidence:
  none

Alternative:
  project team adds explicit provider when needed

Likelihood:
  low/unknown

Conclusion:
  weak current architecture pressure
```

---

# 14. WEUC Admission Gate

Not every imaginable change becomes a tracked instance.

Candidate enters durable portfolio when:

```text
concrete Workspace area can be named
+
potential/current Need is material enough
+
there is enough evidence/value to justify tracking
```

Strong admission signals:

- current work;
- planned near-term feature;
- repeated historical change;
- high-consequence rare change;
- explicit product roadmap;
- strong external volatility;
- residual architecture Risk specifically mentions it;
- architecture Decision depends on it.

Reject/downgrade:

- generic “could change someday”;
- no Need;
- no concrete owner/path;
- no value/consequence;
- duplicate instance already tracked.

---

# 15. The Full WEUC Lifecycle — Five Checkpoints

The discussion suggests five checkpoints.

## Checkpoint A — Application / Solution Concept Stage

Purpose:

```text
identify high-level future Workspace demand hypotheses
without over-designing architecture
```

Sources:

- likely Scenarios;
- solution roadmap;
- integration candidates;
- known external volatility;
- existing workspace history if app already exists.

Output:

```text
WEUC Type candidates
some early contextual instances
Need/demand basis
likelihood/horizon/value/confidence
```

Important:

```text
no concrete code path yet
→ confidence limited
```

Use these primarily to avoid obviously bad irreversible choices.

Do not build frameworks from abstract possibilities.

## Checkpoint B — Pre-Code Concrete Slice / Realization Stage

Purpose:

```text
instantiate WEUC against planned concrete owners/seams/change surfaces
before architecture is frozen
```

This is the major architecture-decision checkpoint.

Trace expected paths.

Compare:

```text
preparation now
vs
deferred/rework cost
```

Architecture Decisions link concrete instances.

## Checkpoint C — Immediately After First Realization

Purpose:

```text
replace predicted path claims with actual structure
```

Re-trace affected instances against actual:

- files;
- modules;
- classes;
- methods;
- tests;
- runtime/diagnosis path.

Update:

```text
confidence
path
work-cost findings
residual Risk
```

Do not automatically recheck every unrelated instance.

## Checkpoint D — Real Maintenance / Evolution Event

Every actual material Workspace change produces high-value Evidence.

Example:

```text
actual add-provider change
```

Capture:

- actual Need;
- actual path;
- owners touched;
- context;
- verification;
- failure/incident;
- elapsed/effort evidence when reliable;
- unexpected steps.

Update corresponding instance/type.

Possibly discover new WEUC Type/Instance.

## Checkpoint E — Portfolio Review At Material Milestones

Examples:

- before major architecture Decision;
- after multiple Slices;
- after significant repository/module topology change;
- before major release;
- after repeated maintenance incidents;
- explicit architecture review.

Review full active portfolio together.

---

# 16. Pre-Code Full-Picture Algorithm

## Step 1 — Collect demand sources

Look at:

```text
current Application Scenarios
planned future Scenarios
Requirements
selected Solution/Application responsibility
Slice roadmap
known external dependencies
known current developer/maintainer work
historical changes if available
incidents
explicit user/product roadmap
```

## Step 2 — Generate candidate WEUC Types

Examples:

```text
add provider
change capture input
change rule
migrate persistence
add field
change external contract
diagnose failure
change auth
split owner
```

## Step 3 — Instantiate only against concrete areas

```text
Type:
  Add provider

Instance:
  Add second exporter to export subsystem
```

## Step 4 — Apply Need/Value gate

For each:

```text
potential Need?
evidence?
likelihood?
horizon?
value/consequence?
alternative route?
```

## Step 5 — De-duplicate

Two wordings may represent the same actual change path.

Keep one material instance and preserve sources.

## Step 6 — Trace expected path

Against planned architecture:

```text
understand
→ locate owner
→ change
→ migrate
→ verify
→ diagnose/operate
```

## Step 7 — Assess work cost

Use WEUC Lens.

## Step 8 — Compare preparation vs deferral

```text
prepare now:
  marginal complexity/tax

defer:
  expected later rework/fan-out/migration
```

## Step 9 — Cluster pressure

Find:

```text
same owners crossed by many important instances
same repeated synchronized edits
same discovery bottleneck
same verification bottleneck
```

Possible derived:

```text
hot path
Change Pressure
Change Axis
```

Do not derive axis from one hypothetical case mechanically.

## Step 10 — Feed architecture RQs

Only material pressure becomes architecture choice.

---

# 17. Full Portfolio Evaluation — No Single Score

For each active instance, maintain qualitative dimensions.

Then inspect portfolio views.

## View 1 — Demand importance

```text
Likelihood
Horizon
Value/consequence
Confidence
```

## View 2 — Current/Expected work cost

```text
Understanding
Mutation
Verification
Diagnosis/Operation
Runtime when applicable
```

## View 3 — Architecture economics

```text
Current-work overlap
Preparation-now cost
Deferred cost
Reversibility
Architectural Tax
```

## View 4 — Structural concentration

```text
owners repeatedly crossed
hot paths
dependency fan-out
shared bottlenecks
```

## View 5 — Decision exposure

```text
which Decisions affect many important WEUC?
which residual Risks are close to firing?
which Decisions have weak Evidence?
```

The full picture is the combination of these views.

---

# 18. Portfolio Summary — Recommended Derived Output

Do not hand-author a duplicate truth if it can be generated.

Possible summary:

```text
Current most material WEUC instances

High-confidence near-term:
  WEUC-...

High-consequence even if rare:
  WEUC-...

Low-confidence architecture-tax risks:
  WEUC-...

Current hot Workspace paths:
  ...

Crossing Change Axes:
  ...

Decisions most exposed to change:
  ...

Residual architecture Risks / revalidation triggers:
  ...

Evidence gaps:
  ...

Preparation-now candidates:
  ...

Explicitly deferred architecture:
  ...
```

This summary can be a generated/refreshable Linked Notes view.

---

# 19. How To Decide Which WEUC Matter Most

Avoid a rigid scalar score.

Use a qualitative ranking conversation.

First:

```text
Is it current / planned / likely / speculative?
```

Then:

```text
What is consequence/value?
```

Then:

```text
How confident are we?
```

Then:

```text
Does it cross what we are already changing?
```

Then:

```text
Does a small preparation now have large likely payoff?
```

Then:

```text
What does preparing cost if the change never happens?
```

A low-probability high-consequence event may matter.

A frequent trivial edit may not justify architecture.

A future change with huge preparation tax and cheap deferral should often be deferred.

---

# 20. "Most Frequent WEUC Types" — How To Discover Them

Use actual evidence where available:

```text
git history
issues / backlog
past user requests
release notes
incident history
repeated code review patterns
repeated documentation changes
maintainer experience
actual prior IDTSPE/Decision history
```

Classify repeated actual work into WEUC Types.

Example:

```text
last 8 export-related changes:
  3 add/change provider
  2 auth changes
  2 shared failure behavior
  1 UI presentation
```

This is stronger than imagining generic future flexibility.

If history is unavailable:

```text
mark Type/Instance confidence lower
```

Do not invent frequency.

---

# 21. WEUC Before Any Code Exists

The user specifically wants early analysis.

At Application Concept / responsibility stage:

You can often know:

```text
external integrations likely?
multiple data sources?
likely Domain rule change?
likely persisted schema evolution?
important debugging/operations?
```

But you cannot honestly know exact:

```text
files
classes
methods
fan-out
```

Therefore early WEUC record should separate:

```text
Demand confidence
vs
Path confidence
```

Example:

```text
Need:
  add Zotero export
Demand confidence:
  high

Path:
  exporter module + config + tests
Path confidence:
  low before code
```

This prevents false precision.

---

# 22. WEUC Immediately Before Code

Once Slice/realization owners are planned:

```text
Path confidence rises
```

Now ask:

```text
if this WEUC happened after current planned implementation,
what exact owners/seams would change?
```

This is where architecture preparation can still be cheap.

Example:

```text
SL-03 first exporter planned

WEUC:
  add second exporter

compare:
  branch in ExportService
  vs
  narrow ExportProvider boundary
```

---

# 23. WEUC Immediately After Code

Re-trace only affected/material instances.

Compare:

```text
Expected Workspace Change Path
vs
Actual Current Structure Path
```

Update:

```text
path confidence
fan-out
verification
debugging
architecture tax estimate
Decision revalidation hooks
```

This is mandatory when:

- an Architecture Decision was materially justified by the predicted path;
- actual implementation structure differs materially;
- new unexpected owner/coupling appears.

It is not mandatory for every tiny edit.

---

# 24. Representative WEUC Experiment

When waiting for a real future change would take too long, create a bounded **representative change-path experiment**.

Example:

```text
simulate adding FakeExporter
```

Measure:

```text
what must be understood?
what owners touched?
what tests changed?
what registration?
what debugging?
what rollback?
```

This produces Practical/Architecture Evidence.

Do not ship fake functionality merely to test architecture.

The experiment can be temporary or analysis-only.

---

# 25. Architecture Decision Against Portfolio — Sequence

When a concrete architecture RQ exists:

## 1. Define Decision scope

Do not start with Pattern.

## 2. Resolve affected current Workspace work

Not just future work.

## 3. Select material WEUC portfolio subset

Include:

```text
driving instances
important negatively affected instances
important unaffected baseline work
```

## 4. Create Idea Variants

## 5. For each Idea, evaluate every material instance

Example table:

| Idea | W1 Add provider | W2 shared failure rule | W3 auth change | W4 diagnose failure |
|---|---|---|---|---|
| Branching service | cheap now / poor later | centralized | branch growth | moderate |
| Provider contract | local | centralized | provider-local | good |
| Dynamic plugins | local | centralized | flexible | higher current complexity |

## 6. Evaluate preparation tax

## 7. Select Decision

## 8. Save Accepted WEUC Impact

For selected Decision:

```text
expected:
  W1 add-provider path local to ...
  W2 shared semantics remain ...
  W4 diagnosis available through ...
```

## 9. Save residual Risk/Q/P

## 10. Revalidation readiness

Define future Evidence/indicators.

---

# 26. Accepted WEUC Impact

For every material architecture/workspace Decision, keep the accepted expectation.

Example:

```text
Decision:
  ExportProvider boundary

Accepted WEUC Impact:

W1 Add provider:
  expected change path:
    provider implementation
    registry
    provider contract tests

W2 Change shared export failure semantics:
  expected path:
    shared orchestration
    shared tests

W3 Provider-specific capability:
  uncertainty:
    not yet modeled

Architectural Tax:
  one contract + explicit registry

Reconsider:
  if capability-specific branching leaks outside provider owners
```

This is the baseline for post-code/reality comparison.

---

# 27. Observed WEUC Evidence

After actual work:

```text
Observed instance
actual Need
actual path
actual owners
actual verification
actual diagnosis
unexpected work
actual failures
```

Do not rewrite Accepted Impact history.

Instead:

```text
Accepted expectation
vs
Observed Evidence
```

Then reconcile Current WEUC State.

---

# 28. WEUC State Reconciliation

```text
previous Current WEUC State
+ new/updated demand evidence
+ Accepted WEUC Impact
+ Observed WEUC Evidence
+ current architecture state
→ updated Current WEUC State
```

Possible updates:

- likelihood/horizon changed;
- confidence changed;
- expected path became actual;
- instance became obsolete;
- new Type discovered;
- hot path discovered;
- Change Axis strengthened/weakened;
- architecture Decision reaffirmed/challenged.

Do not erase provenance.

---

# 29. Decision Revalidation From WEUC

WEUC can trigger any of the three planning re-open levels.

## Answer re-open

```text
architecture answer is now too costly
```

Example:

```text
provider interface no longer fits observed capability variation
```

## Question-Set re-open

```text
we originally asked only:
  "how to add providers?"

new WEUC shows:
  auth lifecycle and diagnosis are independent material concerns

→ add/split RQs
```

## Target-Scope re-open

Example:

```text
export subsystem architecture Target
was too narrow;
actual work shows external-reference persistence and auth lifecycle
form one cross-owner target
```

Use only when actual evidence justifies broader scope.

---

# 30. Mitigation Without Superseding Decision

WEUC Risk can become material while existing Decision remains useful.

Example:

```text
Decision:
  local SQLite storage

Risk:
  backup/recovery burden may grow

Observed:
  database size increases

Current Decision still best
```

Action:

```text
new RQ:
  how should backup/recovery be handled?

new additive Decision:
  automated backup
```

Do not supersede local-storage Decision unnecessarily.

---

# 31. Decision + WEUC Linked Notes Portfolio — Proposed Projection

Future generated file/view could show:

```text
# Current Decision / WEUC Portfolio

## Target-Scope Decisions
...

## Question-Set Decisions
...

## Answer / Architecture Decisions
...

## Material WEUC Instances
...

## Decision → WEUC Map

D-ARCH-02
  justified by:
    WEUC-02
    WEUC-03

  accepted impact:
    ...

  residual revalidation:
    ...

## WEUC → Decision Map

WEUC-02 Add provider
  shaped by:
    D-ARCH-01
    D-ARCH-02

  current path:
    ...

  evidence:
    ...

## Hot Paths / Change Axes
...

## Open Revalidation Triggers
...
```

Important:

```text
generated portfolio
≠ second semantic owner
```

It is a working current-picture projection.

---

# 32. Candidate Linked Notes Queries

Future desired capability:

```text
decisions(target)
decision(id)
decisionSources(id)
decisionConcerns(id)
decisionAlternatives(id)
revalidationHooks(id)

weuc(area)
weucByType(type)
weucByDecision(decision)
decisionsByWEUC(instance)
weucHotPaths(area)
weucEvidence(instance)

currentArchitecturePicture(area)
currentDecisionWEUCPortfolio(area)

affectedDecisions(changedSource)
affectedWEUC(changedOwner)
```

This is a target-state query direction.

Current Linked Notes functionality must be consistency-audited before extension.

---

# 33. Full WEUC Picture Review Command — Desired Behavior

Working future command:

```text
собери WEUC-картину
```

Inputs:

```text
Target Workspace/application area
Current Target/architecture
Decision Portfolio
Current WEUC register
Application roadmap/Scenarios
current Workspace UCs
Practical Evidence/history
```

Actions:

```text
1. resolve existing WEUC instances/types
2. identify stale instances after structural change
3. discover candidate demand from current/planned Needs
4. apply Need/alternative/admission gate
5. deduplicate
6. trace expected/current paths
7. evaluate work cost
8. cluster hot paths/pressure
9. map Decisions ↔ WEUC
10. evaluate residual revalidation triggers
11. show preparation-now vs defer candidates
12. produce current portfolio summary
```

Outputs:

```text
Current WEUC Portfolio
new/changed/obsolete instances
Decision exposure map
Hot Paths
Change Pressure / Change Axes
Evidence gaps
Decisions needing review
no-change conclusions
```

Permission:

```text
read-only planning
```

---

# 34. Current `собери WEUC` Candidate Role

Current repository command appears close to:

```text
discover contextual WEUC instances
```

It already includes:

- Type optional;
- concrete instance;
- likelihood/horizon/value/confidence;
- current-work overlap;
- preparation-now vs deferred cost;
- expected Workspace Change Paths;
- friction/risk;
- architecture handoff.

This is strong overlap.

But before reuse in the target model, audit:

```text
Does it include Need/Demand Basis strongly enough?
Does it include alternative route?
Does it distinguish demand confidence vs path confidence?
Does it own portfolio refresh or only one-area discovery?
How does it link to three Decision types?
How does post-code re-trace work?
How is Accepted WEUC Impact persisted?
How is Current WEUC State reconciled?
How does it interact with Linked Notes?
Are any responsibilities duplicated by Pressure/Architecture Decision workflows?
```

Do not claim these are already solved merely because related text exists.

---

# 35. Current `оцени давление на архитектуру` Candidate Role

Potential target role:

```text
portfolio/instance findings
→ derive supported pressure / Change Axes / hot paths
```

Consistency audit must check:

- no duplicate WEUC admission/evaluation owner;
- pressure is derived from concrete evidence;
- no axis mechanically creates architecture;
- stale axes are revalidated;
- full portfolio trade-offs remain visible.

---

# 36. Current `прими архитектурное решение` Candidate Role

Potential target role:

```text
one architecture Answer Decision
```

Strong overlap already exists with:

- Idea Variants;
- current/future Workspace work;
- WEUC;
- reversibility;
- Architectural Tax;
- `Revisit Trigger`;
- selected/rejected complexity.

Audit/extension needed for:

- generic three-decision model;
- residual Q/R/P revalidation helper contract;
- Accepted WEUC Impact persistence;
- portfolio-level comparison;
- Decision Portfolio / Linked Notes projection.

---

# 37. WEUC Portfolio Validator — Possible Future Validator

A full portfolio review can be checked for conformance.

Potential validator:

```text
WEUC Portfolio Conformance Validator
```

Checks:

- every material instance has Demand Basis;
- no generic future flexibility without concrete instance;
- likelihood/horizon/value/confidence justified;
- alternative route considered when material;
- expected/current path exists;
- stale path after structural change flagged;
- architecture Decision references driving instances;
- Accepted Impact not confused with Observed Evidence;
- obsolete instances marked rather than silently reused;
- no numeric pseudo-precision without data.

This may be part of the Workspace Pack.

---

# 38. Example Full WEUC Portfolio — Research Capture

## Types

```text
WT-01 Add Export Provider
WT-02 Change Capture Metadata
WT-03 Migrate Persistence
WT-04 Change Provider Capability
WT-05 Diagnose Export Failure
WT-06 Change Authentication
```

## Instances

```text
W1 Add Zotero Provider
  now
  high value
  high confidence

W2 Add Future Third Provider
  plausible later
  medium/unknown value
  low confidence

W3 Change Browser Metadata Extraction
  medium likelihood
  medium value
  medium confidence

W4 Add Export Capability Variation
  observed
  high confidence

W5 Migrate CaptureItem Schema
  planned later
  medium confidence

W6 Diagnose Failed Export
  current operational
  high consequence
```

## Derived hot paths

```text
export provider boundary
persistence migration boundary
capture-source adapter
```

## Decision exposure

```text
ARCH-D03
→ W1 W2 W4 W6

PERSIST-D01
→ W5

CAPTURE-ADAPTER-D01
→ W3
```

## Revalidation triggers

```text
ARCH-D03:
  capability flow leaks outside provider owner

PERSIST-D01:
  migration touches multiple startup/runtime owners

CAPTURE-ADAPTER-D01:
  metadata variation requires Scenario behavior change
```

This is what "full picture" begins to mean operationally.

---

# 39. WEUC And Application Planning Timing

Recommended SDS integration:

```text
STEP 0
Application Need / Solution / Concept
→ discover major future Workspace demand hypotheses only

STEP 1
Scenarios
→ future Scenario changes may become WEUC demand Sources

STEP 2
Domain
→ identify plausible rule/schema/lifecycle evolution only when evidence-backed

STEP 3 early
Slice Strategy / planned realization
→ concrete WEUC instances
→ pre-code path tracing
→ architecture Decisions

STEP 3 selected Slice
→ Accepted WEUC Impact linked to Decisions

STEP 4
implementation / tests
→ post-code path re-trace
→ observed Evidence
→ revalidation

later maintenance
→ actual WEUC event Evidence
→ portfolio update
```

This preserves one-directional semantics:

```text
Application behavior
→ Source for Workspace evolution reasoning
```

WEUC does not redefine Application behavior.

---

# 40. Decision Persistence Validator — Exact Required Check

For material IDTSPE:

```text
Target-Scope Decision exists?
Question-Set Decision exists?
all material Answer Decisions exist?
```

For each:

```text
selected meaning integrated?
Sources/rationale recoverable?
residual Q/R/P retained?
revalidation hooks ready?
saved fallback retained when useful?
supersession explicit?
related WEUC linked when applicable?
```

If not:

```text
planning result is not durable enough
```

This should be a Validator in the Core Pack.

---

# 41. Interaction With Target Projection

Important:

```text
Decision record
≠ substitute for Target semantic body
```

Example:

```text
D:
  "CaptureItem has stable identity"
```

must be integrated into Domain owner.

Later Decision Portfolio references it.

Do not make one decisions file the only place where Domain truth exists.

Likewise:

```text
Target-Scope Decision
```

explains why Slice boundary exists.

The Slice file still owns the current Slice semantic representation.

---

# 42. Full Revalidation Query

Future helper/Linked Notes could support:

```text
revalidate(area)
```

Conceptually:

```text
load:
  Current Target(s)
  three Decision types
  residual Q/R/P
  new Evidence
  changed Sources
  Current WEUC State
  observed WEUC updates

for every relevant Decision:
  evaluate hooks

then:
  reaffirm
  mitigation
  answer re-open
  question-set re-open
  Target-Scope re-open
  upstream correction
```

This is more useful than blindly re-running every old planning workflow.

---

# 43. No-Change Is A First-Class Result

At every WEUC checkpoint:

```text
reviewed
→ no material new instance
→ no pressure change
→ no Decision re-open
```

is valid.

At Decision revalidation:

```text
new Evidence reviewed
→ old Decision still correct
```

is valid.

Do not manufacture change to make the process look productive.

---

# 44. Operational Checklist — Before Architecture Decision

```text
[ ] concrete Decision scope
[ ] current Workspace work identified
[ ] material future WEUC demand identified
[ ] Need/Demand Basis for future instances
[ ] likelihood/horizon/value/confidence
[ ] alternative route considered
[ ] expected path traced
[ ] current-work overlap
[ ] preparation-now cost
[ ] deferred cost
[ ] affected important work beyond driving WEUC
[ ] candidate Ideas
[ ] Dependency impact
[ ] WEUC impact
[ ] verifiability/operations impact
[ ] residual Q/R/P
[ ] Decision rationale
[ ] Accepted WEUC Impact
[ ] revalidation hooks
```

---

# 45. Operational Checklist — Immediately After Code

```text
[ ] actual structure/path captured
[ ] predicted affected WEUC instances selected
[ ] expected vs current path compared
[ ] actual tests/diagnosis path reviewed
[ ] unexpected fan-out/coupling recorded
[ ] Observed WEUC Evidence linked
[ ] Decision hooks evaluated
[ ] Current WEUC State reconciled
[ ] unrelated instances not reopened without reason
```

---

# 46. Operational Checklist — Real Maintenance Event

```text
[ ] real Need recorded
[ ] actual Workspace task/result recorded
[ ] matching WEUC Type/Instance resolved or created
[ ] actual understanding path
[ ] actual mutation path
[ ] actual verification path
[ ] diagnosis/operation path when relevant
[ ] owners/change surface
[ ] friction/errors
[ ] affected Decisions
[ ] residual trigger status
[ ] portfolio updated
```

---

# 47. Main Selected Conclusions

```text
D-WEUC-01
Three generic Decision types are durable planning state.

D-WEUC-02
Do not manually duplicate all Decisions into one semantic authority file.

D-WEUC-03
Use Linked Notes/generated projection for Decision portfolio/full picture when feasible.

D-WEUC-04
Full WEUC picture is a portfolio, not a scalar architecture score.

D-WEUC-05
Every future WEUC instance should have a concrete Need/Demand Basis and, when material, an alternative-route check.

D-WEUC-06
Use qualitative likelihood/horizon/value/confidence unless real numeric evidence exists.

D-WEUC-07
WEUC analysis has at least:
  concept hypothesis
  pre-code concrete instance
  post-code re-trace
  real maintenance evidence
  milestone portfolio review.

D-WEUC-08
Architecture Decisions compare candidate Ideas against a material WEUC portfolio subset, not one attractive future case.

D-WEUC-09
Accepted WEUC Impact is persisted separately from later Observed WEUC Evidence.

D-WEUC-10
Observed Evidence reconciles Current WEUC State.

D-WEUC-11
WEUC can re-open Answer, Question Set or Target Scope, but only when Evidence justifies it.

D-WEUC-12
A WEUC problem can also require an additive mitigation Decision while preserving the existing Decision.

D-WEUC-13
Current repo WEUC/Architecture mechanisms are reuse candidates only after consistency/deduplication audit.
```

---

# 48. Open Questions

## Storage

Exact physical storage of:

- Target-Scope Decisions;
- Question-Set Decisions;
- Answer Decisions;
- Accepted WEUC Impact;
- Current WEUC portfolio.

## Linked Notes

Exact schema/query support.

## Current WEUC State

Whether one generated project-level view is enough or a canonical architecture-state owner also needs explicit portfolio summary.

## History sources

Whether Git/issues/change logs can be queried automatically to suggest WEUC Types/frequency evidence.

## Numeric data

When actual frequency/time/cost metrics justify quantitative comparison.

## Command UX

Whether full portfolio review gets a new direct command or becomes a refinement/mode of a consistency-audited existing architecture route.

---

# 49. Final Operational Formula

```text
APP PLAN
→ predicts future Workspace demands

WEUC PORTFOLIO
→ turns those demands into concrete contextual change-work instances

ARCHITECTURE DECISION
→ selects current structure against important current/future work

ACCEPTED WEUC IMPACT
→ records what the Decision claims it will improve/preserve

CODE / REALITY
→ produces actual Evidence

WEUC RECONCILIATION
→ checks whether the claimed work paths are true

DECISION REVALIDATION
→ preserves, mitigates or reopens only what Evidence actually challenges

LINKED NOTES PORTFOLIO
→ lets later planning see the whole current Decision + WEUC picture
without duplicating semantic authority.
```
