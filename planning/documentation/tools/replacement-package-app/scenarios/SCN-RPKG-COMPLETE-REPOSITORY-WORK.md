# SCN-RPKG-COMPLETE-REPOSITORY-WORK — Complete Prepared Repository Work

Status: selected target Scenario owner / current implementation requires listed deltas
Application plan: [`../application-plan.md`](../application-plan.md)

## Scenario Identity

| Field | Value |
|---|---|
| Actor / context | User has prepared repository work (normally a replacement package) or an existing unfinished ChangeSet and one or more registered local Git repositories. |
| Starting situation | Intended work is not yet safely completed/published, existing work is Publication Pending, or the user explicitly needs to reopen previously Finalized logical work for safe continuation/recovery. |
| Need / motivation | Bring prepared work into the correct repository, understand its current state, and finish it without losing/capturing unrelated work. |
| Goal / intent | Complete one logical repository-work item safely and truthfully. |
| Observable result | Intended work is applied and either finalized/published or remains in a clear recoverable Publication Pending state; unrelated work is preserved. |

## Entry Points

- package ZIP and/or OBS-ACTION is available; input itself is passive;
- existing Active ChangeSet continuation;
- existing Publication Pending work requiring completion/recovery;
- explicitly selected Finalized history work that the user chooses to reopen;
- work may have been selected first through [`SCN-RPKG-FIND-EXISTING-WORK`](SCN-RPKG-FIND-EXISTING-WORK.md).

## Main Flow

1. User supplies/selects package/OBS-ACTION or opens existing work. Package input alone does not select/mutate a repository.
2. User explicitly invokes Apply when a package should be applied.
3. Application parses/validates package identity and resolves logical work + exact Repository Target:
   - `PACKAGE.json.changeSetId` is authoritative for logical-work identity. If that exact ID exists Active, only it may be continued; UI-selected/label/recent/other Active work cannot substitute. If that exact ID is Finalized, Apply blocks and requires explicit Reopen rather than using another ChangeSet or auto-reopening;
   - existing ChangeSet continuation → that exact ChangeSet's stored concrete target is authoritative; contradictory Repository Identity is rejected and the work is never silently re-homed;
   - new work → current matching target is kept; exactly one other matching registered target may be auto-selected; several matching clones require concrete user selection; no matching target blocks before mutation.
4. If Apply changes repository context automatically, the new repository remains current even if a later applicability check fails; the UI shows a small context-change result, not false Apply success.
5. Application revalidates the exact resolved target. When the requested operation requires committed baseline/HEAD/ref semantics and the repository has no first commit, it reports `Repository Not Ready — repository has no commits; create an initial commit and retry` without mutation.
6. Application checks all package/path/ownership/source-state applicability before target mutation:
   - ownership is `(concrete Repository Target, Relative Path)` scoped;
   - `add` requires path absence/adoptability;
   - `replace/delete` require expected source match: raw exact equality, or—when raw bytes differ—Git path-semantic equivalence of expected-base and actual content; different/unverifiable source blocks.
7. Only after the complete preflight passes, application mutates declared paths with bounded verified rollback and verifies resulting bytes.
8. Application establishes/continues one logical ChangeSet, persists ownership/current cumulative change and records the operation result.
9. User may inspect/refresh/copy/open Current Change when useful; these actions are not approval gates.
10. Later correction/continuation packages may continue the same ChangeSet using its current source state.
11. User chooses to finish work. Application revalidates current completion state, isolates only this logical work, commits/publishes it, and releases ownership only when truly Finalized.
12. If local commit succeeds but publication cannot complete, work remains one Publication Pending ChangeSet and Retry Push/recovery continues that same logical work without duplicate commit/work.
13. If previously Finalized work must be continued again, the user explicitly selects it from history and invokes `Reopen ChangeSet`; after exact-target and ownership/unowned-work safety checks, the same ChangeSet identity becomes Active again without erasing historical finalization evidence.

## Branches / Extensions

### Package not applicable
Wrong repository, ownership conflict, dirty/unowned/adoptability problem, changed/unverifiable expected source, Repository Not Ready or another precondition stops before mutation.

### Intentional manual/local changes
If the producer must work from intentional local/manual content not already in its source context, user exports a Local Snapshot and supplies that exact context to the producer. Apply still performs freshness/source-state proof because local files may change again after the snapshot.

