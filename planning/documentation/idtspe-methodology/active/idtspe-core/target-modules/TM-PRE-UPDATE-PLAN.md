<a id="tm-pre-update-plan"></a>
# TM-PRE-UPDATE-PLAN — Pre-Update Plan

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Decision record retention](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-decision-retention) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`.
> - `CONTEXTUALIZES` [PRS Decision admission / exit](TM-PLANNING-RESOLUTION-STATE.md#ru-prs-02--tracked-decisions) — `RESOLUTION.CARRY-FORWARD`.

Entry Point: `tm.pre.update`
Role: generic Core optional Target Module
Target family / archetype: `PRE_UPDATE_PLAN`

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `TARGET-MODULE.META-MODEL`
> Owner: [Target Module Meta-Model](TARGET-MODULE-MODEL.md#target-module-meta-model)


## Purpose

Before actually changing code/files/configuration/another destination, produce one **concrete update plan** from the current accepted context and current state.

The module is intentionally light. It does not reopen already-settled design merely to make a plan and it does not require a new taxonomy of planning fields.

```text
current request
+ accepted prior meaning / Decisions / principles
+ relevant current destination state
↓
ordinary IDTSPE Questions / Risks / Problems / Proposals / Evidence only where useful
↓
RU-PUPDATE-01 Pre-Update Plan
↓ optional
TM-EXACT-REALIZATION / another actual update mechanism
```

## Activation / Scope Gate

Use when the useful requested result is approximately:

```text
"before changing it, tell me exactly what you plan to update"
"make a pre-update plan"
"show the planned changes first"
```

Skip it when the requested change is already sufficiently tiny/obvious and the user wants direct Exact Realization/application.

Do not use it as a mandatory gate before every implementation.

## Source Contract

Use only materially relevant current sources, typically:

```text
user's current update request / Goal
accepted results/Decisions/principles from prior work
current Target/context when one exists
current code/files/configuration/destination state that the plan actually depends on
known Evidence / failures / constraints relevant to the change
```

Do not invent a new design baseline when accepted upstream meaning already exists. If a material source is missing, surface the real Question/Problem instead of guessing the plan.

Current `SOURCE_AUTHORITY` Requirement remains authority for the concrete Target.

## Automatic IDTSPE Reasoning Around The Plan

Use ordinary Core State automatically when it helps resolve the plan:

```text
current context / accepted meaning
→ Question when something consequential is unknown
→ Risk / Problem when a material failure mode or contradiction exists
→ candidate Proposals/options only when a real choice exists
→ Evidence/current-state facts
→ Decision when a choice is actually selected
→ Pre-Update Plan
```

This reasoning is **not the Result schema** and need not be dumped visibly as `Q1/R1/P1/E1` blocks.

Simple case:

```text
accepted architecture already determines the change
→ no meaningful alternative
→ produce the plan directly
```

Choice case:

```text
Goal:
  replace persistence adapter without changing Domain behavior

Question:
  where does the current transaction boundary live?

Evidence:
  current service owns it outside the adapter

Proposal A:
  replace adapter implementation only

Proposal B:
  move transaction ownership into adapter

Risk B:
  changes accepted architecture responsibility

Selected meaning (Decision semantics; no separate retained record in this example):
  A

Pre-Update Plan:
  replace adapter implementation
  preserve service-owned transaction boundary
  update wiring
  update relevant integration proof
  build/test
