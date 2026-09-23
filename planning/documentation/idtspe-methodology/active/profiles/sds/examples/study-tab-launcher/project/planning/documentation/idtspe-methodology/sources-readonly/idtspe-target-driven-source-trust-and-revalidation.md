# IDTSPE Addendum — Target-Driven Source-of-Truth Reuse and Selective Revalidation

Status: planning capture / canonical-direction candidate  
Repository mutation: none

## 1. Core invariant

IDTSPE should optimize for **one-directional, staged planning**.

A result that was already worked through, accepted and remains current becomes a reusable Source of Truth for later planning instances.

```text
previous planning work
→ reviewed/accepted Target State
→ Current Source of Truth
→ freely consumed by later IDTSPE instances
```

A new IDTSPE instance must **not** reopen earlier stages by default.

The desired default is:

```text
TRUST CURRENT SOURCES
→ build forward
→ preserve prior work
```

not:

```text
new task
→ re-question every upstream assumption
→ rebuild the planning chain from scratch
```

## 2. Generic IDTSPE has no fixed reverse ladder

The Application SDS chain:

```text
Need
→ Real-Life Scenario
→ Application Scenario
→ Behavior / DATA
→ Domain
→ Slice
→ Realization
```

is one **Target-family-specific topology**, not the generic IDTSPE algorithm.

Other Target types may have:

- fewer stages;
- different upstream owners;
- different dependency structures;
- no Domain/Slice concepts at all;
- a shallow Need → Target chain;
- several independent Source branches.

Generic IDTSPE therefore does not ask a fixed sequence of questions.

It asks:

```text
What is the Target?
↓
What Target type/family owns it?
↓
What upstream sources/owners does that Target Contract declare?
↓
Which of those sources are already current and trustworthy?
↓
Which must actually be resolved or revalidated for this instance?
```

## 3. Target Contract owns upstream planning topology

Each Target type/family should define its own planning/source topology.

Conceptually:

```text
Target Contract:
  targetType
  canonicalOwner
  validTargetState
  requiredSources
  proportionalSources
  upstreamJustificationSources
  architectureEvolutionSources
  deliveryConstraints
  currentTargetBaselineRule
  evidenceBoundary
  revalidationTriggers
  downstreamHandoffs
```

This is how generic IDTSPE adapts to different planning domains.

## 4. Source-of-Truth Context for one IDTSPE instance

Every material IDTSPE instance should resolve an explicit Source-of-Truth Context.

Example shape:

```text
Target:
  <identity/type>

Need / Root Justification:
  <canonical source or current established meaning>

Sources Used:
  - <source identity>
    role: ...
    authority: canonical | evidence | constraint | planning-state
    state: TRUSTED_CURRENT | CHALLENGED | NEEDS_REFRESH | HISTORICAL
    reason: ...

Current Target:
  <baseline / none>

Open Challenges:
  <specific challenged assumptions only>
```

The goal is to know exactly which already-completed work is being reused.

## 5. Trusted-source default

A previously established source remains reusable when:

```text
- it is still the current canonical owner/state;
- no new authoritative source contradicts it;
- no practical evidence materially challenges it;
- no material Q/R/P currently questions its premise;
- no changed constraint invalidates its applicability;
- no dependent Decision explicitly replaced it.
```

When these conditions hold:

```text
REUSE
```

Do not re-run the old planning stage.

## 6. Reverse checking is selective challenge traversal

"Reverse checking" does not mean walking a universal chain to the root on every invocation.

It means:

```text
new trigger / evidence / concern
↓
which current assumption does this challenge?
↓
which canonical source owns that assumption?
↓
does the challenge materially threaten the source?
  no
    → keep source trusted
  yes
    → reopen only that owner and the minimum upstream context needed
↓
propagate any accepted correction downstream
```

This is a **challenge-driven traversal**.

## 7. Sources that may challenge previous work

Examples include:

### Practical evidence

- implementation result;
- test result;
- runtime incident;
- user acceptance;
- ReviewDiff;
- observed behavior.

### WEUC / Workspace evolution evidence

- actual change cost is much higher than planned;
- a recurring change path touches too many owners;
- verification burden became excessive;
- a new high-frequency Workspace operation appeared;
- projected WEUC impact was wrong.

### Delivery/economic constraints

- deadline changed;
- capacity changed;
- external integration cost changed;
- dependency became unavailable.

### New canonical information

- upstream Requirement changed;
- Scenario meaning changed;
- legal/business constraint changed;
- current owner was superseded.

