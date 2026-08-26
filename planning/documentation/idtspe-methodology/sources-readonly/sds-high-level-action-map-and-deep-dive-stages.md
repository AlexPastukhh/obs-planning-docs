# SDS High-Level Action Map And Deep-Dive Stages

Status: working decomposition for step-by-step methodology analysis  
Basis: current `idtspe-sds-end-to-end-scenario-workbook.md` after SDS-consistency revision  
Purpose: define the large phases that will be analyzed one by one in later passes, without yet expanding each phase into all Lenses, Q/R/P fields, commands, file layouts, validators and examples.

---

# 1. Why Re-Split The Current Scenario

The current Scenario A contains many useful micro-steps:

```text
Need
Solution variants
Application Concept
Solution selection
Application Responsibility
Prototype
Scenario Discovery
Scenario detail
early WEUC
Domain
high-level realization
Slice Strategy
pre-code WEUC
Architecture
Slice
consistency
Test Design
Practical Test Plan
Implementation
Evidence
WEUC re-trace
Revalidation
```

For deeper analysis this is too granular as a primary map.

A better working structure is:

```text
PHASE
→ contains several related IDTSPE Targets / actions
→ has one understandable planning purpose
→ has an explicit entry condition
→ produces reusable Sources for the next phase
→ can be deep-dived independently
```

---

# 2. High-Level SDS Action Map

```text
0. INVOCATION / PLANNING SETUP
   ↓
1. NEED / REALITY / REAL-WORLD PROBLEM
   ↓
2. WHOLE-SOLUTION DISCOVERY AND SELECTION
   ↓
3. APPLICATION DEFINITION
   Concept
   → selected Application role in whole solution
   → Application Responsibility
   → optional Prototype
   ↓
4. APPLICATION SCENARIO SYSTEM
   Scenario Discovery
   → detailed Scenario
   ↔ DATA
   ↔ Behavior
   ↔ Requirements
   → Screen when spatial meaning is material
   ↓
5. OPTIONAL DOMAIN MODEL
   Domain Discovery
   → canonical Domain only when separately useful
   ↓
6. REALIZATION FEASIBILITY / DELIVERY SHAPING
   optional high-level realization stress review
   → Slice Strategy when several increments are useful
   ↓
7. WORKSPACE / ARCHITECTURE PLANNING
   early WEUC hypotheses already available
   → concrete pre-code WEUC instances
   → Change Pressure / architecture questions
   → Architecture Decisions when justified
   → recheck delivery strategy when necessary
   ↓
8. DETAILED SLICE / REALIZATION TARGET
   selected vertical Slice
   → implementation responsibilities
   → implemented / delegated / later / outside
   → dependencies / handoffs
   ↓
9. INTEGRATED CONSISTENCY + VERIFICATION PLANNING
   cross-owner SDS consistency
   → Test Design
   → Practical Test Plan when operated acceptance is useful
   ↓
10. AUTHORIZED REALIZATION
    implementation / documentation / runtime changes
    ↓
11. PRACTICAL EVIDENCE / RECONCILIATION
    execute proof
    → Coverage / ReviewDiff
    → observed WEUC
    → Decision revalidation
    → reaffirm / mitigate / selectively reopen
    → Current Sources for next cycle
```

Independent side-pack:

```text
ARTIFACT / FILE REALIZATION PACK

can be attached after any semantic Target becomes durable enough:

semantic Target
→ Artifact Boundary Discovery
→ Artifact Layout Decision
→ Artifact Plan
→ optional Pre-Update
→ authorized file mutation
→ Artifact Representation Validation
```

It is not part of the semantic SDS ladder itself.

---

# 3. Phase 0 — Invocation / Planning Setup

## Purpose

Understand:

```text
what operation is being requested
which semantic Target family is currently relevant
which physical profile is desired
what permissions exist
which existing Sources/Decisions can be reused
```

## Main actions

```text
resolve Trigger
resolve planning mode
resolve current Application/project context
resolve Mini / Modular / Full profile when relevant
resolve command / Target preset
resolve permission boundary
```

## Important distinction

```text
Full SDS
= physical/addressability profile

≠ semantic phase
≠ different planning truth
```

## Main output

```text
Invocation Contract
initial Target-family context
initial reusable Source context
```

