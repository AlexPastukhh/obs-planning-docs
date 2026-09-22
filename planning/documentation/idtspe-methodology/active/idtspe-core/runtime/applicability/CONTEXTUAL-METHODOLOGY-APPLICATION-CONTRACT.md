# Contextual Methodology Application Contract

Status: active generic IDTSPE contract

Purpose: make IDTSPE **always active but proportionate**. This is the fundamental situational-application mechanism; it is deliberately **not a Lens**.

Generic documentation authority: [`Principles & Terminology`](../../../../../principles-and-terminology.md), especially [`Use-Case Applicability Scan`](../../../../../principles-and-terminology.md#doc-use-case-applicability-scan), [`Contextual Guidance Principle`](../../../../../principles-and-terminology.md#doc-contextual-guidance), and [`Registry Scan`](../../../../../principles-and-terminology.md#doc-registry-scan), plus the generic Use Case/Process definitions.

## 1. Core Invariant

```text
IDTSPE is always the current planning/resolution work model.

IDTSPE active
≠ Target required
≠ formal State Unit required
≠ Target Module required
≠ Lens required
≠ Integration Checkpoint required
≠ persistence required
≠ maximal methodology depth required
```

The question is never "enable IDTSPE or not?". The question is:

> **What is the smallest useful IDTSPE projection for the current situation?**

## 2. Four Applicability Layers

Use situational selection at four different layers rather than one global yes/no switch:

```text
1. Use-Case relevance
   What methodology-use capability is needed now?

2. Registry/component relevance
   Which component families are worth consulting?

3. Component applicability
   Does this Target Module / Lens / guidance entry actually apply?

4. Unit/field materiality
   Which declared Result Units require substantive resolution now, and which remain visible with explicit omission disposition?
```

No layer automatically implies the next layer must produce something.

Examples:

```text
Lens Registry scanned
→ no Lens materially applicable
→ valid result

TM-FEATURE selected
→ one Module-defined Result Unit not material
→ keep the Unit visible
→ record a concise omission reason
→ do not perform substantive Unit work

Broad Discussion clarifies concern
→ no Target needed yet
→ continue Broad Discussion
```


## 2A. Explicit Port Requirement

Explicit USER/command/component intent may require one normal Shell port to be **traversed even when ordinary composition would not have selected it proactively**. This is a request for a real applicability/route check, not authority to fabricate a result.

```text
explicit port requirement
→ normal Use-Case/context composition remains active
→ enter/check the requested Shell port
→ apply the same local owner/applicability/authority guards
→ APPLIED | CHECKED_NO_CHANGE | CHECKED_NO_RESULT | NOT_APPLICABLE | REUSED | BLOCKED | DEFERRED
```

Several explicit requirements may be merged into one Shell pass. Shared meta-methodology/registry/owner prefixes are resolved once per unchanged subject/basis/operation and reused. Canonical trace/reuse semantics are owned by [`../PASS-TRACE-AND-VISIBILITY-CONTRACT.md`](../PASS-TRACE-AND-VISIBILITY-CONTRACT.md).

## 3. Inherited Contextual Guidance Semantics

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Use-Case Applicability Scan`](../../../../../principles-and-terminology.md#doc-use-case-applicability-scan) — `DOC.USE-CASE-APPLICABILITY-SCAN`
> - `CONTEXTUALIZES` [`Contextual Guidance Principle`](../../../../../principles-and-terminology.md#doc-contextual-guidance) — `DOC.CONTEXTUAL-GUIDANCE`
> - `CONTEXTUALIZES` [`Registry Scan`](../../../../../principles-and-terminology.md#doc-registry-scan) — `DOC.REGISTRY-SCAN`

Generic recommendation/selection semantics are owned by those Documentation principles. IDTSPE inherits that contract rather than redefining it here.

IDTSPE specializes the generic rule through the four applicability layers above:

```text
Use-Case relevance
→ registry/component relevance
→ component applicability
→ Unit/field materiality
```

A binding authority/permission rule remains binding where it applies. Contextual application changes **how much supporting methodology is useful**, not who has authority to approve destructive/external effects or accepted semantic decisions.

## 4. Why This Is Not A Lens

A Lens analyzes a selected Analysis Surface through a reusable evaluation perspective.

This contract instead governs **methodology composition itself** before/during component selection. Making it a Lens would create recursion:

```text
need to know whether Lenses are useful
→ apply meta-Lens
→ need to know whether meta-Lens is useful
→ ...
```

Therefore situational methodology composition is owned by Use Cases + registry routing + local component applicability/materiality gates.

## 5. Broad Discussion Is A Complete Valid Projection

Broad Discussion is the default low-ceremony IDTSPE working surface.

It may be sufficient when:

- the concern is still being understood;
- alternatives are too immature for formal Proposal lifecycle;
- no independently useful Target boundary exists yet;
- no State Unit needs durable/addressable lifecycle;
- no Target Module/Lens adds enough value yet;
- the current answer/action is simple enough that formal integration would add no clarity.

Broad Discussion may still use concise Key Points for material logical structure.

When material addressability/lifecycle/integration becomes useful, selectively promote meaning into Core State/Target Results rather than serializing the entire discussion.

## 6. Escalation Triggers

Escalate only where the next structure has independent value. Typical triggers:

```text
Broad Discussion → Target
when a bounded result/owner/scope is useful enough to manage explicitly

Discussion → formal Proposal / Q-R-P / Decision / Evidence
when candidate/unresolved/accepted/evidentiary meaning needs lifecycle or addressability

Current work → Target Module Registry
when a recurring Target family may provide useful production structure

Current work → Lens Registry
when a reusable evaluation perspective may materially improve/check current meaning

Current work → Integration Checkpoint
when a coherent whole-state view is more useful than continuing local discussion

Current work → persistence
when continuation/review/handoff/authority benefits from physical representation
```

These are usefulness triggers, not mandatory phases.

## 7. De-escalation / Omission

IDTSPE may also become **lighter** as work changes.

- A previously relevant Lens need not be rerun when its recheck conditions have not changed.
- A State Unit may be superseded/retired when it no longer represents current useful state.
- A non-material Module-defined Result Unit remains visible with an explicit omission disposition; optional fields inside a Unit may still remain absent when their contract allows it.
- A resolved branch may stop being actively represented if its retained Decision is sufficient.
- A checkpoint does not force a permanent checkpoint artifact.

<a id="idtspe-methodology-composition-recheck"></a>
## 8. Recheck Rule

Responsibility ID: `IDTSPE.METHODOLOGY-COMPOSITION-RECHECK`

This section owns the IDTSPE-level rule for **when current Use-Case/methodology composition is re-evaluated**. Re-evaluate at material next-action boundaries and after context change. This is a logical check; unchanged registry/component metadata may be reused.

> Semantic Owner Dependency
> Type: CONTEXTUALIZES
> Responsibility: `IDTSPE.PORT-COMPOSITION-REFRESH`
> Owner: [`Port Composition Refresh Rule`](../IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md#idtspe-port-composition-refresh)

Independently, **before every normal IDTSPE Shell pass**, refresh or reaffirm the current Port Requirement Set under the canonical Shell runtime contract. This is intentionally cheap: when current composition, explicit requirements, downstream materiality and recheck/defer obligations are unchanged, the prior determination may be reused. Previous-pass port admission is not persistent authority, and automatic refresh does not create a focused/narrowed port subset without explicit USER intent.

Particularly recheck methodology composition after:

- USER redirect/scope change;
- material Proposal/Decision;
- Finding/Evidence;
- target/owner/profile change;
- revalidation;
- transition toward Exact/materialization;
- methodology change.

## 9. High-Level Examples

### Example A — remain broad

```text
USER: "I think these two concepts overlap; help me reason about them."

Use-Case scan
→ UC-IDTSPE-COMPOSE-CURRENT-WORK
→ Broad Discussion sufficient
→ no Target yet
→ no Lens yet
→ no Checkpoint yet
```

IDTSPE was used: it explicitly concluded that deeper structure was not useful yet.

### Example B — introduce only one State Unit

```text
Broad Discussion
→ one unresolved authority choice now blocks further work
→ create Question/Q-R-P state only for that material issue
→ continue discussion
```

No need to create a full Target Result just because one State Unit became useful.

### Example C — targeted registry deepening

```text
current Slice planning exposes cancellation/resource-lifetime concern
→ UC composition says reusable implementation guidance may help
→ SDS Programming Principles Registry scan
→ only RG-PRG-RESOURCE-MANAGEMENT + RG-PRG-TIMEOUT-CANCELLATION-BOUNDS match
→ read only those detail sections
→ natural Slice/VOO/Quality owners apply the guidance
```

The existence of 22 principles does not create a 22-item checklist.
