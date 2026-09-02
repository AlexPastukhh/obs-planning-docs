# SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK — Complete Reviewed Repository Work

Status: planned future Scenario owner
Current authoritative behavior remains in `../SCN-RPKG-COMPLETE-REPOSITORY-WORK.md` until implementation migration makes this target current.
This planned owner must not be used as evidence that reviewed-result confirmation, PR readiness or target Finalize are implemented.

## Application Benefit / Desired Result

Realize an exact already-reviewed package in the real repository ChangeSet, preserve durable work identity and truthful recovery state, prove that the authoritative published revision is exactly the reviewed predicted result, maintain the correct integration Pull Request, and integrate only that approved result into the target branch.

The Scenario must not require the user to execute internal Git actions manually in the ordinary path.

## Process Specification

### Scenario Process / Feature Interaction Map

```text
reviewed Builder handoff
↓
FI-RPKG-ESTABLISH-REPOSITORY-WORK-INTENT
↓
FI-RPKG-REALIZE-REVIEWED-PACKAGE
↓
FI-RPKG-CONFIRM-REVIEWED-PUBLISHED-REVISION
↓
FI-RPKG-ENSURE-INTEGRATION-PULL-REQUEST
↓
FI-RPKG-FINALIZE-REVIEWED-WORK
├─ Finalized
└─ integration requires changed ChangeSet result
      ↓
   reviewed approval becomes stale
      ↓
   return to Builder correction/review flow
```

Optional diagnostic interaction:

```text
Inspect Current Change
```

It is not part of the ordinary semantic approval path.

## Command composition routes

Command composition is orthogonal to Scenario/FI decomposition.

```text
Feature Interaction
= semantic behavioral unit inside the Scenario

Command / button
= one user entry that may invoke part of one FI,
  resume one FI, or compose several FIs
```

The same Scenario behavior must remain authoritative regardless of which command route is used.

### Route A — ordinary composed command

The ordinary user can provide the reviewed package handoff once and invoke one top-level command:

```text
Apply Package
↓
ensure FI-RPKG-ESTABLISH-REPOSITORY-WORK-INTENT
↓
enter / resume FI-RPKG-REALIZE-REVIEWED-PACKAGE
   ensure ChangeSet workspace when absent
   → Apply
   → Commit
   → Publish
↓
FI-RPKG-CONFIRM-REVIEWED-PUBLISHED-REVISION
↓
FI-RPKG-ENSURE-INTEGRATION-PULL-REQUEST
↓
Ready for Finalize
```

The composed command does not create a second implementation of these behaviors. It invokes the same underlying semantic/domain actions and resumes from the persisted ChangeSet state.

Retry of the same top-level command is state-dispatch, not restart:

```text
Work Intent missing
→ ensure Work Intent

workspace missing
→ ensure workspace

Ready(C1)
→ Apply

AppliedUncommitted(P2)
→ Commit

CommittedUnpublished(P2,C2)
→ Publish

PublicationUncertain(P2,C2)
→ reconcile Publish

Ready(C2), review-result identity not yet proven
→ Confirm Reviewed Published Revision

reviewed C2 proven, PR missing/stale
→ Ensure Integration Pull Request

all above satisfied
→ Ready for Finalize
```

### Route B — full composed completion

Because semantic review already happened before real Apply, the Scenario also supports an explicit one-command composition that continues through Finalize when every exact precondition remains satisfied.

The selected command name in this target model is:

```text
Apply & Finalize
```

Conceptually:

```text
Apply & Finalize
↓
FI-RPKG-ESTABLISH-REPOSITORY-WORK-INTENT
↓
FI-RPKG-REALIZE-REVIEWED-PACKAGE
↓
FI-RPKG-CONFIRM-REVIEWED-PUBLISHED-REVISION
↓
FI-RPKG-ENSURE-INTEGRATION-PULL-REQUEST
↓
FI-RPKG-FINALIZE-REVIEWED-WORK
↓
Finalized
```

