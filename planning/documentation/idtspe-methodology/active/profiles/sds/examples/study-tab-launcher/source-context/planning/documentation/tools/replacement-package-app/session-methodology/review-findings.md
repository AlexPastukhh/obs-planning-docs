# Review Findings

Status: active normative detailed procedure
Use Case: DOC-UC-17
Planning levels: [`progressive-planning.md`](progressive-planning.md)
Proposal approval: [`proposal-and-approval.md`](proposal-and-approval.md)

## Review findings — session owner semantics


This Session owner defines transient finding classification, level prioritization,
presentation, persistence and re-entry into planning.

Findings are **not** durable product-owner ontology.

Recommended classes:

```text
RF-REALIZATION-ONLY
→ likely exact implementation/proof realization only

RF-POSSIBLE-NEW-IR
→ may reveal a missing durable Implementation Requirement

RF-POSSIBLE-IR-CHANGE
→ may require strengthening/weakening/merging/replacing/retiring an IR/PFR

RF-RECONSIDER-IR-SET
→ may show the current Requirement/Decision set or ownership shape is over-complicated/wrong

RF-POSSIBLE-BEHAVIOR-IMPACT
→ may affect Behavior / Scenario / Feature-Slice boundary /
  support / trust / owner meaning
```

The classification is only the first pass.
Every finding also receives planning-level impact:

```text
Discovered at level:
...

Highest affected level:
...

Affected levels:
...

Upstream revalidation:
NONE | POSSIBLE | REQUIRED

Downstream consequence if accepted:
NONE | REVALIDATE ... | INVALIDATE ...
```

Review ordering follows **Highest affected level**, not severity label alone.

Example:

```text
RF-REALIZATION-ONLY
Discovered at: L4
Highest affected: L3
→ review with L3 items

RF-POSSIBLE-BEHAVIOR-IMPACT
Discovered at: L4
Highest affected: L0
→ move to the L0 review queue before continuing downstream planning
```

A realization-only finding still requires a concrete change proposal before execution.
Its proposal may be compact and the user may approve a group of such lower-level proposals quickly.

Recommended transient finding form:

```text
Finding:
...

Classification:
RF-...

Current planning level:
...

Discovered at level:
...

Highest affected level:
...

Affected levels:
...

Affected current authority:
...

Likely action:
...

Upstream revalidation:
...

Downstream consequence if accepted:
...

Complexity delta:
...

Complexity consequence:
...

Requirement change proposed:
YES | NO | POSSIBLE

User confirmation required for actual change:
YES

Notes / evidence:
...
```

Persistence:

```text
default
→ finding remains transient in chat/session work

persist only when user explicitly asks
→ selected future session repository / review artifact / work note

durable product owners
→ never become finding logs
→ preserve only resulting current Requirements/Decisions/risks/problems/semantics
```

Finding outcomes are routed to the natural methodology/product owner:

```text
NO-DOC-CHANGE
NO-REQUIREMENT-CHANGE
MODIFY-EXISTING
SIMPLIFY-SET
NEW-REQUIREMENT
UPSTREAM-REVALIDATION
```

The Requirements methodology owns what those durable Requirement outcomes mean.
Session Methodology owns how findings are classified, prioritized, reviewed and routed.
