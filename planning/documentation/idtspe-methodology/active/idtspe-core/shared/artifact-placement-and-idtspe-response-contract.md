# Artifact Placement And IDTSPE Response Contract

Status: active generic methodology owner

## 1. Purpose

Every material IDTSPE instance must make persistence/placement visible **before file mutation is considered**.

A planning response is incomplete when it resolves semantic Questions/Decisions but leaves the user unable to tell:

```text
which accepted/proposed content should survive?
which semantic owner owns it?
where should it be placed physically?
should an existing artifact be reused/updated?
should a separate owner/file/register/companion exist?
what content still has unresolved persistence/placement?
```

This is a lightweight mandatory projection of `P-14 Persistence / Artifact Port` and `TF-10 PERSISTENCE_ADDRESSABILITY`.

The deeper `Artifact / File Realization Pack` remains conditional for non-trivial layout/reorganization decisions.

Before P-14 chooses a path, the required Core [`Documentation / Representation Lens`](../lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) decides whether persistence is needed at all and whether the natural representation is implementation-native, an existing owner section, a registry/strategy/discovery artifact, a dedicated owner artifact, a companion, a global artifact or a generated view. `P-14` places the selected representation; it does not force Markdown.


## 2. Semantic Owner vs Artifact Owner

Always separate:

```text
Semantic Owner
= Target / concept that owns the meaning

Artifact Owner
= canonical persisted artifact/register/file that stores the selected representation

Projection
= generated/navigation/summary representation without semantic authority
```

Examples:

```text
SCN-CAPTURE
  semantic owner of Scenario DATA/Behavior

scenarios/SCN-CAPTURE.md
  possible artifact owner containing that meaning

scenario-registry.md
  navigation projection/register unless explicitly selected otherwise
```

A separate file does not automatically create a separate semantic owner.

If planning discovers that content needs a **new semantic owner/Target**, do not solve that through `NEW_CANONICAL_ARTIFACT`. Reopen Target Formation/ownership first. Only after the semantic owner is resolved may P-14 create/select its artifact owner.

## 2A. Current Artifact Context

Before proposing new placement, a material IDTSPE invocation should expose the current artifact state relevant to the Target:

```text
Existing canonical owner artifact(s)
Possible representation/destination candidates from applicable AP-*/AG-* guidance
Any REQUIRED/PREFERRED meaning that is not yet represented after Documentation / Representation resolution
Current invocation mode:
  CREATE | REFINE | EXTEND | REVALIDATE | REPAIR
```

An existing Target artifact is normally read as current Target/current-state Source before it is updated.

This makes repeated IDTSPE work explicit:

```text
existing representation
→ inspect through current Target Module + Lenses
→ decide what changed
→ Artifact Placement View
→ UPDATE/EMBED in the same logical owner representation or route new content elsewhere
```

## 3. Artifact Placement Item

For every material content unit produced/discovered in the current IDTSPE instance, render proportionally:

```text
ArtifactPlacementItem

Content
  what planning/semantic/support content is being placed?

Placement Status
  RESOLVED
  UNRESOLVED_PERSISTENCE
  UNRESOLVED_PLACEMENT

Semantic Owner
  current canonical meaning owner
  or UNRESOLVED_OWNER

Persistence
  REQUIRED
  PREFERRED
  OPTIONAL
  EPHEMERAL
  UNRESOLVED

Representation
  NO_SEPARATE_MATERIALIZATION
  IMPLEMENTATION_NATIVE
  EMBED_CURRENT_OWNER
  EXISTING_ARTIFACT
  NEW_CANONICAL_ARTIFACT
  REGISTER_ENTRY
  COMPANION_ARTIFACT
  SUPPORTING_EVIDENCE_ARTIFACT
  GENERATED_PROJECTION
  UNRESOLVED

Destination
  exact path/ref/section/source symbol when known
  code / test / type / schema / config / IDE-navigable implementation location when implementation-native
  logical destination/pattern when physical profile is not yet known
  UNRESOLVED when not selected

Action
  CREATE
  UPDATE
  EMBED
  REUSE
  GENERATE
  MOVE
  MERGE
  RETIRE
  NONE
  UNRESOLVED

Why
  short reason for persistence/representation choice

Depends On
  unresolved Decision/Source/artifact-layout question when relevant

Guidance Sources
  exact Target Module proposal ID(s)
  exact Lens guidance ID(s)
  existing workspace/profile rule when relevant

Placement Resolver
  P-14 / TF-10
  plus Answer Decision ref when placement itself is material
```

