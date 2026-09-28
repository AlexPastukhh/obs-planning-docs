<a id="lens-application-boundary-feasibility"></a>
# LENS-APPLICATION-BOUNDARY-FEASIBILITY — Application Definition / Justification / Feasibility

Lens ID: `LENS-APPLICATION-BOUNDARY-FEASIBILITY`

> Semantic Owner Dependencies
> - Type: `EXTENDS`; Responsibility: `LENS.META-MODEL`; Owner: [Lens Meta-Model](../../../../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model)
> - Type: `CONTEXTUALIZES`; Responsibility: `TM-APPLICATION-DEFINITION`; Owner: [Application Definition](../../target-modules/TM-APPLICATION-DEFINITION.md#tm-application-definition)

## Purpose

Evaluate whether the Application proposition is coherent and sufficiently grounded:

- what the Application is and how it roughly works;
- whether existing/manual/external alternatives already satisfy the need sufficiently;
- why an own Application is warranted;
- which key Application behavior/contribution carries the central justification/value focus;
- whether the proposition is realistically realizable;
- which application-level implementation concerns or early planning are already important enough to constrain downstream work.

The Lens does not create Application Benefits, Feature boundaries, Scenario journeys or detailed architecture.

## Analysis Surface

This Lens evaluates Application-level meaning owned by `TM-APPLICATION-DEFINITION`:

- `RU-APP-05` Application Concept;
- `RU-APP-02` Existing-Solution / Reference Position;
- `RU-APP-08` Own-Application Justification / Key Behavior Focus;
- `RU-APP-07` Realization Feasibility / Early Implementation Planning.

Scenario/Feature/Screen/Domain/Slice/current-implementation material is supporting Evidence when it can materially revalidate that Application proposition. Downstream natural-owner meaning remains downstream authority.

## Applicability & Temporal Triggers

### Base Applicability / Usefulness

Apply when Application Concept, alternative sufficiency, own-Application justification, Key Behavior Focus, feasibility or application-level realization pressure is being created, changed, challenged or materially relied upon downstream.

### Opening Triggers

The Unit begins with one or more of:

```text
Need / real-world problem
candidate/current Application Concept
existing/manual/external alternatives
candidate/current own-Application justification
candidate/current Key Behavior Focus
feasibility assumptions / early realization concerns
downstream contradiction Evidence
```

### During-work Recheck / Invalidation Triggers

Recheck when alternative/reference Evidence, Scenario evidence, current implementation, platform/integration constraints or downstream realization findings materially change the basis of the Application proposition.

### Closing Triggers / Revalidation Conditions

The result establishes or materially changes Concept, alternative position, own-Application justification, Key Behavior Focus, feasibility or early application-level implementation planning; or downstream work now depends on that meaning.

### Confident-False / Stop Conditions

Do not apply when the concern is purely local downstream realization and cannot materially change the Application proposition/focus/feasibility.

### False-negative Risks

Downstream evidence may show that:

- an external/existing solution now suffices;
- the supposed differentiating behavior is not actually valuable or necessary;
- implementation burden makes the selected Application proposition pathological;
- a downstream Scenario reveals that the key behavior focus is misframed.

Trigger semantics follow the canonical Lens Model:

```text
TRUE      → APPLY
FALSE     → NOT_APPLICABLE
UNCERTAIN → APPLY
```

A Unit-level `REQUIRED [phase]` attachment bypasses the apply/skip decision at that phase and requires this Lens to cover the current Analysis Surface.

## Inputs / Evidence

```text
Fundamental Need / wanted outcome
current real-world workflow
manual/existing/external alternatives
market/reference research
Prototype / Practical Test Evidence
current application/workspace Evidence
Scenario path/result/SR Evidence
Feature/Screen/Domain/Slice/Shared/Exact realization Evidence
platform/integration/persistence/consistency/performance/operational constraints
```

## Evaluation Contract

Apply only the dimensions material to the current question. The questions/checks below are evaluation guidance, not a mandatory global checklist.

## Supported Operations

```text
ANALYZE
CHECK
REFINE
CHALLENGE
```

- `ANALYZE` inspects the current Application proposition through this Lens.
- `CHECK` evaluates current meaning against the criteria/guards below.
- `REFINE` surfaces candidate clarification where the semantic destination is already understood.
- `CHALLENGE` surfaces reasons selected/accepted meaning may be weak, stale, unsupported or wrong.

`REOPEN`, State-Unit creation/refinement, cross-owner handoff and Result Unit update after resolution are Core Finding-Disposition/lifecycle consequences, not Lens methods.

## Existing-Solution Sufficiency / Reference Position

```text
Does an existing/manual/external solution satisfy the Need well enough?
Should we use/buy/adapt/integrate/hybrid instead?
What research depth is proportional?
Which direct alternatives/substitutes/adjacent references matter?
What should be borrowed or avoided?
```

Reference products are Evidence/Proposal sources, not authority.

Deep guide: [`RU-APP-02 Existing-Solution / Reference Position guidance`](../../target-module-support/application-definition/RU-APP-02-EXISTING-SOLUTION-REFERENCE-POSITION.unit-guidance.md).

## Application Concept Sufficiency

Is the Application Concept a short, immediately understandable summary of:

- what the Application is;
- why it exists at a high level;
- briefly how it roughly works?

Do not require Feature decomposition, detailed Scenario paths or architecture merely to satisfy Concept sufficiency.

## Own-Application Justification / Key Behavior Focus

Check proportionally:

```text
Why is an own Application warranted rather than the best existing/manual/external route?
What material gap remains after alternatives are considered?
Which Application behavior/contribution carries the central value/justification?
Would losing that behavior materially weaken the reason for this Application to exist?
Is the focus stated at Application level rather than as premature Feature decomposition?
If several key behaviors are independently useful to reference, are KBF-* identities helpful rather than ceremonial?
```

`KBF-*` is optional Application-local addressability, not a Requirement family and not a Feature identity.

## Responsibility / Scope Boundary

For the selected Application proposition, distinguish:

```text
what the Application must contribute
what remains actor/manual/external-system responsibility
what information is merely consumed/displayed/forwarded/derived
what is explicitly outside the Application proposition
```

Do not create a second generic Responsibility Boundary Unit solely to restate `RU-APP-08` / `RU-APP-07` meaning.

## Realization Feasibility / Early Implementation Planning

Use proportional technical Evidence to ask whether the Application proposition is realistically supportable and what downstream planning already needs to know:

```text
representative runtime feasibility
persistence / integration constraints
consistency / synchronization / transaction pressure
performance / data-volume / algorithm pressure
security / operability / maintenance burden
platform limitations
rough ownership/cost
material early realization mechanisms/constraints that can shape downstream planning
```

`RU-APP-07` may retain early application-level implementation planning when it materially helps later Scenario/Feature/Screen/Domain/Slice work. This is allowed even before exact downstream ownership is resolved.

Boundary:

```text
application-level realization pressure / feasibility planning
→ Application Definition / RU-APP-07

Scenario path or Scenario must-hold
→ TM-SCENARIO-PLANNING

resolved Feature behavior / BR
→ TM-FEATURE

Screen spatial/navigation obligation
→ TM-SCREEN

durable Domain/Slice/Shared implementation responsibility
→ corresponding owner

literal class/file/config/call sequence
→ Exact / Code Realization / transient exact planning
```

Do not freeze exact implementation topology merely because early planning is useful.

## Scenario Revalidation Relation

Scenario is neither prerequisite nor subordinate evidence only.

```text
Application Definition meaning
→ may seed Scenario planning

Scenario path/result/SR Evidence
→ may challenge/refine Application Concept, own-Application justification,
   Key Behavior Focus or feasibility/early implementation planning
```

The Lens checks that feedback loop without moving Scenario authority into Application Definition.

## Responsibility Creep

Detect responsibilities added because technically convenient rather than required by the selected Application proposition/key behavior focus.

## Alternative Sufficiency

Keep viable alternatives alive until Evidence makes them inferior for the selected Need/proposition.

## Typical Findings

```text
build/buy/adapt/integrate/hybrid finding
reference/market Evidence
concept sufficiency finding
own-Application justification weakness
Key Behavior Focus ambiguity / overbreadth / missing focus
application responsibility/scope creep
feasibility finding
early realization-pressure finding
Scenario/downstream contradiction signal
Q/R/P / revalidation signal
```

## Findings / Outcomes

Valid invocation outcomes are:

```text
APPLIED — no material finding
APPLIED — one or more material Finding Candidates
NOT_APPLICABLE — short confident-FALSE reason when application is not forced at this checkpoint
```

A Finding Candidate does not directly mutate authoritative Result/State meaning; normal Core Finding Disposition resolves lifecycle/owner consequences.

## Finding Contract

A material finding may expose proportionally:

```text
Meaning
Affected Unit(s) / fields — when known
Evidence / rationale
Materiality hint — optional
Likely semantic owner — optional hint
Suggested lifecycle consequence — optional hint
```

Core [`Finding Disposition`](../../../../idtspe-core/resolution/findings/FINDING-DISPOSITION.md) resolves the actual State/lifecycle/owner destination.

This Lens does not define new Result Units or target-result fields. If repeated findings reveal missing target-result meaning, revise the appropriate Target Module/Local Target Contract or let Core disposition the finding to another owner.

## Non-Normative Navigation — Typical Surfaces

Application Definition; material findings may revalidate Scenario/Feature/Screen/Domain/Slice or be informed by them.

## Artifact / File Implications

`NONE_DIRECT / NO_DISTINCT_SUPPORTING_ARTIFACT`.

This Lens evaluates Application proposition/feasibility but does not independently prescribe Application Definition representation. `TM-APPLICATION-DEFINITION` owns current Application/result representation. Independent Evidence remains Evidence and may use separate supporting artifacts when materially useful.

## Guards / Boundaries

```text
competitor feature ≠ our Requirement
KBF-* ≠ Feature
KBF-* ≠ Requirement family
Application Definition ≠ Scenario journey body
Application early implementation planning ≠ detailed architecture/exact topology authority
feasibility finding ≠ automatic downstream owner mutation
```

## Finding / Lifecycle Boundary

Temporal revalidation timing is owned by `Applicability & Temporal Triggers` above. Independent feasibility/architecture choice spaces surface Finding Candidates; Core Finding Disposition may surface a Target Formation candidate, and Target Formation decides whether a bounded downstream Target is warranted.

## High-Level Example — Self-Contained Walkthrough

### Situation

A team wants a methodology workspace that keeps ordinary Markdown readable but also needs synchronized, structurally checked dependency projections during active work.

### Walkthrough

Compare:

```text
plain Markdown + Git only
generic config/schema tools
manual generated maps
custom methodology-specific integration layer
hybrid existing structured tool + thin application integration
```

Suppose generic tools can validate data but do not provide the selected active-work behavior: after canonical methodology meaning changes, all materially affected projections must be brought to a truthful current state or report failure before dependent work trusts them.

The Lens checks whether this is strong enough to justify an own Application and whether the Key Behavior Focus is stated at the right level:

```text
KBF-MW-01
Synchronize materially affected methodology projections from canonical meaning
and expose truthful current/failure state during active local work.
```

It then tests feasibility and may retain early planning pressure such as:

```text
stable semantic identity
change detection / explicit synchronization entry
reverse dependency discovery
coherent source basis
projection derivation / publication
truthful synchronization status
```

Those items guide downstream planning but do not yet define Feature/Slice/Domain topology.

### Boundary / Lesson

The Lens does not design final Scenario paths, Features, Screens or implementation classes. Existing products provide Evidence/Proposal pressure, not product authority.

## Knowledge Basis

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- Compare build/use/adapt/buy/integrate routes against the real Need before accepting own-Application responsibility.
- The own Application should have a material key contribution that remains valuable after alternatives are considered.
- Feasibility and early implementation Evidence may constrain Application focus without stealing downstream natural-owner authority.

**Referenced Knowledge Owners:**

- `NONE`

**Reference Load Policy:**

No external knowledge body is required for normal use.

## Provenance

Evolved from the earlier Application Definition / Benefit-boundary Lens after Application Benefits and the dedicated Benefit→Scenario coverage Unit were retired from `TM-APPLICATION-DEFINITION`.

## Upstream Application Definition Rule

Evaluate `RU-APP-05`, `RU-APP-02`, `RU-APP-08` and `RU-APP-07` proportionally. Application Definition may seed downstream planning and may also be revalidated by Scenario/downstream Evidence; not-yet-implemented downstream meaning does not become a Target Application Body.
