# SDS Planning Context — Per-Scenario Owner

Status: active generic working model  
Scope: one concrete SDS planning run/context following the profile-directed graph; not a rigid sequential phase script.  
Not global methodology governance.

---

# 1. Purpose

A multi-Target SDS planning run may need a durable owner for information that is:

```text
important across several Targets
but
does not semantically belong to any one Target
```

Examples:

```text
which planning route/topology was selected
which SDS profile is active
which Target types/stages are currently planned
current/next Target
which stages were skipped/deferred/inserted
scenario-level navigation
cross-target planning concerns
planning-route Decisions
links to carry-over Ideas for later Targets
links to material Target Decisions
```

Working owner:

```text
SDS-PLANNING-CONTEXT.md
```

This is **per planning scenario / per application planning run**.

It is not:

```text
global methodology governance
Application semantic authority
Decision Portfolio duplicate
Future Ideas store
```

---

# 2. Relationship To Target Owners

Target owners remain authoritative for their own semantics.

Example:

```text
Need Target
→ owns Need / Reality meaning

Whole-Solution Target
→ owns selected Solution meaning

Scenario Target
→ owns Application behavior

Domain Target
→ owns Domain meaning

Slice Target
→ owns Slice realization meaning
```

`SDS-PLANNING-CONTEXT.md` stores only planning-context state and references.

It should not copy full Scenario/Domain/Slice bodies.

---

# 3. Scenario-Level Planning Decisions

These are decisions about **how this particular SDS planning scenario is being run**.

Examples:

```text
use SDS planning topology for this application

use Full physical profile

plan:
  Need
  Whole Solution
  Application Concept
  Application Responsibility
  Prototype
  Scenario Planning
  detailed Scenarios
  optional Domain
  Slice Strategy
  WEUC / Architecture
  Slice
  verification
  realization / reconciliation

skip Prototype unless interaction uncertainty appears

create/refresh `SDS-WORKSPACE-EVOLUTION.md` through `TM-WEUC` once Workspace-evolution interpretation is materially useful

create a separate carry-over Ideas file for this planning scenario
```

These are not a new fourth generic Decision type.

If a planning-route choice is material enough to deserve IDTSPE treatment:

```text
Planning Context / Planning Topology
can itself be the Target

→ Target-Scope Decision
→ Question-Set Decision
→ Answer Decision(s)
```

Most small navigation choices can simply be recorded as accepted planning-context decisions without manufacturing a large sub-workflow.

---

# 4. Suggested Literal Shape

```text
SDS PLANNING CONTEXT

Identity
Status

Planning Goal / Application Area

Selected Planning Direction
  SDS / another topology

Physical Profile
  Mini | Modular | Full
  # physical/addressability only

Current Planning Topology
  ordered Target types / phases

Current Target

Next Candidate Target(s)

Completed Targets
  refs + status only

Deferred / Skipped Targets
  reason

Inserted / Reopened Targets
  reason / trigger

Scenario-Level Planning Decisions
  refs / concise current state

Scenario-Level Planning Concerns
  only concerns whose subject is the planning route/topology itself

Carry-Over Ideas
  link to SDS-PLANNING-STATE/ideas/

Material Cross-Target Decision References
  navigation refs only

Current Global Handoffs
  WEUC
  testing
  artifact/file pack
  other subflows

Revalidation / Re-route Triggers

Navigation
```

---

# 5. What Belongs Here

Good examples:

```text
Decision:
  this application will use the SDS planning topology

Decision:
  Prototype is inserted before Scenario Planning
  because interaction uncertainty is material

Decision:
  Domain planning is currently conditional;
  run Domain Discovery after Scenario decomposition

Decision:
  a dedicated `SDS-WORKSPACE-EVOLUTION.md` interpretation is now justified
  because several architecture Decisions share durable instances

Concern:
  current Target order may be wrong if high-level realization
  disproves the persistence assumption
```

---

# 6. What Does Not Belong Here

Do not store:

```text
Scenario behavior body
Domain entities/invariants
Requirement body
Slice implementation coverage
full Architecture Decision rationale
full Need body
full future Idea bodies
```

Store references/navigation only.

---

# 7. Relationship To README

A concrete SDS workspace may have:

```text
README.md
  navigation only

SDS-PLANNING-CONTEXT.md
  planning-scenario state / route Decisions / planning concerns

SDS-PLANNING-STATE/ideas/
  carry-over Ideas between Targets
```

If the workspace is tiny, README and planning context could theoretically be combined, but that is an Artifact Boundary Decision.

Default recommendation:

```text
README = navigation
Planning Context = planning state
```

because they change for different reasons.

---

# 8. Relationship To Linked Notes

SDS does not define a `notes/` or `linked-notes/` storage area.

If cross-owner navigation/query is materially useful, apply the Core [`LENS-LINKED-NOTES-USAGE-JUSTIFICATION`](../../../idtspe-core/lenses/reusable/LENS-LINKED-NOTES-USAGE-JUSTIFICATION.md). A justified implementation may expose views such as:

```text
currentTarget(sdsRun)
nextTargets(sdsRun)
decisions(sdsRun)
carryOverIdeas(sdsRun)
reopenedTargets(sdsRun)
weucContext(sdsRun)
```

These are views/relations over existing owners and Planning Context, not new semantic artifacts. Canonical Target bodies stay in their current owners. Any future technical Reference Object registry is infrastructure for Reference Object semantics, not a Linked Notes content store.

---

# 9. Lifecycle

Create/establish the Planning Context when a sequential planning topology is selected.

Update it when:

```text
planning direction changes
Target sequence changes
a Target completes
a Target is deferred/skipped
a new cross-target subflow is inserted
a prior Target is reopened
a scenario-level planning concern appears/resolves
a new carry-over Idea is routed
```

Do not update it for every local wording change inside a Target.

---

# 10. Key Invariant

```text
Target-local planning state
→ stays with Target

cross-target planning-scenario state
→ SDS Planning Context

out-of-current-target Idea worth preserving
→ SDS Future Ideas

methodology rules
→ generic methodology owners
```
