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

1. User establishes the logical work context through the normal ChangeSet selector/navigation.
2. Application establishes the exact current-change artifact for that ChangeSet.
3. Application establishes the intended ordinary ChatGPT conversation through the persisted Review-chat binding. The user may bind it manually; legacy `OBS-ACTION.chatTabTitle` may still resolve during Prepare; or an explicit invocation-scoped `OBS-ACTION.chatContextToken` may resolve asynchronously during Execute by asking live tab agents for the captured per-tab session record. Token resolution never blocks repository Apply; successful unique resolution is explicit bind/rebind authority and immediately persists the captured conversation even when another binding exists.
4. One semantic External Interaction is created for that exact source artifact + destination.
5. Browser handoff prepares the exact current-change payload only in the intended conversation and respects existing composer content.
6. Current-change delivery attempts Send only while that exact prepared payload remains associated with the same interaction/destination; external uncertainty stops further automatic sending.
7. Application records the observable External Interaction result without changing repository-work authority.
8. The interaction is visible/selectable through common External Interaction management.

## Branches / Extensions

- binding existing work manually does not implicitly send its already-current change;
- legacy title metadata never replaces an existing persisted binding without its explicit pre-Apply rebind authorization; `chatContextToken` is different because the originating explicit `Bind + ...` invocation is already bind/rebind authorization, so a unique token result immediately replaces a different existing binding without a second prompt;
- a token still unresolved/conflicted at successful Apply ReviewDiff cutoff does not fail Apply but prevents automatic delivery of that ReviewDiff; late successful resolution still binds/rebinds for future deliveries and does not retro-send the skipped ReviewDiff; repository Apply failure likewise does not cancel the token binding intent;
- missing/ambiguous normalized action-title match never guesses a destination; Prepare reports it in Output and manual binding remains available;
- one conversation open in duplicate browser tabs remains one conversation binding and existing duplicate-tab claim serialization decides which tab performs delivery;
- empty current change → no message / no-content result;
- existing unrelated composer content → fail before mixing/sending;
- duplicate tabs/claims remain implementation mechanics and must not duplicate one semantic interaction;
- claim loss before external preparation may retry safely;
- user Cancel before preparation → `Cancelled`, no further automation;
- user Cancel after external content was prepared but before Send certainty → `Cancelled — prepared content retained`; no automatic cleanup and no further Send/automation;
- if Send may already have occurred → preserve `Sent`/uncertain truth; cancellation cannot rewrite it;
- browser unavailable/failure leaves Apply/Current Change/Finalize authority unchanged;
- user-facing interaction projection shows active/actionable work plus uncertainty requiring attention rather than accumulated terminal history; only safety/recovery/idempotency-critical state persists across restart.

## Scenario DATA

- `DATA-RPKG-CHANGESET`
- `DATA-RPKG-CURRENT-CHANGE`
- `DATA-RPKG-CHAT-CONVERSATION`
- `DATA-RPKG-EXTERNAL-INTERACTION`
- `DATA-RPKG-OPERATION-RESULT`

## Behavior Items

- destination binding persists with ChangeSet continuation;
- manual binding, legacy prepared-title binding and resolved chatContextToken binding converge on the same persisted binding service and downstream delivery path;
- source artifact and destination are exact/stable for one interaction;
- implementation claim/lease/tab states do not become semantic interaction identity;
- exact current change, not stale/older artifact, is sent;
- cancellation stops future automation without deleting already-prepared external content;
- repeated Send-control attempts are allowed only while the same exact prepared payload remains in the same nonterminal interaction; uncertain post-Send outcome is not rewritten/retried blindly;
- downstream interaction result never changes repository-work lifecycle/Finalize authority.

## Requirements

Related shared requirements: `REQ-RPKG-04`, `REQ-RPKG-09`, `REQ-RPKG-10`, `REQ-RPKG-14`, `REQ-RPKG-15`, `REQ-RPKG-19`, `REQ-RPKG-20`, `REQ-RPKG-22`, `REQ-RPKG-24`, `REQ-RPKG-25`, `REQ-RPKG-26`, `REQ-RPKG-29`.

## Visual / Screen References

- [`SCR-RPKG-MAIN`](../screens.md#scr-rpkg-main--main-work-surface)
- [`SCR-RPKG-EXTERNAL-INTERACTIONS`](../screens.md#scr-rpkg-external-interactions--chatgpt-handoffs)
- [`SCR-RPKG-BRIDGE-OPTIONS`](../screens.md#scr-rpkg-bridge-options--companion-pairing--connection)
- ordinary ChatGPT composer is external.

## Acceptance

Automated state-machine tests alone are insufficient. Manual practical acceptance must establish:
- exact destination/payload for both small and large current changes, with no large-content browser freeze;
- manual Review-chat binding remains valid; empty matcher setting preserves literal behavior; configured ignored characters affect only action-assisted matching; unique action-title hint can establish a missing binding through the same path; zero/duplicate normalized matches require manual fallback; unique different existing binding requires pre-Apply keep/rebind/cancel confirmation and prepared-state staleness blocks before mutation;
- duplicate-tab/composer protection;
- interaction visible/selectable with user-semantic state;
- Cancel before preparation stops cleanly;
- Cancel after prepared content retains that content and performs no automatic cleanup/send;
- possible-send uncertainty cannot become false Cancelled/unsent truth;
- browser failure leaves repository work unaffected.
