# Broad Discussion And Integration Checkpoint Model

Status: active generic methodology owner  
Purpose: define how ordinary multi-turn planning discussion, IDTSPE Proposals/Q-R-P/Evidence/Decisions, Target Result Units, Lenses and persistence interact without forcing a full structured state dump in every reply.

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

## 3. Proposals Inside Broad Discussion

An IDTSPE `Proposal` is a candidate answer/solution/approach, not every thought in prose.

Every material Proposal must be surfaced explicitly as an `Proposal` candidate and must carry an explicit `Addresses` relation to one or more decision drivers:

```text
current Target Goal / Desired Outcome context
Question
Problem
```

`Goal / Desired Outcome` here normally means the current Target/scope goal context; it is **not introduced as a new Generic State Unit kind** by this model. If Broad Discussion discovers an independently useful new goal that is not merely a refinement of the current Target goal, normal scope/Target Formation decides whether the current Target changes or another Target is needed.

When a reusable Target Module is active, its Target Goal plus reusable Question/Problem driver candidates are the ordinary **starting driver set** for Proposal discovery, but they are not an exclusive gate. A material driver or Proposal may also come from:

- the current situation or Sources;
- a previous Target/checkpoint;
- prior implementation or Evidence;
- Broad Discussion itself;
- explicit user input;
- AI analysis/proposal;
- a Lens Finding after normal Core Finding Disposition when disposition creates/refines that State.

After intake into the planning work, these origins do not create different classes or lower-priority Questions/Problems/Proposals: external/new drivers are accepted on equal Core semantic footing with Module-supplied candidates and are integrated under the normal authority rules.

If a proposed material Proposal has no resolvable Target Goal/Question/Problem driver, surface that missing driver as an unresolved planning gap instead of carrying a free-floating material Proposal.

During Broad Discussion, material Proposals may remain inline with related Q/R/P/Evidence rather than forcing a full Generic State rendering. Their explicit Proposal identity and `Addresses` relation must still be clear from the discussion itself so the next Integration Checkpoint can integrate them without reconstructing hidden semantics.

AI proposals remain unselected AI Proposals. When material candidate-state handling is useful, their candidate meaning may be represented as formal IDTSPE Proposals; neither form is accepted until selected under normal authority rules.

---

## 4. Proposal Space And Relations

One Target Goal/Question/Problem may have one or many candidate Proposals.

Do not flatten a real alternative space into one prose answer merely because a checkpoint is being produced.

Useful Proposal relations include:

```text
Proposal → addresses → Target Goal / Question / Problem
Proposal ↔ competes-with ↔ Proposal
Proposal ↔ complements ↔ Proposal
Proposal → requires → Proposal
Proposal ↔ conflicts-with ↔ Proposal
Proposal → part-of-candidate-bundle → Candidate Bundle / Option Group
```

These names are lightweight semantic relation vocabulary, not a mandatory database schema.

When competition/composition is material to understanding the option space, the checkpoint should show those relations instead of presenting the Proposals as an unrelated flat list.

### Candidate Bundle / Option Group

Several compatible Proposals may compose one candidate approach while another group composes a competing approach.

Example meaning:

```text
Question Q1

Candidate Bundle A
  I1
  I2

Candidate Bundle B
  I3
  I4
  I5

A competes with B
```

A Candidate Bundle / Option Group is initially a lightweight grouping/comparison projection over Proposals. It is **not a new required Generic State Unit** and does not receive an independent lifecycle/persistence requirement merely because grouping is useful.

Use a Planning Branch only when an alternative needs its own materially deep downstream counterfactual planning network. A lightweight Proposal bundle is not automatically a Planning Branch.


### Proposal Review / Approval Enrichment

The existing Proposal candidate space remains the base contract. R2 adds review/approval behavior without replacing that structure.

AI may autonomously inspect, analyze, compare, classify findings and prepare/refine Proposals. Actual repository/application/documentation/methodology mutation waits for USER confirmation.

A material Proposal should expose, proportionally:

```text
what is proposed
the Question/Problem it responds to
affected current authority / owner
durable Requirement / Decision consequence when any
material risks/problems/trade-offs
proof consequence
known Evolution consequence
what remains unchanged
```

The USER controls review depth. AI should narrow technical/design alternatives through available analysis/Lenses before asking the USER to choose.

Where several real competing Proposals exist, compare them using the existing Proposal relations/bundles and show meaningful benefits, downsides, proof/Evolution consequences and AI recommendation. Do not manufacture alternatives merely for symmetry.

Complexity consequence is review guidance, not a required new Proposal schema field. When useful, summarize it as:

```text
Complexity delta: REDUCES | ROUGHLY-NEUTRAL | ADDS
Complexity consequence: ...
```

Consider only relevant dimensions such as semantic/ownership/structural/state/coupling/maintenance/proof/operational/migration/evolution/cognitive complexity. Do not equate fewer classes/lines with lower total system complexity.

For real competing options, make the situational decision basis visible:

```text
Decision priorities for this situation:
1. ...
2. ...

AI recommendation: ...
What the recommendation sacrifices: ...
```

