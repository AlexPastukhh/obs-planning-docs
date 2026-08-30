# Q/R/P Priority, Related Groups, Idea Context And Decision Trace

Status: active IDTSPE Core extension of existing `P-09 Q/R/P` and `P-10 Decision` ports  
Scope: add lightweight prioritization, contextual Idea/Q-R-P relationships and Decision trace/rationale without creating a second Concern runtime.

## 1. Existing Q/R/P Remains The Model

IDTSPE already carries material unresolved:

```text
Q = Question
R = Risk
P = Problem
```

This contract does **not** add Q/R/P to IDTSPE and does not create a new semantic root. It only adds optional mechanics useful for review and repeated planning.

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

Priority is **impact**, not confidence and not current review order.

Do not assign a priority merely because the topic is intellectually complex.

## 3. Related Q/R/P Groups

Related Questions, Risks and Problems may be grouped when the relationship is useful for reasoning/review.

Typical relation:

```text
Q-04  What owns retry interval authority?
  ↓ answer affects
R-07  Two runtimes may diverge on retry behavior
  ↓ already contributes to
P-02  Current plan has duplicate retry authority
```

A group is justified when members share a meaningful causal/dependency/resolution surface.

```text
QRP-G-02
Members:
  Q-04
  R-07
  P-02
Shared resolution surface:
  retry authority / protocol ownership
```

A QRP Group is a **navigation/review projection**, not a new Target, not a separate semantic owner and not a required persistent register.

Do not group unrelated items merely because they are in the same Target.

## 4. Idea / Q-R-P Context

Q/R/P/Evidence should be related to the planning meaning they actually concern when that relation helps reasoning/review. They may attach to the Target, Goal/Desired Outcome, Question/Problem, one Idea, several Ideas/Candidate Bundle, Result Unit/field, relation/boundary or Decision.

A material Idea normally `addresses` the current Target Goal / a Question / a Problem and may compete/complement/require/conflict with other Ideas. The Target Goal is Target/scope context rather than a new Generic State Unit. Candidate Bundles are lightweight grouping projections, not a new Q/R/P root or mandatory State Unit.

Canonical interaction/Idea relation owner: [`broad-discussion-and-integration-checkpoint-model.md`](broad-discussion-and-integration-checkpoint-model.md).

## 5. Decision Trace — Addresses / Selected / Rationale / Exposes

A material Answer Decision may explicitly trace its decision context:

```text
Decision D-12
Addresses:
  Q-04
  P-02

Selected:
  I-07 + I-09   # or a Candidate Bundle when useful

Rationale / Why:
  concise selection reasoning when worth retaining

Exposes:
  R-09
```

`Addresses` means the Decision answers, resolves, mitigates or otherwise materially handles the referenced Target Goal context / Question / Problem / Q-R-P. It does **not** imply every referenced Risk disappeared completely.

`Selected` links the accepted Decision to the Idea(s)/Candidate Bundle selected when that trace helps understanding. `Rationale / Why` is optional selection reasoning and is distinct from Evidence. `Exposes` means the Decision creates, reveals or makes material a Question/Risk/Problem that now deserves attention.

This allows repeated IDTSPE work to distinguish:

```text
what this Decision solved
what remains residual
what new uncertainty/risk/problem became visible because of the Decision
```

## 6. Retention / Persistence

Retain an accepted material Decision in integrated semantic state by default. At a checkpoint, ask whether to retain a concise rationale when a new material Decision has none, and ask whether material non-selected/deferred/rejected/superseded alternatives should be retained; trivial alternatives may remain conversational. Keep durable trace with the natural Target/Decision owner when value exists.

Do not create a global Concern Register by default. A separate register/view is justified only when distributed durable Q/R/P becomes expensive to navigate without one, and even then it remains a projection over natural owners.

## 7. Minimum Example

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

Decision D-08
  persist CaptureItem before external dispatch;
  dispatch is independently retryable with stable identity

Rationale / Why:
  preserve one durable local identity before side effects so retries can be reasoned about independently

Addresses:
  P-03
  Q-05

Exposes:
  R-09 — external provider idempotency is not guaranteed
```
