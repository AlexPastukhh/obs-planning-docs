# SDS Profile Command Surface Extension

Status: current S6 invocation / compatibility contract

## Purpose

SDS extends generic IDTSPE invocation routing without creating a second runtime, a second Use-Case root or a competing semantic naming system. **Generic IDTSPE Core surfaces are owned separately** by [`../../../idtspe-core/shared/idtspe-command-surface-contract.md`](../../../idtspe-core/shared/idtspe-command-surface-contract.md); this file owns only the SDS profile extension.

SDS commands inherit the Core command-surface rule that the thin Session interaction contract is ambient after bootstrap/context restoration; they do not route through Session before reaching an SDS owner.

Profile bootstrap owner: [`../README.md`](../README.md). It is incremental over the primary `planning/README.md` bootstrap; the SDS command surface must not duplicate the profile read set.

```text
Methodology Use-Case Process
→ current IDTSPE Work Context
→ SDS Target Module / Lens registry when relevant
→ local applicability/materiality gate
→ selected SDS owner

planning/commands/*.command.md
= optional repository invocation / compatibility projection

Planning Helper
= projection/navigation only
```

A command can express explicit USER invocation intent, but it cannot make a Target, Lens or Result Unit applicable merely by existing.

## Preferred Direct Surface

```text
idtspe
idtspe <TM-ID> <context>
idtspe tm <Target alias> <context>
idtspe <LENS-ID> <context>
idtspe lens <Lens alias> <context>
```

Bare `idtspe` **does not enable a mode**. IDTSPE is already active; the invocation asks the current Use-Case-driven composition to refresh/reaffirm the smallest useful next methodology action. Broad Discussion with no Target/Lens/Checkpoint is a valid result. Unknown or ambiguous selectors are never guessed.

## Current Semantic Registry Boundary

Target authority: [`../target-modules/README.md`](../target-modules/README.md).  
Lens authority: [`../lenses/README.md`](../lenses/README.md).

Retired semantic Target IDs are not current owners:

```text
TM-REQUIREMENT
TM-SLICE-STRATEGY
TM-CROSS-CUTTING-CONCERN
TM-TEST-DESIGN
TM-TEST-STRATEGY
```

S6 resolves command aliases that still use those historical phrases as **hidden compatibility routes**. They may preserve a familiar trigger, but their current `meaning`, `ownerFiles`, output and methodology binding must resolve only to current owners. `palette:false` hides the alias from primary navigation; it is not sufficient if the route itself still revives a retired owner.

Examples:

```text
"slice strategy"
→ compatibility alias
→ TM-IMPLEMENTATION-SLICE when transient Slice discovery is materially useful

"test strategy"
→ compatibility alias
→ LENS-TEST-PROOF-EVIDENCE + natural owner-local proof planning
→ no Test Strategy Target

"shared requirement"
→ compatibility alias
→ Implementation Requirements Discovery + requirement ownership rule
→ no standalone Requirement Target
```

## Runtime Invariant

```text
USER invocation
→ logically re-evaluate current methodology Use Cases
→ UC-IDTSPE-COMPOSE-CURRENT-WORK / other applicable current UC
→ resolve current SDS registry/component only when useful
→ confirm component-local applicability/materiality
→ selected SDS owner performs its specialized work
```

Command identity never changes semantic-owner authority. A command does not bypass the Use-Case-driven work context; explicit selection merely supplies strong invocation context to that composition.

## Specialized Commands

Dedicated repository commands may remain useful for stable recurring intents, including project/application-specific capabilities that are not methodology Use Cases. They are optional shortcuts to current semantic owners/capabilities. A new Target Module or Lens does not automatically require a command, and a command does not create a new Use Case.

The S6 item-by-item cleanup also distinguishes **methodology Use-Case projection** from other project-local Use Cases: Planning Helper's methodology Use-Case catalog is derived from the repository [`../../../../../use-case-registry-map.md`](../../../../../use-case-registry-map.md), not from filesystem discovery of every file named `use-case-registry.md`.

## Compatibility Representation Modes

Legacy Mini/Modular/Full SDS names, where retained, are hidden representation preferences only:

```text
mini SDS    → LIGHT
modular SDS → MIXED / ASYMMETRIC
full SDS    → COMPLEX
```

They do not select different semantic profiles or fixed file trees.

## Semantic Composition / Representation

Profile semantic composition/readiness guidance:
[`directed-methodology-workflow-and-next-step-resolution.md`](directed-methodology-workflow-and-next-step-resolution.md).

Representation:
[`../ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md).
