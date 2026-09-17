# EVO-RPKG-ESTABLISH-REPLACEMENT-PACKAGE-CONSTRUCTION — Establish Replacement Package Construction

[← Evolution Steps Map](../navigation/EVOLUTION-STEPS-MAP.md)

Planning Position: **Selected / Planned**  
Change Surface: **Mixed — behavior target + implementation conformance**  
Target Resolution: **Complete Target**

## Driven By Application Definition
- [Realize AI-Created Repository Work](../application-definition.md#ab-rpkg-realize-ai-repository-work-01)
- [Delegate Mechanical Repository Work](../application-definition.md#ab-rpkg-delegate-mechanical-repository-work-04)
- [Review AI Work Efficiently](../application-definition.md#ab-rpkg-review-ai-work-efficiently-05)

## Entering From
- current accepted downstream owner state; existing Builder implementation is Source/Evidence, not accepted Feature authority

## Realization Prerequisite
- [`EVO-RPKG-STANDARDIZE-OPERATION-RESULTS`](EVO-RPKG-STANDARDIZE-OPERATION-RESULTS.md) should be realized first so construction/result boundaries use the selected typed-result foundation.

## Step Purpose

Establish the canonical product behavior for building an exact Replacement Package from AI-supplied desired repository changes, then reconcile the existing PB-01/PB-02 implementation against that selected target. Existing code may be kept where conforming, modified where incomplete/incorrect, or replaced where necessary.

This Step exists because implementation presence is not being accepted as semantic correctness by default.

## Owner Impacts

### Builder Feature Impact — NEW
Create the first accepted canonical Feature owner for Replacement Package construction after realization/proof/materialization.

### Scenario Impact
Current/future AI work Scenarios may consume this Feature after materialization. This Step does not itself make AI Issue/branch orchestration an Application responsibility.

### Slice / Shared Impact
Exact implementation allocation remains an Exact-realization concern unless an independently durable Slice/Shared requirement is discovered. Typed-result foundation is a realization prerequisite, not Feature semantics.

## Complete Target Feature Body — Build Replacement Package

<a id="f-rpkg-build-replacement-package"></a>
# F-RPKG-BUILD-REPLACEMENT-PACKAGE — Build Replacement Package

## Realizes Upstream Meaning
- [Delegate Mechanical Repository Work](../application-definition.md#ab-rpkg-delegate-mechanical-repository-work-04)

## Feature Data

| FDO | Meaning |
|---|---|
| <a id="fdo-rpkg-builder-source-01"></a>**Exact Source State**<br><code>FDO-RPKG-BUILDER-SOURCE-01</code> | Exact repository/source state supplied for package derivation. |
| <a id="fdo-rpkg-builder-desired-files-02"></a>**Desired File Results**<br><code>FDO-RPKG-BUILDER-DESIRED-FILES-02</code> | Complete desired bytes for explicitly selected paths. |
| <a id="fdo-rpkg-builder-delete-intent-03"></a>**Explicit Delete Intent**<br><code>FDO-RPKG-BUILDER-DELETE-INTENT-03</code> | Explicit paths that should be absent in the target result. |
| <a id="fdo-rpkg-builder-package-04"></a>**Replacement Package**<br><code>FDO-RPKG-BUILDER-PACKAGE-04</code> | Exact validated package archive + package identity produced from the request. |

## Global Behavior Requirements

| BR | Type | Plain required behavior | QRPE / Examples |
|---|---|---|---|
| <a id="br-rpkg-builder-no-semantic-edits-01"></a>**Do Not Invent Semantic Edits**<br><code>BR-RPKG-BUILDER-NO-SEMANTIC-EDITS-01</code> | Responsibility | Builder derives package mechanics only from caller-supplied desired results and explicit deletes. | Problem Example: Builder refactors an unrelated file because it seems cleaner. |
| <a id="br-rpkg-builder-bind-exact-source-02"></a>**Bind Exact Source State**<br><code>BR-RPKG-BUILDER-BIND-EXACT-SOURCE-02</code> | Identity / Scope | Package derivation stays bound to the exact supplied source state or fails; it must not silently switch repository/branch/base. | Target Good Example: package identity is derived from the frozen supplied source.<br>Problem Example: Builder silently reads newer `main`. |
| <a id="br-rpkg-builder-package-declares-exact-result-03"></a>**Package Declares Exact Result**<br><code>BR-RPKG-BUILDER-PACKAGE-DECLARES-EXACT-RESULT-03</code> | Result / Proof | Add/replace/delete contents and package metadata are sufficient to identify the exact intended file result for the selected paths. | Problem Example: delete intent is omitted because a file is absent in the desired-files list. |
| <a id="br-rpkg-builder-no-overwrite-output-04"></a>**Do Not Overwrite Existing Package Output**<br><code>BR-RPKG-BUILDER-NO-OVERWRITE-OUTPUT-04</code> | Effect Scope / Safety | Building a new package must not silently overwrite an existing unrelated archive at the selected output identity/path. | Target Good Example: collision produces a new identity/path or explicit rejection. |

## Main Path

| FBS | Required action | Attached BR | QRPE / Examples |
|---|---|---|---|
| <a id="fbs-rpkg-builder-capture-build-request-01"></a>**Capture Build Request**<br><code>FBS-RPKG-BUILDER-CAPTURE-BUILD-REQUEST-01</code> | Freeze exact source + desired file results + explicit deletes. | Bind Exact Source State; Do Not Invent Semantic Edits | — |
| <a id="fbs-rpkg-builder-derive-operations-02"></a>**Derive Package Operations**<br><code>FBS-RPKG-BUILDER-DERIVE-OPERATIONS-02</code> | Mechanically derive add/replace/delete/no-op consequences from exact source vs desired result. | Package Declares Exact Result | Target Good Example: unchanged desired file becomes no-op; absent desired file is not automatically a delete. |
| <a id="fbs-rpkg-builder-materialize-package-03"></a>**Materialize Exact Package**<br><code>FBS-RPKG-BUILDER-MATERIALIZE-PACKAGE-03</code> | Produce one protocol-valid non-overwriting package archive with stable exact identity. | Package Declares Exact Result; Do Not Overwrite Existing Package Output | — |
| <a id="fbs-rpkg-builder-return-package-04"></a>**Return Exact Package Result**<br><code>FBS-RPKG-BUILDER-RETURN-PACKAGE-04</code> | Return package identity/archive or truthful expected failure; do not decide semantic work quality or handoff readiness. | Do Not Invent Semantic Edits | — |

## Behavior Expected Errors

| Error | Plain meaning |
|---|---|
| <a id="err-beh-rpkg-builder-source-mismatch-01"></a>**Source Mismatch**<br><code>ERR-BEH-RPKG-BUILDER-SOURCE-MISMATCH-01</code> | Exact supplied source cannot be used as requested or no longer matches the frozen request. |
| <a id="err-beh-rpkg-builder-output-conflict-02"></a>**Package Output Conflict**<br><code>ERR-BEH-RPKG-BUILDER-OUTPUT-CONFLICT-02</code> | Selected package output identity/path cannot be used without overwriting/confusing an existing package. |
| <a id="err-beh-rpkg-builder-invalid-package-result-03"></a>**Invalid Package Result**<br><code>ERR-BEH-RPKG-BUILDER-INVALID-PACKAGE-RESULT-03</code> | Derived package cannot truthfully represent the requested exact file result. |

## Boundary

Builder package construction does not own semantic edits, GitHub Issue/comments, AI working-branch creation, review judgment, authoritative Apply/Publish, or handoff readiness.

## Realization / Conformance Plan

Existing PB-01/PB-02 code is implementation Evidence only:

```text
Target Feature Body above
→ inspect existing implementation
→ KEEP / MODIFY / REPLACE
→ exact tests/proof against FBS/BR/error semantics
→ materialize Feature owner only after conformance is proven
```

## Materialization Set

- Builder `F-RPKG-BUILD-REPLACEMENT-PACKAGE` — `CREATE` after Exact Realization + proof/revalidation.

## Step Readiness

Readiness: **NOT_READY**

Target Feature meaning is complete, but the selected Typed Operation Results foundation has not yet been realized.

### Step Q/R/P
- P [BLOCKING]: realize `EVO-RPKG-STANDARDIZE-OPERATION-RESULTS` before Builder conformance realization.
- R [NON_BLOCKING]: existing PB-01/PB-02 code may require substantial modification or replacement after comparison with the Target Feature Body.
