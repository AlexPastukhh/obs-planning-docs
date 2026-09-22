<a id="reference-knowledge-object-model"></a>
# Reference Knowledge Object Model

Responsibility ID: `RK.OBJECT-MODEL`

## Bank

A Bank is the ownership/write-policy/lifecycle boundary for durable Reference Knowledge. Canonical rules live in [Bank Principles](BANK-PRINCIPLES.md#bank-principles).

## Entry

Entry is a durable record identifying one independently useful reference subject.

Minimum semantic surface:

```text
Entry ID
Name
Status
Successors [optional when RETIRED]
Locator / Artifact references [when applicable]
Known provenance / origin [when useful]
Intrinsic factual description / metadata [when useful]
```

`Entry ID` is stable and unique within its owning Bank. An Entry does not have to contain every Tag, Relation or Analysis concerning it; those are separate bank-owned statements/records and may be owned by another Bank that can reference the Entry.

A subject deserves separate Entry identity when independent addressability/classification/relations/analysis/reuse/lifecycle are materially useful. Merely being nameable is insufficient.

### Entry Body Boundary

Entry-owned descriptive content is limited to identity/boundary meaning, known provenance and intrinsic factual description. Interpretation, inference, comparison, explanatory claims, predicted effects or other richer reasoning belong in Analysis.

<a id="entry-retirement-and-successors"></a>
## Entry Retirement And Successors

Entry status is deliberately small:

```text
ACTIVE
RETIRED
```

`ACTIVE` means the record is a current preferred representation of its subject boundary. `RETIRED` means the record remains durable/resolvable but should not normally be selected for new work.

A retired Entry may list zero, one or many `Successors` worth inspecting.

```text
Successors
≠ automatic equivalence
≠ automatic inheritance
≠ automatic rewrite of old Tag Assignments / Relations / Analysis
```

Old statements remain attached to the records they originally referenced. If a successor needs equivalent classification, relations or analysis, that is ordinary new/refined knowledge work.

A durable Entry does not change owning Bank. If the correct ownership scope changes, create/reuse the appropriate Entry in the target Bank and, when authorized/useful, retire the old Entry with successor ref(s). This replaces special merge/split/move machinery.

## Tag Assignment

A Tag Assignment is a Bank-owned classification statement. Its set identity and behavior are defined in [Vocabulary Model](VOCABULARY-MODEL.md#tag-vocabulary-model).

## Entry Relation

An Entry Relation is a Bank-owned typed edge between concrete Entries. Its set identity and evidence rules are defined in [Vocabulary Model](VOCABULARY-MODEL.md#entry-relation-model).

## Analysis Record

A Bank-owned Analysis Record stores reusable interpretation/reasoning about one or more referenced subjects when Entry facts, Tags or Relations would lose important meaning.

```text
Analysis ID
Created At
Subject Entry / Entries
Supersedes [optional]
Body
supporting Source/Evidence refs [when useful]
```

`Analysis ID` is stable and unique within its owning Bank. `Supersedes`, when used, points to a stable Analysis ref owned by the same Bank. Technical/editorial correction may update the same record while interpretation remains materially the same; a materially new interpretation should normally receive a new ID and may supersede the older record.

## Landscape Snapshot

A Landscape Snapshot is a Bank-owned retained corpus-level research result. `Landscape Snapshot ID` is stable and unique within its owning Bank. A retained Snapshot records `Created At`; it includes `As Of` / observed period when temporal framing is material and may reference a prior Snapshot in the same Bank through `Supersedes`.

Landscape semantics and historical interpretation rules live in [Landscape Research And Evolution Guidance](../knowledge-bases/LANDSCAPE-RESEARCH-AND-EVOLUTION.md#landscape-research-and-evolution-guidance).

## Vocabulary Package

A Vocabulary Package owns reusable Tag and Relation Type definitions. Banks consume registered Packages but do not acquire authority over them. See [Vocabulary Model](VOCABULARY-MODEL.md#vocabulary-package-model).

## Search / Query

Browse/search/filter/query are ordinary operations/projections over visible Bank knowledge, not durable object kinds by default. A Landscape Snapshot may retain corpus membership/query/context when later interpretation or exact reproduction materially requires it.