Do not invent an exact repository path when the current workspace/profile does not establish one. Use a logical pattern instead, for example:

```text
<scenario-owner-artifact-or-section>
<domain-discovery-owner>#CaptureItem
<domain-owner-artifact>
<slice-owner>#Evolution
<slice-owner>.evolution.md
<implementation-symbol-or-test>
SDS-PLANNING-STATE/SDS-WORKSPACE-EVOLUTION.md
```

## 3A. Placement Guidance Provenance

Every non-trivial placement recommendation must be traceable to the methodology element that proposed it.

```text
Target Module
  → ARTIFACT_PROPOSAL

Lens
  → ARTIFACT_GUIDANCE

Workspace/profile/current owner
  → physical/layout constraint

P-14 / TF-10
  → final placement resolution for the current IDTSPE instance
```

The response therefore shows **who said where**.

Example:

```text
Content:
  future CaptureItem synchronization plan

Guidance Sources:
  AG-L5-02 — LENS-WORKSPACE-EVOLUTION-ARCHITECTURE

Resolved Placement:
  CaptureItem.evolution.md
```

### Guidance Precedence

Use this order when guidance overlaps:

```text
1. resolved semantic ownership / existing canonical owner
2. methodology-global artifact owner rule
3. Target Module REQUIRED/default Artifact Proposal
4. applicable Lens Artifact Guidance
5. Documentation / Representation Lens resolves persistence necessity, code-vs-prose, existing-owner-vs-new-owner and consolidate-vs-split
6. workspace/profile physical-layout preference / materialization tree
7. P-14 / TF-10 resolves the concrete destination/action
```

A Lens cannot override semantic ownership or a Target Module's required canonical result owner.

If two valid guidance sources still imply materially different representations:

```text
material placement choice
→ ordinary Answer Decision
→ P-14 records the selected destination + rationale
```


### Normalized Guidance Fields

`GUIDANCE` remains a human-readable qualifier such as `PROFILE_DEFAULT`, `REQUIRED_IF_PROMOTED`, or `ADVISORY_PREFERRED`. The materialization projection/resolver must **not** infer policy by parsing that string.

Every `AP-*` / `AG-*` record therefore also contains:

```text
PERSISTENCE_GUIDANCE:
  REQUIRED | PREFERRED | OPTIONAL | EPHEMERAL | UNRESOLVED

PLACEMENT_DIRECTIVE:
  PLACE | ROUTE | ARBITRATE | ESCALATE
```

These two fields are the machine-normalized source recommendation.

```text
GUIDANCE
= explanation/qualifier

PERSISTENCE_GUIDANCE
= should this material survive if the WHEN condition applies?

PLACEMENT_DIRECTIVE
= place it here, route to another owner, arbitrate representation, or escalate deep artifact planning
```

`PERSISTENCE_GUIDANCE: REQUIRED` means the **material meaning must survive** when the record's `WHEN` condition applies. It does **not** mean a dedicated Markdown file is required. The required Core Documentation / Representation Lens may satisfy required persistence through implementation-native representation, an existing owner/coordinator section, a dedicated artifact, a generated/derived view, or another representation that preserves the meaning without creating a second authority.

