# Planning Branch — Counterfactual Downstream Exploration Model

Status: active generic IDTSPE model  
Scope: reusable by any IDTSPE Target, SDS or non-SDS.  
Purpose: explore one or more candidate Ideas **as if selected**, continue downstream planning far enough to expose material consequences, and use those consequences to evaluate the root Ideas.

---

# 1. Core Concept

Sometimes an Idea cannot be evaluated at the current Target depth.

Example:

```text
RQ:
  which solution route should we choose?

Idea A:
  existing tool

Idea B:
  custom application

Idea C:
  process change
```

At the root, all three look plausible.

Their real difference only appears after following:

```text
downstream workflow
responsibility
target topology
proof
implementation
WEUC
risk
operational burden
```

Then create Planning Branches.

---

# 2. Fundamental Invariant

```text
ASSUMED_FOR_BRANCH
≠
SELECTED
```

A branch temporarily assumes:

```text
"what if Idea X were selected?"
```

This grants permission to derive downstream **branch-scoped planning state**.

It does not create a canonical Decision.

---

# 3. Planning Branch Is Not A Target Type

A branch is a planning-state/container concept.

It contains:

```text
Branch Root
Branch Assumption
Branch-local Sources
Branch-local Target Instances
Branch-local Decisions
Projected Consequences
Actual Evidence when collected
Q/R/P
Branch Summary
```

The contained Targets remain ordinary IDTSPE Targets.

---

# 4. Branch Root

Every branch starts from a material unresolved choice.

```text
Root Target
Root RQ / Decision Point
Root Idea
```

Example:

```text
Root Target:
  RLS-RC-01

Root RQ:
  best route for low-friction capture?

Root Idea:
  own lightweight software
```

Branch:

```text
BR-RC-CUSTOM-01
```

---

# 5. Branch Exploration Contract

Before exploring deeply, establish:

```text
Branch ID

Root Target
Root RQ / Decision Point
Root Idea

Status:
  CANDIDATE
  EXPLORING
  VIABLE
  WEAKENED
  BLOCKED
  REJECTED
  SELECTED_ROOT
  CLOSED

Assumption:
  root Idea is ASSUMED_FOR_BRANCH

Exploration Objective:
  what uncertainty/comparison this branch should resolve

Baseline Sources:
  canonical Sources shared with root Target

Branch Assumptions:
  hypothetical selected meaning

Expected Downstream Targets:
  optional / discovered dynamically

Exploration Depth / Stop Conditions

Evidence Plan:
  when actual research/prototype/evidence is needed

Comparison Outputs:
  what must be returned to root decision
```

---

# 6. Branch-Local Source Rules

Baseline canonical Sources remain canonical:

```text
Need
accepted prior Decisions
constraints
current reality
```

The root Idea enters the branch as:

```text
BRANCH_ASSUMPTION_SOURCE
authority:
  hypothetical / branch-local
```

Do not relabel it:

```text
CANONICAL_SEMANTIC_SOURCE
```

unless the root Decision is later actually selected.

---

# 7. Branch-Local Decisions

Inside a branch, downstream Targets may make Decisions.

Example:

```text
if custom software were selected:
  Application Concept branch Decision
  Responsibility branch Decision
  Scenario branch Decision
```

Statuses must remain visibly branch-scoped:

```text
BRANCH_SELECTED
```

Meaning:

```text
selected within this counterfactual branch
for purposes of continuing exploration
```

Not:

```text
globally/currently selected
```

---

# 8. Branch Findings vs Evidence

Keep distinct.

## Projected Consequence

Derived reasoning:

```text
this branch likely requires:
  a durable holding state
  another handoff
  more maintenance
```

This is:

```text
PROJECTED_CONSEQUENCE
```

not raw Evidence.

## Actual Evidence

Research/prototype/measurement/observed repository fact:

```text
existing tool lacks selected-fragment capture
prototype needs 5 interaction steps
actual code path touches 9 files
```

