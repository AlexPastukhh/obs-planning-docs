<a id="idtspe-profile-discovery"></a>
# Installed IDTSPE Profiles

Responsibility ID: `IDTSPE.PROFILE-DISCOVERY`

Status: active profile registry

A profile packages concrete Target Modules, profile-specific Lenses, semantic guidance, representation conventions, command surfaces and examples on top of IDTSPE Core.

## Installed

| Profile | Bootstrap entry | Scope |
|---|---|---|
| [`SDS`](sds/README.md) | [`sds/README.md`](sds/README.md) → `Profile Bootstrap` | software/Application planning through behavior, implementation ownership, exact realization and evidence |
| [`2D Visual Production`](visual-production-2d/README.md) | [`visual-production-2d/README.md`](visual-production-2d/README.md) → `Profile Bootstrap` | planning and producing 2D visual results through requirements, visual material, whole-visual design, construction and delivery adaptation |
| [`Reference Knowledge`](reference-knowledge/README.md) | [`reference-knowledge/README.md`](reference-knowledge/README.md) → `Profile Bootstrap` | reusable reference subjects/Banks, Vocabulary, analysis and evidence-grounded Landscape research |

For profile-local responsibility routing after profile selection, use [`RESPONSIBILITY-MAP.md`](RESPONSIBILITY-MAP.md); each profile child map routes its own semantic owners without duplicating Core contracts.

## Bootstrap Rule

Every profile bootstrap is incremental. It assumes the primary bootstrap from [`planning/README.md`](../../../../README.md) has already established Session, Documentation and IDTSPE Core. A profile `README.md` owns its own profile read set; installed-profile navigation does not duplicate it here.

## Profile Applicability Gate

```text
installed profile
≠ applicable/active profile
```

A profile becomes relevant when the current Work Concern needs specialized semantics/components inside that profile's declared scope. Profile relevance does not itself create a Target or select every profile registry/component. Incremental profile bootstrap is needed only when that profile context is not already reliable.

If no installed profile is materially relevant, remain in generic IDTSPE Core. For the current installation:

- software/Application behavior, implementation ownership, realization or software-specific evaluation pressure makes SDS plausibly relevant;
- a bounded 2D visual outcome/material/design/construction/adaptation concern makes 2D Visual Production plausibly relevant;
- reusable reference-subject ownership, Bank/Vocabulary work or corpus/Landscape research makes Reference Knowledge plausibly relevant.

Profile applicability is independent: several profiles may be relevant to one broader concern without one profile becoming semantic owner of another.

## Rule

```text
IDTSPE Core
≠ profile

profile
= an installed specialization built on IDTSPE Core
```

Internal Target/Lens counts and workflow details are owned by the profile's own registries and README, not duplicated here.
