# Develop And Review Repository Work

Identity: `SCN-RPKG-DEVELOP-AND-REVIEW-REPOSITORY-WORK`. State: Selected / Planned through Move Work Orchestration To AI, after package construction is established.

## Actor and need

An AI agent working for a person needs to implement a repository task, review its actual changes and hand off an exact package when ready. It wants the application to handle package mechanics while the agent retains the semantic decisions and work narrative.

## Situation

The AI has access to the repository and GitHub. It creates or selects the exact Work Issue and semantic working branch and records the task's intent. The application consumes the supplied identities.

## Interactions

1. The AI records intent in the Work Issue and chooses the working branch using external repository/GitHub tools.
2. The AI produces the desired complete file contents and explicit delete intent.
3. The AI invokes [Build Replacement Package](../features/F-RPKG-BUILD-REPLACEMENT-PACKAGE.md) for the exact source and selected changes. The application returns an exact package or an explained failure.
4. After [Add Local Package Verification](../../evolution-steps/EVO-RPKG-ADD-LOCAL-PACKAGE-VERIFICATION.md), this interaction also returns the actual local resulting diff/proof for that same package and intended source.
5. The AI reviews the available exact artifacts. A second AI may contribute a review. The AI decides whether to revise or hand off.
6. The AI records useful iteration/review context in the Issue/comments. If revision is needed, it repeats the edit/build/review loop. When ready, it creates the exact request for [Realize Reviewed Repository Work](SCN-RPKG-REALIZE-REVIEWED-REPOSITORY-WORK.md).

## Desired outcome and alternatives

The actor has an exact package and enough review context to make its own handoff decision. A successful build or local verification does not automatically submit the package or establish semantic approval. A verification failure returns the technical outcome for revision. Optional [notifications](../features/F-RPKG-OPERATION-NOTIFICATIONS.md) can attract attention after background verification when that Step is available.

Issue authoring, semantic branch choice, edits, review findings and handoff readiness belong to the AI/human actor. The application derives package operations from supplied intent and never invents additional changes.

## Sources and planned state

[Move Work Orchestration To AI](../../evolution-steps/EVO-RPKG-MOVE-WORK-ORCHESTRATION-TO-AI.md), [Establish Replacement Package Construction](../../evolution-steps/EVO-RPKG-ESTABLISH-REPLACEMENT-PACKAGE-CONSTRUCTION.md), [Add Local Package Verification](../../evolution-steps/EVO-RPKG-ADD-LOCAL-PACKAGE-VERIFICATION.md). The orchestration and verification Steps share a package-construction predecessor; verification is included in this journey only when both applicable capabilities exist.
