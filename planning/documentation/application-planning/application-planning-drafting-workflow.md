# Solution And Workflow Planning Drafting Workflow

Status: active reusable workflow / generic Idea work delegated
Doc version: v1.1.0-sufficient-planning-draft-contract
Scope: repeated user + AI process for Problem/Need framing, Current Reality Capture, solution/Workflow Variants, Planning Drafts, End-To-End Workflow integrity, Idea/current-owner integration, questions, risks, alternatives, tests, evidence-driven revision and optional deeper planning.

Canonical concepts and principles:

```text
application-planning-principles-and-terminology.md
```

Shared Idea review/planning owners:

```text
../idea-planning-principles-and-terminology.md
../idea-review-and-planning-workflow.md
../IDEA-REVIEW-TEMPLATE.md
```

## 1. Purpose

This workflow owns broader solution/workflow planning while generic Idea work is delegated to the shared Idea owners:

```text
source/reality context
  → reviewed Ideas/current conclusions when material
  → solution/workflow Planning Draft
  → Current Conclusions / Related Ideas when useful
  → complete Key Scenarios
  → one required Full Picture Matrix
  → questions, risks and validation
  → alternatives, tests and prototypes
  → evidence-driven revision
  → repository semantic reconciliation
  → later file-update planning.
```

It also owns integration review between current conclusions and the real Planning Draft/workflow/application owners.

It does not own:

```text
- concrete project command names, aliases or permissions;
- generic Idea semantics/review algorithm (delegated to shared Idea owners);
- project-local current-state/provenance storage;
- semantic Direction/Use-Case registry entries;
- repository edits, archives, commit or push;
- a managed-object or application-native runtime.
```

## 2. Inputs

The user may provide:

```text
workflow descriptions;
facts and checked sources;
strengths and satisfactory parts;
experienced problems;
suspected risks;
workarounds;
existing ideas;
alternatives;
questions;
decisions and corrections;
returned user-edited drafts;
accepted current meaning or proposed Ideas;
historical provenance ledgers / current-owner exports;
prototype/test evidence;
source-linked registers;
implementation thoughts.
```

Do not require the user to know the artifact type or insertion point.

When useful, establish:

```text
current target;
selected source;
important unknowns;
current review object;
current project-local owner.
```

## 3. Classification Before Promotion

Keep evidence states distinct:

```text
explicit user statement;
checked source fact;
inference;
open question;
decision candidate;
explicit decision;
prototype/test evidence;
register-derived or indirect source.
```

Keep information roles distinct:

```text
current workflow fact;
strength;
user experience;
experienced problem;
suspected risk;
workaround;
existing idea;
desired-result candidate;
criterion candidate;
alternative;
decision;
implementation thought;
prototype/test material;
source material;
Idea/current owner.
```

Keep artifact roles distinct:

```text
Current Reality Capture;
Idea review;
Planning Draft;
Current Conclusions / Related Ideas;
Full Picture Matrix;
Scenario;
End-To-End Workflow;
solution branch;
supporting model/view/terminology;
detail artifact;
Prototype Plan / Result;
File Update Plan.
```

A view or table is not automatically a separate canonical artifact.

## 4. Shared Idea Methodology Integration

When source material contains answer-seeking work, delegate to:

```text
../idea-planning-principles-and-terminology.md
../idea-review-and-planning-workflow.md
../IDEA-REVIEW-TEMPLATE.md
```

Use Standard Idea Review by default. Use Deep Idea Planning when deliberate Variants, evidence/tests or deeper integration work are material.

```text
source / current context
→ classify facts / constraints / decisions / Ideas proportionally
→ review scoped Ideas
→ Current Conclusions / Current Selected Variant when applicable
→ integrate selected meaning into the real Workflow / Planning Draft / Scenario / owner
→ whole-context consistency review.
```

Do not create an intermediate Planning Item merely to normalize source content. Historical ITEM-* records may be consulted as provenance, not as required current owners.

