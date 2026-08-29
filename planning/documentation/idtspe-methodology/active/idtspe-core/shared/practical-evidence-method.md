# Practical Evidence Method — Prototype And Post-Implementation Practical Testing

Status: active reusable evidence method  
Used by: `TM-PROTOTYPE`, `TM-PRACTICAL-TEST`

## 1. Purpose

Prototype and post-implementation practical testing are two phases of the same evidence discipline:

```text
material uncertainty / property
↓
practical observation protocol
↓
actual Evidence
↓
interpretation
↓
Decision support / acceptance / residual uncertainty
↓
when accepted meaning is materially challenged: Finding Candidate
↓
Core Finding Disposition selects revalidation/reopen only when warranted
```

They remain separate Target Modules because their **subject and evidentiary strength differ**.

```text
TM-PROTOTYPE
  before main implementation
  partial/simulated/throwaway subject allowed
  reduces uncertainty
  cannot prove the final implementation merely because the prototype worked

TM-PRACTICAL-TEST
  after implementation candidate exists
  exercises the real implementation/environment proportionally
  can provide operated acceptance Evidence
```

## 2. Shared Practical Evidence Inquiry

A practical evidence inquiry should explain:

```text
Evidence Question / Uncertainty
Affected Decision / Target / Requirement
Why practical observation is useful
Subject Under Test
Real vs Simulated Boundary
Actor / Participant / Operator profile
Real-Life / Application Scenario context
Setup / starting state
Task / Action
Observation Plan
Expected discriminating signals
Run Record(s)
Observed Evidence
Limitations / confounders
Interpretation
Disposition
```

This is a reusable evidence record, not a new semantic Target type.

## 3. What Can Be Observed

Choose only observations relevant to the uncertainty/property. Examples:

```text
task/scenario completion
completion time / latency perceived by actor
number of steps
backtracking / repeated actions
navigation/orientation mistakes
which Screen/window the actor expects next
whether controls/results are understood without explanation
errors / failed attempts
recovery behavior
points of hesitation
information overlooked or misunderstood
manual intervention needed
real vs expected system response
performance / throughput / resource observations
integration success/failure
technical feasibility observations
```

Do not turn every prototype/test into a usability study or benchmark. Observation follows the Evidence Question.

## 4. Evidence Method Patterns

Possible methods include:

```text
CLICKABLE_UI_FAKE
  UI/window flow is interactive; backend/functionality may be stubbed

THROWAWAY_MINI_APP
  minimum executable vertical behavior needed to answer the question

TECHNICAL_SPIKE
  isolate technical/integration/performance feasibility

MOCKED_INTEGRATION
  real local behavior against controlled fake external/server boundary

CONCIERGE / MANUAL_SIMULATION
  human/manual substitute used to learn workflow/value before automation

BENCHMARK / LOAD_EXPERIMENT
  controlled technical measurement

IMPLEMENTED_SCENARIO_WALKTHROUGH
  real application after implementation

OPERATED_ACCEPTANCE
  real operator/participant executes selected behavior in representative environment
```

Method is selected by IDTSPE Ideas/Decision; no pattern is mandatory.

## 5. Scenario Walkthrough Observation Pack

For interaction-heavy evidence, a reusable observation pack may include:

```text
Can the actor identify where to start?
Can the actor move through the intended Scenario without coaching?
Is the next Screen/window/action reasonably discoverable?
Does the actor understand required DATA and resulting state?
How many detours/backtracks occur?
What takes unexpectedly long?
Where does orientation break?
Does feedback match the actor's understanding of what happened?
Can the actor recover from representative failure/cancel/back paths?
```

The same pack may be used:
- on a clickable/stubbed prototype before implementation;
- on the implemented application later.

That makes pre/post Evidence comparable without pretending they have equal strength.

## 6. Evidence Timing

For each uncertainty decide where credible Evidence can actually be obtained:

```text
PROTOTYPE_NOW
  a partial/simulated artifact can materially reduce uncertainty

IMPLEMENT_AND_TEST_LATER
  only the real integrated implementation/environment can answer credibly

BOTH
  prototype de-risks early, implemented test later confirms/accepts

NO_PRACTICAL_TEST_NEEDED
  source/reasoning/other evidence is sufficient
```

A prototype must not manufacture false confidence for questions that require actual implementation.

## 7. Result Semantics

Prototype disposition:

```text
SUPPORTED_ENOUGH_FOR_CURRENT_DECISION
CHALLENGED
INCONCLUSIVE
DEFERRED_TO_IMPLEMENTED_EVIDENCE
```

Practical-test disposition may additionally support:

```text
PASS
FAIL
PARTIAL / CONDITIONALLY_ACCEPTED
```

Actual Evidence stays separate from interpretation and from the Decision it informs.

## 8. Reuse Rule

If a Prototype Evidence Question is intentionally deferred to the final implementation, preserve the same:

```text
Evidence Question
Scenario/task
critical observations
known limitations
```

and hand them to `TM-PRACTICAL-TEST` / Test Design rather than rediscovering the concern later.
