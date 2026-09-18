<a id="lens-visual-unit-need-and-source-coverage"></a>
# LENS-VISUAL-UNIT-NEED-AND-SOURCE-COVERAGE — Unit Need / Visual Source Coverage

Lens ID: `LENS-VISUAL-UNIT-NEED-AND-SOURCE-COVERAGE`  
Activation: `TARGET_PROFILE_REUSABLE`  
Status: active profile Lens

## Purpose

Evaluate a candidate/current visual Work Unit across three coupled questions:

1. does the responsibility deserve an explicit Unit in this Target;
2. how well do accepted visual Sources/references cover the responsibility;
3. how much additional analysis/preparation/resolution is likely to be needed.

## Applicability

Use during Candidate Unit Selection for **every module-defined candidate Unit**.

At Unit Opening/Closing, apply when Unit need or relevant visual Source/reference coverage may have changed.

Also apply when:

- a new visual-information gap appears;
- accepted Sources conflict;
- a previously omitted Unit may now be needed;
- the current Unit exposes a smaller independently useful responsibility;
- additional Visual Material Preparation may be needed.

## Analysis Inputs

Use proportionally:

- candidate/current Unit responsibility;
- current Target scope, goal and requested change;
- accepted Unit selections;
- relevant Visual Requirements / Whole Visual Design / prior Unit results;
- relevant Source bindings and retained visual-material qualification;
- current previews/Evidence/Findings;
- downstream handoff/reuse/validation pressure.

## Evaluation

### Current Situation

Establish the smallest situation statement needed to judge this Unit:

- What is the Target trying to establish/change/preserve?
- Is this Unit's result responsibility actually implicated?
- Does another selected owner already supply the needed result meaning?

### Visual Source / Reference Coverage

Ask specifically for this Unit responsibility:

- What visual information would this Unit need?
- Which accepted Sources/references show that information directly?
- Which parts are strongly covered, partial, conflicting or missing?
- What is inferred, occluded, synthetic, transformed or otherwise limited?
- Does strong coverage still leave useful explicit ownership?

Use responsibility-specific language such as:

```text
strong
partial
conflicting
missing
none / not relevant
```

`none / not relevant` is valid when omission/inclusion is driven by the Target situation rather than visual reference coverage; state why.

### Independent Unit Value

- What separately useful result would this Unit own?
- Does explicit ownership improve review, handoff, revalidation, reuse or continuation?
- If omitted, is all necessary meaning already supplied by accepted Sources/other owners/current scope?
- Would omission hide a real unresolved responsibility?

### Resolution Depth

If included:

- Can the result be derived almost directly from trustworthy Sources?
- Is targeted visual analysis needed?
- Is a material choice/Proposal likely?
- Is additional Visual Material Preparation needed?
- Is literal construction/modification needed?
- Has work exposed Contextual Unit pressure?

## Output

For each candidate Unit produce an AI recommendation:

```text
include
include with light/source-derived resolution
omit
open
```

For `omit`, the output must include:

```text
Unit semantic name + stable ID
Situation / goal
Relevant reference / Source coverage
Omission reason
USER selection or OPEN
```

An omission recommendation is not complete if its reason is only `optional`, `not needed`, `covered`, `irrelevant`, or another generic label.

For `include` / `include with light source-derived resolution`, state enough situation + Source-coverage rationale to explain why the responsibility remains useful.

Material include/omit changes are user-selected unless already current.

The Lens may also surface:

- responsibility-specific Source gaps;
- conflicting Sources;
- Material Preparation re-entry;
- deeper analysis need;
- Contextual Unit pressure;
- revalidation of prior Unit selection.

## Guards

- Strong Source coverage does not automatically remove a Unit.
- Missing Sources do not automatically force a Unit if the responsibility is outside the selected Target.
- Do not instantiate a Unit merely because the module lists it.
- Do not create an `N/A` Work Unit to preserve selection history.
- Do not treat “needs analysis” as automatically requiring a new Unit.
- Do not assign consumer-specific Source authority from material appearance alone.
- Do not silently select the AI include/omit recommendation.
- Do not summarize several omitted Units as one anonymous omission when their reasons differ.

## Revalidation

Recheck when Target scope, requested change, Source bindings/materials, intended output context, USER Unit selection or construction review materially changes.

## Artifact Guidance

```text
ARTIFACT_GUIDANCE
ID: AG-VIS-UNIT-01
CONTENT_KIND: candidate Unit selection trace
WHEN: candidate Unit inclusion/omission is reviewed or materially revalidated
GUIDANCE: PROFILE_REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: current Target planning / Proposal-Decision owner
REPRESENTATION: EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <current-target-owner>
CONTENT:
  one individually addressable entry per candidate Unit considered;
  for OMIT: Unit name/ID + situation/goal + relevant Source/reference coverage
  + explicit omission reason + USER selection/OPEN;
  for included Units: enough rationale to explain current Unit need/depth
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

## Knowledge Basis

- Core Unit applicability/materiality/omission;
- Core Source Subject / Source binding semantics;
- [Visual Material And Source Usage](../../shared/VISUAL-MATERIAL-AND-SOURCE-USAGE.md#shared-visual-material-and-source-usage);
- visual responsibility roles defined by the active Target Module.
