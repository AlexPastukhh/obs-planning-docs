# TM-SCENARIO-PLANNING — Application Scenario Planning

Entry Point: `tm.scenario.plan`  
Role: primary Target Module  
Target form: one independently meaningful Application Scenario

## Purpose

Plan one Application Scenario as behavioral/product authority and process that meaning into addressable inputs for later implementation planning.

The reusable work is intentionally simple:

```text
1. describe what the Scenario should do;
2. expose what is ambiguous, weak, uncertain or may not work;
3. extract semantic DATA + addressable Behavior Items;
4. retain how this same Scenario may grow or need revision.
```

One Scenario is bounded by a meaningful actor/user Need in context plus a coherent Application behavior/result. A Screen, button, command, API, method, database mutation, Slice or implementation task is not a Scenario merely because it is addressable.

```text
Scenario behavior / requirements
        ↓ processing
Scenario DATA + Behavior Items
        ↓
Screen / Slice / Domain / Test planning

Scenario Development / Change Outlook
        ↓
known future/change pressure for downstream planning
```

Scenario planning does not prescribe Screen topology, Slice boundaries, Aggregate boundaries, API/code/database structure or concrete test implementation.

## Upstream Source Contract

Typical Sources, used proportionally:

```text
Application Definition / accepted Application responsibility
relevant Need / real-life route
known current application behavior
known planned/future behavior
accepted constraints / independently owned Requirements when any
existing Scenario owner when refining/revalidating
relevant Prototype / practical / user / current-system Evidence
```

Current Screens/code may supply Evidence about an existing realization. They do not become authority over intended Scenario behavior merely because they exist.

Source discovery remains governed by the normal IDTSPE Source Set; this list is an archetype, not a mandatory intake form.

## Scenario Boundary

A Scenario normally has:

```text
actor/user in a meaningful context
+ Need / intended value
+ coherent required Application behavior
+ independently meaningful observable result
```

Boundary discovery is the first part of Scenario Resolution / Production, not a separate Scenario-Discovery Target/result.

If planning exposes another independently meaningful Need/result, surface it as a Scenario candidate through normal Finding Disposition / Target Formation. Do not turn a multi-Scenario inventory into the semantic result of the current one-Scenario Target.

A workspace may still keep a Scenario index/catalog as navigation or representation. Such a projection does not become behavioral authority over the Scenario owners.

## Internal Object — Scenario DATA

Scenario DATA is semantic information required by the Scenario behavior: information the actor sees, enters, selects, receives, compares or must understand, plus external/derived information materially required for that behavior.

It is not automatically:

```text
DTO / request field
database column
component state
implementation-only ID/timestamp
```

Keep only useful semantic detail. When helpful, a DATA item may state its meaning, relevant semantic values/states, authority/source, availability and which Behavior Items use or produce it.

## Internal Object — Behavior Item

A Behavior Item is a stable addressable unit of required Scenario behavior that is useful to reference from later Slice, Screen, Domain or Test planning.

It may represent, proportionally:

```text
action / response
policy / decision behavior
state/condition transition
validation / rule
failure / rejection
invariant / no-mutation guarantee
information derivation / presentation
```

It is not automatically a method, endpoint, technical branch, implementation task or Slice.

Prefer a Behavior Item that is small enough to address but large enough to retain behavioral meaning. Do not atomize the Scenario into technical micro-steps merely to increase item count.

When useful, use the canonical relation direction:

```text
Behavior Item
→ uses DATA
→ produces / changes DATA
```

Inverse DATA→Behavior views may be derived rather than duplicated manually.

## Resolution / Production Method

### 1. Establish one Scenario boundary

Understand the actor/context, Need and independently meaningful observable result. Challenge Screen/API/code-shaped pseudo-scenarios. Split or merge only when the Need/result boundary actually warrants it.

Useful test:

```text
if UI and technical realization changed completely,
would this Need/result still be independently meaningful?
```

If another independent Need/result appears, surface another Scenario candidate rather than expanding this Target indefinitely.

### 2. Describe behavior naturally first

Before normalization, make the required behavior understandable in the form that best fits the Scenario: prose, requirements, flows, examples, state tables, Given/When/Then, diagrams or a mixture.

Resolve proportionally:

```text
what the Application must do
what the actor must be able to do/get/understand
what success means
material alternate/failure behavior
what must not happen / must remain true
```

Do not force a fixed questionnaire or field schema.

### 3. Stress ambiguity and weak assumptions

Inspect the described behavior for material ambiguity or assumptions that can change Scenario meaning:

```text
could this be interpreted in materially different ways?
what may not work in practice?
what depends on an external capability we do not control?
what failure semantics are still undefined?
what accepted-looking assumption lacks enough Evidence?
```

Concrete unresolved Questions/Risks/Problems, Evidence, Ideas and Decisions remain Generic IDTSPE State. Scenario-specific change meaning that is durable for downstream planning belongs in `RU-SCEN-03` when appropriate.

Implementation-only uncertainty does not become Scenario uncertainty unless resolving it can materially change the required Scenario behavior/DATA/Behavior Items.

