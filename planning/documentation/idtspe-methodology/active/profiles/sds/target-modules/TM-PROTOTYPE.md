# TM-PROTOTYPE — Prototype / Experiment

Entry Point: `tm.prototype`  
Role: evidence Target Module

## Purpose

Discover material doubts that can change current planning and choose the cheapest credible prototype/experiment for doubts worth resolving before main implementation.

Prototype may test:

```text
concept/value doubt
core real-life Scenario necessity
interaction/UI/navigation doubt
information/DATA comprehension
technical feasibility
integration
performance/scale
operational/environment behavior
```



## High-Level Example — Self-Contained Walkthrough

### Situation

Application Definition says the product should let a user save a research fragment without losing reading context.

Two important doubts remain:

```text
U-01:
  can the interaction really be completed quickly and intuitively?

U-02:
  can the browser/platform reliably provide the required source context?
```

### Why This Module

These are uncertainties that may change the product or technical direction **before** expensive implementation.

`TM-PROTOTYPE` exists to decide which doubts deserve early practical Evidence and what minimum experiment can answer them credibly.

### Walkthrough

For `U-01`, a clickable UI fake may be enough:

```text
real:
  user task
  navigation
  Screen layout

stubbed:
  actual persistence
  server behavior
```

Observe:

```text
can the user discover capture?
how many steps are needed?
does the user hesitate/backtrack?
can the user return to reading?
```

So:

```text
U-01 → PROTOTYPE_NOW
```

For `U-02`, a tiny technical spike may verify API access now, but final reliability still depends on real integration:

```text
U-02 → BOTH
```

During the prototype someone suggests a floating mini-window. That is recorded as an early Idea, not selected as canonical Screen architecture.

### Result

The module produces:

```text
explicit uncertainty map
Evidence timing
minimum credible experiment
real vs simulated boundary
observed Evidence
limitations
disposition:
  supported / challenged / inconclusive / later
```

Items marked `BOTH` or `IMPLEMENT_AND_TEST_LATER` preserve their Evidence question for later Practical Test.

### Boundary / Lesson

A convincing fake UI does not prove the final implementation works.

Prototype shape does not automatically define final Screen, Scenario or Architecture.

## Upstream Source Contract

### Direct Semantic Sources
```text
accepted Refined Core Real-Life Scenario when present
otherwise Step-02 selected real-life solution result
Application Definition / Concept / Responsibility
candidate Scenario/interaction hypothesis when relevant
current unresolved Decisions / Q/R/P / assumptions
```

### Inherited Lineage
```text
Fundamental Need / Step-02 provenance
```

### Evidence / Current-State Sources
```text
market/reference Evidence
existing research/usability/technical Evidence
current implementation when extending an existing product
```

### Constraint / Planning-State Sources
```text
time/cost/tool/environment limits
real-vs-simulated boundary
```

### Source Discovery Rule
Expected archetype only; current `TF-04 SOURCE_SET` remains authority.

## Knowledge Basis

Shared contract: [`knowledge-basis-contract.md`](../../../idtspe-core/shared/knowledge-basis-contract.md)

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- Prototype is an evidence-producing Target for material uncertainty, not an early declaration of final product truth.
- Prototype fidelity/method should be only as strong as needed to answer the current Evidence question.
- Prototype Evidence preserves what was real/stubbed/mocked/manual and remains distinct from later implemented Evidence.

**Referenced Knowledge Owners:**

`NONE`

**Reference Load Policy:**

No additional Target-Module Knowledge Basis body is required by default; reusable practical-evidence mechanics are attached through the Practical Evidence Lens.

**Operationalization Notes:**

This Knowledge Basis supports planning this recurring Target/result family. It is not a current Target Source, project truth or Decision. Reusable cross-Target evaluation knowledge remains in the Lens owners named by this module's `Lens Profile`; do not duplicate their Operational Evaluation Contract or Knowledge Basis here.

## Question Set Examples — Non-Exhaustive

Examples only.

```text
What material doubts exist now?
Which doubt can change Application/Core-Scenario/Screen/technical Decisions?
Which are UI/usability vs technical/integration/performance doubts?
What can a fake/stubbed UI credibly answer?
What needs a throwaway mini-app/technical spike?
What can only be answered by final integrated implementation?
Should timing be PROTOTYPE_NOW / IMPLEMENT_AND_TEST_LATER / BOTH / NO_PRACTICAL_TEST_NEEDED?
What observation would support/challenge the hypothesis?
Which premature implementation/UI ideas should be stored without selecting them?
```

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../../../idtspe-core/lenses/README.md):
- [`LENS-NEED-VALUE-SCOPE`](../../../idtspe-core/lenses/required/LENS-NEED-VALUE-SCOPE.md) — L1.
- [`LENS-AUTHORITY-SOT-REUSE`](../../../idtspe-core/lenses/required/LENS-AUTHORITY-SOT-REUSE.md) — L2.
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../../../idtspe-core/lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md) — L3; required check may resolve as `no material uncertainty`.
- [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../../../idtspe-core/lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md) — Documentation / Representation; required materialization-stage check that may resolve as `NO_PERSISTENCE_NEEDED` or implementation-native/existing-owner representation.

Primary reusable Lens Pack(s):
- [`LENS-PRACTICAL-EVIDENCE`](../../../idtspe-core/lenses/reusable/LENS-PRACTICAL-EVIDENCE.md) — required for credible pre-implementation practical Evidence

