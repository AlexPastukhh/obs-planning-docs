# SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK — Complete Reviewed Repository Work

Status: planned future Scenario owner

Current authoritative behavior remains in `../SCN-RPKG-COMPLETE-REPOSITORY-WORK.md` until implementation migration makes this target current.

This planned owner must not be used as evidence that Builder-established repository work, reviewed-result confirmation, handoff route composition, PR/final logging or target Finalize are implemented.

## Application Benefit / Desired Result

Realize one exact Builder-reviewed package in the exact repository work that Builder already established, preserve truthful recoverable execution state, and stop at the completion boundary explicitly requested by the user through the reviewed handoff.

Depending on that concrete handoff, the App can:

```text
apply only
or
apply + commit + push/publish
or
apply + commit + push/publish + integrate/finalize + close the Issue
```

All routes use the same modular App actions and correctness rules.

Automatic composition is a convenience/orchestration path, not a second implementation of Apply, Commit, Push, verification, PR or Finalize.

When work is fully finalized, the closed GitHub Issue and related PR must remain useful durable history without requiring access to the original ChatGPT conversation.

---

# Scenario Inputs / Repository-Work Boundary

The target consumer receives an exact reviewed handoff rendered by ChatGPT after Builder review.

The repository work already exists before this Scenario begins.

Conceptually:

```text
Repository Work
├─ repository
├─ Issue identity
├─ targetBranch
├─ sourceCommit / expectedSource
├─ workBranch
└─ internal continuation identity when required by the protocol/runtime

Reviewed Result
├─ exact archive / packageId
├─ expectedSource
└─ expectedResult

Concrete consumer route
└─ one selected automatic stopping point
```

The App does **not** create a new independent Issue or work branch merely because a reviewed package arrives.

The App must prove that the handoff addresses the exact existing repository work and may materialize/recover whatever local execution workspace is needed for that exact work branch. It must not silently substitute a different work branch or infer the integration target from current checkout state.

`Handoff Intent` itself remains free semantic text in the Issue for ChatGPT continuity.

Replacement Package App does not interpret that free text.

ChatGPT reads `Handoff Intent` after `APPROVABLE` and renders one concrete consumer route.

---

# Concrete Handoff Routes

The selected target supports three user-visible completion intents.

The exact serialized protocol field names remain implementation/contract design.

## Route 1 — Apply Only

User meaning:

```text
Apply the reviewed package only.
Do not commit.
Do not push.
Do not Finalize.
```

Automatic composition:

```text
exact reviewed handoff
↓
FI-RPKG-REALIZE-REVIEWED-PACKAGE
    Apply
↓
AppliedUncommitted
↓
STOP
```

Later modular continuation is allowed.

For example:

```text
[Commit]
↓
[Push]
↓
App automatically performs reviewed published-result confirmation
↓
ReviewedPublished
↓
[Finalize]
```

A separate user `Verify` action is not required for the ordinary modular continuation path; confirmation is a deterministic proof step composed after successful Push/Publish.

## Route 2 — Apply And Publish

User meaning:

```text
Fully realize the reviewed package through Commit + Push/Publish.
Leave integration/final closure for later.
```

Automatic composition:

```text
exact reviewed handoff
↓
FI-RPKG-REALIZE-REVIEWED-PACKAGE
    Apply
    Commit
    Push / Publish
↓
FI-RPKG-CONFIRM-REVIEWED-PUBLISHED-REVISION
↓
ReviewedPublished
↓
STOP
```

No PR/final integration is required merely to reach this stopping point.

The Issue remains open.

Later:

```text
[Finalize]
↓
FI-RPKG-ENSURE-INTEGRATION-PULL-REQUEST
↓
FI-RPKG-FINALIZE-REVIEWED-WORK
↓
Finalized
```

## Route 3 — Apply And Finalize

User meaning:

```text
Fully realize and close the reviewed repository work.
```

Automatic composition:

```text
exact reviewed handoff
↓
FI-RPKG-REALIZE-REVIEWED-PACKAGE
    Apply
    Commit
    Push / Publish
↓
FI-RPKG-CONFIRM-REVIEWED-PUBLISHED-REVISION
↓
FI-RPKG-ENSURE-INTEGRATION-PULL-REQUEST
↓
FI-RPKG-FINALIZE-REVIEWED-WORK
    integrate
    prove final integration
    append Final Work Record
    close Issue
↓
Finalized
```

If any stage stops in a truthful recoverable state, retry of the same concrete handoff resumes from persisted proof rather than blindly replaying earlier side effects.

---

# Modular Continuation

The same underlying App actions remain independently usable.

Current implementation already has modular Apply / Commit / Push-style actions; the target extends their composition rather than replacing them.

Selected target modular surfaces include:

```text
Apply Only
Commit
Push / Publish
Finalize
```

Diagnostic/recovery controls may remain separately callable where current implementation requires them.

A button does not create a separate Feature Interaction merely because it is separately invokable.

A composed handoff route may cross several Feature Interactions.

## Semantic Input Rule

When a stage needs user/ChatGPT semantic text, the text source depends on how the same stage is invoked.

```text
automatic composed route
→ semantic text comes from handoff

manual modular route
→ semantic text comes from App UI
```

### Commit

If the concrete handoff includes Commit:

```text
commitMessage
```

is supplied through the handoff and used for that exact Commit attempt.

If Commit is invoked later through the App's manual Commit control, the user can enter the commit message before the commit is created.

App-owned exact metadata/trailers remain App responsibility and are not manually reconstructed by ChatGPT/user.

Push/Publish does not require a separate semantic message.

### Finalize

If the concrete handoff includes Finalize, the handoff carries the semantic text required for the target integration record, conceptually including:

```text
pullRequestTitle
pullRequestBody
finalIssueComment
```

If Finalize is invoked manually, the App obtains the corresponding semantic inputs through its Finalize UI before the irreversible/external side effects that use them.

The exact serialized names and UI layout remain contract/Screen implementation design.

The semantic text must be persisted with operation intent strongly enough that retry does not silently substitute a different commit message, PR description or Final Work Record text after an external side effect may already have happened.

---

# Scenario Process / Feature Interaction Map

```text
exact Builder-reviewed handoff
+
exact existing repository work
        ↓

FI-RPKG-REALIZE-REVIEWED-PACKAGE
        ├─ Apply Only route
        │    ↓
        │  AppliedUncommitted
        │    ↓
        │  STOP
        │
        └─ route includes Commit + Push
             ↓
           Published
             ↓

FI-RPKG-CONFIRM-REVIEWED-PUBLISHED-REVISION
        ├─ Apply And Publish route
        │    ↓
        │  ReviewedPublished
        │    ↓
        │  STOP
        │
        └─ route includes Finalize
             ↓

FI-RPKG-ENSURE-INTEGRATION-PULL-REQUEST
        ↓
FI-RPKG-FINALIZE-REVIEWED-WORK
        ├─ reviewed result integrated unchanged
        │    ↓
        │  append/reconcile ## Final Work Record
        │    ↓
        │  close Issue
        │    ↓
        │  Finalized
        │
        └─ integration requires changed repository-work result
             ↓
           approval becomes stale
             ↓
           return to Builder correction/review flow
```

Manual controls may enter/resume the same process from the currently proven state.

Optional supporting interaction:

```text
Inspect Current Change
```

remains diagnostic and does not create semantic approval.

---

# Cross-FI Behavior Items — Route Composition

## BI-RPKG-HANDOFF-ROUTE-CONTROLS-AUTOMATIC-STOP

Requirement:

The concrete reviewed handoff must determine how far the App automatically composes the modular execution stages before stopping.

Reason:

The user's original `давай архив` completion intent must survive review and determine consumer behavior without relying on ChatGPT conversation memory at Apply time.

