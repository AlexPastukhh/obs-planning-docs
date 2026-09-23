# Methodology Evolution Steps

Status: current methodology-evolution backlog; **not runtime methodology authority** and **not an SDS `TM-EVOLUTION-STEP` Target**.

Purpose: keep explicitly deferred improvements to the methodology/runtime environment visible without prematurely turning them into current Use Cases, Target Modules, Session semantics, or mandatory workflow.

A row here means “worth designing later”, not “the current chat must do this now”. Current runtime behavior starts from the README-owned primary bootstrap in `planning/README.md`, then the Methodology Use-Case Registry Map; profile READMEs add only incremental profile bootstrap when applicable.

## ME-001 — Session Workspace / Sandbox Operating Model

**Status:** DEFERRED-DESIGN

### Motivation

A future chat/runtime may benefit from a small, explicit operating model for its sandbox so that repository and methodology work can be performed primarily against stable local copies rather than repeatedly fetching the same material over HTTP.

The design should evaluate at least the following capabilities:

- a chat-local workspace directory for files that belong to the current working context;
- local materialization/access to the **current README-owned bootstrap read sets** when a chat/work context is started or safely restored, without inventing a second bootstrap authority;
- a larger **MUST-AVAILABLE methodology mirror/cache** that can be read locally on demand without making the whole methodology a must-read checklist;
- local repository snapshots/copies used for search, inspection, planning and patch preparation;
- explicit repository snapshot identity/freshness metadata and rules for deciding when a fresh snapshot or cheap remote identity check is required;
- rules for when a new independent work directory is created versus when an existing work directory is continued;
- continuation/handoff metadata for resuming the same work in a later chat without copying irrelevant historical scratch state;
- separation between methodology-cache freshness and working-repository freshness;
- cleanup/retention rules so sandbox structure does not become a second semantic authority or an accidental permanent log.

### Design constraints

The future design must preserve the current architectural boundaries:

1. The current bootstrap hierarchy remains README-owned: `planning/README.md` is primary through Session + Documentation + IDTSPE Core, while profile READMEs are incremental. A future sandbox may materialize/cache these reads locally but must not redefine them.
2. `planning/session/README.md`, `principles-and-terminology.md` and `session-runtime-contract.md` remain ambient bootstrap/interaction material. They do **not** require current Session Use Cases merely because they are bootstrap material.
3. The Methodology Use-Case Registry Map remains the functional methodology entry point after primary bootstrap.
4. `MUST-READ` must stay small. Full Documentation/IDTSPE/SDS material may be locally available without being reread before every command or work step.
5. Local copies/caches are operational representations, not new semantic owners. Canonical methodology meaning remains owned by the repository contracts/registries/components from which the local mirror was made.
6. Repository snapshot freshness is independent from methodology snapshot freshness.
7. A new work directory must correspond to a materially independent work context, repository/baseline, or continuation boundary—not to every message, Use Case, Target, Lens, or Checkpoint.
8. Remote access should be demand-driven: a stable local snapshot should be reused until a freshness condition makes validation or refresh material.
9. The future workspace model must define explicit failure/recovery behavior for missing, stale, partial or conflicting local snapshots.

### Candidate future artifacts

Names are intentionally provisional. A later design pass may choose fewer files if a smaller contract is sufficient.

```text
planning/session/
├── workspace-bootstrap-contract.md
├── workspace-runtime-contract.md
├── repository-snapshot-and-freshness-contract.md
├── methodology-local-cache-contract.md
└── templates/
    ├── SESSION-BOOTSTRAP.template.md
    ├── METHODOLOGY-ENTRY.template.md
    ├── WORK-CONTEXT.template.md
    └── WORK-HANDOFF.template.md
```

A corresponding future workspace could *illustratively* resemble:

```text
<chat-sandbox>/
├── MUST-READ/
├── methodology/      # local mirror/cache; mostly MUST-AVAILABLE, not all MUST-READ
├── work/
│   └── <work-id>/
│       ├── repository/
│       ├── sources/
│       ├── scratch/
│       ├── outputs/
│       └── evidence/
└── cache/
```

This tree is an **example for later design**, not a current required filesystem layout.

### Current disposition

**Do not materialize this operating model yet.** For the current baseline:

- Session has no current Session-owned methodology Use Cases;
- `planning/README.md` owns the current primary bootstrap; Session README + its two interaction files are required within that primary read path;
- commands do not route through Session;
- profiles remain separate incremental README bootstraps; methodology work after bootstrap is still resolved through the current Use-Case/functional owners;
- repository/methodology fetching and sandbox organization remain environment/tool-specific rather than methodology-mandated.

Revisit ME-001 only in an explicit future methodology-evolution pass, after the current migration/audit sequence or when a concrete chat/runtime integration requires it.
