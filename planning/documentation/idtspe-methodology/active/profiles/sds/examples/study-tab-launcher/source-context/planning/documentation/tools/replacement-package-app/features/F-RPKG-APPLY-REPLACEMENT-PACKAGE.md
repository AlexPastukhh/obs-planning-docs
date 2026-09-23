# F-RPKG-APPLY-REPLACEMENT-PACKAGE — Apply Replacement Package

## Realizes Upstream Meaning

- [Realize AI-Created Repository Work](../application-definition.md#ab-rpkg-realize-ai-repository-work-01)
- [Know Repository Work Outcome](../application-definition.md#ab-rpkg-know-repository-work-outcome-02)

Current Feature does not own Issue/comments or AI semantic branch decisions. Selected future owner changes are referenced below.

## RU-FEAT-02 — Semantic Data

Feature Data Objects are addressable when Scenario/Screen/other owners need to refer to what the user supplies, has available, or receives. Addressability does not steal Domain ownership.

| Feature Data Object | Plain meaning |
|---|---|
| <a id="fdo-rpkg-work-id-01"></a>**WorkId**<br><code>FDO-RPKG-WORK-ID-01</code> | Exact Work identity supplied/held by the request; semantic equality comes from the WorkId Domain owner. |
| <a id="fdo-rpkg-package-identity-02"></a>**Package Identity**<br><code>FDO-RPKG-PACKAGE-IDENTITY-02</code> | Exact Replacement Package identity: packageId + archive SHA-256. |
| <a id="fdo-rpkg-work-branch-03"></a>**Work Branch**<br><code>FDO-RPKG-WORK-BRANCH-03</code> | Exact Work Branch used for publication. |
| <a id="fdo-rpkg-apply-result-04"></a>**Apply Result**<br><code>FDO-RPKG-APPLY-RESULT-04</code> | Proven/rejected Apply result for the exact package. |
| <a id="fdo-rpkg-publication-result-05"></a>**Publication Result**<br><code>FDO-RPKG-PUBLICATION-RESULT-05</code> | Proven/diverged/uncertain publication result for the exact commit/Work Branch. |

## RU-FEAT-03 — Feature Behavior

### Global Behavior Requirements

| Behavior Requirement | Type | Plain required behavior | Related behavior expected errors | QRPE / Examples |
|---|---|---|---|---|
| <a id="br-rpkg-keep-requested-work-package-01"></a>**Keep Requested Work And Package**<br><code>BR-RPKG-KEEP-REQUESTED-WORK-PACKAGE-01</code> | Identity / Scope | When an Apply invocation starts for Work A and package P, it must keep using A/P or stop. | [Wrong Work Or Package](#err-beh-rpkg-wrong-work-or-package-01) | Target Good Example: A/P1 remains A/P1 through every behavior step.<br>Problem Example: A later UI selection silently retargets the running operation. |
| <a id="br-rpkg-keep-proven-results-02"></a>**Keep Proven Results**<br><code>BR-RPKG-KEEP-PROVEN-RESULTS-02</code> | Recovery / Truthfulness | Already Proven Results remain true through later failures/retries. | [Package Result Conflict](#err-beh-rpkg-package-result-conflict-03) | Target Good Example: Commit C remains proven after Publish fails.<br>Problem Example: Later failure erases C and retry creates a different commit. |
| <a id="br-rpkg-report-success-only-when-proven-03"></a>**Report Success Only When Proven**<br><code>BR-RPKG-REPORT-SUCCESS-ONLY-WHEN-PROVEN-03</code> | Outcome / Proof | Report success only when the result that defines success is proven. | [Publication Not Confirmed](#err-beh-rpkg-publication-not-confirmed-06) | Target Good Example: Publish success follows fresh proof of remote result.<br>Problem Example: Transport returned ambiguously but the app reports Published. |

### Main Path

Path order/branching is the selected Feature behavior solution. It is normative Result Content, but a path row/branch is **not automatically a Requirement**.

| Feature Behavior Step | Required action | Attached Behavior Requirements | Related behavior expected errors | QRPE / Examples |
|---|---|---|---|---|
| <a id="fbs-rpkg-resolve-requested-package-01"></a>**Resolve Requested Package**<br><code>FBS-RPKG-RESOLVE-REQUESTED-PACKAGE-01</code> | Resolve and validate the exact requested package before package effects. | <a id="br-rpkg-resolve-exact-requested-package-04"></a>**Resolve Exact Requested Package**<br><code>BR-RPKG-RESOLVE-EXACT-REQUESTED-PACKAGE-04</code> (Identity / Validation) — Use the exact requested package. | [Wrong Work Or Package](#err-beh-rpkg-wrong-work-or-package-01) | Target Good Example: The exact package is bound before effects.<br>Problem Example: Another package is substituted. |
| <a id="fbs-rpkg-apply-package-02"></a>**Apply Package**<br><code>FBS-RPKG-APPLY-PACKAGE-02</code> | Change the Work files to the exact result declared by the package. | <a id="br-rpkg-apply-only-to-expected-source-05"></a>**Apply Only To Expected Source**<br><code>BR-RPKG-APPLY-ONLY-TO-EXPECTED-SOURCE-05</code> (Eligibility / Safety) — Mutate only while package preconditions remain true.<br><a id="br-rpkg-applied-result-must-match-package-06"></a>**Applied Result Must Match Package**<br><code>BR-RPKG-APPLIED-RESULT-MUST-MATCH-PACKAGE-06</code> (Result / Proof) — Applied result must exactly match the package. | [Package Source Changed](#err-beh-rpkg-package-source-changed-02)<br>[Package Result Conflict](#err-beh-rpkg-package-result-conflict-03) | Target Good Example: Exact declared file result is established.<br>Problem Example: Changed source is overwritten anyway. |
| <a id="fbs-rpkg-commit-applied-package-03"></a>**Commit Applied Package**<br><code>FBS-RPKG-COMMIT-APPLIED-PACKAGE-03</code> | Create or recover the exact commit containing only the applied package result. | <a id="br-rpkg-commit-only-package-changes-07"></a>**Commit Only Package Changes**<br><code>BR-RPKG-COMMIT-ONLY-PACKAGE-CHANGES-07</code> (Effect Scope / Safety) — Do not include unrelated work.<br><a id="br-rpkg-commit-must-represent-exact-package-08"></a>**Commit Must Represent Exact Package Result**<br><code>BR-RPKG-COMMIT-MUST-REPRESENT-EXACT-PACKAGE-08</code> (Result / Proof) — Prove the exact package commit. | [Unrelated Work Would Be Committed](#err-beh-rpkg-unrelated-work-would-be-committed-04)<br>[Package Result Conflict](#err-beh-rpkg-package-result-conflict-03) | Target Good Example: Commit contains only package paths.<br>Problem Example: Unrelated staged work is included. |
| <a id="fbs-rpkg-publish-exact-commit-04"></a>**Publish Exact Commit**<br><code>FBS-RPKG-PUBLISH-EXACT-COMMIT-04</code> | Publish/reconcile the exact commit to the requested Work Branch and finish only when the remote result is proven. | <a id="br-rpkg-check-current-remote-before-publish-09"></a>**Check Current Remote Before Publish**<br><code>BR-RPKG-CHECK-CURRENT-REMOTE-BEFORE-PUBLISH-09</code> (Eligibility / Freshness) — Use fresh destination observation.<br><a id="br-rpkg-publish-only-to-requested-work-branch-10"></a>**Publish Only To Requested Work Branch**<br><code>BR-RPKG-PUBLISH-ONLY-TO-REQUESTED-WORK-BRANCH-10</code> (Effect Scope / Safety) — Publish only to the requested Work Branch.<br><a id="br-rpkg-publish-only-when-confirmed-11"></a>**Publish Only When Confirmed**<br><code>BR-RPKG-PUBLISH-ONLY-WHEN-CONFIRMED-11</code> (Outcome / Proof) — Publish succeeds only when confirmed. | [Remote Work Branch Diverged](#err-beh-rpkg-remote-work-branch-diverged-05)<br>[Publication Not Confirmed](#err-beh-rpkg-publication-not-confirmed-06) | R: Push may happen even if the client later sees an error.<br>Target Good Example: Fresh observation later proves the intended commit remotely.<br>Problem Example: Retry pushes again without reconciliation. |

### Behavior Expected Errors

| Behavior Expected Error | Type | Plain meaning |
|---|---|---|
| <a id="err-beh-rpkg-wrong-work-or-package-01"></a>**Wrong Work Or Package**<br><code>ERR-BEH-RPKG-WRONG-WORK-OR-PACKAGE-01</code> | Identity / Scope | Resolved Work/package differs from request. |
| <a id="err-beh-rpkg-package-source-changed-02"></a>**Package Source Changed**<br><code>ERR-BEH-RPKG-PACKAGE-SOURCE-CHANGED-02</code> | Eligibility | Package source conditions are no longer true. |
| <a id="err-beh-rpkg-package-result-conflict-03"></a>**Package Result Conflict**<br><code>ERR-BEH-RPKG-PACKAGE-RESULT-CONFLICT-03</code> | Consistency / Proof | Observed/proven result conflicts with allowed package result. |
| <a id="err-beh-rpkg-unrelated-work-would-be-committed-04"></a>**Unrelated Work Would Be Committed**<br><code>ERR-BEH-RPKG-UNRELATED-WORK-WOULD-BE-COMMITTED-04</code> | Effect Scope / Safety | Commit would include unrelated work. |
| <a id="err-beh-rpkg-remote-work-branch-diverged-05"></a>**Remote Work Branch Diverged**<br><code>ERR-BEH-RPKG-REMOTE-WORK-BRANCH-DIVERGED-05</code> | Eligibility / Conflict | Fresh remote state does not permit this Publish. |
| <a id="err-beh-rpkg-publication-not-confirmed-06"></a>**Publication Not Confirmed**<br><code>ERR-BEH-RPKG-PUBLICATION-NOT-CONFIRMED-06</code> | Outcome / Uncertainty | Exact publication result cannot currently be proven. |

## RU-FEAT-04 — Implementation Concerns

| Concern | Why it matters for this Feature | Natural-owner consequence | Source |
|---|---|---|---|
| **Composable package-stage realization** | Selected Evolution must support stopping after Apply/Commit and later composing independent Finalize without duplicating package behavior. | [Keep Package Stages Composable](../slices/SL-RPKG-01-apply-replacement-work.md#ir-slice-rpkg-keep-stages-composable-07) | [Parameterize Apply Handoff](../evolution-steps/EVO-RPKG-PARAMETERIZE-APPLY-HANDOFF.md)<br>[Enable Automatic Finalization](../evolution-steps/EVO-RPKG-ENABLE-AUTOMATIC-FINALIZATION.md) |

This Unit contains actual Feature-specific concerns. Reusable prose about what an Implementation Concern means belongs in methodology, not in the concrete Feature.


## RU-FEAT-06 — Evolution Impact

Current Feature authority keeps only reverse navigation to active unrealized Steps that materially change this Feature. Future behavior remains Step-owned.

| Evolution Step | Why this Feature changes |
|---|---|
| [Parameterize Apply Handoff](../evolution-steps/EVO-RPKG-PARAMETERIZE-APPLY-HANDOFF.md) | Adds ApplyExtent, bounded wait behavior, timeout outcome, and parameterized entry semantics. |
| [Enable Automatic Finalization](../evolution-steps/EVO-RPKG-ENABLE-AUTOMATIC-FINALIZATION.md) | Adds explicit automatic-Finalize behavior/composition request semantics. |
| [Add Apply URI Entry](../evolution-steps/EVO-RPKG-ADD-APPLY-URI-ENTRY.md) *(Probable)* | Adds an equivalent URI semantic entry into this Feature request. |

[Introduce Work Finalization](../evolution-steps/EVO-RPKG-INTRODUCE-WORK-FINALIZATION.md) creates a separate Feature and does not by itself change current Apply Feature semantics.
