# Programming Principles Registry — SDS

Status: active reusable-knowledge registry
Role: compact relevance scan over the complete 22-group programming-principles corpus; **not a Lens and not a checklist to execute in full**

## Authority / Boundary

```text
selected Use Case / current Target or evaluation concern
→ when engineering/design/evolution trade-offs may matter, scan this compact registry
→ select only entries whose trigger/situation is materially plausible
→ open only the selected RG-PRG detail entries
→ natural Target/Lens owner performs the concrete evaluation
→ Core Finding / Proposal / Decision / Requirement ownership handles durable disposition
```

A scan may legitimately return `NO_MATERIAL_PRINCIPLE_ENTRY`. Registry selection does not create a Finding and does not make every principle mandatory. Recheck when a row's stated recheck condition becomes true or when the current Use Case/Target/profile materially changes.

## Registry Scan Guide

1. Start from the current Use-Case Process and current work/Target context; do not scan this registry merely because SDS is installed.
2. Compare the current situation with the **Trigger / situation** column at summary depth.
3. For plausible matches, use **Drill down when** to decide whether opening the detailed principle is worth the context cost.
4. Read only selected detail entries and apply them through their natural operational consumer(s).
5. Record selection/recheck information in `Methodology Usage State` only when it helps continuation, review or revalidation; do not create a 22-row execution log.

## 22 Reusable Principle Entries