## BI-RPKG-AUTOMATIC-AND-MANUAL-STAGES-SHARE-SEMANTICS

Requirement:

Automatic handoff composition and later button-driven continuation must invoke the same authoritative stage behavior, state transitions, identity checks and recovery rules.

Reason:

Convenience composition must not create route-dependent repository semantics.

## BI-RPKG-APPLY-ONLY-STOPS-UNCOMMITTED

Requirement:

The Apply Only route must stop after exact package-file application without automatically committing, pushing, creating a PR or finalizing the work.

Reason:

The user explicitly requested a modular stopping point before repository publication.

## BI-RPKG-APPLY-AND-PUBLISH-STOPS-BEFORE-INTEGRATION

Requirement:

The Apply And Publish route must automatically Apply, Commit and Push/Publish, confirm the reviewed published result, then stop with the Issue still open and without requiring PR/final integration.

Reason:

Publication of reviewed work and final integration/closure are distinct completion boundaries.

## BI-RPKG-APPLY-AND-FINALIZE-COMPLETES-WORK

Requirement:

The Apply And Finalize route must use the same Apply/Commit/Push/verification/PR/Finalize behavior and may close the work only after every required exact precondition and final logging requirement is satisfied.

Reason:

One-message end-to-end completion must not weaken correctness compared with modular continuation.

## BI-RPKG-SEMANTIC-STAGE-INPUT-FOLLOWS-ROUTE

Requirement:

When Commit or Finalize is invoked automatically, its semantic text must come from the authorized handoff; when invoked manually, equivalent semantic input must be obtained through the App UI.

Reason:

Automatic and modular execution should differ only in input/orchestration path, not in the semantic responsibility of the underlying stage.

## BI-RPKG-PUSH-CONTINUES-TO-REVIEWED-CONFIRMATION

Requirement:

After successful Push/Publish of a reviewed package, the ordinary automatic or modular path must continue through reviewed published-result confirmation without requiring a separate user verification command.

Reason:

Confirmation is deterministic identity proof required to establish the published stopping point, not a separate semantic user decision.

## BI-RPKG-COMPOSED-RETRY-RESUMES-PERSISTED-INTENT

Requirement:

Retry of an automatic route must resume from the latest proven repository/external state and reuse the already-authorized persisted semantic stage inputs rather than restarting or silently asking for/replacing them after uncertain side effects.

Reason:

Commit, push, PR and Issue operations cross durable side-effect boundaries.

---

# FI-RPKG-REALIZE-REVIEWED-PACKAGE

## Scenario Role / Local Purpose

Apply one exact reviewed package to the exact Builder-established repository work and, when the concrete route requires it, progress that same applied result through Commit and Push/Publish without changing package meaning.

## Preconditions / Inputs

At minimum:

```text
exact repository identity
exact Issue/work identity
persisted targetBranch
exact workBranch
exact expectedSource
exact package / packageId
exact reviewed expectedResult identity
concrete route
commitMessage when route includes Commit
```

The App proves the handoff matches the existing repository work before mutation.

It does not create a second independent Issue/work branch identity.

An execution workspace may be ensured/recovered for the exact existing `workBranch`, but implementation design must not silently replace the Builder-established repository-work identity.

## Interaction Process

Common Apply:

```text
exact existing repository work
+
exact reviewed package Pn
+
expectedSource Cn
↓
prove exact repository/work branch/source applicability
↓
Apply exact Pn
↓
AppliedUncommitted(Pn)
```

If the route stops here:

```text
AppliedUncommitted
↓
STOP
```

If the route includes publication:

```text
AppliedUncommitted(Pn)
+
authorized commitMessage
↓
Commit exact applied result as Cn+1
↓
CommittedUnpublished(Pn, Cn+1)
↓
Push / Publish exact workBranch tip
↓
Published(Cn+1)
```

If publication outcome cannot be determined:

```text
PublicationUncertain(Pn, Cn+1)
↓
reconcile exact remote truth before another push/package/finalization step
```

