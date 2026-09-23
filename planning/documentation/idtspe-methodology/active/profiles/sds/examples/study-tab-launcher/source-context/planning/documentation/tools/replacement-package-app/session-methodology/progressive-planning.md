# Progressive Planning

Status: active normative detailed procedure
Use Case: DOC-UC-15
Root: [`README.md`](README.md)

## Dependent-plan invalidation

When a newly approved upper-level change alters an assumption used by deeper planning,
treat the dependent lower-level plan as **invalidated until revalidated**.

```text
L3/L4 discovery
→ reveals L1/L2 decision is wrong/incomplete
→ stop deeper planning/execution
→ propose and approve upper-level correction
→ mark dependent L2/L3/L4 decisions/plans INVALIDATED-PENDING-REVALIDATION
→ re-run forward consistency from the changed level downward
→ explicitly re-accept only the lower-level parts that still fit
→ rebuild/replace the rest
```

Do not assume an old exact plan remains valid merely because some code fragments still look reusable.

This rule is intentionally conservative.
Minimize reaching this state through strong Vertical Slice boundaries, clear black-box inputs/outputs and sufficiently complete L1/L2 planning.




## Progressive top-down planning depth

Proposal-first work is not one fixed-size design review.

AI and user may progressively descend from semantic intent to literal code shape,
stopping at the depth appropriate for the task.

Use this explicit progression:

```text
LEVEL 0 — Behavior / owner meaning
Feature / Scenario / Domain / Shared meaning
Behavior Requirements
supported behavior / trust / authority boundaries
owner/boundary decisions

        ↓ when current level is sufficiently closed

LEVEL 1 — Durable Implementation Requirements
Slice / Domain / Shared Implementation Requirements
Proof Requirements when non-obvious proof-realization constraints exist
durable Decisions / Risks / Questions / Known Problems where useful

        ↓

LEVEL 2 — Implementation architecture / realization shape
Slice modules / branches / adapters
Aggregate / Domain Object shape
Shared Capability boundaries
application-service boundary
side-effect / persistence / concurrency / recovery strategy
selected patterns and significant classes/modules

        ↓

LEVEL 3 — Exact working implementation plan
candidate classes
candidate methods
literal call paths where useful
state/data flow
exact test scenarios
source/test file placement
migration/edit sequence

        ↓

LEVEL 4 — Literal code proposal
exact code/text intended to be applied at the depth useful for review
exact tests/proof realization
exact file additions/replacements/deletions
full exact final file result available before package creation
replacement-package-ready bytes only after final user review/approval
```

The levels are guidance, not a mandatory ceremony.
A narrow bug fix may begin at Level 2 or Level 3 when upper semantic authority is already settled.
A new Feature may naturally start at Level 0.

The user may drive the depth directly at any time.
AI follows the user's flow while using the methodology as a reasoning guide.

## Session planning state

During a planning conversation, AI may maintain a compact working session state.

Recommended shape:

```text
Current planning level:

Agreed:
- ...

Open:
- ...

Risks / Known Problems:
- ...

Current Decisions:
- ...

Consistency with previous levels:
- OK | NEEDS REVALIDATION
- affected items if any

Candidate durable outputs:
- Requirement proposal(s)
- durable Decision/Risk/Problem proposal(s)
- none

Recommended next level:
- ...
```

This is **working session state**, not durable authority.

It may:
- remain only in chat;
- be saved to a non-persistent working plan when useful;
- later produce approved durable Requirements/Decisions in natural owners.

Do not persist the session summary merely because it exists.


## Level transition confirmation

Moving to a deeper planning level is a **user-controlled transition**.

When the current planning level is materially closed, AI should:

```text
1. summarize what is now agreed at the current level;
2. list remaining OPEN questions/risks/problems, if any;
3. report the backward-consistency result against previous levels;
4. identify the recommended next planning level;
5. ask whether the user wants to proceed deeper.
```

Example:

```text
Current level closed:
- behavior/owner meaning agreed
- no unresolved Requirement delta
- boundary consistent

Backward consistency:
- no previously approved meaning changed

Next recommended level:
Implementation architecture / realization shape

Proceed to the next level?
```

Do not begin the next deeper planning level before that confirmation,
unless the user has already explicitly instructed AI to continue to that depth.

This is not about requiring a specific phrase.
It makes increasing commitment/depth visible and user-controlled.

If the user already asks to continue deeper, do not ask a redundant transition question.

## Planning for low-rework descent

The session process should actively reduce the chance that L3/L4 discoveries invalidate L0-L2.

Before descending from L2 into exact realization, perform a **boundary-readiness check**.

Session Methodology owns the checkpoint/process:

```text
Is the L2 realization boundary clear enough
that exact implementation questions are likely to stay local?
```

It does not duplicate the detailed reusable design rules.

Consult:

```text
methodology-guidance/reusable-vertical-slice-discovery.md
→ when deciding whether an end-to-end Slice/module responsibility
  has a clear semantic input/output/result boundary

methodology-guidance/reusable-programming-principles.md
→ for generic encapsulation / information hiding /
  black-box contracts / minimal neighboring-internal knowledge
```

Also consult Domain/Shared guidance when those ownership questions are involved.

The boundary-readiness check should verify, by reference to the relevant guidance, that:
- semantic responsibility is understood;
- important inputs/outputs/results/side effects are explicit enough;
- failure/uncertainty semantics are understood enough for exact planning;
- Domain/Shared ownership is not being accidentally absorbed into the Slice;
- proof can observe the meaningful boundary;
- known Evolution pressure has been considered.

Do not create modules/abstractions merely to pass this checkpoint.

Repeated L3/L4 discoveries that force upstream changes are evidence that L2 boundary/ownership/input-output reasoning may have been incomplete.


## Backward consistency check at every level

Before moving deeper, and whenever a new decision/finding appears, check whether it invalidates or changes anything already accepted above.

Use the recursive check:

```text
new decision / evidence at current level
→ does it change current-level assumptions?
→ does it change any previous-level:
   Behavior Requirement?
   Scenario Requirement?
   Feature/Slice boundary?
   Domain ownership/invariant?
   Shared Capability boundary?
   Implementation Requirement?
   trust/support assumption?
   Evolution assumption?
→ if YES:
   stop descent
   surface the inconsistency
   propose the upstream change
   obtain approval
   reconcile the upper level
   then resume deeper planning
→ if NO:
   continue
```

This consistency check is required conceptually even when the answer is trivial.

Do not compensate for an upstream inconsistency by adding lower-level complexity.

## Forward consistency check before execution

Before literal code/package execution, check the full approved chain:

```text
Behavior authority
→ approved Implementation Requirements
→ approved Decisions where documented
→ approved implementation architecture/shape
→ exact plan
→ literal code/test proposal
```

The literal proposal must not introduce:
- a new behavior;
- a new durable constraint;
- a new significant pattern/boundary/class responsibility;
- a changed trust/support assumption;
- a different proof meaning;

unless that change was surfaced and approved at the appropriate higher level.
