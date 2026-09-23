# EVO-RPKG-ADD-LOCAL-PACKAGE-VERIFICATION — Add Local Package Verification

[← Evolution Steps Map](../navigation/EVOLUTION-STEPS-MAP.md)

Planning Position: **Selected / Planned**  
Change Surface: **Mixed**  
Target Resolution: **Partial Target**

## Driven By Application Definition
- [Know Repository Work Outcome](../application-definition.md#ab-rpkg-know-repository-work-outcome-02)
- [Review AI Work Efficiently](../application-definition.md#ab-rpkg-review-ai-work-efficiently-05)
- [Delegate Mechanical Repository Work](../application-definition.md#ab-rpkg-delegate-mechanical-repository-work-04)

## Entering From
- realized/materialized [`Establish Replacement Package Construction`](EVO-RPKG-ESTABLISH-REPLACEMENT-PACKAGE-CONSTRUCTION.md)

## Realization Prerequisite
- [`Standardize Typed Operation Results`](EVO-RPKG-STANDARDIZE-OPERATION-RESULTS.md)

## Step Purpose

Extend the accepted Builder package-construction Feature so it locally applies the **same exact package** to the exact intended application source context, returns the actual resulting diff/proof for AI review, and uses the same underlying package-apply implementation capability as authoritative App Apply.

Builder verifies technical package realization. AI owns semantic review and handoff readiness.

## Owner Impacts

### Builder Feature Impact — CHANGED
`Build Replacement Package` becomes `Build And Verify Replacement Package` while retaining construction behavior from the predecessor state.

### Scenario Impact — CHANGED
AI review should consume the actual verified resulting diff/proof when the applicable development/review Scenario composes this Feature.

### Shared Implementation Capability Impact — NEW/CHANGED
One package-apply implementation mechanism is shared by Builder verification Apply and App authoritative Apply. Shared mechanics do not own BR/SR/error semantics.

## Target Terms Introduced In This Step

| Term ID | Canonical term | Plain definition | Natural owner/reference |
|---|---|---|---|
| `TERM-RPKG-VERIFICATION-APPLY-12` | Verification Apply | Builder-side local application of the exact package to establish resulting state/diff before handoff; not authoritative repository realization. | Builder Target Feature |
| `TERM-RPKG-AUTHORITATIVE-APPLY-13` | Authoritative Apply | App application of the exact package to the actual application target under Apply Feature semantics. | Apply Feature |
| `TERM-RPKG-VERIFIED-PACKAGE-RESULT-14` | Verified Package Result | Exact package + local application result/diff/proof returned for review. | Builder Target Feature |

## Complete Target Feature Body — Build And Verify Replacement Package

<a id="f-rpkg-build-and-verify-replacement-package"></a>
# F-RPKG-BUILD-AND-VERIFY-REPLACEMENT-PACKAGE — Build And Verify Replacement Package

## Inherited construction behavior

All FDO/FBS/BR/error semantics from the realized predecessor `F-RPKG-BUILD-REPLACEMENT-PACKAGE` remain unless explicitly changed below.

## Added Feature Data

| FDO | Meaning |
|---|---|
| <a id="fdo-rpkg-builder-verification-source-05"></a>**Exact Verification Source Context**<br><code>FDO-RPKG-BUILDER-VERIFICATION-SOURCE-05</code> | Exact local source state representing the intended later application target. |
| <a id="fdo-rpkg-builder-verification-result-06"></a>**Verified Local Application Result**<br><code>FDO-RPKG-BUILDER-VERIFICATION-RESULT-06</code> | Exact resulting tree/diff/proof or expected failure for package/source. |

## Added Global BR

| BR | Type | Plain required behavior | QRPE / Examples |
|---|---|---|---|
| <a id="br-rpkg-builder-verify-same-exact-package-05"></a>**Verify Same Exact Package**<br><code>BR-RPKG-BUILDER-VERIFY-SAME-EXACT-PACKAGE-05</code> | Identity / Proof | Package later offered for handoff is exactly the package verification-applied. | Problem Example: package is rebuilt after verification. |
| <a id="br-rpkg-builder-verify-intended-source-06"></a>**Verify Intended Application Source**<br><code>BR-RPKG-BUILDER-VERIFY-INTENDED-SOURCE-06</code> | Identity / Scope | Verification Apply uses the exact source context selected to represent where this package is intended to apply; no silent branch/base substitution. | Problem Example: verify against `main` while handoff targets another branch. |
| <a id="br-rpkg-builder-return-exact-resulting-diff-07"></a>**Return Exact Resulting Diff**<br><code>BR-RPKG-BUILDER-RETURN-EXACT-RESULTING-DIFF-07</code> | Result / Review | AI receives diff/proof from actual verification result rather than guessed intended edits. | Target Good Example: review artifact hashes/tree match verified state. |

## Added Main Path Steps

After predecessor construction has produced the exact package:

| FBS | Required action | Attached BR |
|---|---|---|
| <a id="fbs-rpkg-builder-verification-apply-05"></a>**Verification Apply Package**<br><code>FBS-RPKG-BUILDER-VERIFICATION-APPLY-05</code> | Apply exact built package locally to exact verification source and establish actual resulting state. | Verify Same Exact Package; Verify Intended Application Source |
| <a id="fbs-rpkg-builder-prove-verification-06"></a>**Prove Verification Result**<br><code>FBS-RPKG-BUILDER-PROVE-VERIFICATION-06</code> | Establish exact resulting state/diff or truthful expected failure. | Return Exact Resulting Diff |
| <a id="fbs-rpkg-builder-return-verified-result-07"></a>**Return Verified Package Result**<br><code>FBS-RPKG-BUILDER-RETURN-VERIFIED-RESULT-07</code> | Return same package + identity + resulting diff/proof; do not decide semantic handoff readiness. | Verify Same Exact Package |

## Shared Implementation Capability target direction

`SHARED-RPKG-PACKAGE-APPLY-ENGINE` should own deterministic package validation/application/result mechanics used by:
- Builder Verification Apply;
- App authoritative Apply.

<a id="ir-shared-rpkg-use-one-package-apply-mechanism-01"></a>
**Use One Package Apply Mechanism** `IR-SHARED-RPKG-USE-ONE-PACKAGE-APPLY-MECHANISM-01`  
Type: Shared Mechanism / Consistency.  
Both consumers use one underlying package-application implementation mechanism for package validation, add/replace/delete application and result verification. Surrounding authority/orchestration may differ.

## Materialization Set

- Builder Feature — `REPLACE` once complete target realization/proof is ready;
- affected Scenario — impact identified only until its complete Target Scenario Body is resolved against actual Entry State;
- Shared Package Apply capability — not yet CREATE/REPLACE until a complete natural-owner Target Body is resolved.

## Step Readiness

Readiness: **NOT_READY**

The Builder construction predecessor and Typed Operation Results foundation are not yet realized; the shared Apply mechanism owner body is also incomplete.

### Step Q/R/P
- P [BLOCKING]: realize package construction and Typed Operation Results.
- Q [BLOCKING]: complete the Shared package-apply mechanism Target Body used by both Builder verification and authoritative App Apply.