## Deep-dive later

This phase should later be expanded into:

- exact command/Tampermonkey UX;
- route selection;
- mode detection;
- current-context loading;
- Rule Pack resolution;
- consistency check for current repo commands.

---

# 4. Phase 1 — Need / Reality / Real-World Problem

## Purpose

Establish why anything should change before choosing software behavior or architecture.

## Main actions

```text
Trigger
→ Need
→ Current Reality
→ desired real-world result
→ real-world workflow
→ problem/gap/pressure
→ Open Solution Slot when useful
```

## Main Target

```text
checked Need / Reality / real-world problem-resolution context
```

Exact final owner shape is still a repository-design question.

## Main Decisions

At this phase the material planning shell includes:

```text
Target-Scope Decision
Question-Set Decision
answer Decisions about Need/problem framing when choices exist
```

## Main output

Reusable Source for Phase 2:

```text
Need basis
Current Reality
real-world workflow
solution slot
material evidence / uncertainty
```

## Re-open condition

Only if later Evidence challenges the Need/problem framing.

---

# 5. Phase 2 — Whole-Solution Discovery And Selection

## Purpose

Choose **how the real-world Need is best solved**, before assuming a custom Application.

## Main actions

```text
discover existing/manual/process/integration/no-change/custom-software alternatives
→ compare whole workflow
→ research/prototype only where uncertainty matters
→ select whole Solution
```

## Candidate results

```text
existing route
process change
manual route
integration
no-change/defer
custom Application
hybrid solution
```

## Main Target

```text
whole Solution / problem-resolution workflow
```

## Main output

```text
selected whole Solution
rejected/deferred alternatives
residual Q/R/P
revalidation hooks
```

## Critical rule

```text
"Application seems useful"
≠ selected whole Solution
```

Application Concept review can be one candidate-evaluation Target inside this phase.

---

# 6. Phase 3 — Application Definition

This phase only exists when the selected whole Solution materially includes own Application behavior.

It contains three related but distinct actions.

---

## 6.1 Application Concept

Purpose:

```text
is own software concept worth continuing?
what simplification/value does it create?
what rough support/feasibility burden does it imply?
```

Output:

```text
selected/rejected Application Concept
```

---

## 6.2 Application Responsibility

Purpose:

```text
define what the Application owns inside the selected whole Solution
and what remains outside
```

Output:

```text
explicit inside/outside Application boundary
```

---

## 6.3 Prototype — optional

Use when uncertainty is materially:

```text
interaction
workflow
spatial behavior
technical feasibility
```

Prototype produces:

```text
provisional Evidence
candidate Scenario/DATA/Behavior/Requirements/Screen meaning
```

It does not automatically create canonical Application semantics.

---

## Main Phase Output

Reusable Sources for Scenario planning:

```text
selected whole Solution
Application Concept
Application Responsibility
Prototype Evidence when any
```

---

# 7. Phase 4 — Application Scenario System

## Purpose

Turn Application Responsibility into current Application behavior authority.

This is not one single command internally.

It contains:

```text
Scenario Discovery
→ Scenario boundary decisions
→ detailed Scenario planning
↔ Scenario DATA
↔ Behavior Items
↔ Requirements
→ Screen when spatial meaning deserves its own owner
```

## Scenario Discovery

Answers:

```text
which actor-visible useful results deserve separate Scenarios?
which candidate is only a step/button/screen/API/implementation action?
```

## Detailed Scenario loop

For every material Scenario:

```text
Scenario
↔ DATA
↔ Behavior
↔ Requirements
```

Decomposition may reveal:

```text
missing input
missing branch
wrong Scenario boundary
new Requirement
need to split/merge Scenario
```

Then refine and repeat.

## Screen

Optional canonical owner when stable spatial meaning is material.

## Main output

Current behavioral Sources:

```text
Scenario inventory
detailed Scenarios
Scenario DATA
Behavior Items
Requirements
Screens when material
```

These become authoritative inputs to Domain/realization planning.

---

# 8. Phase 5 — Optional Domain Model

## Purpose

Create a separate conceptual owner only when repeated Application behavior reveals real:

```text
identity
lifecycle
invariants
policies
relationships
consistency/ownership
```

## Main actions

