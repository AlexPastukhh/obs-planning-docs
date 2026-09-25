<a id="tm-exact-realization"></a>
# TM-EXACT-REALIZATION — Exact Realization / Integration

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Decision record retention](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-decision-retention) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`.
> - `CONTEXTUALIZES` [PRS Decision admission / exit](TM-PLANNING-RESOLUTION-STATE.md#ru-prs-02--tracked-decisions) — `RESOLUTION.CARRY-FORWARD`.

Entry Point: `tm.exact.realization`
Role: generic Core primary/supporting Target Module
Target family / archetype: `EXACT_REALIZATION`

> Semantic Owner Dependency
> Type: `EXTENDS`
> Responsibility: `TARGET-MODULE.META-MODEL`
> Owner: [Target Module Meta-Model](TARGET-MODULE-MODEL.md#target-module-meta-model)


## Purpose

Produce the **exact current candidate realization** of already-sufficient upstream meaning in a form that can be directly integrated into a selected destination/environment without another material design pass.

The module is generic: an Exact Realization may be code, test code, configuration, a migration, schema, workflow, manifest, exact documentation replacement or another directly integrable artifact.

Under active SDS, codebase-oriented realization is owned by SDS `TM-CODE-REALIZATION`; this Core module remains the broad/profile-neutral exact-realization owner and continues to serve non-code literal work.

The module remains deliberately broad and profile-neutral. An active profile may define a narrower realization Target Module for a specialized artifact family. When such a profile owner applies, use that narrower owner rather than treating this generic module as the specialized semantic authority.

```text
accepted upstream meaning
+ current destination state
+ bounded realization scope
↓
RU-REAL-01 Exact Realization
↓ optional / explicitly authorized
Integration Attempt into selected environment
↓
Evidence / Lens analysis
↓
minor in-scope repair OR material Finding / revalidation
↓
updated RU-REAL-01
```

The aim is not to manufacture a deliberately rough draft. Produce the best exact result currently justified; practical integration may then reveal Evidence that requires correction.

## Activation / Scope Gate

Use this Target Module when all are materially true:

```text
a bounded thing is ready to be realized
+ upstream semantic/planning meaning is sufficient for exact realization
+ a concrete destination/current-state context can be inspected or explicitly represented
+ the useful result is the exact directly integrable payload itself
```

Do not use it merely to hide unresolved product/Domain/architecture choices inside code or another artifact.

If the main work is still choosing behavior, Domain meaning, architecture, Slice structure, proof intent or another independently substantial semantic answer, keep/resolve that work in its natural Target first. A small implementation-local choice may remain inside Exact Realization when it does not change accepted upstream meaning or escape the Target scope.

A purely mechanical application of an already exact accepted payload does not require a new Exact Realization Target merely because bytes are being copied.

## Upstream Source Contract

### Accepted Meaning Sources

Depending on the active profile/subject:

```text
accepted Target Result Units / Decisions that define what must become real
accepted `RU-PUPDATE-01 Pre-Update Plan` when the user chose a reviewed pre-update plan first
accepted profile/domain/application meaning when applicable
selected natural-owner proof intent/obligations when the exact payload includes proof material
selected configuration/schema/workflow/documentation/manifest or other literal meaning
```

### Current-State Sources

```text
current destination files/objects/project structure
existing interfaces/contracts/conventions/dependencies relevant to the payload
current destination/environment state
existing validation/integration/runtime configuration
known realization Evidence / failures when refining or repairing
```

### Constraint / Planning-State Sources

```text
current Target scope
explicitly accepted architecture and upstream Decisions
material Q/R/P and unresolved Findings that constrain realization
user authority for integration / verification / repair / destination mutation
```

`SOURCE_AUTHORITY` Requirement remains authority for the concrete Target. The lists above are source archetypes, not a closed whitelist.

### Active-profile future-state handoff

When an active profile defines a dedicated future-transition owner, the selected future target state is a valid accepted upstream planning Source for Exact without becoming current-owner truth first.

For current SDS:

```text
selected TM-EVOLUTION-STEP target state
→ Exact Realization
→ authorized integration/proof Evidence
→ SDS Target Owner Materialization after the realized state is established
```

This Core module produces/integrates the exact result; it does not itself redefine SDS current natural-owner authority or collapse selection into realization.

## Decision-Driver Candidates

Target Goal comes from the current Target context. Typical reusable driver candidates include:

### Question candidates

```text
What exact directly integrable result must exist at the end of this Target?
Which current destination files/objects/state are authoritative inputs?
Which implementation-local choices remain genuinely unresolved?
What integration/build/test/runtime checks are useful and actually available?
Has the user authorized an Integration Attempt, and into which environment?
Has the user authorized automatic minor repair after failed checks?
Does the user want an exact-result review before verification, after repair, or both?
```

### Problem candidates

```text
current destination cannot accept the candidate as written
candidate fails build/compile/static/runtime/test checks
existing API/schema/configuration differs from an assumption used by the candidate
repair appears to require an architecture/Domain/product-semantic change
repair appears to require changes outside the current Target scope
selected destination/environment cannot provide the intended verification Evidence
```

Concrete Questions/Problems/Proposals/Q/R/P/Decisions/Evidence remain generic Core State. The module supplies recurring discovery prompts, not a second state runtime.

## Unit Definition Conformance

> Semantic Owner Dependency
> Type: `CONTEXTUALIZES`
> Responsibility: `TWU.UNIT-CONTRACT`
> Owner: [Target Work Unit contract](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-unit-contract)

Each declared Result Unit is a Module-defined Unit Definition under the canonical Target Work Unit contract. This concrete Module owns only its Target-family-specific Unit definitions/deltas; generic simple/composite/runtime projection and Core State semantics remain with their Core owners. A material Proposal selection has Core Decision semantics. Any separate record follows the linked Core retention contract; this Target Module owns only its result shape, not another Decision lifecycle.

## Target Step-Result Contract

**Target Step Result:** `Exact Realization`

| Result Unit | Meaning |
|---|---|
| `RU-REAL-01` | Exact Realization — the current complete directly integrable candidate result for the selected bounded scope |

### `RU-REAL-01` Unit Definition

**Responsibility.** Produce the complete exact directly integrable realization for the selected bounded scope.

**Purpose.** Convert sufficiently accepted semantics into an exact candidate that can be reviewed/applied/verified without another material design pass.

**Result Content Contract.** One complete current exact payload for the bounded realization, including the exact file/object/config/schema/test material needed for direct integration and the baseline/destination identity required to interpret it safely.

This Unit is simple by default. Verification observations, repair reasoning, Questions, Problems, Proposals, Decisions and Evidence remain Core State around the Unit rather than automatically becoming Unit Resolution Slots; introduce a Slot only for a true terminal sub-responsibility of the exact result itself.

### Result Unit Applicability / Materiality

Apply the Core [`Unit Applicability / Materiality / Disposition Contract`](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-disposition).

| Result Unit | Substantive resolution is material when | Target/Unit disposition when not material |
|---|---|---|
| `RU-REAL-01` | always once an Exact Realization Target is formed; it owns the exact directly-integrable candidate for the bounded scope | no Unit-level omission after Target formation; if accepted meaning/readiness is insufficient for exact output, the Target-level activation gate fails and the Exact Target should not be formed; a formed Unit that becomes temporarily blocked stays `OPEN` with the blocker |

When this Target is formed, its Module-defined Unit remains declared. Do not use a bare `N/A`; if substantive Unit work is not material, record a concise explicit omission disposition. The whole Target may still be skipped when its Target-level activation gate is not met.

Only one Target-specific Result Unit is required. Verification, build/test observations, repair reasoning, Problems, Proposals, Decisions and Findings remain generic Core State/Evidence around the evolving exact result.


### Explicit Unit Checkpoint Placement

Each material Unit below inherits the generic [`Unit Applicability Envelope`](../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-applicability-envelope). Opening/Closing are mandatory logical applicability boundaries; registries may also be checked during Unit work whenever new material pressure appears.

#### `RU-REAL-01` processing envelope

1. **Opening Unit Checkpoint — `RU-REAL-01`** — resolve/reuse current applicable Core + active-profile Lens registry candidates and any Unit-triggered supporting registry pressure before material work.
2. **Unit Work — `RU-REAL-01`** — produce/refine only the material meaning owned by this Result Unit; run additional applicability checks immediately when the Analysis Surface changes materially.
3. **Closing Unit Checkpoint — `RU-REAL-01`** — evaluate the actual candidate Current Result Content, disposition material Findings/owner consequences, and reopen/refine narrowly when needed before treating the Unit as current-for-handoff.

### RU-REAL-01 — Exact Realization

**Lens Attachments**

- **Core Lens Pack:** `INHERITED` via [`Core Lens Pack`](../lenses/LENS-REGISTRY.md)
- **TRIGGERED:**
  - [`LENS-DEPENDENCY-CHANGE-IMPACT`](../lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md)
  - [`LENS-QUALITY-RISK-MATERIALITY`](../lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md)
  - [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md)
  - [`LENS-TEST-PROOF-EVIDENCE`](../lenses/reusable/LENS-TEST-PROOF-EVIDENCE.md)

The Result Unit contains enough exact representation to attempt direct integration without another material design pass.

Typical broad/profile-neutral realizations may include, proportionally:

```text
exact added/changed/deleted file/object scope
complete exact payload or applicable patch
config / migration / schema / workflow / manifest material
exact documentation replacement
current destination/baseline identity needed to interpret the payload safely
```

When an active profile defines a narrower realization owner for a specialized artifact family, route that specialized result there rather than duplicating profile semantics in this generic Unit.

`RU-REAL-01` is **versioned by meaning during the Target**, not by mandatory persisted version objects. If an Integration Attempt causes a repair:

```text
Exact Realization v1
→ Evidence / repair
→ Exact Realization v2 = current RU-REAL-01
```

The old candidate may remain in conversation/review history when useful, but the current result is the exact version now intended for the next review/integration/apply action.

## Resolution / Production Method

### Internal exact planning before the literal Result

When `RU-REAL-01` cannot be produced responsibly in one direct pass, use a transient **exact realization working plan** inside this Target.

This is production reasoning around the Result, not another Result Unit and not `TM-PRE-UPDATE-PLAN`.

Its proportional working content may include:

```text
approved upstream authority / selected approach
significant payload parts and responsibilities
inputs / outputs / side effects / dependencies
exact state/data flow when applicable
failure / retry / uncertainty flow when applicable
file/object add/replace/delete/move intent
exact interfaces/fields/steps when useful
exact validation/proof material when in scope
reusable guidance used during planning — optional working provenance when materially useful
open literal details
risks / Known Problems
backward-consistency notes
expected literal result
```

The working plan is:
- non-persistent by default;
- not semantic authority;
- disposable/reconcilable after realization;
- allowed to omit irrelevant detail;
- allowed to become literal enough to directly produce `RU-REAL-01`.

Durable meaning discovered during this internal exact planning remains Proposal/Decision/natural-owner work until approved; it must not be smuggled into the literal result.

IDTSPE Use-Case composition and Core contracts own methodology depth/readiness, proposal/approval and forward-consistency/revalidation routing. Thin Session Runtime owns only USER↔AI interaction mechanics. This Target consumes those rules rather than redefining them.

### 1. Resolve exact realization scope

Establish:

```text
what is being realized
accepted upstream meaning that must not drift
current destination/current-state Sources
what is explicitly inside vs outside scope
what exact artifact/destination state would count as the result
```

Do not silently broaden scope merely because adjacent changes would be convenient.

### 2. Produce the complete exact candidate

Create `RU-REAL-01` as a directly integrable candidate.

Prefer exact destination-native files/objects/patches/payloads over prose placeholders. If a material semantic/interface/architecture choice is still unresolved, keep that uncertainty explicit instead of pretending the literal result is final.

### 3. Exact-result review is a normal stopping point

The user may request:

```text
"сначала дай exact implementation, ничего не запускай"
```

Then expose the complete current `RU-REAL-01` and stop before integration/build/test activity.

Human review can catch wrong architecture, API shape, naming, scope or semantics before practical execution. A later review after repairs is equally valid.

### 4. Resolve integration / verification authority explicitly

Producing an exact candidate does **not** itself authorize destination mutation, build/test execution or automatic repair.

Before an Integration Attempt, resolve the user's requested authority proportionally. Common choices include:

```text
exact result only / review first

