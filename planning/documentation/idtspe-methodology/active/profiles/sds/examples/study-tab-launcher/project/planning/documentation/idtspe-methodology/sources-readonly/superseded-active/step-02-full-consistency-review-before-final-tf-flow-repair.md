# Step 02 — Full Consistency Review Before Finalization

Status: **REVIEW / NOT READY FOR FINAL FIXATION**  
Scope: generic Phase 02 + Research Capture SDS Phase 02 + all shared mechanisms they depend on.  
Rule for this review: do **not** treat existing Step 02 files as final merely because the concepts exist somewhere.

---

# 1. Files Reviewed

Core Step 02:

```text
active/generic/02-real-life-solution-scenarios-and-composition.md
active/examples/research-capture/02-real-life-solution-scenarios-and-composition.md
```

Shared models:

```text
active/shared/resolution-slot-and-target-formation-resolution-set.md
active/shared/dynamic-target-formation-and-discovery-checks.md
active/shared/planning-branch-counterfactual-exploration-model.md
active/shared/target-type-instance-source-and-relation-model.md
active/shared/solution-scenario-discovery-and-composition-presets.md
active/shared/user-input-decision-and-answer-intake-rule.md
active/shared/sds-planning-context-template.md
active/shared/sds-future-ideas-template.md
```

Research Capture cross-target state:

```text
active/examples/research-capture/SDS-PLANNING-CONTEXT.md
active/examples/research-capture/SDS-PLANNING-STATE/ideas/
```

---

# 2. Core Step 02 Direction — CONSISTENT

The following ideas are conceptually aligned and should be preserved.

## 2.1 Phase 02 consumes accepted Step 01 state as Sources

Correct direction:

```text
Step 01 accepted state
  Need
  Desired Outcome
  Current Reality
  current/valid workflows
  Success Meaning
  Evidence
  Constraints
  residual Q/R/P
  carry-over Ideas
↓
Step 02 Target formation
```

Step 02 does not start from a blank context.

It should not rediscover/rewrite Need unless challenged by new Evidence.

---

## 2.2 Step 02 is not one fixed IDTSPE instance

Correct:

```text
Step 02
= potentially many Target Instances
+ iterations
+ parallel instances
+ re-open/split/merge
```

It is not:

```text
one Whole-Solution IDTSPE
```

---

## 2.3 Target Type and Target Instance are separate

Correct:

```text
Target Type / Local Target Contract
≠ Target Instance
```

Several instances can share the same form/contract.

A one-off local contract does not automatically become a global reusable Target Type.

---

## 2.4 Target Relations and Sources are separate

Correct:

```text
related Target
≠ Source
```

Examples of Target Relations:

```text
PART_OF
PARALLEL_WITH
PRECEDES
OVERLAPS_WITH
ALTERNATIVE_TO
CONTRIBUTES_TO
```

A sibling's accepted output becomes a Source only when the current Target actually depends on that accepted meaning.

---

## 2.5 Source discovery is open-ended

Correct:

```text
Target template Source list
≠ exhaustive Source universe
```

A dynamically formed Target may discover valid:

```text
canonical semantic Sources
Evidence
Constraints
prior Decisions
accepted outputs from other Targets
```

that were not listed in any preset.

They still require typed authority/reason/freshness.

---

## 2.6 Dynamic Target Formation is generic IDTSPE behavior

Correct:

```text
accepted Sources
↓
resolve Target purpose/output
resolve Target form/type
resolve scope
resolve Sources
resolve relations
resolve question set
resolve Idea space
resolve whether branches are needed
resolve handoff
resolve persistence
↓
Target Contract / Target Instance
```

This is not SDS-only.

SDS Step 02 is one strong example of generic dynamic IDTSPE.

---

## 2.7 Planning Branch is a valid generic concept

Correct:

```text
Idea
↓
ASSUMED_FOR_BRANCH
↓
ordinary downstream IDTSPE Targets
↓
branch-local Decisions / Q/R/P / Evidence / projected consequences
↓
Branch Summary
↓
root Idea comparison
```

Core invariant:

```text
ASSUMED_FOR_BRANCH
≠ SELECTED
```

---

## 2.8 Branch-local state is not canonical

Correct:

```text
BRANCH_SELECTED
≠ globally selected
```

After root Idea selection:

```text
Branch Promotion / Consistency Check
```

is required before any branch-local state becomes canonical.

---

## 2.9 Projected branch consequence and Evidence are separate

