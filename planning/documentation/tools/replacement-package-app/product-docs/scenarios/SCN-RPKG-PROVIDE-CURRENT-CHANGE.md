# Provide Current Change For Review Or Continuation

Identity: `SCN-RPKG-PROVIDE-CURRENT-CHANGE`. State: retained legacy behavior in the previous deployed executable.

## Actor and need

A person continuing an existing legacy ChangeSet wants one ordinary ChatGPT conversation to receive the whole current logical change without manually assembling or transferring a large diff.

## Situation

The person selects one exact legacy ChangeSet and Repository Target. This route is unavailable for target Git-backed work. The current target executable does not expose legacy Current Change or chat controls.

## Interactions

1. The person requests Current Change through [Inspect Current Change](../features/F-RPKG-INSPECT-CURRENT-CHANGE.md).
2. The application derives and persists the cumulative ReviewDiff for that exact work state without modifying the repository. The person may refresh, copy or open it.
3. If there are changes and delivery is wanted, the person resolves one intended conversation and requests [Deliver Current Change](../features/F-RPKG-DELIVER-CURRENT-CHANGE.md).
4. The application freezes the artifact and conversation, prepares the exact attachment and attempts Send.
5. The person sees confirmed delivery, a clean pre-send failure/prepared-unsent result, or explicit uncertainty after a possible Send.

## Desired outcome and alternatives

The intended conversation receives the exact persisted cumulative change, or the person knows why delivery did not complete. NoChanges ends the route without sending an empty review artifact. An unresolved or conflicting destination is not guessed.

Once Send may have happened, the application preserves uncertainty and does not blindly resend. Cancelling or dismissing attention does not claim that a possible message was unsent. Delivery success does not authorize repository mutation or Finalize.

## Future diagnostic boundary

The old documents mention a later diagnostic-only Current Change transition, but no separate canonical Step for that transition exists in the current map. Git-backed diagnostic endpoints remain unresolved. This layer retains the legacy behavior and that limitation without adding a new planned capability.

## Sources

[Legacy Scenario](../../scenarios/SCN-RPKG-PROVIDE-CURRENT-CHANGE.md), [ChatGPT bridge](../../CHATGPT-BRIDGE.md), [external interactions](../../slices/SL-RPKG-08-manage-external-interactions.md).
