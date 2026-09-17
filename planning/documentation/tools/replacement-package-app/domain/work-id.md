<a id="domain-rpkg-work-id"></a>
# WorkId — Shared Domain Owner

## RU-DOWN-TERMS — Terms / Ubiquitous Language

| Canonical term | Plain definition |
|---|---|
| [Work](../TERMS.md#term-rpkg-work-01) | One logical repository change effort identified by one exact WorkId. |
| [WorkId](../TERMS.md#term-rpkg-workid-02) | The exact semantic identity of one Work. A title, recency, or current UI selection does not replace it. |

## RU-DOWN-01 — Shared Domain Behavior Realization Contract

### Global behavior realized

| Feature/Journey subject | Shared Domain realization | Related IR | Related errors | QRPE / Examples |
|---|---|---|---|---|
| [Keep Work Context Stable](../scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#sr-rpkg-keep-work-context-stable-01) | Provides exact Work identity across Issue, workspace, package state and future finalization. | [Keep WorkId Equality Exact](#ir-domain-rpkg-keep-workid-equality-exact-01) | [Wrong Work Or Package](../features/F-RPKG-APPLY-REPLACEMENT-PACKAGE.md#err-beh-rpkg-wrong-work-or-package-01) where Work mismatch is part of Feature behavior | Target Good Example: WorkId A remains A across every owner.<br>Problem Example: A matching title is treated as the same Work. |
| [Keep Requested Work And Package](../features/F-RPKG-APPLY-REPLACEMENT-PACKAGE.md#br-rpkg-keep-requested-work-package-01) | Supplies the Work identity used to keep package realization on the requested Work. | [Keep WorkId Equality Exact](#ir-domain-rpkg-keep-workid-equality-exact-01) | [Wrong Work Or Package](../features/F-RPKG-APPLY-REPLACEMENT-PACKAGE.md#err-beh-rpkg-wrong-work-or-package-01) | — |

### Feature Behavior Steps realized by this Shared Domain owner

| Feature Behavior Step | Shared Domain realization of the Step | Related BRs | Related IR | QRPE / Examples |
|---|---|---|---|---|
| [Resolve Requested Package](../features/F-RPKG-APPLY-REPLACEMENT-PACKAGE.md#fbs-rpkg-resolve-requested-package-01) | Supplies exact WorkId equality/identity used when resolving the Work/package scope for the invocation. | [Keep Requested Work And Package](../features/F-RPKG-APPLY-REPLACEMENT-PACKAGE.md#br-rpkg-keep-requested-work-package-01) | [Keep WorkId Equality Exact](#ir-domain-rpkg-keep-workid-equality-exact-01) | Target Good Example: Resolved workspace/state has the same exact WorkId as the request.<br>Problem Example: Title similarity is used as Work equality. |

### Domain Implementation Requirements

| Domain Implementation Requirement | Type | Plain implementation requirement | Realizes | Related expected errors | QRPE / Examples |
|---|---|---|---|---|---|
| <a id="ir-domain-rpkg-keep-workid-equality-exact-01"></a>**Keep WorkId Equality Exact**<br><code>IR-DOMAIN-RPKG-KEEP-WORKID-EQUALITY-EXACT-01</code> | Identity / Equality | WorkId equality must preserve exact semantic Work identity across owners/transports; title, recency, and UI selection cannot redefine equality. | [Keep Work Context Stable](../scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#sr-rpkg-keep-work-context-stable-01); [Keep Requested Work And Package](../features/F-RPKG-APPLY-REPLACEMENT-PACKAGE.md#br-rpkg-keep-requested-work-package-01) | [Wrong Work Or Package](../features/F-RPKG-APPLY-REPLACEMENT-PACKAGE.md#err-beh-rpkg-wrong-work-or-package-01) | Target Good Example: The same WorkId value identifies the same Work everywhere.<br>Problem Example: Two Works are considered equal because titles match. |
