<a id="sds-requirement-classification-representation"></a>
# SDS Requirement Classification And Representation Contract

Responsibility ID: `SDS.REQUIREMENT-CLASSIFICATION-REPRESENTATION`

Status: active SDS shared Requirement classification/representation contract

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Requirement Ownership / Natural Owner](REQUIREMENT-OWNERSHIP-AND-NATURAL-OWNER.md#sds-requirement-ownership) — `SDS.REQUIREMENT-OWNERSHIP`

## Purpose

Define reusable `Requirement Type` classification and common Requirement/QRPE representation semantics without changing Requirement family or natural ownership.

Requirement ownership/temporal hosting remains in [`planning/documentation/idtspe-methodology/active/profiles/sds/profile-contracts/requirements/REQUIREMENT-OWNERSHIP-AND-NATURAL-OWNER.md`](REQUIREMENT-OWNERSHIP-AND-NATURAL-OWNER.md).

## Requirement Type

`Requirement Type` is reusable classification metadata that may be used when it materially improves review, comparison, traceability or representation. It is not a Requirement family, owner or lifecycle, and it is **not mandatory for every Requirement**.

The methodology does not currently impose a closed enum or a fixed `primary + secondary` cardinality. Prefer a small number of concise reusable labels/facets when classification adds value; combine more than one only when the distinction is materially useful.

Current reusable labels include, non-exhaustively:

| Type / facet | Useful when the must-hold constrains |
|---|---|
| `Identity` | stable identity, correlation or distinguishability |
| `Scope` | allowed semantic/responsibility boundary |
| `Context` | context needed to interpret/use the result safely |
| `Continuity` | preservation across steps, handoffs, retries or contexts |
| `Outcome` | required resulting state/result |
| `Proof` | observable/verifiable truth needed to establish a result |
| `Recovery` | safe continuation/retry/rollback after interruption/expected failure |
| `Truthfulness` | prevention of false/misleading success/state/result |
| `Effect Scope` | what may be changed/affected by an operation |
| `Safety` | prevention of unsafe/destructive/unauthorized effect |
| `Visibility` | material state/choice/outcome being visible to the relevant actor/consumer |
| `User Decision` | explicit USER authority/choice required before a material action |

These labels are reusable guidance, not an exhaustive ontology. A Requirement may leave `Type` unclassified when classification adds no value. If another concise label materially improves the concrete result, use it descriptively; repeated cross-Target usefulness is a signal to review whether it should become reusable methodology. Do not create local synonym taxonomies merely to vary wording.

In exact schemas that include a `Type` column, use `—` / `Not material` when classification is intentionally unnecessary, and `OPEN` only when classification itself is materially unresolved.

Type does not replace plain Requirement meaning. Two Requirements with the same Type/facet may own completely different must-holds.

## Common Requirement Table Contract

When a durable Requirement collection is represented as a table, use this base schema:

```text
Requirement | Type | Plain required meaning | QRPE / Examples
```

The natural Target Module may define an exact extension when another adjacent relation is repeatedly useful, for example related Expected Errors or `Realizes` references. Those extensions remain owner-specific and do not change this shared base meaning.

For rare owner-local `PFR-*`, use the reusable exact proof-Requirement schema:

```text
Proof Requirement | Type | Plain proof-realization requirement | Protects / verifies | QRPE / Examples
```

A Target Module that owns `PFR-*` may place this table beside its owner-local `IR-*` collection rather than inventing another proof family or test catalog.

## QRPE / Examples

`QRPE` is a compact adjacency projection for **Questions / Risks / Problems / Evidence** that materially help understand, challenge, verify or revalidate the represented item. `Examples` may include concise good/bad/boundary cases that materially improve interpretation.

```text
QRPE / Examples
→ references or concise projections of material Core Q/R/P/Evidence and examples
→ not a second owner of those Core State items
→ not a requirement to dump all resolution history
```

The column remains present in exact owner schemas that adopt it. When no material adjacent item/example exists, use a concise empty-state such as `None material` rather than manufacturing content.

## Smallest Sufficient Scope

Apply the canonical Documentation [Methodology / Contextual Annotation Principle](../../../../../../../../../source-context/planning/documentation/principles-and-terminology.md#doc-methodology-contextual-annotation). For these Requirement representations, a whole table may be the smallest sufficient scope when one reusable method governs all rows; this contract does not create a second annotation/provenance rule.

## Guards

```text
Type ≠ Requirement family
Type ≠ semantic owner
Type ≠ provenance
QRPE projection ≠ duplicated Core State authority
exact table schema ≠ one-file-per-owner requirement
```
