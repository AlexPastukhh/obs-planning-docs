# SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE

Status: planned future Scenario draft

Current implementation authority remains in the existing producer command/use-case/workflow and current Replacement Package App behavior until this target Scenario and its consumer dependencies are implemented, proved and promoted.

## Application Benefit / Desired Result

Create one exact repository work for a user task and obtain one exact replacement package whose actual package result has been deterministically reproduced and semantically reviewed before real repository mutation is authorized.

The desired result is:

```text
one exact repository work
+
one exact source revision
+
one exact package
+
one reproduced package result
+
ChatGPT semantic approval of that reproduced result
↓
one exact consumer handoff rendered from Builder-provided identities
```

Correction attempts before approval do not require repository content commits or pushes.

---

# Scenario Inputs

ChatGPT supplies the semantic start input:

```text
Repository
Target branch
Task / Goal / Why / Acceptance
Handoff Intent
```

`Handoff Intent` is semantic text for ChatGPT continuity. It describes what consumer route should be rendered after an `APPROVABLE` review.

Examples:

```text
After APPROVABLE, render a handoff that only applies the package.
Do not commit or push automatically.
```

```text
After APPROVABLE, render a handoff that fully applies, commits and pushes
the reviewed package, but leaves final integration/Issue closure for later.
```

```text
After APPROVABLE, render a handoff that completes the full consumer route,
including final integration and Issue closure.
```

Replacement Package App does not interpret this free text. ChatGPT later reads it and renders one concrete consumer handoff.

---

# Scenario Process / Feature Interaction Map

```text
Repository + Target Branch + Task / Goal / Why / Acceptance + Handoff Intent
        ↓

FI-BLDR-START-REPOSITORY-WORK
        ↓
GitHub Issue + exact source C0 + new work branch
        ↓

[EXTERNAL CHATGPT REPOSITORY-DEVELOPMENT PROCESS]
ChatGPT independently develops the Intended Repository Result
using the Issue/work context.
This process is not a Builder Feature Interaction.
        ↓
Intended Repository Result
        ↓

FI-BLDR-BUILD-EXACT-REPLACEMENT-PACKAGE
        ↓
Exact Package Pn
        ↓

FI-BLDR-REVIEW-EXACT-PACKAGE-RESULT
        ↓
Reproduced Result Tn
+
review material
+
exact handoff values
        ↓

ChatGPT semantic decision
├─ NEEDS_CORRECTION
│    ↓
│  external ChatGPT development continues
│    ↓
│  corrected Intended Repository Result
│    ↓
│  NEW package / packageId
│    ↓
│  replay and review again
│
└─ APPROVABLE
     ↓
   ChatGPT re-reads persisted Handoff Intent
     ↓
   render requested concrete consumer handoff
   using exact Builder-provided technical values
     ↓
   Replacement Package App
     ↓
   Builder Scenario STOP
```

---

# FI-BLDR-START-REPOSITORY-WORK

## Scenario Role / Local Purpose

Create one new isolated repository work from the selected target branch and make its durable semantic/exact context available to ChatGPT.

Every invocation starts new work.

It does not adopt an existing Issue or reuse an existing work branch.

## Required Inputs

```text
repository
targetBranch
issueTitle
Goal / Why / Acceptance
handoffIntent
```

## Interaction Process

```text
resolve current targetBranch HEAD
↓
exact source commit C0
↓
create NEW GitHub Issue #N
↓
create NEW work branch for Issue #N from exact C0
↓
persist semantic + managed work context in the Issue
↓
return Issue/work context
```

A deterministic work-branch naming rule may be used, for example:

```text
issue/<issueNumber>
```

The exact naming convention is implementation design, not Scenario behavior authority.

## Durable Issue Context

The Issue is repository-scoped.

Semantic context for ChatGPT:

```text
Goal
Why / context
Acceptance
Handoff Intent
```

Managed exact work context:

```text
Repository
Target branch
Source commit
Work branch
```

Conceptually:

```text
Issue #153
├─ Goal: ...
├─ Why: ...
├─ Acceptance: ...
├─ Handoff Intent: ...
│
└─ Managed Work Context
   ├─ Repository: github:owner/repo
   ├─ Target branch: main
   ├─ Source commit: C0
   └─ Work branch: issue/153
```

