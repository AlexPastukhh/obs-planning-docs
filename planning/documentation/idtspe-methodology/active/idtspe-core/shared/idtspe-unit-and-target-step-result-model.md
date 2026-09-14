# IDTSPE Unit And Target Step Result Model

Status: active generic methodology owner
Purpose: define what one bounded IDTSPE work step produces, how target-specific result meaning differs from generic planning state, and the common Unit/addressability vocabulary used by Target Modules, Lenses, validation and persistence.

---

## 1. Core Model

The central bounded-work object is a **Unit**: one semantic/result responsibility that can be resolved, reviewed and handed off without forcing a separate Target or file.

```text
IDTSPE Work Context
↓
zero or more bounded Targets
↓
Target Module or Local Target Contract
↓
zero or more bounded Units
  ├─ Module-defined Unit
  └─ Contextual Unit when current work exposes an independently useful local responsibility
↓
for each material Unit
  Result Responsibility
  + Unit Resolution
  + Current Result Content when sufficiently resolved
↓
Target Step Result
  = composition/projection of applicable Unit Result Content
```

`Unit Resolution` is both the process and the current working semantic state used to obtain sufficiently resolved Unit Result Content. It may relate proportionally to Sources/Evidence, Questions, Problems/Risks, Proposals, Findings, Decisions, Branches and Revalidation. Those Core resolution items keep their own lifecycle/addressability semantics; they are not a second family of peer work/result Units.

```text
Core Resolution State
→ normally attaches to the smallest correct semantic subject:
   one Unit / one Result field / one Proposal / one Decision / one Target
→ may remain cross-Unit, Target-level or Work-Context-level
   when that is its natural subject
```

`Current Result Content` is the normalized current answer/output owned by the Unit. It may be absent while Unit Resolution is still open. Candidate result meaning may be useful during resolution, but candidate meaning is not current Result Content merely because it was written down.

```text
trusted Source / Evidence
→ unambiguous non-decision derivation
→ Current Result Content
```

is valid; Proposal/Decision ceremony is not mandatory when no material choice exists.

A material Proposal that is actually selected still has **Decision semantics** under the canonical Proposal/Decision lifecycle. A separate explicit/durable Decision State Unit or retained Decision trace is required only when the selection/rationale/trade-off/revalidation meaning has independent future value.

`IDTSPE Step Output` remains an explanatory umbrella for the material semantic output of one work/integration pass. It may contain Unit Result Content plus material Core Resolution State. It is not a new semantic owner and does not imply one persisted record.

## 2. Target Step Result

```text
Target Step Result
= the useful target-specific selected/resolved output
  that the current bounded IDTSPE work step
  is trying to produce or refine for the selected Target.
```

`Step` qualifies the word `Result`: it means the result wanted from **this current IDTSPE work pass**, not the final product/result of the domain being planned.

The same logical Target may later be revisited through:

```text
CREATE
REFINE
EXTEND
REVALIDATE
REPAIR
```

and therefore have a later Step Result revision.

### Example — planning a Slice

```text
Target:
  SL-CAP-01

Current Step intent:
  produce a sufficiently resolved vertical Slice plan before exact realization

Target Step Result:
  Implementation Slice Plan
```

The plan may contain a field called `Useful Vertical Result`. That is the runtime/product result of the Slice; it is not the same meaning as `Target Step Result`.

Prefer:

```text
Target Step Result:
  Implementation Slice Plan

Result Unit:
  Slice Outcome Definition

Field:
  Useful Vertical Result
```

over the linguistically ambiguous:

```text
Target Result contains Useful Vertical Result
```

### Example — literal implementation

IDTSPE is not restricted to prose plans.

```text
Target:
  realize selected CaptureItem Domain behavior

Target Step Result:
  exact selected implementation

Result Unit:
  CaptureItem source payload
```

In this Target family, literal future code may itself be the desired Result Unit rather than an example inside a planning document.

