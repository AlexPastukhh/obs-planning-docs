# AI Working Contract

Status: mandatory repository working contract
Scope: AI/chat sessions that plan, develop or materially change repository documentation or application meaning.

## Mandatory Rule

Before material work, select the relevant area through current README/navigation, resolve that area's applicable semantic entry/current owner, and follow its canonical owner route. Conversation memory, examples, generated projections, historical artifacts and implementation alone are not semantic authority.

For material planning/development answers also follow the installed peer [`documentation/idtspe-methodology/active/ai-reviewability/README.md`](documentation/idtspe-methodology/active/ai-reviewability/README.md).

For material Planning Concerns also follow `documentation/planning-concerns-and-decisions-model.md`. AI should provide a useful `AI Comment` when material, but must not silently invent user-owned Needs/preferences/feelings/business priority/risk tolerance in order to close a concern. `Recommendation` is optional and evidence-bound; `Decision` exists only after the choice is actually selected.


## Current IDTSPE Working Rule

For material planning, use [`documentation/idtspe-methodology/active/idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md`](documentation/idtspe-methodology/active/idtspe-core/IDTSPE-DEFAULT-WORK-MODE.md) unless a narrower current owner route explicitly supersedes it.

```text
AI proposal → Idea by default
material Q/R/P → current Target owner, with P0..P3 impact priority when useful
Decision → only after selection
SDS work → IDTSPE Shell + one SDS Target Module + applicable Lenses
material persistence → Documentation / Representation Lens before P-14
```

Do not infer one-file-per-Target. Code/types/tests/schema/config or an existing discovery/strategy/owner section may be the correct durable representation.

The legacy shared Concern/Idea/Application/Architecture/Testing documents remain migration/provenance inputs only where still referenced; they do not override the installed IDTSPE/SDS owners.

## Hard Planning Root Invariant

Planning never starts from a FIND/Q/R/P queue. The semantic root is:

```text
Real-Life Situation / Need / Desired Result
→ selected solution / responsibility
→ Workspace Use Case or Application Scenario
→ Domain / Rules
→ Target Dependencies when material
→ realization / verification when useful
```

Planning Concerns/Q/R/P are a secondary lens attached to a concrete semantic owner/current planned state. Active Q/R/P keeps current unresolved/residual concerns; material retained concern/Decision trace may preserve answers/rationale after closure without making closed history an active queue. `Concern Group` groups Q/R/P that share one resolution surface. `Review Order` is derived from priority/dependency/blast-radius/timing, not a task queue. If no material active concern exists, continue the semantic UC/Scenario graph. Ordinary chat text controls scope/depth/lens; no persistent Focus/H0-H1-H2 control ontology is required. Canonical semantics: `documentation/planning-concerns-and-decisions-model.md`.

## Documentation Work

Read and follow:

```text
planning/session/use-cases/UC-SESSION-USE-REPOSITORY-GUIDANCE.md
planning/documentation/principles-and-terminology.md
planning/documentation/use-case-registry.md
```

Then resolve the narrowest applicable current Documentation Use Case and owner.

## Planning / Application Work

Start from:

```text
planning/README.md
→ relevant area
→ follow that area's own current navigation
→ canonical owner
```

Do not impose generic Documentation navigation types onto a specialized methodology/application area. When IDTSPE/SDS or another methodology is selected, its own current owners define its semantic route.

When a current integrated plan already exists, treat it as the current working baseline and integrate new selected meaning into the real Scenario/UC/Domain/Slice owners rather than creating a transcript of planning answers.

## Directed Planning And Reviewability

Material AI planning should be reviewable before it is returned:

```text
complete provisional picture when useful
→ stabilize/review upstream meaning before downstream realization
→ Key Points + Review Priority
→ built-in current-target recheck
→ integration check against selected upstream/global direction
```

Planning dependencies should normally point from upstream meaning to downstream realization. Downstream evidence may challenge upstream meaning only through an explicit finding; frequent backflow is a signal to review stage order/completion/boundaries. `крит` remains an optional explicit adversarial review; the retired `обс` shortcut and former Level 1/2/3 answer model are not the current quality architecture.

## ReviewDiff Work

A technically valid or integrity-verified ReviewDiff is not automatically a semantically correct change.

When a ReviewDiff is supplied for review:

```text
planning/use-case-registry.md
→ UC-REPO-REVIEW-DIFF
→ planning/use-cases/UC-REPO-REVIEW-DIFF.md
→ planning/documentation/review-diff-review-workflow.md
→ affected current owners
→ shared Idea methodology for material corrective alternatives
```

Do not imply semantic approval or Finalize while material correctness/ownership issues remain unresolved.

## Application Development + Documentation

Implementation must follow current selected planning meaning. If implementation changes accepted behavior, architecture, interfaces or another documented responsibility, reconcile the actual semantic owner and follow documentation ownership rules. Code does not silently become a second documentation owner.

## No Silent Promotion

```text
Idea ≠ decision
implementation idea ≠ selected architecture
example ≠ authority
projection ≠ canonical state
historical record ≠ current ontology
```

## Authority

This contract routes to canonical owners. If it conflicts with a linked canonical principle/workflow owner, the canonical owner wins and this contract must be corrected.
