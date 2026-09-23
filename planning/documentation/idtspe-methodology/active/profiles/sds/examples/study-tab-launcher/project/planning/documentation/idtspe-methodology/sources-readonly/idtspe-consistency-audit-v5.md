# IDTSPE Consistency And Coverage Audit v5

Status: completed conceptual consistency audit  
Basis:
- `idtspe-coherent-model-v4.md`
- `idtspe-evidence-revalidation-verification-clarification.md`
- accumulated discussion history through `r7`
- earlier IDTSPE / Source Contract / WEUC / Idea Review captures
- current repository base snapshot `915325d4...` for repository-confirmation checks
Repository mutation: none

---

# 1. Audit Conclusion

The current direction is coherent, but `v4` still needed several corrections before it could be called a complete picture.

The strongest stable model is:

```text
Need-rooted
+ scoped
+ Source-of-Truth reusing
+ three-choice-level
+ Lens-driven
+ Q/R/P + Evidence
+ Decision-backed
+ target-contract-projected
+ validator-checked
+ selectively revalidated
+ one-directional where possible
```

The main corrections selected by this audit are:

1. Revalidation is not only a post-realization step.
   A lightweight prior-decision challenge scan belongs immediately after Source resolution.

2. A second revalidation point is required after combining several new Decisions.
   Two individually acceptable Decisions may create a bad composition effect.

3. `owner` for Q/R/P was overloaded.
   Separate:
   - semantic owner of Q/R/P methodology;
   - concern subject / affected planning meaning;
   - physical detailed storage owner.

4. Positive evaluation, Evidence and Q/R/P must remain distinct.
   Negative material unresolved evaluation becomes Q/R/P.
   Positive comparative reasoning normally becomes evaluation/rationale, not a new first-class entity.

5. `Uncertainty / Assumption / Reversibility` is a pre-decision Lens.
   Revalidation is a later lifecycle mechanism.

6. `Decision Revalidation Readiness Validator` is a required conformance check when material residual Q/R/P survive a Decision.

7. `Verifiability / Observability / Operability` is the Lens.
   Planned/actual proof is Evidence or an Evidence plan, not a peer Lens.

8. Delivery constraints remain typed Sources plus ordinary planning Rules.
   No peer Delivery Lens is selected.

9. The minimal public reusable module taxonomy remains:
   `Lens / Validator / Guard / Rule / Pack`.

10. The full flow must explicitly show where each Lens applies rather than presenting a flat Lens catalog.

---

# 2. Confirmed Three Choice Levels

The accumulated discussion consistently converges on exactly three generic choice levels:

```text
LEVEL 1
Target / Scope

LEVEL 2
Resolution Question Set

LEVEL 3
Answer / Idea
```

Each level uses the same lifecycle:

```text
candidate
→ candidate Q/R/P
→ selected Decision
→ residual Decision Q/R/P
→ later Evidence
→ reaffirm or selective re-open
```

Therefore selective re-open has exactly three generic planning levels:

```text
Target-Scope Decision
→ reopen Target/Scope Discovery

Question-Set Decision
→ reopen Resolution Question Discovery

Answer Decision
→ reopen one Resolution Question
```

A separate `UPSTREAM SEMANTIC CORRECTION` is not a fourth choice level.
It is routing to the canonical owner of a Source proven wrong.

A `LOCAL CORRECTION` is also not a fourth choice level.
It fixes realization while preserving planning Decisions.

---

# 3. Q/R/P Ownership Terminology Correction

Current repository semantics already have one reusable cross-cutting owner:

```text
planning/documentation/planning-concerns-and-decisions-model.md
```

That owner defines Q/R/P / Concern Group / Decision-trace semantics.

Therefore future IDTSPE should avoid saying literally:

```text
Idea semantically owns Q/R/P
```

Use three separate meanings.

## 3.1 Concern semantic owner

