# APP-RPKG — Replacement Package Application Definition

Status: proposed **upstream Application intent/value definition** spanning the Builder and realization App parts. It is not a current-state snapshot and is not materialized by Evolution Steps.

Downstream implementation may lag this definition. That gap is planned through Evolution Steps.

## RU-APP-01 — Application Identity / Selected Contribution

**Application:** Replacement Package Application

**Selected contribution:** support AI-driven repository work by making mechanically heavy package/repository operations dependable and automatable, while preserving durable work context, reviewability and truthful operation outcomes.

### Application parts

| Part | Selected Application role |
|---|---|
| **Replacement Package Builder** | Mechanical package preparation and verification support for AI-produced repository changes. Existing implementation is evidence; accepted downstream Feature semantics are established through Evolution planning/proof. |
| **Replacement Package App** | Authoritative repository realization plus useful repository-context interaction surfaces. |
| **replacement-package-common / shared implementation** | Reusable mechanics used by parts; not a separate Application and not owner of AB/SR/BR semantics. |

The AI/human actor, GitHub Issue/comments, repository host, ChatGPT and VS Code are external participants unless a selected downstream owner explicitly says otherwise.

## RU-APP-02 — Existing-Solution / Alternative-Route Position

Compare complete routes for the same Benefits, including existing Git/IDE/GitHub workflows, AI tooling, hosted review/integration, hybrid routes and no-custom-software routes. Intentionally search for a route that lets the custom Application shrink or disappear. Do not compare only feature lists.

This challenge applies to both Selected Benefits and material Possible Benefits under evaluation.

## RU-APP-03 — Application Benefits

`Planning position` expresses whether the Application value/need is selected or merely possible; it does **not** claim realization.

<a id="ab-rpkg-realize-ai-repository-work-01"></a>
### AB-RPKG-REALIZE-AI-REPOSITORY-WORK-01 — Realize AI-Created Repository Work

**Planning position:** Selected

**User Need:** AI-created repository work needs to reach the intended local/remote repository result without brittle manual package/repository mechanics dominating the interaction.

**User Receives:** Repository work created by AI can be realized locally and remotely quickly and dependably, with automation where it reduces mechanical effort and with explicit control where it matters.

**Responsibility Boundary:** The Application owns selected mechanical package/repository realization operations and truthful operation results. The AI/human actor remains responsible for semantic repository-work intent, semantic edits, review/selection decisions and the exact authoritative handoff that asks the Application to realize work.

<a id="ab-rpkg-know-repository-work-outcome-02"></a>
### AB-RPKG-KNOW-REPOSITORY-WORK-OUTCOME-02 — Know Repository Work Outcome

**Planning position:** Selected

**User Need:** After a repository operation, the AI/user needs to know what was actually proven, rejected or left uncertain rather than infer success from partial signals.

**User Receives:** AI/user can distinguish proven completion, expected rejection and unresolved uncertainty rather than guessing what happened.

**Responsibility Boundary:** The Application owns truthful mechanical/proof outcomes and attention signals for operations it performs. The AI/human actor owns semantic interpretation, follow-up choice and any decision about whether the work is acceptable.

<a id="ab-rpkg-keep-work-documented-03"></a>
### AB-RPKG-KEEP-WORK-DOCUMENTED-03 — Keep Work Documented For Reuse

**Planning position:** Selected

**User Need:** Repository work may span sessions/reviewers, so useful context/history needs to remain available for continuation and understanding.

**User Receives:** One logical Work has durable GitHub Issue/comment history that can act as practical log/context for the same AI, another AI or a person when work must be resumed or understood.

**Responsibility Boundary:** GitHub and the AI/human actor remain responsible for creating and semantically maintaining Issue/comment history. The Application may consume/expose repository-context conveniences selected downstream, but it does not become the semantic owner of Work narrative/history merely because that context is used by package/repository operations.

<a id="ab-rpkg-delegate-mechanical-repository-work-04"></a>
### AB-RPKG-DELEGATE-MECHANICAL-REPOSITORY-WORK-04 — Delegate Mechanical Repository Work

**Planning position:** Selected

