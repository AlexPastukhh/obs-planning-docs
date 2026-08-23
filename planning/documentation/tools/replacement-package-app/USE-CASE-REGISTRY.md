# Replacement Package App Legacy Capability Index

Status: legacy compatibility / navigation only
Scope: preserves historical `UC-RPKG-*` identifiers and routes them into the current Scenario/Domain/Slice documentation. It is not current application semantic authority.

Current semantic entry:
- [`application-plan.md`](application-plan.md)
- [`scenarios/README.md`](scenarios/README.md)

## Boundary

Current application behavior is owned by Scenario owners directly. Historical `UC-RPKG-*` entries were operation/capability-shaped and are retained only so old links, notes and implementation traceability remain understandable.

```text
historical capability ID
→ current user-world Scenario
→ current implementation Slice
```

Do not create new `UC-RPKG-*` entries for application buttons/actions. Reusable/workspace methodology Use Cases remain unaffected by this migration.

## Compatibility Mapping

| Historical ID | Historical capability | Current Scenario owner | Current implementation Slice |
|---|---|---|---|
| `UC-RPKG-APPLY` | Apply Verified Replacement Package | [`SCN-RPKG-COMPLETE-REPOSITORY-WORK`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md) | `SL-RPKG-01` |
| `UC-RPKG-REVIEW` | Inspect Current ChangeSet Review State | [`SCN-RPKG-COMPLETE-REPOSITORY-WORK`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md) | `SL-RPKG-02` |
| `UC-RPKG-FINALIZE` | Finalize Current ChangeSet | [`SCN-RPKG-COMPLETE-REPOSITORY-WORK`](scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md) | `SL-RPKG-03` |
| `UC-RPKG-EXPORT-REPOSITORY` | Export Repository Snapshot ZIP | [`SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT`](scenarios/SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md) | `SL-RPKG-04` |
| `UC-RPKG-ATTACH-SNAPSHOT` | Attach Repository Snapshot to ChatGPT | [`SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT`](scenarios/SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md) | `SL-RPKG-05` |
| `UC-RPKG-DELIVER-REVIEW` | Deliver Current ReviewDiff to ChatGPT | [`SCN-RPKG-PROVIDE-CURRENT-CHANGE`](scenarios/SCN-RPKG-PROVIDE-CURRENT-CHANGE.md) | `SL-RPKG-06` |

Detailed current realization is owned by [`slices.md`](slices.md), while `PACKAGE-PROTOCOL.md`, `REPOSITORY-SNAPSHOT.md`, `CHATGPT-BRIDGE.md`, `DATA-AND-STATE.md` and `ARCHITECTURE.md` remain focused downstream contracts/evidence.