| ID | Concern | Trigger / situation | Drill down when | Detail | Primary operational consumer | Recheck when |
|---|---|---|---|---|---|---|
| RG-PRG-COMPLEXITY | Essential vs accidental complexity / complexity delta | A material design option adds/removes structure boundaries state coupling proof burden or migration cost | Options differ materially in persistent complexity or maintenance/evolution cost | [`RG-PRG-COMPLEXITY`](guidance/design-and-structure.md#rg-prg-complexity-essential-vs-accidental-complexity-complexity-delta) | LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY | proposal shape or known Evolution changes |
| RG-PRG-SEMANTIC-CONTRACTS | Semantic clarity / explicit contracts | Names/types/public contracts hide or ambiguously encode important states results failures or invalid combinations | Correctness depends on making semantic meaning or invalid states explicit | [`RG-PRG-SEMANTIC-CONTRACTS`](guidance/design-and-structure.md#rg-prg-semantic-contracts-semantic-clarity-and-explicit-contracts) | natural SDS Target Production | public contract or owner boundary changes |
| RG-PRG-COHESION-RESPONSIBILITY | Cohesion / separation of concerns / single responsibility | A unit owns unrelated policies/mechanics or has multiple materially different reasons to change | A proposed split/merge could improve semantic locality rather than merely technical layering | [`RG-PRG-COHESION-RESPONSIBILITY`](guidance/design-and-structure.md#rg-prg-cohesion-responsibility-cohesion-separation-of-concerns-single-responsibility) | LENS-DEPENDENCY-CHANGE-IMPACT | responsibility or change-reason distribution changes |
| RG-PRG-DEPENDENCY-DIRECTION | Coupling / dependency direction | A consumer depends on incidental concrete mechanics or collaborator changes cause unrelated churn | A stable semantic seam/inversion may improve substitution proof or evolution locality | [`RG-PRG-DEPENDENCY-DIRECTION`](guidance/design-and-structure.md#rg-prg-dependency-direction-coupling-and-dependency-direction) | LENS-DEPENDENCY-CHANGE-IMPACT | dependency graph or known alternate/evolution pressure changes |
| RG-PRG-ENCAPSULATION | Encapsulation / information hiding | Callers can bypass invariants or depend on internal representation/mutable state | Correctness or change locality depends on hiding representation behind semantic operations | [`RG-PRG-ENCAPSULATION`](guidance/design-and-structure.md#rg-prg-encapsulation-encapsulation-information-hiding) | LENS-DOMAIN-MODELING-DDD | caller/owner contract or internal representation changes |
| RG-PRG-DRY-ABSTRACTION | DRY vs duplication / premature abstraction | Similar code/behavior appears in multiple places or a shared abstraction is proposed | It is unclear whether duplication reflects one coherent shared responsibility or only superficial similarity | [`RG-PRG-DRY-ABSTRACTION`](guidance/design-and-structure.md#rg-prg-dry-abstraction-dry-vs-duplication-vs-premature-abstraction) | LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY | duplicate copies begin/diverge in evolution or shared-consumer evidence changes |
| RG-PRG-KISS-YAGNI-EVOLUTION | KISS / YAGNI / known Evolution | A proposal adds flexibility/generalization for current or future needs | It is unclear whether the mechanism is required now/known Evolution or is speculative | [`RG-PRG-KISS-YAGNI-EVOLUTION`](guidance/design-and-structure.md#rg-prg-kiss-yagni-evolution-kiss-yagni-known-evolution) | LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY | selected Evolution changes or speculative mechanism becomes concrete |
| RG-PRG-COMPOSITION-EXTENSION | Composition vs inheritance / extension shape | Variation/reuse is being modeled through inheritance/plugins/policies/extension points | Substitutability vs simple composition is not obvious or superclass/internal coupling may be fragile | [`RG-PRG-COMPOSITION-EXTENSION`](guidance/design-and-structure.md#rg-prg-composition-extension-composition-vs-inheritance-extension-shape) | LENS-DEPENDENCY-CHANGE-IMPACT | extension/substitution consumers or evolution pressure changes |
| RG-PRG-STATE-MUTABILITY | State / mutability | Mutable or duplicated/derived state is introduced or ownership of mutation is unclear | Durable fact authority mutation boundary immutability or derived-state persistence affects correctness | [`RG-PRG-STATE-MUTABILITY`](guidance/state-failure-and-execution.md#rg-prg-state-mutability-state-and-mutability) | LENS-DOMAIN-MODELING-DDD | state ownership/lifecycle or persistence model changes |
| RG-PRG-FAILURE-SEMANTICS | Error handling / failure taxonomy | Operations can fail in materially different ways or callers need different recovery decisions | Expected rejection infrastructure failure programmer error retryability or uncertainty are being collapsed/reclassified | [`RG-PRG-FAILURE-SEMANTICS`](guidance/state-failure-and-execution.md#rg-prg-failure-semantics-error-handling-and-failure-taxonomy) | LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY | failure classes caller actions or evidence semantics change |
| RG-PRG-IDEMPOTENCY-RETRY-UNCERTAINTY | Idempotency / retries / uncertainty | An operation may be retried after partial/uncertain external or durable effects | Duplicate effects are harmful or same logical operation identity/proof is unclear | [`RG-PRG-IDEMPOTENCY-RETRY-UNCERTAINTY`](guidance/state-failure-and-execution.md#rg-prg-idempotency-retry-uncertainty-idempotency-retries-uncertainty) | LENS-SLICE-VERTICALITY-INTEGRATION | retry/cancellation/effect boundary or evidence changes |
| RG-PRG-CONCURRENCY | Concurrency / synchronization | Shared mutable state can race or concurrent writes/actions may violate invariants | A serialization/optimistic-concurrency boundary or operation-local concurrency failure semantics must be selected | [`RG-PRG-CONCURRENCY`](guidance/state-failure-and-execution.md#rg-prg-concurrency-concurrency-synchronization) | LENS-DOMAIN-MODELING-DDD | shared-state/invariant/concurrency model changes |
| RG-PRG-RESOURCE-MANAGEMENT | Resource ownership / cleanup | Files processes locks streams temporary state or other resources can outlive operation paths | Cancellation/exception/cleanup failure can leak resources or alter correctness/security | [`RG-PRG-RESOURCE-MANAGEMENT`](guidance/state-failure-and-execution.md#rg-prg-resource-management-resource-management) | LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY | resource lifetime cancellation or failure paths change |
| RG-PRG-AUTHORITY-TRUST | Security / authority / trust boundaries | Untrusted input identity authorization destructive/external effects or mutable authority configuration is involved | Verification must be bound to the exact resource/effect or TOCTOU/least-privilege concerns are material | [`RG-PRG-AUTHORITY-TRUST`](guidance/trust-observability-quality.md#rg-prg-authority-trust-security-authority-trust-boundaries) | LENS-QUALITY-RISK-MATERIALITY | trust boundary/resource identity/authority mechanism changes |
| RG-PRG-OBSERVABILITY-DIAGNOSTICS | Observability / diagnostics | A material failure/effect must be diagnosed or correlated without exposing secrets | Logs/results need to distinguish semantic operation uncertain effect durable evidence and diagnostic cause | [`RG-PRG-OBSERVABILITY-DIAGNOSTICS`](guidance/trust-observability-quality.md#rg-prg-observability-diagnostics-observability-and-diagnostics) | LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY | operation/evidence/failure semantics or production observability changes |
| RG-PRG-TESTABILITY-REFACTORING | Testability / refactoring resilience | Important behavior is hard to prove without private-call mocking or unstable internals | A real semantic seam/boundary may be needed for credible proof and refactor-resilient tests | [`RG-PRG-TESTABILITY-REFACTORING`](guidance/trust-observability-quality.md#rg-prg-testability-refactoring-testability-and-refactoring-resilience) | LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY | proof strategy/seam/behavior boundary changes |
| RG-PRG-PERFORMANCE-CAPACITY | Performance / capacity | A real latency throughput memory/process/storage or capacity concern exists | Optimization requires explicit target/Evidence or could trade away correctness/clarity | [`RG-PRG-PERFORMANCE-CAPACITY`](guidance/trust-observability-quality.md#rg-prg-performance-capacity-performance-and-capacity) | LENS-QUALITY-RISK-MATERIALITY | measured evidence/constraint/workload or implementation changes |
| RG-PRG-INTERFACE-SUBSTITUTABILITY | Interface segregation / substitutability / extension contracts | Interfaces/plugins/strategies expose operations consumers do not need or implementations may violate caller assumptions | Contract cohesion substitutability or extension semantics must be made explicit | [`RG-PRG-INTERFACE-SUBSTITUTABILITY`](guidance/interfaces-boundaries-and-evolution.md#rg-prg-interface-substitutability-interface-segregation-substitutability-extension-contracts) | LENS-DEPENDENCY-CHANGE-IMPACT | consumer set/implementations/extension pressure changes |
| RG-PRG-BOUNDARY-VALIDATION | Boundary validation / parsing / normalization | External/weakly typed input crosses into semantic state/identity/side effects | Validation/canonicalization must establish exact semantic value before deeper use | [`RG-PRG-BOUNDARY-VALIDATION`](guidance/interfaces-boundaries-and-evolution.md#rg-prg-boundary-validation-boundary-validation-parsing-normalization) | natural SDS Target Production | input boundary/identity/normalization/security semantics change |
| RG-PRG-DETERMINISM-TIME-IDENTITY | Determinism / time / randomness / generated identity | Correctness/proof depends on clock randomness generated IDs process environment or nondeterministic inputs | Nondeterminism needs an explicit capability/proof seam or generated value may accidentally become semantic identity | [`RG-PRG-DETERMINISM-TIME-IDENTITY`](guidance/state-failure-and-execution.md#rg-prg-determinism-time-identity-determinism-time-randomness-identity-generation) | LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY | identity/time/randomness/proof assumptions change |
| RG-PRG-TIMEOUT-CANCELLATION-BOUNDS | Timeouts / cancellation / bounded work | Operation can block indefinitely or consume unbounded resources or caller may stop waiting before external effect is known | Timeout/cancellation ownership recovery uncertainty/retry/resource bounds affect supported behavior | [`RG-PRG-TIMEOUT-CANCELLATION-BOUNDS`](guidance/state-failure-and-execution.md#rg-prg-timeout-cancellation-bounds-timeouts-cancellation-bounded-work) | LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY | blocking/effect/resource/cancellation policy changes |
| RG-PRG-COMPATIBILITY-VERSIONING-MIGRATION | Compatibility / versioning / migration | Multiple deployed producer/consumer/state versions or contractual representations may coexist | A representation/API/name/path is truly contractual or migration/compatibility lifetime must be selected | [`RG-PRG-COMPATIBILITY-VERSIONING-MIGRATION`](guidance/interfaces-boundaries-and-evolution.md#rg-prg-compatibility-versioning-migration-compatibility-versioning-migration) | LENS-WORKSPACE-EVOLUTION-ARCHITECTURE | deployed-version/evolution/migration boundary changes |

## Themed Detail Files

- [`guidance/design-and-structure.md`](guidance/design-and-structure.md) — complexity, semantic contracts, cohesion, dependencies, encapsulation, abstraction, KISS/YAGNI, composition.
- [`guidance/state-failure-and-execution.md`](guidance/state-failure-and-execution.md) — state, failure, retries, concurrency, resources, determinism/time/identity, bounded/cancellable work.
- [`guidance/trust-observability-quality.md`](guidance/trust-observability-quality.md) — authority/trust, diagnostics, testability/refactoring, performance/capacity.
- [`guidance/interfaces-boundaries-and-evolution.md`](guidance/interfaces-boundaries-and-evolution.md) — interface/substitutability, boundary validation/normalization, compatibility/versioning/migration.

## Guards

```text
Programming Principles Registry ≠ Lens Registry
RG-PRG entry ≠ Finding
reusable principle ≠ owner-local Requirement
scan all 22 summaries ≠ load/execute all 22 detail bodies
theory detail ≠ current Source/Evidence/project truth
```

The reusable authority/no-live-inheritance rule is defined by [`../reusable-guidance-model.md`](../reusable-guidance-model.md).
