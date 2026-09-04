# Shared Concepts — Behavior and Scenario Design

Status: physically separated part of the Replacement Package App documentation methodology.
Authority: this file remains part of the same documentation-methodology authority; physical separation does not create competing semantic authority.

### Current truth

Behavior or architecture that is already accepted as implemented.

Current Scenario prose describes current user/application behavior. Current Domain/Slice prose describes current semantic responsibility and durable architecture constraints, not a manually maintained copy of source structure.
### Application Benefit / desired result

The useful application result that justifies a Scenario. It answers why the application should provide this Scenario at all.

A Benefit / desired result is upstream of the selected Feature Interaction design. Different FI compositions may legitimately realize the same Benefit. Keep this meaning in the Scenario owner unless several Scenarios genuinely need one separate shared benefit owner.
### Scenario

A Scenario is one selected composition of Feature Interactions in an application interaction context that realizes an application Benefit / desired result.

For UI applications, that interaction context may span one or more Screens/Windows. Do not force `1 Scenario = 1 Window`: Scenario owns behavioral composition, while selected Screen owners own spatial/window meaning.
### Scenario Process Specification

The complete behavioral specification of one Scenario. It consists of two related scales:

- **Scenario Process** — FI composition, ordering, transitions between FIs, cross-FI branches/loops and terminal outcomes;
- **Feature Interaction specifications** — the local runtime behavior inside each selected FI, including context/inputs, Interaction Process, outcomes, Results, Outputs, retries/recovery/uncertainty when material and transitions back to the Scenario Process.

The complete specification must still make meaningful observable behavior visible. Separating the two scales prevents a high-level Scenario map from absorbing FI internals while preserving full behavior authority in the Scenario owner.

A Process Specification is not merely a short overview whose missing semantics appear only later in Behavior Items. Behavior Items and UI Requirements formalize requirements already visible in the selected FI behavior; they do not become a second hidden source of Scenario behavior.

A compact Scenario Process Map may show FI topology while detailed FI entries carry the full local behavior. Together they are the complete Process Specification.
### Feature Interaction

A Feature Interaction is a selected Scenario-local unit of application behavior through which the Scenario progresses toward its Benefit / desired result. It is a behavioral means inside the Scenario, not an independent top-level product goal.

A useful FI has a meaningful local role and Result sufficient to distinguish it from neighboring behavior. It may be user-triggered, automatically continued by the application, externally driven, or a combination. It does not imply one button, one class or one Slice.

The important parts are:

- **Scenario Role / Local Purpose** — why this selected behavior exists here and what it enables/prepares for the Scenario;
- **Context / Preconditions** — already-established state relevant to the interaction;
- **Required Inputs** — information/artifacts/actions actually consumed by the interaction;
- **Interaction Process** — runtime user/application behavior inside this FI;
- **Outcomes** — meaningful success/error/validation/uncertain results;
- **Result** — meaningful local application/user-world truth established by an outcome and useful for defining the FI boundary;
- **Outputs** — information/artifacts/identity/state produced for later consumption;
- **Next Interactions** — transitions, loops or termination enabled by outcomes.

`Scenario Role / Local Purpose` and `Why This Interaction Design` are different questions. Role/purpose explains why the FI exists in this Scenario composition. Design rationale explains why this particular input/process/result/output/control-point form was selected instead of another realization.
### Feature Interaction Variant

An alternative behavioral design for the same Scenario-local role/responsibility.

Variants may require fewer, more or different inputs; use different context; require different user actions; produce different-strength Results/Outputs; move control points; or remove the need for a later interaction. Variants are not required to preserve the same input/output contract.
### Scenario Process Variant

An alternative composition of Feature Interactions for realizing the same Scenario Benefit / desired result.

A Process Variant may add/remove interactions, compose several into one, split one into several, replace one interaction with another, change initial inputs, change contracts between interactions or produce different final outputs.
### Runtime branch and design alternative

A **runtime branch** is behavior actually available in the selected/current Scenario.

A **design alternative** is a candidate/rejected/possible way the Scenario or Feature Interaction could have been designed while choosing behavior.

Do not represent a rejected alternative as a current runtime branch. Considering an alternative does not automatically create an Evolution Step.
### Scenario Realization Dependency

A **Scenario Realization Dependency** is a material implementation-feasibility dependency, question, assumption or candidate realization that is kept in the Scenario owner because the Scenario's plausibility, FI boundary or runtime interaction process depends on understanding it.

Central rule:

> **Scenario does not own HOW, but the Scenario has the right and obligation to record the HOW questions and assumptions on which its own realizability depends.**

Preserved formulation from the planning discussion:

> **Scenario не владеет HOW, но Scenario имеет право и обязан фиксировать те вопросы и предположения о HOW, от которых зависит его собственная реализуемость.**

