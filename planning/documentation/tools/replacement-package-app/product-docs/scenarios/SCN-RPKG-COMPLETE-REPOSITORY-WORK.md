# Complete Current Repository Work

Identity: `SCN-RPKG-COMPLETE-REPOSITORY-WORK`. State: current target executable, with labelled planned extensions.

## Actor and need

A person or automation has one exact Replacement Package for a repository task. They need the application to realize it in the right work context and tell them which effects are proven, rejected or uncertain.

## Situation

The actor supplies the package/archive, WorkId, Repository Target and explicit target branch. Automatic schema-1 execution also consumes the embedded Work Intent. The Main Work Window lets a person inspect these identities alongside the available actions.

## Interactions

1. The actor supplies an `OBS-ACTION/1 apply-package` handoff or uses the supported manual controls. The application captures the exact context before effects.
2. In automatic execution, the application uses [Prepare Current Work Context](../features/F-RPKG-PREPARE-CURRENT-WORK-CONTEXT.md) to establish the Work Intent and isolated workspace.
3. The application invokes [Apply Replacement Package](../features/F-RPKG-APPLY-REPLACEMENT-PACKAGE.md). Automatic execution applies the package, commits its exact result and publishes that commit to the Work Branch.
4. With manual controls, the person can separately start the workspace, apply the package, commit the applied result, publish or retry publication. Before each effect they can inspect the affected context.
5. The actor receives the result for the captured work/package. The operation/output area keeps that context visible and distinguishes proven success, rejection and uncertainty.

## Desired outcome and alternatives

Automatic success means exact publication is proven; only then is a successful `OBS-APPLY-RESULT/1` receipt available. Manual file-only Apply reports its own result and does not imply published completion.

Changed source, a conflicting package or an unexpected remote branch tip stops the affected operation. A lost publication confirmation remains uncertain even if a push may have happened. The actor can retry the exact request; the application preserves established effects and observes remote truth before another push.

Changing UI selection while the operation runs does not retarget it. The same WorkId, package bytes and destination remain in scope throughout the journey.

## Planned extensions

| Step | Additional actor interaction |
|---|---|
| [Parameterize Apply Handoff](../../evolution-steps/EVO-RPKG-PARAMETERIZE-APPLY-HANDOFF.md) | Choose where Apply stops and bound the wait for the exact package. |
| [Introduce Work Finalization](../../evolution-steps/EVO-RPKG-INTRODUCE-WORK-FINALIZATION.md) | Later request independent Finalize for an exact reviewed published result. |
| [Move Work Orchestration To AI](../../evolution-steps/EVO-RPKG-MOVE-WORK-ORCHESTRATION-TO-AI.md) | Split into [AI development/review](SCN-RPKG-DEVELOP-AND-REVIEW-REPOSITORY-WORK.md) and [reviewed realization](SCN-RPKG-REALIZE-REVIEWED-REPOSITORY-WORK.md); the AI supplies semantic work context. |
| [Enable Automatic Finalization](../../evolution-steps/EVO-RPKG-ENABLE-AUTOMATIC-FINALIZATION.md) | Explicitly choose immediate eligible Finalize or deferred independent Finalize. |
| [Add Operation Notifications](../../evolution-steps/EVO-RPKG-ADD-OPERATION-NOTIFICATIONS.md) | Receive an attention signal when a relevant background operation ends. |
| [Add Apply URI Entry](../../evolution-steps/EVO-RPKG-ADD-APPLY-URI-ENTRY.md) — Probable | Enter through a URI equivalent to the complete supported request. |

## Sources

[Current Scenario](../../scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md), [Main Work Window](../../screens.md), [consumer contract](../../PACKAGE-PROTOCOL.md), [result contract](../../APPLY-RESULT.md).
