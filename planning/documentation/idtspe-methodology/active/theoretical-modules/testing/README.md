# Testing Knowledge Basis — Proof Theory And Detailed Mechanics

Status: active reusable theoretical Knowledge Basis  
Consumers: `LENS-TEST-PROOF-EVIDENCE`, `TM-TEST-STRATEGY`, `TM-TEST-DESIGN`, Exact Realization when deeper test mechanics are materially unresolved

## Purpose

Own reusable **testing theory and mechanics** so operational Lenses/Target Modules do not each restate the same rules.

```text
Testing Knowledge Basis
→ reusable theory / mechanics / patterns

LENS-TEST-PROOF-EVIDENCE
→ evaluates one proposed or actual proof using that knowledge

Test Strategy / Test Design
→ own only independently useful selected planning results

TM-EXACT-REALIZATION
→ owns literal test code + authorized execution/repair

Core Evidence
→ owns what actually happened
```

The Knowledge Basis is not a workflow authority and does not create Targets/Decisions/Evidence by itself.

## Core Theory Surface

Use the linked bodies when their detail is material:

- [Testing Planning Principles And Terminology](testing-planning-principles-and-terminology.md) — semantic-authority boundary, evidence states, layer responsibility, public-boundary proof, no-mutation proof, Escape/Refactor Risk, representative/paired proof, abstraction and isolation principles.
- [API / Integration Test Guidance](api-integration-test-guidance.md) — public server/application proof, persistence/result-state assertions, failure/no-mutation, idempotency and boundary regression guards.
- [E2E Testing Guidance](e2e-testing-guidance.md) — when cross-layer actor proof is worthwhile, semantic locators, environment/isolation, setup and final outcome checks.
- [Test Object Patterns](test-object-patterns.md) — Page/Component Object abstraction boundaries and keeping the Scenario/proof story visible.

## Knowledge / Evaluation Boundary

Examples:

```text
Knowledge:
  behavior-preserving refactors should not normally break behavior proof;
  internal call-order assertions often increase fragility.

Lens evaluation:
  this proposed test asserts repository.save() before audit.publish();
  that order is not semantic → material Refactor Fragility finding.
```

```text
Knowledge:
  failed state-changing behavior often needs no-mutation proof.

Lens evaluation:
  this test checks only HTTP 500 and never checks persisted state
  → weak assertion / Escape Risk finding.
```

```text
Knowledge:
  E2E is justified for selected critical cross-layer paths, not blanket matrices.

Lens evaluation:
  these 40 browser validation cases duplicate one isolated rule
  → wrong-layer/duplication finding.
```

## Imported-Theory Provenance

The four linked source bodies were originally imported from source base `ca768b61b2c84d6cda6c27b4ace7c4fc87d404e7` and are intentionally preserved byte-for-byte as detailed reference material. Their local historical status/link wording is source provenance rather than a second current methodology authority.

Current processed operational authority is:

```text
LENS-TEST-PROOF-EVIDENCE
+ current Test Target Modules
+ Core Exact Realization / Evidence semantics
```

Do not mechanically load every theory file for ordinary test work. Read only the detail needed for the material proof question.

## Source SHA256

```text
6ddcdd37274d007dfbe5af5346a0025eed3c984aceba87bb83bb2f5fe2247404  testing-planning-principles-and-terminology.md
808a19c986dff2f677628518e8d4af08b5a639cf7423d660f1d5489ea8656aa8  api-integration-test-guidance.md
d4bc286a0288d8f64e1c36dfbe7e5bd58ddd5f77efbbed6db767ce946f3948b2  e2e-testing-guidance.md
d90c0cc35b107a4c35c6c2e2182ce7bed679257a49ede6315ecc9a3dac4b101f  test-object-patterns.md
```
