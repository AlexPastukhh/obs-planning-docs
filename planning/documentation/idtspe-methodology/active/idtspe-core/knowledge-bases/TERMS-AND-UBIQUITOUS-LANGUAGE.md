# Terms / Ubiquitous Language Contract

Status: active shared IDTSPE terminology contract

<a id="knowledge-ubiquitous-language"></a>

Responsibility ID: `KNOWLEDGE.UBIQUITOUS-LANGUAGE`

Canonical vocabulary should be plain, stable and naturally owned. When durable requirements/errors/owner terms change, check hidden definitions, synonym drift, one-label/multi-concept collisions and implementation jargon in product meaning.

```text
unnecessary special term → simplify wording
recurring semantic concept → define/refine canonical Term
synonym drift → canonicalize
implementation jargon in AB/SR/BR → express product meaning; route mechanism to IR when material
```

Terms do not create a second semantic owner. A canonical Term definition points to the natural semantic owner/reference for the concept it names; the vocabulary surface stabilizes language and navigation rather than replacing that owner.

<a id="knowledge-ubiquitous-language-canonical-terms"></a>
## Canonical Terms representation

When the same material Term recurs across several artifacts/owners and repeating its definition would create drift, maintain one discoverable scoped Terms representation (commonly `TERMS.md`) and link to that canonical definition from consumers. Do not force a separate Terms file for a one-off/local label whose natural owner already gives the only useful definition.

A canonical Terms entry may expose, proportionally:

```text
stable Term ID / anchor
canonical label
plain definition
natural semantic owner/reference
aliases / wording to avoid when materially useful
```

The file/table is a vocabulary representation, not a semantic owner and not a Target Module.

<a id="knowledge-ubiquitous-language-reference-section"></a>
## Consumer Terms reference section

A Target-result or owner artifact that materially uses recurring canonical Terms MAY expose an ordinary non-Unit section named `Terms / Ubiquitous Language`. The section lists links to the canonical Term definitions used by that artifact. It MUST NOT be named as an `RU-*`, Unit, Collection or Slot merely because it appears beside Result Units.

Default form:

```markdown
## Terms / Ubiquitous Language

- [Canonical Term A](../TERMS.md#term-a)
- [Canonical Term B](../TERMS.md#term-b)
```

Do not repeat the canonical definition in every consumer file. Add local prose only when the artifact has a genuinely local usage nuance that is not another definition of the Term. A local reference list may be omitted when links would add no useful navigation/review value.
