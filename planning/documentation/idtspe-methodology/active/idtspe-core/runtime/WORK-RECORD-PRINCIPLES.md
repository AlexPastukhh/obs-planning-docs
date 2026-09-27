# WORK-RECORD-PRINCIPLES — Work Runtime / Turn Work Record Contract

**Status:** active Core runtime contract
**Responsibility ID:** `IDTSPE.WORK-RUNTIME`  
**Scope:** canonical Turn Work Record process above `DIRECT | SHELL` execution routing.  
**Authority boundary:** this contract coordinates work-record behavior. USER Input Intake, Current Work Manifest, Needs, Core Proposal/Decision/QRP/PRS, Use Cases, Shell capabilities and artifact owners retain their natural semantics.

<a id="idtspe-work-runtime"></a>
<a id="work-record-principles"></a>
## 1. Purpose

A **Turn Work Record** is the proposed single evolving plan/state/trace for one substantive assistant work turn.

It begins when current USER input is accepted for work and remains the same record through:

```text
input intake
→ Session State / accepted-Manifest check
→ establish one primary substantive subject
→ choose execution route
→ execute that subject
→ synchronize Session State
→ finalize trace / archive
```

Do not create competing input-plan, task-plan and trace ledgers for the same turn.

**Compatibility note:** `IDTSPE.PASS-TRACE` remains a legacy compatibility projection only. P-01/P-02 are retired/reserved Shell labels; the active runtime is this Work Runtime plus the selected DIRECT/SHELL route.


### Work Record basis

At S0 the Turn Work Record should retain enough basis to make its rules and authority reconstructable:

```text
input basis
session-state basis
current accepted Manifest basis
methodology / Work Record Principles basis
target/repository authority
session-state write authority
continuation gate
Session State retention-policy ref
applicable PRS contextual-material refs when already known
```

Prefer a stable methodology revision/baseline reference when available rather than only a path whose meaning may later move.

Minimal Session State allocation is infrastructure needed to materialize the record; it is not a hidden substantive work item. If the file is physically created after one or two bootstrap observations, reconcile those observations explicitly into S0 rather than pretending the file pre-existed them.

<a id="work-record-zero-state"></a>
## 2. Immutable zero-state kernel

Every substantive Turn Work Record starts with the same top-level kernel:

```text
WR-1 Intake current USER input
WR-2 Check Session State + accepted Manifest
WR-3 Establish current primary substantive work
WR-4 Choose execution route
WR-5 Perform current primary work
WR-6 Synchronize material Session State consequences
WR-7 Finalize Turn Work Record + rematerialize Session State archive
```

The top-level kernel is immutable historical process structure.

Later detail grows underneath the relevant item:

```text
WR-5
  WR-5.1 ...
  WR-5.2 ...
```

The runtime may update item status/current pointer, add children and append explicit adjustment events. It MUST NOT silently rename/re-purpose an existing kernel item so that the initial route is no longer reconstructable.

If a material concern cannot truthfully fit beneath the current kernel item, record an explicit adjustment and attach it under the correct later stage.

<a id="work-record-input"></a>
## 3. Input principle — WR-1

`WR-1` performs bounded intake/classification and preserves the current input basis.

For command-driven input, identification of command roots/aliases and the resulting input classification belong to `WR-1`. The runtime may allocate the Session State / physical Work Record before this classification, but full command DAG expansion must not become invisible pre-record work.

```text
raw USER input
→ Session State / S0 allocation
→ WR-1 classify input + resolve command roots
→ expand/merge command DAG as applicable
```

Input may be represented by:

- one `inputs/INPUT-*.md`;
- several input/provenance files;
- attachment/command references;
- compact inline provenance when a dedicated file has no continuity value.

Input representation is provenance/material, not a third planning hierarchy.

Natural owner remains the current USER Input Intake rule.

`WR-1` MUST NOT silently perform a separate substantive architecture/planning task merely because the input is difficult. If intake exposes material unresolved work, record it as a candidate primary subject for `WR-3`.

If USER-supplied material does not belong to an existing canonical artifact family but must remain relevant beyond the immediate intake, record it as a **contextual-material candidate** for PRS/Session-State handling rather than silently treating it as either disposable input or semantic authority.

```text
material USER/source file
+ no natural canonical owner/file contract
+ must be considered/carried/maintained beyond intake
→ contextual-material candidate
→ WR-6 / PRS handling disposition
```


<a id="work-record-manifest-check"></a>
## 4. Session State / Manifest check principle — WR-2

