# LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY — Documentation / Representation / Artifact Boundary

Lens ID: `LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`  
Working name: **Documentation / Representation Lens**  
Activation: `REQUIRED_CORE`  
Required stage: material IDTSPE output / persistence / representation resolution
Direct methodology surface: `lenscmd.documentation.representation.check`  
Canonical user intent: `проверь как лучше зафиксировать <target/result>`

## Purpose

Choose the **smallest effective representation** for material Target meaning.

The Lens exists to prevent a false equation:

```text
IDTSPE Target exists
→ a dedicated Markdown file must exist
```

The correct model is:

```text
IDTSPE
= planning runtime

semantic result
→ decide whether anything deserves durable persistence
→ choose the most natural representation
→ reuse an existing owner before creating another artifact
→ prefer consolidation before split
→ let representation grow only when real review/addressability/lifecycle pressure appears
→ then hand the selected representation to P-14 / TF-10 for concrete placement
```

The Lens deliberately treats source code, types, tests, schemas, configuration, names, package/module structure and carefully chosen comments as possible **natural representations** of current meaning. It also recognizes the classes of knowledge that implementation represents poorly and therefore usually deserve planning/catalog/strategy/global artifacts.

## Direct Invocation Boundary

The Lens remains a required Core materialization check, but it also has a justified direct user-level invocation for cases where representation itself is the explicit problem:

```text
lenscmd.documentation.representation.check
→ проверь как лучше зафиксировать <target/result>
```

Direct invocation reuses/resolves the natural IDTSPE Target context. It does not create a Documentation Target, does not force persistence, and may legitimately conclude `NO_PERSISTENCE_NEEDED` or `IMPLEMENTATION_NATIVE`. Concrete file/location selection remains P-14 responsibility after the representation decision.

## Fundamental Invariants

```text
IDTSPE instance boundary
≠ semantic owner boundary
≠ physical file boundary
```

Therefore:

```text
one IDTSPE Target
→ may produce no persistent material

several IDTSPE Targets
→ may persist into sections of one file

one logical owner
→ may be represented mostly in code + a small planning residue

one owner artifact
→ may later split into specialized companions

separate file
≠ separate semantic Target
```

A Target Module may be valuable almost every time it is invoked even when the correct persistence result is `NO_SEPARATE_MATERIALIZATION` or `IMPLEMENTATION_NATIVE`.

## Applicability Gate

This is a required Core **check** whenever an IDTSPE iteration has a material result that might persist, alter an existing representation or affect artifact/file topology.

It may close cheaply:

```text
no material result to preserve
→ NO_PERSISTENCE_NEEDED
```

Do not manufacture a documentation task merely because this Lens is required.

## Target Inputs / Evidence

```text
current Target/result and semantic owner(s)
accepted Decisions / Q-R-P / Evidence that may need durable representation
current implementation/code/types/tests/schema/config/comments when available
existing planning/documentation owners, registries and generated views
current workspace/profile placement conventions
material consumers / review / handoff / revalidation needs
```

These are current-instance inputs. They are distinct from the Lens `Knowledge Basis`, which owns/references the principles and realization rules used to evaluate representation.

## Part 1 — Persistence Necessity

First ask whether any result deserves durable representation at all.

```text
What meaning changed or was learned?
Will it matter after the current conversation/iteration?
Does a Decision/QRP/evolution/owner responsibility need to survive?
Would losing this material cause future rediscovery, inconsistency or wrong implementation?
```

Valid result:

```text
NO_PERSISTENCE_NEEDED
```

Examples:

```text
Simplicity Lens checked the current design
→ no material issue / no new Decision / no QRP
→ nothing new to persist
```

or:

```text
Domain Discovery explored a candidate
→ candidate rejected
→ no durable rationale is needed
→ nothing new to persist
```

## Part 2 — Natural Representation

If meaning should persist, choose the most natural representation class before choosing a filename.

