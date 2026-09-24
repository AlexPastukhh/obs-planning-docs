<a id="lens-terms-ubiquitous-language"></a>
# LENS-TERMS-UBIQUITOUS-LANGUAGE — Terms / Ubiquitous Language

Lens ID: `LENS-TERMS-UBIQUITOUS-LANGUAGE`

Status: active reusable SDS Lens

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `LENS.META-MODEL`
> Owner: [Lens Meta-Model](../../../../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model)

## Applicability
Strongly check changed `SR-*`, `BR-*`, `IR-*`, `PFR-*`, `ERR-BEH-*`, `ERR-IMP-*`; proportionally check AB/SPS/FBS/FDO/owner/result names.

## Checks
- understandable without hidden project knowledge?
- canonical meaning already exists?
- natural owner known?
- same concept named consistently upstream/downstream?
- implementation jargon leaking into product meaning?
- would plain language be clearer than a special term?

Material unresolved terminology ambiguity blocks semantic completeness when interpretation/verification would otherwise be unstable. Findings route through normal Core disposition.

## Knowledge Basis

Primary reusable guidance: [`Terms / Ubiquitous Language Contract`](../../../../idtspe-core/knowledge-bases/TERMS-AND-UBIQUITOUS-LANGUAGE.md). Project/application Terms owners remain semantic vocabulary sources; this Lens evaluates rather than owns them.

## Artifact / File Implications

`NONE_DIRECT` by default. When a real recurring semantic concept needs durable canonical definition, route the finding to the applicable Terms Unit/natural owner. Do not create a Lens-owned terminology artifact.
