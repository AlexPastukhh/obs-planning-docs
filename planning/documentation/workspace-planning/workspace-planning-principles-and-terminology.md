# Workspace Planning Principles And Terminology

Status: active reusable canonical principles/terminology owner
Scope: plan changes to evolving Workspaces through useful Workspace Use Cases, explicit semantic meaning and low-coupled vertical realization without creating duplicate Use-Case or Architecture authorities.

Canonical generic UC identity/registry semantics: [`../direction-and-use-case-registry-workflow.md`](../direction-and-use-case-registry-workflow.md)
Generic Architecture Lens: [`../architecture-planning/README.md`](../architecture-planning/README.md)
Recommended integrated shape: [`WORKSPACE-USE-CASE-PLANNING-TEMPLATE.md`](WORKSPACE-USE-CASE-PLANNING-TEMPLATE.md)

## 1. Useful-Result-Centric Workspace Development

A material Workspace structure/semantic owner should be justified by a useful Workspace result or by a necessary realization/support/verification path for such a result.

```text
Need / source / discussion
→ Ideas when answer-seeking change proposals exist
→ affected existing Workspace UC
   or independently justified candidate new Workspace UC
→ target semantic meaning
→ architecture/path review proportionally
→ vertical realization
→ concrete artifacts
→ verification
```

If a structure cannot be related to a useful result or a necessary supporting path, review whether it is accidental/speculative complexity.

Application actor-visible behavior remains Scenario-owned:

```text
Application boundary
→ Application Scenario

Development Workspace boundary
→ Workspace Use Case
```

The relationship can be recursive: Application Scenarios drive work in a code Workspace; documentation Workspaces support understanding/planning/changing other Workspaces and themselves; reusable-methodology Workspaces support those planning/documentation capabilities.

## 2. Primary Planning Unit

The primary integrated planning unit is the affected/new `Workspace Use Case`, not an Idea and not a file.

```text
several Ideas
→ may converge into one Target UC

one Idea
→ may affect several UCs
→ remains one Idea
→ each affected UC records only its local impact
```

An Idea is never automatically a UC. Apply the normal independent-usefulness rules from the canonical registry methodology.

## 3. Three Planning Depths Inside One UC

```text
Step 1 — Target UC
→ useful result / behavior / trigger / boundaries / relationships

Step 2 — Target Domain / Rules
→ concepts / state/lifecycle when real / relationships / rules / invariants /
  policies / models / templates / owner responsibilities / verification meaning

Step 3 — Target Vertical Realization
→ expected Workspace Change Path / Architecture Lens / Slice boundary /
  local/shared owners / exact files / dependencies / verification
```

These are planning depths of the same UC, not peer UCs merely because separate reasoning is useful.

For documentation planning, Step 1 + Step 2 are normally reviewed together when the UC boundary is sufficiently grounded. Step 1 may stand alone when target Workspace UCs are still materially unresolved. Step 3 is added when realization planning is requested or sufficiently grounded.

## 4. Carry-Forward

Planning depths are not hermetic phases.

```text
earlier insight about a later step
→ preserve as Carry-Forward Context
→ later step validates / refines / rejects it

known later-step implication
≠ automatically final later-step decision
```

Do not discard known Domain/file/verification implications merely because their dedicated depth has not yet been reviewed.

## 5. Current / Target / Transition

Planning depth and review projection are separate axes.

```text
Current
→ high-level summary + direct canonical owner links
→ do not duplicate full current bodies unnecessarily

Target
→ complete planned meaning for every new/changed semantic owner
→ when a changed/new primary workflow is sufficiently reviewed at the selected depth, include its complete planned future workflow body rather than an approximate summary or TODO

Transition
→ what changed
→ why
→ current owner
→ target owner
```

Completeness invariant:

```text
CURRENT + explicit complete DELTA = TARGET
```

After reading linked current owners plus the plan, implementation must not need to invent missing semantic decisions.

## 6. Semantic Owner / File Roles

Recognizable semantic roles improve discoverability and reduce Working-Context Load:

```text
Direction Registry
→ broad work family/topology

Use-Case Registry
→ UC identity / purpose / trigger / result / boundaries / route

Workflow
→ end-to-end UC orchestration

Model
→ focused concepts / fields-state / lifecycle / relationships / invariants
  only when separately justified

Principles / terminology
→ reusable cross-cutting contracts

Template
→ recommended/exact representation shape

README / index
→ navigation/read order

Command definition
→ executable shortcut/output/read/permission route

Verification owners
→ evidence, not semantic authority

Action Log
→ material history/rationale, not current semantic body
```

The workflow is analogous in responsibility to an application-service/use-case coordinator: it knows which semantic rules/owners/actions apply and in what sequence, but it does not absorb every invariant/model/template into one monolith.

```text
semantic role exists
≠ every UC gets one file of every role
```

Create a separate Model owner only when identity/state/lifecycle/invariants/reuse/independent review make it cheaper and clearer than keeping a simple rule in an existing workflow/principles owner.

## 7. UC Graph

Prefer an explicit graph over a mandatory parent/child hierarchy.

Initial semantic relationship vocabulary, used only when real:

```text
uses
depends on
includes when applicable
hands off to
reviews
produces input for
```

A `sub-use-case` relationship is optional and requires real compositional meaning; a supporting UC may be reused by several parents. A cross-cutting Idea is not a graph edge by itself. File/import dependency is not automatically a UC dependency.

## 8. Vertical Realization

Step 3 plans how the selected UC change becomes true end-to-end.

Default target:

```text
one coherent UC change
→ one coherent vertical Slice when practical
```

But:

```text
1 UC ≠ exactly 1 Slice by ontology
```

Several independently checkable increments are allowed when delivery/risk/dependency reasons justify them. A genuinely shared semantic change may become an explicit shared Slice only after cross-UC review; do not create a shared Slice mechanically for every overlap.

Before choosing exact files, trace the expected Workspace Change Path and use the current generic Architecture Lens proportionally. Reuse Architecture Planning semantics rather than copying its dimensions/decision rules here.

Optimize the lowest-cost correct path, not raw step/file count:

```text
minimum unnecessary work
+ low incidental coupling/context
+ independently verifiable result
```

Several obvious local edits may be better than fewer edits requiring hidden synchronized knowledge.

## 9. Slice Locality And Shared Coordination

Capability-specific semantic change should be local to the selected UC/Slice as far as practical.

```text
LocalSemanticFiles(A) ∩ LocalSemanticFiles(B)
≈ empty
```

This is architecture pressure, not an absolute zero-overlap law.

When two planned Slices touch the same mutable owner, classify why:

```text
orchestration / routing / projection overlap
shared Domain overlap
capability-local semantic overlap
generated / mechanical overlap
historical / logging overlap
other
```

A shared coordination owner is architectural tax. Preserve/create one only when its cross-capability payoff justifies coordination/review/parallel-work cost. Capability-local semantic overlap is a reason to review UC/owner boundaries. Generated overlap may suggest derivation/automation. Shared Domain overlap may justify a shared semantic owner/Slice only when the meaning genuinely must remain canonical across consumers.

## 10. Combined Architecture Effect

```text
best local realization for Idea/UC A
+
best local realization for Idea/UC B
≠ automatically best architecture for A+B
```

After affected UCs are planned, review their combined paths, shared owners, overlap and architectural tax before implementation.

## 11. Post-Realization Boundary

Steps 1–3 are pre-implementation planning. Actual realization review is downstream.

For documentation, a normal route may be:

```text
Steps 1–3
→ materialize
→ semantic ReviewDiff
```

For application development, actual code/build/test/runtime evidence may justify a deeper realization-integration loop that distinguishes implementation mismatch from planning discovery and may return to Step 1/2/3. Do not silently rewrite upstream meaning from downstream evidence.

## 12. Do Not

- Do not create a second generic Use-Case model authority; use `direction-and-use-case-registry-workflow.md` for UC identity/contracts.
- Do not turn Step 2 or Step 3 into peer Workspace UCs merely because they are planning depths.
- Do not turn every file/model/template into a UC.
- Do not force a separate Domain/Model owner when simple meaning has a good current owner.
- Do not optimize raw step/file count as an architecture score.
- Do not copy the generic Architecture Lens into Workspace Planning owners.
- Do not let commands become semantic UC authorities.
- Do not let implementation convenience redefine unresolved UC/Domain meaning.
