# Active Methodology Mechanical Consistency Check

Status: **HISTORICAL post-Pass4 command-composition / Helper closeout snapshot; mechanical facts only — superseded for current assembled-methodology evidence by `../audits/POST-PASS12-CONSISTENCY-AUDIT.md`**

This snapshot was revalidated against the Core plus all three installed profile registries at the corrected PASS-4 command-composition / Helper closeout point. The corrected closeout adds registered semantic command includes, ambient every-work-entry Use-Case registry recheck, mandatory normal-Shell port-composition refresh, P-02 working-trace orientation and the `IDTSPE Pass` Helper projection without making Helper UI semantic authority. Broad lower-contract Unit Collection / Slot migration remains intentionally deferred and is not claimed here.

This file reports observed registry/projection parity. Semantic authority remains in the owning registries/contracts.

```text
current registries
→ resolve their declared owner files
→ expose unique semantic IDs
→ keep retired compatibility stubs out of active registries

current methodology Use-Case registries
→ resolve current Use-Case owners

current Planning Command catalog
→ parses all direct command definitions
→ resolves path-addressed includes
→ remains acyclic

Planning Helper generated projections
→ are regenerated from current owners
→ pass build/test parity
```

Checks:

- Core Target Module registry/file parity: **PASS**
- SDS **active registry rows** resolve to active Target Module files: **PASS**
- retired SDS Target compatibility files are absent from the active registry: **PASS**
- Core Lens registry/file parity: **PASS**
- SDS Lens registry/file parity: **PASS**
- 2D Visual Target Module registry/file parity: **PASS**
- 2D Visual Lens registry/file parity: **PASS**
- Reference Knowledge Target Module registry/file parity: **PASS**
- Reference Knowledge Lens registry/file parity: **PASS**
- Reference Knowledge Domain Pack registry: **0 installed concrete packs / PASS**
- Methodology Use-Case Registry Map projects only current Documentation/IDTSPE runtime UCs and every projected route resolves: **PASS**
- SDS runtime methodology-use UC count: **0 PASS**
- current Planning Helper command definitions parse and generated projections are verified by the palette test suite: **PASS**
- numbered SDS workflow files remain retired; one semantic composition/readiness guide remains: **PASS**
- Full/Instance/Physical SDS maps remain retired; README/registry/workflow/placement responsibilities stay separated: **PASS**
- Target Work Unit contract-boundary rule: genuine repeated result-contract families remain inside one Unit result and do not multiply peer Units by count; ordinary list-valued/nested repeated fields remain ordinary content: **PASS**
- explicit Collection contract rule: canonical Core model supports `0..N` named Collection Definitions per Unit, each with one Item Contract; new/materially revised genuine repeated result-contract families are explicit even when only one Collection exists, while ordinary list-valued/nested repeated fields do not become Collections merely because they repeat: **PASS**
- multiple-Collection rule: one Unit may declare several Collections with different Item Contracts; Collection count does not create Units: **PASS**
- Unit Resolution Slot contract-role rule: fields/questions/Collections/collection items do not create Slots by count; Slot Definitions represent terminal formal roles only: **PASS**
- Slot ownership rule: `UNIT_WIDE` Slot Definitions belong directly to the Unit Result Content Contract; `PER_ITEM` Slot Definitions belong to exactly one declared Collection: **PASS**
- Slot-definition/runtime-set separation: prepared/contextual Slot Definitions are contract-owned; one concrete Unit Resolution Set is only the runtime projection of applicable Slot Definitions for a substantive composite Unit, with UNIT_WIDE roles projected once and PER_ITEM roles projected only for existing items of their owning Collections: **PASS**
- Collection-without-Slots rule: a Collection Item Contract may contain ordinary content with zero PER_ITEM Slots; Collections do not imply composite resolution: **PASS**
- PER_ITEM runtime rule: one PER_ITEM Slot Definition may govern the same role across multiple items of its owning Collection while item-local disposition/state/content varies independently: **PASS**
- Target Work subject-reference ownership rule: canonical Unit / Collection / item / Slot reference composition has one owner in [`TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md`](../../idtspe-core/runtime/target-work/TARGET-WORK-SUBJECT-REFERENCE-CONTRACT.md#target-work-subject-reference); contextual consumers route to that owner rather than defining competing address grammars, and no Collection/Item/Slot Instance ontology is introduced: **PASS**
- Collection/Slot identifier uniqueness rule: Collection ID is unique within its parent Unit Result Content Contract and stable/recoverable while referenced; UNIT_WIDE Slot ID is unique among Unit-wide Slots of that Unit; PER_ITEM Slot ID is unique within its owning Collection: **PASS**
- result-content/runtime-separation template rule: Collection ordinary item content is represented under Current Result Content independently of PER_ITEM Slot runtime resolution; runtime Slot sections appear only for substantive composite Units with the corresponding formal Slot roles: **PASS**
- Source/Core-State routing rule: Source / Q/R/P / Proposal / Finding / Lens / Evidence / integration / revalidation consumers preserve the smallest selected Target Work subject through `TWU.SUBJECT-REFERENCE` and carry tracked contextual dependencies where they restate its consequence: **PASS**
- terminal Slot rule: no child Unit Resolution Slots / nested Unit Resolution Sets: **PASS**
- Slot lifecycle combinations match Applicability / Materiality / Disposition invariants; OMITTED carries no active substantive Resolution State/Current Resolution Content: **PASS**
- empty Collection / omission distinction: a substantive Unit may validly resolve a declared 0..N Collection to zero items when its contract permits it; Unit OMITTED means the Unit responsibility itself is not applicable/material unless a stricter Unit-specific contract explicitly says otherwise: **PASS**
- table-inference guard: Collection/repetition/Slot/exact-item-schema semantics do not imply TABLE; use/mark TABLE only under an explicit governing table requirement, otherwise preserve non-table representation: **PASS**
- Target Work Responsibility Map routing check: audited Unit / Collection / Slot / runtime projection / applicability / Generic Resolution Slot boundary / Target Formation / Target Instance-source relation / Candidate Target / subject-reference responsibilities route to their exact canonical owner anchors without copying semantic bodies: **PASS**
- Target Module ownership-boundary check: Core Registry owns discovery/routing only; Target Module Meta-Model owns reusable module-family semantics; the historical Step-Result/Question-Set file is a supporting contextual projection rather than a competing owner: **PASS**
- audited stable-anchor migration check: reviewed Target Work/Target Module owner sections with real section-level consumers use explicit stable anchors, and the reviewed old generated-heading fragment references were migrated: **PASS**
- Resolution Responsibility Map routing check: Need Candidate Collection / Need Candidate Disposition / Finding Disposition / Q/R/P / Proposal-Decision / Decision Revalidation projection / Planning Branch / Branch Comparison / Carry-Forward route to one canonical owner anchor each; parent methodology/Core maps route through the child map rather than duplicating those lifecycle rows: **PASS**
- Resolution owner-anchor check: audited Core resolution owner sections use explicit stable anchors; all reviewed fragment references into those audited sections resolve, including the existing `#resolution-escalation` scenario references: **PASS**
- Resolution consumer-dependency check: Proposal/Decision Resolution Context Lens, USER intake, Compose/Revalidate/Integrate/Maintain-State UCs, AI Reviewability and Scenario Map declare tracked dependencies where they contextualize/represent audited resolution-owner semantics: **PASS**
- Lens Responsibility Map routing check: `LENS.META-MODEL` and `LENS.DISCOVERY` route to distinct explicit owner anchors; all registered concrete generic Core Lens files retain a unique `Lens ID`, and parent methodology/Core maps route through the child Lens map rather than duplicating Meta-Model/Registry ownership: **PASS**
- Knowledge/Source/Evidence boundary check: `KNOWLEDGE.BASIS`, `KNOWLEDGE.PRACTICAL-EVIDENCE`, `KNOWLEDGE.TESTING` and `KNOWLEDGE.UBIQUITOUS-LANGUAGE` have distinct canonical owners; Source State remains routed to `TARGET.INSTANCE-SOURCE-RELATION`, while generic `Evidence / Evidence Need` stays in the existing Core State boundary rather than acquiring a second Knowledge owner: **PASS**
- Representation/Persistence responsibility check: artifact placement/P-14 response semantics, Broad Discussion/Integration Checkpoint projection, deep artifact-boundary/file-realization method and Target Evolution companion guidance route to distinct `REPRESENTATION.*` owners; Lens/Target-Module representation handshakes are explicit extensions rather than competing Meta-Model definitions: **PASS**
- Lens/Knowledge/Representation stable-anchor check: all audited owner anchors have inbound references, reviewed fragment links into these Core zones resolve to explicit anchors, and no generated-heading fragment migration was required because no pre-existing cross-file fragment targets existed in the audited zones: **PASS**
- Pass-1 profile-boundary check: profile-specific Lens, Knowledge and representation semantics remain semantically unaudited; this Core closeout changes no profile semantic owner and does not claim profile conformance: **PASS**
- Runtime/Core-State Responsibility Map routing check: Work Context/Shell composition, port refresh, Pass Trace, contextual application/recheck, default work mode, Core State Unit, Methodology Usage State and USER intake route to distinct canonical responsibilities; co-located Core State sections are explicitly outside Target Work ownership: **PASS**
- Core State / orchestration owner-uniqueness check: `CORE.STATE-UNIT`, `CORE.METHODOLOGY-USAGE-STATE`, `IDTSPE.RUNTIME-COMPOSITION`, `IDTSPE.PASS-TRACE`, `IDTSPE.CONTEXTUAL-APPLICATION`, `IDTSPE.DEFAULT-WORK-MODE`, `IDTSPE.USER-INPUT-INTAKE` and all current `IDTSPE.UC.*` responsibilities have one declaration each: **PASS**
- IDTSPE Use-Case orchestration map check: Use-Case Registry owns discovery/routing metadata only; Compose/Maintain-State/Integrate/Revalidate/Maintain-Target-Module/Maintain-Lens each own functional orchestration only and do not absorb the semantic contracts they invoke: **PASS**
- Pass-2 stable-anchor check: all new runtime/state/use-case owner anchors are addressed by their child Responsibility Maps or direct consumers, and reviewed fragment links into these audited owners resolve to explicit anchors: **PASS**
- Pass-2 profile boundary check: generic Core runtime/orchestration is closed without claiming profile-specific orchestration semantics or Helper/command implementation ownership: **PASS**
- Installed-profile responsibility routing check: `IDTSPE.PROFILE-DISCOVERY` routes installed-profile applicability/bootstrap entry and `profiles/RESPONSIBILITY-MAP.md` routes SDS / 2D Visual / Reference Knowledge child maps without copying profile semantic bodies: **PASS**
- SDS profile ownership check: bootstrap/methodology discovery/Target Module discovery/Lens discovery/readiness/Requirement/guidance/knowledge/representation responsibilities route through `profiles/sds/RESPONSIBILITY-MAP.md`; all registered concrete SDS Target Modules expose unique `Module ID` and all registered SDS Lenses expose unique `Lens ID`, with explicit Core Meta-Model inheritance: **PASS**
- 2D Visual profile ownership check: invariants, Unit checkpoints, visual Source/material preparation, construction support and representation responsibilities route through `profiles/visual-production-2d/RESPONSIBILITY-MAP.md`; all registered concrete Target Modules expose unique `Module ID` and all registered Lenses expose unique `Lens ID`: **PASS**
- Reference Knowledge ownership check: Bank/Object/Vocabulary/change-authority/Domain-Pack/Landscape/consumer-Source/representation responsibilities route through `profiles/reference-knowledge/RESPONSIBILITY-MAP.md`; all registered Target Modules and Lenses expose unique IDs: **PASS**
- Pass-3 Core-boundary check: profile Target Modules/Lenses explicitly extend the Core Meta-Models; profile representation extends Core artifact placement; visual/reference consumer Source semantics contextualize `TARGET.INSTANCE-SOURCE-RELATION` rather than creating second Core Source authority: **PASS**
- Pass-3 stable-anchor/link check: profile-level Responsibility owners are routed through explicit stable anchors; reviewed profile fragment links resolve to explicit anchors; examples/templates remain supporting/non-owner projections: **PASS**
- Pass-3 command boundary preservation check: SDS/profile command-surface and Helper composition ownership were intentionally deferred by Pass 3 and are now closed by the dedicated Pass-4 command/helper audit rather than retroactively absorbed into profile semantic ownership: **PASS**
- Command/Helper Responsibility Map check: root routing, direct command-definition contract, command-maintenance Use Case, Core IDTSPE command surface, SDS command extension, Helper semantic projection and legacy Helper-library compatibility route through [`planning/commands/RESPONSIBILITY-MAP.md`](../../../../../commands/RESPONSIBILITY-MAP.md) to distinct owners: **PASS**
- command-composition ownership check: `methodologyBinding` remains projection/dispatch metadata and `ownerFiles` remain read/owner routes; registered `includes` form a semantic command-prefix graph, while technical port topology is still derived/refreshed through `IDTSPE.PORT-COMPOSITION-REFRESH`; no parallel durable numeric `requiredPorts` / `portRequirements` ontology exists: **PASS**
- strict command-catalog check: all direct `planning/commands/*.command.md` definitions parse under the current schema; command owner references resolve; command IDs are unique; registered path-addressed `includes` resolve in the complete repository catalog and are acyclic; unsupported durable numeric `requiredPorts` / `portRequirements` and file-execution `includeFiles` fields are absent: **PASS**
- Planning Helper generated-projection check: final `npm run build` succeeds; generated catalogs expose the current methodology Use Cases, Target Modules, Lenses and canonical Scenarios; normal Helper navigation/catalog ordering covers every current card exactly once: **PASS**
- Planning Helper regression suite: final `npm test` passes, including command-include graph, mandatory UC recheck and fundamental AI Working Boundary, P-02 working-trace orientation, methodology-navigation, semantic-parity, command/scenario reverse projection and Unit-checkpoint contracts: **PASS**
- final scoped responsibility/dependency check: across the active methodology plus direct Documentation / Session / Planning Command / Helper projections, Responsibility IDs are unique and tracked Semantic Owner Dependency responsibility targets resolve: **PASS**
- final scoped link/fragment check: current active-methodology plus direct Documentation / Session / Planning Command / Helper projections pass the scoped local-path/fragment checks with no known missing local paths, bad fragments or generated-heading cross-file fragment dependencies in the audited surface: **PASS**
- fenced-example link-hygiene check: path-like placeholders in Markdown examples are not encoded as repository links; the Methodology binding example uses explicit non-link placeholder notation instead of the nonexistent `../../shared` path: **PASS**
- final explicit-anchor check: reviewed explicit stable anchors have valid inbound routing where required; compatibility/addressability anchors are retained only where they serve a real current route: **PASS**
- legacy profile migration status: broad SDS/other-profile lower-contract migration to explicit Collections/Slots is intentionally **DEFERRED / NOT CLAIMED**; migration constraints and discovered candidates are recorded in [`TARGET-WORK-UNIT-COLLECTION-SLOT-MIGRATION-NOTES.md`](../migration-notes/TARGET-WORK-UNIT-COLLECTION-SLOT-MIGRATION-NOTES.md)


## Anti-Drift Rule

Do not copy these counts into semantic contracts unless the number itself has methodological meaning.

Prefer:

```text
current registry rows
→ resolve owner files
→ verify required contract sections
```

over:

```text
hard-coded N / N
```

because active module/Lens counts may legitimately change while the contract remains the same.
