# Replacement Package App — Documentation Use Cases

Status: active root documentation-process authority
Scope: shared methodology terminology, process routing, cross-group rules and stable Documentation Use Case identities.

## Purpose

The local methodology keeps application behavior, implementation constraints, working discovery, exact realization and proof understandable without turning one layer into a duplicate of another.

The root owns **cross-group process meaning**. Detailed Use Case procedure lives in the five group files. Reusable design reasoning lives in `methodology-guidance/`. Detailed AI/session procedure lives in `session-methodology/`.

This methodology change never silently changes current product semantics. Existing Scenario, Feature, Screen, Domain, Slice, Shared, contract and source/test owners remain authoritative for their existing meaning until separately reconciled.

This local methodology is specific to the Replacement Package App documentation route. It does not modify or supersede the separate repository-wide IDTSPE/SDS methodology.

## Methodology authority and routing

```text
documentation-use-cases.md
→ root process authority
→ shared terminology
→ cross-group routing/revalidation
→ natural-owner/non-duplication rules
→ stable DOC-UC identity/navigation

documentation-use-cases/
├── application-modeling.md
├── implementation-discovery-and-proof.md
├── evolution-planning.md
├── documentation-governance.md
└── ai-session-work.md

methodology-guidance/
→ recommended reusable discovery/design models
→ not product Requirement authority

session-methodology/
→ detailed normative AI/session procedure
→ realized through DOC-UC-15..19

documentation-templates.md
→ recommended adaptable forms
→ not authority merely because a template is copied
```

## Target workflow

```text
APPLICATION CONTEXT
Application Benefit / desired result
        ↓
FEATURE ↔ SCENARIO ↔ SCREEN EXPLORATION
        ↓
FEATURE OWNER FORMATION — DOC-UC-13
        ├─ consult reusable Vertical Slice guidance
        ↓
SELECT FEATURE BOUNDARY
+
INITIAL SLICE BOUNDARY HYPOTHESIS
        ↓
SCENARIO / SCREEN CONSISTENCY
        ↓
IMPLEMENTATION DISCOVERY
        ├─ DOC-UC-02 Domain-specific discovery
        ├─ DOC-UC-03 Slice/end-to-end discovery
        ├─ reusable DDD / Vertical Slice / Programming Principles
        └─ relevant Evolution Steps
        ↓
OWNER-LOCAL IMPLEMENTATION REQUIREMENTS — DOC-UC-14
        ↓
PROOF DESIGN / TDD WHERE CREDIBLE
        ↓
EXACT IMPLEMENTATION CANDIDATE WHEN USEFUL — DOC-UC-18
        ↓
SELECTED REALIZATION WORKFLOW — DOC-UC-19
        ↓
IMPLEMENTATION
        ↓
EXECUTED EVIDENCE
        ↓
NARROW REVALIDATION WHEN NEEDED
        ↓
DELETE WORKING PLANS BY DEFAULT
```

This is directed discovery, not a mandatory waterfall. Feature-first, Scenario-first, Screen-pressure-first, implementation-evidence re-entry and Evolution-driven revalidation are all valid.

## Shared terms

### Current truth

Behavior or architecture already accepted as implemented. Current product owners remain authoritative for their own current meaning until separately migrated.

### Planned target

Selected future meaning that is not current implementation truth yet. It remains visibly planned until realization/proof are reconciled and promoted.

### Application Benefit / desired result

Useful application/user result that justifies behavior.

### Feature

Primary owner of one coherent application/user intent, its observable behavior and principal meaningful Result/Result family.

### Slice

End-to-end implementation side of a Feature boundary. Slice independence primarily means locality of responsibility/change, not absence of dependencies.

### Behavior Requirement

Implementation-independent must-hold Feature behavior. Durable Feature Requirements use stable `BR-*` identities; the Feature owner keeps canonical Requirement text.

### Scenario / Scenario Requirement

Scenario owns real journey/composition/continuity across Features, Screens and contexts. `SR-*` exists only for genuine cross-Feature/cross-Screen/cross-context must-hold journey constraints.