This remains proportional review guidance, not mandatory persisted Proposal schema.

If the USER amends part of a Proposal, re-evaluate the affected part and dependent meaning rather than treating the whole Proposal as accepted or reopening unrelated accepted work.

A narrow/obvious/editorial change may use a lightweight AI Proposal instead of formal Proposal State, but the actual mutation still waits for required USER confirmation.

---

## 5. Contextual Q/R/P/Evidence

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

## 6. Integration Checkpoint

An **Integration Checkpoint** is a **situational IDTSPE integration pass** invoked through `UC-IDTSPE-INTEGRATE-CURRENT-WORK` when a coherent whole-state view is useful. It reconciles accumulated discussion and planning state into the current Work Context, including applicable Target results for whichever Targets are material. Elapsed time/message count alone is not a trigger.

It is an interaction/integration operation, not a new semantic entity.

An Integration Checkpoint is **not**:

```text
a completion state
a user-approval gate
a lifecycle status
a new Unit kind
a separate Target
a file or commit
a command that must exist separately
a requirement to end Broad Discussion
a guarantee of physical persistence
```

### Applicability / Trigger

Invoke a checkpoint when integration provides independent value, for example when accepted/current meaning is distributed, a multi-owner change/revalidation needs a coherent view, handoff/resume would otherwise be unreliable, a downstream transition needs a boundary-readiness view, or the USER explicitly asks for one.

Do not schedule checkpoints by turn count or merely because IDTSPE is active. `NO_CHECKPOINT_NEEDED` is a valid result of `UC-IDTSPE-COMPOSE-CURRENT-WORK`.

### Checkpoint work

Perform proportionally:

**Collect**  
Collect material planning meaning accumulated since the previous checkpoint or from Sources/current owner state.

**Relate**  
Relate current Target Goal context and material Question/Problem drivers to Proposals/candidate bundles and their material Q/R/P/Evidence/Decisions.

**Integrate**  
Update the complete applicable Generic IDTSPE State and the applicable Target Result Units for material current Targets. Generic State uses the existing Core kinds (`Sources / Questions / Proposals / Q-R-P / Decisions / Evidence / Methodology Usage State / Revalidation ...`); Target Goal/Desired Outcome remains Target/scope context unless normal Target Formation changes that context. Preserve unresolved alternatives instead of silently collapsing them.

**Check**  
Apply the relevant Lens checks/analysis and Target/Core consistency/validation needed to judge whether the integrated whole actually satisfies the Target Goal/contract.

The checkpoint exists to answer, in human terms:

> Given everything we have discussed and decided, what do we actually have now, does it fit together, and what still needs work?

A full Target Module invocation may contribute the Target-specific portion of an Integration Checkpoint when the Integration Use Case is active. Repeated invocation is normal and usually refines/revalidates the same Target rather than creating a new one.

### Meaning surfaced while explaining a checkpoint

A checkpoint may contain explanatory Broad Discussion. If that explanation itself surfaces a **new material Proposal / Question / Problem / Evidence / Decision consequence**, do one of two things before treating the checkpoint as the current integrated view:

```text
integrate the new material meaning into this same checkpoint state/result
OR
mark it explicitly as post-checkpoint exploration to be integrated later
```

Do not leave newly material semantics hidden only in checkpoint prose while still presenting the checkpoint as the coherent integrated whole.

---

## 7. Checkpoint Response Projection

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

## 8. Decision Retention, Rationale And Alternatives

Accepted material Decisions are retained in integrated semantic state by default because later work and revalidation need to know what was selected.

A material Decision may carry:

```text
Addresses
  Target Goal / Question / Problem / Q-R-P when useful

Selected
  Proposal / compatible set or Candidate Bundle when useful

Decision
  accepted meaning

Rationale / Why
  optional concise reason the selection was made

Evidence / Risk / Problem / alternative references
  only when useful
```

`Rationale / Why` is **not Evidence**. Evidence is an independently sourced/supporting State item; rationale explains the selection logic/trade-off that connects available meaning to the Decision.

Rationale is optional. Do not require ceremony for an obvious/trivial choice. At an Integration Checkpoint, when a newly accepted material Decision has no retained rationale, ask the user whether a short rationale should be retained. Treat this as an optional retention choice unless the rationale itself is required to resolve a material ambiguity.

After a material selection:

```text
accepted Decision
→ retain by default

selected Proposal(s) / bundle needed to understand the Decision
→ retain enough semantic trace to understand the selection

material non-selected / deferred / rejected / superseded alternatives
→ ask the user whether to retain them and, when relevant, why they were not selected

trivial transient alternatives
→ may remain conversational unless the user wants exploration history
```

When an alternative is likely to recur, or its non-selection/rejection reason prevents predictable future rework, recommend retaining it.

Batch these retention questions when possible; do not create a confirmation turn for every tiny Decision.

Semantic retention does not itself require a file. Physical representation is resolved separately through Documentation / Representation and P-14.

---

## 9. Lens Contribution To Discussion And Checkpoints

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

## 10. Logical/Semantic Retention vs Physical Persistence

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

## 11. Working Invariant

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