The methodology/model that defines what Q/R/P means and how its lifecycle works.

Current repository:

```text
planning-concerns-and-decisions-model.md
```

## 3.2 Concern subject / attachment

The concrete planning object currently challenged/monitored.

Possible subjects in the selected IDTSPE model:

```text
Target/Scope Candidate
Target-Scope Decision
RQ / Question-Set Candidate
Question-Set Decision
Idea / Variant
Answer Decision
```

This is the intended meaning of earlier phrases such as:

```text
Idea owns candidate Q/R/P
Decision owns residual Q/R/P
```

Better wording:

```text
Q/R/P is attached to / challenges / monitors Idea
Q/R/P is attached to / monitors Decision
```

## 3.3 Detailed storage owner

Where the full concern body is physically stored.

Current repository correctly allows contextual storage and one detailed owner plus references.

This separation preserves the new lifecycle model without creating a second Q/R/P ontology.

---

# 4. Evidence / Evaluation / Q-R-P / Rationale

A consistent four-layer model is needed.

## Evidence

Observed/authoritative input.

Examples:

```text
test failed
API limit = X
runtime touched 7 owners
user acceptance failed
```

Evidence is a Source.

## Evaluation finding

Interpretive reasoning produced while applying a Lens.

Examples:

```text
Idea A creates a wider change surface than Idea B
Idea B keeps the hot Workspace change path local
Idea C is easy to reverse
```

An evaluation finding can be positive, neutral or negative.

It does not automatically need a durable entity.

## Q/R/P

A material adverse or unresolved evaluation finding that needs tracking.

```text
Q
→ material unknown

R
→ material future adverse possibility

P
→ material known current adverse state
```

If a negative finding is obvious, resolved immediately and has no future value, integrate its consequence instead of manufacturing durable Q/R/P.

## Decision rationale

The accepted interpretation explaining why one answer/scope/question set was selected.

It may cite:

```text
Sources
Evidence
Q/R/P
comparative findings
WEUC impacts
constraints
```

No first-class `Argument` entity is selected.

Open only if future query/provenance needs prove Decision rationale insufficient.

---

# 5. Revalidation Timing Correction

`v4` correctly says revalidation is lifecycle rather than Lens, but the full flow needs three invocation points.

## 5.1 Early prior-decision challenge scan

After Source Contract resolution:

```text
trusted prior Decisions/Sources
+ their residual Q/R/P
+ already available new Evidence
+ changed constraints/Sources
↓
challenge scan
```

Purpose:

Avoid planning downstream on top of an already-invalid assumption.

If nothing challenges prior work:

```text
reuse confidently
```

If challenged:

```text
reopen narrowest prior choice before continuing
```

## 5.2 Post-selection composition review

After several new Decisions are selected:

```text
old accepted Decisions
+ new selected Decisions
+ combined projected state
↓
composition review
```

Reason:

```text
D1 good alone
D2 good alone
D1 + D2 bad together
```

Possible combined failures:

- duplicate authority;
- new dependency cycle;
- unexpected change fan-out;
- bad WEUC;
- broken verification;
- violated Target boundary;
- a residual Risk becomes real.

## 5.3 Post-realization revalidation

After practical Evidence:

```text
actual implementation/tests/runtime/WEUC
+ Decision reconsideration contracts
↓
reaffirm / local correction / selective re-open
```

---


# 5A. Additional Restored Invariants

Two earlier directions were also restored after the first v5 draft.

## Target-specific justification lineage

Generic IDTSPE must preserve:

```text
every material Target
→ can answer why it exists
→ by reference to accepted upstream Source/Decision/Need
```

But the lineage is Target-family-specific.

Do not introduce a fixed universal reverse ladder.

Application SDS may use:

```text
Need
→ Real-Life Scenario
→ Application Responsibility
→ Application Scenario
→ Behavior/DATA
→ Domain
→ Slice
→ Realization
```

