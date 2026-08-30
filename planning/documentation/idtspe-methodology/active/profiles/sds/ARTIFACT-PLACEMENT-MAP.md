# SDS Artifact Placement Map — Owner / File Representation Guidance

Status: active canonical SDS human-facing placement guidance

This file explains how SDS semantic owners may be represented physically. It is
**not** a mandatory scaffold and does not replace each Target Module's local
Artifact/File Contract or the Core Documentation / Representation Lens.

Canonical representation policy:
[`../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md).

Concrete placement/action resolver:
[`../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md`](../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

## Fundamental Rule

```text
semantic owner
≠ Target instance
≠ Markdown file
```

Therefore all are valid:

```text
one file → several small semantic owners
one semantic owner → one dedicated file
one semantic owner → implementation-native code/types/tests
one semantic owner → main file + companion only under real pressure
```

Do not pre-create folders/files just because they appear in the examples below.

## Typical SDS Placement

### Application Definition

Normally a persistent human-readable owner when used downstream.

### Scenario

Scenario behavior/future-change meaning normally needs durable readable ownership.
Several small Scenarios may be consolidated if addressability remains clear;
separate Scenario files are common when independently reviewed.

### Screen

Only when UI/spatial meaning is material. A compact project may use one
`SCREEN-MAP.md`; selected Screen Drafts may be promoted only when independent
review/reuse pressure exists.

### Slice Strategy

One Strategy owner may contain:

```text
Slice Portfolio
Slice → Domain Realization Map
Realization Owner Bridge
inline Slice owners
inline Cross-Cutting owners
```

### Slice

A selected Slice has semantic identity even when it remains an inline Strategy
section. A dedicated Slice file appears only under independent size/review/reuse/
lifecycle pressure.

### Cross-Cutting

Small shared owners may stay inline near Strategy. Dedicated Cross-Cutting files
appear when shared ownership is independently substantial.

### Domain / Aggregate

Default durable realization may be code/types/tests. A separate Domain Markdown
owner is exceptional/pressure-driven rather than normal SDS folder topology.

### Evolution

Evolution Steps normally stay inside the natural Slice/Cross-Cutting owner. A
separate `<owner>.evolution.md` is only a physical split of the **same semantic
owner** when the evolution section itself has substantial independent review/update
pressure.

### Tests

Exact tests stay implementation-native. Separate Test Design prose exists only
when proof design is independently non-trivial.

---

# Worked Physical Topologies

These trees are examples, **not laws**.

Do not infer:

```text
one file per Target
one file per Slice
one file per Cross-Cutting concern
one Domain prose file per Aggregate
one evolution file per owner
```

Inline and asymmetric representation are normal.

## Example A — LIGHT

Use when Scenarios/Slices are understandable and most realization planning residue
is small.

```text
planning/
├── APPLICATION-DEFINITION.md
├── scenarios/
│   ├── SCN-CAPTURE.md
│   └── SCN-REVIEW.md
├── SCREEN-MAP.md                 # only if spatial/UI meaning is material
└── SLICE-STRATEGY.md

src/
└── ...                           # Domain/implementation-native truth

tests/
└── ...
```

`SLICE-STRATEGY.md` can own:

```text
Slice Portfolio
Slice → Domain Realization Map
Realization Owner Bridge

Inline realization owners:
  SL-CAPTURE
  SL-REVIEW
  XC-AUDIT
```

Example inline Slice owner:

```text
## SL-CAPTURE

Outcome / obligations / proof intent
Uses / ownership boundary
Runtime Path — only if material

Evolution Steps
### Add another source type
Behavioral Source: SCN-CAPTURE / Change Outlook
Slice Change: capture accepts another source variant
Domain Changes: SourceContext must represent the new source meaning
Implementation Outlook:
  preserve one local source-variation boundary;
  do not introduce a generic plugin framework.
```

Example inline Cross-Cutting owner:

```text
## XC-AUDIT

Shared guarantee
Applicability / local consumer obligations
Canonical shared responsibility
Evolution Steps — when material
```

Why LIGHT is valid:

```text
3 semantic realization owners
≠ 3 files
```

## Example B — MIXED / ASYMMETRIC

Use when one Slice or shared concern becomes independently substantial while
peers remain small.

```text
planning/
├── APPLICATION-DEFINITION.md
├── scenarios/
│   ├── SCN-CAPTURE.md
│   └── SCN-EXPORT.md
├── SCREEN-MAP.md                 # optional
└── slices/
    ├── SLICE-STRATEGY.md
    └── SL-EXPORT.md              # promoted owner only

src/
└── ...

tests/
└── ...
```

Owner placement may be:

```text
SL-CAPTURE → SLICE-STRATEGY.md#SL-CAPTURE
SL-REVIEW  → SLICE-STRATEGY.md#SL-REVIEW
SL-EXPORT  → slices/SL-EXPORT.md
XC-AUDIT   → SLICE-STRATEGY.md#XC-AUDIT
```

This asymmetry is intentional. Promoting one owner does not require promoting its
siblings.

## Example C — COMPLEX / SEPARATE REALIZATION OWNERS

Use when several Slice/Cross-Cutting owners have substantial independent
review/revalidation value.

```text
planning/
├── application/
│   └── APPLICATION-DEFINITION.md
├── scenarios/
│   ├── SCN-CAPTURE.md
│   ├── SCN-REVIEW.md
│   └── SCN-EXPORT.md
├── screens/
│   └── SCREEN-MAP.md
├── slices/
│   ├── SLICE-STRATEGY.md
│   ├── SL-CAPTURE.md
│   ├── SL-REVIEW.md
│   └── SL-EXPORT.md
└── cross-cutting/
    ├── XC-AUDIT.md
    └── XC-AUTHORIZATION.md

src/
└── ...                           # exact Domain/implementation owners

tests/
└── ...
```

Strategy remains the canonical portfolio/relationship coordinator even when Slice
owners have their own files. It references rather than duplicates their detailed
plans.

Cross-Cutting files own the shared guarantee and shared Evolution Steps; consuming
Slices keep only local integration obligations and references.

A separate Slice evolution companion is possible only under additional pressure:

```text
slices/
├── SL-EXPORT.md
└── SL-EXPORT.evolution.md
```

Both files still represent one `SL-EXPORT` semantic owner.

## Example D — BEHAVIOR-HEAVY / CODE-NATIVE DOMAIN

A project may have many rich Scenario owners and zero Domain Markdown files:

```text
planning/
├── APPLICATION-DEFINITION.md
├── scenarios/
│   ├── SCN-CAPTURE.md
│   ├── SCN-REVIEW.md
│   ├── SCN-EXPORT.md
│   └── SCN-RECOVER.md
├── SCREEN-MAP.md                 # if needed
└── SLICE-STRATEGY.md

src/
└── domain-and-feature-code/...

tests/
└── ...
```

This is valid when code/types/tests preserve the selected Domain meaning well
enough and no independent human-readable Domain review surface is needed.

## Promotion / Demotion

Representation may move in either direction:

```text
inline owner → dedicated file
```

when pressure grows, and:

```text
dedicated file → consolidated section
```

when the independent lifecycle/review value disappears.

The semantic owner does not change merely because the file layout changes.

## Placement Questions

Before adding a file ask:

1. Is the meaning already represented clearly in code/tests/an existing owner?
2. Does it need durable human-readable review/addressability?
3. Would a section in an existing owner be enough?
4. Does a separate file have an independently useful lifecycle/audience?
5. Would this create a second source of truth that must be synchronized?

Choose the smallest representation that preserves authority, addressability,
reviewability, discoverability and lifecycle fit without unnecessary sync cost.
