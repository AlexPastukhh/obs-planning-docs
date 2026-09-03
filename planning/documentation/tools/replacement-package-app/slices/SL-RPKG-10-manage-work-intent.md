# SL-RPKG-10 — Manage Repository Work Intent

Status: active current Slice owner with planned target ownership migration

## Current Result / Responsibility

Ensure one durable exact GitHub Issue carries the ChangeSet semantic Work Intent before current target-mode repository execution; support standalone `create-work-intent`.

## Current Scenario Behavior Realized

- `FI-RPKG-ESTABLISH-CURRENT-WORK-INTENT`
- `BI-RPKG-WORK-INTENT-ONE-EXACT-ISSUE`
- `BI-RPKG-WORK-INTENT-DURABLE`

## Domain Used

Work Intent; Repository Target; Repository Work / ChangeSet.

## Slice Implementation Items — Current

### SI-RPKG-WORK-INTENT-DURABLE-CREATE-RECOVERY

Persist exact Issue-create intent before external create and reconcile exact marker identity after uncertain/lost response before another create.

## Tests

Current `CoreTests` cover routing, Work Intent validation, marker identity, journal/recovery and duplicate conflict.

## Evolution Impact

### EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW

Planned Builder Start Work creates the repository-work Issue before ChatGPT development.

Therefore the planned App Scenario no longer has `FI-RPKG-ESTABLISH-REPOSITORY-WORK-INTENT` as its first FI.

Target consumer behavior verifies/adopts the exact Builder-established Issue/work identity from the handoff and must not create a competing Issue.

Implementation planning may reuse current SL-RPKG-10 GitHub Issue mechanics, move part of them to Builder, or introduce a genuinely shared lower-level capability. That HOW is not selected by this Slice owner.

Current SL-RPKG-10 remains current implementation truth until migration is implemented/proved.
