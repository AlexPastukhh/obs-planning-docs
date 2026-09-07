# Implementation Workflows

Status: active normative detailed procedure
Use Case: DOC-UC-19
Proposal approval: [`proposal-and-approval.md`](proposal-and-approval.md)
Finding re-entry: [`review-findings.md`](review-findings.md)

## Predefined execution workflows


The methodology may provide reusable **workflow variants** for how deep planning/execution is carried out.
These are recommended operating patterns, not mandatory for every change.

## Final literal candidate checkpoint

The session may establish the transient checkpoint:

```text
SCP-FINAL-LITERAL-CANDIDATE-APPROVED
display: FINAL-LITERAL-CANDIDATE-APPROVED
```

Meaning:

```text
the exact intended code/doc/test result has been shown to the user
+
relevant proof/reconstruction has been run where possible
+
current findings have been resolved/reviewed
+
the user confirms the exact final literal result
```

This is **session state**, not durable product authority.

The checkpoint does **not** imply that no package bytes may exist yet.

Workflow-specific meaning:

```text
Workflow A
→ package construction occurs after the checkpoint
→ package creation is mechanical materialization of the approved local result

Workflow B
→ Builder may already have created candidate package(s) for replay/review
→ the checkpoint freezes the exact APPROVABLE package/source/predicted-result tuple
→ after the checkpoint the exact reviewed tuple may be handed to the consumer
```

If subsequent package preparation/review/application evidence reveals that meaningful
code/test/doc/result identity must change, the checkpoint is invalidated:

```text
SCP-FINAL-LITERAL-CANDIDATE-APPROVED
→ INVALIDATED
→ return to proposal / literal review
→ obtain a new approval
→ for Workflow A: recreate/materialize package from the newly approved candidate
→ for Workflow B: create a new candidate package and repeat Builder replay/review
```

Non-meaningful archive metadata/checksum/package-manifest mechanics do not change the candidate,
provided they do not alter product/source/result semantics.


### Workflow A — ChatGPT-local implementation and proof before package

Use when the implementation can be recreated/tested in ChatGPT's working environment before repository application.

```text
approved semantic / planning scope
→ descend to L3/L4
→ AI produces literal code/test proposal
→ show literal code to user
→ discuss / clarify / revise
→ user confirms execution of that proposal
→ apply the approved code locally in ChatGPT working copy
→ run relevant tests/proof locally
→ classify findings
→ if findings require changes:
   return to proposal/discussion at the appropriate level
→ repeat until:
   local code works
   required proof passes
   user reviews the resulting literal code
   user confirms the final working result
→ only then prepare the replacement package
→ verify package bytes correspond to the reviewed working result
→ provide package for repository application
```

Package creation is deliberately late.
A package must not be used to discover whether the literal code works when local reproduction/proof is available.

Before package creation, perform:

```text
literal-code consistency check
approved owner/Requirement check
test/proof result check
file add/replace/delete check
no unreviewed semantic delta check
```

### Workflow B — Builder Work: build → replay/review → handoff → consumer verification

Stable ID:

```text
SWF-BUILDER-WORK-BUILD-REPLAY-REVIEW-HANDOFF-AND-CONSUMER-VERIFY
```

This workflow composes already-owned Builder/App behavior. Session Methodology must not redefine those product Features/Scenarios.

Canonical Builder producer Scenario:

```text
planning/documentation/replacement-package-builder/scenarios/
SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE.md
```

Canonical Builder review Feature:

```text
planning/documentation/replacement-package-builder/features/
F-BLDR-APPLY-PACKAGE-FOR-REVIEW.md
```

The Builder Scenario already owns this pre-handoff journey:

```text
Human work/target intent
→ ChatGPT uses F-BLDR-START-REPOSITORY-WORK
→ ChatGPT prepares desired resulting content/deletions
→ F-BLDR-BUILD-REPLACEMENT-PACKAGE
→ F-BLDR-APPLY-PACKAGE-FOR-REVIEW
     fresh isolated review workspace at exact expectedSource
     apply exact package using consumer-equivalent applicability/result semantics
     → predictedTree
     → latest.diff
     → cumulative.diff
     → full resulting workspace/tree
→ ChatGPT semantic review of exact source/package/result
   NEEDS_CORRECTION
   ├─ record/materialize finding according to Builder Scenario
   ├─ correct candidate inputs
   ├─ build a NEW package
   └─ replay/review again
   APPROVABLE
   └─ freeze exact package/source/predicted-result tuple
→ exact consumer handoff
```

