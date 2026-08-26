# OBS Planning Root

Status: active project-specific planning orientation
Scope: natural repository navigation from purpose to Directions, Use Cases and canonical owners; executable commands are an optional shortcut layer.

## Start Here

```text
README.md
→ planning/README.md
→ planning/direction-registry.md
→ selected local/reusable Direction Registry
→ selected primary semantic registry
   (Use-Case Registry for Workspace/methodology;
    Scenario Catalog for Application)
→ selected Use Case / Scenario
→ canonical owner(s)
```

If you do not know which file to read, select the intent through Directions and the applicable semantic entry (Workspace/methodology Use Case or Application Scenario) instead of browsing filenames at random.

For AI/chat work, read [`AI-WORKING-CONTRACT.md`](AI-WORKING-CONTRACT.md) before material planning, development or documentation changes.


## Current IDTSPE / SDS Planning Authority

Material planning now uses the installed [`IDTSPE methodology workspace`](documentation/idtspe-methodology/README.md) as the canonical generic planning runtime. SDS is an IDTSPE profile, not a second runtime.

IDTSPE Targets may use a reusable Target Module or a first-class Local Target Contract when no reusable module fits. Lens selection is resolved through `TF-06A`: required/module-attached perspectives are combined with a proportional scan of registered Core/profile Lenses. Use `подбери линзы` to review applicability or `примени линзу` to explicitly apply one registered Lens; these do not create Lens-owned Targets.

```text
material planning
→ IDTSPE Core / IDTSPE Shell
→ installed profile when applicable
→ SDS Target Module for Application/Scenario/Domain/Slice/Test planning
→ required/applicable Lenses
→ Documentation / Representation
→ P-14 concrete placement only when persistence is material
```

Primary entry points:

- [`documentation/idtspe-methodology/active/idtspe-core/BOOTSTRAP-IDTSPE.md`](documentation/idtspe-methodology/active/idtspe-core/BOOTSTRAP-IDTSPE.md)
- [`documentation/idtspe-methodology/active/idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md`](documentation/idtspe-methodology/active/idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md)
- [`documentation/idtspe-methodology/active/profiles/sds/BOOTSTRAP-SDS.md`](documentation/idtspe-methodology/active/profiles/sds/BOOTSTRAP-SDS.md)
- [`documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md`](documentation/idtspe-methodology/active/profiles/sds/shared/idtspe-command-surface-contract.md)

The older `application-planning/`, `architecture-planning/`, `testing-planning/` and collect-ideas material remains readable compatibility/provenance during staged migration, but it is not a co-equal authority over current IDTSPE/SDS semantics. Do not recreate the old Idea runtime or mandatory Contextual-WEUC-instance model from those files.

## Authority Split

```text
Direction Registry
  → broad semantic work directions;

Use-Case Registry
  → independently useful Workspace/methodology capabilities: purpose, trigger, result, boundaries, owner route;

Scenario Catalog / Scenario owner
  → independently meaningful Application behavior and its detailed actor-visible contract;

principles / workflow / model / template
  → reusable definition/invariant / repeated process / focused semantic model when justified / recommended shape;

command-routing.md
  → executable command-system entry/global policy;

planning/commands/*.command.md
  → individual commands;

project/application owners
  → concrete current state and implementation meaning.
```

Every independently useful supported Workspace/methodology capability must be discoverable as a current Use Case. Independently meaningful Application behavior must be discoverable as a current Scenario through its Scenario Catalog. Every active canonical owner must be reachable from the applicable semantic entry or an explicit supporting-owner route. A file does not receive a Use Case or Scenario merely because it exists.

## Root Files

- [`direction-registry.md`](direction-registry.md) — root Direction orientation.
- [`use-case-registry.md`](use-case-registry.md) — repository-wide/cross-family Use Cases.
- [`command-routing.md`](command-routing.md) — explicit command routing only.
- [`commands/`](commands/) — concrete command definitions.
- [`AI-WORKING-CONTRACT.md`](AI-WORKING-CONTRACT.md) — mandatory AI/chat working contract.
- [`../parallel-work-scope-registry.md`](../parallel-work-scope-registry.md) — fixed repository parallel-work scopes + canonical scope-log locations.
- [`documentation/`](documentation/) — reusable documentation/planning methodology.
- [`areas/`](areas/) — project-local planning/application state.

