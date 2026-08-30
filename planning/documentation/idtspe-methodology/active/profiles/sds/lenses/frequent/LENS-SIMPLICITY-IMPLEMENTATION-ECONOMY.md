# LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY — Simplicity / Implementation Economy / Evolution-Safe Simplification

Lens ID: `LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY`  
Short name: `Simplicity Lens`  
Activation: `FREQUENT_CONDITIONAL`

## Purpose

Search for a **simpler, cheaper and easier-to-understand way to realize the same accepted meaning** without creating a predictable evolution/change problem.

This Lens is deliberately different from the WEUC Lens:

```text
WEUC Lens / L5
= how architecture/Target structure behaves under current + future change;
  which seams/paths/global architecture positions are justified

Simplicity Lens
= whether the current candidate can be made materially simpler now
  while still respecting accepted evolution constraints from current map/Decision owners
  and any L5-derived meaning accepted through Core Finding Disposition
```

The Lens is not “minimize file count” or “remove abstractions by default”. It asks whether each abstraction, owner, hop, mapping, test layer or mechanism **earns its cost**.

## Applicability Gate

Activate when a Domain/Slice/Test/UI/Cross-Cutting/architecture candidate contains material structural choice, especially when one or more of these are present:

```text
several abstraction layers / wrappers / interfaces
long orchestration or call chain
many owners/entities for one useful result
repeated mappings or representation changes
several state owners
several files/artifacts for one small responsibility
multiple test layers/fixtures for the same property
speculative extension seams
ceremonial Domain patterns
configuration/indirection that is hard to explain locally
```

Also activate when a reviewer/agent has the concrete question:

```text
“Have we over-designed this?”
“Can we implement the same thing with fewer moving parts?”
“Can we remove a layer without making the next known change worse?”
```

## Target Inputs / Evidence

```text
current Target + accepted semantic owners
candidate Ideas / implementation plan / test design
current implementation/workspace when available
accepted current architecture Decisions from natural owners
relevant Scenario future/change meaning
Strategy May Change / planned future Slice meaning
Slice/Cross-Cutting Evolution Steps + resolved Implementation Outlooks
relevant <owner>.evolution.md representation only when already justified
L4 dependency/change surface
L5 Evolution / Change Isolation findings
L6 proof/operation findings
observed implementation friction when available
```

Accepted owner-local evolution meaning is constraint/evidence for simplification, not a second semantic authority over Scenario/Domain meaning.



## Analysis Surface

### Primary Result Units / Semantic Selectors

- semantic selectors over selected Domain/Slice/Test/UI/Cross-Cutting/architecture Result Units whose implementation cost/complexity is material

### Conditional Result Units / Semantic Selectors

- `RU-DOM-01`, `RU-SLICE-*`, `RU-XC-*`, `RU-TDES-*`, `RU-TSTRAT-*` as applicable

### Relevant State Units

```text
Questions
Ideas / Planning Branches when comparison is material
Q/R/P
Decisions
Evidence / Evidence Needs
Revalidation state
```

### Context

- current implementation/workspace
- accepted invariants/Decisions
- expected evolution
- Evidence about implementation/operational cost

Context availability does not mean this Lens audits all context. The deliberate focus remains the Result/State meaning named above.

## Supported Operations

```text
ANALYZE
CHECK
REFINE
CHALLENGE
```

- `ANALYZE` inspects the Analysis Surface through this Lens perspective.
- `CHECK` evaluates current meaning against this Lens's criteria/guards.
- `REFINE` surfaces a proposal for more precise/missing meaning where the semantic destination is already understood.
- `CHALLENGE` surfaces reasons selected/accepted meaning may be weak, stale, unsupported or wrong.

`REOPEN`, State-Unit creation/refinement, cross-owner handoff and Result Unit update after resolution are Core Finding-Disposition/lifecycle consequences, not Lens methods.

## Complexity Classification / Work Cost

Classify material current structure when useful:

```text
ESSENTIAL / INTENTIONAL
  required by accepted semantics, real boundaries, proof/operation or accepted evolution

ACCIDENTAL
  historical/structural complexity not required by current meaning

SPECULATIVE
  added for imagined future value without accepted/planned pressure

LEGACY
  retained for compatibility/migration/history and should be consciously paid for
```

