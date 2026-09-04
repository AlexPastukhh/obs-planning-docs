# DOC-UC-06 — Inspect current implementation without duplicating source documentation

### Goal

Make current implementation easy to inspect while keeping normative documentation stable across ordinary refactoring.

### Process

1. Treat production source and test source as authority for exact implementation/test mechanics.
2. Do not copy method/service call chains, field usage, current class wiring or test-method/fixture call structure into Scenario/Domain/Slice owners merely to make implementation easier to inspect.
3. When a Scenario Realization Dependency explicitly requires source/technical feasibility investigation, inspect only enough current mechanics/environment capability to answer that question; do not copy the resulting call graph into Scenario authority.
4. When low-level implementation understanding is needed, inspect source directly or use the [Recommended generated implementation-trace output](../documentation-templates/generated-trace.md#template-generated-implementation-trace) if tooling is available.
5. A generated trace should be disposable, derived from source and tied to its source revision. Useful generated information may include root symbol, callers/callees, fields read/written, referenced types, external boundaries and branch/result information when statically derivable with confidence.
6. Generated/source inspection may answer how current code realizes a selected Feature Interaction, BI or Slice, but it never becomes authority for Scenario behavior, UI requirements, Domain invariants or architecture intent.
7. Store generated traces at a fixed discoverable path when tooling is introduced; `generated/implementation-traces/` under this application documentation root is recommended.
8. Regenerate rather than manually edit a stale trace.

### Current boundary

No implementation-trace generator is established by this documentation model. This use case defines the boundary so future tooling can improve implementation discoverability without forcing manually maintained runtime/call-flow prose into durable owners.

---
