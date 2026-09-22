# LENS-APPLICATION-BOUNDARY-FEASIBILITY — Application Definition / Benefits / Boundary / Feasibility

Lens ID: `LENS-APPLICATION-BOUNDARY-FEASIBILITY`
Activation: `TARGET_PROFILE_REUSABLE`

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `LENS.META-MODEL`
> Owner: [Lens Meta-Model](../../../../idtspe-core/lenses/LENS-MODEL.md#lens-meta-model)

## Purpose

Evaluate whether an own Application is justified, which real-world contribution it should own, what existing alternatives teach us, which Benefits justify it, whether each Benefit has a truthful Responsibility Boundary, whether representative real-life situations make those Benefits concrete, whether the concise Application Concept is understandable, and whether the concept/Benefit boundaries are plausibly realizable.

## Applicability Gate

Primary for `TM-APPLICATION-DEFINITION`.

## Target Inputs / Evidence

```text
Fundamental Need
Step-02 solution / own-software contribution
manual/existing/external alternatives
market/reference research
Prototype Evidence
current application/workspace
later Scenario/Domain/Slice Evidence
```



## Analysis Surface

### Primary Result Units / Semantic Selectors

- `TM-APPLICATION-DEFINITION`: `RU-APP-01`, `RU-APP-02`, `RU-APP-03`, `RU-APP-04`, `RU-APP-05`, `RU-APP-07` (`RU-APP-06` is intentionally not a standalone Unit)

### Conditional Result Units / Semantic Selectors

- `TM-SCENARIO-PLANNING`: `RU-SCEN-01` when Application-boundary findings materially challenge one Scenario journey boundary/composition

### Relevant State Units

```text
Questions
Proposals / Planning Branches when comparison is material
Q/R/P
Decisions
Evidence / Evidence Needs
Revalidation state
```

### Context

- Need / real-life solution Sources
- market/reference Evidence
- current Application/Scenario state
- current implementation constraints when feasibility is material

Context availability does not mean this Lens audits all context. The deliberate focus remains the Result/State meaning named above.

## Supported Operations

```text
ANALYZE
CHECK
REFINE
CHALLENGE
```

- `ANALYZE` inspects the Analysis Surface through this Lens perspective.
- `CHECK` evaluates current meaning against this Lens's criteria/guards.
- `REFINE` surfaces a proposal for more precise/missing meaning where the semantic destination is already understood.
- `CHALLENGE` surfaces reasons selected/accepted meaning may be weak, stale, unsupported or wrong.

`REOPEN`, State-Unit creation/refinement, cross-owner handoff and Result Unit update after resolution are Core Finding-Disposition/lifecycle consequences, not Lens methods.

## Existing-Solution Sufficiency / Market Reference

```text
Does an existing solution satisfy Need + constraints well enough?
Should we use/buy/adapt/integrate/hybrid instead?
What research depth is proportional?
Which direct alternatives/substitutes/adjacent references matter?
What should be borrowed or avoided?
```

For serious external/commercial products, market/competitor/user/adoption/pricing Evidence is included only when decision-relevant.

Reference products are Evidence/Proposal sources, not authority.

Deep guide: `../../shared/application-definition-existing-solutions-market-reference-research.md`.

## Whole-Solution Contribution

Application exists to realize an already selected real-world solution contribution, not to justify itself after the fact.

## Benefit / Representative Real-Life Scenario Evaluation

Canonical Benefit/RLS schemas and authority are owned by [`TM-APPLICATION-DEFINITION`](../../target-modules/TM-APPLICATION-DEFINITION.md). This Lens evaluates them; it does not redefine them.

Check proportionally:

```text
Do selected/possible Benefits state a real User Need and what the user receives?
Does each substantive Benefit state its own Responsibility Boundary: what the Application owns/provides for that Benefit and what remains outside?
Is Additional Info only proportional free-form clarification rather than a forced schema?
Do representative RLS examples make the Benefits understandable through concrete real-life situations?
Is the bounded [Target contribution] explicit enough to avoid responsibility creep?
Do surrounding RLS steps remain surrounding workflow rather than selected Application behavior?
Are AB-* manifestation/closure markers truthful and many-to-many where useful?
```

Supporting refinement guide: `../../shared/application-definition-representative-real-life-scenario-guide.md`.

## Concept Sufficiency

Is the Application Concept a short, immediately understandable summary of:
- what the Application is;
- why it is needed / what overall Benefit it provides;
- briefly how it roughly works?

Do not require Feature decomposition, detailed behavior or architecture merely to satisfy Concept sufficiency.

## Benefit Responsibility Boundaries

Check Responsibility Boundary on the affected `AB-*` items rather than creating or evaluating a standalone Responsibility Boundary Result Unit.

For each material Benefit, distinguish what the Application owns/provides from actor/manual/external-system/shared-handoff responsibility and information merely consumed/displayed/forwarded/derived. Cross-Benefit consistency is a review concern; authoritative boundary meaning remains on each Benefit.

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

## Typical Findings

```text
build/buy/adapt/integrate/hybrid finding
reference/market Evidence
Benefit sufficiency / Representative RLS boundary findings
truthful Target-contribution boundary
concept sufficiency
Benefit responsibility/state boundary
feasibility finding
Q/R/P / revalidation signal
```



## Finding Contract

The items above are `Finding Candidates`, not Lens-owned State Unit kinds or direct Result mutations.

A material finding may expose proportionally:

```text
Meaning
Affected Unit(s) / fields — when known
Evidence / rationale
Materiality hint — optional
Likely semantic owner — optional hint
Suggested lifecycle consequence — optional hint
```

Core [`Finding Disposition`](../../../../idtspe-core/resolution/findings/FINDING-DISPOSITION.md) resolves the actual State/lifecycle/owner destination. Normal authority/resolution must occur before accepted Result Unit meaning changes.

This Lens does not define new Result Units or target-result fields. If repeated findings reveal missing target-result meaning, revise the appropriate Target Module/Local Target Contract or let Core disposition the finding to another owner.

## Typical Consumers

Application Definition; accepted outputs feed Prototype/Scenario/Screen.

## Artifact / File Implications

`NONE_DIRECT / NO_DISTINCT_SUPPORTING_ARTIFACT`. Core Finding Disposition may resolve Application meaning back to the current Application Target; this Lens does not perform that semantic return.

This Lens evaluates Application boundary/feasibility but does not independently prescribe the representation of the Application Definition result or its target-intrinsic supporting research/route material. Findings dispositioned as Application meaning are represented through `TM-APPLICATION-DEFINITION`, whose `AP-APP-*` proposals own current Application/result representation.

If this Lens exposes a genuinely independent Evidence or planning problem outside that Target result, surface the Finding Candidate with likely owner/evidence hints. Core Finding Disposition handles the actual Evidence path and may surface a Target Formation candidate; the Lens does not create a second Application artifact authority.

## Guards

Competitor feature ≠ our requirement. Representative Real-Life Scenario ≠ Application Scenario. Feasibility ≠ detailed architecture plan.

## Composition

L1–L3 always; L4/L5/L6 when current workspace/dependency/evolution/proof materially affects feasibility.

## Escalation / Revalidation

Independent feasibility/architecture choice spaces surface Finding Candidates; Core Finding Disposition may surface a Target Formation candidate, and Target Formation decides whether a bounded child/local Target is warranted.

## High-Level Example — Self-Contained Walkthrough

### Situation

A team wants to build a specialized research-capture application because current tools feel cumbersome.

They have a Fundamental Need, but custom software may not be the best route.

### Why This Lens

This Application-profile Lens examines alternatives, representative real-life situations, Benefit-specific responsibility boundaries and proportional feasibility before the app concept hardens.

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

The Lens helps refine the relevant Benefit itself:

```text
User Receives:
  fast temporary capture + later review support

Responsibility Boundary:
  Application owns capture + temporary review support.
  Permanent knowledge management remains outside.
```

It also checks whether the concise Application Concept remains understandable and whether the needed browser/platform integration is realistically possible.

### Result

The Lens surfaces Finding Candidates about:

```text
build/buy/adapt/integrate position
representative real-life situation
concept sufficiency
Benefit responsibility/state boundary
feasibility
```

Core Finding Disposition decides whether accepted meaning becomes/refines Application Definition State/Decision input or belongs to another owner.

### Boundary / Lesson

The Lens does not design final Screens, Scenarios or architecture.

Existing products provide Evidence/Proposal pressure, not authority over our product semantics.

## Knowledge Basis

Mode: `INLINE`

**Embedded Principles / Rules / Theory:**

- Build/use/adapt/buy/integrate alternatives should be compared against the real-life Need before custom software responsibility is accepted.
- Feasibility evidence may constrain Application boundary but must not replace product/Need authority.

**Referenced Knowledge Owners:**

- `NONE`

**Reference Load Policy:**

No external knowledge body is required for normal use.

**Operationalization Notes:**

Market/reference/implementation facts are Target Inputs/Evidence; the Application boundary/feasibility evaluation is owned here.

## Provenance

Pre-Lens Application lenses + later market/reference + representative real-life scenario boundary decisions.

## Upstream Application Definition Rule

Evaluate Selected/Possible `AB-*`, each Benefit's Responsibility Boundary, the concise Application Concept, and whole real-life solution routes. Application Definition may lead realization; not-yet-implemented intent does not become a Target Application Body.
