# Reusable Programming Principles — Interfaces / Boundaries / Evolution

Status: active SDS reusable knowledge / theory detail
Role: selectively loaded `RG-PRG-*` guidance; **not a Lens, Target Module, Finding owner or project-truth owner**

Registry and traversal contract: [`../README.md`](../README.md).
Reusable-guidance semantics: [`../../reusable-guidance-model.md`](../../reusable-guidance-model.md).

## Consumption Boundary

Read only the entries selected by the Programming Principles Registry for the current Use-Case/component context. A principle entry supplies reusable questions, trade-offs and candidate patterns. The natural Target/Lens owner performs any operational evaluation and Core Finding/Decision/Requirement mechanics own durable disposition.

<a id="rg-prg-interface-substitutability-interface-segregation-substitutability-extension-contracts"></a>
## RG-PRG-INTERFACE-SUBSTITUTABILITY — Interface segregation / substitutability / extension contracts

Questions:

```text
Does a consumer depend on operations it does not need?
Can one implementation be substituted for another without changing the promised semantics?
Is an interface expressing one coherent capability or several unrelated ones?
Does an extension point preserve caller assumptions, failure/result semantics and invariants?
Is “open for extension” solving a known current/evolution need or only hypothetical flexibility?
```

Requirement candidates:

```text
Keep capability contracts cohesive enough that consumers depend only on meaning they need.
Require substitutable implementations to preserve the semantic contract, not merely the method signature.
Introduce extension seams only when current proof/substitution or known Evolution justifies them.
```

Risks / problem classes:

- “fat” interfaces that couple unrelated consumers;
- fake interfaces with one implementation and no boundary reason;
- subtype/strategy implementations that satisfy signatures but violate caller assumptions;
- plugin/extension contracts that accidentally expose private implementation structure.
<a id="rg-prg-boundary-validation-boundary-validation-parsing-normalization"></a>
## RG-PRG-BOUNDARY-VALIDATION — Boundary validation / parsing / normalization

Questions:

```text
Where does untrusted or weakly-typed input become a semantic value?
What must be validated before the input is allowed to influence state or side effects?
Is normalization semantic and canonical, or could it silently change identity?
Are validation and use performed against the same effective value?
Can invalid combinations cross deeper boundaries and fail later with misleading errors?
```

Requirement candidates:

```text
Validate external/weakly-typed input at the narrowest boundary that can establish semantic meaning.
Canonicalize identity only with an explicit semantic rule; do not silently collapse distinct values.
Bind validation to the exact value later used for correctness/security-sensitive effects.
```
<a id="rg-prg-compatibility-versioning-migration-compatibility-versioning-migration"></a>
## RG-PRG-COMPATIBILITY-VERSIONING-MIGRATION — Compatibility / versioning / migration

Questions:

```text
Is this format/API/state schema an actual compatibility contract?
Which deployed producer/consumer versions must interoperate?
Can a representation change be an ordinary refactor, or is migration/compatibility behavior required?
How does an old/unknown version fail?
Can compatibility code be removed at a known Evolution Step?
Are exact names/fields/paths truly contractual, or merely current implementation details?
```

Requirement candidates:

```text
Treat representation details as durable Requirements only when a real compatibility boundary makes them semantic/contractual.
Version persisted/wire formats when incompatible representations may coexist.
Fail closed or migrate explicitly when old state cannot be interpreted safely.
Keep compatibility lifetime tied to explicit deployed-consumer/Evolution reality rather than permanent defensive code.
```

This group is also the main guard against accidentally putting literal code names into durable owners: a literal name is allowed only when this discovery establishes that the name is itself part of a real compatibility contract.

---


---

## Provenance

These entries preserve the corresponding R2 `reusable-programming-principles.md` semantic groups. Stable `RG-PRG-*` identities and routing metadata are SDS migration additions; they do not convert reusable guidance into project authority.
