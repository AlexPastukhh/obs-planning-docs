# SDS Profile Command Surface Extension

Status: active SDS command/routing contract

## Purpose

SDS extends generic IDTSPE routing without introducing a second runtime or a second semantic naming system. Generic IDTSPE Core surfaces are owned separately by the Core command-surface contract; this file only adds profile routing/compatibility rules.

```text
Target Module registry / Lens registry
= semantic component identity + short `idtspe` aliases

planning/commands/*.command.md
= repository invocation/compatibility routes

Helper generated catalog
= projection only
```

## Preferred Direct Surface

```text
idtspe
→ ordinary IDTSPE work

idtspe <TM-ID> <context>
idtspe tm <Target Module alias> <context>
→ registered Target Module

idtspe <LENS-ID> <context>
idtspe lens <Lens alias> <context>
→ registered Lens
```

A unique bare alias may resolve directly. Ambiguous/unknown selectors are never guessed.
Canonical semantic identities are `TM-*` and `LENS-*`; short aliases live in the current registries. Repository command IDs (`application_slice.plan`, etc.) and historical `tmcmd.*`/`tm.*` names are implementation/compatibility details, not user semantic ontology.

## Runtime Invariant

```text
user invocation
→ resolve current semantic component
→ normal Target Formation / Target invocation / Lens applicability
→ IDTSPE Core owns State / Resolution / Finding Disposition / lifecycle
```

Invocation mode (`CREATE / REFINE / EXTEND / REVALIDATE / REPAIR`) is separate from command identity.

## Installed SDS Components

Canonical Target Modules: [`../target-modules/README.md`](../target-modules/README.md) — 12.
Canonical SDS-specific Lenses: [`../lenses/README.md`](../lenses/README.md) — 6.

Retired `TM-DOMAIN-DRAFT`, `TM-WEUC` and `TM-FRONTEND-SLICE` are not surfaces. Compatibility commands may preserve old phrases only by routing to current owners.

## Specialized Commands

Dedicated repository commands remain useful for stable recurring intents (for example Scenario planning, Slice planning, proof design, documentation representation, consistency review). They are shortcuts to registered semantic owners, not additional methodology identities.

A new Target Module/Lens does not automatically require a new command. The generic `idtspe` dispatcher is the fallback route for every installed component.

## Compatibility

Legacy Mini/Modular/Full SDS commands are representation preferences only:

```text
mini SDS    → LIGHT placement preference
modular SDS → MIXED / ASYMMETRIC placement preference
full SDS    → COMPLEX placement preference
```

They do not select different semantic profiles, Domain Draft/frontend/WEUC runtimes or fixed file trees.

## Counts / Mechanical Inventory

Command counts are derived from repository command metadata (`methodologyBinding`, palette/compatibility state and generated helper catalog) and verified mechanically. This contract does not manually maintain a total surface arithmetic that can drift from command definitions.

## Next-Step / Representation

Semantic direction: [`directed-methodology-workflow-and-next-step-resolution.md`](directed-methodology-workflow-and-next-step-resolution.md).
Owner/file examples: [`../ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md).
