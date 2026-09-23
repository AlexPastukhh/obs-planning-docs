<a id="bank-change-authority"></a>
# Bank Change Authority

Responsibility ID: `RK.BANK-CHANGE-AUTHORITY`

## Direct Bank Tasks

When the USER explicitly asks to create/refine an Entry, assign Tags, relate Entries, add Analysis, evolve vocabulary or analyze a Landscape, that instruction authorizes initiating the corresponding scoped work only within the semantic owner/write authority already applicable to that object. USER intent does not replace Bank ownership or Vocabulary Package evolution authority. Do not ask redundant confirmation for every obvious local statement.

## Bank ownership boundary

Use [Bank Principles](../models/BANK-PRINCIPLES.md#bank-principles). Creating local Analysis/Tag Assignments/Relations concerning visible Entries is valid when the current Bank policy allows it. Mutating or retiring the upstream Entry requires that Entry owner's authority.

```text
local statement about visible Entry
≠ upstream Entry mutation
```

## Incidental Retention

When useful reference material appears during another Target:

```text
material discovered/produced
→ reusable value identified
→ AI proposes retention + owning Bank when not already authorized
→ USER selects unless retention authority is already explicit
→ Entry Target / direct Entry-owner update as proportional
```

Rejected production output may still be useful reference material.

## Vocabulary Changes

Canonical Tags/Relation Types belong to selected Vocabulary Packages. Creating a current definition, deprecating an old definition or recording successor definitions can affect how multiple Banks classify/query knowledge.

Unless already authorized:

```text
AI vocabulary proposal
→ owner/scope + affected-use surface
→ USER selection
→ accepted vocabulary change
→ proportional revalidation only where materially useful
```

Deprecating vocabulary does not automatically rewrite existing Tag Assignments or Entry Relations.

## Entry Identity Corrections

Identity ambiguity, duplication and over-broad boundaries are evaluated by [Entry Identity / Duplication](../lenses/LENS-RK-ENTRY-IDENTITY-AND-DUPLICATION.md#lens-rk-entry-identity-and-duplication).

Simple same-subject boundary repair may resolve through [Entry](../target-modules/TM-RK-10-ENTRY.md#tm-rk-10-entry). When an old durable Entry should no longer be preferred, use ordinary Entry formation plus [Entry Retirement And Successors](../models/REFERENCE-KNOWLEDGE-OBJECT-MODEL.md#entry-retirement-and-successors). No special merge/split operation is required.

Cross-Bank visibility does not grant authority to retire the upstream Entry. Durable Entries do not move Banks; a different ownership scope is represented by a new/reused Entry in that Bank plus optional retirement/successor linkage from the old owner.

## Mass Refactors

Mass retagging, relation rewrites, broad Landscape compatibility changes or bulk Entry retirement requires explicit selection when not already authorized. Such work is not implied merely because a Tag/Relation Type/Entry was deprecated or retired.

## Analysis Versus Fact

An interpretation may be retained in an Analysis Record without converting it into factual metadata or authoritative intent. When creator/owner intent is sourced explicitly, retain the Source. Inferred intent/effect remains analysis/classification.