```text
IMPLEMENTATION_NATIVE
EXISTING_OWNER_SECTION
REGISTRY_OR_CATALOG
STRATEGY_OR_DISCOVERY_ARTIFACT
DEDICATED_TARGET_OWNER_ARTIFACT
SPECIALIZED_COMPANION_ARTIFACT
GLOBAL_OR_CROSS_OWNER_ARTIFACT
GENERATED_OR_DERIVED_VIEW
UNRESOLVED
```

The goal is not “minimum number of files” in isolation. The goal is minimum **maintenance and understanding cost** while preserving semantic authority, discoverability, reviewability and evolution value.

## Part 3 — Implementation-Native Documentation

Implementation can be the best current representation when the meaning is naturally executable or structurally visible.

Check whether the result can be expressed sufficiently through:

```text
precise names
module/package/folder boundaries
classes / records / Value Objects
function/method boundaries
public API / signatures
type system
schema
state representation / enum
validation / invariant enforcement
dependency direction
configuration/defaults
executable tests
test names
focused doc-comments
local WHY-comments
IDE navigation over the real code structure
```

### Good code-native examples

Domain planning concludes:

```text
RetryInterval is a value with a non-negative invariant.
```

A natural representation may be:

```text
RetryInterval type/value object
+ constructor/validation invariant
+ focused executable tests
```

A separate `RetryInterval.md` that merely copies fields and validation would create a second maintenance front.

Another example:

```text
Browser and PDF inputs normalize before shared Capture behavior.
```

Part of that meaning may be represented naturally by:

```text
BrowserSourceNormalizer
PdfSourceNormalizer
CaptureApplicationService
+ dependency direction
```

Do not create prose that merely restates those names.

### Comments

Comments are useful when they preserve **non-obvious WHY** that local code cannot communicate from structure alone.

Prefer:

```text
WHY this boundary exists
WHY an apparently simpler operation is unsafe
WHY an ordering constraint must be preserved
WHY a local workaround remains
```

Avoid comments that simply narrate the next line or duplicate type/signature information.

A local comment is not enough for project-global architecture/evolution truth that must constrain several independent future Targets. Surface that meaning as a Finding Candidate with any useful likely-global-owner context; Core Finding Disposition resolves the semantic owner, and Documentation / Representation + P-14 / TF-10 then resolve how accepted meaning persists.

## Part 4 — What Implementation Represents Poorly

Code is usually a poor sole representation for knowledge about **systems of responsibilities and future/non-executable planning**.

Strong candidates for explicit planning/catalog/strategy representation include:

```text
which Scenarios exist
full actor/situation/behavior/DATA/result Scenario meaning
which Domains / candidate responsibilities exist
which Slices exist and what vertical result each owns
Slice ordering/dependency strategy
cross-file / cross-owner responsibility maps
folder/file ownership and navigation rules
project-level architecture position
planned/probable future evolution
not-yet-implemented behavior/decisions
rejected alternatives and durable rationale
cross-owner Decisions/QRP requiring human review
registries/catalogs used to find distributed owners
```

This is why a `SLICE-STRATEGY.md`, `SCENARIO-CATALOG.md`, `DOMAIN-DISCOVERY.md`, `SDS-EVOLUTION-MAP.md`, `SDS-WORKSPACE-EVOLUTION.md` or responsibility map can be more valuable than a file for every individual Domain/Slice.

## Part 5 — Existing Owner Before New Owner

Before creating a dedicated artifact, ask:

```text
Can this material stay naturally in an existing owner or coordinator?
```

Examples:

```text
SLICE-STRATEGY.md
  ## SL-CAPTURE
    purpose
    small Decision set
    small QRP set
    implementation notes
    test notes
```

may be enough even after separate IDTSPE invocations for:

```text
TM-IMPLEMENTATION-SLICE / SL-CAPTURE
TM-TEST-DESIGN / SL-CAPTURE
WEUC Lens / SL-CAPTURE
Simplicity Lens / SL-CAPTURE
```

