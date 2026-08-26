
# LENS-WORKSPACE-EVOLUTION-ARCHITECTURE — WEUC / Target Evolution / Architecture Fitness

Lens ID: `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`  
Short name: `WEUC Lens`  
Legacy alias: `L5`  
Activation: `FREQUENT_CONDITIONAL`

## Purpose

Apply the **current Workspace Evolution Map — including its Current Global Architecture Position —** to a selected IDTSPE Target, its Ideas/Branches and its architecture/realization decisions.

The selected subject may also be the **whole Workspace architecture**. In that special case the Lens runs inside a `TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION` scope so accepted project-global conclusions still have one canonical owner.

The Lens does not own the global evolution map or the Current Global Architecture Position, and it does not silently create project-global architecture authority.

Its core job is:

```text
current SDS-WORKSPACE-EVOLUTION
  including Current Global Architecture Position
+ selected Target / current Workspace
+ current Ideas / candidate Decisions
↓
identify relevant planned/probable future changes
↓
project how this Target would have to change
↓
check change isolation / coupling / prepared seams
↓
compare Ideas by future change cost + current simplicity
↓
plan target-local evolution when useful
↓
architecture Answer Decision / QRP / Evidence
↓
map-update candidate → TM-WEUC when global interpretation changed
```

## Applicability Gate

Activate when the current Target:

```text
will be realized in a Workspace
already exists in a Workspace and may change
creates a reusable architecture/domain/slice/frontend boundary
has plausible/planned future extensions in SDS-WORKSPACE-EVOLUTION
may make those future paths materially easier/harder
```

Especially common for:

```text
Domain Draft
Slice Strategy
Implementation Slice
Frontend
Cross-Cutting
Application Definition / early architecture shaping
Artifact/File planning
major refactoring/revalidation
whole-Workspace architecture review / global principle formation through TM-WEUC
```

If no Workspace Evolution Map exists yet and future evolution is material, record the gap and route creation/refresh to `TM-WEUC` rather than inventing a disconnected local map.

## Reusable Command Surface

Methodology surface key: `lenscmd.weuc.check`

Canonical user intent:

```text
проверь эволюцию и архитектуру <target>
```

Useful aliases may include:

```text
проверь эволюцию <target>
проверь WEUC <target>
проверь архитектуру <target>
```

The command does **not** create a new Lens-owned semantic Target. It resolves the selected Target and invokes this Lens through the normal IDTSPE Shell.

```text
ordinary Domain/Slice/Frontend/etc target
→ current Target remains authority
→ L5 findings/Answer Decisions/local evolution plan
→ optional global update candidate → TM-WEUC

Target = whole Workspace architecture
→ TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION scope
→ L5 evaluates current/candidate global architecture principles
→ accepted global position persists in SDS-WORKSPACE-EVOLUTION.md
```

Helper commentary:

```text
When To Use:
  when you want to test a Target or the whole Workspace architecture against
  current global architecture position, planned/probable evolution, prepared
  extension points and expected future change paths.

What You Get:
  applicable global architecture/evolution refs; future change-path projection;
  coupling/change-isolation findings; architecture fitness; local Answer Decision
  inputs; optional local evolution companion; and TM-WEUC update candidates.
  For whole-Workspace architecture, the result may select/refine global principles,
  defaults and conventions in Current Global Architecture Position.
```

This command surface is reusable Lens invocation, not one of the 17 Target Module commands.

## Whole-Workspace Architecture As A Valid Lens Target

The reusable Lens command may target an ordinary owner or the whole Workspace architecture:

```text
проверь эволюцию и архитектуру <target>
```

Ordinary example:

```text
Target: domain/CaptureItem.md
→ apply L5 locally
→ local architecture/evolution findings
→ optional CaptureItem.evolution.md
→ global update candidate only when needed
```

Whole-architecture example:

```text
Target: WORKSPACE_ARCHITECTURE
→ host the IDTSPE instance in TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION
→ inspect current global principles/defaults/conventions
→ compare them against planned/probable WEUC paths
→ consider alternatives such as vertical-slice vs technical-layer organization,
  Domain-modeling posture, folder/package conventions, dependency direction
→ accepted global conclusions update Current Global Architecture Position
  in SDS-WORKSPACE-EVOLUTION.md
```

This is how the same Lens can be used to **think about major architecture principles** without introducing a mandatory `TM-ARCH`.

## Target Inputs / Evidence

