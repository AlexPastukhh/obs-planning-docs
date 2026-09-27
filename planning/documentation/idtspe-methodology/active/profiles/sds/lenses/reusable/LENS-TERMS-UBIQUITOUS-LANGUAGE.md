<a id="lens-terms-ubiquitous-language"></a>
# LENS-TERMS-UBIQUITOUS-LANGUAGE — Terms / Ubiquitous Language

Lens ID: `LENS-TERMS-UBIQUITOUS-LANGUAGE`

Status: active reusable SDS Lens

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `LENS.META-MODEL`
> Owner: [Lens Meta-Model](../../../../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model)

## Purpose

Evaluate whether durable semantic terms and recurring concepts remain understandable, canonical, owner-aligned and recognizably continuous from planning through downstream Domain/Slice/code/test realization, without leaking incidental implementation jargon into product meaning or forcing artificial artifact-to-code mappings.

## Analysis Surface

This Lens evaluates the bounded planning/implementation surface where the following concern is materially present:

> Application/Feature/Scenario/Screen/Domain/Slice/Requirement meaning or downstream semantic code/test realization creates/changes/redefines/merges/retires a recurring concept/name, or vocabulary lineage is inconsistent/ambiguous across owners/representations.

Context may inform the evaluation, but context availability alone does not make the entire context part of this Lens's Analysis Surface.

## Applicability & Temporal Triggers

### Base Applicability / Usefulness

Recurring semantic concepts/names are created/changed/redefined/merged/retired, a downstream planning/implementation representation materially represents an existing concept, or vocabulary lineage is inconsistent/ambiguous across owners/representations.

### Opening Triggers

Known terminology conflict, canonical rename/redefinition, Feature/Requirement/Domain/Slice semantic change, downstream realization of an established concept, or cross-owner/cross-representation naming inconsistency is already in scope.

### During-work Recheck / Invalidation Triggers

Canonical term/name/definition, semantic item identity, owner/result name, candidate Domain/Slice realization name or semantic code/test symbol changes/diverges; implementation jargon starts becoming durable semantics; downstream evidence suggests an upstream canonical term is misleading or too broad.

### Closing Triggers / Revalidation Conditions

The result created/changed canonical semantic names/definitions or materially represented established concepts in downstream planning/code/test surfaces, so vocabulary lineage and terminology coherence must be rechecked.

### Confident-False / Stop Conditions

Change is implementation-private/mechanical naming only, the symbol does not represent an accepted/canonical semantic concept, and no semantic interpretation/addressability/vocabulary-continuity impact exists.

### False-negative Risks

Pure renames can still be semantic because references and shared understanding depend on canonical terms.

Trigger semantics follow the canonical Lens Model:

```text
TRUE      → APPLY
FALSE     → NOT_APPLICABLE
UNCERTAIN → APPLY
```

A Unit-level `REQUIRED [phase]` attachment bypasses the apply/skip decision at that phase and requires this Lens to cover the current Analysis Surface. These Lens-owned triggers still govern useful earlier application and recheck/invalidation.

## Inputs / Evidence

Changed or candidate semantic items; recurring canonical concept names/definitions; Application/Feature/Scenario/Screen/Domain/Slice terminology; candidate Domain/Slice types/classes/methods/signatures when they represent semantic concepts; semantic code/test symbols; relevant Terms knowledge/source owners and cross-owner references.

## Evaluation Contract
- understandable without hidden project knowledge?
- what semantic concept is being represented, and where is its natural owner?
- canonical vocabulary already exists or is this an early concept that may still be provisional?
- when the same concept moves downstream, is its vocabulary recognizably continuous?
- is a different label only representation-native idiom, or does it express a genuine new/more-specific concept?
- is an unexplained different label accidental synonym drift?
- did Domain/Slice/code evidence reveal that the upstream canonical term itself is misleading and needs natural-owner revalidation?
- implementation jargon leaking into product meaning?
- would plain language be clearer than a special term?
- is terminology continuity being abused to force `Feature = class`, `Scenario = method`, `Requirement = method` or another artificial structural mapping?

Material unresolved terminology ambiguity blocks semantic completeness when interpretation/verification would otherwise be unstable. Findings route through normal Core disposition.

## Knowledge Basis

Primary reusable guidance: [`Terms / Ubiquitous Language Contract`](../../../../idtspe-core/knowledge-bases/TERMS-AND-UBIQUITOUS-LANGUAGE.md). Project/application Terms owners remain semantic vocabulary sources; this Lens evaluates rather than owns them.

## Findings / Outcomes

Valid invocation outcomes are:

```text
APPLIED — no material finding
APPLIED — one or more material Finding Candidates
NOT_APPLICABLE — short confident-FALSE reason when application is not forced at this checkpoint
```

A Finding Candidate does not directly mutate authoritative Result/State meaning; normal Core Finding Disposition resolves lifecycle/owner consequences.

## Guards / Boundaries

- This Lens evaluates terminology coherence; it does not become the vocabulary semantic owner.
- Do not create a special term when plain language is clearer.
- Do not treat implementation-private/mechanical renames as semantic work when they represent no accepted concept; conversely, a semantic code/test rename is not automatically outside the Lens merely because it is code-local.
- Do not use terminology continuity to force one planning artifact into one code construct.
- If downstream evidence shows an upstream term is semantically wrong/overloaded, route a Finding to the natural upstream owner rather than silently creating a permanent synonym downstream.
- Do not use terminology cleanup to move Requirement/owner authority implicitly.

## Artifact / File Implications

`NONE_DIRECT` by default. When a real recurring semantic concept needs a durable canonical definition, route the finding to its natural semantic owner and, when repeated cross-artifact use justifies it, the shared canonical Terms representation defined by `KNOWLEDGE.UBIQUITOUS-LANGUAGE`. Do not create a Lens-owned terminology artifact or a synthetic Terms Unit.
