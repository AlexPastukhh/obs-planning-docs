# <Target ID / Name>

Governing path: `TARGET_MODULE | LOCAL_TARGET_CONTRACT`
Target Module: `<TM-ID | NONE — Local Target Contract>`
Invocation: `CREATE | REFINE | EXTEND | REVALIDATE | REPAIR | RETIRE`

## Target / Scope

<bounded Target identity / requested Bank, Entry, Vocabulary or research result>

## Target Resolution Requirements [proportional]

<material OPEN / PARTIAL / BLOCKED / DEFERRED Requirements and any non-obvious coverage refs; omit duplicated coverage that is already unambiguous from Unit/Target structure>

## Context / Sources

<material Bank/visibility/Vocabulary context, existing knowledge and external Sources>

## Unit Composition

<complete Module-defined Unit inventory when module-backed + applicable Core-defined Units + any Contextual Unit that actually exists>

Retain composition rationale/selection only when it has continuing decision, review, handoff or revalidation value. The concrete Target result still declares every Module-defined Unit; applicable Core-defined Units and actually formed Contextual Units are included when they exist. Materiality controls whether substantive Unit Resolution is required.

## Current Target Work Units

### <UNIT-ID> — <Name>

**Methodology / Unit Definition:** [exact reusable Unit owner](...) or `<contextual definition>`

**Responsibility:** <bounded work responsibility>

**Purpose:** <REQUIRED explicit Purpose for reusable Units; proportional for Contextual Units when obvious>

**Result Content Contract:** <expected coherent result meaning>

**UNIT_WIDE Slot Definitions [only actual formal Unit-wide roles; Slot ID unique among UNIT_WIDE Slots of this Unit]:**
- `<SLOT-ID>` `[PREPARED|CONTEXTUAL]` — Responsibility: `<terminal Unit-wide contract role>` — Result Content Contract: `<narrowed expected meaning>`
- <omit this section when there are no formal UNIT_WIDE roles>

**Collection Definitions [repeat once per declared Collection]:**

<For legacy pre-migration Units, do not synthesize Collection Definitions that are not declared by the governing contract; preserve the existing lower-level representation until an explicit migration pass.>

Collection `<COLLECTION-ID>` — <Collection ID unique within this Unit and stable/recoverable while referenced; meaning / cardinality / constraints as needed>
- Item Key / Subject: `<stable/recoverable key when item-local formal references are possible>`
- Item Contract: `<existing/new common item meaning/shape; ordinary fields remain ordinary content>`
- PER_ITEM Slot Definitions [only actual formal item roles; Slot ID unique within this Collection]:
  - `<SLOT-ID>` `[PREPARED|CONTEXTUAL]` — Responsibility: `<terminal role repeated for each item>` — Result Content Contract: `<narrowed item-role meaning>`
- <a Collection may have no PER_ITEM Slots; do not make fields/items into Slots merely by count>
- <use/mark TABLE only when the governing contract explicitly requires it; otherwise keep the Collection representation non-table>

Disposition: `<RESOLVED | OPEN | OMITTED — concise reason>`

**Unit Resolution Set (only when this Unit is composite AND substantive):** `<URS-ID>`
- <runtime projection of the formal Slot Definitions above; if Unit is OMITTED, do not instantiate/runtime-expand Slots>

**Runtime resolution — UNIT_WIDE Slot roles [only when this Unit is composite AND substantive and declares UNIT_WIDE Slots]:**
- `<SLOT-ID>` — `SUBSTANTIVE`: Applicability `APPLICABLE`, Materiality `MATERIAL`, State `<OPEN | PARTIAL | RESOLVED | BLOCKED | DEFERRED>`, <Current Resolution Content / remaining gap proportionally>
- or `<SLOT-ID>` — `OMITTED — <reason>`: Applicability `<APPLICABLE | NOT_APPLICABLE>`, Materiality `NON_MATERIAL`, no active Resolution State / Current Resolution Content

**Current Result Content — Collection `<COLLECTION-ID>` [when this declared Collection contributes to a substantive Unit result]:**
- Item `<Item Key / Subject>`
  - <ordinary item content as governed by the Item Contract>
- <repeat items; zero items is valid when the governing Collection/Unit contract permits it>

**Runtime resolution — PER_ITEM Slot roles for Collection `<COLLECTION-ID>` [only when this Unit is composite AND substantive and this Collection declares PER_ITEM Slots]:**
- Item `<Item Key / Subject>`
  - `<PER_ITEM-SLOT-ID>` — `SUBSTANTIVE`: Applicability `APPLICABLE`, Materiality `MATERIAL`, State `<OPEN | PARTIAL | RESOLVED | BLOCKED | DEFERRED>`, <item-local Current Resolution Content / remaining gap proportionally>
  - or `<PER_ITEM-SLOT-ID>` — `OMITTED — <reason>`: Applicability `<APPLICABLE | NOT_APPLICABLE>`, Materiality `NON_MATERIAL`, no active Resolution State / Current Resolution Content
- <repeat only existing items and declared PER_ITEM Slot roles for that Collection; one item's state does not alter the Slot Definition or other items>

<Current Result Content when resolved/material; no substantive filler when omitted>

<repeat for every Module-defined Unit; add instantiated Core-defined Units and Contextual Units only when they actually exist>

## Target Step Result

<complete Module-defined Unit inventory with RESOLVED / OPEN / explicit omission dispositions and proportional content, plus applicable Core-defined Unit contributions and Contextual Unit contributions through their Result Destinations>

## Material Core State / Revalidation [when useful]

<Questions / Proposals / Decisions / Evidence / Findings / revalidation state only when independently useful>

## Artifact Placement

<resolved/material placement state>