## 5. Representation Selection

```text
1. Identify the semantic core.
2. Preserve accepted current meanings and source relationships.
3. Choose the smallest useful representation.
4. Keep related information together.
5. Omit empty headings.
6. Expand crowded or repeated parts locally.
7. Create linked detail only when independent lifecycle,
   review, reuse, research or testing justifies it.
8. Keep a high-level entry point.
```

Templates are recommended representations, not mandatory schemas.

A simple or non-application solution may remain in one Planning Draft when that provides enough understanding for implementation or a no-change decision.

## 6. Review Object Selection

Choose the smallest complete object that catches the current risk.

Examples:

```text
misunderstood source meaning:
  source-context review plus scoped Idea/current-owner mapping;

wrong desired direction:
  Planning Draft or Result Workflow;

broken workflow continuity:
  End-To-End Workflow;

semantic model conflict:
  complete model/terminology owner plus affected workflows;

unsafe repository transition:
  File Update Plan, generated files and diff;

architecture overreach:
  Implementation Idea, decision or prototype result.
```

Keep distinct:

```text
Review Gate;
Review Object;
Review Status.
```

## 7. Iterative Update Algorithm

```text
1. Read affected current owners and selected new input.
2. Identify evidence states, semantic roles and review object.
3. Use the shared Idea review workflow when answer-seeking work is material.
4. Preserve unchanged accepted meaning.
5. Apply explicit corrections and decisions.
6. Preserve deliberate user wording, order and grouping.
7. Reuse/update existing current owners or Ideas instead of duplicating meaning.
8. Split only independently useful meanings or work targets.
9. Update the smallest complete affected artifact set.
10. Check upstream/downstream and parent/detail relationships.
11. Keep facts, inference, questions, risks, decisions and evidence distinct.
12. Reconsider representation when it becomes hard to use.
13. Return complete affected review objects/files.
14. Record unresolved conflicts and prioritized choices.
```

Planning is not append-only. Correct current meaning explicitly.

## 8. Planning Draft

Build one readable Planning Draft for the current planning direction.

### 8.1 Current Conclusions / Related Ideas — Optional

Include a section of logically ordered links to contributing current owners and material Ideas when that improves navigation/integration.

Possible groups:

```text
primary workflow route;
cross-cutting requirements;
constraints and non-goals;
questions, risks and decisions;
Implementation Ideas.
```

This is navigation/integration support only. Complete meanings remain with their current owners/Idea records; do not create a separate canonical `Idea Map` artifact.

### 8.2 Key Scenario Coverage

A sufficient Planning Draft identifies its Key Scenarios and describes every Key Scenario completely.

Each complete Key Scenario preserves:

```text
semantic name and why it is key;
actor/context;
goal and observable result;
entry/preconditions;
main flow;
branches, alternatives and failures;
invariants, postconditions and acceptance/outcomes;
important Scenario DATA when behavior depends on it;
questions, risks and evidence needs;
contributing current owners / Ideas;
Implementation Ideas only by link/association.
```

Other Scenarios are optional. They may remain summaries or become complete inline sections when that improves review.

Do not assign Key Scenario status automatically. Present candidates and reasons when selection is unresolved.

A direction with no behavioral Scenario records that fact explicitly instead of inventing one.

`Key Scenario` is the same Scenario entity selected for early depth because it affects value, viability, risk, differentiation or architecture.

### 8.3 Full Picture Matrix

Every sufficient Planning Draft contains one compact matrix:

| Flow point | Scenario view | Implementation view | Questions / risks / validation | Status / follow-up |
|---|---|---|---|---|

Rules:

```text
- keep every cell concise;
- link scenario meaning to current owners / related Ideas when useful;
- link implementation meaning to separate Implementation Ideas;
- link questions, risks and prototype needs to their owners;
- do not copy complete Idea/current-owner bodies into the table;
- allow many-to-many links;
- do not create a separate Planning Full Picture artifact;
- use decision/flow points when no behavioral Scenario exists.
```

