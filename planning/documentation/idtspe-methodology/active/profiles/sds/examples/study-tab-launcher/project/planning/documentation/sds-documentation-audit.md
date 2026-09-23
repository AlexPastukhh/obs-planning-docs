# Study Tab Launcher — SDS Documentation Audit

Status: completed bounded audit and applied repair record. This file is
review/coordination evidence, not application semantic authority. Canonical
application meaning remains in the natural owners referenced below; current
continuation navigation belongs to Resolution Carry-Forward and the Evolution
Steps Map, not to this audit.

Update (2026-09-24): this is the historical review against methodology snapshot
`(94)`. The [later conformance review](sds-methodology-conformance-review.md)
uses snapshot `(100)` and supersedes current-status claims here. In particular,
Benefit-local `Responsibility Boundary / Constraints` is now owned by
`TM-APPLICATION-DEFINITION`; only this repository's exact-anchor convention is
local. `AUD-09` and `AUD-DIR-06` below retain their original audit provenance,
not an outstanding methodology-adoption request. The newer `TM-EVOLUTION-STEP`
requires complete bodies for each created/replaced owner in the next Step and
proportional bounded Impacts for other consequences. `AUD-DIR-01/02` remain
dated local planning choices, not a fixed Mini/Modular/Full or universal
nearest/farther workflow.

## Audit identity and scope

- Audit method: `UC-DOC-REVIEW-DOCUMENTATION` composed with current IDTSPE
  Core and the SDS profile Target Modules.
- Methodology source: `obs-planning-docs-main (94).zip`, SHA-256
  `4C9B48773F118890714E403118DD4D30900B5B5EC278016F7E2C821D13620CFD`,
  extracted at `C:\Users\alexa\Downloads\obs-planning-docs`.
- Repository revision at audit start:
  `67a4e18e3f4b8a77ae7cd6b32ef79deb82fb8eae` plus the current dirty working
  tree. The uncommitted representation is the subject actually reviewed.
- Primary scope: all 38 pre-existing Markdown files below
  `planning/documentation/`.
- Supporting scope: the root `README.md`, package manifest, current source and
  tests where needed to verify documentation claims.
- Exclusion: this audit file is not counted as an application owner or as one
  of the 38 subject files.

## Methodology bound for the review

The audit used the current command/use-case route, SDS responsibility/registry
maps, representation placement rules and these owner contracts:

- `TM-APPLICATION-DEFINITION`, `TM-FEATURE`, `TM-SCENARIO-PLANNING` and
  `TM-SCREEN`;
- `TM-DOMAIN-DISCOVERY`, `TM-DOMAIN-OWNER`, `TM-IMPLEMENTATION-SLICE`,
  `TM-SLICE-OWNER` and `TM-SHARED-IMPLEMENTATION-CAPABILITY`;
- `TM-EVOLUTION-STEP` and `TM-EVOLUTION-STEPS-MAP`;
- `TM-PROTOTYPE` and `TM-PRACTICAL-TEST`;
- Core Unit completeness/disposition, Requirement ownership, Q/R/P lifecycle,
  Proposal/Decision lifecycle and Resolution Carry-Forward contracts.

Two rules are decisive for the findings:

1. every formed Target Module instance exposes or explicitly dispositions its
   complete Module-defined Result Unit inventory; a `NEW`/`CHANGED` future
   owner inside an Evolution Step uses the ordinary complete target-owner body;
2. durable Carry-Forward is required when a multi-item, cross-owner work
   context must survive sessions and is not already discoverable together.

## Selected user refinements not fully owned by the reviewed methodology yet

The repair plan must distinguish the current methodology baseline from
explicit USER-selected refinements. The following are binding constraints for
repairing this repository, but this audit does not pretend they are already
universal methodology rules. Their durable reusable owner should eventually be
the methodology itself when the USER updates it.

| Directive | Selected repair meaning | Relation to current methodology |
|---|---|---|
| `AUD-DIR-01 — Horizon-proportional Step depth` | Treat the nearest selected implementation-bound Step as a pre-implementation plan and deepen materially created/replaced owners into complete Target Owner Bodies. Keep farther concrete Steps impact-first until their target state needs deeper resolution. | Compatible extension: current `TM-EVOLUTION-STEP` allows shallow Impacts and complete bodies when sufficiently resolved, but does not currently mandate this nearest/farther default. |
| `AUD-DIR-02 — Far-step impact informs near-step planning` | For every concrete farther unrealized Step, retain proportional Step-side impacts for every materially affected Scenario/Screen/Domain/Slice/Shared subject so the nearest Step can be planned against known evolution pressure. | Strengthens the allowed proportional practice. It does not admit vague ideas or require invented detail. Feature remains the special case governed by its complete-body rule. |
| `AUD-DIR-03 — Complete current-owner reverse projection` | Every current realized owner references every concrete unrealized Step that materially affects it, independent of candidate/selected/conditional/deferred position and distance. | Already required by the shared Current-Owner Evolution Impact Projection Contract; retained here because it is central to the USER's planning model. |
| `AUD-DIR-04 — Separate unrealized and realized representation` | Store not-yet-realized Step authorities below `evolution/unrealized/` and compact realized lineage below `evolution/realized/`. Planning position remains explicit inside each unrealized Step/Map; folder placement does not imply selection. | Representation choice permitted by P-14; this physical split is USER-selected rather than a mandatory SDS layout. |
| `AUD-DIR-05 — No obsolete target bodies in realized lineage` | On proof/materialization, remove former future Target Owner Bodies from the retained Step representation; keep only independently useful transition/decision lineage, direct predecessor navigation, materialized-owner links and residual Evidence/revalidation boundaries. | Implements the existing no-competing-current-owner/post-realization rule with a stricter local representation policy. |
| `AUD-DIR-06 — Benefit constraint addressability` | Keep `Responsibility Boundary / Benefit Constraints` and permit downstream links to an exact boundary/constraint when only part of a Benefit is realized. | USER-selected forward methodology refinement already applied locally; tracked by `AUD-09` until the methodology owner adopts it. |

