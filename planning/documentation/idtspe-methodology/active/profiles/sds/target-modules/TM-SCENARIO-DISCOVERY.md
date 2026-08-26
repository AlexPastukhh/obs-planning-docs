# TM-SCENARIO-DISCOVERY — Discover Application Scenarios

Entry Point: `tm.scenario.discovery`  
Role: primary Target Module  
Repository provenance: `UC-PLAN-SCENARIO-DISCOVERY`, solution-and-scenario workflow, prototype workflow.

## Purpose
Identify independently meaningful actor-visible behavioral/result boundaries within selected Application responsibility.



## High-Level Example — Self-Contained Walkthrough

### Situation

Application Definition says the app exists mainly to support this real-life route:

```text
notice useful material
→ capture quickly
→ continue current work
→ later review captured items
→ transfer selected items to a long-term destination
```

The team now needs to decide which independently meaningful **application behaviors/results** deserve their own Scenarios.

### Why This Module

The real-life route is broader than one Application Scenario, while detailed Scenario drafting would be premature before the correct boundaries are known.

`TM-SCENARIO-DISCOVERY` discovers the Scenario inventory and split/merge boundaries.

### Walkthrough

Candidate boundaries:

```text
A:
  capture material now

B:
  review/triage captured material later

C:
  transfer a selected item elsewhere

D:
  click the Save button

E:
  POST /captures
```

The Scenario Lens rejects `D` and `E` as UI/technical operations rather than independent user Needs/results.

The selected Scenario candidates may become:

```text
SCN-CAPTURE
  result:
    material is preserved for later use

SCN-REVIEW
  result:
    user understands/triages captured material

SCN-TRANSFER
  result:
    selected material reaches its chosen long-term destination
```

### Result

The result is an evidence-backed Scenario inventory with:

```text
Scenario identity
actor/context
Need
observable result
boundary summary
relations / overlap / split-merge notes
selected/deferred status
```

Selected candidates can then go to `TM-SCENARIO-DRAFT`.

### Boundary / Lesson

Discovery does not yet define every DATA item, Behavior Item, Screen or implementation call.

A Screen action or API operation is not automatically a Scenario.

## Upstream Source Contract

### Direct Semantic Sources
```text
accepted Need / Desired Outcome
accepted Refined Core Real-Life Scenario(s) when Application Definition produced them
otherwise selected Step-02 real-world solution result(s)
selected own-software contribution
accepted Application Definition / Responsibility
Application Concept when useful
```

### Inherited Lineage
```text
Current Reality / Success Meaning
surrounding manual/process/external-system routes
```

### Evidence / Current-State Sources
```text
Prototype findings/candidates
observed workflow/behavior Evidence
```

### Constraint / Planning-State Sources
```text
known Requirements / constraints
upstream accepted tradeoffs / residual planning concerns
```

### Source Discovery Rule
Expected archetype only; current `TF-04 SOURCE_SET` remains authority.


## Knowledge Basis

Shared contract: [`knowledge-basis-contract.md`](../../../idtspe-core/shared/knowledge-basis-contract.md)

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- Scenario Discovery identifies independently useful real application behavior/result paths before detailed Scenario drafting.
- Scenario candidates are bounded by actor/context/result responsibility rather than screen flow or implementation decomposition.
- Discovery output remains candidate inventory until individual Scenario Targets are selected/drafted.

**Referenced Knowledge Owners:**

`NONE`

**Reference Load Policy:**

No additional Knowledge Basis body is required by default; reusable Scenario-boundary evaluation knowledge remains in the Scenario Lens.

**Operationalization Notes:**

This Knowledge Basis supports planning this recurring Target/result family. It is not a current Target Source, project truth or Decision. Reusable cross-Target evaluation knowledge remains in the Lens owners named by this module's `Lens Profile`; do not duplicate their Operational Evaluation Contract or Knowledge Basis here.

## Scope Archetype
A Scenario candidate normally has:
```text
meaningful user-world Need
+ actor-visible behavior/information interaction
+ independently meaningful observable result
```

