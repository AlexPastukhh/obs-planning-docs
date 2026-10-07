# Realize Reviewed Repository Work

Identity: `SCN-RPKG-REALIZE-REVIEWED-REPOSITORY-WORK`. State: Selected / Planned through Move Work Orchestration To AI. Extent, waiting and Finalize below depend on their own Steps.

## Actor and need

An AI agent or person has reviewed a concrete package and wants the application to realize it in the authoritative repository context. After review of the exact published result, they may also want to finalize that result now or later.

## Situation

The actor supplies exact repository, WorkId, branch and package identity. Semantic work history and branch choice belong to the actor after the AI-orchestration Step. Finalize additionally needs authority identifying the exact reviewed published result.

## Interactions

1. The actor submits the exact handoff. The application captures it without inferring another work, branch or package from current UI selection.
2. When Apply parameterization is available, the actor chooses the terminal extent and bounded package-wait policy for [Apply Replacement Package](../features/F-RPKG-APPLY-REPLACEMENT-PACKAGE.md). A timeout returns without package effects.
3. The application performs the requested realization and returns the proven stage results, rejection or unresolved uncertainty. The actor decides the next work/review action.
4. With independent Finalize available, the actor establishes review authority for one exact published result and invokes [Finalize Repository Work](../features/F-RPKG-FINALIZE-REPOSITORY-WORK.md), possibly in a later interaction.
5. With automatic Finalize available, the captured request may explicitly choose IMMEDIATE or DEFERRED. IMMEDIATE invokes the separate Finalize capability only when its exact eligibility is proven. DEFERRED returns control for later review/Finalize.
6. The actor consumes the exact result and may update Issue/comments using its external tools. With notifications available, a relevant background outcome also attracts attention to this work/operation.

## Desired outcome and alternatives

The requested package effects are established for the supplied context, and the actor knows what is proven. A completed commit remains completed if publication or Finalize later fails. Publication uncertainty is not presented as absence of a push. An ineligible automatic Finalize does not integrate unreviewed work and preserves any successful earlier stages.

Review of result A cannot authorize integration of a newer result B. A failed or uncertain Finalize preserves established effects for later reconciliation. Opening or sending an artifact in ChatGPT does not supply repository review authority by itself.

## Probable entry and unresolved choices

[Apply URI Entry](../../evolution-steps/EVO-RPKG-ADD-APPLY-URI-ENTRY.md) is an unselected candidate: equivalent URI and existing inputs would converge on one complete Apply request. Exact URI syntax is not promised here.

The repository integration mechanism and exact review-authority representation remain unresolved in the Finalization Step. This combined journey describes the planned horizon only when its applicable Steps are available; it does not assert that all their predecessors are realized.

## Sources

[AI orchestration](../../evolution-steps/EVO-RPKG-MOVE-WORK-ORCHESTRATION-TO-AI.md), [Apply parameterization](../../evolution-steps/EVO-RPKG-PARAMETERIZE-APPLY-HANDOFF.md), [independent Finalize](../../evolution-steps/EVO-RPKG-INTRODUCE-WORK-FINALIZATION.md), [automatic Finalize](../../evolution-steps/EVO-RPKG-ENABLE-AUTOMATIC-FINALIZATION.md), [notifications](../../evolution-steps/EVO-RPKG-ADD-OPERATION-NOTIFICATIONS.md).
