# UC-IDTSPE-AI-WORKING-BOUNDARY — Apply AI Working Authority Boundary

Status: active fundamental IDTSPE runtime Use Case

<a id="uc-idtspe-ai-working-boundary"></a>
Responsibility ID: `IDTSPE.UC.AI-WORKING-BOUNDARY`

## Situation

Any current Planning/repository work is starting or continuing after primary bootstrap, whether the USER entered through ordinary natural language or through a Planning Command.

This Use Case is **always logically active**. It is not a USER command, a special AI mode, or a separate runtime shell. Planning Commands may guarantee traversal to this Use Case, but the methodology must remain sufficient without Helper/command invocation.

## Ownership Boundary

This Use Case owns the reusable **application/orchestration of the AI working authority boundary**. It does not duplicate the semantic rules owned by the contracts it invokes.

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`AI Working Contract`](../../../../../../../../source-context/planning/AI-WORKING-CONTRACT.md#planning-ai-working-contract) — `PLANNING.AI-WORKING-CONTRACT`
> - `CONTEXTUALIZES` [`Session Runtime Contract`](../../../../../../../../source-context/planning/session/session-runtime-contract.md#session-runtime-contract) — `SESSION.RUNTIME-CONTRACT`
> - `CONTEXTUALIZES` [`Proposal And Decision Lifecycle`](../../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`
> - `CONTEXTUALIZES` [`USER Input, Decision And Answer Intake`](../../runtime/interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md#idtspe-user-input-intake) — `IDTSPE.USER-INPUT-INTAKE`

The linked owners retain authority for USER↔AI interaction, Generic AI Proposal (GIP), formal IDTSPE Proposal/Decision semantics, USER input classification, repository permissions and mutation authorization.

## Result

The current work has an explicit, current authority boundary: the AI can continue deterministically within already granted authority, useful recommendations are surfaced through the appropriate interaction layer, accepted meaning is not silently changed, and USER authority is requested only when a real USER-owned choice/authorization is required.

This Result is an ambient working constraint. It does not create a Target, Proposal, Decision, Finding, Need, command invocation, repository mutation or separate persistent state merely because the Use Case is active.

## Process

1. Reaffirm the current [`AI Working Contract`](../../../../../../../../source-context/planning/AI-WORKING-CONTRACT.md#planning-ai-working-contract). Reuse trustworthy current knowledge; reread affected owners when authority, methodology, permission or interaction semantics are stale/uncertain.
2. Resolve the current USER authorization and permission boundary from the ambient Session contract plus any explicit invocation boundary. A Planning Command can constrain/guarantee traversal for a USER invocation; it does not grant the AI a separate internal command language and does not expand repository mutation/commit/push authority beyond its direct permission contract.
3. For the next material action, distinguish the natural route instead of collapsing all AI output into one ceremony:
   - deterministic work already inside accepted meaning and granted authority → continue through the natural methodology owner;
   - useful interaction-level recommendation or intended action that benefits from USER review/authorization → use the Session-owned GIP boundary proportionally;
   - material selectable semantic change to accepted/current meaning — including a Finding dispositioned as `RE-2` / `RE-4` — → form/refine the canonical formal IDTSPE Proposal before selection; a GIP may present/reference it but MUST NOT substitute for it;
   - USER facts, answers, wanted outcomes, concrete candidate meaning or decisions → classify through the USER-input intake owner rather than inventing USER intent.
4. Preserve the `No Silent Promotion` invariant from the AI Working Contract and Proposal/Decision lifecycle. AI recommendation, GIP, formal Proposal and accepted Decision remain distinct.
5. Ask the USER only when the current owner requires USER authority, selection, missing USER-only information, or authorization that cannot be derived from accepted/current Sources. Do not manufacture a USER gate when methodology/source facts already determine the next step.
6. Return the reaffirmed boundary to the current work and continue through the applicable Use-Case/component owner. This Use Case does **not** execute every downstream Proposal/GIP/Decision path merely because those paths are available.

## Fundamental Composition Rule

The fundamental [`UC-DOC-RESOLVE-CURRENT-USE-CASES`](../../../../../../../../source-context/planning/documentation/use-cases/UC-DOC-RESOLVE-CURRENT-USE-CASES.md) MUST reaffirm this Use Case as part of every current Planning/repository work entry before narrower functional work proceeds. That makes the authority boundary available for both ordinary natural-language methodology work and command-driven Helper traversal.

```text
ordinary natural-language work
→ fundamental methodology Use-Case applicability resolver
→ UC-IDTSPE-AI-WORKING-BOUNDARY
→ applicable methodology Use Cases / owners

USER Planning Command
→ command dependency traversal guarantee
→ recheck-methodology-use-cases.command.md
→ fundamental methodology Use-Case applicability resolver
→ UC-IDTSPE-AI-WORKING-BOUNDARY
→ applicable methodology Use Cases / owners
```

Commands are a USER↔AI invocation surface. The AI does not call Planning Commands as an internal methodology mechanism. Command composition guarantees a reproducible traversal of canonical methodology that must already be navigable through its own references, responsibility maps and handoffs.