Generic Core now installs [`TM-EXACT-REALIZATION`](../target-modules/TM-EXACT-REALIZATION.md) for this recurring profile-independent result family. Profiles may reuse it directly and add only genuinely profile-specific semantic/design Targets around it.

---

## 3. Target Step Result Unit / Module-Defined Unit

Full compatibility term:

```text
Target Step Result Unit
```

Short form when context is clear:

```text
Result Unit / Unit
```

A Target Module-declared Result Unit is a **Module-defined Unit Contract instance** for one bounded part of the Target Step Result. It is not merely an output bucket: its responsibility includes obtaining and validating the result meaning it owns.

```text
Unit
= one bounded target-specific result responsibility
  deserving explicit/separately addressable processing

Unit
├─ Result Responsibility / Purpose
├─ Applicability / Materiality / Omission
├─ Unit Resolution
│  ├─ Inputs / Sources / Evidence as applicable
│  ├─ reusable Questions/Problems/guidance from its Unit Contract
│  ├─ Knowledge Basis / theory references when useful
│  ├─ Proposal discovery / applicable Lenses / validators when useful
│  └─ current Core Resolution State attached to this subject
└─ Current Result Content
   └─ normalized target-specific answer owned by the Unit
```

A Unit may deserve explicit treatment because it has its own purpose, questions, internal structure, validation, materiality, consumer, review focus, handoff, revalidation or representation destination. "Self-contained" means the Unit contract contains or references enough reusable methodology to process that bounded responsibility; it does **not** require every Unit to carry a large Question pack, Knowledge Basis, Proposal space or Lens set.

A thin technical Unit may have almost no specialized resolution material. A heavy semantic Unit may host several Questions, Proposals, Q/R/P items, Evidence items and Decisions during its resolution.

A Unit is not automatically a separate Target, semantic owner outside the Target contract, Target Module, file or new Core methodology type.

### Example — composite Slice result

```text
Target Step Result:
  Implementation Slice Plan

Unit:
  Slice Outcome Definition
  Responsibility:
    establish what useful/checkable outcome the Slice must deliver
  Current Result Content:
    <normalized selected/derived Slice outcome meaning>

Unit:
  Runtime Path
  Responsibility:
    resolve and describe the selected running-system path

Unit:
  Uses / Ownership Boundary
  Responsibility:
    resolve material Domain/shared/dependency responsibility relations
```

All Units may remain sections of one planning artifact. Unit identity does not force file splitting.

### Example — several physical destinations

One Target Step Result may still materialize asymmetrically: a Unit's current result may be represented in planning prose, implementation-native files, package metadata or generated review views according to the representation contract. The Unit remains one semantic responsibility even when its result is projected into several physical forms.

## 4. Core Resolution State / IDTSPE State Unit

`IDTSPE State Unit` remains the compatibility/addressability term for typed generic planning/resolution meaning maintained by Core. Typical kinds include:

```text
Source
Question
Proposal
Question / Risk / Problem (Q/R/P)
Decision
Evidence / Evidence Need
Planning Branch state/reference
Revalidation Signal
Methodology Usage State when useful
Target Relation / Handoff item when independently useful
persistence/representation state when materially useful
validation/readiness finding when independently useful
```

These kinds retain their canonical lifecycle owners. Finding `Resolution Escalation` (`RE-0..RE-4`) remains a transient Finding-disposition projection and is **not** a State Unit, Unit kind, lifecycle or priority scale. The topology changes are compositional:

```text
old mental model to avoid:
  Result Units + peer generic work Units

preferred model:
  bounded Unit responsibility
  + Core Resolution State attached/related to the semantic subject it concerns
  + Current Result Content
```

Core Resolution State is **not forced into exactly one Unit**. Cross-Unit, Target-level, cross-Target or Work-Context state remains valid when that is the smallest correct subject.

### Proposal / Decision / Result relation