Frequent conditional Lens(es):
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../../../idtspe-core/lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — when the experiment/result must be observable/operable credibly
- [`LENS-QUALITY-RISK-MATERIALITY`](../../../idtspe-core/lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — when testing performance/reliability/accessibility/security/etc

## Target-Specific Output Template

Generic IDTSPE state is not repeated here.

### Prototype Identity / Decision Context

**Prototype ID** — stable experiment identity.

**Affected Decision / Target** — what planning answer the Evidence can change.

### Uncertainty Map

For each material uncertainty:

```text
Uncertainty ID
Category:
  CONCEPT_VALUE
  CORE_SCENARIO
  INTERACTION_UI
  INFORMATION_DATA
  TECHNICAL_FEASIBILITY
  INTEGRATION
  PERFORMANCE_SCALE
  OPERATIONAL_ENVIRONMENT
Question / Hypothesis
Why material
Evidence Timing:
  PROTOTYPE_NOW
  IMPLEMENT_AND_TEST_LATER
  BOTH
  NO_PRACTICAL_TEST_NEEDED
Downstream owner/reopen route
```

### Selected Experiment

**Method** — clickable fake, throwaway mini-app, technical spike, mocked integration, benchmark, concierge/manual simulation, etc.

**Subject Under Test** — what is actually exercised.

**Real / Simulated Boundary** — what is real vs stubbed/mocked/manual.

**Included / Excluded** — keep the experiment minimal.

### Practical Evidence Protocol

Reuse `../../../idtspe-core/shared/practical-evidence-method.md`:

```text
Actor/participant/operator
real-life/Application Scenario context
setup
task/action
observation plan
discriminating signals
run record
limitations/confounders
```

For interaction-heavy checks this may include completion time, backtracking, orientation between Screens/windows, hesitation, DATA/feedback comprehension and recovery.

### Observed Evidence / Interpretation

Keep actual observations separate from interpretation.

Disposition:

```text
SUPPORTED_ENOUGH_FOR_CURRENT_DECISION
CHALLENGED
INCONCLUSIVE
DEFERRED_TO_IMPLEMENTED_EVIDENCE
```

### Premature / Loose Ideas Routing

Prototype often creates early UI/technical/Scenario ideas that are not selected decisions.

Store them in:

```text
SDS-PLANNING-STATE/ideas/INBOX.md
or
SDS-PLANNING-STATE/ideas/early/IDEAS.md
```

Already classifiable Scenario/Screen ideas can go to `ideas/scenario/IDEAS.md`.

Do not let prototype shape silently become canonical architecture/Screen/Scenario.

## Artifact / File Contract

### Structured Artifact / File Proposals

These proposal records are the Target Module's local placement guidance. [`ARTIFACT-PLACEMENT-MAP.md`](../ARTIFACT-PLACEMENT-MAP.md) projects them into the annotated SDS materialization tree; this Target Module remains the source.

```text
ARTIFACT_PROPOSAL
ID: AP-PROT-01
CONTENT_KIND: PROTOTYPE_INQUIRY_AND_DISPOSITION
WHEN: prototype Evidence can change a material Decision
GUIDANCE: REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Prototype Target
REPRESENTATION: EXISTING_OR_NEW_CANONICAL_ARTIFACT
FILE_OR_ARTIFACT: <prototype-owner>
CONTENT: uncertainty map; Evidence timing; experiment boundary/protocol; interpretation; disposition; deferred Evidence questions
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-PROT-02
CONTENT_KIND: PRACTICAL_EVIDENCE_RUN_DATA
WHEN: raw run data/media/logs/measurements are bulky or independently reused
GUIDANCE: PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Prototype Target as interpreter; raw Evidence is supporting Evidence
REPRESENTATION: SUPPORTING_EVIDENCE_ARTIFACT
FILE_OR_ARTIFACT: <prototype-evidence-artifact>
CONTENT: actual observations/run records with limitations; referenced from Prototype owner
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-PROT-03
CONTENT_KIND: PREMATURE_IDEA
WHEN: experiment produces unselected product/UI/technical idea
GUIDANCE: PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: UNRESOLVED until selected by a real owner
REPRESENTATION: REGISTER_ENTRY
FILE_OR_ARTIFACT: SDS-PLANNING-STATE/ideas/INBOX.md or appropriate layer IDEAS.md
CONTENT: unselected idea with provenance; not Prototype truth
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

**REQUIRED** — Prototype Evidence that materially supports/challenges a Decision or must be handed to later Practical Test must survive in a persistent Prototype/Evidence owner or supporting Evidence artifact.

**PREFERRED** — keep uncertainty map + selected experiment + disposition together in the Prototype Target artifact; split raw/run Evidence only when volume/reuse/review lifecycle justifies a supporting Evidence artifact.

**ROUTE ELSEWHERE** — unselected UI/Scenario/technical ideas go to the global Ideas area, not into canonical Screen/Scenario/Architecture files.

**Do not create** a final implementation owner merely because the prototype used a particular fake/stub structure.

`P-14` must distinguish ephemeral experiment scratch from Decision-supporting Evidence that requires persistence.

## Guards

```text
prototype ≠ final implementation
prototype Screen/Scenario ≠ canonical owner
prototype success ≠ proof final implementation works
a question requiring real integrated environment must not be "answered" by a fake
```

## Handoff

```text
findings → Application/Scenario/Screen/other real owners
BOTH / IMPLEMENT_AND_TEST_LATER → preserve Evidence Question for TM-PRACTICAL-TEST / TM-TEST-DESIGN
loose ideas → SDS-PLANNING-STATE/ideas/
```
