# Replacement Package App — Domain Draft

Status: selected target conceptual model / implementation may still diverge
Profile: Modular / Medium SDS
Related Scenarios: [`scenarios/README.md`](scenarios/README.md)

## Purpose / Boundary

Make stable repository-work and external-handoff meaning explicit enough that identity, ownership, continuation, current-change integrity, publication state and cancellation truth are hard to violate.

Do not derive Domain identity from Java classes, JSON records, Git commands, Swing selectors or browser task states. Operation-time applicability, notifications and UI navigation remain Application behavior unless they establish a stable consistency boundary.

## Discovery Evidence

Target Scenarios/Requirements repeatedly require:
- one logical ChangeSet identity across packages/current-change refresh/publication recovery;
- one stable concrete Repository Target identity even when its filesystem location changes;
- several concrete targets/clones may share one logical Repository Identity;
- exclusive repository-relative path ownership among unfinished work in the same concrete target;
- truthful publication lifecycle/current-change completion plus an explicit safe recovery route from Finalized back to Active when the user deliberately reopens the same logical work;
- repository-independent discovery without creating cross-repository mutation authority;
- one exact external payload/destination interaction with cancellation/uncertainty truth independent from repository-work authority.

## Repository-Work Semantic Core

### `ChangeSet`
Strong Entity candidate: one logical repository-work item.

Identity survives:
- package continuation/correction;
- Current Change refresh;
- Publication Pending recovery;
- verified commit rewrite/rebase;
- Repository Target location change;
- explicit Finalized→Active Reopen.

Technical commit SHA and filesystem path are not ChangeSet identity.

### `Repository Target`
Strong Entity/reference candidate for one concrete registered local repository target.

```text
Repository Target
├ Target ID              stable local target identity
├ Repository Identity    logical github:owner/repo identity
└ Repository Location    mutable filesystem root
```

Several Repository Targets may share one Repository Identity because multiple clones may be registered. Changing location does not create a new target or rebind individual ChangeSets.

### `Repository Identity`
Value Object candidate such as `github:owner/repo`. It is not sufficient by itself to identify one concrete local target.

### `Repository Location`
Mutable value associated with one Repository Target. Explicit location change requires a valid Git work tree + matching Repository Identity/origin. Operation-specific repository/source/current-change checks occur later when those operations execute.

### `Relative Path`
Value meaningful only inside one concrete Repository Target.

### `Path Ownership`
Relationship/reservation:

```text
unfinished ChangeSet
→ reserves
→ Relative Path inside its Repository Target
```

Not justified as a standalone Entity.

### `Current Change`
Semantic current cumulative work of one ChangeSet. ReviewDiff file/SHA/temporary index are realization evidence.

### `Publication State`
Conceptual lifecycle:

```text
Active
→ Publication Pending
→ Finalized

Finalized
-- explicit guarded Reopen --> Active
```

Current persisted `CommittedPendingPush` is the implementation representation of Publication Pending. Finalized remains the normal completion state and releases live ownership, but it is no longer an irreversible identity terminal: explicit Reopen may restore the same ChangeSet to Active after safety checks. Historical finalization evidence is retained.

## Repository Work Aggregate Candidate

**Selected strong candidate, not a Java class mandate:**

```text
Repository Work
├ Repository Target
├ unfinished ChangeSets
└ Path Ownership map
```

Strong cross-ChangeSet invariant:

```text
(Concrete Repository Target, Relative Path)
→ at most one unfinished ChangeSet owner
```

Claim/release and affected ChangeSet ownership must not disagree. Finalized history may leave the live consistency set after ownership release while remaining available to read projections/history. Explicit Reopen returns the same ChangeSet to the live set only after safe reacquisition of its historical paths; it cannot steal ownership from a sibling unfinished ChangeSet or adopt unrelated dirty/unowned work.

A global Existing Work list is a read/query projection across Repository Work aggregates plus history; it is not a global mutable aggregate.

## External Interaction Aggregate Candidate

A second strong aggregate candidate exists for user-significant ChatGPT handoff:

```text
External Interaction
├ Interaction ID
├ Kind
│  ├ Deliver Current Change
│  └ Attach Repository Snapshot
├ exact Source payload/artifact
├ exact Destination conversation
├ semantic State
└ Outcome / cancellation truth
```

