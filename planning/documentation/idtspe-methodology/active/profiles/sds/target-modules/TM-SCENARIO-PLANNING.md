<a id="tm-scenario-planning"></a>
# TM-SCENARIO-PLANNING — Scenario Journey / Requirement Owner

Module ID: `TM-SCENARIO-PLANNING`

Entry Point: `tm.scenario`  
Role: real-life Scenario Target Module  

> Semantic Owner Dependencies
> - Type: `EXTENDS`; Responsibility: `TARGET-MODULE.META-MODEL`; Owner: [Target Module Meta-Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md#target-module-meta-model)
> - Type: `CONTEXTUALIZES`; Responsibility: `SDS.REQUIREMENT-OWNERSHIP`; Owner: [Requirement Ownership / Natural Owner](../profile-contracts/requirements/REQUIREMENT-OWNERSHIP-AND-NATURAL-OWNER.md#sds-requirement-ownership)
> - Type: `CONTEXTUALIZES`; Responsibility: `SDS.SEMANTIC-COMPOSITION-READINESS`; Owner: [SDS Semantic Composition / Readiness](../profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md#sds-semantic-composition-readiness)

## Purpose

Own one coherent real-life Scenario describing how actors, external systems/surfaces and the Application participate in reaching a meaningful real-world result.

Scenario may be formed before Application Definition, Features or application Screens are fully resolved. It may start directly from Need / real-life evidence, or consume Application Concept / Key Behavior Focus when those already exist.

It owns the selected real-life path, Scenario-natural must-holds, Application Contributions, and Scenario-facing Screen/surface participation. Once Feature ownership is resolved, Feature owns detailed canonical application behavior; once an application Screen owner is resolved, `TM-SCREEN` owns its spatial/navigation composition.

A Scenario may validly contain:

```text
zero resolved Features
zero application-owned Screens
one or many external surfaces
zero independently addressable SR-* Requirements
```

when the Scenario path itself is still meaningful and complete enough for the current planning purpose.

## Temporal Authority / Evolution-Step Hosting

A current Scenario owner describes realized/current Scenario meaning.

A planned/unrealized Scenario uses this same Target Module contract inside `TM-EVOLUTION-STEP` as a **Target Scenario Body**.

```text
Target Scenario Body selected
≠ current Scenario owner updated

Step realized + required proof/revalidation
→ Target Owner Materialization
→ current Scenario reflects the realized Scenario body
```

Feature Resolution may start `OPEN`. Resolving Feature ownership later matures the same Scenario identity; it does not require a second Scenario type.

## Activation / Scope Gate

Use when one coherent real-life path is independently useful for understanding what must happen across actor/external/Application participation.

Typical signals:

- a USER/Source describes a real-world outcome or workflow;
- the Application boundary must be discovered from concrete use;
- several actor/external/Application steps compose one meaningful outcome;
- Application Contributions exist before Feature ownership is clear;
- cross-step Scenario must-holds need stable identity;
- screens/surfaces materially affect the real-life path.

Do not create a Scenario merely because one Feature has several internal behavior steps, one endpoint exists, one implementation workflow exists, or one Screen exists.

## Owned Meaning

A Scenario may own proportionally:

- Scenario intent / meaningful real-world result;
- participating actor(s), external systems and external surfaces;
- `SPS-*` Scenario Path Steps;
- Application Contributions with Feature Resolution `OPEN | RESOLVED(ref)`;
- step ordering, branch, convergence, optional path and re-entry;
- data/result/context continuity between SPS steps;
- step-attached `SR-*` Scenario Requirements;
- Scenario-wide `SR-*` Scenario Requirements;
- direct SPS → Screen / Surface mapping;
- material path examples, inline when compact or in an optional post-table Path Examples collection when long/multiple/reused;
- optional E2E proof intent when whole-Scenario proof has independent value;
- current-owner Evolution Impact and journey-wide realization concerns through their preserved Units when applicable.

Scenario does not own:

- detailed resolved Feature behavior / Feature semantic data / `BR-*`;
- application Screen zones/layout/navigation internals;
- external UI behavior such as GitHub or IDE behavior;
- Domain semantics;
- Slice topology;
- exact synchronization/transport/implementation mechanism.

## Source Contract

Typical sources, selected proportionally:

- USER Need / wanted outcome;
- current real-world workflow;
- actor actions and surrounding responsibilities;
- external systems/tools/surfaces;
- current implementation / Evidence;
- Prototype / Practical Test findings;
- Application Definition Concept / Own-Application Justification / Key Behavior Focus (`KBF-*` when addressable) when already available;
- resolved Features/results when already available;
- resolved application Screens when already available;
- relevant Evolution Step;
- accepted Proposal/Decision material.

Application Definition is not a prerequisite for Scenario formation. Scenario path/result/SR evidence may later drive or refine Application Concept, Own-Application Justification, Key Behavior Focus or application-level feasibility/early implementation planning.

## Production Method

```text
identify one meaningful real-world result
→ identify actor / external / Application participants
→ establish the selected Scenario path as SPS-* steps
→ identify Application Contributions; keep Feature Resolution OPEN when needed
→ capture order / branch / convergence / re-entry / continuity
→ form independently useful step-attached SR-* must-holds
→ form independently useful Scenario-wide SR-* must-holds
→ identify the Screen / Surface for each SPS when material
→ retain any worthwhile path examples; keep compact examples inline and externalize long/multiple/reused examples into the RU-SCEN-01 Path Examples collection
→ resolve Features when coherent boundaries become clear; reference Feature/result and stop copying detailed behavior
→ resolve application Screen owners when spatial/navigation composition has independent value
↺ revalidate Scenario path/Requirements when downstream evidence contradicts them
```

This is not a mandatory waterfall. Discovering a Requirement, surface or Feature boundary may reopen the Scenario path.

## Unit Definition Conformance

This module specializes the Core [Target Module Model](../../../idtspe-core/target-modules/TARGET-MODULE-MODEL.md) and the Core Unit / Target Step Result contracts. Generic Unit lifecycle/disposition remains Core-owned; this module owns only the complete Scenario-family Unit inventory, local production rules, validators, composition boundaries and handoffs.

## Target Step Result Contract

**Target Step Result:** `Scenario Journey Composition`

Complete Module-defined Unit inventory:

| Result Unit | Meaning |
|---|---|
| `RU-SCEN-01` | Scenario Path — SPS path, participants, Application Contributions, OPEN/resolved Feature refs, ordering/branch/re-entry, continuity and optional addressable path examples |
| `RU-SCEN-04` | Scenario Requirements — step-attached and Scenario-wide Scenario-owned `SR-*` must-holds |
| `RU-SCEN-02` | Evolution Impact — preserved current-owner reverse navigation/revalidation under the shared projection contract |
| `RU-SCEN-03` | Journey Realization Concerns — preserved Scenario-wide realization/proof/integration pressure without exact mechanism ownership |

New Unit IDs are used for new responsibilities. Existing `RU-SCEN-02` / `RU-SCEN-03` are not repurposed.

## Result Unit Applicability / Materiality

| Result Unit | Substantive resolution is material when | Otherwise |
|---|---|---|
| `RU-SCEN-01` | always once a Scenario Target is formed; the path/result/boundary is the core responsibility | keep `OPEN` when path meaning is not sufficiently resolved; do not invent steps |
| `RU-SCEN-04` | one or more Scenario-natural must-holds need stable independent addressability | `OMITTED` when selected SPS/path meaning is sufficient and no separate SR identity adds value |
| `RU-SCEN-02` | for a current realized Scenario, a concrete unrealized Step materially affects current Scenario meaning | preserve current shared Evolution Impact rules; `OMITTED` in a future Target Scenario Body |
| `RU-SCEN-03` | a journey-wide realization/proof/integration concern has Scenario as its smallest natural subject | `OMITTED` when all material realization concerns belong to Feature/Screen/Domain/Slice/Shared/Exact owners |

Zero `SR-*` requirements is valid. Zero application-owned Screens is valid. External surfaces alone do not make `TM-SCREEN` applicable.

---

<a id="ru-scen-01--scenario-path"></a>
## RU-SCEN-01 — Scenario Path

### Responsibility

Own the selected real-life path and its stable step identities.

### Purpose

Make the desired real-life journey directly addressable for downstream realization without forcing every normative Scenario step to become a separate Requirement.

```text
SPS-* = selected Scenario path step / action / interaction
```

A selected `SPS-*` is itself normative Scenario result content and may be a direct downstream realization obligation. It does **not** need an `SR-*` identity merely to be implemented/realized.

An SPS may represent:

- actor action;
- external-system interaction;
- external-surface interaction;
- Application interaction / Application Contribution;
- result handoff;
- branch / convergence / re-entry step.

Like an `FBS-*`, an `SPS-*` does not need a Requirement merely to be selected Scenario meaning.

### Result Content Contract / Collections

`RU-SCEN-01` owns two repeated result-contract families inside the same Unit:

```text
COL-SCEN-PATH-STEPS
  Item Key / Subject: SPS-*
  Item Contract: the exact Scenario Path row below

COL-SCEN-PATH-EXAMPLES
  Item Key / Subject: EX-*
  Item Contract: Path Example | Kind | Applies To | Example
  Cardinality: 0..N
```

These are Collections inside `RU-SCEN-01`, not peer Units. `COL-SCEN-PATH-EXAMPLES` is also **not a formal Unit Resolution Slot** by default: examples do not need independent resolution state merely because they are numerous or represented after the path table. Promote/form a formal Slot only if a future contract gives examples an independently tracked terminal resolution responsibility under the Core Slot criteria.

### Exact path representation

```text
Scenario Path Step
| Required action / interaction
| Participant
| Screen / Surface
| Application Contribution / Feature
| Data / result / continuity
| Attached Scenario Requirements
| Related Application expected errors
| QRPE / Examples
```

`Attached Scenario Requirements` contains stable ID **and short name**, not opaque IDs alone.

`Screen / Surface` identifies where the step is experienced/performed when a journey-significant surface exists. It may name an application-owned Screen, an unresolved application surface, or an external surface such as GitHub, an IDE/editor, browser or terminal. Use `—` for background/non-surface steps.

### `QRPE / Examples` usage

Every `QRPE / Examples` column in this module uses the shared SDS Requirement classification/representation semantics as an adjacency surface, including when the column appears beside an SPS row rather than a Requirement row. Preserve **any worthwhile concrete example** that materially improves understanding, challenge, verification or boundary interpretation. Common labels include, but are not limited to:

```text
Q: <material open Question / ref>
R: <material Risk / ref>
P: <material Problem / ref>
E: <material Evidence / ref or concise projection>
Target Good Example: <concrete conforming case>
Problem Example: <concrete violating/misleading case>
Boundary Example: <concrete scope/ownership/boundary case>
Edge Example: <concrete edge/rare case>
Recovery Example: <concrete recovery/continuation case>
Representative Example: <concrete representative case>
```

The example labels are descriptive, not a closed enum. A useful example should not be discarded merely because it is neither a good, problem nor boundary example.

Keep a concise example inline in the SPS row when it remains readable. When examples are numerous, long, reused by several SPS rows, or materially disrupt the path table, move them to the post-table `Path Examples` collection and place `EX-* — <short name>` references in the SPS `QRPE / Examples` cell. QRPE refs and example refs may coexist in one cell.

Use `None material` when no such adjacency/example is useful. Do **not** use this column as a miscellaneous notes field for unresolved implementation choices, ordinary rationale, downstream-owner reminders or generic commentary; keep those in their natural Scenario/Requirement/Proposal fields instead.

### Path Examples collection — optional post-table representation

Render this section immediately after the Scenario Path table when one or more examples are externalized:

```text
Path Example
| Kind
| Applies To
| Example
```

`Path Example` uses stable/recoverable `EX-*` identity when referenced from one or more SPS rows. `Applies To` lists the relevant `SPS-*` identities. The collection may contain good, problem, boundary, edge, recovery, representative or other materially useful concrete examples. Do not create an `EX-*` item for a trivial one-line case that is clearer inline.

### External trigger / Application entry guidance

When an actor/external event causes Application behavior and the distinction is materially useful, prefer representing the external event and the Application trigger/entry as **separate `SPS-*` steps**.

```text
actor / external event
→ outside-Application SPS

Application receives / detects / is invoked by that event
→ Application-relevant SPS
```

This keeps downstream Feature realization precise: the Feature can realize the Application entry/behavior step without pretending to realize the actor's or external system's action. Do not split trivial events when the distinction adds no planning value.

### Expected-error invariant

`Related Application expected errors` is used only when the SPS contains Application behavior for which an expected failure/result is meaningful.

```text
APPLICATION step
→ expected Application errors may be listed

ACTOR-only / EXTERNAL-only step
→ Related Application expected errors = —
```

Do not invent Application errors for actions outside Application responsibility.

### Feature OPEN / resolved boundary

While Feature Resolution is OPEN, the SPS/Application Contribution may express the required Application outcome and bounded provisional behavior pressure needed for Feature discovery.

Once Feature ownership is resolved, detailed Feature behavior moves to `TM-FEATURE`; Scenario retains SPS meaning plus Feature/result references.

### Unit checkpoints

Opening: confirm one coherent Scenario boundary and relevant Source subset.  
Work: establish/revise only path/participants/contributions/continuity owned here.  
Closing: verify path coherence, Feature no-copy boundary, Requirement handoff to `RU-SCEN-04`, and that examples are retained at the smallest readable representation scope (inline or referenced post-table collection).

---

<a id="ru-scen-04--scenario-requirements"></a>
## RU-SCEN-04 — Scenario Requirements

### Responsibility

Own independently useful Scenario-natural must-holds.

### Purpose

Give Scenario-level must-holds durable addressability when the normative `SPS-*` path alone is not sufficient for downstream realization, proof or revalidation.

```text
SR-* = independently addressable Scenario Requirement
```

### Result Content Contract / Collection

`RU-SCEN-04` owns one Scenario Requirement collection:

```text
COL-SCEN-REQUIREMENTS
  Item Key / Subject: SR-*
  Item meaning: independently addressable Scenario-natural must-hold
  Scope: one or several SPS-* | SCENARIO_WIDE
  Cardinality: 0..N
```

Step-attached and Scenario-wide tables below are two readable projections of this same `SR-*` collection, not separate Requirement families.

The relation intentionally mirrors Feature:

```text
FBS-* = selected Feature behavior step
BR-*  = independently useful Feature must-hold

SPS-* = selected Scenario path step
SR-*  = independently useful Scenario must-hold
```

An SPS may have zero, one or several attached SRs. An SR may constrain one or several SPS steps or the Scenario as a whole.

### Step-attached Scenario Requirement representation

```text
Scenario Requirement
| Type
| Plain required Scenario meaning
| Attached Scenario Steps
| QRPE / Examples
```

### Scenario-wide Requirement representation

```text
Scenario-wide Requirement
| Type
| Plain required Scenario meaning
| QRPE / Examples
```

Scenario-wide placement does not create another Requirement family. `SR-G-*` is only a Scenario-local naming convention for readability.

### Natural-owner boundary

Scenario-natural examples include:

- cross-step continuity;
- whole-Scenario consistency/integrity;
- Scenario result observability;
- timeliness required by the real-life journey;
- authority/integrity constraints spanning several capabilities;
- actor/Application handoff constraints whose natural subject is the journey.

Feature-local behavior must-holds belong to `BR-*`. Do not copy canonical SR prose into BR merely to show coverage.

Visuality alone does not change Requirement ownership. A visual Scenario must-hold remains `SR-*` when its natural subject is the Scenario; it may be realized by a Feature when the obligation is behavioral/result-oriented. Only independently spatial/navigation meaning belongs to `TM-SCREEN`.

### Downstream realization surface

Scenario can provide three kinds of normative input to downstream Feature realization:

```text
SPS-*
→ required Scenario step/action/interaction

step-attached SR-*
→ independently addressable must-hold around one or several SPS-*

Scenario-wide SR-*
→ independently addressable must-hold spanning the Scenario
```

A Feature may realize any applicable combination of those meanings. One Feature may realize **one or several `SPS-*` steps** from the same Scenario, plus any applicable step-attached or Scenario-wide `SR-*`. One `SPS-*` may also require realization by several Features when the Scenario step materially spans several coherent Application capabilities.

Feature participation in a Scenario does **not** mean the Feature realizes every Scenario step. Actor-only and external-only `SPS-*` should normally remain Scenario context rather than appear as Feature-realized steps. They may still be referenced as `Preceding / Trigger Context` when they materially explain why/when the Feature starts, provided that the same SPS is not also listed as realized by that Feature. An outside-Application SPS may exceptionally be listed as Feature-realized when the selected step itself genuinely includes Feature-realized Application responsibility and splitting would reduce clarity; the preferred form is still to separate outside event from Application entry when that distinction is material.

Realizing an `SR-*` means the Feature materially contributes to satisfying that Scenario-owned obligation; it does not transfer SR authority to the Feature and does not imply that one Feature alone exhausts the SR when Screen/other Feature participation is also material.

### Unit checkpoints

Opening: test candidate must-holds against Scenario vs Feature/Screen/other natural owners.  
Work: create only independently useful stable SR identities.  
Closing: remove duplicates, verify step/Scenario-wide scope and downstream referenceability.

---

---

<a id="ru-scen-02--evolution-impact"></a>
## RU-SCEN-02 — Evolution Impact

Preserve the current Scenario-local specialization of the shared Current-Owner Evolution Impact Projection Contract.

Its local affected surface is Scenario journey/Requirement/surface participation meaning. In a future Target Scenario Body the Unit is present but `OMITTED`, because current-owner reverse projection is not applicable inside Step-owned future meaning.

---

<a id="ru-scen-03--journey-realization-concerns"></a>
## RU-SCEN-03 — Journey Realization Concerns

Preserve the current responsibility: only material realization/proof/integration concerns whose smallest natural subject is the Scenario as a whole.

Do not copy Feature implementation concerns, Screen spatial design, Slice plans, Domain rules or exact mechanisms.

---

## Peer Boundaries

```text
Scenario
→ real-life desired path / SPS-*
→ Scenario-natural SR-*
→ Application Contributions
→ application/external Screen & surface participation

Feature
→ coherent application capability
→ canonical detailed application behavior / FBS-*
→ Feature-local BR-*
→ semantic data / principal result

Screen
→ application-owned spatial/navigation composition
→ zones / routes / Feature presence / screen-local constraints

External Surface
→ journey participant/context only
→ never becomes TM-SCREEN merely because it appears in Scenario
```

Many-to-many Scenario↔Feature and Scenario↔Screen relations remain valid.

## Scenario-first downstream handoff

This module allows:

```text
Need / real-life evidence
→ Scenario Path + SRs + surface participation + Application Contributions
```

Then, as applicable:

```text
Scenario result / path / SR evidence
→ Application Definition Concept / Own-Application Justification / Key Behavior Focus / feasibility revalidation when material

Application Contributions + applicable SPS-* + step-attached SR-* + Scenario-wide SR-*
→ Feature Discovery / TM-FEATURE

application-owned Screen / Surface participation + applicable SPS-* + relevant SR-* pressure
→ TM-SCREEN step-local Screen requirements / spatial presentation
```

Application Definition and the SDS semantic-composition guide own their respective upstream/cross-owner semantics; this module owns only the Scenario-local handoff meaning above.

## Representation / Artifact Guidance

A compact Scenario may remain one document containing the applicable Unit sections.

Promote Scenario Requirements or surface information to separate files only when independent lifecycle/addressability pressure justifies it. Do not create one file per SPS, SR or Screen by default.

## Validators

A Scenario candidate is coherent when:

- one meaningful real-life result/boundary is understandable;
- actor / external / Application participation is explicit where material;
- selected path is represented by coherent SPS steps;
- materially useful path examples are preserved rather than dropped merely because they are not good/problem/boundary cases;
- long/multiple/reused path examples are moved to `COL-SCEN-PATH-EXAMPLES` and referenced by `EX-*` from SPS rows instead of bloating the path table;
- examples remain ordinary RU-SCEN-01 result content/collection items unless independent formal resolution responsibility genuinely justifies a Core Slot;
- Application Contributions are explicit where Application participation is not yet Feature-resolved;
- attached SR references show both ID and short name;
- SPS does not require an SR merely to be selected meaning or a downstream realization obligation;
- Scenario-wide SRs are not artificially attached to one step;
- SRs have Scenario as natural owner and do not duplicate Feature BRs;
- application expected errors appear only on Application behavior steps;
- actor/external-only steps do not receive invented Application errors;
- every material SPS has its Screen / Surface stated directly when journey-significant;
- external surfaces are not mistaken for application Screens;
- application Screen participation hands off SPS meaning plus relevant SR pressure to `TM-SCREEN`; Screen derives only Screen-natural step-local/global requirements without copying SR authority;
- Feature Resolution OPEN is allowed;
- outside-Application SPS are normally kept as Scenario/trigger context rather than falsely claimed as Feature-realized behavior;
- when an external event and Application entry are materially distinct, separate SPS identities are preferred;
- one Feature may realize several SPS steps and one SPS may be jointly realized by several Features;
- resolved Feature behavior is referenced rather than copied;
- current/future temporal hosting remains truthful.

## Guards

```text
SPS ≠ automatically SR
SPS may itself be a downstream realization obligation
SR ≠ BR
SR-G-* ≠ new Requirement family
Feature participation in Scenario ≠ Feature realizes every SPS

Scenario Surface ≠ automatically Application Screen
GitHub / IDE / browser / terminal ≠ TM-SCREEN owner

Scenario ≠ Feature
Scenario ≠ Screen

Feature Resolution OPEN = valid
zero SR = valid
zero application Screens = valid
```

## Handoff

Primary consumers:

- Application Definition — Scenario outcome/path/SR evidence when Application Concept, Own-Application Justification, Key Behavior Focus or application-level feasibility/early planning should be revalidated;
- `TM-FEATURE` — Application Contributions plus applicable `SPS-*`, step-attached `SR-*` and Scenario-wide `SR-*` for Feature discovery and explicit Scenario realization coverage;
- `TM-SCREEN` — application-owned Screen references from SPS plus relevant Scenario requirement pressure needed to derive Screen-local step requirements/spatial presentation without copying Scenario authority;
- Evolution Step — future Target Scenario Body and later materialization;
- Domain / Slice / Shared / Exact — only through their natural downstream questions.

No downstream owner receives copied Scenario authority merely because it consumes the Scenario.

## Revalidation Signals

Revalidate the affected Scenario Units when material evidence changes:

- actor/external path or real-world result;
- Application boundary / Contribution;
- Feature ownership or Feature principal result;
- application Screen identity or external-surface participation;
- an SR's natural owner;
- branch/re-entry/continuity;
- actual implementation/proof contradicts Scenario meaning.
