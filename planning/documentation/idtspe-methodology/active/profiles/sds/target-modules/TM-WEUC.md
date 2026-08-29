
# TM-WEUC — Workspace Evolution Map / WEUC Planning

Entry Point: `tm.weuc`  
Role: primary optional cross-cutting planning Target Module  
Target form: `WORKSPACE_EVOLUTION_MAP`
Global architecture scope: `WORKSPACE_ARCHITECTURE_POSITION` inside the same Target family; no separate mandatory Architecture Target Module

## Purpose

Create, refine or extend the canonical **Workspace Evolution Map** that interprets the ordinary product/development plan from the point of view of future Workspace change **and owns the current project-global architecture position needed across independent Targets**.

The global architecture position includes only workspace-wide architecture decisions, principles/defaults and structural conventions that multiple future/current Targets need to know. It does not absorb Scenario behavior, Domain meaning, Slice-local realization choices or every implementation detail.

The ordinary Evolution Map answers mainly:

```text
what is expected/planned to change
roughly when
what future capability/result is intended
```

`TM-WEUC` answers a different question:

```text
given that product/development evolution,
what is likely to have to change in the Workspace,
what global architecture position should constrain/default multiple Targets now,
where should evolution remain isolated,
which architectural forms/extension points are justified,
and what high-level future change paths should be remembered?
```

Canonical physical projection:

```text
SDS-PLANNING-STATE/SDS-WORKSPACE-EVOLUTION.md
```

The map may start as a mostly narrative interpretation and later become concrete enough to mention actual files/classes/methods/tests.

## High-Level Example — Self-Contained Walkthrough

### Situation

The normal Evolution Map already says:

```text
EV-17:
  add PDF capture after browser capture

EV-22:
  support multiple long-term destinations later

EV-31:
  offline capture is plausible but not committed
```

No detailed implementation plan exists yet.

### Why This Module

Those Evolution Items say **what** may happen, but they do not explain what that means for Workspace design.

`TM-WEUC` creates one reusable interpretation that Domain, Slice, Frontend and architecture planning can later consume.

### Walkthrough

Early interpretation may be intentionally loose:

```text
Capture-source evolution:
  new capture sources are expected.
  Core capture behavior should ideally remain reusable.
  Source-specific change should not leak into unrelated Review logic.

Destination evolution:
  destinations are likely to multiply later.
  Destination-specific behavior should remain separable from capture-source behavior.

Offline evolution:
  not current.
  may eventually require local durable state + synchronization.
  do not add synchronization complexity yet.
```

After architecture and codebase owners are known, the same map may become more literal:

```text
EV-17 PDF Capture

frontend/
  [NEW] PdfCaptureEntry
  → [NEW?] usePdfSelection()
  → [REUSE] captureFeature.commands.capture(...)

server/
  [REUSE] CaptureController.capture(...)
  → [REUSE] CaptureApplicationService.capture(...)

domain/
  [REUSE] CaptureItem
  [REUSE] SourceContext

integration/
  [NEW] PdfSelectionMapper

tests/
  [NEW] PDF capture integration test
  [REUSE] generic capture behavior tests
```

If `CaptureSource` was intentionally introduced to support this direction, the map records that prepared extension point and how it is meant to be used.

The same Target may also record a current project-global architecture position once enough evidence exists. For example:

```text
ARCH-G-01
Strength: CURRENT_DEFAULT
Applies to: implementation delivery structure
Position: ordinary feature work is organized around vertical Slice/feature ownership rather than global technical-layer buckets.
Why: planned new sources/destinations should stay locally changeable.

ARCH-G-02
Strength: PREFERRED
Applies to: Domain modeling
Position: explicit Domain owners carry behavior/invariants when real domain meaning exists; do not force DDD artifacts into every area.
Why: semantic ownership is valuable, ceremony without domain meaning is not.

ARCH-G-03
Strength: PREFERRED
Applies to: feature code folders/packages
Position: prefer semantic/feature-owner organization; keep genuinely shared runtime/infrastructure separate.
Why: expected change is mostly feature/source/destination-local.
```

These are current project-global architecture defaults, while the `[NEW]/[REUSE]` PDF path remains future planning.

### Result

The Target produces/updates one Workspace Evolution Map containing, proportionally:

```text
interpretation of planned/possible evolution
important change directions/concerns
current global architecture position when project-wide decisions/defaults exist
planned/probable high-level change paths
prepared extension points
transition conditions
references to local *.evolution.md plans
```

### Boundary / Lesson

The Workspace Evolution Map is **not** the main product roadmap and does not replace `SDS-EVOLUTION-MAP.md`.

It also does not make speculative future code part of current semantic truth.

Current owner representations still describe what is selected/true now; evolution representations describe how those owners may/plannedly change later. Either side may be a section, dedicated artifact, or another justified representation resolved through the Documentation / Representation Lens.

## Global Architecture Position — Same Owner, Explicit Scope

`TM-WEUC` is also the canonical project-level owner for architecture decisions/principles/conventions whose applicability is wider than one Domain/Slice/Frontend/etc. Target.

A valid scoped invocation is:

```text
TM-WEUC
Target Scope: WORKSPACE_ARCHITECTURE_POSITION
Analysis subject: whole Workspace architecture

+ current SDS-WORKSPACE-EVOLUTION
+ current Workspace
+ relevant Domain/Slice/Frontend/Cross-Cutting owners
+ current/planned Evolution Items
+ accepted local architecture Decisions
↓
compare candidate project-global architecture principles/defaults
↓
check them against planned/probable change paths
↓
select / refine / revalidate global architecture position
↓
UPDATE Current Global Architecture Position
in SDS-WORKSPACE-EVOLUTION.md
```

This does **not** introduce `TM-ARCH` or make architecture a universal standalone Target family. The IDTSPE Target is still `TM-WEUC`; the scope being reasoned about is the whole Workspace architecture.

Typical global content includes, when justified:

```text
architecture decomposition default
vertical-slice / feature / layer organization choice
Domain modeling posture such as where explicit Domain owners are expected
dependency-direction rules
shared-vs-local ownership defaults
integration/adapter conventions
folder/package organization principles
prepared global seams
architecture transitions + triggers
```

Do not persist slogans such as `use DDD` or `use vertical slices` without project meaning. Persist the project-specific decision, its applicability and why current evolution/Workspace evidence justifies it.

Recommended strength vocabulary is intentionally small:

```text
REQUIRED
  project-global constraint; deviations require explicit reason/revalidation

PREFERRED
  strong project preference; exceptions are allowed when locally justified

CURRENT_DEFAULT
  current default shape; not a rule when another shape is clearly better
```

A local architecture Answer Decision remains owned by its local Target. When the WEUC Lens discovers that the decision may need to constrain/default multiple independent Targets, it surfaces a **global architecture-position update Finding Candidate** with `TM-WEUC` as a likely-owner hint. Core Finding Disposition resolves the actual global owner/handoff before `TM-WEUC` accepts or revalidates project-global meaning.

## Operating Modes

### `EARLY_INTERPRETATION`

Use when the product plan/Application/Scenario direction exists but architecture/code owners are still unclear.

The map can be mostly narrative:

```text
what tends/plans to change
what probably should remain isolated
what must not be coupled accidentally
where a future transition may become necessary
```

### `PROJECTED_WORKSPACE_EVOLUTION`

Use when enough architecture/codebase structure exists to write approximate future change paths.

Literal references are encouraged when known:

```text
[REUSE] existing owner/call
[EXTEND] existing owner/call
[NEW] likely new owner/call
[NEW?] possible new owner/call; not selected yet
[REMOVE] likely retirement
[LOCAL PLAN] detailed future path is represented through the target-local L5/WEUC result when separately justified
```

These are planning projections, not implementation commitments unless independently accepted.

### `EXTEND_REFRESH_RECONCILE`

Use when:

```text
new Evolution Items are accepted
new likely change directions become credible
architecture/domain/slice decisions change the expected paths
an actual change reveals the old projected path was wrong
```

Update the canonical map rather than creating disconnected local WEUC notes.

## Upstream Source Contract

### Direct Planning Sources

```text
SDS-EVOLUTION-MAP.md
Application Definition / core real-life direction
selected Scenario system when available
current accepted architecture Answer Decisions when available
current Workspace structure when available
```

### Supporting Sources / Evidence

```text
observed past Workspace changes
current implementation/repository/docs
Prototype / Practical Evidence when it changes evolution assumptions
Domain/Slice/Frontend/Cross-Cutting owners
local <owner>.evolution.md companions
accepted future intent from other planning Targets
```

