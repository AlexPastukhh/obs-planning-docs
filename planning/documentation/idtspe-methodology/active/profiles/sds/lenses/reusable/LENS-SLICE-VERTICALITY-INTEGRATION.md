# LENS-SLICE-VERTICALITY-INTEGRATION — Vertical Slice / Integration

Role: reusable thematic Slice-boundary and end-to-end integration lens  
Primary use: Feature boundary formation, transient Slice Discovery, durable Slice owner review

## Purpose

Own the reusable Feature/Slice Boundary Method and end-to-end realization questions. Optimize for locality of responsibility/change and coherent Feature proof, not dependency absence or technical-layer isolation.

The same method is used at two evidence depths:

## Analysis Surface

**Primary:** Feature/Slice boundary meaning, transient Slice Discovery results, durable Slice-owner responsibility and whole-path realization/proof surfaces.  
**Conditional:** Feature BR, Scenario/Screen participation, Domain/Shared dependencies, side effects/failure/recovery, accepted Decisions/Evidence, selected Evolution and relevant `RG-PRG-*` knowledge entries.  
**Context:** active Work Context/Target and current evidence depth.

## Supported Operations

```text
ANALYZE   — discover/evaluate coherent vertical responsibility and end-to-end path
CHECK     — test boundary, dependency, proof, behavior coverage and change locality
REFINE    — improve candidate/current Slice structure without taking owner authority
CHALLENGE — surface a Finding Candidate when the selected boundary/realization is materially incoherent
```

Registry selection is not execution; use the lighter or stronger evidence depth only when that surface is material.


```text
Feature formation
→ lighter implementation-aware boundary selection

Slice Discovery / durable owner review
→ stronger concrete end-to-end evidence
```

## Boundary Method — Four Signal Groups

The method is signal-based, not numeric.

### Group 1 — Intent / Principal Result

Ask:
- What application/user intent does this behavior serve?
- Is the intent distinct from an existing Feature?
- What is the principal meaningful Result/result family?
- Is this fundamentally a different Result or the same Result reached another way?

Signals:

```text
same intent + same principal Result family
→ strong signal for one Feature/Slice

distinct intent and/or fundamentally distinct Result
→ strong signal for separate Features/Slices
```

### Group 2 — Semantic Entry

Ask whether this is a genuinely distinct semantic application invocation or merely another transport/input/entry adapter to an existing semantic operation.

A button, URI, CLI option, REST endpoint, manual handoff or automatic trigger does not automatically create a Feature.

### Group 3 — Realization Cohesion / Shared Structure

Ask:
- how much end-to-end realization is genuinely shared?
- can variation localize as Slice Module / Slice Branch / Entry Adapter?
- would splitting duplicate substantial behavior/orchestration/lifecycle/result handling?
- would merging spread variant-specific branching through most of the path?
- are shared parts real use-case realization or only generic infrastructure?

### Group 4 — Development / Proof / Evolution Fitness

Ask:
- which boundary is easier to understand/change locally?
- can most change remain within the Slice when the use case changes?
- would unrelated Slices need edits because responsibility is smeared?
- which boundary gives clearer local proof?
- would splitting duplicate meaningful E2E proof?
- would merging make proof excessively conditional?
- what do selected known Evolution Steps suggest?

## Candidate Boundary Shapes

```text
same Feature / same Slice
same Feature + Slice Module
same Feature + Slice Branch
same Feature + Entry Adapter / Entry Variant
separate Feature / separate Slice
extract Shared Implementation Capability
OPEN — insufficient Evidence
```

For a material choice consider when it is useful, warning signs, proof implications, evolution implications and typical overuse.

## End-to-End Realization Discovery

Ask:
- What is the semantic application entry?
- What typed semantic arguments/results cross it?
- Which UI/entry adapter invokes it?
- Which Feature-local orchestration belongs in the Slice?
- Which Domain owners are invoked?
- Which repositories/persistence owners are used?
- Which Shared capabilities are real dependencies?
- Which external side effects occur?
- Where can partial failure/uncertainty exist?
- Where does the meaningful Feature Result become true?
- What presentation/result mapping is needed?

Reusable candidates:
- one Slice should make one Feature's complete meaningful path understandable end to end;
- prefer a simple semantic application-service boundary;
- do not split frontend/backend/database into separate Slices merely by layer;
- keep use-case-specific policy in the Slice;
- extract Shared capability only for genuinely reusable non-end-to-end meaning.

## Application Service / Dependency Direction

Ask whether public Slice boundaries use semantic typed inputs/results; whether dispatcher/mediator ceremony solves a real need; whether infrastructure can be replaced at a semantic seam when proof/evolution requires it; and whether dependency direction keeps use-case policy independent of incidental mechanism.

Prefer semantic operations over generic dispatch unless generic dispatch is an actual selected capability. Do not create an interface for every class without a boundary reason.

## Side Effects / Failure / Recovery / Retry

Ask:
- which effects are local/reversible?
- which external effects may be uncertain?
- what must be persisted before irreversible/uncertain effect?
- how does retry avoid duplicate effects?
- what observation reconciles uncertainty?
- what state proves an effect already happened?