### 4. Extract semantic DATA

After the behavior is understood, identify the information the behavior genuinely needs. Reject implementation representations masquerading as Scenario DATA.

### 5. Extract addressable Behavior Items

Identify the stable behavioral obligations that downstream planning benefits from referencing. Do not maximize granularity; preserve semantic meaning.

### 6. Relate Behavior Items to DATA

Record `uses / produces / changes` only where it improves downstream understanding. Avoid maintaining redundant inverse relations by hand.

### 7. Check decomposition against the Scenario

`RU-SCEN-02` is a processed implementation-planning projection of `RU-SCEN-01`, not a competing source of product truth.

Check both directions:

```text
Scenario Behavior / Requirements
→ are material behavior, failures, guarantees and information obligations represented?

Behavior Items / DATA
→ are they actually grounded in Scenario behavior rather than invented during decomposition?
```

If decomposition loses or invents meaning, refine the decomposition. Do not rewrite the Scenario merely to make the decomposition look tidy.

### 8. Resolve Development / Change Outlook

Ask what is already known about how this same Scenario may evolve:

```text
what may be added or extended?
what capability/variant may appear?
what may be improved?
what current behavioral assumption may need revision/rework?
what future/external condition can materially change the Scenario?
```

Keep the distinction simple:

```text
same independently meaningful Need/result
→ Scenario Development / Change Outlook

different independently meaningful Need/result
→ another Scenario candidate
```

Do not force a status enum. `planned`, `possible`, `uncertain`, `likely`, `may need change` or ordinary prose are enough when useful.

### 9. Check downstream readiness

The Scenario is ready enough when downstream work can proceed without inventing missing product behavior:

```text
Slice planning can see which behavioral units need realization;
Screen planning can see actor-facing behavior/DATA without receiving layout decisions;
Test planning can see what behavior eventually needs proof;
Domain reasoning can see relevant state/rule/data semantics without receiving a preselected architecture.
```

## Lens Profile

Generic required Core checks apply proportionally through the Core Lens Registry:

- Need / Value / Scope — especially useful for one-Scenario boundary;
- Authority / SoT / Reuse — Scenario vs Requirement/Screen/implementation ownership;
- Uncertainty / Assumption / Reversibility — unsupported/conditional behavior and cost of being wrong;
- Documentation / Representation — consolidated vs dedicated Scenario representation when persistence is useful.

Frequent/conditional generic Lenses:

- Quality / Risk Materiality — only when a quality/risk dimension materially changes required behavior;
- Practical Evidence — when a Scenario assumption needs a prototype/user/technical experiment;
- Dependency / Change Impact — when revalidating an existing Scenario/downstream relation surface.

No Scenario-specific reusable Lens is required. Boundary, behavior completeness, DATA extraction, Behavior Item decomposition and Development/Change Outlook are the Resolution / Production responsibility of this Target Module; Lenses/checks may evaluate them inside that process.

No separate Knowledge Basis is currently needed; reusable theory may be attached later if a real theory-to-Scenario-planning bridge becomes useful.

## Target Step-Result Contract

**Target Step Result:** one `Application Scenario`.

The concrete result is sparse/proportional. The three Result Units identify meaning boundaries, not mandatory document sections or files.

| Result Unit | Meaning |
|---|---|
| `RU-SCEN-01` | **Scenario Behavior / Requirements** — canonical behavioral/product meaning for what this Scenario should do; free-form representation. |
| `RU-SCEN-02` | **Behavioral Decomposition** — processed Scenario DATA + Behavior Items, with useful relations, for downstream implementation planning. |
| `RU-SCEN-03` | **Scenario Development / Change Outlook** — known additions/extensions/improvements/future capabilities and current behavioral assumptions that may need revision inside this same Scenario. |

### RU-SCEN-01 — Scenario Behavior / Requirements

Use whatever representation makes the required behavior clear. Typical meaning may include Need/context/result, required behavior, failure behavior, must-hold/negative guarantees, examples or acceptance meaning, but none is a mandatory field merely for template completeness.

This Unit remains the semantic source for the Scenario behavior.

### RU-SCEN-02 — Behavioral Decomposition

Contains the extracted `Scenario DATA` and `Behavior Items` needed for addressable downstream planning. It may be minimal for a simple Scenario and detailed for a complex one.

The decomposition must cover material `RU-SCEN-01` meaning without inventing new product behavior.

### RU-SCEN-03 — Scenario Development / Change Outlook

Retains durable Scenario-local future/change meaning when it is useful to downstream planning, for example:

```text
additional payment methods
saved payment methods
asynchronous completion
partial payment
current immediate-result assumption may need revision
```

Concrete unresolved questions/risks/evidence remain Generic State and may be referenced from this Unit. This Unit is not an implementation Evolution Step and does not prescribe architectural preparation.

When expected future behavior is no longer an extension/change of the same independently meaningful Scenario result, surface a **new Scenario candidate** through normal Finding Disposition / Target Formation instead of forcing it into this Unit. `RU-SCEN-03` remains local to the same Scenario.

## Artifact / File Contract