## Current Directions

See [`direction-registry.md`](direction-registry.md). Current families cover repository orientation/interaction, solution/application planning, Workspace capability planning, Workspace Architecture Planning, Testing Planning, reusable documentation governance, Documentation Workbench, Planning Runtime, Planning Helper, Linked Notes and Replacement Package App.

## Command-First Input

For an explicit command:

```text
planning/command-routing.md
→ planning/commands/<selected>.command.md
→ ownerFiles
→ related semantic Use Case when useful
```

Command permission does not come from Use-Case activation.

## Workspace Planning Orientation

For evolving code/documentation/planning/automation/knowledge Workspaces, reusable Workspace Planning is the semantic route for establishing/changing useful Workspace capabilities before concrete file execution:

```text
Need / source / Ideas
→ affected existing Workspace UC or candidate new Workspace UC
→ Step 1 — Target UC
→ Step 2 — Domain / Rules / Models / Representations when useful
→ Step 3 — expected Workspace Change Path + proportional Architecture Lens + vertical realization/files/verification when selected
```

See [`documentation/workspace-planning/direction-registry.md`](documentation/workspace-planning/direction-registry.md). Application actor-visible behavior remains Scenario-owned; the code/documentation artifacts used to develop/support it are Workspaces with their own UCs.

## Application Planning Orientation

Current canonical route:

```text
Need / reality / whole-solution choice
→ TM-APPLICATION-DEFINITION when an Application responsibility is justified
→ Prototype when evidence is materially useful
→ Scenario Discovery / Scenario Draft
→ Screen / standalone Requirement only when justified
→ optional Domain Discovery / Domain
→ optional Slice Strategy
→ Implementation Slice / promoted Frontend / Cross-Cutting responsibility as needed
→ Test Design / Test Strategy / Practical Test / Coverage proportionally
→ Decision revalidation / consistency review
```

See [`documentation/idtspe-methodology/active/profiles/sds/SDS-FULL-MAP.md`](documentation/idtspe-methodology/active/profiles/sds/SDS-FULL-MAP.md). Scenario remains Application behavioral authority. Domain and Slice are planning Targets, not mandatory file families; the Documentation / Representation Lens may keep material in code/tests, an existing discovery/strategy owner, one dedicated artifact, or no durable representation when nothing material needs persistence.

## Parallel Work / Scope Logs

```text
parallel-work-scope-registry.md
→ select existing registered scope(s)
→ scope-root/action-log.md
→ work/package/review inside those fixed boundaries
```

Chats do not repartition the repository per task. Cross-scope work keeps one full canonical log record and reference-only entries in the other affected scope logs.

## Current Planning Lenses And Root

The primary planning path is Need/situation → UC or Scenario → planned meaning → downstream realization.

Current review lenses are projections over that one plan:

- **Real-Life** — Need / situation / desired result and known|partial|unknown basis;
- **UC / Scenario** — useful-result ownership and Current→Target meaning;
- **Planning Concerns / Q/R/P** — material owner-attached Questions/Risks/Problems using the shared Concern model; active projection keeps current unresolved/residual state while material retained trace may preserve answers/Decisions without turning history into an active queue;
- **Concern Group** — related Q/R/P sharing one resolution surface; members keep independent Type/Priority/Concern Category/Status;
- **Review Order** — derived from Concern Priority + dependency/blocking/blast-radius/timing over attached concerns in the current scope; it is not the Concern Priority itself;
- **Realization / Evolution** — dependencies, paths, files, verification and architecture evolution when useful.

`Review Order` never selects an unrelated FIND as the next planning unit. Natural-language chat instructions may redirect scope/depth/lens without creating a new command or persistent attention-state entity.

Canonical shared concern semantics: `documentation/planning-concerns-and-decisions-model.md`. Physical concern/register placement is contextual: the selected workflow/profile may keep an Area Concern Register inline in one planning file or split it when useful; no global `concerns.md` topology is required.