### Planning concerns

- a new Question exposes an unsupported assumption;
- a Risk becomes material enough to reconsider a Decision;
- a Problem proves a selected route invalid.

## 8. Evidence is not the same thing as Q/R/P

Keep source and interpretation distinct.

Example:

```text
PRACTICAL_EVIDENCE:
  runtime retry path requires 8 coordinated edits

→ interpretation:

P:
  current realization is too coupled for the expected recurring change path
```

Another example:

```text
WEUC EVIDENCE:
  "add provider" is expected weekly and touches 7 owners

→ interpretation:

R:
  current architecture creates high recurring Workspace work-cost
```

Evidence should remain linked to the resulting Q/R/P.

## 9. Challenge record

When prior work is questioned, the planning state should make the challenge explicit.

Conceptually:

```text
Challenge:
  challengedSource: <id/path>
  trigger/evidence: <source>
  concernIds: <Q/R/P>
  challengedClaim: <what exactly is no longer trusted>
  scope:
    local | owner-level | upstream
  disposition:
    rejected | accepted | needs-investigation
```

This prevents vague "maybe reconsider everything" behavior.

## 10. Revalidation states

Useful conceptual states:

```text
TRUSTED_CURRENT
  safe to consume without re-planning

CHALLENGED
  concrete new evidence/concern puts some meaning in doubt

NEEDS_REFRESH
  current authority or applicability is uncertain

SUPERSEDED
  replaced by a newer accepted owner/state

HISTORICAL_EVIDENCE
  useful for provenance, not current truth
```

Exact repository representation remains open.

## 11. Selective propagation

If an upstream source is corrected:

```text
corrected source
↓
identify dependent Targets
↓
review only affected dependency paths
↓
preserve unaffected downstream meaning
```

Do not automatically rebuild all descendants.

Example:

```text
BI-14 changes
↓
SL-06 covers BI-14
→ SL-06 needs impact review

SL-09 does not depend on BI-14
→ no automatic replan
```

This is where Linked Notes / dependency tooling can eventually help.

## 12. Application SDS is one Target-family example

For a Slice Target, the Target Contract may declare:

```text
upstream justification:
  Need / Real-Life Scenario when relevant
  Application Scenario

semantic sources:
  Behavior Items
  DATA Objects
  Requirements
  Domain owners
  Screens when material

architecture/evolution sources:
  Workspace UCs
  WEUC
  Change Paths
  Change Pressure

baseline:
  Current Slice in INTEGRATE

evidence:
  implementation/tests/runtime

constraints:
  deadlines/milestones/capacity
```

But if Need, Real-Life Scenario, Scenario, Behavior and Domain were already reviewed and remain trusted:

```text
Slice IDTSPE
→ reuse them directly
→ do not re-run Need/Scenario/Domain planning
```

Only new evidence that challenges one of them reopens that stage.

## 13. Simpler Target-family example

A small documentation Target might have:

```text
Need
→ current Documentation UC
→ current reusable workflow
→ Target file/command
```

No Scenario/Domain/Slice ladder is required.

IDTSPE still applies:

```text
resolve target
→ resolve trusted sources
→ inspect new trigger/evidence
→ challenge only what is actually questioned
→ build Projected Target
```

## 14. Root Need remains universal, but can be inherited

Every non-trivial Target ultimately needs a justified purpose.

However the current IDTSPE instance does not need to rediscover that Need if it is already established.

Conceptually:

```text
Target
→ justification lineage
→ established Need
```

The engine only asks:

```text
Is the current Need/root justification known and still trustworthy?
```

If yes:

```text
reuse
```

If no:

```text
resolve/revalidate
```

## 15. One-directional planning principle

Preferred methodology:

```text
Stage A
→ produces trusted Source A

Stage B
→ consumes Source A
→ produces trusted Source B

Stage C
→ consumes A + B
→ produces trusted Source C
```

Later stages should not routinely reinterpret earlier stages.

Backward movement is exception-driven:

```text
new material challenge
→ reopen specific earlier source
→ explicit correction
→ bounded downstream review
```

This allows accumulated planning work to compound instead of repeatedly resetting.

## 16. IDTSPE instance algorithm

