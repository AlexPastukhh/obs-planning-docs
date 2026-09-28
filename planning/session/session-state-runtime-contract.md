<a id="session-state-runtime"></a>
# Session State Runtime Contract

Status: active Session runtime contract  
Responsibility ID: `SESSION.STATE-RUNTIME`

## Purpose

Session State is the ambient file-backed continuity/workspace representation for substantive USER↔AI work. It exists above DIRECT/SHELL routing and does not create a second planning ontology. Natural IDTSPE/SDS owners retain semantic authority.

## Bootstrap and re-entry

For substantive work, create/reuse Session State and establish/reuse its portable archive identity before methodology execution; materialize the current Turn Work Record S0 as early as the host permits, then create/reuse an initial portable archive snapshot containing available navigation and S0 before substantive execution when writable with the immutable WR-1…WR-7 kernel and reconstructable authority/methodology/retention references as early as the host permits. The fundamental [current-work Use Case](../documentation/idtspe-methodology/active/idtspe-core/use-cases/conduct-current-work/UC-IDTSPE-CONDUCT-CURRENT-WORK.md#uc-idtspe-conduct-current-work) coordinates the turn after this minimal allocation. If the accepted Manifest is not yet formed, the initial snapshot marks it pending rather than fabricating accepted content. The archive is rematerialized from actual current state at WR-7. Re-entry reads:

```text
README.md        navigation/responsibilities
WORK-MANIFEST.md accepted session work/state
resolution/PRS.md active bounded resolution/context handling when present
inputs/           retained provenance under policy
work-records/     retained Turn Work Records under policy
context/          PRS-selected carried contextual material
```

`README.md` is navigation only; `WORK-MANIFEST.md` is the accepted session-scale work projection; Core PRS remains the bounded resolution/context result.

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

Every substantive Session-State turn normally rematerializes a portable archive before response/handoff completion. The archive contains current Manifest, current Turn Work Record, current PRS when material, and material session-owned files required for re-entry. External repository/source trees remain basis refs by default and are not recursively copied merely because cited.

The Session State archive has `WORK-MANIFEST.md` as its re-entry entry point and is distinct from a separately requested PRS-centered Proposal Workspace Archive, including an SDS Application planning archive. Produce separate archive artifacts rather than making one ZIP serve both purposes or nesting the Proposal archive inside Session State by default. Record the separate Proposal archive identity/basis as a reference where needed; overlapping semantic state must point to the same canonical owner instead of becoming divergent independent PRS meanings. The Session State archive is not a Replacement Package and does not promote Proposal candidates to accepted/current meaning. P-14 remains the external/durable artifact-placement owner when placement outside ambient Session State is material.

## Degraded host behavior

When the host genuinely cannot provide file-backed Session State/archive behavior, make that limitation explicit and preserve the smallest structured runtime state possible. Do not claim durable/file-backed continuity was achieved when it was not.