## Outcomes

- `AppliedUncommitted` — exact package applied, no commit/push performed;
- `CommittedUnpublished` — exact commit exists locally, push not yet established;
- `Published` — exact work revision is published but reviewed-result equality still needs confirmation;
- `PublicationUncertain` — remote truth must be reconciled;
- fail-closed before mutation when repository/work/source/package identity cannot be proven.

## Behavior Items — selected

### BI-RPKG-APPLY-EXACT-REPOSITORY-WORK

Requirement:

Real Apply must remain bound to the exact Builder-established repository, Issue/work identity, target branch and work branch rather than silently creating/substituting different logical work.

### BI-RPKG-APPLY-EXACT-PACKAGE

Requirement:

The App must apply the exact package identity reviewed by Builder.

### BI-RPKG-APPLY-EXACT-EXPECTED-SOURCE

Requirement:

Real Apply must prove package applicability against the exact expected source before mutation.

### BI-RPKG-RETRY-RESUMES

Requirement:

Retry must prove established Apply/Commit/Push side effects and resume from the latest proven state rather than blindly restarting.

### BI-RPKG-PARTIAL-STATE-TRUTHFUL

Requirement:

Successful earlier stages and uncertain later stages must remain durably distinguishable.

### BI-RPKG-NO-NEXT-PACKAGE-WHILE-PUBLICATION-UNCERTAIN

Requirement:

Another package must not progress while the publication result of the current package is unresolved.

---

# FI-RPKG-CONFIRM-REVIEWED-PUBLISHED-REVISION

## Scenario Role / Local Purpose

Prove that the authoritative published work revision is exactly the package result that ChatGPT semantically approved before real Apply.

This is an identity/proof FI, not a second semantic review.

## Interaction Process

Builder review identity:

```text
repository work
package Pn
expected source Cn
reviewed result Tn
decision APPROVABLE
```

Actual consumer result:

```text
published work commit Cn+1
```

Consumer proves at least:

```text
published revision belongs to the exact workBranch/repository work
published revision realizes package Pn in the expected execution chain
tree(Cn+1) == Tn
```

If proof succeeds:

```text
ReviewedPublished(Cn+1, Pn, Tn)
```

If proof fails:

```text
do not inherit APPROVABLE
do not Finalize
preserve actual published work as evidence
fail closed for explicit investigation/correction
```

The App does not automatically create an unreviewed rollback/revert merely because confirmation failed.

## Behavior Items — selected

### BI-RPKG-PUBLISHED-TREE-EQUALS-REVIEWED-TREE

Approval may be attributed to a published revision only after proving its resulting Git tree equals the exact Builder-reproduced reviewed result.

### BI-RPKG-VERIFY-EXECUTION-IDENTITY

Matching tree content must also belong to the intended repository-work/package/source execution identity.

### BI-RPKG-NO-SECOND-SEMANTIC-REVIEW-WHEN-IDENTITY-PROVEN

When exact identity is proven, the ordinary consumer flow does not require another semantic review of identical content.

### BI-RPKG-VERIFY-FAILS-CLOSED

Ambiguous/unproven identity cannot inherit Builder approval.

### BI-RPKG-VERIFY-MISMATCH-PRESERVES-EVIDENCE

A mismatching published work revision remains preserved for diagnosis and is blocked from Finalize rather than automatically rewritten.

---

# FI-RPKG-ENSURE-INTEGRATION-PULL-REQUEST

## Scenario Role / Local Purpose

Ensure one correct durable GitHub integration surface for the exact currently reviewed/published repository work when Finalize is requested.

This FI is not required merely to stop at `ReviewedPublished`.

## Preconditions / Inputs

```text
ReviewedPublished exact work revision
persisted workBranch
persisted targetBranch
Issue identity
authorized PR semantic text from handoff or manual Finalize UI
```

## Interaction Process