### Constraint / Planning-State Sources

```text
accepted non-goals
platform/integration constraints
migration/compatibility constraints
known delivery horizon only when it changes evolution interpretation
```

### Source Discovery Rule

This list is an archetype only; current `TF-04 SOURCE_SET` remains authority.

Loose Ideas can inspire questions, but do not become planned evolution merely by appearing in the map.

## Knowledge Basis

Shared contract: [`knowledge-basis-contract.md`](../../../idtspe-core/shared/knowledge-basis-contract.md)

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- TM-WEUC owns the canonical Workspace Evolution Map and Current Global Architecture Position when those global results are material.
- Local architecture/evolution Finding Candidates remain with the current Target only when Core Finding Disposition resolves that owner; project-global implications may carry `TM-WEUC` as a likely-owner hint, but actual global handoff/update is a Core disposition consequence.
- Target-local evolution companion meaning is not Target Module output: WEUC/L5 may supply an `AG-L5-02` representation proposal only over local evolution meaning accepted/resolved through Core Finding Disposition; Documentation / Representation + P-14 / TF-10 decide the actual embed/split/materialization.

**Referenced Knowledge Owners:**

`NONE`

**Reference Load Policy:**

No additional Knowledge Basis body is required by default; reusable architecture/evolution evaluation knowledge remains in WEUC/L5.

**Operationalization Notes:**

This Knowledge Basis supports planning this recurring Target/result family. It is not a current Target Source, project truth or Decision. Reusable cross-Target evaluation knowledge remains in the Lens owners named by this module's `Lens Profile`; do not duplicate their Operational Evaluation Contract or Knowledge Basis here.

## Question Set Examples — Non-Exhaustive

```text
What does the current SDS-EVOLUTION-MAP imply for future Workspace change?
Which changes are planned vs merely plausible?
Which parts of the system are naturally expected to vary?
Which changes should remain isolated from which other owners?
Where would one object's change axis currently leak into unrelated owners?
Which architecture seams are justified by the plan, and which would be premature?
What future transition may become necessary, and what should trigger it?
Which high-level future paths can already be written using actual owners/files/classes/methods/tests?
Which prepared extension points were intentionally created and how should future work reuse them?
Which architecture decisions/principles/defaults must be known across multiple independent Targets?
Which of those are REQUIRED vs PREFERRED vs merely CURRENT_DEFAULT?
What project-specific meaning does a principle such as DDD, vertical slicing or feature-oriented folders have here?
Which folder/package/dependency/ownership conventions materially affect expected change paths?
Which local architecture Decision should be promoted into the global architecture position, and why?
Which details belong in a target-local L5/WEUC result rather than the global map?
Which already-justified local Evolution section/companion should be referenced or refreshed through L5/AG-L5-02?
What actual implementation evidence invalidates an old projected path?
```

## Lens Profile