This is a fixed composition over the same FI behavior, not a second workflow engine or alternate semantic implementation.

If an earlier FI stops in a recoverable/blocked state, retry of the same `Apply & Finalize` command resumes from persisted Scenario truth. Finalize is attempted only after all prior exact preconditions are satisfied.

If Finalize cannot preserve the reviewed result, the composed command stops with the same truthful blocked/stale behavior defined by `FI-RPKG-FINALIZE-REVIEWED-WORK`; it must not silently manufacture a different integrated result.

### Route C — modular / advanced commands

The same Scenario may be progressed through independently callable commands when diagnostics, recovery, migration testing or explicit advanced control make that useful.

Candidate modular surfaces:

```text
Create / Update Work Intent
Start Workspace
Apply Only
Commit Applied
Publish
Commit & Publish
Abort Applied Package
Verify Reviewed Result
Ensure Pull Request
Finalize
```

These commands enter or resume the same FI processes and must preserve the same state transitions, identity checks and Behavior Items as the ordinary composed route.

For example, these are two command routes through the same FI:

```text
Route A:
Apply Package
→ ensure workspace
→ Apply
→ Commit
→ Publish

Route B:
Start Workspace
→ Apply Only
→ Commit Applied
→ Publish
```

Both must establish the same local result:

```text
exact reviewed package P2
is authoritatively published as C2
```

`Commit & Publish` or similar convenience commands are fixed compositions over the same actions. They do not create separate Feature Interactions or separate business semantics.

### Route-selection rule

The Scenario supports all three routes over the same state/behavior authority:

```text
A. Ordinary route
   Apply Package
   → through reviewed-result verification + PR
   → Ready for Finalize
   → explicit Finalize

B. Full composed route
   Apply & Finalize
   → through reviewed-result verification + PR
   → Finalize in the same authorized command
   → Finalized

C. Modular / advanced route
   → explicit individual/resume actions
```

`Apply Package` is the ordinary/default application route and deliberately stops at `Ready for Finalize`.

`Apply & Finalize` is the explicit one-command end-to-end route. It is a fixed composition over the same Feature Interactions and domain actions; it does not introduce different repository semantics.

`Finalize` remains independently callable for the ordinary route and for recovery/advanced control.

## Cross-FI Behavior Items — command composition

#### BI-RPKG-COMPOSED-AND-MODULAR-ROUTES-SHARE-SEMANTICS
Requirement:
Composed and modular command routes must invoke the same authoritative behavior, state transitions, identity checks and recovery rules rather than implementing separate meanings for the same repository work.

Reason:
Command convenience must not change correctness or produce route-dependent repository semantics.

#### BI-RPKG-COMMANDS-DO-NOT-DEFINE-FI-BOUNDARIES
Requirement:
The existence of a separately invokable command must not by itself create a separate Feature Interaction, and one composed command may cross several Feature Interaction boundaries.

Reason:
Feature Interactions decompose Scenario behavior; commands are interaction/orchestration entries.

#### BI-RPKG-COMPOSED-RETRY-RESUMES-ACROSS-FIS
Requirement:
Retrying the ordinary composed command must continue from the latest proven persisted Scenario state, including unsatisfied later FIs, rather than restarting already-established earlier behavior.

Reason:
A partial failure in Publish, reviewed-result verification or PR creation must not require the user to reconstruct the Scenario manually.

#### BI-RPKG-APPLY-PACKAGE-STOPS-BEFORE-FINALIZE
Requirement:
The ordinary `Apply Package` route must stop at `Ready for Finalize` after reviewed-result verification and PR readiness; it must not implicitly integrate the ChangeSet into the target branch.

Reason:
Applying/publishing reviewed work and integrating/finalizing it remain distinct user-authorized completion boundaries.

#### BI-RPKG-APPLY-AND-FINALIZE-USES-SAME-PRECONDITIONS
Requirement:
`Apply & Finalize` may provide one-command end-to-end completion, but it must satisfy the same reviewed-result, PR and Finalize preconditions as the separate `Apply Package` + `Finalize` route.