```text
ReviewedPublished workBranch
+
persisted targetBranch
↓
find exact workBranch → targetBranch PR
├─ one correct PR exists
│    → verify current head/base
│    → ensure required semantic integration record
└─ none exists
     → create exact PR
     → write required semantic integration record
```

The PR should remain understandable as an integration record even when read separately from the original chat.

At minimum its durable meaning must identify/link:

```text
repository work / Issue
what is being integrated
workBranch → targetBranch
current reviewed/published work result
where detailed iterative Review Records live
```

Detailed `Review Record` history remains canonical in the Issue and is not duplicated wholesale into the PR.

PR create/update failure does not erase an already-published reviewed revision.

## Behavior Items — selected

### BI-RPKG-ONE-CORRECT-PR

One exact workBranch/targetBranch integration PR must represent the current repository work when Finalize proceeds.

### BI-RPKG-PR-HEAD-MUST-REPRESENT-CURRENT-WORK

Before integration, PR head must represent the currently reviewed/published work revision.

### BI-RPKG-PR-SEMANTIC-RECORD-IS-DURABLE

The PR must retain enough semantic/integration context to understand the integrated work and locate the canonical Issue history later.

### BI-RPKG-PR-FAILURE-DOES-NOT-ROLL-BACK-PUBLISHED-REVISION

PR creation/update failure must not falsely erase or roll back already proven published work.

---

# FI-RPKG-FINALIZE-REVIEWED-WORK

## Scenario Role / Local Purpose

Integrate only the exact approved published work, persist one durable final repository-work record in the Issue, and close the Issue only after the final result/logging boundary is proven.

## Preconditions

Conceptually:

```text
repository work is active/open
published revision is ReviewedPublished
PR exists
PR head = current reviewed published work
PR base = persisted targetBranch
final semantic text is authorized
```

## Interaction Process

```text
ReviewedPublished exact work
+
correct PR
+
current target branch state
↓
attempt integration
↓
verify integrated result
├─ reviewed work result preserved
│    ↓
│  record exact integration result
│    ↓
│  append NEW Issue comment:
│      ## Final Work Record
│    ↓
│  prove that final record belongs to this exact finalized work
│    ↓
│  close Issue
│    ↓
│  Finalized
│
└─ integration requires changing reviewed work result
     ↓
   do not silently manufacture different content
     ↓
   prior approval becomes stale
     ↓
   keep Issue/work active
     ↓
   return changed result to Builder correction/review
```

Target-branch movement alone does not automatically stale approval.

Approval becomes stale when the repository-work result that would be integrated must change relative to the exact reviewed result.

## Final Work Record

The final record is a **new GitHub Issue comment**.

It is not a special native GitHub object and it is not stored as a second authoritative copy in the PR.

System-owned framing:

```text
## Final Work Record
```

The App combines semantic text from handoff/manual Finalize UI with exact proven execution facts.

Conceptually:

```text
## Final Work Record

Outcome:
FINALIZED

Summary:
<ChatGPT/user semantic final text>

Final review:
APPROVABLE

Reviewed package/result:
<exact proven identities>

Published work revision:
<exact proven identity>

Pull Request:
<exact PR identity>

Integration result:
<exact proven identity/status>

Important final notes:
<semantic text when applicable>
```

Exact package/revision/PR/integration facts come from proven App/Builder state rather than from ChatGPT manually copying hashes into prose.

The Final Work Record is historical evidence and is not edited later as ordinary workflow.

Issue closure occurs only after required finalization proof and successful persistence/reconciliation of the exact Final Work Record.

If integration succeeded but final comment/Issue-close external side effects are interrupted or uncertain, the App preserves truthful partial finalization state and resumes/reconciles the remaining logging/closure tail; it must not re-integrate the work blindly or emit ambiguous duplicate Final Work Records.

## Behavior Items — selected

### BI-RPKG-FINALIZE-ONLY-APPROVED-PUBLISHED-REVISION

Finalize may integrate only the currently valid reviewed/published work revision.

### BI-RPKG-FINALIZE-PRESERVES-REVIEWED-CONTENT