Those iterations do not imply four files. Their material findings do not choose a semantic destination themselves: Core Finding Disposition resolves the owner/lifecycle consequence. When the current owner remains appropriate, Documentation / Representation may keep the accepted meaning consolidated there unless independent separation is justified.

Likewise:

```text
DOMAIN-DISCOVERY.md#CaptureItem
+ implementation types/tests
```

may be enough representation for a logical Domain owner `CaptureItem`.

## Part 6 — Separate Owner Artifact Justification

A logical semantic owner does **not** automatically require its own file.

A dedicated owner artifact becomes useful when one or more of these pressures are material:

```text
independent review/revalidation is frequent
substantial non-code meaning must survive
many active Q/R/P or Decisions belong to this owner
several consumers need a stable human-readable reference
material rationale cannot be recovered from implementation
content makes the parent discovery/strategy artifact hard to read
owner lifecycle diverges from the parent coordinator lifecycle
human/AI navigation repeatedly needs direct addressability
```

Even then, a dedicated owner file does not need to fill a complete template. Persist only what is useful.

Example:

```text
# CaptureItem

Responsibility
Non-obvious invariants/rationale
Important Decisions
Active Q/R/P
```

Fields/methods/types already obvious from implementation should not be copied merely to make the document look complete.

## Part 7 — Consolidate Before Split

When textual persistence is justified, prefer one coherent owner artifact before creating specialized companion artifacts.

Example:

```text
SL-CAPTURE.md
├── Useful Vertical Result
├── Important Behavior / DATA obligations
├── Implementation Plan
├── Test Design
├── Evolution considerations
├── Q/R/P
└── Decisions
```

Do **not** automatically create:

```text
SL-CAPTURE.test-design.md
SL-CAPTURE.evolution.md
SL-CAPTURE.frontend.md
SL-CAPTURE.parts/...
```

just because Test Design, WEUC, Frontend or Part planning was considered.

Split only when the subsection gains independent value such as:

```text
separate review/revalidation lifecycle
substantial size that damages owner readability
independent reuse by several consumers
independent update cadence
stable direct references are repeatedly needed
pre-implementation planning must be independently addressable
```

## Part 8 — Registries, Catalogs, Discovery And Strategy Artifacts

Coordinator artifacts have a special role because they preserve **relations among several logical owners** that code often does not show clearly.

Examples:

```text
SCENARIO-CATALOG.md
DOMAIN-DISCOVERY.md
SLICE-STRATEGY.md
TEST-STRATEGY.md
SDS-EVOLUTION-MAP.md
SDS-WORKSPACE-EVOLUTION.md
responsibility maps / registries
```

A coordinator may contain the complete planning residue for several small logical owners.

A Test Strategy is a useful boundary example: code is canonical for concrete test classes/suites/setups/fixtures/helpers, while a small `TEST-STRATEGY.md` may be justified when several owners need one shared proof-layer, non-duplication, environment or harness policy that is not otherwise obvious. Do not persist a hand-maintained class/helper inventory merely to mirror code. A generated/reference topology view is acceptable only when the cross-owner relation is independently large/reused and the representation has value beyond shadowing implementation.

Therefore:

```text
several Domain Targets
→ may remain sections in DOMAIN-DISCOVERY.md + code

several Slice Targets
→ may remain sections in SLICE-STRATEGY.md

one complex Domain/Slice
→ may be promoted to its own artifact while peers stay consolidated
```

Asymmetric topology is normal and often preferable.

## Part 9 — Representation Evolution

The common progression is:

```text
NO_PERSISTENCE_NEEDED
or
IMPLEMENTATION_NATIVE
↓ when durable planning residue appears
EXISTING_OWNER_SECTION / REGISTRY / DISCOVERY / STRATEGY
↓ when one owner becomes independently material
DEDICATED_TARGET_OWNER_ARTIFACT
↓ when one subsection gains its own lifecycle/reuse/review pressure
SPECIALIZED_COMPANION_ARTIFACT
↓ only when meaning becomes genuinely project-global/cross-owner
GLOBAL_OR_CROSS_OWNER_ARTIFACT
```

This is a **pressure-driven evolution**, not a mandatory staircase. Scenario artifacts often deserve independent persistence earlier than Domain implementation details because Scenario behavior is product/behavioral authority and is poorly replaced by code.

## Part 10 — Audience / Read Path

Evaluate who must understand the meaning.

```text
local developer in one package
→ implementation-native can be excellent

future maintainer / AI planning next Target
→ coordinator/owner artifact may improve discoverability

product/behavior reviewer
→ code/tests may be the wrong audience surface

several teams/owners
→ stable cross-owner strategy/registry/global artifact may be justified
```

Representation effectiveness is judged by:

```text
meaning preserved
+ audience fit
+ discoverability
+ lifecycle fit
+ synchronization cost
```

## Part 11 — Duplication / Staleness Check

Before adding prose ask:

```text
Would this create a second maintained statement
of something already authoritative in code/schema/config/test/another owner?
```

If yes, prefer:

```text
reference instead of copy
generated/derived view
short WHY/rationale instead of structural restatement
implementation-native representation
existing owner section
```

If exact literal duplication across files is intentionally required and equality/staleness checking matters, treat it as a Reference Object concern rather than ordinary duplicated prose. When semantic ownership is material, surface a Finding Candidate; Core Finding Disposition resolves the owner while the Reference Object / representation mechanism handles equality and staleness.

## Part 12 — Handoff To Artifact Placement

This Lens decides **what representation is justified**.

`P-14 / TF-10` decides **where that selected representation goes**.

```text
Documentation / Representation Lens
  Should it persist?
  What representation class?
  How much separation?
↓
Artifact Placement / P-14
  concrete owner/path/section/generated location
  CREATE / UPDATE / EMBED / REUSE / NO_ACTION / UNRESOLVED
```

Examples:

```text
Lens:
  IMPLEMENTATION_NATIVE
  + small residual QRP

P-14:
  code/types/tests
  + DOMAIN-DISCOVERY.md#CaptureItem/QRP
```

```text
Lens:
  EXISTING_OWNER_SECTION

P-14:
  SLICE-STRATEGY.md#SL-CAPTURE
```

```text
Lens:
  DEDICATED_TARGET_OWNER_ARTIFACT

P-14:
  domain/CaptureItem.md
```

## Findings / Outputs

```text
NO_PERSISTENCE_NEEDED
IMPLEMENTATION_NATIVE
EXISTING_OWNER_SECTION
REGISTRY_OR_CATALOG
STRATEGY_OR_DISCOVERY_ARTIFACT
DEDICATED_TARGET_OWNER_ARTIFACT
SPECIALIZED_COMPANION_ARTIFACT
GLOBAL_OR_CROSS_OWNER_ARTIFACT
GENERATED_OR_DERIVED_VIEW
UNRESOLVED

+ what meaning is worth preserving
+ resolved semantic-owner context, or likely-owner ambiguity requiring Core Finding Disposition
+ what stays in code/tests/schema/config
+ what planning residue remains textual
+ duplication/staleness risk
+ split/promotion trigger when relevant
+ P-14 placement input
```

## Typical Consumers

All material IDTSPE Targets at output/materialization time, Artifact Placement, SDS physical-topology resolution, methodology/repository file planning, and future profiles.

## Artifact / File Implications

### Structured Artifact / File Guidance

These records are source guidance. The active profile projects them into its annotated materialization tree; they never create semantic ownership by themselves.