```text
Proposal
= candidate resolution that may carry proposed Result Meaning,
  a proposed Resolution/Realization Route, or both

material Proposal selected under applicable authority
= Decision semantics occurred

explicit/durable Decision Unit/trace
= retain when later work/review/revalidation benefits from
  knowing the selection/rationale/trade-off/reconsider condition

Current Result Content
= normalized current Unit answer after selected or safely derived meaning is integrated
```

Therefore:

```text
Question → trusted Answer/Evidence → Result Content
```

may need no Decision at all, while:

```text
Proposal A / Proposal B → material selection
→ Decision semantics
→ Result Content
```

may or may not need a separately retained Decision record.

### State can be useful before Result Content exists

A Unit may remain unresolved while its Resolution carries useful addressable state:

```text
Unit: Uses / Ownership Boundary

Problem:
  failure translation ownership is inconsistent

Evidence Need:
  run persistence-failure integration proof

Proposal:
  ApplicationService owns failure translation

Current Result Content:
  absent until the material choice is resolved
```

That is useful IDTSPE work even before current Unit Result Content changes.

### Methodology Usage State

`Methodology Usage State` remains optional generic Core Resolution State for retaining **material facts about how the methodology is currently being used** when those facts help continuation, review, handoff or revalidation. It is not an execution log and does not create one methodology-state Unit per target Unit.

Use proportionally:

```text
Methodology Usage State
  Current Work Concern — when retaining it helps orientation/re-entry
  Active Use Cases — only the material current set
  Relevant Registry Traversals — registry + purpose + selected entries/outcome
  Applied Components — Target Modules / Lenses / reusable guidance + operation/purpose + applied-to subject
  Material Guards / Validators / Rules / Packs — only when their activation affects continuation/review
  Contextual Adaptations / deferred recommendations — when later work must know them
  Recheck Triggers / Re-entry — when future context may change applicability
```

Do not record every file read, command, tool call, non-applicable registry row or transient reasoning step. Reuse stable methodology-use meaning rather than serializing execution history.

`Current Work Concern` may remain only conversational/work-context meaning. Promote it into explicit Methodology Usage State only when independent addressability, continuation, audit or revalidation value is material.

Methodology Usage State may attach to a Unit when methodology-use meaning is genuinely Unit-local, or remain cross-Unit/Target/Work-Context state when that is its natural subject. It is not forced into a Unit solely because the overall model is Unit-centric.

## 5. Unit Definition Authority

The ownership boundary is:

```text
IDTSPE Core
→ defines generic Unit mechanics
→ defines Unit Resolution / Current Result Content semantics
→ defines generic Core Resolution State kinds/lifecycles
→ defines Contextual Unit boundary

Target Module / Local Target Contract
→ defines recurring/target-local Module-defined Unit Contracts
→ defines their Result Responsibility and Result Content contract
→ contributes reusable Unit-specific resolution guidance

Lens
→ defines neither Unit kinds nor result ownership
→ evaluates an Analysis Surface and may surface Finding Candidates
```

A concrete Module-defined Unit Contract may proportionally supply or reference:

```text
Result Responsibility / Purpose
Applicability / Materiality / Omission
Inputs / Sources
Drivers: Goal / Questions / recurring Problems
Knowledge Basis
Resolution Method / Guidance
Proposal discovery aids
Applicable Lenses / registry triggers
Result Content Contract
Validators
Handoff / consumers
Revalidation
Representation guidance
```

Possible does not mean mandatory. Shared module-level guidance may be referenced by several Units rather than copied.

### Contextual Unit

A `Contextual Unit` is formed when current work exposes an independently useful **bounded local resolution/result responsibility** that is not already represented by a suitable Module-defined Unit, but does not justify a separate Target.

```text
Finding / Question / Problem / Source conflict / Broad Discussion
→ no suitable existing Unit
→ bounded local responsibility is independently useful
→ Contextual Unit
```

A Contextual Unit uses the same generic Unit mechanics but normally has no prepackaged specialized Knowledge Basis/guidance beyond what the context/Core/Lenses provide.

A Contextual Unit must declare a useful **Result Destination** proportionally. Its resolution may:

```text
integrate into an existing Module-defined Unit Result Content
contribute target-local result meaning under the Local Target Contract
remain a resolved Target/Work-Context conclusion without a new result section
handoff to another existing owner
become Target Formation input when independent responsibility grows
```

Do not persist a `CU-*` result section merely because a Contextual Unit existed during resolution.

## 5A. Unit Applicability / Materiality / Omission Contract

Every Unit kind/definition must make it possible to answer three different questions:

```text
Applicability
→ can this Unit kind/Result Unit meaning apply to the current situation/Target?

Materiality
→ would making this meaning explicit now improve resolution, lifecycle, validation, continuation, handoff or consumer use?

Omission
→ when is it correct to leave the Unit absent/unpopulated for now?
```

These checks are situational and may be expressed by a concise rule rather than a mandatory schema block. The owner should also make typical inputs/consumers and revalidation/retention conditions clear when they materially affect use.

Generic Core State examples:

| State Unit kind | Introduce / make explicit when | Normally omit / keep implicit when |
|---|---|---|
| `Source` | authority/provenance affects resolution, conflict handling or future revalidation | the source is obvious, transient or adds no independent authority value |
| `Question` | an unresolved question benefits from explicit resolution/addressability | already answered or trivial enough to remain Broad Discussion |
| `Proposal` | a material candidate approach/meaning needs comparison, review, acceptance or lifecycle | every fleeting AI idea or obvious local implementation choice |
| `Risk / Problem` | downside/problem can change decision, proof, ownership, scope or revalidation | generic hypothetical concern has no current consequence |
| `Decision` | selected/rejected material meaning or rationale must constrain later work or survive review/handoff | no real choice was made or the fact is already owned unambiguously as Target result |
| `Evidence / Evidence Need` | empirical/source support has independent resolution, proof or revalidation value | ordinary explanatory support does not need lifecycle/addressability |
| `Planning Branch` | alternative/counterfactual reasoning must remain separately comparable or resumable | one path is already sufficient and alternatives add no decision value |
| `Revalidation Signal` | a concrete condition/change may make current accepted/working meaning stale | vague “things may change” reminders |
| `Methodology Usage State` | methodology selection/application/adaptation/recheck context matters for continuation, audit or revalidation | routine registry/file reads whose result is obvious and stable |
| `Target Relation / Handoff` | cross-Target dependency/ownership/continuation meaning must remain addressable | relationship is local, transient or already explicit in the consuming Result Unit |
| representation/persistence state | physical placement/materialization choice has independent review/revalidation value | representation follows directly from current owner contract with no ambiguity |
| validation/readiness finding | a material validation result must survive beyond the immediate evaluation | no material finding exists or it is already disposed into another owned Unit |

These are defaults, not a closed ontology-specific checklist. The current Use Case and local owner still judge usefulness against context.

Target-specific Result Units follow the same rule, but their applicability/materiality/omission semantics are owned by the Target Module/Local Contract.

Do not create a placeholder Unit only to record `N/A`. Absence is a first-class valid projection when the omission rule is satisfied.

## 5B. Unit Applicability Envelope — Opening / In-Unit / Closing Checkpoints

Every **material Target Step Result Unit** is processed inside a lightweight applicability envelope. The envelope is a responsibility boundary around Unit work, not a new Result Unit, State Unit, phase, persisted status or execution log.

```text
current Work Context + Target + accepted State
→ Opening Unit Checkpoint — <RU-ID>
→ Unit Work — <RU-ID>
   ↕ In-Unit Applicability Check whenever material
→ candidate Unit result
→ Closing Unit Checkpoint — <RU-ID>
→ current Unit result / narrow re-entry when needed
```

### Opening Unit Checkpoint

Before materially working one Result Unit:

```text
current Unit Analysis Surface
→ logically check Core Lens Registry applicability
→ logically check active-profile Lens Registry applicability when a profile is active
→ reuse trustworthy current registry summaries when nothing material changed
→ open/apply only plausible Lenses at useful depth
→ consult other component registries only when this Unit exposes a material trigger for them
```