`Target branch` is persisted so later integration can address the intended target without inferring it from current checkout state.

`Source commit` is the exact target-branch revision from which this repository work started.

`Work branch` is the branch belonging to this repository work.

## Result

```text
Repository Work
├─ GitHub Issue #N
├─ targetBranch
├─ sourceCommit = C0
├─ workBranch
└─ Handoff Intent
```

The work branch is based exactly on `C0`.

No repository content commit or push is required by this FI.

## Behavior Items

### BI-BLDR-START-WORK-CREATES-NEW-ISSUE

Each Start Repository Work interaction creates one new GitHub Issue for the new logical repository work rather than silently adopting an existing Issue.

### BI-BLDR-START-WORK-CREATES-NEW-WORK-BRANCH

Each new repository work receives one new work branch created from the selected target branch's exact resolved source revision.

### BI-BLDR-WORK-SOURCE-IS-EXACT

The target branch is resolved to one exact immutable source revision `C0`; later movement of the target branch does not silently rewrite this work's source identity.

### BI-BLDR-WORK-CONTEXT-IS-DURABLE

The Issue must make the repository, target branch, exact source revision and work branch durably recoverable for the same or another ChatGPT session.

### BI-BLDR-HANDOFF-INTENT-IS-DURABLE

The semantic Handoff Intent must be durably available from the same Issue so ChatGPT does not depend on memory of the original conversation when selecting the post-review consumer route.

---

# External ChatGPT Repository-Development Process

This is intentionally **not** a Builder Feature Interaction.

Builder does not own how ChatGPT develops the repository result.

ChatGPT uses the established Issue/work context and independently:

```text
reads the Issue
↓
uses the correct repository/work branch/source context
↓
reads and analyzes repository content
↓
chooses the required changes
↓
edits the work result
↓
performs whatever development reasoning/proof its external workflow requires
↓
reaches an Intended Repository Result
```

Builder does not prescribe:

- repository search/read strategy;
- reasoning process;
- file selection;
- implementation/documentation authoring;
- semantic development checks;
- internal ChatGPT tool orchestration.

The only Scenario-level requirement is that the result supplied back to Builder belongs to the exact repository work established by `FI-BLDR-START-REPOSITORY-WORK`.

This external process may be performed by the same ChatGPT session that later reviews the package result or by another authorized ChatGPT session with sufficient Issue/repository context.

---

# FI-BLDR-BUILD-EXACT-REPLACEMENT-PACKAGE

## Scenario Role / Local Purpose

Convert the Intended Repository Result into one complete exact replacement package according to the replacement-package protocol.

## Required Inputs

```text
Repository Work
├─ repository
├─ Issue
├─ sourceCommit = C0
└─ workBranch / intended working result

Intended Repository Result
required package/work metadata
```

ChatGPT does not provide authoritative `add` / `replace` / `delete` operations.

Builder derives the package from exact source versus intended result.

## Interaction Process

```text
independently obtain exact C0
+
read Intended Repository Result
↓
derive exact repository delta
↓
add / replace / delete
↓
read exact source bytes from C0
↓
read exact resulting bytes from Intended Repository Result
↓
materialize PACKAGE.json
+
base-files/
+
replacement-files/
↓
validate complete package
↓
exact package Pn
```

Package construction is read-only with respect to the exact source state.

Every newly materialized ZIP receives a new `packageId`.

A material correction to the Intended Repository Result requires a new package.

## Result

One exact validated replacement package `Pn` exists.

## Behavior Items

### BI-BLDR-EXACT-BUILD-SOURCE

Package construction is defined against the exact source revision established for the repository work, not against a later moving branch tip.

### BI-BLDR-NO-GUESSED-TOUCHED-BASE

Base bytes for replace/delete semantics come from the exact source revision and are never guessed or reconstructed from informal context.

### BI-BLDR-PACKAGE-IS-COMPLETE

Package operations and payloads completely represent the resulting file bytes required by the Intended Repository Result.

### BI-BLDR-NEW-ZIP-NEW-PACKAGE-ID

Every new concrete package ZIP receives a new `packageId`.