```

Generic Questions/Proposals/Q/R/P/Decisions/Evidence remain Core State. Do not create Target-specific copies of them.

## Unit Definition Conformance

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `TWU.UNIT-CONTRACT`
> Owner: [Target Work Unit contract](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-unit-contract)

Each declared Result Unit is a Module-defined Unit Definition under the canonical Target Work Unit contract. This concrete Module owns only its Target-family-specific Unit definitions/deltas; generic simple/composite/runtime projection and Core State semantics remain with their Core owners. A material Proposal selection has Core Decision semantics. Any separate record follows the linked Core retention contract; this Target Module owns only its result shape, not another Decision lifecycle.

## Target Step-Result Contract

**Target Step Result:** `Pre-Update Plan`

| Result Unit | Meaning |
|---|---|
| `RU-PUPDATE-01` | Pre-Update Plan — concrete planned changes derived from current accepted meaning/current state, sufficient for review before actual update |

### `RU-PUPDATE-01` Unit Definition

**Responsibility.** Resolve the concrete bounded set of intended changes, preserves and verification implications before mutation.

**Purpose.** Provide an independently reviewable update plan when planning value justifies a separate pre-update Target, without turning the plan into implementation authority.

**Result Content Contract.** One actionable plan that states the accepted basis, intended change scope, material preserve/must-not-change boundaries, dependencies/order when material, verification/checks and consequential unresolved issues. When the destination is a set of files or other addressable artifacts, express the intended changes as reviewable proposed operation entries: exact affected path/identity (source and destination for `MOVE`), `ADD` / `CHANGE` / `REPLACE` / `DELETE` / `MOVE` as applicable, natural owner, intended content or semantic delta, driver (accepted meaning, Finding, or linked Proposal), material preservation boundary, and the check that would establish the result. Keep a stable local entry reference when an entry must be discussed, revised or traced across review. An entry proposes a destination operation; it is not automatically a formal IDTSPE Proposal or permission to perform that operation.

**Collection Definition — `PUPDATE-OPERATIONS`.** For addressable file/artifact destinations, the proposed operation entries above form one Collection (`0..N`) with that common Item Contract. Preserve a stable local Item Key when an operation is independently referenced. A checked no-change plan may establish zero operations; unknown operations keep the result unresolved and must not be reported as an established empty set. Shared basis, order and overall preservation/verification remain ordinary plan content. Other destination kinds use the same bounded plan responsibility without manufacturing file entries.

This Unit is simple by default and does not require a Unit Resolution Set merely because the plan has several content headings. Introduce terminal Slots only if one sub-responsibility actually needs independent status/guidance/reopen tracking while remaining inside this same plan Responsibility.

### Result Unit Applicability / Materiality

Apply the Core [`Unit Applicability / Materiality / Disposition Contract`](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-disposition).

| Result Unit | Substantive resolution is material when | Target/Unit disposition when not material |
|---|---|---|
| `RU-PUPDATE-01` | when the concrete update plan requires substantive resolution in the current context | keep the formed Unit visible with explicit omission and its reason when not applicable/material, under Core disposition; before Target formation, the activation gate may instead conclude that no separate Target is useful |

When this Target is formed, its Module-defined Unit remains declared. Do not use a bare `N/A`; if substantive Unit work is not material, record a concise explicit omission disposition. The whole Target may still be skipped when its Target-level activation gate is not met.

Typical proportional content:

```text
Goal
Current basis / accepted meaning used
Change scope
Preserve / must-not-change boundary
Planned changes
  For files/artifacts: proposed operation entries with destination, action, delta,
  basis/driver, preservation boundary and verification
Order / dependency only when material
Verification / checks after update
Open material issue only when unresolved and consequential
```

These are useful content prompts, not mandatory form fields. A tiny plan may be a few bullets.

One formal IDTSPE Proposal may justify several proposed operation entries, and one operation entry may depend on more than one accepted decision. Link the entries to formal Proposals when those Proposals exist; do not manufacture one Proposal or Decision per file.


### Explicit Unit Checkpoint Placement

Each material Unit below inherits the generic [`Unit Applicability Envelope`](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-envelope). Opening/Closing are mandatory logical applicability boundaries; registries may also be checked during Unit work whenever new material pressure appears. For `RU-PUPDATE-01`, both boundaries explicitly scan/reuse the Core Lens Registry and any active-profile Lens Registry; frequent Lens candidates remain those named in this module's Lens Profile.

#### `RU-PUPDATE-01` processing envelope

1. **Opening Unit Checkpoint — `RU-PUPDATE-01`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-PUPDATE-01`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-PUPDATE-01`** — evaluate the actual candidate Current Result Content, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

## Resolution / Production Method

### 1. Resolve the real update boundary

Identify what the user actually wants changed and what accepted meaning must be preserved.

### 2. Inspect only necessary current state

Read the files/code/configuration/current owner state the update plan truly depends on. Do not plan from stale remembered structure when exact current state matters.

### 3. Resolve consequential choices proportionally

Apply ordinary Q/R/P/Evidence + Proposals/Decision only where a real choice, uncertainty or risk affects the plan.

### 4. Produce the concrete plan

Prefer actionable planned changes over another layer of abstract methodology prose. For a file destination, name the concrete file operations before mutation; if an exact path cannot yet be known, expose the unresolved basis and identify the bounded path-selection rule rather than inventing a path.

Bad:

```text
1. analyze architecture
2. update implementation
3. test thoroughly
```

Better:

```text
1. replace PaymentGatewayAdapter implementation behind the existing port
2. keep PaymentService transaction ownership unchanged
3. update DI wiring to the new adapter
4. replace provider-specific integration fixture
5. run adapter integration tests + payment Slice tests
```

File-destination projection of the same plan:

| Entry | Action | Destination / owner | Proposed delta and basis | Preserve | Verify |
|---|---|---|---|---|---|
| `PUP-01` | `CHANGE` | `src/adapters/PaymentGatewayAdapter.ts` / adapter owner | replace provider implementation under the accepted port contract | service-owned transaction boundary | adapter integration tests |
| `PUP-02` | `CHANGE` | `src/wiring/payments.ts` / composition owner | bind the new adapter selected by the same accepted meaning | existing service API | payment Slice tests |

These are proposed file operations inside `RU-PUPDATE-01`, not separate formal Proposals and not an exact patch.

### 5. Stop before mutation

The Pre-Update Plan itself is read-only planning. Actual mutation belongs to Exact Realization or another explicitly authorized host/update workflow.

## Lens Profile

Generic required Core Lens pack is inherited from the Core Lens Registry.

Frequent conditional Core Lenses:
- [`LENS-DEPENDENCY-CHANGE-IMPACT`](../lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md) — when change impact/dependencies are material.
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — when credible post-update checks/observation need thought.
- [`LENS-QUALITY-RISK-MATERIALITY`](../lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — when the update carries a material quality/risk dimension.

An installed profile may add its own simplicity/domain/UI/etc Lens when actually applicable. No special Pre-Update Lens is required.

## Relationship To Exact Realization

```text
TM-PRE-UPDATE-PLAN
→ what concrete changes we intend to make

