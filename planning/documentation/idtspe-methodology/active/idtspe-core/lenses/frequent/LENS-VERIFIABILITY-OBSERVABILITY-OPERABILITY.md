# LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY — Proof / Observation / Diagnosis / Operation

Lens ID: `LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`  
Legacy alias: `L6`  
Activation: `FREQUENT_CONDITIONAL`

## Purpose

Ask whether correctness/failure/state can be credibly proved, observed, diagnosed and operated at acceptable cost before accepting a realization/architecture/result.

Broader than Test Design.

## Applicability Gate

Activate when correctness/failure/state must be demonstrably checked or safely operated, especially for Slices, integrations, runtime workflows, critical automation, shared mechanisms and failure-prone architecture.

## Typical Sources / Evidence

```text
selected behavior/result/invariants
runtime path
candidate architecture/seams
failure/recovery expectations
environment/operator constraints
existing tests/telemetry/operational evidence
```

## Verifiability

```text
What proves success?
What proves failure?
Can negative/no-mutation guarantees be proved?
Are important invariants observable?
Can the boundary be verified independently?
```

## Observability

Can we tell what state/result occurred? Can important failures be detected? Is Evidence available at the right boundary?

## Diagnosability

If something fails, can we determine why? What context/logs/state/traces are needed?

## Operability / Recovery

Can a human/tool operate and recover safely? What rollback/manual burden exists?

## Proof Cost

Does this choice make proof disproportionately expensive? Would another boundary make verification/diagnosis simpler?

## Findings / Outputs

```text
Q/R/P
proof/Evidence requirements
observability/diagnosis requirements
operation/recovery requirements
Test/Practical Evidence handoff
Decision rationale
```

## Typical Consumers

Slice, Frontend, Cross-Cutting, Architecture/WEUC, Test Strategy/Design, Practical Test and critical tooling decisions.

## Artifact / File Implications

### Structured Artifact / File Guidance

These records describe conditional placement guidance produced by this Lens. They never create semantic ownership by themselves.

```text
ARTIFACT_GUIDANCE
ID: AG-L6-01
CONTENT_KIND: PROOF_OBSERVABILITY_OPERABILITY_FINDING
WHEN: proof/diagnosis/operation consequence materially affects choice
GUIDANCE: ADVISORY_PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Target
REPRESENTATION: EMBED_CURRENT_TARGET_PLANNING_STATE
FILE_OR_ARTIFACT: <current-idtspe-owner>
CONTENT: proof/observation/diagnosis/operation requirement/finding
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_GUIDANCE
ID: AG-L6-02
CONTENT_KIND: INDEPENDENT_SHARED_OPERABILITY_CONCERN
WHEN: observability/operation mechanism becomes independently shared/material
GUIDANCE: ROUTE
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: future Cross-Cutting or local child Target after Target Formation
REPRESENTATION: UNRESOLVED
FILE_OR_ARTIFACT: UNRESOLVED
CONTENT: form real owner first; then place its canonical artifact
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../shared/artifact-placement-and-idtspe-response-contract.md).

Normally L6 findings remain in the current Target's requirements/Decision/Test handoff.

**PREFERRED supporting operational/proof artifact** when runbooks, telemetry contracts, recovery procedures or proof plans are independently reused/reviewed across Targets.

If L6 exposes a genuinely shared implementation responsibility, route to a Cross-Cutting/shared Target rather than creating an unnamed “L6 file”.

## Guards

Proof/telemetry mechanism does not become semantic authority.

## Composition

Test Proof/Evidence specializes concrete proof. L5 consumes L6 findings when architecture changes operation/diagnosis cost.

## Escalation / Revalidation

A material observability/operation subsystem may become a Cross-Cutting/child Target.

## High-Level Example — Self-Contained Walkthrough

### Situation

A background import job processes hundreds of items asynchronously.

Two architecture candidates both appear functionally correct.

### Why This Lens

L6 asks whether important success/failure/state can be proved, observed, diagnosed and operated in practice.

### Walkthrough

For candidate A:

```text
job returns immediately
no durable per-item status
errors only appear in generic logs
```

For candidate B:

```text
import has durable run status
failed items are identified
operator can inspect/retry failures
```

Questions:

```text
How do we know completion happened?
How is partial failure detected?
Can an operator diagnose why one item failed?
Can recovery happen without rerunning everything?
```

### Result

L6 may find that candidate B has substantially better verification/diagnosis/operation characteristics and feed that into the current Decision.

### Boundary / Lesson

L6 does not prescribe a monitoring stack.

It exposes proof/observation/operation consequences that may matter to the decision.

## Provenance

Restores Complete Picture v6 L6 / later Proof-Verification-Operability Lens.