Session Methodology **consumes** this Scenario. It should not duplicate its Behavior Requirements.

The session-level composition around it is:

```text
confirm Work / Issue / branch context
→ progressive planning to the depth needed
→ user confirms candidate implementation direction
→ ChatGPT prepares literal desired result
→ Builder builds exact candidate package
→ Builder Apply-for-Review reconstructs consumer-equivalent predicted result
→ ChatGPT reviews:
   latest.diff
   cumulative.diff
   full resulting tree/workspace
   package/source/result identity
   current Issue goal/acceptance
   current approved Requirements/Decisions
→ findings return to the appropriate planning level
→ repeat until Builder Scenario yields an APPROVABLE exact package/result
→ user reviews/confirms the final literal result
→ establish `SCP-FINAL-LITERAL-CANDIDATE-APPROVED`
→ emit/use the exact approved Builder handoff
→ consumer App realizes that exact reviewed package
→ downstream reviewed-result verification proves the real consumer result
   equals the Builder-reviewed predicted result
```

Two distinct review checkpoints must not be conflated:

```text
PRE-HANDOFF BUILDER REVIEW
= semantic review of predicted result before real consumer mutation
= owned by SCN-BLDR-BUILD-AND-REVIEW-REPLACEMENT-PACKAGE
  + F-BLDR-APPLY-PACKAGE-FOR-REVIEW

POST-REALIZATION CONSUMER IDENTITY VERIFICATION
= prove actual real published result is the exact reviewed predicted result
= product Scenario responsibility on Replacement Package App side
```

Current App status matters:

```text
current active:
tools/replacement-package-app/scenarios/SCN-RPKG-COMPLETE-REPOSITORY-WORK.md
→ Apply / Commit / Publish
→ exact package commit publication proven
→ current Scenario stops.

planned future:
tools/replacement-package-app/scenarios/planned/
SCN-RPKG-COMPLETE-REVIEWED-REPOSITORY-WORK.md
→ consumes Builder-reviewed handoff/result identity
→ proves actual published tree == reviewed predicted tree
→ then future PR / Finalize behavior.
```

Therefore this session workflow may define the **intended composition**, but it must not claim the App already implements the planned reviewed-result verification until that product Scenario becomes current.

During current migration state, Workflow B can still use Builder pre-handoff replay/review as the exact literal review mechanism, then use the currently implemented App Apply/Commit/Publish boundary. Any post-publish identity/review step beyond current App authority must be labeled as planned/dependent on future product behavior.

The crucial invariant is:

```text
Builder reviewed tuple
(package identity + expected source + predicted result)
→ exact handoff
→ real App realization
→ when product support exists:
   actual published result identity == reviewed predicted result identity
```

Do not replace this with “looks like the same diff”.


### Workflow checkpoints vs optional depth

Workflow A/B are **not rigid scripts**.

Each workflow should distinguish:

```text
entry conditions
required checkpoints
optional planning depth
exit conditions
finding/re-entry points
```

Example:

```text
narrow bug fix
→ existing L0/L1 authority already clear
→ session may start at L2/L3
→ still requires:
   proposal
   confirmation
   literal implementation/proof
   final user review
   package checkpoint if packaging is used
```

Do not force ceremonial L0/L1 restatement when current durable owners already settle them.
Do run backward consistency checks against those owners.


### Workflow selection

The user may select a workflow explicitly or AI may recommend one.

Selection criteria may include:

```text
can the code/tests be reproduced locally in ChatGPT?
is there an active Work/Issue/branch?
is Builder/package application part of the task?
does the change require exact package-base verification?
how much literal-code review does the user want before packaging?
```

Workflow selection itself should be proposed before execution.
