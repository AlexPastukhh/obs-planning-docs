<a id="tm-application-definition"></a>
# TM-APPLICATION-DEFINITION — Application Definition

Module ID: `TM-APPLICATION-DEFINITION`

Entry Point: `tm.application.definition`  
Role: upstream own-application definition Target Module  

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `TARGET-MODULE.META-MODEL`
> Owner: [Target Module Meta-Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model)

## Purpose

Define one coherent own-Application proposition at the level needed before or alongside Scenario planning:

```text
what the Application is and how it roughly works
+ what existing/manual/external solutions already cover
+ why an own Application is warranted
+ which Application behavior/contribution is the key value/focus that justifies it
+ whether that proposition is realizable
+ what material early implementation planning downstream work should already account for
```

Application Definition does **not** own detailed real-life journeys, Feature behavior, Screen composition, Domain semantics, Slice topology or exact implementation mechanisms.

Application Benefits are retired as a separate upstream semantic layer. The Application Definition instead owns the smaller question: **why build/keep an own Application, what key Application behavior makes it worth doing, and what is already known about realizing it?**

## Temporal Authority / Evolution-Step Hosting

Application Definition is upstream product/application intent and may describe selected intent before downstream Scenario/Feature/Screen realization exists.

```text
Application Definition selected intent
≠ downstream capability already realized
```

When Application concept, own-Application justification, key behavior focus or application-level feasibility/early realization planning changes, refine this owner directly. Do not create a Target Application Body or current-owner reverse Evolution Impact for Application Definition.

Evolution Steps and downstream owners may reference Application Definition meaning as a driver/source. Their future/current authority remains governed by their own temporal contracts.

## Activation / Scope Gate

Use when any of these questions is material:

- what Application are we actually proposing/building/maintaining?;
- can an existing/manual/external solution satisfy the need sufficiently?;
- why is an own Application necessary or still justified?;
- which Application behavior/contribution is the central differentiator/value focus?;
- can that behavior be realized plausibly?;
- which material application-level realization concerns or early implementation planning should constrain downstream Scenario/Feature/Screen/Domain/Slice work?

Do not use this module to enumerate Features or Scenarios merely for completeness.

## Source Contract

Typical sources, selected proportionally:

- Fundamental Need / Desired Outcome / current real-world problem;
- current workflow and actor/external-system responsibilities;
- selected own-software contribution / trusted explicit Application intent;
- existing/manual/external alternatives and reference products;
- current Application/workspace Evidence when revalidating an existing Application;
- Scenario outcome/path evidence when Scenario planning starts first or reveals sharper Application value;
- Prototype / Practical Test Evidence;
- known platform/integration/persistence/consistency/performance/operational constraints;
- accepted architecture or implementation Decisions when reviewing an existing Application;
- downstream Feature/Screen/Domain/Slice/Shared/Exact evidence when it materially revalidates the Application proposition.

Scenario is **not** a mandatory prerequisite. Application Definition may seed Scenario planning, and concrete Scenario evidence may later refine Application Definition.

## Production Method

The Units are co-formable; this is not a waterfall.

```text
Need / real-world problem / trusted Application intent
→ sketch/refine concise Application Concept
→ inspect existing/manual/external solutions proportionally
→ decide whether an own Application is warranted
→ identify the key Application behavior/contribution that makes it justified and valuable
→ explore feasibility + material early implementation planning needed to make that claim credible
↺ refine Concept / justification / key behavior when Evidence changes them
→ hand key behavior/value pressure into Scenario planning
→ hand application-level realization pressure into downstream planning without pre-owning downstream semantics
```

A Scenario may also be formed directly from Need/real-life evidence and then provide Evidence back to the Application Definition. Scenario-first discovery and Application-definition-first discovery are both valid.

## Unit Definition Conformance

This module specializes the Core [Target Module Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md) and [Unit / Target Step Result Model](../../../idtspe-core/runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md). Generic Unit lifecycle/disposition remains Core-owned; this module owns only its reusable Application-family Unit responsibilities, result contracts, local validators and handoffs.

## Target Step-Result Contract

**Target Step Result:** `Application Definition`

Complete Module-defined Unit inventory:

| Result Unit | Meaning |
|---|---|
| `RU-APP-05` | Application Concept — concise statement of what the Application is, why it exists at a high level, and how it roughly works |
| `RU-APP-02` | Existing-Solution / Reference Position — evidence-backed build/buy/adapt/integrate/manual/reference position |
| `RU-APP-08` | Own-Application Justification / Key Behavior Focus — why an own Application is warranted and which key Application behavior/contribution makes it justified and valuable |
| `RU-APP-07` | Realization Feasibility / Early Implementation Planning — feasibility plus material application-level realization concerns/planning that downstream owners should account for |

Retired:

```text
RU-APP-03 — Application Benefits
RU-APP-04 — Scenario / Evolution Coverage
```

They are not repurposed. The semantic change is explicit rather than hidden behind old Unit IDs.

`RU-APP-01` remains retired as in the current methodology. `RU-APP-06` remains unused as a standalone Unit.

### Result Unit Applicability / Materiality

| Result Unit | Substantive resolution is material when | Otherwise |
|---|---|---|
| `RU-APP-05` | always once an Application Definition Target is formed | keep `OPEN` when the concept is not sufficiently resolved; do not invent detail |
| `RU-APP-02` | alternative/reference position can change whether an own Application is warranted, its key behavior focus or feasibility | `OMITTED` when trusted alternative context is already sufficient and comparison adds no material value |
| `RU-APP-08` | always once an Application Definition Target is formed; the module must explain why this own Application is warranted and what behavior/contribution is central to that claim | keep `OPEN` when justification/key behavior is not sufficiently established; do not invent differentiators |
| `RU-APP-07` | feasibility or early application-level realization planning can materially change Concept, own-Application justification, key behavior focus or downstream planning pressure | `OMITTED` when realization is routine/trusted and no application-level planning pressure adds value |

---

<a id="application-concept"></a>
## RU-APP-05 — Application Concept

### Responsibility

Own the concise whole-Application explanation.

### Purpose

Make it immediately understandable what is being built/maintained and how it roughly works without turning the definition into Feature, Scenario or architecture detail.

### Result Content Contract

```text
Summary:
<what this Application is + why it exists at a high level>

How it roughly works:
<small conceptual explanation of the basic working idea>
```

Keep it short. Do not enumerate detailed behavior or implementation topology here. The Concept may state the high-level why, but the evidence-backed conclusion that an own Application is warranted and the behavior that carries that justification/value belongs to `RU-APP-08`.

---

<a id="existing-solutions--market--reference-research"></a>
## RU-APP-02 — Existing-Solution / Reference Position

### Responsibility

Own the proportionate evidence-backed position on existing/manual/external alternatives and build/buy/adapt/integrate/hybrid options.

### Purpose

Avoid justifying custom software in a vacuum and provide the evidence base for `RU-APP-08`.

### Result Content Contract

Capture only what can materially change the Application proposition, for example:

```text
relevant alternatives / references
what they already satisfy
material gaps / tradeoffs
build | buy | adapt | integrate | hybrid | manual position
Evidence / uncertainty where material
```

Reference products and competitor behavior are Evidence/Proposal material, not automatic Requirements for our Application. `RU-APP-02` owns the comparison/evidence position; `RU-APP-08` owns the selected own-Application justification and key behavior focus derived from that basis.

---

<a id="own-application-justification-key-behavior-focus"></a>
## RU-APP-08 — Own-Application Justification / Key Behavior Focus

### Responsibility

Own the reason an own Application is warranted and the key Application behavior/contribution that makes the Application justified and valuable enough to focus downstream planning on.

### Purpose

Replace the broad Benefit catalog with one tighter upstream contract: establish what our own Application must uniquely/critically contribute beyond available alternatives, and identify the behavior/contribution whose successful realization carries the central value proposition.

### Result Content Contract

Required meaning:

```text
Own-Application Justification:
<why existing/manual/external alternatives do not satisfy the selected need sufficiently
 and why an own Application contribution is warranted>

Key Behavior Focus:
<the Application behavior/contribution that is central to that justification/value>
```

When several independently useful key behavior focuses genuinely exist, they may be represented as a small addressable collection. Stable `KBF-*` identity is optional and used only when downstream reference/revalidation value justifies it.

If addressable items are used:

```text
KBF-* — <short name>
Plain key Application behavior/contribution
Why key / differentiating / value-critical
QRPE / Examples when materially useful
```