`Opening Unit Checkpoint` is mandatory for a material Unit. A valid result is `NO_ADDITIONAL_LENS` / no new supporting component. Mandatory checkpoint does **not** mean mandatory full-file reread, exhaustive registry traversal, Lens execution or Finding creation.

### In-Unit Applicability Check

Opening and Closing checkpoints are minimum boundaries, not the only moments when registries may be consulted. During Unit work, re-evaluate applicability immediately when new Evidence, Finding pressure, ownership/dependency change, representation pressure, profile change or another material Analysis-Surface change makes another evaluator/supporting component plausibly useful.

```text
Opening/Closing checkpoint
≠ exclusive registry-consultation window
```

Do not wait for Closing merely to preserve ceremony when a material issue is already visible.

### Closing Unit Checkpoint

After a candidate Unit result exists, evaluate the **actual resulting Unit surface** before treating it as current-for-handoff:

```text
candidate Unit result
→ recheck Core Lens Registry applicability
→ recheck active-profile Lens Registry applicability when active
→ apply newly material checks at useful depth
→ disposition material Findings through normal Core ownership/lifecycle
→ resolve newly material owner / Target / revalidation / representation consequences
→ current Unit result
```

A Closing checkpoint may reopen/refine the same Unit or route upstream/downstream work and then run again. It is not a one-way approval gate.

### Registry Read Economy

```text
mandatory logical checkpoint
≠ mandatory physical reread
≠ mandatory Lens selection
≠ mandatory Finding
≠ mandatory deeper methodology
```

Unchanged registry metadata/current summaries may be reused while trustworthy. Reread concrete owners when applicability, authority, content freshness or conflict cannot be reconstructed safely.

### Target Module Projection Rule

The generic algorithm above has one owner here. Every concrete Target Module must still make the envelope **explicit per material Result Unit** by naming:

```text
Opening Unit Checkpoint — RU-...
Unit Work — RU-...
Closing Unit Checkpoint — RU-...
```

A module may add primary/frequent Lens candidates or local triggers for that Unit, but must not copy/redefine this generic algorithm. This explicit placement makes Unit processing reviewable without turning checkpoints into extra Result Units.

## 6. Lens / Finding Boundary

A Lens/validator/Evidence check/review may analyze a Unit, Proposal, Decision, Target or other semantic subject. Useful explanation may remain Broad Discussion. Newly surfaced potentially material meaning crosses the Finding Candidate boundary only when ownership/lifecycle disposition is needed.

```text
Lens / Validator / Evidence / Review
→ explanatory analysis only
   OR
→ Finding Candidate
→ Core Finding Disposition
→ smallest correct semantic subject / owner
```

When the finding concerns one bounded Unit responsibility:

```text
Finding
→ existing Unit Resolution
```

When no suitable Unit exists but a bounded local responsibility is useful:

```text
Finding
→ Contextual Unit
```

When the responsibility is independently substantial:

```text
Finding
→ Target Formation
```

A Finding may instead route directly to Target Scope, Source authority, Target relation/handoff, another semantic owner, methodology state or another canonical subject when that is more correct. Unit-centric does not mean Unit-exclusive.

## 7. Target Module Step-Result / Unit Contract

A Target Module defines one recurring Target Step Result family primarily through its set/composition of Module-defined Unit Contracts plus genuinely Target-wide rules.

For each material Unit the module must make enough reusable meaning reachable to resolve that responsibility safely. Unit-specific questions/Knowledge Basis/Lens triggers/validators belong with that Unit when they are specific to it; truly shared Target-family guidance may remain module-level and be referenced by several Units.

```text
Target Module
→ Unit Contract inventory + dependencies
→ Unit Resolution at runtime
→ Current Result Content per resolved Unit
→ Target Step Result composition/projection
```

The Target Step Result is therefore the coherent applicable composition of Unit Result Content, not a container that becomes current merely because candidate content was produced.

