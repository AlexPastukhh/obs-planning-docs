# Replacement Package Builder + Replacement Package App
# Selected Feature / Scenario + Methodology Target

Status: selected combined target  
Basis: current `main` after methodology correction `d012656408da6e8aa72bcdb13800785c4965ec61` plus selected product decisions from the planning discussion  
Scope:
- **product Feature + Scenario behavioral target** for Replacement Package Builder and Replacement Package App;
- **additional local-methodology corrections** required to represent actor/interaction-level journeys without leaking actor-owned decisions into Feature authority.

Not in scope for this target file:

- exact Slice/Aggregate/Shared owner migration;
- exact class/module/package design;
- exact UI layout;
- production-code changes;
- proof/test migration;
- exact future external handoff protocol schema;
- exact PR/GitHub merge transport used by Finalize.

Those are downstream discoveries. This file selects the behavioral boundaries they must realize.

---

# 0. Additional methodology delta required by this target

The already-applied methodology correction on `main` remains valid:

- Feature is the primary behavioral authority;
- Scenario owns Feature composition/consistency and Benefit closure;
- Scenario may summarize journey-level visible behavior and Feature Results;
- templates are recommended adaptable forms, not schemas;
- Evolution Kinds and `Migration = Evolution` remain as already selected.

This target adds one more narrow methodology correction:

> Scenario must be able to represent **actor / interaction-level journey truth** when that truth is material to how Features are actually used.

## Actor meaning

For Scenario purposes, an actor may be:

```text
human user
ChatGPT / AI acting as a user of application capabilities
external system
application itself when an automatic transition matters
```

Actor identity matters only when it changes:

- the command/instruction supplied;
- a meaningful choice or decision;
- authority to proceed;
- the input passed into a Feature;
- continuity into a later Feature;
- interpretation of a Result;
- handoff between human / AI / application / external context.

Do not add actor ceremony when it contributes no semantic information.

## Scenario may own interaction-level journey truth

A Scenario may document:

```text
Actor
→ command / instruction / selection
→ Feature invocation
→ visible / meaningful Result
→ actor decision
→ next Feature / external context
```

Examples:

```text
human user
→ tells ChatGPT what repository work is wanted
  and what eventual consumer command should mean
↓
ChatGPT
→ chooses the concrete Issue title/body text
→ invokes Builder Start Work
```

and later:

```text
ChatGPT
→ reads the current Issue body
→ interprets the work instructions relevant to the consumer handoff
→ emits handoff or URI
```

This is Scenario authority because it describes **how actors use Features**.

## Do not leak actor-owned decisions into Feature authority

A Feature owns what the application does with supplied input.

It does not automatically own why an actor chose that input or how an AI formulated free-form text.

Canonical distinction:

```text
Scenario / actor:
chooses what Issue body text to supply

Feature:
creates/updates the exact Issue with that supplied text
```

If Builder does not parse a special `handoffPolicy`, `applyExtent`, `autoFinalize` or `uriPolicy` field, then the target Feature documentation must not invent such structured application Data.

For this selected workflow:

```text
human instruction
↓
ChatGPT reasoning / wording choice
↓
ordinary Issue body text
↓
Builder Start Work creates Issue with that exact text
```

The fact that some of that prose tells a future ChatGPT how to construct a Replacement Package App handoff/URI is **meaning of the prose to the actors**, not structured Builder semantics.

Only if a future product Evolution deliberately introduces structured/validated fields does that meaning move into Feature `Expected application behavior` as explicit Data plus `BR-*` on the owning behavior step.

## Recommended Scenario template addition

Required methodology change: the local `documentation-templates.md` Scenario form gains optional/recommended fields such as:

```markdown
Actor:
<human user | ChatGPT/AI | application | external system>

Actor interaction / decision:
<command, selection, decision or interpretation that matters to this journey>
```

They are not mandatory schema fields.

A compact table/process may express the same meaning.

The template keeps the existing journey fields:

```text
Feature
Input / starting context
Expected / visible behavior
Resulting state / Result
Continuity to next step
Screen / external context
```

while allowing actor interaction alongside them.

## Feature template clarification

Required methodology change: the Feature template explicitly reminds authors:

> Actor intent/wording/decision belongs in Scenario when the application merely receives it as input. Feature behavior begins at the semantic application boundary: what the application accepts, validates, establishes, changes and returns.

This prevents AI/user workflow logic from being incorrectly turned into application behavior.

## Requirement wording clarity rule

Normative Feature/Scenario Requirements must be written so two implementers cannot reasonably select different meanings from the same sentence.

When the exact meaning is already known, name it directly:

```text
avoid:
"preserve exact work context"

prefer:
"preserve changeSetId + Work Issue number + recorded work branch + target branch"
```

```text
avoid:
"use the current reviewed result"

prefer:
"the published work-branch Git tree must equal the reviewed-result Git tree"
```

A Requirement should state, where material:

- the subject that must act;
- the exact input/authority it acts on;
- the Result/state that proves success;
- substitutions that are forbidden;
- the failure/blocking behavior when the required truth cannot be proven.

Do not use `context`, `identity`, `currentness`, `appropriate`, `enough`, or similar shorthand by itself when the concrete values are already known.

If a product decision is genuinely not selected, write:

```text
OPEN target detail — <decision>
```

and state what implementation is **not allowed to assume** until that decision is selected.

Do not hide an unresolved choice behind language such as:

```text
may use A / B / C
according to selected semantics
as appropriate
```

This is a wording/authority rule, not a mandatory document schema or new planning phase.

## Requirement identity and downstream test-trace rule

Every durable normative Feature Behavior Requirement has a stable identity:

```text
BR-<product/feature>-<semantic-name>
```

The Feature owner contains the canonical Requirement identity and statement directly beside the behavior step/branch it constrains.

### Requirement form

Prefer the shortest unambiguous logical statement.

Good forms:

```text
A ∧ B ⇒ C
state = X → operation → state = Y
fix A → prove B → mutate C → prove D → Success
retry(uncertain) ⇒ same identity
```

Avoid a detached Requirement catalog when the rule can be placed directly beside its behavioral step/branch. Keep the Requirement statement compact and logical.

Explanation, rationale, examples and implementation concerns stay outside the normative Requirement.

### Ordered behavior

If correctness depends on order, the order is itself a Requirement:

```text
A → B → C → Success
```

If only some ordering is selected:

```text
A < C
B < C
order(A,B) = OPEN
```

Do not silently convert an implementation convenience into a required order.

### Downstream trace

Slice Planning / Aggregate Planning / durable Proof discovery references:

```text
Feature identity
+
numbered Main-path Step
+
BR-* identity/identities attached to that row
```

Do **not** copy Requirement text into downstream discovery.

The Feature owner remains the semantic authority.

If class/method design changes while behavior does not, update discovery methods/tests without changing the `BR-*`.

If behavior changes, update the Feature owner first.

### Application-service realization rule

The implementation-side Slice remains the end-to-end realization boundary for a Feature, but its public application entry is a **simple application service**.

Preferred shape:

```text
StartRepositoryWork.start(...)
BuildReplacementPackage.build(...)
ApplyPackageForReview.review(...)
AddIssueReviewComment.addComment(...)
EditWorkIssue.edit(...)
ApplyReplacementPackage.apply(...)
FinalizeRepositoryWork.finalize(...)
ExportRepositorySnapshot.export(...)
```

Do not introduce a `CommandBus`, dispatcher, mediator, generic command handler, or generic:

```text
execute(command)
dispatch(command)
handle(command)
```

merely to invoke a Feature.

Do not create `*Command` types as a methodology requirement.

Use typed semantic arguments and typed Result values directly. A later implementation may introduce a request/value object only if several arguments form one meaningful semantic value, not because a command-dispatch framework expects one.

Typed identifiers remain valid and preferred where they protect meaning:

```text
ChangeSetId
PackageId
ReviewId
IssueCommentId
InteractionId
CommitId
BranchName
IssueRef
```

The rule is:

```text
typed semantic values
+
simple application service
+
Domain/Shared collaborators
```

not:

```text
primitive IDs
+
CommandBus/dispatcher
```

### Slice Discovery + non-persistent Slice Planning

After Feature behavior is selected, the next implementation-oriented working pass is:

```text
Feature
→ Slice Discovery
→ non-persistent Slice Planning
```

This is one working activity, not two mandatory phases.

Its purpose is to make the complete Feature realization understandable end to end before implementation:

```text
UI / entry
→ application service
→ feature-local orchestration
→ Domain calls
→ Shared / infrastructure calls
→ cross-cutting behavior
→ result mapping / presentation
```

The artifact is **non-persistent by default**.

Default rule:

```text
use it to reason / review / build a replacement package
→ discard it when no longer useful
```

Persist it only when there is a deliberate reason to retain the implementation plan as a practical example, migration aid or large-change coordination artifact.

A retained Slice Planning file is:

- not Feature semantic authority;
- not Domain semantic authority;
- not a manually maintained source-symbol map;
- not required for every Feature;
- allowed to become stale and be deleted rather than maintained mechanically.

### Slice Planning starts from exact Feature Steps

For each Feature:

1. Read `Intent`, `Principal Result`, `Expected application behavior`, Main-path Steps, branch tables and attached `BR-*`.
2. List the implementation classes/collaborators needed by the **whole Feature**, including where material:
   - UI/Swing Action/Dialog/Presenter/ViewModel;
   - entry adapter / URI / handoff adapter;
   - simple application service;
   - feature-local coordinator / mapper / result presenter;
   - Domain Aggregate / Entity / Value Object calls;
   - repositories / persistence;
   - Shared Git / GitHub / filesystem / archive / browser capabilities;
   - cross-cutting ID generation, clock, cancellation, operation serialization, retry/reconciliation, logging/diagnostics.
3. Walk the Feature Main path in exact order.
4. For every Step, show which concrete candidate methods participate.
5. For a branch, show the methods used by each path and where the paths converge.
6. Domain calls may appear in this flow because the Slice invokes them.
7. **Do not put Domain unit tests in Slice Planning.**
8. End the Feature section with a small set of literal **Feature integration tests** that exercise the application-service boundary across the whole relevant Feature path.

### Slice candidate-method rule

Candidate methods should be explanatory and typed.

The plan may show:

```text
ApplyPackageAction.onInvoked(...)
ApplyPackagePresenter.readSelection(...)
ApplyReplacementPackage.apply(...)
RepositoryWork.requireRecordedWorkBranch(...)
ReplacementPackageApplyCapability.apply(...)
GitPublicationCapability.pushExactTip(...)
ApplyResultPresenter.show(...)
```

This is a proposed end-to-end realization trace, not frozen source design.

One method may realize several Feature Steps.

One Feature Step may require several methods across several layers.

### Slice integration-test rule

Slice Planning uses **integration tests for the Feature as a whole**, not one unit test per Step or method.

Preferred boundary:

```text
real application service
+
real Domain objects
+
real feature-local orchestration
+
fake/in-memory external capabilities at expensive process/network/browser boundaries
```

A Feature integration test normally crosses several Main-path Steps.

Example:

```text
test("apply_commit_publish_returns_published_only_after_exact_remote_tip_is_proven") {
    // Arrange
    <real ApplyReplacementPackage service + real Domain state>
    <fake package filesystem/Git publication boundaries>

    // Act
    let result = service.apply(..., ApplyExtent.ApplyCommitPublish, ...)

    // Assert
    assertEqual(result.state, Published)
    assertEqual(fakeGit.remoteTip("work/cs-1"), result.commitId)
    assertEqual(fakeGit.remoteTree("work/cs-1"), result.publishedTree)
}
```

