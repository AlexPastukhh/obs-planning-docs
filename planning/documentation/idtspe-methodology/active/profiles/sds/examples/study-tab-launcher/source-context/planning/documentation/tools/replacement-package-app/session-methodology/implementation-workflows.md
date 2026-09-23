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

### Workflow B — Package transport/review while Builder product semantics are being re-established

Use when exact repository changes must be packaged/reviewed but the v14 Builder product Feature/Scenario model has **not** yet been accepted/materialized.

Current producer authority is the generic repository package route, not the retired Builder Start Work / Review Feature draft:

```text
planning/commands/build-replacement-archive.command.md
planning/use-cases/UC-REPO-BUILD-REPLACEMENT-PACKAGE.md
planning/documentation/build-replacement-archive-workflow.md
```

Application boundary:

```text
AI / human owns
  Work Issue/comments
  semantic working branch/context
  semantic edits
  review decision
  exact consumer handoff

package producer owns
  mechanical exact package construction from selected source/result bytes
  protocol validation
  fail-closed base acquisition

Replacement Package App owns
  authoritative package realization according to current accepted App behavior
```

Current session composition:

```text
confirm semantic work context owned by AI/human
→ progress planning/implementation to the required depth
→ review exact intended file result
→ request/build protocol-valid Replacement Package through current producer command/use case
→ review the exact package/result using available package/repository evidence
→ if correction is required: change semantic inputs/result, produce a NEW packageId and review again
→ when exact result is approved: AI emits the exact selected consumer handoff
→ consumer App realizes that exact package
```

Do **not** use `F-BLDR-START-REPOSITORY-WORK`, `F-BLDR-BUILD-REPLACEMENT-PACKAGE`, the old Builder review Scenario, or current Snapshot semantics as current product authority. Those retained documents are legacy target/source Evidence only.

Selected future Builder semantics are owned by:

```text
tools/replacement-package-app/evolution-steps/
EVO-RPKG-ESTABLISH-REPLACEMENT-PACKAGE-CONSTRUCTION.md
→ later EVO-RPKG-ADD-LOCAL-PACKAGE-VERIFICATION.md
```

When those Steps are realized/proven/materialized, this session workflow may be revalidated to consume the resulting current Builder Feature/Scenario owners. Until then, implementation mechanics can be reused only as Evidence under `KEEP / MODIFY / REPLACE`.

Current Replacement Package App realization still stops where its accepted current Scenario stops; future reviewed-result verification/Finalize behavior remains Step-owned until materialized.

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
