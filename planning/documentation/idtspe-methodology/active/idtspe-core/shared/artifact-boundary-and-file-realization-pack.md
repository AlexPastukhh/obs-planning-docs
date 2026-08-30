# Artifact Boundary Discovery And File Realization Pack

Status: active conditional deep artifact/file methodology pack  
Purpose: deepen a non-trivial Documentation / Representation decision: compare implementation-native/existing-owner/consolidated/split/generated representations, plan physical reorganization when needed, and validate the resulting repository representation.  
Repository mutation: none.

---

The fundamental lightweight policy is owned by [`../lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md`](../lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md). This pack is its **conditional deep realization pack**, not a competing file-creation policy.

## 0. Lightweight Placement At Materialization; Deep Artifact Planning Is Conditional

Ordinary Broad Discussion does not perform a full placement pass by default. An Integration Checkpoint or other persistence-sensitive structured pass uses lightweight `P-14` / `TF-10` placement when physical persistence is material, changed or unresolved; established inherited placement may be stated compactly.

That lightweight view answers:

```text
what current-instance content should survive?
which representation was selected by Documentation / Representation?
who semantically owns it?
where should it go — code/section/file/register/generated view — if known?
what placement/persistence is unresolved?
```

The **full Artifact/File Realization Pack in this file** is only required when physical representation itself is non-trivial.

```text
mandatory planning visibility
≠ mandatory file split
≠ mandatory repository mutation
```

Canonical lightweight contract: `artifact-placement-and-idtspe-response-contract.md`.

# 1. Main Separation

A semantic Target can be correct without having any particular file layout.

Therefore **deep file-layout planning** is an independently composable pack:

```text
Artifact / File Realization Pack
```

It can run:

```text
after IDTSPE semantic planning
or
standalone over an already-existing semantic Target
or
during repository/documentation reorganization
```

Its internal flow is:

```text
semantic Target / current owners
+ current repository state
+ optional physical-profile preset
↓
Artifact Boundary Discovery
↓
Artifact Layout / Representation Decision
↓
Artifact Plan
↓
Pre-Update / mutation when separately authorized
↓
Artifact Representation Validation
```

A preset is only a starting recommendation.

```text
preset
≠ final file set
```

---

# 2. Three Different Questions

## Semantic correctness

```text
What meaning should exist?
Who semantically owns it?
```

Owned by the real Target methodology.

## Artifact boundary choice

```text
Which semantic/support pieces deserve independent physical addressability?
Can the meaning stay implementation-native or in an existing owner section?
What belongs in one file vs several files vs a register vs generated view?
```

This is planning.

## Artifact conformance

```text
Did the repository actually create/update/merge/retire the right artifacts
with the required content and relations?
```

This is validation.

Do not collapse these three.

---

# 3. Artifact Boundary Discovery

This is the missing step beyond presets.

Working purpose:

```text
discover the smallest useful physical decomposition
that preserves semantic ownership
while making important reading/change/review/reuse paths economical
```

It is allowed to conclude:

```text
keep everything together
```

or:

```text
split one part into its own file
```

or:

```text
use a register
```

or:

```text
keep distributed owners and generate an index
```

It should not mechanically prefer more files.

---

# 4. Artifact Boundary / Addressability Lens

This is a **planning Lens inside the optional Artifact Pack**.

It evaluates candidate physical representations.

It does not judge the semantic Target itself.

Core question:

```text
Does this piece of meaning/support state deserve
independent physical addressability?
```

For every candidate semantic/support unit ask the following.

## 4.1 Independent semantic ownership

```text
Does this unit have a distinct semantic owner/lifecycle?
Can it change without changing the neighboring meaning?
Would keeping it embedded blur ownership?
```

Strong split signal:

```text
independent semantic owner
```

But semantic owner does not automatically require one file.

## 4.2 Independent reuse

```text
Will several Targets/commands/workflows reference this unit directly?
Will agents/users need to load it without the surrounding artifact?
```

Strong split signal:

```text
frequent direct reuse by several consumers
```

## 4.3 Independent review

```text
Can this unit become stale independently?
Does it have its own review/freshness obligations?
Do different reviewers care about it?
```

Strong split signal:

```text
independent review lifecycle
```

## 4.4 Independent change path

```text
Does this unit change on a materially different cadence?
Does changing it usually require loading/editing only this meaning?
Would embedding it cause repeated unrelated-file edits?
```

This can use:

```text
Workspace Evolution / WEUC
```

as supporting evidence.

## 4.5 Addressability / stable identity

```text
Does it need a stable path/ID for:
  cross-file links
  commands
  linked-note/backlink/query traversal when justified by `LENS-LINKED-NOTES-USAGE-JUSTIFICATION`
  dependency tracking
  Q/R/P
  Decisions
  WEUC
  automation
```

Strong split signal:

```text
many durable direct references
```

## 4.6 Size and cognitive locality

```text
Is the parent artifact becoming too large to understand/review safely?
Would splitting reduce working-context load?
Or would splitting force readers to jump across files for one coherent thought?
```

This is a trade-off, not a line-count rule.

## 4.7 Different permission / generation semantics

```text
Is one part generated while another is canonical?
Is one part review-only?
Is one part user-maintained and another tool-maintained?
```

Strong split signal:

```text
different authority/generation lifecycle
```

Generated projection should normally be separate from canonical owner.

## 4.8 Portfolio / collection behavior

```text
Are many peer records accumulating?
Do users need sorting/filtering/querying across them?
```

This may justify:

```text
register / index / collection artifact
```

Examples:

- canonical `SDS-WORKSPACE-EVOLUTION.md` or local `<owner>.evolution.md` when evolution paths need durable addressability;
- Scenario Registry;
- Decision Portfolio projection;
- Concern Register when distributed durable concerns justify it.

A register does not automatically become semantic owner of every member.

## 4.9 Coupling cost of splitting

Always ask the inverse:

```text
Would splitting create excessive navigation?
Would two files almost always change together?
Would readers need both files for every meaningful task?
Would synchronization become another failure mode?
```

Strong **keep-together** signal:

```text
high semantic/read/change coupling
```

## 4.10 Existing repository conventions / preset

Use them as priors:

```text
Mini / Modular / Full
Target-family templates
existing owner patterns
```

But they may be overridden by concrete evidence.

---

# 5. Default Heuristics

## Prefer a separate file/artifact when several are true

```text
independent semantic lifecycle
frequent independent reuse
independent review/freshness
many durable direct references
different change cadence
different maintainer/reviewer
different generation/authority mode
large parent working-context burden
portfolio/query behavior
```

## Prefer keeping it together when several are true

```text
always read together
always change together
same semantic owner
small bounded content
no independent references
no independent review lifecycle
split would create synchronization burden
split would increase navigation more than locality
```

No single heuristic is decisive.

---

# 6. Candidate Artifact Forms

Discovery does not choose only between:

```text
one file
vs
two files
```

Possible forms:

## Embedded section

Best when:

```text
same owner
same lifecycle
same readers/change path
small bounded meaning
```

## Dedicated canonical file

Best when:

```text
independent semantic owner/addressability/reuse/review
```

## Register

Best when:

```text
many peer records need stable discovery/navigation
```

The register may own identities/routes while member semantics remain local.

## Supporting planning file

Examples:

```text
WEUC instances
test plan
prototype plan/result
concern register
decision trace
```

Only when support state has durable independent value.

## Generated index / portfolio

Best when:

```text
overview/query is needed
but canonical owners are distributed
```

Examples:

```text
Decision Portfolio
Decision ↔ WEUC map
generated Scenario index
```

Generated view is not semantic authority.

---

# 7. Preset Role

A physical-profile/Target preset can define a **default decomposition prior**.

Example conceptually:

```text
Full SDS default:
  Scenario stable owner
  DATA / Behavior independently addressable when material
  Requirements stable owner when material
  Domain separate when explicit Domain exists
  Slice stable owner
  `SDS-WORKSPACE-EVOLUTION.md` when TM-WEUC interpretation is materially useful
  testing surface when durable proof planning justifies it
```

But the actual process is:

```text
preset proposal
↓
Artifact Boundary / Addressability Lens
↓
concrete representation Decision
```

Therefore:

```text
Full SDS
does not mean
"always create every possible Full file"
```

Likewise Mini does not forbid a separate file when independent addressability is actually material.

---

# 8. Artifact Layout Decision

After discovery, preserve a material representation choice.

Working record:

```text
Artifact Layout Decision

Target / area

Profile / preset used

Candidate representations

Selected representation

Why split / keep together

Expected reading/change/review benefit

Costs accepted:
  navigation
  dependency
  synchronization
  migration

Artifacts:
  CREATE
  UPDATE
  REUSE
  MOVE
  MERGE
  RETIRE
  GENERATE

Reconsider when:
  reuse grows
  file becomes too large
  independent lifecycle appears
  split files always change together
  navigation cost becomes material
```

