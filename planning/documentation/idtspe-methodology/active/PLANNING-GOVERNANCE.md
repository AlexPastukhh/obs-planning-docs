# Planning Governance — Active Methodology Decisions

Status: active semantic owner for **global planning-methodology decisions inside this working workspace**  
Scope: decisions that affect several SDS / IDTSPE phases or the way ChatGPT and the user share planning authority.  
Not repository-canonical until a later repository consistency / update process accepts it.

Navigation remains in `README.md`.

---

# G-01 — High-Level Planning Direction

Selected working direction:

```text
SDS high-level phases
→ decomposed into narrower IDTSPE instances
→ one independently selectable/revalidatable Target is usually one instance
```

A high-level Phase is navigation/deep-dive grouping.

It is not automatically one IDTSPE instance.

---

# G-02 — Current First User-Facing Workflow

Working workflow:

```text
Solution Discovery / Whole-Solution Planning
```

Desired user intent/command:

```text
план решения
```

Target semantics desired from that route:

```text
if trusted Need/Reality does not exist:
  run Need / Reality / Real-World Problem target first

then:
  run Solution Discovery / Route Comparison
  through TARGET_FORMATION_RESOLUTION_SET

valid:
  no new Target
  one bounded real-life route Target
  several sibling route/scope Targets
  material composition Target only when needed

result:
  accepted real-life route/result Source package
  + optional own-software contribution
```

The current repository already contains a similarly named route.

This is only a **reuse candidate** until explicit consistency audit confirms:

```text
current command/UC/workflow semantics
vs
selected target semantics here
```

Do not infer equivalence from the name.

---

# G-03 — Three Generic Decision Types Are Durable

For every material selectable Target, the available Decision types are:

```text
Target-Scope Decision
Question-Set Decision
Answer Decision
```

Material selected Decisions must survive the chat turn.

They may be embedded beside the correct target owner; they do not require one file per Decision.

---

# G-04 — AI Proposal Is An Idea Until Accepted

Fundamental rule:

```text
AI-generated candidate
= Idea / Variant / proposal

≠ accepted Decision
```

When ChatGPT invents a possible:

- Target boundary;
- RQ;
- solution;
- file decomposition;
- architecture pattern;
- requirement;
- workflow;
- refactor;
- future capability;

it must treat the proposal using the same planning methodology as any other Idea.

At minimum when material:

```text
Potential Need / Problem
Idea
Origin: AI proposal
Alternatives
Evidence / assumptions
Q/R/P
status: PROPOSED / UNSELECTED
```

The AI may compare/refine Ideas.

It must not silently upgrade its own Idea into a selected Decision.

---

# G-05 — User Authority Guard

Default planning authority:

```text
AI proposes / analyzes / derives from Sources

USER confirms material choices
unless the user explicitly delegated that class of choice
```

Therefore:

```text
AI Idea
→ no semantic adoption as current Decision without confirmation

AI Idea
→ no mutation/action merely because AI proposed it
```

This is separate from mutation permission:

```text
Decision confirmation
≠ file/code mutation authorization
```

Both gates may exist.

---

# G-06 — Internal Question Types Must Stay Distinct

Do not collapse these:

## Resolution Question (`RQ`)

A planning question whose answer helps construct the Target.

It may be answered from Sources, Evidence or competing Ideas.

It is not automatically asked to the user.

## Lens Prompt

A reusable evaluation question used internally by ChatGPT.

Example:

```text
Does this candidate duplicate an existing canonical owner?
```

It is not a persisted Q/R/P Question and is not automatically a user-facing question.

## Q/R/P `Q`

A concrete material unresolved uncertainty attached to a planning subject/Decision.

It persists only when material.

## User Question / Decision Gate

A question actually presented to the user because user-only information or user authority is required.

It is not automatically a Q/R/P concern.

---

# G-07 — User Question Policy

ChatGPT must **not freely invent user-facing questions** merely because:

- a Lens contains prompts;
- an RQ exists;
- more detail could theoretically be useful.

A user-facing question is allowed by the methodology only when one of these is true:

```text
A. it comes from an explicit saved User Decision / Question Gate preset;

B. a material user-only fact is missing and cannot be resolved from Sources;

C. a material choice belongs to user authority and must be confirmed;

D. the user explicitly asked ChatGPT to question/interview them.
```