`AUD-DIR-01/02` do not mean “all distant plans must be detailed.” They mean
that every **concrete and material** known future effect is represented deeply
enough to constrain nearer planning. Unformed speculation remains Proposal or
Q/R/P, and unknown owner outcome remains `OPEN` rather than an invented body.

## Audit questions

1. Which SDS Target Module or non-owner representation role naturally explains
   every documentation file?
2. Does every formed Target contain/disposition its complete Result Unit
   inventory and obey current/future temporal authority?
3. Are Requirements, Expected Errors, Benefits and target-state bodies owned
   once and linked from consumers without semantic duplication?
4. Are material open Questions/Q/R/P, accepted Decisions and Evidence Needs
   durably discoverable without moving their canonical meaning out of natural
   owners?
5. Are supporting/provenance/navigation files still needed, reachable and
   explicitly non-authoritative, or should their meaning be embedded, moved or
   retired?
6. Do links, identifiers, tables and code/test claims remain mechanically and
   semantically coherent?
7. Is the resulting set safe to present as a methodology example for another
   application?

## Plan and completion

| Phase | Check | Status |
|---|---|---|
| A | Bind review/Core/SDS methodology and complete Target Module inventory | COMPLETE |
| B | Classify every file by role, consumer and natural owner | COMPLETE |
| C | Check every owner family against its Result Unit/content contract | COMPLETE |
| D | Check current/future, upstream/downstream and cross-owner traces | COMPLETE |
| E | Check Q/R/P, Proposal, Decision, Evidence and carry-forward representation | COMPLETE |
| F | Review navigation, provenance and compatibility artifacts for need/placement | COMPLETE |
| G | Run links/anchors/IDs/coverage and proportional source/test evidence | COMPLETE |
| H | Disposition findings and state example-readiness | COMPLETE |

## Executive conclusion

**Example-readiness: READY as a documentation-structure SDS example, with
explicitly open realization and installed-evidence state.**

The current-state owner network is substantially sound and is already a useful
positive example: Application → Benefit → Feature/Scenario → Domain/Slice/Shared
traces are explicit, current versus future authority is mostly clear, and
mechanical navigation is clean. All 31 current Feature Behavior Steps and all
15 Scenario Requirements are represented in their corresponding Slice owners.

The repair has removed the concentrated structural weakness: the selected
nearest Step now owns complete ordinary Target bodies for the owners it will
create/replace, the Map exposes canonical position/completeness/readiness,
resolution state has natural Q/R/P and Decision owners plus one projection,
and real-system evidence has Practical Test owners with truthful `OPEN`
results. Realized lineage is physically separated and compact.

This readiness does not assert that the application or selected Step is fully
proved. `P-STL-HANDOFF-01` remains open and both Practical Tests still require
real installed execution. Their explicit ownership is part of the example,
not hidden green status.

## Findings register

| ID | Severity | Verified finding | Natural owner / narrow repair route | Status |
|---|---|---|---|---|
| `AUD-01` | HIGH | The active Evolution Step hosted its Target Feature Body under `RU-EVO-02` and supplied incomplete Feature, Domain, Slice and Scenario bodies. | Rebuilt the Step through `TM-EVOLUTION-STEP` plus each affected Target Module; current owners remain current-only. | CLOSED |
| `AUD-02` | HIGH | The Evolution Steps Map did not project canonical position/concern/completeness/start-readiness dimensions. | Rebuilt the active row from corrected `RU-EVO-01/03/06`; realized lineage remains compact. | CLOSED |
| `AUD-03` | HIGH | Durable resolution state lacked a compact projection and the coordinator race lacked durable Q/R/P identity. | Added natural-owner Q/R/P and Decision anchors plus reference-only `resolution-carry-forward.md`. | CLOSED; underlying Problem remains `OPEN` |
| `AUD-04` | HIGH | Pending installed evidence had no `TM-PRACTICAL-TEST` owner. | Added two bounded Practical Test Targets with truthful `OPEN` results. | CLOSED; test execution remains `OPEN` |
| `AUD-05` | MEDIUM | Four `scenario-design/*` files were ambiguous selected-decision substitutes. | Retained qualifying Decisions in natural owners, projected them from Carry-Forward and retired the four files. | CLOSED |
| `AUD-06` | MEDIUM | `RU-EVO-05` mixed stable proof obligations with exact implementation/test tasks. | Restated stable transition/proof obligations and routed installed cases to Practical Test. | CLOSED |
| `AUD-07` | MEDIUM | Coordinator evidence wording was inconsistent and too absolute. | Consolidated evidence/status in `P-STL-HANDOFF-01`; other owners link with local consequence only. | CLOSED |
| `AUD-08` | LOW | `slice-strategy.md` had no demonstrated current consumer. | Removed the compatibility file after preserving its material boundary Decision in natural owners. | CLOSED |
| `AUD-09` | LOW | `Responsibility Boundary / Benefit Constraints` is a useful user-selected forward extension not yet owned by the reviewed methodology. | Retained and explicitly marked as a local forward methodology refinement. | DEFERRED to methodology owner |
| `AUD-10` | LOW | The Screen no-impact Unit lacked explicit `OMITTED` disposition. | Added the disposition while retaining its reason. | CLOSED |

## Finding detail

### AUD-01 — Incomplete and incorrectly hosted future Target Owner Bodies

Verified against `TM-EVOLUTION-STEP`:

- a `NEW` or `CHANGED` Feature requires one complete ordinary `TM-FEATURE`
  Feature Definition;
- Feature future meaning is not an `RU-EVO-02` Impact item;
- Scenario/Screen/Domain/Slice/Shared future meaning may remain a proportional,
  intentionally shallow `RU-EVO-02` Impact; a complete Target Owner Body is
  optional until the future owner-local state is sufficiently resolved or the
  represented route needs it;
