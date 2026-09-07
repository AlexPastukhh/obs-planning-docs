# Replacement Package App — Documentation Use Cases: Application Modeling

Status: active normative Documentation Use Case group
Root authority: [`../documentation-use-cases.md`](../documentation-use-cases.md)

This group owns Feature / Scenario / Screen planning process. Detailed Feature/Slice boundary questions are owned by [`../methodology-guidance/reusable-vertical-slice-discovery.md`](../methodology-guidance/reusable-vertical-slice-discovery.md).

## DOC-UC-01 — Maintain Scenario / real user journey composition and consistency

### Goal

Keep one selected Scenario understandable as a real user/application journey through independently owned Features, actors, Screens and external contexts; verify their composition closes an Application Benefit; own genuine cross-Feature / cross-Screen Scenario Requirements without duplicating Feature internals.

### Process

1. Start from a selected/current or planned real journey that contributes to an Application Benefit.
2. Record the Feature sequence/composition and only the journey-level meaning needed to connect it: actor/interaction decision when material, input/starting context, visible Feature behavior/Result, continuity handed to later Features, Screen/external context and terminal Benefit closure.
3. Keep actor-owned wording, selection and interpretation in Scenario when the application merely consumes it. AI/ChatGPT may be the actor/user.
4. Keep detailed Feature-local behavior with the Feature owner. Scenario may repeat/summarize a Feature Result or visible effect when needed for composition, but must not restate the Feature's validation/recovery algorithm or canonical `BR-*` text.
5. For a material journey decision, state one exact question and represent one table column per path. Continue each path vertically until explicit convergence, re-entry, Success or Stop.
6. Discover Scenario Requirements only for behavior genuinely cross-Feature/cross-Screen/cross-context. Put `SR-*` beside the journey behavior it constrains where practical rather than in a detached catalog.
7. Check that Feature preconditions can arise, Feature Results are truthful, continuity identity/Data/context is preserved, and later Features consume the intended prior Result.
8. Check that the journey reaches the terminal Result / closes the intended Application Benefit.
9. Check selected Screens/external contexts support the journey while Screen remains spatial/window authority.
10. If the journey exposes a missing/merged/split Feature or poor Slice boundary, return to DOC-UC-13 and re-run the Feature/Slice Boundary Method from the reusable Vertical Slice guide.
11. Define E2E proof intent from the Scenario; tests remain proof rather than Scenario authority.

### Principles

- Feature is the primary behavioral authority; Scenario is the journey composition/consistency owner.
- Scenario is not a mandatory parent/container of Features.
- Scenario-first, Feature-first and iterative Feature ↔ Scenario ↔ Screen planning are all valid.
- Actor ceremony is optional; record actor identity only when semantically useful.
- Branch columns represent real journey paths, not a second semantic Item type.
- `1 Scenario = 1 Screen` is not required.
- Scenario form is proportional: choose the smallest useful representation.

---

## DOC-UC-07 — Explore and select Feature / Scenario / Screen design

### Goal

Explore candidate use-case boundaries and real journeys far enough to select coherent Feature/Slice hypotheses and Screen composition without turning design alternatives into current runtime behavior or roadmap truth.

### Process

1. Start from an Application Benefit / desired result, an existing Scenario, a Feature candidate or a Screen/interaction problem.
2. Sketch the smallest candidate Feature set and real journey needed to understand the intended application result.
3. For each non-obvious Feature candidate, use DOC-UC-13 far enough to expose intent, principal Result, meaningful behavior, Feature Data and material implementation concerns.
4. Compare Feature boundaries using the reusable four-group Feature/Slice Boundary Method; do not finalize boundaries merely from labels, screens, transports or current class structure.
5. Compose candidate Features into realistic Scenario paths and selected/candidate Screens; check context/Data continuity, recovery/re-entry and terminal Result.
6. Treat exploration bidirectionally: Scenario/Screen pressure may revise Feature boundaries, while Feature behavior/results may revise Scenario composition or Screen responsibilities.
7. Compare materially different alternatives through qualitative strengths/problems/complexity/risks/questions when useful; no scoring framework is required.
8. Classify the result correctly: selected current/planned Feature or Scenario truth, selected Evolution Step, planned future Scenario, or candidate/rejected alternative.
9. Hand selected Scenario meaning to DOC-UC-01, selected Screen meaning to DOC-UC-11 and selected Feature/Slice hypothesis to DOC-UC-13 / DOC-UC-03.

### Principles

- Design exploration is iterative, not Scenario-first or Feature-first by rule.
- Candidate alternatives are not runtime branches or Evolution Steps by default.
- A Screen is not a frontend Slice.
- Explore enough implementation reality to avoid implausible boundaries, but keep exact code design downstream.

---

## DOC-UC-11 — Maintain selected Screen model

### Goal

Keep durable spatial/window/UI meaning explicit while allowing Features and Scenarios to own behavior and journeys.

### Process

1. Maintain the Screen Map and important Screen responsibilities.
2. Map Features/Scenarios to Screens only where spatial context matters.
3. Keep Screen-owned behavior/UI constraints in the Screen owner.
4. Use DOC-UC-01 / DOC-UC-07 Scenario planning to validate real transitions between Screens.
5. Feed Screen constraints back into Feature/Scenario planning when they expose impossible or confusing behavior.
6. Inspect relevant Evolution Steps.

