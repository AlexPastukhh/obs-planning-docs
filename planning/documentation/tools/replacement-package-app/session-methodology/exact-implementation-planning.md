# Exact Implementation Planning

Status: active normative detailed procedure
Use Case: DOC-UC-18
Planning levels: [`progressive-planning.md`](progressive-planning.md)
Proposal approval: [`proposal-and-approval.md`](proposal-and-approval.md)

DOC-UC-02 and DOC-UC-03 may invoke this procedure after Domain/Slice-specific discovery. This file owns the generic exact L3/L4 planning method.

## Exact realization as a natural planning endpoint

The existing non-persistent Slice/Aggregate planning idea remains useful:

```text
semantic authority
→ progressively deeper working planning
→ exact realization proposal
→ approval
→ implementation
→ proof
→ delete/reconcile non-persistent working plans
```

Exact planning may legitimately become literal enough to show the exact code/test shape that will be applied.

That literal plan is still a **working proposal**, not durable semantic authority.

Distinguish:

```text
Durable owner documentation
= long-lived behavior / requirements / selected durable decisions

Working exact planning
= temporary detailed realization proposal

Code
= exact realized implementation after approved execution

Tests / executed Evidence
= proof of implementation / behavior

Code/tests/Evidence
= not semantic authority
```


---

## Non-persistent Exact Implementation Planning template

`documentation-templates.md` links here rather than duplicating the full session template.

Recommended working form for L3/L4 planning:

Status:

```text
working / non-persistent by default
not semantic authority
may be discarded after realization
```

Recommended shape:

```text
# Exact Implementation Plan

Planning level:
L3 EXACT IMPLEMENTATION PLAN | L4 LITERAL CODE

Approved upstream authority:
- Feature / Scenario / BR refs
- Slice owner
- Domain / Shared owners
- approved IR/PFR refs

Selected implementation approach:
...

Significant structure:
- class/module:
  responsibility:
  inputs:
  outputs:
  side effects:
  dependencies:
  why this boundary exists:

Exact state/data flow:
...

Exact failure/retry/uncertainty flow:
...

Files:
ADD
- ...

REPLACE
- ...

DELETE
- ...

Candidate classes/methods/signatures:
...

Literal call flow:
...

Exact tests/proof:
- setup
- action
- observation
- failure cases
- determinism/isolation requirements

Reusable guidance used during planning:
<working provenance only when useful>

Open literal details:
- ...

Risks / Known Problems:
- ...

Backward consistency:
- L0:
- L1:
- L2:

Expected literal result:
<code/text or exact patch/file contents at L4>
```

The template is flexible:
- omit irrelevant headings;
- do not force class/method detail before it is useful;
- at L4 it may contain exact full file contents or exact changed portions depending on the task;
- before package creation the final result must be completely determined and reviewed.

Durable outputs discovered during exact planning are **proposals only** until user approval and routing to natural owners.



---