**User Need:** Mechanically derivable package/repository operations should not consume AI semantic attention or require repetitive protocol construction.

**User Receives:** AI can delegate mechanically derivable package/repository operations instead of spending semantic attention and interaction steps on protocol construction or repetitive repository mechanics.

**Responsibility Boundary:** The Application owns the selected deterministic/mechanical operations and their validation. The AI remains responsible for methodology-driven semantic work, orchestration intent and choices that require semantic authority.

<a id="ab-rpkg-review-ai-work-efficiently-05"></a>
### AB-RPKG-REVIEW-AI-WORK-EFFICIENTLY-05 — Review AI Work Efficiently

**Planning position:** Selected

**User Need:** AI-produced repository changes need exact, inspectable result/diff context so review can focus on semantics rather than reconstructing what changed.

**User Receives:** AI-created work can be reviewed by the producing AI and, when useful, another AI using exact resulting artifacts/diffs, with good review quality and reasonable time/steps.

**Responsibility Boundary:** The Application may provide exact package/result/diff/repository context and related mechanical review surfaces selected downstream. The producing/reviewing AI or human remains responsible for semantic review findings, recommendations, Proposals and Decisions.

A newly surfaced Benefit may be retained here with `Planning position: Possible` before selection. `Possible` does not create a future Step or authorize implementation.

Application Benefits are upstream value meaning, not Requirements. A Benefit may be realized jointly by actor actions, Scenarios, Features, Screens and external participants; each Benefit keeps its own Responsibility Boundary rather than relying on one standalone Application-wide boundary unit.

## RU-APP-04 — Representative Real-Life Scenarios

**Detailed representative real-life scenario: NOT SELECTED / NOT CURRENTLY REPRESENTATIVE.**

Reason: the Application supports several AI repository-work contexts. A single detailed surrounding real-life route would either overfit one AI workflow or leak downstream application interaction into Application Definition.

Stable real-life anchors:
- AI/human repository work exists;
- durable Work context/history is useful across iterations/sessions/reviewers;
- mechanically derivable repository operations should not consume semantic AI attention unnecessarily;
- exact review artifacts improve review quality and reduce ambiguity;
- accepted work eventually needs dependable local/remote realization.

These anchors explain the selected Benefits through real-world context but do not become Application Scenario behavior.

`Apply → Commit → Publish`, package wait, Finalize branching, Snapshot generation, VS Code opening and Screen placement are **not** Representative Real-Life Scenario content here; they belong to downstream Scenario/Feature/Screen planning.

## RU-APP-05 — Application Concept

**Summary:** A focused Replacement Package Application that supports AI-driven repository work by taking over bounded mechanical package/repository/context operations while leaving semantic repository-work authority with the AI/human actor. Its overall Benefit is dependable realization, truthful outcomes, reusable context and lower mechanical interaction cost around AI-created repository work.

**How it roughly works:** AI/external actors provide semantic intent/context and explicit handoffs; Builder/App parts perform selected mechanical preparation, realization, publication/context operations and return truthful results; shared implementation supplies reusable mechanics without becoming Application value authority.

This is selected Application intent even where current implementation has not yet conformed to it. Detailed Features, Scenarios, Screens, Domain and implementation mechanics remain downstream owners rather than Application Concept content.

## RU-APP-07 — Realization Feasibility / Evidence Position

Existing Builder/App code demonstrates useful feasibility and implementation candidates, but implementation existence does not settle downstream semantic contracts. Exact downstream planning may keep, modify or replace existing implementation.

Feasibility revalidation must preserve truthful uncertainty and continue challenging whether custom Application scope can shrink through existing/hybrid tools or whether any selected Benefit Responsibility Boundary should narrow.

## Temporal / Evolution guard

Application Definition is refined directly when selected/possible need, contribution, Benefit or Benefit-boundary understanding changes.

```text
Application Definition
≠ current-state owner
≠ Evolution Impact host
≠ Target Application Body
≠ Step Materialization target
```

Evolution Steps reference the relevant `AB-*` / selected contribution intent and realize it through Scenario/Feature/Screen/Domain/Slice/Shared target states.
