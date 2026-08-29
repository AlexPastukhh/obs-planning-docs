# Methodology System Map — IDTSPE Core, Installed Profiles And Repository Integration

Status: active root navigation / package architecture owner

## 1. Top-Level Architecture

```text
idtspe-methodology-workspace/
├── active/
│   ├── METHODOLOGY-SYSTEM-MAP.md          ← this installed-system map
│   │
│   ├── idtspe-core/                       ← generic methodology/runtime
│   │   ├── BOOTSTRAP-IDTSPE.md
│   │   ├── IDTSPE-CORE-MAP.md
│   │   ├── IDTSPE-SHELL.md
│   │   ├── target-modules/                ← framework, not SDS module bodies
│   │   ├── lenses/                        ← generic Lens model + Core/reusable lenses
│   │   └── shared/                        ← generic Target/Decision/Artifact models
│   │
│   ├── ai-reviewability/                  ← independent peer concern; Key Points review projection
│   ├── theoretical-modules/               ← raw temporary theory; not TM/Lens authority
│   │   └── testing/                       ← exact ca768b61 detailed testing theory snapshot
│   │
│   ├── profiles/
│   │   ├── README.md                      ← installed profile registry
│   │   └── sds/                           ← current SDS/Application planning profile
│   │       ├── BOOTSTRAP-SDS.md
│   │       ├── SDS-FULL-MAP.md
│   │       ├── SDS-PHYSICAL-PLANNING-TREE.md
│   │       ├── SDS-INSTANCE-MAP.md
│   │       ├── target-modules/            ← 16 SDS TM owners
│   │       ├── lenses/                    ← SDS-specific Lens pack
│   │       ├── workflow/                  ← SDS navigation phases
│   │       ├── shared/                    ← SDS-specific rules/templates/graph
│   │       └── examples/                  ← SDS worked examples
│   │
│   ├── <legacy navigation dirs>/README.md ← compatibility pointers only
│   └── audits                            ← installed-system consistency projections
│
├── integration/
│   └── CURRENT-REPOSITORY-INTEGRATION.md ← living repo mapping, not methodology owner
│
└── sources-readonly/                     ← historical/superseded provenance
```

## 2. Fundamental Separation

```text
IDTSPE Core
= generic planning mechanics

Target Module
= reusable concrete Target-family Operational Target Contract; may use a consumer-specific Knowledge Basis over broader theory/reference knowledge

Lens
= processed reusable evaluation perspective with an Operational Evaluation Contract; may use a consumer-specific Knowledge Basis over broader theory/reference knowledge

Theoretical Module
= useful raw/not-yet-operationalized knowledge whose stable timing/Target/Lens placement is not yet known

AI Reviewability
= independent peer concern for reviewable AI output / Key Points; not semantic planning authority

SDS
= one installed Target/Lens/workflow/artifact profile on top of IDTSPE Core
```

Do not use `SDS` as a synonym for the entire IDTSPE methodology.

## 3. Bootstrap Layers

### Whole methodology/core

[`idtspe-core/BOOTSTRAP-IDTSPE.md`](idtspe-core/BOOTSTRAP-IDTSPE.md)

```text
бутстреп idtspe
→ Shell / governance
→ Target Module system + Target Module Knowledge Basis
→ Lens system + Core Pack + TF-06A Lens Applicability Scan + shared Knowledge Basis boundary
→ Decisions / Artifact Placement / Revalidation
→ Q/R/P priority/groups/Decision trace
→ AI Reviewability peer concern + Theoretical Module registry
→ installed profile manifests
```

This is separate from specific Target Module/Lens bodies and from raw Theoretical Module bodies. Bootstrap discovers the theoretical registry without pretending their timing is already operationalized.

### SDS profile

[`profiles/sds/BOOTSTRAP-SDS.md`](profiles/sds/BOOTSTRAP-SDS.md)

```text
бутстреп sds
→ ensure Core current
→ SDS full map
→ 16 SDS Target Modules
→ SDS Lens pack + Core Lens dependencies
→ directed workflow
→ Documentation / Representation policy → materialization tree / Ideas / Evolution
→ SDS command surface
```

Specific Target/Lens commands then read only their relevant owners. Generic `подбери линзы` scans registries/gates and `примени линзу` dispatches to one selected Lens; neither creates a Lens-owned Target. Theory/reference material is consulted proportionally when the selected Target Module/Lens Knowledge Basis points to it or when processed guidance is insufficient; no fixed load-policy field is required.

### Default Core work mode

[`idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md`](idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md)

```text
работай через idtspe
→ use Core Shell by default for subsequent material planning
→ resolve scope / Target first
→ AI proposals are Ideas until accepted
→ use Q/R/P + Decisions + Artifact Placement proportionally
→ do not force SDS unless SDS/profile is actually selected
```

## 4. Generic Dependency Direction

```text
Installed Planning Governance / IDTSPE Shell
↓
generic Target/Lens/Decision/Artifact models
↓
installed profile manifest
↓
Target Module + selected Lens Set
↓
concrete Target Instance
↓
Target-specific accepted output
↓
persistent owner artifact(s)
↓
downstream Target Sources / Evidence / Revalidation
```

Profile workflow and examples project this architecture; they cannot redefine generic Shell semantics.

## 5. Profile-Supplied Direction

IDTSPE Core owns the Handoff/Direction **port**, not one universal product-development chronology.

```text
P-13 / TF-09
→ active profile supplies its Next-Step Resolver / readiness graph
```