This is an Answer Decision for an **artifact-representation Target** when material.

For trivial representation choices, a full durable Decision record is unnecessary.

---

# 9. Artifact Plan

After layout selection:

```text
ArtifactPlan:

  target
  selected representation

  artifacts:
    - identity/path
      role
      action
      semantic owner
      required content
      sources
      relations
      reason

  registry/index changes

  generated projections

  merge/retirement operations

  validation checks
```

Action vocabulary:

```text
CREATE
UPDATE
REUSE
MOVE
MERGE
RETIRE
GENERATE
```

---

# 10. Artifact Representation Validator

This Validator can run:

```text
on the proposed Artifact Plan
and/or
after actual file realization
```

It checks three classes of correctness.

## 10.1 Artifact-set correctness

```text
Are all selected required artifacts present?
Was an unnecessary duplicate owner created?
Was a selected split never materialized?
Should an obsolete duplicate have been merged/retired?
Did a profile-required stable artifact disappear?
```

## 10.2 Content correctness

For each artifact:

```text
Does required selected meaning exist?
Did Decisions disappear during projection?
Did residual Q/R/P disappear?
Did delegated/later/outside meaning disappear?
Are required Source/proof/WEUC relations present?
```

## 10.3 Relation/navigation correctness

```text
Are registry/index routes updated?
Are stable links/IDs valid?
Are generated views still derived?
Are Reference Objects / Review Dependencies used only where their real obligation exists?
```

---

# 11. Artifact Authority Guard

Hard invariant:

```text
physical decomposition
must not create competing semantic authority
```

Examples:

```text
Scenario file
+ generated Scenario index
→ Scenario file remains semantic owner

Domain file
+ Decision Portfolio
→ Domain file remains semantic owner

distributed Decisions
+ generated Decision index
→ generated index is projection only
```

Also:

```text
moving/splitting meaning
must not silently change its semantics
```

A file refactor is not a semantic change by default.

---

# 12. Artifact Duplication / Merge Check

Because the repository may already contain similar artifacts, every Artifact Pack invocation over existing files should perform:

```text
Current Artifact Inventory
↓
for each semantic area:
  current owner?
  duplicate owner?
  stale projection?
  obsolete historical file?
  same concept under different names?
↓
candidate representation
↓
reuse / extend / merge / split / retire
```

Important:

```text
similar file name
≠ same semantic concept

similar semantic content
≠ necessarily two legitimate owners
```

This is the file-level version of the repository consistency rule.

---

# 13. Interaction With Pre-Update

The two concepts are related but not identical.

## Artifact Boundary Discovery

Answers:

```text
what physical representation should exist?
```

## Artifact Plan

Answers:

```text
which artifacts should be created/updated/reused/merged/retired/generated?
```

## Pre-Update

Answers:

```text
how exactly will the selected repository transition be executed,
in what order,
with what dependencies/checks,
still without mutation?
```

Conceptual composition:

```text
Semantic Target
↓
Artifact Pack
  Boundary Discovery
  Layout Decision
  Artifact Plan
↓
Pre-Update
↓
authorized file mutation
↓
Artifact Representation Validator
```

But Artifact Pack can run without Pre-Update if the user only wants to inspect/recommend representation.

---

# 14. Interaction With IDTSPE

Artifact Pack is independently composable.

A persistence-sensitive Integration Checkpoint/pass performs:

```text
semantic planning / integrated semantic state
→ lightweight Artifact Placement View when physical placement is material
```

It may then stop **without mutation** when the placement is obvious/inherited and no deeper artifact-layout choice is material. Broad Discussion may remain conversational without this projection.

Possible use 2:

```text
IDTSPE
→ Artifact Pack
→ stop with file plan
```

Possible use 3:

```text
IDTSPE
→ Artifact Pack
→ Pre-Update
→ separately authorized mutation
```

Possible use 4:

```text
existing repository Target
→ Artifact Pack only
→ reorganize physical representation
```

Possible use 5:

```text
existing artifact mess
→ Artifact Boundary Discovery
→ merge/retire/generated-index plan
```

No need to replay semantic IDTSPE unless the physical review exposes a real semantic contradiction.

---

# 15. Example — Scenario DATA In Full SDS

