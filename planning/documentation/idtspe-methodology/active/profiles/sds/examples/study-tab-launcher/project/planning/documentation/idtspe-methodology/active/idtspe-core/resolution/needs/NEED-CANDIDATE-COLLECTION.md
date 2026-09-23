# Need Candidate Collection Contract

Status: active generic IDTSPE Core intake owner
Purpose: collect grounded Need Candidates from explicit USER/Source wanted outcomes without prematurely deciding their semantic destination or inventing AI-authored needs.

<a id="resolution-need-candidate-collection"></a>
## 1. Core Definition

Responsibility ID: `RESOLUTION.NEED-CANDIDATE-COLLECTION`

```text
Need Candidate Collection
= intake operation that identifies explicit or sufficiently evidenced
  wanted outcomes / capabilities / properties / constraints
  from USER or Source context and preserves their provenance.
```

Collection does **not** determine the final semantic owner/solution. That is owned by [`Need Candidate Disposition`](NEED-CANDIDATE-DISPOSITION.md#resolution-need-candidate-disposition).

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`USER Input Intake`](../../runtime/interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md#idtspe-user-input-intake) — `IDTSPE.USER-INPUT-INTAKE`
> - `CONTEXTUALIZES` [`Need Candidate Disposition`](NEED-CANDIDATE-DISPOSITION.md#resolution-need-candidate-disposition) — `RESOLUTION.NEED-CANDIDATE-DISPOSITION`

## 2. Provenance Boundary

Collect a Need Candidate only when a wanted outcome is grounded in USER/Source meaning.

```text
USER/Source wanted outcome
→ Need Candidate

AI improvement idea / preference
→ GIP or Proposal as appropriate
→ NOT a USER Need Candidate
```

Preserve exact USER/Source wording or a precise Source reference when the candidate is persisted independently. A normalized desired outcome is derived interpretation and remains reviewable.

## 3. Collection Result

A proportional candidate may expose:

```text
exact provenance / Source reference
normalized wanted outcome
current subject/context when known
constraints or acceptance meaning stated by USER/Source
open ambiguity that affects interpretation
```

Do not require destination, solution, Target, Requirement, Proposal or temporal placement during collection.

## 4. Boundary With Findings / Proposals

```text
wanted outcome without concrete answer
→ Need Candidate

concrete candidate answer/solution
→ Proposal candidate

reported/discovered contradiction or defect against accepted meaning
→ Finding Candidate
```

If a collected Need later proves already required by accepted meaning but contradicted by realization/Evidence, Need Disposition may route the semantic consequence through Finding Disposition.
