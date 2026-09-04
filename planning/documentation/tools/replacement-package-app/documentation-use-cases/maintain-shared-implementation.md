# DOC-UC-04 — Maintain Shared Implementation Capability when shared responsibility is real

### Goal

Keep one real reusable implementation responsibility coherent across several Slices when independent shared ownership materially improves composition/reuse, without creating owners for generic principles or similar-looking helper code.

### Process

1. Use `slices.md` as the Slice portfolio/implementation strategy view and detect repeated responsibility/composition pressure across Slices.
2. Inspect Scenario Realization Dependencies routed to Shared Implementation. Treat candidate shared mechanisms as questions until real reusable responsibility/contract/consumers are selected.
3. Ask whether there is one semantic reusable implementation responsibility with a meaningful contract/consumer relationship, not merely a slogan such as DRY/logging or common helper shape.
4. If no independent shared responsibility exists, keep the requirement/mechanics local to consuming owners.
5. If it does exist, create/maintain a Shared Implementation Capability using [Template — Shared Implementation Capability owner](../documentation-templates/slice-and-shared.md#template-shared-implementation-capability-owner): responsibility, consumers, Domain used, optional durable Implementation Items, local Tests/Test Items and `Evolution Impact` when relevant.
6. Shared Implementation Items may be justified by current correctness/quality or materially known evolution that should add consumers/implementations through stable composition rather than Forced Migration.
7. Have consuming Slices reference the shared owner instead of duplicating its durable contract/rules.
8. Feed resolved feasibility findings back to the Scenario dependency when they materially affect Scenario credibility or runtime composition; keep selected shared HOW authoritative here, not duplicated in Scenario.
9. Keep exact code/test mechanics in source or derived traces.

### Principles

- Reuse/cross-cutting is discovered from real responsibility, not from repeated names or generic engineering principles.
- `Cross-cutting` may describe a Shared Implementation Capability but is not a second owner type.
- `slices.md` owns portfolio/composition strategy; Shared Implementation Capability owns the actual reusable implementation responsibility.
- Shared owners do not own Evolution Steps; they own their local Evolution Impact.

---
