# OBS Planning Command Registry

Status: active project command-definition registry
Scope: repository-owned concrete command definitions used by the root command router, AI/chats and the modular Planning Helper.

<a id="planning-command-definition-contract"></a>
## Authority

Responsibility ID: `COMMAND.DEFINITION-CONTRACT`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Root Command Routing`](../command-routing.md#planning-command-routing) — `COMMAND.ROOT-ROUTING`
> - `CONTEXTUALIZES` [`Planning Helper Semantic Projection`](../documentation/tools/tampermonkey/chat-command-palette/README.md#planning-helper-semantic-projection) — `HELPER.SEMANTIC-PROJECTION`

Responsibility routing across Commands/IDTSPE/Helper: [`RESPONSIBILITY-MAP.md`](RESPONSIBILITY-MAP.md).

```text
planning/command-routing.md
  = mandatory root command-system entrypoint and shared routing/global policy;

planning/commands/*.command.md
  = individual concrete command definitions;

linked owner workflows/templates/area docs
  = reusable or local behavior algorithms;

Tampermonkey Planning Helper
  = projection/editor/runtime for real Planning Commands and local drafts, not command meaning authority.
```

Read `planning/command-routing.md` for explicit command routing, then resolve the selected direct definition and its `ownerFiles`. For methodology-use navigation, start from `planning/documentation/use-case-registry-map.md`; component registries are consulted from current Use-Case Processes or explicit component invocation context.

## Discovery

A command definition is active when it is a **direct child** of this folder and its filename ends with `.command.md`.

```text
planning/commands/<name>.command.md
```

V1 does not scan nested folders. `README.md` is navigation/contract documentation and is not itself a command. There is no separate command-registry JSON file. The direct command files are the registry.

## Definition Format

Every command file contains exactly one marker block:

```text
[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "stable.command.id",
  "file": "example.command.md",
  "command": "canonical command",
  "englishName": "canonical English name",
  "commandFamily": ["canonical command", "alias"],
  "description": "compact palette description",
  "meaning": "route meaning",
  "activeContextBehavior": "...",
  "traversalReadMode": "...",
  "ownerFiles": ["planning/..."],
  "ownerRefs": [
    {
      "responsibilityId": "OWNER.RESPONSIBILITY",
      "path": "planning/.../OWNER.md",
      "anchor": "canonical-anchor",
      "why": "why this command needs this owner/contract",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ],
  "includes": ["planning/commands/another-command.command.md"],
  "compositionContributions": [
    {"kind": "PORT_CAPABILITY_REQUIREMENT", "value": "TARGET", "why": "why this must be known before semantic execution"}
  ],
  "expectedOutput": "...",
  "permissionMode": "...",
  "keyReminders": ["..."],
  "userTarget": "<placeholder>",
  "palette": true,
  "refinements": []
}
[/PLANNING_COMMAND_DEFINITION]
```

The JSON is intentionally strict so repository writes, build-time validation and AI-generated definitions use one parseable representation. Markdown outside the marker is human navigation only.

## Required Invariants

- `schemaVersion` is `1`.
- `id`, `file`, `command`, `englishName`, `meaning`, `activeContextBehavior`, `traversalReadMode`, `expectedOutput`, `permissionMode` and `userTarget` are non-empty.
- `file` equals the actual direct-child filename.
- `commandFamily` contains the canonical `command` exactly.
- IDs, canonical commands and aliases are unique across the complete catalog.
- `ownerFiles`, `includes` and `keyReminders` are arrays of strings. `includes` contains canonical repository-relative paths to registered direct `planning/commands/*.command.md` definitions only; every referenced command file must exist, resolve to exactly one registered command, cycles are forbidden and duplicate paths are invalid. Command IDs remain semantic/invocation identities inside the referenced definitions, not dependency locators.
- `compositionContributions` is an optional structured list collected from **all expanded DAG nodes before semantic execution**. It exposes only pre-execution facts required by composition (for example `WORKING_TRACE_REQUIRED`, `TRACE_SINK_PREFERENCE`, `PORT_CAPABILITY_REQUIREMENT`, `REVIEW_COVERAGE_MODE`, or registered component selection). `REVIEW_COVERAGE_MODE` accepts only `CURRENT_BASIS` or `LOCAL_AFFECTED_RECHECK`. It is not another workflow or Shell topology.
- `ownerRefs` is a required non-empty structured list of the **canonical references added by this command itself**. Each entry names `responsibilityId`, repository `path`, optional canonical `anchor`, human-readable `why`, semantic `role`, and `readMode`. Do not repeat references inherited from `includes`. Every active direct command must expose at least one own canonical reference with `why`; legacy broad `ownerFiles` alone are insufficient.
- `ownerRefs.role` is one of `PRIMARY_OWNER`, `SUPPORTING_CONTRACT`, `REGISTRY`, `POSSIBLE_DESTINATION`, `VALIDATION_HANDOFF`, `RUNTIME_ENTRY`, `ROUTING`. `readMode` is `REQUIRED`, `ON_DEMAND` or `DESTINATION_ONLY`.
- `palette` is boolean. `false` keeps a registered command out of the normal palette without making it unregistered.
- current command semantics do **not** maintain Helper-only `When To Use` / `What You Get` prose. Helper may project **Контекст / Результат / Суть** from canonical fields: direct commands use `activeContextBehavior / expectedOutput / meaning`; semantic UC/TM/Lens cards use their canonical owners. Old cached definitions containing `helperPresentation` remain parser-compatible only.
- one high-level command may orchestrate several existing project capabilities or methodology components when that gives a useful stable invocation surface. This never creates a Use Case, Target Module, Lens or semantic owner and never lets the command own their algorithms.
- no normative methodology rule may exist only in a Planning Command. Commands may define USER invocation semantics, command dependency/traversal guarantees, invocation context, permission boundaries and expected invocation projections; reusable semantic/process meaning MUST resolve to canonical methodology/repository owners so the methodology remains executable without Helper/commands.
- refinements contain only compact owner-read instructions; they do not duplicate owner algorithms.
- result-producing commands may depend on reusable governance through `ownerFiles` / their semantic owner route; the shared command router reuses current governance, refreshes affected owners proportionally, and performs a full internal preflight only when no reliable sufficient governance context exists. A source snapshot/commit/branch change alone does not force a full reread.
- `methodologyBinding` is optional **projection/dispatch metadata** for the current semantic surface (`IDTSPE`, profile, UC/TM/Lens surface kind, host-target policy). It never becomes a second semantic owner and does not encode Shell-port contracts.
- `ownerFiles` are canonical owner/read routes, not command includes. `ownerRefs` refine that read route with exact Responsibility/anchor purpose; they still do not become executable includes.
- `includes` paths are executable **command→command** dependency references only. They MUST resolve under `planning/commands/` to direct `.command.md` definitions. Do not place methodology/Use-Case/owner files in `includes`; those remain `ownerFiles` / `ownerRefs` / methodology handoffs.
- `includes` is the only canonical command dependency relation. Do not add a second `extends`/inheritance graph for behavior already represented by dependency composition. Helper may derive `included by` from reverse include edges; commands sharing semantic lifecycle without prerequisite execution should point to the same owner/contracts instead.
- `includes` is a declarative **command-composition dependency graph**. A command MUST NOT begin its own semantic action while its registered composition is still being discovered. Expand **all selected root commands/components and every transitive include first**, merge one DAG, reject cycles/unresolved command paths, deduplicate shared nodes, collect declarative contributions from every node, and only then execute dependencies before dependents. `includes` never means recursively run several independent passes.
- Command composition MUST NOT maintain a parallel Shell-port ontology. Do not add durable numeric `requiredPorts`, `portRequirements`, `includeFiles` or similar lists. Named port/capability commands may contribute explicit requirements; `IDTSPE.PORT-COMPOSITION-REFRESH` resolves those requirements against the current Shell topology.


<a id="planning-command-composition"></a>
## Command Composition / Includes

Every Planning Command invocation includes the canonical methodology Use-Case applicability recheck, either directly or transitively through its registered command composition. The recheck scans the Methodology Use-Case Registry Map and only plausibly applicable scoped registry rows; it does **not** execute every Use Case.

### Expand First, Execute Dependencies Before Dependents

The composition lifecycle is normative:

```text
all selected root commands / semantic component cards
→ fully expand every transitive `includes` edge
→ merge one dependency DAG
→ reject unresolved command paths / cycles
→ deduplicate shared nodes
→ collect declarative contributions from ALL nodes before semantic execution
→ establish the dependencies-first execution plan
→ execute deepest/shared dependencies first
→ execute each dependent only after its requirements completed or were validly REUSED
→ selected root/leaf action executes last on its own branch
```

Declarative contributions are known at composition time rather than waiting for the node's later runtime action. The Helper/command resolver projects and merges the structured `compositionContributions` from every expanded node plus registered TM/Lens selection metadata before dependency semantic actions begin. They include, when applicable:

```text
explicit named capability/port requirements
selected Target Module / Lens / Use-Case identity
trace sink/detail configuration
current target/context selectors
review coverage mode/context (`CURRENT_BASIS` or `LOCAL_AFFECTED_RECHECK`)
permission constraints
```

This is essential for IDTSPE: `IDTSPE.PORT-COMPOSITION-REFRESH` must already know all explicit leaf requirements before it refreshes the Port Requirement Set.

For `idtspe.review`, `idtspe.review.recheck` and current-basis specialized reviews such as `idtspe.review_consistency`, `REVIEW_COVERAGE_MODE` is interpreted during this pre-execution composition stage. The Review Strategy/Coverage owner resolves the bounded Review Subject/Scope/Basis, trustworthy prior record when applicable, review obligations/intents and reusable prior coverage **before** Validation or Lens dependency semantic actions run. It does not select executable Lens applications: P-06 owns Lens applicability/supported-operation resolution and forms the selected `(Lens Model, Analysis Surface, Operation, basis)` applications. `CURRENT_BASIS` derives current-basis obligations; `LOCAL_AFFECTED_RECHECK` derives stale/partial/invalidated/newly exposed/previously blocked obligations. If both modes occur in one bounded review composition, the effective contribution set normalizes them to `LOCAL_AFFECTED_RECHECK` before semantic execution.

For normal IDTSPE work the reusable base is:

```text
idtspe.work
├─ idtspe.port.trace
├─ methodology.use_cases.recheck
└─ idtspe.port-composition.recheck
```

The one structured P-02 working trace is established during invocation preparation so the Use-Case and Port Composition rechecks are recorded incrementally. Canonical Shell `P-02` after `P-01` adopts/continues that same trace; no second trace is created.

User-level/specialized IDTSPE operations expose the base frame explicitly even when some dependencies are also reachable transitively. The duplicate edges are intentional declaration and are deduplicated in the merged DAG.

```text
TM-* command/card
├─ idtspe.work
├─ idtspe.port-composition.recheck
├─ idtspe.port.trace
├─ idtspe.port.target
├─ idtspe.target-module.apply
└─ selected TM-* Model

LENS-* command/card
├─ idtspe.work
├─ idtspe.port-composition.recheck
├─ idtspe.port.trace
├─ idtspe.port.lens
├─ idtspe.lens.apply
└─ selected `(LENS-* Model, Analysis Surface, Operation, basis)` application
```

Named `idtspe.port.*` commands contribute an explicit named capability requirement. Generic `idtspe.target-module.apply` / `idtspe.lens.apply` contribute the reusable Meta-Model/registry/Unit-or-Finding machinery. Concrete TM/Lens cards add only their own selected Model reference; references inherited from the shared prefixes are not copied into every leaf card.

The methodology remains independently executable without Helper/command projection: Use Cases, semantic owners and their natural handoffs define the process. Command composition is a reproducible traversal guarantee over those canonical owners, not a second source of methodology meaning.

## Planning Helper Semantic Projection

The Planning Helper does not render one primary row per direct command file. Current methodology Use Cases, Target Modules and Lenses project to one stable semantic Command identity (`uc:...`, `tm:...`, `lens:...`). A direct command definition may supply that card's invocation body/aliases, while focused aliases remain refinements rather than duplicate primary cards.

Every primary command card exposes `Run`, `Смысл`, `Body`, `Scenarios N` and presentation-only `Group`. `Body` exposes the actual invocation plus provenance/source information; `Scenarios N` is a derived reverse index into canonical working Scenarios. Canonical Scenarios contain semantic owner references and never contain command IDs/triggers/Helper labels.

`helperPresentation.navigation` and `helperPresentation.whenToUse/whatYouGet` are legacy-cache compatibility only. Current Helper navigation derives from semantic identity plus GitHub-backed presentation groups in `catalog-order.json`; the three-part explanation is projected from canonical command/UC/TM/Lens authority. Canonical Scenario prose remains the authority for workflow composition/examples, not a duplicate per-card help catalog.

## Current IDTSPE/SDS Projection

Current methodology command-surface ownership is layered: generic Core surfaces are owned by [`idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md`](../../../project/planning/documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md), while SDS-specific surfaces extend them through [`profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md`](../../../project/planning/documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md). Repository IDs/aliases may reuse existing commands; methodology identity is not inferred from filenames.

IDTSPE is always active; command invocation does not enable it. A direct Target Module/Lens command expresses USER intent and provides strong selection context, but current Use-Case composition and the selected component's local applicability/materiality gate still determine whether a Target/Unit/Lens application is useful. Hidden legacy aliases may remain for compatibility, but they must route only to current owners and must not preserve retired Target families.

Planning Helper methodology Use Cases are projected only from [`../documentation/use-case-registry-map.md`](../documentation/use-case-registry-map.md) and the current scoped registries it maps. Filesystem presence of another `use-case-registry.md` does not make its entries global methodology-use UCs.

Generic Lens operations are repository commands `idtspe.lenses.select` (`подбери линзы`) and `idtspe.lens.apply` (`примени линзу`). They dispatch through the canonical Lens capability / Lens Meta-Model and registered Lens owners over a bounded Analysis Surface; there is no fixed Target Lens Set field and no generic requirement to create/resolve a Target merely to host Lens work. `idtspe.work`, named `idtspe.port.*`, `idtspe.target-module.apply` and `idtspe.lens.apply` are explicit command-composition surfaces projected in the `IDTSPE Pass` Helper view; concrete `TM-*` and `LENS-*` cards remain in their own semantic views.

The six retired `collect-ideas*` command IDs remain hidden compatibility aliases only. They must route their supplied material into the current IDTSPE/SDS Target/owner model and must not retain the old collect-Ideas shell, Current Plan runtime, Idea Review owners or old SDS physical-profile owners. Hiding an old command from the palette is not enough if its owner route still revives obsolete semantics.

## Creating Or Updating A Command

Normal repository workflow:

1. Plan/accept the command route and owner semantics.
2. Create or update exactly one direct `*.command.md` file.
3. Validate the complete catalog.
4. Update root/global command-system documentation only when shared routing rules change.
5. Update examples/navigation only when affected.

The Planning Helper treats this repository catalog as durable authority/backup while normal browser operation remains local-first. Commands are loaded from one browser-local snapshot into RAM. Explicit `Hard Reload GitHub` reads the complete current direct/semantic/scenario catalogs and `catalog-order.json`, replaces the GitHub-backed local command surface, removes command rows absent from GitHub, preserves Prompt-library content and prunes stale favorites; `Sync missing` remains incremental. ChatGPT-mediated marker-block restore is a fallback/debugging route, not the only repository recovery path.

The Planning Helper Commands surface can create/edit a validated local command-definition draft. `Save GitHub` reads/validates the complete direct remote command catalog, then creates or updates the deterministic `planning/commands/*.command.md` target with optimistic SHA protection and exact verification. `Reload GitHub` explicitly replaces one local command draft with the current remote command. Repository command deletion/retirement remains outside the Helper runtime and requires the separate authorized documentation/command-maintenance route.

## Helper Library Boundary

`planning/helper-library/prompts/*.prompt.md` contains reusable prompt insertion text and is not command authority. Historical `planning/helper-library/commands/*.helper-command.md` records are legacy compatibility insertions only: the current UI does not create them, and they never become Planning Commands. Their compatibility contract is owned by `planning/helper-library/README.md`.

## Planning Helper

Developer/build entry:

```text
planning/documentation/tools/tampermonkey/chat-command-palette/README.md
```

Generated install artifact:

```text
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
```

Build generates `seed/commands.json` from the direct command catalog as a verified repository projection; current command identities are not maintained as hard-coded userscript authority. Runtime remains browser-local/RAM-first, while explicit `Reload`, `Sync missing` and `Hard Reload GitHub` provide repository reads/recovery. Generated projections never replace `planning/commands/*.command.md` as authority.