```text
Domain Discovery
→ decide whether explicit Domain is useful
→ select Entities / Value Objects / roots / rules only when justified
```

## Valid outcomes

```text
explicit Domain
```

or:

```text
no separate Domain owner needed
```

## Critical rule

Do not derive Domain mechanically from:

```text
Scenario DATA nouns
database tables
DTO fields
implementation classes
```

## Main output

```text
canonical Domain meaning when selected
Domain verification meaning when material
residual Domain Q/R/P
```

---

# 9. Phase 6 — Realization Feasibility / Delivery Shaping

This phase sits between semantic behavior/domain planning and detailed implementation.

It has two possible actions.

---

## 9.1 High-Level Application Realization Stress Review — optional

Use when representative:

```text
runtime
persistence
integration
operational
technical feasibility
```

could still invalidate current semantic choices.

It asks:

```text
can the selected Scenario/Requirements/Domain be realized reasonably?
```

It should not yet become:

```text
file/class design
```

Output:

```text
realization Evidence / stress findings
```

---

## 9.2 Slice Strategy — optional

Use when several delivery increments are useful.

Select:

```text
vertical increments
coverage
dependencies
product priority
technical sequence
learning/risk value
```

Do not create foundation Slices by default.

## Main output

```text
realization feasibility basis
Slice Strategy when needed
selected next delivery target
```

---

# 10. Phase 7 — Workspace / Architecture Planning

This phase evaluates how the planned Application will evolve as a workspace/codebase/tool.

It must not redefine Application behavior.

## Part A — Early demand hypotheses

Can appear earlier, once Application responsibility/Scenarios make plausible future work visible.

At this stage:

```text
Need/Demand confidence may exist
exact code-path confidence is low
```

No architecture framework should be selected from hypothesis alone.

## Part B — Concrete pre-code WEUC

Once planned realization areas/seams are concrete:

```text
instantiate contextual WEUC
→ Need/Demand Basis
→ alternative route
→ likelihood
→ horizon
→ value
→ confidence
→ expected work path
→ preparation-now vs defer
```

## Part C — Architecture planning

When concrete pressure justifies it:

```text
derive architecture RQs
→ compare Ideas across material WEUC portfolio
→ select Architecture Decisions
→ save Accepted WEUC Impact
→ save revalidation hooks
```

## Part D — Delivery recheck

If architecture evidence changes prerequisites/order:

```text
explicitly reopen/reaffirm Slice Strategy
```

Do not silently change product/delivery sequencing.

## Main output

```text
Current WEUC picture
Architecture Decisions
Accepted WEUC Impact
architecture constraints for selected Slice
```

---

# 11. Phase 8 — Detailed Slice / Realization Target

## Purpose

Convert selected upstream behavior/domain/architecture meaning into one bounded deliverable/checkable implementation result.

## Main actions

Select:

```text
Covered Scenarios
Covered Behavior Items
Requirements
relevant Domain meaning
implemented
delegated/shared
later
outside
vertical boundary
dependencies/handoffs
implementation responsibilities
verification target
```

## Critical rule

Slice does not become:

```text
a list of files/tasks/classes
```

Files/classes/methods may appear as implementation hypotheses after semantic Slice coverage is fixed.

## Main output

```text
complete selected Slice
implementation/repository planning basis
```

---

# 12. Phase 9 — Integrated Consistency + Verification Planning

Two different responsibilities live here.

---

## 12.1 Cross-Owner SDS Consistency

Check:

```text
Scenario
Requirements
Screen
Domain
Slice
Architecture Decisions
```

for contradictions.

The check does not become another semantic owner.

If conflict exists:

```text
identify real owner
→ correct/reopen there
→ recheck dependents
```

---

## 12.2 Verification Planning

When material:

```text
Test Strategy
→ only for shared/layer proof policy

Test Design
→ Behavior/Requirement → proof mapping

Practical Test Plan
→ operated acceptance campaign
```

Planning proof is not actual Evidence.

## Main output

```text
consistent implementation target
Behavior-to-Test trace
proof plan
operated acceptance plan when useful
```

---

# 13. Phase 10 — Authorized Realization

## Purpose

Actually build/change the selected Target.

This phase is outside plan-only permission.

Possible actions:

```text
code changes
documentation changes
configuration
package generation
prototype execution
test setup
runtime operations
```

## Critical rule

```text
planning permission
≠ mutation permission
```

If realization discovers a semantic contradiction:

```text
capture Evidence
→ route back to narrowest semantic Decision/owner
```

Do not silently rewrite upstream semantics.

## Main output

```text
Actual Realized State
raw Evidence
```

---

# 14. Phase 11 — Practical Evidence / Reconciliation

## Purpose

Compare planned meaning/expectations with reality.

## Main actions

```text
execute selected proof
→ collect actual Evidence

review actual Coverage
→ find weak/missing/stale proof

semantic ReviewDiff
→ compare actual target vs selected Scenario/Requirement/Domain/Slice

post-code WEUC re-trace
→ expected path vs actual structure/work

Decision revalidation
→ residual Q/R/P + new Evidence
```

## Outcomes

```text
ACCEPT

LOCAL CORRECTION

MITIGATION / ADDITIVE DECISION

ANSWER RE-OPEN

QUESTION-SET RE-OPEN

TARGET-SCOPE RE-OPEN

UPSTREAM SEMANTIC CORRECTION
```

## Main output

```text
reconciled Current Target
reaffirmed/superseded/new Decisions
updated residual Q/R/P
Observed WEUC Evidence
reconciled Current WEUC State
trusted Sources for next cycle
```

---

# 15. Independent Artifact / File Realization Side-Pack

This should be analyzed separately from SDS semantic planning.

It may attach after any durable semantic Target:

```text
Need owner
Solution owner
Scenario
Domain
Slice
Decision state
WEUC portfolio
testing plan
```

Flow:

```text
current semantic Target
+ current repository
+ optional profile/preset
↓
Artifact Boundary Discovery
↓
Artifact Boundary / Addressability Lens
↓
Artifact Layout Decision
↓
Artifact Plan
↓
optional Pre-Update
↓
authorized file mutation
↓
Artifact Representation Validator
```

This is where we decide:

```text
embedded section?
dedicated canonical file?
register?
supporting planning file?
generated index/portfolio?
```

It must remain possible to run:

```text
Artifact Pack only
```

over an existing semantic Target without replaying all SDS planning.

---

# 16. Where The Three Generic Decision Types Repeat

The three Decision types are not one-time global Decisions.

They recur inside every material Target.

Generic:

```text
Target-Scope Decision
Question-Set Decision
Answer Decision(s)
```

Examples:

## Whole Solution

```text
TS:
  choose whole-solution problem boundary

QS:
  which solution questions/alternatives must be resolved?

Answer:
  selected whole Solution
```

## Scenario

```text
TS:
  selected Scenario boundary/result

QS:
  which DATA/Behavior/Requirement questions define it?

Answer:
  selected behavior/requirement choices
```

## Domain

```text
TS:
  do we need explicit Domain and what area?

QS:
  identity/lifecycle/invariant/ownership questions

Answer:
  selected Domain model/rules
```

## Architecture

```text
TS:
  architecture/workspace area under change

QS:
  which work-cost/ownership/dependency questions matter?

Answer:
  selected Architecture Decision
```

## Slice

```text
TS:
  selected deliverable vertical boundary

QS:
  coverage/dependency/implementation/proof questions

Answer:
  selected realization choices
```

---

# 17. Recommended Order For Our Future Deep-Dive Analysis

Do not analyze every micro-step independently yet.

Recommended sequence:

```text
DEEP DIVE 1
Phase 0:
Invocation / route / current-context / command composition

DEEP DIVE 2
Phase 1:
Need / Reality / real-world workflow / Open Solution Slot

DEEP DIVE 3
Phase 2:
Whole-Solution discovery / alternatives / selection

DEEP DIVE 4
Phase 3:
Application Concept / Responsibility / Prototype

DEEP DIVE 5
Phase 4:
Scenario Discovery + detailed Scenario/DATA/Behavior/Requirements/Screen

DEEP DIVE 6
Phase 5:
optional Domain

DEEP DIVE 7
Phase 6:
high-level realization + Slice Strategy

DEEP DIVE 8
Phase 7:
WEUC full picture + architecture Decisions

DEEP DIVE 9
Phase 8:
detailed Slice

DEEP DIVE 10
Phase 9:
cross-owner consistency + verification planning

DEEP DIVE 11
Phase 10:
realization permission / implementation handoff

DEEP DIVE 12
Phase 11:
Evidence / Coverage / ReviewDiff / WEUC reconciliation / revalidation

PARALLEL DEEP DIVE
Artifact / File Realization Pack
```