```text
1. Receive Trigger
2. Resolve Target Type / Target Contract
3. Resolve root justification lineage
4. Resolve candidate Source-of-Truth Context
5. Classify sources:
     TRUSTED_CURRENT
     CHALLENGED
     NEEDS_REFRESH
     HISTORICAL
6. Reuse all TRUSTED_CURRENT sources
7. Investigate only challenged/uncertain sources
8. Determine whether any upstream Target must actually change
9. Review Ideas/evidence/QRP only at affected layers
10. Construct Projected Target State
11. Review WEUC impact when material
12. Review dependency/reuse impact
13. Pre-Update
14. Realize when authorized
15. Collect practical evidence
16. Reconcile Target + WEUC state
17. Reopen earlier sources only if evidence materially challenges them
```

## 17. New key invariant

```text
Target-driven topology.
Source-of-truth reuse by default.
Challenge-driven reverse traversal.
Bounded correction propagation.
```

This replaces any interpretation of IDTSPE as:

```text
always start at Need
→ replay every stage
```

The semantic root is Need/Reality, but physical planning traversal is proportional and source-aware.

## 18. Implication for Linked Notes

A future Linked Notes source/dependency capability should make it possible to answer:

```text
What are the canonical sources for this Target?
Which are current?
Which are challenged?
What evidence challenges them?
What Targets depend on the challenged source?
Which Review Dependencies are currently stale?
```

This would support source reuse rather than forcing broad rereads.

## 19. Concern Group — `CG-IDTSPE-SOURCE-TRUST`

Shared resolution surface:
Source-of-Truth reuse + challenge/revalidation policy.

### `P-ST-01 — Replanning already accepted upstream work`

Repeatedly reopening Need/Scenario/Domain/etc wastes work and can introduce inconsistency.

### `R-ST-02 — Blind trust in stale prior work`

Reuse without a challenge mechanism can preserve invalid assumptions.

### `Q-ST-03 — Source trust representation`

How should `TRUSTED_CURRENT / CHALLENGED / NEEDS_REFRESH / SUPERSEDED` be represented, if at all, in repository state?

### `Q-ST-04 — Challenge propagation`

How should a changed source identify exactly which dependent Targets need review?

### `R-ST-05 — Evidence/QRP conflation`

If raw evidence is stored only as a Problem/Risk, provenance and later reinterpretation may be lost.

### `Q-ST-06 — Root Need identity`

Which Target families need an explicit durable Need entity versus an inherited/shared root justification?

## 20. Current decisions

### D-ST-01

IDTSPE reverse checking is **Target-driven**, not a fixed universal ladder.

### D-ST-02

Previously completed, current canonical planning results are reusable Sources of Truth.

### D-ST-03

Reuse is the default; revalidation requires a material challenge/uncertainty.

### D-ST-04

Application SDS Need → Scenario → Behavior/DATA → Domain → Slice is one Target-family-specific dependency topology.

### D-ST-05

Evidence and Q/R/P remain distinct but linked.

### D-ST-06

Planning should be predominantly one-directional; backward correction is explicit and bounded.

### D-ST-07

A Target's source topology belongs to its Target Contract, not to the generic IDTSPE engine.

## 21. Revision — Q/R/P Ownership Supersession

The earlier generic statement that Concern/Concern Group belongs primarily to a broad Target/Decision Surface is refined by the later Decision Question model.

Preferred lifecycle:

```text
Decision Question
├─ shared/cross-candidate Q/R/P
└─ Ideas
    └─ candidate-specific Q/R/P

selected Idea
↓
Decision
└─ unresolved material Q/R/P transferred/attached as residual Decision Q/R/P
```

This preserves the earlier goal — stable post-decision reconsideration memory — while making pre-decision ownership more concrete.

The Target/Decision Surface remains useful as a grouping/context concept, but it is no longer the preferred atomic owner for every Q/R/P.

Post-decision residual Q/R/P, together with Current WEUC State and Practical Evidence, are primary challenge/revalidation signals.

## 22. Revision — Decision-Based Revalidation

Selective revalidation should now be expressed primarily through Decisions and their residual Q/R/P:

```text
previous accepted Decision
→ reusable Target/Source-of-Truth meaning

Decision residual Q/R/P
+ new Practical Evidence
+ new WEUC Evidence
+ changed canonical Sources/constraints
↓
reconsideration trigger
↓
reopen the specific Decision Question
```

This is preferred over maintaining a separate generic persisted Source status.

For the current IDTSPE instance:

```text
Target Contract
→ identify required prior Decisions/Sources
→ reuse them
→ inspect their residual Q/R/P and relevant Evidence
→ reopen only those Decision Questions with a material trigger
```

The Application SDS justification chain remains one Target-family example of this generic decision-based mechanism.