## 8. Proportional / Sparse Projection Rule

```text
Target Module Step-Result Contract
= possible/addressable semantic surface

Concrete Target Step Result
= only the applicable, supported and material projection
  for this Target step
```

A declared Result Unit/field does **not** mean:
- it must be asked;
- it must be introduced before its applicability/materiality is established;
- it must be resolved;
- it must be persisted;
- it must be equally detailed;
- its absence automatically creates Q/R/P;
- `N/A` placeholders are required to prove it was considered.

The Target Module/Local Contract should expose enough trigger/materiality/consumer meaning that the active Use Case/production method can decide whether the Unit is useful **in this situation**. A concrete result may legitimately contain only one of several possible Result Units.

Existing `Output Schema` / `Target-specific Output Template` terminology remains a compatibility/technical projection vocabulary. The semantic owner is the Step-Result Contract; a template is one way to project it.

---

## 9. Internal Object Contract Boundary

```text
Result Unit
= concrete target-result processing/addressability part

Internal Object Contract
= reusable object schema/questions/validation
  owned inside one Target Module
```

Example:

```text
TM-FEATURE

Result Units:
  Semantic Data
  Feature Behavior

Internal Object Contracts when addressability is useful:
  Feature semantic-data item
  BR-* Behavior Requirement item
```

An Internal Object Contract may define several addressable objects inside one Result Unit.

Physical separation/addressability does not create a new Target.

### Supporting Target Module Boundary

A `SUPPORTING TARGET MODULE` is still a **real reusable Target Module**.

It is justified only when its recurring Target/Step-Result family can also make sense independently as a bounded Target family, even if one invocation reuses it in a supporting role inside another Target.

```text
can be a coherent Target family by itself
+ can contribute inside another Target
→ Supporting Target Module role is valid

can only exist as an internal part of one parent Target result
→ not a Target Module
→ use Result Unit / Internal Object Contract / shared Result-Unit method
```

Supporting-role use does not automatically create a child Target Instance. A separate Target exists only when normal Target Formation establishes an independently useful planning responsibility/result.

---

## 10. Resolution Slot Boundary

A Resolution Slot remains coordination metadata for one planning subject, especially Target Formation. It is not a Unit and does not replace Unit Resolution.

```text
Resolution Slot
= coordination/status view

Unit Resolution
= actual bounded work/resolution state for one Unit responsibility
```

`TF-06 QUESTION_SET` and `TF-07 PROPOSAL_SPACE` remain Target-level coordination surfaces. Before Unit decomposition they may help establish what the Target must resolve. After Unit formation they primarily coordinate/project material Unit drivers/Proposals plus genuinely Target-wide or cross-Unit meaning. They are not reduced to a mechanical index and do not become semantic owners of Unit-local Questions/Proposals.

## 11. Persistence / Representation

```text
Unit identity
≠ file identity
```

This model establishes that State/Result Unit addressability does not imply one file per Unit or Target. Whether selected meaning should persist, and how it is represented/placed, is owned by the canonical Representation / P-14 path in [`artifact-placement-and-idtspe-response-contract.md`](artifact-placement-and-idtspe-response-contract.md). Proposal/Decision retention policy is owned by [`proposal-and-decision-lifecycle-contract.md`](proposal-and-decision-lifecycle-contract.md).

## 12. Downstream Source Boundary

Another Target's accepted result becomes a Source only explicitly.

Useful Unit-level handoff is allowed:

```text
Target A
  accepted Result Unit RU-03
↓ explicit Source relation
Target B
```

The entire physical artifact need not become one undifferentiated Source merely because several Units share a file.

---

## 13. High-Level End-To-End Example

```text
Target:
  SL-CAP-01

Module:
  TM-IMPLEMENTATION-SLICE

Current Step intent:
  produce a sufficiently resolved vertical Slice plan before exact realization
```

Current State Units:

```text
Sources:
  SCN-CAPTURE
  CaptureItem Domain owner
  current CaptureController
  current CaptureRepository

Question:
  which existing owner should orchestrate capture?

Proposal:
  reuse CaptureApplicationService

Risk:
  persistence failure may be reported as success
```

Target Step Result:

```text
RU-SLICE-01 Whole-Slice Responsibility / Candidate Structure
RU-SLICE-02 Semantic Application Entry / Result Boundary
RU-SLICE-03 Step-by-Step End-to-End Realization
RU-SLICE-04 Feature Integration Proof
RU-SLICE-05 Evolution / OPEN Slice Pressure — only when material
```

Slice Verticality / Integration Lens Analysis Surface:

```text
Primary Result Units when material:
  RU-SLICE-01
  RU-SLICE-02
  RU-SLICE-03
  RU-SLICE-04

Conditional:
  RU-SLICE-05

Relevant State:
  Questions / Risks / Decisions / Evidence / Revalidation

Context:
  selected Feature + BR-*
  relevant Scenario journey / Screen constraints
  Domain / Shared owners
  current code/tests
```

Lens operation:

```text
CHECK
```

Finding Candidate:

```text
Meaning:
  repository failure has no explicit truthful semantic result path

Affected:
  RU-SLICE-02 semantic result boundary
  RU-SLICE-03 end-to-end realization

Related accepted meaning:
  selected Feature BR forbids false success
```

Core Finding Disposition may resolve:

```text
Risk R-17:
  persistence failure may be reported as success

Question Q-18:
  which owner maps repository failure into the semantic result?
```

After ordinary authority/resolution:

```text
Decision D-21:
  ApplicationService maps repository result
```

The relevant Slice Result Units are then refined:

```text
RU-SLICE-02:
  semantic result explicitly distinguishes durable success from persistence failure

RU-SLICE-03:
  Repository.save(...)
  → ApplicationService.mapResult(...)
  → adapter/UI truthful success/failure projection

RU-SLICE-04:
  integration proof asserts that persistence failure cannot surface as success
```

The Lens surfaced a finding. Core disposition/lifecycle resolved what to do with it. The Target Module continued to own the Result Unit.

## 14. Migration Compatibility

The canonical ownership split is:

```text
Target Module / Local Target Contract
→ target-specific Target Step-Result Contract + Result Units

Core Unit model
→ generic State Unit kinds + Unit applicability/materiality/addressability

Lens Model
→ Lens Analysis Surface / operations / Typical Findings

Finding Disposition
→ Finding Candidate → State/lifecycle/ownership consequence
```

Installed profile conformance is checked against current registries rather than frozen counts in this semantic model. Current mechanical registry/file parity is reported by [`active-methodology-mechanical-consistency-check.md`](active-methodology-mechanical-consistency-check.md).

Older reusable Lens bodies that predate the literal current Lens contract remain interpreted through [`../lenses/LENS-MODEL.md`](../lenses/LENS-MODEL.md) until materially revised. This compatibility rule does not make the Unit model a second Lens owner.

## 15. Key Invariants

```text
Unit = bounded resolution/result responsibility
Module-defined Unit ≠ output bucket only
Contextual Unit ≠ automatic Target or durable result section
Unit-centric ≠ all state must belong to exactly one Unit
Unit Resolution may exist while Current Result Content is absent
Candidate Result Content ≠ Current Result Content
Proposal ≠ Decision ≠ Result Content
material Proposal selection has Decision semantics
explicit/durable Decision trace is proportional, not mandatory for every derived result
Question answered by trusted Source/Evidence may update Result Content without Decision
Core Resolution State keeps its lifecycle/addressability while attaching to the smallest correct subject
Finding Candidate ≠ Unit automatically
Finding may route to Unit Resolution, Contextual Unit, Target Formation or another canonical owner
Lens ≠ Unit owner ≠ Finding disposition authority
Target Step Result = coherent projection/composition of applicable Unit Result Content
Unit identity ≠ file identity
semantic retention ≠ physical persistence
```