This can be:

```text
EVIDENCE
```

and may affect multiple branches if applicable.

---

# 9. Branch-Local Q/R/P

A branch can accumulate:

```text
Questions
Risks
Problems
```

Examples:

```text
Q:
  can existing tool support source context?

R:
  custom app becomes a second knowledge system

P:
  candidate integration has no offline path
```

These contribute to root Idea evaluation.

They do not automatically pollute canonical current planning if the branch is later rejected.

Retain enough trace to explain why the root Idea was weakened/rejected.

---

# 10. Downstream Target Exploration

A branch may instantiate ordinary IDTSPE Targets:

```text
Root Idea
↓ ASSUMED_FOR_BRANCH

Target A
↓
Target B
↓
Target C
```

or parallel:

```text
         Branch Root
         /        \
        v          v
    Target A    Target B
```

Dynamic Target Formation applies inside branches too.

The branch may discover:

```text
new Target Type/form
new Sources
new Target Relations
new branch-local Ideas
nested branch
```

---

# 11. Nested Branching

Allowed, but bounded.

Example:

```text
Root Idea:
  custom application

Branch-local RQ:
  local persistence vs external service?

  ├─ sub-branch local
  └─ sub-branch service
```

Use only when the nested choice materially affects the root comparison.

Avoid branch explosion.

---

# 12. Branch Exploration Depth

Do not automatically plan the entire future.

Select the minimum downstream depth that resolves material uncertainty.

Possible stop conditions:

```text
one branch becomes infeasible

material differentiator becomes clear

required Evidence is unavailable

branch reaches a common downstream state
where further planning would not distinguish root Ideas

cost/risk profile is sufficiently characterized

user stops/defer
```

---

# 13. Branch Comparison Summary

Every explored branch should return a normalized summary to the root decision.

```text
BRANCH SUMMARY

Branch ID
Root Idea

Need / Outcome Fit
Coverage

Existing Capability Reuse

Required New Responsibilities

Downstream Target Topology

Dependencies / Handoffs

Complexity / Coordination

Evidence Confidence

Key Q/R/P

Reversibility

Delivery / Time Implications

Workspace / WEUC Implications
  when material

Verification / Operability Implications
  when material

Future Options Enabled / Closed

Branch-local Decisions worth preserving as candidates

Reasons To Select

Reasons To Reject

Unknowns / Next Evidence
```

Not every field is mandatory.

Use proportional depth.

---

# 14. Root Idea Evaluation From Branches

At the root:

```text
Idea A
→ Branch A Summary

Idea B
→ Branch B Summary

Idea C
→ Branch C Summary
```

Then use normal root Target Lenses/RQs:

```text
compare Need fit
Evidence
Q/R/P
downstream consequences
reversibility
cost
```

Only now:

```text
Answer Decision
→ select one Idea
```

or:

```text
keep unresolved
request Evidence
select hybrid
split scope
```

---

# 15. Selecting A Branch Root

If root Idea B is selected:

```text
Root Decision:
  Idea B
  SELECTED
```

Branch status:

```text
SELECTED_ROOT
```

But branch-local state is **not automatically promoted**.

Need:

```text
Branch Promotion / Consistency Check
```

---

# 16. Branch Promotion / Consistency Check

For every branch-local selected Decision/output ask:

```text
does it still hold now that the root is truly selected?

was it only a simplifying branch assumption?

does current canonical Source state still match?

does another selected branch/Target conflict?

should this state become:
  accepted
  proposed
  reopened
  discarded
  retained as historical rationale?
```

Only then integrate into canonical planning.

---

# 17. Rejected Branches

When a root Idea is rejected:

```text
branch remains non-canonical
```

Retain proportionally:

```text
root Idea
key branch findings
Evidence
main Q/R/P
reason rejected
reconsider trigger
```

Do not preserve every speculative downstream artifact forever.