Also evaluate human work cost:

```text
understanding / discoverability
working-context switching
mutation/change effort
verification effort
runtime/operation burden
```

These dimensions are evidence for simplification, not a requirement to minimize every file/class count.

## Complexity Inventory

Before proposing simplification, make the current cost visible proportionally:

```text
semantic owners / entities involved
abstractions / interfaces / factories / wrappers
runtime hops / orchestration steps
mappings / transformations
state boundaries
persistence / transaction boundaries
files / artifacts that must change together
configuration switches
separate test layers / fixtures / helper objects
operational/diagnostic steps
```

Do not optimize the count mechanically. The inventory exists to make accidental cost visible.

## “Pays For Itself” Check

For every material layer/abstraction/owner ask:

```text
What concrete problem does this solve now?
What accepted invariant/boundary does it protect?
What dependency or change direction does it isolate?
What proof/operation need requires it?
What planned/probable evolution path reuses it?
What breaks if it is removed or merged?
```

If there is no good answer, classify the element as a simplification candidate rather than inventing a future justification.

Typical suspicious patterns:

```text
interface with one implementation and no credible boundary/evolution need
factory wrapping trivial construction
service → facade → orchestrator → workflow service for one action
DTO → intermediate model → command → second DTO with no semantic boundary
Domain Entity created only to mirror one table/JSON object
several repositories coordinating one atomic invariant that belongs together
Page/Test Object hierarchy that hides the Scenario story
integration test + E2E + unit test all proving the same shallow fact
```

## Simplification Search

Generate at least one materially simpler candidate when complexity is material:

```text
REMOVE
  unnecessary wrapper/abstraction/helper/file

MERGE
  owners/layers that have no independent semantic or evolution reason

INLINE
  one-use indirection whose name/boundary adds no durable value

REUSE
  existing owner/seam rather than create parallel machinery

DEFER
  abstraction/extension mechanism until its trigger becomes real

MOVE
  responsibility to its natural semantic/current owner
```

Compare the simpler candidate to the current candidate, not to an imaginary perfect architecture.

## Evolution-Safety Check

A simplification is only acceptable after checking both global and local evolution planning:

```text
Current Global Architecture Position
+ relevant global planned/probable paths
+ prepared extension points
+ relevant local <owner>.evolution.md
↓
Would simplification:
  destroy an already-justified seam?
  increase change-axis leakage?
  make a near/planned extension non-local?
  force unrelated owners to change?
  make the transition trigger more expensive or ambiguous?
```

If yes, keep the justified structure or search for another simplification.

If no, prefer the simpler current structure and defer speculative complexity.

This is the core balance:

```text
minimum sufficient structure now
+
credible change isolation for known/plausible evolution
```

not:

```text
minimum lines now
```

and not:

```text
maximum extensibility now
```

## Domain Use

For Domain planning, look for unnecessary conceptual machinery without weakening real meaning:

```text
too many Entities / Value Objects / Services / Aggregates
pattern names without evidence
multiple owners for one invariant
coordination created by a bad Aggregate split
abstraction reflecting ORM/API shape rather than Domain meaning
```

Guard:

```text
implementation convenience cannot redefine Domain truth
```

The Lens may suggest a simpler Domain model, but it does not decide Domain semantic correctness. Core Finding Disposition resolves the finding to the Domain Target/accepted Domain owner when warranted; that Target's normal Decision authority determines accepted semantic meaning.

## Slice / Implementation Use

For Slice planning, inspect the full useful-result path:

```text
actor/input
→ frontend
→ application entry
→ orchestration
→ Domain
→ persistence/integration
→ result
```

Ask whether the result can be delivered with fewer material hops/owners while preserving boundaries justified by semantics/evolution.

Especially challenge:

```text
layer-for-layer architecture
parallel command/facade/orchestrator chains
unnecessary adapters on stable internal calls
premature event buses/queues
multiple mapping layers
shared abstractions used by only one Slice
```

## Testing Use

For Test Strategy/Test Design, simplify proof as well as production design:

```text
Is the cheapest credible proof layer being used?
Are several test layers duplicating the same property?
Does a Test Object/helper hide more meaning than mechanics?
Can setup/fixtures be made smaller and more local?
Is an integration test exercising real Slice collaboration rather than framework ceremony?
Is a unit test focused on isolated complex logic rather than mocking every collaborator?
```

Do not remove a proof layer when it observes a genuinely different boundary/property.


## Reusable Command Surface

Methodology surface key: `lenscmd.simplicity.check`  
Canonical user intent: `проверь можно ли упростить <target>`

Use this direct Lens command when the simplification challenge itself is the stable user intent. It activates this Lens against the selected existing Target/owner scope; it does not create a Simplicity Target Module.

```text
When To Use:
  a Domain/Slice/Test/Frontend/architecture candidate may contain excessive
  abstractions, entities, hops, mappings or proof machinery and should be challenged
  for a simpler implementation without sacrificing accepted semantics/evolution.

What You Get:
  complexity inventory + unpaid-complexity findings + evolution-safe simpler
  candidate(s) + what must remain and why + current-Target Decision/QRP inputs.
```

## Typical Findings

```text
complexity inventory — proportional
unpaid / weakly justified complexity
simpler candidate(s)
what can be removed / merged / inlined / reused / deferred
what must remain and why
relevant global/local evolution constraints
change-cost comparison
selected simplification Answer Decision input
Q/R/P when unresolved
revalidation trigger when deferred complexity may become justified
```



## Finding Contract

The items above are `Finding Candidates`, not Lens-owned State Unit kinds or direct Result mutations.

A material finding may expose proportionally:

```text
Meaning
Affected Unit(s) / fields — when known
Evidence / rationale
Materiality hint — optional
Likely semantic owner — optional hint
Suggested lifecycle consequence — optional hint
```

Core [`Finding Disposition`](../../../../idtspe-core/shared/finding-disposition-contract.md) resolves the actual State/lifecycle/owner destination. Normal authority/resolution must occur before accepted Result Unit meaning changes.

This Lens does not define new Result Units or target-result fields. If repeated findings reveal missing target-result meaning, revise the appropriate Target Module/Local Target Contract or let Core disposition the finding to another owner.

## Typical Consumers

```text
TM-DOMAIN-DISCOVERY / Domain-Aggregate Modeling
TM-SLICE-STRATEGY
TM-IMPLEMENTATION-SLICE
UI-heavy TM-IMPLEMENTATION-SLICE / Local Target when independently substantial
TM-CROSS-CUTTING-CONCERN
TM-TEST-STRATEGY
TM-TEST-DESIGN
bounded architecture Local Target when independently material
```

## Artifact / File Implications

### Structured Artifact / File Guidance

```text
ARTIFACT_GUIDANCE
ID: AG-SIMP-01
CONTENT_KIND: SIMPLIFICATION_DECISION_OR_FINDING
WHEN: simplification analysis materially changes or constrains the current Target plan
GUIDANCE: EMBED_WITH_CURRENT_TARGET
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Target only when Core Finding Disposition resolves the accepted simplification/retained-complexity meaning there; otherwise resolved owner
REPRESENTATION: EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <current-idtspe-owner>
CONTENT: accepted simplification/retained-complexity Decision; removed/merged/deferred structure; justification; evolution constraints that must remain; reconsider trigger when relevant
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

The Lens does not create a dedicated “simplicity file” by default. Accepted conclusions belong with the Target whose plan changed. If simplification exposes a genuinely cross-owner architecture question, surface a Finding Candidate. Core Finding Disposition keeps local meaning with its natural owner or routes an independently substantial workspace-wide problem through ordinary Target Formation / a Local Target Contract.

## Guards

```text
simpler ≠ fewer files at any cost
simpler ≠ procedural/anemic Domain by default
simpler ≠ remove every interface with one implementation
simpler ≠ ignore planned evolution
future possibility alone ≠ justification for complexity
current implementation convenience ≠ semantic authority
Lens finding ≠ project-global architecture authority
```

## Composition

```text
L4
→ what depends on what / blast radius

WEUC Lens / L5
→ global + local evolution/change fitness and justified architecture seams

Simplicity Lens
→ search for the lowest-cost structure that still satisfies those constraints

