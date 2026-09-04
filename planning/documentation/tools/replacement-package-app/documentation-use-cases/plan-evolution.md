# DOC-UC-08 — Plan Evolution Steps and material impact timing

### Goal

Make evolution sequence, dependencies, rough timing/likelihood and readiness understandable without encoding roadmap position into semantic identity or duplicating behavioral/local-impact definitions.

### Process

1. Read canonical Scenario-owned Evolution Steps. Step `Intent` (`URGENT`/`PLANNED`/`POSSIBLE`) may remain on the step; use the map for relational planning rather than redefining intent.
2. Maintain [`evolution-steps-map.md`](../evolution-steps-map.md) using [Template — Evolution Steps Map entry](../documentation-templates/evolution.md#template-evolution-steps-map-entry), with only planning information that matters:
   - prerequisites/dependencies;
   - intended relative order and rough horizon;
   - rough likelihood/planning confidence when useful;
   - what the step enables;
   - parallelism;
   - conditions/gates;
   - implementation readiness when useful;
   - planned future Scenario target.
3. Link to canonical Scenario-owned steps for WHAT behavior changes.
4. When one lower-owner `Evolution Impact` item has materially different timing/likelihood/dependency from its parent step, the map may reference that impact explicitly. Keep WHAT that impact changes in the lower owner.
5. Reorder/replan freely without changing semantic IDs/names.
6. Completed nodes need not remain active merely for history when current owners communicate resulting truth.

### Principles

- Map = WHEN / HOW LIKELY / DEPENDS ON / READY, not WHAT behavior or implementation changes.
- Evolution Step identity and lower-owner impact meaning remain outside the map.
- Sequence may be linear, branching, conditional or parallel.
- Do not turn the map into detailed implementation scheduling or a duplicate architecture backlog.

### Owners used by this process

- Scenario owners as canonical Evolution Step authority;
- lower owners as canonical Evolution Impact authority;
- `evolution-steps-map.md` as the dedicated planning map.

---