- once a Step explicitly declares a Target Owner Body, that body uses the
  owner's ordinary complete Target Module contract rather than a shortened
  look-alike.

Therefore the methodology does **not** require complete Domain/Slice/Scenario
bodies for every distant affected owner. A useful planning-depth policy is to
keep bounded Impacts for concrete farther Steps and deepen the nearest
implementation-bound Step into complete bodies for the owners it will
materialize. Current-owner reverse Evolution Impact Units should reference
every concrete unrealized Step that materially affects them, regardless of
whether the Step is selected, candidate, conditional or deferred; vague ideas
without concrete Step identity remain excluded.

The active Step currently places all future bodies below `RU-EVO-02`. Its
Target Feature Body has intent/result plus an unaddressed numbered list, but no
complete `RU-FEAT-01..06`, Feature Data Objects, `FBS-*` table, addressable
`BR-*`, behavior Expected Errors, Feature/Slice boundary or Evolution Impact
disposition. The Target Domain and Target Slice bodies likewise omit their
complete owner Units and addressable `IR-*` contracts. Four Scenario
replacements are represented as one common suffix rather than four complete
`TM-SCENARIO-PLANNING` bodies with their own `SPS-*`, `SR-*`, impact and
journey-realization-concern results.

Required repair shape:

```text
RU-EVO-01
  Step frame + Driven By + Entering From
  index of changed owner bodies

Step-owned Target Feature Body (outside RU-EVO-02)
  complete ordinary TM-FEATURE body

RU-EVO-02
  bounded Scenario/Domain/Slice impacts
  one complete Target Scenario Body per replaced Scenario
  one complete Target Domain Body
  one complete Target Slice Body

RU-EVO-03..06
  concerns, materialization, transition/proof obligations,
  exact completeness and start-readiness conclusions
```

Until that repair is complete, `Planning Completeness` must be `INCOMPLETE`.
Current owners must remain unchanged because the Step is not realized.

### AUD-02 — Evolution Map projection is not the canonical SDS projection

The active table uses `Entering From | Planning | Realization |
Materialization`. The current Map contract instead calls for independent
projection of:

```text
Step
Planning Position
Change Surface / Role
Principal Target Owners / Target Resolution
Enters From
Step-wide Implementation Concerns
Planning Completeness
Realization Start Readiness
```

The current prose also mixes “complete enough to start,” “ready after the race
is fixed,” and “or equivalent ownership established as part of this Step.” A
Step may be planning-complete while a predecessor is unrealized, and `READY`
is not realization or proof completion, but the two required conclusions must
still be exact. After `AUD-01`, the Step must expose `INCOMPLETE | COMPLETE`
and `BLOCKED | READY` separately, with reasons; the Map only projects them.

The six realized-lineage files and the realized-lineage table are valid: each
is compact, points to materialized owners, preserves direct predecessor
navigation and does not retain competing current Target Bodies.

### AUD-03 — Carry-Forward and natural-owner Q/R/P/Decision identity are missing

The durable threshold is crossed because the work survives sessions, spans
several owners and contains multiple material continuation items that are not
discoverable together:

- the open acknowledgement/redemption race;
- several real-installed Evidence Needs across file/project/trust journeys;
- the active future Step and its proof/materialization dependencies;
- accepted non-obvious design selections currently retained in four provenance
  files.

Create one application-scope projection, recommended path
`planning/documentation/resolution-carry-forward.md`. It must contain compact
entries (`ID/ref`, kind, subject/natural owner, status, blocking position,
carry-forward reason/reconsider condition and canonical link), not copied
semantic bodies.

The coordinator defect should first receive one stable Problem/Q/R/P identity
at its smallest natural owner:
`shared/prepared-project-handoff.md`, attached to
`IR-SHARED-STL-HANDOFF-04`. The project Feature, active Step, Map and
Carry-Forward should link to that item rather than repeat subtly different
prose.

Candidate accepted Decision anchors to review for material retention include:

| Candidate subject | Natural owner |
|---|---|
| one file-context Feature/Slice with separate one/set entries and action-owned tab policy | `features/open-linked-file-context.md` / its `RU-FEAT-05` boundary |
| neutral exact project selector with one implicit `.zip` candidate | `domain/local-project-selector.md` and the adaptive-project Feature |
| sibling/archive and configured-parent publication with no merge/overwrite | archive/trusted Slice plus safe-publication Shared owner |
| token-only prepared handoff and coordinator-owner acknowledgement | prepared-handoff Shared owner |
| Workspace Trust remains user/VS Code authority | Application Benefit boundary plus affected Feature owners |

Only choices whose rationale/revalidation value remains material should become
explicit durable Decisions. The Carry-Forward should include only Decision
anchors needed to understand surviving open/residual state, not every closed
historical selection.

### AUD-04 — A Practical Test Target is materially applicable

The current owners repeatedly state that browser clipboard permission,
external-protocol confirmation, Windows foreground behavior, multi-window
routing/modal placement, dirty-editor cancellation and Workspace Trust require
live installed observation. Every Scenario also carries an E2E Proof Intent.

Those are not merely automated Exact checks: the real installed subject and
environment are necessary to answer the acceptance question. That satisfies
the `TM-PRACTICAL-TEST` activation gate. Scattered E2E prose is not a complete
Practical Test result.

Form the smallest coherent real-subject inquiry or inquiry set. A reasonable
first target is an installed ChatGPT/Tampermonkey/browser/Windows/VS Code
handoff acceptance target with:

- `RU-PTEST-01`: exact real subject, property and why real observation is
  needed;
- `RU-PTEST-02`: representative file/project/trust/dirty-state observation
  plan and version/environment boundary;
- `RU-PTEST-03`: `OPEN` until observations actually exist, then Evidence links,
  limits and interpretation.

Do not relabel the automated suite as `TM-PRACTICAL-TEST`; it remains Core
Exact Evidence. No Prototype Target is currently required because no material
question needs a partial/simulated subject before the real implementation.