Source-level `REPRESENTATION` is a **proposed pattern** and may still express alternatives such as `EXISTING_OR_NEW_CANONICAL_ARTIFACT`. The resolved `ArtifactPlacementItem.Representation` must use the canonical P-14 representation enum.

### Structured Target Module Proposal Schema

Every Target Module exposes one or more machine-readable records:

```text
ARTIFACT_PROPOSAL
ID
CONTENT_KIND
WHEN
GUIDANCE
PERSISTENCE_GUIDANCE
PLACEMENT_DIRECTIVE
SEMANTIC_OWNER
REPRESENTATION
FILE_OR_ARTIFACT
CONTENT
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

### Structured Lens Guidance Schema

Every reusable Lens exposes one or more:

```text
ARTIFACT_GUIDANCE
ID
CONTENT_KIND
WHEN
GUIDANCE
PERSISTENCE_GUIDANCE
PLACEMENT_DIRECTIVE
SEMANTIC_OWNER
REPRESENTATION
FILE_OR_ARTIFACT
CONTENT
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

`FILE_OR_ARTIFACT` is the source-level proposed file/artifact/owner/register pattern. `CONTENT` says what the source proposes to place there. The resolved current-instance `Destination` is selected later by P-14 / TF-10.

An installed profile may maintain a human/tool-facing artifact/materialization projection from these source records. That projection must not invent placement semantics absent from the source records. Current SDS uses `active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md`; its former flattened registry path is compatibility-only.

### Placement Status Summary

Use a compact status in addition to the detailed fields:

```text
RESOLVED
  persistence + representation/destination are sufficiently resolved

UNRESOLVED_PERSISTENCE
  we do not yet know whether the content should survive independently

UNRESOLVED_PLACEMENT
  persistence is known enough, but representation/destination is not yet resolved
```

The detailed `Persistence`, `Representation`, `Destination`, `Depends On` and `Why` fields remain authoritative.

## 4. Two Different Unresolved States

The response must distinguish:

```text
Persistence: UNRESOLVED
```

meaning:

```text
we do not yet know whether this content deserves to survive independently
```

from:

```text
Persistence: REQUIRED | PREFERRED
Representation/Destination: UNRESOLVED
```

meaning:

```text
we know it must/should survive,
but have not yet selected the artifact/file/register location
```

This is important for content such as:

```text
new shared invariant
substantial Prototype Evidence
new evolution plan
new addressable DATA concept
architecture rationale
```

## 5. Required IDTSPE Response View

A material IDTSPE answer should expose, proportionally:

```text
1. Current Target / Scope / Sources
2. Resolved Questions / current answers
3. Unresolved material Questions / Decisions needing user authority
4. Lens findings / material Q/R/P / Ideas when relevant
5. Target-specific output preview/update
6. Artifact Placement View
7. Handoff / next Sources
8. Residual Q/R/P / revalidation signals
```

The exact prose format can vary. The **Artifact Placement View must not disappear** merely because no files are being mutated in the current turn.

## 6. Artifact Placement View — Compact Rendering

Recommended compact table:

| Content | Placement status | Semantic owner | Persistence | Representation / destination | Action | Guidance source(s) | Why / unresolved |
|---|---|---|---|---|---|---|---|
| Scenario DATA + Behavior | RESOLVED | `SCN-CAPTURE` | REQUIRED | embed in `<scenario-owner-artifact>` | UPDATE | `AP-SCN-02` | Scenario owns them internally |
| Screen/window Idea | RESOLVED | none selected yet | PREFERRED | `SDS-PLANNING-STATE/ideas/scenario/IDEAS.md` | UPDATE | `AP-SCN-03` | unselected Idea, not Screen truth |
| Offline Slice evolution path | RESOLVED | `SL-CAP-01` supporting evolution state | PREFERRED | `<slice-owner>.evolution.md` | UNRESOLVED | `AG-L5-02` | create only if future path is material |
| Benchmark scratch numbers | UNRESOLVED_PERSISTENCE | unresolved | UNRESOLVED | UNRESOLVED | NONE | `AG-L3-01` may flag Evidence value; no placement proposal yet | decide whether they become Decision Evidence |

