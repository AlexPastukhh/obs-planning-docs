<a id="reference-knowledge-representation-model"></a>
# Reference Knowledge Representation Model

Reference Knowledge semantics are independent from physical representation. A Bank, Entry, statement, Vocabulary Package or Landscape result may be represented in files, a database or another implementation without changing semantic ownership.

## Semantic Identity And Storage

```text
semantic identity
≠ file path
≠ directory name
≠ database row location
≠ media-object location
```

Repository/storage-specific layout and publication rules belong to the concrete implementation. Moving or reformatting representation inside the same semantic owner does not create a new semantic object when stable identity and meaning remain the same.

The base profile assumes one Reference Knowledge installation containing a Bank registry and Vocabulary Package registry. It does not define cross-installation federation/resolver protocols.

## Identity Scope

```text
Bank ID
→ unique/stable within the current installation

Entry ID
→ unique/stable within its owning Bank

Vocabulary Package ID
→ unique/stable within the current installation

Tag ID / Relation Type ID
→ unique/stable within their owning Vocabulary Package

Analysis ID
→ unique/stable within its owning Bank

Landscape Snapshot ID
→ unique/stable within its owning Bank
```

Scoped records obtain owner context from their enclosing representation. A detached export must preserve enough owner context to reconstruct the stable semantic ref.

## Artifact / Locator Representation

An Entry may identify material through URL, producer-owned artifact ref, local path or another locator supported by the implementation. A locator is access/evidence information, not Entry identity.

Durable records may state durable `Access constraints` when material. Momentary runtime reachability is not intrinsic Entry state. Optional revision/digest/observed context may be retained when a mutable locator materially affects identity or evidence.

## Stable References

A file-oriented implementation may use readable refs such as:

```text
bank:<bank-id>/entry:<entry-id>
bank:<bank-id>/analysis:<analysis-id>
bank:<bank-id>/landscape:<snapshot-id>
vocab:<package-id>
vocab:<package-id>/tag:<tag-id>
vocab:<package-id>/relation-type:<relation-type-id>
```

This syntax is a representation choice, not a new Core semantic type. Tag Assignments and Entry Relations have composite semantic identity as defined by [Vocabulary Model](../models/VOCABULARY-MODEL.md#vocabulary-model); implementations may add storage row IDs without making them profile-level identity.

## Cardinality

```text
one semantic object ≠ one file
one Bank ≠ one Domain
one media object ≠ one Entry necessarily
one Entry ≠ embedded copy of every statement about it
```

A file-oriented repository may compact many Tag Assignments / Relations into shared files or tables. Semantic separation never requires one Markdown file per statement.

Physical materialization remains subordinate to semantic ownership and the current P-14 / PERSISTENCE_ADDRESSABILITY placement decision.
