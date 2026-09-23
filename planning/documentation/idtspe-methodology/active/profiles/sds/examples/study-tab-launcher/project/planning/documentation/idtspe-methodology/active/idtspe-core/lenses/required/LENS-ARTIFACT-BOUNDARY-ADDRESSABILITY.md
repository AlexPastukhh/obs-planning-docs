<a id="lens-artifact-boundary-addressability"></a>
# LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY — Documentation / Representation / Artifact Boundary

Lens ID: `LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`
Working name: **Documentation / Representation Lens**
Activation: `REQUIRED_CORE`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Artifact Placement / Persistence`](../../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md#representation-artifact-placement) — `REPRESENTATION.ARTIFACT-PLACEMENT`
> - `CONTEXTUALIZES` [`Artifact Boundary / File Realization Method`](../../representation/methods/ARTIFACT-BOUNDARY-AND-FILE-REALIZATION.representation-method.md#representation-artifact-boundary-method) — `REPRESENTATION.ARTIFACT-BOUNDARY-METHOD`
> - `CONTEXTUALIZES` [`Knowledge Basis Contract`](../../knowledge-bases/KNOWLEDGE-BASIS-CONTRACT.md#knowledge-basis-contract) — `KNOWLEDGE.BASIS`
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
→ then hand the selected representation to P-14 / PERSISTENCE_ADDRESSABILITY for concrete placement
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

A local comment is not enough for project-global architecture/evolution truth that must constrain several independent future Targets. Surface that meaning as a Finding Candidate with any useful likely-global-owner context; Core Finding Disposition resolves the semantic owner, and Documentation / Representation + P-14 / PERSISTENCE_ADDRESSABILITY then resolve how accepted meaning persists.

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

This is why a strategy/catalog/discovery/responsibility map can be more valuable than a file for every individual semantic owner.

### Future-state semantic-owner guard

Representation does not decide whether future meaning belongs to the current natural owner or to a dedicated future-transition owner. The active profile/Target contract decides that first.

```text
future meaning semantic owner resolved by profile/Target
→ this Lens chooses only its representation
```

For example, current SDS owns materially planned unrealized target state in `TM-EVOLUTION-STEP`; its current natural owners describe realized truth. Therefore a future Target Body must not be placed into a current-owner artifact merely because that artifact would be convenient.

## Part 5 — Existing Owner Before New Owner

Before creating a dedicated artifact, ask:

```text
Can this material stay naturally in an existing owner or coordinator?
```

Examples:

```text
IMPLEMENTATION-PLANNING.md
  ## SL-CAPTURE
    purpose / current working Slice concern
    small Decision set
    small QRP set
    implementation notes
    proof notes
```

may be enough as one **supporting coordination representation** even after separate IDTSPE invocations for:

```text
TM-IMPLEMENTATION-SLICE / SL-CAPTURE
natural-owner proof-planning pass / SL-CAPTURE
Evolution Lens / SL-CAPTURE
Simplicity Lens / SL-CAPTURE
```

The supporting file does not become a Slice Strategy semantic owner. The active profile decides whether selected Slice responsibility is current-owner truth or future-transition meaning; under current SDS, unrealized selected Slice responsibility belongs to an Evolution Step Target Slice Body until realization/materialization. Transient discovery remains working Source by default.

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
├── Transient proof design / supporting proof-policy note when independently useful
├── Evolution references/considerations only when the active semantic owner permits them
├── Q/R/P
└── Decisions
```

Do **not** automatically create:

```text
SL-CAPTURE.test-design.md
<semantic-owner companion>.md
SL-CAPTURE.frontend.md
SL-CAPTURE.parts/...
```

just because proof design, evolution evaluation, UI realization or local part reasoning was considered.

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
SLICE-COORDINATION.md
PROOF-POLICY.md
SDS-EVOLUTION-MAP.md
cross-owner architecture/evolution artifact only when independently justified
responsibility maps / registries
```

Names such as `SLICE-COORDINATION.md` or `PROOF-POLICY.md` are illustrative supporting representations, not Target-family identities. Their semantic owner must be explicit and current.

A coordinator may contain the complete planning residue for several small logical owners.

Cross-owner proof policy is a useful boundary example: code is canonical for concrete test classes/suites/setups/fixtures/helpers, while a small supporting proof-policy artifact may be justified when several owners need one shared proof-layer, non-duplication, environment or harness policy that is not otherwise obvious. Such a representation needs an explicitly selected semantic owner (for example a scoped Decision/supporting architecture owner); it does not imply a generic Test Strategy Target. Do not persist a hand-maintained class/helper inventory merely to mirror code. A generated/reference topology view is acceptable only when the cross-owner relation is independently large/reused and the representation has value beyond shadowing implementation.

Therefore:

```text
several transient Domain discoveries
→ may remain sections in DOMAIN-DISCOVERY.md + code/current owners

several Slice working plans / owner references
→ may remain sections in one supporting coordination artifact when that view has independent value
→ selected durable Slice meaning remains in the semantic owner resolved by the active profile; under SDS unrealized meaning is in Evolution Step Target Slice Body and only realized meaning is in current Slice owner(s)

one complex Domain/Slice owner
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

