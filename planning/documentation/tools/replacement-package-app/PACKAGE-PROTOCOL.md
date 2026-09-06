# Replacement Package Protocol — Consumer Contract

Status: active schema-1 target contract

## ZIP layout

```text
<package>.zip
├── PACKAGE.json
├── base-files/<repo-relative paths for replace/delete>
└── replacement-files/<repo-relative paths for add/replace>
```

No undeclared payload files are allowed.

## PACKAGE.json schema 1

```json
{
  "schemaVersion": 1,
  "packageId": "<uuid>",
  "changeSetId": "<uuid>",
  "changeSetLabel": "<stable human-readable label>",
  "repositoryIdentity": "github:<owner>/<repo>",
  "workIntent": {
    "schemaVersion": 1,
    "changeSetId": "<same uuid>",
    "repositoryIdentity": "<same repository identity>",
    "title": "...",
    "goal": "...",
    "why": "...",
    "acceptance": ["..."]
  },
  "operations": [
    {"path":"repo/relative/path","action":"add|replace|delete"}
  ]
}
```

`changeSetId` is the schema-1 external wire name for WorkId. `changeSetLabel` remains compatibility/presentation metadata and is not runtime identity.

## Operation payload rules

- `add`: replacement file required, base file forbidden;
- `replace`: exact base file + full replacement file required;
- `delete`: exact base file required, replacement forbidden;
- paths are normalized repository-relative paths; traversal/absolute paths are invalid;
- duplicate/case-colliding operation paths are invalid;
- symlink/submodule/chmod/native rename semantics are not introduced by schema 1;
- raw exact bytes are applicability authority; Git path equivalence may be used only where consumer mechanics explicitly prove it safely.

## Work Intent

Target automatic mode requires embedded `workIntent`. One exact `ChangeSet-Id: <WorkId>` machine marker identifies the managed GitHub Issue. Zero exact matches may create one; one is adopted/verified; multiple fail closed. Create intent is journaled/reconciled before another external create is considered.

Work Intent may exist before GitWorkspace and is not package/workspace progress state.

## OBS-ACTION/1 — automatic apply-package

```text
OBS-ACTION/1
action: apply-package
name: <attempt label>
archive: <zip filename hint>
packageId: <manifest packageId>
targetBranch: <explicit integration target branch>
```

Rules:
- `archive` is a discovery hint, never repository mutation authority;
- consumer resolves one concrete ZIP and requires exact manifest `packageId` match;
- `targetBranch` is required by the target automatic route and is never inferred from current checkout;
- package repositoryIdentity authorizes only matching registered Repository Targets; multiple matching targets require explicit selection;
- after package/target authorization, the consumer ensures Work Intent, then exact GitWorkspace, then invokes Apply → Commit → Publish;
- repeating the same exact action proves/reuses already-established natural-owner facts; it does not dispatch from a generic progress enum;
- old persisted ChangeSet work is not adopted/interpreted by the target executable;
- `chatTabTitle`, `chatContextToken` and other legacy review-delivery metadata are not part of the target apply-package action;
- repository operations are never encoded as separate serialized `OBS-ACTION` commands; manual Start/Commit/Publish controls are local application entries.

## GitWorkspace rules

For WorkId the target runtime persists:

```text
RepositoryTarget
TargetBranch
Worktree
BaseCommit
```

Work branch is derived deterministically as `changeset/<WorkId>` for schema-1 compatibility. `baseCommit` is pinned from a fresh fetch/observation of the verified `origin/<targetBranch>`; a stale local target branch is never source authority. Workspace intent is journaled before branch/worktree mutation; unjournaled deterministic collisions fail closed, and a leftover journal must agree exactly with an already-persisted `GitWorkspace` before it may be cleared.

## Apply identity rule

The package archive is read/validated/hashed once for one Apply invocation. Mutation consumes that captured `PackageData` payload. Reopening the mutable ZIP path later is forbidden as mutation authority.

`ReplacementPackageIdentity = packageId + archiveSha256` must match the exact bytes whose payload is applied.

## Package recovery journal

Before file mutation the target runtime durably records exact Work/package/archive/workspace identity, package `baseHead`, operations, and prior/intended bytes. The journal carries a canonical SHA-256 integrity digest over those durable fields/bytes; any mismatch fails closed. On Apply recovery its intended bytes must also still match the captured `PackageData` for the exact archive SHA, so journal metadata alone cannot rebind an archive to different bytes. The journal permits proof/recovery when file or Git side effects succeeded before final `ReplacementPackageState` persistence.

## Commit / Publish rules

Commit is package-only and independent from Publish. Exact commit recovery proves parent, identity trailers, changed paths and intended bytes.

Publish:
- refreshes exact remote Work-branch observation in every not-yet-published Publish invocation before any possible push;
- succeeds immediately if exact intended commit is already remote;
- permits push only when remote is absent or exactly package journal `baseHead`;
- rejects any other remote tip before push;
- durably writes `NotConfirmed` before possible push;
- verifies every effective `origin` push URL resolves to the same RepositoryIdentity as the observed/fetch target, then pushes the exact commit with force-with-lease tied to the freshly proven previous remote state;
- observes again after possible push and persists exact evidence.

`NotConfirmed` means intended publication is not currently proven; retry must observe before any further push.

## Work operation serialization

Start workspace, Apply, Commit and Publish use one durable per-Work `WorkOperationLock` application boundary covering state read → filesystem/Git side effect → durable state write. Package-state persistence may re-enter the same lock for its local invariant check, but the package-state repository is not the semantic owner of Work serialization.

## Result handoff

Successful automatic realization may emit:

```text
OBS-APPLY-RESULT/1
status: applied
packageId: <uuid>
changeSetId: <WorkId wire uuid>
```

It is emitted only after exact publication proof. It is not a package progress/state serialization.
