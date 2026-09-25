# Planning Command / Helper Responsibility Map

Status: active routing projection

> Semantic Owner Dependency
> Type: `REPRESENTS`
> Responsibility: `DOC.RESPONSIBILITY-MAP`
> Owner: [Responsibility Map](../documentation/principles-and-terminology.md#doc-responsibility-map)

This map routes the repository command system, IDTSPE command surfaces and Planning Helper projections. It owns routing only; linked owners retain the complete semantic/process/runtime contract.

| Responsibility | Canonical owner | Boundary / notes |
|---|---|---|
| Root executable-command resolution, shared governance preflight/read-reuse, permission and archive-source policy | [`../command-routing.md`](../command-routing.md#planning-command-routing) — `COMMAND.ROOT-ROUTING` | Global command-system policy only; semantic capability owners remain authoritative |
| Direct `planning/commands/*.command.md` definition/catalog/schema invariants and command-vs-semantic-owner boundary | [`README.md`](README.md#planning-command-definition-contract) — `COMMAND.DEFINITION-CONTRACT` | One concrete command route per file; direct definition owns trigger/output/read/permission route, not invoked algorithms |
| Maintain/create a direct Planning Command | [`../use-cases/UC-REPO-MAINTAIN-PLANNING-COMMAND.md`](../use-cases/UC-REPO-MAINTAIN-PLANNING-COMMAND.md#command-maintenance) — `COMMAND.MAINTENANCE` | Process owner for command maintenance; consumes the command-definition contract and current semantic owner route |
| Generic profile-independent IDTSPE invocation surface, semantic command-prefix composition and command→Use-Case/component→port-composition handshake | [`../documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md`](../documentation/idtspe-methodology/active/idtspe-core/commands/IDTSPE-COMMAND-SURFACE-CONTRACT.md#idtspe-command-surface) — `IDTSPE.COMMAND-SURFACE` | Command composition derives technical port needs from the selected current owner route; no second command-owned port ontology |
| SDS-specific invocation/compatibility extension | [`../documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md`](../documentation/idtspe-methodology/active/profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md#sds-command-surface) — `SDS.COMMAND-SURFACE` | Extends Core only; does not create a second runtime or bypass current Use-Case/component applicability |
| Assess documentation/methodology change impact on Helper, including new command candidates | [Check Helper Impact](../use-cases/UC-REPO-CHECK-HELPER-IMPACT.md#uc-repo-check-helper-impact) — `HELPER.CHANGE-IMPACT` | Repository assessment owner; mutation processes invoke it by explicit process links |
| Planning Helper semantic-command/scenario projection/runtime | [`../documentation/tools/tampermonkey/chat-command-palette/README.md`](../documentation/tools/tampermonkey/chat-command-palette/README.md#planning-helper-semantic-projection) — `HELPER.SEMANTIC-PROJECTION` | Projects current Commands/UCs/TMs/Lenses/Scenarios; generated seeds/UI/grouping never become semantic authority |
| Prompt and legacy helper-command record format/compatibility | [`../helper-library/README.md`](../helper-library/README.md#planning-helper-library-contract) — `HELPER.LIBRARY-COMPATIBILITY` | Legacy insertion/prompt storage only; never registers a Planning Command |


## Composition Route Note

This map does not own command composition algorithms or field invariants. Follow the routed canonical owners above:

- `COMMAND.ROOT-ROUTING` for root resolution/governance;
- `COMMAND.DEFINITION-CONTRACT` for direct command schema including `includes`, `ownerFiles`, `ownerRefs` and `methodologyBinding`;
- `IDTSPE.COMMAND-SURFACE` for generic semantic command composition and review/proposal invocation behavior;
- current Documentation Use-Case applicability resolution plus `IDTSPE.PORT-COMPOSITION-REFRESH` for runtime methodology/port composition;
- `HELPER.SEMANTIC-PROJECTION` for Helper rendering/invocation only.

Any algorithmic detail belongs to those owners and is linked from this routing projection rather than copied here.
