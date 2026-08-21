# Workspace Planning Principles And Terminology

Status: active reusable canonical principles/terminology owner
Scope: plan changes to evolving Workspaces through useful Workspace Use Cases, explicit semantic meaning and low-coupled vertical realization; also define Mini/Modular UCDS representation for accumulating current plans.

Canonical generic UC identity/registry semantics: [`../direction-and-use-case-registry-workflow.md`](../direction-and-use-case-registry-workflow.md)
Generic Architecture Lens: [`../architecture-planning/README.md`](../architecture-planning/README.md)
AI reviewability/direction: [`../ai-reviewability-and-directed-planning-principles.md`](../ai-reviewability-and-directed-planning-principles.md)
Recommended integrated shape: [`WORKSPACE-USE-CASE-PLANNING-TEMPLATE.md`](WORKSPACE-USE-CASE-PLANNING-TEMPLATE.md)

## 1. UCDS Pattern

Workspace/documentation change planning can be expressed as **UCDS**:

```text
UC — Use Case / useful Workspace result
D — Domain / Rules / semantic owner meaning
S — Vertical Slice / Realization
```

This is a compact name for the existing Step 1/2/3 reasoning pattern, not a new Use-Case ontology or peer Domain/Slice Use Cases.

```text
Step 1 — Target UC
→ useful result / behavior / trigger / boundaries / relationships

Step 2 — Target Domain / Rules
→ concepts / rules / invariants / policies / models / templates /
  semantic owner responsibilities / verification meaning

Step 3 — Target Vertical Realization
→ Workspace Change Path / Architecture Lens / Slice boundary /
  local/shared owners / exact files / dependencies / verification
```

Default proportional review depth for documentation/Workspace planning:

```text
UC boundary materially unresolved
→ Step 1 may stand alone

UC boundary sufficiently grounded
→ normally review Step 1 + Step 2

Step 3
→ include when explicitly requested or realization is sufficiently grounded/useful
```

This default does not collapse the dependency direction: Step 2 still depends on a sufficiently stable Step 1, and Step 3 still realizes sufficiently stable Step 1/2 meaning.

## 2. Accumulating Current Plan

A bounded change/action may be planned in one current UCDS plan. Later `собери идеи` results may update/expand that same plan when it is clearly selected.

```text
Mini UCDS
→ compact composed plan, often one file

Modular UCDS
→ the same current plan split into UC/shared-Idea/rule/realization/order owners as growth makes review/navigation cheaper
```

Mini→Modular is structural growth, not weaker/stronger semantic correctness and not a new planning stage. Do not create an append-only command-result ledger or separate Goal Map beside the current UCDS plan.

The accumulating plan should expose a compact **Planning State** for Step 1/2/3 (`reviewed`, `partial`, `not selected`) so later work can distinguish stable upstream meaning from provisional Carry-Forward context. Planning State is a review/progress projection, not a second semantic authority.

## 3. Useful-Result-Centric Workspace Development

A material Workspace structure/semantic owner should be justified by a useful Workspace result or a necessary realization/support/verification path.

```text
Need / source / discussion
→ Ideas when answer-seeking change proposals exist
→ affected existing Workspace UC or justified candidate new UC
→ target semantic meaning
→ architecture/path review proportionally
→ vertical realization
→ concrete artifacts
→ verification
```

Application actor-visible behavior remains Scenario-owned; Application SDS is a sibling specialization of the same directed planning idea.

## 4. Directed Planning And Stability Before Handoff

Planning dependency direction is:

```text
Use Case
→ Domain / Rules
→ Vertical Realization
```

Step 1 should be sufficiently correct by UC responsibility before Step 2 normally depends on it; Step 2 should be sufficiently correct before Step 3 normally realizes it. A provisional whole-picture pass may preserve later-step implications as Carry-Forward Context, but downstream convenience must not normally define upstream meaning.

If Step 3 repeatedly causes Step 1/2 redesign, review stage completion/order/boundaries. Genuine new evidence/infeasibility returns upstream as an explicit finding.

## 5. Primary Planning Unit And Shared Ideas

The primary integrated planning unit is the affected/new Workspace UC, not an Idea and not a file. Several Ideas may converge into one Target UC. One Idea may affect several UCs and remains one Idea; shared Ideas are defined once and referenced with local impact from each UC.

## 6. Current / Target / Transition

```text
Current
→ high-level summary + canonical owner links

Target
→ complete selected meaning for every changed/new semantic owner

Transition
→ what changed / why / current owner / target owner
```

Completeness invariant:

```text
CURRENT + explicit complete DELTA = TARGET
```

Implementation should not need to invent missing semantic decisions.

## 7. Semantic Owner Roles

Recognizable roles remain Direction Registry, Use-Case Registry, Workflow, optional focused Model, Principles, Template, README/index, Command definition, Verification owners and Action Log. A semantic role does not imply one file of every role per UC.

Action Log owns material history/rationale; current UCDS planning owns current/forward selected meaning.

## 8. UC Graph And Vertical Realization

Prefer an explicit semantic graph when several UCs compose. File/import dependency is not automatically UC dependency.

Step 3 aims for coherent vertical, independently checkable change. One UC is not ontologically one Slice; several increments are allowed when delivery/risk/dependency reasons justify them. Shared coordination owners are architectural tax and require real cross-capability payoff.

Before exact files, trace expected Workspace Change Paths and use current Architecture Planning proportionally. Optimize lowest-cost correct/verifiable path, not raw file count.

## 9. Execution Order

Execution order is the selected work route through already planned UCDS material. It may be a section in Mini UCDS or a separate current projection/file in Modular UCDS.

Use partial order when real:

```text
Slice A
→ Slice B || Slice C
→ Slice D after B+C
```

Do not force an arbitrary total order for work that can proceed independently. Execution order is not semantic dependency authority.

## 10. Combined Architecture Effect

After several UCs/Slices are planned, review combined paths, shared owners, overlap and coordination tax. Best local realization for A + best local realization for B is not automatically the best combined architecture.

## 11. Step 4 — Realization Feedback And Actual Change Review

Steps 1–3 are pre-implementation planning. Step 4 is downstream lifecycle, usually per implemented Slice/change:

```text
selected plan
→ materialize / implement
→ local adaptation for ordinary implementation detail
→ explicit upstream finding when real evidence contradicts selected meaning
→ rebuild affected downstream planning when upstream changes
→ semantic ReviewDiff of actual uncommitted transition
```

Backflow is evidence-driven exception, not normal planning direction. ReviewDiff checks what the plan actually produced rather than re-reviewing only the plan.

## 12. Do Not

- Do not create a second generic Use-Case model authority.
- Do not turn Step 2/3 into peer Workspace UCs.
- Do not create a Goal Map beside an active UCDS current plan.
- Do not make Mini UCDS semantically weaker than Modular UCDS.
- Do not let execution order redefine UC/rule meaning.
- Do not let implementation convenience silently rewrite upstream meaning.
- Do not optimize raw step/file count as an architecture score.
