<a id="entry-semantic-decomposition-guidance"></a>
# Entry Semantic Decomposition Guidance

Semantic decomposition helps the Entry Target decide whether meaningful content around the current subject deserves another Entry identity or belongs elsewhere.

It is Unit guidance for `RU-RKE-03`, not a separate Target family.

## Destination Test

For each materially discovered meaning:

```text
independently useful subject identity?
→ Entry candidate

reusable classification of a subject?
→ Tag Assignment candidate

concrete relationship between Entry identities?
→ Entry Relation candidate

richer reusable explanation / interpretation?
→ Analysis candidate

generic bank behavior needs a structured intrinsic/routing value?
→ Entry Metadata candidate

none of the above materially useful?
→ do not persist
```

## Independent Entry Identity Test

A discovered subject is an Entry candidate when independent identity materially helps one or more of:

- search/addressability;
- its own Tags;
- its own Relations;
- its own Analysis;
- reuse across contexts;
- separate update/lifecycle;
- being referenced by several other Entries.

Named/visible parts do not automatically become Entries.

## Discovery Does Not Create A Hierarchy

Decomposition discovers candidate subjects. It does not automatically create parent/child structure or a generic "decomposed from" relation.

```text
A reveals independently useful B
→ create/reuse B
→ create A↔B Relation only when an actual reusable Relation Type expresses useful meaning
```

An original Entry may remain fully valid after additional related subjects are discovered.

## Existing Identity First

Before creating a new candidate identity, search the visible Bank scope for an existing Entry representing the same subject. Reuse cross-Bank identity instead of creating a local duplicate merely to attach local Analysis/Tags.

## Domain Knowledge

Generic destination/identity tests in this file remain valid even when no Domain Pack exists. When one or more concrete packs are installed and materially applicable, use their subject-specific guidance through the [Domain Pack Registry](../../registries/DOMAIN-PACK-REGISTRY.md#reference-knowledge-domain-pack-registry).

Domain guidance is designed for analysis of existing reference subjects. It is not inferred by reversing creation/production Target Modules.

Several installed Domain Packs may apply to one Entry when distinct domain concerns are material. Cross-domain handoff follows each derived pack's own boundary guidance.

## Recursion Guard

Decomposition is recursive only while another independently useful identity is material. Do not recursively explode every object, layer, musical phrase, UI element or game mechanic merely because it can be named.

## When The Current Entry Is The Problem

If the current Entry itself appears to conflate several durable subjects or should no longer be the preferred record, surface an identity Finding through [Entry Identity / Duplication](../../lenses/LENS-RK-ENTRY-IDENTITY-AND-DUPLICATION.md#lens-rk-entry-identity-and-duplication).

A simple same-subject boundary correction may return to `RU-RKE-01`. Otherwise create/reuse independently useful current Entry records through ordinary Entry formation and, when appropriate, retire the old record using [Entry Retirement And Successors](../../models/REFERENCE-KNOWLEDGE-OBJECT-MODEL.md#entry-retirement-and-successors).

Do not silently replace or retire the current durable identity from inside `RU-RKE-03`.
