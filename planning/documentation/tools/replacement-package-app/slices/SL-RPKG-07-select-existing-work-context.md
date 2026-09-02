# SL-RPKG-07 — Select Existing Work Context

Status: active current Slice owner

## Result / Responsibility

Project and navigate exact Repository Target / ChangeSet work context, unfinished/global/history scopes and unavailable stored targets without granting mutation authority or silently substituting another target.

## Scenario behavior realized

Supports:
- `FI-RPKG-RESOLVE-CURRENT-REPOSITORY-WORK`
- legacy Current Change navigation
- selected Screen Behavior Items for visible work context/history/read-only navigation

Behavior Items:
- supports `BI-RPKG-CURRENT-EXACT-REPOSITORY-TARGET`
- supports `BI-RPKG-CURRENT-CHANGESET-ID-AUTHORITY`

## Domain used

Repository Target; Repository Work / ChangeSet.

## Slice Implementation Items

### SI-RPKG-NAVIGATION-IS-PROJECTION-NOT-AUTHORITY
Requirement:
Selectors/history projections may choose what the UI shows, but every mutation-capable operation must capture/revalidate its own exact Repository Target/ChangeSet authority.

Reason:
Navigation can change while background work is running.

## Tests

`CoreTests` + Swing source contracts for current/global/history projection, ordering, unavailable target representation and exact target/ChangeSet selection without mutation.

## Evolution Impact

Planned reviewed-result state adds more ChangeSet facts to project, but does not change the rule that navigation is not execution authority.