```text
ARTIFACT_GUIDANCE
ID: AG-ART-01
CONTENT_KIND: DOCUMENTATION_REPRESENTATION_DECISION
WHEN: material IDTSPE result may need durable representation
GUIDANCE: REQUIRED_CHECK
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: ARBITRATE
SEMANTIC_OWNER: already-resolved semantic owner; UNRESOLVED_OWNER when representation analysis exposes ownership ambiguity
REPRESENTATION: RESOLVED_BY_DOCUMENTATION_REPRESENTATION_LENS
FILE_OR_ARTIFACT: selected representation; may be code, existing section, registry/strategy, dedicated artifact, generated view or none
CONTENT: persistence necessity + representation class + consolidation/split rationale + code-vs-prose boundary
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_GUIDANCE
ID: AG-ART-02
CONTENT_KIND: MATERIAL_ARTIFACT_PROMOTION_OR_REORGANIZATION
WHEN: embed/split/merge/reuse/retire/generated-vs-manual promotion materially changes physical topology
GUIDANCE: ESCALATE
PERSISTENCE_GUIDANCE: UNRESOLVED
PLACEMENT_DIRECTIVE: ESCALATE
SEMANTIC_OWNER: current semantic owner; physical representation may change without owner change
REPRESENTATION: UNRESOLVED
FILE_OR_ARTIFACT: <artifact-plan>
CONTENT: pressure-driven representation change; preserve semantic authority and minimize duplicated maintenance
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../shared/artifact-placement-and-idtspe-response-contract.md).

SDS annotated materialization projection: [`../../../profiles/sds/ARTIFACT-PLACEMENT-MAP.md`](../../../profiles/sds/ARTIFACT-PLACEMENT-MAP.md).

## Guards / Anti-Patterns

Do not:

```text
create a file because a Target Module exists
create one file per IDTSPE iteration
create one file per Lens finding
copy code structure into prose without additional value
force a complete template into every owner artifact
split Test/Evolution/Frontend/Part files before independent pressure exists
hide project-global planning truth only in local comments
make code implementation authority over upstream Scenario/product behavior
use a new file to avoid resolving semantic ownership
```

## Composition

```text
L1 Need / Value / Scope
L2 Authority / SoT / Reuse
L3 Uncertainty / Assumption / Reversibility
+ Target/Lens planning
↓
Documentation / Representation Lens
↓
P-14 / Artifact Placement
↓
Linked Notes Lens only when cross-owner navigation/query is additionally proposed
```

L4/L5/Simplicity findings are useful inputs because representation should not create unnecessary understanding/change cost. This Lens does not replace Simplicity of the solution itself.

## Escalation / Revalidation

Re-run or deepen this Lens when:

```text
an owner file becomes hard to review
several small owners accumulate in one coordinator
one owner gains many Decisions/QRP
code and prose begin to drift
several consumers repeatedly need direct reference
one section develops independent update/review lifecycle
project-global implications emerge
```

Physical split/merge never changes semantic ownership silently.

# Worked Physical Topologies

The examples below are the primary explanation of how SDS planning material can live differently in different projects. They are **not templates to instantiate**.

## Example A — Compact / Registry-Strategy-Heavy SDS

### Situation

Domain Discovery and Slice planning are valuable, but most Domain semantics are clear in implementation and individual Slices have little planning residue.

### IDTSPE work that may have happened

```text
TM-DOMAIN-DISCOVERY
TM-DOMAIN-DRAFT / CaptureItem
TM-DOMAIN-DRAFT / SourceContext
TM-SLICE-STRATEGY
TM-IMPLEMENTATION-SLICE / SL-CAPTURE
TM-IMPLEMENTATION-SLICE / SL-REVIEW
```

### Physical tree

```text
planning/
├── APPLICATION-DEFINITION.md
├── scenarios/
│   ├── SCENARIO-CATALOG.md
│   ├── SCN-CAPTURE.md
│   └── SCN-REVIEW.md
├── DOMAIN-DISCOVERY.md
├── SLICE-STRATEGY.md
└── SDS-WORKSPACE-EVOLUTION.md