This is intentionally different from a Behavior Item or Implementation Item:

```text
Scenario BI
= implementation-independent WHAT must hold

Scenario Realization Dependency
= what must be understood/proved about possible HOW so the selected Scenario remains credible

Domain / Slice / Shared Implementation Item
= durable HOW selected after implementation planning
```

A Realization Dependency may preserve:
- a feasibility question that can invalidate or reshape a selected FI/process;
- an implementation assumption currently used to continue Scenario planning;
- one or more candidate realization ideas worth investigating later;
- the lower planning/investigation area that must consume the question (Domain, Slice, Shared Implementation, source/infrastructure investigation, prototype/spike);
- the Scenario impact if the assumption fails.

It does **not** make a candidate mechanism authoritative and does not create `DI-*`, `SI-*` or a Shared Implementation Capability merely by being recorded.

The preferred planning direction is monotonic refinement: revisiting previous planning layers is undesirable and should be minimized, not normalized as casual churn. But implementation discovery is a valid and expected feedback mechanism rather than a methodology failure. If lower-level investigation shows that selected runtime behavior is impossible, unsafe, materially different from the assumption, or substantially better realized by another runtime algorithm/composition, revise the affected Scenario Process/FI boundary rather than forcing the old Scenario onto an unsuitable implementation.

Application Benefit / Desired Result is upstream and should remain stable unless the discovery actually invalidates that benefit. Scenario/FI/process details are allowed to change when implementation feasibility changes what behavior can credibly be selected.
### Behavior Item

A Behavior Item is one atomic **implementation-independent business/application behavioral requirement** that must hold for one or more selected Feature Interactions / their Interaction Processes to correctly realize the Scenario.

It answers:

> What must the application do, or what must remain true, for this selected FI behavior to be correct and therefore support the Scenario Benefit / desired result?

A Behavior Item deliberately does **not** prescribe one implementation mechanism. It should remain valid across ordinary refactoring and across multiple possible implementations of the same selected behavior.

Collectively, the BI set is the normative requirement decomposition through which selected FI behavior is made correct. Domain, Slice and Shared Implementation owners then implement those BI; tests verify that implementation rather than becoming a second behavior authority.

Prefer a stable technical ID that does not encode document position or roadmap order, plus a readable name that communicates the requirement. For example:

```text
BI-RPKG-REVIEW-EXACT-PUBLISHED-TIP — Review decision binds the exact published tip
```

Recommended content:

```text
Requirement:
<business/application behavior / invariant / rule>

Reason:
<why this behavior exists>
```

The `Reason` may explain the Scenario Benefit / desired result, a Feature Interaction role, later behavior that depends on the rule, a semantic boundary, recovery/uncertainty correctness, or a concrete bug/class of bugs the rule prevents. Do not invent a bug-prevention rationale when the rule is simply fundamental to correct Scenario behavior.

Behavior Items are the primary input for Domain discovery. The authoritative BI text stays in the Scenario; lower owners reference the same BI identity instead of rewriting it.

A BI normally sits under the Feature Interaction where its behavioral need is clearest. If one BI constrains the boundary between multiple Feature Interactions, keep one authoritative `Requirement + Reason` definition and reference that same BI identity from every relevant interaction instead of creating rewritten copies.
### UI Requirement

An intentional requirement about how Scenario behavior is presented or controlled through UI.

UI Requirements remain separate from business/application Behavior Items. Interaction/component-local UI Requirements normally stay near the Feature Interaction whose behavior gives them meaning.

A rule whose canonical meaning belongs to a Screen as a spatial/window owner should instead be maintained by the selected Screen model as a **Screen Behavior Item** and referenced from Scenario/FI prose where needed. Do not keep a second authoritative copy in the Scenario merely because the Process Specification must still make observable behavior understandable.

```text
Scenario/FI
├─ Behavior Items
└─ interaction/component-local UI Requirements

Screen owner
└─ Screen Behavior Items
```

Do not turn accidental current layout, pixel positions or incidental visual structure into normative requirements. Record only intentional presentation/interaction/spatial constraints worth preserving across implementation change.
### Strengths, Problems, Complexity, Risks and Questions

These are design-analysis concepts, not a mandatory scoring taxonomy.

- **Strength** — what a design does especially well.
- **Problem** — a known undesirable property/trade-off already inherent in the design.
- **Complexity** — neutral degree of complication introduced by the design; not automatically negative.
- **Risk** — a potential/conditional future problem.
- **Question** — an unresolved point requiring decision, research, experiment, prototype or evidence.

Useful complexity dimensions when material include user interaction, Scenario/process, Feature Interaction behavioral, implementation, recovery, testing and evolution complexity.

A key design question is not merely “which variant has less complexity?” but “where does this variant place complexity, and is that the right place for this Scenario?”