Integration test names describe expected Feature behavior/result.

Do not create tests named after internal methods.

The test may assert:

- terminal Feature Result;
- important partial/recovery Result;
- exact external side-effect identity;
- no forbidden side effect;
- branch convergence;
- continuity required by the Feature.

It should not duplicate every Domain invariant assertion. Domain invariants belong in Aggregate Planning unit tests.

### Aggregate Planning is a separate non-persistent working artifact

Aggregate Planning is separate from Slice Planning, but has the **same persistence default**:

```text
planning needed
→ create/refine Aggregate Planning
→ implement + prove the planned Domain behavior
→ discard Aggregate Planning when it no longer adds value
```

Aggregate Planning is **non-persistent by default**.

It is not the future durable Domain owner merely because it contains class/field/method sketches.

After implementation, durable Domain truth may live in separate owners such as:

```text
Domain documentation
Feature implementation concerns
Production ↔ Proof requirements
ADRs / protocol owners
code + tests
```

Those may be created or updated when independently useful, but they are **not a promoted copy of this planning artifact**.

Retain an Aggregate Planning file only by explicit decision for migration coordination, teaching/example value, or an unusually large unfinished change. Prefer deletion over mechanical maintenance after implementation.

Its question is:

```text
What Domain objects must exist,
what semantic state do they hold,
what methods protect that state,
and what literal unit tests prove those Domain rules?
```

Aggregate Planning contains only Domain-level design:

- Aggregate roots;
- child Entities;
- Value Objects;
- non-Aggregate Domain Objects where useful;
- high-level fields/state;
- candidate semantic methods;
- literal Domain unit tests.

It does **not** contain:

- Swing/UI classes;
- application services;
- Git/GitHub/filesystem/browser mechanics;
- Feature integration tests;
- command dispatch;
- end-to-end orchestration details.

### Aggregate Planning discovery order

For each Feature behavior that needs Domain semantics:

```text
Feature Step / BR-*
↓
what semantic facts must be remembered / compared / changed?
↓
what must stay mutually consistent?
↓
what lifecycle / partial-state / retry rules exist?
↓
which Domain class owns those rules?
↓
fields / state
↓
method A
→ literal unit tests for A
↓
method B
→ literal unit tests for B
↓
...
```

A Feature may use several Aggregates.

A Feature is never assigned mechanically to one Aggregate.

Some Feature Steps need no Aggregate and remain Slice/Shared implementation behavior.

### Domain unit-test rule

Domain unit tests call Domain methods directly.

In Aggregate Planning, put the tests **immediately after the candidate method they prove**:

```markdown
### Method — `semanticMethod`

```text
semanticMethod(...) -> Result
```

#### Unit tests for this method

```text
test("<expected Domain behavior/result>") {
    ...
}
```
```

Do not collect all tests into a detached end-of-Aggregate test catalog. A method may have several tests; a test should sit under the smallest method boundary whose rule it proves.


Names describe expected Domain behavior/result, not the method name.

Example:

```text
test("editing_actor_text_preserves_all_managed_work_identity_fields") {
    // Arrange
    let issue = WorkIssue(...)

    // Act
    let updated = issue.replaceActorIssueText(...)

    // Assert
    assertEqual(updated.managedIdentity, issue.managedIdentity)
    assertEqual(updated.actorText, newText)
}
```

This is where Domain invariants are made literal.

Do not repeat the same invariant as a separate prose `Preserved invariants` section when the test already expresses it exactly.

### Slice Planning and Aggregate Planning relationship

Both artifacts are temporary implementation-planning views:

```text
Slice Discovery + Slice Planning
= how the whole Feature is realized end to end

Aggregate Planning
= how Domain classes realize their semantic part
```

Default lifecycle for both:

```text
select Feature behavior
→ plan
→ implement
→ prove
→ remove the planning artifact
```

A later durable owner may preserve resulting architecture/behavior where useful, but that owner has its own purpose and authority; it is not this planning file kept alive indefinitely.

The same Domain call can appear in both artifacts for different reasons:

```text
Slice Planning
→ "at Feature Step 3 the service calls RepositoryWork.markFinalized(...)"

Aggregate Planning
→ "RepositoryWork.markFinalized(...) is legal only with completed FinalizationEvidence"
→ literal unit tests
```

That is not duplication of authority:

```text
Feature owner = behavior authority
Slice Planning = working realization path
Aggregate Planning = working Domain class design
tests = proposed proof
```

### Branch-path Slice Planning

A Feature branch remains part of its owning Feature Step.

Feature form:

```text
Decision: <question>

| Path A | Path B | Path C |
|---|---|---|
| ... | ... | ... |
| → Step N | retry Step K | Stop |
```

Slice Planning mirrors it with method calls:

```text
Path A
→ service / collaborator call
→ common continuation

Path B
→ reconciliation call
→ retry same application service path

Path C
→ result presenter / failure result
```

Feature integration tests cover every material path, but are grouped at Feature level rather than under each branch row.

### Future Feature / extension planning

Known future Features and selected future extensions may be planned at the same implementation depth with explicit markers.

When a canonical Evolution Step already exists, the planning block should reference its exact `EVO-*` identity rather than inventing another future label. For this product, selected examples include:

```text
EVO-RPKG-DOWNGRADE-CURRENT-CHANGE-TO-DIAGNOSTIC
EVO-RPKG-ADOPT-REVIEWED-RESULT-WORKFLOW
EVO-BLDR-EDIT-DURABLE-WORK-ISSUE
```

Use generic `FUTURE CANDIDATE` only for genuinely unselected possibilities.


```text
FUTURE FEATURE — Introduction
FUTURE EXTENSION OF <existing Feature>
```

They may appear in both Slice Planning and Aggregate Planning.

If product behavior remains OPEN:

```text
BLOCKED BY OPEN PRODUCT DETAIL
```

Do not invent the missing API or class behavior.

### Relationship to owner-local Production ↔ Proof Requirements Discovery

Slice Planning integration tests and Aggregate Planning unit tests are practical design/proof sketches.

They do not replace later durable owner-local Production ↔ Proof Requirements Discovery when that deeper durable reasoning is useful.

The Feature `BR-*` remains semantic authority.

## Methodology owners to change

This methodology delta belongs primarily in:

```text
planning/documentation/tools/replacement-package-app/documentation-use-cases.md
planning/documentation/tools/replacement-package-app/documentation-templates.md
```

### `documentation-use-cases.md`

Update existing use cases rather than creating competing phases.

`DOC-UC-13 — Feature planning + Feature/Slice boundary hypothesis` owns:

- compact Feature `Expected application behavior`;
- Main-path behavior rows with attached `BR-*`;
- branch question + one column per path;
- Feature/Slice boundary hypothesis.

`DOC-UC-03 — Slice implementation` should be clarified to include a lightweight **Slice Discovery + non-persistent Slice Planning** working pass before exact source implementation when useful:

```text
Feature
→ whole-Slice class/collaborator map
→ Step-by-Step method realization
→ whole-Feature integration-test sketches
→ implementation
```

The working Slice plan is disposable by default and is not a new durable documentation owner.

`DOC-UC-02 — Domain/Aggregate discovery` should be clarified as **non-persistent Aggregate Planning** separate from Slice Planning:

- derive Domain owners from Feature behavior that needs semantic state/consistency;
- list Domain classes, high-level fields/state and semantic methods;
- write literal Domain unit-test sketches;
- do not include UI/application-service/infrastructure orchestration in the Aggregate plan;
- discard the plan after implementation/proof unless explicit temporary retention remains useful;
- create/update separate durable Domain owners later only when they have their own long-lived purpose.

`DOC-UC-14 — owner-local Production ↔ Proof Requirements Discovery` remains the later durable production/proof pass when required. Slice integration-test sketches and Aggregate unit-test sketches do not replace it.

Scenario actor rules remain unchanged:

- Scenario may own material actor/interaction journey truth;
- AI/ChatGPT may be an actor/user;
- actor-owned wording/choice stays in Scenario where the application merely consumes it;
- Feature authority starts at the application semantic boundary.

### `documentation-templates.md`

Add recommended examples for:

1. compact Feature;
2. compact Scenario;
3. **Slice Discovery + non-persistent Slice Planning**:
   - Feature-local implementation class map;
   - Step → methods table;
   - UI/app-service/Domain/Shared/cross-cutting coverage;
   - Feature-level integration tests;
   - no Domain unit tests;
4. **Aggregate Planning**:
   - explicitly marked non-persistent working artifact;
   - Domain class;
   - fields/state;
   - each candidate method followed immediately by its literal Domain unit tests;
   - optional Future/Evolution block with canonical `EVO-*` identity where selected;
   - no detached invariant catalog;
   - no UI/app-service/infrastructure classes;
   - explicit note that implementation completion normally makes the planning file deletable rather than durable.

Templates remain examples, not schemas.

`README.md` changes only if navigation needs a compact link.

No new semantic authority is introduced.

---

# 1. Target authority model

The product documentation is Feature-centered.

```text
Application Benefit
↓
Feature owners
├─ Intent
├─ Principal Result / Result family
├─ Expected application behavior
│  ├─ compact Data
│  ├─ numbered Main-path behavior rows
│  ├─ BR-* beside each row
│  ├─ branch question + one column per path
│  └─ explicit path convergence where applicable
├─ material Feature Implementation Concerns
├─ known Evolution / future extensions
└─ Feature/Slice boundary reasoning

↕ composition / consistency

Scenario owners
├─ Application Benefit / starting context
├─ ordered Feature journey
├─ journey Main path
├─ SR-* beside the journey behavior it constrains
├─ actor decisions / branch columns
├─ Result / continuity into later steps
├─ Screen / external context where material
└─ terminal Benefit closure
```

Scenario does not copy Feature internals.

Feature remains authoritative for how the application obtains its Result.

Scenario is authoritative for how independently owned Features compose into a coherent journey and satisfy the Application Benefit.

Scenario may also describe **interaction-level journey truth** when it matters to the Benefit:

- who acts at the step;
- whether the actor is the human user, ChatGPT/AI acting as a user of Builder/App capabilities, or another external system;
- what instruction/command the actor provides;
- which selected execution intent must survive into later handoff/URI generation;
- what the actor sees/decides before the next Feature is invoked.

This is still Scenario-level behavior, not permission to duplicate Feature internals.

## Exact semantic identifiers used by this target

| Term | Selected meaning |
|---|---|
| `repositoryIdentity` | GitHub repository identity, e.g. `github:owner/repo`; branch identity is not part of it. |
| repository location | exact local repository/worktree path used by an operation. |
| `changeSetId` | stable identity of one logical repository work item. |
| Work Issue | exact GitHub Issue whose Builder-managed `ChangeSet-Id` equals the selected `changeSetId`. |
| `targetBranch` | exact branch selected before Start Work; its resolved commit is the Start Work base. |
| `workBranch` | exact branch created by Start Work for this `changeSetId`. |
| `startBaseCommit` | full commit SHA resolved from `targetBranch` before `workBranch` creation. |
| `packageId` | identity of one exact Replacement Package ZIP. |
| `expectedSource` | full commit SHA against which one package/review iteration is defined. |
| reviewed-result identity | identity uniquely representing one predicted Git tree; selected target representation is `GitTreeId`. |

These terms are not interchangeable. In particular: repository identity ≠ local location; work branch ≠ target branch; review workspace ≠ work branch; expected source ≠ ambient HEAD.

---

# 2. Feature / Slice interpretation

Selected default:

```text
Feature = behavioral side of one use-case boundary
Slice   = end-to-end implementation side of that same boundary hypothesis
```

Default planning rule:

```text
one selected Feature
↔
one Slice boundary hypothesis
```

Later implementation evidence may keep the same Slice and introduce an internal module/branch/entry adapter, or may reopen the Feature/Slice boundary decision. A new Slice is not created merely because implementation has several stages.

A Feature is selected primarily by:

1. one application/user intent;
2. one principal meaningful Result / Result family;
3. a coherent semantic entry;
4. coherent end-to-end realization;
5. useful locality for development, proof and evolution.

Transport, button, URI, command stage, retry branch or internal module does not automatically create another Feature.

---

# 3. Selected convenience-composition exception

The Replacement Package App intentionally allows one external activation to compose more than one Feature.

Example:

```text
handoff / URI
↓
Apply Replacement Package
↓
optionally
Finalize Repository Work
```

This is a selected methodology exception.

It does not merge the Features.

Reason:

```text
Apply
= realize/publish selected package work

Finalize
= complete the already-realized repository work
```

Both remain independently meaningful.

The same application must support:

```text
one-shot automatic composition
```

and:

```text
Apply
↓
stop / inspect / review / do permitted work
↓
Finalize later
```

Therefore:

```text
one activation
≠ one Feature by necessity
```

The convenience orchestration belongs to Scenario/application composition.

---

# 4. Target Feature catalog

## Replacement Package Builder

| Feature | Target status | Principal Result |
|---|---|---|
| `F-BLDR-START-REPOSITORY-WORK` | target | one exact Work Issue and one exact work branch exist; the Issue records that branch |
| `F-BLDR-BUILD-REPLACEMENT-PACKAGE` | target/current-mechanics evolution | one exact replacement package exists |
| `F-BLDR-APPLY-PACKAGE-FOR-REVIEW` | target | exact package is applied in review context and exact reviewable resulting state/diff exists |
| `F-BLDR-ADD-ISSUE-REVIEW-COMMENT` | target | selected review findings are durably appended to the exact work Issue |
| `F-BLDR-EDIT-WORK-ISSUE` | **future Evolution Feature** | exact durable Work Issue body is deliberately changed |

## Replacement Package App

| Feature | Target status | Principal Result |
|---|---|---|
| `F-RPKG-APPLY-REPLACEMENT-PACKAGE` | target evolution of current Apply/Commit/Publish behavior | the exact requested extent is established: Applied, Applied+Committed, or Applied+Committed+Published |
| `F-RPKG-FINALIZE-REPOSITORY-WORK` | target evolution of current Finalize | the exact work result is integrated into the selected target branch and final Issue communication is posted |
| `F-RPKG-EXPORT-REPOSITORY-SNAPSHOT` | current behavior with clarified semantics | exact portable Snapshot ZIP exists |
| `F-RPKG-INSPECT-CURRENT-CHANGE` | target diagnostic/support boundary selected; exact target endpoints still OPEN | diagnostic projection exists only after explicit from/to endpoints are selected |

`Inspect Current Change` is not part of the normal reviewed Builder → App completion path. It remains a useful optional diagnostic/support Feature after legacy approval authority is retired.

---

# 5. Builder Feature — Start Repository Work

## Identity

`F-BLDR-START-REPOSITORY-WORK`

## Intent

Create one durable logical repository work: one exact work branch + one exact Work Issue, both tied to one `changeSetId`.

## Principal Result

```text
Work Issue exists
+
work branch exists from exact Start Work base
+
Issue and Builder state contain the same exact work identity
```

## Expected application behavior

### Data

| Kind | Data |
|---|---|
| Input | `repositoryIdentity`, repository location, `targetBranch`, actor-selected Issue title, `ActorIssueText` |
| Fixed before external creation | `changeSetId`, `startBaseCommit`, `workBranch` |
| External result | exact `IssueRef` |
| Builder-managed Issue text | `changeSetId`, `workBranch`, `targetBranch`, `startBaseCommit` |

### Main path

| Behavior step | Requirement(s) |
|---|---|
| **1. Fix Start Work identity.** Resolve `targetBranch` to one full `startBaseCommit`; fix `(changeSetId, targetBranch, startBaseCommit, workBranch)` before branch/Issue creation. | `BR-BLDR-START-FIX-IDENTITIES-BEFORE-CREATE` — `StartAttempt = (changeSetId, targetBranch, startBaseCommit, workBranch)` is fixed before branch/Issue creation; `retry(partial\|uncertain) ⇒ same StartAttempt`. |
| **2. Create and prove the work branch.** Create exactly `workBranch` from exactly `startBaseCommit`; ambient checkout/HEAD is irrelevant. | `BR-BLDR-START-CREATE-ONE-WORK-BRANCH` — `workBranch` is created from exactly `startBaseCommit`; ambient checkout/HEAD is irrelevant. |

Decision after Step 2: **What is the work-branch creation/proof result?**

| Exact branch proven | Result uncertain | Conflicting branch/base proven |
|---|---|---|
| Preserve exact branch proof. | Reconcile the same fixed `workBranch`; do not generate another identity. | Fail/recovery; never adopt conflicting branch/base. |
| → Step 3 | If exact branch becomes proven → Step 3; otherwise remain in Step 2 reconciliation. | Stop |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **3. Create or reconcile the exact Work Issue.** Establish exactly one Issue for the fixed `changeSetId`. | `BR-BLDR-START-CREATE-ONE-WORK-ISSUE` — `changeSetId ⇒ exactly one Work Issue`; uncertain create ⇒ reconcile before any create retry. |

Decision after Step 3: **What is the Work Issue creation/proof result?**

| Exact intended Issue proven | Result uncertain | Conflicting Issue identity proven |
|---|---|---|
| Preserve exact `IssueRef`. | Reconcile the same intended Issue before any create retry. | Fail/recovery; never substitute the conflicting Issue. |
| → Step 4 | If exact Issue becomes proven → Step 4; otherwise remain in Step 3 reconciliation. | Stop |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **4. Establish and verify Issue work text.** Preserve actor prose as opaque text; establish Builder-managed `(changeSetId, workBranch, targetBranch, startBaseCommit)` and re-read those exact values. | `BR-BLDR-START-WRITE-MANAGED-WORK-IDENTITY` — `WorkIssue.managedIdentity = (changeSetId, workBranch, targetBranch, startBaseCommit)` with literal readable values.<br>`BR-BLDR-START-PRESERVE-ACTOR-PROSE` — `actorIssueText` is preserved as opaque prose; `actorIssueText ∩ managedIdentity = ∅` semantically. |
| **5. Complete Start Work and fix the durable work-branch role.** Return success only after exact branch + exact Issue + matching managed identity are proven. Later Builder work uses this one recorded branch; review uses separate temporary state and never turns that state into the recorded work branch. | `BR-BLDR-START-RETURN-ONLY-PROVEN-WORK` — `StartWork.Success ⇔ workBranch proven ∧ WorkIssue proven ∧ WorkIssue.managedIdentity = StartAttempt`.<br>`BR-BLDR-START-USE-RECORDED-WORK-BRANCH` — `laterBuilderOperation(work) ⇒ branch = WorkIssue.managedIdentity.workBranch`.<br>`BR-BLDR-START-ONE-RECORDED-WORK-BRANCH` — `one changeSetId ⇒ one recorded workBranch`; branch change requires explicit recovery/Evolution and consistent managed-identity update. |

**OPEN target detail — Issue-body ownership representation.** Exact Markdown markers/labels separating actor-owned prose from Builder-managed identity text are not selected. Any implementation representation must let `F-BLDR-EDIT-WORK-ISSUE` replace actor text while preserving the exact managed `changeSetId`, `workBranch`, `targetBranch` and `startBaseCommit`.

## Boundary decision

Separate Feature: establishing durable work/Issue identity is independently useful and may precede many package Build/Review iterations.

---
# 6. Builder Feature — Build Replacement Package

## Identity

`F-BLDR-BUILD-REPLACEMENT-PACKAGE`

## Intent

Materialize one exact Replacement Package for one exact open logical work and one exact expected source.

## Principal Result

One validated immutable package ZIP exists with a new `packageId`.

## Expected application behavior

### Data

| Kind | Data |
|---|---|
| Work input | `repositoryIdentity`, `changeSetId`, recorded `workBranch`, Start Work base |
| Package source | one full `expectedSource` commit SHA |
| Desired result input | exact resulting file bytes + explicit deletions |
| Package result | `packageId`, operations, exact base bytes, complete replacement bytes, ZIP bytes |

### Main path

| Behavior step | Requirement(s) |
|---|---|
| **1. Select exact work and package source.** For the first package, set `expectedSource = startBaseCommit`; fix it before package materialization. Pre-`APPROVABLE` corrections reuse that same source. | `BR-BLDR-BUILD-CHANGESET-CONTINUITY` — `same open logical work before APPROVABLE ⇒ same changeSetId`; new logical work ⇒ new `changeSetId`.<br>`BR-BLDR-BUILD-FIX-EXPECTED-SOURCE` — `firstPackage.expectedSource = startBaseCommit`; `package.expectedSource` is fixed before materialization; later branch movement does not change it.<br>`BR-BLDR-BUILD-PREAPPROVAL-SOURCE-CONTINUITY` — `same open changeSetId + correction before APPROVABLE ⇒ same expectedSource`.<br>`BR-BLDR-BUILD-APPROVABLE-PACKAGE-IS-FROZEN` — `APPROVABLE(packageId) ⇒ that exact package is handoff package`; later new ZIP ⇒ new logical work/new `changeSetId`. |

Decision after Step 1: **What package-lifecycle path applies?**

| Correction before `APPROVABLE` | Exact package already `APPROVABLE` | New logical work |
|---|---|---|
| Keep the same `changeSetId`. | Freeze the approved package as the handoff package. | Use a new `changeSetId`. |
| Keep the same `expectedSource`. | Do not build another ZIP under this `changeSetId`. | Select the new work's exact source. |
| → Step 2 | Stop; start new logical work for another ZIP. | → Step 2 |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **2. Derive exact package operations.** Determine touched paths and exact desired resulting bytes/deletions; derive one operation per path with exact base where required. | `BR-BLDR-BUILD-PACKAGE-CONTENT-CONSISTENCY` — `∀ path: exactly one operation`; operation kind ⇔ required/forbidden payload shape; undeclared/missing/colliding payload ⇒ failure.<br>`BR-BLDR-BUILD-EXACT-BASE-CONTENT` — `replace\|delete(path) ⇒ expectedBase(path) = exact source bytes`.<br>`BR-BLDR-BUILD-COMPLETE-REPLACEMENT-BYTES` — `add\|replace(path) ⇒ replacement(path) = complete resulting file bytes`. |

Decision inside Step 2: **Which operation applies to this path?**

| `add` | `replace` | `delete` |
|---|---|---|
| Expected base: absent. | Expected base: exact source bytes. | Expected base: exact source bytes. |
| Replacement: complete resulting bytes. | Replacement: complete resulting bytes. | Replacement: absent. |
| Valid operation → continue deriving remaining paths / Step 3. | Valid operation → continue deriving remaining paths / Step 3. | Valid operation → continue deriving remaining paths / Step 3. |

