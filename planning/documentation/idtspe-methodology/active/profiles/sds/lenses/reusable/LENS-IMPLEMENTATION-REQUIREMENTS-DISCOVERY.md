# LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY — Owner-Local Implementation Requirements Discovery

Role: reusable discovery/evaluation Lens  
Purpose: discover whether a material implementation/proof concern should become, change or retire a durable owner-local Implementation Requirement.

This Lens **does not own Requirements**. It is composed with thematic evaluators and reusable knowledge such as DDD, Vertical Slice, selected Programming Principles `RG-PRG-*` entries, Evolution, quality, trust/security or operability. The thematic evaluator explains the concern; this Lens classifies durable must-hold meaning and routes it to the natural implementation owner.

## Applicability

Use when current implementation/proof reasoning may need to become, change, move, merge, retire or explicitly *not become* durable owner-local IR/PFR meaning. Do not apply merely because implementation planning exists.

## Analysis Surface

**Primary:** a material implementation/proof concern plus the relevant natural Domain/Slice/Shared owner and existing owner-local IR/PFR set.  
**Conditional:** Feature behavior, Scenario must-holds, selected Evolution, thematic Lens findings, selected `RG/RR/RRC` guidance, accepted Decisions/Risks/Questions and proof Evidence.  
**Context:** current Work Context/Target and requirement-ownership rules.

## Supported Operations

```text
ANALYZE   — classify whether the concern is durable/must-hold/owner-local and identify natural ownership
CHECK     — test necessity, relevance, duplication, proof anti-accumulation and lifecycle coherence
REFINE    — improve existing/candidate IR/PFR wording, scope or classification
CHALLENGE — surface a Finding Candidate when durable requirement meaning is misplaced, excessive, missing or stale
```

A valid result is `NO_DURABLE_REQUIREMENT_CHANGE`.

## Natural owner rule

Selected durable implementation requirements live only with their natural owner:

```text
TM-SLICE-OWNER  → IR-SLICE-*  / optional owner-local PFR-*
TM-DOMAIN-OWNER → IR-DOMAIN-* / optional owner-local PFR-*
TM-SHARED-IMPLEMENTATION-CAPABILITY → IR-SHARED-*
```

A transient Slice/Domain discovery plan may discover candidates but is never durable authority. No standalone Requirement Target is needed.

## Requirement meaning

An Implementation Requirement is a durable must-hold implementation constraint on exactly one natural implementation owner.

A Proof Requirement (`PFR-*`) is rare: it is a durable non-obvious constraint on proof realization/execution, not a test catalog and not an ordinary statement that behavior should be tested.

One Requirement is not one test. Tests/Evidence establish or challenge truth; they do not define Requirement meaning.

## Optional 3 × 2 discovery kernel

Use only the cells relevant to the current concern. It is a reasoning aid, not a mandatory matrix artifact.

| | IMPLEMENTATION | PROOF |
|---|---|---|
| Correctness | What must implementation preserve/forbid so selected behavior remains true? | What non-obvious proof-realization constraint is needed to establish correctness credibly? |
| Local Reasoning / Maintainability | What must remain local/explicit/owned so future reasoning/change does not smear responsibility? | What proof structure must remain stable/local enough to detect regression without locking private implementation? |
| Evolution Fitness | What current constraint preserves a healthy path to selected known Evolution? | What proof realization must remain capable of demonstrating the known transition or compatibility boundary? |

The PROOF column does not imply a PFR. Most answers are ordinary test/proof design or no durable Requirement.

## Discovery flow

```text
material implementation/proof concern
→ apply relevant thematic Lens(es)
→ ask whether the concern is durable + must-hold + owner-local
→ classify natural owner
→ compare with existing owner Requirements
→ KEEP / ADD NEW / REFINE / WEAKEN / STRENGTHEN / MERGE / REPLACE DECISION / RETIRE / MOVE / REOPEN / ACCEPT RISK
→ if selected, write independently approved local IR/PFR text in natural owner
→ prove through natural proof boundary
↺ implementation/proof findings may reopen discovery
```

## Non-monotonic lifecycle

Requirement discovery is not accumulation. A later finding may weaken, merge, replace, move or retire a Requirement.

Identity guidance:
- wording refinement preserving the same semantic constraint may keep the same ID;
- split/merge or move to another natural owner creates/retires identities explicitly;
- do not silently reinterpret an existing ID to mean a materially different constraint.

## Necessity / relevance checks

Before adding durable Requirement meaning ask:

- Does selected behavior/owner correctness actually require this constraint?
- Would removing it permit an unacceptable implementation while still appearing compliant?
- Is it a durable must-hold constraint or merely today's implementation choice?
- Is the owner-local text independently understandable without live reusable-guidance inheritance?
- Is the concern already owned upstream as Feature behavior, Domain semantics, Shared contract or Evolution target state?

Do not atomize one algorithm/invariant into many tiny Requirements merely because it contains several implementation steps.

## Rare / support / trust classification

When a concern looks exceptional, classify the **condition first**:

```text
supported normal behavior
supported but rare edge case
abnormal but plausible operating condition
trusted-environment customization / misconfiguration
explicitly unsupported condition
outside selected trust boundary
host compromise
```

Then classify the needed response:

```text
ordinary owner-local IR
rare owner-local PFR
support/operability concern
security/trust/authority constraint
code-level decision with no durable doc need
upstream behavior/owner problem
explicit accepted Risk / Known Problem
OPEN / insufficient Evidence
```

Use the relevant thematic Lens to establish semantics; do not create taxonomy-specific owner types by reflex.

A rare case is not automatically ignored and does not automatically deserve a Requirement. The selected support/trust boundary decides.

## Accepted risk / exceptions

Accepted risk does not silently make Requirement violation conformant.

If selected behavior/constraint is intentionally not fully satisfied, represent the situation explicitly through the methodology's partial/known-exception/revalidation mechanism. Otherwise revalidate the upstream Requirement/behavior itself.

## Proof anti-accumulation

Do not turn every test observation into a PFR. A PFR exists only when proof realization itself carries durable non-obvious must-hold meaning.

When a proof weakness appears, ask before adding/changing a PFR:

```text
Was the existing PFR actually too weak?
Was the PFR correct but literal proof realization wrong?
Can existing PFRs be simplified/merged?
Is the proof coupled to incidental private HOW?
Is a new durable proof-realization constraint actually needed?
Does proof difficulty instead reveal a poorly shaped production IR/realization?
```

Bug escapes, false positives/negatives, weak assertions, nondeterminism, boundary bypass, fragile private call-order assertions, poor isolation and weak diagnostics are Findings/Sources. They do not automatically create Requirements.

Normal proof remains:

```text
Domain semantic rule → Domain unit proof
Feature/Slice behavior → whole-Slice integration proof
Scenario whole-journey behavior → optional E2E proof when independently useful
Shared capability → consuming Slice proof + focused local tests when useful
```

## Bidirectional production ↔ proof

```text
implementation reasoning → proof question
proof failure/limitation → Finding Candidate
→ refine implementation / Requirement / owner / behavior as warranted
```

Proof may reveal that a proposed IR is unnecessary, wrong-owner, too strong/weak, or that upstream behavior is underspecified.

## Legacy normative migration

Legacy labels such as `SI-*`, `DI-*`, `TST-*` are discovery/migration Sources only:

```text
legacy normative meaning
→ inspect semantics + natural owner
→ propose target IR/PFR/Decision delta
→ USER approval
→ only then write current owner authority
```

Do not silently relabel legacy IDs into current IR/PFR authority.

## Reusable guidance relation

Use the shared `reusable-guidance-model.md` semantics. `RR-*`/`RRC-*`/principles/patterns are discovery sources only. A selected local `IR-*` is independent natural-owner authority and never live-inherits future reusable-guidance edits.

## Guards

```text
IR Discovery Lens ≠ Requirement owner
candidate IR ≠ selected IR
PFR ≠ test case / test catalog
one Requirement ≠ one test
more Requirements ≠ better design
accepted risk ≠ silent violation permission
transient discovery ≠ durable authority
```


## Finding Contract

The Lens may produce zero or more Finding Candidates such as:
- a durable must-hold concern appears missing from its natural owner;
- an existing IR/PFR is no longer necessary, is duplicated, too broad/narrow or owned elsewhere;
- a proof HOW constraint is being accumulated without durable non-obvious value;
- reusable guidance is being live-inherited instead of independently selected locally;
- an apparent requirement is actually behavior, Domain semantics, a Decision/Risk/Question, transient implementation choice or accepted risk.

The Lens stops at the Finding Candidate. Core Finding Disposition owns lifecycle/state/owner consequences and any accepted owner mutation.

## Typical Consumers

`TM-DOMAIN-DISCOVERY` / `TM-DOMAIN-OWNER`, `TM-IMPLEMENTATION-SLICE` / `TM-SLICE-OWNER`, `TM-SHARED-IMPLEMENTATION-CAPABILITY`, Feature implementation-concern reasoning, Core Integrate/Revalidate Use Cases, and Exact Realization when a durable constraint question is discovered upstream.

## Knowledge Basis

Use the following as reusable discovery knowledge, not as durable Requirement authority:

- [`../../shared/reusable-guidance-model.md`](../../shared/reusable-guidance-model.md) for reusable-guidance selection/adaptation semantics;
- [`../../../../../../tools/replacement-package-app/documentation-use-cases/implementation-discovery-and-proof.md`](../../../../../../tools/replacement-package-app/documentation-use-cases/implementation-discovery-and-proof.md) as R2 migration provenance for 3×2 discovery, necessity/relevance and production↔proof questioning;
- [`../../shared/programming-principles/README.md`](../../shared/programming-principles/README.md) when a trigger indicates that one or more engineering principles should be consulted before deciding whether durable IR/PFR meaning is justified.

Candidate guidance from these sources remains non-authoritative until the natural owner selects durable local meaning.

## Artifact / File Implications

No dedicated Requirement artifact is implied. Selected durable IR/PFR stays with exactly one natural owner according to [`../../shared/requirement-ownership-and-exception-rule.md`](../../shared/requirement-ownership-and-exception-rule.md). Transient discovery remains non-persistent unless independent representation value passes Core representation checks.

## Revalidation / Composition

Reapply only when the concern, natural owner, accepted behavior/Domain/Slice/Shared boundary, selected Evolution, reusable guidance or relevant proof Evidence changes materially. Compose with the thematic evaluator that explains the concern; do not use this Lens as a substitute for DDD, Vertical Slice, authority/trust, operability, quality or programming-principle reasoning.