### Screen

Owner of durable spatial/window/UI meaning. Screen is not a frontend Slice.

### Aggregate / Domain owner

Owner of coherent semantic identity, state, lifecycle, invariants and consistency.

### Shared Implementation Capability

Reusable non-end-to-end implementation responsibility used by multiple Slices when shared meaning is real.

### Implementation Requirement

A durable constraint on one selected implementation owner.

Natural identities:

```text
IR-SLICE-<READABLE-OWNER>-<SEMANTIC-REQUIREMENT>
IR-DOMAIN-<READABLE-OWNER>-<SEMANTIC-REQUIREMENT>
IR-SHARED-<READABLE-OWNER>-<SEMANTIC-REQUIREMENT>
```

An Implementation Requirement is not created merely because a mechanism was discussed or implemented.

### Proof Requirement

A durable **non-obvious proof-realization constraint**, identified as:

```text
PFR-<READABLE-PROOF-OWNER>-<SEMANTIC-PROOF-REQUIREMENT>
```

A PFR is not “what should be tested”. Most ordinary proof intent stays with behavior/implementation meaning and executable tests; many owners need no PFR.

### Requirement taxonomy, natural ownership and stable identity

Target hierarchy:

```text
Requirement
├─ Behavior Requirement
│  ├─ Feature Behavior Requirement
│  └─ Scenario Requirement
└─ Implementation Requirement
   ├─ Slice Implementation Requirement
   ├─ Domain Implementation Requirement
   ├─ Shared-Capability Implementation Requirement
   └─ Proof Requirement
```

Every selected durable Implementation Requirement has **exactly one natural owner**. Select the owner by what responsibility must satisfy the Requirement, not by which finding, reusable question, test or source file exposed it:

```text
Feature owner
→ canonical Feature Behavior Requirement text

Scenario owner
→ canonical cross-Feature Scenario Requirement text

Slice owner
→ Slice-specific end-to-end IRs
→ Slice PFRs when a durable non-obvious proof-realization constraint exists

Domain owner
→ semantic/consistency/lifecycle IRs
→ Domain PFRs when needed

Shared Capability owner
→ reusable non-end-to-end IRs
→ Shared PFRs when needed

Shared Test Capability / Test Strategy
→ only when reusable test machinery or cross-owner proof coordination
  has an independently coherent responsibility
```

A neighboring owner may reference Requirement identity + natural owner + local relevance, but must not copy canonical normative Requirement text for convenience.

No selected durable IR/PFR may remain orphaned only in a review finding, working plan, Feature Implementation Concern, test comment, source comment or reusable-guidance file. If the constraint is durable and selected, promote it through approval into its natural owner. If no natural owner or required behavior/invariant/proof need can be identified, reconsider whether the proposed Requirement belongs in the durable model at all.

Stable owner-scoped identities remain readable navigation identities:

```text
IR-SLICE-<READABLE-OWNER>-<SEMANTIC-REQUIREMENT>
IR-DOMAIN-<READABLE-OWNER>-<SEMANTIC-REQUIREMENT>
IR-SHARED-<READABLE-OWNER>-<SEMANTIC-REQUIREMENT>
PFR-<READABLE-PROOF-OWNER>-<SEMANTIC-PROOF-REQUIREMENT>
```

ID lifecycle follows semantic identity:

```text
semantic-preserving wording refinement
→ keep ID

split one independently meaningful Requirement into several
→ retire old ID
→ create new owner-scoped IDs

merge several independently meaningful Requirements
→ retire old IDs
→ create the new semantic ID

move to a genuinely different natural owner
→ migrate/retire the old owner-scoped ID
→ create an ID under the new owner
```

Split/merge/semantic move/owner move are durable Requirement changes and therefore proposal-first/user-approved.

### Decision / Risk / Question / Known Problem

Optional durable reasoning memory. Record it only when preserving the rationale, trade-off, accepted risk, unresolved question or known problem has continuing value.

