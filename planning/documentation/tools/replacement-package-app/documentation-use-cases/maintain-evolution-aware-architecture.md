# DOC-UC-05 — Maintain evolution-aware implementation architecture

### Goal

Use materially known Scenario evolution to shape Domain/Slice/shared implementation requirements now so the **known evolution chain** can preferably be realized through Expansion, composition, stable boundaries and behavior-preserving Refactoring rather than avoidable Forced Migration, without making today's realization needlessly complex or implementing speculative future behavior.

### Process

For the capability being designed or evolved:

1. Read current Scenario Process/FI/BI, relevant selected Screen meaning and material Scenario Realization Dependencies.
2. Read canonical relevant Evolution Steps from Scenario owners and their planning relationships from the Evolution Steps Map. Treat `POSSIBLE` steps only as non-binding pressure when they materially touch the same boundary.
3. Derive `Evolution Impact` for each affected Domain/Slice/Screen/Shared Implementation Capability using [Template — Evolution Impact](../documentation-templates/evolution.md#template-evolution-impact): what future Expansion/Refactoring/Forced Migration would occur if/when the step is realized.
4. Apply [I4 — Known evolution-chain fitness](requirements-discovery/implementation/common.md#i4-known-evolution-chain-fitness) to the materially known chain (`Current → EVO-1 → EVO-2 → ...`), not only the nearest step. At each known state ask whether the realization remains correct, technically adequate, maintainable and a good basis for the remaining known evolution.
5. Apply [I5 — Current simplicity versus future preparation](requirements-discovery/implementation/common.md#i5-current-simplicity-versus-future-preparation). Prefer low-cost seams/ports/boundaries whose current cost is justified; do not introduce speculative indirection that makes current code harder to reason about merely for hypothetical flexibility.
6. Prefer future impact shapes based on Expansion, composition, ports/adapters and stable boundaries. Refactoring may be planned when behavior-preserving and useful. Treat Forced Migration as a warning that current structure cannot accept known evolution reasonably.
7. Ask whether a reasonable current boundary, port, identity/ownership rule, composition seam, stable result/command or shared capability can remove avoidable Forced Migration. Inspect relevant [Pattern Registry](patterns/REGISTRY.md) candidates without treating patterns as mandatory architecture.
8. Every material selected production answer becomes the natural owner's `DI-*`, `SI-*` or shared Implementation Item. If the analysis exposes an additional proof requirement, create the corresponding Test Item too. Group coupled Items when they belong to one decision.
9. **Do not repeat Requirement/Reason inside Evolution Impact.** Impact remains future delta; Items are current durable realization requirements.
10. Design/assess current implementation against current selected meaning and applicable Implementation Items. An implementation that satisfies today's BI but knowingly violates a selected evolution-enabling Item and creates avoidable Forced Migration is not the preferred realization.
11. Do not implement future behavior/capability itself before its Evolution Step is selected for realization merely because its impact influenced today's architecture.
12. Use [I6 — Probable natural extension and application boundaries](requirements-discovery/implementation/common.md#i6-probable-natural-extension-and-application-boundaries) only as a lightweight pressure check. Do not deeply design beyond explicit application boundaries without a trigger.
13. When implementation later begins, expected Impact should mostly be additive Expansion plus useful Refactoring. Unexpected Forced Migration is a planning/realization finding: re-check incomplete discovery, violated Items or genuinely new constraints.
14. If implementation/proof investigation invalidates a material Scenario Realization Dependency or shows a substantially better runtime interaction algorithm, feed that finding back to Scenario design.
15. Record exact mechanics in source, not normative architecture documentation.

### Principles

- Evolution Step = WHAT application behavior changes.
- Evolution Impact = WHAT future delta happens in a lower owner.
- Implementation Item = durable concrete HOW requirement on the current implementation owner.
- Requirements Discovery = reusable questions for deriving concrete Items; Pattern Registry = reusable candidate answers.
- Known evolution is checked as a chain, not one isolated next step.
- Evolution preparation must not unnecessarily degrade current simplicity/maintainability.
- Future Refactoring is normal when behavior-preserving and useful. Forced Migration is the exceptional pressure to minimize.

The maintained trace is:

```text
Scenario Evolution Steps + planning relationships
→ lower-owner Evolution Impact analysis
→ Implementation Requirements Discovery
↔ Proof Requirements Discovery where relevant
→ current DI / SI / Shared Implementation Items + Test Items
→ coupled Item Groups where one decision spans them
→ current implementation/proof constrained by those Items
→ later Expansion / Refactoring / exceptional Forced Migration
```

---
