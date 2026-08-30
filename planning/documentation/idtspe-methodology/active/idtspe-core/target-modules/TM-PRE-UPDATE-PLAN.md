# TM-PRE-UPDATE-PLAN — Pre-Update Plan

Entry Point: `tm.pre.update`  
Role: generic Core optional Target Module  
Target form: `PRE_UPDATE_PLAN`

## Purpose

Before actually changing code/files/configuration/another destination, produce one **concrete update plan** from the current accepted context and current state.

The module is intentionally light. It does not reopen already-settled design merely to make a plan and it does not require a new taxonomy of planning fields.

```text
current request
+ accepted prior meaning / Decisions / principles
+ relevant current destination state
↓
ordinary IDTSPE Questions / Risks / Problems / Ideas / Evidence only where useful
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

Current `TF-04 SOURCE_SET` remains authority for the concrete Target.

## Automatic IDTSPE Reasoning Around The Plan

Use ordinary Core State automatically when it helps resolve the plan:

```text
current context / accepted meaning
→ Question when something consequential is unknown
→ Risk / Problem when a material failure mode or contradiction exists
→ candidate Ideas/options only when a real choice exists
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

Idea A:
  replace adapter implementation only

Idea B:
  move transaction ownership into adapter

Risk B:
  changes accepted architecture responsibility

Decision:
  A

Pre-Update Plan:
  replace adapter implementation
  preserve service-owned transaction boundary
  update wiring
  update relevant integration proof
  build/test
```

Generic Questions/Ideas/Q/R/P/Decisions/Evidence remain Core State. Do not create Target-specific copies of them.

## Target Step-Result Contract

**Target Step Result:** `Pre-Update Plan`

| Result Unit | Meaning |
|---|---|
| `RU-PUPDATE-01` | Pre-Update Plan — concrete planned changes derived from current accepted meaning/current state, sufficient for review before actual update |

Typical proportional content:

```text
Goal
Current basis / accepted meaning used
Change scope
Preserve / must-not-change boundary
Planned changes
Order / dependency only when material
Verification / checks after update
Open material issue only when unresolved and consequential
```

These are useful content prompts, not mandatory form fields. A tiny plan may be a few bullets.

## Resolution / Production Method

### 1. Resolve the real update boundary

Identify what the user actually wants changed and what accepted meaning must be preserved.

### 2. Inspect only necessary current state

Read the files/code/configuration/current owner state the update plan truly depends on. Do not plan from stale remembered structure when exact current state matters.

### 3. Resolve consequential choices proportionally

Apply ordinary Q/R/P/Evidence + Ideas/Decision only where a real choice, uncertainty or risk affects the plan.

### 4. Produce the concrete plan

Prefer actionable planned changes over another layer of abstract methodology prose.

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
CONTENT: concrete intended changes + preserve boundary + material verification/open issue; no exact code mirror
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
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