### AUD-05 — Design-selection provenance is an ambiguous Decision substitute

The four `scenario-design/*` files are honest about being non-authoritative,
but “selected conclusions retained for review” are durable Decision-like
meaning. They lack stable Decision identity, `Addresses`, explicit selected
proposal/alternative, concise rationale separation, `Integrated Into`, review
provenance and `Reconsider When`. Most selected content is already restated in
current owners, leaving the files as manually maintained shadow summaries.

For each conclusion:

```text
non-obvious rationale/revalidation value remains
→ explicit Decision anchor at the natural owner

only current selected result remains useful
→ keep normalized owner Result Content; drop duplicate provenance prose

only navigation remains useful
→ generated/index reference, not a hand-maintained semantic summary
```

### AUD-06 — Transition proof obligations and Exact work are mixed

The active Step's `RU-EVO-05` includes instructions such as “add tests” and
enumerates literal cases. `RU-EVO-05` should own one-time transition/proof
must-holds; literal test files/cases and implementation tasks belong to Core
Exact Realization. Keep durable properties such as “open failure closes
nothing,” “each callback revalidates exact root,” “partial cleanup preserves a
successful replacement open,” and “installed multi-window observation must
include dirty cancellation.” Route their exact implementation to Exact and the
real-environment observation to the Practical Test owner from `AUD-04`.

### AUD-07 — Current evidence supports a flaky race, not one fixed suite result

Audit evidence on 2026-09-23:

- one complete `npm.cmd test` run: 87 tests, 86 passed, 1 skipped, 0 failed;
- 20 focused runs of
  `out/test/shared/prepared-project-handoff/projectArrivalServer.test.js`: 9 passed and 11
  failed;
- failures expected HTTP `200` but observed `422` at the duplicate focus
  acknowledgement after redemption ordering.

The semantic conclusion in the current Shared/Feature owners is correct: the
ownership race is real and no duplicate project effect was observed. The
wording “the full-suite and isolated runs both reproduce” is too snapshot-like
for a flaky condition and can become false on any one run. Use the canonical
Problem from `AUD-03` plus Evidence references/status; other owners should say
that current repeated evidence demonstrates nondeterminism.

### AUD-08 — Retired Slice Strategy compatibility file has no demonstrated consumer

`slice-strategy.md` correctly denies current authority, but the repository has
no inbound link to it except the documentation index. Its current content is
fully available from each Feature's `RU-FEAT-05` and the ownership map. Keeping
it in an example set suggests that retired Target families deserve current
placeholder files. Remove it after checking external consumers, or place it in
explicit historical material outside current SDS navigation.

### AUD-09 — Application Benefit constraint slot is a controlled extension

The Application Definition's Benefit contracts are coherent and substantially
better than the earlier loose prose: Planning Position, User Need, User
Receives, boundary/constraints and exact anchors are clear. However,
`Responsibility Boundary / Benefit Constraints` is a user-selected forward
extension that is not yet named by the reviewed methodology snapshot. Preserve
it as a deliberate local extension, but do not present that exact slot name as
current universal SDS syntax until the methodology owner is updated and this
application is revalidated against it.

### AUD-10 — Screen Evolution Impact needs an explicit omission disposition

The current Screen correctly concludes that the superseded-window Step changes
no widget composition. Because no concrete unrealized Step materially affects
the Screen, `TM-SCREEN` requires `RU-SCREEN-03` to be `OMITTED` with a concise
reason. The existing explanation is the right reason; only the explicit Unit
disposition is missing. Do not retain the Step as an active reverse-impact
entry merely for completeness.

## Evolution repair specification

### Current inventory and selected target layout

The repository has exactly one unrealized Step and six realized lineage Steps.
`AUD-DIR-04/05` were applied as this resulting layout:

```text
planning/documentation/
  evolution-steps.md
  evolution/
    unrealized/
      close-superseded-project-windows.md
    realized/
      trusted-project-copy.md
      project-arrival-polling.md
      defer-vscode-handoff.md
      reuse-existing-trusted-project.md
      activate-vscode-before-project-launch.md
      focus-coordinator-owner-before-confirmation.md
```

The folder is representation/navigation only:

- `unrealized/` may contain selected, candidate, conditional or deferred
  concrete Steps; each Step and the Map still state its exact Planning
  Position;
- `realized/` contains lineage, not current semantic owner bodies;
- `evolution-steps.md` remains the registry/coordination owner and keeps active
  future projection separate from compact realized lineage;
- the applied moves updated owner reverse-impact links, direct `Entering From`
  links, Map/index links and root README links.

The six current realized files already contain no Feature/Domain/Slice/Scenario
Target Bodies. Keep their compact transition statement, direct predecessor,
materialized-owner links and residual Evidence boundary; do not remove those
links merely because the bodies are gone.

### Planning-depth policy to materialize

Use this decision path for every concrete unrealized Step:

```text
material Feature behavior is NEW/CHANGED
→ complete ordinary Target Feature Body is required
→ all TM-FEATURE Units remain visible even when some are OPEN/OMITTED

material Scenario/Screen/Domain/Slice/Shared effect is known
→ create one bounded RU-EVO-02 Impact item for the smallest useful subject

farther Step + shallow owner-local resolution is sufficient
→ retain proportional Impact, uncertainty/evidence basis and recheck trigger
→ do not manufacture a Target Owner Body

nearest implementation-bound Step
OR durable owner-local target meaning is sufficiently resolved
OR CREATE/REPLACE/RETIRE materialization is planned
→ form the complete ordinary Target Owner Body

owner is unaffected
→ no Impact item
→ current owner's reverse-impact Unit is OMITTED for that Step with reason

owner outcome is not known
→ keep the Impact subject/ownership OPEN
→ supporting discovery may resolve it later
```

A complete Target Owner Body means complete contract shape and Unit
dispositions, not exhaustive prose. Distance may reduce resolved detail, but it
must not make a formed body structurally incomplete.

