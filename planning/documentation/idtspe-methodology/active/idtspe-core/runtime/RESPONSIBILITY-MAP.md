# Runtime / Core State Responsibility Map

Status: active routing projection

> Semantic Owner Dependency
> Type: `REPRESENTS`
> Responsibility: `DOC.RESPONSIBILITY-MAP`
> Owner: [Responsibility Map](../../../../principles-and-terminology.md#doc-responsibility-map)

This map routes generic Core runtime, Work Context/Core State, methodology-composition and interaction-intake responsibilities. It owns routing only; linked owners retain the semantic bodies.

| Responsibility | Canonical owner | Boundary / notes |
|---|---|---|
| Generic technical IDTSPE Work Context / Shell composition and port semantics | [`IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md`](IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md#idtspe-runtime-composition) — `IDTSPE.RUNTIME-COMPOSITION` | Technical composition only; Use Cases own functional orchestration and semantic components own their own meaning |
| Per-pass Port Requirement Set refresh/admission/reuse semantics | [`IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md`](IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md#idtspe-port-composition-refresh) — `IDTSPE.PORT-COMPOSITION-REFRESH` | Compose Current Work invokes this contract; it does not redefine technical admission/reuse |
| Turn Work Record plan/current state/execution/finalization discipline | [`WORK-RECORD-PRINCIPLES.md`](WORK-RECORD-PRINCIPLES.md#idtspe-work-runtime) — `IDTSPE.WORK-RUNTIME` | Runtime/orchestration only; not semantic planning/review authority or private reasoning |
| Legacy P-02 compatibility visibility | [`PASS-TRACE-AND-VISIBILITY-CONTRACT.md`](PASS-TRACE-AND-VISIBILITY-CONTRACT.md#idtspe-pass-trace) — `IDTSPE.PASS-TRACE` | Compatibility projection only; not an active Shell port or independent record |
| Contextual/proportional methodology application | [`applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md`](applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md#idtspe-contextual-application) — `IDTSPE.CONTEXTUAL-APPLICATION` | Governs proportional methodology composition; local component owners still decide local applicability/materiality |
| Methodology-composition recheck trigger/contract | [`applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md`](applicability/CONTEXTUAL-METHODOLOGY-APPLICATION-CONTRACT.md#idtspe-methodology-composition-recheck) — `IDTSPE.METHODOLOGY-COMPOSITION-RECHECK` | Recheck semantics only; functional applicability resolution remains Documentation-owned |
| Always-on/default work-model and `idtspe.work` compatibility meaning | [`IDTSPE-DEFAULT-WORK-MODE.md`](IDTSPE-DEFAULT-WORK-MODE.md#idtspe-default-work-mode) — `IDTSPE.DEFAULT-WORK-MODE` | Compatibility/default projection; actual composition is resolved through the Use-Case layer and contextual-application owner |
| Generic Core State Unit / Core Resolution State boundary | [`target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#core-state-unit-boundary) — `CORE.STATE-UNIT` | Core State remains distinct from Target Work Unit; individual state kinds retain their lifecycle owners |
| Methodology Usage State carrier | [`target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md`](target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#core-methodology-usage-state) — `CORE.METHODOLOGY-USAGE-STATE` | Retains only material methodology-use facts; not a file-read/tool/execution log |
| USER-message intake/classification into Source/Answer/Need/Proposal/Decision semantics | [`interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md`](interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md#idtspe-user-input-intake) — `IDTSPE.USER-INPUT-INTAKE` | Intake/classification only; routed lifecycle owners decide semantic consequences |
| Functional IDTSPE Use-Case orchestration/discovery | [`../use-cases/RESPONSIBILITY-MAP.md`](../use-cases/RESPONSIBILITY-MAP.md) | Separate child map routes each orchestration responsibility without copying its Process |

Guards:

```text
Work Context composition ≠ one persisted state object
Core State Unit ≠ Target Work Unit
Turn Work Record ≠ Work Context semantic owner
Port admission ≠ positive semantic result
Use Case orchestration ≠ component semantic ownership
input classification ≠ lifecycle authority
```

<a id="work-runtime-responsibility"></a>
## Work Runtime ownership

| Responsibility | Owns | Does not own |
|---|---|---|
| `IDTSPE.WORK-RUNTIME` | Turn Work Record kernel, evolving work mechanics, DIRECT/SHELL routing, observable execution/finalization discipline | Needs, Proposal/QRP/Decision, Review Coverage, Targets or semantic content |
| `IDTSPE.PASS-TRACE` | legacy P-02 compatibility projection of Shell-specific observable facts into the current Turn Work Record | active Shell port, independent trace/store, semantic authority |

P-01/P-02 are retired/reserved compatibility labels; active Shell capability numbering remains P-03..P-15.
