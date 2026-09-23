# Finding Disposition Contract

Status: active generic methodology owner
Purpose: define how newly surfaced potentially material meaning from Lenses, validators, Evidence, implementation observations, user clarification and other producers is assigned to the correct IDTSPE ownership/state/lifecycle destination without making the producer semantic authority.

---

<a id="resolution-finding-disposition"></a>
## 1. Core Definition

Responsibility ID: `RESOLUTION.FINDING-DISPOSITION`

```text
Finding Candidate
= newly surfaced potentially material meaning
  awaiting Core disposition.

Finding Disposition
= Core mechanism for resolving the appropriate
  ownership, State/lifecycle representation,
  handoff/revalidation consequence and eventual
  Result destination for that meaning.
```

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Need Candidate Collection`](../needs/NEED-CANDIDATE-COLLECTION.md#resolution-need-candidate-collection) — `RESOLUTION.NEED-CANDIDATE-COLLECTION`
> - `CONTEXTUALIZES` [`Need Candidate Disposition`](../needs/NEED-CANDIDATE-DISPOSITION.md#resolution-need-candidate-disposition) — `RESOLUTION.NEED-CANDIDATE-DISPOSITION`
> - `CONTEXTUALIZES` [`Proposal / Decision Lifecycle`](../proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`
> - `CONTEXTUALIZES` [`Q/R/P Lifecycle`](../qrp/QRP-LIFECYCLE-AND-REVIEW.md#resolution-qrp-lifecycle) — `RESOLUTION.QRP-LIFECYCLE`

This contract owns Finding disposition and Resolution Escalation only; downstream lifecycle bodies remain with their linked owners.

The producer is not the destination authority.

Possible producers include:

```text
Lens
Validator / readiness check
Evidence check
implementation observation
consistency check
user observation / clarification that surfaces finding-shaped meaning
Source conflict
revalidation pass
another Target / downstream handoff
```

A Finding Candidate is a lightweight producer/Core boundary. It is **not automatically a new persisted State Unit kind**.

---

## 1A. Analysis / Key Points Are Not Findings By Default

A producer may contribute useful reasoning, explanation or Key Points without crossing this contract at all.

```text
Broad Discussion / Lens analysis / Key Points
≠ Finding Candidate automatically
```

Use a Finding Candidate only for newly surfaced potentially material meaning that needs Core ownership/State/lifecycle disposition. This keeps ordinary exploration/review prose from proliferating State.

Canonical working-conversation owner: [`planning/documentation/idtspe-methodology/active/idtspe-core/representation/interaction/BROAD-DISCUSSION-AND-INTEGRATION-CHECKPOINT-PROJECTION.md`](../../representation/interaction/BROAD-DISCUSSION-AND-INTEGRATION-CHECKPOINT-PROJECTION.md).

---


## 1B. USER Desired Outcome / Proposal Boundary

Do not use Finding Candidate as a generic container for every USER-requested change.

```text
USER/Source expresses a wanted outcome without a concrete answer
→ Need Candidate Collection
→ Need Candidate Disposition when semantic home/solution still needs routing

USER suggests a concrete candidate answer
→ Proposal

USER reports/clarifies a potentially material defect, contradiction, unsupported assumption or stale meaning
→ Finding Candidate
```

A Need Candidate may later expose a Finding if review establishes that accepted current meaning already requires the desired outcome but actual implementation/Evidence contradicts it. The original wanted outcome itself is not a Finding merely because change may be needed.

Canonical owners: [`Need Candidate Collection`](../needs/NEED-CANDIDATE-COLLECTION.md#resolution-need-candidate-collection) followed by [`Need Candidate Disposition`](../needs/NEED-CANDIDATE-DISPOSITION.md#resolution-need-candidate-disposition).

---

## 2. Core Flow

```text
Producer
  Lens / Validator / Evidence / User / Implementation / Review / ...
        │
        ▼
     Finding Candidate
        │
        ▼
IDTSPE Core Finding Disposition
        │
        ├─ materiality
        ├─ affected/current meaning
        ├─ smallest correct semantic subject / resolution owner
        ├─ lifecycle representation when needed
        └─ downstream/revalidation consequence
        │
        ▼
normal authority / resolution
        │
        ▼
accepted/derived meaning integrated into the correct destination
```

For target-result work the preferred route is often:

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `TWU.SUBJECT-REFERENCE`
> Owner: [Target Work Subject Reference Contract](../../runtime/target-work/TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md#target-work-subject-reference)

```text
finding concerns Collection / item / existing Unit Resolution Slot
→ route to that smallest natural Target Work subject
→ reference it through TWU.SUBJECT-REFERENCE

finding concerns the broader existing bounded Unit responsibility
→ that Unit Resolution

no suitable Unit, but a bounded local responsibility is independently useful
→ Target Formation / Contextual Unit path
```

This is not universal Unit-first routing. A finding may instead concern Target Scope, Source authority, a Target relation/handoff, another semantic owner, methodology state or another canonical subject directly.

A finding must not silently mutate accepted Result Content or Decision meaning.

## 3. Disposition Questions

Resolve proportionally:

```text
1. Is the finding material?
2. What existing meaning does it concern?
3. What is the smallest correct semantic subject / resolution owner?
4. If target-result work is implicated, does an existing Unit own the responsibility?
5. If not, is a Contextual Unit sufficient or is Target Formation warranted?
6. What Core lifecycle representation is useful, if any?
7. What downstream/revalidation consequence follows after resolution?
```

Useful outcomes include:

```text
attach/open/refine Unit Resolution
form a Contextual Unit
open/refine Question / Risk / Problem
open/refine Proposal / Planning Branch
attach Evidence / open Evidence Need
supply Decision input
challenge accepted Decision/state
create Revalidation Signal
record Target Relation / Handoff
route to another existing semantic owner
form an ownership/Target candidate
mark duplicate / non-material / already represented
```

The exact destination uses current Core/owner lifecycle rules; this contract does not create a second lifecycle.

## 4. Direct vs Explicit Disposition Resolution

Most findings should be cheap to disposition because contracts constrain the possible meaning.

```text
FAST / DIRECT
  destination + lifecycle consequence are clear
  from current contracts/state
  → disposition immediately

RESOLUTION REQUIRED
  ownership / meaning / lifecycle consequence
  is materially ambiguous
  → explicitly resolve disposition
```

Examples:

```text
obvious
→ just disposition it

ambiguous but small
→ Question / QRP

ambiguous and independently substantial
→ Target Formation candidate
→ Target Formation decides:
   reuse existing Target
   OR handoff/reference existing owner
   OR form a new bounded Target when independent ownership is justified
```

Do not create a routing ceremony for every finding.

---

## 5. Contract-Derived Disposition

Use the combination of:

```text
producer/Lens contract
+ active Target Module or Local Target Contract
+ Core State Unit model
+ semantic ownership of Sources/upstream Targets
+ current Decisions / Target Relations / Evidence
```

A Lens may identify likely affected Result Units or an owner hint, but those hints are not authority. Explanatory Lens analysis that does not need a semantic consequence remains Broad Discussion/Key Points and does not require disposition.

Example:

```text
Lens finding:
  Runtime Path is missing failure semantics

possible direct destination:
  current Slice Question/Risk

but if the missing behavior is actually undefined product semantics:
  resolution owner may be Scenario/Application instead
```

---

## 6. Finding Envelope

A producer may expose proportionally:

```text
Meaning
Producer / provenance
Affected Unit(s) / fields — when known
Evidence / rationale
Materiality hint — optional
Likely semantic owner — optional hint
Suggested lifecycle consequence — optional hint
```

Do not require all fields when the disposition is obvious.

A producer may attach transient routing hints, but generic Core must not define profile-specific Requirement/depth taxonomies as Finding authority. When the finding plausibly affects a profile-owned Requirement/depth concept, Core records the affected owner/meaning and routes to that active profile owner for interpretation.

Useful generic hints may include:

```text
Most-upstream affected owner
Upstream revalidation: NONE | POSSIBLE | REQUIRED
Downstream consequence if accepted
Complexity consequence when reviewability benefits
Profile-specific semantic review needed: YES | NO | POSSIBLE
```

These are routing/review projections only and are not durable Finding schema by default.

Example:

```text
Finding F-17

Meaning:
  persistence failure translation ownership is not explicit

Affected:
  Slice runtime/ownership meaning.failurePropagation

Evidence:
  current call path jumps from repository save
  directly to response mapping

Materiality:
  high because false success is possible

Likely owner:
  current Slice implementation orchestration
```

Core may disposition it as an existing/new Question, Risk, Decision input or another appropriate State/lifecycle item.

---

<a id="resolution-escalation"></a>
## 6A. Resolution Escalation Projection

When a material Finding is surfaced for review, expose its Review Priority, **how far semantic resolution must escalate**, and its upstream/downstream consequences with the supported rationale required below. A concise presentation is sufficient; material uncertainty must remain explicit rather than being replaced by an unsupported category.

`Resolution Escalation` is a derived Finding-disposition/review projection. It is **not** a new State Unit, lifecycle, planning level, approval state, priority scale or semantic owner. It complements — and must not be collapsed into — AI Reviewability `Review Priority`.

```text
Review Priority
= cost / blast radius if the finding is handled incorrectly

Resolution Escalation
= semantic distance / authority change required to resolve the finding correctly
```

Therefore `Critical + RE-0` and `Normal + RE-4` are both valid when supported by the actual owner/dependency structure.

Use the smallest category that fits the checked current owners:

| Resolution Escalation | Meaning | Durable semantic change | USER review expectation |
|---|---|---|---|
| `RE-0 DETERMINISTIC-CORRECTION` | a confirmed defect or missing explicit articulation has one correction clearly implied by current accepted meaning/contracts | none; accepted semantic meaning remains unchanged; current representation may be completed/clarified with an already-implied must-hold | correction can be presented compactly; no new semantic choice to decide |
| `RE-1 LOCAL-REALIZATION-CHOICE` | one or more realization/detail routes fit the same accepted current-owner meaning | no accepted architecture/behavior/Requirement/owner-boundary change; a local detail may vary | focused review only when local trade-off matters; AI may recommend a route |
| `RE-2 CURRENT-OWNER-SEMANTIC-CHANGE` | safe resolution requires new/revised selected meaning at the current natural owner | current-owner Decision, durable must-hold/Requirement when the active profile defines one, boundary, or equivalent owner result changes | USER reviews/selects the current-owner Proposal when selection authority is USER-owned |
| `RE-3 UPSTREAM-REVALIDATION` | current work exposes evidence that an upstream owner/Decision/Requirement may be implicated, but an upstream semantic change is not yet established | unknown until the earliest affected upstream owner is revalidated | USER is shown the upstream exposure; revalidation/evidence comes before selecting a downstream workaround |
| `RE-4 UPSTREAM-SEMANTIC-CHANGE` | safe resolution requires an actual new/revised/replaced upstream Decision/Requirement/owner meaning | upstream accepted meaning changes; affected downstream work must consume the new result | USER reviews/selects at the upstream decision surface before dependent work proceeds |

### Current Semantic Completion vs RE-2

```text
Discovery time ≠ semantic time.
Representation absence ≠ semantic absence.
```

A newly explicit `BR-*`, `IR-*`, `PFR-*` or equivalent owner-local must-hold is **not automatically `RE-2`**. If accepted current owner meaning already uniquely entails that constraint, making the constraint explicit is `CURRENT SEMANTIC COMPLETION` and remains `RE-0`: accepted semantics do not change even though representation/Requirement identity may be added or clarified.

```text
missing explicit Requirement
+ meaning already entailed by accepted current owner
→ CURRENT SEMANTIC COMPLETION
→ RE-0
→ current natural owner representation may be completed
→ no semantic Evolution Step

meaning not already entailed
+ current owner must newly select/accept it
→ RE-2
→ semantic change
```

If current implementation/Evidence also violates an already-entailed must-hold, that adds `CURRENT REALIZATION CORRECTION`; it still does not turn the must-hold itself into future semantics. The active profile owns Requirement-family interpretation and exact representation.

### Decision-Surface Test

Do not classify by vocabulary such as “architecture” alone. A detail at architecture depth is not automatically an architecture Decision. Ask in order:

```text
Can the correction be made while all accepted owner Decisions, durable must-holds/Requirements
and owner boundaries remain true?
  yes, one route is already implied → RE-0
  yes, several implementation/detail routes may fit → RE-1

Must selected meaning at the current natural owner change or be newly selected?
  yes → RE-2

Does the finding instead challenge a dependency/assumption owned upstream?
  possible / not yet resolved → RE-3
  actual upstream selected meaning must change → RE-4
```

The **most-upstream affected owner** controls escalation. Do not hide `RE-3` / `RE-4` by compensating in a downstream implementation detail. Revalidate through `UC-IDTSPE-REVALIDATE-CURRENT-WORK` and preserve unaffected accepted meaning.

<a id="finding-classification-consequence-basis"></a>
### Required classification and consequence basis

For each material Finding presented for review, the AI MUST provide the following diagnostic meaning, using [evidence-backed resolution conclusions](../proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-claim-grounding) for references and concise public rationale:

| Conclusion | Required justification |
|---|---|
| Review Priority | Explain the concrete cost/blast radius if the Finding is handled incorrectly and identify the affected subject/consumers. Use the AI Reviewability scale; severity is not inferred from RE or technical vocabulary. |
| Resolution Escalation | Identify the current natural owner, the accepted meaning at stake and why the selected RE category fits the checked decision surface. State what remains unchanged or must change; do not merely repeat the category definition. |
| Upstream consequence | Identify the earliest implicated owner/Requirement/Decision/Source and the supported preserve/challenge/change/revalidation consequence. If none is implicated within the checked scope, explain the checked boundary and basis. |
| Downstream consequence | Identify the material consumers/results, the dependency or usage Evidence, and the current exposure/needed recheck. Separate that finding-level consequence from conditional effects of a particular later Proposal. |
| USER attention / decision consequence | State what the USER actually needs to inspect, answer or select and why; a claim that no new semantic selection is needed must cite already accepted meaning or an explicit USER statement. |

`RE-0` requires positive support that the correction's meaning is already entailed; `RE-1` requires support that remaining choices stay inside the accepted semantic boundary. For `RE-2`/`RE-4`, cite the existing meaning and explain the required semantic difference. For `RE-3`, cite the challenged upstream assumption/owner and the Evidence exposing the uncertainty; do not assert that upstream change is already established.

Do not default an unsupported classification to `RE-0`, low priority, or no impact. Keep the uncertain conclusion provisional/unresolved and name the missing discriminator. Missing local information alone does not establish `RE-3`; upstream exposure must itself have a basis. Revisit classification when the relevant meaning, dependency or Evidence changes.

This is diagnostic justification, not a requirement to prepare correction payloads during Finding discovery. It may state the kind/boundary of resolution needed while leaving candidate formation to the subsequent Proposal action. The linked Proposal later reviews its own candidate-specific effects under [Proposal Semantic Change Impact Review](../proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#proposal-semantic-change-impact-review). A shared checked basis can be referenced without duplicating it.

#### Worked diagnostic boundary

```text
Observed basis (illustrative case):
  accepted Rule R-1 in owner O says only CURRENT_BASIS is valid here;
  command C declares LEGACY_MODE;
  consumer H derives its command projection from C.

Finding diagnosis, before correction payload:
  RE-0: R-1 already determines the required meaning; C contradicts it.
  Upstream: preserve O/R-1; the checked evidence does not require a new mode.
  Downstream: H must be rechecked because it derives this value from C.
  Priority Normal: the demonstrated exposure is bounded to C and H;
    there is no evidence in this case for a wider consumer claim.
  USER: no new semantic choice about valid modes; R-1 already settles it.

Later Proposal:
  change C to CURRENT_BASIS, then refresh/check H; cite R-1 and the C→H basis.

If R-1 cannot be read or its acceptance is unknown:
  the deterministic classification is not established; resolve that source gap.
If the only USER statement is "improve command handling":
  quote it as intent, but do not use it as proof that this exact mode was selected.
```

Real review output replaces these illustrative labels with actual document/subject references or identifiable USER excerpts. The example demonstrates that a supported RE-0 may still have downstream work.

### Proposal / Decision Boundary

Interaction gating and formal Core semantics remain distinct, but a material Finding is not considered fully dispositioned for review/output purposes until it has a linked Proposal representation of its current resolution route.

```text
material Finding
→ Finding Disposition / RE-* classification
→ form or refine at least one linked IDTSPE Proposal
   that preserves the Finding as driver/provenance

RE-0 deterministic/current-semantic completion
→ linked deterministic-correction Proposal
→ candidate Result/repair route is already implied by accepted meaning
→ no new semantic selection/Decision is required merely to establish that meaning

RE-1 local realization choice inside accepted meaning
→ linked local-realization Proposal(s)
→ selection is needed only when several local routes materially differ

RE-2 current-owner semantic change
→ linked formal IDTSPE Proposal at the current natural owner
→ MUST be reviewed/selected before semantic integration

RE-3 upstream revalidation
→ linked revalidation-gated Proposal
→ state is BLOCKED_BY_REVALIDATION / not selectable
→ revalidate earliest affected upstream owner, then refine/reclassify the Proposal

RE-4 upstream semantic change
→ linked formal IDTSPE Proposal at the affected upstream owner
→ MUST be reviewed/selected before semantic integration
```

`RE-*` categorizes the Finding's semantic resolution distance, not the Proposal itself. The linked Proposal records the candidate correction/result/realization route appropriate to that classification. For `RE-0`, this is an addressable deterministic correction proposal rather than a new semantic-choice surface. For `RE-3`, it is an explicitly blocked continuation candidate rather than a premature upstream semantic selection. For `RE-2`/`RE-4`, it is the formal semantic-change candidate required before selection/integration.

The AI is responsible for forming/refining the linked Proposal with the smallest natural semantic subject, Finding driver/provenance and candidate meaning/route needed by the Proposal owner. Every material Proposal receives the canonical Proposal Semantic Change Impact Review proportionally; a blocked `RE-3` Proposal may defer material selection review until revalidation makes its candidate selectable.

A Session Generic AI Proposal (`GIP`) is **not** a substitute for this semantic handoff. A GIP may present/reference the IDTSPE Proposal when an interaction-level action/authorization surface is useful, but the semantic candidate itself remains the IDTSPE Proposal and the GIP must not duplicate or replace its authority.

Proposal existence is independent of persistence. A linked Finding Proposal may remain transient in the current Work Context/conversation; neither `RE-0..RE-4` nor "formal IDTSPE Proposal" implies a dedicated file, register entry or other physical persistence. Retention/physical representation remains owned by the Proposal/Decision lifecycle plus Representation / P-14.

### Temporal Authority Specialization

`RE-2` / `RE-4` identify the semantic decision surface that must change; they do **not** universally mean that the current natural-owner body is rewritten immediately after selection. The active profile decides where newly selected but unrealized meaning is hosted.

For current SDS:

```text
RE-2 / RE-4 selects a semantic correction
+ correction is not yet realized
→ integrate the selected desired state into the applicable TM-EVOLUTION-STEP Target Owner Body
→ current natural owner remains realized truth
→ after implementation + required proof/revalidation
   Target Owner Materialization updates current owner authority
```

A deterministic `RE-0` correction that restores already-accepted current meaning **or completes its missing explicit representation** does not require a new future semantic body. Only genuinely new selected unrealized semantics belong to an Evolution Step; literal repair work may still use ordinary exact planning without making the Step semantic owner.

### Profile / Depth Specialization

Core does not define a universal numeric architecture/Requirement depth. A profile or Target owner may supply depth vocabulary and specialized durable semantics. When SDS is active, for example, `Most-upstream affected meaning/depth` may use the SDS `PL-L0 ... PL-L4` guidance and Requirement impact is resolved through the SDS natural-owner Requirement contract. The generic `RE-*` category still belongs here.

Useful transient review fields when material:

```text
Review Priority: Critical | High | Normal | Low + concrete impact rationale / basis
Resolution Escalation: RE-0 | RE-1 | RE-2 | RE-3 | RE-4 + decision-surface rationale / basis
Review Category: <architecture / engineering / product / ... when useful>
Current semantic owner / affected meaning: ...
Most-upstream affected owner / depth: ...
Upstream consequence / basis: preserved | challenged | change needed | unresolved ...
Decision / Requirement impact: NONE | LOCAL-DETAIL | CURRENT-OWNER | UPSTREAM
Upstream revalidation: NONE | POSSIBLE | REQUIRED
Proposed correction / Proposal status: ...
Downstream current exposure / dependency basis: ...
Candidate-specific downstream consequence, when a Proposal exists: preserve | update | revalidate | invalidate | unresolved ...
USER review: <what the USER needs to inspect/select, why, and accepted basis if no new semantic selection is needed>
```

These fields are a projection over existing Finding, Proposal/Decision, Q/R/P and Revalidation semantics. Field labels/formatting and persistence remain proportional; the required classification/consequence basis above must be recoverable even in a compact conversational result.

---

## 7. Finding Candidate vs State Unit

Do not add a mandatory first-class `Finding` State Unit merely because this bridge exists.

```text
transient newly surfaced observation
→ Finding Candidate / envelope

independent durable validation/readiness finding is useful
→ existing validation/readiness finding State Unit may be used

otherwise
→ disposition directly into the appropriate existing
  Question / Risk / Proposal / Evidence / Decision input /
  Revalidation / handoff / etc.
```

If repeated use later proves that undispositioned findings need their own independent registry/lifecycle/persistence, that is a separate Core design decision.

---

## 8. Lens Boundary

Lens applicability, Analysis Surface, supported operations (`ANALYZE / CHECK / REFINE / CHALLENGE`) and Typical Findings are owned by [`../lenses/LENS-MODEL.md`](../../lenses/LENS-MODEL.md) and each concrete Lens. This contract begins only when newly surfaced meaning needs Core ownership/State/lifecycle disposition.

```text
Lens explanatory analysis / Key Points
→ may remain discussion only

material newly surfaced semantic consequence
→ Finding Candidate
→ this Finding Disposition contract
→ State / owner / lifecycle consequence
```

Therefore a Lens may suggest affected meaning or likely owner, but it does not own `REOPEN`, Target Formation, State-Unit routing, handoff authority or direct Result-Unit mutation. Those are disposition/lifecycle consequences after the Lens boundary.

## 9. Validator / Evidence / User Boundary

The same mechanism applies outside Lenses.

Example — validator:

```text
CHECK:
  Runtime Path and selected ownership/dependency meaning disagree

Finding
→ Core disposition
→ Risk / Question / validation finding
→ resolution
```

Example — Evidence:

```text
Evidence:
  integration test proves commit can fail
  after the selected service reports success

Finding
→ strengthen Risk
→ challenge accepted Decision
→ possible revalidation
```

Example — user clarification:

```text
User:
  retryable failure must not be shown here

Finding / accepted input
→ resolve authority/owner
→ update Scenario meaning if authorized
→ current Slice receives revalidation dependency
```

---

## 10. Result / Resolution Update Rule

Canonical proportional path:

```text
Finding
→ Finding Disposition
→ smallest correct subject / owner
→ Unit Resolution or other canonical lifecycle consequence
→ normal authority/resolution
→ accepted/derived meaning
→ affected Current Result Content / Target Result / owner meaning updated when warranted
```

A trusted low-contention direct correction may integrate proportionally without manufacturing intermediate State objects.

## 11. Cross-Owner Disposition

The old Lens-specific idea of `External Routing` is replaced by ordinary Core disposition.

```text
finding belongs to current Target
→ resolve here

finding belongs to another existing semantic owner
→ handoff/reference there

ownership itself is unclear
→ ownership resolution / Target Formation when material
```

Example:

```text
Slice finding:
  failure must be truthful,
  but retryable-vs-terminal product behavior is undefined

Slice does not invent Scenario semantics.

Finding Disposition
→ Scenario/Application owner Question or handoff
→ upstream resolution
→ accepted upstream result becomes Source for Slice refinement
```

A cross-owner disposition does not automatically create a child Target.

---

## 12. Revalidation

Revisit disposition when:

```text
owner contract changes
new Evidence changes materiality
an accepted Decision is invalidated
Target boundaries are split/merged
Result Unit ownership changes
finding was deferred under assumptions that no longer hold
```

Finding provenance should remain traceable when revalidation value is material.