```text
current Target + Sources
SDS-WORKSPACE-EVOLUTION.md — preferred global evolution interpretation
SDS-EVOLUTION-MAP.md — supporting product/development plan
current semantic owner(s)
current Workspace implementation/docs
accepted architecture Answer Decisions
relevant local <owner>.evolution.md companion(s)
L4 dependency/change findings
L6 proof/operation findings
observed prior changes when available
```

## Current-Map Check

Before evaluating candidate Ideas, ask:

```text
Which current Workspace Evolution items/concerns touch this Target?
Which Current Global Architecture Position items apply to this Target?
Are they REQUIRED, PREFERRED or CURRENT_DEFAULT, and is an exception justified?
Which planned changes are near/committed vs merely plausible?
Which prepared extension points already exist for them?
Which old projected paths does the current Target need to preserve or revise?
```

Do not evaluate the Target only for today's result when the current map already contains material future evolution.

## Target Evolution Planning

For the current Target, explicitly reason about:

```text
what is likely/planned to be added or changed later
what should remain stable
which other owners should NOT have to change
what high-level future path is expected
what extension point/reuse route should be used
what future transition may be required
what condition should trigger that transition
```

When useful, persist an optional companion using:

[`target-evolution-companion-artifact.md`](../../../../idtspe-core/shared/target-evolution-companion-artifact.md)

Typical physical shape:

```text
Current owner:
  domain/CaptureItem.md

Evolution planning companion:
  domain/CaptureItem.evolution.md
```

or:

```text
slices/SL-CAP-01.md
slices/SL-CAP-01.evolution.md
```

Current owner remains current truth; companion is future planning.

## High-Level Future Change Path

The Lens may plan future evolution at approximately the same code-level granularity used by the Slice Integrated Implementation Plan when the structure is known.

Example:

```text
[NEW] PdfCaptureEntry
→ [NEW?] usePdfSelection()
→ [REUSE] captureFeature.commands.capture(...)
→ [REUSE] CaptureController.capture(...)
→ [REUSE] CaptureApplicationService.capture(...)
→ [NEW] PdfCaptureIntegrationTest
```

Allowed notation:

```text
[REUSE]  intended existing seam/owner/call
[EXTEND] existing owner/call changes
[NEW]    likely new owner/call
[NEW?]   possible, still uncertain
[REMOVE] expected retirement
[LOCAL PLAN] detailed path lives in target-local evolution companion
```

This is a future projection, not an implementation commitment unless independently accepted.

## Change Isolation / Leakage Check

For each relevant future change ask:

```text
If X changes, why must Y change?
```

Good coupling has a semantic/architectural reason.

Suspicious case:

```text
new Capture Source
→ requires changing ReviewPolicy
```

when ReviewPolicy has no real dependency on capture source type.

This may indicate **change-axis leakage** / accidental coupling.

The Lens tries to keep independent future change directions isolated without creating speculative abstractions everywhere.

## Prepared Extension Point Check

When a seam/abstraction was introduced for future evolution:

```text
Is the current Idea actually reusing it?
Is the seam still serving the evolution it was designed for?
Are new developers/agents likely to bypass it because its purpose is undocumented?
Has the future assumption disappeared, making the seam unnecessary tax?
```

If the intended extension point matters globally, its purpose belongs in `SDS-WORKSPACE-EVOLUTION.md` through `TM-WEUC`.

## Architecture Fitness / Prepare-Now vs Defer

Compare candidate Ideas/architecture against both current simplicity and relevant future paths:

```text
How much current complexity/tax does the candidate introduce?
Which planned/probable evolution paths become simpler/localized?
Which become harder or more coupled?
Does one change direction leak into unrelated owners?
Can direct/simple structure survive until the future transition is actually needed?
What exact condition should trigger the transition?
```

Architecture remains an ordinary `Answer Decision` inside the current Target by default. If that local Decision should constrain/default multiple independent Targets, emit a global-architecture-position update candidate to `TM-WEUC`. If a bounded architecture problem has an independently useful deliverable and material choice space, generic child Target Formation is still allowed. Whole-Workspace architecture review itself is hosted by `TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION`, not a mandatory `TM-ARCH`.

## Architecture / Workspace Work-Cost Check

Evolution fitness is not only “can we add feature X later?”. The Lens also evaluates the **cost of understanding, changing, verifying and operating the Workspace architecture**.

Core rule:

```text
architecture complexity must be paid for
```

A layer/seam/abstraction may be justified by current meaning, a real boundary, proof/operation needs, or credible evolution. Otherwise its cost is evidence against it.

Use these dimensions proportionally when comparing architecture Ideas:

```text
Understanding / Discoverability / Working-Context Cost
  how many owners/files/concepts must be loaded to understand one responsibility?
  do names and semantic vocabulary make navigation easier or harder?

Mutation / Change Cost
  how many owners/files/boundaries must change together?
  does a change direction remain local?

Verification / Diagnosis / Operation Cost
  how difficult is it to prove, inspect, diagnose and operate the result?

Runtime Path Cost
  how many significant hops/state transitions/remote boundaries exist,
  and which of them are actually necessary?
```

Workspace work itself is a valid architecture input:

```text
read / understand / find / navigate / trace
change / write
inspect / review
verify / diagnose / operate
```

Reusable heuristics:

```text
Semantic DRY — one semantic responsibility/decision should not have several equal authorities
names and vocabulary are part of the navigation interface
composition vs inheritance is a trade-off, not a dogma
interface/Port only where a real or credible boundary pays for it
dependency direction should favor stable semantic owners
state ownership should be explicit
persistence boundary should not silently collapse Domain meaning into ORM shape
sync/async choice should pay for its coordination cost
explicit composition is preferable when hidden wiring obscures ownership
create test seams around real boundaries, not merely to make mocking convenient
reversibility matters when a choice is uncertain/expensive to undo
```

When useful, classify current architecture complexity as:

```text
ESSENTIAL / INTENTIONAL
  required by current meaning/boundary/evidence

ACCIDENTAL
  complexity not required by the problem

SPECULATIVE
  paid now only for an unaccepted/untriggered future possibility

LEGACY
  retained by historical implementation rather than current selected design
```

This check feeds architecture fitness and the Simplicity Lens. It does **not** create a separate architecture/work-cost Lens or a second architecture owner.

## Map Feedback / TM-WEUC Handoff

The Lens may discover that the global map is incomplete or stale:

```text
new credible future change direction
new prepared extension point
local architecture Decision becomes project-global
current global architecture principle/default becomes stale or harmful
architecture Decision changes future path
local evolution plan exposes a global interaction
actual change contradicts projected path
```

The Lens records a **Workspace Evolution Map update candidate** and hands it to `TM-WEUC`.

It does not silently become a second owner of `SDS-WORKSPACE-EVOLUTION.md`.

## Findings / Outputs

```text
relevant evolution-map refs
Target evolution implications
high-level future change path(s)
change-isolation / leakage findings
prepared-extension-point findings
architecture/work-cost findings across Understanding / Change / Verification-Operation / Runtime paths
current complexity classification when useful: Essential/Intentional / Accidental / Speculative / Legacy
architecture Ideas / comparison dimensions
prepare-now vs defer finding
architecture Answer Decision inputs
project-global architecture principle/default/convention findings when Target = WORKSPACE_ARCHITECTURE
optional local <owner>.evolution.md plan
Workspace Evolution Map / Global Architecture Position update candidate → TM-WEUC
Q/R/P
revalidation hooks
```

## Typical Consumers

Application Definition, Domain Discovery/Draft, Slice Strategy, Implementation Slice, Frontend, Cross-Cutting, Artifact/File planning, Testing/Practical Evidence when workspace evolution changes proof/operation, and branch comparison.

## Artifact / File Implications

### Structured Artifact / File Guidance

These records describe conditional placement guidance produced by this Lens. They never create semantic ownership by themselves.

