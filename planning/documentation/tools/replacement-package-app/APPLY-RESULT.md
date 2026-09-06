# Replacement Package App — Apply Result Contract

Status: active target handoff contract

`OBS-APPLY-RESULT/1` is a small serialized handoff for the top-level automatic `apply-package` result. It does not represent internal progress state.

## Successful automatic realization

```text
OBS-APPLY-RESULT/1
status: applied
packageId: <uuid>
changeSetId: <uuid>
```

Schema-1 `changeSetId` is the external wire name for WorkId.

`status: applied` is emitted/copyable only after automatic Start workspace → Apply → Commit → Publish has proven `ReplacementPackageState.isPublished()` for the exact package commit. Manual file-only Apply does not imply top-level published success.

A repeated exact automatic action may produce the same successful receipt after proving already-established workspace/package/commit/publication facts; this is operation idempotency, not generic Resume.

## Failure semantics

A failed concrete operation never turns prior durable state into failure. UI/CLI reports the concrete operation failure code/message. Publication confirmation failure means the external fact is not reliably proven; it does not mean “confirmed not published”.

Only `status: applied` authorizes downstream expected-state advancement for that exact packageId/WorkId. No ChangeSet execution-state name (`Ready`, `AppliedUncommitted`, `CommittedUnpublished`, `PublicationUncertain`) appears in the target handoff contract.

The formatter still accepts the schema-1 `failed`/`uncertain` receipt forms for compatibility tooling, but the target automatic runtime's durable recovery authority is `GitWorkspace + ReplacementPackageState + journals`, not a receipt.