### Exact repair contract for the one active Step

`EVO-STL-CLOSE-SUPERSEDED-PROJECT-WINDOWS` is the nearest selected Step. It is
the repository's pre-implementation plan and must be repaired as follows.

#### `RU-EVO-01` and Target Feature

- retain Step identity, Expansion kind, Benefit/constraint `Driven By`, direct
  realized predecessor and changed-owner index;
- move `F-STL-APPLY-PROJECT-SUCCESSION` out of `RU-EVO-02`;
- form one complete step-owned `TM-FEATURE` body:
  - `RU-FEAT-01`: identity, intent, principal result and semantic entry;
  - `RU-FEAT-02`: request/manifest-derived candidate/confirmation/outcome FDOs
    only where behavior-facing semantic data is material;
  - `RU-FEAT-03`: addressable `FBS-*`, `BR-*` and Feature Expected Errors with
    step/error/requirement mappings;
  - `RU-FEAT-04`: Feature-local implementation concerns or explicit omission;
  - `RU-FEAT-05`: exact boundary with the new succession Slice and current
    project-opening peer Features;
  - `RU-FEAT-06`: future-body disposition (`OMITTED` for current-owner reverse
    projection inside a Step-owned future body, with reason).

#### `RU-EVO-02` bounded Impact collection

Create only material items and give each one an explicit subject:

1. `D-STL-PROJECT-SUCCESSION-MANIFEST` — complete Target Domain Body because
   the nearest Step plans to `CREATE` this owner: `RU-DOWN-01..03`, Domain-local
   `IR-*`, Feature behavior realization and future-body Evolution Impact
   omission.
2. `SL-STL-APPLY-PROJECT-SUCCESSION` — complete Target Slice Body because the
   nearest Step plans to `CREATE` it: `RU-SOWN-01..03`, behavior/SR realization,
   durable Slice-local `IR-*`, Domain/Shared bindings and future-body impact
   omission.
3. Four separately keyed Scenario impacts — one complete replacement Target
   Scenario Body each for selected project, folder, ZIP and trusted-copy
   journeys: `RU-SCEN-01..03`, addressable `SPS-*`/`SR-*`, Benefit closure,
   journey concerns and future-body reverse-impact omission.
4. `SH-STL-PREPARED-PROJECT-HANDOFF` — add a bounded Shared Impact because the
   Step reuses/extends/revalidates its coordinator surface. Resolve explicitly:
   - current Shared contract unchanged → shallow Impact/revalidation only, no
     Target Shared Body and no `REPLACE` materialization;
   - durable capability contract/bindings change → complete Target Shared Body
     plus `REPLACE` in `RU-EVO-04`.

Do not create Feature Impact items. Do not create Screen/current Feature/current
Slice items merely to say they are unaffected. The current Screen's
`RU-SCREEN-03` becomes explicitly `OMITTED` under `AUD-10`.

#### `RU-EVO-03..06`

- `RU-EVO-03`: reference the natural-owner coordinator Problem/Q/R/P and keep
  only cross-owner sequencing/integration/proof pressure;
- `RU-EVO-04`: list each exact semantic transition separately: one Feature,
  one Domain, one Slice and four Scenario replacements, plus Shared `REPLACE`
  only if the Shared decision above selects a changed durable body;
- `RU-EVO-05`: retain transition-wide must-holds and proof properties, not
  literal “add test X” tasks/cases; route exact implementation to Core Exact
  and real-environment observation to Practical Test;
- `RU-EVO-06`: while the bodies/Shared decision remain unresolved, state
  `Planning Completeness: INCOMPLETE` and `Realization Start Readiness:
  BLOCKED`; recompute both independently after repair.

### Farther-Step application rule

No farther unrealized Step currently exists, so `AUD-DIR-01/02/03` cannot yet
be demonstrated by a second application Step. When the first farther concrete
Step is added:

1. give it truthful Planning Position/horizon and direct semantic `Entering
   From` relations;
2. add every material Scenario/Screen/Domain/Slice/Shared subject as a bounded
   Step-side Impact, even when shallow;
3. add reverse references from every materially affected current owner without
   copying future bodies;
4. use those impacts as input when validating the nearest Step's boundaries,
   change isolation and avoidable migration;
5. deepen an Impact into a complete Target Owner Body only when its future
   owner-local state becomes sufficiently resolved/needed;
6. do not treat a technical dependency as semantic `Entering From` and do not
   promote vague ideas to Steps merely to populate the map.

### Post-realization compaction rule

After realization, required proof/revalidation and owner materialization:

1. materialize only what was actually realized into current natural owners;
2. remove current-owner active reverse-impact entries for that Step;
3. remove the Step from the active future/readiness Map projection;
4. move the compact Step lineage to `evolution/realized/`;
5. remove former future Target Owner Bodies from the lineage representation;
6. retain only independently useful transition/Decision rationale, direct
   predecessor, materialized-owner links and residual Evidence/revalidation;
7. retain a compact realized Map row only while later `Entering From` or
   navigation actually depends on it.

## Target Module coverage and absence review

