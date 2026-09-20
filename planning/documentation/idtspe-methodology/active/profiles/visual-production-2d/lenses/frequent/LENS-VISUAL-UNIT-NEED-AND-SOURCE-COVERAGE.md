<a id="lens-visual-unit-need-and-source-coverage"></a>
# LENS-VISUAL-UNIT-NEED-AND-SOURCE-COVERAGE — Unit Need / Visual Source Coverage

Lens ID: `LENS-VISUAL-UNIT-NEED-AND-SOURCE-COVERAGE`
Activation: `TARGET_PROFILE_REUSABLE`
Status: active profile Lens

## Purpose

Evaluate a candidate/current visual Work Unit across three coupled questions:

1. how much substantive resolution this already-instantiated Module-defined Unit responsibility needs;
2. how well do accepted visual Sources/references cover the responsibility;
3. what Unit-relative information gaps/conflicts/contextual reference analysis remain and what bounded preparation, if any, is needed before continuing the Unit.

## Applicability

Use during Target formation/materiality review for **every Module-defined Unit** when responsibility-specific depth/disposition is not already obvious from accepted context.

At Unit Opening/Closing, apply when Unit need or relevant visual Source/reference coverage may have changed.

Also apply when:

- a new visual-information gap appears;
- accepted Sources conflict;
- a previously omitted Unit may now need substantive resolution;
- the current Unit exposes a smaller independently useful responsibility;
- additional acquisition/transformation may be needed before the Unit can continue.

## Analysis Inputs

Use proportionally:

- candidate/current Unit responsibility;
- current Target scope, goal and requested change;
- current Unit dispositions/materiality;
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

### Substantive Resolution Value

- What independently useful result responsibility does this already-instantiated Unit need to resolve now?
- Does explicit ownership improve review, handoff, revalidation, reuse or continuation?
- If substantive work is omitted, is all necessary meaning already supplied by accepted Sources/other owners/current scope?
- Would omission hide a real unresolved responsibility?

### Resolution Depth

If substantive resolution is material:

- Can the result be derived almost directly from trustworthy Sources?
- Is targeted visual analysis needed?
- Is a material choice/Proposal likely?
- Is a bounded Visual Material Preparation Operation needed before re-evaluating/continuing this Unit?
- Would a retained Prepared Visual Material Set have independently useful Target value beyond this Unit?
- Is literal construction/modification needed?
- Has work exposed Contextual Unit pressure?

## Output

For each reviewed Module-defined Unit produce a recommendation about work depth/disposition:

```text
substantive resolution
light / source-derived resolution
omit substantive resolution
OPEN
```

For omission, the output must include:

```text
Unit semantic name + stable ID
Situation / goal
Relevant reference / Source coverage
Omission reason
Disposition authority/state or OPEN
```

An omission recommendation is not complete if its reason is only `optional`, `not needed`, `covered`, `irrelevant`, or another generic label.

For substantive/light resolution, state enough situation + Source-coverage rationale to explain the chosen depth when it is not obvious.

When materiality/disposition itself is a material unresolved choice, use normal Proposal/Decision authority; do not create a profile-specific mandatory USER-selection rule.

The Lens may also surface:

- responsibility-specific Source gaps;
- conflicting Sources;
- Visual Material Preparation Operation routing when bounded acquisition/transformation is enough;
- conditional TM-2D-15 formation only when a Prepared Visual Material Set is independently useful as its own Target Result;
- deeper analysis need;
- Contextual Unit pressure;
- revalidation of prior Unit disposition/depth.

## Guards

- Strong Source coverage does not automatically remove a Unit.
- Missing Sources do not automatically force a Unit if the responsibility is outside the selected Target.
- Do not create fake `N/A` content; keep the real Unit instance with an omission reason when non-material.
- Do not treat “needs analysis” as automatically requiring a new Unit, Target Module or shared analysis owner. The current Target/Unit owns its concrete material/reference interpretation.
- Do not assign consumer-specific Source authority from material appearance alone.
- Do not silently turn a materially contested disposition into accepted meaning; route real choices through normal Proposal/Decision authority.
- Do not summarize several omitted Units as one anonymous omission when their reasons differ.

## Material Preparation / Continuation Routing

```text
missing / partial / conflicting visual information
→ analyze need and Source coverage for the affected Unit
→ use Visual Material Preparation Operation when bounded acquisition/transformation is sufficient
→ re-evaluate and continue the affected Unit
→ form TM-2D-15 only when a Prepared Visual Material Set is independently useful as a Target Result
```

The Lens owns the reusable evaluation method, not the concrete analysis result. The current Target/Unit owns the analysis meaning. Representation may be embedded, aggregate, per-reference or mixed according to [Visual Target-local Material Analysis Representation Guidance](../../representation/VISUAL-TARGET-LOCAL-MATERIAL-ANALYSIS.representation-guidance.md#visual-target-local-material-analysis-representation-guidance).

## Revalidation

Recheck when Target scope, requested change, Source bindings/materials, intended output context, Unit disposition authority/state or construction review materially changes. Re-entry after preparation/acquisition is normal.

## Artifact Guidance

```text
ARTIFACT_GUIDANCE
ID: AG-VIS-UNIT-01
CONTENT_KIND: Unit disposition / materiality rationale
WHEN: Unit materiality/depth is non-obvious or materially revalidated and retaining the rationale adds review/revalidation value
GUIDANCE: PROFILE_REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: current Target Unit/disposition state; Proposal-Decision owner only for material choice
REPRESENTATION: EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <current-target-owner>
CONTENT:
  one individually addressable entry per Module-defined Unit reviewed;
  for OMIT: Unit name/ID + situation/goal + relevant Source/reference coverage
  + explicit omission reason + disposition authority/state;
  for material Units: enough rationale to explain current Unit resolution depth when useful
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

## Knowledge Basis

- Core Unit applicability/materiality/omission;
- Core Source Subject / Source binding semantics;
- [Visual Material And Source Usage](../../source-contracts/VISUAL-MATERIAL-AND-SOURCE-USAGE.md#shared-visual-material-and-source-usage);
- visual responsibility roles defined by the active Target Module.
