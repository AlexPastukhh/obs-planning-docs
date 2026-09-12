# Contextual Methodology Application Contract

Status: active generic IDTSPE contract

Purpose: make IDTSPE **always active but proportionate**. This is the fundamental situational-application mechanism; it is deliberately **not a Lens**.

Generic documentation authority: [`../../../../principles-and-terminology.md`](../../../../principles-and-terminology.md), especially Use Case, Process, Use-Case Applicability Scan and Contextual Guidance Principle.

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
   Which declared State/Result meaning is useful enough to instantiate/populate now?
```

No layer automatically implies the next layer must produce something.

Examples:

```text
Lens Registry scanned
→ no Lens materially applicable
→ valid result

TM-FEATURE selected
→ optional Result Unit not material
→ leave it absent

Broad Discussion clarifies concern
→ no Target needed yet
→ continue Broad Discussion
```

## 3. Recommendation Semantics

Preserve the former Session Guidance Recommendation meaning at IDTSPE methodology-use level:

```text
recommended
≠ selected

selected
≠ automatically executed

available
≠ applicable

applicable
≠ exhaustive completion
```

For a material recommendation, the active Use-Case Process may determine that it is:

- applicable as-is;
- useful with contextual adaptation;
- useful as theory/inspiration only;
- deferred until a clear recheck trigger;
- not useful now.

A binding authority/permission rule is not optional merely because other methodology guidance is contextual. Contextual application changes **how much supporting methodology is useful**, not who has authority to approve destructive/external effects or accepted semantic decisions.

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
- An optional Result Unit may remain absent.
- A resolved branch may stop being actively represented if its retained Decision is sufficient.
- A checkpoint does not force a permanent checkpoint artifact.

## 8. Recheck Rule

Re-evaluate proportional composition at material next-action boundaries and after context change. This is a logical check; unchanged registry/component metadata may be reused.

Particularly recheck after:

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