L6
→ ensure the simplified candidate remains provable/observable/operable
```

The lenses may be applied iteratively:

```text
candidate
→ L5 evaluates evolution pressure and may surface a Finding Candidate
→ Core Finding Disposition resolves any accepted evolution constraint / Decision input
→ Simplicity evaluates unpaid structure and may surface a simplification Finding Candidate
→ Core Finding Disposition resolves retained/removable-complexity meaning
→ L6 evaluates proof/operation and may surface a Finding Candidate
→ Core Finding Disposition
→ Answer Decision only when the relevant State/owner consequence is resolved
```

## Escalation / Revalidation

If simplification exposes a genuinely workspace-wide architecture consequence, surface a Finding Candidate; Core disposition/Target Formation resolves the natural owner or bounded Local Target when independently material.

If a deferred abstraction later reaches its documented trigger, repeat the current Target in `REFINE`/`REVALIDATE` and re-run this Lens with current evolution evidence.

## High-Level Example — Self-Contained Walkthrough

### Situation

A Capture Slice has this proposed implementation path:

```text
CaptureController
→ CaptureCommandHandler
→ CaptureFacade
→ CaptureOrchestrator
→ CaptureWorkflowService
→ CaptureDomainService
→ CaptureRepository
```

There is one current capture operation. Accepted Scenario/Slice future meaning says:

```text
PDF capture is planned.
New sources should reuse core capture behavior.
A source-normalization seam is a prepared extension point.
Review behavior should not change when capture source changes.
```

The local Slice evolution plan expects PDF input to enter through the same application capture route.

### Why This Lens

Accepted/dispositioned evolution meaning derived from L5 evaluation tells us **which seam matters for future change**. The open question is whether the current implementation still contains more machinery than that accepted evolution requires.

### Walkthrough

Inventory the current candidate:

```text
6 orchestration/service abstractions before persistence
3 wrappers with no independent state/invariant/boundary
2 mappings that preserve identical information
1 prepared source-normalization seam justified by EV-PDF
```

Ask what each layer pays for.

Findings:

```text
CaptureCommandHandler
  useful only if it is the selected application entry; otherwise duplicate

CaptureFacade
  no separate responsibility

CaptureOrchestrator
  no separate responsibility

CaptureWorkflowService
  duplicates application orchestration

CaptureDomainService
  no cross-Entity rule; CaptureItem owns the rule directly

Source normalization boundary
  justified by planned PDF change and should remain
```

Simpler candidate:

```text
CaptureController
→ CaptureApplicationService.capture(...)
→ CaptureItem.create(...)
→ CaptureRepository.save(...)
```

with source-specific normalization before the application call:

```text
BrowserSelectionMapper ─┐
                       ├→ capture(...)
PdfSelectionMapper     ─┘
```

Now check evolution safety:

```text
PDF capture
→ add PdfSelectionMapper
→ reuse CaptureApplicationService
→ reuse CaptureItem
→ Review unchanged
```

The simpler candidate therefore removes four unpaid layers while preserving the one seam the evolution map actually justifies.

### Result

The Slice Answer Decision records:

```text
REMOVE CaptureFacade
REMOVE CaptureOrchestrator
REMOVE CaptureWorkflowService
KEEP one application orchestration owner
KEEP source normalization seam
DEFER additional source abstraction machinery until a concrete trigger requires it
```

### Boundary / Lesson

The Lens did not choose “fewest classes”. It chose **minimum sufficient current structure that still keeps the already-planned PDF extension local**.

That is the intended meaning of implementation economy.

## Knowledge Basis

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- Prefer the minimum sufficient current structure after accounting for semantic obligations and already-justified evolution seams.
- Abstractions/owners/hops/test layers must pay for themselves in current value, risk reduction or credible evolution isolation.

**Referenced Knowledge Owners:**

- `NONE`

**Reference Load Policy:**

No external knowledge body is required for normal use.

**Operationalization Notes:**

Current implementation/evolution plans are Target Inputs; simplicity/economy principles are owned here.

## Provenance

Introduced during repository-migration reconciliation to preserve the useful realization-sanity intent while replacing the old realization workflow with a reusable IDTSPE Lens. The evolution/work-cost architecture checks remain owned by the existing WEUC Lens rather than by this Lens.