| SDS/Core Target Module | Current representation | Audit conclusion |
|---|---|---|
| `TM-APPLICATION-DEFINITION` | one Application owner | Required and conformant for this repository; `AUD-09` remains an explicitly marked local forward refinement. |
| `TM-FEATURE` | five current Feature owners plus one complete future Target body in the active Step | Required; current and future temporal authority is separated and complete. |
| `TM-SCENARIO-PLANNING` | five current Scenario owners plus four complete replacement Target bodies in the active Step | Required; current journeys remain authoritative until Step realization. |
| `TM-SCREEN` | one compact Screen owner | Required and correctly compact; no one-file-per-screen expansion is justified. |
| `TM-DOMAIN-DISCOVERY` | no persistent artifact | Correct absence: transient discovery has no current independent continuation value. Future succession Domain work may use it transiently if needed. |
| `TM-DOMAIN-OWNER` | four Value Object owners | Required and valid; each owns non-obvious reusable value semantics plus Domain-local IR and behavior mappings. |
| `TM-IMPLEMENTATION-SLICE` | no persistent discovery plan | Correct absence for realized current Slices. The active Step may invoke it transiently if needed to complete its Target Slice Body. |
| `TM-SLICE-OWNER` | five durable Slice owners | Required and valid; all 31 current FBS and 15 current SR references are covered. |
| `TM-SHARED-IMPLEMENTATION-CAPABILITY` | three Shared owners | Required and valid; each has multiple real consumers, bindings and Shared-local IR. |
| `TM-EVOLUTION-STEP` | one active Step under `unrealized/` plus six compact artifacts under `realized/` | Required; active target state is complete for the first increment and realized lineage has no competing future bodies. |
| `TM-EVOLUTION-STEPS-MAP` | one Map | Required; canonical active projection and compact lineage are current. |
| `TM-PROTOTYPE` | absent | Correct absence: no current partial/simulated inquiry crosses its gate. |
| `TM-PRACTICAL-TEST` | two bounded Practical Test owners | Required and formed; result state remains truthfully `OPEN` until installed observation. |
| Core `TM-PRE-UPDATE-PLAN` | no dedicated durable file | Correct for this audit; the audit itself records its bounded work plan. |
| Core `TM-EXACT-REALIZATION` | source/tests/package representation | Present through implementation-native work/evidence; exact tasks must not be moved into semantic owners. |

No Aggregate Root, generic Test Strategy, retired Requirement owner,
Cross-Cutting Concern owner or separate Slice Strategy owner is justified.

## File-by-file role and disposition

`KEEP` means the file has a justified current role in substantially the right
form. `REPAIR` means the role is justified but the form/contract is not.
`MIGRATE/RETIRE` means useful meaning must first move to a natural owner or
explicit history before the supporting file is removed.

| File | SDS / representation role | Need and form verdict |
|---|---|---|
| `application-definition.md` | current `TM-APPLICATION-DEFINITION` owner | **KEEP**; coherent upstream Benefits/RLS/concept/feasibility; mark forward slot extension (`AUD-09`). |
| `features/open-linked-file-context.md` | current `TM-FEATURE` owner | **KEEP**; complete behavior, errors, concern, boundary and omission. |
| `features/open-linked-folder-window.md` | current `TM-FEATURE` owner | **KEEP**; concise complete Feature body. |
| `features/extract-open-archive.md` | current `TM-FEATURE` owner | **KEEP**; safe archive behavior remains Feature-owned rather than Domain/Shared duplication. |
| `features/open-local-project.md` | current `TM-FEATURE` owner | **KEEP**; central current race reference needs canonical Q/R/P link (`AUD-03/07`). |
| `features/copy-trusted-project.md` | current `TM-FEATURE` owner | **KEEP**; authority/trust boundaries and Slice boundary are explicit. |
| `scenarios/open-selected-study-files.md` | current `TM-SCENARIO-PLANNING` owner | **KEEP**; complete journey; route live Evidence to Practical Test (`AUD-04`). |
| `scenarios/open-selected-folder.md` | current `TM-SCENARIO-PLANNING` owner | **KEEP**; future reverse link is correct; route live Evidence to Practical Test. |
| `scenarios/open-downloaded-archive.md` | current `TM-SCENARIO-PLANNING` owner | **KEEP**; current/future boundary correct; route live Evidence to Practical Test. |
| `scenarios/open-selected-project.md` | current `TM-SCENARIO-PLANNING` owner | **KEEP**; race prose should become a Q/R/P reference; route live Evidence to Practical Test. |
| `scenarios/copy-trusted-project.md` | current `TM-SCENARIO-PLANNING` owner | **KEEP**; trust/modal journey is Scenario-natural; route live Evidence to Practical Test. |
| `screens/chatgpt-launcher-widget.md` | current `TM-SCREEN` owner | **KEEP / REPAIRED**; spatial ownership is correct and `RU-SCREEN-03` explicitly dispositions no impact as `OMITTED`. |
| `domain/local-file-target.md` | current `TM-DOMAIN-OWNER` Value Object | **KEEP**; canonical equality/containment semantics and FBS realization justify durability. |
| `domain/local-folder-target.md` | current `TM-DOMAIN-OWNER` Value Object | **KEEP**; shared reusable directory identity is independently meaningful. |
| `domain/local-zip-archive-target.md` | current `TM-DOMAIN-OWNER` Value Object | **KEEP**; source identity is correctly separate from publication. |
| `domain/local-project-selector.md` | current `TM-DOMAIN-OWNER` Value Object/policy | **KEEP**; deterministic exact-candidate policy is non-obvious and reused. |
| `slices/open-linked-file-context.md` | current `TM-SLICE-OWNER` | **KEEP**; complete end-to-end behavior/SR mapping and durable IR. |
| `slices/open-linked-folder-window.md` | current `TM-SLICE-OWNER` | **KEEP**; small but independently useful whole-path owner. |
| `slices/extract-open-archive.md` | current `TM-SLICE-OWNER` | **KEEP**; destination/publication composition is Slice-natural. |
| `slices/open-local-project.md` | current `TM-SLICE-OWNER` | **KEEP**; stable adaptive orchestration/dependency boundary; link canonical race Q/R/P. |
| `slices/copy-trusted-project.md` | current `TM-SLICE-OWNER` | **KEEP**; machine authority/confirmation/publication composition is durable. |
| `shared/local-path-authority.md` | current `TM-SHARED-IMPLEMENTATION-CAPABILITY` | **KEEP**; five consumers and capability-local mechanics justify extraction. |
| `shared/safe-project-publication.md` | current `TM-SHARED-IMPLEMENTATION-CAPABILITY` | **KEEP**; three consumers and bounded publication IR justify extraction. |
| `shared/prepared-project-handoff.md` | current `TM-SHARED-IMPLEMENTATION-CAPABILITY` | **KEEP / REPAIRED**; natural owner now contains canonical `P-STL-HANDOFF-01` and durable handoff Decision. |
| `evolution/unrealized/close-superseded-project-windows.md` | selected unrealized `TM-EVOLUTION-STEP` | **KEEP / REBUILT**; complete Target Feature/Domain/Slice/Scenario bodies, exact materialization set, stable proof obligations and readiness are owned here. |
| `evolution/realized/trusted-project-copy.md` | compact realized Step lineage | **KEEP**; required by successor chain/current rationale, no competing target body. |
| `evolution/realized/project-arrival-polling.md` | compact realized Step lineage | **KEEP**; direct predecessor lineage and evidence boundary remain useful. |
| `evolution/realized/defer-vscode-handoff.md` | compact realized Step lineage | **KEEP**; transition identity remains required by later `Entering From`. |
| `evolution/realized/reuse-existing-trusted-project.md` | compact realized Step lineage | **KEEP**; material branch-decision lineage without duplicating current Feature body. |
| `evolution/realized/activate-vscode-before-project-launch.md` | compact realized Step lineage | **KEEP**; focus/launch transition remains a direct semantic predecessor. |
| `evolution/realized/focus-coordinator-owner-before-confirmation.md` | compact realized Step lineage | **KEEP / REPAIRED**; lineage references the canonical Q/R/P owner. |
| `evolution-steps.md` | `TM-EVOLUTION-STEPS-MAP` | **KEEP / REBUILT**; canonical active columns/readiness and compact realized lineage. |
| `resolution-carry-forward.md` | Core Resolution Carry-Forward projection | **KEEP** while listed open/evidence/Decision state qualifies; references natural owners only. |
| `practical-tests/installed-browser-vscode-handoff.md` | `TM-PRACTICAL-TEST` owner | **KEEP**; current installed-system target/plan with truthful `OPEN` result. |
| `practical-tests/project-succession-multi-window.md` | `TM-PRACTICAL-TEST` owner | **KEEP**; Step-specific installed multi-window target/plan, blocked on implementation. |
| retired `scenario-design/*` (four files) | former selected-decision provenance | **REMOVED after migration**; qualifying Decisions now live in natural owners and Carry-Forward links them. |
| retired `slice-strategy.md` | former compatibility note | **REMOVED**; material Feature/Slice boundaries remain in their natural Feature Decisions/owners. |
| `README.md` | documentation navigation/projection | **KEEP / UPDATED**; indexes final owner, evolution, resolution and evidence representation only. |

