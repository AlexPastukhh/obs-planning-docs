# Broad Discussion And Integration Checkpoint Model

Status: active generic methodology owner  
Purpose: define the conversational/integration **interaction projection** for Broad Discussion and Integration Checkpoints without becoming the owner of Proposal/Decision lifecycle, Integration Use-Case Process, Lens semantics or physical placement policy.

---

## 1. Core Position

IDTSPE supports two normal, composable ways of working inside the same Work Context. The context may currently have zero, one or several Targets:

```text
Broad Discussion
= exploratory conversational work

Integration Checkpoint
= situational semantic integration pass over the accumulated work
  when a coherent whole-state view is useful
```

They are not competing runtimes and do not create new Target/Unit kinds.

Normal rhythm:

```text
Explore through Broad Discussion
↓ when integration becomes materially useful
Integration Checkpoint
↓
Inspect the integrated Work Context / applicable Target state/results
↓
continue Broad Discussion on the important gaps/alternatives
↓ when useful again
Integration Checkpoint
```

A checkpoint does not end discussion. Broad Discussion may also appear inside a checkpoint response when explanation is useful.

---

## 2. Broad Discussion

Broad Discussion is ordinary useful chat/planning prose around the current Target or planning situation.

It may occur:

- before the first explicit Target Module invocation;
- across many messages before an Integration Checkpoint;
- between two checkpoints;
- inside a response that also contains structured IDTSPE State / Target Result meaning;
- after a checkpoint while focusing on one Proposal, Question, Problem, Risk, Evidence item, Decision or Result Unit.

Broad Discussion does **not** require every reply to reproduce:

```text
all Generic State Units
all Target Result Units
all Lens checks
all P-14 placement rows
all unresolved state
```

The methodology still governs semantic authority while the visible response stays conversational.

### Key Points structure material discussion

Use the peer [`AI Reviewability Key Points contract`](../../ai-reviewability/README.md) proportionally.

Key Points structure material Broad Discussion by dividing it into logical parts and giving the short key content of each part. They may summarize current understanding, alternatives, trade-offs or unresolved tension; they are not restricted to final conclusions.

```text
logical discussion part
  explanatory reasoning / examples / trade-offs
  Key Points
    concise key content of this part

next logical discussion part
  ...
  Key Points
    ...
```

Key Points are review/navigation structure, not IDTSPE State and not a semantic owner. Do not add a separate block-owner/semantic-anchor record merely to label each discussion part; normal headings/content and explicit IDTSPE references are enough. No mandatory `Broad Discussion Intake Summary` is required after each response.

A checkpoint may additionally contain one optional **Broad Discussion Summary** describing what the accumulated discussion since the previous checkpoint materially established or changed.

```text
Key Points
= local review structure for material logical discussion parts

Broad Discussion Summary
= optional checkpoint-level retrospective summary of accumulated discussion
```

Neither is automatically persisted semantic state.

---

## 3. Proposals / Decisions Inside Broad Discussion

Canonical Proposal identity, driver relations, candidate bundles, review/selection outcomes, Decision trace/retention and revalidation semantics are owned by [`proposal-and-decision-lifecycle-contract.md`](proposal-and-decision-lifecycle-contract.md).

This interaction model owns only how that meaning may remain conversationally visible before the next integration pass:

```text
lightweight AI Proposal
→ may remain conversational when formal lifecycle/addressability adds no value

material formal Proposal
→ identity + driver relation must be explicit enough to survive into integration

Q/R/P/Evidence
→ may remain inline with the Proposal/decision surface they concern

accepted Decision / unresolved alternative
→ may be discussed conversationally without requiring a full State rendering each turn
```

Do not hide a material formal Proposal as an unlabeled implication in prose. Conversely, do not formalize every passing idea merely because discussion is exploratory.

Broad Discussion may expose material Proposal relations/bundles by reference when they help review, but their semantics remain owned by the Proposal/Decision lifecycle contract.

## 4. Contextual Q/R/P/Evidence

Q/R/P/Evidence should stay attached to the planning meaning they actually concern instead of becoming one undifferentiated Target-wide list.

They may relate to:

- the Target as a whole;
- the current Target Goal / Desired Outcome context;
- a Question or Problem;
- one Proposal;
- several Proposals or a Candidate Bundle;
- a Target Result Unit/field;
- a relation/boundary;
- a Decision.

Broad Discussion may expose these associations conversationally. The checkpoint normalizes/materializes only the relationships useful for the current semantic state.

A Question may simultaneously be a decision driver for several Proposals and a Q/R/P item. A Problem driver is the existing P-09 Problem meaning. Do not create duplicate objects merely to satisfy several views.

---

## 5. Integration Checkpoint Interaction Boundary

An **Integration Checkpoint** is the coherent whole-state integration result produced through [`UC-IDTSPE-INTEGRATE-CURRENT-WORK`](integrate-current-work-use-case.md). That Use Case owns **Situation / Result / Process** for when and how integration is performed.

