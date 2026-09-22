# Knowledge / Source / Evidence Responsibility Map

Status: active routing projection

> Semantic Owner Dependency
> Type: `REPRESENTS`
> Responsibility: `DOC.RESPONSIBILITY-MAP`
> Owner: [Responsibility Map](../../../../principles-and-terminology.md#doc-responsibility-map)

This map separates reusable knowledge/theory from current Source/Evidence authority. It owns routing only; linked owners keep the semantic bodies.

| Responsibility | Canonical owner | Boundary / notes |
|---|---|---|
| Generic Knowledge Basis meaning; theory selection/applied interpretation; theory/current-state authority boundary | [`KNOWLEDGE-BASIS-CONTRACT.md`](KNOWLEDGE-BASIS-CONTRACT.md#knowledge-basis-contract) — `KNOWLEDGE.BASIS` | Reusable knowledge informs a consumer; it does not become current project truth merely by reference |
| Reusable practical-evidence inquiry/observation/interpretation method | [`PRACTICAL-EVIDENCE.knowledge-basis.md`](PRACTICAL-EVIDENCE.knowledge-basis.md#knowledge-practical-evidence) — `KNOWLEDGE.PRACTICAL-EVIDENCE` | Method/Knowledge Basis only; concrete Lens/Target/State owners retain operational/lifecycle authority |
| Core testing/proof theory package and leaf-guidance routing | [`testing/README.md`](testing/README.md#knowledge-testing-basis) — `KNOWLEDGE.TESTING` | Leaf testing files extend this theory package; test/Evidence state remains owned by the consuming Core semantics |
| Shared canonical terminology / ubiquitous-language guidance | [`TERMS-AND-UBIQUITOUS-LANGUAGE.md`](TERMS-AND-UBIQUITOUS-LANGUAGE.md#knowledge-ubiquitous-language) — `KNOWLEDGE.UBIQUITOUS-LANGUAGE` | Terms normalize language; they do not create second semantic owners |
| Source Subject / Source State Unit consumer binding, authority/freshness/revalidation relation | [`../runtime/target-work/TARGET-CONTRACT-INSTANCE-SOURCE-RELATION-MODEL.md`](../runtime/target-work/TARGET-CONTRACT-INSTANCE-SOURCE-RELATION-MODEL.md#target-instance-source-relation-contract) — `TARGET.INSTANCE-SOURCE-RELATION` | Source relation is current-state authority plumbing, not Knowledge Basis semantics |
| Generic Core State Unit boundary including `Evidence / Evidence Need` addressability | [`../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#core-state-unit-boundary) — `CORE.STATE-UNIT` | Knowledge does not own current Evidence state; broader runtime/Core-State routing is in [`../runtime/RESPONSIBILITY-MAP.md`](../runtime/RESPONSIBILITY-MAP.md) |

Guards:

```text
Knowledge Basis ≠ Source State Unit
Knowledge Basis ≠ Evidence / Evidence Need
theory reference ≠ proof of current project state
Evidence storage ≠ semantic authority
current Source/Evidence may cite theory without transferring ownership to the theory file
```
