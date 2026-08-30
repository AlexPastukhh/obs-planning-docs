# TM-EXACT-REALIZATION — Exact Realization / Integration

Entry Point: `tm.exact.realization`  
Role: generic Core primary/supporting Target Module  
Target form: `EXACT_REALIZATION`

## Purpose

Produce the **exact current candidate realization** of already-sufficient upstream meaning in a form that can be directly integrated into a selected destination/environment without another material design pass.

The module is generic: an Exact Realization may be code, test code, configuration, a migration, schema, workflow, manifest, exact documentation replacement or another directly integrable artifact.

The **primary/default archetype is codebase realization**. When the user asks to implement code, use the code workflow in this module by default unless the user explicitly asks for a shorter depth such as exact code only with no integration/build/test attempt.

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
accepted Scenario / Domain / Slice / Screen / Requirement / architecture meaning when applicable
selected Test Design / proof obligations when tests are in scope
selected configuration/schema/workflow/documentation meaning for non-code realization
```

### Current-State Sources

```text
current codebase / files / project structure
existing APIs, types, tests, conventions and dependencies
current destination/environment state
existing build/test/runtime configuration
known implementation Evidence / failures when refining or repairing
```

### Constraint / Planning-State Sources

```text
current Target scope
explicitly accepted architecture and upstream Decisions
material Q/R/P and unresolved Findings that constrain realization
user authority for integration / verification / repair / destination mutation
```

`TF-04 SOURCE_SET` remains authority for the concrete Target. The lists above are source archetypes, not a closed whitelist.

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

Concrete Questions/Problems/Ideas/Q/R/P/Decisions/Evidence remain generic Core State. The module supplies recurring discovery prompts, not a second state runtime.

## Target Step-Result Contract

**Target Step Result:** `Exact Realization`

| Result Unit | Meaning |
|---|---|
| `RU-REAL-01` | Exact Realization — the current complete directly integrable candidate result for the selected bounded scope |

Only one Target-specific Result Unit is required. Verification, build/test observations, repair reasoning, Problems, Ideas, Decisions and Findings remain generic Core State/Evidence around the evolving exact result.

### RU-REAL-01 — Exact Realization

The Result Unit contains enough exact representation to attempt direct integration without another material design pass.

For code this normally means, proportionally:

```text
exact added/changed/deleted file scope
complete exact code or an exact applicable patch/payload
exact test code when tests belong to the realization scope
required exact config/migration/schema changes in the same bounded realization
current destination/baseline identity needed to interpret the payload safely
```

For non-code realization, use the equivalent exact directly integrable representation.

`RU-REAL-01` is **versioned by meaning during the Target**, not by mandatory persisted version objects. If an Integration Attempt causes a repair:

```text
Exact Realization v1
→ Evidence / repair
→ Exact Realization v2 = current RU-REAL-01
```

The old candidate may remain in conversation/review history when useful, but the current result is the exact version now intended for the next review/integration/apply action.

## Resolution / Production Method

### 1. Resolve exact realization scope

Establish:

```text
what is being realized
accepted upstream meaning that must not drift
current destination/current-state Sources
what is explicitly inside vs outside scope
what exact artifact/code state would count as the result
```

Do not silently broaden scope merely because adjacent changes would be convenient.

### 2. Produce the complete exact candidate

Create `RU-REAL-01` as a directly integrable candidate.

For code, prefer exact project-native files/patches and real current owner/API names over prose pseudocode. If a material name/API/architecture choice is still unresolved, keep that uncertainty explicit instead of pretending the code is final.

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

For code, checks may include as material/available:

```text
build / compile
automated unit/integration/E2E tests
static/type/lint checks
focused runtime/startup checks
selected scenario/behavior checks
```

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
local implementation bug that directly contradicts the accepted exact intent
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
→ Ideas A/B/C
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

After successful checks the user may ask to inspect the final exact result again. This is a normal workflow because the verified/repaired candidate may differ from the candidate reviewed before execution.

### 9. Handoff / apply

The current accepted `RU-REAL-01` can be handed to the intended destination/application mechanism according to explicit authority.

Exact Realization does not imply Git commit/push, deployment, production release or any unrelated external side effect. Those require their own explicit authority/host workflow when applicable.

## Code-First Default Walkthrough — Self-Contained

### Situation

Assume an upstream Domain Target has already accepted:

```text
CaptureItem
  has stable CaptureItemId
  requires non-null SourceContext
  must not silently weaken that invariant
```

The current Java project already contains `CaptureItemId` and `SourceContext`. The user says:

> реализуй код агрегата; сначала покажи точную реализацию и ничего не запускай.

### Exact code candidate

`RU-REAL-01` is literal code, not another implementation plan.

`src/main/java/example/capture/CaptureItem.java`:

```java
package example.capture;

import java.util.Objects;

public final class CaptureItem {
    private final CaptureItemId id;
    private final SourceContext sourceContext;

    private CaptureItem(CaptureItemId id, SourceContext sourceContext) {
        this.id = Objects.requireNonNull(id, "id");
        this.sourceContext = Objects.requireNonNull(sourceContext, "sourceContext");
    }

