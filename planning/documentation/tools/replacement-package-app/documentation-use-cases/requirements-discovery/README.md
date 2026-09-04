# Requirements Discovery — Implementation and Proof

Status: active reusable methodology mechanism; physical part of the Documentation Use Cases methodology authority.
Scope: reusable questions/directions used by Domain, Slice, Shared Implementation and proof processes to derive concrete durable Implementation Items and Test Items.

## Purpose

Requirements Discovery exists to derive **requirements**, not to accumulate exploratory notes.

```text
selected BI / invariants / owner responsibility / Evolution Impact
                    │
          ┌─────────┴─────────┐
          ↓                   ↓
Implementation          Proof Requirements
Requirements Discovery  Discovery
          ↕                   ↕
          └──── Pattern Registry ────┘
                    ↓
          material selected answers
                    ↓
      Implementation Items + Test Items
                    ↓
            optional Item Groups
                    ↓
              TDD realization/proof
```

The two channels are distinct and explicitly bidirectional.

- **Implementation Requirements Discovery** asks what concrete production realization must require.
- **Proof Requirements Discovery** asks what convincing, maintainable proof must require.
- Either channel may expose a requirement belonging to the other channel; Proof → Implementation is especially common under TDD.

## Normative derivation rule

For every material question/direction that is actually applicable:

1. answer it from the concrete selected behavior, owner meaning, real constraints and relevant evolution;
2. inspect relevant [Pattern Registry](../patterns/REGISTRY.md) entries when reusable candidate answers help;
3. classify each **material selected answer** by what it requires:
   - production realization requirement → Implementation Item;
   - additional proof requirement → Test Item;
   - both → create both;
4. if an answer exposes a related question in the other discovery channel, follow it; continue until the selected implementation/proof decision is coherent;
5. persist Items in the natural Domain/Slice/Shared implementation semantic owner, not in this reusable methodology;
6. `N/A`, “no additional requirement”, discarded candidates and transient investigation notes create no Item.

A Pattern is never automatically an Item. An Item must state the concrete durable requirement selected for the current owner and remain understandable without opening the Pattern definition.

## Cross-discovery and Item Groups

The source of an answer does not determine its Item type.

```text
Proof Requirements Discovery
→ answer requires production structure/behavior
→ Implementation Item

Implementation Requirements Discovery
→ answer requires additional proof quality/form
→ Test Item
```

Use an [Item Group](../../documentation-templates/implementation.md#template-item-group) when Items are coupled parts of one selected decision. A group may contain Implementation Items only, Test Items only, or both. In particular, when a cross-discovery answer produces an Item of the other type and the production/proof Items depend on the same decision, group them by default.

**Review rule:** a material change to any Item Group member makes the **entire group review-relevant**. Review every member and retain, revise or remove it as appropriate. This is not automatic invalidation.

Keep `Related` distinct from `Grouped`:

- `Related` = useful to inspect together, decisions may remain independent;
- `Grouped` = coupled parts of one decision, therefore reviewed together on material change.

## Question sets

- [Common Implementation Requirements Discovery](implementation/common.md) — I1–I7: realization, technical qualities, maintainability, evolution-chain fitness, simplicity vs preparation, probable extensions/boundaries, testability/observability.
- [Domain Implementation Requirements Discovery](implementation/domain.md) — consistency/identity/invariant/DDD-oriented Domain questions.
- [Slice Implementation Requirements Discovery](implementation/slice.md) — semantic commands, orchestration, entry boundaries, result/ports, locality/reuse/recovery questions.
- [Shared Implementation Requirements Discovery](implementation/shared-implementation.md) — real reusable responsibility, consumers, contract/result and variation/reuse questions.
- [Proof Requirements Discovery](proof/proof.md) — T1–T9: correct proof, bug escape, false confidence, false failures, refactor/evolution resilience, failure/uncertainty, maintainability and strategy placement.

## Maintenance

Reusable question sets and the Pattern Registry are maintained through [DOC-UC-14](../maintain-requirements-discovery-pattern-library.md). Concrete project Items remain in concrete implementation owners.
