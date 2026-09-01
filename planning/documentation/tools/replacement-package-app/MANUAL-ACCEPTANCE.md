# Replacement Package App Manual Acceptance

Status: active current practical-evidence checklist
Scope: operated Windows/Swing/Microsoft Edge/ChatGPT proof that is not established by source/tests alone.

This file records current evidence only. Implementation existence or an unexecuted checklist item is not a PASS.

## Evidence states

Use `PENDING`, `PASS`, `FAIL`, or `STALE` for each executed environment campaign. Record date, Windows/JDK/Git/Edge versions when relevant, disposable repository fixtures and observable evidence.

## Shared preflight

- `run-tests.cmd` completes with `failed=0` before a live campaign.
- Swing app launches from source; installed Windows launcher also opens without requiring system Java at launch.
- Git is on PATH; Node is on PATH for DOM regression; Microsoft Edge Developer mode is available for bridge acceptance.
- Use disposable repositories with no valuable uncommitted work.

## `PA-SL01` — Apply Replacement Work

Verify legacy/manual Apply compatibility and `Apply Package (wait for ZIP)` remain responsive, resolve exact ChangeSet/Repository Target, reject wrong repository/ownership/dirty-unowned/source-changed/unverifiable/readiness cases before mutation, accept Git-equivalent path representation, perform exact add/replace/delete, and preserve truthful rollback/divergence behavior. For an OBS-ACTION with explicit `targetBranch`, verify one Apply Package invocation creates the missing Git-backed workspace without manual ID/label entry, uses that explicit branch rather than the Repository Target's current checkout, applies in the isolated worktree, commits and publishes to exact `Ready(C1)`, and a repeated command is already-satisfied. Force one retry campaign from `AppliedUncommitted` and one `PublicationUncertain` campaign to confirm the same command resumes the established state instead of reapplying/restarting. Verify an existing legacy ChangeSet is never silently reinterpreted when `targetBranch` is supplied. Verify wait-for-ZIP freezes click-time inputs, retries only package-not-found and enters the normal prepared Apply Package path once.

## `PA-SL02` — Inspect Current Change

Verify cumulative ReviewDiff includes owned tracked/untracked/deleted work without changing the real Git index; restart restores persisted current Review; Refresh remains scoped to its captured ChangeSet even if UI selection moves; Copy/Open use the latest persisted Review and are not Finalize gates.

## `PA-SL03` — Finalize And Publish Work

Verify owned-only staging/commit, stale Review blocking, successful Finalize ownership release, Publication Pending after push failure, Retry Push without duplicate logical work, no-net-change finalize, and guarded Finalized→Active Reopen preserving identity/history while refusing sibling ownership or unrelated dirty/unowned adoption.

## `PA-SL04` — Export Repository Snapshot

Verify Local and Committed ZIP shapes/bytes, no real-index mutation, output confinement, no-first-commit Repository Not Ready, unstable Local capture failure with no mixed ZIP, and `Export only` artifact/path behavior.

## `PA-SL05` — Attach Repository Snapshot To ChatGPT

With two ordinary conversations visible, verify destination is selected before export and stays frozen despite later UI changes. Attach-only must produce the exact ZIP in only that conversation and never Send. Attach+Send must use the same generic guarded Send lifecycle as ReviewDiff. Closing/unreaching the frozen destination must never substitute another conversation or invalidate successful snapshot creation; bounded Snapshot deadline truth must remain observable.

## `PA-SL06` — Deliver Current Change To ChatGPT

Verify bridge protocol 5 pairing, manual binding, legacy title matching/fallback, explicit `chatContextToken` direct bind/rebind including failed-Apply independence and late/no-retro-send race, duplicate-tab serialization, exact small and large `.diff` attachment delivery, non-foreground operation, clean-composer protection, configured guarded retry timing, extension reload/current-agent replacement, possible-Send truth and no blind resend after uncertainty.

## `PA-SL07` — Select Existing Work Context

Verify repository-scoped vs `All repositories` vs `Show history` projections, repository-first row identity, exact target+ChangeSet switching including same-origin clones, truthful unavailable-target rows and navigation-only selection.

## `PA-SL08` — Manage External Interactions

Verify current/actionable interaction projection, equivalent actionable dedupe, terminal-row removal, Cancel before/after preparation truth, immutable `UnknownAfterSend`, Dismiss removing only attention projection across restart, and new identity for terminal retry.

## `PA-SL09` — Notify Operation Outcomes

Verify meaningful terminal success/failure/action-required operations produce one concise Windows notification; click foregrounds/selects exact Repository Target when known without auto-selecting a ChangeSet or executing Apply/Finalize/Retry/Reopen/Send.

## Acceptance boundary

A Slice requiring live UI/browser/notification behavior is operationally accepted only while its relevant current evidence is PASS in the intended environment. Automated Java/Node tests do not substitute for that operated proof.
