# Replacement Package App — Testing Strategy

Status: active current automated-proof strategy
Scope: proof responsibility for the current implementation. User-visible behavior remains in Scenario owners; implementation orientation remains in `slices.md`; operated Windows/Swing/Edge/ChatGPT evidence remains in `MANUAL-ACCEPTANCE.md`.

## Proof model

Use the smallest proof surface that can establish the behavior:

1. **Deterministic/component proof** for parsing, state, projection, lifecycle and helper rules.
2. **Repository/integration proof** with disposable real Git repositories, filesystems, state stores and bare remotes when Git/file/state semantics matter.
3. **Bridge/DOM regression** for Java bridge task truth and deterministic extension/adapter behavior that can be exercised without claiming a real browser session.
4. **Manual practical evidence** only for real Swing/Windows/Edge/ChatGPT surfaces that automated tests do not establish.

`run-tests.cmd` is the standard automated entry and currently runs `CoreTests`, `ApplyReceiptTests`, `ChatBridgeTests`, the Node `chatgpt-adapter-dom.test.js` regression, and `WindowsLauncherInstallerTests`. Documentation does not claim those tests passed unless they were actually executed for the state being reviewed.

## Slice → automated proof map

| Slice | Primary automated proof responsibility |
|---|---|
| `SL-RPKG-01` Apply Replacement Work | `CoreTests`: legacy package/action/ownership/source behavior plus Git-backed `Ready → AppliedUncommitted → CommittedUnpublished → Ready` with `PublicationUncertain`: worktree-only mutation, durable Apply-journal exact prior/intended bytes, same-package idempotency, Apply crash recovery, Unicode/raw dirty-path identity, Commit package-only staging including explicit ignored adds, exact authoritative trailer-block parsing, exact trailers/parent, Commit retry/recovery, exact effective origin fetch/push identity after Git URL rewriting, exact remote-branch Publish with lease, missing/prior/already-published remote handling, proven push failure, `PublicationUncertain` reconciliation, remote divergence refusal, retained completed-journal rollover into the next package, unrelated-dirt refusal and legacy Review/Finalize fencing. |
| `SL-RPKG-02` Inspect Current Change | `CoreTests`: cumulative canonical ReviewDiff, temporary-index isolation, persistence/integrity/staleness and background Refresh ownership rules. |
| `SL-RPKG-03` Finalize And Publish Work | `CoreTests`: owned-only staging, review baseline equality, commit/push/publication-pending recovery, remote recovery guards and explicit safe Reopen lifecycle/ownership reacquisition. |
| `SL-RPKG-04` Export Repository Snapshot | `CoreTests`: Local/Committed snapshot bytes/metadata, repository readiness, index safety, confinement and Local consistency/stability checks. |
| `SL-RPKG-05` Attach Repository Snapshot To ChatGPT | `ChatBridgeTests` plus Core/Swing source contracts where applicable: exact snapshot task identity, frozen destination/mode, attach-only vs auto-send task truth, Snapshot deadline/scheduler/restart behavior and generic attachment contract. |
| `SL-RPKG-06` Deliver Current Change To ChatGPT | `ChatBridgeTests` + Node DOM regression + source contracts: binding/title/token resolution, protocol/task preflight, exact `.diff` attachment, runtime-agent fencing, `SendArmed`/`SendClicked`, guarded retries and post-Send truth boundaries. |
| `SL-RPKG-07` Select Existing Work Context | `CoreTests` + Swing source contracts: current/global/history projection, ordering, unavailable target, exact target/ChangeSet selection and navigation-without-mutation. |
| `SL-RPKG-08` Manage External Interactions | `ChatBridgeTests`: semantic interaction identity, actionable dedupe, cancellation boundaries, uncertainty persistence/dismissal and terminal-retry identity. |
| `SL-RPKG-09` Notify Operation Outcomes | deterministic outcome/source contracts plus `WindowsLauncherInstallerTests` for launcher mechanics; real Windows notification delivery/click routing remains manual evidence. |
| `SL-RPKG-11` Start ChangeSet Workspace | `CoreTests`: exact target-branch pinning, deterministic branch/worktree creation, same-common-repository verification, persisted `Ready`, target movement stability, durable journal recovery including preservation of successive invalid partial worktree attempts with stale exact registrations, unjournaled collision fail-closed behavior and the transitional guard that prevents legacy Apply/Review from touching a Git-backed ChangeSet. `ChatBridgeTests` retains the Swing source contract around the ChangeSet selector and new Start workspace control. |

## Critical automated guarantees

Automated proof keeps the current safety boundaries explicit, especially:

- failed package/target/ownership/source preflight causes no repository mutation;
- Git-equivalent path representation may pass after raw mismatch, while real source change or unverifiable Git/filter semantics fail closed;
- one unfinished legacy ChangeSet cannot capture sibling ownership and a same-origin clone is not silently substituted;
- a Git-backed ChangeSet workspace is pinned to one exact Repository Target/common Git repository and exact published tip; package-file Apply mutates only that worktree and journals exact prior/intended state, Commit stages only durable package paths and establishes an exact trailer-bound child commit; Publish first proves Git's effective origin fetch/push destinations still resolve to the registered repository identity after `insteadOf`/`pushInsteadOf`, then updates only the dedicated remote ChangeSet branch with exact lease/proof and advances `publishedTip` only after observed remote success, with `PublicationUncertain` preserving ambiguous side-effect truth; no Git-backed stage acquires legacy Path Ownership, and legacy Review/Finalize cannot silently fall back to the target main workspace;
- Current Change generation does not mutate the real Git index and stale current review blocks Finalize;
- publication failure preserves successful local work and Retry Push does not create an unrelated second logical ChangeSet;
- explicit Reopen is all-or-nothing with respect to lifecycle and reacquired ownership;
- Snapshot export is read-only and never substitutes a later ChatGPT destination;
- browser/bridge failure never rolls back, authorizes or finalizes repository work;
- deterministic bridge/protocol/task incompatibility stays pre-Send failure rather than `UnknownAfterSend`;
- once a possible Send boundary is crossed, cancellation/lease/retry handling never rewrites uncertainty into false clean cancellation or duplicate delivery.

## Manual boundary

Automated success does **not** establish real Swing responsiveness/layout, Windows notification appearance/click behavior, unpacked Edge extension lifecycle, live ChatGPT conversation discovery, actual attachment readiness, actual Send behavior or current ChatGPT DOM compatibility. Those operated checks and their PASS/FAIL/stale state belong only in [`MANUAL-ACCEPTANCE.md`](MANUAL-ACCEPTANCE.md).
