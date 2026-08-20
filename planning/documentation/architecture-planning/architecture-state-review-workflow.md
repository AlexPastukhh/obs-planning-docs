# Architecture State Review Workflow

Status: active reusable workflow
Scope: understand/review current Workspace Architecture State relative to the important work the Workspace must support.

## 1. Purpose

Architecture State is not a component inventory or health score. It is an inspectable explanation of how the current architecture supports important Workspace work and where material risks/complexity exist.

## 2. Inputs

Read proportionally:

```text
Current Workspace Reality
important Workspace UCs
Workspace Change Cases / Extensions
representative Workspace Work Paths
Runtime Realization Paths when relevant
current Change Pressure / Change Axes / Hot Paths
Requirements / Constraints
existing Architecture Decisions / Intent
current owners / boundaries / state authorities
```

## 3. Review Current Work Support

Ask:

```text
Can important UCs be performed correctly?
Can they be understood/navigated reasonably?
Are canonical owners and terms discoverable?
How much incidental context must be remembered?
Are common changes local enough?
Are important runtime/failure boundaries reasonable?
```

Do not infer architectural quality from the presence of DDD, layers, interfaces or other patterns.

## 4. Explain Existing Complexity

For material complexity identify its intent/payment when known:

```text
Requirement / invariant
important Workspace UC
Workspace Change Case
Change Axis
verification / operational / security need
explicit accepted trade-off
```

Classify proportionally as Essential/Intentional, Accidental, Speculative or Legacy complexity.

## 5. Identify Maintainability Risks

A `Maintainability Risk` needs evidence that important expected Workspace work is becoming unnecessarily expensive, risky or opaque under current architecture.

A visually ugly but correct rarely touched area with no material axis may be low priority.

## 6. Exit Result

```text
Current Architecture State / baseline
important architecture intent
known expensive Understanding/Change/Runtime paths
intentional vs accidental/speculative/legacy complexity findings
Maintainability Risks
revisit triggers / recommended Decision or Evolution work when material
```

A valid conclusion is `current architecture is proportionate; no architecture change justified now`.
