# Replacement Package Workflow Scenario Catalog

Status: active Scenario navigation
Scope: Replacement Package Builder + Replacement Package App.

Scenario identity follows a real application/user result rather than controls, commands or implementation components.

## Current owners

| Module | Status | Scenario | Application result |
|---|---|---|---|
| App | CURRENT | [`SCN-RPKG-COMPLETE-REPOSITORY-WORK`](SCN-RPKG-COMPLETE-REPOSITORY-WORK.md) | Prepared/existing logical repository work is safely realized using current mixed legacy/Git-backed semantics and reaches the currently supported published/finalized or truthful recoverable boundary. |
| App | CURRENT | [`SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT`](SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md) | One exact portable repository context exists and may be delivered to one exact conversation without changing repository work. |
| App | LEGACY CURRENT | [`SCN-RPKG-PROVIDE-CURRENT-CHANGE`](SCN-RPKG-PROVIDE-CURRENT-CHANGE.md) | One exact cumulative legacy ChangeSet ReviewDiff is materialized/delivered with truthful browser uncertainty. |

Current Builder behavior remains owned by the repository-wide producer command/use-case/workflow until its planned Scenario is implemented and promoted.

## Planned future owners

| Module | Status | Scenario | Application result |
|---|---|---|---|
| Builder | PLANNED FUTURE | [`SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE`](SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE.md) | One exact repository work produces one exact replacement package whose exact reproduced result is semantically reviewed before ChatGPT renders the requested consumer handoff. |
| App | PLANNED FUTURE | [`SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK`](planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md) | The exact Builder-reviewed package is realized in the Builder-established repository work and stops at the handoff-selected boundary: applied-only, reviewed-published, or fully integrated/finalized with durable PR/Issue history. |

The two planned Scenarios are connected by the reviewed handoff boundary but keep separate behavior authority.

The Builder Scenario explicitly treats ChatGPT repository development as an external process between Builder interactions rather than inventing a Builder FI for work the Builder does not own.

Planned owners are selected target designs, not current implementation authority. Promotion requires implementation/proof reconciliation.

Shared work-context, Domain/Slice/shared implementation and proof capabilities are cataloged under this same canonical planning root rather than through a second Builder documentation tree.

## Connected planned boundary

Builder creates the repository-work Issue + exact source/work branch before ChatGPT development.

After semantic `APPROVABLE`, ChatGPT re-reads persisted `Handoff Intent` and renders one concrete App route. The App does not reinterpret free-text Handoff Intent and does not recreate a competing repository-work Issue/branch.

Builder planned Review History is written as immutable `## Review Record` Issue comments. App target Finalize writes the immutable `## Final Work Record` comment and then closes the Issue after finalization proof.
