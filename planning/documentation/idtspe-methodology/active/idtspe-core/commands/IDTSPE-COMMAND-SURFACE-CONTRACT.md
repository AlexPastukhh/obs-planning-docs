# IDTSPE Core Command Surface Contract

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Decision record retention](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-decision-retention) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`.
> - `CONTEXTUALIZES` [Resolution Carry-Forward contract](../resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward) — `RESOLUTION.CARRY-FORWARD`.

Status: active generic IDTSPE Core command-surface owner
Scope: generic user-level invocation surfaces that remain valid independently of any one installed profile.

<a id="idtspe-command-surface"></a>
## Purpose

Responsibility ID: `IDTSPE.COMMAND-SURFACE`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Root Command Routing`](../../../../../command-routing.md#planning-command-routing) — `COMMAND.ROOT-ROUTING`
> - `CONTEXTUALIZES` [`Planning Command Definition Contract`](../../../../../commands/README.md#planning-command-definition-contract) — `COMMAND.DEFINITION-CONTRACT`
> - `CONTEXTUALIZES` [`IDTSPE Use-Case Orchestration`](../use-cases/RESPONSIBILITY-MAP.md)
> - `CONTEXTUALIZES` [`Port Composition Refresh`](../runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md#idtspe-port-composition-refresh) — `IDTSPE.PORT-COMPOSITION-REFRESH`
> - `CONTEXTUALIZES` [`Review Strategy / Coverage`](../../ai-reviewability/REVIEW-STRATEGY-AND-COVERAGE-CONTRACT.md#review-strategy-coverage) — `REVIEW.STRATEGY-COVERAGE`
> - `CONTEXTUALIZES` [`Finding Disposition`](../resolution/findings/FINDING-DISPOSITION.md#resolution-finding-disposition) — `RESOLUTION.FINDING-DISPOSITION`
> - `CONTEXTUALIZES` [`Proposal / Decision Lifecycle`](../resolution/proposal-decision/PROPOSAL-AND-DECISION-LIFECYCLE.md#resolution-proposal-decision-lifecycle) — `RESOLUTION.PROPOSAL-DECISION-LIFECYCLE`
> - `CONTEXTUALIZES` [`Need Candidate Collection`](../resolution/needs/NEED-CANDIDATE-COLLECTION.md#resolution-need-candidate-collection) — `RESOLUTION.NEED-CANDIDATE-COLLECTION`
> - `CONTEXTUALIZES` [`Need Candidate Disposition`](../resolution/needs/NEED-CANDIDATE-DISPOSITION.md#resolution-need-candidate-disposition) — `RESOLUTION.NEED-CANDIDATE-DISPOSITION`
> - `CONTEXTUALIZES` [`Q/R/P Lifecycle`](../resolution/qrp/QRP-LIFECYCLE-AND-REVIEW.md#resolution-qrp-lifecycle) — `RESOLUTION.QRP-LIFECYCLE`
> - `CONTEXTUALIZES` [`USER Input / Decision / Answer Intake`](../runtime/interaction/USER-INPUT-DECISION-AND-ANSWER-INTAKE-RULE.md#idtspe-user-input-intake) — `IDTSPE.USER-INPUT-INTAKE`

Define the **generic IDTSPE invocation surface** without making repository command files, palette UI or an installed profile a second Core authority.

```text
Core Target / Lens / Shell owners
= generic methodology semantics

this contract
= stable generic IDTSPE user invocation/navigation surface

profile command-surface contracts
= profile-specific extensions only

repository command definitions / helper
= implementation/projection
```

A profile may extend this surface, but a generic Core command must not depend semantically on an SDS-specific command-surface owner merely because SDS is currently installed.

## Ambient Session Inheritance

All command surfaces execute under the thin Session interaction contract once that contract has been established at session bootstrap or context restoration:

- [`planning/session/principles-and-terminology.md`](../../../../../session/principles-and-terminology.md)
- [`planning/session/session-runtime-contract.md`](../../../../../session/session-runtime-contract.md)

This is **inheritance, not routing**. A command routes directly to its current semantic owner; it must not insert `Session → IDTSPE/profile owner` as an obligatory semantic hop merely to obtain progress, steering or authorization behavior. Session is reloaded only when the interaction context/rules cannot be reconstructed safely.

## Primary User Convenience Surface Inventory — 19

```text
idtspe.bootstrap
→ бутстреп idtspe

idtspe.work
→ compatibility/navigation shortcut: refresh/reaffirm/apply the current Use-Case-driven proportional IDTSPE composition
→ `idtspe [optional TM/LENS selector + context]` may still dispatch an explicitly selected component

idtspe.next
→ что дальше по методологии
→ resolve the smallest useful next methodology action from current methodology + Work Context and surface it as a Generic AI Proposal (GIP); do not execute that GIP

idtspe.continue
→ продолжи по методологии

idtspe.review
→ проведи idtspe review
→ complete current-basis Review Strategy/Coverage pass with Validation/Lenses, Finding Disposition, linked Finding Proposal formation and coverage self-check

idtspe.review.recheck
→ перепроверь
→ recheck LOCAL_AFFECTED stale/partial/invalidated/newly exposed coverage; fall back to initial review when no reliable prior coverage exists

idtspe.review_consistency
→ проверь консистентность плана

idtspe.proposal
→ idtspe пропозал / сделай пропозалы
→ explicitly discover/form/review material Proposals from current context or supplied Findings through the same canonical Proposal lifecycle; optional QRPE is checked and selection remains USER/authority-gated

idtspe.decisions.capture
→ зафиксируй решения
→ capture/review only actual selected material Decisions from current context; never grants AI selection authority; uses intake + lifecycle + Resolution Context Lens + residual Carry-Forward routing

idtspe.needs.collect
→ собери idtspe needs
→ collect only USER/Source-grounded wanted outcomes as Need Candidates with provenance; stop before routing

idtspe.needs.disposition
→ диспозируй idtspe needs
→ route already collected Need Candidates to natural existing owners/lifecycles without recollecting or prematurely manufacturing a solution/Requirement/Feature/Evolution Step

idtspe.findings.disposition
→ разбери файндинги <findings/context>
→ classify material findings by impact plus Resolution Escalation and route them through Finding Disposition/Revalidation

tmcmd.review.findings
→ разбери находки ревью <subject>
→ optional `TM-REVIEW-FINDINGS`; evidence-backed Finding discovery and diagnosis, with Proposal handoff still required for a complete review

tmcmd.proposal.workup
→ подготовь пропозалы <driver/subject>
→ optional `TM-PROPOSAL-WORKUP`; bounded candidate-resolution brief when Proposal work itself merits a Target

tmcmd.pre.update
→ составь предапдейт план <scope>
→ generic `TM-PRE-UPDATE-PLAN`; concrete read-only proposed destination operations before actual mutation

tmcmd.exact.realization
→ сделай точную реализацию <scope>
→ generic `TM-EXACT-REALIZATION`; broad/profile-neutral literal/directly-integrable realization

idtspe.lenses.select
→ подбери линзы <analysis surface / target / context>

idtspe.lens.apply
→ примени линзу <lens> к <analysis surface / target / context>

lenscmd.documentation.representation.check
→ проверь как лучше зафиксировать <target/result>

```

These are **19 primary user convenience surfaces**, not the complete direct-command/composition inventory. Hidden/base `idtspe.port.*`, composition prefixes and additional operation surfaces may exist to guarantee canonical traversal without becoming new methodology owners. Installed profiles contribute additional surfaces; current total command/card counts are tooling projections, not Core ontology.

## Bootstrap / Work Boundary

`idtspe.bootstrap` is the helper surface for the primary bootstrap owned by `planning/README.md`; it is governance orientation only, stops before profile bootstrap, and has `hostTargetPolicy=NONE`.

IDTSPE is already active; `idtspe.work` does **not** enable a mode. It is a compatibility/navigation shortcut that refreshes or explicitly reapplies the current Use-Case-driven proportional composition. Bare `idtspe` means continue ordinary work under that composition. `idtspe <TM-ID|LENS-ID|registry alias> <context>` may explicitly request a registered component, but the component still passes normal Use-Case/context routing and its local applicability gate. Broad Discussion may remain sufficient indefinitely; Integration Checkpoints are situational and invoked through the current IDTSPE Use Cases when a coherent whole-state view is useful.

Bootstrap must not silently select a Target, infer a Target invocation mode or execute Target work.


`idtspe.next` and `idtspe.continue` are explicit navigation/convenience surfaces, not approval gates between natural AI work steps. Thin Session Runtime allows automatic progression through ordinary in-scope interaction steps, while IDTSPE Use Cases own methodology composition.

`idtspe.next` does **not** own Shell visibility. `P-02 Pass Trace / Visibility` owns observability for a normal Shell pass. `idtspe.next` resolves the smallest useful next methodology action from current methodology + current Work Context and presents that action as a **Generic AI Proposal (GIP)**, then stops without executing it. When a current P-13 Handoff / Methodology Direction result exists it may inform that GIP, but Handoff is not required: `idtspe.next` remains valid in Broad Discussion with zero Targets.


## Shell Port Requirement Composition

User/command/component intent may require one or more non-baseline Shell capabilities to be checked/traversed in the current normal IDTSPE pass. This is a **methodology composition rule**, not a second execution runtime and not a requirement that every port have a public command.

### Command Composition Execution Rule

Registered command composition is **expand-first / dependencies-before-dependents**:

```text
selected command/component roots
→ fully expand all transitive command-definition-path includes
→ merge one dependency DAG
→ resolve/validate command-definition paths / reject cycles
→ deduplicate shared nodes
→ collect declarative contributions from ALL expanded nodes
→ establish one execution plan
→ deepest/shared dependencies execute first
→ dependents execute only after dependencies completed or were REUSED
→ each selected root action executes last on its branch
```

Declarative contributions are collected **before** the first semantic command action. A named `idtspe.port.*` node therefore contributes its `EXPLICIT_REQUIREMENT` during composition planning even though the node's runtime check/traversal occurs later. Concrete TM/Lens semantic leaves contribute selected component identity at the same pre-execution stage. This lets Port Composition Refresh see the full intended pass before it runs.

For Review commands, `REVIEW_COVERAGE_MODE` is also a pre-execution contribution. `idtspe.review`, `tmcmd.review.findings` and current-basis specialized reviews such as `idtspe.review_consistency` contribute `CURRENT_BASIS`; `idtspe.review.recheck` contributes `LOCAL_AFFECTED_RECHECK`. Before Validation/Lens dependency semantic actions, resolve the bounded Review Subject/Scope/Basis and establish/refresh one Review Coverage working context from [`REVIEW.STRATEGY-COVERAGE`](../../ai-reviewability/REVIEW-STRATEGY-AND-COVERAGE-CONTRACT.md#review-coverage-working-context). A previously formed Pre-Update Plan can be the explicit Review Subject under ordinary current-basis review, but the Review command does not create it. The strategy derives review obligations/intents and reusable prior coverage; it does **not** become a second Lens selector. P-06 remains the owner of Lens applicability, supported-operation resolution and final selected `(Lens Model, Analysis Surface, Operation, basis)` applications. A complete selected root review action later completes Finding Disposition, linked Proposal formation, coverage update and self-check; the Finding Analysis Target alone is an intermediate diagnostic result. Effective contribution normalization MUST collapse `CURRENT_BASIS + LOCAL_AFFECTED_RECHECK` for the same bounded subject/basis to `LOCAL_AFFECTED_RECHECK` before semantic execution.

Several intents that require the same port, registry/meta-model or other shared prefix must not recursively launch several independent `idtspe.work` passes. Shared prefixes are one DAG node and are performed/reused once per current subject/basis/operation.

An explicit **port/capability requirement** means **perform a real applicability/traversal check**; it does not manufacture a positive result. `NOT_APPLICABLE`, `CHECKED_NO_RESULT`, `CHECKED_NO_CHANGE` and `REUSED` remain valid port outcomes. Automatic composition, explicit port requirement and downstream materiality all enter the same port contract; only P-02 trace `origin` differs. A user-facing semantic root action such as `примени линзу <Lens>` is stronger than merely requiring P-06 traversal: after the shared Lens prefix resolves the registered Lens, bounded Analysis Surface and supported operation, that root action executes the named Lens once even if normal applicability is confidently false; `APPLIED — no material finding / no useful change` is then a valid semantic result.

Concrete direct commands MAY carry declarative `includes` so the same canonical route is guaranteed when the USER invokes work through the Helper. `includes` reference canonical repository paths to registered direct Planning Command definitions; they remain command→command edges and MUST NOT point directly to methodology/Use-Case/owner files or become a parallel numeric `requiredPorts`/file-execution ontology. `ownerFiles` / structured owner references remain read routes, not executable includes. The AI itself works through methodology owners/references/handoffs rather than invoking commands internally.

### Registered Command-Prefix Composition

```text
idtspe.port.trace
  → includes `planning/commands/recheck-methodology-use-cases.command.md` but intentionally does not include `planning/commands/work-through-idtspe.command.md` (cycle guard)
  → composition-time contribution establishes/reuses the one incremental working trace before dependency actions start
  → runtime node confirms/continues the canonical P-02 capability

methodology.use_cases.recheck
  → mandatory registry-level Use-Case applicability recheck

idtspe.compose-current-work
  → includes `planning/commands/include-idtspe-trace-port.command.md` + `planning/commands/recheck-methodology-use-cases.command.md`
  → resolve/reuse UC-IDTSPE-COMPOSE-CURRENT-WORK
  → establish the current proportional IDTSPE methodology composition

idtspe.port-composition.recheck
  → includes `planning/commands/include-idtspe-trace-port.command.md` + `planning/commands/recheck-methodology-use-cases.command.md` + `planning/commands/compose-current-idtspe-work.command.md`
  → refresh/reaffirm IDTSPE.PORT-COMPOSITION-REFRESH using ALL pre-collected DAG contributions and the already composed current IDTSPE work

idtspe.work
  → includes `planning/commands/include-idtspe-trace-port.command.md` + `planning/commands/recheck-methodology-use-cases.command.md` + `planning/commands/compose-current-idtspe-work.command.md` + `planning/commands/recheck-idtspe-port-composition.command.md`
  → establish/enter one shared normal Shell pass after both composition stages are current
  → specialized dependent command nodes execute their named operations inside that same pass
  → finalize the pass only after selected leaf/root actions complete or are validly REUSED

idtspe.port.<capability>
  → explicitly includes the shared IDTSPE base frame
  → composition-time contribution: named EXPLICIT_REQUIREMENT
  → runtime action: perform/reuse the canonical capability check/traversal

idtspe.target-module.apply
  → full base + idtspe.port.target
  → Target Module Registry + Target Module Meta-Model
  → Unit / Collection / Slot / applicability / Target Step Result contracts as needed
  → selected TM-* Model

idtspe.lens.apply
  → full base + idtspe.port.lens
  → Lens Registry + Lens Meta-Model
  → selected `(LENS-* Model, Analysis Surface, Operation, basis)` application
  → material Finding Candidates cross Finding Disposition

idtspe.lenses.apply-selected
  → full base + idtspe.port.lens + idtspe.lenses.select
  → apply the currently selected `(Lens Model, Analysis Surface, Operation, basis)` Lens Application requests through one shared Lens Meta-Model prefix
  → material Finding Candidates cross Finding Disposition
```

User-level/specialized IDTSPE commands expose `idtspe.work`, Port Composition Recheck and P-02 Trace directly in their composition even when those nodes are also transitively reachable. Duplicate dependency edges are intentional declaration and are deduplicated before execution.

The methodology remains independently executable without Helper/command projection: current Use Cases, owners and natural handoffs determine the same process. The command DAG is a reproducibility/guarantee surface only.

### Target Module Shared Prefix

A concrete `TM-*` selection resolves through the Target Port and the canonical Target Module Meta-Model before applying the selected Target Module Model. Applying the Model forms/reuses the model-defined **Target Module Instance** inside the Target Instance; it does not create a second Target. If several Target Module Models are selected in one pass, shared Target-port / Target Module Meta-Model work is reused rather than repeated.

```text
IDTSPE composition
→ P-03 Target
→ Target Module Meta-Model
→ selected Target Module Model(s)
→ model-defined Target Module Instance portion(s) inside the relevant Target Instance(s)
```

Concrete `TM-*` models remain Target Module registry/components, not Shell-port definitions. A Local Target Contract remains the first-class alternative when no reusable Target Module Model fits.

### Lens Shared Prefix

A concrete `LENS-*` application resolves through the Lens Port and canonical Lens Meta-Model. If several Lens Models are selected/applied in one pass, shared Lens-port / Lens Meta-Model / registry resolution is reused for the same current analysis surface/basis.

```text
IDTSPE composition
→ P-06 Lens
→ Lens Meta-Model
→ selected Lens Application(s)
   = Lens Model + bounded Analysis Surface + supported Operation + relevant basis
→ Lens Application execution(s)
```

Concrete `LENS-*` models remain Lens registry/components, not Shell-port definitions. Lens selection and named Lens application are distinct operations that may share the same port/meta-model prefix. Selection/consideration may conclude `NOT_APPLICABLE`; an explicit named Lens **apply/use** action cannot use `NOT_APPLICABLE` as a substitute for executing the requested Lens operation.

## Generic Component Dispatch

```text
idtspe
→ continue always-active proportional IDTSPE work

idtspe TM-* <context>
idtspe tm <alias> <context>
→ invoke selected Target Module through normal Target Formation

idtspe LENS-* <context>
idtspe lens <alias> <context>
→ resolve/reuse host Target
→ apply selected Lens
→ material Finding Candidate
→ Core Finding Disposition
```

Resolution order is exact semantic ID first, then explicit namespace alias, then a unique bare alias. Ambiguous/unknown selectors are not guessed. Registry aliases are navigation only; repository command IDs and historical `tmcmd.*` keys are compatibility/implementation details.

## Review Findings and Proposal Workup Surfaces

`tmcmd.review.findings` invokes optional Core [`TM-REVIEW-FINDINGS`](../target-modules/TM-REVIEW-FINDINGS.md). It produces an evidence-backed diagnostic Target result with separate Finding discovery and canonical Finding Disposition/`Review Priority`/`RE-*` analysis. It does not create correction Proposals inside the Finding Unit. Material Findings pass to the ordinary Proposal lifecycle, optionally through `tmcmd.proposal.workup` when a separate bounded candidate-resolution brief is useful. An intermediate diagnosis with Proposal handoffs pending is not a complete `idtspe.review` result.

`tmcmd.proposal.workup` invokes optional Core [`TM-PROPOSAL-WORKUP`](../target-modules/TM-PROPOSAL-WORKUP.md). It provides a bounded reviewable candidate-resolution result for one material driver/subject when no existing Target/Unit naturally owns that *workup result*. Canonical Proposals remain Core State at their affected natural subjects; the workup is not a Target-level Proposal Space. `idtspe.proposal` remains the ordinary operation for explicit Proposal requests that do not justify a separate Target. Neither command selects candidates or mutates destinations by itself.

## Pre-Update Plan Surface

`tmcmd.pre.update` invokes generic Core [`TM-PRE-UPDATE-PLAN`](../target-modules/TM-PRE-UPDATE-PLAN.md).

```text
current request + accepted prior meaning + necessary current-state facts
→ ordinary IDTSPE Q/R/P/Evidence + formal Proposal/Decision only when a real choice/uncertainty exists
→ RU-PUPDATE-01 Pre-Update Plan with addressable proposed destination operations when applicable
→ stop before mutation
```

For file/artifact destinations, proposed operations state path/owner, action, intended delta, driver, preservation boundary and verification. They are plan entries, not automatically separate formal IDTSPE Proposals. The Target is optional. It is useful when the user wants a concrete reviewable plan before actual update; it is not a Review stage or the generic detailed-planning level for Exact Realization. Exact may perform transient internal exact planning without creating this Target. A tiny/obvious change may go directly to Exact Realization. The command is read-only planning and never grants mutation/test/commit/push authority.

## Exact Realization Surface

`tmcmd.exact.realization` invokes the generic Core [`TM-EXACT-REALIZATION`](../target-modules/TM-EXACT-REALIZATION.md) for broad/profile-neutral literal directly-integrable realization. Active profiles may define narrower realization surfaces for specialized artifact families; such profile surfaces do not change Core ownership and take precedence only inside their active profile scope.

The surface has an explicit authority boundary:

```text
produce exact candidate
→ allowed by the Target invocation

integrate / build / test / mutate selected environment
→ only with explicit user authority for that environment

automatic repair
→ only when explicitly authorized
→ local/minor + in-scope + no accepted architecture/Domain/product/upstream-semantic change

commit / push / deploy / release
→ never implied
```

A material semantic/architectural/out-of-scope problem crosses normal Finding Disposition/revalidation rather than being silently fixed during implementation. If a final-literal review/integration checkpoint is useful, `UC-IDTSPE-INTEGRATE-CURRENT-WORK` composes the Core Integration Checkpoint; there is no separate Session State/Checkpoint lifecycle.

## Generic Lens Operations

### `idtspe.lenses.select`

```text
bounded Analysis Surface
  = Target work when naturally applicable
  | Core Resolution State
  | cross-owner semantic subject
  | another bounded context
↓
P-06 Lens Applicability Scan
↓
selected Lens Application requests `(Lens Model, Analysis Surface, Operation, basis)` / dispositions
```

This generic surface uses `hostTargetPolicy: NONE`. The Analysis Surface is primary; Target context is resolved/reused only when the selected surface naturally belongs to Target work. Lens selection must not create a Target merely to host a broader semantic review/analysis surface. When the natural surface is Target Formation / a Local Target Contract, ordinary Target semantics still apply through that natural route.

It does not execute every Lens body. Registry discovery summaries and concrete Lens applicability / temporal trigger contracts are used proportionally; full Lens and referenced Knowledge Basis bodies are loaded only for selected/plausibly applicable candidates.

### `idtspe.lens.apply`

```text
bounded Analysis Surface
+ selected registered Lens
↓
resolve/reuse Target context only when naturally part of that surface
↓
apply that Lens Operational Evaluation Contract
↓
Broad Discussion / Key Points when explanatory analysis is useful
↓
material Finding Candidate(s) only when semantic disposition is needed
↓
Core Finding Disposition resolves actual semantic owner / State / lifecycle consequence
```

This generic surface also uses `hostTargetPolicy: NONE`. It is a generic dispatcher, has no fixed `lensId`, never creates a Lens-owned Target and never creates/resolves a Target merely to host a Lens. Its `apply` verb is literal: once the named registered Lens / bounded Analysis Surface / supported operation are resolved, the Lens is actually applied. Base Applicability / Usefulness may explain that the perspective is weak or normally unnecessary, but it does not cancel the explicit application; a no-finding/no-useful-change result is valid. Concrete/profile shortcuts may still require Target context when their own natural semantic surface is Target work.

## Specialized Lens Shortcut Rule

A registered Lens does **not** receive a dedicated command automatically. Every registered Lens remains reachable through `idtspe.lens.apply`; a fixed shortcut is justified only for a stable recurring user intent.

Current generic Core shortcut is:

```text
lenscmd.documentation.representation.check
```

Profile-specific shortcuts belong to that profile's command-surface extension.

## Profile Extension Rule

```text
IDTSPE Core command surface
+ selected profile command-surface extension
= user-visible methodology surface for that profile
```

A profile extension may add bootstrap, Target Module, focused Target and profile-specific Lens shortcut surfaces. It must not redefine the semantics or host-target policy of generic Core surfaces.

Current SDS extension:

[`../../profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md`](../../profiles/sds/commands/SDS-COMMAND-SURFACE-EXTENSION.md)


### Proposal / Decision Explicit Entries

```text
idtspe.proposal
→ candidate discovery/refinement/review
→ Proposal/Decision lifecycle
→ Resolution Context Lens
→ optional QRPE
→ Proposal Semantic Change Impact
→ selection gate
→ selected meaning integration
→ Carry-Forward refresh for surviving state

idtspe.decisions.capture
→ USER/context intake classification
→ actual material selection exists?
   no → do not manufacture Decision
   yes → Decision semantics
→ Resolution Context Lens + QRPE disposition
→ apply Core Decision retention contract to any separate record
→ natural/temporal-owner integration
→ Carry-Forward refresh
```

Both are explicit entries into the same canonical Core lifecycle. The architecture-specific Decision command remains specialized and does not substitute for generic Decision capture/review.

## Repository / Helper Boundary

Repository command definitions carry concrete aliases plus stable `methodologyBinding` and helper-presentation metadata. The Helper is a metadata-driven projection only.

The `IDTSPE Pass` Helper view may project the registered generic composition prefixes (`idtspe.work`, named port requirements, Target Module/Lens generic apply and P-02 sink configuration). Concrete `TM-*` and `LENS-*` semantic cards remain in their dedicated views. Changing tabs/groups/order must not silently redefine Core command semantics, Target ownership, Lens ownership or host-target policy.


## Need / Proposal / Finding Command Coverage

Canonical command coverage follows semantic owners rather than one command per internal step. Need intake is deliberately split because collecting USER/Source-grounded wanted outcomes and routing already collected Need Candidates are independently useful operations with different authority boundaries.

```text
idtspe.needs.collect
→ USER/Source wanted outcomes → grounded Need Candidates + provenance; no routing yet

idtspe.needs.disposition
→ already collected Need Candidates → current/Proposal/Finding/Q-R-P/profile temporal-owner routing

idtspe пропозал
→ includes Proposal grounding + Candidate Review + Proposal Semantic Change Impact + selection gating

разбери файндинги
→ Finding Disposition + RE-* + linked Proposal formation + correct owner/Unit/revalidation routing
```

Need Collection and Need Disposition are separate command surfaces; neither creates one command per downstream Need outcome. Do not create a mandatory separate Proposal-impact command merely because impact review is an explicit lifecycle step. A focused shortcut is justified only if practice demonstrates an independently useful recurring USER intent.

Unit Resolution, Result Content, Decision trace, Q/R/P, Finding Inbox, Requirement impact and Source impact do not each require standalone direct commands by ontology.


### Review Operation Ordering

Generic Review is a cross-port operation, not a Shell port. Prerequisite analysis/validation/Lens application may be composed through `includes`. Material Finding Candidates produced by review are an intrinsic downstream stage of the complete review lifecycle: they reach Finding Disposition and each receives a linked Proposal before review completion. Proposal formation does not imply Proposal persistence or selection. Need intake is separate: review does not manufacture Need Candidates from AI critique. If review notices an explicit USER/Source wanted outcome that was not yet collected, it hands that provenance to Need Candidate Collection as a separate intake route.

```text
validation / selected Lens Application prerequisites
→ review own action
→ material Finding Candidate(s), when any
→ canonical Finding Disposition
→ linked Proposal formation/refinement for every material Finding
→ coverage self-check/update
→ Port Composition refresh when disposition makes new downstream capabilities material

explicit USER/Source wanted outcome noticed during review
→ separate Need Candidate Collection
→ Need Candidate Disposition when routing is requested/material
```

`idtspe.lenses.select` selects applicable Lens Models **and the materially useful supported operation(s) for the current bounded Analysis Surface**, producing selected Lens Application requests rather than an operation-less Lens list. Selection alone is not application. Review that depends on Lens analysis uses `idtspe.lenses.apply-selected` (or an equivalent natural Lens application route) so each selected `(Lens, Analysis Surface, Operation, basis)` application is actually executed before the review result is finalized.
