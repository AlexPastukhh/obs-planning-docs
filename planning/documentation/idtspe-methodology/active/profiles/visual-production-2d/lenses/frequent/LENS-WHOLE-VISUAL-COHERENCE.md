<a id="lens-whole-visual-coherence"></a>
# LENS-WHOLE-VISUAL-COHERENCE — Whole-Result Coherence

Lens ID: `LENS-WHOLE-VISUAL-COHERENCE`  
Activation: `FREQUENT_CONDITIONAL`  
Status: active profile Lens

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `LENS.META-MODEL`
> Owner: [Lens Meta-Model](../../../../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model)

## Purpose / Evaluation Objective

Evaluate whether individually plausible parts/requirements form one coherent visual result with effective hierarchy, relationships and global language.

## Applicability Gate

Apply when a whole image/graphic/scene-like result can fail through cross-part composition even if local parts look acceptable.

## Target Inputs / Evidence

Applicable Requirements; Whole Visual Design Units; current construction candidate/preview; intended viewing context; relevant Source State.

## Supported Operations

ANALYZE, CHECK, CHALLENGE

## Evaluation Workflow / Prompts

Inspect proportionally:

```text
whole read / first impression
focal hierarchy and competing elements
subject relations and narrative/functional clarity
composition balance / negative space / crop
value/color/style consistency
text-image relationship when applicable
intended-size/context readability
requirement coverage without checklist-looking fragmentation
```

## Typical Findings / Outputs

local parts work but whole result fails; competing focal points; incoherent style/value/color relationships; design-level composition defect; construction-level integration defect; intended-context readability failure.

Useful explanation may remain Broad Discussion/Key Points. Only material meaning needing ownership/lifecycle disposition becomes a Finding Candidate.

## Typical Consumers

Whole Visual Design; Construction Review Loop; Delivery Adaptation.

## Guards / Anti-patterns

Do not mutate owner results directly; do not reduce coherence to aesthetic preference when requirements/sources do not establish a preference; distinguish design-level from construction-level defect.

## Composition

Compose with Construction Fidelity, Unit Need / Visual Source Coverage, and Core Need/Value/Scope when the whole solution itself may be unnecessary/overbuilt.

## Escalation / Revalidation

Recheck after material content/composition/global-language or integrated construction changes.

## Artifact / File Implications

```text
ARTIFACT_GUIDANCE
ID: AG-WVC-01
CONTENT_KIND: whole-visual review evidence
WHEN: a material coherence finding needs later comparison/revalidation
GUIDANCE: ADVISORY_PREFERRED
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: resolved Finding/Evidence owner
REPRESENTATION: SUPPORTING_EVIDENCE_ARTIFACT or EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <review-evidence-or-owner>
CONTENT: compact review finding and supporting preview reference; no mandatory standalone file
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / PERSISTENCE_ADDRESSABILITY
```

## Knowledge Basis

Graphic composition, visual hierarchy, gestalt/whole-image evaluation, target-context readability principles.