verify only
  integrate into the selected available environment
  run agreed useful checks
  do not repair automatically

verify + minor repair
  run agreed useful checks
  automatically repair only within the bounded minor-repair rule

apply/integrate into an intended destination
  only when that destination mutation is explicitly authorized
```

These are ordinary user choices, not a required enum/state machine.

### 5. Integration Attempt into selected environment

When authorized, integrate the current exact candidate into the selected environment and obtain practical Evidence.

The environment may be:

```text
disposable scratch/worktree
ChatGPT-accessible project copy
staging / representative environment
user local project
actual intended final destination
another concrete integration environment
```

Do **not** hard-code a required `temporary integration → final integration` pair. One Integration Attempt may be verification-only or may also be the actual intended application, depending on destination + user authority + reversibility/consequences.

Checks depend on the artifact/environment and may include, as materially available:

```text
parse / validate / load / dry-run
schema or compatibility validation
focused integration/runtime checks
artifact-specific automated checks
selected behavior/acceptance checks
```

A profile-specific realization module may define a richer specialized check set.

Record facts as Evidence. Never claim a check passed when it was not actually run or when the environment could not perform it.

### 6. Automatic minor-repair boundary

When the user authorizes repair, automatically fix only:

> local/minor implementation defects inside the current scope that do not change accepted architecture, Domain/product semantics or material decisions of upstream Target Results.

Also:

> do not change things that are outside the current scope of work.

Typical permitted examples when unambiguous:

```text
syntax / compile error
missing/wrong import
local wiring mistake
obvious current-API signature mismatch
mechanical serialization/configuration mismatch
local realization defect that directly contradicts the accepted exact intent
```

A user instruction such as “исправляй ошибки” is **not** permission to silently make new architecture/Domain/product Decisions or expand the scope.

### 7. Material-error / Finding boundary

If correction would require changing accepted architecture, Domain/product semantics, a material upstream Decision, or out-of-scope owners, stop treating it as minor repair.

Canonical path:

```text
Integration Evidence / Lens analysis
→ Finding Candidate / Problem when material
→ Core Finding Disposition
→ current State / owner / lifecycle consequence
→ upstream revalidation or user Decision when required
→ updated Exact Realization only after that meaning is resolved
```

For a complex problem, an explicit decision loop is often useful but not mandatory ritual:

```text
Problem
→ Evidence
→ Proposals A/B/C
→ related Q/R/P
→ Decision
→ updated RU-REAL-01
→ retry when authorized/useful
```

Do not require that ceremony for a trivial import/wiring correction.

### 8. Retry and final exact review

After allowed repair or resolved revalidation:

```text
updated RU-REAL-01
→ retry Integration Attempt when useful/authorized
```

If newly accepted upstream meaning changes an assumption used by the current `RU-REAL-01`, the affected literal candidate is no longer current-for-execution until revalidated/rebuilt. Reuse only the parts that still satisfy the updated accepted meaning.

After successful checks the user may ask to inspect the final exact result again. This is a normal workflow because the verified/repaired candidate may differ from the candidate reviewed before execution.

### 9. Handoff / apply

The current accepted `RU-REAL-01` can be handed to the intended destination/application mechanism according to explicit authority.

Exact Realization does not imply Git commit/push, deployment, production release or any unrelated external side effect. Those require their own explicit authority/host workflow when applicable.

When a coherent final-literal review/integration state is useful after proof, `UC-IDTSPE-INTEGRATE-CURRENT-WORK` may invoke the Core Integration Checkpoint. This Target does not own a second checkpoint lifecycle, and no checkpoint is required merely because Exact Realization completed.

## Validators / Guards

```text
exact candidate is directly integrable at the chosen representation granularity
accepted upstream meaning is not silently redefined
current destination/current-state Sources were actually inspected or explicitly bounded
integration/validation/execution activity occurred only under explicit authority
repair occurred only when repair authority existed
minor repair did not change architecture/Domain/product semantics/material upstream Decisions
minor repair did not change out-of-scope owners
executed checks are distinguished from planned/not-runnable checks
current RU-REAL-01 reflects all accepted repairs
material conflicts use Finding Disposition/revalidation instead of silent semantic drift
commit/push/deploy/release is never implied by Exact Realization
```

## Relationship To Planning / Evidence Targets

```text
semantic/design Target
→ says what meaning is accepted