```text
ARTIFACT_GUIDANCE
ID: AG-L5-01
CONTENT_KIND: GLOBAL_WORKSPACE_EVOLUTION_OR_ARCHITECTURE_UPDATE
WHEN: Lens discovers material application/workspace-level evolution path, prepared seam, architecture-transition condition, or project-global architecture decision/principle/default/convention
GUIDANCE: ROUTE_REQUIRED_CANDIDATE
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: TM-WEUC Target / Workspace Evolution Map
REPRESENTATION: UNRESOLVED
FILE_OR_ARTIFACT: SDS-PLANNING-STATE/SDS-WORKSPACE-EVOLUTION.md
CONTENT: proposed global evolution interpretation/path/extension-point/transition update or Current Global Architecture Position update; TM-WEUC decides canonical map content
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_GUIDANCE
ID: AG-L5-02
CONTENT_KIND: TARGET_LOCAL_EVOLUTION_PLAN
WHEN: Lens discovers material future path specific to one Domain/Slice/Frontend/etc owner
GUIDANCE: ADVISORY_PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: base Target owner remains current truth
REPRESENTATION: COMPANION_ARTIFACT
FILE_OR_ARTIFACT: <owner>.evolution.md
CONTENT: local future [NEW]/[EXTEND]/[REUSE]/[NEW?] path; change isolation; prepared seam; trigger
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_GUIDANCE
ID: AG-L5-03
CONTENT_KIND: ARCHITECTURE_ANSWER_DECISION
WHEN: architecture choice resolves current non-global Target realization and does not become project-global
GUIDANCE: ADVISORY_REQUIRED_TO_PERSIST_IF_ACCEPTED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Target
REPRESENTATION: EMBED_CURRENT_TARGET_PLANNING_STATE
FILE_OR_ARTIFACT: <current-idtspe-owner>
CONTENT: accepted architecture Answer Decision; rationale; tax; expected evolution effect
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

**REQUIRED global update candidate** when the Lens discovers a material application/workspace-level evolution path, prepared extension point, architecture-transition condition **or architecture principle/default that should survive across independent Targets**: route it to `TM-WEUC` / `SDS-PLANNING-STATE/SDS-WORKSPACE-EVOLUTION.md`.

**PREFERRED target-local companion** when the finding is specifically about how one Domain/Slice/Frontend/etc. owner may evolve: `<owner>.evolution.md`.

**Keep embedded** ordinary local architecture Answer Decisions in the current Target unless they need independent addressability. For `WORKSPACE_ARCHITECTURE` scope or any local Decision promoted to project-global guidance, use the `TM-WEUC` global-map route instead.

Do not duplicate one future path as equal canonical content in global map and local companion; choose a detail owner and reference it.

## Guards

```text
future evolution projection ≠ current semantic truth
Current Global Architecture Position = current project-global architecture guidance only; it does not own Scenario/Domain meaning
future path ≠ implementation commitment
loose Idea ≠ global evolution fact
future convenience ≠ justification for arbitrary abstraction
architecture Lens ≠ authority to redefine Scenario/Domain semantics
local evolution companion ≠ second current owner
```

## Composition

```text
TM-WEUC
  → owns/updates SDS-WORKSPACE-EVOLUTION

L4 Dependency & Change Impact
  → concrete current dependency/change surface

WEUC Lens / L5
  → evaluates Target/Ideas against the evolution map,
    plans local evolution,
    evaluates architecture fitness + Workspace work-cost

Simplicity / Implementation Economy Lens
  → searches for a materially simpler candidate while preserving L5 constraints

L6 Verifiability / Observability / Operability
  → proof/diagnosis/operation consequences
```

## Escalation / Revalidation

Open a bounded architecture/local child Target only when the exposed architecture problem has independent useful output, material choice space, distinct Sources and independent revalidation value.

Otherwise keep architecture decisions in the current Target.

When a global projected path/extension point changes, route refresh to `TM-WEUC`.

## High-Level Example — Self-Contained Walkthrough

### Situation

The Workspace Evolution Map says:

```text
EV-17 PDF capture is planned soon.
New capture sources should reuse core capture behavior.
Capture-source changes should not force Review logic changes.
Prepared extension point:
  CaptureSource boundary.
```

The team is now designing `CaptureItem` Domain and the first Capture Slice.

### Why This Lens

The Domain/Slice must be correct for today's behavior, but the already-known evolution map gives relevant evidence about which coupling would create avoidable future cost.

The Lens checks the current Target; it does not rewrite the global map itself.

### Walkthrough

Candidate Domain Idea A:

```text
CaptureItem contains:
  BrowserCaptureData
  PdfCaptureData
  provider-specific branches
```

Projected EV-17 path:

```text
[EXTEND] CaptureItem
[EXTEND] ReviewPolicy
[EXTEND] persistence mapping
[NEW] PDF integration
```

Candidate Domain Idea B:

```text
CaptureItem owns source-neutral capture meaning
SourceContext represents normalized source information
provider-specific conversion stays outside Domain core
```

Projected EV-17 path:

```text
[NEW] PdfCaptureEntry
→ [NEW] PdfSelectionMapper
→ [REUSE] CaptureApplicationService.capture(...)
→ [REUSE] CaptureItem.create(...)
→ [REUSE] CaptureRepository.save(...)
```

B better matches the current map while remaining simple enough today.

The Lens may also create:

```text
domain/CaptureItem.evolution.md
```

with:

```text
new Capture Source
  SHOULD NOT require CaptureItem change

offline capture
  MAY require new sync-related state later
  trigger:
    offline capability becomes accepted/planned
