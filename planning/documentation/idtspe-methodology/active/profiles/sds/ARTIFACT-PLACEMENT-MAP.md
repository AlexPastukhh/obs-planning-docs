# SDS Artifact Placement Map — Owner / Representation Guidance

Status: active SDS profile placement guidance

This file projects selected SDS semantic owners into possible physical representation. It is **not** a mandatory scaffold.

Canonical generic policy:
[`../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md).

## Profile Projection Boundary

Generic semantic-owner/artifact-owner separation, representation cardinality, promotion/demotion and P-14/TF-10 placement semantics are owned by Core [`artifact-placement-and-idtspe-response-contract.md`](../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md) and the required Documentation / Representation Lens.

This SDS map owns only the **profile-specific projection**:

```text
selected SDS semantic-owner type
→ plausible SDS representation forms / profile-specific defaults
```

It does not create semantic owners, require one-file-per-owner topology, or override current Target Module/Lens artifact guidance.

## Temporal Representation Boundary

This map projects **semantic authority already resolved elsewhere**. Under current SDS semantics:

```text
Application Definition representation
= upstream selected/possible need/value/contribution intent; may lead realization

canonical Feature/Scenario/Screen/Domain/Slice/Shared representations
= realized/current downstream owner truth

unrealized planned downstream target state
= representation of TM-EVOLUTION-STEP / its Target Owner Bodies
```

Do not create/update current-owner artifacts merely because a future Target Body has been selected. After Exact Realization + required proof/revalidation, `TM-EVOLUTION-STEP` resolves semantic Target Owner Materialization; only then does P-14/TF-10 resolve the physical create/update/move/split/merge needed for the new current owner representation.

`Target Owner Materialization` is therefore distinct from representation promotion/demotion (for example embedded → dedicated file).

## Working vs Durable

`TM-DOMAIN-DISCOVERY` and `TM-IMPLEMENTATION-SLICE` working Targets/artifacts are non-persistent by default. Their exploratory Unit Resolution and rejected alternatives normally disappear after handoff.

Selected Discovery Working Plan Result Content with continuing pre-realization handoff/review/revalidation value may instead be integrated/projected into the applicable Step `Evolution Impact` Unit. That Step-owned retention does not promote the discovery artifact or implementation-shaped detail into Domain/Slice semantic authority.

Physical persistence of a working artifact remains proportional and is distinct from semantic Result hosting. Exact internal working plans remain transient by default.

## Typical Owner Representation

### Application Definition

Application Definition is upstream need/value/contribution authority and may lead current downstream realization. Keep one durable discoverable canonical representation when persistence is material. Do not place a selected future Application body inside an Evolution Step; Steps reference Application Definition as driver and own only unrealized downstream owner target state.

### Feature

Feature behavior normally needs durable addressability when consumed downstream.

Several small Features may share one document if Feature/BR identities remain clear. A Feature does not require one file.

### Scenario

Scenario journey meaning may be embedded or dedicated. Preserve Scenario identity, Feature references, path/branch/convergence/re-entry, continuity and terminal Benefit without copying Feature BR prose. Current-owner `Evolution Impact` may be stored or derived as compact Step navigation/revalidation; full future Scenario meaning remains Step-owned.

### Screen

A compact application may use one Screen Map. Promote Screen Drafts to independently addressable sections/files only when their review/reuse pressure justifies it. Current-owner `Evolution Impact` is reverse Step navigation/revalidation, not a second Screen roadmap.

### Domain

Implementation-native types/state/invariants/operations/tests may be sufficient durable representation for a Domain owner.

Use hybrid/dedicated semantic representation when important Domain meaning cannot remain discoverable/stable from implementation-native truth alone. Current-owner `Evolution Impact` may be a compact explicit or derived Step-reference projection.

### Slice

A durable Slice has semantic identity independent of file topology.

Small Slice owners may share a `SLICES.md`-like existing owner/section; substantial ones may have dedicated files. Current-owner `Evolution Impact` may be a compact explicit or derived Step-reference projection. Do not maintain a separate hand-written class/call graph as durable truth merely to compensate for hard-to-navigate implementation.

### Shared Implementation Capability

Small Shared owners may be embedded in an implementation architecture/owner file; independently substantial shared responsibilities may have dedicated addressability.

Consumer bindings are good candidates for compact textual representation when otherwise hard to discover. Current-owner `Evolution Impact` may similarly be represented as compact/derived Step navigation.

### Evolution Step / Steps Map

A substantial Step may have dedicated addressability. A shallow Step may be embedded in the Steps Map when identity/selection state and required target-state meaning remain clear.

Step representation may contain Feature target states, bounded `Evolution Impact` Units and complete Target Feature/Scenario/Screen/Domain/Slice/Shared Bodies because this is **future Step-owned downstream meaning**, not current-owner duplication. Application Definition stays upstream and is linked as a driver rather than copied into the Step. Several Units/bodies may share one Step artifact; one Impact Unit does not imply one file.

The Map stores routing/selection relation/prerequisite/readiness/compact uncertainty, not a duplicate of full Step target state.

### Requirements

Keep current realized `BR/IR/PFR` with their natural owner representation. Future `BR/IR/PFR` remain inside the corresponding Evolution Step Target Body until Target Owner Materialization. Do not create one Requirement file per item and do not revive a generic Requirement register merely for storage convenience.

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
└── EVOLUTION-STEPS.md               # concrete candidate/selected future Steps; current owner files above remain realized truth

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
│   └── SL-EXPORT.md                 # dedicated representation of one current realized Slice owner
├── SHARED-CAPABILITIES.md           # small shared owners/bindings
└── EVOLUTION-STEPS.md               # future Step planning / Target Bodies

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
    └── EVO-EXPORT.md                 # complete unrealized target bodies / alternatives / materialization plan

src/
└── ...

tests/
└── ...
```

Even here, exact class/helper/test topology remains implementation-native unless independently semantic.

## Profile Guards

```text
Domain/Slice discovery artifact persisted ≠ durable Domain/Slice authority
retired Slice Strategy view ≠ restored semantic owner
SDS representation example ≠ required repository tree
profile projection ≠ Core placement authority
```

## Worked Navigation Topology

A project may use `navigation/` for maps/registries whose primary job is discoverability. It is not a semantic-owner namespace; rows stay shallow (`identity + short purpose/status + canonical link + compact relation`).