Candidate invariants:
- one interaction keeps one exact source and one exact destination;
- duplicate tabs/claims do not create duplicate semantic interactions;
- terminal/uncertain truth cannot be overwritten by later implementation mechanics;
- cancellation before possible Send stops future automation;
- if external content is already prepared, `Cancelled` does **not** mean deleted: prepared content remains and no automatic cleanup/send occurs;
- once Send may have occurred, interaction cannot be rewritten to definitely Cancelled/unsent;
- interaction outcome never changes Repository Work authority/lifecycle.

Pairing, heartbeat, polling, claim leases, tab IDs and content-script reconnect are implementation mechanics, not aggregate identity/state names.

## Explicitly Outside Domain Aggregate

### `User Operation`
Application process/execution model, not a Domain aggregate in the selected target.

It supports:
- meaningful user operation identity/type/context;
- Running/Succeeded/Failed/Action Required/Uncertain outcome;
- Windows notification delivery;
- compact latest unfinished-ChangeSet outcome projection;
- session diagnostics linkage.

No generic persistent operation-history aggregate is selected.

### Navigation / Read Models

- Global Work Item / Existing Work row = query projection;
- Current Repository/Work Context = Application/UI state;
- Package Repository Resolution Result = Application-service result;
- latest unfinished-ChangeSet error marker = persisted/read-projected latest relevant operation outcome, not ChangeSet lifecycle;
- Finalized history has no persistent error marker; failed Reopen is represented by its User Operation result/notification/diagnostics while the ChangeSet remains Finalized;
- Windows notification = presentation/integration of User Operation result.

### Applicability Policies

Expected source-state proof, Repository Not Ready, package target resolution and complete preflight-before-mutation are Application behavior/policy. They constrain Domain-safe transitions but are not promoted to Domain identity merely because implementation enforces them.

## Relationships

```text
ChangeSet
→ belongs to exactly one Repository Target

Repository Target
→ has one Repository Identity
→ has one current Repository Location

unfinished ChangeSet
→ owns zero or more Relative Paths in its target

ChangeSet
→ has one publication lifecycle state
→ has one semantic Current Change

External Interaction
→ may reference one ChangeSet/current-change source
  OR one Repository Snapshot source
→ has exactly one intended Chat Conversation

Replacement Package
→ immutable protocol input/provenance for creating/continuing ChangeSet work
→ not a Domain Entity merely because packageId exists
```

## State / Condition Matrix

| Current condition | Behavior | Result condition | Allowed? | Required guarantee |
|---|---|---|---|---|
| new work, paths free, package applicable | Apply | Active ChangeSet + Current Change | yes | complete preflight before mutation |
| exact `PACKAGE.json.changeSetId` resolves Active | continuation package | that exact ChangeSet identity; ownership/current change updated | yes | UI selection/label/recency cannot substitute another ChangeSet |
| exact `PACKAGE.json.changeSetId` resolves Finalized | Apply | remains Finalized | no | explicit Reopen required; no auto-reopen or substitution |
| sibling unfinished ChangeSet in same target owns touched path | Apply | unchanged | no | no mutation / no ownership steal |
| unfinished ChangeSet in another concrete target owns same relative path | Apply | normal applicability | yes | no cross-target ownership conflict |
| explicit repository location change, Git work tree + identity match | update target location | same Repository Target/ChangeSets at new location | yes | stable Target ID; no per-ChangeSet rebind |
| Active + current completion baseline | finalize/publish succeeds | Finalized | yes | selected work only; release ownership |
| Active + local commit succeeds + push fails | finalize | Publication Pending | yes | committed work preserved |
| Publication Pending + safe recovery | Retry Push/reconcile | Finalized | yes | no new logical work identity |
| Finalized + explicit Reopen + target/path state safe | Reopen ChangeSet | same identity becomes Active | yes | preserve history; reacquire historical paths without ownership steal/adoption |
| Finalized + Reopen conflict/unowned dirty adoption risk | Reopen ChangeSet | remains Finalized | no | no partial lifecycle/ownership change; failed operation notifies but creates no Finalized error marker |
| recovery unsafe/ambiguous | Retry | remains pending | no automatic completion | no unsafe overwrite |
| current-change representation stale | Finalize | unchanged | no | re-establish current representation |
| interaction queued/prepared, user cancels before possible Send | Cancel | Cancelled; prepared content may remain | yes | no future automation; no cleanup claim |
| Send may have occurred | cancel request | Sent/uncertain truth retained | no false cancellation | no rewrite/no blind resend |