### BI-BLDR-PACKAGE-CARRIES-EXACT-APPLICABILITY

The package carries enough exact applicability information for the consumer/replay boundary to reject the wrong source rather than silently applying against another repository state.

---

# FI-BLDR-REVIEW-EXACT-PACKAGE-RESULT

## Scenario Role / Local Purpose

Determine what the exact package actually produces and make that exact reproduced result available for ChatGPT semantic review against the current Issue.

The review is of package behavior, not merely of the Intended Repository Result used to construct the package.

## Required Inputs

```text
current GitHub Issue / semantic work intent
exact expected source C0
exact package Pn
```

## Canonical Package-Application Semantics

Behavioral requirement:

> Builder replay and Replacement Package App real Apply must obey the same canonical replacement-package semantics.

Independent implementations must not be assumed equivalent without proof.

The Scenario does **not** select the implementation shape.

The implementation-feasibility question and current candidate shapes are retained under `Realization Dependencies / Questions / Candidates` below so downstream Shared/Slice planning can resolve them without turning a candidate HOW into Scenario authority.

## Deterministic Replay Process

```text
obtain/materialize clean exact C0
+
exact package Pn
↓
apply using canonical package semantics
↓
Reproduced Result Tn
```

The replay source must not contain residual Intended Repository Result edits or mutations from an earlier replay.

`Tn` is authoritative semantic-review input.

The original Intended Repository Result is not proof of what the package actually produces.

## Review Material

Builder derives:

```text
Review Result
├─ repository work / Issue identity
├─ package archive / packageId = Pn
├─ expectedSource = C0
├─ expectedResult = Tn
├─ targetBranch
├─ workBranch
├─ diff C0 → Tn
├─ full resulting repository state Tn
└─ exact technical values required to render consumer handoff
```

If the same still-open work later contains multiple published reviewed revisions, review material may additionally expose:

```text
latest delta:
current expected source → Tn

cumulative delta:
original work base → Tn
```

For the first revision from `C0`, `C0 → Tn` is both the latest and whole-work delta.

## Semantic Review Boundary

Builder does not decide semantic correctness.

ChatGPT reviews:

```text
current Issue
+
exact package identity
+
replay-derived diff
+
full Reproduced Result Tn
+
relevant repository context
```

and decides:

```text
NEEDS_CORRECTION
or
APPROVABLE
```

### NEEDS_CORRECTION

No ordinary Apply handoff is eligible.

External ChatGPT repository development continues for the same repository work.

The corrected Intended Repository Result must be packaged again as a **new** ZIP with a **new** `packageId`, replayed again and reviewed again.

### APPROVABLE

Approval binds to:

```text
Repository Work / Issue
+
packageId Pn
+
expectedSource C0
+
expectedResult Tn
```

No equivalent rebuild may substitute another ZIP after approval.

Builder has already supplied the exact technical values needed for a consumer handoff.

ChatGPT re-reads the current Issue, including `Handoff Intent`, chooses the corresponding consumer-defined route and renders the handoff using only those exact Builder-provided identities.

Handoff rendering is serialization/orchestration by ChatGPT, not a separate Builder FI and not a new package operation.

## Result

Either:

```text
NEEDS_CORRECTION
```

with no consumer handoff,

or:

```text
APPROVABLE
↓
re-read Handoff Intent
↓
render concrete consumer handoff
using exact Builder-provided identities
↓
Replacement Package App
↓
Builder Scenario STOP
```

## Behavior Items

### BI-BLDR-REVIEW-EXACT-SAME-PACKAGE

Semantic review is based on replay of the exact package that may later be handed to the consumer.

### BI-BLDR-REPLAY-EXACT-EXPECTED-SOURCE

Replay begins from the exact source expected by the package/repository work.

### BI-BLDR-REPLAY-FRESH-WORKSPACE

Replay uses a clean source state uncontaminated by external development edits or prior replay attempts.

### BI-BLDR-REPLAY-USES-CANONICAL-PACKAGE-SEMANTICS

Replay semantics must be the same canonical replacement-package semantics relied on by consumer Apply, with implementation/conformance proof sufficient to prevent semantic drift.

### BI-BLDR-REVIEW-FULL-RESULT