### 8.4 Optional Semantic Content

Use only when useful:

```text
identity/current status;
desired result;
criteria;
boundaries and non-goals;
Current/Result/Action Workflows;
Current Conclusions / Related Ideas;
existing solutions;
alternatives;
questions and risks;
tests and evidence;
decisions;
selected planning depth;
current conclusion and next action.
```

## 9. End-To-End Workflow Integrity

For a process change reconstruct:

```text
trigger / accepted input;
preconditions;
every mandatory stage;
decisions;
branches;
loops;
review gates;
failure/risk paths;
understandable result or explicit unresolved end state.
```

A peer workflow must not own a mandatory missing middle or completion.

Combine invalid thematic slices or reclassify them as supporting artifacts.

Several workflows are peers only when each has its own trigger, result and independently traversable lifecycle.

Models, views, terminology, root summaries and templates are not workflows automatically.

`End-To-End Complete Picture` may appear as a legacy alias in older files. The preferred term is `End-To-End Workflow`.

## 10. Idea / Current-Owner Integration Review

Use when incoming Idea conclusions, source corrections, evidence or current planning changes may affect an existing Planning Draft, Workflow, Scenario, decision or other current owner.

### 10.1 Select The Incoming Meaning

Prefer explicit current source/Idea selection. Do not silently select an earlier ledger/history file merely because it exists.

### 10.2 Read Current Owners

Inspect only owners materially affected by the incoming meaning. Historical ITEM-* registers may be read for provenance when needed but do not win over current owners.

### 10.3 Compare Current / Incoming / Resulting Meaning

For non-trivial transformations show enough of:

```text
Current
Incoming
Resulting
```

to make corrections, merges, removals, preserved meaning and unresolved conflicts reviewable.

### 10.4 Reintegrate And Review The Whole

```text
local Idea conclusion
→ update candidate Workflow / Planning Draft / Scenario meaning
→ review whole integrated result
→ revise local or wider conclusion when necessary.
```

A locally preferred Variant is not automatically the best whole-workflow solution.

### 10.5 Preserve Unresolved Findings

Material questions, risks, conflicts, dependencies and disputed refinements remain explicit. When a broader aggregate review is produced, reference Related Idea IDs rather than duplicating all local reasoning.

### 10.6 Current Ownership

Accepted current meaning belongs to the real current owner. Do not maintain a parallel canonical Planning Item set and do not convert historical ITEM-* bodies one-to-one into Ideas.

## 11. Current Reality Capture

Current Reality Capture is descriptive.

It may record:

```text
current actions and workflow;
current explanations;
user experience;
strengths;
experienced problems;
suspected risks;
workarounds;
existing ideas;
unknowns and contradictions.
```

It does not silently own accepted future outcomes, architecture or a build decision.

It may be omitted when enough checked current context exists.

## 12. Concerns, Questions And Observability

```text
Planning Lens
  → possible Concern Definition match
  → suggestion/question for one target
  → applicability review
  → optional target-specific work
  → result returned to the affected current owner / Idea and Planning Draft.
```

Presets recommend; they do not mandate.

Derived observability may show:

```text
open questions;
unverified assumptions;
risks;
evidence or prototype needs;
blocked/deferred work;
resolved work.
```

Every indicator drills down to concrete records. It does not become one opaque quality score.

Questions, risks and prototype work may remain in scoped Idea/current-owner work and be linked from the Planning Draft integration view. The Draft does not need to contain their full working logs.

## 13. Existing Solutions, Alternatives And Branches

Consider existing tools, scripts, integrations, process changes, automation, no change and custom build proportionally.

Do not treat inconvenience as automatic proof that a new application is needed.

Keep planning linear while one path is sufficient.

Create a branch only when alternatives need independent planning or testing.

The parent owns:

```text
decision point;
reason for branching;
selection/rejection criteria;
evidence gaps;
branch inventory;
comparison and final decision.
```

