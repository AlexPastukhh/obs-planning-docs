# Q/R/P Priority And Related Groups

Status: active IDTSPE Core extension of existing `P-09 Q/R/P`  
Scope: lightweight prioritization and grouping of Questions, Risks and Problems without creating a second Concern runtime.

## 1. Existing Q/R/P Remains The Model

IDTSPE already carries material unresolved:

```text
Q = Question
R = Risk
P = Problem
```

This contract adds optional review/navigation mechanics only. Proposal and Decision candidate/selection semantics are owned separately by [`proposal-and-decision-lifecycle-contract.md`](proposal-and-decision-lifecycle-contract.md).

## 2. Priority

A material Q/R/P may carry impact priority:

```text
P0 / Critical
→ being wrong/unresolved can invalidate broad direction or cause expensive widespread rework

P1 / High
→ materially affects one major Target/owner or several connected parts

P2 / Normal
→ material but mainly local

P3 / Low
→ local, cheaply reversible, low blast radius
```

Priority is impact, not confidence or current review order. Do not assign priority merely because a topic is intellectually complex.

## 3. Related Q/R/P Groups

Related Questions, Risks and Problems may be grouped when that relation helps reasoning/review.

```text
Q-04  What owns retry interval authority?
  ↓ answer affects
R-07  Two runtimes may diverge on retry behavior
  ↓ already contributes to
P-02  Current plan has duplicate retry authority
```

A useful group may be represented as:

```text
QRP-G-02
Members:
  Q-04
  R-07
  P-02
Shared resolution surface:
  retry authority / protocol ownership
```

A QRP Group is a navigation/review projection, not a Target, semantic owner, mandatory State Unit or required persisted register.

## 4. Context Relations

Q/R/P/Evidence should remain related to the planning meaning they actually concern when the relation helps reasoning/review. They may concern a Target, Target Goal context, Question/Problem, Proposal or Candidate Bundle, Result Unit/field, relation/boundary or Decision.

Canonical Proposal/Decision relationship semantics, including `addresses`, Proposal relations, Candidate Bundles, Decision `Selected`/`Rationale`/`Exposes` and retention, are owned by [`proposal-and-decision-lifecycle-contract.md`](proposal-and-decision-lifecycle-contract.md).

## 5. Persistence

Keep Q/R/P with their natural planning/semantic context when useful. Do not create a global Concern Register by default.

A separate register/view is justified only when distributed durable Q/R/P becomes materially expensive to navigate without one; such a view remains a projection over natural owners.

## 6. Minimum Example

```text
Target:
  SL-CAP-01

P-03 / High
  Save and dispatch currently have ambiguous atomicity.

Q-05 / Normal
  Must retry reuse the same durable identity?

R-06 / High
  A retry after partial persistence may duplicate external delivery.

QRP-G-01
  P-03 + Q-05 + R-06
  shared surface: save/dispatch/retry transaction boundary
```
