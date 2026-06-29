# Application Planning Principles

Status: provisional reusable principles
Scope: stable guidance for planning an application before detailed scenario, domain and slice design.

## 1. Purpose

Application planning should reduce the risk of thoroughly designing the wrong product, solving only a visible symptom or preserving an unnecessarily complicated workflow.

The process should answer, in order:

```text
What does the user actually do now?
Why does each current step exist?
What does the user experience at each step?
Which parts are useful or satisfactory?
Which concrete problem situations, suspected risks, workarounds, existing ideas and unknowns are present?
Which current-state observations should later stages investigate?
What should be improved, preserved or left unchanged?
Can the workflow be kept, simplified, removed, integrated or automated before building?
Do existing solutions or workflows already solve the remaining problems?
Should the idea be integrated into an existing environment?
Why might the solution remain useful in the future?
What core user scenarios express the reason to build it?
What broad implementation directions are plausible?
Which uncertainties should be tested before detailed planning?
What did the prototypes teach us?
```

## 2. Evidence Boundary

```text
Confirmed:
  explicit user statements and checked source facts.

Inference:
  a reasoned interpretation that still requires confirmation.

Question:
  an important unknown that should remain visible.

Critical remark:
  a structural, logical, economic or technical concern.

Related idea:
  a possible improvement or alternative, not a requirement.

Decision:
  an explicit accepted choice with its current rationale.
```

AI must not silently promote an inference, criticism or idea into a confirmed requirement.

## 3. Current Workflow And User-Experience Capture

Before researching products, defining improvements or proposing a solution, capture the current activity as an end-to-end workflow and a current user-experience record.

The first stage is descriptive. It records what exists now and what the user currently understands, experiences, fears, works around or imagines.

The user is not required to begin with:

```text
- a clearly formulated problem;
- a root-cause explanation;
- a desired improvement;
- a product concept;
- a complete workflow description;
- confidence that anything should change.
```

The user may provide a complete algorithm, fragmented memories, complaints, positive experiences, suspected risks, examples, uncertainties or already imagined ideas. These are valid forms of first-stage input, not separate planning modes.

For each meaningful current workflow step, capture when available:

```text
- stable step ID;
- trigger and purpose;
- current actions;
- inputs and outputs;
- tools and environments;
- dependencies on prior information or decisions;
- current strengths and satisfactory parts;
- user experience and feelings;
- experienced problem situations;
- suspected problems or risks;
- current workarounds;
- exceptions and current alternative paths;
- frequency and current impact when known;
- existing user ideas associated with the step;
- important unknowns.
```

The first stage must not formulate:

```text
- improvement targets;
- desired future outcomes;
- candidate changes to workflow steps;
- keep / simplify / remove / integrate / automate / build decisions;
- target workflows;
- accepted product requirements;
- solution comparisons.
```

### Current-state evidence types

Keep these forms distinct:

```text
current workflow fact:
  what the user currently does or a checked fact about the current environment;

current strength:
  what already works well or feels satisfactory;

user experience:
  how the workflow feels to the user, including confidence, friction,
  cognitive load, uncertainty and fear of losing information;

experienced problem situation:
  a concrete undesirable situation that has actually occurred;

suspected problem or risk:
  a possible weakness or future failure that is not yet confirmed;

current workaround:
  what the user currently does to compensate;

existing user idea:
  an idea already supplied by the user and recorded without evaluation;

unknown:
  information the user has not provided or does not know.
```

### Descriptive problem groupings

Problem situations may be grouped under provisional IDs when this helps preserve relationships across steps.

Such a grouping is descriptive only. It may be added, split, merged, renamed or removed to represent the user material more accurately, but it is not a root-cause conclusion, an improvement target or a product requirement.

Maintain both views when useful:

```text
workflow-step view:
  what happens and what is experienced at each current step;

cross-step view:
  which current experiences or problem situations recur across steps.
```

Use stable IDs for current-state records so corrections, repeated experiences and cross-step relationships remain unambiguous.

## 4. Opportunity And Ecosystem Research

After the current workflow and user experience are captured, later analysis may formulate provisional improvement targets by referencing specific current-state IDs.

Only at this stage should planning examine:

```text
- which current observations may justify change;
- which useful current behavior must be preserved;
- direct ready-made solutions;
- alternative workflows that avoid a new product;
- adjacent products and platforms;
- solutions for individual workflow steps or cross-step problem situations;
- integration, extension and build options;
- future changes that could strengthen or invalidate the need.
```

A comparison should keep explicit traceability to the current-state record.

A valid result may be:

```text
keep the current step;
simplify the workflow;
remove a step;
build;
integrate;
extend an existing product;
use a workflow or scripts;
defer;
run a prototype first;
stop because a new solution is unnecessary.
```

Research should not be written as advocacy for the preferred idea. Alternatives and reasons not to build must remain visible.

## 5. Product Legend

The Product Legend is a compact causal and value model, not marketing copy.

It should explain:

```text
who has the problem;
what happens today;
why the current situation is insufficient;
why existing alternatives do not fully solve it;
what fundamental change the application proposes;
what useful loop the application enables;
why the idea is worth testing;
what it explicitly does not promise;
how useful success would be observed.
```

The Legend should remain smaller and more stable than the full scenario set.

## 6. Deriving Core Value Scenarios

Core value scenarios are derived from the Legend statements that explain why the product is needed.

Classify scenarios as:

```text
core value scenario:
  directly demonstrates the proposed value;

supporting scenario:
  enables a value scenario but does not prove the idea by itself;

future scenario:
  expands the product but is not needed for the current value test.
```