For larger plans, use one `ArtifactPlacementItem` block per unit.

## 7. Target Module Responsibility

Every active Target Module must contain an explicit:

```text
## Artifact / File Contract
```

It must say:

```text
what target output must survive when accepted/downstream-used
what normally stays embedded in the target owner
what separate artifact forms are REQUIRED/PREFERRED/OPTIONAL
what should not be split by default
which result types must be routed elsewhere
```

Target Module artifact guidance is a **profile-level default/requirement**, not an unconditional hard-coded repository path unless the methodology intentionally defines a global artifact.

## 8. Lens Responsibility

Every reusable Lens must contain:

```text
## Artifact / File Implications
```

A Lens may say:

```text
NONE
```

when findings normally remain in the current Target.

Or it may say:

```text
REQUIRED:
  persist one global owner when this finding establishes canonical cross-target planning state

PREFERRED:
  create/update a companion/supporting artifact when material future/review/evidence state needs independent addressability
```

A Lens never silently creates a new semantic owner.

Lens output first becomes:

```text
finding / Evidence / Idea / Q/R/P / Answer Decision input
```

Then `P-14` decides its persistence/representation.

## 9. Full Artifact Pack Escalation

The lightweight placement pass is enough when representation is obvious:

```text
accepted Scenario update
→ existing Scenario artifact
```

Escalate to the full Artifact/File Realization Pack when there is a material choice among:

```text
embed vs split
one canonical file vs register
companion vs global map
reuse vs new artifact
merge/retire existing duplicates
manual owner vs generated projection
```

Then Artifact Boundary/Addressability is an ordinary material Answer Decision inside the artifact-representation planning problem.

## 10. High-Level Example — Scenario Planning

Situation:

```text
SCN-CAPTURE is being drafted.
```

IDTSPE discovers:

```text
Scenario DATA:
  Selected Material
  Source Context

Behavior:
  accept capture
  report durable success/failure

Idea:
  maybe use a floating capture window later
```

Artifact Placement View:

```text
Scenario DATA + Behavior
  Semantic Owner:
    SCN-CAPTURE
  Persistence:
    REQUIRED
  Representation:
    EMBED_CURRENT_OWNER
  Destination:
    <SCN-CAPTURE canonical artifact>
  Action:
    UPDATE

Floating-window Idea
  Semantic Owner:
    none selected
  Persistence:
    PREFERRED
  Representation:
    REGISTER_ENTRY
  Destination:
    SDS-PLANNING-STATE/ideas/scenario/IDEAS.md
  Action:
    UPDATE
```

The Idea is therefore preserved without becoming Screen authority.

## 11. High-Level Example — Unknown Placement

During Domain Draft an architecture concern appears:

```text
Offline capture may eventually require synchronization state.
```

The team accepts that the concern must survive, but has not decided whether it belongs in:

```text
CaptureItem.evolution.md
SDS-WORKSPACE-EVOLUTION.md
or both via canonical + reference
```

Correct rendering:

```text
Persistence:
  REQUIRED

Representation:
  UNRESOLVED

Destination:
  UNRESOLVED

Depends On:
  whether this is local Domain evolution
  or application-wide Workspace evolution
```

Do not silently pick one file merely to make the response look complete.


## Methodology Direction View

Artifact placement is paired with a methodology continuation projection owned by `directed-methodology-workflow-and-next-step-resolution.md`.

Every material response should include proportionally:

```text
Current Target / invocation mode
Exit Gate status
Recommended next Target/action
Why it is now ready
Conditional next Targets and activation conditions
Repeat-current trigger
Backward-reopen trigger
```

This projection does not authorize file mutation or automatic execution of the next Target.