Reason:
Convenience composition must not weaken correctness or authorization boundaries.

---

## FI-RPKG-ESTABLISH-REPOSITORY-WORK-INTENT

### Scenario Role / Local Purpose

Ensure one durable semantic repository-work identity exists independently of transient Builder/Chat invocation state.

### Interaction Process

```text
reviewed handoff
+
repository identity
+
changeSetId
+
work intent:
  Title
  Goal
  Why
  Acceptance
↓
resolve exact Repository Target
↓
ensure one exact managed GitHub Issue
↓
persist/adopt exact Issue identity for ChangeSet
```

This may also be independently invokable, but ordinary Apply can ensure it automatically.

### Local Result

One durable Work Intent / Issue exists for the exact logical ChangeSet.

### Behavior Items — selected

This planned FI preserves the current Work Intent requirements without redefining them. Canonical definitions remain in the current Scenario owner:

- [`BI-RPKG-WORK-INTENT-ONE-EXACT-ISSUE`](../SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#bi-rpkg-work-intent-one-exact-issue--one-exact-managed-issue)
- [`BI-RPKG-WORK-INTENT-DURABLE`](../SCN-RPKG-COMPLETE-REPOSITORY-WORK.md#bi-rpkg-work-intent-durable--work-intent-survives-interruption)

## FI-RPKG-REALIZE-REVIEWED-PACKAGE

### Scenario Role / Local Purpose

Progress one exact reviewed package from its exact expected source to one authoritative published ChangeSet revision, or leave the work in an exact truthful recoverable/uncertain state.

### Interaction Process

This FI-local process may be entered by the ordinary composed `Apply Package` route or by modular/advanced commands. The FI semantics are the same in either route.

```text
exact reviewed package P2
+
expected source C1
+
ChangeSet X
+
targetBranch
↓
resolve/prove exact Repository Target
↓
ensure isolated ChangeSet workspace when absent
↓
prove current published/workspace source == C1
↓
Apply exact P2
↓
Commit exact applied result as C2
↓
Publish exact C2
↓
Ready(C2)
```

For a new ChangeSet:

```text
targetBranch @ C0
↓
create/reconcile branch + isolated worktree
↓
baseCommit=C0
publishedTip=C0
↓
P1
↓
C1
```

For a later package:

```text
Ready(C1)
+
P2 expectedSource=C1
↓
C2
```

The internal execution/recovery states remain meaningful:

```text
Ready(C1)
↓ Apply
AppliedUncommitted(P2)
↓ Commit
CommittedUnpublished(P2,C2)
↓ Publish
Ready(C2)
```

If publication outcome cannot be determined:

```text
PublicationUncertain(P2,C2)
↓
reconcile exact remote state before another push/package
```

The same top-level `Apply Package` operation is the ordinary retry/resume entry across this FI and, once publication is satisfied, may continue into the later verification/PR FIs described by the Scenario command-composition route.

Modular Start Workspace / Apply Only / Commit / Publish / Commit & Publish / Abort controls are alternative advanced/recovery entries into the same process. They are not separate Scenarios or automatically separate FIs.

### Outcomes

- exact package published and proven `Ready(C2)`;
- recoverable `AppliedUncommitted`;
- recoverable `CommittedUnpublished`;
- recoverable/blocked `PublicationUncertain`;
- fail-closed source/head/identity/divergence result.

### Local Result

An authoritative published revision exists for the exact reviewed package, or the ChangeSet retains truthful exact execution state from which safe recovery can continue.

### Behavior Items — selected

#### BI-RPKG-APPLY-EXACT-REPOSITORY-TARGET
Requirement:
Repository identity/target resolution must not silently substitute a different clone/target.

Reason:
The reviewed package/result is meaningful only for the exact repository work context selected for the ChangeSet.

#### BI-RPKG-APPLY-EXACT-PACKAGE
Requirement:
The consumer must apply the exact reviewed package identity received in the handoff.

Reason:
Consumer verification must correspond to the same artifact that the Builder reviewed, not an equivalent reconstruction.

#### BI-RPKG-APPLY-EXACT-EXPECTED-SOURCE
Requirement:
Real Apply must prove the package is being applied to the exact expected source state before mutation.

Reason:
Applying to a different source would produce a result that was never replayed/reviewed.

#### BI-RPKG-ORDINARY-APPLY-COMPOSES-INTERNAL-ACTIONS
Requirement:
Ordinary user behavior may use one top-level Apply operation that ensures/resumes the required workspace, Apply, Commit and Publish actions from persisted execution truth and then continues to later unsatisfied composed Scenario behavior according to the command route.

Reason:
The ordinary UX should not require manual sequencing of recoverable internal actions merely because those actions remain independently callable.

#### BI-RPKG-RETRY-RESUMES
Requirement:
Retry must resume/prove the same logical operation from the established state rather than restarting unrelated work.

Reason:
Repository, GitHub and publication operations cross durable side-effect boundaries that cannot be safely repeated blindly.

#### BI-RPKG-PARTIAL-STATE-TRUTHFUL
Requirement:
Partial execution and uncertain publication must remain durably distinguishable and recoverable without guessing whether side effects occurred.

Reason:
Later recovery and verification depend on knowing exactly which durable side effects are already established.

#### BI-RPKG-NO-NEXT-PACKAGE-WHILE-PUBLICATION-UNCERTAIN
Requirement:
A new package must not progress while the current publication outcome is unresolved.

---

Reason:
The expected source for the next package cannot be known until the previous publication outcome is reconciled.

## FI-RPKG-CONFIRM-REVIEWED-PUBLISHED-REVISION

### Scenario Role / Local Purpose

Prove that the real authoritative published ChangeSet revision is exactly the result already semantically approved by the Builder.

This replaces the old ordinary post-publish semantic review step.

### Interaction Process

Builder review identity:

```text
ChangeSet X
package P2
expected source C1
reviewed predicted result T2
verdict APPROVABLE
```

Actual consumer result:

```text
published commit C2
```

Consumer proves the relevant identities, including:

```text
C2 belongs to ChangeSet X
C2 realizes package P2
source/parent relationship is consistent with expected C1
tree(C2) == T2
```

The strongest result proof is Git resulting-tree equality:

```text
actual published tree
==
reviewed predicted tree
```

Textual latest/cumulative diffs may be regenerated for diagnostics, but diff rendering equality is not the primary identity proof.

If proof succeeds:

```text
approval(P2, C1, T2)
↓
may be attributed/bound to actual published C2
```

If proof fails:

```text
DO NOT bind approval
DO NOT Finalize
preserve the actual published ChangeSet revision as evidence
mark the work blocked for explicit investigation/correction
fail closed
```

The App does not automatically rollback/revert the published ChangeSet branch. The divergent revision has not yet been integrated into the target branch; preserving it gives an exact investigation source and avoids creating another unreviewed mutation as an automatic recovery side effect.

### Local Result

The actual published commit is either proven to be the exact reviewed result, or it remains unapproved and blocked from Finalize.

### Behavior Items — selected

#### BI-RPKG-PUBLISHED-TREE-EQUALS-REVIEWED-TREE
Requirement:
Approval may be attributed to a published commit only after proving its Git tree equals the exact reviewed predicted result tree.

Reason:
This equality is the identity proof that binds pre-Apply semantic approval to the consumer’s real published result.

#### BI-RPKG-VERIFY-EXECUTION-IDENTITY
Requirement:
Result-tree equality alone must not allow approval to be attached to an unrelated ChangeSet/package/source context.

Reason:
Tree equality is useful only when it is attached to the intended ChangeSet/package/source execution rather than an unrelated matching tree.

#### BI-RPKG-NO-SECOND-SEMANTIC-REVIEW-WHEN-IDENTITY-PROVEN
Requirement:
When the consumer proves the published revision is the exact reviewed result, ordinary workflow does not require a redundant second semantic review.

Reason:
Re-reviewing identical content would duplicate semantic work without adding evidence once exact result identity is proven.

#### BI-RPKG-VERIFY-FAILS-CLOSED
Requirement:
If exact reviewed-result identity cannot be proven, the published revision must not become approved merely because it appears similar.

Reason:
An unproven or ambiguous published result cannot safely inherit the Builder’s approval.

#### BI-RPKG-VERIFY-MISMATCH-PRESERVES-EVIDENCE
Requirement:
A published revision that fails reviewed-result identity proof must remain preserved as exact ChangeSet evidence and must not be automatically reverted/rewritten by the verification step.

Reason:
The target branch is still protected by Finalize, while preserving the divergent ChangeSet revision keeps the failure diagnosable and avoids introducing another unreviewed automatic mutation.

### Review-decision semantic change

Old primary model:

```text
publish C2
→ semantic review C2
→ register NEEDS_CORRECTION / APPROVABLE
```

Target ordinary model:

```text
Builder semantic review before Apply
→ APPROVABLE exact package/result
→ publish C2
→ consumer identity proof
→ bind that existing approval to C2
```

Therefore the consumer's ordinary role is confirmation/binding of an existing exact semantic approval, not generation of a new semantic verdict.

Exact persisted ReviewDecision/approval schema remains to be designed.

---

## FI-RPKG-ENSURE-INTEGRATION-PULL-REQUEST

### Scenario Role / Local Purpose

Ensure the ChangeSet has one correct GitHub integration surface for its currently published reviewed revision.

### Interaction Process

```text
published ChangeSet branch @ C2
+
targetBranch
↓
find exact source/target PR
├─ one correct PR exists
│    → satisfied / verify current head
└─ no correct PR
     → create PR
↓
PR represents ChangeSet branch → intended target
```

PR creation failure does not invalidate an already successfully published package result. It is retryable independently.

### Local Result

One correct Pull Request exists for the ChangeSet and intended target branch.

### Behavior Items — selected

#### BI-RPKG-ONE-CORRECT-PR
Requirement:
The ChangeSet must resolve to one correct PR for its exact source branch and intended target branch.

Reason:
Integration state must represent one unambiguous current ChangeSet result rather than parallel or stale PR candidates.

#### BI-RPKG-PR-FAILURE-DOES-NOT-ROLL-BACK-PUBLISHED-REVISION
Requirement:
Failure to ensure the PR must not falsely erase or roll back already proven published repository work.

Reason:
The published ChangeSet revision remains real repository truth even when creating/updating the integration PR fails.

#### BI-RPKG-PR-HEAD-MUST-REPRESENT-CURRENT-CHANGESET
Requirement:
Before Finalize, the PR must represent the currently approved published ChangeSet revision.

---

Reason:
A PR pointing at stale or unrelated head content cannot carry the reviewed result toward Finalize.

## FI-RPKG-FINALIZE-REVIEWED-WORK

### Scenario Role / Local Purpose

Integrate the exact approved ChangeSet result into the target branch without hidden content change and close the logical work only after integration is proven.

### Preconditions

Conceptually:

```text
ChangeSet lifecycle = Active
execution = Ready(C2)

C2 is proven to equal reviewed result T2
approval is valid for C2

PR exists
PR head represents C2
PR target = intended targetBranch
```

### Interaction Process

```text
approved published C2
+
current target branch state
↓
attempt integration
↓
verify integrated result
├─ reviewed result preserved
│    ↓
│  lifecycle = Finalized
│  record integration result/commit
│  complete Work Intent / Issue
│  cleanup isolated workspace when safe
│
└─ integration requires changing ChangeSet result
     ↓
   do not silently resolve into different content
     ↓
   approval becomes stale if a changed reconciliation result is produced
     ↓
   ChangeSet remains active
     ↓
   return to Builder correction/review
```

Movement of the target branch alone does not automatically make approval stale.

Approval becomes stale when the ChangeSet result that would be integrated must change relative to the exact reviewed result.

### Local Result

Either:

- the exact reviewed work is proven integrated and the ChangeSet is Finalized; or
- integration is blocked truthfully and any content-changing reconciliation returns the work to the review loop.

### Behavior Items — selected

#### BI-RPKG-FINALIZE-ONLY-APPROVED-PUBLISHED-REVISION
Requirement:
Finalize must integrate only a published revision whose reviewed-result identity is currently valid.

Reason:
Finalize is allowed to rely on prior semantic review only for the exact published result whose identity was proven.

#### BI-RPKG-FINALIZE-PRESERVES-REVIEWED-CONTENT
Requirement:
Finalize must not silently alter the approved ChangeSet result while integrating it.

Reason:
Integration must not silently change the content that received approval.

#### BI-RPKG-TARGET-MOVEMENT-NOT-AUTOMATIC-STALE
Requirement:
Target-branch movement alone does not invalidate semantic approval when the exact reviewed ChangeSet result can still be integrated unchanged.

Reason:
A moved target branch does not by itself change the reviewed ChangeSet result and should not invalidate approval unnecessarily.

#### BI-RPKG-CONTENT-CHANGING-RECONCILIATION-STALES-APPROVAL
Requirement:
If conflict/reconciliation produces a changed ChangeSet result, the prior approval becomes stale and the changed result must pass the Builder replay/review flow again.

Reason:
Once reconciliation changes the ChangeSet result, the prior semantic review no longer proves the integrated content.

#### BI-RPKG-FINALIZED-WORK-IS-CLOSED
Requirement:
Finalized work remains immutable history for package-continuity purposes; later independent work starts a new ChangeSet identity rather than silently reopening the finalized one.

---

Reason:
After successful integration, later independent changes need a new logical work identity rather than silently extending closed approved work.

## Supporting interaction — Inspect Current Change

Status: supporting / diagnostic; not a primary target Scenario.

## Purpose

Allow a user to inspect the exact current Git-derived ChangeSet difference when useful for diagnostics, manual continuation, debugging or exceptional handoff.

This is no longer the ordinary semantic-review route.

## Interaction Process

For ChangeSet X:

```text
baseCommit = C0
previousPublishedTip = Cn-1
currentPublishedTip = Cn

↓
derive from Git authority

latest:
Cn-1 → Cn

cumulative:
C0 → Cn
```

Possible user conveniences:

```text
View
Open
Copy latest
Copy cumulative
Export one Current Change ZIP
```

Automatic ChatGPT delivery is not required for the target primary workflow. The retained baseline convenience is manual View/Open/Copy/Export of exact Git-derived material. Automatic delivery may exist later only as an optional convenience and must not recreate the old post-Apply semantic-review dependency.

## Behavior Items — selected

#### BI-RPKG-CURRENT-CHANGE-GIT-DERIVED
Requirement:
Current Change material must be derived from authoritative Git revisions, not from a separately maintained semantic ReviewDiff authority.

Reason:
The target workflow already has authoritative Git revision boundaries, so diagnostics should derive from them instead of recreating legacy Path Ownership authority.

#### BI-RPKG-CURRENT-CHANGE-NOT-APPROVAL
Requirement:
Inspecting/copying/exporting Current Change does not create semantic approval and does not authorize Finalize.

Reason:
Semantic approval belongs to the exact Builder-reviewed package/result identity, while Current Change is only an inspection projection.

#### BI-RPKG-CURRENT-CHANGE-DIAGNOSTIC
Requirement:
The ordinary Complete Repository Work Scenario must not depend on manual Current Change handoff for semantic review.

---

Reason:
Ordinary target completion should not depend on a manual review handoff after the exact package result was already reviewed before Apply.
