# Reusable Vertical Slice Discovery

Status: recommended reusable implementation-discovery guidance
Common reusable model: [`reusable-guidance-model.md`](reusable-guidance-model.md)
Process authority: [`../documentation-use-cases.md`](../documentation-use-cases.md)
Consumed by: DOC-UC-13, DOC-UC-03 and DOC-UC-14.

This file is the single reusable owner of the detailed Feature/Slice Boundary Method.

## Shared Feature/Slice Boundary Method

The method remains signal-based, not numeric.

### Group 1 — Intent / Principal Result

Questions:

```text
What application/user intent does this behavior serve?
Is the intent distinct from an existing Feature?
What is the principal meaningful Result / Result family?
Is this fundamentally a different Result, or the same Result reached another way?
```

Signals:

```text
same intent + same principal Result family
→ strong signal for one Feature/Slice

distinct intent and/or fundamentally distinct Result
→ strong signal for separate Features/Slices
```

### Group 2 — Semantic Entry

Question:

```text
Is this a genuinely distinct semantic application invocation,
or only another transport/input/entry adapter
to an existing semantic operation?
```

A button, URI, CLI option, REST endpoint, manual handoff or automatic trigger does not automatically create a new Feature.

### Group 3 — Realization Cohesion / Shared Structure

Questions:

```text
How much end-to-end realization is genuinely shared?
Can variation localize as a Slice Module / Slice Branch / Entry Adapter?
Would splitting duplicate substantial behavior/orchestration/lifecycle/result handling?
Would merging spread variant-specific branching through most of the path?
Are shared parts real use-case realization or only generic infrastructure?
```

### Group 4 — Development / Proof / Evolution Fitness

Questions:

```text
Which boundary is easier to understand and change locally?
When this use case changes, can most change remain in its Slice?
Would unrelated Slices need edits only because responsibility is smeared?
Which boundary gives clearer local proof?
Would splitting duplicate meaningful E2E/local proof?
Would merging make proof excessively conditional?
What do known Evolution Steps suggest?
Which boundary lets known evolution occur as local extension/module/branch?
Do known changes repeatedly touch the same cohesive realization area?
```

## Boundary decision options

Reusable candidate shapes:

```text
same Feature / same Slice
same Feature + Slice Module
same Feature + Slice Branch
same Feature + Entry Adapter / Entry Variant
separate Feature / separate Slice
extract Shared Implementation Capability
OPEN — insufficient Evidence
```

For each shape include:

- useful when;
- warning signs;
- proof implications;
- evolution implications;
- typical overuse problem.

## End-to-end realization discovery

Questions:

```text
What is the semantic application entry?
What typed semantic arguments/results cross that boundary?
Which UI/entry adapter invokes it?
Which feature-local orchestration belongs in the Slice?
Which Domain owner(s) are invoked?
Which repositories/persistence owners are used?
Which Shared Capabilities are real dependencies?
Which external side effects occur?
Where can partial failure/uncertainty exist?
Where does the meaningful Feature Result become true?
What presentation/result mapping is needed?
```

Requirement candidates:

```text
One Slice should make one Feature's complete meaningful path understandable end to end.
Prefer a simple semantic application-service boundary.
Do not split frontend/backend/database into separate Slices merely by technical layer.
Keep use-case-specific policy in the Slice.
Extract Shared Capability only for genuinely reusable non-end-to-end meaning.
```

## Application service and dependency direction

Questions:

```text
Does the public Slice boundary use semantic typed inputs/results?
Is a CommandBus/dispatcher/mediator solving a real need or only adding ceremony?
Can infrastructure be replaced at a semantic port/seam where proof/evolution needs it?
Does dependency direction keep use-case policy independent of incidental mechanism?
```

Requirement candidates:

```text
Prefer semantic operations over generic execute(command) ceremony
unless generic dispatch is an actual selected capability.

Depend on semantic contracts at boundaries
where implementation substitution/proof requires it.

Do not create an interface for every class without a boundary reason.
```

## Side effects, failure, recovery and retry

Questions:

```text
Which effects are local and reversible?
Which external effects may be uncertain?
What must be persisted before an irreversible/uncertain side effect?
How does retry avoid duplicate effects?
What exact observation reconciles uncertainty?
What state proves an effect already happened?
```

Requirement candidates:

```text
Fence external side effects with enough authority/evidence
to avoid acting on stale or foreign state.

Represent uncertainty explicitly
when an effect may have happened but is not proven.

Retry must reconcile before repeating
an uncertain non-idempotent effect.

Prefer exact semantic identity/evidence
over generic progress flags.
```

Candidate solution variants:

- idempotent operation;
- idempotency key;
- write-ahead uncertainty state;
- exact expected-version/lease;
- reconciliation/observation;
- compensation;
- transactional local mutation;
- durable journal.

For every variant, evaluate risks and proof questions.

## Change locality / Shared Capability extraction

Questions:

```text
If this Feature changes, which files/owners should normally change?
Are several Slices changing only because one reusable technical responsibility is duplicated?
Does the repeated responsibility have coherent reusable meaning?
Would extraction reduce coupling, or create a central god capability?
```

Requirement candidates:

```text
Optimize Slice independence for locality of responsibility and change,
not dependency absence.

Extract Shared Capability only when shared meaning is real.
```

## Proof boundary

Questions:

```text
What whole-Feature path should an integration test exercise?
Which expensive external boundaries can be fake/in-memory?
Which real Domain behavior should remain real?
What forbidden effect must be asserted?
What recovery/retry path is correctness-critical?
What branch convergence must be proven?
```

Requirement candidates:

```text
Feature integration proof should enter through the semantic application-service boundary.

Proof should assert Feature Result,
exact important effects and forbidden effects
rather than private call sequence.
```

## Evolution fitness

Use the same known-Evolution rule as Feature Planning:

```text
known Step
→ ask whether the selected Slice can evolve locally
→ prefer module/branch/adapter/shared extraction when healthy
→ use Forced Migration only when current structure cannot reasonably reach the target
```

---



## Feature owner formation

Feature Planning is not exact class design, but it is implementation-aware enough to avoid choosing an unhealthy behavioral boundary.

DOC-UC-13 should use Vertical Slice guidance before the Slice exists as a detailed implementation plan:

```text
Benefit / candidate behavior
→ Intent
→ Principal Result
→ behavior + BR
→ material implementation concerns
→ consult shared Slice Boundary Method
→ choose Feature boundary
→ establish Slice boundary hypothesis
```

At this stage use mainly:

- intent/result boundary;
- semantic entry vs transport adapter;
- rough realization cohesion;
- likely module/branch/entry-adapter shape;
- known Shared Capability signal;
- proof/change-locality signal;
- known Evolution pressure.

Do not force exact class/method mapping during Feature owner formation.

Later DOC-UC-03 uses the same file and same boundary method with stronger Evidence:

```text
selected Feature
→ whole-Slice implementation discovery
→ repeat boundary method
→ confirm / module / branch / split / merge / reframe
```

One method at two evidence depths.

---
