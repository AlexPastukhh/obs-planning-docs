# SDS Physical Planning Topology — Coordinator

Status: active SDS physical-topology coordinator  
Purpose: define how to resolve SDS physical representation without pretending there is one mandatory planning-file tree.

## Core Rule

```text
SDS has no single mandatory physical tree.

IDTSPE Target exists
≠ file must exist
```

A Target Module can be useful as planning even when its result:

```text
needs no persistence
lives naturally in code/types/tests/schema/config
stays as a section of an existing discovery/strategy/owner artifact
or is represented by a generated/derived view
```

## Canonical Resolution Chain

```text
IDTSPE semantic result
↓
Documentation / Representation Lens
  active/idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md
  decides persistence necessity + natural representation + consolidate/split pressure
↓
SDS Artifact Materialization Tree
  ARTIFACT-PLACEMENT-MAP.md
  shows possible destinations and which TM/Lens proposes them
↓
P-14 / TF-10
  resolves concrete path/section/code/generated destination + action
```

The Documentation / Representation Lens is the semantic owner of:

```text
code vs prose
existing owner vs new owner
registry/strategy/discovery vs individual file
consolidate vs split
implementation-native documentation
pressure-driven topology growth
```

It also contains the canonical **worked physical-tree examples**. Do not duplicate those explanations here.

## Allowed SDS Destination Families

The current profile may resolve material into these families when justified:

```text
<SDS-WORKSPACE>/
├── navigation/context
├── SDS-PLANNING-STATE/
│   ├── product/system evolution
│   ├── Workspace evolution/global architecture
│   └── Ideas routing
├── need/
├── application/
├── scenarios/
├── screens/
├── requirements/
├── domain/
├── slices/
├── frontend/
├── cross-cutting/
├── testing/
└── profile-resolved supporting/generated artifacts
```

This is an **allowed destination family map**, not a scaffold to precreate.

The annotated literal paths and proposers are in [`ARTIFACT-PLACEMENT-MAP.md`](ARTIFACT-PLACEMENT-MAP.md).

## Important Persistence Tendencies

These are tendencies, not mandatory file rules:

```text
Scenario behavior
→ often deserves durable human-readable Scenario ownership early

Domain Discovery
→ often useful as a planning/discovery coordinator even when Domain detail becomes code-native

individual Domain owner file
→ conditional; may remain DOMAIN-DISCOVERY section + code/tests

Slice Strategy / slice-portfolio discovery
→ often valuable because code poorly represents the Slice inventory/order/decomposition rationale

individual Slice owner file
→ conditional; small Slice Decisions/QRP may stay in SLICE-STRATEGY

Test Strategy
→ when shared coordination is material, may naturally act as a registry-like cross-Slice map of proof owner → test class/suite/setup/fixture/harness/helper; keep as a Strategy section first, split to TEST-REALIZATION-MAP only under independent pressure

Test Design / frontend Part Plan
→ consolidate into current Target owner first; split only after independent pressure

Target-local evolution companion
→ `AG-L5-02` representation proposal over accepted/dispositioned local evolution meaning, not direct WEUC/L5 Lens output and not intrinsic Domain/Slice/Frontend Target output
→ Documentation / Representation + P-14 / TF-10 keep an Evolution section first or split to <owner>.evolution.md only after independent pressure

Workspace/global evolution and responsibility maps
→ stronger persistence pressure because implementation cannot represent future/cross-owner topology well
```

## No Linked Notes Storage Tree

Linked Notes remain a navigation/query capability evaluated by `LENS-LINKED-NOTES-USAGE-JUSTIFICATION`. This profile defines no `notes/` or `linked-notes/` content tree.

Reference Object technical registry/index infrastructure, if later selected, is a separate responsibility.

## Worked Topology Examples

Read the **Worked Physical Topologies** section of:

[`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md)

It demonstrates compact, Domain-promoted, Slice-promoted, mature-companion, Scenario-heavy and mixed asymmetric topologies and explains why each file exists or does not exist.
