# ALWAYS READ — ChatGPT Work Sandbox Rules

Status: bootstrap operating rules for a disposable ChatGPT sandbox Work folder.

Read this file before substantive work and when resuming the Work. Tampermonkey/bridge automation may force this reread on every injected command.

## Current Work

Work / Intended Result:
<initialize for this Work>

Scope:
<initialize for this Work>

Done when:
<initialize for this Work>

Explicitly out of scope:
<initialize when useful>

Selected source(s):
<none, or exact Snapshot/repository identity + local path for current source-sensitive pass>

Methodology snapshot/context:
<record exact methodology identity when known; local METHODOLOGY/ is a working copy, not independent authority>

## Work boundary

- One top-level sandbox Work folder corresponds to one independently completable Work.
- A new chat, reasoning pass, stage, methodology item or Repository Snapshot does not by itself create a new Work.
- Start a new Work when a new independently valuable result can reasonably be completed/accepted separately.
- Do not silently expand the current Work to absorb independent follow-up work.

## Sandbox durability

- Treat the sandbox and every file in it as disposable.
- Do not rely on a previous sandbox Work folder surviving.
- Persist durable Work identity, important decisions, open Decision Gates, selected source identities, methodology state and important dependent results in the external Session State system/repository when that system is available.
- Temporary analysis/scripts/search results may remain local and may be lost.

## Methodology

- `METHODOLOGY/` is the local methodology snapshot/context for this Work. It is independent from `SOURCE/`; the reusable methodology may come from another repository/source than the repository being worked on.
- When compact methodology principles/registries are implemented, read them before every substantive/injected action. Load/re-read detailed Use Cases/Lenses only when registry triggers indicate applicability or the route materially changes.
- Methodology is guidance/default process, not an infallible algorithm. Material deviation is allowed when concrete context requires it, but make the deviation and reason visible.
- Do not assume a methodology item was applied merely because it exists locally.
- Current registry files are placeholders until the registry system is implemented. Read their status, but do not pretend complete routing occurred through a registry that is explicitly marked `NOT IMPLEMENTED`.

## Repository source / snapshots

- For substantial source-sensitive repository work, obtain one exact Repository Snapshot and place/materialize it under `SOURCE/`.
- Prefer obtaining the exact Snapshot through an available direct mechanism without interrupting the user. If that is not available, ask the user to provide the current Snapshot rather than falling back to repeated piecemeal remote file reads as the normal workflow.
- A Work may use snapshots from more than one repository; keep each selected source identity explicit.
- Treat the explicitly selected Snapshot as frozen source truth for the current source-sensitive pass.
- Do not mix files from different revisions or implicitly reuse historical packages/diffs/snapshots as current source.
- Do not repeatedly refetch individual remote files merely because upstream might have changed.
- Obtain a newer Snapshot when there is a concrete reason (for example repository-changing work was applied or the next pass genuinely requires newer source truth).
- A new Snapshot does not automatically create a new Work.
- `git clone`, local-app GET, extension attachment, user attachment and other transport mechanisms are HOW; the Work rule is to obtain an exact Snapshot.

## Local folders

- `SOURCE/` contains source material/snapshots. Preserve explicit source identity; do not treat mutable working output as source truth.
- `FILES/` contains everything created during the Work: notes, decisions, working copies, reviews, scripts and outputs. Add subfolders only when useful.
- Do not create folder taxonomy merely for ceremony.

## Starting a new Work

When a new independent Work begins:

1. initialize a fresh sandbox Work folder from the durable sandbox template/bootstrap; do not inherit the previous Work's Goal, source selection or active methodology state merely because its folder survived;
2. initialize the `Current Work` section above for the new Intended Result;
3. materialize/copy the selected methodology snapshot into `METHODOLOGY/` when available;
4. obtain repository/source Snapshot(s) only if the new Work needs them;
5. read this file and the compact methodology registries/principles before substantive work.

Do not use arbitrary previous sandbox folders as implicit bootstrap authority. If mandatory files are missing, reconstruct them from the durable Session State/template source when possible.

## Decision Gates

- Ask the user when a material semantic/product/authority choice cannot be safely derived from established intent.
- Do not create Decision Gates for trivial or safely reversible formatting/implementation choices.
- When methodology itself exposes the unresolved material choice, explain which methodology consideration created the gate.
