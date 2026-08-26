# LENS-PRACTICAL-EVIDENCE — Prototype / Implemented Practical Evidence

Lens ID: `LENS-PRACTICAL-EVIDENCE`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Use one practical Evidence discipline before and after implementation while preserving different evidentiary strength.

## Applicability Gate

Primary for Prototype/Practical Test; supporting when Test Design selects operated acceptance.

## Typical Sources / Evidence

Material uncertainty/property, affected Decision/Target, real-life/Application Scenario, Prototype/implemented subject, actor/environment/data constraints and prior Evidence.

## Uncertainty / Evidence Timing

```text
PROTOTYPE_NOW
IMPLEMENT_AND_TEST_LATER
BOTH
NO_PRACTICAL_TEST_NEEDED
```

Do not fake confidence when only integrated implementation can answer.

## Minimum Credible Experiment

Possible methods:

```text
CLICKABLE_UI_FAKE
THROWAWAY_MINI_APP
TECHNICAL_SPIKE
MOCKED_INTEGRATION
CONCIERGE / MANUAL_SIMULATION
BENCHMARK / LOAD_EXPERIMENT
IMPLEMENTED_SCENARIO_WALKTHROUGH
OPERATED_ACCEPTANCE
```

## Real vs Simulated Boundary

Record what is real/stubbed/mocked/manual.

## Scenario Walkthrough

Inspect start discoverability, completion, Screen/window orientation, hesitation/backtracking, time, DATA/feedback comprehension and failure/recovery when relevant.

## Prototype-to-Practical Continuity

For `BOTH` / `IMPLEMENT_AND_TEST_LATER`, preserve Evidence Question, Scenario/task, critical observations and limitations for later Practical Test.

## Acceptance vs Exploration

Acceptance property → PASS/FAIL/PARTIAL. Residual uncertainty → SUPPORTED/CHALLENGED/INCONCLUSIVE.

## Findings / Outputs

Evidence Question, method/subject, observation protocol, actual Evidence, limitations, interpretation, disposition and deferred Evidence handoff.

## Typical Consumers

Prototype, Practical Test, Test Design and Application/Screen/Frontend evidence planning.

## Artifact / File Implications

### Structured Artifact / File Guidance

These records describe conditional placement guidance produced by this Lens. They never create semantic ownership by themselves.

```text
ARTIFACT_GUIDANCE
ID: AG-PE-01
CONTENT_KIND: DECISION_RELEVANT_PRACTICAL_EVIDENCE
WHEN: actual practical Evidence supports/challenges Decision/acceptance
GUIDANCE: ADVISORY_REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Prototype or Practical Test Target
REPRESENTATION: EMBED_OR_SUPPORTING_EVIDENCE_ARTIFACT
FILE_OR_ARTIFACT: <prototype-or-practical-test-owner> and optional <evidence-artifact>
CONTENT: Evidence question/protocol; actual observation; limitations; interpretation/disposition
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_GUIDANCE
ID: AG-PE-02
CONTENT_KIND: BULKY_RAW_EVIDENCE
WHEN: run data/logs/media/measurements need independent storage
GUIDANCE: ADVISORY_PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Evidence artifact as supporting source
REPRESENTATION: SUPPORTING_EVIDENCE_ARTIFACT
FILE_OR_ARTIFACT: <practical-evidence-artifact>
CONTENT: raw Evidence referenced from semantic/planning owner
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../shared/artifact-placement-and-idtspe-response-contract.md).

**REQUIRED persistence** for actual Evidence that supports/challenges an accepted Decision or later acceptance/revalidation.

**PREFERRED supporting Evidence artifact** when run data/logs/media/measurements are large or independently reviewed.

Keep Evidence Question/protocol/disposition traceable to Prototype/Practical Test owner; do not let raw evidence files become semantic authority.

## Guards

Prototype success ≠ proof of final implementation.

## Composition

L3 identifies uncertainty/reversibility. L6 asks whether implemented result is observable/operable. Test pack handles formal proof responsibility.

## Escalation / Revalidation

Unexpected Evidence may reopen Decision/Question Set/Scope through normal reconciliation.

## High-Level Example — Self-Contained Walkthrough

### Situation

The team wants to know whether users can complete a capture flow without losing orientation.

This can be explored before implementation and checked again after implementation.

### Why This Lens

The Practical Evidence Lens provides one reusable observation discipline across Prototype and implemented Practical Test.

### Walkthrough

Before implementation:

```text
subject:
  clickable fake

task:
  capture fragment and return to reading

observe:
  completion
  time
  hesitation
  backtracking
```

After implementation:

```text
same task
real app
real latency/navigation/failure
```

The Evidence question stays comparable while the tested subject becomes stronger.

### Result

The Lens helps define:

```text
Evidence question
minimum credible method
task/setup
observation protocol
real-vs-simulated boundary
limitations
interpretation
```

### Boundary / Lesson

Similar observation method does not make Prototype and final Practical Test equivalent Evidence.

## Provenance

Canonical deep method: `../../shared/practical-evidence-method.md`.