ChatGPT must be able to inspect the full reproduced repository result, not only a patch.

### BI-BLDR-CORRECTION-REQUIRES-NEW-PACKAGE

A material correction requires a new package identity and a new replay/review result.

### BI-BLDR-NO-REBUILD-AFTER-APPROVAL

After `APPROVABLE`, the exact reviewed package is the eligible package; a supposedly equivalent rebuild is not a substitute.

### BI-BLDR-APPROVAL-BINDS-EXACT-RESULT

`APPROVABLE` binds the exact repository work, package identity, expected source and reproduced result identity.

### BI-BLDR-HANDOFF-VALUES-COME-FROM-REVIEW

Technical identities used when ChatGPT renders the consumer handoff come from the exact Builder Review Result rather than being recomputed or recalled from conversation memory.

---

# Realization Dependencies / Questions / Candidates

These entries are Scenario-owned **implementation-feasibility memory**, not Behavior Items and not implementation authority.

They exist because the selected Builder runtime process depends on technical capabilities that must be credible before Domain/Slice/Shared implementation planning can safely freeze the realization.

A candidate below does not become `DI-*`, `SI-*`, Shared Implementation ownership or source architecture merely because it is listed here.

## Builder authenticated GitHub interaction

Relevant Scenario / FI behavior:

```text
FI-BLDR-START-REPOSITORY-WORK
→ create a new GitHub Issue
→ create a new work branch from exact C0
→ persist managed repository-work context

EVO-BLDR-ALLOW-WORK-INTENT-REFINEMENT
→ update controlled Issue semantic context

EVO-BLDR-PERSIST-SEMANTIC-REVIEW-HISTORY
→ append immutable Review Record comments
```

Dependency / Question — preserved planning example:

> **Как можно сделать, чтобы Builder вообще взаимодействовал с GitHub? Надо ли какой-то token ему давать?**

This is purely an implementation detail, but the answer matters to whether it is sensible to keep developing a Scenario in which Builder itself performs authenticated GitHub operations.

Current assumption / candidate realization:

Builder can be given or can reuse an authenticated GitHub capability in its real runtime environment. Possible mechanisms may include an already-authenticated `gh`/host environment, an API/OAuth/token-based capability, or another host-provided integration.

No credential mechanism, token storage model, API client, connector or deployment shape is selected by this Scenario.

Investigate during:
- Shared Implementation / infrastructure capability planning for authenticated GitHub operations;
- Slice planning for Start Work / Issue update orchestration;
- source/runtime investigation of the actual Builder deployment environment;
- Domain planning only if investigation exposes durable semantic identity/authority state rather than ordinary credentials/infrastructure.

Scenario impact if invalidated:

If Builder cannot reliably perform the required authenticated GitHub interactions in the intended runtime boundary, revisit `FI-BLDR-START-REPOSITORY-WORK` ownership/process and the later Issue-update path instead of forcing an unsuitable authentication mechanism merely to preserve the current FI map.

## Canonical package semantics across Builder replay and App Apply

Relevant Scenario / FI behavior:

```text
FI-BLDR-REVIEW-EXACT-PACKAGE-RESULT
BI-BLDR-REPLAY-USES-CANONICAL-PACKAGE-SEMANTICS
```

Dependency / Question:

Can Builder replay and Replacement Package App real Apply be implemented with sufficiently identical package semantics that the replayed result is credible proof of what the consumer will realize?

Current assumption / candidate realizations:
- one shared package-application module/library/engine used by Builder and App;
- separate adapters over one shared core;
- separate implementations with strong shared conformance vectors/proof if runtime sharing is genuinely impractical.

A shared module is a strong candidate, not a selected Scenario HOW requirement.

Investigate during:
- Shared Implementation planning first, because a real reusable canonical package-semantics responsibility may exist;
- Slice/source planning for runtime adapters and proof boundaries;
- testing strategy/conformance design where physical sharing is not selected.

Scenario impact if invalidated:

If no implementation shape can provide credible semantic equivalence, revisit the deterministic replay/review contract; the Scenario must not claim package-result review as authorization evidence while consumer Apply can materially diverge.

## Exact clean source/replay materialization

Relevant Scenario / FI behavior:

```text
FI-BLDR-BUILD-EXACT-REPLACEMENT-PACKAGE
FI-BLDR-REVIEW-EXACT-PACKAGE-RESULT
```

Dependency / Question:

Can Builder reliably materialize/read the exact source revision `C0`, the intended work result and a fresh replay workspace without contamination from development edits or prior replay attempts?

Current assumption:

The implementation environment can obtain exact Git revision content and create an isolated/fresh filesystem or worktree-like replay boundary. The exact Git/worktree/temp-directory algorithm is not selected here.

Investigate during:
- Domain planning only for durable repository/source identity semantics;
- Slice/Shared implementation planning for repository materialization/isolation mechanics;
- source/runtime investigation for platform-specific Git/filesystem constraints.

Scenario impact if invalidated:

If the runtime cannot provide exact/fresh materialization with credible isolation, revise the Build/Replay process or runtime boundary before treating the Scenario as implementable.

---

# Planned Evolution Steps

These are canonical Scenario-level planned behavioral changes.

They are **not current selected Scenario behavior** and are **not evidence of implementation**.

Their HOW remains deferred to implementation planning.

## EVO-BLDR-ALLOW-WORK-INTENT-REFINEMENT

Status: PLANNED

### Intent

Allow the same still-open repository work to refine its durable semantic work intent during development without creating a new Issue.

### Change

Current selected behavior:

```text
Start Work establishes Issue semantic intent
↓
ChatGPT reads that intent during development/review
```

Planned behavior:

```text
Start Work establishes Issue semantic intent
↓
development discovers a required semantic clarification
↓
authorized refinement of the same Issue's semantic work intent
↓
development/review continues against the refined intent
```

Refinement may change semantic meaning such as:

```text
Goal
Why / context
Acceptance
explicit scope clarification
Handoff Intent
```

It must not act as authority to silently replace exact repository-work identity/context such as:

```text
repository
targetBranch
sourceCommit
workBranch
```

### Scenario-Level Delta

The external ChatGPT development/review workflow gains an explicit durable refinement path for the same repository work.

No new Issue/work branch is created merely because semantic intent is clarified.

---

## EVO-BLDR-PERSIST-SEMANTIC-REVIEW-HISTORY

Status: PLANNED

### Intent

Persist meaningful semantic-review results in the repository Issue so the same or another ChatGPT session can understand what was reviewed, what failed, how earlier findings were resolved, what new findings appeared and what the final reviewer considered important without relying on prior chat memory.

### Change

Current selected behavior:

```text
Builder produces exact review material
↓
ChatGPT decides NEEDS_CORRECTION / APPROVABLE
↓
workflow continues
```

Planned behavior:

```text
Builder produces exact review material
↓
ChatGPT performs one full semantic review
↓
Builder-side repository-work workflow appends
one NEW immutable Issue comment:
    ## Review Record
↓
correction or approved handoff continues
```

A published Review Record is historical evidence and is not edited later.

Each later Review Record may describe both:

```text
disposition of findings from earlier Review Records
+
new findings discovered by this review
```

For example:

```text
## Review Record

Decision: NEEDS_CORRECTION

Previous findings:
- R1-F1 — RESOLVED
- R1-F2 — STILL_OPEN

New findings:
- R2-F1 — ...

Checked:
- ...

Important notes:
- ...
```

A later `APPROVABLE` record may close the chain:

```text
## Review Record

Decision: APPROVABLE

Previous findings:
- R2-F1 — RESOLVED

New blocking findings:
- none

Checked:
- ...

Important notes:
- ...
```

The exact finding-reference notation is an implementation/design detail; the behavioral requirement is that later records can unambiguously explain the state of material earlier findings.

If an earlier review statement itself is later found to be wrong, the correction is written in a new Review Record rather than by rewriting the old comment.

The Review Record framing is system-owned:

```text
fixed Markdown heading:
## Review Record
```

ChatGPT supplies semantic review content such as:

```text
decision
what was checked
finding dispositions
new findings
important notes
```

Builder/review workflow supplies or binds exact technical review identity from the exact Review Result, such as:

```text
repository work / Issue identity
packageId
expectedSource
expectedResult
```

ChatGPT must not be required to manually reproduce those exact identifiers from memory in prose.