Correct:

```text
AI reasoning / modeled consequence
= PROJECTED_CONSEQUENCE

observed/researched/prototyped fact
= EVIDENCE
```

This distinction must survive finalization.

---

## 2.10 Application is not the Step 02 goal

Correct:

```text
Step 02 can end:
  no Application
```

or:

```text
own software is justified
only in one bounded part of the real-world solution
```

Only then should Application Concept / Responsibility become later Targets.

---

# 3. Physical / Textual Inconsistencies — MUST FIX

These are not open methodology questions; the active files currently contradict the newer model.

---

## C-01 — `dynamic-target-formation-and-discovery-checks.md` is still the old DT model

Severity:

```text
HIGH
```

The file still owns:

```text
DT-01
DT-02
...
DT-10
```

as ten separate Discovery Checks.

But the newer selected direction is:

```text
TARGET_FORMATION_RESOLUTION_SET

TF-01 ... TF-10 + TF-06A LENS_SET
```

where one `Resolution Slot` is reused for:
- unresolved question/decision requirement;
- resolved value/state.

Current result:

```text
two parallel mechanisms exist
for the same planning subjects
```

Required correction:

```text
Resolution Slot / Resolution Set
= current owner

old DT checks
= superseded terminology / provenance only
```

---

## C-02 — generic Step 02 is only partially migrated to Resolution Slots

Severity:

```text
HIGH
```

The generic file currently still contains a section:

```text
Activated Discovery Checks
```

and mixed entries such as:

```text
DT-01
DT-02
...
TF-08
DT-09
DT-10
```

This is a direct internal inconsistency.

Required correction:

```text
one Target Formation Resolution Set only
```

---

## C-03 — stale fixed `REAL_LIFE_SOLUTION_SCENARIO` preset conflicts with dynamic Target formation

File:

```text
solution-scenario-discovery-and-composition-presets.md
```

Severity:

```text
HIGH
```

It currently defines:

```text
Target Type A:
  REAL_LIFE_SOLUTION_SCENARIO

Target Type B:
  WHOLE_SOLUTION_COMPOSITION
```

as if Phase 02 had fixed Target Types.

The newer model says:

```text
Step 02 can dynamically choose/form:
  Target Type
  Local Target Contract
  several sibling Target forms
  evidence operation
  composition only when useful
```

Recommended resolution:

```text
do not keep this file as generic semantic authority
```

Possible future role:

```text
SDS-specific RQ/archetype preset library
```

or:

```text
supersede/merge its useful RQ prompts
into generic Step 02 / Resolution Set model
```

---

## C-04 — Research Capture planning context still contains stale RLS IDs

Severity:

```text
HIGH
```

Current Step 02 example uses:

```text
RC-ROUTE-01
RC-ROUTE-02
RC-ROUTE-03
```

but:

```text
SDS-PLANNING-CONTEXT.md
```

still contains:

```text
RLS-RC-01
RLS-RC-02
RLS-RC-03
```

in several places.

This means scenario-level navigation does not match the actual worked Step 02.

Required:

```text
one identity set only
```

after the Target naming/form decision is finalized.

---

## C-05 — Research Capture Future Ideas still references the older Phase 02/RLS model

Severity:

```text
MEDIUM/HIGH
```

Examples:

```text
Phase 02 — Whole-Solution Discovery / Selection
RLS-RC-03
```

while the active worked model has moved to dynamic route Targets.

Required:

```text
re-route Ideas against final Step 02 Target identities/forms
```

---

## C-06 — Branch file does not yet physically contain the claimed Resolution Slot reuse

Severity:

```text
MEDIUM
```

The conceptual direction says:

```text
Branch exploration can reuse Resolution Slot / Resolution Set
```

but the active branch owner does not currently contain that model.

Current final explanation and file content diverge.

Required:

```text
either explicitly integrate Resolution Slots into Branch model

or

state that ordinary Target Formation Resolution Sets
inside branch Targets are sufficient
and no separate Branch Resolution Set is needed
```

Do not claim both.

---

## C-07 — fixation audit currently overstates what is fixed

Severity:

```text
MEDIUM
```

`current-new-idea-fixation-audit.md` says some concepts are fixed while the owner files still contain older contradictory representations.

Required:

```text
audit must distinguish:
  concept captured
  physically integrated
  consistency-verified
```

---

# 4. Methodology Questions Still Unresolved — DO NOT SILENTLY PATCH

