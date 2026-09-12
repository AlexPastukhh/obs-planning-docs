# Planning Concerns / Decision Compatibility Map

Status: compatibility/provenance only; **not a current semantic owner**
Purpose: preserve old links/vocabulary while routing former Planning Concern / Concern Group / Decision-trace semantics to current IDTSPE Core owners.

## Current Owners

```text
Question / Risk / Problem semantics, lifecycle, priority/category,
grouping, retention, provenance and representation boundary
→ idtspe-methodology/active/idtspe-core/shared/qrp-lifecycle-and-review-contract.md

Proposal / Decision candidate-selection lifecycle, relations,
rationale/trace, alternative retention and revalidation
→ idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md

AI review projection, Key Points, Review Priority, Q/R/P analysis surface
and proportional pre-return recheck
→ idtspe-methodology/active/ai-reviewability/README.md

physical persistence / area register / one-detail-location realization
→ idtspe-methodology/active/idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md
```

Direct links:

- [`idtspe-methodology/active/idtspe-core/shared/qrp-lifecycle-and-review-contract.md`](idtspe-methodology/active/idtspe-core/shared/qrp-lifecycle-and-review-contract.md)
- [`idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md`](idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md)
- [`idtspe-methodology/active/ai-reviewability/README.md`](idtspe-methodology/active/ai-reviewability/README.md)
- [`idtspe-methodology/active/idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md`](idtspe-methodology/active/idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md)

## Vocabulary Mapping

```text
legacy Planning Concern
→ current material Question | Risk | Problem

legacy Concern Group
→ current related Q/R/P Group

legacy Concern Priority
→ current Q/R/P impact Priority (P0..P3)

legacy Concern Category
→ current Q/R/P Review Category

legacy AI Comment
→ current AI Reviewability projection over the Q/R/P surface

legacy Generic Decision Trace
→ current Proposal / Decision lifecycle trace

legacy Area Concern Register
→ optional Q/R/P register/index representation resolved through P-14
```

## Compatibility Rule

Old files may link here while being migrated, but this file must not be extended with new Q/R/P, Proposal, Decision, reviewability or persistence semantics.

When old wording conflicts with a current owner above, the current owner wins. New methodology work links the current owner directly instead of treating this compatibility map as authority.