Any invalid/missing/colliding/undeclared payload ⇒ fail Step 2.

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **3. Construct the exact package model.** Generate a new `packageId`; construct one internally valid package from fixed source + operations. | `BR-BLDR-BUILD-NEW-PACKAGE-ID` — `new ZIP ⇒ new packageId`.<br>`BR-BLDR-BUILD-PACKAGE-CONTENT-CONSISTENCY` — `∀ path: exactly one operation`; operation kind ⇔ required/forbidden payload shape; undeclared/missing/colliding payload ⇒ failure. |
| **4. Materialize, validate and return the ZIP.** Write archive; validate identity/manifest/payload consistency; report success only for exact validated ZIP. | `BR-BLDR-BUILD-ORDERED-SOURCE-AND-MATERIALIZATION` — `fix work/source → derive paths/result bytes → derive operations/base bytes → materialize ZIP → validate exact package → Success`. |

## Boundary decision

Separate Feature from Start Work and Review: its principal Result is the exact package artifact itself.

---
# 7. Builder Feature — Apply Package for Review

## Identity

`F-BLDR-APPLY-PACKAGE-FOR-REVIEW`

## Intent

Reconstruct the exact result of one exact package against its exact expected source without changing the durable work branch.

## Principal Result

```text
predicted resulting tree
+ latest.diff
+ cumulative.diff
+ full resulting workspace/tree
```

## Expected application behavior

### Data

| Kind | Data |
|---|---|
| Input | `changeSetId`, recorded `workBranch`, Start Work base, `packageId`, `expectedSource`, exact package bytes |
| Result identity | `predictedTree` / reviewed-result `GitTreeId` |
| Review artifacts | `latest.diff`, `cumulative.diff`, full resulting workspace/tree |

### Main path

| Behavior step | Requirement(s) |
|---|---|
| **1. Create isolated review state.** Create fresh workspace at exactly `expectedSource`; never reuse prior review state and never mutate recorded work branch. | `BR-BLDR-REVIEW-ORDERED-RECONSTRUCTION` — `freshWorkspace(expectedSource) → apply exact package → identify predictedTree → derive latestDiff+cumulativeDiff+fullResult → Success`.<br>`BR-BLDR-REVIEW-DOES-NOT-MUTATE-WORK-BRANCH` — `ApplyForReview ⇒ recorded workBranch unchanged`. |
| **2. Apply the exact package.** Use the same applicability/result semantics as consumer App Apply. | `BR-BLDR-REVIEW-SAME-PACKAGE-SEMANTICS-AS-CONSUMER-APPLY` — `BuilderReviewApply(package, source) = ConsumerApply(package, source)` for applicability and resulting file bytes. |
| **3. Derive one exact predicted result.** Identify `predictedTree`; derive latest diff, cumulative diff and full result from that same reconstruction. | `BR-BLDR-REVIEW-LATEST-DIFF` — `latest.diff = diff(expectedSource, predictedTree)`.<br>`BR-BLDR-REVIEW-CUMULATIVE-DIFF` — `cumulative.diff = diff(startWorkBaseCommit, predictedTree)`.<br>`BR-BLDR-REVIEW-FULL-RESULT` — `tree(fullReviewResult) = predictedTree`. |
| **4. Validate and freeze the review Result.** Require every review artifact to belong to one reconstruction and return immutable review identity. | `BR-BLDR-REVIEW-ONE-RECONSTRUCTION` — `{predictedTree, latest.diff, cumulative.diff, fullResult, packageId, expectedSource} ⇒ one reconstruction`.<br>`BR-BLDR-REVIEW-RESULT-IDENTITY-IS-IMMUTABLE` — `ReviewResult = (changeSetId, workBranch, expectedSource, packageId, predictedTree)` is immutable. |

Decision inside Step 4: **Do all review identities/artifacts describe the same reconstruction?**

| Yes | No |
|---|---|
| Freeze exact immutable review Result. | Reject the mixed/inconsistent reconstruction. |
| Success | Fail; no review Result |

## Feature / Scenario boundary

This Feature produces review material. ChatGPT/user decides `NEEDS_CORRECTION` vs `APPROVABLE` in the Scenario.

---
# 8. Builder Feature — Add Issue Review Comment

## Identity

`F-BLDR-ADD-ISSUE-REVIEW-COMMENT`

## Intent

Append already-selected review text to the exact Work Issue.

## Principal Result

One exact confirmed Issue comment exists, or no success is reported.

## Expected application behavior

### Data

| Kind | Data |
|---|---|
| Input | exact `IssueRef`, `changeSetId`, recorded `workBranch`, actor-selected `CommentText` |
| Result | exact `IssueCommentId` + confirmed comment body |

### Main path

| Behavior step | Requirement(s) |
|---|---|
| **1. Verify the exact Work Issue.** Read exact Issue; require managed `(changeSetId, workBranch)` to equal selected work. | `BR-BLDR-ADD-COMMENT-EXACT-ISSUE` — `Issue.managed(changeSetId, workBranch) = selected work` before write; mismatch/missing ⇒ no write. |

Decision after Step 1: **Does the exact Issue managed identity match the selected work?**

| Yes | No |
|---|---|
| → Step 2 | Do not write. |
| Continue | Stop |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **2. Append supplied text.** Append exactly actor-supplied comment; do not edit Issue body/title/work identity. | `BR-BLDR-ADD-COMMENT-EXACT-TEXT` — `createdComment.body = suppliedCommentText`.<br>`BR-BLDR-ADD-COMMENT-DOES-NOT-EDIT-BODY` — `AddComment ⇒ Issue title/body/work identity/package state unchanged`. |
| **3. Confirm external result.** Re-read/confirm new comment; success only when exact Issue + exact body are proven. | `BR-BLDR-ADD-COMMENT-VERIFY-CREATED-COMMENT` — `Success ⇒ exact Issue contains newly confirmed comment with body = suppliedCommentText`.<br>`BR-BLDR-ADD-COMMENT-ORDERED-WRITE` — `read exact Issue → verify managed work identity → append supplied text → confirm exact comment → Success`. |

Uncertain GitHub write ⇒ reconcile Step 3 before duplicate append.

## Feature / Scenario boundary

Scenario/actor decides whether a finding is material and what text to write.

---
# 9. Future Evolution Feature — Edit Work Issue

## Identity

`F-BLDR-EDIT-WORK-ISSUE`

Status: future `Introduction`.

## Intent

Replace actor-owned Work Issue prose without changing durable work identity.

## Principal Result

The exact Work Issue contains new actor prose and unchanged Builder-managed identity.

## Expected application behavior

### Data

| Kind | Data |
|---|---|
| Input | exact `IssueRef`, `changeSetId`, recorded `workBranch`, new `ActorIssueText` |
| Protected | Issue title, managed `changeSetId`, `workBranch`, `targetBranch`, `startBaseCommit` |
| Result | confirmed current Issue body |

### Main path

| Behavior step | Requirement(s) |
|---|---|
| **1. Verify exact Issue and protected identity.** Read Issue; require managed `(changeSetId, workBranch)` to match; capture managed identity to preserve. | `BR-BLDR-EDIT-ISSUE-EXACT-WORK` — `IssueRef + managed(changeSetId, workBranch) = selected work`; otherwise update fails before write.<br>`BR-BLDR-EDIT-ISSUE-PRESERVE-WORK-IDENTITY` — `EditActorText ⇒ IssueRef,title,changeSetId,workBranch,targetBranch,startBaseCommit,package state unchanged`. |
| **2. Replace actor-owned prose only.** Do not use comment as substitute and do not change protected identity. | `BR-BLDR-EDIT-ISSUE-PRESERVE-WORK-IDENTITY` — `EditActorText ⇒ IssueRef,title,changeSetId,workBranch,targetBranch,startBaseCommit,package state unchanged`.<br>`BR-BLDR-EDIT-ISSUE-NO-HISTORY-CONFLATION` — `EditWorkIssue ≠ AddIssueComment`; body mutation never substitutes comment append and vice versa. |
| **3. Re-read and prove update.** Require actor text = supplied replacement and managed identity unchanged; only then success. | `BR-BLDR-EDIT-ISSUE-VERIFY-RESULT` — `Success ⇔ actorText = suppliedText ∧ managedIdentity unchanged` after re-read.<br>`BR-BLDR-EDIT-ISSUE-ORDERED-UPDATE` — `read exact Issue → verify managed work identity → preserve managed identity → replace actor text → re-read → verify actor text + unchanged managed identity → Success`. |

Decision after Step 3: **What semantic instruction changed?**

| Goal / acceptance | Handoff / URI / Apply / Finalize wording only | Prose target differs from managed target |
|---|---|---|
| Previous semantic review no longer proves the changed instruction. | Package review may remain current. | Block handoff/URI. |
| Review again before handoff/Finalize. If an `APPROVABLE` handoff package must change to satisfy the new goal, the new package starts new logical work/new `changeSetId`. | ChatGPT rereads current Issue before invocation. | Fix prose or use future explicit retarget-work Evolution. |

## Boundary decision

Separate from Start Work and Add Comment because its Result is mutation of durable actor-owned Issue instructions.

---
# 10. Builder Scenario

## Identity

`SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE`

## Application Benefit

Produce one exact package whose exact predicted result was semantically reviewed, then emit the exact consumer handoff/URI for that approved package.

## Starting context

Human user gives ChatGPT:
- repository/work goal;
- target branch;
- when relevant, desired future App invocation meaning: handoff vs URI, Apply extent, automatic vs manual Finalize.

ChatGPT is the actor using Builder Features. Builder does not parse those workflow instructions from Issue prose.

## Journey / expected application behavior

### Main path

| # | Actor / Feature | Behavior | Result / continuity | Requirement |
|---:|---|---|---|---|
| 1 | Human → ChatGPT | Human gives work + eventual consumer intent. ChatGPT chooses ordinary Issue title/body wording. | actor-owned work text exists | — |
| 2 | `F-BLDR-START-REPOSITORY-WORK` | ChatGPT sends selected Issue text; Builder creates exact branch + Issue + managed identity. | exact `changeSetId`, Issue, workBranch, targetBranch, startBaseCommit | `SR-BLDR-WORK-REFERENCE-CONTINUITY`, `SR-BLDR-WORK-BRANCH-CONTINUITY` |
| 3 | ChatGPT / repository work context | Derive/prepare the desired resulting file content and deletions for this logical work without advancing the recorded `workBranch`. | desired resulting bytes/deletions | — |
| 4 | `F-BLDR-BUILD-REPLACEMENT-PACKAGE` | Build exact package. | exact `packageId`, `expectedSource`, package bytes | `SR-BLDR-EXPECTED-SOURCE-SHA-CONTINUITY` |
| 5 | `F-BLDR-APPLY-PACKAGE-FOR-REVIEW` | Reconstruct exact package result. | exact predicted tree + review artifacts | `SR-BLDR-PACKAGE-TO-REVIEW-CONTINUITY`, `SR-BLDR-REVIEW-DOES-NOT-ADVANCE-WORK-BRANCH` |
| 6 | ChatGPT semantic review | Review exact package/source/result against current Issue goal/acceptance. | `NEEDS_CORRECTION` or `APPROVABLE` | — |

Decision after Journey Step 6: **What is the semantic review decision?**

| `NEEDS_CORRECTION` | `APPROVABLE` |
|---|---|
| ChatGPT chooses concrete finding text including the exact reviewed `packageId`. | Freeze this exact package/source/result tuple. |
| `F-BLDR-ADD-ISSUE-REVIEW-COMMENT` confirms it on exact Issue. | No mandatory empty approval comment. |
| Correct the desired resulting file content / candidate inputs without moving the recorded `workBranch` or changing `expectedSource`. | Do not rebuild this `changeSetId`. |
| Build a new package → Review again. | → Common approved path |
| Requirements: `SR-BLDR-CORRECTION-INVALIDATES-PACKAGE-REVIEW`, `SR-BLDR-REVIEW-FINDINGS-ARE-DURABLE-WHEN-MATERIAL` | Requirements: `SR-BLDR-APPROVED-PACKAGE-IS-HANDOFF-PACKAGE`, `SR-BLDR-NO-MANDATORY-EMPTY-APPROVAL-COMMENT` |