Not sufficient by itself:
```text
button
command
Screen
API call
database mutation
backend operation
technical procedure
```

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/README.md):
- [`LENS-NEED-VALUE-SCOPE`](../../../idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) — L1.
- [`LENS-AUTHORITY-SOT-REUSE`](../../../idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) — L2.
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../../../idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) — L3; required check may resolve as `no material uncertainty`.
- [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — Documentation / Representation; required materialization-stage check that may resolve as `NO_PERSISTENCE_NEEDED` or implementation-native/existing-owner representation.

Primary reusable Lens Pack(s):
- [`LENS-SCENARIO-BOUNDARY-BEHAVIOR`](../lenses/reusable/LENS-SCENARIO-BOUNDARY-BEHAVIOR.md) — required for Scenario identity/split/merge

Frequent conditional Lens(es):
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — when a quality dimension changes observable behavior/result

## Question Set Examples — Non-Exhaustive

Examples only. Current `TF-06 QUESTION_SET` may add/remove/split/merge questions.

```text
Which independently meaningful user/actor Needs exist inside Application responsibility?
What observable result closes each Need?
Which behaviors are only instrumental steps inside another Scenario?
Which informational/read-only results are independently meaningful?
Which candidates overlap and should split/merge?
Which future possibilities stay Future Scenario Ideas instead of current scope?
```

## Idea Aids
```text
split candidate
merge candidate
informational Scenario
state-changing Scenario
keep as action inside parent Scenario
future/deferred Scenario Idea
```

## Target-Specific Output Template

Generic IDTSPE state is not repeated here.

**Scenario Catalog** — selected/current candidate Scenario identities and statuses.

For each selected/current candidate:

```text
Scenario ID / Name
Actor / context
Need / Goal
Observable Result
Boundary Summary
Core/Secondary relation to Application Definition when useful
Relations / overlap / split-merge notes
Prototype / Evidence provenance when relevant
Status:
  SELECTED_CURRENT | DEFERRED | REJECTED | NEEDS_DETAILED_DRAFT
```

Key meanings:

- **Need / Goal + Observable Result** determine Scenario identity; a command/Screen/backend operation alone is insufficient.
- **Boundary Summary** says what real behavior/result is inside and outside before detailed drafting.
- **Core/Secondary relation** preserves why the Scenario matters to the Application without making Application Definition own its detailed behavior.
- **Relations / split-merge notes** preserve discovery topology; they are not Source authority by themselves.
- **Status** separates selected current Scenarios from future/deferred Ideas.


**Application Responsibility Gaps** — accepted Application responsibility not yet represented by a current Scenario, if any.

**Deferred/Future Scenario Ideas** — do not duplicate them into the Scenario Catalog as selected meaning. Store them in `SDS-PLANNING-STATE/ideas/scenario/IDEAS.md` and reference them only when useful.

## Artifact / File Contract

### Structured Artifact / File Proposals

These proposal records are the Target Module's local placement guidance. [`ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) projects them into the annotated SDS materialization tree; this Target Module remains the source.

```text
ARTIFACT_PROPOSAL
ID: AP-SCNDISC-01
CONTENT_KIND: SCENARIO_INVENTORY
WHEN: selected/deferred Scenario boundaries are needed downstream
GUIDANCE: REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Scenario Discovery Target
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <scenario-inventory-or-discovery-owner>
CONTENT: Scenario candidates; Need/result boundary; split/merge/relations; selected/deferred status
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-SCNDISC-02
CONTENT_KIND: SELECTED_SCENARIO_DETAIL
WHEN: a selected candidate proceeds to detailed drafting
GUIDANCE: PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: selected Scenario Target
REPRESENTATION: UNRESOLVED
FILE_OR_ARTIFACT: <scenario-owner>
CONTENT: detailed Scenario semantics are not duplicated in discovery; create/update through TM-SCENARIO-DRAFT
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

**REQUIRED** — selected/deferred Scenario inventory and boundary decisions that drive later drafting must persist in a Scenario Discovery/inventory owner or stable register/projection selected for the workspace.

**PREFERRED** — keep candidate inventory together while boundaries are still being compared; create separate Scenario owner artifacts only for selected Scenarios that move into detailed drafting/addressability.

**Do not create** separate files for UI actions, API calls or rejected technical pseudo-scenarios.

Deferred/future Scenario ideas that are not selected current Scenarios route to `SDS-PLANNING-STATE/ideas/scenario/IDEAS.md`.

`P-14` must show which candidates become canonical Scenario owners vs remain inventory/Idea entries.

## Validators
```text
every selected Scenario has independent Need/result value
command/UI/implementation identity did not define Scenario identity
selected Application responsibility is covered or explicit gaps remain
split/merge questions resolved or residual
```

## Handoff
Each selected material Scenario → `TM-SCENARIO-DRAFT`.