Rules:

- `KBF-*` is **not** a Feature identity and does not pre-partition Feature boundaries;
- Key Behavior Focus may later be realized through one or several Scenarios/Features/Screens;
- a Scenario may also reveal that the current justification/focus is wrong or incomplete;
- do not claim uniqueness merely because no alternative was researched;
- the key behavior may be valuable because existing solutions cannot provide it sufficiently, because it is the main reason for custom software, because it is the central selected product focus, or a combination of these;
- surrounding secondary behavior may still exist downstream without being elevated to Key Behavior Focus.

### Downstream relation

```text
RU-APP-08 key behavior/value pressure
→ Scenario planning Source
→ concrete SPS-* / SR-* journey meaning
→ Feature / Screen realization through their own owners
```

Application Definition does not own the downstream Scenario path merely because the Scenario was motivated by this Unit.

---

<a id="realization-feasibility"></a>
## RU-APP-07 — Realization Feasibility / Early Implementation Planning

### Responsibility

Own material application-level feasibility conclusions, realization concerns and early implementation planning that are already useful for judging/refining the Application proposition or guiding downstream planning.

### Purpose

Make the Application definition technically credible enough for downstream work without forcing premature Feature/Domain/Slice/Exact ownership.

### Result Content Contract

May contain proportionally:

```text
Feasibility conclusion / material uncertainty
Material application-level realization constraints
Early implementation/realization planning
Likely technical capabilities or boundaries that downstream planning should account for
Integration / persistence / consistency / synchronization / performance / security / operability pressure
Proof/observability pressure when it can materially change feasibility or downstream planning
OPEN concerns / assumptions / evidence needed
```

This Unit **may contain planning in advance**. For example it may state that the key behavior probably requires active local change observation, stable entity identity, dependency indexing, a coherent synchronization basis and inspectable synchronization status when those facts are material to feasibility or downstream planning.

That does not make this Unit the durable owner of later Feature/Screen/Domain/Slice semantics.

```text
application-level feasibility / early planning meaning
→ may remain RU-APP-07

a durable downstream behavioral/spatial/domain/slice/shared responsibility becomes clear
→ hand off / refine in the natural downstream owner
→ do not retain copied equal authority here

literal class / method / file / schema / exact call sequence
→ downstream discovery / Exact realization unless unusually necessary to establish feasibility Evidence
```

Early planning may be challenged, specialized or replaced downstream. The Application Definition retains only application-level meaning that remains useful to its proposition/revalidation.

## Unit Resolution Guidance / Knowledge Basis

Use proportional questions only:

```text
RU-APP-05 Application Concept
  What is this Application?
  Why does it exist at a high level?
  How does it roughly work?

RU-APP-02 Existing-Solution / Reference Position
  Which existing/manual/external solutions materially compete with the proposed contribution?
  Which parts do they already solve well enough?
  Why build/buy/adapt/integrate/hybrid?

RU-APP-08 Own-Application Justification / Key Behavior Focus
  Why is an own Application warranted after considering alternatives?
  What Application behavior/contribution carries the central justification/value?
  What would make the custom Application no longer worth building/keeping?

RU-APP-07 Realization Feasibility / Early Implementation Planning
  Can the concept/key behavior be realized without pathological cost/complexity/risk?
  What implementation facts are already important enough to constrain the proposition?
  What early planning should downstream Scenario/Feature/Screen/Domain/Slice work consume?
```

Primary reusable evaluation remains `LENS-APPLICATION-BOUNDARY-FEASIBILITY`; use implementation/evolution/proof lenses only when material.

## Explicit Unit Checkpoint Placement

Each material Unit inherits the Core Unit Applicability Envelope.

For `RU-APP-05`, `RU-APP-02`, `RU-APP-08`, and `RU-APP-07`:

1. **Opening Unit Checkpoint** — bind applicable Sources/Lenses and resolve current materiality.
2. **Unit Work** — resolve only the Unit's bounded responsibility; route cross-owner meaning instead of copying it.
3. **Closing Unit Checkpoint** — validate the actual result, disposition material Findings, and reopen affected Application Units when needed.

Recommended lens pressure:

```text
RU-APP-05
  REQUIRED [CLOSING]: LENS-APPLICATION-BOUNDARY-FEASIBILITY
  TRIGGERED: LENS-TERMS-UBIQUITOUS-LANGUAGE

RU-APP-02
  REQUIRED [CLOSING]: LENS-APPLICATION-BOUNDARY-FEASIBILITY
  TRIGGERED: LENS-DEPENDENCY-CHANGE-IMPACT when integration/reference dependencies matter

RU-APP-08
  REQUIRED [CLOSING]: LENS-APPLICATION-BOUNDARY-FEASIBILITY
  TRIGGERED: LENS-QUALITY-RISK-MATERIALITY, LENS-TERMS-UBIQUITOUS-LANGUAGE

RU-APP-07
  REQUIRED [CLOSING]: LENS-APPLICATION-BOUNDARY-FEASIBILITY
  TRIGGERED: LENS-WORKSPACE-EVOLUTION-ARCHITECTURE,
             LENS-DEPENDENCY-CHANGE-IMPACT,
             LENS-QUALITY-RISK-MATERIALITY,
             LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY,
             LENS-PRACTICAL-EVIDENCE
```

## Artifact / File Contract

An accepted Application Definition used downstream should normally have one canonical persistent representation when persistence is material.

```text
ARTIFACT_PROPOSAL
ID: AP-APP-01
CONTENT_KIND: APPLICATION_DEFINITION
GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: TM-APPLICATION-DEFINITION / Application Definition owner
CONTENT:
  Application Concept
  Existing-Solution / Reference Position when material
  Own-Application Justification / Key Behavior Focus
  Realization Feasibility / Early Implementation Planning when material
```

Substantial/volatile reference research may remain a supporting Evidence artifact. Substantial feasibility experiments/prototypes may remain Evidence artifacts. They do not become second Application-definition semantic owners.

Do not create separate artifacts for each `KBF-*` by default.

## Validators

```text
Application Concept is concise and understandable
obvious material existing/manual/external alternatives were proportionally checked
own-Application justification is explicit and evidence-aware
Key Behavior Focus states the behavior/contribution that carries the central justification/value
Key Behavior Focus is not silently treated as a Feature boundary
Scenario is not required to exist before Application Definition, and Application Definition is not required to be complete before Scenario discovery can begin
Scenario evidence may revalidate/refine Application justification and key behavior focus
RU-APP-07 may contain useful early implementation planning rather than only a feasibility verdict
RU-APP-07 does not silently become Feature/Screen/Domain/Slice/Exact authority
material early realization pressure is handed downstream rather than lost
no Application Benefits catalog is required
no Benefit→Scenario coverage Unit remains
reference products seed Evidence/Proposals rather than copied Requirements
```

## Guards

```text
Application Concept ≠ Feature decomposition
Key Behavior Focus ≠ Feature
Key Behavior Focus ≠ Scenario
KBF-* ≠ new universal Requirement family
Early Implementation Planning ≠ exact implementation authority
Application Definition ≠ downstream current-state owner
```

## Handoff

Primary downstream/reflexive relations:

```text
RU-APP-08 key behavior/value pressure
→ TM-SCENARIO-PLANNING

Scenario outcome/path/SR Evidence
→ may revalidate RU-APP-05 / RU-APP-08 / RU-APP-07

RU-APP-07 early realization pressure
→ TM-SCENARIO-PLANNING when journey shape/constraints are affected
→ TM-FEATURE when behavior realization is affected
→ TM-SCREEN when spatial/navigation realization is affected
→ Domain / Slice / Shared discovery when durable implementation ownership becomes material
→ Prototype / Practical Test / Exact when Evidence or literal realization is needed
```

Downstream owners consume Application Definition as Source; they do not copy its authority.

## Representation / Compatibility Notes

Benefit-first downstream routing is retired. Historical `AB-*`, `BC-*`, `RU-APP-03` and `RU-APP-04` material may remain in dated evidence/examples. Pre-migration accepted application artifacts may also remain recoverable as legacy source/context until explicitly migrated; new or materially revised Application Definitions use the four-Unit contract above, and legacy AB/BC identities do not become a revived live methodology family.

Compatibility anchors may remain only where needed for navigation during migration; they must not preserve Benefit semantics as hidden live authority. Scenario/Evolution references may still appear as ordinary navigation/handoff where useful; they no longer require a dedicated `RU-APP-04` coverage Unit.
