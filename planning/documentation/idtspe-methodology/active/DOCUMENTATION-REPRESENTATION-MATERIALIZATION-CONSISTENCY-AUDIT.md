# Documentation / Representation / Materialization Consistency Audit

Status: **PASS — regenerated after owner/file topology simplification**

## Fundamental Boundary

```text
IDTSPE Target instance
≠ semantic owner
≠ physical file
```

Canonical generic authority remains
`idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`.

SDS-specific human-facing examples now live only in
`profiles/sds/ARTIFACT-PLACEMENT-MAP.md`.

## Current Source Guidance Count

Actual active source records after migration:

```text
ARTIFACT_PROPOSAL / AP: 26 unique = 25 SDS + 1 generic Core (`AP-PUPDATE-01`)
ARTIFACT_GUIDANCE / AG: 22 unique
TOTAL: 48 unique
```

No duplicate AP/AG IDs were found in the assembled active tree.

The Placement Map is no longer required to mirror all 48 source records as a
manually maintained mechanical tree. Target/Lens bodies remain source authority;
the map is human-facing placement guidance and worked topology examples.

## SDS Placement Checks

- LIGHT example supports Strategy + inline Slice/XC owners: **PASS**
- MIXED asymmetric promotion is explicit: **PASS**
- COMPLEX example allows dedicated Slice/XC owners without one-file-per-owner law: **PASS**
- Screen files remain conditional: **PASS**
- Domain prose is optional; code/types/tests may be durable Domain representation: **PASS**
- evolution companion is same-owner representation only under pressure: **PASS**
- removed `SDS-PHYSICAL-PLANNING-TREE` and placement registry do not leave a missing semantic owner: **PASS**
