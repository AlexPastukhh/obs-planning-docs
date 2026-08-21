# Workspace Use Cases And Change Pressure

Status: active reusable Architecture Planning semantic owner
Scope: architecture-specific Workspace-work, Work-Path, Extension and change-pressure concepts. Generic Workspace Use-Case identity/contract remains owned by the reusable Direction/Use-Case registry methodology.

Generic UC identity/contract: [`../direction-and-use-case-registry-workflow.md`](../direction-and-use-case-registry-workflow.md)
Canonical establish/change/topology planning for Workspace UCs: [`../workspace-planning/direction-registry.md`](../workspace-planning/direction-registry.md)

## Workspace Use Case — Architecture Input View

Resolve current canonical Workspace UC identity/contracts from the applicable Use-Case Registry and generic registry methodology. Architecture Planning consumes those UCs as work evidence and may discover evidence-backed **candidate useful results** for architecture analysis; it does not canonically establish/change UC identity itself.

Architecture-relevant Workspace work is not restricted to mutation. Examples include:

```text
change/write
→ add endpoint
→ change business rule
→ update canonical documentation meaning

read/understand
→ understand how authorization works
→ find the canonical owner of a rule
→ understand why an Architecture Decision exists

inspect/review
→ review current architecture
→ trace affected owners

diagnose/operate
→ diagnose a failed request
→ inspect operational state

verify
→ verify an invariant
→ check repository consistency
```

Frequency/repeatability is architecture-analysis evidence, not a reason to redefine UC identity. Record frequency/relevance only when it changes architecture reasoning.

Application Scenarios remain application-behavior owners in Application Planning; Workspace Use Cases describe work with the Workspace itself.

## Workspace Change Case

A `Workspace Change Case` is a concrete significant architecture-relevant Workspace change that may be rare or one-off and therefore is not necessarily a stable Workspace Use Case, for example replacing one storage mechanism, performing a major refactor or splitting a deployment.

## Extension

An `Extension` is additional/later scope outside the selected current baseline.

```text
Variant
= mutually exclusive answer for the same current target

Extension
= additional/later capability beyond current baseline
```

Useful confidence/status vocabulary:

```text
Planned Extension
Likely Extension
Possible Extension
Speculative Possibility
```

For architecture reasoning, do not treat an Extension as a bare label. Ask proportionally:

```text
What candidate future useful results / Workspace UCs appear?
Which current canonical Workspace UCs may change?
Which future Application Scenarios / Requirements appear when applicable?
What expected Workspace Work Paths follow?
```

An Extension may be largely expressible through future Workspace-UC candidates, but no mechanical 1:1 decomposition is required. When a candidate must become canonical planning meaning, hand it to the applicable Workspace Planning Establish/Change/Topology owner.

## Workspace Work Path

A `Workspace Work Path` is the concrete path through the Workspace required to obtain one Workspace-UC result.

Primary kinds:

```text
Workspace Understanding Path
→ what must be found/read/connected/understood

Workspace Change Path
→ what must be understood/changed/verified/migrated/operated
```

A path may expose semantic owners touched, state authorities, boundaries crossed, synchronized edits, external dependencies, migrations, verification surface, operational consequences, Discoverability, Comprehension Cost and Working-Context Load.

Raw step/file count is a signal, not an architecture score.

## Runtime Realization Path

For executable application behavior, Architecture Planning may also consume:

```text
Application Scenario
→ Runtime Realization Path
→ what the system must actually do
```

Relevant observations include Domain concepts/state mutations, invariant checks, local/remote calls, DB reads/writes, transaction boundaries, failure points, concurrency, branching, algorithm/data-volume complexity and verification points.

Twelve local calls are not automatically complex; distributed mutation through several remote/process boundaries may be materially complex with fewer steps.

## Change Pressure

Change Pressure is evidence about where important current/expected Workspace work creates architecture cost or risk.

Core surface:

```text
Workspace UC
+ frequency / current relevance
+ representative Work Path

Workspace Change Case
+ importance / probability
+ expected Change Path

Extension
+ planning/confidence status
+ expected future UCs
+ expected paths

Requirements / Constraints
+ observed history when useful

→ Change Pressure
```

The point is not only `what can vary?` but `where does important work/change effort concentrate?`.

## Change Axis

A `Change Axis` is a material generalized dimension along which Workspace meaning, behavior, mechanism or structure may vary.

Evidence may come from recurring Workspace-UC paths, Workspace Change Cases, Planned/Likely Extensions, observed history and Requirements/constraints.

```text
Change Path
= concrete path of one change through current Workspace

Change Axis
= generalized dimension of variability evidenced by one or several paths/cases/extensions
```

The relationship is many-to-many: several paths may evidence one axis and one path may cross several axes.

Critical invariant:

```text
Change Axis exists
≠ abstraction required everywhere

material Change Axis crosses this decision/boundary
→ architecture pressure here
```

## Workspace Change Hot Path

A `Workspace Change Hot Path` is an area crossed by many important/frequent Workspace UCs and/or high-confidence material Change Axes. Change locality has especially high value there.

A complicated area that is correct, rarely touched and crossed by no material current/future pressure may remain a low refactoring priority.
