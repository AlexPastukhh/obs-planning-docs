# DOC-UC-01 — Maintain Scenario behavioral specification and evolution

### Goal

A reader can open one Scenario and understand the application Benefit / desired result, selected Feature Interaction composition, complete FI-local runtime behavior, core Behavior Items, interaction/component-local UI requirements, known Scenario-owned Evolution Steps and any material Realization Dependencies needed to judge implementation feasibility without turning the Scenario into implementation authority.

### Process

1. Verify accepted current behavior from Scenario documentation, source/tests and accepted implementation state.
2. Maintain the Scenario's `Application Benefit / Desired Result` plus complete `Process Specification` using [Template — Scenario owner](../documentation-templates/scenario.md#template-scenario-owner) and [Template — Feature Interaction entry](../documentation-templates/scenario.md#template-feature-interaction-entry).
3. Maintain the Scenario Process as the selected FI composition: ordering, transitions, cross-FI branches/loops and terminal outcomes. Keep this level high enough that FI internals are not duplicated in the topology.
4. For each selected FI, maintain its Scenario Role / Local Purpose, Context/Preconditions, Required Inputs, internal Interaction Process, meaningful outcomes, Result, Outputs and Next Interactions. Include retry/recovery/validation/uncertainty only where they are part of that FI's real behavior.
5. Persist core implementation-independent Behavior Items with `Requirement + Reason` under the FI where their need is clearest; reference one authoritative BI identity across several interactions when the rule spans their boundary.
6. Maintain interaction/component-local UI Requirements near the owning FI using [Template — UI / Screen requirement forms](../documentation-templates/screen.md#template-ui-requirement). When canonical meaning belongs to a Screen/spatial context, reference the selected Screen owner rather than keeping a second authoritative screen-level copy in the Scenario.
7. Keep the Process Specification observably complete even when a detailed Screen-owned requirement lives elsewhere; Scenario prose must still explain what the user/application experiences.
8. Review the selected Scenario for material gaps in implementation feasibility. When Scenario plausibility, an FI boundary or runtime process depends on HOW that is not yet understood, maintain an optional `Realization Dependencies / Questions / Candidates` section using the Scenario template.
9. For each such dependency, state the relevant Scenario/FI behavior, the question/assumption/candidate, where it must be investigated, and what Scenario part may need revision if the assumption fails. Do not turn the candidate HOW into BI/DI/SI authority.
10. Before treating a planned Scenario as mature enough for lower implementation planning, verify that no central FI is accepted merely while its technical realizability is completely unexamined. Not every dependency must be resolved; material uncertainty must be visible and routed.
11. Maintain `Evolution Steps` only for coherent application-behavior changes canonically owned by this Scenario; use [Template — Evolution Step](../documentation-templates/evolution.md#template-evolution-step).
12. For each Evolution Step, describe WHAT changes in Scenario/FI/contracts/BI/UI behavior; reference affected Screen realization when useful but keep detailed Screen/Domain/Slice/test delta in their `Evolution Impact` sections.
13. Use semantic stable IDs/names; `URGENT`, `PLANNED` or `POSSIBLE` may express useful step intent, while map timing/likelihood/order remains separate.
14. Link one canonical step across affected Scenarios rather than duplicating it. Use a planned future Scenario when a complete future application benefit/behavior is clearer than a large local delta.
15. When an Evolution Step is implemented, promote resulting behavior into current Scenario truth and retain historical rationale only when it still explains current meaning.
16. Use DOC-UC-07 for design exploration and DOC-UC-09 for readable presentation.

### Principles

- A Scenario exists to realize an application Benefit / desired result; buttons, Slices, classes and implementation actions do not define its identity.
- Scenario Process owns FI composition/transitions; each FI owns its local Interaction Process inside the same Scenario authority.
- FI is a selected behavioral means inside the Scenario, not a separate top-level product goal.
- Process Specification is complete; BI/UI/Screen references formalize visible behavior rather than hiding a second behavior source.
- Evolution Step = WHAT application behavior changes.
- Scenario Realization Dependency = non-authoritative feasibility memory for material HOW dependencies, not selected implementation ownership.
- Prefer monotonic refinement; allow implementation discovery to feed back into Scenario/FI/process when real constraints invalidate or materially improve the selected runtime design.
- Current truth is not called a transitional Scenario merely because future evolution is known.
- `POSSIBLE` is non-binding and does not license speculative implementation.

### Owners used by this process

- current/planned future Scenario owners;
- selected Screen owner when Screen-owned meaning is referenced;
- Evolution Steps Map as downstream planning consumer;
- affected Domain/Slice/Shared Implementation Capability owners as downstream `Evolution Impact` consumers.

---
