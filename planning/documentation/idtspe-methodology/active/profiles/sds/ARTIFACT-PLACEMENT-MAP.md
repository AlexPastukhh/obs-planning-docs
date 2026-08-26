# SDS Artifact Materialization Tree — Placement Projection

Status: active canonical SDS **artifact/materialization projection**  
Purpose: show the possible physical destinations used by SDS and annotate which Target Modules / Lenses propose each destination or representation.

Semantic source records remain in:

```text
Target Module  → ARTIFACT_PROPOSAL / AP-*
Lens           → ARTIFACT_GUIDANCE / AG-*
```

This tree is a projection of those source records plus a small number of explicit SDS profile-infrastructure artifacts. It does **not** mean every node should be created.

Fundamental representation policy: [`../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md).  
Concrete placement/action resolver: [`../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md`](../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).  
Physical-topology coordinator: [`SDS-PHYSICAL-PLANNING-TREE.md`](SDS-PHYSICAL-PLANNING-TREE.md).

## Legend

```text
TM:       Target Module source proposal
LENS:     Lens source guidance
PROFILE:  SDS profile infrastructure / coordinator artifact, not directly proposed by one AP/AG record
FIRST:    cheaper/default representation that may be sufficient before this node exists
SPLIT:    separate file normally appears only after representation pressure justifies it
```

`FIRST`/`SPLIT` are summarized here only for navigation. Their semantic owner is the Documentation / Representation Lens, which contains the detailed rules and worked trees.

`TM` annotations represent `AP-*` guidance for the Target result itself. `LENS` annotations represent `AG-*` guidance for supporting/routing meaning produced by that perspective. A Lens that simply returns accepted findings to the Target owner may correctly have no `AG-*` at all. In particular, target-local evolution companions are proposed only by WEUC/L5 (`AG-L5-02`), not by Domain/Slice/Frontend Target Modules or their target-profile Lenses.

## Materialization Tree

```text
<PROJECT>/
│
├── <implementation workspace>/
│   ├── source code / types / modules / packages
│   ├── tests / executable specifications
│   ├── schemas / configuration
│   └── focused WHY-comments / doc-comments
│       LENS: LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY / AG-ART-01
│       ROLE: valid primary representation when implementation-native meaning is sufficient
│       NOTE: not an SDS planning-file family
│
└── <SDS-WORKSPACE>/
    ├── README.md
    │   PROFILE: navigation only when useful
    │
    ├── SDS-PLANNING-CONTEXT.md
    │   PROFILE: cross-Target planning context only when useful
    │
    ├── SDS-PLANNING-STATE/
    │   ├── README.md
    │   │   PROFILE: navigation only when useful
    │   │
    │   ├── SDS-EVOLUTION-MAP.md
    │   │   PROFILE: accepted/planned product/system evolution owner
    │   │   NOTE: currently not introduced by one dedicated AP/AG record
    │   │
    │   ├── SDS-WORKSPACE-EVOLUTION.md
    │   │   TM:   TM-WEUC / AP-WEUC-01
    │   │   LENS: WEUC / AG-L5-01
    │   │
    │   └── ideas/
    │       ├── INBOX.md
    │       │   TM: TM-PROTOTYPE / AP-PROT-03 may route loose ideas here when layer is unclear
    │       │
    │       ├── early/IDEAS.md
    │       │   PROFILE: early Solution/Application/Prototype layer route
    │       │   TM: TM-PROTOTYPE / AP-PROT-03 may route here
    │       │
    │       ├── scenario/IDEAS.md
    │       │   TM: TM-SCENARIO-DRAFT / AP-SCN-03
    │       │
    │       ├── domain/IDEAS.md
    │       │   TM: TM-DOMAIN-DISCOVERY / AP-DOMDISC-02
    │       │
    │       └── realization/IDEAS.md
    │           PROFILE: WEUC/Slice/Frontend/Test/implementation layer route
    │           TM: TM-PROTOTYPE / AP-PROT-03 may route an otherwise unowned idea to the appropriate layer
    │
    ├── need/
    │   └── NEED-<id>.md
    │       PROFILE: optional durable Need/Reality owner after Target Formation
    │       FIRST: current Application/Scenario context when separate Need addressability is unnecessary
    │
    ├── application/
    │   ├── APPLICATION-DEFINITION.md
    │   │   TM: TM-APPLICATION-DEFINITION / AP-APP-01
    │   │
    │   ├── reference-research.md
    │   │   TM: TM-APPLICATION-DEFINITION / AP-APP-02
    │   │   FIRST: Application Definition section when evidence is small
    │   │
    │   ├── <refined-real-life-scenario-artifact>
    │   │   TM: TM-APPLICATION-DEFINITION / AP-APP-03
    │   │   FIRST: refined route section inside APPLICATION-DEFINITION.md
    │   │   SPLIT: only when the application-aware real-life route is repeatedly reused/reviewed independently
    │   │
    │   └── prototypes/
    │       └── <prototype>.md
    │           TM: TM-PROTOTYPE / AP-PROT-01
    │           LENS: L3 / AG-L3-02 and Practical Evidence / AG-PE-01 may reuse the Prototype/Practical owner
    │           SPLIT: raw/reusable evidence may live separately only when AP-PROT-02 / practical Evidence pressure exists
    │
    ├── scenarios/
    │   ├── SCENARIO-CATALOG.md
    │   │   TM: TM-SCENARIO-DISCOVERY / AP-SCNDISC-01
    │   │   ROLE: catalog/discovery coordinator; often valuable even before all Scenario files exist
    │   │
    │   └── SCN-<id>.md
    │       TM:   TM-SCENARIO-DISCOVERY / AP-SCNDISC-02
    │       TM: TM-SCENARIO-DRAFT / AP-SCN-01 + AP-SCN-02
    │       FIRST: small Scenario may remain in a consolidated Scenario owner/catalog only if behavioral authority stays reviewable
    │
    ├── screens/
    │   ├── SCREEN-MAP.md
    │   │   TM: TM-SCREEN / AP-SCREEN-01
    │   │
    │   └── <screen>.md
    │       TM: TM-SCREEN / AP-SCREEN-02
    │       FIRST: SCREEN-MAP section when individual Screen addressability is unnecessary
    │
    ├── requirements/
    │   └── REQ-<id>.md
    │       TM: TM-REQUIREMENT / AP-REQ-01
    │       ROLE: exceptional standalone shared must-hold owner
    │       FIRST: natural Scenario/Domain/Slice/etc owner; do not create standalone Requirement by default
    │
    ├── domain/
    │   ├── DOMAIN-DISCOVERY.md
    │   │   TM: TM-DOMAIN-DISCOVERY / AP-DOMDISC-01
    │   │   ROLE: Domain map/discovery coordinator; may retain responsibility summaries, Decisions and residual QRP for several logical Domain owners
    │   │
    │   ├── <DomainOwner>.md
    │   │   TM: TM-DOMAIN-DRAFT / AP-DOM-01
    │   │   FIRST: implementation-native representation + DOMAIN-DISCOVERY.md#<DomainOwner>
    │   │   SPLIT: promote only when independent owner-level human-readable planning is useful
    │   │
    │   └── <DomainOwner>.evolution.md
    │       LENS: WEUC / AG-L5-02
    │       FIRST: Evolution section in <DomainOwner>.md or DOMAIN-DISCOVERY.md
    │       SPLIT: material independent future paths/revalidation lifecycle
    │
    ├── slices/
    │   ├── SLICE-STRATEGY.md
    │   │   TM: TM-SLICE-STRATEGY / AP-SSTRAT-01
    │   │   ROLE: Slice inventory/discovery/portfolio/order coordinator; can hold small per-Slice Decisions/QRP directly
    │   │
    │   ├── SL-<id>.md
    │   │   TM: TM-SLICE-STRATEGY / AP-SSTRAT-02; TM-IMPLEMENTATION-SLICE / AP-SLICE-01 + AP-SLICE-02
    │   │   FIRST: SLICE-STRATEGY.md#SL-<id> + implementation-native representation
    │   │   SPLIT: promote when Slice planning/review/addressability becomes independently valuable
    │   │
    │   ├── SL-<id>.evolution.md
    │   │   LENS: WEUC / AG-L5-02
    │   │   FIRST: Evolution section in SL-<id>.md or SLICE-STRATEGY.md
    │   │   SPLIT: separate future/revalidation lifecycle
    │   │
    │   └── parts/
    │       └── <slice-part-plan>.md
    │           TM: TM-IMPLEMENTATION-SLICE / AP-SLICE-02
    │           FIRST: section inside SL-<id>.md
    │           SPLIT: exceptional independent size/reuse/review pressure
    │
    ├── frontend/
    │   ├── <frontend-owner>.md
    │   │   TM: TM-FRONTEND-SLICE / AP-FE-02
    │   │   FIRST: parent Slice owner / AP-FE-01
    │   │   SPLIT: only after frontend responsibility is independently promoted
    │   │
    │   └── <frontend-owner>.evolution.md
    │       LENS: WEUC / AG-L5-02
    │       FIRST: parent Frontend/Slice Evolution section
    │
    ├── cross-cutting/
    │   └── <concern>.md
    │       TM:   TM-CROSS-CUTTING-CONCERN / AP-XCUT-01
    │       LENS: Shared/Cross-Cutting / AG-XCUT-01
    │       FIRST: consumer-local obligation + canonical existing owner
    │       NOTE: consumer files keep local integration only (AP-XCUT-02 / AG-XCUT-02)
    │
    ├── testing/
    │   ├── TEST-STRATEGY.md
    │   │   TM: TM-TEST-STRATEGY / AP-TSTRAT-01
    │   │   ROLE: shared proof/layer allocation; may contain a compact Test Realization / Topology Registry mapping Slice/Domain proof → test suite/class → setup/fixture/harness/helper
    │   │   FIRST: Domain/Slice-specific Test Design when no shared strategy is needed
    │   │
    │   ├── TEST-REALIZATION-MAP.md
    │   │   TM: TM-TEST-STRATEGY / AP-TSTRAT-01 (optional promoted representation of the same Strategy meaning)
    │   │   FIRST: Test Realization / Topology Registry section inside TEST-STRATEGY.md
    │   │   SPLIT: only when the cross-owner test realization map is independently large/reviewed/reused; reference test code instead of duplicating bodies/assertions
    │   │
    │   ├── <shared-test-data-or-environment-artifact>
    │   │   TM: TM-TEST-STRATEGY / AP-TSTRAT-02
    │   │   FIRST: TEST-STRATEGY section/config/schema when separate reuse is unnecessary
    │   │
    │   ├── domain/
    │   │   └── <DomainOwner>.test-design.md
    │   │       TM:   TM-TEST-DESIGN / AP-TDES-01
    │   │       LENS: Test Proof / AG-TEST-01
    │   │       FIRST: Domain owner/discovery section + executable tests
    │   │       SPLIT: substantial independently reviewable proof design
    │   │
    │   ├── slices/
    │   │   └── SL-<id>.test-design.md
    │   │       TM:   TM-TEST-DESIGN / AP-TDES-01
    │   │       LENS: Test Proof / AG-TEST-01
    │   │       FIRST: Testing section in SL-<id>.md or SLICE-STRATEGY.md + executable tests
    │   │       SPLIT: substantial independently reviewable proof design
    │   │
    │   ├── practical/
    │   │   └── <practical-test>.md
    │   │       TM: TM-PRACTICAL-TEST / AP-PTEST-01; TM-TEST-DESIGN / AP-TDES-02 may route human/operated proof here
    │   │       LENS: Practical Evidence / AG-PE-01 may use the practical-test owner
    │   │
    │   ├── evidence/
    │   │   └── <evidence-artifact>
    │   │       TM:   TM-PRACTICAL-TEST / AP-PTEST-02; TM-TEST-COVERAGE / AP-TCOV-02 may reference actual evidence
    │   │       LENS: Practical Evidence / AG-PE-01 + AG-PE-02; Test Proof / AG-TEST-02
    │   │       FIRST: existing test/run/tool output when durable separate evidence is unnecessary
    │   │
    │   └── TEST-COVERAGE.md
    │       TM: TM-TEST-COVERAGE / AP-TCOV-01
    │       ROLE: coverage/review owner when a durable coverage review is useful
    │
    └── <other profile-resolved artifact>
        LENS: L4 / AG-L4-02 may justify a separately useful dependency/change-impact artifact
        LENS: Linked Notes / AG-LINKNOTE-01 records justification in the current owner; it creates no `notes/` tree
        LENS: Documentation/Representation / AG-ART-02 may escalate a material split/merge/reuse/retire/generated-view change
```

## Non-tree Representation / Routing Guidance

Some source records intentionally describe **embedding, routing or ownership resolution**, not another physical tree node. They are part of the same 58-record projection and are listed explicitly here so the materialization map covers every source record without inventing files.

### Embed into the current/natural owner

```text
AG-L1-01
  accepted Target-Scope correction → current Target/Target-Scope Decision

AG-L2-01
  authority/Source/reuse mapping → current Target planning state; canonical meaning stays with the identified owner

AG-L3-01
  material uncertainty/assumption/revalidation signal → current Target

AG-L4-01
  dependency/change finding that affects a Decision → current Target

AG-L5-03
  non-global architecture Answer Decision → current Target

AG-L6-01
  proof/observability/operability finding → current Target

AG-QR-01
  material quality/risk → natural semantic/implementation owner or current Target; no generic NFR file by default

AG-SIMP-01
  accepted simplification/retained-complexity Decision → current Target
```

These records may ultimately resolve to code, a coordinator section, a dedicated owner artifact or another representation selected by the Documentation / Representation Lens and P-14. `FILE_OR_ARTIFACT: <current-idtspe-owner>` is therefore an owner-address, not a demand for a dedicated Markdown file.

### Resolve/reroute before placement

```text
AG-L2-02
  missing semantic owner → reopen Target Formation; do not create a hidden owner file

AG-L6-02
  independently shared operability concern → form/reuse a real local child or Cross-Cutting owner first

AG-QR-02
  genuinely shared quality must-hold → form/reuse Requirement/Cross-Cutting/other natural shared owner first
```

These are `ROUTE`/`UNRESOLVED` outcomes. A physical node appears only after semantic ownership and representation are resolved.

## Projection Completeness Rule

The human-facing projection must account for **all source AP/AG IDs** either:

```text
inside a materialization-tree node
or
in Non-tree Representation / Routing Guidance
```

No AP/AG record may disappear merely because it does not create a file. Conversely, the projection must not invent a file to make an embed/route record look tree-shaped.

The source record count is validated from Target Module/Lens bodies directly; this tree replaces the old flattened guidance table as the human-facing file projection.

## How To Read This Tree

Do not start from the tree and instantiate files.

Start from:

```text
IDTSPE semantic result
↓
Documentation / Representation Lens
↓
minimum sufficient representation
↓
this tree as destination/proposer navigation
↓
P-14 / TF-10 concrete placement/action
```

For the detailed rules and multiple explained physical-tree examples, read [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md).
