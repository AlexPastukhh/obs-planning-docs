# SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT — Provide Repository Context For Further Work

Status: selected target Scenario owner / destination-first snapshot handoff implementation present; live browser evidence still required
Application plan: [`../application-plan.md`](../application-plan.md)

## Scenario Identity

| Field | Value |
|---|---|
| Actor / context | User needs another work context, commonly ChatGPT, to understand a repository accurately. |
| Starting situation | External context does not have the required exact local/committed repository state. |
| Need / motivation | Produce portable exact repository context without changing repository work and make it available where further work will happen. |
| Goal / intent | Hand off trustworthy repository context with clear Local/Committed semantics. |
| Observable result | A valid Repository Snapshot exists; when ChatGPT handoff is chosen, that exact snapshot is delivered only to the selected conversation as either a ready unsent attachment or a guarded auto-sent message according to the frozen initial choice. |

## Main Flow

1. User selects the concrete Repository Target and Local or Committed representation.
2. In the same Repository Snapshot dialog, the user chooses `Export only`, `Export + Attach`, or `Export + Attach + Send`. Either automatic handoff requires one currently open ordinary ChatGPT conversation selected **before** export starts; the application freezes its `conversationKey` plus attach-only/auto-send intent together with the snapshot operation inputs. Snapshot selection never changes the ChangeSet Review-chat binding.
3. Application revalidates the exact Repository Target.
4. Both selected V1 modes require a committed baseline/ref; if the repository has no first commit, application reports actionable `Repository Not Ready` and creates no snapshot.
5. Application creates one stable Repository Snapshot ZIP outside the repository without mutating repository work/index.
6. `Export only` stops with the portable artifact and shows the result path / Copy path / Open folder controls. Local Snapshot is also the normal producer-source route when intentional manual/local changes must be given to ChatGPT for a later replacement package.
7. For either automatic handoff, only after ZIP creation succeeds does the application enqueue one External Interaction for that exact ZIP, frozen `conversationKey` and send intent; it never substitutes another currently selected/open conversation, never asks for a second destination choice after export and does not show the export-only path/copy modal. Existing inventory validation may reject a destination already known unavailable, but the flow does not require a special fresh-inventory handshake for tab closure. The fixed 10-minute Snapshot window bounds `Pending`/`Claimed`/`Preparing` as `Cancelled` or `PreparedUnsent`; before the first application-controlled auto-send click Java atomically enters `SendArmed` while the fixed deadline is still live; a definitive no-click before any possible click returns to that same absolute deadline, while an actual click advances to `SendClicked`, after which later guarded retries remain in ordinary send uncertainty without re-arming.
8. Extension runs the same generic exact-attachment module used by ReviewDiff. Attach-only terminates `Attached` without pressing Send. Attach+Send continues through the same generic clean-composer guard, Java `SendArmed` pre-click authorization, MAIN-world guarded click, `SendClicked` and `Sent` / `UnknownAfterSend` confirmation module used by ReviewDiff. The interaction appears in common External Interaction management/history for the current session.

## Branches / Extensions

- unstable Local capture → no mixed final ZIP is published;
- unsupported committed entry type → reject rather than flatten/misrepresent;
- clipboard failure → snapshot remains successful;
- browser/extension failure → snapshot remains successful and repository/ChangeSet state is unchanged;
- selected conversation disappears or becomes unreachable during/after export → snapshot remains successful and no other conversation is substituted; if ordinary inventory already knows it is unavailable, attach does not start, otherwise an already-queued interaction expires within the fixed confirmation window instead of waiting indefinitely;
- no eligible conversation when either automatic handoff is chosen → no export/handoff operation begins; `Export only` remains available;
- Cancel before attachment preparation → `Cancelled`;
- Cancel after attachment is already prepared but before possible Send → `Cancelled — prepared content retained`; no automatic removal and no further Send; after `SendArmed` or `SendClicked`, cancellation is refused because Send may already have happened;
- snapshot freshness for later package production is separate from snapshot creation: Apply still proves its own expected source state.

## Scenario DATA

- `DATA-RPKG-REPOSITORY-TARGET`
- `DATA-RPKG-REPOSITORY-SNAPSHOT`
- `DATA-RPKG-CHAT-CONVERSATION`
- `DATA-RPKG-EXTERNAL-INTERACTION`
- `DATA-RPKG-USER-OPERATION`
- `DATA-RPKG-OPERATION-RESULT`

## Behavior Items

- repository snapshot creation is read-only;
- Local and Committed representations are truthful/stable and require an existing commit baseline in selected V1 target behavior;
- output remains external to the target repository;
- exact created artifact is the handoff artifact;
- destination conversation is explicit and selected before either automatic handoff begins; its `conversationKey` plus attach-only/auto-send intent are frozen as operation input while title remains display-only;
- the External Interaction is created only after successful export and only for that frozen conversation; no late re-selection/substitution occurs, and no separate close-tab freshness handshake is required;
- snapshot destination selection is per operation and does not read/write Review-chat binding state;
- attach-only never presses Send; attach+Send reuses the same generic guarded Send/confirmation module as ReviewDiff;
- cancellation never auto-deletes a prepared attachment;
- handoff failure never changes snapshot success/ChangeSet lifecycle;
- successful/failed snapshot export and handoff operations feed the selected notification behavior when tracked.

## Requirements

Related shared requirements: `REQ-RPKG-07`, `REQ-RPKG-08`, `REQ-RPKG-10`, `REQ-RPKG-14`, `REQ-RPKG-15`, `REQ-RPKG-17`.

## Visual / Screen References

- [`SCR-RPKG-MAIN`](../screens.md#scr-rpkg-main--main-work-surface) for entry;
- [`SCR-RPKG-EXPORT-SNAPSHOT`](../screens.md#scr-rpkg-export-snapshot--repository-snapshot-export-dialog);
- [`SCR-RPKG-EXTERNAL-INTERACTIONS`](../screens.md#scr-rpkg-external-interactions--chatgpt-handoffs).

## Acceptance

- Local snapshot represents stable current repository files/diff without changing real index;
- Committed snapshot represents selected commit bytes independent of dirty working tree;
- repository without first commit produces Repository Not Ready rather than raw HEAD/ref failure for these modes;
- successful snapshot survives clipboard/browser failures;
- `Export only` produces the snapshot with no ChatGPT interaction;
- either automatic handoff visibly selects the intended conversation before export; `Export + Attach` leaves the exact snapshot ready only in that frozen conversation, while `Export + Attach + Send` uses the same generic guarded Send lifecycle as ReviewDiff;
- closing/unreaching the selected conversation never causes substitution or export failure; an unconfirmed queued interaction reaches bounded terminal truth instead of remaining Pending/Claimed/Preparing indefinitely;
- attach-only never sends; auto-send Snapshot reaches `SendArmed` before the guarded Send attempt and `SendClicked` only after an actual guarded Send click and then resolves as `Sent` or truthful `UnknownAfterSend`;
- Cancel after ready/prepared attachment leaves it in the composer and performs no cleanup/send.

## Boundary

Snapshot creation remains independently useful but stays inside this broader context Scenario. Export and ChatGPT attachment remain separate implementation Slices because they have separate checkable delivery results; this does not create separate user-world Scenarios.
