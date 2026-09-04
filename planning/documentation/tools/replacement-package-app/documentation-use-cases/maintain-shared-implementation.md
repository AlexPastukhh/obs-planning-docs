# DOC-UC-04 — Maintain Shared Implementation Capability when shared responsibility is real

### Goal

Keep one real reusable implementation responsibility coherent across several Slices when independent shared ownership materially improves composition/reuse, while deriving concrete shared Implementation/Test Items through Requirements Discovery rather than creating an owner for generic principles or similar-looking helper code.

### Process

1. Use `slices.md` as the Slice portfolio/implementation strategy view and detect repeated responsibility/composition pressure across Slices.
2. Inspect Scenario Realization Dependencies routed to Shared Implementation. Treat candidate shared mechanisms as questions until real reusable responsibility/contract/consumers are selected.
3. Use the [Shared Implementation Requirements Discovery questions](requirements-discovery/implementation/shared-implementation.md) to ask whether there is one semantic reusable implementation responsibility with real consumers and a meaningful contract/result, not merely a slogan such as DRY/logging or common helper shape.
4. If no independent shared responsibility exists, keep the requirement/mechanics local to consuming owners.
5. If it does exist, create/maintain a Shared Implementation Capability using [Template — Shared Implementation Capability owner](../documentation-templates/slice-and-shared.md#template-shared-implementation-capability-owner): responsibility, consumers, stable contract/result when material, Domain used, selected Implementation Items, local Tests/Test Items, optional Item Groups and `Evolution Impact`.
6. Run applicable [common Implementation Requirements Discovery](requirements-discovery/implementation/common.md) for the selected shared owner. Material selected production answers become shared Implementation Items; material proof answers become Test Items. Inspect relevant [Pattern Registry](patterns/REGISTRY.md) entries when useful.
7. Run [Proof Requirements Discovery](requirements-discovery/proof/proof.md) for local shared-capability proof. A proof answer may expose an additional production requirement and therefore a shared Implementation Item; Implementation Requirements Discovery may expose Test Items.
8. Group coupled Items using [Template — Item Group](../documentation-templates/implementation.md#template-item-group). A material change to any member makes the whole group review-relevant.
9. Check materially known evolution so new consumers/implementations can preferably be added through stable composition instead of Forced Migration; do not implement speculative future consumers/variants merely to be “future ready”.
10. Have consuming Slices reference the shared owner instead of duplicating its durable contract/rules.
11. Feed resolved feasibility findings back to the Scenario dependency when they materially affect Scenario credibility or runtime composition; keep selected shared HOW authoritative here, not duplicated in Scenario.
12. Keep exact code/test mechanics in source or derived traces.

### Principles

- Reuse/cross-cutting is discovered from real responsibility, not from repeated names or generic engineering principles.
- `Cross-cutting` may describe a Shared Implementation Capability but is not a second owner type.
- `slices.md` owns portfolio/composition strategy; Shared Implementation Capability owns the actual reusable implementation responsibility.
- A shared Implementation Item is a concrete durable realization requirement, not merely “use pattern X”.
- Proof Requirements Discovery and Implementation Requirements Discovery are bidirectionally connected; coupled Items are grouped and reviewed together.
- Shared owners do not own Evolution Steps; they own their local Evolution Impact.

---
