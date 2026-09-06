# F-RPKG-APPLY-REPLACEMENT-PACKAGE — Apply Replacement Package

## Identity

`F-RPKG-APPLY-REPLACEMENT-PACKAGE`

## Intent

Apply the exact replacement-package file result to the exact selected repository work without implicitly committing or publishing it.

## Principal Result

`Result<ReplacementPackageState, ApplyFailure>`

Success means the concrete **Apply Package** operation succeeded. `ReplacementPackageState` is returned as the resulting durable state/value; it is not itself a success/failure classification.

## Expected application behavior

### Data

| Kind | Data |
|---|---|
| Input | exact package/archive, `packageId`, exact archive content identity, `repositoryIdentity`, WorkId (`changeSetId` wire alias), exact GitWorkspace context, expected source |
| Result | durable `ReplacementPackageState` proving package-file Apply and preserving exact package identity |
| Failure | typed `ApplyFailure` for the concrete Apply operation |

### Main path

| Behavior step | Requirement(s) |
|---|---|
| **1. Verify exact package/work invocation and applicability before mutation.** | `BR-RPKG-APPLY-EXACT-INVOCATION` — repository WorkId and package identity must match exactly before mutation.<br>`BR-RPKG-APPLY-EXPECTED-SOURCE-AND-APPLICABILITY` — every replace/delete expected source must be proven applicable before the first package-file mutation. |
| **2. Apply exact package bytes.** | `BR-RPKG-APPLY-EXACT-PACKAGE` — operations and full payload bytes from the validated package are repository-file mutation authority. |
| **3. Persist resulting package state.** | `BR-RPKG-APPLY-DURABLE-STATE` — successful Apply records durable `ReplacementPackageState` with exact package identity before later independent operations rely on it. |

### Idempotent repeat

The same exact archive may return the already-established Applied state without repeating file mutation. Same `packageId` with a different proven archive identity fails. The new executable does not import legacy package state; exact archive content identity is mandatory.

## Feature Implementation Concerns

`ReplacementPackageState` is shared continuity between the independent Apply, Commit and Publish operations. It records state/evidence, not operation success.

The current giant `Core` remains a temporary Git/file mechanics adapter during runtime cutover. New Feature/domain state is WorkId-based and does not project legacy `Core.ChangeSet.executionState`.

## Feature / Slice Boundary Decision

Apply Package has its own semantic entry and Result. Commit Applied and Publish are separately invokable application operations with their own Results and failure vocabularies.

Automatic `OBS-ACTION apply-package` may compose workspace → Apply → Commit → Publish as Scenario/entry-adapter convenience. That composition does not merge the operation contracts and does not create a generic `Resume-to-extent` Feature.

Boundary hypothesis: `Apply Replacement Package`, `Commit Applied Package`, and `Publish Applied Commit` are separate Feature operations implemented inside the same replacement-package realization module/Slice while they continue to share one cohesive durable package state.

## Evolution Impact

### EVO-RPKG-MODULARIZE-PACKAGE-REALIZATION

Evolution Kinds for this owner:
- Refactoring
- Forced Migration

[CHANGED] Remove `ApplyExtent` from this Feature contract.

[REMOVED] Remove `ApplyRequest.Resume`, generic `advance(...)`, requested-terminal-extent semantics and `alreadySatisfied` relative to an extent.

[CHANGED] Rename package continuity state from `PackageApplication` to `ReplacementPackageState`.

[NEW] Exact publication evidence is represented independently by `PublicationObservation`.

Forced Migration:
New package state is not migrated from old ChangeSet records. Old persisted works remain owned by the deployed old executable; new-model state requires exact archive identity.
