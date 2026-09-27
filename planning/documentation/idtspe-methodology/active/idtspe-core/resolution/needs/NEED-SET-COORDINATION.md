<a id="resolution-need-set-coordination"></a>
# Need Set Coordination Contract

Status: active generic IDTSPE Core coordination owner
Purpose: keep USER/Source-grounded Needs visible across discussion, disposition, downstream realization and explicit stop conditions without creating a second Need, Requirement, Proposal, Decision or realization authority.

Responsibility ID: `RESOLUTION.NEED-SET-COORDINATION`

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [`Need Candidate Collection`](NEED-CANDIDATE-COLLECTION.md#resolution-need-candidate-collection) — `RESOLUTION.NEED-CANDIDATE-COLLECTION`
> - `CONTEXTUALIZES` [`Need Candidate Disposition`](NEED-CANDIDATE-DISPOSITION.md#resolution-need-candidate-disposition) — `RESOLUTION.NEED-CANDIDATE-DISPOSITION`
> - `CONTEXTUALIZES` [`Artifact Placement / Persistence`](../../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md#representation-artifact-placement) — `REPRESENTATION.ARTIFACT-PLACEMENT`

## 1. Core Definition

```text
Need Candidate Collection
= what USER/Source-grounded wanted outcome exists + provenance

Need Candidate Disposition
= what that Need means and which natural semantic owner/lifecycle receives it

Need Set Coordination
= which grounded Needs the USER still wants kept visible,
  where canonical downstream work now lives,
  and whether the wanted outcome is actually satisfied or was explicitly stopped/replaced
```

Need Set Coordination is a **tracking/continuity projection**. It does not redefine what counts as a Need, perform semantic disposition, select a Proposal, create a Requirement/Feature/Evolution Step, or become the owner of downstream accepted meaning.

The existing Need contracts remain canonical:

```text
USER / Source
→ NEED-CANDIDATE-COLLECTION
→ grounded Need Candidate
→ NEED-CANDIDATE-DISPOSITION
→ natural semantic owner / lifecycle

Need Set Coordination
→ references those results
→ keeps the USER wanted outcome visible until fulfillment or explicit terminal disposition
```

## 2. Need Set Boundary

A **Need Set** is a bounded coordination grouping for Needs that the USER wants tracked together. It is not a Target, backlog ontology, Proposal bundle or semantic owner.

Use one current `ACTIVE` Set per bounded coordination scope unless the USER explicitly establishes another relation. A durable ledger may contain several historical Sets.

Set coordination state:

```text
ACTIVE
→ receives newly collected Need Candidates for this coordination scope

CLOSED
→ no longer receives new Need Candidates
→ already tracked non-terminal Needs remain trackable until they reach item-terminal state

SUPERSEDED
→ an explicitly identified successor Set replaces this Set as the coordination surface
→ unresolved item transfer/reference is explicit; nothing disappears silently
```

Starting a new Set while another Set is `ACTIVE` is explicit intent to stop collecting new items into the prior Set. By default the prior Set becomes `CLOSED`, not `SUPERSEDED`; use `SUPERSEDED` only when the USER explicitly establishes replacement semantics.

Closing a Set is **not** equivalent to satisfying, retiring or rejecting its remaining Needs.

## 3. Tracked Need Item

Each tracked item keeps only coordination information needed to preserve continuity and point to canonical owners.

Recommended proportional projection:

```text
Need ID / stable local key
Exact USER/Source provenance or authoritative Source reference
Normalized wanted outcome
Tracking Status
Collection reference
Disposition reference / current destination
Downstream owner/result references
Current blocker / Q-R-P / Proposal / Target / realization references when useful
Fulfillment Evidence references when any
Terminal basis when terminal
Last synchronization basis
```

### Tracking Status

```text
TRACKING
→ the wanted outcome remains non-terminal from the USER coordination perspective
→ disposition/downstream state is referenced rather than copied into a new status ontology

SATISFIED
→ Evidence establishes that the normalized wanted outcome has actually been achieved

RETIRED
→ the USER/authoritative Source explicitly establishes that the wanted outcome is no longer being pursued

SUPERSEDED
→ an explicit replacement Need/wanted outcome exists; retain the replacement reference
```

Do **not** create duplicate `ROUTED`, `REALIZATION_PENDING`, `BLOCKED`, `ACCEPTED`, `REJECTED` or similar Need-Set statuses when that meaning is already owned by Need Disposition, Q/R/P, Proposal/Decision, Target/Unit or downstream realization state. The ledger may reference those canonical states.

Creating a Proposal, Requirement, Feature, Evolution Step, Target or implementation task does not by itself satisfy the Need. `SATISFIED` requires Evidence that the original wanted outcome is actually achieved.

## 4. Start / Synchronize / Close Operations

<a id="need-set-start"></a>
### Start

```text
explicit request to start a Need Set
→ resolve bounded coordination scope
→ if another Set is ACTIVE in that scope, stop new intake there by moving it to CLOSED unless explicit supersession is requested
→ establish new ACTIVE Set identity
→ resolve/reuse durable ledger representation through P-14 when persistence is material
```

Starting a Set does not invent Needs. Existing/current USER material becomes tracked only through canonical Need Candidate Collection.

<a id="need-set-sync"></a>
### Synchronize

Synchronize one selected/current Need Set proportionally:

```text
new USER/Source wanted outcomes in selected sync context
→ canonical Need Candidate Collection
→ add/reference grounded candidates in the ACTIVE Set

collected candidates whose disposition is still material
→ canonical Need Candidate Disposition
→ refresh destination/reference only from its result

tracked Needs
→ inspect current canonical downstream owner/result/Evidence
→ update coordination references
→ mark SATISFIED only with fulfillment Evidence
→ mark RETIRED/SUPERSEDED only from explicit authoritative basis

persist changed coordination projection through P-14 when required/authorized
```

For a `CLOSED` Set, synchronization may still refresh existing tracked items, but it must not silently add newly surfaced Needs to that closed Set.

Synchronization is an explicit operation, not a promise that a chat process mutates a repository file in the background. Ordinary methodology work may keep equivalent coordination meaning in current Work Context; physical persistence follows the current authority/representation route.

<a id="need-set-close"></a>
### Close

```text
explicit request to close current Set
→ ACTIVE → CLOSED
→ stop adding newly surfaced Needs to that Set
→ preserve every non-terminal tracked Need and its canonical downstream references
→ continue later synchronization of those existing items when useful
```

Closing a Set never silently converts `TRACKING` items to a terminal state.

## 5. Collection / Disposition Preservation Invariant

The following responsibilities MUST remain separate:

```text
Collection owns:
- USER/Source grounding
- exact provenance
- normalized wanted outcome candidate

Disposition owns:
- interpretation needed for routing
- current-coverage determination
- smallest plausible semantic subject/owner
- route into existing canonical lifecycle/owner

Need Set Coordination owns:
- grouping/addressable continuity
- cross-message/session tracking references
- fulfillment/explicit-stop projection
- durable-ledger handshake
```

Need Set Coordination consumes or references Collection/Disposition outputs. It MUST NOT reinterpret an AI preference as a USER Need, silently change a disposition destination, or copy downstream semantic bodies into a permanent Need-owned shadow model.

## 6. Persistence / Ledger Representation

A Need Set does not imply one file per Need or one file per Set.

When the USER explicitly requires cross-message/session continuity, or a Need Set contains non-terminal items whose loss would materially harm continuation, persistence of one canonical coordination representation is `REQUIRED` unless an existing canonical representation already provides equivalent discoverability.

Preferred representation shape for the common case:

```text
one durable Needs ledger artifact for the bounded work scope
→ contains current + historical Need Set sections/items
→ retains stable item identities and canonical references
→ does not duplicate downstream semantic bodies
```

The exact path/filename is **not** owned here. [`Artifact Placement / P-14`](../../representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md#representation-artifact-placement) selects/reuses the physical destination from the actual workspace/profile context. An implementation-native or non-Markdown representation remains valid when it satisfies the same addressability/continuity need.

Persistence never grants semantic authority and never grants repository mutation/commit/push permission by itself.

## 7. Current Work State / Re-entry

When one or more Need Sets have material continuation value, [`UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE`](../../use-cases/maintain-current-work-state/UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE.md#uc-idtspe-maintain-current-work-state) may retain/reuse their compact coordination projection or the durable ledger reference as part of current Work Context.

On re-entry:

1. resolve the current/selected Need Set and durable ledger when one exists;
2. keep exact provenance and normalized wanted outcome distinct;
3. follow Collection/Disposition/current downstream owners rather than inferring state from stale summary text;
4. refresh only affected tracked items;
5. do not reopen terminal items without new authoritative basis.

Need Set Coordination is not [`Resolution Carry-Forward`](../RESOLUTION-CARRY-FORWARD-CONTRACT.md#resolution-carry-forward) / PRS and must not be used as a global Proposal/Q-R-P/Decision backlog. The same Need may reference canonical carry-forward/PRS state when that state is independently applicable.

## 8. P-02 Boundary

```text
P-02 Pass Working Record
= what execution was planned/current plus what methodology runtime/traversal actually happened in the current pass

Need Set Coordination
= which USER-grounded wanted outcomes remain tracked across passes/messages/sessions
```

P-02 may record Need Set start/sync/close events and Collection/Disposition traversal, but P-02 is not the Need Set authority. A Need Set may survive after the P-02 Pass Working Record ends.

## 9. Command Surface Boundary

Direct repository commands may expose independently useful explicit operations for:

```text
start Need Set
synchronize current Need Set
close current Need Set
```

Those commands remain thin invocation surfaces over this owner plus existing Collection/Disposition/Persistence owners. They must not reimplement Need detection or semantic routing. Repository/artifact writes require an explicit mutation-capable command/host permission boundary; the existing `idtspe.needs.collect` and `idtspe.needs.disposition` commands remain read-only.