Generic required Core Pack:
- [`LENS-NEED-VALUE-SCOPE`](../../../idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) — ensure the map serves real expected/planned evolution rather than speculative abstraction.
- [`LENS-AUTHORITY-SOT-REUSE`](../../../idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) — keep `SDS-EVOLUTION-MAP`, current semantic owners and Workspace Evolution Map roles separate.
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../../../idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) — distinguish committed/plausible future paths and preserve uncertainty.
- [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — required materialization check; preserve global-vs-local evolution meaning with the smallest useful representation and do not create companion files mechanically.

Frequent conditional:
- [`LENS-DEPENDENCY-CHANGE-IMPACT`](../../../idtspe-core/lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md) — when actual dependency/change surface is known enough to inspect.
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — when future architecture affects proof/diagnosis/operation.
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — only material quality/risk directions.

`LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` normally **consumes** the map produced by this Target; it is not required for ordinary map creation and therefore is not a mandatory self-lens. For `Target Scope: WORKSPACE_ARCHITECTURE_POSITION`, however, L5 is the primary reusable evaluation Lens used to compare candidate global architecture principles/defaults against the current map and expected evolution.

## Resolution / Production Method

This module uses the existing `Upstream Source Contract`, `Question Set Examples`, `Lens Profile`, Knowledge Basis and any module-specific Idea/branch/pattern aids to produce/refine the declared Result Units. Concrete Questions, Ideas, Q/R/P, Decisions and Evidence remain Core State Units.

Default reusable production path:

```text
interpret product evolution → separate current global architecture truth from future transition projections → record useful future paths → justify prepared extension points → link local evolution companions without duplicating them
```

Current Global Architecture Position is current project-global truth; future paths remain projected planning until independently selected.

A Lens may surface Finding Candidates while this method runs. Their State/lifecycle/owner destination is resolved by the Core [`Finding Disposition Contract`](../../../idtspe-core/shared/finding-disposition-contract.md); a Lens does not directly mutate accepted Result Units.

## Target Step-Result Contract

**Target Step Result:** `Workspace Evolution / Architecture Position`

The possible result surface is proportional/sparse. Generic IDTSPE State is not duplicated as target-specific fields.

| Result Unit | Meaning | Current projection detail |
|---|---|---|
| `RU-WEUC-01` | Evolution Interpretation | Workspace Evolution Map identity + interpreted evolution source/maturity/scope + Evolution Interpretation |
| `RU-WEUC-02` | Current Global Architecture Position | current project-global architecture decisions/principles/defaults/conventions |
| `RU-WEUC-03` | Architecture Evolution / Transition Position | future architecture transition + trigger + preparation tax/seam |
| `RU-WEUC-04` | Planned / Probable Evolution Paths | high-level future paths at current precision |
| `RU-WEUC-05` | Prepared Extension / Local Evolution Reference Map | Prepared Extension Points + Local Evolution Plan References |

Only applicable/material Result Units are projected for one concrete Target step. Result Unit identity does not imply a separate Target or file.



### Workspace Evolution Map Identity

**Map / SDS ID** — project/application planning-state identity.

**Interpreted Product Evolution Source** — current `SDS-EVOLUTION-MAP.md` ref/version/state.

**Interpretation Maturity** — optional simple note such as `EARLY`, `PROJECTED`, `REFRESHED`; do not create a complex lifecycle unless needed.

**Target Scope** — normally the map as a whole; may be `WORKSPACE_ARCHITECTURE_POSITION` when the IDTSPE instance is specifically reviewing/forming project-global architecture.

### Evolution Interpretation

Mostly free-form, but should explain:

```text
what is expected/planned to change
what is only plausible
rough timing/sequence when meaningful
what likely varies repeatedly
what should remain stable/isolated
why this interpretation follows from current Sources
```

No mandatory Change-Axis object schema is required.

### Current Global Architecture Position

Record project-global architecture decisions/principles/defaults/conventions that multiple independent Targets need to consume. This subsection is **current project-global architecture truth**, unlike future projected paths.

For each material item prefer a compact form such as:

```text
ARCH-G-<n>
Strength: REQUIRED | PREFERRED | CURRENT_DEFAULT
Applies to: <workspace/feature/slice/domain/frontend/etc scope>
Position: <selected project-global architecture decision/principle/convention>
Why: <current Workspace + evolution evidence>
Exceptions / revalidation trigger: <when the default may be challenged>
Provenance: <local/global Answer Decision refs when useful>
```

Typical content:

```text
primary decomposition / vertical-slice posture
Domain modeling posture without forcing DDD everywhere
feature-vs-layer folder/package organization
dependency direction
shared-vs-local ownership default
integration/adapter conventions
current intended global seams
where direct/simple structure is intentionally retained
```

A local architecture Answer Decision is not copied here merely because it is architectural. Promote/reference it here only when its applicability becomes project-global.

### Architecture Evolution / Transition Position

Record architecture changes that are not current yet but matter for future evolution:

```text
future architecture transition that may become necessary
trigger/condition for that transition
prepared seam that supports the transition
accepted preparation tax when material
```

These transition projections are future planning, not current architecture truth until independently selected.

### Planned / Probable Evolution Paths

For material evolution items/areas, write a high-level path at the precision currently possible.

Early:

```text
new capture source
→ new entry/integration adapter
→ reuse core capture behavior
→ new integration proof
```

Later:

```text
[NEW] PdfCaptureEntry
→ [NEW] PdfCaptureSource.capture(...)
→ [REUSE] CaptureApplicationService.capture(...)
→ [REUSE] CaptureItem.create(...)
→ [REUSE] CaptureRepository.save(...)
→ [NEW] PdfCaptureIntegrationTest
```

Approximation is allowed and should be visibly marked with `[NEW?]` / prose uncertainty.

### Prepared Extension Points

When an abstraction/seam exists specifically to make expected evolution easier, preserve the reason and intended reuse:

```text
Extension point
Why it exists
Which planned/probable evolution it serves
How future work is expected to use it
What not to bypass/couple around it
```

### Local Evolution Plan References

Reference optional target-local companions:

```text
domain/CaptureItem.evolution.md
slices/SL-CAP-01.evolution.md
frontend/CaptureFeature.evolution.md
```

Do not duplicate their detailed local path in the global map.

## Artifact / File Contract

### Structured Artifact / File Proposals

These proposal records are the Target Module's local placement guidance. [`ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) projects them into the annotated SDS materialization tree; this Target Module remains the source.

```text
ARTIFACT_PROPOSAL
ID: AP-WEUC-01
CONTENT_KIND: WORKSPACE_EVOLUTION_MAP
WHEN: material workspace-evolution interpretation exists
GUIDANCE: REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current TM-WEUC Target / Workspace Evolution Map owner
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: SDS-PLANNING-STATE/SDS-WORKSPACE-EVOLUTION.md
CONTENT: interpretation of Evolution Map; current global architecture position (decisions/principles/defaults/conventions); expected change directions; approximate future paths; prepared extension points; transition conditions; local-plan references
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```



Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

**REQUIRED global owner** — material Workspace-evolution interpretation **and accepted current global architecture position** are canonically persisted in `SDS-PLANNING-STATE/SDS-WORKSPACE-EVOLUTION.md` (or the workspace-equivalent single owner selected by profile).

`SDS-EVOLUTION-MAP.md` remains the product/system plan; Workspace Evolution is its architectural/change-path interpretation and must not replace it.

**Local companion references** — this Target Module does not propose target-local evolution companions. When Core Finding Disposition has accepted/resolved target-local evolution meaning and L5/WEUC `AG-L5-02` proposes a supporting representation for it, Documentation / Representation + P-14 / TF-10 decide whether an Evolution section / `<owner>.evolution.md` is materialized. The global Workspace Evolution owner may reference that accepted local detail instead of duplicating it.

**Do not duplicate** the same future path as equal canonical content in global and local files: choose the detail owner and link/reference it.

`P-14` must identify global-map updates, references to already-materialized local companions, and any evolution content whose representation/placement is still unresolved. L5/WEUC owns only the `AG-L5-02` supporting-representation proposal over accepted/dispositioned local evolution meaning; Documentation / Representation decides embed vs split and P-14 / TF-10 resolves the actual path/materialization.

## Validators

```text
map clearly derives from current Evolution Map / accepted planning Sources
planned vs plausible evolution remains distinguishable
future projections are not mistaken for current truth; `Current Global Architecture Position` is explicitly current project-global architecture guidance
important prepared extension points have remembered purpose/use
local details are referenced rather than duplicated globally
architecture preparation has an evidence/planning basis
global architecture items declare REQUIRED/PREFERRED/CURRENT_DEFAULT strength and applicability
project-global architecture position does not redefine Scenario/Domain semantics
current Domain/Slice/etc owners remain authoritative for their local semantic/current truth
a new credible global evolution concern has one canonical map location
```

## Handoff

```text
SDS-WORKSPACE-EVOLUTION.md
→ reusable Source for LENS-WORKSPACE-EVOLUTION-ARCHITECTURE
→ Domain / Slice / Frontend / Cross-Cutting planning through that Lens

material local future path
→ L5/WEUC Lens evaluation
→ local evolution Finding Candidate
→ Core Finding Disposition resolves accepted local State/owner consequence
→ AG-L5-02 may propose an Evolution section / <owner>.evolution.md
→ Documentation / Representation + P-14 / TF-10 decide actual materialization
→ TM-WEUC may reference accepted local evolution meaning when useful

new/changed local architecture may affect projected global paths
→ global-update Finding Candidate + likely TM-WEUC owner hint
→ Core Finding Disposition
→ refresh Workspace Evolution Map only when that owner/handoff is selected

local architecture Decision may become project-global
→ global-architecture-position Finding Candidate + likely TM-WEUC owner hint
→ Core Finding Disposition
→ update TM-WEUC / Current Global Architecture Position only when that global owner/handoff is selected

whole Workspace architecture review
→ TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION + L5
```
