# SDS Worked Flow Reference — Research Capture

Status: active compact semantic example

This is a current **orientation example**, not a mandatory phase sequence and not a prescribed project file tree. Runtime composition still starts from the Methodology Use-Case Registry Map and applicable IDTSPE Use Cases.

## 1. Start Lightweight

```text
USER concern:
  preserve useful research material without losing reading context

UC-IDTSPE-COMPOSE-CURRENT-WORK
→ Broad Discussion is initially sufficient
```

No Target, Lens or Checkpoint is created merely because SDS is installed.

## 2. Application Definition — only when the own-software boundary is material

Existing alternatives are compared only as far as needed:

```text
bookmarks
read-later / notes tools
manual copy
small own capture application
```

Suppose the selected own-software contribution is:

```text
very fast temporary capture
+ later review/triage
```

`TM-APPLICATION-DEFINITION` owns that application contribution/boundary. A Prototype may be used if low-friction capture is still an empirical uncertainty.

## 3. Feature Owners — primary behavior authority

Two independently useful application capabilities emerge:

```text
FEAT-CAPTURE-ITEM
  Principal Result:
    selected material + source context is durably accepted
    and the application returns a truthful success/failure result

  BR-CAP-01:
    success is returned only after durable acceptance

FEAT-REVIEW-ITEM
  Principal Result:
    a previously captured item can be reviewed and triaged

  BR-REV-01:
    review operates on the currently stored captured-item meaning
```

Feature behavior and behavior-facing semantic data stay with the Feature owners.

## 4. Scenario — journey composition, not behavior ownership

A Scenario becomes useful when the actor-to-benefit journey across Feature results needs independent composition:

```text
SCN-CAPTURE-THEN-REVIEW

Actor/context:
  researcher notices useful material while reading

Journey:
  FEAT-CAPTURE-ITEM result
  → actor continues reading
  → later returns
  → FEAT-REVIEW-ITEM result

Continuity:
  captured item identity + source context survive between Feature results

Terminal Benefit:
  useful material is preserved without interrupting reading
  and can be intentionally reviewed later
```

The Scenario references Feature results; it does not copy or redefine their BRs.

## 5. Screen — only when spatial/navigation composition matters

```text
SCREEN-CAPTURE
  exposes FEAT-CAPTURE-ITEM
  shows selected source context and truthful result

SCREEN-REVIEW
  exposes FEAT-REVIEW-ITEM
  supports list/detail/re-entry
```

Screen owns spatial/navigation meaning, not Feature behavior or frontend class topology.

## 6. Domain discovery → durable Domain owner only when justified

Capture behavior exposes a semantic concept:

```text
CaptureItem
  stable identity
  durable content
  source context
  accepted/reviewed lifecycle pressure
```

If the meaning is still exploratory:

```text
TM-DOMAIN-DISCOVERY
→ working candidates / invariants / boundary questions
```

If that responsibility becomes independently durable/useful:

```text
TM-DOMAIN-OWNER
  RU-DOWN-01 Domain Semantic Contract
  RU-DOWN-02 Domain Implementation Requirements — only if material
```

No durable Domain owner is created merely because a noun/class exists.

## 7. Slice discovery → optional durable Slice owner

When `FEAT-CAPTURE-ITEM` needs concrete end-to-end realization reasoning:

```text
TM-IMPLEMENTATION-SLICE
  RU-SLICE-01 Whole-Slice Responsibility / Candidate Structure
  RU-SLICE-02 Semantic Application Entry / Result Boundary
  RU-SLICE-03 Step-by-Step End-to-End Realization
  RU-SLICE-04 Feature Integration Proof
  RU-SLICE-05 Evolution / OPEN Slice Pressure — only when material
```

Example working path:

```text
capture request
→ semantic application entry
→ CaptureItem validation/creation
→ persistence
→ truthful result mapping
```

If the selected end-to-end responsibility needs durable ownership:

```text
TM-SLICE-OWNER
→ durable Slice responsibility/boundary
→ owner-local IR-SLICE-* only when materially needed
```

There is no separate Slice Strategy Target. Cross-Slice coverage/order/use maps are derived/supporting coordination views when useful.

## 8. Shared capability — only under real reuse pressure

Suppose both Capture and Review need the same coherent non-end-to-end audit context mechanism.

Do not extract it merely because code can be shared. `TM-SHARED-IMPLEMENTATION-CAPABILITY` is considered only when its consumer/evolution gate is satisfied and the responsibility is genuinely reusable.

If the candidate instead owns Aggregate state/invariants/lifecycle/policy, it belongs to Domain.

## 9. Evolution

A selected future change is represented through Evolution:

```text
Evolution Step:
  Add PDF source support

Affected:
  FEAT-CAPTURE-ITEM
  CaptureItem / SourceContext meaning
  capture Slice responsibility

Current prepare-now question:
  is a small source-variation seam justified now,
  or should the change be deferred?
```

`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` evaluates change isolation / prepare-now-vs-defer pressure. The future Step is not silently copied into each current owner as a second roadmap.

## 10. Exact Realization / Evidence

When accepted meaning is sufficient:

```text
current Feature + relevant Domain/Slice/Screen/Scenario sources
→ TM-EXACT-REALIZATION
→ literal code/tests/config/result
→ actual build/test Evidence under authorization
```

If proof design is materially non-trivial:

```text
LENS-TEST-PROOF-EVIDENCE
→ natural owner-local proof planning
→ TM-EXACT-REALIZATION
```

If the question requires the **real implemented subject/environment**:

```text
TM-PRACTICAL-TEST
→ actual practical Evidence
```

## 11. What this example demonstrates

```text
IDTSPE always active
≠ full ceremony always active

Feature
= primary behavior owner

Scenario
= journey composition

Screen
= spatial/navigation composition

Domain Discovery
= transient exploration

Domain Owner
= optional durable semantic responsibility

Implementation Slice
= transient end-to-end realization discovery

Slice Owner
= optional durable end-to-end implementation responsibility

Shared
= reusable non-end-to-end implementation responsibility under real consumer pressure

Evolution
= selected future target-state/change reasoning

Exact / Evidence
= literal realization + what actually happened
```

Physical owner/file placement is proportional; see [`../ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md).
