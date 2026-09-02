# SL-RPKG-09 — Notify Operation Outcomes

Status: active current Slice owner

## Result / Responsibility

Report meaningful terminal/recovery operation outcomes and allow notification navigation to foreground relevant repository context without executing repository mutations.

## Scenario behavior realized

Supports current repository-work, Snapshot and handoff FIs by exposing their truthful terminal/recovery results.

## Domain used

Repository Target / ChangeSet navigation context and operation-result projection. Notification is not a new business Aggregate.

## Slice Implementation Items

### SI-RPKG-NOTIFICATION-NEVER-AUTO-MUTATES
Requirement:
Notification activation may foreground/select the relevant context but must not automatically invoke Apply, Finalize, Retry, Reopen, Send or another mutation-capable action.

Reason:
A notification is feedback/navigation, not authorization.

## Tests

Deterministic outcome/source contracts plus `WindowsLauncherInstallerTests` for launcher-related mechanics where applicable. Real Windows notification appearance/click routing is Practical Acceptance/Evidence.

## Evolution Impact

New reviewed-result/PR/finalize outcome kinds may expand presentation; notification authority remains unchanged.