### Principles

- `1 Feature = 1 Screen` and `1 Scenario = 1 Screen` are not required.
- Screen is not a frontend Slice.
- Do not make accidental pixel/layout details normative without durable meaning.

---

## DOC-UC-13 — Plan and maintain Feature behavior and Slice boundary hypothesis

### Goal

Define one coherent Feature as the primary behavioral authority, using a compact step-centered representation, and establish enough implementation understanding to treat it as a credible end-to-end Slice boundary hypothesis.

### Process

1. Start from relevant Application Benefit/task or a Feature candidate discovered through Scenario/Screen work; use DOC-UC-07 while alternatives remain unresolved.
2. State one Feature `Intent` and one principal meaningful `Result` / Result family.
3. Under `Expected application behavior`, record the smallest useful semantic Data representation, normally one compact Data table.
4. Make the numbered **Main path** the primary Feature representation:

```markdown
| Behavior step | Requirement(s) |
|---|---|
| **1. <semantic behavior step>** | `BR-...` — <compact normative statement> |
```

One row is one semantic behavior step. A row may own one or several `BR-*`.
5. Give every durable normative Behavior Requirement a stable `BR-*` identity. Keep canonical Requirement text only in the Feature owner, directly beside the behavior/branch it constrains where practical.
6. Write Requirements maximally tersely and logically. Correctness-critical order is normative; explicitly mark partial order/OPEN order rather than silently fixing implementation convenience.
7. For a material branch inside a Step:
   - state one exact decision/question;
   - use one table column per path/variant;
   - continue ordered actions vertically inside each path;
   - end with explicit convergence to a later Step, re-entry/retry, Success or Stop.
   Do not introduce a separate persistent Behavior-Step/Branch semantic Item merely for planning.
8. Keep actor/user/AI reasoning and free-form wording in Scenario when the application merely consumes that supplied input. Feature behavior starts at the semantic application boundary: what the application accepts, validates, establishes, changes and returns.
9. Record only material Feature Implementation Concerns needed for feasibility, dependencies, recovery risk, proofability, Domain/Shared signals, known Evolution and Slice-boundary reasoning. They are discovery evidence, not normative behavior.
10. Inspect relevant known Evolution Steps and run the canonical four-group Feature/Slice Boundary Method in [`../methodology-guidance/reusable-vertical-slice-discovery.md`](../methodology-guidance/reusable-vertical-slice-discovery.md).
11. Prefer one Feature/Slice when intent + principal Result family are the same and variation localizes; prefer separate Features/Slices for distinct intent/result or little meaningful shared realization. Transport/button/URI/CLI/REST/handoff alone never defines the boundary.
12. Select the Feature boundary + Slice boundary hypothesis, or mark the material unresolved detail OPEN.
13. Feed `Feature + Step N + BR-*` identities downstream to DOC-UC-03 / DOC-UC-02. Downstream planning references the identities and does not reproduce canonical Requirement text.

### Principles

- Feature Planning is behavioral authority informed by implementation reality, not class/method design.
- Scenario is not a mandatory Feature parent.
- Templates are adaptable examples, not schemas.
- Feature/Slice boundary is a hypothesis that later implementation evidence may reopen.
- New transport alone does not create a Feature.
- Existing Feature/Slice extension is normal.
- Do not split merely to make units smaller; do not merge into pervasive branching with poor change locality.

### Owners used by this process

- app-level Benefit/context owner where present;
- the Feature owner itself;
- relevant Scenario and Screen owners;
- known Evolution Step owner/map;
- existing Domain/Slice/Shared owners and source/test Evidence for feasibility/boundary checks only.

## Application-modeling representation guidance

- Prefer the smallest form that preserves selected meaning.
- Feature is the primary behavioral authority. Prefer compact semantic Data + a two-column Main path (`Behavior step | Requirement(s)`) with stable `BR-*` beside the owning behavior.
- For a material Feature/Scenario decision, use one exact question and one column per path; show path continuation and convergence explicitly.
- Scenario references Features and owns actor/journey composition/continuity without duplicating Feature internals.
- Actor fields are optional; use them only when actor identity/decision materially changes the journey.
- Future Features/extensions may be planned deeply when selected, but exact OPEN details remain blocked.

## Post-realization Feature Implementation Concern reconciliation

Feature Implementation Concerns are discovery memory, not a historical log and not automatically Requirements. After implementation + proof, reconcile each material concern:

```text
still OPEN and capable of changing Feature/boundary/implementation?
→ KEEP-AS-CURRENT-CONCERN

produced/changed durable BR/IR/PFR/Decision/Risk/Known Problem?
→ PROMOTE/ROUTE-DURABLE-MEANING
→ through proposal/approval into the natural owner

resolved completely by implementation/proof?
→ REMOVE-AS-RESOLVED

only influenced exact code/test realization?
→ REMOVE-AS-REALIZATION-ONLY

Evidence shows Feature/BR/boundary itself is wrong?
→ REOPEN-UPSTREAM
```

Do not pre-decide that all concerns are retained or all are deleted. Removal/material reinterpretation of an existing durable Feature Implementation Concern is itself proposal-first even when no Requirement changes.
