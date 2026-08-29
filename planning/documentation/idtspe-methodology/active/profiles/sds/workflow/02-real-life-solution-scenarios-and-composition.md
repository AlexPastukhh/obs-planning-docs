
# Phase 02 — Real-Life Solution Discovery / Route Comparison — Generic

Status: active generic orchestration phase  
Primary Source: accepted Phase-01 Need / Reality result

## Purpose

Explore how the Fundamental Need can actually be achieved in real life before assuming that an own Application is the answer.

```text
Need / Reality
↓
dynamic Target Formation
↓
one or more material real-life route/scope Targets
↓
full IDTSPE per Target
↓
selected real-life result(s)
↓
optional material composition
↓
downstream Source package
↓
possible own-software contribution
```

Valid result:

```text
no own Application needed
```

## Inputs

Typical Phase-01 Sources:

```text
Fundamental Need
Desired Real-World Outcome
Current Reality
Current Workflow(s)
existing valid-but-unsatisfactory routes
Pain / Gap / Pressure
Success Meaning
Evidence
Constraints
Open Solution Slots
material residual Q/R/P
already-mentioned Ideas
```

These are Sources, not notes to rewrite.

## No Fixed Real-Life-Solution Target Type

Phase 02 does not require a globally fixed real-life-solution Target Type.

Instead `TARGET_FORMATION_RESOLUTION_SET` decides what bounded Targets are actually useful.

Possible Targets:

```text
one real-life route comparison
one bounded situation/result
one evidence/constraint question
several parallel route/scope Targets
one material composition Target
```

A simple situation may need only one Target.

## Discovery Questions — Examples Only

```text
In which real-world situations is the Desired Outcome pursued?
What independently meaningful result is needed in each?
What current/manual/external routes already work partly?
Where is the actual gap?
Which parts can be decided independently?
Which routes are alternatives vs sequential/parallel?
Where might existing software already solve the problem?
What evidence is needed before choosing?
```

These seed the normal Question-Set Decision; they are not exhaustive.

## Relations

Use current Target topology vocabulary:

```text
PART_OF
PARALLEL_WITH
PRECEDES
FLOW_TO
OVERLAPS_WITH
ALTERNATIVE_TO
CONTRIBUTES_TO
```

`FLOW_TO` means topology only.

If an accepted output truly constrains a later Target, declare it separately as a Source.

## Full IDTSPE Per Material Target

Each material Target uses normal shell:

```text
Target/Scope
Sources
Question Set
Lens Set
Ideas
Q/R/P
optional Planning Branches
Answer Decisions
target-specific/local output
validators
handoff
revalidation
```

L1-L3 are required checks. Other Lenses are activated by the Target/context.

## Optional Material Composition

Do **not** create a composition Target merely because several Targets were planned.

Mechanical case:

```text
accepted Target A
accepted Target B
↓
downstream Source package contains both
```

No new Target.

Create a composition Target only when composition itself has unresolved decisions:

```text
Which combination should be accepted?
Can selected routes coexist?
What order/handoff is required?
Which responsibility belongs to whom?
Does one route make another unnecessary?
```

That composition is an ordinary dynamically formed IDTSPE Target, not a mandatory special phase type.

## Own-Software Contribution

Only after enough real-life route reasoning ask:

```text
What useful part of the selected real-world solution
should our own Application own, if any?
```

Possible outcomes:

```text
no Application
use existing application
integrate/adapt existing solution
small own-software contribution
larger own Application contribution
several application candidates requiring later Application Definition comparison
```

## Downstream Source Package

Typical accepted output:

```text
Fundamental Need ref
selected real-life route/result(s)
key actor/manual/external responsibilities
accepted alternatives/rejections
important Evidence/constraints
own-software contribution — if selected
residual Q/R/P
revalidation signals
```

This package can be a direct Source for `TM-APPLICATION-DEFINITION`.

Application Definition may later produce a more refined application-aware real-life core scenario. If so, that later refined owner becomes the nearest Source for Prototype/Scenario Planning while Step-02 remains lineage.

## High-Level Example A — No Composition Target

Need:

```text
remember useful research fragments without losing current work context
```

One Target compares:

```text
browser bookmark
copy into notes
existing read-later app
custom low-friction capture
```

Accepted result:

```text
temporary low-friction capture + later review
```

No additional composition choice exists.

```text
accepted route
→ directly becomes Source for Application Definition
```

## High-Level Example B — Several Real-Life Targets

Need:

```text
complete an on-site service request reliably
```

Material real-life scopes:

```text
T-INTAKE
T-APPOINTMENT
T-VISIT
T-ACCEPTANCE
```

Topology:

```text
T-INTAKE FLOW_TO T-APPOINTMENT
T-APPOINTMENT FLOW_TO T-VISIT
T-VISIT FLOW_TO T-ACCEPTANCE
```

They may be planned separately because each has a meaningful result.

If their outputs fit together mechanically:

```text
no composition Target
```

If two competing combinations exist, e.g.:

```text
central coordinator workflow
vs
technician-owned direct scheduling
```

then composition itself is a material Target and receives full IDTSPE.

## High-Level Example C — Existing App Wins

Need:

```text
shared team task reminders
```

Research discovers an existing application that satisfies:

```text
Need
privacy
integration
cost
ownership
```

well enough.

Phase-02 result:

```text
use existing product
no own-software contribution
```

Downstream Application Definition may be skipped entirely.