## Cross-owner consistency results

### Verified strengths

- all five current Features expose complete `RU-FEAT-01..06` inventories;
- all five current Scenarios expose complete `RU-SCEN-01..03` inventories;
- the Screen, four Domain, five Slice and three Shared owners expose their
  complete Module-defined Unit inventories, including explicit Screen no-impact
  omission;
- all 31 `FBS-*` identities are referenced by their corresponding durable
  Slice owner;
- all 15 `SR-*` identities are referenced by their corresponding durable
  Slice owner;
- Domain tables distinguish `FULL`, `JOINT` and `PARTIAL` realization instead
  of claiming ownership of whole Feature behavior;
- Shared owners have actual multi-consumer bindings and do not absorb Domain,
  Feature or Slice semantics;
- Expected Errors remain Feature behavior identities and are linked from
  Domain/Slice/Shared realization requirements without inventing competing
  implementation-error families;
- every current owner dispositions the one concrete unrealized Step through a
  material reverse reference or explicit `OMITTED` reason and keeps current
  meaning authoritative until materialization.

### Verified temporal boundaries

- the Application Definition may state a selected unrealized Benefit;
- the active Step clearly warns that its behavior is not current;
- current Feature owners are not prematurely replaced by the peer succession
  Feature;
- six realized Steps are retained as compact lineage and route to materialized
  current owners;
- the Map does not copy full realized Target Bodies.

## Mechanical and executable evidence

Audit-time mechanical result:

| Check | Result |
|---|---:|
| Markdown files checked, including root README and this audit | 40 |
| Local file links checked | 758 |
| Broken local file links | 0 |
| Fragment links checked | 647 |
| Missing fragment targets | 0 |
| Explicit HTML IDs | 239 |
| Duplicate explicit IDs | 0 |

Executable evidence on 2026-09-23:

| Check | Result |
|---|---|
| TypeScript compile + full test command | passed in the observed run |
| Full run | 87 total; 86 pass; 1 skipped; 0 fail |
| Focused coordinator file, 20 repetitions | 9 pass; 11 fail |
| Focused failure | duplicate focus acknowledgement observed `422` where the test expects `200` |

Mechanical success supports representation integrity only; it does not negate
the semantic findings or replace the missing real-environment Evidence.

## Repair execution and revalidation result

All six planned repair phases were applied. Post-repair representation:

- 36 application/planning Markdown files below `planning/documentation/`
  excluding this audit, plus the root README;
- one complete selected Step under `evolution/unrealized/` and six compact
  lineage Steps under `evolution/realized/`;
- one canonical open Problem, five current accepted Decisions and one
  Step-owned accepted Decision, projected by Resolution Carry-Forward;
- two Practical Test owners whose result remains truthfully `OPEN`;
- no standalone `scenario-design/*` or `slice-strategy.md` artifact.

Post-repair mechanical result:

| Check | Result |
|---|---:|
| Markdown files checked, including root README and this audit | 38 |
| Local file links checked | 1089 |
| Broken local file links | 0 |
| Fragment links checked | 763 |
| Missing fragment targets | 0 |
| Explicit HTML IDs | 315 |
| Duplicate explicit IDs | 0 |
| Missing required Unit headings in current owner families | 0 |
| Current Feature Behavior Steps absent from Slice mappings | 0 of 31 |
| Current Scenario Requirements absent from Slice mappings | 0 of 15 |
| Active-Step Target owner Unit inventories | Feature 6/6; Domain 3/3; Slice 3/3; four Scenarios each 3/3 |
| Active-Step Impact subjects / materialization operations | 7 / 7 |