Preset says:

```text
Full may give Scenario DATA independent addressability
```

Concrete discovery asks:

```text
Is DATA reused by several Behavior Items/Requirements/Screens?
Does it need stable IDs?
Will other Scenarios/Domain Discovery reference it?
Does it change/review independently?
Would a separate file reduce Scenario working-context load?
```

Case A:

```text
4 tiny data items
used only by one Scenario
always reviewed with Scenario
```

Decision:

```text
keep DATA section inside Scenario owner
```

even in Full, unless current repository profile contract intentionally requires a stable DATA owner for other reasons.

Case B:

```text
25 independently referenced DATA items
Behavior/Requirements/Screen/Domain Discovery all link to them
stable IDs required
```

Decision:

```text
dedicated Scenario DATA artifact/register is justified
```

---

# 16. Example — Decisions

Need:

```text
see all active Decisions across the application
```

Bad solution:

```text
copy every Decision into one manually maintained decisions.md
```

Artifact Discovery sees:

```text
canonical Decision traces are distributed
overview/query is independently useful
```

Selected behavior:

```text
distributed canonical Decision traces
+
justified Linked Notes query/view over their existing IDs/relations
```

No `notes/` file or copied Decision portfolio is created. If tooling needs a technical index/cache, that implementation remains non-semantic infrastructure; canonical Decision/QRP bodies stay in their existing owners.

---

# 17. Example — WEUC

Suppose one future evolution finding is local to one Domain/Slice owner.

Artifact Discovery may select:

```text
keep it in <owner>.evolution.md
```

Suppose later the same evolution direction affects several owners and becomes part of the application/workspace plan.

Then the canonical route is:

```text
local Lens finding / evolution companion
→ map/global-architecture update Finding Candidate + likely TM-WEUC owner hint
→ Core Finding Disposition
→ resolved TM-WEUC owner when selected
→ SDS-PLANNING-STATE/SDS-WORKSPACE-EVOLUTION.md
```

Do not create a parallel WEUC-instance register merely because several future paths exist. The global Workspace Evolution Map is the canonical aggregation owner.

---

# 18. Example — Q/R/P

A small Target with two local concerns:

```text
keep detailed Q/R/P beside the real semantic subject/owner area
```

A large distributed project with many active durable concerns:

```text
local concern bodies remain beside owners
+
Area Concern Register / generated index
```

only when navigation/review value justifies it.

Do not create a central register merely because the methodology supports one.

---

# 19. Example — Splitting A Large Workflow File

Current artifact:

```text
workflow.md
  concepts
  process
  command routing
  examples
  validation
```

Boundary Lens may find:

```text
concept definitions reused independently
command routing changes independently
workflow process has one owner
examples are non-authoritative
```

Possible selected representation:

```text
model.md
workflow.md
command.md
examples.md or generated/example section
```

But only if:

```text
independent reuse/change/review
> navigation/synchronization cost
```

Otherwise keep together.

---

# 20. Supporting WEUC Evaluation Of File Boundaries

Artifact Boundary Discovery may itself use `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE`.

Example candidate split:

```text
one giant application planning file
→ Scenario + DATA + Requirements + Domain + Slice
```

Compare recurring Workspace work.

### Keep together

```text
change one Requirement
→ load one big file
→ risk reviewing unrelated meaning
```

### Split

```text
change one Requirement
→ edit requirement owner
→ follow explicit dependent links
```

But another case:

```text
Scenario and its four tiny Behavior Items always change together
```

Split would cause:

```text
two files
more navigation
more synchronization
no independent reuse
```

WEUC favors keeping together.

Thus:

```text
Artifact Boundary Lens
+ WEUC
```

is a useful pair for non-trivial file-layout decisions.

---

# 21. Supporting Dependency & Change Impact Evaluation

Before splitting/merging:

```text
which links break?
which registries update?
which consumers depend on paths?
which Reference Objects / Review Dependencies change?
which generated indexes need refresh?
```

This does not make dependency analysis a hard-coded part of every trivial file decision.

Use proportionally.

---

# 22. Recommended Artifact Pack Flow

```text
0. Resolve Target / current semantic owners
1. Inventory current artifacts
2. Resolve optional profile/preset
3. Identify candidate independently addressable units
4. Apply Artifact Boundary / Addressability Lens
5. Use `LENS-WORKSPACE-EVOLUTION-ARCHITECTURE` when material
6. Compare representation candidates
7. Select Artifact Layout Decision when material
8. Derive Artifact Plan:
     create/update/reuse/move/merge/retire/generate
9. Validate proposed representation
10. Optional Pre-Update
11. Optional authorized realization
12. Validate actual repository representation
13. Update navigation/generated projections
```

