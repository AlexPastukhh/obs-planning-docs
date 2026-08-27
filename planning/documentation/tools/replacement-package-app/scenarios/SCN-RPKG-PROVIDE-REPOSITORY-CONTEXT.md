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
| Observable result | A valid Repository Snapshot exists; when ChatGPT handoff is chosen, that exact snapshot is a ready attachment in the selected conversation and remains unsent until the user sends it. |

## Main Flow

1. User selects the concrete Repository Target and Local or Committed representation.
2. In the same Repository Snapshot dialog, the user chooses either `Export only` or `Export + Attach`. For `Export + Attach`, one currently open ordinary ChatGPT conversation is selected **before** export starts; the application freezes its `conversationKey` together with the snapshot operation inputs. Snapshot selection never changes the ChangeSet Review-chat binding.
3. Application revalidates the exact Repository Target.
4. Both selected V1 modes require a committed baseline/ref; if the repository has no first commit, application reports actionable `Repository Not Ready` and creates no snapshot.
5. Application creates one stable Repository Snapshot ZIP outside the repository without mutating repository work/index.
6. `Export only` stops with the portable artifact. Local Snapshot is also the normal producer-source route when intentional manual/local changes must be given to ChatGPT for a later replacement package.
7. For `Export + Attach`, only after ZIP creation succeeds does the application enqueue one External Interaction for that exact ZIP and frozen `conversationKey`; it never substitutes another currently selected/open conversation and never asks for a second destination choice after export. Existing inventory validation may reject a destination already known unavailable, but the flow does not require a special fresh-inventory handshake for tab closure. Any queued Snapshot interaction must confirm `Attached` within the fixed 10-minute task window or terminate truthfully (`Cancelled` before confirmed preparation, `PreparedUnsent` after preparation began).
8. Extension attaches the validated ZIP, waits for readiness and never presses Send. The interaction appears in common External Interaction management/history for the current session.

## Branches / Extensions

- unstable Local capture → no mixed final ZIP is published;
- unsupported committed entry type → reject rather than flatten/misrepresent;
- clipboard failure → snapshot remains successful;
- browser/extension failure → snapshot remains successful and repository/ChangeSet state is unchanged;
- selected conversation disappears or becomes unreachable during/after export → snapshot remains successful and no other conversation is substituted; if ordinary inventory already knows it is unavailable, attach does not start, otherwise an already-queued interaction expires within the fixed confirmation window instead of waiting indefinitely;
- no eligible conversation when `Export + Attach` is chosen → no export/attach operation begins; `Export only` remains available;
- Cancel before attachment preparation → `Cancelled`;
- Cancel after attachment is already prepared → `Cancelled — prepared content retained`; no automatic removal and no Send;
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
- destination conversation is explicit and selected before `Export + Attach` begins; its `conversationKey` is frozen as operation input while title remains display-only;
- the External Interaction is created only after successful export and only for that frozen conversation; no late re-selection/substitution occurs, and no separate close-tab freshness handshake is required;
- snapshot destination selection is per operation and does not read/write Review-chat binding state;
- attach-only never presses Send;
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
- `Export + Attach` visibly selects the intended conversation before export and the resulting exact snapshot appears ready only in that frozen conversation;
- closing/unreaching the selected conversation never causes substitution or export failure; an unconfirmed queued interaction reaches bounded terminal truth instead of remaining Pending/Claimed/Preparing indefinitely;
- extension never sends snapshot message;
- Cancel after ready/prepared attachment leaves it in the composer and performs no cleanup/send.

## Boundary

Snapshot creation remains independently useful but stays inside this broader context Scenario. Export and ChatGPT attachment remain separate implementation Slices because they have separate checkable delivery results; this does not create separate user-world Scenarios.