`WR-2` reads the current accepted Manifest and determines **what kind of handling is required**. It does not perform substantive Manifest reconciliation before a primary subject and execution route have been selected.

The Session-State check also reads the root workspace `README.md`/navigation contract and the current PRS projection when they exist, including:
- active Questions/Risks/Problems/Proposals/Decisions;
- applicable contextual-material entries and their handling dispositions;
- current input/work-record retention policy.

This does not make README or PRS the owner of the referenced content.


This stage is a **bounded triage/check**, not hidden substantive planning. If determining the Manifest consequence itself requires material methodology reasoning, conservatively return `MANIFEST_RECONCILIATION_REQUIRED` (or an equivalent reconciliation/assessment subject) and let `WR-3..WR-5` perform the substantive work through the selected route.

Allowed outcomes:

```text
CURRENT_NO_MATERIAL_CHANGE
MANIFEST_BOOTSTRAP_REQUIRED
SYNCHRONIZATION_ONLY
PURE_EXECUTION_DECOMPOSITION
MANIFEST_RECONCILIATION_REQUIRED
USER_REVIEW_ALREADY_PENDING
BLOCKED
```

### 4.1 Manifest bootstrap

If no accepted Manifest exists yet:

```text
WR-2 outcome = MANIFEST_BOOTSTRAP_REQUIRED
```

Create/reuse the minimal accepted session orientation needed to preserve explicit USER authority and current facts.

Current/future Manifest meaning that the USER has already specified and selected **exactly enough to remove the AI candidate choice** may be represented/integrated directly because the USER already supplied that authority. For example, an exact instruction such as “add task X after A4” can be recorded as selected meaning.

A broad instruction such as “improve/reconcile/refine the Manifest” authorizes the reconciliation work, but does **not** pre-select whatever future target Manifest the AI derives.

Do not silently derive an accepted multi-step future plan merely because the session is new. AI-derived prospective future work follows the same Proposal-first rule:

```text
minimal/current USER-authorized Manifest
→ Proposal
→ complete candidate target Manifest
→ Core PRS
→ USER review/selection
```

### 4.2 Synchronization-only

No Proposal is required when the Manifest update only records already-established facts or mechanically implied accepted-state consequences, for example:

- actual status progression caused by authorized execution;
- completed Turn Work Record refs;
- produced artifact/evidence refs;
- actual-result trace;
- clearing a blocker whose accepted closure condition is proven;
- moving the current pointer to the already-determined next accepted action.

Direct synchronization does not mean destructive overwrite. Every current-Manifest write must preserve enough prior revision/snapshot evidence to reconstruct the previous current view under the shared Evolving Work Record/history discipline.

### 4.3 Pure execution decomposition

An accepted action may be refined into execution children without Proposal when the decomposition leaves unchanged:

- accepted outcome;
- semantic scope;
- accepted strategy/route;
- material dependencies;
- material ordering consequences;
- Need coverage;
- expected downstream work;
- accepted constraints/assumptions.

This is operational elaboration, not prospective replanning.

Default placement:

```text
task-local execution decomposition
→ keep in Turn Work Record

cross-turn/re-entry-relevant decomposition
→ may also refine the accepted Manifest directly
```

Promoting operational children to the Manifest is a coordination/materiality choice, not a requirement.

### 4.4 Prospective Manifest change

If the input/discovery would materially change what should happen next or how accepted future work is supposed to be reached, first check whether the exact target meaning is already selected by explicit USER authority.

```text
prospective change
+ exact USER-selected target meaning already exists
→ integrate/synchronize that selected meaning through the natural owner
→ preserve authority trace + prior Manifest revision
→ no AI Proposal required for the same already-selected meaning

prospective change
+ AI still has to derive/choose/refine the target meaning
→ WR-2 outcome = MANIFEST_RECONCILIATION_REQUIRED
```

A broad authorization to “reconcile/improve/refine the Manifest” is not exact target selection.

When reconciliation is required, do **not** mutate the accepted Manifest at WR-2.

The reconciliation becomes a candidate primary substantive subject for `WR-3`.

The actual route:

```text
WR-3 select Manifest reconciliation
→ WR-4 choose SHELL when substantive methodology reasoning is required
→ WR-5 form/reuse Proposal
       + complete candidate TARGET-WORK-MANIFEST
       + Core PRS/carry-forward
→ WR-6 synchronize candidate refs/session state
→ WR-7 finalize/archive
→ USER review boundary
```

The current accepted Manifest remains untouched until normal Proposal selection/integration.