These need an explicit design choice before Step 02 is finalized.

---

## Q-02-01 — What owns Target Formation before a Target Instance exists?

Current problem:

```text
TF-02 TARGET_TYPE_FORM
```

may require a material choice before the Target Instance exists.

Likewise:

```text
TF-01 PURPOSE_OUTPUT
TF-03 TARGET_SCOPE
```

may still be candidate values.

Where does this state live?

Candidate Idea A:

```text
Target Formation State / Candidate Target shell
```

Structure:

```text
Candidate Target ID
Target Formation Resolution Set
candidate Target Contract
```

Once sufficiently resolved:

```text
instantiate / promote to Target Instance
```

Candidate Idea B:

```text
keep unresolved formation state
in SDS/Planning Context until Target creation
```

Problem:

```text
generic IDTSPE outside SDS also needs this mechanism
```

Therefore current direction favors A, but it is **not selected yet**.

---

## Q-02-02 — Does a Resolution Slot need multiple candidate values?

Current slot has:

```text
Value
```

But a material unresolved Decision often has:

```text
Candidate A
Candidate B
Candidate C
```

Example:

```text
TF-02 TARGET_TYPE_FORM

A:
  existing Target Type

B:
  local Target Contract

C:
  split into two sibling Targets
```

Likely required extension:

```text
Candidates / Variants
Current Proposal
Selected Value
```

Without this, the slot is good for status but weak as a decision surface.

---

## Q-02-03 — How do slot values map to the three Decision types?

Known:

```text
TF-03 TARGET_SCOPE
→ Target-Scope Decision

TF-06 QUESTION_SET
→ Question-Set Decision
```

Less explicit:

```text
TF-01 PURPOSE_OUTPUT
TF-02 TARGET_TYPE_FORM
TF-04 SOURCE_SET
TF-05 TARGET_RELATIONS
TF-08 BRANCH_POLICY
TF-09 HANDOFF
TF-10 PERSISTENCE
```

Some are:

```text
DERIVED_NONDECISION
```

Some can become material choices.

If material, likely:

```text
Answer Decision
```

attached to Target Formation State / Target.

This mapping needs to be explicitly selected.

---

## Q-02-04 — Is Whole-Solution Composition always required?

Current generic text says approximately:

```text
after enough route Targets are resolved
→ create composition Target
```

That may be too strong.

Cases:

```text
one Target alone fully resolves the Need

two Targets naturally compose with no material alternative

the current user only requested one bounded Solution scope

composition state is already derivable/non-decision
```

Possible rule:

```text
WHOLE-SOLUTION COMPOSITION Target
only when cross-target composition itself contains
a material unresolved choice / coverage / responsibility problem.
```

Otherwise:

```text
derive composition as planning state / handoff
without manufacturing another IDTSPE Target
```

This needs selection.

---

## Q-02-05 — `HANDOFF_TO` Target Relation vs Handoff Source Contract is ambiguous

We currently have:

```text
Target Relation:
  HANDOFF_TO
```

and:

```text
TF-09 HANDOFF
  output → downstream Source contract
```

These are different concepts but have nearly identical names.

Risk:

```text
topology relation
gets mistaken for Source dependency
```

Possible correction:

```text
rename Target Relation:
  FLOW_TO
  TRANSITIONS_TO
  REAL_WORLD_PRECEDES
```

while reserving:

```text
Handoff Contract
```

for actual accepted output passed as Source.

Needs decision.

---

## Q-02-06 — Phase 01 handoff list: exhaustive or advisory?

Current Step 02 correctly supports Source discovery beyond templates.

But we need an explicit invariant:

```text
Phase 01 "Sources For Next Target"
= known/recommended handoff
≠ exhaustive legal Source list
```

A later Target may discover another valid Source from:

```text
upstream owner
other accepted Target
external Evidence
current environment
```

without requiring silent upstream semantic rewrite.

If the same missing handoff recurs:

```text
consider updating the reusable Target Contract/preset
```

This should be selected and added explicitly.

---

## Q-02-07 — Is `PERSISTENCE_ADDRESSABILITY` one slot or two concerns?

Current:

```text
TF-10 PERSISTENCE_ADDRESSABILITY
```

mixes:

```text
what planning state must survive
```

with:

```text
whether it needs separate physical addressability/file
```

But Artifact/File planning is intentionally independently composable.

Possible final form:

```text
TF-10 PERSISTENCE
  semantic planning state that must survive

Artifact/File handoff:
  optional result if separate physical addressability may be needed
```

This keeps one formation slot while preventing file concerns from leaking into semantic planning.

Likely direction, not yet selected.

---

## Q-02-08 — Are local Target Types necessary, or is a Local Target Contract enough?

Current model often says:

```text
Local Target Type:
  REAL_WORLD_ROUTE_CHOICE
```

But if it is used only once, this may be unnecessary naming.

Possible simplification:

```text
Target Contract:
  optional reusable `typeRef`
  otherwise local `form`
```

Then:

```text
Target Type
```

is reserved for reusable contracts.

This would make the ontology cleaner.

Needs a decision.

---

## Q-02-09 — Planning Branch root: only Idea, or any candidate Resolution Slot value?

Current branch model:

```text
Root Idea
```

But the same counterfactual exploration can be useful for:

```text
candidate Target Type
candidate Scope
candidate Handoff
candidate architecture pattern
candidate Source authority choice
```

Generalized form:

```text
Branch Root
  Resolution Slot
  Candidate Value
```

Then Idea branch is the common case:

```text
TF-07 / Answer-RQ Idea candidate
```

This may make Branch fully generic.

Needs explicit selection.

---

## Q-02-10 — What is the minimum branch result that must be retained?

Rejected branch should not leave a huge fake downstream workspace forever.

Need proportional retention contract.

Likely:

```text
Root candidate
Exploration objective
key actual Evidence
key projected consequences
material Q/R/P
normalized Branch Summary
rejection/selection reason
reconsider trigger
```

Not necessarily all branch-local Target bodies.

Artifact/File Pack later chooses physical retention.

Needs finalization.

---

# 5. Step 02 Final Shape — CURRENT BEST CANDIDATE, NOT YET SELECTED

The most coherent current candidate is:

```text
STEP 01 ACCEPTED SOURCES
↓
Target Formation State
  TARGET_FORMATION_RESOLUTION_SET
↓
resolve:
  purpose/output
  target form/type
  scope
  source set
  target relations
  question set
  idea space
  branch policy
  downstream handoff
  persistence
↓
instantiate Target Instance
↓
normal IDTSPE:
  Sources
  RQs
  Ideas
  Lenses
  Q/R/P
  Answer Decisions
↓
when local comparison is insufficient:
  Planning Branches
↓
Branch Summaries
↓
root Decision
↓
accepted output
↓
Source/Handoff to other Targets
↓
parallel / iterative Targets as needed
↓
composition only when composition itself needs planning
↓
possible Application contribution
or
no Application
```

---

# 6. What Should NOT Be Finalized Yet

Do not yet declare final:

```text
fixed REAL_LIFE_SOLUTION_SCENARIO Target Type

mandatory WHOLE_SOLUTION_COMPOSITION Target

old DT-01...DT-10 mechanism

RLS-RC-* identities

HANDOFF_TO terminology

single-value Resolution Slot

exact Target Formation owner
```

---

# 7. What Is Safe To Keep

Safe current concepts:

```text
Resolution Slot / Resolution Set direction

dynamic Target formation

open-ended Source discovery

Target Type vs Instance distinction

Target Relation vs Source distinction

parallel IDTSPE instances

AI Idea ≠ Decision

Planning Branch

ASSUMED_FOR_BRANCH ≠ SELECTED

branch-local state isolation

projected consequence ≠ Evidence

branch promotion/consistency check

per-SDS carry-over Ideas

per-SDS planning context

Application is an optional discovered outcome
```

---

# 8. Recommended Next Review Order

Before editing Step 02 again, resolve these in order:

```text
1. Q-02-01
   Target Formation State owner

2. Q-02-02 + Q-02-03
   Resolution Slot candidate values
   + mapping to 3 Decision types

3. Q-02-06
   upstream handoff vs open Source discovery

4. Q-02-05
   Target Relation naming vs Source Handoff

5. Q-02-09 + Q-02-10
   generalized Branch root + retained branch state

6. Q-02-04
   when composition is a real Target

7. Q-02-07
   persistence vs Artifact/File addressability

8. Q-02-08
   Local Target Type vs Local Target Contract

9. only then
   rewrite generic Step 02
   rewrite Research Capture Step 02
   update SDS Planning Context / Future Ideas
   retire/supersede stale shared preset
   refresh fixation audit
```

At that point Step 02 can be considered internally consistent enough for active fixation.
