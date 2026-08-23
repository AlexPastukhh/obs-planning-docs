# SCN-RPKG-PROVIDE-CURRENT-CHANGE — Provide Current Change For Review / Continuation

Status: preliminary current Scenario owner
Application plan: [`../application-plan.md`](../application-plan.md)

## Scenario Identity

| Field | Value |
|---|---|
| Actor / context | User is working on one logical ChangeSet and wants the intended ChatGPT conversation to review/continue from its exact current change. |
| Starting situation | Current repository work exists locally; manual copy/paste of the exact change is inconvenient or error-prone. |
| Need / motivation | Give the intended conversation the current change exactly once without making browser handoff repository-work authority. |
| Goal / intent | Establish trustworthy review/continuation input in the selected conversation. |
| Observable result | The exact current change is delivered to the intended conversation, or a truthful failed/uncertain/no-content outcome is recorded without changing repository work. |

## Main Flow

1. User selects the logical work and intended ordinary ChatGPT conversation/binding.
2. Application establishes the exact current change artifact for that ChangeSet.
3. Delivery task targets that conversation and exact artifact.
4. One eligible tab prepares the composer only when it is safe to do so.
5. Small content remains text; when ChatGPT itself converts a large paste into an attachment, delivery waits for readiness.
6. Send occurs only after preparation is complete.
7. Application records the observable delivery outcome.

## Branches / Extensions

- binding existing work does not implicitly send its already-current change;
- empty current change → no message;
- existing unrelated composer content → fail before mixing/sending;
- duplicate tabs → one task is serialized to one eligible tab at a time;
- claim lost before composer mutation → safe retry may occur;
- preparation completed but send guard fails → terminal prepared-unsent state, no blind retry;
- outcome uncertain after Send → terminal uncertain state, no automatic resend;
- browser unavailable → repository Apply/Review/Finalize remain usable.

## Scenario DATA

- `DATA-RPKG-CHANGESET`
- `DATA-RPKG-CURRENT-CHANGE`
- `DATA-RPKG-CHAT-CONVERSATION`
- `DATA-RPKG-DELIVERY-OUTCOME`

## Behavior Items

- destination binding persists with logical ChangeSet continuation;
- artifact/destination are verified before composer mutation;
- duplicate tabs do not duplicate one delivery;
- downstream failure never changes repository-work lifecycle or Finalize authority;
- exact current change, not stale/older artifact, is sent;
- uncertain post-send outcome is not automatically retried.

## Requirements

Related shared requirements: `REQ-RPKG-04`, `REQ-RPKG-09`, `REQ-RPKG-10`.

## Visual / Screen References

- [`SCR-RPKG-MAIN`](../screens.md#scr-rpkg-main--main-work-surface)
- [`SCR-RPKG-BRIDGE-OPTIONS`](../screens.md#scr-rpkg-bridge-options--companion-pairing--connection)
- ordinary ChatGPT composer is external.

## Acceptance

Automated state-machine tests are not sufficient for the user-visible result. Manual practical acceptance must establish:
- exact destination and payload;
- small and native-large-paste behavior;
- duplicate-tab serialization;
- protection of existing composer content;
- no blind duplicate send after uncertainty;
- bridge failure leaves repository work unaffected.

## Attached Q/R/P

`P-RPKG-BROWSER-ACCEPTANCE` in [`../application-plan.md`](../application-plan.md).
