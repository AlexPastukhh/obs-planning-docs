# EVO-RPKG-INTRODUCE-WORK-FINALIZATION — Introduce Independent Work Finalization

[← Evolution Steps Map](../navigation/EVOLUTION-STEPS-MAP.md)

Planning Position: **Selected / Planned**  
Target Resolution: **Partial Target**
Change Surface: **Mixed**  

## Driven By Application Definition
- [Realize AI-Created Repository Work](../application-definition.md#ab-rpkg-realize-ai-repository-work-01)
- [Know Repository Work Outcome](../application-definition.md#ab-rpkg-know-repository-work-outcome-02)

## Entering From
- current realized downstream owner state

## Realization Prerequisite
- [`Standardize Typed Operation Results`](EVO-RPKG-STANDARDIZE-OPERATION-RESULTS.md)

## Step Purpose
Add an independently callable Finalize capability for an exact reviewed repository result. Finalize performs the selected repository integration/terminal repository obligation; **AI remains owner of GitHub Issue/comment communication**.

## Owner Impacts

### Feature Impact — Finalize Repository Work — NEW
Adds exact reviewed-result validation, integration and finalized-result proof.

### Scenario Impact — repository realization journey — CHANGED
Adds independent later Finalize interaction after exact review authority. Issue/comment updates remain actor actions outside the Finalize Feature.


## Complete Target Feature Body — Finalize Repository Work

<a id="f-rpkg-finalize-repository-work"></a>
# F-RPKG-FINALIZE-REPOSITORY-WORK — Finalize Repository Work

## Realizes Upstream Meaning
- [Realize AI-Created Repository Work](../application-definition.md#ab-rpkg-realize-ai-repository-work-01)
- [Know Repository Work Outcome](../application-definition.md#ab-rpkg-know-repository-work-outcome-02)

## Feature Data
- exact Work identity;
- exact reviewed published result;
- Review Authority proving what was reviewed;
- exact Finalized Result / expected error.

## Global BR
| BR | Type | Plain behavior | QRPE / Examples |
|---|---|---|---|
| <a id="br-rpkg-finalize-only-reviewed-result-01"></a>**Finalize Only Reviewed Result**<br><code>BR-RPKG-FINALIZE-ONLY-REVIEWED-RESULT-01</code> | Identity / Authorization | Finalize only the exact repository result covered by current Review Authority. | Problem Example: review covers A but newer B is integrated. |
| <a id="br-rpkg-keep-proven-finalization-effects-02"></a>**Keep Proven Finalization Effects**<br><code>BR-RPKG-KEEP-PROVEN-FINALIZATION-EFFECTS-02</code> | Recovery / Truthfulness | Already proven integration/finalization effects remain true through later failure/retry. | Problem Example: uncertain response causes blind duplicate integration. |
| <a id="br-rpkg-finalize-only-when-proven-03"></a>**Finalize Only When Proven**<br><code>BR-RPKG-FINALIZE-ONLY-WHEN-PROVEN-03</code> | Outcome / Proof | Report Finalized only when selected repository-side finalization obligation is proven. | — |

## Main Path
| FBS | Required action |
|---|---|
| <a id="fbs-rpkg-validate-reviewed-work-01"></a>**Validate Reviewed Work**<br><code>FBS-RPKG-VALIDATE-REVIEWED-WORK-01</code> | Validate Review Authority for the exact published result. |
| <a id="fbs-rpkg-integrate-reviewed-result-02"></a>**Integrate Reviewed Result**<br><code>FBS-RPKG-INTEGRATE-REVIEWED-RESULT-02</code> | Perform/reconcile the selected repository integration mechanism for that exact result. |
| <a id="fbs-rpkg-establish-finalized-result-03"></a>**Establish Finalized Result**<br><code>FBS-RPKG-ESTABLISH-FINALIZED-RESULT-03</code> | Establish terminal Finalized only when integration/final repository obligation is proven. |

There is deliberately **no FBS for final Issue communication**. AI can update/close/comment on the Work Issue as an actor action after consuming the finalization result.


## Complete Target Scenario Body

<a id="scn-rpkg-complete-repository-work-target"></a>
# SCN-RPKG-COMPLETE-REPOSITORY-WORK — Complete Repository Work (post-Step target)

## Realizes Application Benefits
- [Realize AI-Created Repository Work](../application-definition.md#ab-rpkg-realize-ai-repository-work-01)
- [Know Repository Work Outcome](../application-definition.md#ab-rpkg-know-repository-work-outcome-02)

## Scenario Requirements
| SR | Plain meaning |
|---|---|
| <a id="sr-rpkg-keep-work-context-stable-01"></a>**Keep Work Context Stable** `SR-RPKG-KEEP-WORK-CONTEXT-STABLE-01` | exact Work/package context remains stable through journey |
| <a id="sr-rpkg-show-operation-context-at-user-decisions-02"></a>**Show Operation Context At User Decisions** `SR-RPKG-SHOW-OPERATION-CONTEXT-AT-USER-DECISIONS-02` | user-controlled effect/retry exposes affected context |
| <a id="sr-rpkg-keep-terminal-outcome-understandable-03"></a>**Keep Terminal Outcome Understandable** `SR-RPKG-KEEP-TERMINAL-OUTCOME-UNDERSTANDABLE-03` | proven/rejected/uncertain terminal meaning is distinguishable |
| <a id="sr-rpkg-keep-reviewed-result-context-06"></a>**Keep Reviewed Result Context** `SR-RPKG-KEEP-REVIEWED-RESULT-CONTEXT-06` | independent Finalize stays tied to exact reviewed result/authority |

## Main Actor / Application Path
| SPS | Actor/application interaction | Feature/context | Data in | Result out |
|---|---|---|---|---|
| <a id="sps-rpkg-establish-realization-request-01"></a>**Establish Realization Request** `SPS-RPKG-ESTABLISH-REALIZATION-REQUEST-01` | Actor/automation supplies exact realization request. | App entry | WorkId + Package Identity | exact captured request |
| <a id="sps-rpkg-request-package-realization-02"></a>**Request Package Realization** `SPS-RPKG-REQUEST-PACKAGE-REALIZATION-02` | App/user invokes package realization under captured request. | Apply Replacement Package | captured request | selected extent result |
| <a id="sps-rpkg-observe-realization-outcome-03"></a>**Observe Realization Outcome** `SPS-RPKG-OBSERVE-REALIZATION-OUTCOME-03` | Actor consumes truthful result. | outcome surface | operation result | proven/rejected/uncertain meaning |
| <a id="sps-rpkg-obtain-review-authority-04"></a>**Obtain Review Authority** `SPS-RPKG-OBTAIN-REVIEW-AUTHORITY-04` | Actor/AI review establishes authority for one exact published result outside or around App. | external review participant | published result | exact Review Authority |
| <a id="sps-rpkg-request-independent-finalize-05"></a>**Request Independent Finalize** `SPS-RPKG-REQUEST-INDEPENDENT-FINALIZE-05` | Actor later invokes Finalize for exact reviewed result. | Finalize Repository Work | Work + Review Authority | Finalized/expected outcome |
| <a id="sps-rpkg-consume-finalize-result-06"></a>**Consume Finalize Result** `SPS-RPKG-CONSUME-FINALIZE-RESULT-06` | Actor consumes result; AI may update Issue/comments outside App. | outcome + AI external action | finalization result | next work/log action |


Issue/comment authoring remains actor/AI responsibility when that ownership Step is also realized; if independent Steps materialize in a different order, revalidate this body against actual Entry State instead of silently merging roadmaps.


## Open Target choices
- exact integration mechanism (direct integration vs PR-backed route if materially different);
- exact Review Authority representation;
- Domain/Slice allocation and uncertainty/reconciliation proof.

## Materialization Set
- Finalize Feature — `CREATE`;
- affected Scenario — `REPLACE`;
- natural Domain/Slice owners — impacts remain OPEN/partial and are **not yet in the Materialization Set**; add `CREATE`/`REPLACE` only after complete Target Owner Bodies are resolved.

## Step Readiness

Readiness: **NOT_READY**

Typed Operation Results is not yet realized and Domain/Slice allocation plus proof/integration details remain unresolved.

### Step Q/R/P
- Q [BLOCKING]: what exact integration mechanism establishes the finalized reviewed result?
- Q [BLOCKING]: which Domain/Slice owners hold finalization state/invariants?
- P [BLOCKING]: resolve complete affected owner bodies before materialization.
