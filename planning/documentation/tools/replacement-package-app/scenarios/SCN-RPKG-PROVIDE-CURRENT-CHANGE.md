# SCN-RPKG-PROVIDE-CURRENT-CHANGE — Provide Current Change For Review / Continuation

Status: active current Scenario owner

## User goal

Give one intended ordinary ChatGPT conversation the exact current cumulative change of one logical ChangeSet without manual large-diff handling, while preserving truthful state when delivery fails or becomes uncertain.

## Main flow

1. Establish one ChangeSet context using the normal Repository + ChangeSet selectors.
2. Resolve the latest persisted canonical Current Change/ReviewDiff for that exact ChangeSet.
3. Establish the intended Review chat through explicit manual binding, legacy unique `chatTabTitle` resolution during prepared Apply, or invocation-scoped `chatContextToken` resolution.
4. One External Interaction represents the exact ReviewDiff source + exact conversation destination.
5. The browser bridge validates protocol/task metadata and exact source fingerprint before composer mutation.
6. Every non-empty ReviewDiff is prepared as an exact task-specific `.diff` attachment; large rich-text insertion is not used.
7. For automatic Send, intended conversation and clean composer are guarded, exact attachment must be upload-ready, Java authorizes `SendArmed` before the first application-controlled browser click, an actual possible click establishes `SendClicked`, and later guarded attempts may continue only while the same prepared attachment remains. Confirmed delivery becomes `Sent`; genuine post-click ambiguity becomes `UnknownAfterSend` and stops blind resend.
8. Empty Current Change produces `NoChanges` and no ChatGPT message.

## Binding routes

Manual binding persists by ChangeSet and does not implicitly send already-current content.

Legacy `chatTabTitle` is fallback metadata only. Current ignored-character policy is applied during Prepare; zero/multiple matches never guess. A unique destination different from an existing binding requires explicit interactive keep/rebind/cancel authorization before repository mutation, and title-assisted bind/rebind occurs only after successful Apply.

`chatContextToken` is stronger because it comes from an explicit Bind invocation. Token presence suppresses legacy title matching. A unique result immediately binds/rebinds the captured conversation for the ChangeSet independently of repository Apply success/failure. If unresolved/conflicted at a successful Apply delivery cutoff, only that current automatic ReviewDiff delivery is skipped; late success affects future delivery and never retro-sends the skipped artifact.

## External Interaction behavior

The user-facing list is a current/actionable/attention projection rather than accumulated history.

- Pending/claimed/preparing/sending work is visible.
- Equivalent repeated intent while still actionable reuses the same interaction.
- Ordinary terminal Sent/Attached/NoChanges/FailedBeforeSend/PreparedUnsent/Cancelled rows leave the working list after result reporting.
- `UnknownAfterSend` remains immutable attention-visible until explicitly dismissed. Dismiss hides the working-list item without rewriting delivery truth.
- Retry after terminal outcome creates a new interaction identity.
- Cancel before possible Send stops future automation. If external content is already prepared, cancellation does not claim it was removed. Once Send may have occurred, cancellation cannot rewrite truth.

## Important rules

- browser handoff never changes repository Apply/Finalize authority;
- duplicate tabs for one conversation do not create duplicate semantic delivery;
- exact artifact bytes/fingerprint are rechecked before handoff;
- unrelated composer text blocks automatic mixing/sending;
- stale/invalid extension agents are fenced by runtime generation + agent instance;
- deterministic protocol/task mismatch is FailedBeforeSend, never post-Send uncertainty;
- after possible Send, current confirmation uses prepared-attachment departure plus a new post-baseline user turn; an exact queued-filename attachment surface is stronger optional evidence when ChatGPT exposes it.