When a Manifest Proposal changes the existing `WORK-MANIFEST.md`, the pending Proposal must survive through a session-local Core PRS representation before handoff/USER review. The PRS must expose the relation between the Proposal, its current basis and the complete candidate target Manifest.

```text
Proposal Ref
Current Basis Ref
Candidate Target-State Ref
```

For a changed existing file/result, `Current Basis Ref` and the complete candidate target-state representation are required. For `DELETE`, represent the target state explicitly as `ABSENT` rather than manufacturing a file. For `ADD`, the candidate file itself is the candidate target state. If a whole candidate file is itself the Proposal Target Result, that file is the target-state representation and no duplicate target copy is required.

The Proposal rationale/compact body may live directly in the PRS item; a separate `PROPOSAL.md` is optional when independently useful.

The current accepted Manifest remains byte-for-byte semantically authoritative while the candidate is pending. Discoverability comes from stable Session/Manifest navigation to the resolution surface, not from mutating the accepted plan merely to advertise the Proposal.

<a id="work-record-work-selection"></a>
## 5. Primary-subject selection principle — WR-3

`WR-3` establishes **one primary substantive subject** for the turn.

A normal turn may include intake, Manifest check and routine synchronization around that subject.

Selection rules:

1. If `WR-2` found substantive Manifest reconciliation, that reconciliation is the default primary subject.
2. Otherwise select one accepted current Manifest action/coherent subtree when applicable.
3. If input itself exposes a separate unresolved planning/review subject not yet represented by Manifest, establish the bounded subject through the natural Use-Case/Need/Proposal route before pretending a Manifest task already exists.
4. Do not automatically start a second unrelated substantive subject after completing the first unless USER authority explicitly covers the compound turn.

The selected subject remains aware of:

- session goal;
- relevant Needs;
- Core PRS/QRP/Proposal/Decision state;
- relevant prior work;
- materially relevant later Manifest actions/dependencies;
- materially applicable contextual files/materials carried by PRS, including required currentness/maintenance disposition.

A locally convenient result MUST NOT silently damage known later session work.


### Use-Case applicability before and inside Shell

Use-Case applicability may participate before Shell to classify/establish the current work and execution route.

If `SHELL` is selected, task-specific Use Cases and the Port Requirement Set are then resolved/reaffirmed for the selected subject/current basis and recorded into the same Turn Work Record.

```text
ambient/current-work Use-Case applicability
→ may help WR-3 / WR-4

SHELL selected
→ task-specific Use-Case / port composition reaffirmation
→ WR-5 child work
```

Do not confuse these two checkpoints or require Shell merely to discover whether Shell is useful.

<a id="work-record-execution-routing"></a>
## 6. Execution-route principle — WR-4

`WR-4` records how the selected primary subject will be executed under the current Work Runtime.


Execution route and continuation authority are separate runtime facts:

```text
ExecutionRoute =
  DIRECT
  | SHELL
  | NO_EXECUTION

ContinuationGate =
  CONTINUE_ALLOWED
  | USER_REVIEW_REQUIRED
  | BLOCKED
```

`USER_REVIEW_REQUIRED` and `BLOCKED` are never execution routes. A Shell task may complete successfully and still finish with `ContinuationGate = USER_REVIEW_REQUIRED`.

### DIRECT candidate route

Choose `DIRECT` only when the selected work is operationally deterministic enough that its meaningful decisions are already resolved and execution does not require material methodology reasoning.

Indicators:

- exact operation and inputs are resolved;
- no material alternative needs selection;
- no substantive decomposition/owner-resolution is needed;
- no Target/Lens/Proposal/QRP/review/revalidation reasoning is needed to determine what should be done;
- the operation can be validated by known deterministic checks.

Examples may include exact archive assembly from resolved inputs, checksum calculation or running a known generator.

A fixed sequence of mechanical steps does **not** by itself make work “planning”; ordinary procedural steps are compatible with DIRECT.

### SHELL candidate route

Choose `SHELL` when the selected subject materially requires methodology reasoning/composition such as:

- substantive Manifest reconciliation;
- owner/Target formation or resolution;
- material Source/Relation analysis;
- Lens selection/application;
- architectural/design alternatives;
- Findings/Q/R/P;
- formal Proposal/Decision work;
- review/revalidation;
- other Use-Case-driven work whose useful composition is not merely a resolved deterministic procedure.

When SHELL is selected, follow the **current canonical Shell runtime/composition owner**. Do not duplicate a fixed port sequence in this principles file.

