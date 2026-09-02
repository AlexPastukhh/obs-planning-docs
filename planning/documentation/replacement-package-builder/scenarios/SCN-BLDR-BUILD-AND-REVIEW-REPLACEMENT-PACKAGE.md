# SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE

Status: planned future Scenario owner
Current implementation authority remains in the existing command/use-case/workflow until this target behavior is implemented and promoted.

## Application Benefit / Desired Result

The user receives one exact replacement package that is safe to hand to the consumer because the result of applying that exact package to its exact expected source has already been reconstructed and semantically reviewed.

The Scenario should prevent AI/self-review correction attempts from becoming unnecessary Git commits or PR history.

## Process Specification

### Scenario Process / Feature Interaction Map

```text
FI-BLDR-ESTABLISH-EXACT-BUILD-CONTEXT
↓
FI-BLDR-DEVELOP-CANDIDATE
↓
FI-BLDR-BUILD-EXACT-PACKAGE
↓
FI-BLDR-REPLAY-AND-REVIEW-PACKAGE-RESULT
├─ NEEDS_CORRECTION
│    ↓
│  FI-BLDR-DEVELOP-CANDIDATE
│    ↓
│  FI-BLDR-BUILD-EXACT-PACKAGE
│    ↓
│  FI-BLDR-REPLAY-AND-REVIEW-PACKAGE-RESULT
│
└─ APPROVABLE
     ↓
FI-BLDR-PROVIDE-APPLY-HANDOFF
```

A corrected candidate always creates a new package and is replayed/reviewed again.

Failed candidate/package attempts do not need to become durable repository history by default.

---

### FI-BLDR-ESTABLISH-EXACT-BUILD-CONTEXT

Scenario Role / Local Purpose:

Establish the exact repository/source state against which the candidate and package are defined.

Interaction Process:

```text
repository identity
+
target branch / ChangeSet context
+
exact expected source revision
↓
verify readable exact source
↓
fix expected source identity for this candidate
```

For a continuation of an active ChangeSet:

```text
baseCommit = C0
current published tip / expected source = C1
```

For the first package:

```text
C1 = C0
```

Result:

One exact build/replay source revision is selected and available.

### Behavior Items — selected

#### BI-BLDR-EXACT-BUILD-SOURCE
Requirement:
Candidate/package behavior must be derived from an exact identified source state rather than an assumed or moving repository state.

Reason:
Replay, review and later consumer verification are meaningful only when all of them refer to the same source identity.

#### BI-BLDR-NO-GUESSED-TOUCHED-BASE
Requirement:
The Builder must not guess expected base content for a package operation.

Reason:
Package applicability and replay must fail closed when exact touched-source content is unavailable.

---

### FI-BLDR-DEVELOP-CANDIDATE

Scenario Role / Local Purpose:

Produce the intended complete resulting repository content for the requested change before package materialization.

Interaction Process:

```text
exact source
+
task / selected intent
↓
targeted repository analysis
↓
candidate resulting files
↓
candidate ready for package materialization
```

Result:

A candidate resulting repository change exists.

### Behavior Items — selected

#### BI-BLDR-CANDIDATE-USES-EXACT-SOURCE
Requirement:
Candidate decisions must remain grounded in the selected exact source state.

Reason:
A candidate designed against a moving or different source cannot be replayed as the same result later.

#### BI-BLDR-CANDIDATE-CHANGE-INVALIDATES-REVIEW
Requirement:
Any material change to the candidate after review requires a new package and a new replay/review cycle.

Reason:
Approval applies to an exact package/result pair, not to a general intention.

---

### FI-BLDR-BUILD-EXACT-PACKAGE

Scenario Role / Local Purpose:

Materialize the selected candidate as one exact replacement package whose operations and payloads completely represent the intended file result.

Interaction Process:

```text
candidate resulting files
+
exact touched bases
↓
deterministically derive add / replace / delete operations
↓
materialize PACKAGE.json
+
base-files/
+
replacement-files/
↓
validate package
↓
exact package Pn
```

Every newly produced ZIP receives a new `packageId`.

A correction/continuation of the same still-active logical ChangeSet may retain the same `changeSetId`.

Result:

One validated exact package exists.

### Behavior Items — selected

#### BI-BLDR-PACKAGE-IS-COMPLETE
Requirement:
Replacement payloads represent complete resulting file bytes, not snippets or an informal patch intent.

Reason:
The consumer and replay environment must reconstruct the same resulting file state without relying on unstated patch context.

#### BI-BLDR-NEW-ZIP-NEW-PACKAGE-ID
Requirement:
Every newly materialized replacement ZIP has a new package identity.

Reason:
Review and handoff must distinguish newly materialized bytes from every prior package attempt.

#### BI-BLDR-PACKAGE-CARRIES-EXACT-APPLICABILITY
Requirement:
Every replace/delete operation carries the exact expected source needed for deterministic applicability proof.

---

Reason:
Replace/delete safety depends on proving the source state the candidate was actually built against.