Otherwise ChatGPT should:

```text
use available Sources
→ state assumptions/unknowns
→ propose Decisions Needed
```

rather than interrogating the user.

---

# G-08 — User Decision Gate Is Not A New First-Class Module Type

Keep the public module taxonomy small:

```text
Lens
Validator
Guard
Rule
Pack
```

`User Decision Gate` is a **Guard/Rule interaction pattern**.

Purpose:

```text
prevent ChatGPT from deciding a user-owned material choice silently
```

Behavior:

```text
material user-owned Decision required
↓
show:
  decision subject
  candidate choices
  recommendation when useful
  decisive Evidence/Q/R/P
↓
ask the saved/derived gate question
↓
wait for explicit selection/confirmation
```

---

# G-09 — Activated Methodology Must Be Visible

For a material IDTSPE instance, ChatGPT should be able to show:

```text
Activated Presets
Activated Lenses
Activated Guards
Activated Validators
Activated Rules / Packs
```

This is an execution/provenance view.

Do not mix all of them under the word “Lens”.

Reusable Lens authority lives in canonical generic/profile Lens owners (`active/idtspe-core/lenses/` and `active/profiles/<profile>/lenses/`). Target Modules declare Lens Profiles; they do not become owners of reusable cross-cutting Lens knowledge.

Activation classes:
```text
REQUIRED_CORE
FREQUENT_CONDITIONAL
TARGET_PROFILE_REUSABLE
LOCAL_ONLY
```

Example:

```text
Preset:
  NEED-REALITY-RQ-PRESET-01

Lenses:
  L1 Need / Value / Scope — required
  L2 Authority / Source-of-Truth / Reuse — required
  L3 Uncertainty / Assumption / Reversibility — required check; may resolve as no material uncertainty

Frequent conditional:
  L4 Dependency & Change Impact
  L5 WEUC / Target Evolution / Architecture Fitness
  L6 Verifiability / Observability / Operability
  Quality / Risk Materiality

Guards:
  User Authority Guard
  AI Idea Is Proposal Guard

Validators:
  Source Contract
  Decision Persistence
  Revalidation Readiness
```

---

# G-10 — Future / Unassigned Ideas Need An Explicit Retention Decision

Useful Ideas discovered outside the current Target scope remain ordinary Generic Idea State.
They do **not** require one SDS-global inbox or a new semantic owner.

When retention is useful, Documentation / Representation + P-14 / TF-10 may choose:

```text
current natural owner
existing project register / inbox
another profile-selected owner
NONE / ephemeral conversation state
```

Any register/inbox is navigation/retention infrastructure only. It is not Current Plan, a
Decision store, semantic authority for the future feature, or automatic backlog commitment.

When a later Target becomes clear, the Idea may be referenced/moved into that Target under
normal Core Resolution and ordinary ownership rules.

---

# G-11 — Navigation README Does Not Own Planning Semantics

Selected workspace rule:

```text
README
= navigation

PLANNING-GOVERNANCE.md
= global planning-methodology Decisions / concerns

Generic Idea State / optional selected register
= unassigned future Ideas when retention is useful
```

This avoids turning navigation into a hidden semantic authority.

---

# G-12 — Artifact / File Planning Remains Independently Composable

Selected:

```text
Artifact / File Realization Pack
```

is not a mandatory semantic SDS stage.

It can be activated independently when a Target needs physical repository representation.

File-layout Ideas produced by AI are still Ideas and remain subject to G-04/G-05.

---

# Global Planning Concerns

## Q-GOV-01 — Explicit confirmation granularity

How much can one user confirmation accept at once?

Possible:

```text
one Decision at a time
or
one clearly enumerated Decision bundle
```

Current direction:

```text
allow a bundle when each Decision is visible and independently rejectable;
do not hide several semantic choices behind one vague “ок”.
```

## Q-GOV-02 — Delegated decision authority

Should a future command allow modes such as:

```text
propose only
auto-select low-risk methodological choices
auto-select all planning choices except listed gates
```

Current default:

```text
propose + user confirms material semantic choices
```

## Q-GOV-03 — Persistence implementation

Exact repository representation of:

```text
Target-Scope Decisions
Question-Set Decisions
Answer Decisions
```

remains open until current owner consistency audit.
