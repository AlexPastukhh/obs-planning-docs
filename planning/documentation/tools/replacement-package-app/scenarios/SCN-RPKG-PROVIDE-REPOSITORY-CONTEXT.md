# SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT — Provide Repository Context For Further Work

Status: selected target Scenario owner / core export+attach exists, readiness/common interaction management pending
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
2. Application revalidates that exact target.
3. Both selected V1 modes require a committed baseline/ref; if the repository has no first commit, application reports actionable `Repository Not Ready` and creates no snapshot.
4. Application creates one stable Repository Snapshot ZIP outside the repository without mutating repository work/index.
5. User may stop with the portable artifact. Local Snapshot is also the normal producer-source route when intentional manual/local changes must be given to ChatGPT for a later replacement package.
6. When ChatGPT handoff is wanted, user selects one ordinary conversation and initiates one External Interaction for the exact snapshot.
7. Extension attaches the validated ZIP, waits for readiness and never presses Send.
8. Interaction appears in common External Interaction management/history for the current session.

## Branches / Extensions

- unstable Local capture → no mixed final ZIP is published;
- unsupported committed entry type → reject rather than flatten/misrepresent;
- clipboard failure → snapshot remains successful;
- browser/extension failure → snapshot remains successful and repository/ChangeSet state is unchanged;
- no eligible conversation → no attach interaction begins;
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
- destination conversation is explicit;
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
- selected snapshot appears ready in intended conversation;
- extension never sends snapshot message;
- Cancel after ready/prepared attachment leaves it in the composer and performs no cleanup/send.

## Boundary

Snapshot creation remains independently useful but stays inside this broader context Scenario. Export and ChatGPT attachment remain separate implementation Slices because they have separate checkable delivery results; this does not create separate user-world Scenarios.
