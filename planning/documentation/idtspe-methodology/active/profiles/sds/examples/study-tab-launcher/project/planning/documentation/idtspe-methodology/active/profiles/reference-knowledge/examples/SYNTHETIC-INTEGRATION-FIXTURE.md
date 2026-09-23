<a id="synthetic-integration-fixture"></a>
# Synthetic Integration Fixture

Status: **non-installed acceptance fixture**. None of the IDs below belong in runtime registries.

Purpose: exercise the simplified profile contracts end-to-end without pretending concrete production Banks/Vocabulary Packages have already been derived.

## 1. One Installation

Registered Banks:

```text
fixture-shared
fixture-project
```

`fixture-project` declares `fixture-shared` visible. Visibility is explicit/non-transitive and grants no write authority.

Registered Vocabulary Packages:

```text
vocab:fixture-shared
  Scope: reusable fixture-wide vocabulary
  Evolution Authority: fixture shared vocabulary owner

vocab:fixture-project
  Scope: project-local fixture vocabulary
  Evolution Authority: fixture project vocabulary owner
```

`fixture-project` consumes both Packages. `fixture-shared` consumes `vocab:fixture-shared`.

## 2. Entries And Ordinary Cross-Bank Statements

```text
bank:fixture-shared/entry:painting-x
Status: ACTIVE
Locator: fixture://art/painting-x
Access constraints: fixture installation only

bank:fixture-project/entry:boss-arena
Status: ACTIVE
```

Project-local classification:

```text
owner Bank: fixture-project
Subject: bank:fixture-shared/entry:painting-x
Tag: vocab:fixture-project/tag:arena-reference
```

Project-owned Relation:

```text
owner Bank: fixture-project
Source: bank:fixture-project/entry:boss-arena
Type: vocab:fixture-project/relation-type:uses-reference
Target: bank:fixture-shared/entry:painting-x
```

Project Analysis:

```text
Owner Bank: fixture-project
Analysis ID: fixture-analysis-01
Ref: bank:fixture-project/analysis:fixture-analysis-01
Created At: 2026-09-18
Subject: bank:fixture-shared/entry:painting-x
Body: project-specific reusable interpretation
```

None of these statements transfers ownership of `painting-x`.

## 3. Entry Ownership Correction Without Move/Merge/Split

```text
bank:fixture-project/entry:painting-x-local
Status: RETIRED
Successors:
  bank:fixture-shared/entry:painting-x
```

The old ref remains resolvable. Historical statements stay attached to it and are not migrated automatically.

## 4. Vocabulary Ownership Correction

```text
vocab:fixture-project/tag:arena-reference
Status: DEPRECATED
Successors:
  vocab:fixture-shared/tag:arena-reference
```

The shared definition is a distinct identity. A Bank must consume `vocab:fixture-shared` before using the successor for new assignments. Existing old assignments remain unchanged until separately reclassified when useful.

## 5. Analysis And Landscape

```text
bank:fixture-project/analysis:fixture-analysis-02
Created At: 2026-09-19
Subject: bank:fixture-shared/entry:painting-x
Supersedes: bank:fixture-project/analysis:fixture-analysis-01
```

```text
bank:fixture-project/landscape:fixture-landscape-01
Created At: 2026-09-20
As Of / Observed Period: through 2026-09-20
Concern: how arena-reference usage appears across the fixture corpus
Evidence Base:
  bank:fixture-shared/entry:painting-x
  bank:fixture-project/entry:boss-arena
```

## Acceptance Expectations

The fixture passes only if:

- Banks and Vocabulary Packages resolve within one installation registry;
- visibility is explicit/non-transitive and does not grant write authority;
- Entry IDs remain stable within owning Bank;
- Tag/Relation Type IDs remain stable within owning Package;
- ordinary statements may reference visible upstream Entries without copying them;
- retirement/deprecation leaves old refs resolvable;
- Successors do not trigger inheritance/migration;
- a cross-Package successor does not grant Package consumption automatically;
- Analysis/Landscape retain stable Bank-scoped refs;
- semantic statement separation does not imply one file per statement.