Artifact/File Pack decides physical retention.

---

# 18. Parallel Branches

Branches can be explored in parallel.

```text
Root RQ
  ├─ Branch A
  ├─ Branch B
  └─ Branch C
```

They should share canonical baseline Sources by reference.

Branch-specific assumptions remain isolated.

A later Evidence item can be linked to several branches if it genuinely applies.

---

# 19. Branch Relation vs Target Relation

Keep separate.

```text
Branch A
Branch B
```

are alternatives under one root choice.

Targets inside Branch A can still have:

```text
PRECEDES
PART_OF
PARALLEL_WITH
```

Target Relations.

Branch hierarchy is not a replacement for Target Relations.

---

# 20. Branch Guard

Working Guard:

```text
Branch Non-Promotion Guard
```

Prevents:

```text
ASSUMED_FOR_BRANCH
→ silently canonical

BRANCH_SELECTED Decision
→ silently accepted outside branch

PROJECTED_CONSEQUENCE
→ mislabeled as Evidence
```

---

# 21. Branch Comparison Validator

Checks:

```text
same root decision point?
same accepted Need baseline?
material alternatives represented fairly?
branch assumptions explicit?
branch-specific Sources isolated?
comparable summary dimensions sufficient?
no branch was advantaged by silently accepting its assumptions?
actual Evidence distinguished from projections?
```

---

# 22. Branch Promotion Validator

Checks after root selection:

```text
root Idea actually selected?
branch-local Decisions reviewed?
canonical Sources revalidated?
conflicts/duplicates resolved?
only justified state promoted?
rejected branch state not leaked?
```

---

# 23. Branching Opportunity Check

This is a reusable Rule/check available to any IDTSPE.

Ask:

```text
Would downstream exploration materially improve
the current Idea/Decision comparison?
```

Open branches when:

```text
local evidence is insufficient
+
downstream consequences differ materially
+
exploration cost is justified
```

Do not branch merely because several Ideas exist.

---

# 24. Example — Generic Architecture Choice

Root RQ:

```text
how should extensions be integrated?
```

Ideas:

```text
A static registry
B dynamic plugin framework
C explicit branch logic
```

Instead of debating abstract principles:

```text
Branch A
→ simulate Add Provider
→ simulate Provider Capability Change
→ simulate Diagnose Failure

Branch B
→ same downstream WEUC

Branch C
→ same
```

Compare actual/projected work paths.

Then select architecture Decision.

---

# 25. Example — SDS Solution Route

Root RQ:

```text
how should a user preserve material during reading?
```

Ideas:

```text
A existing clipping tool
B own software
C manual improved workflow
```

Branches may continue:

```text
A
→ what later review/handoff looks like

B
→ provisional Application contribution
→ provisional Scenario/workspace burden

C
→ what friction remains
```

The root Solution Decision gets better evidence.

---

# 26. Relation To Carry-Over Ideas

`SDS-PLANNING-STATE/ideas/` stores Ideas that matter later.

A Planning Branch is different:

```text
Carry-Over Idea
= preserve for later Target

Planning Branch
= actively explore now
  because downstream consequences matter
  to a current unresolved Decision
```

An Inbox/carry-over Idea can later become a Branch Root.

---

# 27. Relation To Decisions

Branch exploration does not add a fourth Decision type.

Inside every branch Target:

```text
Target-Scope
Question-Set
Answer Decisions
```

still apply.

They are just branch-scoped until promotion.

---

# 28. Key Formula

```text
Idea
↓
Branching Opportunity Check
↓ if useful
Planning Branch

ASSUMED_FOR_BRANCH
↓
ordinary downstream IDTSPE Targets
↓
branch-local Decisions / Q/R/P / Evidence / projections
↓
Branch Summary
↓
root Idea comparison
↓
actual Answer Decision
↓
Branch Promotion / Consistency Check
↓
canonical planning
```
