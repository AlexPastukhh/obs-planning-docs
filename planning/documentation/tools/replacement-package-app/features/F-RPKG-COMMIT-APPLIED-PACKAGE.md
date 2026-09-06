# F-RPKG-COMMIT-APPLIED-PACKAGE — Commit Applied Package

## Identity

`F-RPKG-COMMIT-APPLIED-PACKAGE`

## Intent

Create or prove the exact local Git commit for the replacement package that is already durably Applied.

## Principal Result

`Result<ReplacementPackageState, CommitAppliedFailure>`

Success means this Commit Applied operation succeeded or its exact commit fact was already proven. The returned state carries the exact `commitSha`.

## Expected application behavior

| Behavior step | Requirement(s) |
|---|---|
| **1. Load exact package state.** | `BR-RPKG-COMMIT-REQUIRES-APPLIED-PACKAGE` — Commit requires the exact Work/package state and proven Apply. |
| **2. Commit only intended package work.** | `BR-RPKG-COMMIT-CONTAINS-ONLY-INTENDED-WORK` — committed paths equal the intended package-applied work; unrelated work is not intentionally included. |
| **3. Persist exact commit fact.** | `BR-RPKG-COMMIT-DURABLE-IDENTITY` — successful Commit stores the exact commit SHA in `ReplacementPackageState`. |

A repeated Commit Applied operation does not create a duplicate commit when the exact commit is already proven.

## Boundary decision

Commit Applied is not `ApplyExtent.APPLY_COMMIT` and is not a Resume branch. It is an independent operation over durable replacement-package state.
