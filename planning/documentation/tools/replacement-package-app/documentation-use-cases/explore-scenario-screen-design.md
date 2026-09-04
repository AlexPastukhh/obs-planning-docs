# DOC-UC-07 — Explore and select Scenario and Screen design

### Goal

Start from an application Benefit / desired result, discover a coherent Scenario as a composition of Feature Interactions, explore enough FI runtime behavior to validate those boundaries, and co-design spatial/UI realization before treating the result as authoritative Scenario/Screen truth or selected evolution.

### Process

1. Start from the application Benefit / desired final Result; read current truth/Evolution Steps when the Scenario already exists.
2. Sketch a small candidate Scenario Process / FI map first. For each candidate FI, state only enough Scenario Role / Local Purpose and local Result to make the proposed boundary understandable.
3. For uncertain/non-obvious FIs, sketch the internal Interaction Process far enough to test whether the FI can actually realize its role and whether the proposed boundary is coherent. Use [Template — Feature Interaction Variant analysis](../documentation-templates/scenario.md#template-feature-interaction-variant-analysis) when materially different local realizations are worth comparing.
4. Discover candidate BI/constraints exposed by that process exploration. Ask whether they reveal a missing FI, an unnecessary FI, two interactions that should be composed, one interaction that should be split, a wrong transition/contract or a better Scenario composition.
5. Ask what material implementation capabilities the candidate Scenario implicitly assumes. Record a Scenario Realization Dependency when an unresolved HOW question can decide whether a central FI/process is actually viable.
6. Where needed, descend temporarily into source/infrastructure/API/prototype investigation only far enough to establish credible feasibility or expose a real constraint. Return the finding to Scenario design rather than promoting the investigative mechanism directly into Scenario behavior authority.
7. Revise the FI map and repeat the FI-process/BI/feasibility exploration until the high-level Scenario behavior is coherent. Do **not** require full Context/Inputs/Outcomes/BI detail for every candidate FI while the composition itself is still moving.
8. Compare materially different complete compositions with [Template — Scenario Process Variant](../documentation-templates/scenario.md#template-scenario-process-variant): initial context/inputs where material, FI composition/contracts and final Result/Outputs.
9. In parallel, explore candidate **Screen Set Variants** (overall window/screen topology) and **individual Screen Variants** (different realization of one Screen responsibility) with [Template — Screen Set / Screen Variant analysis](../documentation-templates/screen.md#template-screen-variant-analysis).
10. Map candidate Scenario/FI behavior to Screens: Scenario×Screen, FI×Screen, routes, visible/input/action state and material Screen-owned requirements. A Scenario may span multiple Screens/Windows; Screen topology does not define Scenario identity by itself.
11. Treat design exploration as bidirectional. If Screen design exposes hidden manual context transfer, weak FI outputs, missing recovery/uncertainty, poor composition or misplaced complexity, revise Scenario/FI design rather than forcing the Screen to hide the problem.
12. Compare interaction and Screen boundaries explicitly: control/recovery points, transferred context/outputs, user work, visibility/feedback, navigation/window topology, implementation/testing/evolution complexity.
13. Record Strengths, Problems, Complexity, Risks and Questions only when they materially explain a decision; no scoring framework is required.
14. Mental/visual/clickable/interactive walkthrough is optional design media. The documentation model must remain complete without a Scenario simulator/tool.
15. Select/refine preferred design, then classify it correctly:
    - accepted/implemented behavior → current Scenario/Screen truth;
    - selected coherent unimplemented behavior → Scenario-owned Evolution Step;
    - plausible non-binding evolution → `POSSIBLE` only when worth preserving;
    - complete future application benefit/behavior → planned future Scenario;
    - candidate/rejected alternative → not current truth/Evolution by default.
16. Hand selected Scenario behavior to DOC-UC-01 and selected Screen realization to DOC-UC-11.

### Principles

- Scenario design is not waterfall: Benefit ↔ FI composition ↔ FI Interaction Process ↔ BI discovery ↔ material implementation feasibility are iterated until boundaries are coherent.
- Prefer monotonic refinement and avoid reopening upstream decisions without evidence; implementation discovery may still require Scenario/FI/process revision when real constraints invalidate assumptions or reveal a materially better runtime algorithm.
- Do not finalize FI decomposition before enough runtime behavior and material feasibility are understood to judge the boundaries.
- Do not fully specify every candidate FI before the high-level composition is stable enough to justify that detail.
- Scenario behavior authority and Screen spatial authority remain distinct even while designed together.
- Candidate Screen/Scenario variants are design alternatives, not runtime branches or roadmap entries by default.
- A Screen is not a frontend Slice; FI/Slice/Screen mappings are many-to-many when justified.
- Preserve alternatives only when their rationale remains material to an active decision.

---