**OPEN target detail — review-decision persistence/authority.** The Scenario decision `NEEDS_CORRECTION` / `APPROVABLE` is selected semantic truth. Whether the application persists that decision, where it persists it, and how Build obtains current `APPROVABLE` authority for its no-rebuild guard are not selected. Do not invent `ReviewDecision`/approval persistence until that owner is chosen.

### Common approved path

| # | Actor | Behavior | Requirement |
|---:|---|---|---|
| 7 | ChatGPT | Re-read current Work Issue. Actor prose supplies workflow meaning; managed text supplies exact work identifiers. | `SR-BLDR-ISSUE-TEXT-SOURCES-HANDOFF-SELECTION` |
| 8 | ChatGPT | If actor prose names a target branch, require it to equal managed target branch. | `SR-BLDR-ACTOR-TARGET-TEXT-MUST-MATCH-MANAGED-TARGET` |
| 9 | ChatGPT | Emit exact handoff **or** URI for the exact approved package/source/result/work identity. | `SR-BLDR-HANDOFF-BINDS-REVIEWED-RESULT` |

Decision after Journey Step 9: **How is the same semantic consumer command represented?**

| Copyable handoff | URI |
|---|---|
| Emit exact semantic App command as handoff text. | Encode the same exact semantic App command as URI. |
| Requirement: `SR-BLDR-HANDOFF-AND-URI-PRESERVE-SAME-MODULARITY` | Requirement: `SR-BLDR-HANDOFF-AND-URI-PRESERVE-SAME-MODULARITY` |

Both transports preserve the same:
`repositoryIdentity`, `changeSetId`, Issue, workBranch, targetBranch, `packageId` + exact package archive identity/location hint, expectedSource, reviewed tree, Apply extent, automatic-Finalize choice.

## Benefit closure

Exact reviewed package + exact consumer invocation are available.

---

# 11. App Feature — Apply Replacement Package

## Identity

`F-RPKG-APPLY-REPLACEMENT-PACKAGE`

## Intent

Realize exact package on exact recorded work branch up to exactly requested extent.

## Principal Result family

`Applied` | `Applied + Committed` | `Applied + Committed + Published`  
or `AppliedUncommitted` | `CommittedUnpublished` | `PublicationUncertain`.

## Expected application behavior

### Data

| Kind | Data |
|---|---|
| Invocation | exact package/archive + `packageId`, `repositoryIdentity`, `changeSetId`, `IssueRef`, `workBranch`, `targetBranch`, `expectedSource`, `ApplyExtent` |
| Optional reviewed path | reviewed `GitTreeId` |
| Established state | applied tree, commit SHA/tree, remote publication proof/uncertainty |

### Main path

| Behavior step | Requirement(s) |
|---|---|
| **1. Verify exact invocation and applicability.** Require exact work/package identity; workspace at `expectedSource`; all replace/delete checks pass before mutation. | `BR-RPKG-APPLY-EXACT-INVOCATION` — `ApplyInvocation = (repositoryIdentity, changeSetId, IssueRef, workBranch, targetBranch, packageId, expectedSource)`; mutation requires exact equality with selected work/package.<br>`BR-RPKG-APPLY-EXPECTED-SOURCE-AND-APPLICABILITY` — `workspace.commit = expectedSource ∧ all replace/delete expected-base checks pass` before file mutation. |
| **2. Apply package file result.** Apply exact package bytes and prove applied tree. | `BR-RPKG-APPLY-ORDERED-STAGES` — `Apply → Commit → Publish`; later stage success ⇒ all earlier required stages proven. |

Decision after Step 2: **Which `ApplyExtent` path was requested?**

| `Apply` | `Apply+Commit` | `Apply+Commit+Publish` |
|---|---|---|
| Stop at proven `Applied`. | → Step 3 Commit | → Step 3 Commit |
| Success | After Commit, stop. | After Commit, continue to Publish decision/path. |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **3. Commit exact applied work.** Create one commit containing intended package-applied paths only; prove commit/tree. | `BR-RPKG-APPLY-ORDERED-STAGES` — `Apply → Commit → Publish`; later stage success ⇒ all earlier required stages proven.<br>`BR-RPKG-APPLY-COMMIT-CONTAINS-ONLY-INTENDED-WORK` — `committed paths = intended package-applied work paths`; unrelated paths are not intentionally included. |

Decision after Step 3: **Does this path require Publish?**

| `Apply+Commit` | `Apply+Commit+Publish` |
|---|---|
| Stop at proven `Applied + Committed`. | → Step 4 Publish |
| Success | Continue |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **4. Publish or reconcile publication.** Push exact committed work-branch tip; report Published only after exact remote tip proof. | `BR-RPKG-APPLY-PUBLISHED-REMOTE-TIP` — `Published ⇔ remote(workBranch).tip = exact committed tip` proven.<br>`BR-RPKG-APPLY-PUBLICATION-UNCERTAINTY` — `push outcome uncertain ⇒ PublicationUncertain → reconcile exact remote workBranch before any push retry`. |

Decision inside Step 4: **What publication result is proven?**

| Exact remote tip proven | Proven not published | Publication uncertain | Conflicting remote state |
|---|---|---|---|
| Preserve exact remote-tip/tree proof. | Return `CommittedUnpublished`. | Return `PublicationUncertain`. | Fail/recovery. |
| → Step 5 | Later continuation resumes Step 4. | Reconcile exact remote branch before any retry; remain in Step 4 until resolved. | Stop |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **5. Verify reviewed published result when applicable.** Builder-reviewed path requires published tree = reviewed predicted tree. | `BR-RPKG-APPLY-PUBLISHED-TREE-EQUALS-REVIEWED-TREE` — `Builder-reviewed path ∧ Published ⇒ tree(remote workBranch tip) = reviewed predictedTree`. |
| **6. Return/resume from last proven state.** Return exact proven state; continuation starts after it; never repeat proven Apply or duplicate Commit. | `BR-RPKG-APPLY-LAST-PROVEN-RESULT` — `requested extent not completed ⇒ Result = last proven state`, including `AppliedUncommitted \| CommittedUnpublished \| PublicationUncertain`.<br>`BR-RPKG-APPLY-RESUME-WITHOUT-REPEATING-PROVEN-STAGES` — `resume(same changeSetId,packageId) ⇒ continue after last proven stage`; no repeated Apply/no duplicate commit.<br>`BR-RPKG-APPLY-REQUESTED-EXTENT` — `extent ∈ {Apply, Apply+Commit, Apply+Commit+Publish}`; execution stops exactly at selected extent. |

Transport does not change these steps. Automatic Finalize is Scenario composition after Apply.

## Boundary decision

Apply/Commit/Publish are steps of one Feature. Finalize remains separate.

---
# 12. App Feature — Finalize Repository Work

## Identity

`F-RPKG-FINALIZE-REPOSITORY-WORK`

## Intent

Integrate exact current reviewed work result into exact target branch and confirm final Issue communication.

## Principal Result

`RepositoryWork.Finalized` only after exact integration and exact final Issue communication are both proven.

## Expected application behavior

### Data

| Kind | Data |
|---|---|
| Input | `repositoryIdentity`, `changeSetId`, `IssueRef`, `workBranch`, `publishedTip`, published `GitTreeId`, `targetBranch`, current `ReviewAuthority`, optional final `CommentText` |
| Result evidence | exact integration proof + exact final Issue-comment proof |

### Main path

| Behavior step | Requirement(s) |
|---|---|
| **1. Verify exact work and current review authority.** Require exact identifiers and `reviewAuthority.tree = tree(publishedTip)` before integration. | `BR-RPKG-FINALIZE-EXACT-WORK` — `FinalizeInput = (repositoryIdentity, changeSetId, IssueRef, workBranch, targetBranch, publishedTip)` must equal selected work exactly.<br>`BR-RPKG-FINALIZE-CURRENT-REVIEW-AUTHORITY` — `Finalize allowed ⇒ reviewAuthority.tree = tree(publishedTip)`; mismatch ⇒ stop before integration. |

Decision after Step 1: **Does current review authority cover the exact published tree?**

| Yes | No — stale/missing |
|---|---|
| → Step 2 | Stop before integration. |
| Continue Finalize | Obtain future-selected current review authority before retry. |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **2. Perform first selected external Finalize effect.** Relative order of integration vs final Issue communication remains OPEN. | `BR-RPKG-FINALIZE-ORDERING-IS-OPEN` — `review proof < integration`; `Finalized > {integration proof, comment proof}`; relative order of integration vs comment = OPEN.<br>`BR-RPKG-FINALIZE-INTEGRATE-EXACT-RESULT` — `integrationResult = integrate(exact published work result, exact targetBranch)` and must be proven.<br>`BR-RPKG-FINALIZE-FINAL-ISSUE-COMMUNICATION` — `Finalize ⇒ required final comment confirmed on exact Work Issue`; supplied actor final text is preserved semantically. |

Decision inside Step 2: **Which external Finalize effect is selected first?**

| Integration first | Final Issue communication first |
|---|---|
| Integrate exact published result into exact target branch. | Post/confirm exact final comment on exact Work Issue. |
| Prove integration. | Prove final Issue communication. |
| → Step 3 with Issue communication remaining | → Step 3 with integration remaining |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **3. Perform/reconcile remaining external effect.** Preserve proven effect; perform or reconcile only missing/uncertain effect. | `BR-RPKG-FINALIZE-PRESERVE-PARTIAL-EXTERNAL-RESULTS` — `proven external effect persists across later failure/uncertainty`; uncertain effect ⇒ reconcile before duplicate attempt. |

Decision inside Step 3: **What remains after the first/proven Finalize effect?**

| Other effect missing | Other effect uncertain | Both effects proven | Unrecoverable conflict |
|---|---|---|---|
| Perform only the missing effect. | Reconcile only the uncertain effect before any duplicate attempt. | Preserve both proofs. | Preserve every already-proven effect. |
| When proven → Step 4 | If resolved as missing → perform it; if proven → Step 4; otherwise remain Step 3. | → Step 4 | Fail/stop |

### Main path — continued

| Behavior step | Requirement(s) |
|---|---|
| **4. Complete Finalize.** Mark work Finalized only after integration proof + final Issue-comment proof both exist. | `BR-RPKG-FINALIZE-MARK-FINALIZED-ONLY-AFTER-BOTH-PROVEN` — `RepositoryWork.Finalized ⇔ integration proven ∧ final Issue comment proven`. |

OPEN target detail — integration mechanism: direct merge vs PR vs other is not selected.  
OPEN target detail — GitHub Issue closure: whether Finalize closes the Issue is not selected.  
OPEN target detail — generated final-comment format: exact application-generated wording is not selected.  
OPEN target detail — replacement review authority after the published work tree changes: the mechanism that establishes new current review authority is not selected.

## Boundary decision

Separate from Apply: Apply may stop after Publish; Finalize has different eligibility, effects and terminal Result.

---
# 13. App Feature — Export Repository Snapshot

## Identity

`F-RPKG-EXPORT-REPOSITORY-SNAPSHOT`

## Intent

Produce one exact read-only Snapshot ZIP from either actual local working tree or one exact commit.

## Principal Result

