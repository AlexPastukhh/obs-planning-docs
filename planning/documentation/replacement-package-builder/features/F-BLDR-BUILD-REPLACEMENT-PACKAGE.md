# F-BLDR-BUILD-REPLACEMENT-PACKAGE — Build Replacement Package

## Identity

`F-BLDR-BUILD-REPLACEMENT-PACKAGE`

## Intent

Materialize one exact Replacement Package for one exact open logical work and one exact expected source.

## Principal Result

One validated immutable package ZIP exists with a new `packageId`.

## Expected application behavior

### Data

| Kind | Data |
|---|---|
| Work input | `repositoryIdentity`, `changeSetId`, recorded `workBranch`, Start Work base |
| Package source | one full `expectedSource` commit SHA |
| Desired result input | exact resulting file bytes + explicit deletions |
| Package result | `packageId`, operations, exact base bytes, complete replacement bytes, ZIP bytes |

### Main path

| Behavior step | Requirement(s) |
|---|---|
| **1. Select exact work and package source.** For the first package, set `expectedSource = startBaseCommit`; fix it before package materialization. Pre-`APPROVABLE` corrections reuse that same source. | `BR-BLDR-BUILD-CHANGESET-CONTINUITY` — `same open logical work before APPROVABLE ⇒ same changeSetId`; new logical work ⇒ new `changeSetId`.<br>`BR-BLDR-BUILD-FIX-EXPECTED-SOURCE` — `firstPackage.expectedSource = startBaseCommit`; `package.expectedSource` is fixed before materialization; later branch movement does not change it.<br>`BR-BLDR-BUILD-PREAPPROVAL-SOURCE-CONTINUITY` — `same open changeSetId + correction before APPROVABLE ⇒ same expectedSource`.<br>`BR-BLDR-BUILD-APPROVABLE-PACKAGE-IS-FROZEN` — `APPROVABLE(packageId) ⇒ that exact package is handoff package`; later new ZIP ⇒ new logical work/new `changeSetId`. |

Decision after Step 1: **What package-lifecycle path applies?**

| Correction before `APPROVABLE` | Exact package already `APPROVABLE` | New logical work |
|---|---|---|
| Keep the same `changeSetId`. | Freeze the approved package as the handoff package. | Use a new `changeSetId`. |
| Keep the same `expectedSource`. | Do not build another ZIP under this `changeSetId`. | Select the new work's exact source. |
| → Step 2 | Stop; start new logical work for another ZIP. | → Step 2 |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **2. Derive exact package operations.** Determine touched paths and exact desired resulting bytes/deletions; derive one operation per path with exact base where required. | `BR-BLDR-BUILD-PACKAGE-CONTENT-CONSISTENCY` — `∀ path: exactly one operation`; operation kind ⇔ required/forbidden payload shape; undeclared/missing/colliding payload ⇒ failure.<br>`BR-BLDR-BUILD-EXACT-BASE-CONTENT` — `replace\|delete(path) ⇒ expectedBase(path) = exact source bytes`.<br>`BR-BLDR-BUILD-COMPLETE-REPLACEMENT-BYTES` — `add\|replace(path) ⇒ replacement(path) = complete resulting file bytes`. |

Decision inside Step 2: **Which operation applies to this path?**

| `add` | `replace` | `delete` |
|---|---|---|
| Expected base: absent. | Expected base: exact source bytes. | Expected base: exact source bytes. |
| Replacement: complete resulting bytes. | Replacement: complete resulting bytes. | Replacement: absent. |
| Valid operation → continue deriving remaining paths / Step 3. | Valid operation → continue deriving remaining paths / Step 3. | Valid operation → continue deriving remaining paths / Step 3. |

Any invalid/missing/colliding/undeclared payload ⇒ fail Step 2.

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **3. Construct the exact package model.** Generate a new `packageId`; construct one internally valid package from fixed source + operations. | `BR-BLDR-BUILD-NEW-PACKAGE-ID` — `new ZIP ⇒ new packageId`.<br>`BR-BLDR-BUILD-PACKAGE-CONTENT-CONSISTENCY` — `∀ path: exactly one operation`; operation kind ⇔ required/forbidden payload shape; undeclared/missing/colliding payload ⇒ failure. |
| **4. Materialize, validate and return the ZIP.** Write archive; validate identity/manifest/payload consistency; report success only for exact validated ZIP. | `BR-BLDR-BUILD-ORDERED-SOURCE-AND-MATERIALIZATION` — `fix work/source → derive paths/result bytes → derive operations/base bytes → materialize ZIP → validate exact package → Success`. |

## Boundary decision

Separate Feature from Start Work and Review: its principal Result is the exact package artifact itself.

---
