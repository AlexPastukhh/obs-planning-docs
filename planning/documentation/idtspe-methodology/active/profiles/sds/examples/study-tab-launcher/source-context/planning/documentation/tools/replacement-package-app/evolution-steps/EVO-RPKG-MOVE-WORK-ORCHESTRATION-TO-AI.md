# EVO-RPKG-MOVE-WORK-ORCHESTRATION-TO-AI — Move Work Orchestration To AI

[← Evolution Steps Map](../navigation/EVOLUTION-STEPS-MAP.md)

Planning Position: **Selected / Planned**  
Target Resolution: **Partial Target**
Change Surface: **Behavioral / boundary realization**  

## Driven By Application Definition
- [Keep Work Documented For Reuse](../application-definition.md#ab-rpkg-keep-work-documented-03)
- [Delegate Mechanical Repository Work](../application-definition.md#ab-rpkg-delegate-mechanical-repository-work-04)
- [Review AI Work Efficiently](../application-definition.md#ab-rpkg-review-ai-work-efficiently-05)
- selected Application boundary intent: AI owns semantic Work orchestration; Application owns bounded mechanical capabilities.

## Entering From
- realized/materialized [`Establish Replacement Package Construction`](EVO-RPKG-ESTABLISH-REPLACEMENT-PACKAGE-CONSTRUCTION.md) plus the then-current downstream owner state

## Step Purpose
Make AI the explicit owner of semantic Work orchestration: Issue creation/update/comments, AI working branch/context, semantic edits/review decisions and final App handoff. Builder/App consume exact supplied Work/repository/branch/package context instead of owning the AI work process.

## Owner Impacts


### Scenario Impact — current Complete Repository Work — RETIRED / SPLIT
The current broad Scenario is replaced by two clearer actor/application journeys:
1. **Develop And Review Repository Work** — AI-owned work loop with Builder mechanical support;
2. **Realize Reviewed Repository Work** — authoritative App realization from exact handoff.

### Apply Feature Impact — UNCHANGED AT BEHAVIOR LEVEL
Current Apply behavior already consumes exact Work/package/branch context. This Step changes who supplies/owns that context upstream; do not manufacture new Apply BR merely because ownership moved.

### Slice Impact
- current App `Manage Work Intent` semantic responsibility is retired;
- current `Start Work Workspace` responsibility changes: App may prepare an internal isolated checkout needed for realization, but branch identity is supplied by the handoff/AI and is not Application-owned semantic Work creation.


## Complete Target Scenario Body A — Develop And Review Repository Work

<a id="scn-rpkg-develop-and-review-repository-work"></a>
# SCN-RPKG-DEVELOP-AND-REVIEW-REPOSITORY-WORK — Develop And Review Repository Work

## Realizes Application Benefits
- [Keep Work Documented For Reuse](../application-definition.md#ab-rpkg-keep-work-documented-03)
- [Delegate Mechanical Repository Work](../application-definition.md#ab-rpkg-delegate-mechanical-repository-work-04)
- [Review AI Work Efficiently](../application-definition.md#ab-rpkg-review-ai-work-efficiently-05)

## Scenario Requirements
| SR | Type | Plain meaning | QRPE / Examples |
|---|---|---|---|
| <a id="sr-rpkg-ai-owns-work-documentation-01"></a>**AI Owns Work Documentation**<br><code>SR-RPKG-AI-OWNS-WORK-DOCUMENTATION-01</code> | Responsibility / Context | AI creates/updates the exact Work Issue/comments; Builder/App do not silently create competing semantic Work records. | Target Good Example: AI records intent/review in one Issue and tools consume WorkId.<br>Problem Example: App creates another Issue because it cannot find one by label. |
| <a id="sr-rpkg-ai-owns-working-branch-02"></a>**AI Owns Working Branch**<br><code>SR-RPKG-AI-OWNS-WORKING-BRANCH-02</code> | Responsibility / Context | AI creates/selects the semantic working branch/context used for its work. | Problem Example: Builder invents a branch based on recency. |
| <a id="sr-rpkg-delegate-package-mechanics-03"></a>**Delegate Package Mechanics**<br><code>SR-RPKG-DELEGATE-PACKAGE-MECHANICS-03</code> | Efficiency / Delegation | AI supplies desired semantic result/explicit deletes; Builder owns mechanically derivable package construction. | Target Good Example: AI does not hand-author PACKAGE.json/base/replacement ZIP structure. |
| <a id="sr-rpkg-ai-decides-handoff-readiness-04"></a>**AI Decides Handoff Readiness**<br><code>SR-RPKG-AI-DECIDES-HANDOFF-READINESS-04</code> | Control / Review | AI, after its review and optional second-AI review, decides whether the iteration is ready and creates the exact App handoff. | Problem Example: Builder auto-sends a package merely because build succeeded. |

## Main User/Actor Path
| SPS | Actor/application action | Participant | Result | Attached SR |
|---|---|---|---|---|
| <a id="sps-rpkg-ai-start-work-01"></a>**AI Starts Work**<br><code>SPS-RPKG-AI-START-WORK-01</code> | AI creates/selects exact Work Issue and semantic working branch and records initial intent. | AI + GitHub/repository host (outside Application) | documented Work + branch context | AI Owns Work Documentation; AI Owns Working Branch |
| <a id="sps-rpkg-ai-produce-change-02"></a>**AI Produces Semantic Change**<br><code>SPS-RPKG-AI-PRODUCE-CHANGE-02</code> | AI edits/derives desired repository result and explicit delete intent. | AI | desired change intent | — |
| <a id="sps-rpkg-build-package-03"></a>**Build Replacement Package**<br><code>SPS-RPKG-BUILD-PACKAGE-03</code> | AI invokes Builder with exact supplied context/desired files/deletes. | [Build Replacement Package](EVO-RPKG-ESTABLISH-REPLACEMENT-PACKAGE-CONSTRUCTION.md#f-rpkg-build-replacement-package) | exact Replacement Package | Delegate Package Mechanics |
| <a id="sps-rpkg-review-iteration-04"></a>**Review Iteration**<br><code>SPS-RPKG-REVIEW-ITERATION-04</code> | AI reviews the exact change/package artifacts available in this Step state; optional second AI may review. | AI / optional other AI | accept/revise decision | AI Decides Handoff Readiness |
| <a id="sps-rpkg-record-and-continue-or-handoff-05"></a>**Record And Continue Or Handoff**<br><code>SPS-RPKG-RECORD-AND-CONTINUE-OR-HANDOFF-05</code> | AI records useful iteration/review context in Issue/comments, then either revises or creates exact App handoff. | AI + GitHub | next iteration or handoff | AI Owns Work Documentation; AI Decides Handoff Readiness |

Selected branch structure:
- revise → return to semantic change / Builder cycle;
- ready → create exact handoff and enter **Realize Reviewed Repository Work**.

The branch is a Scenario solution, not a Requirement.

## Complete Target Scenario Body B — Realize Reviewed Repository Work

<a id="scn-rpkg-realize-reviewed-repository-work"></a>
# SCN-RPKG-REALIZE-REVIEWED-REPOSITORY-WORK — Realize Reviewed Repository Work

## Realizes Application Benefits
- [Realize AI-Created Repository Work](../application-definition.md#ab-rpkg-realize-ai-repository-work-01)
- [Know Repository Work Outcome](../application-definition.md#ab-rpkg-know-repository-work-outcome-02)

## Scenario Requirements
| SR | Plain meaning |
|---|---|
| <a id="sr-rpkg-consume-exact-ai-handoff-05"></a>**Consume Exact AI Handoff**<br><code>SR-RPKG-CONSUME-EXACT-AI-HANDOFF-05</code> | App realization stays bound to exact repository/Work/branch/package supplied by AI handoff. |
| <a id="sr-rpkg-return-truthful-realization-result-06"></a>**Return Truthful Realization Result**<br><code>SR-RPKG-RETURN-TRUTHFUL-REALIZATION-RESULT-06</code> | AI/user can distinguish proven success/rejection/uncertainty and use that result for later Issue/comment/finalization decisions. |

## Main User/Actor Path
| SPS | Actor/application action | Participant | Result |
|---|---|---|---|
| <a id="sps-rpkg-ai-submit-application-handoff-06"></a>**AI Submits Application Handoff**<br><code>SPS-RPKG-AI-SUBMIT-APPLICATION-HANDOFF-06</code> | AI sends exact reviewed package request. | AI → App | captured exact request |
| <a id="sps-rpkg-app-realize-package-07"></a>**App Realizes Package**<br><code>SPS-RPKG-APP-REALIZE-PACKAGE-07</code> | App invokes Apply Feature against exact supplied branch/context. | [Apply Replacement Package](../features/F-RPKG-APPLY-REPLACEMENT-PACKAGE.md) | proven/rejected/uncertain realization result |
| <a id="sps-rpkg-ai-consume-realization-result-08"></a>**AI Consumes Realization Result**<br><code>SPS-RPKG-AI-CONSUME-REALIZATION-RESULT-08</code> | AI/user consumes exact result and may update Issue/comments outside the App. | AI | next actor action | 

## Materialization Set
- current Complete Repository Work Scenario — `RETIRE`;
- Develop And Review Repository Work Scenario — `CREATE`;
- Realize Reviewed Repository Work Scenario — `CREATE`;
- Work Intent Slice — `RETIRE` as Application semantic responsibility;
- Workspace Slice — impact identified, but **not yet in the Materialization Set**; add `REPLACE` only after a complete Target Slice Body establishes the internal realization workspace boundary.

This Step is not materialization-ready while the Workspace Slice change remains only impact-level meaning. `Partial Target` must remain truthful.

## Step Readiness

Readiness: **NOT_READY**

The package-construction semantic predecessor is not yet realized and the Workspace Slice target boundary remains incomplete.

### Step Q/R/P
- P [BLOCKING]: realize Establish Replacement Package Construction.
- Q [BLOCKING]: complete the target Workspace Slice contract for internal realization checkout/workspace behavior.
