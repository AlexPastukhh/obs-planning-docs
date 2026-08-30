# SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT — Provide Repository Context For Further Work

Status: active current Scenario owner

## User goal

Create a trustworthy portable representation of one registered repository and, when useful, make that exact artifact available in one intended ordinary ChatGPT conversation without changing repository work.

## Main flow

1. Select one concrete Repository Target and Local or Committed snapshot mode.
2. In the same dialog choose `Export only`, `Export + Attach`, or `Export + Attach + Send`.
3. Either automatic ChatGPT path requires one ordinary conversation selected before export. The application freezes exact `conversationKey` and attach/send intent with the snapshot inputs. This is per-operation state and never changes Review-chat binding.
4. Revalidate the registered target and repository identity. Current V1 Local/Committed modes require a committed baseline/ref; a repository without a first commit reports Repository Not Ready.
5. Create the Snapshot ZIP first. Snapshot success is independent from downstream browser success.
6. `Export only` returns the artifact/path conveniences and creates no ChatGPT interaction.
7. Automatic handoff creates one External Interaction only after successful exact ZIP creation and only for the frozen conversation: attach-only ends `Attached`; attach+Send uses the same generic guarded exact-attachment Send engine as ReviewDiff.

## Local snapshot

The ZIP contains current tracked files that exist plus untracked non-ignored files under `snapshot/`, frozen `BASE-COMMIT.txt`, `WORKING-TREE.diff` from that base to the exported local state and `SNAPSHOT.json`.

Current exporter deliberately verifies local consistency twice: exact inventory/file hashes, frozen HEAD and generated diff must remain identical across capture. Instability fails export and publishes no mixed final ZIP. The real Git index is not modified.

## Committed snapshot

The requested ref is resolved once to an immutable commit SHA. Regular file bytes are read from Git objects independently of dirty/staged/untracked working-tree state. V1 rejects symlink/submodule entries rather than flattening them misleadingly.

## Important rules

- export is read-only: no ChangeSet/ownership/index/checkout/commit/push mutation;
- `.git/**` is excluded;
- output directory must already exist outside the repository and reparse/symlink escape is rejected;
- final ZIP is published through a temporary file to a unique path;
- clipboard/browser failure never changes successful snapshot truth;
- automatic handoff never substitutes a later/current conversation and never changes Review-chat binding;
- exact same artifact/destination/mode may reuse one still-actionable interaction; attach-only and attach+Send are distinct intents;
- Snapshot has a fixed Java-owned pre-confirmation deadline while Pending/Claimed/Preparing. Timeout before preparation is Cancelled; after preparation begins it is PreparedUnsent. Before the first application-controlled auto-send click Java must establish SendArmed while that original deadline is live.