### FI-BLDR-REPLAY-AND-REVIEW-PACKAGE-RESULT

Scenario Role / Local Purpose:

Prove the semantic acceptability of the exact result of the exact package before the real ChangeSet is modified.

This FI is the primary semantic review boundary.

Interaction Process:

Let:

```text
C0 = ChangeSet base
C1 = current published tip / exact expected source
P2 = package being reviewed
T2 = predicted resulting tree
```

Replay:

```text
NEW clean workspace / checkout of exact C1
+
exact P2
↓
apply P2 using the package's deterministic add/replace/delete meaning
↓
materialize exact resulting workspace/tree T2
```

Review material is always derived:

```text
latest.diff
C1 → T2

cumulative.diff
C0 → T2

full resulting workspace
T2
```

For the first package:

```text
C1 = C0

latest.diff     = C0 → T1
cumulative.diff = C0 → T1
```

They may be identical, but both artifacts are still produced so the review contract is stable across revisions.

Semantic review examines:

```text
exact package identity
+
latest diff
+
cumulative diff
+
full resulting workspace/tree
```

The full resulting workspace is available for targeted search/read, so review is not restricted to textual patches.

Outcomes:

#### NEEDS_CORRECTION

```text
review finds a material issue
↓
do not hand this package to the consumer
↓
return to Develop Candidate
↓
build NEW package
↓
fresh replay/review
```

#### APPROVABLE

```text
review accepts exact P2 / C1 / T2
↓
do not rebuild
↓
the SAME P2 becomes eligible for Apply handoff
```

Result:

Either:

- a concrete correction need is established; or
- one exact package/source/result tuple is semantically approved.

Conceptually:

```text
approved:
(changeSetId, packageId, expectedSource, expectedResult)
```

Exact persistence/schema is intentionally deferred.

### Behavior Items — selected

#### BI-BLDR-REVIEW-EXACT-SAME-PACKAGE
Requirement:
Semantic review must replay the exact package that will later be handed to the consumer.

Reason:
Reviewing an equivalent reconstruction does not prove the actual handoff artifact.

#### BI-BLDR-REPLAY-EXACT-EXPECTED-SOURCE
Requirement:
Replay must start from the exact source expected by the package.

Reason:
A replay from another source does not prove what the consumer will obtain when applying the reviewed package to its declared source.

#### BI-BLDR-REPLAY-FRESH-WORKSPACE
Requirement:
Each review replay must use a clean reconstructed workspace that is not contaminated by a prior candidate/replay attempt.

Reason:
Residual files or state from an earlier candidate could make the predicted result differ from a clean consumer application.

#### BI-BLDR-REVIEW-LATEST-AND-CUMULATIVE
Requirement:
Review material must expose both the latest package delta and the cumulative ChangeSet delta.

Reason:
The reviewer needs both the new revision delta and the whole logical ChangeSet effect to detect local regressions and cumulative inconsistencies.

#### BI-BLDR-REVIEW-FULL-RESULT
Requirement:
The reviewer must be able to inspect the full predicted resulting workspace/tree, not only the diff artifacts.

Reason:
Semantic correctness may depend on unchanged neighboring files, references or repository context that are not visible in a patch alone.

#### BI-BLDR-CORRECTION-REQUIRES-NEW-PACKAGE
Requirement:
After a material correction, a new package must be built and replayed before it can be approved.

Reason:
Any changed candidate invalidates the previous package/result identity and therefore its review result.

#### BI-BLDR-NO-REBUILD-AFTER-APPROVAL
Requirement:
An APPROVABLE result must hand off the exact already-reviewed package; the Builder must not rebuild a supposedly equivalent package after approval.

---

Reason:
Rebuilding would create unreviewed bytes even if the intended content were believed to be equivalent.

### FI-BLDR-PROVIDE-APPLY-HANDOFF

Scenario Role / Local Purpose:

Provide the consumer with the exact reviewed package and enough exact review identity for the consumer to prove that its real published result is the same result that was reviewed.

Interaction Process:

```text
approved exact P2
+
expected source C1
+
expected result T2 identity
+
ChangeSet / repository / target context
↓
produce Apply handoff
↓
Replacement Package App
```

Result:

Replacement Package App receives the exact reviewed package and review/result identity needed for later verification.

### Behavior Items — selected

#### BI-BLDR-HANDOFF-REVIEWED-PACKAGE
Requirement:
Only the exact APPROVABLE package is eligible for ordinary Apply handoff.

Reason:
Consumer execution should be limited to the artifact whose predicted result actually received semantic approval.

#### BI-BLDR-HANDOFF-RESULT-IDENTITY
Requirement:
Handoff must carry or make available enough exact identity to let the consumer prove the actual published result against the reviewed predicted result.

Exact protocol/schema remains a later design decision.

---

Reason:
The consumer cannot bind pre-Apply approval to a published revision unless it can compare that revision with the reviewed predicted result.