### Reusable guidance

A preferred ready-made model to consult when relevant and adopt by default when it fits. It is not automatically a Requirement. A better context-specific solution may replace/adapt it through normal proposal reasoning.

Shared reusable-guidance vocabulary is defined by [`methodology-guidance/reusable-guidance-model.md`](methodology-guidance/reusable-guidance-model.md):

- **Reusable Question** — recurring discovery question;
- **Reusable Requirement (`RR-*`)** — recommended reusable must-hold model, not owner-local Requirement authority;
- **Reusable Requirement Candidate (`RRC-*`)** — candidate constraint requiring local selection;
- **Reusable Solution / Pattern** — ready-made realization option/trade-off model;
- **Local Decision** — selected context-specific direction, durable only when preserving it has continuing value.

`RRC-* != selected owner-local IR/PFR`. No RR/RRC live inheritance exists.

### Review Finding

A transient Discovery input produced by review/Evidence. A finding is not a durable Requirement owner. Session classification/routing belongs to `DOC-UC-17`; durable Requirement/Decision consequences return to the affected natural owner.

### Behavioral Necessity / Relevance Lens

Before keeping/adding/strengthening a durable IR/PFR, ask how necessary and relevant the constraint is to selected behavior, invariants, proof trust and known Evolution. This lens is detailed in `DOC-UC-14`.

### Working artifact

Discovery/planning/proposal material such as Slice Discovery, Aggregate Planning or exact implementation plan. Working artifacts are non-authoritative and non-persistent by default. Persistence alone never promotes working content into semantic authority.

### Evidence

Executed automated or practical proof against an exact build/state/environment. Evidence may trigger narrow revalidation.

### Evolution Step / Evolution Impact

An Evolution Step owns one coherent qualitative transition to a valid usable target state. Evolution Impact is the effect of that canonical Step on one existing owner; it is not a second roadmap.

## General Discovery and revalidation rules

Relevant known Evolution Steps are Sources for every material discovery when they can change the Requirement, boundary, owner, proof choice or representation.

Useful recursive form:

```text
current selected meaning
+ relevant known Evolution Steps
+ implementation/proof Evidence
→ Discovery
→ selected current answer
+ downstream implications
```

Later Evidence may challenge Feature, Scenario, Screen, Slice, Domain, Shared or Requirement boundaries. Revalidate the narrow affected meaning instead of rebuilding everything by default.

### Shared Feature / Slice Boundary Method

Feature formation and later Slice discovery use the **same** signal-based method from [`methodology-guidance/reusable-vertical-slice-discovery.md`](methodology-guidance/reusable-vertical-slice-discovery.md):

```text
1. Intent / Principal Result
2. Semantic Entry
3. Realization Cohesion / Shared Structure
4. Development / Proof / Evolution Fitness
```

`DOC-UC-13` uses it to establish the initial Feature/Slice boundary hypothesis. `DOC-UC-03` re-runs it with stronger implementation Evidence. The four groups are signals, not a numeric scoring algorithm.

## Cross-group non-duplication / natural-owner rules

1. Feature owns canonical Feature behavior and `BR-*`; Scenario owns journey composition; Screen owns spatial meaning; Domain owns semantic consistency; Slice owns end-to-end implementation responsibility; Shared owns reusable non-end-to-end implementation meaning; tests/Evidence prove rather than redefine.
2. Working Slice/Domain/exact plans may reference durable authority but do not become semantic owners.
3. A reusable Requirement/solution is not imported automatically. Local adoption is explicit; no live inheritance exists from reusable guidance into IR/PFR.
4. Owner-local Requirements Discovery may produce no durable Requirement.
5. A code/test/file change still requires proposal/confirmation even when upper Requirements remain unchanged.
6. A Documentation Use Case may invoke another group directly. Do not duplicate the invoked process merely to make a group self-contained.
7. Durable Slice/Domain/Shared owners preserve independently useful long-lived meaning, not volatile realization topology. They should survive behavior-preserving class/method/file/test refactoring without mandatory documentation churn unless a literal external/compatibility contract actually makes that topology semantic.
8. A durable Domain owner references the Behavior Requirements it realizes but does not need a Feature as its semantic parent. A consumer Slice must not duplicate canonical Domain/Shared Requirements.
9. Use the smallest representation that preserves selected meaning.
10. Current product documents using legacy `FI-*`, `BI-*`, `DI-*`, `SI-*` or `TST-*` remain authoritative for their existing meaning until separately migrated.