Another Target family may use a much shorter chain.

Physical reverse traversal remains proportional and challenge-driven.

## Mitigation / additive Decision

A triggered residual Risk/Problem does not always invalidate the existing Decision.

Possible result:

```text
existing Decision remains valid/useful
+
new adverse condition becomes material
↓
add a mitigation RQ / Decision
```

This is not a fourth generic re-open level.

It is an additive choice inside the still-valid Target/Question scope unless the new mitigation need itself proves that the question set/scope must change.


# 6. Lens Taxonomy Consistency

Selected planning Lenses:

## Core / Near-Core

```text
L1 Need / Value / Scope
L2 Authority / Source-of-Truth / Reuse
L3 Uncertainty / Assumption / Reversibility
```

## Contextual

```text
L4 Dependency & Change Impact
L5 Workspace Evolution / WEUC
L6 Verifiability / Observability / Operability
L7+ specialized domain-quality lenses
```

Removed as peer Lenses:

```text
Revalidation
Target Projection Completeness
Delivery / Constraint
Proof
Architecture Pressure
Change Surface
Consistency / Semantic Authority
```

They were normalized as:

```text
Revalidation
→ lifecycle mechanism

Target projection completeness
→ Validator

Delivery
→ Source + Rule

Proof
→ Evidence / Evidence plan

Architecture Pressure
→ WEUC facet/finding

Change Surface
→ Dependency & Change Impact facet

Consistency / Semantic Authority
→ Authority / Source-of-Truth / Reuse facet
```

No remaining semantic need was found for a separate peer Lens among those removed.

---

# 7. Lens Applicability Correction

A Lens is not globally mandatory merely because it is reusable.

Applicability sources:

```text
Target family / Target Contract
Planning Topology stage
environment type
Resolution Question
current Sources
detected risk/problem archetype
current Evidence
explicit user/agent choice
```

Core/near-core means:

```text
high chance of applicability
≠ compulsory output section every time
```

A valid Lens result may be:

```text
checked proportionally
→ no material concern / no further analysis
```

---

# 8. Decision Revalidation Readiness — Confirmed Direction

This is correctly a Validator, not a Lens.

It runs when a selected Decision keeps material residual Q/R/P.

## Residual Question

Needs enough future-use information to know:

```text
what is unknown
why material
what Evidence may answer it
when/from where it may arrive
which answers:
  confirm
  weaken
  reopen
  invalidate
```

## Residual Risk

Needs:

```text
risk hypothesis
leading indicators
Evidence source
monitoring horizon
threshold/event
reopen target
known fallback when useful
```

## Residual Problem

Needs:

```text
known current adverse state
why accepted now
severity/measurement
tolerance threshold/deadline/event
remediation/reopen route
```

No residual material Q/R/P:

```text
PASS
```

Do not generate fake future hooks.

---

# 9. Current Repository Confirmation

The new IDTSPE model is not yet canonical repository semantics as a whole.

The following pieces are already confirmed in the base repository.

## 9.1 Idea is a candidate answer

Current owner:

```text
planning/documentation/idea-planning-principles-and-terminology.md
```

Current meaning explicitly states that an Idea is one possible answer to a Problem, Question, Need or other answer-seeking concern.

This strongly supports:

```text
RQ / concern
→ Ideas / Variants
→ selected answer
```

but the repository does not yet have the proposed generic `Resolution Question` entity/model.

## 9.2 Standard Idea Review already contains important Lens-like checks

Current:

```text
Source / Status
Problem / Need
Proposed Answer
Relevance / Expected Effect
Necessity / Better Route
Possible Refinements
Local Consistency
Integrated Consistency
Current Conclusion
Q/R/P routing
```

This supports the new Lens decomposition.

The new model should reuse these meanings rather than create parallel review logic.

## 9.3 Q/R/P / Concern Groups / Decision trace already have a canonical shared owner

Current owner:

