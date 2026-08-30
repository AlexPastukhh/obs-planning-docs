# LENS-PRACTICAL-EVIDENCE — Prototype / Implemented Practical Evidence

Lens ID: `LENS-PRACTICAL-EVIDENCE`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Evaluate whether practical Evidence before or after implementation is capable of answering the material question credibly, economically and with honest limits.

## Applicability Gate

Primary for `TM-PROTOTYPE` and `TM-PRACTICAL-TEST`; supporting when another Target needs practical observation/acceptance Evidence.

## Target Inputs / Evidence

Material question/property, affected owner/Decision, subject under observation, Scenario/context, actor/environment/data constraints, existing Evidence and intended collection method.

## Evaluation

Ask proportionally:

```text
What exactly must be learned/accepted?
Why is practical observation useful?
Is the chosen subject strong enough to answer that question?
What is real vs simulated, or which real version/environment/window is observed?
What data/observations are actually discriminating?
Are we collecting unnecessary data?
What limitations/confounders materially weaken interpretation?
Are observation, interpretation and Decision kept separate?
For post-implementation Evidence, is existing telemetry/logging merely a Source rather than being reassigned to the Evidence Target?
If an implemented-Evidence Target is planned before realization, are collection/instrumentation needs prepared now while actual Evidence is correctly deferred until the real subject exists?
```

## Acceptance vs Exploration

Acceptance may use explicit proof signals / PASS-FAIL interpretation. Exploratory learning may use supported/challenged/inconclusive language. Neither vocabulary is a required enum.

## Prototype → Implemented Continuity

When useful, preserve the question, Scenario/task/context, key observations and known limitations so the same concern can later be checked against the real implementation.

## Findings / Outputs

Typical Finding Candidates include:

```text
prototype cannot credibly answer a question requiring real integration
collection plan does not observe the claimed property
data is available but irrelevant to the question
critical real/simulated or version/environment boundary is hidden
sample/window/environment makes the conclusion too broad
interpretation is presented as observation
required post-implementation evidence cannot currently be observed
```

Core Finding Disposition selects any owner/revalidation consequence.

## Typical Consumers

Prototype, implemented practical Evidence, Test Design, and Application/Scenario/Screen/Slice evidence planning when practical observation matters.

## Artifact / File Implications

```text
ARTIFACT_GUIDANCE
ID: AG-PE-01
CONTENT_KIND: DECISION_RELEVANT_PRACTICAL_EVIDENCE
WHEN: practical Evidence materially supports/challenges acceptance, learning or Decision revalidation
GUIDANCE: ADVISORY_REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: resolved Evidence/host Target owner; Prototype or TM-PRACTICAL-TEST is a likely owner hint when that Target is selected
REPRESENTATION: EMBED_OR_SUPPORTING_EVIDENCE_ARTIFACT
FILE_OR_ARTIFACT: <prototype-or-implemented-evidence-owner> and optional <evidence-artifact>
CONTENT: inquiry/collection context; actual observation; limitations; interpretation/follow-up
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_GUIDANCE
ID: AG-PE-02
CONTENT_KIND: BULKY_RAW_EVIDENCE
WHEN: run data/logs/media/measurements/exports need independent storage
GUIDANCE: ADVISORY_PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: resolved Evidence State/owner; supporting storage is not separate semantic authority
REPRESENTATION: SUPPORTING_EVIDENCE_ARTIFACT
FILE_OR_ARTIFACT: <practical-evidence-artifact>
CONTENT: raw Evidence referenced from semantic/planning owner with relevant provenance/limits
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

Persist only evidence necessary for traceability/review and permitted by privacy/safety constraints. More retained data is not automatically better evidence.

## Guards

```text
prototype success ≠ proof final implementation works
planned collection ≠ actual Evidence
measurement ≠ interpretation
Evidence ≠ semantic authority
TM-PRACTICAL-TEST ≠ permanent telemetry/logging owner
```

## Composition

L3 helps identify material uncertainty. L6 helps when implemented observation/diagnosis is difficult. Test Proof/Evidence Lens joins when acceptance/proof is the primary purpose.

## Escalation / Revalidation

Unexpected Evidence or missing observability surfaces a Finding Candidate. Core Finding Disposition may select Decision/Scope/owner revalidation or implementation work; this Lens does not perform those transitions itself.

## Knowledge Basis

Mode: `HYBRID`

**Embedded Principles / Rules / Theory:**

- practical Evidence quality depends on whether the chosen observation/data source can answer the actual question;
- observation, interpretation and Decision remain separate;
- Prototype and implemented Evidence may reuse an inquiry shape without having equal evidentiary strength.

**Referenced Knowledge Owners:**

- [`practical-evidence-method.md`](../../shared/practical-evidence-method.md)

**Reference Load Policy:**

Read the shared practical-evidence method when experiment/collection design is non-trivial. The mode/load-policy labels are retained representation, not Generic conformance requirements.

**Operationalization Notes:**

This Lens owns the evaluation perspective; the shared method owns reusable observation/data-collection mechanics.