src/
├── capture/
│   ├── CaptureItem.*
│   ├── SourceContext.*
│   └── ...
└── review/
    └── ...

tests/
└── ...
```

### Why this topology

`DOMAIN-DISCOVERY.md` keeps the Domain map, responsibilities, selected Decisions and residual Q/R/P that code does not communicate well. `CaptureItem` and `SourceContext` current invariants/types live naturally in code and executable tests.

`SLICE-STRATEGY.md` contains the Slice inventory/vertical results and can keep small per-Slice Decision/QRP sections. There is no value yet in `SL-CAPTURE.md` or `SL-REVIEW.md`.

### Promotion trigger

Create a dedicated Domain/Slice owner artifact only when one owner gains enough independent planning/review/addressability pressure.

## Example B — One Promoted Domain Owner

### Situation

Most Domain candidates remain simple/code-native, but `CaptureItem` has substantial responsibility, non-obvious invariants, Decisions and open Q/R/P.

### Physical tree

```text
planning/
├── APPLICATION-DEFINITION.md
├── scenarios/
│   ├── SCENARIO-CATALOG.md
│   ├── SCN-CAPTURE.md
│   └── SCN-REVIEW.md
├── domain/
│   ├── DOMAIN-DISCOVERY.md
│   └── CaptureItem.md
├── SLICE-STRATEGY.md
└── SDS-WORKSPACE-EVOLUTION.md

src/
├── capture/
│   ├── CaptureItem.*
│   ├── SourceContext.*
│   └── Destination.*
└── ...
```

### Why this topology

`CaptureItem.md` is promoted because human-readable owner-specific planning is independently valuable. `SourceContext` and `Destination` remain represented by sections in `DOMAIN-DISCOVERY.md` plus code/tests.

The topology is intentionally asymmetric. Logical Domain owners do not need symmetric files.

### What belongs in `CaptureItem.md`

Only useful planning meaning, for example:

```text
Responsibility
non-obvious invariant/rationale
important Decisions
active Q/R/P
material evolution note
```

Do not copy all fields/methods from implementation.

## Example C — One Promoted Slice Owner

### Situation

The Slice portfolio is stable in one strategy file, but `SL-CAPTURE` has enough planning detail to review independently.

### Physical tree

```text
planning/
├── scenarios/
│   ├── SCENARIO-CATALOG.md
│   ├── SCN-CAPTURE.md
│   └── SCN-REVIEW.md
├── DOMAIN-DISCOVERY.md
├── slices/
│   ├── SLICE-STRATEGY.md
│   └── SL-CAPTURE.md
└── SDS-WORKSPACE-EVOLUTION.md
```

### Where the other Slice owners live

```text
SLICE-STRATEGY.md
├── SL-REVIEW     — complete small planning residue here
└── SL-EXPORT     — complete small planning residue here

SL-CAPTURE.md
└── independently promoted representation
```

Several `TM-IMPLEMENTATION-SLICE` invocations therefore still produce only one dedicated Slice file.

### Why no companions yet

`SL-CAPTURE.md` may already contain:

```text
Useful Vertical Result
Implementation
Testing
Evolution
Q/R/P
Decisions
```

Running `TM-TEST-DESIGN`, WEUC Lens or Simplicity Lens against `SL-CAPTURE` does not automatically create companion files.

## Example D — Mature Slice With Specialized Companions

### Situation

`SL-CAPTURE` has matured enough that local evolution and Test Design now have separate review/update lifecycles.

### Physical tree

```text
planning/
├── slices/
│   ├── SLICE-STRATEGY.md
│   ├── SL-CAPTURE.md
│   └── SL-CAPTURE.evolution.md
└── testing/
    └── slices/
        └── SL-CAPTURE.test-design.md
