# Finding Disposition Contract

Status: active generic methodology owner  
Purpose: define how newly surfaced potentially material meaning from Lenses, validators, Evidence, implementation observations, user clarification and other producers is assigned to the correct IDTSPE ownership/state/lifecycle destination without making the producer semantic authority.

---

## 1. Core Definition

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

The producer is not the destination authority.

Possible producers include:

```text
Lens
Validator / readiness check
Evidence check
implementation observation
consistency check
user clarification
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

Canonical working-conversation owner: [`broad-discussion-and-integration-checkpoint-model.md`](broad-discussion-and-integration-checkpoint-model.md).

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

```text
finding concerns an existing bounded Unit responsibility
→ that Unit Resolution

no suitable Unit, but a bounded local responsibility is independently useful
→ Contextual Unit

responsibility independently substantial
→ Target Formation
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

## 6A. Resolution Escalation Projection

When a material Finding is surfaced for review, expose **how far semantic resolution must escalate** when that distinction helps the USER understand whether the correction is deterministic, local, owner-semantic, or upstream-affecting.

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
| `RE-0 DETERMINISTIC-CORRECTION` | a confirmed defect has one correction clearly implied by current accepted meaning/contracts | none; accepted Decision/Requirement/owner meaning remains unchanged | correction can be presented compactly; no new semantic choice to decide |
| `RE-1 LOCAL-REALIZATION-CHOICE` | one or more realization/detail routes fit the same accepted current-owner meaning | no accepted architecture/behavior/Requirement/owner-boundary change; a local detail may vary | focused review only when local trade-off matters; AI may recommend a route |
| `RE-2 CURRENT-OWNER-SEMANTIC-CHANGE` | safe resolution requires new/revised selected meaning at the current natural owner | current-owner Decision, durable must-hold/Requirement when the active profile defines one, boundary, or equivalent owner result changes | USER reviews/selects the current-owner Proposal when selection authority is USER-owned |
| `RE-3 UPSTREAM-REVALIDATION` | current work exposes evidence that an upstream owner/Decision/Requirement may be implicated, but an upstream semantic change is not yet established | unknown until the earliest affected upstream owner is revalidated | USER is shown the upstream exposure; revalidation/evidence comes before selecting a downstream workaround |
| `RE-4 UPSTREAM-SEMANTIC-CHANGE` | safe resolution requires an actual new/revised/replaced upstream Decision/Requirement/owner meaning | upstream accepted meaning changes; affected downstream work must consume the new result | USER reviews/selects at the upstream decision surface before dependent work proceeds |

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

### Proposal / Decision Boundary

Interaction gating and formal Core semantics remain distinct:

```text
Finding
→ may resolve deterministically with no formal Proposal
→ may open/refine a Proposal when real candidate semantic meaning exists
```

`RE-*` categorizes the Finding's semantic resolution distance, not a Proposal. If Finding resolution produces a material Proposal, that Proposal receives the canonical Proposal Semantic Change Impact Review before material selection.

A deterministic `RE-0` correction must not manufacture a formal Proposal/Decision surface solely for ceremony. A material `RE-2`/`RE-4` normally exposes a real selection surface, but the exact Proposal/Decision retention semantics remain owned by the Proposal/Decision contract.

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

A deterministic `RE-0` repair that simply restores already-accepted current meaning does not require a new future semantic body unless the repair itself needs material future-transition planning.

### Profile / Depth Specialization

Core does not define a universal numeric architecture/Requirement depth. A profile or Target owner may supply depth vocabulary and specialized durable semantics. When SDS is active, for example, `Most-upstream affected meaning/depth` may use the SDS `PL-L0 ... PL-L4` guidance and Requirement impact is resolved through the SDS natural-owner Requirement contract. The generic `RE-*` category still belongs here.

Useful transient review fields when material:

```text
Review Priority: Critical | High | Normal | Low
Resolution Escalation: RE-0 | RE-1 | RE-2 | RE-3 | RE-4
Review Category: <architecture / engineering / product / ... when useful>
Current semantic owner / affected meaning: ...
Most-upstream affected owner / depth: ...
Decision / Requirement impact: NONE | LOCAL-DETAIL | CURRENT-OWNER | UPSTREAM
Upstream revalidation: NONE | POSSIBLE | REQUIRED
Proposed correction / Proposal status: ...
Downstream consequence if accepted: NONE | REVALIDATE ... | INVALIDATE ...
USER review: <compact statement of what the USER actually needs to inspect/select>
```

These fields are a projection over existing Finding, Proposal/Decision, Q/R/P and Revalidation semantics. Do not persist all of them by default.

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

Lens applicability, Analysis Surface, supported operations (`ANALYZE / CHECK / REFINE / CHALLENGE`) and Typical Findings are owned by [`../lenses/LENS-MODEL.md`](../lenses/LENS-MODEL.md) and each concrete Lens. This contract begins only when newly surfaced meaning needs Core ownership/State/lifecycle disposition.

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
→ affected Unit Result Content / Target Result / owner meaning updated when warranted
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