### Escalation

A DIRECT operation that encounters material ambiguity or unresolved methodology work escalates:

```text
DIRECT
→ record route adjustment
→ SHELL
```

subject to the same USER/Proposal/permission gates.

**Compatibility note:** IDTSPE remains always applicable as the methodology authority boundary, while this contract owns current `DIRECT | SHELL | NO_EXECUTION` routing. Legacy P-01/P-02 wording is retained only through compatibility surfaces.

<a id="work-record-execution"></a>
### Pre-execution contextual stabilization

`WR-3` keeps one bounded primary substantive subject. The accepted Manifest action under it is a **tentative execution candidate**: a material answer can preserve, refine, reorder or replace that candidate without silently starting a different primary subject. Before affected business execution, review materially relevant existing owners, Sources, evidence, Manifest and PRS state for this subject; reuse still-material known Questions and actively derive missing material Questions from the current maturity and applicable contracts. No fixed Question checklist or context-file inventory is required. An empty PRS or contextual Collection is not readiness evidence by itself.

During `WR-5`, resolve what existing authority permits. An unanswered USER-owned material choice invokes the existing User Decision Gate and `USER_REVIEW_REQUIRED`; a missing prerequisite/evidence yields `BLOCKED`. Integrate a material answer/Decision consequence into PRS and accepted Manifest **during WR-5** when current authority permits and the next pass needs it. An AI-derived prospective Manifest change remains a Proposal with a complete candidate target Manifest; accepted Manifest stays current pending selection. Re-establish tentative candidate, route and readiness, then repeat the contextual Question sweep after material change. A former readiness conclusion is stale. Business execution begins only at a stable fixed point; `DIRECT` escalates to `SHELL` when material ambiguity appears. If the new action would cross the original `WR-3` subject, stop/review instead of silently replacing the turn's subject.

`WR-6` performs the final Session State, current-pointer/history and archive reconciliation after all in-turn integration; it is not the only possible synchronization moment.

## 7. Execution/refinement principle — WR-5

`WR-5` begins generic and expands only after the primary subject and route are known.

Example DIRECT:

```text
WR-5
  WR-5.1 validate resolved inputs
  WR-5.2 execute deterministic operation
  WR-5.3 validate result
```

Example SHELL:

```text
WR-5
  WR-5.1 bind selected primary subject
  WR-5.2 resolve/reaffirm applicable Use Cases
  WR-5.3 follow current canonical Shell composition
  WR-5.4 execute admitted capabilities incrementally
  WR-5.5 validate/reconcile result
```

For Shell work, current Use-Case applicability and Shell composition remain authoritative under their existing owners. The Work Record records their observable selection/result facts; it does not become their semantic owner.

Refinement is incremental-first:

```text
planned
→ in progress
→ completed / reused / not-applicable / blocked / deferred
```

Keep the initial kernel and earlier retained state snapshots as history. Do not reconstruct the whole route only at the end.

<a id="work-record-better-path"></a>
## 8. Better-path / whole-session principle

During `WR-5`, if a materially better, different, newly necessary or blocked session route is discovered:

```text
do not silently discard it
do not silently rewrite accepted Manifest
```

Project it to the appropriate session/canonical surface:

- Manifest reconciliation candidate;
- Need Candidate **only when USER/Source wanted-outcome provenance actually exists**;
- otherwise Finding / Q/R/P / Proposal as appropriate for AI-discovered concerns;
- Core PRS/QRP/Proposal/Decision;
- blocker/dependency;
- revalidation obligation.

When the discovery changes prospective Manifest meaning:

```text
current accepted Manifest remains unchanged
→ Proposal
→ candidate target Manifest
→ USER review/selection
```

Unless prior USER authority clearly covers continuation, this becomes a review/stop boundary rather than permission to continue down the newly proposed route.

After later USER selection of a candidate target Manifest, re-evaluate execution route for integration:

```text
candidate basis still current
+ exact integration is deterministic
→ DIRECT integration is allowed

stale/conflicting basis
or material revalidation/owner reasoning required
→ SHELL before/in the integration work
```

Successful integration still defaults to a USER-visible stop before the next business task unless prior USER authority clearly covers continuation.

<a id="work-record-session-synchronization"></a>
## 9. Session synchronization principle — WR-6

`WR-6` projects material consequences back to Session State.

It also reconciles workspace-context handling when the turn discovers, consumes, updates or invalidates contextual material:

```text
contextual material discovered/used/changed
→ preserve/refine its PRS contextual-material entry
→ update retention/currentness/maintenance disposition when materially required
```

Do not silently promote a contextual file into semantic authority. If contextual meaning becomes stable canonical planning meaning, route that meaning to its natural owner and update/retire the contextual-material role accordingly.


Task-local microsteps remain in the Turn Work Record.

Cross-turn/session consequences may update/reference:

- accepted Manifest factual status/history;
- Needs/Need coverage;
- Core PRS/QRP/Proposal/Decision carry-forward;
- artifact inventory;
- blockers/dependencies;
- review/revalidation state.

Prospective Manifest replanning remains Proposal-first.

If the turn produced only a candidate Manifest Proposal, synchronize:

```text
Proposal ref
candidate TARGET-WORK-MANIFEST ref
PRS/carry-forward status
USER_REVIEW_REQUIRED
```

without replacing the current accepted Manifest.

<a id="work-record-finalization"></a>
## 10. Finalization principle — WR-7

`WR-7` closes the record as the trace of the full turn.

Required final projection, proportionally:

- final current-state snapshot/current pointer;
- immutable initial kernel;
- initial plan vs actual;
- primary subject;
- route used and material route adjustments;
- completed/reused/blocked/deferred work;
- result;
- Manifest/Needs/PRS/revalidation consequences;
- produced/reused artifact refs;
- Session State archive ref;
- methodology / Work Record Principles basis actually used;
- target/repository and session-state authority actually used;
- final Continuation Gate.

The Turn Work Record closes; the Session Manifest continues.

A turn that ends at `USER_REVIEW_REQUIRED` still completes WR-6 and WR-7:

```text
no business task executed after the gate
but
candidate state + carry-forward + archive are synchronized
and the Turn Work Record closes truthfully
```

<a id="work-record-archive"></a>
## 11. Archive principle

Under the proposed Session-State model, every substantive turn that opened/reused Session State normally synchronizes and rematerializes its portable archive before response/handoff completion.

Material USER-supplied input files needed for continuation should be materialized/captured under the Session State `inputs/` surface (or otherwise carried in the archive by an equivalent exact representation). Large external repository/source trees remain exact basis references/snapshots by default and are not recursively copied merely because a Work Record cites them.

The archive is a representation of Session State. It does not promote candidate Proposals or candidate target states to accepted/current meaning.

Session State may select independent retention modes for `inputs/` and `work-records/`:

```text
ACCUMULATE
  keep all retained items in the current Session State archive

ROLLING
  keep active/current items, a configured recent window,
  and every item still materially referenced/pinned;
  older non-required content may leave the current archive after
  an index/summary/basis record is retained

SEGMENTED
  preserve full history in immutable archive segments;
  the current Session State archive carries the active segment plus
  a history index / segment refs instead of recursively embedding all history
```

Retention invariants:
- current Manifest/PRS/Proposal/Need references remain resolvable;
- pinned/contextually-required items are never pruned merely because a window moved;
- pruning/segmentation is observable and indexed;
- inputs and Work Records may use different modes;
- retention policy changes are workspace handling decisions and remain visible in PRS/Session State.


<a id="work-record-references"></a>
## 12. Reference principle

A Turn Work Record references this contract rather than copying it.

Suggested stable refs:

```text
WR-1 → WORK-RECORD-PRINCIPLES#work-record-input
WR-2 → WORK-RECORD-PRINCIPLES#work-record-manifest-check
WR-3 → WORK-RECORD-PRINCIPLES#work-record-work-selection
WR-4 → WORK-RECORD-PRINCIPLES#work-record-execution-routing
WR-5 → WORK-RECORD-PRINCIPLES#work-record-execution
WR-6 → WORK-RECORD-PRINCIPLES#work-record-session-synchronization
WR-7 → WORK-RECORD-PRINCIPLES#work-record-finalization
```

Add natural owner refs when they become known. Prefer stable Responsibility IDs/contract anchors over fragile command/use-case wording where the command is only an entry surface.

## 13. Recordability boundary

The Work Record contains observable runtime/work facts, not private reasoning.

Valid examples:

- input refs/classification result;
- Manifest check outcome;
- selected primary subject;
- route decision fact + concise basis;
- selected/reused Use Cases;
- Shell composition/admission facts;
- planned/refined work items;
- state transitions;
- Findings/Proposal/Decision refs;
- actual actions/results;
- blockers/deferred work;
- final plan-vs-actual.

Do not turn it into a hidden-reasoning transcript.
