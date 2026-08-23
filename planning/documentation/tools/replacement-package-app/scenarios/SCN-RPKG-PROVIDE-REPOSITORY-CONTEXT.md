# SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT — Provide Repository Context For Further Work

Status: preliminary current Scenario owner
Application plan: [`../application-plan.md`](../application-plan.md)

## Scenario Identity

| Field | Value |
|---|---|
| Actor / context | User needs another work context, commonly ChatGPT, to understand a repository accurately. |
| Starting situation | External context does not have the required exact local/committed repository state. |
| Need / motivation | Produce a portable exact repository context without changing repository work and make it available where further work will happen. |
| Goal / intent | Hand off trustworthy repository context with clear Local/Committed semantics. |
| Observable result | A valid Repository Snapshot exists; when the user chooses ChatGPT handoff, that exact snapshot is a ready attachment in the selected conversation and remains unsent until the user sends it. |

## Main Flow

1. User selects the repository and the required Local or Committed representation.
2. Application creates a stable Repository Snapshot ZIP outside the repository.
3. User may stop with the portable artifact when that is sufficient.
4. When ChatGPT handoff is wanted, user selects an ordinary conversation.
5. Application/extension attaches the exact validated snapshot and waits for attachment readiness.
6. Extension stops without pressing Send.

## Branches / Extensions

- unstable Local capture → no mixed final ZIP is published;
- unsupported committed entry type → reject rather than flatten/misrepresent;
- clipboard failure → snapshot remains successful;
- browser/extension failure → snapshot remains successful and repository/ChangeSet state is unchanged;
- no eligible conversation → no attach operation occurs.

## Scenario DATA

- `DATA-RPKG-REPOSITORY-TARGET`
- `DATA-RPKG-REPOSITORY-SNAPSHOT`
- `DATA-RPKG-CHAT-CONVERSATION`
- `DATA-RPKG-DELIVERY-OUTCOME`
- `DATA-RPKG-OPERATION-RESULT`

## Behavior Items

- repository snapshot creation is read-only;
- Local and Committed representations are truthful and stable;
- output is external to target repository;
- exact created artifact is the handoff artifact;
- destination conversation is explicit;
- attach-only never presses Send;
- handoff failure never changes snapshot success or ChangeSet lifecycle.

## Requirements

Related shared requirements: `REQ-RPKG-07`, `REQ-RPKG-08`, `REQ-RPKG-10`.

## Visual / Screen References

- [`SCR-RPKG-MAIN`](../screens.md#scr-rpkg-main--main-work-surface) for entry;
- [`SCR-RPKG-EXPORT-SNAPSHOT`](../screens.md#scr-rpkg-export-snapshot--repository-snapshot-export-dialog);
- [`SCR-RPKG-ATTACH-SNAPSHOT`](../screens.md#scr-rpkg-attach-snapshot--snapshot-chat-destination).

## Acceptance

- Local snapshot represents stable current repository files/diff without changing real index;
- Committed snapshot represents selected commit bytes independent of dirty working tree;
- successful snapshot survives clipboard/browser failures;
- selected snapshot appears ready in the intended conversation;
- extension does not send the snapshot message.

## Boundary Question

Snapshot creation has an independently useful artifact result even without ChatGPT. Current plan keeps it inside this broader context Scenario while representing export and attach as separate implementation Slices. Promote snapshot-only behavior to a separate Scenario only if a distinct recurring Need/result warrants it.