This model owns only the conversational/projection boundary:

```text
Broad Discussion
→ may continue for many turns

Integration Checkpoint
→ presents the current integrated whole when the Integration Use Case applies
→ does not end Broad Discussion
→ does not imply approval, persistence or completion
```

A checkpoint may contain explanatory Broad Discussion. If that explanation surfaces a **new material Proposal / Question / Problem / Evidence / Decision consequence**, integrate it into the same checkpoint state/result or mark it explicitly as post-checkpoint exploration. Do not leave newly material semantics hidden only in explanatory prose while still presenting the checkpoint as the coherent integrated whole.

## 6. Checkpoint Response Projection

A checkpoint response shows the integrated whole proportionally. A practical rendering may contain:

1. **Broad Discussion Summary** — optional retrospective summary of what materially changed/was learned since the previous checkpoint; it never substitutes for explicit integrated semantic state.
2. **Broad Discussion / Key Points** — explanatory discussion when it helps review the integrated state.
3. **Target Goal / Desired Outcome context** — the current Target/scope goal when useful to understand the decision space.
4. **Generic IDTSPE State** — current material Questions, explicitly surfaced Proposals with `Addresses` relations plus material Proposal relations/bundles, Q/R/P/Evidence, Decisions, Branch/Revalidation/relations as applicable. Do not introduce Goal as a Generic State Unit merely for this projection.
5. **Target Step Result** — complete applicable current Target Result Units, sparse where the Target contract permits.
6. **Lens / Consistency Review** — relevant checks, explanatory analysis and material Finding Candidates/disposition consequences.
7. **Semantic retention / Artifact Placement** — what semantic state should be retained and, separately, whether/how it should physically persist when material.
8. **Handoff / next work** — useful next discussion focus, Target handoff or revalidation trigger.

This is not a mandatory heading template. Preserve meaning while keeping the rendering proportional and readable.

When Proposals/Q/R/P/Evidence already appear in the structured checkpoint State, do not redundantly reproduce them inside Broad Discussion as a second competing copy. Discussion may explain them by reference.

A checkpoint may leave material alternatives unresolved. Integration is not forced resolution.

---

## 7. Decision / Alternative Projection

Decision trace, rationale semantics, selected/non-selected alternative retention and revalidation are owned by [`proposal-and-decision-lifecycle-contract.md`](proposal-and-decision-lifecycle-contract.md).

At the interaction/projection level, a checkpoint should expose enough of that retained meaning to make the integrated state understandable without duplicating it in Broad Discussion as a competing second copy. Optional rationale/alternative-retention questions may be batched and remain non-blocking unless the missing meaning itself prevents material resolution.

Semantic retention does not require a file; physical representation remains a separate concern.

## 8. Lens Contribution To Discussion And Checkpoints

A Lens may contribute useful explanatory analysis and Key Points directly to Broad Discussion.

```text
Lens analysis / discussion
≠ State Unit
≠ Finding Candidate automatically
≠ Result Unit
```

Only material newly surfaced meaning that needs ownership/State/lifecycle disposition crosses the Finding Candidate boundary.

```text
Lens explanatory analysis / Key Points
→ may remain discussion only

material consequence needing semantic integration
→ Finding Candidate
→ Core Finding Disposition
→ selected State / owner / lifecycle consequence
```

A checkpoint may use Lens discussion to explain why the integrated result looks as it does without persisting that prose. Lenses still cannot create target-specific Result Units or mutate accepted meaning directly.

---

## 9. Logical/Semantic Retention vs Physical Persistence

Keep three layers distinct:

```text
1. Conversational working material
   Broad Discussion prose / local Key Points
   often transient

2. Integrated semantic planning state
   material Proposals / Q-R-P / Evidence / Decisions / relations
   + Target Result meaning
   retained logically as current IDTSPE meaning when selected/material

3. Physical persistence / representation
   file / section / artifact / implementation-native code/test / generated view
   decided separately by Documentation / Representation + P-14 / TF-10
```

A Unit becoming material/addressable does not imply one file per Unit. A checkpoint creating an integrated semantic snapshot does not by itself authorize repository mutation.

---

## 10. Working Invariant

```text
Broad Discussion carries exploration.
Key Points make material Broad Discussion easy to review without becoming State.
Material Proposals are explicit and address the current Target Goal, a Question or a Problem.
Integration Checkpoint carries whole-state integration; Broad Discussion Summary is optional retrospective prose, not structured State.
Target Goal / Desired Outcome remains Target/scope context unless Target Formation changes it.
Generic State preserves material decision-space meaning through existing Core kinds.
Target Result Units show what that work currently means for the Target.
Decisions retain accepted choices by default; material non-selected alternatives remain a user-controlled retention choice.
Physical persistence remains a separate representation decision.
```

Do not introduce `TM-DISCUSSION`, `RU-DISCUSSION`, `CHECKPOINT_STATE`, mandatory per-response Intake Summary, block-owner record or equivalent merely to represent this workflow.