```

### Result

The current Domain/Slice gets a better-informed Answer Decision plus a local evolution plan.

If the analysis discovers that offline sync is now a real planned direction missing from the global map, it emits an update candidate for `TM-WEUC`.

### Boundary / Lesson

The Lens does not demand maximum extensibility.

It asks whether the **actual current evolution interpretation** justifies a seam, a direct implementation, or a future transition plan.

## High-Level Example 2 — Whole Workspace Architecture

### Situation

Research Capture already expects:

```text
PDF capture soon
more destinations later
offline capture plausible later
```

The Workspace has started to accumulate both feature-local files and generic technical-layer folders. The team wants a stable project-wide architecture posture before more Slices are added.

### Why This Lens / Command

This is not one Slice-local architecture choice. The question is:

> Which architecture principles/defaults should future independent Targets consume, given the actual planned evolution?

Invoke:

```text
проверь эволюцию и архитектуру архитектуры воркспейса

Resolved Target:
  TM-WEUC / WORKSPACE_ARCHITECTURE_POSITION

Lens:
  WEUC / L5
```

### Walkthrough

Candidate A:

```text
Primary folder/decomposition model:
  controllers/
  services/
  repositories/
  models/

New feature work normally edits several global technical folders.
```

Candidate B:

```text
Primary delivery organization:
  vertical feature/Slice ownership

Domain:
  explicit Domain owners only where real behavior/invariants justify them

Integration:
  provider/source-specific adapters remain outside Domain core

Shared:
  shared owners only for genuinely shared responsibility
```

Project planned-change projection:

```text
PDF source
  A → edits several global technical folders and risks source branches in core
  B → [NEW] source adapter + [REUSE] core capture path

new destination
  A → likely cross-cuts generic service/repository structure
  B → can remain destination-local if responsibility is independent

offline later
  both can support it, but B allows a future queue/sync boundary to be introduced
  when the trigger becomes real without making it today's mandatory abstraction
```

Work-cost comparison adds another view:

```text
Understanding / navigation
  A → one feature meaning is scattered across controllers/services/repositories/models
  B → feature-local owners expose the main path; shared infrastructure stays separate

Mutation / change
  A → ordinary feature change often crosses several global technical buckets
  B → expected source/destination changes stay more local

Verification / diagnosis / operation
  A → tracing one useful result crosses role-based folders with weaker semantic names
  B → Slice/feature vocabulary gives a more direct trace from behavior to realization/tests

Runtime
  neither candidate wins merely by folder shape; unnecessary runtime hops still require separate evidence
```

This does not mean “feature folders are always better”. It means the chosen architecture must pay for its understanding/change/verification/runtime cost under the actual Workspace evolution.

The selected global position may become:

```text
ARCH-G-01
Strength: CURRENT_DEFAULT
Position: organize ordinary delivery work around vertical feature/Slice ownership.
Why: expected source/destination growth should stay locally changeable.

ARCH-G-02
Strength: PREFERRED
Position: explicit Domain owners carry behavior/invariants when domain meaning is material; do not force DDD artifacts everywhere.
Why: preserve semantic ownership without ceremonial modeling.

ARCH-G-03
Strength: PREFERRED
Position: feature/semantic-owner folders are preferred over global technical-role buckets for feature code.
Exception: genuinely shared runtime/infrastructure owners.
```

### Result

The accepted items are written by `TM-WEUC` into `Current Global Architecture Position` of `SDS-WORKSPACE-EVOLUTION.md`. Later Domain/Slice/Frontend IDTSPE instances consume them through this Lens.

### Boundary / Lesson

`vertical slices`, `DDD` or a folder pattern are not copied in as universal slogans. The global position records **what they mean in this project, how strong the rule is, why current evolution supports it, and when an exception/revalidation is allowed**.

## Knowledge Basis

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- Architecture is evaluated against credible change paths, isolation, prepared seams and work/runtime cost rather than speculative flexibility.
- Target-local future evolution is supporting planning state; project-global architecture/evolution updates route to TM-WEUC.

**Referenced Knowledge Owners:**

- `NONE`

**Reference Load Policy:**

No external knowledge body is required for normal use; current `SDS-WORKSPACE-EVOLUTION.md` is Target input/state, not Lens theory.

**Operationalization Notes:**

The Lens itself owns the reusable evolution/architecture-fitness rules; workspace maps and local companions are planning inputs/outputs, not Knowledge Basis owners.

## Provenance

Refactored from the former combined Workspace Evolution / WEUC / Architecture Lens after separating canonical Workspace Evolution Map ownership into `TM-WEUC`.
