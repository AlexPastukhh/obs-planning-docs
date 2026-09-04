# DOC-UC-05 — Maintain evolution-aware implementation architecture

### Goal

Use materially known Scenario evolution to shape Domain/Slice/shared implementation requirements now so future Evolution Steps can preferably be realized through Expansion, composition, stable ports/boundaries and behavior-preserving Refactoring rather than avoidable Forced Migration, without implementing speculative future behavior prematurely.

### Process

For the capability being designed or evolved:

1. Read current Scenario Process/FI/BI, relevant selected Screen meaning and material Scenario Realization Dependencies.
2. Read canonical relevant Evolution Steps from Scenario owners and their planning relationships from the Evolution Steps Map.
3. Treat `POSSIBLE` steps only as non-binding architecture pressure when they materially touch the same boundary; they do not license speculative implementation.
4. Derive `Evolution Impact` for each affected Domain/Slice/Screen/Shared Implementation Capability using [Template — Evolution Impact](../documentation-templates/evolution.md#template-evolution-impact): what future Expansion/Refactoring/Forced Migration would occur in that owner if/when the step is realized.
5. Prefer an impact shape based on Expansion, composition, ports/adapters and stable boundaries. Refactoring may be planned when it preserves behavior and improves readability/cohesion/testability/evolution quality.
6. Treat Forced Migration as a warning that existing logic/authority/representation must be moved because the current structure cannot accept the evolution additively.
7. Ask whether a reasonable current boundary, port, identity/ownership rule, composition seam or shared capability can remove that avoidable future Forced Migration.
8. Express those durable current constraints as the natural owner's `DI-*`, `SI-*` or Shared Implementation Item. **Do not repeat Requirement/Reason inside Evolution Impact.**
9. Design/assess current implementation against both current selected meaning and these applicable Implementation Items. An implementation that satisfies today's BI but knowingly violates an evolution-enabling SI/DI and creates avoidable Forced Migration is not the preferred realization.
10. Do not implement the future behavior/capability itself before its Evolution Step is selected for realization merely because its impact influenced today's architecture.
11. Keep `domain-evolution.md` only for one materially shared Domain semantic transition across owners; keep `slices.md` for Slice portfolio/composition strategy rather than turning either into a roadmap.
12. When implementation later begins, expected Impact should mostly be additive Expansion plus useful Refactoring. Unexpected Forced Migration is a planning/realization finding: re-check whether Impact analysis was incomplete, a known Implementation Item was violated, or genuinely new constraints appeared.
13. If implementation investigation invalidates a material Scenario Realization Dependency or shows a substantially better runtime interaction algorithm, feed that finding back to Scenario design. Prefer local refinement, but revise affected FI composition/process when the evidence requires it.
14. Record exact mechanics in source, not normative architecture documentation.

### Principles

- Evolution Step = WHAT application behavior changes.
- Evolution Impact = WHAT future delta happens in a lower owner.
- Implementation Item = HOW the current owner must be shaped for current correctness/quality and materially known evolution.
- Evolution Steps Map = WHEN / likelihood / dependency / readiness planning.
- Design for additive evolution; do not design speculative future systems.
- Future Refactoring is normal when behavior-preserving and useful. Forced Migration is the exceptional pressure to minimize.

The maintained trace is:

```text
Scenario Evolution Step
→ lower-owner Evolution Impact analysis
→ current DI / SI / Shared Implementation Items where pressure is durable
→ current implementation constrained by those items
→ later Expansion / Refactoring / exceptional Forced Migration
```

---