One exact Snapshot ZIP exists, or no misleading final ZIP exists.

## Expected application behavior

### Data

| Kind | Data |
|---|---|
| Common input | exact `RepositoryTarget`, output directory |
| Local mode | frozen full HEAD; tracked files that exist locally; untracked non-ignored local files; tracked local deletions absent; ignored untracked files and `.git/**` excluded; exact local bytes/hashes; diff |
| Commit mode | one resolved full `CommitId`; regular-file bytes from that commit only |
| Local Result | exact Snapshot ZIP containing `SNAPSHOT.json`, `BASE-COMMIT.txt`, `WORKING-TREE.diff`, `snapshot/**` |
| Commit Result | exact Snapshot ZIP containing `SNAPSHOT.json`, `COMMIT.txt`, `snapshot/**` |

### Main path

| Behavior step | Requirement(s) |
|---|---|
| **1. Select and freeze Snapshot source.** Choose Local or Commit mode and freeze its exact source identity. | `BR-RPKG-SNAPSHOT-LOCAL-SOURCE-MEANS-ACTUAL-WORKING-TREE` — `Local snapshot/** = captured machine working-tree bytes`: tracked-existing + untracked-nonignored; tracked-deleted absent; ignored/.git excluded.<br>`BR-RPKG-SNAPSHOT-COMMIT-ORDERED-CAPTURE` — `resolve ref once → exact commit SHA → read all snapshot bytes from that commit → publish`; local dirty/index/untracked state has no effect. |

Decision inside Step 1: **Which Snapshot source mode was selected?**

| `Working Local Tree + Diff` | `Commit Snapshot` |
|---|---|
| Freeze HEAD baseline; local machine files are content authority: tracked-existing + untracked-nonignored; tracked-deleted absent; ignored untracked and `.git/**` excluded. | Resolve selected ref once to one exact full commit; read regular-file bytes from that commit only. |
| → Step 2L | → Step 2C |

### Main path — source-specific Step 2

| Behavior step | Requirement(s) |
|---|---|
| **2L. Prove one coherent Local capture.** `capture1 → diff1 → capture2 → require equality + HEAD unchanged → diff2 → require diff equality + HEAD unchanged`. | `BR-RPKG-SNAPSHOT-LOCAL-DIFF-MATCHES-SAME-CAPTURE` — `BASE-COMMIT = frozen HEAD ∧ WORKING-TREE.diff = diff(frozen HEAD, same captured local result)`.<br>`BR-RPKG-SNAPSHOT-LOCAL-ORDERED-CONSISTENCY-PROOF` — `freeze HEAD → capture1 → diff1 → capture2 → require capture2=capture1 ∧ HEAD same → diff2 → require diff2=diff1 ∧ HEAD same → publish`; any mismatch ⇒ no final ZIP. |
| **2C. Capture exact Commit state.** Read regular-file bytes from the one resolved commit only; local dirty/index/untracked state has no effect. | `BR-RPKG-SNAPSHOT-COMMIT-ORDERED-CAPTURE` — `resolve ref once → exact commit SHA → read all snapshot bytes from that commit → publish`; local dirty/index/untracked state has no effect. |

Decision after Step 2L: **Did the Local consistency proof pass?**

| Yes | No |
|---|---|
| Preserve the proven coherent Local capture. | Reject the mixed/unstable capture. |
| → Step 3 | Fail; no final ZIP |

The Commit path from Step 2C also → Step 3.

### Main path — converged

| Behavior step | Requirement(s) |
|---|---|
| **3. Reject unsupported source entries.** Symlink/submodule ⇒ fail; no final ZIP. | `BR-RPKG-SNAPSHOT-UNSUPPORTED-ENTRIES-FAIL` — `symlink ∨ submodule ⇒ failure ∧ no final ZIP`. |
| **4. Validate output and publish.** Output directory must exist; canonical/resolved output location (including aliases) must be outside the source repo; final path must be unique/non-overwriting; publish via temp path; final ZIP visible only after success. Entire Feature remains read-only. | `BR-RPKG-SNAPSHOT-OUTPUT-BOUNDARY` — `outputDir exists ∧ canonicalResolved(output) outside canonicalResolved(sourceRepo) ∧ final path unique/non-overwriting ∧ temp publication`; final path visible only after success.<br>`BR-RPKG-SNAPSHOT-NO-MISLEADING-FINAL-ZIP` — `failure before publish ⇒ final Snapshot ZIP absent`.<br>`BR-RPKG-SNAPSHOT-READ-ONLY` — `SnapshotExport ⇒ repository checkout/index/work/ChangeSet/branch-publication/ownership state unchanged`. |

## Boundary decision

Two source branches converge on one immutable Snapshot Result.

---
# 14. Snapshot delivery is not another Feature in this selected target

Current behavior supports:

```text
Export only
Export + Attach
Export + Attach + Send
```

Selected target keeps Snapshot export as the Feature.

Optional ChatGPT delivery is supporting handoff behavior in the Snapshot Scenario / shared interaction capability.

Do not create another Feature merely because delivery can be:

```text
attach
or
attach + send
```

unless a later boundary review finds a genuinely independent user/application intent and Result requiring its own end-to-end Feature.

Important composition guarantees remain:

- Snapshot creation completes independently of delivery;
- delivery uses the exact already-produced Snapshot artifact;
- for automatic delivery, the exact destination conversation identity and `Attach` vs `Attach+Send` mode are captured before export begins and are not reread from later UI/browser state;
- browser failure/cancellation/uncertainty does not rewrite successful Snapshot export as failed;
- Snapshot destination does not mutate ChangeSet Review-chat binding.

---

# 15. App Feature — Inspect Current Change

## Identity

`F-RPKG-INSPECT-CURRENT-CHANGE`

## Intent

Produce an exact diagnostic current-change projection without mutating repository truth.

## Principal Result

Either the explicitly defined diagnostic projection is produced, or inspection fails without presenting another diff as that projection.

## Expected application behavior

| State | Behavior |
|---|---|
| legacy work | preserve current legacy ReviewDiff semantics while compatibility exists |
| target Git-backed work | **OPEN target detail**: exact `from`, `to`, projection identity and currentness are not selected yet |
| any mode | read-only; not approval/finalization authority |

Until target endpoints are selected, implementation must not silently define Current Change as current checkout diff, target-branch diff, local dirty diff, or published-branch diff.

## Scenario role

Optional diagnostic/support only.

---

# 16. App primary Scenario

## Identity

`SCN-RPKG-COMPLETE-REPOSITORY-WORK`

Target semantic name: **Complete Reviewed Repository Work**.

## Application Benefit

Realize the exact reviewed package on the recorded work branch and, when completion is selected, integrate the exact current reviewed result into the exact target branch with final Issue communication.

## Starting context

Exact reviewed package + exact work identity + handoff/URI/manual command carrying:
`packageId`, `changeSetId`, Issue, workBranch, targetBranch, expectedSource, reviewed tree, Apply extent, automatic-Finalize choice.

## Journey / expected application behavior

### Main path

| # | Feature / context | Behavior | Result / continuity | Requirement |
|---:|---|---|---|---|
| 1 | entry transport | Handoff, URI or manual entry selects the same semantic Apply command. | exact invocation context | `SR-RPKG-WORK-REFERENCE-CONTINUITY`, `SR-RPKG-EXACT-PACKAGE-CONTINUITY` |
| 2 | `F-RPKG-APPLY-REPLACEMENT-PACKAGE` | Complete exactly requested Apply extent. | last proven Apply result | `SR-RPKG-APPLY-RESULT-TRUTHFUL` |
| 3 | reviewed path | When Published, require actual published tree = reviewed tree. | current reviewed published result | `SR-RPKG-PUBLISHED-TREE-MUST-EQUAL-REVIEWED-TREE` |

Decision after Apply: **Which continuation path applies?**

| Extent ended before Publish | Published + automatic Finalize | Published + manual Finalize |
|---|---|---|
| Stop at the last proven Apply state. | Invoke `F-RPKG-FINALIZE-REPOSITORY-WORK`. | Stop after Published. |
| Later continuation resumes the same Apply Feature. | Continue directly into Finalize path. | External inspection/review/additional permitted work may occur. |
| Requirement: `SR-RPKG-MANUAL-PAUSE-PRESERVES-CONTEXT` | Requirement: `SR-RPKG-AUTO-COMPOSITION-PRESERVES-FEATURES` | Requirement: `SR-RPKG-MANUAL-PAUSE-PRESERVES-CONTEXT` |

Decision before Finalize: **Does the current published work tree still equal the reviewed tree?**

| Yes | No |
|---|---|
| Existing review remains current. | Existing review becomes stale. |
| → Finalize path | Obtain exact new review authority before Finalize. |
| Requirement: `SR-RPKG-DIFFERENT-WORK-TREE-MAKES-OLD-REVIEW-STALE` | Requirement: `SR-RPKG-POST-REVIEW-WORK-TREE-CHANGE-MAKES-OLD-REVIEW-STALE` |

### Finalize path

| # | Behavior | Requirement |
|---:|---|---|
| 1 | Use exact current workBranch/published result and exact recorded targetBranch. | `SR-RPKG-FINALIZE-USES-EXACT-CURRENT-WORK`, `SR-RPKG-TARGET-BRANCH-DOES-NOT-DRIFT-SILENTLY` |
| 2 | Keep workBranch and targetBranch as different roles; never substitute one for the other. | `SR-RPKG-WORK-BRANCH-IS-NOT-TARGET-BRANCH` |
| 3 | Finalize only under current review authority. | `SR-RPKG-FINALIZE-USES-EXACT-CURRENT-WORK` |

## Benefit closure

Terminal state: exact selected work is Finalized against exact target branch with final Issue communication.

---

# 17. Snapshot Scenario

## Identity

`SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT`

Suggested name: **Provide Repository Snapshot For Further Work**.

## Application Benefit

Create one trustworthy portable representation of an exact repository source state and optionally deliver that exact artifact to one selected ChatGPT conversation.

## Starting context

Registered Repository Target + source mode + output directory + delivery mode + destination conversation when delivery is requested.

## Journey / expected application behavior

### Main path

| Journey step | Requirement(s) |
|---|---|
| **1. Select exact Snapshot source mode.** | `SR-RPKG-SNAPSHOT-SOURCE-MODE-IS-EXACT` |

Decision after Journey Step 1: **Which source path is selected?**

| `Working Local Tree + Diff` | `Commit Snapshot` |
|---|---|
| Export actual machine working-tree files. | Export exact resolved commit state. |
| Include frozen HEAD + diff for the same coherent Local capture. | Ignore local dirty/index/untracked state. |
| Requirements: `SR-RPKG-SNAPSHOT-LOCAL-MEANS-MACHINE-FILES`, `SR-RPKG-SNAPSHOT-LOCAL-DIFF-USES-SAME-CAPTURE`, `SR-RPKG-SNAPSHOT-NO-MIXED-LOCAL-CAPTURE` | Requirement: `SR-RPKG-SNAPSHOT-COMMIT-IS-IMMUTABLE-SOURCE` |
| → Common Journey Step 2 | → Common Journey Step 2 |

### Main path — converged

| Journey step | Requirement(s) |
|---|---|
| **2. Exact Snapshot ZIP exists. Decide delivery mode.** | `SR-RPKG-SNAPSHOT-DELIVERY-FAILURE-DOES-NOT-ERASE-EXPORT`, `SR-RPKG-SNAPSHOT-DESTINATION-DOES-NOT-CHANGE-REVIEW-BINDING` |

Decision after Journey Step 2: **How should the exact Snapshot be delivered?**