This is a **pressure-driven evolution**, not a mandatory staircase. Feature/Scenario artifacts may deserve independent persistence earlier than Domain implementation details when behavioral/journey meaning must remain human-readable; Feature owns behavior while Scenario owns journey composition.

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

Avoid exact literal duplication across files as a synchronization strategy. Keep canonical meaning in one owner; use a direct Markdown link to that owner, and add a stable explicit anchor only when fragment-level addressability is independently useful. When semantic ownership is unclear, surface a Finding Candidate and let Core Finding Disposition resolve the owner.

## Part 12 — Handoff To Artifact Placement

This Lens decides **what representation is justified**.

`P-14 / PERSISTENCE_ADDRESSABILITY` decides **where that selected representation goes**.

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
  IMPLEMENTATION-PLANNING.md#SL-CAPTURE
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
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
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
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

Shell placement semantics: [`planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md`](../../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md).

SDS annotated materialization projection: [`../../../profiles/sds/representation/ARTIFACT-PLACEMENT-MAP.md`](../../../profiles/sds/representation/ARTIFACT-PLACEMENT-MAP.md).

## Guards / Anti-Patterns

Do not:

```text
create a file because a Target Module exists
create one file per IDTSPE iteration
create one file per Lens finding
copy code structure into prose without additional value
force a complete template into every owner artifact
split Test/Evolution/UI/local-part files before independent pressure exists
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
direct owner links / stable anchors when cross-owner addressability is useful
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

# Worked Physical Topologies — Generic

These examples demonstrate representation rules only. Installed profiles may publish more concrete trees (for SDS see its `ARTIFACT-PLACEMENT-MAP.md`).

## Example A — Consolidated Owner

```text
planning.md
  Target/Result owner A
  Target/Result owner B
  shared decision/context section
```

Valid when the meanings remain addressable and have similar audience/lifecycle.

## Example B — Asymmetric Promotion

```text
planning.md
  owner A
  owner B → owner-b.md
  owner C
```

Only B is promoted because only B has independent size/review/reuse pressure. Logical peers do not require physical symmetry.

## Example C — Implementation-Native Owner

```text
code/types/tests
  = primary durable meaning

planning residue
  = only rationale/relations/non-executable meaning not adequately recoverable from implementation
  + future meaning only when the active profile says this owner is its semantic authority
```

## Example D — Same Owner, Companion Under Pressure

```text
owner.md
owner.companion.md
```

This is still one semantic owner **only when the active methodology has already resolved that content to that owner**. The companion is justified only by independent representation pressure; it does not create a second Target/authority. If a profile defines a dedicated future-transition owner (for example SDS `TM-EVOLUTION-STEP`), future meaning belongs to that owner instead of an owner-local companion.

## Example Lesson

Choose the smallest representation that preserves authority, addressability, reviewability, discoverability and lifecycle fit without unnecessary synchronization cost.

## Knowledge Basis

Mode: `HYBRID`

**Embedded Principles / Rules / Theory:**

- Planning completion does not imply persistence, and persistence does not imply a Markdown file.
- Prefer the minimum representation that preserves meaning, ownership, addressability and reviewability without duplicate truth.

**Referenced Knowledge Owners:**

- [`planning/documentation/idtspe-methodology/active/idtspe-core/representation/methods/ARTIFACT-BOUNDARY-AND-FILE-REALIZATION.representation-method.md`](../../representation/methods/ARTIFACT-BOUNDARY-AND-FILE-REALIZATION.representation-method.md)
- [`planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md`](../../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md)
- [`planning/documentation/idtspe-methodology/active/idtspe-core/representation/TARGET-EVOLUTION-COMPANION-ARTIFACT.md`](../../representation/TARGET-EVOLUTION-COMPANION-ARTIFACT.md)

**Reference Load Policy:**

Read the deeper artifact/file pack only when embed/split/reuse/generated/topology choice is materially non-trivial; use the placement contract for final P-14 resolution.

**Operationalization Notes:**

This Lens owns the representation decision; referenced packs own deeper realization mechanics and reusable companion semantics.

## Provenance

Expanded from the prior Artifact / File Boundary / Addressability Lens, the Artifact/File Realization Pack, current SDS AP/AG source guidance, and the pressure-driven documentation/materialization model developed during methodology consolidation.

## Discoverability / Navigation Check

For material addressable artifacts ask how a normal consumer arrives, what outgoing/return links are required, and whether a shallow registry improves discovery without copying owner bodies. Navigation projections are non-authoritative. Application Definition is an SDS temporal exception to the generic realized-current-owner example: it may lead downstream realization.

> Semantic Owner Dependency
> Type: CONTEXTUALIZES
> Responsibility: `DOC.MARKDOWN-LINK-NAVIGATION`
> Owner: [Markdown Link Navigation Rule](../../../../../../../../source-context/planning/documentation/principles-and-terminology.md#doc-markdown-link-navigation)

For Markdown documentation, apply the canonical Documentation [Markdown Link Navigation Rule](../../../../../../../../source-context/planning/documentation/principles-and-terminology.md#doc-markdown-link-navigation). This Lens evaluates whether direct traversal, registry navigation or tracked relations best fit the representation need; it does not redefine link/ownership/dependency authority semantics. Broken targets/fragments and links to stale/non-authoritative destinations remain representation defects.
