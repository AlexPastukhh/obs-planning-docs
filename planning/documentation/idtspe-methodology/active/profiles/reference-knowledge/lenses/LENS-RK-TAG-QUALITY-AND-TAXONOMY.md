<a id="lens-rk-tag-quality-and-taxonomy"></a>
# Tag Quality / Taxonomy

Lens ID: `LENS-RK-TAG-QUALITY-AND-TAXONOMY`  
Activation: `FREQUENT_CONDITIONAL`  
Status: active profile Lens

## Purpose / Evaluation Objective

Evaluate whether a Tag definition/refactor improves reusable classification, taxonomy and bank-wide retrieval.

## Applicability Gate

Apply for new canonical Tags, parent changes, duplicate/over-broad candidates, deprecation/successor proposals and broad retagging questions.

## Target Inputs / Evidence

Current Tag definitions/bodies, assignments, parent graph, aliases/successors, corpus examples, retained corpus-query semantics and Landscape usage.

## Analysis Surface / Supported Operations

Surface: one Tag or a bounded related vocabulary neighborhood.

Supported operations: `ANALYZE`, `CHECK`, `REFINE`, `CHALLENGE`.

## Evaluation Workflow

Check whether:

- the distinction is reusable;
- Body is sufficiently clear;
- existing vocabulary already covers it;
- Tag is too broad or too incidental;
- alias is enough when concept identity is unchanged;
- each Parent is genuinely broader/entailed rather than associated;
- current/new definition choice remains interpretable for existing assignments/queries.

## Broad Discussion / Key Points

May compare candidate vocabulary shapes and explain why a characteristic relation belongs in Body rather than structured Parents.

## Findings / Outputs

Typical Finding Candidates: create; reuse; alias; parent change; deprecate old definition; suggest zero/one/many successors; retain current structure; revalidation need.

## Typical Consumers

Vocabulary Evolution, Entry classification work and Landscape preparation.

## Guards / Anti-patterns

Do not encode style characteristics as Parents unless semantic inclusion is real. Do not force every semantic relationship into structured taxonomy. Do not mutate existing Tag Assignments directly from Lens output. Successor pointers do not automatically reclassify old assignments.

## Composition

Compose with Landscape Evidence Adequacy when vocabulary change affects longitudinal comparability. Unit composition follows the ordinary IDTSPE Core applicability/materiality contract.

## Escalation / Revalidation

Material vocabulary changes route to [Vocabulary Evolution](../target-modules/TM-RK-20-VOCABULARY-EVOLUTION.md#tm-rk-20-vocabulary-evolution). Recheck as corpus growth exposes ambiguity/duplication.

## Artifact / File Implications

`NONE / NO_DISTINCT_SUPPORTING_ARTIFACT`. Accepted vocabulary meaning persists through Vocabulary Evolution.

## Knowledge Basis

[Vocabulary Model](../models/VOCABULARY-MODEL.md#tag-vocabulary-model).

## Provenance

Reference Knowledge profile.