## Documentation Use Case groups

### Application Modeling

[`documentation-use-cases/application-modeling.md`](documentation-use-cases/application-modeling.md)

`DOC-UC-01`, `DOC-UC-07`, `DOC-UC-11`, `DOC-UC-13`.

### Implementation Discovery & Proof

[`documentation-use-cases/implementation-discovery-and-proof.md`](documentation-use-cases/implementation-discovery-and-proof.md)

`DOC-UC-02`, `DOC-UC-03`, `DOC-UC-04`, `DOC-UC-05`, `DOC-UC-06`, `DOC-UC-12`, `DOC-UC-14`.

### Evolution Planning

[`documentation-use-cases/evolution-planning.md`](documentation-use-cases/evolution-planning.md)

`DOC-UC-08`.

### Documentation Governance

[`documentation-use-cases/documentation-governance.md`](documentation-use-cases/documentation-governance.md)

`DOC-UC-09`, `DOC-UC-10`.

### AI Session Work

[`documentation-use-cases/ai-session-work.md`](documentation-use-cases/ai-session-work.md)

`DOC-UC-15` through `DOC-UC-19`.

## Stable Documentation Use Case identities

```text
DOC-UC-01  Scenario / journey composition and consistency
DOC-UC-02  Aggregate / Domain-specific discovery
DOC-UC-03  Slice / end-to-end implementation discovery
DOC-UC-04  Shared Implementation Capability
DOC-UC-05  evolution-aware implementation architecture
DOC-UC-06  current implementation inspection
DOC-UC-07  Feature / Scenario / Screen design exploration
DOC-UC-08  Evolution Step planning / map relationship
DOC-UC-09  semantic readability
DOC-UC-10  documentation ownership
DOC-UC-11  selected Screen model
DOC-UC-12  credible proof
DOC-UC-13  Feature planning + Slice boundary hypothesis
DOC-UC-14  owner-local Implementation Requirements Discovery
DOC-UC-15  progressively plan change with AI
DOC-UC-16  review and approve proposed change
DOC-UC-17  handle finding and re-enter planning
DOC-UC-18  develop exact implementation candidate
DOC-UC-19  execute selected implementation workflow
```

Stable IDs keep semantic lineage; they are not numbering-based architecture.

## Compatibility anchors

The following legacy root anchors are retained because they existed as documentation interfaces before this split. The root is only a compatibility router; the group file is the semantic owner.

<a id="doc-uc-evolution-steps-map"></a>
`DOC-UC-08` → [`documentation-use-cases/evolution-planning.md`](documentation-use-cases/evolution-planning.md#doc-uc-08--plan-and-refine-evolution-steps)

<a id="doc-uc-semantic-readability"></a>
`DOC-UC-09` → [`documentation-use-cases/documentation-governance.md`](documentation-use-cases/documentation-governance.md#doc-uc-09--communicate-documentation-meaning-clearly)

<a id="doc-uc-documentation-ownership"></a>
`DOC-UC-10` → [`documentation-use-cases/documentation-governance.md`](documentation-use-cases/documentation-governance.md#doc-uc-10--maintain-use-case-driven-documentation-ownership)

## Permanent migration boundary

A methodology change may change how future documentation is planned without silently changing existing product semantics.

When an existing owner is deliberately migrated:
- preserve accepted current/planned meaning first;
- route selected durable meaning to the natural owner;
- update derived/navigation material only after semantic owners are reconciled;
- do not modify unrelated product owners merely for terminology consistency.
