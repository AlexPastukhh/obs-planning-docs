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

Work branch is derived deterministically as `changeset/<WorkId>` for schema-1 compatibility. `baseCommit` is pinned from a fresh fetch through one verified Git transport endpoint for `origin/<targetBranch>`. Endpoint capture also snapshots only the transport/authentication config permitted for that operation. The network fetch runs in an isolated temporary bare repository with system/global rewrite config disabled and without registered-repository `url.*.insteadOf` rules; fetched objects cross back only through local bundle/unbundle. Therefore stale local branch state, later `origin` mutation, and later `insteadOf` mutation are not source authority. Workspace intent is journaled before branch/worktree mutation; unjournaled deterministic collisions fail closed, and a leftover journal must agree exactly with an already-persisted `GitWorkspace` before it may be cleared.

## Apply identity rule

The package archive is read/validated/hashed once for one Apply invocation. Mutation consumes that captured `PackageData` payload. Reopening the mutable ZIP path later is forbidden as mutation authority.

`ReplacementPackageIdentity = packageId + archiveSha256` must match the exact bytes whose payload is applied. `PACKAGE.json.repositoryIdentity` must also equal the persisted `GitWorkspace.RepositoryTarget.repositoryIdentity`; this invariant belongs to Apply itself, not only to automatic target selection.

## Package recovery journal

Before file mutation the target runtime durably records exact Work/package/archive/workspace identity, package `baseHead`, operations, and prior/intended bytes in package-journal schema 3. A newly written journal starts with `applicabilityProven=false`: it is crash evidence but is not authority that the package was applicable. Before promotion, retry requires the Worktree to still equal the journal's captured prior state and may not restore bytes from the journal. Only after add/replace/delete applicability succeeds is the same journal durably promoted to `applicabilityProven=true`; only a proven journal may restore/reconcile partial effects or treat already-intended bytes as recovered Apply success. Therefore a failed add/delete/replace cannot become Applied merely because prior bytes happen to equal intended bytes on retry. The journal SHA-256 digest covers the applicability flag and all durable identity/byte fields, and recovery also requires intended bytes to match the captured `PackageData` for the exact archive SHA. Journal schemas 1/2 are intentionally fail-closed in this executable; the previous built executable remains owner of unfinished journals from those builds.

## Commit / Publish rules

Commit is package-only and independent from Publish. Exact commit recovery proves parent, identity trailers, changed paths and intended bytes.

Publish:
- refreshes exact remote Work-branch observation in every not-yet-published Publish invocation before any possible push;
- succeeds immediately if exact intended commit is already remote;
- permits push only when remote is absent or exactly package journal `baseHead`;
- rejects any other remote tip before push;
- durably writes `NotConfirmed` before possible push;
- captures one verified fetch transport endpoint for observation and, only if a push may occur, one verified push transport endpoint; `ls-remote`/`push` execute through isolated temporary Git transport state that excludes mutable `url.*.insteadOf` / `pushInsteadOf` rewrite rules from the registered repository, so neither remote aliases nor later URL-rewrite config can redirect the operation;
- the exact commit is transferred into isolated transport state through a local bundle and pushed with force-with-lease tied to the freshly proven previous remote state; RepositoryIdentity normalization is owned by the shared Git transport capability;
- observes again after possible push and persists exact evidence.

`NotConfirmed` means intended publication is not currently proven; retry must observe before any further push.

## Work operation serialization

Start workspace, Apply, Commit and Publish use one durable per-Work `WorkOperationLock` application boundary covering state read → filesystem/Git side effect → durable state write. The port is re-entrant for the same WorkId on the same thread because package-state persistence may re-enter it for a local invariant check; the package-state repository is not the semantic owner of Work serialization. Lock-acquisition failure is an operation-serialization failure, not evidence that Work state diverged.

## Result handoff

Successful automatic realization may emit:

```text
OBS-APPLY-RESULT/1
status: applied
packageId: <uuid>
changeSetId: <WorkId wire uuid>
```

It is emitted only after exact publication proof. It is not a package progress/state serialization.