| Export only | Export + Attach | Export + Attach + Send |
|---|---|---|
| Keep the exact exported ZIP. | Attach that exact ZIP to the frozen conversation. | Attach that exact ZIP to the frozen conversation. |
| Stop successfully. | Stop after confirmed attachment. | Send only after the exact attachment is established. |
| — | Requirement: `SR-RPKG-SNAPSHOT-DELIVERY-EXACT-ARTIFACT` | Requirement: `SR-RPKG-SNAPSHOT-DELIVERY-EXACT-ARTIFACT` |

Delivery failure/cancellation/uncertainty never erases successful export.  
Selecting a destination never changes Repository Work review binding.

## Benefit closure

Export closes the portable-context Benefit; optional delivery additionally closes the selected conversation-delivery intent.

---

# 18. Legacy Current Change Scenario target

Current:

`SCN-RPKG-PROVIDE-CURRENT-CHANGE`

Target:

legacy/retirement path.

The current Scenario exists because legacy Current Change had independent review/handoff meaning.

After Current Change is downgraded to optional diagnostic/support behavior and no longer controls target Finalize approval:

- keep `F-RPKG-INSPECT-CURRENT-CHANGE` as diagnostic Feature if useful;
- remove the old Scenario when there is no longer a distinct Application Benefit requiring a standalone journey;
- diagnostic invocation may instead appear as an optional step in Complete Repository Work or as direct Feature use.

Do not retain a fake Scenario solely to preserve an old filename/ID.

Retirement occurs through the canonical Evolution Step; product truth is not silently deleted.

---

# 19. Target Scenario catalog

## Builder

### `SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE`

Target primary Builder journey:

```text
Start Repository Work
↓
external ChatGPT repository work
↓
Build Replacement Package
↓
Apply Package for Review
↓
external semantic review
├─ correction → work → Build → Apply-for-Review → review
└─ approved → exact handoff / URI
```

## Builder optional future Evolution branch

### `EVO-BLDR-EDIT-DURABLE-WORK-ISSUE`

Optional future journey branch:

```text
actor decides durable Issue body must change
↓
F-BLDR-EDIT-WORK-ISSUE
↓
current Issue text is updated
↓
later actor rereads/reinterprets current Issue
↓
normal Builder journey continues
```

This is not a separate core Scenario unless later product evidence shows a distinct standalone Application Benefit.

## Replacement Package App

### `SCN-RPKG-COMPLETE-REPOSITORY-WORK`

Target primary repository-work completion journey:

```text
reviewed package + handoff/URI
↓
Apply Replacement Package
↓
optional pause / review / additional permitted work
↓
Finalize Repository Work
↓
Benefit closed
```

Automatic path may compose Apply → Finalize in one activation.

### `SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT`

Target Snapshot journey:

```text
select Working Local Tree + Diff
or Commit Snapshot
↓
Export Repository Snapshot
↓
optional exact attach/send
↓
Benefit closed
```

### `SCN-RPKG-PROVIDE-CURRENT-CHANGE`

Legacy only; retire when its independent legacy Benefit disappears.

---

# 20. Current FI → target Feature/Scenario routing

This migration is semantic. Do not perform `FI → Feature` mechanically.

## Builder

### `FI-BLDR-ESTABLISH-EXACT-BUILD-CONTEXT`

Route to:

- `F-BLDR-START-REPOSITORY-WORK` where it creates the `changeSetId`, Work Issue and recorded work branch;
- Build `Expected application behavior` Step 1 + attached `BR-*` where it fixes exact source;
- Scenario Requirements for source/work continuity.

### `FI-BLDR-DEVELOP-CANDIDATE`

Route to:

- external ChatGPT/repository-work Scenario activity;
- Build `Expected application behavior` Data + owning behavior Step where necessary.

Not a Builder Feature in this selected target.

### `FI-BLDR-BUILD-EXACT-PACKAGE`

Route to:

`F-BLDR-BUILD-REPLACEMENT-PACKAGE`.

### `FI-BLDR-REPLAY-AND-REVIEW-PACKAGE-RESULT`

Split semantically:

```text
exact replay/application
→ F-BLDR-APPLY-PACKAGE-FOR-REVIEW

semantic review decision
→ external Scenario review context

cross-iteration identity rules
→ Scenario Requirements
```

### `FI-BLDR-PROVIDE-APPLY-HANDOFF`

Route to:

Scenario terminal handoff/output in this selected target. A future boundary change would require an explicit Feature/Slice recheck.

---

# 21. Current App FI → target Feature/Scenario routing

## `FI-RPKG-RESOLVE-CURRENT-REPOSITORY-WORK`

Route to:

- App Apply Feature behavior;
- `Expected application behavior` Data/Step;
- preconditions expressed in the owning behavior row/`BR-*`;
- Scenario continuity.

Not a Feature in this selected target.

## `FI-RPKG-ESTABLISH-CURRENT-WORK-INTENT`

Ordinary reviewed target flow:

- durable work start belongs upstream to Builder `Start Repository Work`;
- App may verify/reconcile the same exact `changeSetId`, Work Issue and recorded work branch as part of Apply.

Legacy/current migration mechanics remain documented until code/product migration completes.

Do not mechanically create a second target Feature with the same Start Work intent.

## `FI-RPKG-REALIZE-CURRENT-PACKAGE`

Route to:

`F-RPKG-APPLY-REPLACEMENT-PACKAGE`.

Current target-mode Apply → Commit → Publish becomes the Feature's current realization basis.

## `FI-RPKG-INSPECT-LEGACY-CURRENT-CHANGE`

Route to:

`F-RPKG-INSPECT-CURRENT-CHANGE`

with target evolution from legacy approval authority to optional diagnostic/support.

## `FI-RPKG-FINALIZE-LEGACY-CURRENT-WORK`

Route to:

`F-RPKG-FINALIZE-REPOSITORY-WORK`

while evolving legacy stage-owned/fresh-ReviewDiff semantics into target branch/Issue/final-integration semantics.

## `FI-RPKG-MATERIALIZE-REPOSITORY-CONTEXT`

Route to:

`F-RPKG-EXPORT-REPOSITORY-SNAPSHOT`.

## `FI-RPKG-DELIVER-REPOSITORY-CONTEXT`

Route to:

- Snapshot Scenario optional delivery behavior;
- shared external-interaction capability downstream.

Not a separate Feature in this selected target.

## Planned `Confirm Reviewed Published Revision`

Route to:

- App Apply correctness/Result semantics;
- primary App Scenario reviewed-result continuity.

Not a separate Feature in this selected target.

## Planned `Ensure Integration PR`

Route to:

- Finalize behavior / implementation concern;
- App Scenario final-integration continuity.

Not a separate Feature in this selected target.

---

# 22. Behavior Item routing rule

Existing `BI-*` content must not be bulk-renamed.

For each existing BI, classify its semantic owner:

```text
Feature-local expected behavior
→ numbered Feature Main-path row + attached `BR-*`

Feature semantic information/state
→ compact Data beside the owning `Expected application behavior`

cross-Feature identity / result continuity
→ Scenario Requirement

Screen spatial/interaction responsibility
→ Screen owner

implementation feasibility/boundary issue
→ Feature Implementation Concern

Aggregate semantic state/invariant
→ later Aggregate owner pass

production/proof realization constraint
→ later owner-local Requirements pass

legacy-only behavior
→ compatibility/evolution section until retirement
```

Only then select new Requirement IDs when useful.

---

# 23. Scenario document target shape

Target Scenario owner should read as one compact journey.

Recommended form:

```markdown
# SCN-... — <Scenario>

## Application Benefit
...

## Starting context
...

## Journey / expected application behavior

### Main path
| # | Actor / Feature | Behavior | Result / continuity | Requirement |
|---:|---|---|---|---|

Decision after Journey Step N: **<question / decision>?**

| <Path A> | <Path B> | <Path C> |
|---|---|---|
| <first action on path A> | <first action on path B> | <first action on path C> |
| <next action / → common step> | <next action / → common step> | <next action / stop> |

## Benefit closure
...
```

Rules:

- Put `SR-*` next to the exact journey row/branch it constrains; do not repeat them in a separate Requirement catalog.
- Linear journey behavior stays linear.
- Introduce a branch table only where the journey actually branches.
- State one exact journey decision/question, then use one column per path/variant.
- Rows inside each column continue that path; several columns may explicitly converge back to one common journey step.
- Actor choice/reasoning stays in Scenario; Feature behavior is summarized only enough to connect the journey.
- Add Screen/external context only where it materially changes interpretation.

---

# 24. Feature document target shape

Target Feature owner is one compact ordered behavioral flow.

Recommended form:

```markdown
# F-... — <Feature>

## Intent
...

## Principal Result
...

## Expected application behavior

### Data
| Kind | Data |
|---|---|

### Main path
| Behavior step | Requirement(s) |
|---|---|
| **1. ...** | `BR-...` — `<compact logical statement>` |
| **2. ...** | `BR-...` — `<statement>`<br>`BR-...` — `<statement>` |

Decision after/inside Step 2: **<exact question / required choice>?**

| <Path A> | <Path B> | <Path C> |
|---|---|---|
| <first action on path A> | <first action on path B> | <first action on path C> |
| <next action / → Step 3> | <next action / retry Step 2> | <stop / other continuation> |

### Main path — continued
| Behavior step | Requirement(s) |
|---|---|
| **3. ...** | `BR-...` |
```

Rules:

- Main path is the primary Feature representation.
- One row = one semantic behavior step.
- The second column contains one or several `BR-*` identities **plus each Requirement's compact canonical logical statement**; do not make readers resolve the ID elsewhere to understand the rule.
- Do not introduce a separate persistent `Behavior Step` semantic type/ID merely for discovery.
- If a step branches, state one exact decision/question immediately after that step.
- The branch table has one column per path/variant; do not use generic `Outcome`, `Observed result`, or `Behavior / next` columns.
- Rows inside each path column show that path's subsequent actions in order.
- A path column may end with `→ Step N`, retry the current step, Success, or Stop.
- Several path columns may converge explicitly on the same later main-path step.
- Downstream discovery references `Feature + Step N`.
- One candidate method may realize several steps; one step may require Domain + Slice + Shared methods.
- Data stays compactly inside `Expected application behavior` beside the owning Step; no detached Data catalog is required.
- Actor-owned reasoning stays in Scenario.
- Exact realization classes remain downstream in disposable Slice Planning; Domain class/unit-test design remains in separate Aggregate Planning.

---

# 25. Screen distribution target

Exact spatial design remains Screen-owner work. Scenario owners preserve these journey contexts as semantic inputs to the later Screen pass.

## Builder journey

```text
Builder / work-start surface
↓
ChatGPT / repository-work context
↓
Builder package build
↓
Builder review Apply/result
↓
ChatGPT semantic review
↓
handoff / URI
```

## App complete-work journey

```text
handoff / URI / Main Work Window
↓
Apply controls / execution state
↓
optional external GitHub / ChatGPT review
↓
Finalize control + optional final comment
↓
GitHub integrated/finalized result
```

## Snapshot journey

```text
Main Work Window
↓
Snapshot Dialog
├─ Working Local Tree + Diff
└─ Commit Snapshot
↓
export result
↓
optional ChatGPT attach/send
```

The later Screen pass may choose user-facing labels. If it changes the current `Local / Committed` labels, the labels must still map unambiguously to these two Feature modes:

```text
Working Local Tree + Diff
Commit Snapshot
```

if selected in the UI pass.

---

# 26. Evolution interpretation for product migration