TM-EXACT-REALIZATION
→ exact code/patch/artifact that makes those changes real
```

Example:

```text
Pre-Update Plan:
  add SourceContext to reconstruction path
  preserve Aggregate non-null invariant
  handle legacy null in persistence mapping
  add regression integration proof
  build/test

Exact Realization:
  literal changed files / patch / exact tests
```

A Pre-Update Plan may hand off to Exact Realization, but neither Target is mandatory merely because the other exists.


The generic exact-planning procedure used while developing an Exact Realization does **not** automatically instantiate `TM-PRE-UPDATE-PLAN`.

Use this Target only when its own result is useful: a concrete reviewable plan of intended changes before update. Exact Realization may perform deeper transient implementation planning internally without producing `RU-PUPDATE-01`.

<a id="artifact--file-contract"></a>
## Artifact / File Contract

```text
ARTIFACT_PROPOSAL
ID: AP-PUPDATE-01
CONTENT_KIND: PRE_UPDATE_PLAN
WHEN: the reviewed plan has continuing handoff/review value beyond the current conversation
GUIDANCE: OPTIONAL
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: EMBED_OR_PLACE
SEMANTIC_OWNER: current Pre-Update Plan Target / existing change owner when one exists
REPRESENTATION: CONVERSATIONAL_BY_DEFAULT_OR_EXISTING_OWNER
CONTENT: concrete intended changes, including addressable proposed file/artifact operations when applicable, + preserve boundary + material verification/open issue; no exact code mirror
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

Default representation is conversational/current planning state. Do **not** create a Markdown file just because a Pre-Update Plan Target exists.

Persist the plan only when it has continuing review/handoff value. Prefer an existing current owner/change artifact when one already provides a natural durable location.

## Guards

```text
Pre-Update Plan ≠ mandatory step before every change
Pre-Update Plan ≠ exact code/patch
Pre-Update Plan ≠ permission to mutate destination
accepted prior meaning ≠ something to redesign automatically
QRPE reasoning ≠ mandatory visible form
missing consequential source ≠ permission to guess
```

## Handoff

```text
accepted Pre-Update Plan
→ TM-EXACT-REALIZATION when an exact directly integrable result is next
→ another explicit update mechanism when the subject is not Exact Realization work

material newly discovered semantic/architecture conflict
→ Finding Candidate / Core Finding Disposition / upstream revalidation as needed
```

## Further worked example

Read the [bounded worked case](../examples/review-proposal-pre-update/pre-update-plan.example.md) for Sources, Unit results, consequences and completion boundaries. Its declared historical/illustrative basis remains explanatory, not current semantic authority.