## 14. Tests, Prototypes And Solution Validation

Start from uncertainty and the affected decision.

Record proportionally:

```text
hypothesis/question;
risk/key situation;
reason to test now;
minimum setup;
evidence to observe;
success/failure/inconclusive criteria;
decision affected;
artifact/code fate.
```

Create separate prototype artifacts only when setup, evidence, execution or review has an independent lifecycle.

Keep distinct:

```text
implementation verification:
  does the implementation work as specified?;

solution validation:
  does the complete workflow solve the intended problem effectively?
```

Observed evidence updates affected Ideas/current owners, criteria, workflows, questions, risks and decisions.

## 15. Optional Entry Into Detailed Planning

Detailed planning is useful when enough are stable and separate artifacts reduce risk or coordination cost.

Possible signals:

```text
many interacting scenarios;
complex shared concepts or lifecycle;
high cost of change;
parallel work;
independent deliverables;
multiple release cycles;
important cross-scenario consistency.
```

When a specialized Scenario/Domain/Slice profile is selected, use its owner.

Do not require that profile for:

```text
simple applications;
non-application solutions;
narrow scripts or automation;
workflows sufficiently planned in one Planning Draft.
```

Outside the selected specialized profile, Scenario DATA and Behavior meaning may remain inline when that is sufficient.

Inside the selected specialized profile, follow the profile's separate logical Scenario, supported Scenario DATA and Behavior Item Reference Object contract; physical definitions may still share a registry file.

### 15.1 Optional Application-Level Views

When application planning materially benefits from a reusable cross-Scenario view, consider the optional application-level views defined by the principles owner:

```text
Window / Surface Map
  → create only after an explicit decision for this application
    and only when cross-Scenario surface/navigation visibility adds value;

Core Loop
  → create only when a recurring-value view adds meaning
    beyond ordinary recurring/frequent Scenario-chain notation.
```

Do not manufacture either artifact as a standard application-planning stage.

## 16. Dynamic Revision

When corrected or new evidence arrives:

```text
update current truth;
preserve deliberate source wording;
revisit affected Ideas/current owners and questions;
revisit upstream/downstream artifacts;
change representation when needed;
keep a high-level entry point.
```

Deep work must return accepted results to owning current artifacts and the Planning Draft.

## 17. Checks Before Returning

```text
- source and review object are explicit;
- shared Idea review was used when answer-seeking work was material;
- accepted meanings were not shortened;
- evidence states remain distinct;
- workflow integrity is checked where relevant;
- models/views/terminology are not mislabeled as workflows;
- Current/Incoming/Resulting transformations remain traceable;
- source/provenance survives;
- validation signals survive;
- Planning Draft does not duplicate current-owner or Idea ownership;
- every sufficient Planning Draft contains one Full Picture Matrix view;
- every Key Scenario is complete while other Scenario depth remains proportional;
- implementation thoughts remain non-final;
- no application/runtime assumption was invented;
- no repository permission was inferred.
```

## 18. Do Not

```text
- Do not require template-ordered input.
- Do not duplicate generic Idea methodology.
- Do not replace complete source messages with excerpts.
- Do not create Source Idea or Candidate entities.
- Do not treat every fragment as an Idea.
- Do not treat every Idea as accepted/final meaning.
- Do not compress or split planning meaning mechanically merely for length.
- Do not preserve invalid thematic peer workflows.
- Do not treat models, views or terminology as workflows automatically.
- Do not make concern presets mandatory.
- Do not create deep-work files mechanically.
- Do not create a branch for every option.
- Do not turn implementation thoughts into architecture.
- Do not put project-specific storage/schema in reusable methodology.
- Do not choose exact wrapper syntax here.
- Do not make AI explanation a second canonical source.
- Do not require a separate Full Picture artifact.
- Do not force Scenario/Domain/Slice layers on simple work.
- Do not edit repository files, create archives, commit or push
  through this workflow alone.
```
