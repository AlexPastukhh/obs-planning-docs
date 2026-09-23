# EVO-RPKG-ADD-APPLY-URI-ENTRY — Add Apply URI Entry

[← Evolution Steps Map](../navigation/EVOLUTION-STEPS-MAP.md)

Planning Position: **Probable — not selected**  
Target Resolution: **Substantial Target (candidate)**
Change Surface: **Mixed**  

## Driven By Application Definition
- [Realize AI-Created Repository Work](../application-definition.md#ab-rpkg-realize-ai-repository-work-01)
- [Delegate Mechanical Repository Work](../application-definition.md#ab-rpkg-delegate-mechanical-repository-work-04)

## Entering From
- [Enable Automatic Finalization](EVO-RPKG-ENABLE-AUTOMATIC-FINALIZATION.md) realized/materialized

## Realization Prerequisite
- [`Standardize Typed Operation Results`](EVO-RPKG-STANDARDIZE-OPERATION-RESULTS.md)

## Step Purpose
Likely add URI as an equivalent entry into the same complete semantic Apply request, not a second behavior contract. The transition is concrete enough to keep Step identity and substantial candidate target planning, but it is **not selected**.

## Selection Boundary
The target bodies below are candidate post-Step planning for this probable Step. They do not authorize materialization or implementation until the normal Proposal/Decision authority selects this Step/route.

## Owner Impacts
### Feature Impact — Apply Replacement Package — CHANGED
Adds normalized `Apply Entry` and BR `Keep Entry Forms Equivalent` plus expected invalid-entry outcome.

### Scenario Impact — CHANGED
Adds existing-entry vs URI entry branch that converges before Apply Feature behavior.

### Adapter/Slice Impact — CHANGED/NEW
URI adapter parses/validates/normalizes only; it does not own Work/Feature semantics.

## Candidate Target Feature Body
<a id="f-rpkg-apply-replacement-package"></a>
# F-RPKG-APPLY-REPLACEMENT-PACKAGE — Apply Replacement Package

## Realizes Upstream Meaning
- [Realize AI-Created Repository Work](../application-definition.md#ab-rpkg-realize-ai-repository-work-01)
- [Know Repository Work Outcome](../application-definition.md#ab-rpkg-know-repository-work-outcome-02)

## RU-FEAT-02 — Semantic Data
| Feature Data Object | Plain meaning |
|---|---|
| <a id="fdo-rpkg-work-id-01"></a>**WorkId**<br><code>FDO-RPKG-WORK-ID-01</code> | Exact Work identity. |
| <a id="fdo-rpkg-package-identity-02"></a>**Package Identity**<br><code>FDO-RPKG-PACKAGE-IDENTITY-02</code> | packageId + exact archive hash. |
| <a id="fdo-rpkg-work-branch-03"></a>**Work Branch**<br><code>FDO-RPKG-WORK-BRANCH-03</code> | Exact requested publication branch. |
| <a id="fdo-rpkg-apply-result-04"></a>**Apply Result**<br><code>FDO-RPKG-APPLY-RESULT-04</code> | Proven/rejected Apply result. |
| <a id="fdo-rpkg-publication-result-05"></a>**Publication Result**<br><code>FDO-RPKG-PUBLICATION-RESULT-05</code> | Proven/diverged/uncertain publication result. |
| <a id="fdo-rpkg-apply-extent-06"></a>**Apply Extent**<br><code>FDO-RPKG-APPLY-EXTENT-06</code> | Requested terminal package-realization extent. |
| <a id="fdo-rpkg-package-wait-policy-07"></a>**Package Wait Policy**<br><code>FDO-RPKG-PACKAGE-WAIT-POLICY-07</code> | Bounded policy for waiting for the exact package. |
| <a id="fdo-rpkg-finalize-mode-08"></a>**Finalize Mode**<br><code>FDO-RPKG-FINALIZE-MODE-08</code> | Immediate automatic Finalize vs deferred independent Finalize. |
| <a id="fdo-rpkg-apply-entry-09"></a>**Apply Entry**<br><code>FDO-RPKG-APPLY-ENTRY-09</code> | Normalized semantic request produced by equivalent entry forms. |

## RU-FEAT-03 — Feature Behavior

### Global BR
| BR | Type | Plain required behavior |
|---|---|---|
| <a id="br-rpkg-keep-requested-work-package-01"></a>**Keep Requested Work And Package**<br><code>BR-RPKG-KEEP-REQUESTED-WORK-PACKAGE-01</code> | Identity / Scope | Invocation stays bound to exact requested Work/package or stops. |
| <a id="br-rpkg-keep-proven-results-02"></a>**Keep Proven Results**<br><code>BR-RPKG-KEEP-PROVEN-RESULTS-02</code> | Recovery / Truthfulness | Later failure/retry cannot erase already proven Apply/Commit/Publish facts. |
| <a id="br-rpkg-report-success-only-when-proven-03"></a>**Report Success Only When Proven**<br><code>BR-RPKG-REPORT-SUCCESS-ONLY-WHEN-PROVEN-03</code> | Outcome / Proof | Report the requested success result only when that result is proven. |
| <a id="br-rpkg-bound-package-wait-12"></a>**Bound Package Wait**<br><code>BR-RPKG-BOUND-PACKAGE-WAIT-12</code> | Outcome / Error Handling | Wait only within the selected bound; timeout returns without package effects. |
| <a id="br-rpkg-respect-requested-apply-extent-13"></a>**Respect Requested Apply Extent**<br><code>BR-RPKG-RESPECT-REQUESTED-APPLY-EXTENT-13</code> | Effect Scope | Stop exactly at the extent requested for this invocation. |
| <a id="br-rpkg-automatic-finalize-only-when-requested-14"></a>**Automatic Finalize Only When Requested**<br><code>BR-RPKG-AUTOMATIC-FINALIZE-ONLY-WHEN-REQUESTED-14</code> | Eligibility / Effect Scope | Invoke automatic Finalize only when explicitly requested and exact Finalize eligibility is proven. |
| <a id="br-rpkg-keep-entry-forms-equivalent-15"></a>**Keep Entry Forms Equivalent**<br><code>BR-RPKG-KEEP-ENTRY-FORMS-EQUIVALENT-15</code> | Input / Equivalence | Equivalent UI/handoff/URI inputs normalize to the same complete semantic request. |

### Main Path
Apply → Commit → Publish are the selected Feature path; correctness-critical order is normative. `ApplyExtent` adds normative stop branches after the selected stage without creating a generic Resume state. After eligible completion, `FinalizeMode=IMMEDIATE` may hand off to the separate Finalize Feature; Finalize behavior is not copied into this Feature.

| FBS | Required action | Attached BR |
|---|---|---|
| <a id="fbs-rpkg-resolve-requested-package-01"></a>**Resolve Requested Package**<br><code>FBS-RPKG-RESOLVE-REQUESTED-PACKAGE-01</code> | Resolve the exact requested package, waiting only under the captured bounded wait policy; timeout performs no package effect. | <a id="br-rpkg-resolve-exact-requested-package-04"></a>**Resolve Exact Requested Package** `BR-RPKG-RESOLVE-EXACT-REQUESTED-PACKAGE-04`<br>[Bound Package Wait](#br-rpkg-bound-package-wait-12) |
| <a id="fbs-rpkg-apply-package-02"></a>**Apply Package**<br><code>FBS-RPKG-APPLY-PACKAGE-02</code> | Establish exact package-declared file result. | <a id="br-rpkg-apply-only-to-expected-source-05"></a>**Apply Only To Expected Source** `BR-RPKG-APPLY-ONLY-TO-EXPECTED-SOURCE-05`<br><a id="br-rpkg-applied-result-must-match-package-06"></a>**Applied Result Must Match Package** `BR-RPKG-APPLIED-RESULT-MUST-MATCH-PACKAGE-06` |
| <a id="fbs-rpkg-commit-applied-package-03"></a>**Commit Applied Package**<br><code>FBS-RPKG-COMMIT-APPLIED-PACKAGE-03</code> | Create/recover exact commit containing only package result. | <a id="br-rpkg-commit-only-package-changes-07"></a>**Commit Only Package Changes** `BR-RPKG-COMMIT-ONLY-PACKAGE-CHANGES-07`<br><a id="br-rpkg-commit-must-represent-exact-package-08"></a>**Commit Must Represent Exact Package Result** `BR-RPKG-COMMIT-MUST-REPRESENT-EXACT-PACKAGE-08` |
| <a id="fbs-rpkg-publish-exact-commit-04"></a>**Publish Exact Commit**<br><code>FBS-RPKG-PUBLISH-EXACT-COMMIT-04</code> | Publish/reconcile exact commit to requested Work Branch and finish only on proven result. | <a id="br-rpkg-check-current-remote-before-publish-09"></a>**Check Current Remote Before Publish** `BR-RPKG-CHECK-CURRENT-REMOTE-BEFORE-PUBLISH-09`<br><a id="br-rpkg-publish-only-to-requested-work-branch-10"></a>**Publish Only To Requested Work Branch** `BR-RPKG-PUBLISH-ONLY-TO-REQUESTED-WORK-BRANCH-10`<br><a id="br-rpkg-publish-only-when-confirmed-11"></a>**Publish Only When Confirmed** `BR-RPKG-PUBLISH-ONLY-WHEN-CONFIRMED-11` |

### Behavior Expected Errors
| Error | Plain meaning |
|---|---|
| <a id="err-beh-rpkg-wrong-work-or-package-01"></a>**Wrong Work Or Package** `ERR-BEH-RPKG-WRONG-WORK-OR-PACKAGE-01` | requested identity mismatch |
| <a id="err-beh-rpkg-package-source-changed-02"></a>**Package Source Changed** `ERR-BEH-RPKG-PACKAGE-SOURCE-CHANGED-02` | package preconditions no longer true |
| <a id="err-beh-rpkg-package-result-conflict-03"></a>**Package Result Conflict** `ERR-BEH-RPKG-PACKAGE-RESULT-CONFLICT-03` | proven/observed result conflicts with allowed package result |
| <a id="err-beh-rpkg-unrelated-work-would-be-committed-04"></a>**Unrelated Work Would Be Committed** `ERR-BEH-RPKG-UNRELATED-WORK-WOULD-BE-COMMITTED-04` | commit would include unrelated work |
| <a id="err-beh-rpkg-remote-work-branch-diverged-05"></a>**Remote Work Branch Diverged** `ERR-BEH-RPKG-REMOTE-WORK-BRANCH-DIVERGED-05` | fresh remote state does not permit this Publish |
| <a id="err-beh-rpkg-publication-not-confirmed-06"></a>**Publication Not Confirmed** `ERR-BEH-RPKG-PUBLICATION-NOT-CONFIRMED-06` | exact publication cannot currently be proven |
| <a id="err-beh-rpkg-package-wait-timed-out-07"></a>**Package Wait Timed Out** `ERR-BEH-RPKG-PACKAGE-WAIT-TIMED-OUT-07` | exact package did not appear within selected bound |
| <a id="err-beh-rpkg-automatic-finalize-not-eligible-08"></a>**Automatic Finalize Not Eligible** `ERR-BEH-RPKG-AUTOMATIC-FINALIZE-NOT-ELIGIBLE-08` | requested automatic Finalize cannot safely start from the proven result |
| <a id="err-beh-rpkg-entry-invalid-09"></a>**Entry Invalid** `ERR-BEH-RPKG-ENTRY-INVALID-09` | entry cannot be normalized to one complete valid Apply request |

## RU-FEAT-04 — Implementation Concerns
**Composable package-stage realization:** Apply/Commit/Publish realization boundaries must remain independently composable for selected extent/finalization evolution without copied behavior implementation.


## Candidate Target Scenario Body
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
| <a id="sr-rpkg-let-actor-choose-apply-extent-04"></a>**Let Actor Choose Apply Extent** `SR-RPKG-LET-ACTOR-CHOOSE-APPLY-EXTENT-04` | request can choose how far this package realization proceeds |
| <a id="sr-rpkg-let-actor-bound-package-wait-05"></a>**Let Actor Bound Package Wait** `SR-RPKG-LET-ACTOR-BOUND-PACKAGE-WAIT-05` | request can choose bounded wait for exact package |
| <a id="sr-rpkg-keep-reviewed-result-context-06"></a>**Keep Reviewed Result Context** `SR-RPKG-KEEP-REVIEWED-RESULT-CONTEXT-06` | independent Finalize stays tied to exact reviewed result/authority |
| <a id="sr-rpkg-support-immediate-and-deferred-finalization-07"></a>**Support Immediate And Deferred Finalization** `SR-RPKG-SUPPORT-IMMEDIATE-AND-DEFERRED-FINALIZATION-07` | actor can explicitly choose immediate composition or deferred independent Finalize |
| <a id="sr-rpkg-support-equivalent-direct-uri-entry-08"></a>**Support Equivalent Direct URI Entry** `SR-RPKG-SUPPORT-EQUIVALENT-DIRECT-URI-ENTRY-08` | URI and other entries converge on same semantic request |

## Main Actor / Application Path
| SPS | Actor/application interaction | Feature/context | Data in | Result out |
|---|---|---|---|---|
| <a id="sps-rpkg-establish-realization-request-01"></a>**Establish Realization Request** `SPS-RPKG-ESTABLISH-REALIZATION-REQUEST-01` | Actor enters through existing handoff/UI or direct URI; adapter normalizes to one exact semantic request. | App entry | WorkId + Package Identity + ApplyExtent + PackageWaitPolicy + FinalizeMode | exact captured request |
| <a id="sps-rpkg-request-package-realization-02"></a>**Request Package Realization** `SPS-RPKG-REQUEST-PACKAGE-REALIZATION-02` | App/user invokes package realization under captured request. | Apply Replacement Package | captured request | selected extent result |
| <a id="sps-rpkg-observe-realization-outcome-03"></a>**Observe Realization Outcome** `SPS-RPKG-OBSERVE-REALIZATION-OUTCOME-03` | Actor consumes truthful result. | outcome surface | operation result | proven/rejected/uncertain meaning |
| <a id="sps-rpkg-choose-finalization-mode-04"></a>**Choose Finalization Mode** `SPS-RPKG-CHOOSE-FINALIZATION-MODE-04` | Captured request selects immediate vs deferred Finalize. | Scenario composition | eligible Apply result + FinalizeMode | branch |
| <a id="sps-rpkg-immediate-or-deferred-finalize-05"></a>**Immediate Or Deferred Finalize** `SPS-RPKG-IMMEDIATE-OR-DEFERRED-FINALIZE-05` | IMMEDIATE invokes separate Finalize after eligibility; DEFERRED returns control and permits later independent Finalize. | Apply + Finalize Features | exact result/Review Authority as required | Finalize result or deferred state |

### Entry decision
Existing handoff/UI and URI are two selected entry branches; both converge before Apply Feature behavior.

### Finalization decision
`IMMEDIATE` and `DEFERRED` are selected Scenario branches that solve SR-07. The branch structure is not itself a Requirement.


Issue/comment authoring remains actor/AI responsibility when that ownership Step is also realized; if independent Steps materialize in a different order, revalidate this body against actual Entry State instead of silently merging roadmaps.


## Candidate materialization consequences
No Target Owner Materialization Set is active while this Step remains **Probable / unselected**.

If selected later, the current candidate direction implies:
- Apply Feature — likely `REPLACE`;
- applicable realization Scenario — likely `REPLACE`;
- URI entry adapter Slice/Screen integration — still requires a complete natural-owner Target Body before any `CREATE`/`REPLACE` consequence can be declared.

## Step Readiness

Readiness: **NOT_READY**

The Step is Probable/unselected, its semantic predecessor is unrealized, and no Materialization Set is active.

### Step Q/R/P
- P [BLOCKING]: select the Step through normal Core selection before realization.
- P [BLOCKING]: realize Automatic Finalization first if the current semantic dependency remains selected.