```text
planning/documentation/planning-concerns-and-decisions-model.md
```

Confirmed current concepts include:

- Question / Risk / Problem;
- Owner / affected semantic meaning;
- Origin / Provenance;
- Introduced / Exposed By;
- Priority;
- Concern Category;
- Status;
- Concern Group;
- Answer / Evidence;
- Recommendation;
- Decision refs;
- Residual state / treatment;
- `Reconsider When`;
- retained Decision/Concern trace;
- Recommendation ≠ selected Decision;
- residual Risks/Problems remain when material.

This means the new revalidation-readiness direction extends an existing foundation rather than inventing it from nothing.

## 9.4 Concern Groups already mean shared resolution surface

Current repository already states:

```text
mixed Q/R/P
→ one Concern Group
when they materially share one resolution surface
```

No new generic Concern Group ontology is needed.

## 9.5 Architecture Decision workflow already contains several selected Lens ideas

Current owner:

```text
planning/documentation/architecture-planning/architecture-decision-workflow.md
```

Current evaluation already includes:

- Trigger/current baseline;
- affected Workspace work;
- Idea Variants;
- current correctness;
- current/future UC effect;
- contextual WEUC;
- Change Axes;
- understanding/mutation/verification/diagnosis/operation cost;
- runtime cost;
- migration;
- reversibility;
- Architectural Tax;
- conditional architecture heuristics rather than mandatory patterns;
- `Revisit Trigger when useful`.

This strongly confirms:

```text
WEUC Lens
Uncertainty/Reversibility
conditional programming principles
future revalidation hooks
```

as directions consistent with current architecture methodology.

## 9.6 WEUC is already treated as work-cost evaluation, not Application behavior authority

Current owner:

```text
planning/documentation/architecture-planning/workspace-use-cases-and-change-pressure.md
```

Current repository explicitly separates:

```text
Application Scenario
→ Application behavior authority

Workspace UCs / WEUC
→ Workspace work / architecture evidence
```

It also already treats understanding/mutation/verification/operation modes as cost lenses and defines Change Pressure / Change Axis.

## 9.7 Application Target families are already explicit

Current registry includes:

```text
UC-PLAN-REALITY
UC-PLAN-COLLECT-IDEAS
UC-PLAN-SOLUTION
UC-PLAN-APP-CONCEPT
UC-PLAN-SCENARIO-DISCOVERY
UC-PLAN-SCENARIO
UC-PLAN-DOMAIN-DISCOVERY
UC-PLAN-DOMAIN
UC-PLAN-REALIZATION
UC-PLAN-SLICE-STRATEGY
UC-PLAN-SLICE
UC-PLAN-CONSISTENCY
```

This supports the claim:

```text
SDS already behaves like a rich pre-designed Target-family topology/preset
```

although the generic `Planning Topology` abstraction is not currently canonical.

## 9.8 Slice workflow already requires full semantic coverage

Current Slice workflow explicitly consumes/reviews:

```text
Scenarios / Behavior Items
Requirements
Domain meaning
architecture/WEUC evidence when material
implementation-scoped Ideas
proof/verification
delegated/shared/later/outside meaning
```

and explicitly forbids silently redefining upstream Scenario/Requirement/Domain meaning.

This confirms the need for a Target projection/output conformance check.

## 9.9 Pre-Update is already explicit and plan-only

Current owner:

```text
planning/documentation/file-update-overview-workflow.md
```

Current repository already confirms:

```text
selected semantic planning
→ exact owners/files/actions/dependencies/checks
→ still plan-only
```

The earlier eight-part Pre-Update model is an **expansion/planning direction**, not the exact current repository shape.

This distinction must remain visible.

---

# 10. Selected Model Extensions Not Yet Current Repository Authority

The following are current **selected conceptual directions**, not yet current repository facts.

