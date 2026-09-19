# SDS Semantic Family Authority And Provenance Contract

Status: active SDS shared semantic-authority contract

## Purpose

Keep reusable methodology family/owner authority separate from concrete application meaning and from discovery/provenance context.

```text
methodology-defined family / natural owner
≠ concrete local semantic item
≠ where/why that item was discovered
```

A local item does not become a `Contextual` family merely because it was first noticed during application-specific analysis.

## Family Authority

Examples of methodology-defined SDS families include:

```text
BR-*           Feature behavior Requirement
SR-*           Scenario journey Requirement
FBS-*          Feature behavior step
SPS-*          Scenario path step
FDO-*          Feature semantic-data object
IR-DOMAIN-*    Domain implementation Requirement
IR-SLICE-*     Slice implementation Requirement
IR-SHARED-*    Shared capability implementation Requirement
PFR-*          owner-local proof-realization Requirement
ERR-BEH-*      behavior-level Expected Error
ERR-IMP-*      realization-owner Expected Error
```

The natural owner/family contract comes from reusable SDS methodology. A concrete local item gets its semantic content from the application/Target owner that instantiates that family.

## Concrete Meaning vs Provenance

```text
BR-* family + Feature ownership
→ reusable methodology authority

BR-EXAMPLE-01 exact must-hold
→ concrete Feature-owned semantic meaning

"surfaced while reviewing Scenario X"
→ provenance / discovery context only
```

Provenance may help review/revalidation, but it does not redefine the item's family, natural owner or authority status.

## Reusable Guidance Boundary

Reusable guidance, a Lens finding, an exemplar pattern or a local discovery does not automatically become an owner Requirement/object.

```text
reusable guidance / discovery pressure
→ applicability + natural-owner resolution
→ local owner materializes an item only when the meaning is selected/derived for that owner
```

## Annotation Boundary

Use Documentation `Methodology:` annotations to point to the reusable method/family owner and `Contextual:` only for genuinely local/supporting blocks with no reusable method owner. Do not encode family authority through ad-hoc `Origin`, `Why added` or discovery columns.

## Guards

```text
locally discovered BR ≠ Contextual BR family
example uses SR-* ≠ example owns SR semantics
file location ≠ family authority
provenance ≠ semantic owner
link ≠ ownership transfer
```
