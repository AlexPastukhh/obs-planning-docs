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

## ME-002 — Pre-Repository Integration Audit Follow-Ups

**Status:** REQUIRED-FOLLOW-UP-BEFORE-FINAL-REPOSITORY-INTEGRATION

The map and Helper direction follows the [on-demand relation audit decision](ON-DEMAND-RELATION-AUDITS-DECISION-2026-09-26.md). It supersedes the v45 manual-map/owner-nesting proposal and the v44 parser/generator proposal.

### Motivation

The 2026-09-26 pre-integration audit of the cumulative methodology/tooling snapshot found that the current baseline is mechanically consistent and that the already implemented EOL, methodology-integrity-test and SDS-example-alignment changes are green, but several adjacent design/cleanup topics remain intentionally unresolved.

This item preserves those findings so they are not lost or silently folded into an unrelated repository update. It is a follow-up plan, not runtime methodology authority and not permission to change every listed area in one changeset.

### Already closed in the current candidate baseline

The following findings were addressed before this backlog entry and should not be reopened without a new concrete finding:

- Planning Helper generated-artifact EOL determinism across normal and Windows-like `core.autocrlf=true` checkouts;
- methodology hard-integrity principles, failure diagnostics and the active methodology-integrity-test maintenance Use Case / Contract / Process;
- shared low-level repository path / exact-case / anchor resolution for current methodology integrity checks while preserving separate relation semantics;
- hard checks for command `ownerRefs`, typed `Semantic Owner Dependency` references and Unit-to-Lens attachment hrefs;
- removal of several frozen-count / second-authority assertions where the canonical inventory can be derived instead;
- SDS Study Tab Launcher example alignment for Code Realization routing, Practical Test Unit names/campaign boundaries, Carry-Forward/PRS wording and historical conformance labeling;
- removal of the false-positive Practical Test heading snapshot so an intentional canonical rename plus consistent consumer updates can pass.

### Follow-up A — Retire the legacy `testing-planning/` surface consistently

**Priority:** PRE-INTEGRATION CLEANUP

The folder-level README and registry now describe `planning/documentation/testing-planning/` as historical compatibility/provenance and its former Use Cases as retired/subsumed, but several files inside the same folder still describe themselves as active canonical/routing/supporting owners or active templates.

Resolve this contradiction before the final repository integration.

Required review:

1. Identify every file in `planning/documentation/testing-planning/` that still claims `active`, `canonical owner`, `routing owner`, active template status, or current ownership semantics.
2. For material meaning that already exists in the active Core Testing Knowledge Basis or `LENS-TEST-PROOF-EVIDENCE`, keep the active owner canonical and reduce the legacy copy to provenance/compatibility wording or a redirect as appropriate.
3. Remove or rewrite old responsibility-map / registry prose that still says retired `UC-PLAN-TEST-*` entries currently own Strategy, Design, Coverage or Practical Test results.
4. Clean remaining active-Core wording that names retired Testing Planning Use Cases as if they are current owners unless the reference is explicitly historical/compatibility-only.
5. Update tests so they do not preserve the old folder as a current semantic owner merely because the historical files still exist.
6. Preserve useful provenance; do not delete historical evidence merely to simplify navigation.

Completion condition:

```text
active methodology authority
  → Core/SDS current owners

planning/documentation/testing-planning/
  → unambiguous historical / compatibility / provenance surface only
```

### Follow-up B — Re-evaluate bootstrap proportionality and profile parity

**Priority:** METHODOLOGY-DESIGN FOLLOW-UP

The bootstrap audit found the primary/Core bootstrap model healthy, but profile bootstraps are not yet equally proportional or equally protected.

Review at least:

- SDS, Visual Production 2D and Reference Knowledge profile bootstraps against the Core pattern `small bootstrap spine → conditional deep reads`;
- whether current profile bootstraps eagerly require deep profile contracts that should instead be demand-driven;
- the hard-coded `14 active SDS Target Modules + 5 optional inherited generic Core Target Modules` wording in `bootstrap-application-sds-planning.command.md`; cardinality should normally be derived from registries/projections rather than manually frozen in command prose;
- parity of bootstrap integrity coverage across every installed profile, without hard-coding the current profile count, profile names, line counts or exact read-set size into tests;
- explicit profile-bootstrap guards that reading/bootstrap orientation alone does not create/select/execute a Target, Target Module, Lens or repository mutation;
- whether profile Responsibility Maps / registries already provide enough machine-readable routing to derive the relevant checks without introducing a second bootstrap authority.

Do not solve this by imposing one identical file list on every profile. The intended result is proportionality plus consistent architectural boundaries, not textual uniformity.

### Follow-up C — On-demand relation audits; direct command owners only

**Priority:** COMMAND / METHODOLOGY NAVIGATION

Retire the two standing dependency/attachment map files and their exact-parity instructions. The existing two read-only commands now produce temporary, sourced audit tables from the current owner declarations on request. They do not write map files. Helper continues to show only a command's directly declared `ownerRefs`; no nested dependency or attachment lists are added. See the [current decision](ON-DEMAND-RELATION-AUDITS-DECISION-2026-09-26.md).

### Follow-up D — Retire automated methodology-integrity claims

**Priority:** TEST/POLICY SIMPLIFICATION FOLLOW-UP

The [v44 test audit](METHODOLOGY-INTEGRITY-TEST-AUDIT-2026-09-26.md) inventories old methodology tests. The parser/fixture/generator plan is superseded. The two map-parity test files were removed with the maps in this candidate. Remaining repository-specific methodology assertions and the active methodology-integrity-test Use Case, Contract and Process still need a separate assertion-by-assertion retirement. Preserve ordinary product, codec, UI and build checks. Do not describe a green product suite or an AI audit as a methodology integrity guarantee.

### Follow-up E — Browser-test / verification contract

**Priority:** TOOLING-VERIFICATION FOLLOW-UP

The standard repository suite (`npm test`, `build:check`, `verify`) is green, while the standalone browser test cannot currently be executed in the audit environment because `playwright` is not installed there.

Resolve explicitly rather than leaving an ambiguous proof boundary:

- decide whether browser testing is a required repository verification dependency, an optional local test, or a separate environment-specific check;
- if required, make its dependency/setup and expected invocation reproducible;
- if optional, document that boundary so `verify` does not appear to prove browser behavior that it does not execute;
- preserve the existing distinction between tests that actually ran and planned/not-executed Evidence.

### Follow-up F — Final repository-integration gate

**Priority:** FINAL GATE

Before changing the repository after the above required cleanup/design decisions:

1. Re-fetch the current GitHub `main` identity and confirm the exact base commit/tree.
2. Re-run the complete standard suite plus relevant focused integrity/example tests.
3. Re-run Windows-like EOL validation if generator/build files changed.
4. Run relevant product tests and manual review for changed methodology links; do not claim automated methodology-integrity coverage.
5. Confirm generated catalogs/userscript are current and produce no unexpected diff.
6. Confirm historical/provenance surfaces no longer claim active authority where that authority has moved.
7. Build a new **cumulative** repository changeset/package from the then-current `main`; do not apply the incremental `v41 → v42` patch directly to a repository that is still at the earlier baseline.

### Sequencing guidance

Do not force all follow-ups into one implementation step.

Recommended order:

```text
A. legacy testing-planning authority cleanup
→ B. bootstrap design decision / cleanup scope
→ C. retire standing maps and use on-demand audit commands; keep direct owners in Helper
→ D. retire remaining methodology-specific tests and their active integrity claims
→ E. explicit browser-test verification boundary
→ F. fresh pre-integration verification and cumulative repository package
```

If B or C becomes materially larger than expected, it may be split into separate methodology-evolution steps rather than blocking unrelated cleanup indefinitely.
