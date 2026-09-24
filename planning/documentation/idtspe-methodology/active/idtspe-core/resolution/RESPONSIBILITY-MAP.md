# Resolution Responsibility Map

Status: active routing projection

> Semantic Owner Dependency
> Type: `REPRESENTS`
> Responsibility: `DOC.RESPONSIBILITY-MAP`
> Owner: [Responsibility Map](../../../../principles-and-terminology.md#doc-responsibility-map)

This map owns routing only. Destination files own the semantic bodies.

| Responsibility | Canonical owner | Boundary / notes |
|---|---|---|
| Need Candidate collection from grounded USER/Source wanted outcomes | [`NEED-CANDIDATE-COLLECTION.md`](needs/NEED-CANDIDATE-COLLECTION.md#resolution-need-candidate-collection) — `RESOLUTION.NEED-CANDIDATE-COLLECTION` | Intake/provenance only; does not choose semantic destination or invent AI needs |
| Need Candidate disposition after collection | [`NEED-CANDIDATE-DISPOSITION.md`](needs/NEED-CANDIDATE-DISPOSITION.md#resolution-need-candidate-disposition) — `RESOLUTION.NEED-CANDIDATE-DISPOSITION` | Determines natural owner/route; accepted meaning moves to the selected existing owner/lifecycle |
| Finding Candidate disposition and `RE-0..RE-4` Resolution Escalation classification | [`FINDING-DISPOSITION.md`](findings/FINDING-DISPOSITION.md#resolution-finding-disposition) — `RESOLUTION.FINDING-DISPOSITION` | Producer/Lens/validator does not become semantic authority; targeted Revalidation remains a separate Use-Case Process |
| Q/R/P meaning, lifecycle, grouping, review metadata and retention | [`QRP-LIFECYCLE-AND-REVIEW.md`](qrp/QRP-LIFECYCLE-AND-REVIEW.md#resolution-qrp-lifecycle) — `RESOLUTION.QRP-LIFECYCLE` | Q/R/P is secondary state attached to natural semantic owners; Proposal/Decision selection remains separate |
| Proposal candidate semantics, material selection, Decision integration/retention/revalidation boundary | [`PROPOSAL-AND-DECISION-LIFECYCLE.md`](proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE` | Owns candidate→selection lifecycle; Session GIP, Lens evaluation and persistence remain separate concerns |
| Accepted-Decision revalidation/watch projection | [`DECISION-REVALIDATION.resolution-projection.md`](proposal-decision/DECISION-REVALIDATION.resolution-projection.md#resolution-decision-revalidation-projection) — `RESOLUTION.DECISION-REVALIDATION-PROJECTION` | Projection/helper only; accepted Decision and Q/R/P semantics remain with their canonical lifecycle owners |
| Counterfactual Planning Branch semantics | [`PLANNING-BRANCH-COUNTERFACTUAL-EXPLORATION.md`](branches/PLANNING-BRANCH-COUNTERFACTUAL-EXPLORATION.md#resolution-planning-branch) — `RESOLUTION.PLANNING-BRANCH` | Branch-scoped assumed/selected state is counterfactual and does not become canonical Decision authority automatically |
| Sibling Branch comparison coordination for one root divergence | [`BRANCH-COMPARISON-COORDINATOR.md`](branches/BRANCH-COMPARISON-COORDINATOR.md#resolution-branch-comparison) — `RESOLUTION.BRANCH-COMPARISON` | Owns common-baseline/comparison state only; sibling branch semantics and root Decision remain separately owned |
| Planning Resolution State / Resolution Carry-Forward coordination result | [`TM-PLANNING-RESOLUTION-STATE.md`](../target-modules/TM-PLANNING-RESOLUTION-STATE.md#tm-planning-resolution-state) — `RESOLUTION.CARRY-FORWARD` | One result and membership/order/exit contract representing retained Core Decision State; lifecycle semantics and integrated Unit content remain with their respective owners. Proposal/Q/R/P/Evidence retain natural ownership; two stable Collection Units. |

Neighboring owners used by this subtree:

- USER-input classification into Source / Answer / Need / Proposal / Decision: [`../runtime/interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md`](../runtime/interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md)
- operational Proposal/Decision context evaluation / QRPE view: [`../lenses/required/LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT.md`](../lenses/required/LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT.md)
- targeted affected-owner revalidation orchestration: [`../use-cases/revalidate-current-work/UC-IDTSPE-REVALIDATE-CURRENT-WORK.md`](../use-cases/revalidate-current-work/UC-IDTSPE-REVALIDATE-CURRENT-WORK.md)
- physical persistence/placement: [`../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md`](../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md)