TM-PRE-UPDATE-PLAN [optional]
→ says what concrete changes are intended before mutation when review-first planning is useful

TM-EXACT-REALIZATION
→ produces the exact directly integrable realization of sufficiently determined meaning

TM-PRACTICAL-TEST or another Evidence Target
→ may later study the real implemented subject/environment for acceptance/learning
```

Candidate artifact-specific validation/integration/runtime checks performed while integrating `RU-REAL-01` are Core Evidence inside this Target. They do not automatically create an implemented-practical-Evidence Target.

## Artifact / File Contract

The natural representation of `RU-REAL-01` is usually **implementation-native**:

```text
exact files / patch / payload
config / schema / migration
workflow / manifest
exact documentation replacement
other exact destination artifact
```

Do not create a Markdown planning file merely because this Target exists. Documentation / Representation + P-14 / PERSISTENCE_ADDRESSABILITY decides whether Decisions, rationale, unresolved Problems or review material need durable supporting representation beyond the implementation-native result.

An integration environment and an intended durable destination are not automatically the same thing. Preserve enough baseline/destination identity to avoid applying an exact payload against an incompatible current state.

## Handoff / Revalidation

Accepted `RU-REAL-01` may become:

```text
direct input to an authorized destination/application mechanism
current implemented Source for later Targets
actual Evidence source for Test Coverage / Practical Evidence / consistency review
revalidation input when implementation reality challenges upstream meaning
```

If later destination/codebase changes make the exact realization stale, reuse the same Target when the bounded responsibility is still the same and invoke `REVALIDATE / REPAIR`; form another Target only through normal Target Formation when the responsibility itself becomes independently different.
