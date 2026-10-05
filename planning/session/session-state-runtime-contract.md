<a id="session-state-runtime"></a>
# Session State Runtime Contract

Status: optional explicit Session State runtime contract  
Responsibility ID: `SESSION.STATE-RUNTIME`

## Purpose

Session State is an optional file-backed continuity/workspace representation activated only by explicit USER prompt/instruction. It does not sit above or gate ordinary work/Shell and does not create a second planning ontology. Natural IDTSPE/SDS owners retain semantic authority.

## Bootstrap and re-entry

When the USER explicitly activates Session State, create/reuse only the file-backed continuity needed for that requested scope. A Work Record, accepted Manifest and portable archive are each optional subfacilities rather than automatic prerequisites. If the USER explicitly requests the full legacy Work-Record workflow, [`UC-IDTSPE-CONDUCT-CURRENT-WORK`](../documentation/idtspe-methodology/active/idtspe-core/use-cases/conduct-current-work/UC-IDTSPE-CONDUCT-CURRENT-WORK.md#uc-idtspe-conduct-current-work) and [`WORK-RECORD-PRINCIPLES`](../documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md#idtspe-work-runtime) define it. Re-entry reads only the surfaces that were actually activated:

```text
README.md        navigation/responsibilities
WORK-MANIFEST.md accepted session work/state
resolution/PRS.md active bounded resolution/context handling when present
inputs/           retained provenance under policy
work-records/     retained Turn Work Records under policy
context/          PRS-selected carried contextual material
```

`README.md` is navigation only; `WORK-MANIFEST.md` exists only when optional Manifest coordination was activated; Core PRS remains the bounded resolution/context result.

On re-entry, reuse only the Session surfaces that were explicitly active. If a Work Record is active, append new input/answers as events rather than overwriting history. If a Manifest is active, read its current revision; if not, do not create one merely to resume work. An archive never makes prior Shell admission, owner reading or semantic conclusion current by itself.

## Default physical shape

The tree below is illustrative navigation, **not a mandatory directory checklist**. A bounded Session State may have no `PRS-CONTEXT-*` items, no `context/` folder and no separate contextual files. `context/` is created only when PRS-selected material must be carried as file-backed content; `REFERENCE_ONLY` material may remain external. Review relevant existing state on re-entry regardless of whether a context file is retained.

```text
session-state/
├── README.md
├── WORK-MANIFEST.md
├── inputs/
├── work-records/
├── context/          # only when material file-backed context is carried
├── needs/
├── resolution/
│   └── PRS.md
├── proposals/
│   └── <proposal-id>/
│       ├── PROPOSAL.md
│       └── target-state/
├── manifest-history/
├── history-index/
└── other material session-owned files
```

A separate Proposal file is optional when the compact body fits in PRS. File/result-changing Proposals retain complete candidate target-state refs; persistence alone never accepts them.

## Authority planes

```text
target/repository authority
≠
Session-State workspace authority
```

`target/repository = READ_ONLY` may coexist with `session-state = WRITE_ALLOWED`. Existing command `permissionMode` continues to govern target/repository authority. Session-State maintenance does not grant repository mutation.

## Contextual material

Core `TM-PLANNING-RESOLUTION-STATE` / `RU-PRS-03` owns handling coordination for contextual material. Session State merely carries a body under `context/` when the PRS disposition requires it. `REFERENCE_ONLY` material may remain external; `CARRY_CURRENT` travels with current state; `PINNED_SNAPSHOT` is immutable. Context persistence does not make the file semantic authority.

## Retention

Inputs and Work Records select retention independently:

- `ACCUMULATE` — current archive carries all retained items.
- `ROLLING` — keep current/recent plus every pinned/materially referenced item; evicted history remains indexed.
- `SEGMENTED` — preserve full history in immutable segments; current archive carries the active segment and stable history/segment refs.

A current Manifest/PRS/Proposal/Need reference may not be silently pruned. `PINNED_SNAPSHOT` is immutable. History index entries record coverage, disposition, stable ref, hash/basis when material.

## Archive closure

Rematerialize a portable Session archive only when the USER explicitly requested archive/portable re-entry behavior or when an already-active Session workflow requires that output. Include only actually active Session surfaces (for example an optional Manifest, Work Record, PRS/context and retained inputs) plus material refs needed for re-entry. Do not create a route/Question/preparation checkpoint merely because a response is substantive. External repository/source trees remain basis refs by default and are not recursively copied merely because cited.

The Session State archive uses `README.md` (or another explicitly selected navigation entry) as its general re-entry entry point. `WORK-MANIFEST.md` is present/referenced as an entry surface only when the USER explicitly activated the optional Manifest facility. The Session State archive is distinct from a separately requested PRS-centered Proposal Workspace Archive, including an SDS Application planning archive. Produce separate archive artifacts rather than making one ZIP serve both purposes or nesting the Proposal archive inside Session State by default. Record the separate Proposal archive identity/basis as a reference where needed; overlapping semantic state must point to the same canonical owner instead of becoming divergent independent PRS meanings. The Session State archive is not a Replacement Package and does not promote Proposal candidates to accepted/current meaning. P-14 remains the external/durable artifact-placement owner when placement outside ambient Session State is material.

## Degraded host behavior

When the host genuinely cannot provide file-backed Session State/archive behavior, make that limitation explicit and preserve the smallest structured runtime state possible. Do not claim durable/file-backed continuity was achieved when it was not.
