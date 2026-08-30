# Repository Snapshot Export

Status: active current contract
Scope: read-only portable ZIP representation of one registered repository. It is not a replacement package and does not use `PACKAGE.json` or `OBS-ACTION`.

## ZIP shapes

Local:

```text
<repo>-local-base-<short-head>-<timestamp>.zip
├── SNAPSHOT.json
├── BASE-COMMIT.txt
├── WORKING-TREE.diff
└── snapshot/**
```

Committed:

```text
<repo>-commit-<short-commit>-<timestamp>.zip
├── SNAPSHOT.json
├── COMMIT.txt
└── snapshot/**
```

Local `snapshot/` contains tracked files that currently exist plus untracked non-ignored files. Tracked deletions are absent and represented in `WORKING-TREE.diff`; ignored untracked files and `.git/**` are excluded. `BASE-COMMIT.txt` and the diff use one frozen full HEAD SHA.

Committed export resolves the requested ref once to a full commit SHA and reads regular-file blobs from Git objects; dirty/staged/untracked working-tree state does not affect committed bytes. V1 rejects symlink/submodule entries rather than flattening them.

## Local consistency

Local export deliberately proves one coherent capture:

```text
freeze HEAD
→ capture inventory + exact bytes/hashes
→ generate frozen-base temporary-index diff
→ capture inventory + bytes/hashes again
→ require equality + unchanged HEAD
→ regenerate diff and require identical diff bytes + unchanged HEAD
→ publish ZIP from verified capture
```

Instability fails with no mixed final ZIP. The real Git index is never mutated.

## Repository/output boundary

The target must be a registered Git work tree whose current origin still matches its stored repository identity. Selected V1 Local/Committed modes require a committed baseline/ref; repository-without-first-commit reports Repository Not Ready.

Output directory must already exist and resolve outside the repository, including through symlink/junction/reparse aliases. Final ZIP is published through a temporary file to a unique non-overwriting path.

## ChatGPT handoff

Snapshot creation completes first. The Swing dialog chooses `Export only`, `Export + Attach`, or `Export + Attach + Send`; either automatic path freezes one ordinary ChatGPT `conversationKey` plus send intent before export. No later conversation is substituted and Snapshot selection never mutates Review-chat binding.

Attach-only ends at `Attached`. Attach+Send reuses the generic exact-attachment/guarded-Send engine described in `CHATGPT-BRIDGE.md`. A fixed Java-owned pre-confirmation deadline bounds Pending/Claimed/Preparing Snapshot tasks; before the first application-controlled possible-Send click Java establishes `SendArmed` while that original deadline is still live.