### Scenario-Level Delta

Repository work gains an append-only semantic review history in GitHub Issue comments.

The same or another ChatGPT session can reconstruct the review progression without access to the previous conversation.

Review-history persistence remains independent from deterministic replay correctness and is not itself a prerequisite for consumer Apply/Finalize correctness unless a later Evolution Step explicitly changes that rule.

---

# Future Issue-Update Realization Direction — Non-Authoritative

The planned Issue evolutions require controlled mutation of the exact repository work Issue.

Ordinary workflow must not give ChatGPT unrestricted arbitrary replacement of the whole Issue body.

The Scenario deliberately does **not** select a current DI/SI/shared implementation item, but the behavioral distinction is now clear:

```text
current semantic work state
→ controlled update of owned Issue-body sections

historical review evidence
→ append NEW Issue comment
→ never edit an earlier Review Record
```

A likely future controlled capability shape is:

```text
ChatGPT supplies semantic update content
↓
address exact repository + Issue
↓
protect managed exact work context
↓
perform the selected update kind
↓
re-read / verify resulting GitHub state
```

Expected update kinds:

```text
Refine Work Intent
→ controlled edit of semantic Issue-body sections

Append Review Record
→ Builder-side append of a NEW Issue comment
→ fixed heading: ## Review Record
```

The exact code/module owner remains implementation design. It may be Builder-owned for review-side operations or later share lower-level GitHub issue mechanics with Replacement Package App if implementation discovery shows genuine reusable responsibility.

This section is not a canonical DI/SI/shared implementation requirement.

---

# Consumer Handoff Boundary — Reference Only

Replacement Package App owns the canonical meaning of concrete post-review execution routes, modular/manual continuation, Commit/Push semantics, PR integration, Finalize, final logging and Issue closure.

Canonical planned consumer owner:

[`planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md`](planned/SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md)

Builder requirements at this boundary are limited to:

1. `Handoff Intent` remains durably available in the repository Issue as semantic guidance for ChatGPT.
2. After `APPROVABLE`, ChatGPT re-reads that intent and selects one consumer-defined concrete route.
3. Technical handoff identities come from the exact Builder Review Result and are not recomputed from chat memory.
4. If the selected consumer route requires semantic stage inputs such as a commit message, PR text or final Issue summary, ChatGPT may prepare those values for the handoff.
5. Builder does not redefine App Apply/Commit/Push/PR/Finalize semantics.

The App does not interpret free-text `Handoff Intent`; it executes the concrete handoff route rendered by ChatGPT.

---

# Responsibility Summary

```text
ChatGPT
├─ understands user task
├─ supplies repository / target / Issue semantic text / Handoff Intent
├─ follows GitHub Issue as durable work context
├─ independently develops Intended Repository Result outside Builder
├─ performs semantic review of reproduced package result
├─ when Review History evolution is active, supplies semantic Review Record content
├─ after APPROVABLE re-reads Handoff Intent
└─ renders the selected consumer route + required semantic inputs using exact Builder-provided identities

Builder
├─ starts one exact repository work
├─ creates new GitHub Issue
├─ creates new work branch from exact target-branch source
├─ persists durable work context + Handoff Intent
├─ builds exact replacement package
├─ deterministically replays exact package
├─ derives exact review material
├─ when Review History evolution is active, appends immutable ## Review Record comments
└─ returns exact technical handoff values

Replacement Package App
└─ owns concrete consumer route, modular continuation, publication, PR, Finalize, final logging and Issue-closure behavior
```

---

# Feature Interactions

The selected Builder Scenario has three Feature Interactions:

1. `FI-BLDR-START-REPOSITORY-WORK`
2. `FI-BLDR-BUILD-EXACT-REPLACEMENT-PACKAGE`
3. `FI-BLDR-REVIEW-EXACT-PACKAGE-RESULT`

The required external ChatGPT repository-development process is shown in the Scenario Process but is not a Builder FI.

User-facing progression:

```text
Create exact repository work
↓
[ChatGPT independently develops intended result]
↓
Build exact package
↓
Reproduce and semantically review exact package result
↓
if APPROVABLE:
render exact requested consumer handoff
```