### Repository location changed explicitly
`Change Repository Location` is a separate repository-management operation. Valid Git work tree + matching Repository Identity updates the existing Repository Target location while preserving Target ID and all ChangeSet associations. It is not implicit Apply recovery and does not bypass later operation-specific guards.


### Reopen previously Finalized work
`Show History` exposes Finalized ChangeSets for selection. When a Finalized ChangeSet is selected, an explicit `Reopen ChangeSet` action may return that same logical work to Active. Reopen is a recovery branch, not automatic continuation and not a new Scenario.

Before changing lifecycle/ownership the application:
- revalidates the exact stored Repository Target;
- checks the ChangeSet's historical paths against current unfinished ownership;
- blocks if any sibling unfinished ChangeSet currently owns a path that would be reacquired;
- blocks rather than silently adopting unrelated dirty/unowned content;
- preserves prior finalization/commit/history evidence.

On success the ChangeSet identity is unchanged, status becomes Active and safe historical path ownership is re-established for continuation. A later package still runs normal repository/path/source-state applicability; Reopen itself does not apply package content. On failure the ChangeSet remains Finalized, the operation publishes its normal failure notification/result/diagnostics, and no persistent ChangeSet error marker is attached to that Finalized history row.

### Current change became stale
Finalize stops; user re-establishes the current change before retrying.

### Publication remote advanced
Safe reconciliation/retry may continue when preservation is provable. Unsafe/ambiguous overlap leaves work pending rather than force-overwriting remote/local work.

### No net change
Logical work may finish without creating/pushing an unnecessary commit.

## Scenario DATA

- `DATA-RPKG-REPOSITORY-TARGET`
- `DATA-RPKG-REPOSITORY-IDENTITY`
- `DATA-RPKG-REPOSITORY-LOCATION`
- `DATA-RPKG-REPLACEMENT-PACKAGE`
- `DATA-RPKG-CHANGESET`
- `DATA-RPKG-APPLICABILITY`
- `DATA-RPKG-CURRENT-CHANGE`
- `DATA-RPKG-USER-OPERATION`
- `DATA-RPKG-OPERATION-RESULT`

## Behavior Items

- passive package/action input and Apply-time target resolution;
- existing ChangeSet concrete-target authority and no silent clone substitution/re-home;
- repository revalidation and Repository Not Ready handling;
- complete applicability before mutation;
- repository-scoped exclusive ownership;
- expected source-state proof without false Git-controlled representation mismatch;
- independent/dirty-unowned work preservation;
- current cumulative work exposed without approval gate;
- selected-work-only finalize/publication and truthful pending recovery;
- explicit safe Finalized→Active Reopen preserving logical identity/history and preventing ownership steal/adoption;
- concise semantic operation result + separate technical diagnostics;
- terminal tracked operation outcomes feed notifications/latest ChangeSet result where applicable.

## Requirements

Related shared requirements: `REQ-RPKG-01..06`, `REQ-RPKG-11`, `REQ-RPKG-12`, `REQ-RPKG-15..18` in [`../application-plan.md`](../application-plan.md).

## Visual / Screen References

Primary: [`SCR-RPKG-MAIN`](../screens.md#scr-rpkg-main--main-work-surface).

The user should not need SHA/commit-graph knowledge to understand Active, Publication Pending, Finalized, source-changed or Repository Not Ready outcomes.

## Acceptance

- package/action input remains passive until Apply;
- Apply resolves `PACKAGE.json.changeSetId` as the exact continuation identity, never substitutes UI-selected/label/recent work, and resolves/revalidates the exact target without guessing between clones;
- auto-selected target remains selected after later preflight failure;
- no-first-commit baseline-dependent path yields actionable Repository Not Ready rather than raw HEAD error;
- same-repository owned path conflict blocks; same relative path in another concrete repository does not;
- LF/CRLF/filter representation that Git considers equivalent does not false-fail expected source state;
- real source change or unverifiable equivalence blocks before mutation;
- current change can be inspected/restored without changing real index;
- Finalize captures only selected work;
- publication failure preserves logical work and retry does not create a second logical work item;
- Finalized releases ownership;
- selecting Finalized history does not mutate it; explicit Reopen is available only for selected Finalized work and succeeds only when exact target/path ownership/unowned-work checks allow safe reacquisition;
- successful Reopen preserves the same ChangeSet identity and historical finalization evidence while returning current lifecycle to Active;
- failed Reopen leaves the work Finalized, notifies/reports diagnostics, and creates no persistent Finalized error marker.
