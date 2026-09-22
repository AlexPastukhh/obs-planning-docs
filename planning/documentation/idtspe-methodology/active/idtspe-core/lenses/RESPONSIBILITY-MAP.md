# Lens Responsibility Map

Status: active routing projection

> Semantic Owner Dependency
> Type: `REPRESENTS`
> Responsibility: `DOC.RESPONSIBILITY-MAP`
> Owner: [Responsibility Map](../../../../principles-and-terminology.md#doc-responsibility-map)

This map owns routing only. Destination files own the semantic bodies. Concrete Lens Models remain identified by their existing `Lens ID`; this map does not create a second Lens lifecycle or duplicate their operational contracts.

| Responsibility | Canonical owner | Boundary / notes |
|---|---|---|
| Generic Lens Meta-Model; Lens Model / Lens Application distinction; generic applicability, Analysis Surface, operation, Finding-boundary and composition rules | [`LENS-MODEL.md`](LENS-MODEL.md#lens-meta-model) — `LENS.META-MODEL` | Defines reusable Lens mechanics only; it does not own concrete Target/Resolution/representation semantics |
| Core Lens discovery, activation-class routing and installed-profile Lens index | [`LENS-REGISTRY.md`](LENS-REGISTRY.md#lens-discovery-registry) — `LENS.DISCOVERY` | Registry scan/select metadata only; selecting a row does not execute a Lens or create a Finding |
| Concrete generic Lens operational evaluation contract | selected concrete `required/`, `frequent/` or `reusable/` `LENS-*` file, identified by its `Lens ID` | Concrete Lens owns its perspective/prompts/applicability/findings; Meta-Model owns common mechanics |
| Reusable theory / Knowledge Basis selection and interpretation used by a Lens | [`../knowledge-bases/RESPONSIBILITY-MAP.md`](../knowledge-bases/RESPONSIBILITY-MAP.md) | Lens may select/interpret knowledge but does not turn theory into current Source/Evidence authority |
| Finding Candidate lifecycle/disposition surfaced by Lens work | [`../resolution/RESPONSIBILITY-MAP.md`](../resolution/RESPONSIBILITY-MAP.md) | Lens surfaces candidates; Core Finding Disposition chooses lifecycle/owner consequence |
| Persistence / artifact implications produced by Lens work | [`../representation/RESPONSIBILITY-MAP.md`](../representation/RESPONSIBILITY-MAP.md) | Lens proposes/evaluates representation pressure; representation owners resolve physical placement/materialization |

Profile-specific Lens Models/registries remain owned by their profile and are intentionally outside this Core map.
