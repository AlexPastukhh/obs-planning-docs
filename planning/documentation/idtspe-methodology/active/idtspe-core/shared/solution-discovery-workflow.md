# Generic Need / Real-Life Solution Discovery Workflow

Status: reusable optional Core orchestration guide

## Purpose

Use when the requested work starts with a real-world problem/desired outcome and
there is not yet a trusted explicit own-Application intent.

The goal is not “find an app”. The goal is to resolve enough Need/Reality and
real-life route meaning to know whether an own Application contribution is useful
at all.

## Optional Route

```text
Trigger / user situation
↓
trusted Need / Reality already available?
├─ yes → reuse it
└─ no  → form a bounded Need / Reality Target when materially useful
↓
real-life solution / route discovery
↓
compare proportionally:
  current/manual route
  existing product/service
  process change
  integration/adaptation
  custom Application contribution
  hybrid
  defer/no-change
↓
selected real-life result / route(s)
↓
own-software contribution, if any
```

Valid result:

```text
no own Application needed
```

## Need / Reality Resolution Aid

A useful bounded local Target may contain proportionally:

```text
Target Scope
Actor / Stakeholder
Desired Real-World Outcome
Current Reality
Current Workflow(s) / Existing Routes
Pain / Gap / Pressure
Why It Matters
Evidence
Constraints
Success Meaning
Boundaries / Non-Goals
Open Solution Slot(s)
material Questions / Q-R-P / Decisions
Sources For Next Work
```

Default Resolution Question candidates:

```text
What is the actor trying to obtain in reality?
How is it done now?
Where exactly is the friction/gap?
What counts as a good observable result?
What is Need vs an already-proposed Solution?
Which constraints/Evidence/unknowns can change the answer?
```

These are internal Resolution questions, not a mandatory user interview.

## Real-Life Route Target Formation

There is no fixed universal “Solution Target Type”. Normal Target Formation may
select one or more bounded route/comparison Targets when independently useful.

Useful patterns:

### One bounded route comparison

```text
Need Source
actor/context
starting situation
current route(s)
gap/friction
candidate route Ideas
Evidence/constraints
selected route/result
outside
handoff
```

### Several independent scopes

```text
T-A
T-B
T-C

relations:
  PART_OF
  PARALLEL_WITH
  PRECEDES
  FLOW_TO
  OVERLAPS_WITH
  ALTERNATIVE_TO
  CONTRIBUTES_TO
```

Topology relation never grants Source authority automatically.

### Material composition

Create a composition Target only when combining already accepted outputs creates
new material choices such as compatibility/order/shared responsibility. If the
parts combine mechanically, no new Target is required.

## User Authority

AI-generated scope/route candidates remain proposals/Ideas until accepted under
normal authority. Do not smuggle a proposed Application/technology into the Need.

Ask a user question only when a material user-only fact cannot be resolved from
Sources and different answers change the decision.

## Downstream Handoff

Typical accepted Source package for an Application Definition:

```text
Fundamental Need / desired outcome
selected real-life route/result(s)
actor/manual/external responsibilities
accepted/rejected alternatives when material
Evidence/constraints
selected own-software contribution / Solution Slot
residual material Q/R/P
```

If trusted explicit Application intent/contribution already exists, SDS may enter
at `TM-APPLICATION-DEFINITION` without running this guide first.
