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

`TM` annotations represent `AP-*` guidance for the Target result itself. `LENS` annotations represent `AG-*` guidance for supporting / artifact-placement meaning produced by that perspective. Semantic owner/handoff/reopen consequences remain Core Finding Disposition concerns. When Core Finding Disposition resolves the current Target as semantic owner and no distinct supporting artifact is useful, the Lens may correctly have no `AG-*` at all. In particular, target-local evolution companion representation proposals come only from WEUC/L5 `AG-L5-02` **after** Core Finding Disposition has accepted/resolved the local evolution meaning; Domain/Slice/Frontend Target Modules and their target-profile Lenses do not propose those companions, and Documentation / Representation + P-14 / TF-10 decide actual materialization.

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
    │       │   TM: TM-SCENARIO-PLANNING / AP-SCN-03
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
    │   │   TM: TM-SCENARIO-PLANNING / AP-SCNDISC-01
    │   │   ROLE: optional navigation/index projection over Scenario owners; never behavioral authority
    │   │
    │   └── SCN-<id>.md
    │       TM: TM-SCENARIO-PLANNING / AP-SCN-01 + AP-SCN-02
    │       FIRST: small Scenario may remain in a consolidated Scenario owner as long as behavioral authority stays reviewable
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
    │   │   ROLE: Slice Implementation Strategy coordinator: Slice portfolio/Behavior realization + broad/shallow Domain/Aggregate realization map + selected Slice owner register
    │   │   NOTE: may contain stable semantic owner slots of small selected Slices; semantic identity/addressability does not require one file per Slice and does not itself form a bounded TM-IMPLEMENTATION-SLICE Target
    │   │
    │   ├── SL-<id>.md
    │   │   TM: TM-SLICE-STRATEGY / AP-SSTRAT-02; add TM-IMPLEMENTATION-SLICE / AP-SLICE-01 + AP-SLICE-02 only after Target Formation selects/reuses that bounded Target
    │   │   FIRST: stable selected owner slot at SLICE-STRATEGY.md#SL-<id> + implementation-native representation
    │   │   SPLIT: promote only when Slice planning/review/addressability becomes independently valuable
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
    │   │   TM: TM-TEST-STRATEGY
    │   │   ROLE: optional lightweight shared proof-layer/non-duplication/environment/harness strategy only when several owners genuinely need it
    │   │   FIRST: local proof + executable tests / existing owner when no shared strategy is needed
    │   │
    │   ├── domain/
    │   │   └── <DomainOwner>.test-design.md
    │   │       TM:   TM-TEST-DESIGN [optional]
    │   │       LENS: Test Proof / AG-TEST-01
    │   │       FIRST: existing Domain/Scenario/Slice owner + exact executable tests
    │   │       SPLIT: only for independently non-trivial proof design
    │   │
    │   ├── slices/
    │   │   └── SL-<id>.test-design.md
    │   │       TM:   TM-TEST-DESIGN [optional]
    │   │       LENS: Test Proof / AG-TEST-01
    │   │       FIRST: existing Slice/Strategy owner + exact executable tests
    │   │       SPLIT: only for independently non-trivial proof design
    │   │
    │   ├── practical/
    │   │   └── <implemented-practical-evidence>.md
    │   │       TM: TM-PRACTICAL-TEST
    │   │       LENS: Practical Evidence / AG-PE-01
    │   │       ROLE: real-implemented-subject acceptance/learning; paired with Prototype through shared Practical Evidence method
    │   │
    │   ├── evidence/
    │   │   └── <evidence-artifact>
    │   │       LENS: Practical Evidence / AG-PE-01 + AG-PE-02; Test Proof / AG-TEST-02
    │   │       FIRST: existing test/run/tool output when durable separate evidence is unnecessary
    │   │
    │   └── TEST-COVERAGE.md
    │       LENS: Test Proof / AG-TEST-03
    │       ROLE: optional durable property→actual Evidence review map; no TM-TEST-COVERAGE Target
    │
    └── <other profile-resolved artifact>
        LENS: L4 / AG-L4-02 may justify a separately useful dependency/change-impact artifact
        LENS: Linked Notes / AG-LINKNOTE-01 records justification in the current owner; it creates no `notes/` tree
        LENS: Documentation/Representation / AG-ART-02 may escalate a material split/merge/reuse/retire/generated-view change
```

## Non-tree Representation / Routing Guidance

- `AP-SCNDISC-02` — route a newly discovered independent Need/result to Core Finding Disposition / Target Formation; no artifact is required by default and no Scenario Catalog becomes semantic authority.

Some source records intentionally describe **embedding, routing or ownership resolution**, not another physical tree node. They are part of the same 58-record projection and are listed explicitly here so the materialization map covers every source record without inventing files.

### Embed after semantic owner / State disposition

```text
AG-L1-01
  Target-Scope Finding Candidate → Core Finding Disposition → accepted current Target/Target-Scope Decision when resolved there

AG-L2-01
  authority/Source/reuse Finding Candidate → Core Finding Disposition → current Target planning state when resolved there; canonical meaning stays with the resolved owner

AG-L3-01
  uncertainty/assumption/revalidation Finding Candidate → Core Finding Disposition → current Target Q/R/P/Decision-basis/revalidation state when resolved there

AG-L4-01
  dependency/change Finding Candidate → Core Finding Disposition → current Target Decision/plan state when resolved there

AG-L5-03
  accepted non-global architecture Answer Decision → current Target

AG-L6-01
  proof/observability/operability Finding Candidate → Core Finding Disposition → current Target requirement/Decision/Test-handoff state when resolved there

AG-QR-01
  material quality/risk Finding Candidate → Core Finding Disposition → resolved semantic/implementation owner or current Target; no generic NFR file by default

AG-SIMP-01
  accepted simplification/retained-complexity Decision → current Target
```

These records are representation projections of already accepted/dispositioned meaning; they do not assign semantic ownership to raw Lens findings. After Core Finding Disposition resolves the State/owner, Documentation / Representation + P-14 may place it in code, a coordinator section, a dedicated owner artifact or another selected representation. `FILE_OR_ARTIFACT: <current-idtspe-owner>` is therefore an owner-address after disposition, not a demand for a dedicated Markdown file.

### Resolve/reroute before placement

```text
AG-L2-02
  missing semantic owner → keep owner unresolved; Core Finding Disposition may surface a Target Formation candidate; do not create a hidden owner file

AG-L6-02
  independently shared operability concern → Core disposition / Target Formation resolves a real Cross-Cutting/shared or bounded local owner before placement

AG-QR-02
  genuinely shared quality must-hold → Core disposition / Target Formation resolves Requirement/Cross-Cutting/other natural shared owner before placement
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