```text
formal generic IDTSPE engine semantics
three explicit generic choice levels
Target-Scope Decision
Question-Set Decision
Resolution Question terminology/entity
typed generic Source Contract record/schema
generic Lens contract
Lens / Validator / Guard / Rule / Pack modular taxonomy
Rule Set Coverage Validator
Decision Revalidation Readiness Validator as explicit reusable validator
Target Projection Conformance Validator as explicit reusable validator
generic Planning Topology abstraction
formal Rule Packs
generic Target Decision State representation
full accepted-WEUC-impact → observed-evidence → reconciliation contract
eight-part expanded dependency-aware Pre-Update
formal Need entity/template
formal Real-Life Scenario entity/template
```

These should not be described as already canonical repository entities until a future Pre-Update/implementation changes the repository.

---

# 11. Current Repository Semantics Requiring Careful Migration

## 11.1 Candidate-specific Q/R/P attachment

Current Idea methodology says:

```text
Related Idea is optional
Idea methodology does not own generic Q/R/P lifecycle
```

Future model wants candidate-specific concerns during selection.

Safe migration direction:

```text
shared Concern model remains semantic owner
+
add/clarify candidate subject/attachment semantics
```

Do not duplicate the full concern body inside every Idea.

## 11.2 `UC-PLAN-COLLECT-IDEAS`

Current UC is explicitly about Idea source review.

Generic IDTSPE is broader:

```text
Idea Source optional
Need/Target planning can exist without a fresh Idea batch
```

Therefore do not simply rename `UC-PLAN-COLLECT-IDEAS` to IDTSPE without reviewing UC ownership/routing.

## 11.3 Need / Reality

Current `UC-PLAN-REALITY` owns checked descriptive Current Reality.

It does not yet prove the final owner shape for:

```text
Need
Real-Life Scenario
Justification chain
```

Reuse/extension must be inspected before new files are invented.

## 11.4 Pre-Update

Current Pre-Update already has broad required content and plan-only authority.

The proposed eight-part structure should be treated as target-state refinement, not current fact.

---

# 12. Missing Or Previously Under-Specified Items Restored In Full v5

The full model must explicitly include:

- early prior-decision challenge scan;
- post-multi-Decision composition review;
- post-realization revalidation;
- concern semantic owner vs concern subject vs storage owner;
- Evidence vs evaluation finding vs Q/R/P vs Decision rationale;
- exact Lens application by flow stage;
- exact actions inside each Lens;
- Lens applicability;
- Q/R/P creation/admission rule;
- positive findings do not require durable entity;
- Decision Revalidation Readiness validator;
- saved alternative/fallback reuse during re-open;
- CREATE / INTEGRATE / PLAN / SHOW / evidence-entry modes;
- typed Sources;
- one-directional Source reuse;
- Target projection conformance;
- dependency/freshness relation separation;
- WEUC current/projected/accepted/observed/reconciled states;
- Pre-Update / permission boundary;
- Local Correction vs three choice re-opens vs upstream correction;
- current-repo-confirmed vs selected-future-model status;
- Rule Pack composition without taxonomy explosion.

---

# 13. Final Audit Judgment

No fundamental contradiction remains after the corrections above.

The main model can now be expressed as:

```text
PLAN FORWARD:
Need
→ Target/Scope Decision
→ Source Context
→ RQ-Set Decision
→ Answer Decisions
→ Target State
→ Realization

PROTECT PRIOR WORK:
accepted Sources/Decisions
→ reuse by default

CHALLENGE ONLY WHEN JUSTIFIED:
residual Q/R/P
+ Evidence
+ WEUC
+ changed Sources/constraints
+ new Decision composition
→ narrow selective re-open

MAKE THINKING MODULAR:
applicable Lenses
→ concrete evaluation/QRP

MAKE EXECUTION CHECKABLE:
Validators / Guards / Rules
→ command/process/persistence/projection correctness
```

This is the baseline used for `idtspe-complete-picture-v5.md`.
