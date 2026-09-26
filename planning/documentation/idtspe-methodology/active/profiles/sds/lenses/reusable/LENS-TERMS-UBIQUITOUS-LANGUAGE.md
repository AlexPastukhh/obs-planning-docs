<a id="lens-terms-ubiquitous-language"></a>
# LENS-TERMS-UBIQUITOUS-LANGUAGE — Terms / Ubiquitous Language

Lens ID: `LENS-TERMS-UBIQUITOUS-LANGUAGE`

Status: active reusable SDS Lens

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `LENS.META-MODEL`
> Owner: [Lens Meta-Model](../../../../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model)

## Purpose

Evaluate whether durable semantic terms, requirement/error language, owner/result names, and recurring concepts remain understandable, canonical, owner-aligned, and consistent across the planning surface without leaking incidental implementation jargon into product meaning.

## Analysis Surface

This Lens evaluates the bounded planning/implementation surface where the following concern is materially present:

> SR/BR/IR/PFR/ERR semantic items or recurring canonical concepts/names are created/changed/redefined/merged/retired, or vocabulary is inconsistent/ambiguous across owners.

Context may inform the evaluation, but context availability alone does not make the entire context part of this Lens's Analysis Surface.

## Applicability & Temporal Triggers

### Base Applicability / Usefulness

SR/BR/IR/PFR/ERR semantic items or recurring canonical concepts/names are created/changed/redefined/merged/retired, or vocabulary is inconsistent/ambiguous across owners.

### Opening Triggers

Known terminology conflict, canonical rename/redefinition, requirement/error semantic change, or cross-owner naming inconsistency is already in scope.

### During-work Recheck / Invalidation Triggers

Canonical term/name/definition, SR/BR/IR/PFR/ERR wording/identity, owner/result name, or cross-owner vocabulary changes/diverges; implementation jargon starts becoming durable semantics.

### Closing Triggers / Revalidation Conditions

The result created/changed canonical semantic names/definitions or addressable SR/BR/IR/PFR/ERR meaning and terminology coherence must be rechecked.

### Confident-False / Stop Conditions

Change is code-local naming/formatting only and no durable semantic interpretation/addressability changes.

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

Changed or candidate SR/BR/IR/PFR/ERR items; recurring canonical concept names/definitions; upstream/downstream owner terminology; relevant Terms knowledge/source owners and cross-owner references.

## Evaluation Contract
- understandable without hidden project knowledge?
- canonical meaning already exists?
- natural owner known?
- same concept named consistently upstream/downstream?
- implementation jargon leaking into product meaning?
- would plain language be clearer than a special term?

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
- Do not treat code-local renames/formatting as durable semantic change unless interpretation/addressability changes.
- Do not use terminology cleanup to move Requirement/owner authority implicitly.

## Artifact / File Implications

`NONE_DIRECT` by default. When a real recurring semantic concept needs a durable canonical definition, route the finding to its natural semantic owner and, when repeated cross-artifact use justifies it, the shared canonical Terms representation defined by `KNOWLEDGE.UBIQUITOUS-LANGUAGE`. Do not create a Lens-owned terminology artifact or a synthetic Terms Unit.
