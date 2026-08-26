# LENS-APPLICATION-BOUNDARY-FEASIBILITY — Application Definition / Alternatives / Core Real-Life Route / Feasibility

Lens ID: `LENS-APPLICATION-BOUNDARY-FEASIBILITY`  
Activation: `TARGET_PROFILE_REUSABLE`

## Purpose

Evaluate whether an own Application is justified, which real-world contribution it should own, what existing alternatives teach us, which core real-life routes justify its existence, and whether the boundary is plausibly realizable.

## Applicability Gate

Primary for `TM-APPLICATION-DEFINITION`.

## Typical Sources / Evidence

```text
Fundamental Need
Step-02 solution / own-software contribution
manual/existing/external alternatives
market/reference research
Prototype Evidence
current application/workspace
later Scenario/Domain/Slice Evidence
```

## Existing-Solution Sufficiency / Market Reference

```text
Does an existing solution satisfy Need + constraints well enough?
Should we use/buy/adapt/integrate/hybrid instead?
What research depth is proportional?
Which direct alternatives/substitutes/adjacent references matter?
What should be borrowed or avoided?
```

For serious external/commercial products, market/competitor/user/adoption/pricing Evidence is included only when decision-relevant.

Reference products are Evidence/Idea generators, not authority.

Deep guide: `../../shared/application-definition-existing-solutions-market-reference-research.md`.

## Whole-Solution Contribution

Application exists to realize an already selected real-world solution contribution, not to justify itself after the fact.

## Core Real-Life Scenario Refinement

Identify the 1–few core real-life paths for which the Application exists:

```text
Fundamental Need
+ actor context
+ human/manual/external steps
+ own Application contribution
+ real-world result
```

Compare manual/current, existing-app, workaround, own Concept A/B and hybrid routes.

Core ≠ secondary convenience scenario.

If accepted, Refined Core Real-Life Scenario becomes the nearest real-life Source for Prototype/Scenario Discovery; otherwise Step-02 remains fallback.

Deep guide: `../../shared/application-definition-refined-core-real-life-scenario.md`.

## Concept Sufficiency

Does the concept provide enough user-visible/useful result to justify an own Application?

## Responsibility Boundary

Separate inside Application / outside actor / external-system / shared-handoff responsibilities.

## Information / State Ownership

Distinguish Application-owned semantic state from information merely consumed/displayed/forwarded/derived.

## Alternative Sufficiency

Keep viable alternatives alive until Evidence makes them inferior.

## Responsibility Creep

Detect responsibilities added because technically convenient rather than required by the selected whole solution.

## Realization Feasibility

Use only proportional technical Evidence:

```text
representative runtime feasibility
persistence/integration constraints
consistency/transaction pressure
performance/data-volume/algorithm pressure
operability/maintenance burden
rough ownership/cost
```

Do not turn Application Definition into detailed Domain/Architecture/Slice planning.

## Later Revalidation

Recheck when Scenario/Domain/Slice/current implementation Evidence challenges the definition.

## Findings / Outputs

```text
build/buy/adapt/integrate/hybrid finding
reference/market Evidence
core/secondary real-life scenario findings
selected/refined real-life route
concept sufficiency
responsibility/state boundary
feasibility finding
Q/R/P / revalidation signal
```

## Typical Consumers

Application Definition; accepted outputs feed Prototype/Scenario/Screen.

## Artifact / File Implications

### Structured Artifact / File Guidance

These records describe conditional placement guidance produced by this Lens. They never create semantic ownership by themselves.

```text
ARTIFACT_GUIDANCE
ID: AG-APP-01
CONTENT_KIND: APPLICATION_FINDING
WHEN: Lens selects/refines application boundary/concept/feasibility
GUIDANCE: PROFILE_DEFAULT
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Application Definition Target
REPRESENTATION: EMBED_CURRENT_OWNER
FILE_OR_ARTIFACT: <application-definition-owner>
CONTENT: selected application concept/boundary/feasibility/refined route findings
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_GUIDANCE
ID: AG-APP-02
CONTENT_KIND: REFERENCE_RESEARCH
WHEN: market/reference evidence is substantial
GUIDANCE: ADVISORY_PREFERRED
PERSISTENCE_GUIDANCE: PREFERRED
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Application Definition as consumer; Evidence remains Evidence
REPRESENTATION: SUPPORTING_EVIDENCE_ARTIFACT
FILE_OR_ARTIFACT: <application-reference-research-artifact>
CONTENT: research evidence/findings
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```

```text
ARTIFACT_GUIDANCE
ID: AG-APP-03
CONTENT_KIND: REFINED_REAL_LIFE_ROUTE
WHEN: refined core real-life route is independently reused/reviewed
GUIDANCE: ADVISORY_OPTIONAL
PERSISTENCE_GUIDANCE: OPTIONAL
PLACEMENT_DIRECTIVE: PLACE
SEMANTIC_OWNER: Application Definition
REPRESENTATION: SEPARATE_ADDRESSABLE_ARTIFACT
FILE_OR_ARTIFACT: <refined-real-life-scenario-artifact>
CONTENT: refined route while preserving Application Definition authority
GUIDANCE_SOURCE: LENS
RESOLVER: P-14 / TF-10
```


Shell placement semantics: [`artifact-placement-and-idtspe-response-contract.md`](../../../../idtspe-core/shared/artifact-placement-and-idtspe-response-contract.md).

Primary findings normally project into the canonical Application Definition artifact.

**PREFERRED supporting research artifact** for substantial market/reference evidence.

**OPTIONAL separate addressability** for Refined Core Real-Life Scenario when independently reused/reviewed.

Do not create separate files for each sublens finding; `P-14` preserves one Application semantic owner.

## Guards

Competitor feature ≠ our requirement. Refined real-life scenario ≠ Application Scenario. Feasibility ≠ detailed architecture plan.

## Composition

L1–L3 always; L4/L5/L6 when current workspace/dependency/evolution/proof materially affects feasibility.

## Escalation / Revalidation

Independent feasibility/architecture choice spaces may become bounded child Targets.

## High-Level Example — Self-Contained Walkthrough

### Situation

A team wants to build a specialized research-capture application because current tools feel cumbersome.

They have a Fundamental Need, but custom software may not be the best route.

### Why This Lens

This Application-profile Lens examines alternatives, core real-life routes, responsibility boundaries and proportional feasibility before the app concept hardens.

### Walkthrough

Compare:

```text
manual copy/paste
read-later tool
note/highlight product
custom application
hybrid integration
```

Suppose custom software remains justified only for:

```text
fast temporary capture
later review
```

while long-term knowledge organization is already served well by existing tools.

The Lens helps set:

```text
Inside:
  capture + temporary review

Outside:
  permanent knowledge management
```

It also checks whether the needed browser/platform integration is realistically possible.

### Result

Findings feed Application Definition:

```text
build/buy/adapt/integrate position
core real-life route
concept sufficiency
responsibility/state boundary
feasibility findings
```

### Boundary / Lesson

The Lens does not design final Screens, Scenarios or architecture.

Existing products provide Evidence/Ideas, not authority over our product semantics.

## Provenance

Pre-Lens Application lenses + later market/reference + refined core real-life scenario decisions.
