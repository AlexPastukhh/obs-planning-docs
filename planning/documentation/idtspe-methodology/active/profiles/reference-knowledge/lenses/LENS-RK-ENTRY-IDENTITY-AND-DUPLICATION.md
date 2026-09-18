<a id="lens-rk-entry-identity-and-duplication"></a>
# Entry Identity / Duplication

Lens ID: `LENS-RK-ENTRY-IDENTITY-AND-DUPLICATION`  
Activation: `FREQUENT_CONDITIONAL`  
Status: active profile Lens

## Purpose / Evaluation Objective

Evaluate whether one or more Entry records have clear, non-duplicative and useful subject boundaries, and whether a current record should be reused, corrected or retired.

## Applicability Gate

Apply when creating an Entry with plausible existing matches, when names/locators/provenance conflict, when an Entry seems over-broad, when several Entries may denote the same subject, or when a record may no longer be the preferred current representation.

## Target Inputs / Evidence

Entry/Entry candidates, locators/artifacts, provenance, intrinsic metadata, visible related Entries, Bank ownership, Tags/Relations/Analysis and relevant Sources.

## Analysis Surface / Supported Operations

Surface: identity/boundary meaning of the selected Entry or Entry group.

Supported operations: `ANALYZE`, `CHECK`, `CHALLENGE`, `REFINE`.

## Evaluation Workflow

1. Compare semantic subject identity, not only filenames/names/URLs.
2. Distinguish duplicate representation from duplicate Entry record.
3. Check whether one Entry conflates independently useful subjects.
4. Check whether additional candidate subjects have independent search/tag/relation/analysis/reuse/lifecycle value.
5. Inspect provenance and cross-Bank ownership before proposing mutation/retirement.
6. Surface the smallest warranted disposition: reuse, same-record correction, additional Entry candidates, or retirement with successor candidate(s).

## Broad Discussion / Key Points

May explain why two records appear same/different, why a subject boundary is too broad/narrow, which record should be preferred for new work, and what evidence is missing.

## Findings / Outputs

May surface:

- no identity problem;
- likely existing Entry to reuse;
- current Entry boundary correction;
- duplicate/obsolete Entry that may be retired;
- additional independently useful Entry candidates;
- suggested successor Entry/Entries for a retired record;
- unresolved identity requiring more evidence;
- downstream knowledge worth separately revalidating.

These are Finding Candidates / routing inputs. The Lens does not mutate, retire or create Entries.

## Typical Consumers

[Entry](../target-modules/TM-RK-10-ENTRY.md#tm-rk-10-entry) and ordinary Entry work formed for independently useful candidate/successor records.

## Guards / Anti-patterns

Same filename, URL, title, visual similarity or chronology alone does not prove same identity, derivation or influence. Do not create a new Entry merely because a part can be named. Do not copy dependent statements to successor records merely because an old Entry is retired.

## Composition

Compose with applicable installed Domain Pack decomposition guidance when such a pack exists and subject structure matters, and with Bank/authority checks when cross-Bank identities are involved.

## Escalation / Revalidation

```text
simple same-subject boundary repair
→ Entry / RU-RKE-01

additional independently useful related subject
→ Entry / RU-RKE-03
→ ordinary Entry formation

current durable record should no longer be preferred
→ create/reuse current successor Entry/Entries
→ retire old Entry when authorized/useful
→ optional Successors refs
```

Recheck when provenance, artifact identity, new related Entries or downstream evidence materially challenge the current identity.

## Artifact / File Implications

`NONE / NO_DISTINCT_SUPPORTING_ARTIFACT`. Accepted changes persist through ordinary Entry records: current records remain `ACTIVE`; obsolete/incorrect records may become `RETIRED` with optional successor refs.

## Knowledge Basis

[Reference Knowledge Object Model](../models/REFERENCE-KNOWLEDGE-OBJECT-MODEL.md#reference-knowledge-object-model), [Entry Semantic Decomposition Guidance](../guidance/ENTRY-SEMANTIC-DECOMPOSITION-GUIDANCE.md#entry-semantic-decomposition-guidance), [Entry Retirement And Successors](../models/REFERENCE-KNOWLEDGE-OBJECT-MODEL.md#entry-retirement-and-successors), [Bank Principles](../models/BANK-PRINCIPLES.md#bank-principles).

## Provenance

Reference Knowledge profile.
