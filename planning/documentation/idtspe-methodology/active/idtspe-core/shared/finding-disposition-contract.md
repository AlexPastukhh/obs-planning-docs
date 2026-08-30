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
  Lens / Validator / Evidence / User / Implementation / ...
        │
        ▼
     Finding Candidate
        │
        ▼
IDTSPE Core Finding Disposition
        │
        ├─ materiality
        ├─ affected/current meaning
        ├─ semantic resolution owner
        ├─ State/lifecycle representation
        └─ downstream consequence
        │
        ▼
IDTSPE State / Target lifecycle
        │
        ▼
normal authority / resolution
        │
        ▼
existing Target Step Result Unit updated when warranted
```

A finding must not silently mutate an accepted Result Unit or Decision.

---

## 3. Disposition Questions

Resolve proportionally:

```text
1. Is the finding material?
2. What existing meaning does it concern?
3. Who semantically owns resolution?
4. What IDTSPE State/lifecycle representation is appropriate?
5. What downstream consequence follows after resolution?
```

Useful owner outcomes:

```text
current Target
another existing Target
shared/canonical owner
ownership unresolved
```

Useful State/lifecycle outcomes include:

```text
open/refine Question
open/refine Risk or Problem
open/refine Idea / Planning Branch
attach Evidence / open Evidence Need
supply Decision input
challenge accepted Decision/state
create Revalidation Signal
record Target Relation / Handoff
form an ownership/Target candidate
mark duplicate / non-material / already represented
```

The exact disposition uses current Core lifecycle rules; this contract does not create a second lifecycle.

---

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

Example:

```text
Finding F-17

Meaning:
  persistence failure translation ownership is not explicit

Affected:
  Codebase Integration Path.failurePropagation

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

## 7. Finding Candidate vs State Unit

Do not add a mandatory first-class `Finding` State Unit merely because this bridge exists.

```text
transient newly surfaced observation
→ Finding Candidate / envelope

independent durable validation/readiness finding is useful
→ existing validation/readiness finding State Unit may be used

otherwise
→ disposition directly into the appropriate existing
  Question / Risk / Idea / Evidence / Decision input /
  Revalidation / handoff / etc.
```

If repeated use later proves that undispositioned findings need their own independent registry/lifecycle/persistence, that is a separate Core design decision.

---

## 8. Lens Boundary

A Lens defines:

```text
perspective
Analysis Surface
supported Lens operations
criteria / questions / guards
Typical Findings / Finding Contract
Knowledge Basis
```

Generic Lens operations are:

```text
ANALYZE
CHECK
REFINE
CHALLENGE
```

They mean:

```text
ANALYZE
→ inspect the Analysis Surface through this perspective

CHECK
→ evaluate current meaning against Lens criteria/guards

REFINE
→ identify/propose more precise or missing meaning
  where the semantic destination is already understood

CHALLENGE
→ search for reasons selected/accepted meaning
  may be wrong, weak, stale or unsupported
```

The following are **Core disposition/lifecycle consequences**, not Lens methods:

```text
open/refine State Unit
REOPEN
update Result Unit after resolution
handoff to another owner
Target Formation
```

Therefore:

```text
Lens REFINE
≠ direct mutation of accepted Result Unit

Lens CHALLENGE
≠ REOPEN

Lens CHECK
≠ lifecycle transition

Lens
≠ routing authority
```

---

## 9. Validator / Evidence / User Boundary

The same mechanism applies outside Lenses.

Example — validator:

```text
CHECK:
  Runtime Path and Codebase Integration Path disagree

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

## 10. Result Update Rule

Canonical path:

```text
Finding
→ Finding Disposition
→ State Unit / lifecycle consequence
→ normal authority/resolution
→ accepted meaning
→ existing Result Unit updated when warranted
```

A trusted low-contention direct source correction may still be integrated proportionally under normal authority rules; do not manufacture ceremony solely to satisfy the diagram.

---

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
