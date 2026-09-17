# APP-RPKG — Replacement Package Application Definition

Status: proposed **upstream Application intent/value definition** spanning the Builder and realization App parts. It is not a current-state snapshot and is not materialized by Evolution Steps.

Downstream implementation may lag this definition. That gap is planned through Evolution Steps.

## RU-APP-01 — Application Identity / Contribution / Application Benefits

**Selected contribution:** support AI-driven repository work by making mechanically heavy package/repository operations dependable and automatable, while preserving durable work context, reviewability and truthful operation outcomes.

### Application parts

| Part | Selected Application role |
|---|---|
| **Replacement Package Builder** | Mechanical package preparation and verification support for AI-produced repository changes. Existing implementation is evidence; accepted downstream Feature semantics are established through Evolution planning/proof. |
| **Replacement Package App** | Authoritative repository realization plus useful repository-context interaction surfaces. |
| **replacement-package-common / shared implementation** | Reusable mechanics used by parts; not a separate Application and not owner of AB/SR/BR semantics. |

The AI/human actor, GitHub Issue/comments, repository host, ChatGPT and VS Code are external participants unless a selected downstream owner explicitly says otherwise.

### Application Benefits

`Benefit Position` expresses whether the Application value/need is selected or merely possible; it does **not** claim realization.

| Application Benefit | Benefit Position | Plain value |
|---|---|---|
| <a id="ab-rpkg-realize-ai-repository-work-01"></a>**Realize AI-Created Repository Work**<br><code>AB-RPKG-REALIZE-AI-REPOSITORY-WORK-01</code> | **Selected** | Repository work created by AI can be realized locally and remotely quickly and dependably, with automation where it reduces mechanical effort and with explicit control where it matters. |
| <a id="ab-rpkg-know-repository-work-outcome-02"></a>**Know Repository Work Outcome**<br><code>AB-RPKG-KNOW-REPOSITORY-WORK-OUTCOME-02</code> | **Selected** | AI/user can distinguish proven completion, expected rejection and unresolved uncertainty rather than guessing what happened. |
| <a id="ab-rpkg-keep-work-documented-03"></a>**Keep Work Documented For Reuse**<br><code>AB-RPKG-KEEP-WORK-DOCUMENTED-03</code> | **Selected** | One logical Work has durable GitHub Issue/comment history that can act as practical log/context for the same AI, another AI or a person when work must be resumed or understood. |
| <a id="ab-rpkg-delegate-mechanical-repository-work-04"></a>**Delegate Mechanical Repository Work**<br><code>AB-RPKG-DELEGATE-MECHANICAL-REPOSITORY-WORK-04</code> | **Selected** | AI can delegate mechanically derivable package/repository operations instead of spending semantic attention and interaction steps on protocol construction or repetitive repository mechanics. |
| <a id="ab-rpkg-review-ai-work-efficiently-05"></a>**Review AI Work Efficiently**<br><code>AB-RPKG-REVIEW-AI-WORK-EFFICIENTLY-05</code> | **Selected** | AI-created work can be reviewed by the producing AI and, when useful, another AI using exact resulting artifacts/diffs, with good review quality and reasonable time/steps. |

A newly surfaced Benefit may be retained here with `Benefit Position: Possible` before selection. `Possible` does not create a future Step or authorize implementation.

Application Benefits are upstream value meaning, not Requirements. A Benefit may be realized jointly by actor actions, Scenarios, Features, Screens and external participants; the Application does not automatically own every side effect in the route.

## RU-APP-02 — Existing-Solution / Alternative-Route Position

Compare complete routes for the same Benefits, including existing Git/IDE/GitHub workflows, AI tooling, hosted review/integration, hybrid routes and no-custom-software routes. Intentionally search for a route that lets the custom Application shrink or disappear. Do not compare only feature lists.

This challenge applies to both Selected Benefits and material Possible Benefits under evaluation.

## RU-APP-03 — Core Real-Life Scenario Position

**Detailed representative real-life scenario: NOT SELECTED / NOT CURRENTLY REPRESENTATIVE.**

Reason: the Application supports several AI repository-work contexts. A single detailed surrounding real-life route would either overfit one AI workflow or leak downstream application interaction into Application Definition.

Stable real-life anchors:
- AI/human repository work exists;
- durable Work context/history is useful across iterations/sessions/reviewers;
- mechanically derivable repository operations should not consume semantic AI attention unnecessarily;
- exact review artifacts improve review quality and reduce ambiguity;
- accepted work eventually needs dependable local/remote realization.

`Apply → Commit → Publish`, package wait, Finalize branching, Snapshot generation, VS Code opening and Screen placement are **not** real-life scenario content here; they belong to downstream Scenario/Feature/Screen planning.

## RU-APP-04 — Application Concept

One focused Application composed of multiple executable/tool parts.

The selected conceptual split is:
- AI/external actor owns semantic repository-work orchestration and review decisions;
- Application provides bounded mechanical package/repository/context operations and truthful results;
- shared implementation supports those operations without becoming Application value authority.

This is selected Application intent even where current implementation has not yet conformed to it.

## RU-APP-05 — Responsibility Boundary

### Selected boundary intent

**Outside the Application / AI-owned semantic work**
- create/update Issue/comments used as Work log/context;
- create/select semantic AI working branch/context;
- make semantic repository edits;
- decide review/iteration/handoff readiness;
- create the exact handoff to authoritative realization.

**Application contribution**
- mechanically construct/verify exact Replacement Packages from supplied context;
- perform authoritative repository realization/publication/finalization capabilities selected downstream;
- provide repository-context conveniences such as Snapshot/open-folder flows when selected downstream;
- return truthful operation outcomes and attention signals without taking over semantic AI decisions.

This is an upstream responsibility intent, not a claim that every listed downstream capability is already realized.

## RU-APP-06 — Realization Feasibility / Evidence Position

Existing Builder/App code demonstrates useful feasibility and implementation candidates, but implementation existence does not settle downstream semantic contracts. Exact downstream planning may keep, modify or replace existing implementation.

Feasibility revalidation must preserve truthful uncertainty and continue challenging whether custom Application scope can shrink through existing/hybrid tools.

## Temporal / Evolution guard

Application Definition is refined directly when selected/possible need, contribution or boundary understanding changes.

```text
Application Definition
≠ current-state owner
≠ Evolution Impact host
≠ Target Application Body
≠ Step Materialization target
```

Evolution Steps reference the relevant `AB-*` / selected contribution intent and realize it through Scenario/Feature/Screen/Domain/Slice/Shared target states.
