# Replacement Package App — Domain Draft

Status: preliminary current working model / needs upstream Scenario review
Profile: Modular / Medium SDS
Related Scenarios: [`scenarios/README.md`](scenarios/README.md)

## Purpose / Boundary

Make the stable meaning of repository work explicit enough that ownership, continuation, current-change integrity and publication state are difficult to violate.

Do not derive Domain identity from Java classes, JSON records, Git commands or browser task states. Snapshot/chat meanings remain Scenario DATA/integration meaning unless repeated semantic rules later justify a separate Domain area.

## Discovery Evidence

Current Scenarios/Requirements repeatedly require:
- one logical work identity across multiple packages and publication recovery;
- one concrete repository scope for that work;
- exclusive ownership of repository-relative paths among unfinished work in the same concrete repository;
- truthful lifecycle state before/after local commit/publication;
- completion against the current change rather than stale representation;
- isolation from unrelated local/parallel work.

## Stable Semantic Core Candidates

### `ChangeSet`
Strong Entity candidate: one logical repository-work item.

Identity survives:
- package continuation/correction;
- current-change refresh;
- publication-pending recovery;
- verified commit rewrite/rebase.

Technical commit SHA is not ChangeSet identity.

### `Repository Target`
Concept/reference for the concrete local repository to which one ChangeSet belongs.

`Repository Identity` (`github:owner/repo`) and concrete local repository root are related but not interchangeable. Multiple local clones of one repository identity may exist.

### `Relative Path`
Value meaningful only inside a concrete Repository Target.

### `Path Ownership`
Relationship:

```text
unfinished ChangeSet
→ reserves
→ repository-relative path
```

Not currently justified as a standalone Entity.

### `Current Change`
Semantic current cumulative work of one ChangeSet. ReviewDiff file/SHA/temporary Git index are realization mechanisms/evidence.

### `Publication State`
Conceptual lifecycle meaning:

```text
Active
→ Publication Pending
→ Finalized
```

Current persisted `CommittedPendingPush` represents `Publication Pending`.

## Aggregate Discovery

### Candidate A — `Repository Work` aggregate

**Status:** selected candidate for further stress check; not an implementation mandate.

Consistency boundary is one concrete repository's unfinished work:

```text
Repository Work
├── Repository Target
├── unfinished ChangeSets
└── Path Ownership map
```

Why this candidate exists: the strongest invariant spans sibling unfinished ChangeSets in one repository:

```text
(Concrete Repository Target, Relative Path)
→ at most one unfinished ChangeSet owner
```

A path claim/release and the affected ChangeSet ownership must not disagree.

Finalized history need not remain part of the live consistency set after ownership release.

### Alternative B — ChangeSet aggregate + Repository Reservation aggregate

Smaller ChangeSet aggregate plus separate repository-level reservation registry is plausible, but turns claim/release into a cross-aggregate consistency problem. Keep as unselected alternative unless realization evidence shows Candidate A is too coarse.

## Relationships

```text
ChangeSet
→ belongs to exactly one Repository Target

unfinished ChangeSet
→ owns zero or more Relative Paths in that repository

ChangeSet
→ has one current lifecycle state
→ has one semantic Current Change

Replacement Package
→ immutable input/provenance for creating/continuing ChangeSet work
→ remains protocol-owned, not a Domain Entity merely because packageId exists
```

## State / Condition Matrix

| Current condition | Behavior | Result condition | Allowed? | Required guarantee |
|---|---|---|---|---|
| new work, paths free, package applicable | apply | Active ChangeSet + current change | yes | all package preconditions pass before mutation |
| same Active ChangeSet | continuation package | same Active identity, ownership/current change updated | yes | logical work identity preserved |
| other unfinished ChangeSet in same concrete repo owns touched path | apply | unchanged | no | no mutation / no ownership steal |
| unfinished ChangeSet in another concrete repo owns same relative path | apply | normal applicability processing | yes | no cross-repository ownership conflict |
| Active + current completion baseline | finalize/publication succeeds | Finalized | yes | only selected work published; ownership released |
| Active + local commit succeeds + publication fails | finalize | Publication Pending | yes | committed work preserved |
| Publication Pending + recovery proven safe | recover publication | Finalized | yes | no new logical work identity |
| Publication Pending + reconciliation unsafe/ambiguous | recover publication | remains pending | no automatic completion | no unsafe overwrite |
| current-change representation stale | finalize | unchanged | no | re-establish current representation first |

## Invariants

- `INV-RPKG-01` — one ChangeSet belongs to one concrete Repository Target.
- `INV-RPKG-02` — `(Repository Target, Relative Path)` has at most one unfinished ChangeSet owner.
- `INV-RPKG-04` — unrelated dirty/unowned work is never silently adopted into a ChangeSet.
- `INV-RPKG-06` — completion/finalization corresponds to the current ChangeSet work, not a stale representation.
- `INV-RPKG-07` — finalization isolates one logical work item from other ChangeSets/unowned work/service artifacts.
- `INV-RPKG-08` — successful local commit followed by publication failure preserves work in Publication Pending.
- `INV-RPKG-09` — technical commit identity may change during verified recovery without changing ChangeSet identity.
- `INV-RPKG-10` — Finalized releases live path ownership.

Operation-time safety such as revalidating the selected repository before use and proving complete package applicability before mutation remains upstream Application Behavior/Requirements (`BI-RPKG-REVALIDATE-TARGET`, `REQ-RPKG-01`) rather than Domain identity merely because current implementation enforces it.

## Policies / Unresolved Variation

### Base Equivalence Policy
Current protocol/Core use raw exact bytes. Observed Windows line-ending behavior shows this can disagree with Git's clean tracked-file equivalence. A tracked-file Git-clean/filter-aware policy is a candidate, not yet selected Domain truth. Binary/untracked safety must not be weakened by naive newline normalization.

### No-Initial-Commit Repository
Full unborn/empty-tree support versus explicit repository-not-ready remains unresolved. Do not model `Unborn` as accepted current state until product behavior is selected.

### Same-Owned Remote Overlap Recovery
Automatic publication recovery should proceed only where preservation is provable. User-assisted reconciliation for same-owned remote overlap remains an unresolved behavior/policy area; do not weaken the safety guard automatically.

## Rejected Premature Generalizations

No current evidence justifies:
- generic artifact superclass for packages/snapshots/reviews;
- universal provider/plugin framework;
- separate Domain Entity for every persisted JSON record;
- browser claim/lease states as core Domain lifecycle;
- one Domain aggregate per Java service.

## Domain Verification Meaning

Technology-neutral proof examples:
1. same relative path in two different concrete repositories may be independently owned;
2. same path in one concrete repository cannot have two unfinished owners;
3. continuation preserves ChangeSet identity;
4. independent work cannot reuse another ChangeSet merely to bypass ownership;
5. stale current-change representation blocks completion;
6. publication failure preserves logical work as pending;
7. verified recovery may rewrite commit identity without changing ChangeSet identity;
8. Finalized releases ownership;
9. snapshot/chat handoff does not become repository-work authority.

## Current Draft State

Domain core is useful enough to constrain Slice/implementation review, but Scenario boundaries and unresolved base/unborn/recovery policies still require upstream review before declaring this Domain `accepted-current`.