Scenario semantic ownership is independent of physical file topology. Several small Scenario owners may share one consolidated file; a large Scenario may use a dedicated file; DATA/Behavior Items normally remain embedded/addressable inside their Scenario owner. Documentation / Representation resolves the useful form.

The existing AP IDs are retained for artifact-guidance compatibility while their meaning is aligned to the one-Scenario Target:

```text
ARTIFACT_PROPOSAL
ID: AP-SCNDISC-01
CONTENT_KIND: SCENARIO_NAVIGATION_INDEX
WHEN: several Scenario owners need one useful navigation/read surface
GUIDANCE: OPTIONAL
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: PLACE_OR_NONE
SEMANTIC_OWNER: Scenario owners remain canonical; index is projection/navigation only
REPRESENTATION: EXISTING_OR_GENERATED_INDEX
FILE_OR_ARTIFACT: <scenario-index-or-consolidated-scenario-artifact>
CONTENT: Scenario identities + owner routes + compact Need/result summaries only when useful
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-SCNDISC-02
CONTENT_KIND: NEW_SCENARIO_CANDIDATE_ROUTE
WHEN: evaluation exposes another independently meaningful Need/result
GUIDANCE: CONDITIONAL
PERSISTENCE_GUIDANCE: NONE_BY_DEFAULT
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: unresolved until normal Finding Disposition / Target Formation
REPRESENTATION: TARGET_FORMATION_INPUT
FILE_OR_ARTIFACT: NONE_BY_DEFAULT
CONTENT: candidate Need/result + provenance; do not duplicate another Scenario owner inside the current Scenario
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: Core Finding Disposition / Target Formation; P-14 only if persistence later becomes useful
```

```text
ARTIFACT_PROPOSAL
ID: AP-SCN-01
CONTENT_KIND: SCENARIO_SEMANTICS
WHEN: Scenario is accepted/used downstream
GUIDANCE: REQUIRED
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Scenario Target
REPRESENTATION: EXISTING_CONSOLIDATED_SCENARIO_ARTIFACT_OR_DEDICATED_SCENARIO_ARTIFACT
FILE_OR_ARTIFACT: <scenario-owner>
CONTENT: RU-SCEN-01 Scenario Behavior / Requirements + RU-SCEN-03 Scenario Development / Change Outlook when material
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-SCN-02
CONTENT_KIND: SCENARIO_BEHAVIORAL_DECOMPOSITION
WHEN: DATA/Behavior Items are material/addressable downstream
GUIDANCE: REQUIRED_EMBED_DEFAULT
PERSISTENCE_GUIDANCE: REQUIRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: current Scenario Target
REPRESENTATION: EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <scenario-owner>
CONTENT: RU-SCEN-02 Scenario DATA + Behavior Items + useful Behavior→DATA relations
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_PROPOSAL
ID: AP-SCN-03
CONTENT_KIND: PRELIMINARY_SCREEN_IDEA
WHEN: Scenario planning reveals an unselected Screen/window idea
GUIDANCE: PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: ROUTE
SEMANTIC_OWNER: UNRESOLVED until normal Core disposition/selection establishes a natural owner
REPRESENTATION: EXISTING_IDEA_STATE_OR_REGISTER_OR_NONE
FILE_OR_ARTIFACT: <Generic Idea State / existing project register selected by P-14, or NONE when ephemeral>
CONTENT: preliminary Screen/window Idea with Scenario provenance; not Scenario/Screen truth
GUIDANCE_SOURCE: TARGET_MODULE
RESOLVER: P-14 / TF-10
```

## Validators

```text
one independently meaningful Need/result boundary is selected
required behavior is understandable without relying on implementation details
material Scenario-level ambiguity is explicit rather than silently resolved
Scenario DATA is semantic information, not accidental implementation representation
Behavior Items are addressable required behavior, not methods/endpoints/tasks/Slices
Behavioral Decomposition covers material Scenario behavior and adds no unsupported product meaning
Development / Change Outlook concerns the same Scenario; independent Need/result is another Scenario candidate
downstream planning can proceed without inventing missing product behavior
```

## Handoff / Revalidation

Typical consumers:

```text
Slice Strategy / implementation decomposition
Screen planning
Domain reasoning
Test planning
Prototype / Practical Evidence when uncertainty needs proof
```

Revalidate the Scenario when material upstream/product/Evidence meaning changes, for example Application responsibility changes, accepted product behavior changes, planned behavior becomes current, practical Evidence challenges the Scenario, or external constraints/capabilities change Scenario meaning.

Implementation inconvenience alone does not redefine Scenario behavior. If implementation work exposes missing/contradictory behavior, surface a Finding Candidate and revalidate the Scenario only when the behavioral meaning itself is challenged.

## Repository Provenance

This module replaces the active responsibilities of the former Scenario Discovery + Scenario Draft modules and absorbs their former Scenario-specific boundary/behavior work into this module's own Resolution / Production Method.

The retained semantics are intentionally simpler:

```text
Scenario Behavior / Requirements
+ processed DATA / Behavior Items
+ Development / Change Outlook
+ Generic IDTSPE uncertainty/evidence/decision state
```