The Scenario workbook can then be rewritten gradually:

```text
high-level phase
→ exact user messages
→ command/Tampermonkey UX
→ Target-Scope Decision
→ Question-Set Decision
→ Sources
→ Lenses and exact questions inside each Lens
→ Ideas / Q/R/P / Evidence
→ Answer Decisions
→ Validators / Guards
→ persistence
→ Artifact/File implications
→ exit criteria
→ next-phase handoff
→ re-open paths
```

---

# 18. Phase Deep-Dive Template

For each phase we should eventually produce exactly this structure.

```text
1. PURPOSE

2. ENTRY CONDITIONS

3. USER UX
   what user says
   which Tampermonkey command/shortcut
   automatic vs explicit actions

4. CURRENT REPOSITORY CANDIDATES
   exact owners/commands/workflows
   consistency status:
     reuse / extend / merge / split / retire / unresolved

5. TARGET / SCOPE
   candidates
   Target-Scope Decision

6. SOURCES
   required
   proportional
   trusted reused Decisions
   Evidence
   constraints

7. QUESTION DISCOVERY
   candidate RQs
   Question-Set Decision

8. APPLICABLE LENSES
   for each Lens:
     purpose
     exact questions/actions
     Evidence needed
     possible findings

9. IDEAS / VARIANTS

10. Q/R/P
    candidate concerns
    admission gate
    Concern Groups when useful

11. ANSWER DECISIONS
    rationale
    saved alternatives
    residual Q/R/P
    revalidation hooks

12. TARGET OUTPUT
    exact semantic shape
    completeness criteria

13. VALIDATORS / GUARDS / RULES

14. PERSISTENCE
    what must survive this turn

15. ARTIFACT / FILE IMPLICATIONS
    only when Artifact Pack is applied

16. EXIT CRITERIA

17. NEXT-PHASE SOURCES / HANDOFFS

18. RE-OPEN PATHS

19. FULL WORKED EXAMPLE

20. FAILURE / ANTI-PATTERN EXAMPLES
```

This becomes the template for the next rounds.

---

# 19. Compact High-Level SDS Map

The shortest reusable form:

```text
REAL WORLD
Need / Reality / workflow
↓
WHOLE SOLUTION
alternatives → selected solution
↓
APPLICATION DEFINITION
Concept → Responsibility → optional Prototype
↓
APPLICATION BEHAVIOR
Scenario Discovery
→ Scenario ↔ DATA ↔ Behavior ↔ Requirements
→ Screen when material
↓
OPTIONAL DOMAIN
identity / lifecycle / invariants / ownership
↓
REALIZATION SHAPING
high-level feasibility
→ Slice Strategy when useful
↓
WORKSPACE / ARCHITECTURE
WEUC
→ Architecture Decisions
↓
DELIVERY
selected Slice
↓
CONSISTENCY / PROOF PLAN
cross-owner review
→ Test Design / Practical Test Plan
↓
REALIZATION
separately authorized
↓
REALITY FEEDBACK
Evidence / Coverage / ReviewDiff / observed WEUC
↓
REVALIDATION
preserve
or selectively correct/reopen
↓
CURRENT SOURCES
for the next planning cycle
```

Independent:

```text
any durable semantic Target
↓
optional Artifact / File Realization Pack
↓
physical repository representation
```

---

# 20. Main Working Decision

For future methodology work, use these **11 semantic/delivery phases + Phase 0 setup** as the primary analysis map.

Do not expand the high-level SDS map with every internal RQ, Lens, Validator or command.

Those details belong inside each phase deep dive.

The next natural detailed analysis target is:

```text
PHASE 0 + PHASE 1
Invocation
→ Need / Reality / real-world workflow
```

because every later phase depends on correctly resolving:

```text
what started the planning
what the actual Need is
what current truth can be reused
what problem/solution slot is really being planned
```
