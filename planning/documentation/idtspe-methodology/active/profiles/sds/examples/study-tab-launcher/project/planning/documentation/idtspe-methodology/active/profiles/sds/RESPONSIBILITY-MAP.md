# SDS Responsibility Map

Status: active routing projection

> Semantic Owner Dependency
> Type: `REPRESENTS`
> Responsibility: `DOC.RESPONSIBILITY-MAP`
> Owner: [Responsibility Map](../../../../../../../source-context/planning/documentation/principles-and-terminology.md#doc-responsibility-map)

This map routes SDS profile responsibilities only. It does not duplicate concrete Target Module/Lens contracts or generic IDTSPE Core semantics.

| Responsibility | Canonical owner | Boundary / notes |
|---|---|---|
| SDS profile scope, bootstrap read set and profile boundary | [`README.md`](README.md#sds-profile-bootstrap) — `SDS.PROFILE-BOOTSTRAP` | Bootstrap/navigation only; does not create an SDS runtime Use Case or Target |
| SDS component-directory routing after a methodology Use Case selects SDS context | [`registries/METHODOLOGY-REGISTRY-DIRECTORY.md`](registries/METHODOLOGY-REGISTRY-DIRECTORY.md#sds-methodology-discovery) — `SDS.METHODOLOGY-DISCOVERY` | Routes to specialized registries/contracts; does not own their bodies |
| SDS Target Module discovery/catalog | [`registries/TARGET-MODULE-REGISTRY.md`](registries/TARGET-MODULE-REGISTRY.md#sds-target-module-discovery) — `SDS.TARGET-MODULE-DISCOVERY` | Registry metadata only; selected concrete `TM-*` file owns the specialized recurring Target/result contract |
| SDS Lens discovery/catalog | [`registries/LENS-REGISTRY.md`](registries/LENS-REGISTRY.md#sds-lens-discovery) — `SDS.LENS-DISCOVERY` | Registry metadata only; selected concrete `LENS-*` file owns the evaluation contract |
| Cross-owner SDS temporal/semantic composition and readiness guidance | [`profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md`](profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md#sds-semantic-composition-readiness) — `SDS.SEMANTIC-COMPOSITION-READINESS` | Does not own runtime Use-Case selection or individual Target Module semantics |
| Durable Requirement natural-owner/temporal-hosting rule | [`profile-contracts/requirements/REQUIREMENT-OWNERSHIP-AND-NATURAL-OWNER.md`](profile-contracts/requirements/REQUIREMENT-OWNERSHIP-AND-NATURAL-OWNER.md#sds-requirement-ownership) — `SDS.REQUIREMENT-OWNERSHIP` | Requirement family/type representation does not transfer semantic ownership |
| Requirement classification and common representation contract | [`profile-contracts/requirements/REQUIREMENT-CLASSIFICATION-AND-REPRESENTATION.md`](profile-contracts/requirements/REQUIREMENT-CLASSIFICATION-AND-REPRESENTATION.md#sds-requirement-classification-representation) — `SDS.REQUIREMENT-CLASSIFICATION-REPRESENTATION` | Classification/shape only; natural owner remains `SDS.REQUIREMENT-OWNERSHIP` |
| Expected Error ↔ Requirement ownership relation | [`profile-contracts/requirements/EXPECTED-ERROR-AND-REQUIREMENT-OWNERSHIP.md`](profile-contracts/requirements/EXPECTED-ERROR-AND-REQUIREMENT-OWNERSHIP.md#sds-expected-error-requirement-ownership) — `SDS.EXPECTED-ERROR-REQUIREMENT-OWNERSHIP` | Narrow extension of Requirement ownership; not a new Requirement family |
| Reusable SDS guidance model / inheritance boundary | [`profile-contracts/reusable-guidance/REUSABLE-GUIDANCE-MODEL.md`](profile-contracts/reusable-guidance/REUSABLE-GUIDANCE-MODEL.md#sds-reusable-guidance-model) — `SDS.REUSABLE-GUIDANCE-MODEL` | Reusable Knowledge Basis guidance; does not become live owner Requirements automatically |
| Semantic-family authority vs local discovery/provenance | [`profile-contracts/semantic-families/SEMANTIC-FAMILY-AUTHORITY-AND-PROVENANCE.md`](profile-contracts/semantic-families/SEMANTIC-FAMILY-AUTHORITY-AND-PROVENANCE.md#sds-semantic-family-authority-provenance) — `SDS.SEMANTIC-FAMILY-AUTHORITY-PROVENANCE` | Separates family/natural-owner authority from how local meaning was discovered |
| Current-owner reverse Evolution Impact projection | [`profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md`](profile-contracts/evolution/CURRENT-OWNER-EVOLUTION-IMPACT-PROJECTION.md#sds-current-owner-evolution-impact) — `SDS.CURRENT-OWNER-EVOLUTION-IMPACT` | Projection/revalidation contract; future target-state authority remains `TM-EVOLUTION-STEP` |
| SDS Programming Principles reusable Knowledge Basis | [`knowledge-bases/programming-principles/README.md`](knowledge-bases/programming-principles/README.md#sds-programming-principles) — `SDS.PROGRAMMING-PRINCIPLES` | Reusable theory package, not a mega-Lens or current project truth |
| Application Benefit-local Responsibility Boundary / Constraints and precise downstream Benefit-clause reference | [`target-modules/TM-APPLICATION-DEFINITION.md`](target-modules/TM-APPLICATION-DEFINITION.md#sds-application-benefit-boundary-constraints) — `SDS.APPLICATION-BENEFIT-BOUNDARY-CONSTRAINTS` | `AB-*` remains the owner; optional `BC-*` labels only make owned boundary/constraint clauses more precise to reference |
| SDS profile-specific artifact placement/representation | [`representation/ARTIFACT-PLACEMENT-MAP.md`](representation/ARTIFACT-PLACEMENT-MAP.md#sds-artifact-placement) — `SDS.ARTIFACT-PLACEMENT` | Extends Core representation placement; physical placement does not create semantic authority |
| Concrete SDS recurring Target/result family | selected `target-modules/TM-*.md`, identified by its `Module ID` | Each concrete module `EXTENDS TARGET-MODULE.META-MODEL`; registry owns discovery only |
| Concrete SDS evaluation perspective | selected `lenses/**/LENS-*.md`, identified by its `Lens ID` | Each concrete Lens `EXTENDS LENS.META-MODEL`; Finding disposition stays Core-owned |
| SDS-specific command-surface / compatibility extension | [`commands/SDS-COMMAND-SURFACE-EXTENSION.md`](commands/SDS-COMMAND-SURFACE-EXTENSION.md#sds-command-surface) — `SDS.COMMAND-SURFACE` | Extends Core command surface only; direct repository command files/Helper remain projections |

Examples and Target-Module support files are contextual/supporting projections of the owners above.

SDS traversal presentation/orientation is owned by [`SDS.SEMANTIC-TRAVERSAL-ORDER`](profile-contracts/SDS-SEMANTIC-COMPOSITION-AND-READINESS.md#sds-semantic-traversal-order); the [Shared commodity no-owner gate](target-modules/TM-SHARED-IMPLEMENTATION-CAPABILITY.md#sds-commodity-shared-no-owner) leaves owner-local Slice requirements with their Slices. These are routing notes, not second contracts.