Finalize must not silently change the reviewed repository-work result.

### BI-RPKG-TARGET-MOVEMENT-NOT-AUTOMATIC-STALE

Target movement alone does not invalidate approval when the reviewed work can still be integrated unchanged.

### BI-RPKG-CONTENT-CHANGING-RECONCILIATION-STALES-APPROVAL

Any reconciliation that changes the repository-work result invalidates prior approval and requires new Builder replay/review.

### BI-RPKG-FINAL-WORK-RECORD-PRECEDES-ISSUE-CLOSE

The exact Final Work Record must be durably established/reconciled before the Issue is closed by successful Finalize.

### BI-RPKG-FINAL-WORK-RECORD-BINDS-PROVEN-RESULT

Machine identities in the Final Work Record must come from exact proven execution/integration state rather than user/ChatGPT recollection.

### BI-RPKG-FINAL-WORK-RECORD-NOT-DUPLICATED-BY-RETRY

Retry/recovery must reconcile an uncertain already-created final record before creating another final record for the same successful finalization.

### BI-RPKG-FINALIZED-WORK-IS-CLOSED

Successful target Finalize closes the repository-work Issue; later independent work starts a new work identity rather than silently extending the finalized work.

---

# Supporting Interaction — Inspect Current Change

Status: supporting / diagnostic; not a primary target Scenario.

## Purpose

Allow inspection of exact Git-derived current work differences for diagnostics/manual support without recreating the old post-Apply semantic approval dependency.

For repository work with:

```text
original source = C0
previous published work revision = Cn-1
current published work revision = Cn
```

derive from Git authority:

```text
latest:
Cn-1 → Cn

cumulative:
C0 → Cn
```

Possible conveniences include View/Open/Copy/Export.

## Behavior Items — selected

### BI-RPKG-CURRENT-CHANGE-GIT-DERIVED

Current Change diagnostic material derives from authoritative Git revisions rather than a separate persisted approval authority.

### BI-RPKG-CURRENT-CHANGE-NOT-APPROVAL

Inspecting/exporting Current Change does not create semantic approval or authorize Finalize.

### BI-RPKG-CURRENT-CHANGE-DIAGNOSTIC

Ordinary reviewed-result completion must not depend on a second manual Current Change handoff.

---

# Realization Dependencies / Questions / Candidates

These are non-authoritative implementation-feasibility notes retained by the planned Scenario because the selected runtime routes depend on them. They do not preselect the future Domain/Slice/Shared owner decomposition.

## Exact reviewed-result identity through Apply / Commit / Push

Relevant Scenario / FI behavior:

```text
FI-RPKG-REALIZE-REVIEWED-PACKAGE
FI-RPKG-CONFIRM-REVIEWED-PUBLISHED-REVISION
```

Dependency / Question:

Can the App persist/prove enough exact repository-work, package, source, resulting-tree and published-revision identity to fail closed when execution no longer represents the Builder-reviewed result, including across retries and process restarts?

Current assumption:

Git/repository evidence plus durable operation state can provide a deterministic identity/proof boundary. The exact Aggregate/state/journal schema is not selected here.

Investigate during:
- Domain planning for semantic identity/consistency boundaries;
- Slice planning for Apply/Commit/Push/Confirm orchestration and recovery;
- source/test investigation for exact Git tree/revision proof mechanics.

Scenario impact if invalidated:

If reliable reviewed-result identity cannot survive the execution/retry boundaries, revisit the Confirm FI and route stopping rules rather than weakening approval binding.

## Authenticated GitHub PR / Issue finalization side effects

Relevant Scenario / FI behavior:

```text
FI-RPKG-ENSURE-INTEGRATION-PULL-REQUEST
FI-RPKG-FINALIZE-REVIEWED-WORK
→ PR create/update/readback
→ Final Work Record comment
→ Issue close
```

Dependency / Question:

Can the App perform authenticated GitHub PR/Issue operations with sufficient readback/reconciliation to distinguish success, failure and uncertain outcome without duplicating PRs or Final Work Records on retry?

Current assumption / candidate realization:

The App runtime can use an authenticated GitHub capability and persist operation intent/evidence before external side effects. Exact credential mechanism, GitHub client/API and journal representation remain implementation decisions.

Investigate during:
- Shared Implementation planning if Builder and App genuinely share one reusable GitHub interaction capability;
- Domain planning for durable operation identity/currentness only where semantic consistency requires it;
- Slice/source planning for external-side-effect orchestration and reconciliation.

Scenario impact if invalidated:

If reliable external-operation reconciliation is not feasible in the intended runtime, revisit the PR/Finalize interaction process and failure/uncertainty boundaries before implementation ownership is selected.

## Integration while target branch moves

Relevant Scenario / FI behavior:

```text
FI-RPKG-ENSURE-INTEGRATION-PULL-REQUEST
FI-RPKG-FINALIZE-REVIEWED-WORK
BI-RPKG-TARGET-MOVEMENT-NOT-AUTOMATIC-STALE
BI-RPKG-CONTENT-CHANGING-RECONCILIATION-STALES-APPROVAL
```

Dependency / Question:

Can implementation distinguish target movement that preserves the reviewed work result from reconciliation that changes reviewed content, and can it prove the final integration result strongly enough to decide whether approval remains valid?

Current assumption:

Git revision/tree comparison and explicit integration/reconciliation evidence can make this distinction. No merge/rebase/API algorithm is selected here.

Investigate during:
- Domain planning for approval/result currentness semantics;
- Slice/source planning for PR/integration orchestration;
- testing/prototype work for moved-target, conflict and content-changing reconciliation cases.

Scenario impact if invalidated:

If the implementation cannot prove preservation versus content-changing reconciliation, revise the Finalize behavior to fail closed at the uncertain boundary rather than silently treating target movement as safe or always stale.

---

# Logging Model

The target durable history is intentionally split by responsibility:

```text
GitHub Issue body
= current semantic Work Intent
+ Handoff Intent
+ managed exact repository-work context

GitHub Issue comments
= planned immutable Builder Review Records
+ immutable App Final Work Record

Git commits
= exact implementation/publication history
+ semantic commit messages

Pull Request
= durable integration summary/history
+ link to repository-work Issue

Builder review artifacts/state
= exact package/replay/review proof inputs

App persisted operation state/journals
= deterministic execution/recovery authority
```

A separate repository `action-log.md` is not required by this target logging model.

Closed Issues and completed PRs are intended historical reading surfaces: Issue tells the full semantic life of the repository work; PR tells the integration view.

---

# Builder / App Ownership Boundary

Builder owns:

```text
Start Repository Work
exact Issue/work branch/source context
package construction
deterministic package replay
review material
exact review identities
```

ChatGPT owns semantic development/review and handoff rendering.

Replacement Package App owns:

```text
real Apply
Commit
Push / Publish
reviewed published-result confirmation
PR integration record
Finalize
Final Work Record
Issue closure
```

App target behavior consumes Builder-established repository work rather than recreating its own competing Issue/work branch.

Internal migration identity such as current `changeSetId` may remain during implementation migration where required; this Scenario does not require user-facing work identity to expose that internal mechanism.

---

# Methodology / Implementation Guard

This Scenario selects behavioral WHAT and may retain material Realization Dependencies needed to judge whether that WHAT is technically credible.

Those dependencies are questions/assumptions/candidates, not selected implementation authority.

It does not yet select:

- the exact future OBS-ACTION schema/route field names;
- the exact UI layout for Commit/Finalize semantic inputs;
- whether package Apply semantics are physically shared through one module or proved equivalent through another implementation shape;
- the final storage/schema shape for reviewed-result binding or App recovery journals.

Those HOW decisions belong to protocol, Screen, Domain, Slice/shared implementation and source/test owners when implementation planning selects them.
