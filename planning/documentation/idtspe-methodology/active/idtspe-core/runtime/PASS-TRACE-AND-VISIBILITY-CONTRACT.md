# IDTSPE Pass Trace / Visibility Contract

Status: active generic methodology owner
Purpose: define the observable runtime trace established near the start of every normal IDTSPE Shell pass so methodology routing can be recorded as it happens rather than reconstructed after the pass.

<a id="idtspe-pass-trace"></a>
## 1. Boundary

Responsibility ID: `IDTSPE.PASS-TRACE`

> Semantic Owner Dependency
> Type: `REPRESENTS`
> Responsibility: `IDTSPE.RUNTIME-COMPOSITION`
> Owner: [Runtime / Work-Context Composition](IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md#idtspe-runtime-composition)

`Pass Trace` is an **incrementally maintained methodology-runtime trace and observability projection**, not a domain/planning semantic owner and not private chain-of-thought. During the pass, the same structured trace is also the working orientation surface for completed/pending/reusable methodology traversal; at completion it is the source for final P-02 visibility. It records only explicit methodology/runtime facts that are already safe to expose: Use-Case selection, composition, port admission, owner/component selection, material lifecycle events, port outcomes, unresolved state and methodology direction.

```text
IDTSPE semantic/runtime work
→ produces observable routing/result events
→ Pass Trace records those events
→ one or more visibility sinks project the accumulated trace

Pass Trace
≠ reasoning transcript
≠ Proposal/Decision authority
≠ Work Context semantic owner
≠ replacement for Session Work Steps / Progress Updates / Key Points
```

Session Work Steps / Progress Updates remain the interaction-time progress surface. AI Reviewability Key Points remain the material-result review projection. P-02 may feed both with routing facts, but does not absorb their separate contracts.

## 2. Included Runtime Position

`P-02 Pass Trace / Visibility` remains the **required canonical Shell port immediately after `P-01 Invocation`**, but the **same structured working trace is established/opened during invocation preparation** whenever normal IDTSPE work is being composed. This early establishment exists only so command-expansion, Use-Case-registry and Port-Composition events can be recorded when they actually happen; after `P-01`, canonical P-02 adopts/continues that same trace and records `PASS_STARTED`/Shell traversal. No second trace is created.

```text
selected commands/components
→ fully expand/merge command DAG
→ establish/open one P-02 working trace
→ record COMPOSITION_EXPANDED / selected roots / pending nodes as useful
→ Use-Case applicability recheck (record as it happens)
→ UC-IDTSPE-COMPOSE-CURRENT-WORK
→ Port Composition refresh/reaffirm (record as it happens)
→ P-01 Invocation
→ P-02 adopts/continues SAME trace + PASS_STARTED
→ dynamic Shell route
→ record observable events at the transition where they become known
→ final Pass Overview is derived from the accumulated same trace
```

Do not defer trace construction until the end merely to summarize from memory. If the active sink cannot be physically updated at every transition, retain the structured trace in the current runtime/work context and flush it at the nearest permitted checkpoint. The methodology-runtime event must still be retained when it occurs.

<a id="idtspe-pass-trace-contract"></a>
## 3. Trace Contract

Resolve proportionally:

```text
Observed dimensions
  Use Cases / composition
  port admission + origin
  relevant subject / basis
  owner / registry / component route
  Target Module Model / Lens Model selection when material
  material Unit/Slot composition + Finding / Proposal / Decision / Evidence / validation event
  review-coverage control-plane events when material: effective mode, bounded review context established, review cells executed/reused/staled
  port result / unresolved state
  methodology direction when produced

Sink
  INLINE
  TRACE_FILE
  ARCHIVE_FILE
  REALTIME_EXTERNAL
  or a combination allowed by the active output/permission contract

Timing
  INCREMENTAL at meaningful transitions
  CHECKPOINT projection
  FINAL overview

Detail
  MINIMAL
  ROUTE
  DETAILED_SEMANTIC_TRACE
```

When no stronger sink is explicitly selected by the active interaction/output contract, default to an `INLINE` proportional projection while keeping the structured runtime trace available through the pass. Long-running work may expose incremental routing through Session Progress Updates; short work may project only the final compact overview.

Physical file/archive/realtime output is permitted only when the active task/output contract and permission boundary allow that sink. P-02 never grants mutation or artifact authority by itself.

<a id="idtspe-pass-trace-working-orientation"></a>
## 3A. Working Orientation Surface

The same structured trace accumulated for P-02 visibility is used **during** the pass as the current methodology-traversal orientation surface. Do not create a second watch/to-do/ledger file merely to remember what methodology work remains.

```text
meaningful methodology-runtime event becomes known
→ record/update P-02 trace at the nearest practical point
→ consult current trace for completed / pending / reusable traversal
→ continue the current pass
→ later material events may refresh composition and update the same trace
```

The working trace may retain proportionally:

```text
Command composition
  selected root commands/components
  expanded/deduplicated dependency nodes
  current dependencies-first pending/completed plan
  declarative explicit capability/component/trace contributions

Use-Case registry recheck result
  checked/selected/released Use Cases where material
  current selected Use-Case composition

Port composition
  current named Port Requirement Set
  admission origin
  ports already traversed + result status
  required work not yet reached
  shared prefixes/results eligible for REUSED

Review coverage orientation (when Review is active)
  effective REVIEW_COVERAGE_MODE after contribution normalization
  bounded Review Subject / Scope / Basis reference
  material review cells planned, executed or validly reused
  stale/invalidated/newly exposed coverage cues
  Review Coverage Record remains authority; P-02 records runtime events only

Continuation/recheck cues
  still-material DEFERRED/BLOCKED work
  recheck conditions already produced by normal methodology owners/processes
```

This retained trace is **orientation/evidence, not sticky authority**. Every Planning Command still performs the mandatory Use-Case registry applicability recheck; every normal IDTSPE Shell pass still refreshes/reaffirms the Port Requirement Set. Those owner processes may reaffirm or change prior trace state, then update the same trace.

Distinguish composition from traversal when detail is useful:

```text
Use Case: CHECKED → SELECTED / NOT_SELECTED → Process PENDING / APPLIED / REUSED as applicable
Port: COMPOSITION_CHECKED → REQUIRED / NOT_REQUIRED → traversal result
```

### Incremental-First Principle

The normal mechanism is **incremental-first** recording. P-02 trace MUST be updated at the nearest practical point when a meaningful applicability, routing, admission, owner/component selection, traversal, reuse or result event becomes known. A final trace MUST NOT normally be reconstructed from model memory after the work is complete.

If an event was missed, P-02 MAY reconcile it from trustworthy Work Context / retained state / produced artifacts and mark/understand it as reconciled when material. This is a recovery path only; after reconciliation, resume incremental recording. Physical sink batching is allowed, but the structured runtime event must be retained when it occurs.

### Review Coverage Trace Events

When Review Strategy/Coverage is active, P-02 records proportional control-plane events such as:

```text
REVIEW_COVERAGE_CONTEXT_ESTABLISHED
REVIEW_CELL_PLANNED
REVIEW_CELL_EXECUTED
REVIEW_CELL_REUSED
REVIEW_CELL_INVALIDATED
REVIEW_COVERAGE_UPDATED
```

These events expose what review work was planned/performed/reused during the pass. They do **not** make P-02 the owner of Review Coverage and do not replace the Review Coverage Record. `REVIEW_CELL_REUSED` must retain enough basis/provenance to distinguish reuse from fresh execution when that distinction is material.

## 4. Port Admission Origin

A port may be reached through the same runtime contract from different origins:

```text
AUTO_COMPOSITION
  current Use-Case composition / contextual applicability requires the port

EXPLICIT_REQUIREMENT
  explicit USER/command/component intent requires this port to be traversed

DOWNSTREAM_MATERIALITY
  work already performed in this pass makes another port newly material
```

The origin changes observability, not port semantics. Once admitted, the same port owner/guards/result contract applies.

An `EXPLICIT_REQUIREMENT` requires a real applicability/traversal check. It does **not** require manufacturing a positive result. `NOT_APPLICABLE`, `CHECKED_NO_RESULT` and `REUSED` are valid explicit-request outcomes.

### Port Composition Refresh Visibility

> Semantic Owner Dependency
> Type: REPRESENTS
> Responsibility: `IDTSPE.PORT-COMPOSITION-REFRESH`
> Owner: [`Port Composition Refresh Rule`](IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md#idtspe-port-composition-refresh)

The current pass trace may record a material `PORT_COMPOSITION_REFRESHED` event when the refreshed Port Requirement Set differs materially from the prior trusted composition or when detailed routing visibility is requested. An unchanged composition may be treated as reaffirmed/reused without ceremonial per-port output.

A compact final overview may show admitted/reused/materially `DEFERRED` ports and their origins/triggers when useful. It need not enumerate every `NOT_REACHED` port merely to prove that refresh occurred.

## 5. Port Result Vocabulary

Use this compact vocabulary when useful:

```text
APPLIED
  port work produced or changed material semantic/runtime result

CHECKED_NO_CHANGE
  port was traversed; existing result remained sufficient

CHECKED_NO_RESULT
  port mechanism was traversed but produced no result of its material type

NOT_APPLICABLE
  the port was explicitly/automatically checked and does not apply to this subject/basis

REUSED
  an equivalent current port result already exists for the same resolution key

BLOCKED
  the port is material but required source/authority/permission/input is unavailable

DEFERRED
  the port is material but intentionally postponed with a visible trigger/owner

NOT_REACHED
  trace-only state for a port never entered in this pass; not a port execution result
```

Do not collapse `NOT_APPLICABLE`, `NOT_REACHED`, and `REUSED`. A final overview may omit untouched ports for brevity, but a detailed trace distinguishes a checked port from one never reached.

## 6. Reuse / No-Duplicate-Work Guard

Before repeating port work, resolve whether the prior result is still equivalent for the current:

```text
port identity
+ semantic subject / analysis surface
+ relevant input/basis version
+ requested operation
```

If equivalent, reuse it and trace `REUSED`. Do not rerun a Target Module meta-model, Lens meta-model, registry traversal, validator or other shared prefix merely because several explicit requests depend on it.

If a material result changes the basis — for example a new Proposal creates a new choice surface — a later traversal of the same port may be justified and receives a new resolution key.

## 7. Shared-Prefix Runtime Composition

Several explicit requirements may contribute to one normal Shell pass. Resolve their shared runtime dependencies once.

```text
explicit requirements
→ merge into current composition / Port Requirement Set
→ deduplicate shared prefixes
→ one Shell pass
→ each distinct required operation executes once per current resolution key
```

This contract defines the runtime behavior only. Concrete command syntax/schema and Helper grouping remain separate command/tooling concerns.

## Target Resolution / Unit Composition Events

When material, trace may expose observable events such as:

```text
TARGET_REQUIREMENT_OPENED / UPDATED / COVERED / REOPENED
REUSABLE_TARGET_MODEL_CHECKED
TARGET_MODULE_APPLIED
CORE_UNIT_ADMITTED
CONTEXTUAL_REQUIREMENT_DERIVED
CONTEXTUAL_UNIT_DEFINED
UNIT_RESOLUTION_SET_ESTABLISHED
UNIT_RESOLUTION_SLOT_ADDED
UNIT_RESOLUTION_SLOT_UPDATED / RESOLVED / REOPENED
CONTEXTUAL_UNIT_RESOLVED
UNROUTED_CONCERN_DISPOSITIONED
REQUIREMENT_COVERAGE_UPDATED
TARGET_FORM_SUFFICIENT
```

These events expose methodology state transitions/results, not hidden reasoning.

## 8. Minimal Observable Event Shape

A detailed trace event may expose proportionally:

```text
event
port
origin
subject
basis / operation when material
route / owner / selected component
result status
material output or unresolved reason
next material consequence when one was created
```

Example:

```text
PORT_COMPLETED
port: P-06 Lens
origin: EXPLICIT_REQUIREMENT
subject: EVO-01 / scope choice
route: Lens Applicability Scan
selected: LENS-NEED-VALUE-SCOPE
result: CHECKED_NO_CHANGE
consequence: existing scope basis remains sufficient
```

## 9. Final Pass Overview

The final human-facing overview is derived from the **same incrementally accumulated working trace**, optionally after a reconciliation check; it is not independently reconstructed from memory. A proportional overview may contain:

```text
Use Cases / composition
actual port route
important selected models/lenses
material lifecycle events/results
unresolved/blocked/deferred state
methodology direction when produced
```

A tiny pass may need only one concise line. A substantial pass or persisted trace may use the detailed event stream.