Reusable candidates:
- fence external effects with enough authority/evidence to avoid stale/foreign action;
- represent uncertainty explicitly when an effect may have happened but is unproven;
- reconcile before repeating uncertain non-idempotent effects;
- prefer exact semantic identity/evidence over generic progress flags.

Candidate mechanisms: idempotent operation, idempotency key, write-ahead uncertainty state, expected-version/lease, reconciliation/observation, compensation, transactional local mutation, durable journal.

## Change Locality / Shared Extraction

Ask whether several Slices change because the same reusable responsibility is duplicated, whether that responsibility has coherent reusable meaning, and whether extraction reduces coupling or creates a central god capability.

Optimize Slice independence for locality of responsibility/change, not dependency absence. Extract `TM-SHARED-IMPLEMENTATION-CAPABILITY` only when genuine shared meaning and consumer need exist.

## Proof Boundary

Ask:
- what whole-Feature path should integration proof exercise?
- which expensive external boundaries may be fake/in-memory?
- which real Domain behavior should remain real?
- what forbidden effect must be asserted?
- which recovery/retry path is correctness-critical?
- what branch convergence must be proven?

Feature integration proof should enter through the semantic application boundary and assert meaningful Feature result, important effects and forbidden effects rather than private call sequence.

## Evolution Fitness

```text
known selected Step
→ ask whether the Slice can evolve locally
→ prefer module/branch/adapter/shared extraction when healthy and actually needed
→ Forced Migration only when current structure cannot reasonably reach the target
```

Known change is evidence, not current future-scope implementation.

## Two Evidence Depths

### During Feature formation

Use mainly intent/result boundary, semantic-entry vs transport distinction, rough realization cohesion, likely module/branch/adapter shape, Shared signal, proof/change-locality signal and known Evolution pressure. Do not force exact class/method mapping.

### During Slice Discovery / owner review

Walk the whole concrete path and repeat the same method with stronger evidence. The outcome may confirm, module, branch, split, merge or reframe the Feature/Slice boundary through normal Proposal/revalidation.

## Output / Disposition

The Lens may KEEP, REFINE, CHALLENGE or leave OPEN a boundary, surface Shared/Domain pressure or produce Finding/Proposal pressure. It does not directly mutate accepted Feature/Slice owner meaning.

## Guards

```text
vertical Slice ≠ technical layer
Slice independence ≠ zero dependencies
entry adapter ≠ new Feature automatically
shared code ≠ Shared Capability automatically
proof ≠ private call-sequence lock-in
Lens decision pressure ≠ direct owner mutation
```

## Reusable Guidance Semantics

This Lens follows `../../shared/reusable-guidance-model.md`: reusable questions / `RG-*` / `RR-*` / `RRC-*` / patterns are discovery guidance only; selected owner-local `IR-*` meaning is independently approved and never live-inherits later reusable-guidance edits.

## Behavioral Coverage

Preserve the old Strategy bidirectional check without a Strategy Target:

```text
material accepted Feature behavior
→ selected Slice responsibility OR explicit deferred/outside position

selected Slice behavior/result claim
→ grounded in accepted Feature behavior/result
```

A coverage gap is a Finding; implementation planning must not invent product behavior.

## Owner / Addressability Bridge

Each durable Slice/Shared owner keeps semantic identity independent of file topology.

The profile may maintain a derived/working relation view:

```text
Feature/BR → Slice
Slice → Domain owner
Slice IR → Shared binding
owner identity → current representation
```

This is coordination/navigation, not a semantic Result owner.

## Finding Contract

Material findings may include:
- wrong Feature/Slice boundary;
- horizontal-only decomposition;
- missing behavior coverage;
- ungrounded Slice claim;
- poor change locality;
- misplaced Domain/Shared responsibility;
- side-effect/retry/uncertainty weakness;
- proof boundary weakness;
- Evolution pressure.

Route them through Core Finding Disposition to the natural owner.

## Typical Consumers

Feature formation, Slice Discovery, durable Slice owner, Shared extraction/classification, Domain interaction review, Evolution review and implementation/proof planning.

## Knowledge Basis

Primary reusable theory bridge:

- [`../../shared/reusable-guidance-model.md`](../../shared/reusable-guidance-model.md) for contextual use of reusable guidance;
- [`../../../../../../tools/replacement-package-app/methodology-guidance/reusable-vertical-slice-discovery.md`](../../../../../../tools/replacement-package-app/methodology-guidance/reusable-vertical-slice-discovery.md) as the R2 Vertical Slice source corpus retained for migration provenance/coverage;
- [`../../shared/programming-principles/README.md`](../../shared/programming-principles/README.md) for selective principle drill-down when boundary, state, failure, dependency or execution triggers are material.

Accepted Feature/Domain/Shared/Evolution meaning and current implementation evidence are Analysis Surface/Target Inputs, not Knowledge Basis.

## Artifact / File Implications

`NONE_DIRECT` by default.

Working Slice Discovery is non-persistent by default. Durable Slice/Shared owner representation is resolved by the Core Artifact Boundary Lens. A cross-Slice coverage/map view may be generated/embedded when independently useful but remains derived.

## Composition / Escalation

Compose with DDD for semantic Domain ownership, IR Discovery for durable constraints, Programming Principles knowledge for generic implementation quality, UI/spatial for frontend realization, Evolution for known change, Simplicity for cost and Test Proof for proof quality.