## Invariants

- `INV-RPKG-01` — one ChangeSet belongs to one stable concrete Repository Target.
- `INV-RPKG-02` — `(Repository Target, Relative Path)` has at most one unfinished ChangeSet owner.
- `INV-RPKG-03` — Repository Target identity is distinct from Repository Identity and Repository Location.
- `INV-RPKG-04` — unrelated dirty/unowned work is never silently adopted into a ChangeSet.
- `INV-RPKG-05` — changing Repository Location preserves Target ID and all ChangeSet associations; automatic clone substitution is not a location change.
- `INV-RPKG-06` — completion/finalization corresponds to current ChangeSet work, not stale representation.
- `INV-RPKG-07` — finalization isolates one logical work item from other ChangeSets/unowned work/service artifacts.
- `INV-RPKG-08` — successful local commit followed by publication failure preserves work as Publication Pending.
- `INV-RPKG-09` — technical commit identity may change during verified recovery without changing ChangeSet identity.
- `INV-RPKG-10` — Finalized releases live path ownership.
- `INV-RPKG-11` — one External Interaction has one exact source and destination; implementation claim/tab changes do not alter that identity.
- `INV-RPKG-12` — `Cancelled` never implies external prepared content was deleted; possible-send uncertainty is never rewritten to definitely unsent.
- `INV-RPKG-13` — explicit Reopen preserves ChangeSet identity and historical finalization evidence; it may return Finalized to Active only when historical path ownership can be re-established without stealing sibling ownership or silently adopting unrelated dirty/unowned work.

## Selected Application Policies Affecting Domain-Safe Transitions

### Expected Source State
For `replace/delete`, raw equality is accepted immediately. Otherwise target implementation compares expected package-base content and actual content using Git's path-specific clean/filter semantics. Git-equivalent content is accepted; real difference or inability to verify blocks before mutation. No naive global newline normalization is selected.

This protects against out-of-band manual/IDE/script/Git changes that Path Ownership cannot detect. Path Ownership protects ChangeSet-vs-ChangeSet overlap; source-state proof protects freshness relative to what the producer saw.

### Repository Not Ready
When an operation requires committed baseline/ref/HEAD semantics and no first commit exists, report actionable Repository Not Ready. Do not introduce `Unborn` into ChangeSet lifecycle and do not invent empty-tree fallback unless a future separate requirement selects it.

### Latest ChangeSet Operation Outcome
Compact latest relevant success/failure + reason + timestamp may persist for global-list/error-marker presentation. This is not Publication State and does not accumulate a general unresolved-error aggregate.

## Rejected Premature Generalizations

No current evidence justifies:
- generic artifact superclass for package/snapshot/review;
- universal provider/plugin framework;
- separate Domain Entity for every persisted JSON record;
- browser claim/lease states as semantic External Interaction lifecycle;
- global cross-repository Repository Work aggregate;
- generic persistent User Operation history aggregate;
- one Domain aggregate per Java service.

## Domain Verification Meaning

Technology-neutral proof examples:
1. same relative path in two different concrete Repository Targets may be independently owned;
2. same path in one target cannot have two unfinished owners;
3. continuation preserves ChangeSet identity;
4. Repository Target location changes without per-ChangeSet rebind;
5. a matching-origin second clone is never substituted implicitly, although the user may explicitly set it as the target's new location;
6. independent work cannot reuse another ChangeSet merely to bypass ownership;
7. stale/current-source applicability is checked separately from path ownership;
8. stale Current Change blocks completion;
9. publication failure preserves one logical pending work item;
10. External Interaction cancellation/uncertainty remains truthful and does not affect repository authority;
11. snapshot/chat handoff does not become Repository Work authority.

## Current Draft State

The target conceptual model is coherent enough to constrain the next architecture/implementation revision. Remaining uncertainty is engineering proof of the selected Git path-semantic source comparison and real browser/Windows operation evidence, not an unresolved product/Domain choice.
