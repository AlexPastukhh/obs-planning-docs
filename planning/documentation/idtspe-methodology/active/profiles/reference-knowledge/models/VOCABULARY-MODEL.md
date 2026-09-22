<a id="vocabulary-model"></a>
# Vocabulary Model

Responsibility ID: `RK.VOCABULARY-MODEL`

This file owns the base profile semantics for Vocabulary Packages, Tags, Relation Types, Tag Assignments and Entry Relations.

<a id="vocabulary-package-model"></a>
## Vocabulary Package

A Vocabulary Package is the durable semantic owner of reusable Tag and Relation Type definitions for one stated vocabulary scope.

```text
Vocabulary Package ID
Name
Scope / Purpose
Evolution Authority
Tag Definitions
Relation Type Definitions
```

`Vocabulary Package ID` is stable and unique in the current Reference Knowledge installation registry. The Package definition owns the authority/policy for accepting canonical definition changes. A Bank may consume only Packages registered in the current installation; consumption does not grant evolution authority.

A durable definition does not move between Packages. If a better current definition belongs in another Package, create/reuse that definition there and optionally deprecate the old definition with a successor ref. A successor does not imply automatic statement migration.

<a id="tag-vocabulary-model"></a>
## Tag

A Tag is a reusable classification concept owned by one Vocabulary Package.

```text
Tag ID
Name
Status
Aliases [optional]
Parents [optional]
Successors [optional when DEPRECATED]
Body
```

`Tag ID` is stable within its Package. `Name` and `Aliases` are display/search labels, not identity or unique resolver keys.

Status:

```text
ACTIVE
DEPRECATED
```

`Parents` may reference genuinely broader Tags **in the same Vocabulary Package**. Parents form a semantic DAG and mean real subsumption, not loose association.

`Successors` may point to zero, one or many current Tag definitions, including definitions in another registered Package. Successors are navigation/lifecycle hints, not equivalence or automatic reassignment.

A stable Tag ID denotes one stable reusable concept. Rename, alias addition, Body clarification or taxonomy correction may preserve identity when existing assignments keep the same meaning. Materially different classification meaning gets a new Tag identity; the old Tag may be deprecated.

### Tag Assignment

A Tag Assignment is a Bank-owned classification statement:

```text
Subject Entry → Tag
```

Within one owning Bank, semantic identity is the set tuple:

```text
owning Bank + Subject Entry ref + Tag ref
```

Repeating the same tuple denotes the same semantic statement, not a second independent Assignment. Deprecating a Tag does not rewrite existing Assignments. A successor Tag in another Package cannot be used for new classification until the assigning Bank consumes that Package.

The base profile keeps assignments lightweight. Non-obvious or contested classification may be supported by an Analysis rather than forcing provenance fields onto every Assignment.

<a id="entry-relation-model"></a>
## Relation Type And Entry Relation

Use a Tag Assignment when classifying one Entry by a reusable concept. Use an Entry Relation when useful meaning connects two concrete Entries with independent identity.

### Relation Type

```text
Relation Type ID
Name
Status
Aliases [optional]
Inverse [optional]
Successors [optional when DEPRECATED]
Body
```

`Relation Type ID` is stable within its Package. Status is `ACTIVE | DEPRECATED`. `Name` and `Aliases` are search/display labels, not identity.

`Inverse`, when present, names a Relation Type **in the same Vocabulary Package**. It is a semantic/navigation inverse, not a requirement to persist a duplicate physical edge.

If relationship meaning or endpoint semantics change materially, create/reuse a current Relation Type and deprecate the old definition rather than silently redefining historical relations. Successors may cross Packages; existing Relations are not automatically rewritten.

### Entry Relation

A Relation is owned by one Bank even when one or both endpoint Entries are owned by other visible Banks.

```text
Source Entry
Relation Type
Target Entry
Body / note [when useful]
Basis / Evidence [when material]
```

Within one owning Bank, semantic identity is the set tuple:

```text
owning Bank + Source Entry ref + Relation Type ref + Target Entry ref
```

Repeating the same tuple denotes the same semantic Relation. Different notes/evidence refine that statement; materially competing interpretations belong in Analysis rather than duplicate identical tuples.

Relations form a graph, not a containment tree. Discovering a subject during semantic decomposition does not itself create a Relation. Create an edge only when an applicable Relation Type expresses useful meaning.

If an endpoint is later retired, the old Relation remains attached to that durable endpoint. Successors do not inherit it automatically.

For Relation Types that assert non-obvious origin, derivation, influence, creation or a similar evidentiary claim, retain useful `Basis / Evidence` when material. Obvious structural relations need no ceremonial evidence.

## Vocabulary Evolution

Vocabulary-changing work uses [Vocabulary Evolution](../target-modules/TM-RK-20-VOCABULARY-EVOLUTION.md#tm-rk-20-vocabulary-evolution).

Common changes include rename/alias/taxonomy clarification, new definition creation, deprecation and optional successor pointers. Stable IDs are not silently redefined and existing bank-owned statements are not automatically migrated.
