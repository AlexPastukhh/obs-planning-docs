<a id="lens-construction-fidelity-consistency"></a>
# LENS-CONSTRUCTION-FIDELITY-CONSISTENCY — Realization Fidelity

Lens ID: `LENS-CONSTRUCTION-FIDELITY-CONSISTENCY`  
Activation: `FREQUENT_CONDITIONAL`  
Status: active profile Lens

## Purpose / Evaluation Objective

Evaluate whether actual editable construction faithfully realizes accepted Requirements/Whole Visual Design/Source constraints and remains internally consistent across parts/passes/variants.

## Applicability Gate

Apply during route Unit work or Construction Review when actual source/artifacts exist and fidelity/consistency can materially fail.

## Target Inputs / Evidence

Accepted upstream results; relevant Source State; current route Unit's Current Result Content; canonical editable source; rendered previews; representative variants when applicable.

## Supported Operations

CHECK, ANALYZE, CHALLENGE

## Evaluation Workflow / Prompts

Check:

```text
what accepted meaning should be visible here?
is the defect implementation/realization or upstream design?
are identities/proportions/pose/style/relationships preserved as required?
are repeated parts/variants consistent where required?
does the editable source still represent the accepted result rather than only the preview?
```

## Typical Findings / Outputs

construction drift from accepted design/source; inconsistent repeated parts/variants; preview/source mismatch; wrong-owner attempt to fix an upstream design problem locally.

Useful explanation may remain Broad Discussion/Key Points. Only material meaning needing ownership/lifecycle disposition becomes a Finding Candidate.

## Typical Consumers

Construction route Units; Multi-Route Integration; Construction Review Loop; Delivery.

## Guards / Anti-patterns

Do not treat a construction mismatch as permission to rewrite upstream intent; do not use final polish to hide macro defects.

## Composition

Compose with Whole Visual Coherence, Unit Need / Visual Source Coverage and Representation/Editability/Economy.

## Escalation / Revalidation

Recheck after upstream accepted meaning or canonical source structure changes.

## Artifact / File Implications

```text
ARTIFACT_GUIDANCE
ID: AG-CFC-01
CONTENT_KIND: construction fidelity evidence
WHEN: material mismatch or consistency evidence needs revalidation/handoff
GUIDANCE: ADVISORY_PREFERRED
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: resolved Evidence/Finding owner
REPRESENTATION: SUPPORTING_EVIDENCE_ARTIFACT or EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <construction-review-evidence>
CONTENT: comparison preview/measurement/finding sufficient to support the disposition
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

## Knowledge Basis

Reference comparison, deterministic/editable construction principles, local-revision and consistency practices.
