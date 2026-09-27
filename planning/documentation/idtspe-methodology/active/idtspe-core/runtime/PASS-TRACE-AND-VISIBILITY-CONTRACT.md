# IDTSPE Pass Work Plan / State / Trace / Visibility Contract

Status: active generic methodology owner
Purpose: define the one observable Pass Working Record established near the start of every normal IDTSPE Shell pass so the execution plan, current work state, methodology actions, bounded plan changes and final visibility are retained incrementally rather than reconstructed after the pass.

<a id="idtspe-pass-trace"></a>
## 1. Boundary

Responsibility ID: `IDTSPE.PASS-TRACE`

> Semantic Owner Dependency
> Type: `REPRESENTS`
> Responsibility: `IDTSPE.RUNTIME-COMPOSITION`
> Owner: [Runtime / Work-Context Composition](IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md#idtspe-runtime-composition)

`P-02 Pass Working Record` is an **incrementally maintained execution plan + current work state + methodology-runtime trace + visibility source**, not a domain/planning semantic owner and not private chain-of-thought. The compatibility Responsibility ID remains `IDTSPE.PASS-TRACE` and the file path remains unchanged. Before substantive non-baseline work, the record preserves the smallest useful Initial Work Plan; during the pass it retains Current Work State, observable actions, bounded plan deltas/local execution decisions and completed/pending/reusable traversal; at completion it is the source for final P-02 plan-vs-actual visibility. It records only explicit methodology/runtime facts already safe to expose: Use-Case selection, composition, port admission, planned work items, owner/component selection, material lifecycle events, port outcomes, unresolved state and methodology direction.

```text
IDTSPE semantic/runtime work
→ produces observable routing/result events
→ Pass Trace records those events
→ one or more visibility sinks project the accumulated trace

Pass Working Record
≠ reasoning transcript
≠ Proposal/Decision authority
≠ Work Context semantic owner
≠ Review Strategy / Review Coverage authority
≠ Need Set / Needs Ledger coordination
≠ replacement for Session Work Steps / Progress Updates / Key Points
```

Session Work Steps / Progress Updates remain the interaction-time progress surface. AI Reviewability Key Points remain the material-result review projection. P-02 may feed both with routing facts, but does not absorb their separate contracts.

## 2. Included Runtime Position

`P-02 Pass Work Plan / State / Trace / Visibility` remains the **required canonical Shell port immediately after `P-01 Invocation`**, but the **same structured Pass Working Record is established/opened during invocation preparation** whenever normal IDTSPE work is being composed. Early establishment lets command-expansion, Use-Case-registry and Port-Composition facts be retained when they become known. Once composition is sufficiently known, P-02 materializes the smallest useful Initial Work Plan **before substantive non-baseline work**; after `P-01`, canonical P-02 adopts/continues that same record and records `PASS_STARTED`/Shell traversal. No second trace or plan record is created.

```text
selected commands/components
→ fully expand/merge command DAG
→ establish/open one P-02 Pass Working Record
→ record COMPOSITION_EXPANDED / selected roots / pending nodes as useful
→ Use-Case applicability recheck (record as it happens)
→ UC-IDTSPE-COMPOSE-CURRENT-WORK
→ Port Composition refresh/reaffirm (record as it happens)
→ P-01 Invocation
→ P-02 adopts/continues SAME working record + PASS_STARTED
→ materialize immutable Initial Work Plan from current composition
→ dynamic Shell route
→ update Current Work State + observable execution events as they become known
→ record PLAN_ADJUSTED / bounded LOCAL_EXECUTION_DECISION when the authorized route changes materially
→ final Plan-vs-Actual Overview is derived from the accumulated same record
```

Do not defer trace construction until the end merely to summarize from memory. If the active sink cannot be physically updated at every transition, retain the structured trace in the current runtime/work context and flush it at the nearest permitted checkpoint. The methodology-runtime event must still be retained when it occurs.

<a id="idtspe-pass-trace-contract"></a>
## 3. Pass Working Record Contract

Resolve proportionally:

```text
Observed dimensions
  pass subject / scope / basis
  Initial Work Plan + Current Work State
  plan delta / bounded local execution decision when material
  Use Cases / composition
  port admission + origin
  relevant subject / basis
  owner / registry / component route
  Target Module Model / Lens Model selection when material
  material Unit/Slot composition + Finding / Proposal / Decision / Evidence / validation event
  review-coverage control-plane events when material: effective mode, bounded review context established, review cells executed/reused/staled
  port result / unresolved state
  methodology direction when produced

Working Record Store
  TEMP_TRACE_FILE
  RUNTIME_CONTEXT
  PERSISTED_TRACE_ARTIFACT

Visibility Projection
  INLINE
  FILE
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

The **Working Record Store** answers where the one structured Pass Working Record is retained and consulted during the pass. The **Visibility Projection** answers where/how that same record is shown or retained externally. Store and projection are independent: for example, a pass may use `TEMP_TRACE_FILE` as working backing while projecting proportionally `INLINE`.

For every normal IDTSPE Shell pass, use one `TEMP_TRACE_FILE` as the default working backing **when the host/runtime can create, update and consult ephemeral scratch state under the active execution boundary**. This scratch file is runtime state, not a semantic owner, not automatically a repository mutation and not automatically a durable artifact.

When temporary file backing is unavailable or forbidden, use explicit structured `RUNTIME_CONTEXT` as a fallback and record the fallback reason when material. `RUNTIME_CONTEXT` means retained structured runtime state that is updated and consulted during the pass; it never means implicit recollection from model/conversation memory.

`PERSISTED_TRACE_ARTIFACT` applies when durable retention/discoverability is explicitly requested or materially required. Its physical persistence/placement is governed through P-14 and the active permission/output contract. P-02 never grants mutation or artifact authority by itself.

When no stronger visibility preference is selected, default to an `INLINE` proportional projection of the same Pass Working Record. Long-running work may expose incremental routing through Session Progress Updates; short work may project only the final compact overview.

<a id="idtspe-pass-trace-working-orientation"></a>
## 3A. Pass Work Plan / Current State / Execution Trace

The same structured P-02 record used for final visibility is used **during** the pass as the current execution-plan and methodology-traversal orientation surface. Do not create a second watch/to-do/ledger/review-plan file merely to remember what remains.

### Initial Work Plan

After current command/Use-Case/Port composition is sufficiently known, but **before substantive non-baseline work**, preserve the smallest useful Initial Work Plan in the working record. The initial snapshot is not silently overwritten later.

Use proportionally:

```text
Pass Subject / Scope / Basis
selected Use Cases / required-admitted ports
planned methodology work items
known dependency/order constraints
planned outputs/checkpoints
known blockers / reuse opportunities
```

For Review, the plan also projects the current executable obligations owned by `REVIEW.STRATEGY-COVERAGE`:

```text
Review Subject / Scope / Basis
Review Coverage Mode
planned Review Coverage cells / obligations
selected validator/Lens operations already resolved
Finding/Proposal completion obligations
final coverage self-check
```

P-02 owns this **execution-plan projection and runtime state**, not review-coverage sufficiency. Review Strategy/Coverage remains the authority for review obligations/cells.

### Current Work State / Current Plan

```text
meaningful methodology-runtime fact becomes known
→ record/update P-02 at the nearest practical point
→ consult current plan/state for planned / in-progress / completed / reused / blocked / deferred work
→ continue the current pass
→ later material facts may refresh composition and update the current plan/state
```

#### Ordered State Snapshot Sequence

When a Current Work State view is retained alongside later state views, make its temporal role explicit instead of leaving several equally named “current” blocks in the record. Use a monotonically ordered execution-local snapshot identity such as `S0`, `S1`, `S2`, … and maintain a visible pointer to the latest current snapshot.

Minimum retained metadata is proportional but should make the sequence unambiguous:

```text
Current state snapshot: S<n>

State Snapshot S<n> — <checkpoint label>
Snapshot ID: S<n>
Sequence: <ordered position>
Trigger: <observable event/checkpoint that caused this state capture>
Supersedes as current-state view: S<n-1> | NONE

<work-item states at that point>
```

Rules:

- `S0` is normally the first state snapshot after the Initial Work Plan is established;
- only the snapshot referenced by `Current state snapshot` is the **current** work-state view;
- once a later snapshot exists, earlier snapshots remain immutable **historical execution evidence** and MUST NOT be presented as still-current state;
- `PENDING @ S0 → IN_PROGRESS @ S2 → COMPLETED @ S3` is valid and should remain inspectable when those snapshots are retained;
- a plan adjustment may cause the next state snapshot and should reference the relevant `PLAN_ADJUSTED` event when useful;
- snapshot IDs are execution-history addresses only — they do not create another work-item lifecycle, semantic owner or persistence authority;
- do not snapshot every trivial event: retain checkpoints only when a state view is useful for orientation, auditability, continuation or plan-vs-actual evidence;
- before pass completion, publish a final state snapshot and point `Current state snapshot` to it so stale historical `PENDING` values cannot be mistaken for remaining work.

If only one mutable current-state view is retained and no historical state view is preserved, multiple snapshot IDs are unnecessary; once multiple state views are retained, the ordered identity/current-pointer rule applies.

### Plan Delta / Actual Execution

When new Evidence, a dependency, Finding, invalidation or another authorized runtime fact changes the useful execution route, keep the Initial Work Plan intact and record the current change instead of silently rewriting history:

```text
new material runtime fact
→ PLAN_ADJUSTED
→ identify work item added / removed / reordered / re-scoped within current authority
→ retain concise cause/basis
→ continue through normal owner / permission boundary
```

Actual Execution records what really ran, reuse/block/defer outcomes and observable consequences. The record is execution evidence, not private reasoning.

### Bounded Local Execution Decisions

P-02 may retain a concise observable local execution decision when it changes how already-authorized work is carried out and is useful for reconstructing the route, for example reuse of trustworthy unchanged coverage, dependency-safe reordering, inspecting a newly exposed dependency, splitting one planned review cell into materially distinct checks, or choosing an allowed temporary scratch representation.

Record only the decision fact + concise basis, never private reasoning. `LOCAL_EXECUTION_DECISION_RECORDED` MUST NOT hide or manufacture:

- change of USER scope;
- new product/domain semantic selection;
- unresolved material alternative requiring USER/Decision handling;
- irreversible action or new mutation authority;
- permission expansion.

Those remain with their normal semantic/Decision/USER/permission owners.

### Working-store continuity

Changing the backing store never creates another Pass Trace.

```text
same Pass Trace identity
+ accumulated event stream
+ current completed/pending/reusable orientation
→ materialize/mirror into the newly available backing store
→ continue incrementally from the same trace
```

If a pass starts in `RUNTIME_CONTEXT` fallback and `TEMP_TRACE_FILE` becomes available later, materialize the already accumulated trace into that file and continue from it. Do not open a second trace or lose earlier events. Keep fallback/migration reason or provenance visible when material.

The Pass Working Record may retain proportionally:

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

Distinguish composition from traversal when detail is useful. P-02 may use explicit **trace/orientation events** such as:

```text
PASS_WORK_PLAN_ESTABLISHED
WORK_ITEM_PLANNED
WORK_ITEM_STARTED
WORK_ITEM_COMPLETED / WORK_ITEM_REUSED / WORK_ITEM_BLOCKED / WORK_ITEM_DEFERRED
PLAN_ADJUSTED
LOCAL_EXECUTION_DECISION_RECORDED
PASS_PLAN_ACTUAL_RECONCILED

registry row
→ REGISTRY_ROW_CHECKED
→ COMPONENT_SELECTED / COMPONENT_NOT_SELECTED

selected component/application
→ APPLICATION_PENDING
→ APPLICATION_APPLIED / APPLICATION_REUSED / APPLICATION_NOT_APPLICABLE / APPLICATION_BLOCKED / APPLICATION_DEFERRED

Port
→ COMPOSITION_CHECKED
→ REQUIRED / NOT_REQUIRED
→ traversal result
```

These are P-02 observation/orientation states only. They do **not** create a generic lifecycle for registry rows, Use Cases, Lenses, ports or other components; the corresponding natural owner remains authority for applicability and result semantics. `COMPONENT_SELECTED` is not equivalent to `APPLICATION_APPLIED`.

### Incremental-First Principle

The normal mechanism is **incremental-first** recording. P-02 trace MUST be updated at the nearest practical point when a meaningful applicability, routing, admission, owner/component selection, traversal, reuse or result event becomes known. A final trace MUST NOT normally be reconstructed from model memory after the work is complete.

If an event was missed, P-02 MAY reconcile it from trustworthy Work Context / retained state / produced artifacts and mark/understand it as reconciled when material. This is a recovery path only; after reconciliation, resume incremental recording. Physical sink batching is allowed, but the structured runtime event must be retained when it occurs.

### Review Coverage Trace Events

When Review Strategy/Coverage is active, P-02 records proportional control-plane events such as:

```text
REVIEW_COVERAGE_CONTEXT_ESTABLISHED
REVIEW_EXECUTION_PLAN_ESTABLISHED
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

## 8A. Current Work Manifest Handshake

P-02 remains one-pass execution state. When a Current Work Manifest is material, the Pass Working Record may retain a compact parent/reference and the origin of selected cross-pass work:

```text
Current Work Manifest / current USER input / canonical owner state
→ Compose Current Work
→ bounded selected work
→ P-02 Initial Work Plan
```

The Manifest is never sticky authority; newer USER/canonical owner meaning wins.

When execution observes a material accepted/change event that may stale prior reviewed/dependent meaning, record an observable revalidation trigger/handoff (for example `REVALIDATION_TRIGGER_OBSERVED`) and route impact discovery to P-15 / `UC-IDTSPE-REVALIDATE-CURRENT-WORK`. P-02 records the event; it does not decide the Revalidation Impact Set or Review Coverage invalidation.

At pass close/checkpoint, when cross-pass state materially changed, the same final P-02 record must expose enough outcome for `UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE` to refresh the Manifest: completed/remaining cross-pass actions, new owner/artifact refs, Findings/Proposal/Decision refs, revalidation obligations and next re-entry route. Do not copy the full P-02 execution stream into the Manifest.

```text
P-02 ≠ Current Work Manifest
P-02 ≠ Need Set / PRS / Review Coverage
```

## 9. Final Plan-vs-Actual Overview

Before P-02 completes, publish the final Current Work State snapshot, move the `Current state snapshot` pointer to it, and reconcile the final human-facing overview from the **same incrementally accumulated Pass Working Record**, optionally after a recovery reconciliation check; do not independently reconstruct it from memory. Historical snapshots remain evidence but MUST be visibly non-current. Preserve enough structure to compare execution with the original plan:

```text
initially planned
actually executed
validly reused
added after new information
changed/reordered/re-scoped within authority + concise reason
blocked/deferred
not executed + reason
bounded local execution decisions that materially affected the route
remaining work / handoff
```

The overview may also show Use Cases/composition, actual port route, selected models/lenses, material lifecycle results and methodology direction when useful. A tiny pass may compress this to one concise line when plan and actual were trivial and identical; a substantial pass or persisted record may retain the detailed stream. Emit/record `PASS_PLAN_ACTUAL_RECONCILED` when this reconciliation is material.