```

### Why the split is now justified

`SL-CAPTURE.evolution.md` exists because there are several future paths, prepared extension points and revalidation triggers worth maintaining separately.

`SL-CAPTURE.test-design.md` exists because proof planning is substantial, independently reviewed and useful before/alongside implementation.

The companions remain supporting representations. Current Slice semantic ownership does not migrate merely because files split.

## Example E — Scenario-Heavy, Domain-Code-Native Product

### Situation

Behavioral/product semantics are rich and must be readable independently of implementation, while Domain internals remain naturally expressed in code.

### Physical tree

```text
planning/
├── APPLICATION-DEFINITION.md
├── scenarios/
│   ├── SCENARIO-CATALOG.md
│   ├── SCN-CAPTURE.md
│   ├── SCN-REVIEW.md
│   ├── SCN-EXPORT.md
│   └── SCN-RECOVER.md
├── DOMAIN-DISCOVERY.md
├── SLICE-STRATEGY.md
└── SDS-WORKSPACE-EVOLUTION.md

src/
└── domain-and-feature-code/...
```

### Why Scenario files stay rich

Scenario actor/situation/DATA/Behavior/result is upstream behavioral authority and should be reviewable without reverse-engineering code or tests. Therefore Scenario persistence pressure is normally stronger than Domain-file persistence pressure.

Tests prove selected behavior; they do not replace Scenario semantic ownership.

## Example F — Mixed Asymmetric Growth

### Situation

The project has several Domains and Slices, but only some need dedicated artifacts.

### Physical tree

```text
planning/
├── scenarios/
│   ├── SCENARIO-CATALOG.md
│   └── SCN-*.md
├── domain/
│   ├── DOMAIN-DISCOVERY.md
│   └── CaptureItem.md
├── slices/
│   ├── SLICE-STRATEGY.md
│   ├── SL-CAPTURE.md
│   └── SL-EXPORT.md
├── testing/
│   └── slices/
│       └── SL-EXPORT.test-design.md
└── SDS-WORKSPACE-EVOLUTION.md
```

### Interpretation

```text
CaptureItem
→ dedicated Domain artifact

SourceContext / Destination
→ DOMAIN-DISCOVERY sections + code

SL-CAPTURE / SL-EXPORT
→ dedicated Slice artifacts

SL-REVIEW
→ section in SLICE-STRATEGY

SL-EXPORT Test Design
→ companion artifact

SL-CAPTURE Test Design
→ section in SL-CAPTURE.md
```

This is not inconsistency. It is pressure-driven representation.

## Example Lesson

Across all examples:

```text
planning richness
≠ file count

logical owner count
≠ file count

IDTSPE invocation count
≠ file count
```

The correct topology is the one that preserves useful meaning with the lowest credible duplication, navigation and synchronization cost.

## Knowledge Basis

Mode: `HYBRID`

**Embedded Principles / Rules / Theory:**

- Planning completion does not imply persistence, and persistence does not imply a Markdown file.
- Prefer the minimum representation that preserves meaning, ownership, addressability and reviewability without duplicate truth.

**Referenced Knowledge Owners:**

- [`artifact-boundary-and-file-realization-pack.md`](../../shared/artifact-boundary-and-file-realization-pack.md)
- [`artifact-placement-and-idtspe-response-contract.md`](../../shared/artifact-placement-and-idtspe-response-contract.md)
- [`target-evolution-companion-artifact.md`](../../shared/target-evolution-companion-artifact.md)

**Reference Load Policy:**

Read the deeper artifact/file pack only when embed/split/reuse/generated/topology choice is materially non-trivial; use the placement contract for final P-14 resolution.

**Operationalization Notes:**

This Lens owns the representation decision; referenced packs own deeper realization mechanics and reusable companion semantics.

## Provenance

Expanded from the prior Artifact / File Boundary / Addressability Lens, the Artifact/File Realization Pack, current SDS AP/AG source guidance, and the pressure-driven documentation/materialization model developed during methodology consolidation.
