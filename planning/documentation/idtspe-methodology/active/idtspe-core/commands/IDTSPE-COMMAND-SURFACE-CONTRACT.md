# IDTSPE Core Command Surface Contract

Status: active generic IDTSPE Core command-surface owner
Scope: generic user-level invocation surfaces that remain valid independently of any one installed profile.

## Purpose

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

## Generic Core Surface Inventory — 15

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

idtspe.review_consistency
→ проверь консистентность плана

idtspe.proposal
→ idtspe пропозал
→ discover/form/review material Proposals from current context through canonical lifecycle + Proposal/Decision Resolution Context Lens; optional QRPE is checked and selection remains USER/authority-gated

idtspe.decisions.capture
→ зафиксируй решения
→ capture/review only actual selected material Decisions from current context; never grants AI selection authority; uses intake + lifecycle + Resolution Context Lens + residual Carry-Forward routing

idtspe.needs.review
→ разбери нид-кандидаты <needs/context>
→ ground wanted outcomes as Need Candidates, determine semantic home/current coverage and route them without prematurely manufacturing a solution/Requirement/Feature/Evolution Step

idtspe.findings.review
→ разбери файндинги <findings/context>
→ classify material findings by impact plus Resolution Escalation and route them through Finding Disposition/Revalidation

tmcmd.pre.update
→ составь предапдейт план <scope>
→ generic `TM-PRE-UPDATE-PLAN`; concrete read-only change plan before actual mutation

tmcmd.exact.realization
→ реализуй код <scope>
→ generic `TM-EXACT-REALIZATION`; code is the default archetype, while `сделай точную реализацию` remains a generic alias

idtspe.lenses.select
→ подбери линзы <target/context>

idtspe.lens.apply
→ примени линзу <lens> к <target/context>

lenscmd.documentation.representation.check
→ проверь как лучше зафиксировать <target/result>

lenscmd.linked-notes.justify
→ проверь оправданы ли linked notes <target>
```

These are **15 generic Core methodology surfaces**. Installed profiles contribute their own additional surfaces; current total counts are a projection owned by the relevant profile/integration contracts, not by Core.

## Bootstrap / Work Boundary

`idtspe.bootstrap` is the helper surface for the primary bootstrap owned by `planning/README.md`; it is governance orientation only, stops before profile bootstrap, and has `hostTargetPolicy=NONE`.

IDTSPE is already active; `idtspe.work` does **not** enable a mode. It is a compatibility/navigation shortcut that refreshes or explicitly reapplies the current Use-Case-driven proportional composition. Bare `idtspe` means continue ordinary work under that composition. `idtspe <TM-ID|LENS-ID|registry alias> <context>` may explicitly request a registered component, but the component still passes normal Use-Case/context routing and its local applicability gate. Broad Discussion may remain sufficient indefinitely; Integration Checkpoints are situational and invoked through the current IDTSPE Use Cases when a coherent whole-state view is useful.

Bootstrap must not silently select a Target, infer a Target invocation mode or execute Target work.


`idtspe.next` and `idtspe.continue` are explicit navigation/convenience surfaces, not approval gates between natural AI work steps. Thin Session Runtime allows automatic progression through ordinary in-scope interaction steps, while IDTSPE Use Cases own methodology composition.

`idtspe.next` does **not** own Shell visibility. `P-02 Pass Trace / Visibility` owns observability for a normal Shell pass. `idtspe.next` resolves the smallest useful next methodology action from current methodology + current Work Context and presents that action as a **Generic AI Proposal (GIP)**, then stops without executing it. When a current P-13 Handoff / Methodology Direction result exists it may inform that GIP, but Handoff is not required: `idtspe.next` remains valid in Broad Discussion with zero Targets.


## Shell Port Requirement Composition

User/command/component intent may require one or more non-baseline Shell ports to be traversed in the current normal IDTSPE pass. This is a **methodology composition rule**, not a second execution runtime and not a requirement that every port have a public command.

```text
explicit semantic intents
→ resolve required port capability / owner route
→ merge requirements into the current Use-Case-driven composition
→ P-01 routes one Shell pass
→ P-02 traces admission origin/result
→ shared prefixes are resolved/reused once per current subject/basis/operation
```

Port requirements compose declaratively. Several intents that require the same port, registry/meta-model or other shared prefix must not recursively launch several independent `idtspe.work` passes. The runtime merges them into one pass and applies the P-02 reuse guard.

An explicit requirement means **perform the port applicability/traversal check**; it does not manufacture a positive result. `NOT_APPLICABLE`, `CHECKED_NO_RESULT`, `CHECKED_NO_CHANGE` and `REUSED` remain valid outcomes. Automatic composition, explicit requirement and downstream materiality all enter the same port contract; only the trace `origin` differs.

Concrete direct-command include syntax/schema and Helper grouping are intentionally deferred to the command/tooling migration. Until then, existing direct commands keep their current definitions and stale numeric port references are interpreted through the Shell's temporary port-number compatibility mapping.

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
→ selected Lens Model(s)
→ Lens Application(s)
```

