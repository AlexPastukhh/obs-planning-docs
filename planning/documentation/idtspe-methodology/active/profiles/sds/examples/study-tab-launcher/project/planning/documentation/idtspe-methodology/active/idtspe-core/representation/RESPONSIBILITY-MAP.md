# Representation / Persistence Responsibility Map

Status: active routing projection

> Semantic Owner Dependency
> Type: `REPRESENTS`
> Responsibility: `DOC.RESPONSIBILITY-MAP`
> Owner: [Responsibility Map](../../../../../../../source-context/planning/documentation/principles-and-terminology.md#doc-responsibility-map)

This map separates semantic ownership from physical representation/persistence. It owns routing only; linked contracts own the semantic bodies.

| Responsibility | Canonical owner | Boundary / notes |
|---|---|---|
| Generic persistence-sensitive artifact placement, representation cardinality/promotion, placement status/provenance and P-14 response interface | [`ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md`](ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md#representation-artifact-placement) — `REPRESENTATION.ARTIFACT-PLACEMENT` | Requires semantic owner first; physical placement never creates semantic authority |
| Broad Discussion / Key Points / Integration Checkpoint conversational and projection boundary, including semantic-retention vs physical-persistence separation | [`interaction/BROAD-DISCUSSION-AND-INTEGRATION-CHECKPOINT-PROJECTION.md`](interaction/BROAD-DISCUSSION-AND-INTEGRATION-CHECKPOINT-PROJECTION.md#representation-discussion-checkpoint) — `REPRESENTATION.DISCUSSION-CHECKPOINT` | Projection owner only; lifecycle/Unit/Decision owners retain semantics |
| Deep artifact-boundary discovery, file-layout realization, artifact-plan/validator method | [`methods/ARTIFACT-BOUNDARY-AND-FILE-REALIZATION.representation-method.md`](methods/ARTIFACT-BOUNDARY-AND-FILE-REALIZATION.representation-method.md#representation-artifact-boundary-method) — `REPRESENTATION.ARTIFACT-BOUNDARY-METHOD` | Conditional method used when lightweight placement is insufficient |
| Generic companion/split representation guidance for already-owned future/evolution meaning | [`TARGET-EVOLUTION-COMPANION-ARTIFACT.md`](TARGET-EVOLUTION-COMPANION-ARTIFACT.md#representation-target-evolution-companion) — `REPRESENTATION.TARGET-EVOLUTION-COMPANION` | Representation only; active profile chooses future semantic owner |
| Operational evaluation of whether artifact separation/addressability is justified | [`../lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](../lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) | Lens evaluates/surfaces Findings; it does not own placement or persistence state |
| Runtime P-14 port composition / admission | [`../runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md`](../runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md) | Runtime owns port composition; representation contract owns the placement/materialization meaning consumed through P-14 |

Profiles may add representation rules/maps, but they extend this Core boundary and do not replace semantic-owner selection.
