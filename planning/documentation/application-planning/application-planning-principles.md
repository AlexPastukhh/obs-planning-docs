# Application Planning Principles

Status: provisional reusable principles
Scope: stable guidance for planning an application before detailed scenario, domain and slice design.

## 1. Purpose

Application planning should reduce the risk of thoroughly designing the wrong product or the wrong implementation direction.

The process should answer, in order:

```text
Is there a real problem worth addressing?
Do existing solutions or workflows already solve it?
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

## 3. Opportunity And Ecosystem Research

Before deciding to build, examine:

```text
- the problem and current workflow;
- direct ready-made solutions;
- alternative workflows that avoid a new product;
- adjacent products and platforms;
- integration, extension and build options;
- future changes that could strengthen or invalidate the need.
```

A valid result may be:

```text
build;
integrate;
extend an existing product;
use a workflow or scripts;
defer;
run a prototype first;
stop because a new solution is unnecessary.
```

Research should not be written as advocacy for the preferred idea. Alternatives and reasons not to build must remain visible.

## 4. Product Legend

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

## 5. Deriving Core Value Scenarios

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

## 6. Solution Overview

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

## 7. Prototype Purpose

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

## 8. Prototype Types

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

## 9. General Prototype Principles

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

## 10. Iterative Artifact Chain

```text
research evidence and observations
  → Product Legend
  → core value scenarios
  → solution overview
  → prototype hypothesis
  → prototype result
  → revised Legend, scenarios and overview
```

Downstream artifacts should expose contradictions with upstream assumptions rather than silently working around them.

## 11. AI-Assisted Planning Principles

```text
- The user supplies product understanding, observations and decisions.
- AI structures material according to the principles and templates.
- AI asks important questions and prioritizes blockers.
- AI provides critical remarks and alternatives separately from requirements.
- Answers and decisions remain in the artifact set.
- Unknown sections remain `not provided` or explicitly unresolved.
- For a small active artifact family, returning the full current draft set is preferred so context is not lost.
```

## 12. Current Exclusions

This principles file does not define:

```text
- file or artifact version-control mechanics;
- action logging;
- source links, dependency propagation or stale-review rules;
- JSON import/export contracts;
- command aliases or runtime routing;
- detailed production architecture.
```

## 13. Success Criteria

The planning process is useful when:

```text
- an unnecessary build can be rejected or redirected early;
- the Product Legend explains the reason to test the idea;
- core value scenarios trace back to that reason;
- major solution options and uncertainties are visible;
- prototypes produce evidence tied to decisions;
- detailed planning begins with fewer hidden assumptions;
- AI assistance remains reviewable and does not become the source of user requirements.
```
