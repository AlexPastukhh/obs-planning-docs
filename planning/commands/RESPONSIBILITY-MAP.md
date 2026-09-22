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
| Planning Helper semantic-command/scenario projection/runtime | [`../documentation/tools/tampermonkey/chat-command-palette/README.md`](../documentation/tools/tampermonkey/chat-command-palette/README.md#planning-helper-semantic-projection) — `HELPER.SEMANTIC-PROJECTION` | Projects current Commands/UCs/TMs/Lenses/Scenarios; generated seeds/UI/grouping never become semantic authority |
| Prompt and legacy helper-command record format/compatibility | [`../helper-library/README.md`](../helper-library/README.md#planning-helper-library-contract) — `HELPER.LIBRARY-COMPATIBILITY` | Legacy insertion/prompt storage only; never registers a Planning Command |

## Command Composition Invariant

```text
explicit command / semantic card roots
→ COMMAND.ROOT-ROUTING resolves registered roots
→ fully expand ALL transitive `includes` before semantic execution
→ merge one DAG; reject cycles/unresolved command paths; deduplicate shared nodes
→ collect declarative intent/capability/component/trace/permission contributions from every node
→ establish one dependencies-first execution plan
→ establish/reuse the one P-02 working trace
→ `planning/commands/recheck-methodology-use-cases.command.md` / DOC.USE-CASE-APPLICABILITY-RESOLUTION always reaffirms UC-IDTSPE-AI-WORKING-BOUNDARY and rechecks the registry applicability surface
→ current selected Use-Case composition
→ when normal IDTSPE work is involved, IDTSPE.PORT-COMPOSITION-REFRESH sees all collected explicit requirements and refreshes/reaffirms the technical Port Requirement Set
→ dependencies execute before dependents; each selected root action executes last on its branch
→ one Shell pass executes the resulting current composition
→ Planning Helper only projects/invokes the same registered composition/semantic route
```

`methodologyBinding` is semantic projection/dispatch metadata, not an embedded copy of Use-Case, Target Module, Lens or Shell-port semantics. Planning Commands are USER↔AI invocation/traversal guarantees; the AI does not use the command graph as an internal methodology language. No reusable semantic rule may be command-only. `ownerFiles` are canonical read routes; structured `ownerRefs` may point to exact Responsibility/anchor purpose added by the command and MUST NOT repeat references inherited through includes. `includes` is a declarative dependency graph whose edges are canonical repository paths to registered direct command definitions and exists to guarantee the same canonical route an informed AI agent could follow directly from methodology owners/hand-offs.

Command composition MUST NOT encode a parallel numeric-port topology: no durable `requiredPorts`, `portRequirements` or file-execution lists. Named `idtspe.port.*` commands contribute explicit named capability requirements during the **pre-execution composition stage**; the runtime composition owner resolves those requirements against the current Shell topology. The command node's later runtime action performs/checks the capability; it does not reveal the requirement for the first time.