    public static CaptureItem create(CaptureItemId id, SourceContext sourceContext) {
        return new CaptureItem(id, sourceContext);
    }

    public CaptureItemId id() {
        return id;
    }

    public SourceContext sourceContext() {
        return sourceContext;
    }
}
```

When exact test realization is in scope, the same Result may include exact test code, for example:

`src/test/java/example/capture/CaptureItemTest.java`:

```java
package example.capture;

import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

final class CaptureItemTest {
    @Test
    void rejectsMissingSourceContext() {
        CaptureItemId id = CaptureItemId.newId();
        assertThrows(NullPointerException.class, () -> CaptureItem.create(id, null));
    }
}
```

This example is illustrative; a real Target must use the actual current project types/APIs/tests rather than inventing these names when the codebase says otherwise.

### Review before execution

The assistant shows the complete exact candidate. The user may accept it, change it, or stop here.

Suppose the user then says:

> вариант устраивает. Примени в своей доступной копии проекта, собери и прогони тесты. Minor ошибки исправляй сам, но архитектуру и Domain decisions не меняй.

That grants an Integration Attempt plus bounded minor-repair authority.

### Minor repair example

Suppose compilation reveals that the existing project factory is `CaptureItemId.create()` rather than `newId()` in the test.

That is a local current-API mismatch. Under the granted repair authority:

```text
Evidence: compile error
→ repair test call to CaptureItemId.create()
→ RU-REAL-01 v2
→ build/test retry
```

No upstream semantics changed.

### Material Finding example

Suppose an integration test instead reveals that the current persistence reconstruction can produce `SourceContext = null`, while the accepted Domain invariant forbids it.

Do not silently weaken the Aggregate or redesign persistence merely to get green tests.

A useful explicit loop may be:

```text
Problem:
  existing persisted representation can reconstruct a state forbidden by accepted Domain meaning

Evidence:
  integration test fails when legacy record has no SourceContext

Idea A:
  migrate persisted data / make representation non-null

Idea B:
  introduce explicit legacy-state handling outside CaptureItem

Risk:
  migration may affect existing stored data
```

That material issue goes through Core Finding Disposition and the appropriate user/upstream Decision before `RU-REAL-01` changes.

### Final review and destination

After authorized repairs and successful practical checks, the user may request the complete current exact code again before applying it elsewhere. The reviewed final code is the same current `RU-REAL-01` intended for handoff/application.

If the selected integration environment was already the intended local destination and mutation was authorized there, the successful Integration Attempt may already be the actual application. The methodology does not invent another mandatory copy step.

## Lens Profile

Generic required Core Pack is inherited from the [`Lens Registry`](../lenses/README.md):

- [`LENS-NEED-VALUE-SCOPE`](../lenses/required/LENS-NEED-VALUE-SCOPE.md)
- [`LENS-AUTHORITY-SOT-REUSE`](../lenses/required/LENS-AUTHORITY-SOT-REUSE.md)
- [`LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`](../lenses/required/LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY.md)
- [`LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`](../lenses/required/LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY.md)

Frequent conditional Core Lenses:

- [`LENS-DEPENDENCY-CHANGE-IMPACT`](../lenses/frequent/LENS-DEPENDENCY-CHANGE-IMPACT.md) — destination/change surface.
- [`LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY`](../lenses/frequent/LENS-VERIFIABILITY-OBSERVABILITY-OPERABILITY.md) — credible checks/diagnosis/operability.
- [`LENS-QUALITY-RISK-MATERIALITY`](../lenses/frequent/LENS-QUALITY-RISK-MATERIALITY.md) — material quality/risk dimensions.

The active profile may add Domain/DDD, UI/frontend, simplicity or other applicable Lenses through normal `TF-06A LENS_SET` resolution. Lens analysis may remain explanatory Broad Discussion; only material newly surfaced meaning that needs ownership/State/lifecycle disposition becomes a Finding Candidate.

## Validators / Guards

```text
exact candidate is directly integrable at the chosen representation granularity
accepted upstream meaning is not silently redefined
current destination/current-state Sources were actually inspected or explicitly bounded
integration/build/test activity occurred only under explicit authority
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

TM-EXACT-REALIZATION
→ produces the exact directly integrable realization of sufficiently determined meaning

TM-PRACTICAL-TEST or another Evidence Target
→ may later study the real implemented subject/environment for acceptance/learning
```

Candidate build/compile/static/automated/runtime checks performed while integrating `RU-REAL-01` are Core Evidence inside this Target. They do not automatically create an implemented-practical-Evidence Target.

## Artifact / File Contract

The natural representation of `RU-REAL-01` is usually **implementation-native**:

```text
code files / exact patch
config / schema / migration
workflow / manifest
exact destination artifact
```

Do not create a Markdown planning file merely because this Target exists. Documentation / Representation + P-14 / TF-10 decides whether Decisions, rationale, unresolved Problems or review material need durable supporting representation beyond the implementation-native result.

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
