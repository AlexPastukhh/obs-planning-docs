# Application Definition — Refined Core Real-Life Scenario

Status: active reusable Application Definition guidance  
Owner: `TM-APPLICATION-DEFINITION`

## Purpose

`APPLICATION-DEFINITION` may refine the earlier Step-02 solution result into a more concrete, application-aware real-life scenario after existing-solution/market/reference research and initial Application Concept work.

This result answers:

```text
In real life, how does the actor satisfy the fundamental Need,
where exactly does the Application participate,
what happens outside the Application,
and why is this route preferable to realistic alternatives?
```

It is not yet detailed Application Scenario planning.

```text
Refined Core Real-Life Scenario
≠ Application Scenario
≠ Screen flow
≠ Behavior Item decomposition
≠ implementation flow
```

---

## Relationship To Step-02

Step-02 remains the earlier whole-solution planning result:

```text
Fundamental Need
→ candidate real-world solution routes
→ selected solution/composition / own-software contribution
```

Application Definition can optionally refine that result using newer Evidence:

```text
Step-02 selected solution
+ existing-solution / market / reference research
+ Application Concept candidate(s)
+ Application Responsibility candidate(s)
↓
Refined Core Real-Life Scenario(s)
↓
comparison of realistic real-life routes
↓
selected application-aware core real-life route
```

If this refinement is not useful or is intentionally skipped:

```text
Step-02 selected solution result
remains the direct real-life Source
for Prototype / Scenario Discovery
```

If refinement exists:

```text
Refined Core Real-Life Scenario
becomes the preferred nearest real-life Source

Step-02 remains upstream provenance / inherited lineage
```

This does not erase Step-02 authority or history.

---

## Core vs Secondary Real-Life Scenarios

Application Definition must identify the **core real-life scenarios for which the Application exists**.

Core means:

```text
without supporting this real-life path/result,
the Application would lose a substantial part of its reason to exist
```

A fuller Application Definition may also record secondary/supporting real-life scenarios, including conventional capabilities seen in comparable products, but they must be visibly secondary.

Example:

```text
CORE
  capture important material with minimal interruption
  later recover/review what was captured

SECONDARY
  settings
  export convenience
  account/preferences
  decorative customization
```

Secondary scenarios are not promoted to core merely because competitors provide them.

---

## Real-Life Scenario Shape

A useful refined real-life scenario normally records:

```text
Real-Life Scenario ID / Name
Fundamental Need served
Actor / real-world context
Starting situation
Desired real-world result

Real-life path:
  actor action / situation
  human/manual step
  existing/external service step
  own-Application contribution
  handoff
  final result

Application role
Outside-Application responsibilities
Relevant existing alternatives
Important constraints / friction
Why this route is attractive
Evidence / references
```

Keep the Application behavior high-level. Detailed visible/expected Application behavior belongs later to Scenario planning.

---

## Compare Real-Life Routes, Not Only Product Feature Lists

After market/reference research, compare realistic ways of achieving the same fundamental Need.

Possible route families:

```text
A — manual/current route
B — existing application route
C — existing application + manual workaround
D — own Application Concept A
E — own Application Concept B
F — hybrid/integration route
```

Each alternative should be expressed as an actual real-life path, for example:

```text
Need:
  preserve useful research material without breaking current work

Existing-app route:
  notice material
  → open/read-later tool
  → save/bookmark
  → later search/review there
  → possibly move useful result elsewhere

Own-app concept route:
  notice material
  → low-friction capture
  → temporary holding
  → later focused review
  → selected handoff to long-term destination
```

Compare at least the dimensions that matter to the current Decision:

```text
Need/result fit
actor effort/interruption
friction / convenience
responsibility split
information/context preservation
ownership/privacy/integration constraints
adoption/switching cost
complexity/maintenance cost
important future flexibility
Evidence/confidence
```

This comparison may:

```text
confirm current Application Concept
select another concept
narrow/broaden Application responsibility
select an existing product instead
select hybrid/integration
reopen Step-02
```

---

## Core Scenario Discovery Questions

Examples only:

```text
Which real-life situations make the fundamental Need actually appear?
Which 1–few real-life paths are the main reason this Application should exist?
What result does the actor really want outside the software itself?
What does the actor do before the Application becomes involved?
What should the Application contribute, and what remains human/external?
What happens after the Application contribution ends?
Which existing application or substitute can realize the same real-life path?
How would the real-life path differ under each Application Concept candidate?
Which path is simpler/more useful/more realistic for the actor?
Which secondary paths are useful but not core?
```

---

## Downstream Source Role

When accepted, a refined core real-life scenario is a trusted Source for:

```text
TM-PROTOTYPE
  → what real-world path / interaction hypothesis the experiment should represent

TM-SCENARIO-DISCOVERY
  → which detailed Application Scenarios should exist inside the selected application contribution

TM-SCREEN
  → application-wide journey/topology context when useful

LENS-WORKSPACE-EVOLUTION-ARCHITECTURE / architecture Answer Decisions when material
  → real actor/workflow context behind later evolution pressure
```

It may also be referenced anywhere the **fundamental real-life Need/path** matters, instead of repeatedly reconstructing that context from Step-02.

---

## Validator

```text
core real-life scenarios clearly express why the Application exists
real-world result is not replaced by a software feature/result
Application role is visible but not over-detailed into Application Scenario behavior
realistic existing-product/manual/hybrid routes can be compared in the same real-life terms
secondary scenarios are visibly secondary
market/reference findings influence route comparison rather than merely producing a competitor list
Step-02 remains valid fallback Source when refinement is absent
accepted refined scenario becomes preferred nearest real-life Source when present
```
