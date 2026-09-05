# Legacy Parallel-Work Scope And Action Log Workflow

Status: legacy/provenance
Original current path: `planning/documentation/parallel-work-scope-and-action-log-workflow.md`

The fixed scope/action-log architecture is retired from current reusable methodology. Future branch-based coordination is intentionally not inferred from this historical workflow.

## Preserved Former Content

# Parallel Work Scope And Action Log Workflow

Status: active reusable cross-repository workflow
Scope: define fixed independent parallel-work scopes, maintain scope-local high-level action logs, and keep replacement-package target state consistent with those logs.

Project-specific scope authority is a root `parallel-work-scope-registry.md` (or an equivalently mandatory root registry in another repository). Actual log entries remain project/scope state; this file owns only reusable semantics.

## 1. Independent Scope Model

A parallel-work scope is a pre-registered repository subtree that can normally be planned, changed, packaged and reviewed independently of sibling scopes.

```text
Scope Registry
→ fixed active scope roots
→ canonical action-log.md at each root
→ normal chats select existing scopes
```

Chats do not repartition the repository per task. Scope creation/split/merge/retirement is an explicit registry-maintenance change.

For nested registered roots, a path belongs to the deepest active registered root containing it. A parent scope excludes registered child subtrees.

### 1.1 Use-Case / Work-Family Affinity

A registered parallel-work scope is a physical coordination boundary, not a semantic owner. When initially defining or explicitly splitting/merging scopes, inspect the relevant current Use-Case Registries, Scenario/application owners and other semantic owners before choosing physical roots. Prefer a scope boundary that corresponds to a cohesive independently coordinatable work family when that reduces routine cross-scope changes and makes ownership understandable.

Do not mechanically create one scope per Use Case or registry group. One practical scope may host several closely related capabilities when they share one stable ownership/change boundary; conversely, one broad capability family may justify several registered scopes when its parts genuinely need independent parallel coordination.

Cross-family integration does not erase semantic or physical boundaries. If one planned/implemented work item changes files in several registered roots, ordinary cross-scope canonical-log/reference rules apply.

A project Scope Registry may reference related Use-Case families or current semantic owners as optional navigation metadata, but semantic owners remain semantic authority and the Scope Registry remains physical boundary authority.

### 3.1 Stable Identity And Minimum Record Shape

Scope/log references must survive later wording edits and appended history.

```text
Scope ID
→ stable within the repository while that registered scope exists
→ changed/retired only by explicit Scope Registry architecture change
→ never silently reused for a different scope

Canonical Log Entry ID
→ stable and unique within one canonical action-log.md
→ never reused or renumbered after publication
→ heading/title wording may change without changing the Entry ID

CROSS-SCOPE REFERENCE
→ identifies Canonical Log path + stable Entry ID
```

Use concise record shapes; required fields are type-specific rather than one universal schema:

```text
IDEA REVIEW
  Source
  Current Conclusions / selected meaning

IDEA CLARIFICATION
  Updates: <prior Entry ID(s)>
  Clarification / resulting meaning

REVIEW DIFF
  Reviewed: <change/package/transition>
  Material Finding / selected correction
  Resulting Current Meaning

APPLIED
  Applied From: <prior Entry ID(s)>
  Target-State Result
  Rationale when material
  ChangeSet / Package when available

ACTION
  Action
  Result
  Rationale when material

CROSS-SCOPE REFERENCE
  Canonical Log
  Entry
```

These are minimum semantic anchors, not a rigid serialization format. Add fields only when they carry material meaning.

## 4. Logging Start Boundary

```text
logging starts only after the user explicitly asks to start/maintain the log
```

Do not reconstruct earlier work merely because chat history, Git history or old files are available. Earlier material may be logged only when the user explicitly selects it as source/provenance.

## 5. Optional Chat Evidence

When chat history is actually available and a counting basis is explicitly known, a record may include:

```text
Chat Reference:
  Count Basis: assistant-only | user+assistant | <explicit basis>
  Latest Message At Entry: <ordinal>
  Related Messages: <ordinal/ranges when useful>
```

Do not guess ordinals or counting basis. Chat references are evidence, not semantic authority.

## 6. Cross-Scope Work

For work affecting multiple registered scopes, choose one affected scope log as canonical for that work. Keep full records there. Every other affected scope log receives only a reference containing the canonical log path and entry ID.

The canonical log choice is explicit for the work and remains stable through its correction/review loop. Full records must not be duplicated between logs.

## 7. Replacement-Package Final-State Invariant

A replacement package is built as though successful Apply may be the final current repository state.

Therefore, before packaging:

```text
resolve Scope Registry
→ determine every affected registered scope
→ select canonical log for cross-scope work
→ include all material Idea Review / later clarification / prior ReviewDiff correction meaning
→ append the APPLIED target-state record
→ update reference-only logs for other affected scopes
→ package complete resulting log bytes together with implementation files
```

For an existing log, the package uses exact current bytes as `base-files/<log>` and complete cumulative post-apply bytes as `replacement-files/<log>`. A new scope log is an ordinary `add` operation.

Never rely on a mandatory later package to repair a log that the current package could leave inconsistent.

## 8. Review / Correction Accumulation

After Apply, semantic ReviewDiff may add material findings or selected corrections.

```text
package P1 → log state L1
ReviewDiff adds material correction
package P2 → exact base L1 → cumulative log state L2
```

P2 adds the material ReviewDiff meaning and an `APPLIED` record for the correction it makes true. Do not rewrite older records as though later knowledge existed earlier.

If ReviewDiff is `APPROVABLE` and adds no material meaning, do not add an approval-only log record and do not produce a closing package merely for that verdict.

## 9. Parallel Work Boundary

A registered scope marks where independently coordinated work may proceed. Crossing into another registered scope is cross-scope work and must be represented accordingly in logs/packages. The log boundary does not by itself grant edit/commit/push permission; command/update/package permissions remain separate.

## 10. Do Not

- Do not create temporary shadow-workspace/sync architecture as the default parallel-work model.
- Do not create a repository-wide aggregate log merely to centralize all scopes.
- Do not let chats invent new scope partitions ad hoc.
- Do not duplicate full cross-scope records.
- Do not reconstruct pre-start history.
- Do not log approval noise with no new material meaning.
- Do not let a replacement package omit log/reference updates required for its own coherent post-apply state.