The product-documentation migration itself is Evolution.

Likely Evolution Kinds include:

```text
Introduction
- Builder Start Work Feature owner
- Builder Apply-for-Review Feature owner
- explicit target Feature owners where none existed

Refactoring
- FI-centered Scenario ownership → Feature-centered authority
- Scenario files become journey/composition owners
- reviewed-result verification moves under Apply correctness/Scenario continuity
- Snapshot semantics clarified without changing its core Benefit

Forced Migration
- old FI/BI representation where it cannot remain authoritative beside target Feature owners
- legacy Current Change approval/finalization semantics when incompatible with reviewed target flow

Retirement
- permanent duplicate planned Complete Reviewed Scenario after folding into canonical Scenario
- standalone legacy Provide Current Change Scenario once its independent Benefit disappears
- obsolete FI semantic types after owner content is fully reconciled
```

## Future Evolution — edit Work Issue body through Builder

The future Feature is now explicitly defined above as:

`F-BLDR-EDIT-WORK-ISSUE`

Canonical Evolution Step:

`EVO-BLDR-EDIT-DURABLE-WORK-ISSUE`

Evolution Kind:

`Introduction`

It remains optional/non-core to the primary Builder Scenario, but it is a first-class future Feature boundary rather than only a note.

Do not make a competing migration roadmap.

Attach the actual product-documentation migration to the canonical Evolution Step(s) selected for this qualitative application/documentation state change.

---

# 27. Target directory shape

Suggested target product shape after migration.

## Replacement Package Builder

```text
planning/documentation/replacement-package-builder/
├── README.md
├── features/
│   ├── README.md
│   ├── F-BLDR-START-REPOSITORY-WORK.md
│   ├── F-BLDR-BUILD-REPLACEMENT-PACKAGE.md
│   ├── F-BLDR-APPLY-PACKAGE-FOR-REVIEW.md
│   ├── F-BLDR-ADD-ISSUE-REVIEW-COMMENT.md
│   └── planned/
│       └── F-BLDR-EDIT-WORK-ISSUE.md
└── scenarios/
    └── SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE.md
```

## Replacement Package App

```text
planning/documentation/tools/replacement-package-app/
├── README.md
├── features/
│   ├── README.md
│   ├── F-RPKG-APPLY-REPLACEMENT-PACKAGE.md
│   ├── F-RPKG-FINALIZE-REPOSITORY-WORK.md
│   ├── F-RPKG-EXPORT-REPOSITORY-SNAPSHOT.md
│   └── F-RPKG-INSPECT-CURRENT-CHANGE.md
└── scenarios/
    ├── README.md
    ├── SCN-RPKG-COMPLETE-REPOSITORY-WORK.md
    ├── SCN-RPKG-PROVIDE-REPOSITORY-CONTEXT.md
    └── SCN-RPKG-PROVIDE-CURRENT-CHANGE.md   # legacy until retirement
```

The existing planned duplicate complete-reviewed Scenario may remain temporarily as migration source material, but target authority is the canonical complete-work Scenario.

**OPEN target detail — future Feature document placement.** The shown `features/planned/` placement for `F-BLDR-EDIT-WORK-ISSUE` is illustrative only. Its semantic owner is the canonical Evolution Step `EVO-BLDR-EDIT-DURABLE-WORK-ISSUE`; exact physical documentation placement must follow the selected Evolution/documentation ownership convention rather than being inferred from this tree.

---

# 28. Explicit non-Features in this target

Do not create standalone Features merely for:

```text
resolve exact current repository work
establish exact package source
develop candidate
provide handoff
URI activation
copy/paste handoff
apply files stage
commit stage
publish stage
review-result verification stage
ensure PR stage
snapshot attach
snapshot send
```

unless later boundary evidence demonstrates an independent user/application intent and principal Result.

Their selected target roles are currently:

- Feature behavior/module;
- Feature `Expected application behavior` Data/row + attached `BR-*`;
- Scenario composition;
- external actor/context;
- implementation concern;
- shared downstream capability.

`Add Issue Review Comment` is explicitly **not** in this list: it is selected as a separate Builder Feature.

`Edit Work Issue body` is also not collapsed into another Feature; it is a future Feature Introduction recorded in Evolution rather than part of the current core target journey.

---

# 29. Cross-application contract direction

The critical Builder → App semantic bridge is:

```text
Builder Start Work
↓
exact `changeSetId` + Work Issue + recorded work branch

Builder Build
↓
exact package

Builder Apply-for-Review
↓
exact predicted result

external semantic review
├─ deficiency → Add Issue Review Comment → correction loop
└─ approvable
   ↓
exact reviewed tuple:
(`changeSetId`,
 Work Issue,
 work branch,
 `packageId`,
 expected source,
 reviewed expected result)

+
current ordinary Work Issue text
↓
ChatGPT interprets relevant human/work instructions
↓
ChatGPT emits exact handoff / URI

App Apply
↓
exact actual established/published result

↓ optional pause/review

App Finalize
↓
terminal integrated work
```

The Builder and App Scenario owners document the cross-application continuity values shown above.

Neither application duplicates the other application's internal Feature behavior; each side references the semantic inputs/results crossing the boundary.

---

# 30. Selected Snapshot clarification summary

This section is only a consistency summary of `F-RPKG-EXPORT-REPOSITORY-SNAPSHOT`; the Feature `Expected application behavior` above is the canonical behavior owner.

## Working Local Tree + Diff

```text
source authority:
actual local files on this machine

snapshot/**
= captured local file bytes

BASE-COMMIT.txt
= frozen HEAD used as baseline

WORKING-TREE.diff
= diff from frozen HEAD to the same captured local working-tree result
```

It is not a GitHub snapshot.

It is not merely a committed branch snapshot.

It is not an index snapshot.

Git is used to understand/verify the repository and derive the baseline/diff; the file content being exported is the actual coherent local working-tree state.

## Commit Snapshot

```text
source authority:
one exact resolved commit

snapshot/**
= exact file content from that commit

COMMIT.txt
= resolved full commit SHA
```

Local machine modifications do not affect committed Snapshot bytes.

---

# 31. Migration completion condition

The Feature/Scenario product migration is complete only when:

1. target Feature owners exist and contain the detailed application behavior currently scattered through Scenario/FI/BI documents;
2. target Scenario owners are thin journey/composition authorities;
3. Builder core Feature boundaries are explicit: Start Work, Build Package, Apply Package for Review, and Add Issue Review Comment;
4. App Apply and Finalize remain separate Features;
5. one activation composing Apply + Finalize is documented as a selected exception;
6. Snapshot is a separate Feature and separate Scenario;
7. Local Snapshot explicitly means actual local machine working-tree file state;
8. Commit Snapshot explicitly means exact selected commit state;
9. existing behavior/requirements have been semantically routed rather than mechanically renamed;
10. target reviewed-result continuity is preserved across Builder → App;
11. legacy Current Change truth remains explicit until its retirement Evolution is actually selected/applied;
12. product docs do not claim Slice/Aggregate/Shared/code migration that has not yet been performed;
13. Builder Start Work accepts ordinary Issue title/body text selected by ChatGPT and does not invent structured handoff/URI policy fields;
14. Builder Scenario explicitly models human → ChatGPT → Builder interaction, including ChatGPT deciding what ordinary Issue prose to write and later reading/interpreting that Issue text before handoff/URI generation;
15. handoff and URI preserve the same selected Apply/Finalize modularity;
16. Builder has a separate Add Issue Review Comment Feature for material review findings;
17. future Work Issue body editing is recorded as a separate Feature Introduction in Evolution rather than conflated with review comments;
18. target branch, recorded work branch, exact package source revision and isolated review workspace remain explicitly different and are not substituted for one another;
19. `F-BLDR-EDIT-WORK-ISSUE` exists explicitly as a future Evolution Feature with its own Intent, Result and boundary, separate from Start Work and Add Issue Review Comment;
20. the Work Issue clearly separates actor-owned prose from Builder-managed identity text (`ChangeSet-Id`, work branch, target branch, Start Work base commit);
21. unresolved Finalize integration/order/post-change-review choices are explicitly marked `OPEN target detail` rather than described with ambiguous alternatives;
22. normative Requirements use concrete identifiers/states where known and do not rely on undefined shorthand such as "work context", "current result" or "selected semantics".

---

# 32. Branching integrity summary

This target does not select exact branch naming, but it does select branch **roles and invariants**.

## Roles

```text
Target branch
- exact branch selected before Start Work
- its resolved commit is the base for the new work branch
- Finalize later integrates the work into this branch

Work branch
- one branch created by Start Repository Work for this logical work
- its exact name is recorded in the Work Issue
- package publication for this work updates this branch before Finalize

Package expected source revision
- one exact immutable revision used to define one package iteration

Review workspace
- isolated reconstructed state used by Apply-for-Review
- disposable/supporting state, not the durable work branch
```

## New work

```text
human instruction
↓
exact target branch/source selected
↓
Start Work
↓
one work Issue
+
one work branch from exact selected source
```

Start Work must resolve the explicitly selected target branch. The currently checked-out branch/commit must not influence the new work-branch base.

## Iteration

```text
work branch exact revision C1
↓
Build package P1 for C1
↓
Apply-for-Review in isolated workspace
↓
review predicted T1
```

If review requires correction before `APPROVABLE`:

```text
recorded work branch remains at C1
+
package expectedSource remains C1
↓
correct desired resulting files / package inputs
↓
Build new P2 with new packageId for the same C1 source
↓
fresh Apply-for-Review
↓
new predicted result T2
```

The Builder review loop does not advance the recorded work branch. The reviewed package is later realized onto that branch by App Apply.

## Consumer Apply

Handoff/URI binds the exact repository, `changeSetId`, Work Issue, recorded work branch, target branch, packageId/archive, expected-source commit, reviewed-result identity, Apply extent and automatic-Finalize choice.

App must not replace:

- reviewed package with "latest ZIP";
- work branch with a same-name/similar branch;
- target branch with current checkout;
- expected source with current branch HEAD merely because it moved.

## Package production after `APPROVABLE`

For the current selected producer-continuity rule:

```text
package P is reviewed
↓
APPROVABLE
↓
P is frozen for handoff
↓
no later package is built under that same changeSetId
```

If repository work later requires another replacement package after `APPROVABLE`/consumer publication, that package belongs to new logical work with a new `changeSetId`.

A future Evolution may deliberately introduce another continuation model, but this target must not assume it.

## Finalize

```text
exact current work branch/result
↓
selected target branch
↓
Finalize
↓
integrated terminal work
```

If the current target branch cannot accept the exact work result under the later-selected integration mechanism without an explicit conflict/review decision, Finalize stops and reports that condition. It must not change branch selection or resolve conflicts implicitly.

The later Feature/Slice/Aggregate/Shared pass rechecks where branch-management implementation responsibility belongs. This target selects only the behavioral invariants above.

---

# 33. Source meaning preserved from current documentation

This target intentionally preserves the accepted current Snapshot contract meaning that:

- Local Snapshot includes tracked-existing and untracked non-ignored files;
- tracked local deletions are absent from `snapshot/**` and represented through `WORKING-TREE.diff`;
- ignored untracked files and `.git/**` are excluded;
- local capture must be coherent or fail without a mixed ZIP;
- Committed Snapshot resolves one exact commit and is independent of local dirty/staged/untracked state;
- Snapshot export is repository-read-only;
- optional delivery happens after successful export and cannot invalidate the exported artifact.

The target adds the explicit semantic clarification that the Local mode's content authority is the **actual local working-tree files on the machine**.