Concrete `LENS-*` models remain Lens registry/components, not Shell-port definitions. Lens selection and named Lens application are distinct operations that may share the same port/meta-model prefix.

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

## Pre-Update Plan Surface

`tmcmd.pre.update` invokes generic Core [`TM-PRE-UPDATE-PLAN`](../target-modules/TM-PRE-UPDATE-PLAN.md).

```text
current request + accepted prior meaning + necessary current-state facts
→ ordinary IDTSPE Q/R/P/Evidence + formal Proposal/Decision only when a real choice/uncertainty exists
→ RU-PUPDATE-01 Pre-Update Plan
→ stop before mutation
```

The Target is optional. It is useful when the user wants a concrete reviewable plan before actual update; it is not the generic detailed-planning level for Exact Realization. Exact may perform transient internal exact planning without creating this Target. A tiny/obvious change may go directly to Exact Realization. The command is read-only planning and never grants mutation/test/commit/push authority.

## Exact Realization Surface

`tmcmd.exact.realization` invokes the generic Core [`TM-EXACT-REALIZATION`](../target-modules/TM-EXACT-REALIZATION.md). The canonical practical phrase is code-first because code is the primary/default archetype, while the same module may realize another exact directly integrable artifact when the Target scope says so.

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
bounded Target candidate / existing Target
↓
Target Formation when needed
↓
P-06 Lens Applicability Scan
↓
resolved Lens Set
```

This surface uses `CREATE_OR_REUSE_TARGET`: Lens selection is part of Target Formation and must work for a first-class Local Target Contract when no reusable Target Module fits.

It does not execute every Lens body. Registry summaries/applicability gates are scanned first; full Lens and referenced Knowledge Basis bodies are loaded only for selected/plausibly applicable candidates.

### `idtspe.lens.apply`

```text
existing/resolved natural Target context
+ selected registered Lens
↓
apply that Lens Operational Evaluation Contract
↓
Broad Discussion / Key Points when explanatory analysis is useful
↓
material Finding Candidate(s) only when semantic disposition is needed
↓
Core Finding Disposition resolves actual semantic owner / State / lifecycle consequence
```

This surface uses `RESOLVE_OR_REUSE_TARGET`. It is a generic dispatcher, has no fixed `lensId`, and never creates a Lens-owned Target.

## Specialized Lens Shortcut Rule

A registered Lens does **not** receive a dedicated command automatically. Every registered Lens remains reachable through `idtspe.lens.apply`; a fixed shortcut is justified only for a stable recurring user intent.

Current generic Core shortcuts are:

```text
lenscmd.documentation.representation.check
lenscmd.linked-notes.justify
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
→ proportional retained Decision trace
→ natural/temporal-owner integration
→ Carry-Forward refresh
```

Both are explicit entries into the same canonical Core lifecycle. The architecture-specific Decision command remains specialized and does not substitute for generic Decision capture/review.

## Repository / Helper Boundary

Repository command definitions carry concrete aliases plus stable `methodologyBinding` and helper-presentation metadata. The Helper is a metadata-driven projection only.

Changing tabs/groups/order must not silently redefine Core command semantics, Target ownership, Lens ownership or host-target policy.


## Need / Proposal / Finding Command Coverage

Canonical command coverage follows semantic owners rather than one command per internal step. `Need Candidate` receives a dedicated orchestration surface because “review what I want and determine where it belongs” is a stable recurring USER intent, while the command still routes into existing canonical owners rather than creating a Need-owned product lifecycle.

```text
разбери нид-кандидаты
→ Need Candidate grounding/disposition + correct current/Proposal/Finding/Q-R-P/profile temporal-owner routing

idtspe пропозал
→ includes Proposal grounding + Candidate Review + Proposal Semantic Change Impact + selection gating

разбери файндинги
→ Finding Disposition + RE-* + correct owner/Unit/revalidation routing
```

The Need command is an intake/disposition shortcut, not one command per downstream Need outcome. Do not create a mandatory separate Proposal-impact command merely because impact review is an explicit lifecycle step. A focused shortcut is justified only if practice demonstrates an independently useful recurring USER intent.

Unit Resolution, Result Content, Decision trace, Q/R/P, Finding Inbox, Requirement impact and Source impact do not each require standalone direct commands by ontology.
