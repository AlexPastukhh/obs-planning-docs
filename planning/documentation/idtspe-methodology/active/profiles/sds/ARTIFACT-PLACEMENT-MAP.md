# SDS Artifact Placement Map — Owner / Representation Guidance

Status: S4 proposed synchronized profile placement guidance

This file projects selected SDS semantic owners into possible physical representation. It is **not** a mandatory scaffold.

Canonical generic policy:
[`../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md).

## Fundamental Rule

```text
semantic owner
≠ Target invocation
≠ Markdown file
```

Valid forms include:
- implementation-native;
- embedded section in an existing durable owner;
- several small owners in one file;
- one dedicated owner file;
- hybrid semantic prose + implementation-native detail;
- generated/derived navigation view.

Representation promotion/demotion is reversible when independent size/review/reuse/lifecycle pressure changes.

## Working vs Durable

`TM-DOMAIN-DISCOVERY` and `TM-IMPLEMENTATION-SLICE` working plans are non-persistent by default.

Persist only when the working artifact itself has continuing review/handoff value. Persistence does not promote it into semantic authority.

Exact internal working plans are likewise transient by default.

## Typical Owner Representation

### Application Definition

An accepted Application Definition used downstream normally needs one durable human-readable canonical owner, existing or new.

### Feature

Feature behavior normally needs durable addressability when consumed downstream.

Several small Features may share one document if Feature/BR identities remain clear. A Feature does not require one file.

### Scenario

Scenario journey meaning may be embedded or dedicated. Preserve Scenario identity, Feature references, path/branch/convergence/re-entry, continuity and terminal Benefit without copying Feature BR prose.

### Screen

A compact application may use one Screen Map. Promote Screen Drafts to independently addressable sections/files only when their review/reuse pressure justifies it.

### Domain

Implementation-native types/state/invariants/operations/tests may be sufficient durable representation for a Domain owner.

Use hybrid/dedicated semantic representation when important Domain meaning cannot remain discoverable/stable from implementation-native truth alone.

### Slice

A durable Slice has semantic identity independent of file topology.

Small Slice owners may share a `SLICES.md`-like existing owner/section; substantial ones may have dedicated files. Do not maintain a separate hand-written class/call graph as durable truth.

### Shared Implementation Capability

Small Shared owners may be embedded in an implementation architecture/owner file; independently substantial shared responsibilities may have dedicated addressability.

Consumer bindings are good candidates for compact textual representation when otherwise hard to discover.

### Evolution Step / Steps Map

A substantial Step may have dedicated addressability. A shallow Step may be embedded in the Steps Map.

The Map stores routing/prerequisite/readiness, not a duplicate of full Step target state.

### Requirements

Keep `BR/IR/PFR` with their natural owner. Do not create one Requirement file per item and do not revive a generic Requirement register merely for storage convenience.

### Proof / Evidence

Literal test code stays implementation-native. Executed Evidence may remain tool/run output or a retained reference/summary when continuing review/revalidation/Decision value exists.

A separate cross-owner proof-policy artifact is exceptional. If genuinely useful, establish its semantic owner explicitly (for example a scoped Decision/supporting architecture owner); do not assume a baseline Test Strategy Target.

## Optional Cross-Slice Coordination View

The retired Slice Strategy owner is replaced by derived/working coordination when useful:

```text
Feature behavior → Slice/deferred coverage
Slice → Feature grounding
Slice → Domain uses
Slice → Shared bindings
owner addressability
dependency/readiness notes
```

This view may be embedded in an existing planning index or generated from owners. It does not become a competing semantic authority.

## Worked Physical Topologies

These are examples, not required trees.

### LIGHT

```text
planning/
├── APPLICATION-DEFINITION.md        # when Application Definition is material
├── FEATURES.md                      # several small Feature owners
├── SCENARIOS.md                     # several small Scenario owners
├── SCREEN-MAP.md                    # only when spatial meaning matters
├── SLICES.md                        # several durable Slice owner sections
└── EVOLUTION-STEPS.md               # only when selected future Steps exist

src/
└── ...                              # Domain/Shared/realization truth where natural

tests/
└── ...
```

### MIXED / ASYMMETRIC

```text
planning/
├── APPLICATION-DEFINITION.md
├── features/
│   └── F-EXPORT.md                  # one independently substantial Feature
├── SCENARIOS.md
├── SCREEN-MAP.md
├── SLICES.md                        # small Slices
├── slices/
│   └── SL-EXPORT.md                 # promoted durable Slice owner
├── SHARED-CAPABILITIES.md           # small shared owners/bindings
└── EVOLUTION-STEPS.md

src/
└── ...

tests/
└── ...
```

Promoting one owner does not require promoting siblings.

### COMPLEX

```text
planning/
├── application/
│   └── APPLICATION-DEFINITION.md
├── features/
│   ├── F-CAPTURE.md
│   └── F-REVIEW.md
├── scenarios/
│   ├── SCN-CAPTURE-REVIEW.md
│   └── SCN-EXPORT.md
├── screens/
│   └── SCREEN-MAP.md
├── slices/
│   ├── SL-CAPTURE.md
│   └── SL-EXPORT.md
├── shared/
│   ├── SH-AUDIT.md
│   └── SH-AUTHORITY.md
└── evolution/
    ├── STEPS-MAP.md
    └── EVO-EXPORT.md

src/
└── ...

tests/
└── ...
```

Even here, exact class/helper/test topology remains implementation-native unless independently semantic.

## Guards

```text
one Target ≠ one file
one owner ≠ one file
one file ≠ one owner
working plan persisted ≠ durable authority
derived portfolio/map ≠ semantic owner
implementation-native ≠ undocumented when important semantic residue is invisible
```
