# SCN-RPKG-PROVIDE-CURRENT-CHANGE — Provide Current Change For Review / Continuation

Status: legacy current Scenario owner

## Application Benefit / Desired Result

Give one intended ordinary ChatGPT conversation the exact cumulative current change of one **legacy** logical ChangeSet without manual large-diff handling, while preserving truthful delivery state when browser automation fails or becomes uncertain.

This Scenario remains current only for the legacy Current Change/ReviewDiff workflow. Git-backed target-mode work is intentionally fail-closed from this authority until `EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC` is realized.

## Process Specification

### Scenario Process / Feature Interaction Map

```text
FI-RPKG-MATERIALIZE-LEGACY-CURRENT-CHANGE
├─ empty → NoChanges
└─ non-empty exact ReviewDiff
     ↓
   FI-RPKG-DELIVER-LEGACY-CURRENT-CHANGE
```

### FI-RPKG-MATERIALIZE-LEGACY-CURRENT-CHANGE — Materialize exact cumulative legacy change

Scenario Role / Local Purpose:
Produce the canonical cumulative ReviewDiff for one exact legacy ChangeSet without changing repository work.

Context / Preconditions:
The selected ChangeSet is legacy-compatible and has current owned repository work.

Required Inputs:
Exact Repository Target, exact ChangeSet and its current owned-path/baseline state.

Interaction Process:
The application derives the cumulative canonical ReviewDiff without mutating repository truth, persists its exact identity/freshness with the ChangeSet and exposes Refresh / Copy / Open / Send support. Git-backed work is rejected rather than projected through this legacy owner.

Outcomes:
- exact non-empty ReviewDiff;
- exact empty result (`NoChanges`);
- derivation unavailable/stale/failed without changing real index/worktree truth.

Result:
One exact cumulative legacy Current Change is available or a truthful no-change/failure result exists.

Outputs:
Persisted ReviewDiff bytes/fingerprint and freshness state.

Next Interactions:
Non-empty and delivery requested → `FI-RPKG-DELIVER-LEGACY-CURRENT-CHANGE`; otherwise terminal/support repeat.

Behavior Items:

#### BI-RPKG-LEGACY-CURRENT-CHANGE-CUMULATIVE — Represent cumulative logical change
Requirement:
Legacy Current Change must represent the exact cumulative change of the selected logical ChangeSet, not only the latest package delta.

Reason:
Legacy review/finalization semantics concern the whole logical ChangeSet, not merely the most recent package.

#### BI-RPKG-LEGACY-CURRENT-CHANGE-NONMUTATING — Derivation must not mutate repository truth
Requirement:
Generating Current Change must not modify the real Git index or repository work merely to compute a review artifact.

Reason:
A review projection must not change the repository state it is supposed to describe.

#### BI-RPKG-LEGACY-CURRENT-CHANGE-EXACT-WORK — Current Change is bound to exact work
Requirement:
The persisted ReviewDiff used for delivery/finalization must remain bound to the exact Repository Target and ChangeSet state from which it was derived.

Reason:
Delivery and legacy Finalize are unsafe if a ReviewDiff can drift to another target or later ChangeSet state.

### FI-RPKG-DELIVER-LEGACY-CURRENT-CHANGE — Deliver exact ReviewDiff

Scenario Role / Local Purpose:
Deliver the exact persisted Current Change to one intended conversation while keeping browser outcomes from authorizing repository mutation/finalization.

Context / Preconditions:
A non-empty exact persisted ReviewDiff exists for the selected legacy ChangeSet and a Review destination is resolved/bound.

Required Inputs:
Exact ReviewDiff source/fingerprint and exact conversation identity.

Interaction Process:
The application attempts delivery of the exact `.diff` to the frozen destination, distinguishes failure before a possible Send from uncertainty after Send may have occurred, and never blindly resends across that uncertainty boundary. Equivalent in-flight intent may be reused; retry after terminal outcome is a new interaction identity.

Outcomes:
- Sent;
- FailedBeforeSend / PreparedUnsent / Cancelled;
- `UnknownAfterSend`;
- destination unresolved/conflicted → no guessed delivery.

Result:
Exact Current Change is delivered or delivery truth remains explicit.

Outputs:
External Interaction state.

Next Interactions:
Terminal/support action.

Behavior Items:

#### BI-RPKG-LEGACY-CURRENT-CHANGE-EXACT-ARTIFACT — Attach exact persisted ReviewDiff
Requirement:
Delivery must use the exact persisted ReviewDiff source/fingerprint for the selected ChangeSet.

Reason:
The intended review must refer to the same persisted bytes the application derived for that ChangeSet.

#### BI-RPKG-LEGACY-CURRENT-CHANGE-FROZEN-DESTINATION — Delivery uses one exact intended conversation
Requirement:
Once a delivery task is prepared, later navigation/tab/UI changes must not silently retarget it.

Reason:
A later browser/navigation change must not redirect an already-authorized handoff to another conversation.

#### BI-RPKG-LEGACY-CURRENT-CHANGE-UNCERTAINTY-TRUTHFUL — Preserve possible-Send uncertainty
Requirement:
After Send may have occurred, lack of confirmation must remain explicit uncertainty and must not be rewritten as clean cancellation/failure or blindly resent.

Reason:
After a possible external Send side effect, false certainty could cause duplicate delivery or misleading recovery.

#### BI-RPKG-LEGACY-BROWSER-DOES-NOT-AUTHORIZE-REPOSITORY — Browser outcome is not repository authority
Requirement:
ChatGPT attachment/send success, failure or uncertainty must not itself authorize Apply, Finalize, Retry Push or any other repository mutation.

Reason:
External delivery state is independent from repository mutation and finalization authority.

## Referenced Evolution Step

This legacy Scenario is affected by the canonical [`EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC`](SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#evo-rpkg-downgrade-current-change-to-diagnostic) step owned by `SCN-RPKG-COMPLETE-REPOSITORY-WORK`.

Local impact when that step is realized:
- this standalone Scenario leaves the ordinary target workflow once no legacy ChangeSet requires its review/finalize authority;
- retained Current Change behavior becomes optional Git-derived diagnostic/support behavior under the planned [`SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK`](planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md).

This owner references the canonical Evolution Step identity and does not redefine its `Intent`, `Change` or Scenario-level behavioral delta.