Post-repair executable revalidation on 2026-09-23:

| Check | Result |
|---|---|
| `npm.cmd test` | 87 total; 86 pass; 1 skipped; 0 fail |
| Focused coordinator file, 20 repetitions | 11 pass; 9 fail |
| Interpretation | Documentation changes did not regress the suite; `P-STL-HANDOFF-01` remains correctly `OPEN` and flaky. |

`AUD-01..08` and `AUD-10` are closed as documentation findings. `AUD-09` is
deferred only to the external methodology owner. Open application realization
and evidence work remains governed by the natural Q/R/P/Practical Test owners,
not by this audit.

## Applied repair order (historical plan)

### Phase 1 — Resolution state and evidence ownership

1. Add one stable coordinator Problem/Q/R/P at
   `shared/prepared-project-handoff.md`, attached to
   `IR-SHARED-STL-HANDOFF-04`, with status, evidence, affected owners and
   reconsider/closure condition.
2. Replace duplicated race prose in Feature/Scenario/Step/lineage/Map owners
   with links and only owner-local consequences.
3. Create one application-scope `resolution-carry-forward.md` projection for
   the coordinator Problem, surviving Evidence Needs and only those accepted
   Decision anchors required for re-entry.
4. Form the installed real-subject `TM-PRACTICAL-TEST` Target(s); keep
   `RU-PTEST-03` explicitly `OPEN` until actual observation exists.

Exit gate: surviving Q/R/P/Decision/Evidence state is discoverable from one
projection, while every detailed body remains at its natural owner.

### Phase 2 — Evolution representation structure

1. Create `evolution/unrealized/` and `evolution/realized/`.
2. Move the one selected active Step to `unrealized/` and the six compact
   lineage Steps to `realized/`.
3. Update all relative links in Step chains, current owners, Application
   Definition, documentation/root indexes, Map and Carry-Forward.
4. Preserve explicit Planning Position inside unrealized Steps/Map; never infer
   selection from the folder name.

Exit gate: zero broken file/fragment links; realized files contain no former
Target Owner Bodies; direct predecessor traversal still resolves end to end.

### Phase 3 — Nearest Step reconstruction

1. Apply the exact active-Step repair contract above.
2. Resolve whether prepared-handoff Shared meaning is unchanged/revalidated or
   durably changed/replaced.
3. Produce the complete Target Feature, Target Domain, Target Slice and four
   Target Scenario bodies with complete Unit inventories/dispositions.
4. Rewrite transition/proof obligations without exact implementation-task
   leakage.
5. Recompute Planning Completeness and Realization Start Readiness from the
   resulting Step rather than preserving the old labels.

Exit gate: every `CREATE/REPLACE/RETIRE` entry resolves to one coherent body or
an explicit unresolved/blocking position; Feature meaning is outside
`RU-EVO-02`; no affected owner has competing future bodies.

### Phase 4 — Map and reverse-impact reconciliation

1. Rebuild the active Map row using canonical columns: Step, Planning Position,
   Change Surface/Role, Principal Target Owners/Resolution, Enters From,
   Step-wide Concerns, Planning Completeness and Start Readiness.
2. Keep the realized section a compact lineage projection only.
3. Revalidate every current Feature/Scenario/Screen/Domain/Slice/Shared
   Evolution Impact Unit against the repaired Step:
   - include every material reverse reference;
   - remove “unaffected” pseudo-entries and use explicit `OMITTED` disposition;
   - never copy future Requirements/Target Bodies into current owners.

Exit gate: Step-side impacts and current-owner reverse projections agree on
subjects, planning position and depth.

### Phase 5 — Decision provenance and obsolete support cleanup

1. Review each `scenario-design/*` conclusion using the Decision retention
   gate.
2. Move only non-obvious durable choice/rationale/revalidation meaning to
   explicit Decision anchors in natural owners with `Addresses`, `Integrated
   Into`, review provenance and `Reconsider When` where material.
3. Add only qualifying Decision references to Carry-Forward.
4. Retire or reduce the four provenance files after their useful meaning has a
   canonical destination.
5. Check external consumers and retire `slice-strategy.md`; remove its index
   entry so a retired Target family is not taught as current structure.
6. Keep the Benefit constraint extension explicitly marked until methodology
   adoption, then remove the local-deviation note after revalidation.

Exit gate: no hand-maintained support file duplicates current semantic Result
Content or substitutes for a Decision lifecycle.

### Phase 6 — Final validation and example-readiness decision

1. Re-run complete Target/Result Unit inventory and disposition checks.
2. Re-run file links, anchors, unique IDs, table shape, FBS→Slice, SR→Slice,
   Domain/Shared realization and Expected Error mappings.
3. Run TypeScript compile, full tests and repeated focused coordinator tests;
   attach evidence to the canonical Problem/closure decision.
4. Execute the installed Practical Test plan and record actual environment,
   version, Evidence, limitations and interpretation.
5. Re-review current/future authority, Step compaction and Carry-Forward
   membership.
6. Mark example-readiness only after `AUD-01..04` are closed, the remaining
   findings are dispositioned and the documentation indexes expose only the
   final representation.

Exit gate: another application can copy the structure without learning an
incomplete Target body, a shadow Decision register, stale realized future
state or an unowned Evidence promise.

## Final audit statement

The repaired documentation is suitable as a compact copyable SDS structure
example: current semantic/implementation owners are explicit, the nearest
selected Step demonstrates complete pre-implementation target bodies, farther
planning policy is impact-first, realized lineage is compact, and open
resolution/evidence state is truthfully owned rather than hidden.

It is not an example of a fully green application release. The canonical
handoff Problem and installed Practical Test results remain open by design.
Closing those items requires code/installed-system work and subsequent natural
owner updates, not another wholesale documentation rewrite.