Current SDS resolver:

[`profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md`](profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md)

A future non-SDS profile may supply a different graph without modifying the Shell.

## 6. Current SDS Whole Picture

Canonical SDS map:

[`profiles/sds/SDS-FULL-MAP.md`](profiles/sds/SDS-FULL-MAP.md)

Current SDS installs:

```text
16 Target Modules
17 reusable Lenses total available in current installed system
  = generic Core/reusable lenses
  + SDS-specific lens pack
```

The SDS Target catalog is at [`profiles/sds/target-modules/README.md`](profiles/sds/target-modules/README.md).

The split Lens catalog is:

- generic/global registry: [`idtspe-core/lenses/README.md`](idtspe-core/lenses/README.md)
- SDS-specific pack: [`profiles/sds/lenses/README.md`](profiles/sds/lenses/README.md)

## 7. SDS Persistent File Architecture

Canonical scalable topology:

[`profiles/sds/SDS-PHYSICAL-PLANNING-TREE.md`](profiles/sds/SDS-PHYSICAL-PLANNING-TREE.md)

Global planning state:

```text
SDS-PLANNING-STATE/
├── SDS-EVOLUTION-MAP.md
├── SDS-WORKSPACE-EVOLUTION.md
└── ideas/
    ├── INBOX.md
    ├── early/IDEAS.md
    ├── scenario/IDEAS.md
    ├── domain/IDEAS.md
    └── realization/IDEAS.md
```

Semantic/delivery owners become durable only when their meaning warrants persistence. Their representation may be implementation-native, a section of an existing coordinator/owner, a dedicated artifact, or a later specialized companion. Empty optional files are never created merely to satisfy directory shape.

## 8. Workspace Evolution / Global Architecture

Within SDS:

```text
TM-WEUC
→ owns SDS-WORKSPACE-EVOLUTION.md
  including Current Global Architecture Position
```

The SDS WEUC Lens evaluates concrete Domain/Slice/Frontend/etc Targets or whole Workspace architecture against that state. It also evaluates architecture/Workspace work-cost across Understanding, Change, Verification/Diagnosis/Operation and Runtime paths; no second architecture/work-cost Lens is needed. Local architecture remains local by default; project-global implications surface Finding Candidates with `TM-WEUC` as a likely-owner hint, and Core Finding Disposition resolves the actual global owner/handoff before accepted `TM-WEUC` content changes.

The SDS Simplicity / Implementation Economy Lens searches Domain/Slice/Test/etc candidates for unnecessary abstractions, owners, steps, mappings or proof machinery, while treating the global Workspace Evolution Map and target-local evolution plans as constraints so simplification does not create predictable extension/change problems.

## 9. Artifact Placement

Generic resolver contract:

[`idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md`](idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md)

Current SDS AP/AG projection:

[`idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) → [`profiles/sds/ARTIFACT-PLACEMENT-MAP.md`](profiles/sds/ARTIFACT-PLACEMENT-MAP.md)

The IDTSPE response must be able to distinguish:

```text
RESOLVED
UNRESOLVED_PERSISTENCE
UNRESOLVED_PLACEMENT
```

and show which Target Module/Lens proposed the placement.

## 10. Commands / Helper

Generic helper-presentation extension:

[`idtspe-core/shared/command-helper-usage-metadata-extension.md`](idtspe-core/shared/command-helper-usage-metadata-extension.md)

Generic Core command surface:

[`idtspe-core/shared/idtspe-command-surface-contract.md`](idtspe-core/shared/idtspe-command-surface-contract.md)

Current SDS command-surface extension:

[`profiles/sds/shared/idtspe-command-surface-contract.md`](profiles/sds/shared/idtspe-command-surface-contract.md)

Command layers:

```text
бутстреп idtspe
→ generic framework orientation

работай через idtspe
→ Core Shell becomes default material-planning mode
→ scope/Target first; AI proposals are Ideas until selected

бутстреп sds
→ SDS profile orientation

Target Module command
→ bounded concrete Target work

Reusable Lens commands currently accepted:
  lenscmd.weuc.check
  → проверь эволюцию и архитектуру <target>

  lenscmd.simplicity.check
  → проверь можно ли упростить <target>

  lenscmd.documentation.representation.check
  → проверь как лучше зафиксировать <target/result>

  lenscmd.linked-notes.justify
  → проверь оправданы ли linked notes <target>
```

Command/helper implementation remains a projection, not semantic authority.

## 11. Current Repository Integration

Repository-specific migration decisions are deliberately outside `active/` methodology owners:

[`../integration/CURRENT-REPOSITORY-INTEGRATION.md`](../integration/CURRENT-REPOSITORY-INTEGRATION.md)

That ledger is where we decide which current repository SDS files/commands/workflows are kept, adapted, replaced or superseded after a fresh repository audit.

## 12. Provenance

`sources-readonly/` contains frozen history. It may explain how decisions evolved but cannot override current owners in `active/`.


## Command / Helper Runtime Projection

```text
SDS Target Module invocation = IDTSPE Target iteration configured by the module
SDS Lens invocation          = Lens check inside/reusing an IDTSPE Target context
```

Planned helper navigation/grouping is maintained in [`../integration/COMMAND-AND-HELPER-NAVIGATION-PLAN.md`](../integration/COMMAND-AND-HELPER-NAVIGATION-PLAN.md). UI tab/order metadata is a projection and does not own methodology semantics.
