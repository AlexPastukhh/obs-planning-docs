# Local-First Repository Change And GitHub Update Workflow

Status: current project-local implementation workflow / `0.8.0-prototype`
Scope: ordinary Files changes, category definitions, Reference Object changes, Ordered Reference Lists, structure creation and repository copy.

## Product rule

Repository business actions first create the intended local file state. GitHub publication is a separate explicit action.

```text
edit / create / category change / Reference Object update / order / structure / copy
  → stage complete intended file bytes locally with the first verified base SHA
  → review the visible file in the application
  → Update current file OR Update all
  → verify the GitHub result
  → clear only verified pending changes
```

No feature-specific `Order GitHub`, `Update Reference Object on GitHub`, or similar parallel publisher belongs in the UI. The two standard publication scopes own GitHub update behavior.

## Shared local queue

The queue is scoped by exact workspace owner/repository/branch and remains compatible with the former Reference Object draft key. Each path records:

- repository-relative path;
- first verified `baseSha`, or empty for an expected-new path;
- complete text or binary payload;
- operation/source metadata;
- optional dependencies and commit message;
- update timestamp.

Later local edits replace intended bytes but never replace the first base SHA. This preserves the conflict boundary against the remote snapshot from which the work started.

The aggregate prototype bound is 16 MiB. Feature-specific lower bounds still apply where applicable.

## Update current file

`Update current file` is enabled only when the open Files preview path has a pending local change.

It publishes exactly that one path through the existing GitHub Contents API safety boundary:

- updates include the captured base SHA;
- creates omit SHA and therefore still conflict if the path appeared remotely;
- text/bytes are read back exactly;
- only that path leaves the pending queue after verification.

Related pending paths, including a Reference Object usage-index file, remain pending for a later explicit update.

## Update all

`Update all` publishes every pending path as one Git commit through the Git Data API:

1. read the selected branch ref and base commit/tree;
2. prove every existing path has the captured blob SHA and every new path is absent;
3. create all intended blobs;
4. recheck that branch head is unchanged;
5. create one tree and one commit with the checked head as parent;
6. perform one non-force ref update;
7. reread ref, commit and recursive tree and verify every intended path points to the created blob.

If any preflight/base check fails, the branch ref is not changed. The implementation never silently falls back to sequential Contents API writes. A network-unknown ref update is recovered only when a fresh ref read proves the branch points to the intended commit.

## Refresh after publication

Publication invalidates local Reference Object check state and category projections affected by the files. The open preview receives the verified SHA for a current-file update. Repository/category/reference views must be explicitly refreshed when their remote projection is needed.

## Boundaries

- Linked Note `Save GitHub` remains its established compound Note workflow: it persists the local Note first, then verifies Note/asset writes. Category-definition changes triggered by Note membership enter the shared local file queue.
- Reads, previews, checks, Reader and App State remain non-writing.
- No local Git, commit or push is run by the application.
- The future idea of a per-Reference-Object automatic-propagation permission is not implemented.

## Acceptance

- editor, structure, copy, category, Reference Object and ordering actions can be completed without a GitHub write;
- current-file publication touches one path only;
- all-file publication uses one commit and one non-force ref update;
- any changed base blocks before ref mutation;
- no sequential bulk fallback exists;
- pending changes survive conflicts/errors and clear only after verification.
