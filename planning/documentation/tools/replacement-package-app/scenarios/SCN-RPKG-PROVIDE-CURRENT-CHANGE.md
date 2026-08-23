# SCN-RPKG-PROVIDE-CURRENT-CHANGE — Provide Current Change For Review / Continuation

Status: selected target Scenario owner / core delivery exists, common interaction management pending
Application plan: [`../application-plan.md`](../application-plan.md)

## Scenario Identity

| Field | Value |
|---|---|
| Actor / context | User is working on one logical ChangeSet and wants an intended ChatGPT conversation to review/continue from its exact current change. |
| Starting situation | Current repository work exists locally; manual exact large-diff handling is inconvenient/error-prone. |
| Need / motivation | Give the intended conversation the exact current change once without making browser handoff repository-work authority. |
| Goal / intent | Establish trustworthy review/continuation input in the selected conversation. |
| Observable result | The exact current change is delivered to the intended conversation, or a truthful failed/uncertain/no-content/cancelled outcome is retained without changing repository work. |

## Entry / Main Flow

1. User selects logical work directly or through the global Existing Work Scenario.
2. Application establishes the exact current-change artifact for that ChangeSet.
3. User selects/binds the intended ordinary ChatGPT conversation and initiates delivery when required.
4. One semantic External Interaction is created for that exact source artifact + destination.
5. Bridge/extension prepares the exact payload only in the intended conversation and respects existing composer content.
6. Current-change delivery sends only after preparation is ready; native ChatGPT large-paste behavior may convert the paste to an attachment.
7. Application records the observable External Interaction result without changing repository-work authority.
8. The interaction is visible/selectable through common External Interaction management.

## Branches / Extensions

- binding existing work does not implicitly send its already-current change;
- empty current change → no message / no-content result;
- existing unrelated composer content → fail before mixing/sending;
- duplicate tabs/claims remain implementation mechanics and must not duplicate one semantic interaction;
- claim loss before external preparation may retry safely;
- user Cancel before preparation → `Cancelled`, no further automation;
- user Cancel after text/attachment was prepared but before Send certainty → `Cancelled — prepared content retained`; no automatic cleanup and no further Send/automation;
- if Send may already have occurred → preserve `Sent`/uncertain truth; cancellation cannot rewrite it;
- browser unavailable/failure leaves Apply/Current Change/Finalize authority unchanged;
- interaction history shows active/actionable + terminal items for current app session; only safety/recovery/idempotency-critical state persists across restart.

## Scenario DATA

- `DATA-RPKG-CHANGESET`
- `DATA-RPKG-CURRENT-CHANGE`
- `DATA-RPKG-CHAT-CONVERSATION`
- `DATA-RPKG-EXTERNAL-INTERACTION`
- `DATA-RPKG-OPERATION-RESULT`

## Behavior Items

- destination binding persists with ChangeSet continuation;
- source artifact and destination are exact/stable for one interaction;
- implementation claim/lease/tab states do not become semantic interaction identity;
- exact current change, not stale/older artifact, is sent;
- cancellation stops future automation without deleting already-prepared external content;
- uncertain post-Send outcome is not rewritten/retried blindly;
- downstream interaction result never changes repository-work lifecycle/Finalize authority.

## Requirements

Related shared requirements: `REQ-RPKG-04`, `REQ-RPKG-09`, `REQ-RPKG-10`, `REQ-RPKG-14`, `REQ-RPKG-15`.

## Visual / Screen References

- [`SCR-RPKG-MAIN`](../screens.md#scr-rpkg-main--main-work-surface)
- [`SCR-RPKG-EXTERNAL-INTERACTIONS`](../screens.md#scr-rpkg-external-interactions--chatgpt-handoffs)
- [`SCR-RPKG-BRIDGE-OPTIONS`](../screens.md#scr-rpkg-bridge-options--companion-pairing--connection)
- ordinary ChatGPT composer is external.

## Acceptance

Automated state-machine tests alone are insufficient. Manual practical acceptance must establish:
- exact destination/payload and real small/native-large-paste behavior;
- duplicate-tab/composer protection;
- interaction visible/selectable with user-semantic state;
- Cancel before preparation stops cleanly;
- Cancel after prepared content retains that content and performs no automatic cleanup/send;
- possible-send uncertainty cannot become false Cancelled/unsent truth;
- browser failure leaves repository work unaffected.