---

# 23. Artifact Pack Output Contract

```text
Target / semantic owner context

Current Artifact Inventory

Preset/Profile:
  optional

Candidate addressable units

Boundary findings:
  independent ownership
  reuse
  review
  change cadence
  stable identity
  working-context cost
  generation/authority
  portfolio behavior
  split coupling cost

Representation candidates

Selected Artifact Layout

Artifact Plan:
  CREATE
  UPDATE
  REUSE
  MOVE
  MERGE
  RETIRE
  GENERATE

Content contract per artifact

Registry/index/generated projection impact

Dependency/freshness impact

Artifact Representation Validator result

Open representation Q/R/P

Reconsideration conditions
```

---

# 24. What Should Stay In Target-Specific Owners

Generic Artifact Pack should not define:

```text
"Scenario must always have exactly these files"
```

Instead:

```text
Scenario methodology
→ defines candidate/default Scenario artifact forms/content

Slice methodology
→ defines Slice artifact forms/content

TM-WEUC / Workspace Evolution methodology
→ defines global `SDS-WORKSPACE-EVOLUTION` and optional local evolution-companion forms

Q/R/P model
→ defines concern storage forms
```

Artifact Pack asks:

```text
which of those forms are justified here?
```

and validates the chosen representation.

---

# 25. Current Selected Module Set

No taxonomy expansion is needed.

Inside the optional Pack:

```text
Lens:
  Artifact Boundary / Addressability

Validator:
  Artifact Representation Validator

Guard:
  Artifact Authority Guard

Rules:
  split/merge/reuse/retire/generate invariants

Pack:
  Artifact / File Realization Pack
```

Supporting contextual Lenses:

```text
Workspace Evolution / WEUC
Dependency & Change Impact
```

only when the representation decision is material enough.

---

# 26. Core Invariants

```text
semantic Target
≠ file layout

preset
≠ mandatory concrete file set

separate semantic owner
≠ automatically separate file

separate file
≠ separate semantic owner

generated overview
≠ semantic authority

more files
≠ more modularity

fewer files
≠ simpler maintenance

split only when independent addressability/lifecycle/reuse/review/change
justifies navigation/synchronization cost

merge when split artifacts repeatedly behave as one unit
and independent addressability no longer pays

repository similarity
≠ semantic equivalence
```

---

# 27. Open Questions

## Name

Possible names:

```text
Artifact / File Realization Pack
Artifact Representation Pack
Physical Representation Pack
Artifact Topology Pack
```

Current working name:

```text
Artifact / File Realization Pack
```

## Stable representation Decision

When does an Artifact Layout Decision need a stable ID?

## Target-specific contracts

How much file-shape guidance belongs in existing templates/workflows versus a separate representation section/model?

## Full SDS

Which current Full-profile file requirements are true hard representation contracts versus defaults that should become conditional after this discovery model?

## Linked Notes

Use [`LENS-LINKED-NOTES-USAGE-JUSTIFICATION`](../lenses/reusable/LENS-LINKED-NOTES-USAGE-JUSTIFICATION.md) when a cross-owner backlink/query/navigation capability is proposed.

Linked Notes do not create a methodology storage tree. The question here is only whether relations/views over existing owners materially improve navigation/review without copying semantic truth. Technical Reference Object registry/index infrastructure, if later justified, is a separate implementation concern.

## Automation

Which Artifact Representation checks can be mechanically validated by repository tooling?

---

# 28. Final Formula

```text
Target-specific preset
→ proposes a reasonable default physical shape

Artifact Boundary Discovery
→ asks what deserves independent addressability here

Artifact Boundary / Addressability Lens
→ compares split / keep / register / generated-view options

Artifact Layout Decision
→ selects concrete representation when material

Artifact Plan
→ says which artifacts to create/update/reuse/merge/retire/generate

Artifact Representation Validator
→ checks that the selected file/artifact representation is actually correct

Artifact Authority Guard
→ prevents file layout/projections from becoming duplicate semantic truth
```

And the whole mechanism remains independently composable:

```text
semantic planning
optional

Artifact Pack
independent

Pre-Update
optional

mutation
separately authorized
```