A polished file explorer, settings screen or workspace creator may be necessary, but it does not prove value unless it participates in the core value loop.

Full scenarios should be created through the existing scenario-draft principles and template rather than being fully defined inside the Product Legend.

## 7. Solution Overview

The solution overview is a broad feasibility and option map before detailed architecture.

It should compare plausible approaches such as:

```text
standalone application;
extension inside an existing platform;
shared narrow core with one primary client;
CLI or scripts;
integration with an existing product;
no-build workflow.
```

It should identify:

```text
required capabilities;
reusable existing capabilities;
system boundaries;
major components;
integration constraints;
technical unknowns;
major risks;
rough relative effort;
prototype candidates.
```

No approach is accepted merely because it appears in the overview.

### Shared core with clients

A `core + extension/standalone clients` direction means that domain rules and state transitions are separated from UI-specific code.

A narrow core may own:

```text
identities;
references;
dependency-state rules;
review transitions;
context assembly;
deterministic counts.
```

A client may own:

```text
VS Code tree views and commands;
standalone screens;
editor integration;
platform-specific Git and filesystem adapters.
```

This does not require microservices or several products at the start. A safe first form is one application using a small internal library.

The main risk is premature generalization. Do not design a universal platform before the first closed workflow is proven.

## 8. Prototype Purpose

A prototype exists to produce decision-relevant learning, not merely to demonstrate progress.

Each prototype should state:

```text
hypothesis;
question being tested;
reason to test now;
minimum sufficient setup;
evidence to collect;
success, failure and inconclusive criteria;
timebox;
decision affected;
whether the code is throwaway or evolutionary.
```

## 9. Prototype Types

The taxonomy is pragmatic rather than a single universal standard. A prototype may fit more than one type.

### Workflow / UX prototype

Tests whether a user understands and can perform a workflow. It may use static or simulated behavior.

### Technical spike

A short investigation of a technical unknown, such as object identity, parsing, diff mapping or platform API behavior.

### Integration prototype

Tests whether a selected environment, such as VS Code, GitHub or a local filesystem, can support the required workflow.

### Value prototype

Tests whether the mechanism produces meaningful benefit in realistic work, not only whether it can be implemented.

### Horizontal prototype

Covers many screens or functions shallowly to test structure and navigation.

### Vertical prototype / steel thread

Implements one narrow scenario through the relevant layers and is especially useful for proving a core value loop.

### Proof of concept

Shows that a specific idea or mechanism is feasible.

### Pilot

Uses an almost-real solution in a limited real environment, such as one repository or one user.

### Throwaway and evolutionary prototypes

```text
throwaway:
  code is created to obtain knowledge and is not a production foundation;

evolutionary:
  code may become part of the product and therefore needs deliberate boundaries and tests.
```

The intended fate of the code should be chosen before implementation.

## 10. General Prototype Principles

```text
- Start from the uncertainty, not from a desired feature.
- Test the highest-risk assumption early.
- Use the lowest fidelity that can answer the question.
- Do not combine unrelated hypotheses without a reason.
- Define success, failure and inconclusive outcomes before execution.
- Timebox the experiment.
- Use realistic data where realism changes the result.
- Distinguish a working demo from production readiness.
- Preserve the learning, not only the code.
- Treat negative results as useful evidence.
- End with a decision gate: proceed, change direction, run another experiment, defer or stop.
```

## 11. Iterative Artifact Chain

```text
current user input
  → current workflow steps and user-experience records
  → experienced problems, suspected risks, workarounds, ideas and unknowns
  → later-stage improvement targets linked to current-state IDs
  → opportunity research evidence and alternatives
  → Product Legend
  → core value scenarios
  → solution overview
  → prototype hypothesis
  → prototype result
  → revised research, Legend, scenarios and overview
```

The current-state artifact is corrected when new information shows that the recorded present workflow was incomplete or inaccurate. It is not silently rewritten to resemble a proposed future workflow.

Downstream artifacts should expose contradictions with upstream assumptions rather than silently working around them.

## 12. AI-Assisted Planning Principles

```text
- The user supplies current experience in whatever level of structure is available; the user is not required to diagnose the problem or design the solution.
- AI reconstructs and structures current-state material without converting it into improvement targets.
- AI structures later-stage material according to the principles and templates.
- AI asks important questions and prioritizes blockers.
- AI provides critical remarks and alternatives separately from requirements.
- AI may create descriptive cross-step problem groupings, but must not turn them into root-cause conclusions or improvement targets during the first stage.
- Answers and decisions remain in the artifact set.
- Unknown sections remain `not provided` or explicitly unresolved.
- For a small active artifact family, returning the full current draft set is preferred so context is not lost.
```

## 13. Current Exclusions

This principles file does not define:

```text
- file or artifact version-control mechanics;
- action logging;
- source links, dependency propagation or stale-review rules;
- JSON import/export contracts;
- command aliases or runtime routing;
- detailed production architecture.
```

## 14. Success Criteria

The planning process is useful when:

```text
- the current workflow and user experience are understandable before improvements or a product are proposed;
- the first-stage record distinguishes current facts, strengths, experiences, experienced problems, suspected risks, workarounds, existing ideas and unknowns;
- later improvement targets trace back to stable current-state references;
- useful existing steps can later be preserved rather than rebuilt;
- unnecessary or overly complex steps can later be removed or simplified;
- an unnecessary build can be rejected or redirected early;
- the Product Legend explains the reason to test the idea;
- core value scenarios trace back to that reason;
- major solution options and uncertainties are visible;
- prototypes produce evidence tied to decisions;
- detailed planning begins with fewer hidden assumptions;
- AI assistance remains reviewable and does not become the source of user requirements.
```
