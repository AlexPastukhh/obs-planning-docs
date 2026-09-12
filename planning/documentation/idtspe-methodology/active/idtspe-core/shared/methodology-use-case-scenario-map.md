# Methodology Use-Case Scenario Map

Status: active **design / evaluation / orientation** artifact; non-authoritative at runtime

Purpose: provide realistic scenarios of **working with the methodology itself**, decompose them into current Use Cases, and test whether the Use-Case topology is complete, non-duplicative and efficient.

Do not confuse these methodology-use scenarios with the SDS `Scenario` semantic/Target family.

## 1. Role

```text
realistic methodology-use scenario
→ decompose into existing Use Cases
→ inspect registry/process/component transitions
→ detect missing / overlapping / awkward responsibilities
→ improve Use Cases / registry guides / component contracts
→ rerun scenario as coverage/effectiveness test
```

A scenario is useful for:

1. **Use-Case discovery/design** — identify recurring methodology-use situations with independently useful Results.
2. **Integration testing** — verify that existing Use Cases compose without gaps/duplication.
3. **AI orientation** — show the overall shape of likely work so the system understands common transitions/re-entry without treating the scenario as a script.

A scenario is **not** runtime routing authority. If a scenario conflicts with a current Use Case/component contract, the current normative owner wins.

## 2. Evaluation Questions

For each scenario ask:

```text
Can the scenario be completed using only current Use Cases + reachable components?
Is any Use Case doing specialized planning work that belongs to TM/Lens/profile owners?
Is the same methodology action duplicated by several UCs?
Does a UC have an independently useful Result?
Can Broad Discussion remain lightweight when deeper structure is not useful?
Are registry scans targeted/lazy rather than exhaustive?
Are State/Result Units instantiated only when material?
Are re-entry/revalidation paths explicit enough without scenario-owned orchestration?
```

A rule needed only because the scenario itself says so is a warning: it may reveal a missing Use Case, missing registry guide, missing component applicability contract, or wrongly placed ownership.

## 3. Scenario Map

| ID | Methodology-use situation | Expected Use-Case decomposition | Main effectiveness check |
|---|---|---|---|
| `UCSM-01` | New work / clean context | `UC-DOC-USE-REPOSITORY-GUIDANCE` + `UC-IDTSPE-COMPOSE-CURRENT-WORK` | can work start from natural language without ceremony |
| `UCSM-02` | Resume existing planning after context/chat change | guidance UC + compose + maintain/revalidate as applicable | can current authority/state be restored without full reread |
| `UCSM-03` | Broad Discussion is enough | compose only | can always-on IDTSPE explicitly choose **no deeper structure** |
| `UCSM-04` | A bounded result/owner becomes useful | compose → Target Formation → TM registry if helpful | is Target creation usefulness-driven rather than automatic |
| `UCSM-05` | Need a reusable production method | compose → TM registry scan → selected TM | does UC route without duplicating TM production logic |
| `UCSM-06` | Need an evaluation perspective | compose → Lens registry scan → selected Lens | does UC choose perspective while Lens owns analysis/findings |
| `UCSM-07` | Need reusable engineering/theory guidance | compose → methodology/profile directory → guidance registry → detail entry | can only relevant theory be loaded rather than a mega-checklist |
| `UCSM-08` | Current meaning is distributed | `UC-IDTSPE-INTEGRATE-CURRENT-WORK` + `UC-IDTSPE-MAINTAIN-CURRENT-WORK-STATE` | is Checkpoint situational and sparse |
| `UCSM-09` | Finding/Evidence/upstream change makes work stale | revalidate (+ consistency process) | is revalidation narrow and dependency-aware |
| `UCSM-10` | Work moves toward Exact/materialization | compose → relevant readiness/TM/Lens/representation owners | is deeper work entered without a fixed phase gate |
| `UCSM-11` | Active profile contributes specialized components | compose → profile directory → profile registries | can generic IDTSPE UCs cover SDS without SDS-specific runtime UCs |
| `UCSM-12` | Change the methodology itself | Documentation maintenance UC + IDTSPE maintenance UC where component type is IDTSPE-specific | are methodology-maintenance vs planning semantics separated |

## 4. Canonical Working-Scenario Contract

The detailed scenarios below are the canonical **presentation / integration-test corpus** for common methodology work. They explain how current owners may compose; they do not create runtime routing, semantic authority, permission, or a second command ontology.

Every scenario inherits these current owners/contracts rather than restating them:

- [`planning/documentation/use-case-registry-map.md`](../../../../use-case-registry-map.md) and the selected current Use Case;
- the Contextual Methodology Application Contract;
- the current Proposal / Decision and Q/R/P lifecycle owners;
- Session interaction and mutation-authority rules;
- every selected Target Module, Lens, profile, Process and representation owner.

If scenario prose conflicts with a current semantic owner, **the semantic owner wins**. A material normative rule that exists only in a scenario is a defect: find the real owner, soften the scenario to illustration, or add/fix the missing owner.

### Canonical step shape

Each substantive step uses this explanatory shape:

```text
Trigger / Situation
AI Action
Why This Step
Method / Mechanics
Possible Result
Derived From / Owners
```

Canonical scenarios contain **no command IDs, command shortcuts, command bodies, Helper labels, or generated invocation text**. Tooling may derive command equivalents from the semantic references without changing the scenario prose.

A root scenario begins from the ordinary functional entry route. A focused scenario may start later only when it states the parent route / entry assumptions explicitly.

## 5. `SCN-01` ROOT — Я пришёл с задачей — постепенно разберём её от общего смысла до Exact

**Type:** ROOT  
**Normal entry:** USER request → Methodology Use-Case Registry Map → relevant scoped registry → selected Use Case(s).  
**Purpose:** demonstrate the default philosophy: start lightweight and deepen only where additional resolution is useful.

### Step `SCN-01-S1` — establish the smallest useful composition

**Trigger / Situation:** The USER brings a new concern; its useful planning depth is not known yet.  
**AI Action:** Route normally through the Use-Case Registry Map and compose the smallest useful current IDTSPE work.  
**Why This Step:** The methodology is always available but does not require structural ceremony when Broad Discussion is sufficient.  
**Method / Mechanics:** Resolve applicable Use Cases, keep only material state/components, and explicitly allow `Broad Discussion only` when no Target/Lens/persistence is useful yet.  
**Possible Result:** A bounded concern and a useful next question, with no unnecessary Target.  
**Derived From / Owners:** `UC-DOC-USE-REPOSITORY-GUIDANCE`, `UC-IDTSPE-COMPOSE-CURRENT-WORK`.

### Step `SCN-01-S2` — deepen meaning only when pressure appears

**Trigger / Situation:** A bounded behavior, owner, constraint, uncertainty, dependency, or proof concern becomes independently useful.  
**AI Action:** Form/reuse only the needed Target/State surface and consult the relevant Target Module/Lens/profile registry.  
**Why This Step:** Structure is justified by a useful result, not by elapsed time or a fixed phase sequence.  
**Method / Mechanics:** Progress proportionally through useful SDS planning depth: `PL-L0` behavior/owner meaning, `PL-L1` durable implementation/proof constraints, `PL-L2` implementation architecture/responsibility, `PL-L3` transient exact reasoning, `PL-L4` literal realization. Levels may overlap, be skipped, or reopen narrowly. When useful, AI may expose the smallest next methodology action without executing it; when continuation is requested, it performs the smallest useful ordinary action after re-evaluating current composition.  
**Possible Result:** One or more bounded semantic results at the depth needed now.  
**Derived From / Owners:** `UC-IDTSPE-COMPOSE-CURRENT-WORK`, `planning/documentation/idtspe-methodology/active/profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md`.

### Step `SCN-01-S3` — evaluate material surfaces

**Trigger / Situation:** A material Result Unit / decision surface exists.  
**AI Action:** Use the applicable Lens registry checkpoint(s) and selected evaluators proportionally.  
**Why This Step:** Cross-cutting concerns should challenge the actual current surface without becoming another semantic owner.  
**Method / Mechanics:** Use the Result Unit Opening/In-Unit/Closing applicability envelope; select zero or more additional Lenses as material and route Findings through current Core disposition.  
**Possible Result:** Current result meaning with material findings resolved/routed, or an explicit no-additional-lens outcome.  
**Derived From / Owners:** `planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md`, `planning/documentation/idtspe-methodology/active/idtspe-core/lenses/README.md`.

### Step `SCN-01-S4` — realize exactly when meaning is sufficient

**Trigger / Situation:** The selected meaning is sufficiently determined for a literal/integrable result.  
**AI Action:** Enter Exact Realization directly, or first produce an optional separately reviewable Pre-Update Plan when that has independent value.  
**Why This Step:** Exact work should not wait for a ceremonial pre-update phase, while risky/material mutation may benefit from a reviewable intended-change boundary.  
**Method / Mechanics:** Preserve accepted meaning, use transient exact reasoning as needed, respect mutation authority, and verify/repair only under the applicable host authority.  
**Possible Result:** A directly integrable literal result, or an optional reviewed intended-change plan followed by that result.  
**Derived From / Owners:** `TM-PRE-UPDATE-PLAN`, `TM-EXACT-REALIZATION`.

### Step `SCN-01-S5` — revalidate only affected meaning

**Trigger / Situation:** New Evidence/Finding/upstream change invalidates or materially challenges accepted meaning.  
**AI Action:** Revalidate from the earliest affected owner instead of restarting the whole scenario.  
**Why This Step:** Unaffected Decisions/results should remain usable.  
**Method / Mechanics:** Reopen the smallest affected surface, perform consistency review only where plausible cross-owner drift exists, and integrate whole-state meaning only when useful.  
**Possible Result:** Narrowly revised current work with unaffected meaning preserved.  
**Derived From / Owners:** `UC-IDTSPE-REVALIDATE-CURRENT-WORK`, `planning/documentation/idtspe-methodology/active/idtspe-core/shared/consistency-review-use-case.md`.

[METHODOLOGY_SCENARIO]
{
  "id": "SCN-01",
  "type": "ROOT",
  "title": "Я пришёл с задачей — постепенно разберём её от общего смысла до Exact",
  "entryRoute": "USER request -> Methodology Use-Case Registry Map -> relevant scoped registry -> selected Use Case(s)",
  "assumptions": [],
  "steps": [
    {"id":"SCN-01-S1","title":"Establish the smallest useful composition","semanticRefs":["UC-DOC-USE-REPOSITORY-GUIDANCE","UC-IDTSPE-COMPOSE-CURRENT-WORK"]},
    {"id":"SCN-01-S2","title":"Deepen meaning only when pressure appears","semanticRefs":["UC-IDTSPE-COMPOSE-CURRENT-WORK","planning/documentation/idtspe-methodology/active/profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md"]},
    {"id":"SCN-01-S3","title":"Evaluate material surfaces","semanticRefs":["planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md","planning/documentation/idtspe-methodology/active/idtspe-core/lenses/README.md"]},
    {"id":"SCN-01-S4","title":"Realize exactly when meaning is sufficient","semanticRefs":["TM-PRE-UPDATE-PLAN","TM-EXACT-REALIZATION"]},
    {"id":"SCN-01-S5","title":"Revalidate only affected meaning","semanticRefs":["UC-IDTSPE-REVALIDATE-CURRENT-WORK","planning/documentation/idtspe-methodology/active/idtspe-core/shared/consistency-review-use-case.md"]}
  ]
}
[/METHODOLOGY_SCENARIO]

`PL-L0..PL-L4` is a depth/readiness vocabulary, **not** a runtime phase state machine or approval ladder. Several levels may participate together and any level may reopen narrowly after new evidence.

## 6. `SCN-02` FOCUSED — Я хочу спланировать конкретное изменение или новую функциональность в приложении

**Type:** FOCUSED  
**Entry assumption:** normal Use-Case routing has already selected current IDTSPE composition and SDS is applicable. This scenario does not redefine that entry route.

### Step `SCN-02-S1` — select only the semantic owners the change actually needs

**Trigger / Situation:** The application change needs product/behavior/spatial meaning.  
**AI Action:** Use Application / Feature / Scenario / Screen Target Modules only for material perspectives.  
**Why This Step:** These are peer semantic owners, not mandatory sequential stages.  
**Method / Mechanics:** Start from whichever perspective is currently informative; co-form/revalidate peers as pressure appears.  
**Possible Result:** Bounded application/feature/journey/screen meaning without duplicate authority.  
**Derived From / Owners:** `TM-APPLICATION-DEFINITION`, `TM-FEATURE`, `TM-SCENARIO-PLANNING`, `TM-SCREEN`.

### Step `SCN-02-S2` — discover Domain meaning when implementation semantics require it

**Trigger / Situation:** Identity/state/lifecycle/invariant/consistency ownership becomes material.  
**AI Action:** Use Domain Discovery and DDD evaluation; promote durable meaning to Domain Owner only when justified.  
**Why This Step:** Aggregate/Entity/Value Object discovery is part of Domain discovery and does not need another Target family.  
**Method / Mechanics:** Discover bounded candidates transiently; evaluate ownership/consistency; create/reuse durable Domain owner only for stable semantic responsibility.  
**Possible Result:** Zero/one/several durable Domain owners backed by bounded discovery.  
**Derived From / Owners:** `TM-DOMAIN-DISCOVERY`, `LENS-DOMAIN-MODELING-DDD`, `TM-DOMAIN-OWNER`.

### Step `SCN-02-S3` — discover implementation Slice candidates one at a time

**Trigger / Situation:** End-to-end implementation responsibility/boundary becomes useful.  
**AI Action:** Use the Slice Discovery module for one bounded candidate per invocation; use Verticality/Integration evaluation as material.  
**Why This Step:** Multiple Slice candidates do not require a portfolio/strategy Target Module.  
**Method / Mechanics:** Repeat the same Slice Discovery module for additional candidates; form a durable Slice Owner only for selected stable responsibility.  
**Possible Result:** One or more transient Slice candidates and zero/one durable owner per selected responsibility.  
**Derived From / Owners:** `TM-IMPLEMENTATION-SLICE`, `LENS-SLICE-VERTICALITY-INTEGRATION`, `TM-SLICE-OWNER`.

### Step `SCN-02-S4` — simplify and prove proportionally

**Trigger / Situation:** Complexity, proof, change impact or practical evidence becomes material.  
**AI Action:** Apply only relevant Core/SDS Lenses and proof/evidence owners while planning continues.  
**Why This Step:** Verification is not a late mandatory phase; it constrains meaning whenever useful.  
**Method / Mechanics:** Use Unit applicability checkpoints and selected Lens/Target owners without forcing every evaluator.  
**Possible Result:** Simpler, reviewable meaning with material proof/risk constraints integrated.  
**Derived From / Owners:** `LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY`, `LENS-DEPENDENCY-CHANGE-IMPACT`, `LENS-TEST-PROOF-EVIDENCE`, `TM-PRACTICAL-TEST`.

[METHODOLOGY_SCENARIO]
{
  "id":"SCN-02",
  "type":"FOCUSED",
  "title":"Я хочу спланировать конкретное изменение или новую функциональность в приложении",
  "entryRoute":"Starts after normal Use-Case routing; SDS is applicable",
  "assumptions":["UC-IDTSPE-COMPOSE-CURRENT-WORK already governs composition"],
  "steps":[
    {"id":"SCN-02-S1","title":"Select material application semantic owners","semanticRefs":["TM-APPLICATION-DEFINITION","TM-FEATURE","TM-SCENARIO-PLANNING","TM-SCREEN"]},
    {"id":"SCN-02-S2","title":"Discover Domain meaning when needed","semanticRefs":["TM-DOMAIN-DISCOVERY","LENS-DOMAIN-MODELING-DDD","TM-DOMAIN-OWNER"]},
    {"id":"SCN-02-S3","title":"Discover implementation Slice candidates one at a time","semanticRefs":["TM-IMPLEMENTATION-SLICE","LENS-SLICE-VERTICALITY-INTEGRATION","TM-SLICE-OWNER"]},
    {"id":"SCN-02-S4","title":"Simplify and prove proportionally","semanticRefs":["LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY","LENS-DEPENDENCY-CHANGE-IMPACT","LENS-TEST-PROOF-EVIDENCE","TM-PRACTICAL-TEST"]}
  ]
}
[/METHODOLOGY_SCENARIO]

## 7. `SCN-03` FOCUSED — У меня уже есть план или решение — хочу критически его проверить

**Type:** FOCUSED  
**Entry assumption:** an existing plan/decision/result is the current Analysis Surface; normal routing still governs applicability.

### Step `SCN-03-S1` — challenge the actual current surface

**Trigger / Situation:** The USER wants a critical review rather than a new plan from scratch.  
**AI Action:** Review the current meaning, identify material claims/risks/gaps and route them to their current owners.  
**Why This Step:** Review should produce Findings, not a parallel semantic plan.  
**Method / Mechanics:** Check need/scope, authority/SOT, uncertainty/reversibility, dependency/change impact and other plausible Lenses only where their surfaces exist.  
**Possible Result:** A bounded set of Findings with owner destinations.  
**Derived From / Owners:** `LENS-NEED-VALUE-SCOPE`, `LENS-AUTHORITY-SOT-REUSE`, `LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`, `LENS-DEPENDENCY-CHANGE-IMPACT`, `planning/documentation/review-diff-review-workflow.md`.

### Step `SCN-03-S2` — repair/revalidate narrowly

**Trigger / Situation:** Review Findings invalidate accepted meaning or reveal cross-owner drift.  
**AI Action:** Revalidate only affected owners and use consistency review only where plausible.  
**Why This Step:** A review finding should not force a total restart.  
**Method / Mechanics:** Find earliest affected owner, resolve the Finding, revise/reopen dependent units, preserve unaffected meaning.  
**Possible Result:** Corrected current work and explicit remaining uncertainty.  
**Derived From / Owners:** `UC-IDTSPE-REVALIDATE-CURRENT-WORK`, `planning/documentation/idtspe-methodology/active/idtspe-core/shared/consistency-review-use-case.md`.

### Step `SCN-03-S3` — audit the review itself when requested

**Trigger / Situation:** The USER asks whether the previous review was sufficiently broad/deep or what it missed.  
**AI Action:** Audit review coverage/quality/delta without pretending this is another revalidation pass.  
**Why This Step:** Review audit and semantic revalidation answer different questions.  
**Method / Mechanics:** Inspect coverage/evidence/omissions of the prior review and route any newly discovered substantive Finding normally.  
**Possible Result:** Coverage assessment plus newly surfaced Findings, if any.  
**Derived From / Owners:** `planning/documentation/review-audit-workflow.md`.

[METHODOLOGY_SCENARIO]
{"id":"SCN-03","type":"FOCUSED","title":"У меня уже есть план или решение — хочу критически его проверить","entryRoute":"Starts with an existing current Analysis Surface after normal routing","assumptions":[],"steps":[{"id":"SCN-03-S1","title":"Challenge the actual current surface","semanticRefs":["LENS-NEED-VALUE-SCOPE","LENS-AUTHORITY-SOT-REUSE","LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY","LENS-DEPENDENCY-CHANGE-IMPACT","planning/documentation/review-diff-review-workflow.md"]},{"id":"SCN-03-S2","title":"Repair/revalidate narrowly","semanticRefs":["UC-IDTSPE-REVALIDATE-CURRENT-WORK","planning/documentation/idtspe-methodology/active/idtspe-core/shared/consistency-review-use-case.md"]},{"id":"SCN-03-S3","title":"Audit review coverage when requested","semanticRefs":["planning/documentation/review-audit-workflow.md"]}]}
[/METHODOLOGY_SCENARIO]

## 8. `SCN-04` FOCUSED — Решения готовы — хочу перейти к точной реализации

**Type:** FOCUSED  
**Entry assumption:** accepted semantic meaning is sufficiently determined; this scenario starts after normal routing and does not manufacture implementation permission.

### Step `SCN-04-S1` — decide whether a separately reviewable update plan is useful

**Trigger / Situation:** Exact mutation is near; the change may be broad/risky enough that reviewing intended changes first has value.  
**AI Action:** Use the optional Core Pre-Update Target only when its result is independently useful.  
**Why This Step:** A reviewable intended-change boundary can reduce accidental mutation without becoming a mandatory phase.  
**Method / Mechanics:** Produce one `RU-PUPDATE-01`, using its Unit applicability checkpoints and current destination facts only as needed.  
**Possible Result:** A concrete non-mutating intended-change plan, or an explicit decision to proceed directly to Exact.  
**Derived From / Owners:** `TM-PRE-UPDATE-PLAN`.

### Step `SCN-04-S2` — realize the accepted meaning literally

**Trigger / Situation:** Exact/literal output is requested and host authority permits the applicable realization actions.  
**AI Action:** Use Exact Realization; plan transient details internally as needed.  
**Why This Step:** Literal integration belongs to Exact, not to a persistent planning shell.  
**Method / Mechanics:** Preserve accepted meaning, produce the directly integrable result, verify/repair within authority, and surface conflicts as Findings/Revalidation rather than silently redesigning.  
**Possible Result:** Exact code/config/docs/package result and supporting Evidence where executed.  
**Derived From / Owners:** `TM-EXACT-REALIZATION`.

### Step `SCN-04-S3` — revalidate only when exact work exposes material contradiction

**Trigger / Situation:** Exact work or verification exposes a material conflict with accepted meaning.  
**AI Action:** Revalidate the affected semantic owner before continuing conflicting realization.  
**Why This Step:** Mutation pressure does not grant authority to silently change semantics.  
**Method / Mechanics:** Route the Finding upstream, preserve unaffected exact work where safe, then resume after accepted resolution.  
**Possible Result:** Corrected semantic basis and resumed exact work.  
**Derived From / Owners:** `UC-IDTSPE-REVALIDATE-CURRENT-WORK`.

[METHODOLOGY_SCENARIO]
{"id":"SCN-04","type":"FOCUSED","title":"Решения готовы — хочу перейти к точной реализации","entryRoute":"Starts after accepted meaning is sufficiently determined","assumptions":["Mutation authority remains owned by the active host/session contract"],"steps":[{"id":"SCN-04-S1","title":"Optionally review the intended update","semanticRefs":["TM-PRE-UPDATE-PLAN"]},{"id":"SCN-04-S2","title":"Realize the accepted meaning literally","semanticRefs":["TM-EXACT-REALIZATION"]},{"id":"SCN-04-S3","title":"Revalidate material contradiction only","semanticRefs":["UC-IDTSPE-REVALIDATE-CURRENT-WORK"]}]}
[/METHODOLOGY_SCENARIO]

## 9. `SCN-05` MAINTENANCE — Я меняю саму методологию или документацию

**Type:** FOCUSED / MAINTENANCE  
**Entry assumption:** the work subject is repository methodology/documentation itself.

### Step `SCN-05-S1` — resolve the documentation capability/owner change

**Trigger / Situation:** A methodology/documentation capability, owner boundary, route or contract needs material change.  
**AI Action:** Use the Documentation change Use Case and, when an IDTSPE component contract itself changes, the corresponding IDTSPE maintenance Use Case.  
**Why This Step:** Documentation maintenance and planning semantics must not collapse into one owner.  
**Method / Mechanics:** Resolve current owner(s), intended semantic delta, dependencies and exact realization readiness before mutation.  
**Possible Result:** A bounded documentation/methodology change ready for realization.  
**Derived From / Owners:** `UC-DOC-PLAN-DOCUMENTATION-CHANGE`, `UC-IDTSPE-MAINTAIN-TARGET-MODULE`.

### Step `SCN-05-S2` — refresh only affected derived projections/examples

**Trigger / Situation:** The semantic change affects registry/navigation/command/scenario/Helper projection meaning.  
**AI Action:** Revalidate affected downstream projections without creating a Helper-specific methodology Use Case.  
**Why This Step:** Derived surfaces must stay fresh but cannot become semantic authority.  
**Method / Mechanics:** Update only affected registries/navigation, command routes, generated catalogs, canonical scenarios, Helper projection and tests; rerun scenario examples that reference changed owners.  
**Possible Result:** Consistent semantic owner + current projections with no duplicate explanation layer.  
**Derived From / Owners:** `UC-DOC-PLAN-DOCUMENTATION-CHANGE`, `planning/command-routing.md`, `planning/documentation/idtspe-methodology/active/idtspe-core/shared/methodology-use-case-scenario-map.md`.

### Step `SCN-05-S3` — review the resulting documentation

**Trigger / Situation:** The change is represented and needs documentation-quality/ownership validation.  
**AI Action:** Review current documentation for stale routes, duplicate authority, orphaned files and projection drift.  
**Why This Step:** Exact edits can be mechanically correct while semantically duplicative.  
**Method / Mechanics:** Route Findings to real owners and revalidate only affected examples/projections.  
**Possible Result:** Current maintainable documentation with narrow remaining findings, if any.  
**Derived From / Owners:** `UC-DOC-REVIEW-DOCUMENTATION`.

[METHODOLOGY_SCENARIO]
{"id":"SCN-05","type":"MAINTENANCE","title":"Я меняю саму методологию или документацию","entryRoute":"Documentation Use-Case routing; IDTSPE maintenance UC only for the component type being changed","assumptions":[],"steps":[{"id":"SCN-05-S1","title":"Resolve the documentation capability/owner change","semanticRefs":["UC-DOC-PLAN-DOCUMENTATION-CHANGE","UC-IDTSPE-MAINTAIN-TARGET-MODULE"]},{"id":"SCN-05-S2","title":"Refresh only affected derived projections/examples","semanticRefs":["UC-DOC-PLAN-DOCUMENTATION-CHANGE","planning/command-routing.md","planning/documentation/idtspe-methodology/active/idtspe-core/shared/methodology-use-case-scenario-map.md"]},{"id":"SCN-05-S3","title":"Review the resulting documentation","semanticRefs":["UC-DOC-REVIEW-DOCUMENTATION"]}]}
[/METHODOLOGY_SCENARIO]

## 10. `SCN-06` TOOL / REPOSITORY — Изменение готово — хочу собрать и проверить replacement package

**Type:** TOOL / REPOSITORY continuation  
**Entry assumption:** semantic/exact changes already exist in a selected working snapshot/branch. This is not a mandatory IDTSPE stage.

### Step `SCN-06-S1` — optionally review the intended file transition

**Trigger / Situation:** The repository delta is material enough that a separate intended-change plan would improve review.  
**AI Action:** Optionally use the Core Pre-Update Target; skip it for an obvious already-reviewed transition.  
**Why This Step:** Repository packaging should not force another planning ceremony.  
**Method / Mechanics:** Bound add/replace/delete intent and preservation/verification without mutation.  
**Possible Result:** Optional reviewed intended-change plan.  
**Derived From / Owners:** `TM-PRE-UPDATE-PLAN`.

### Step `SCN-06-S2` — produce a replacement package without applying it

**Trigger / Situation:** The USER explicitly requests a replacement package/archive from the selected source snapshot.  
**AI Action:** Build the package according to the repository package protocol, include exact base/replacement bytes, validate the manifest/payload, and stop.  
**Why This Step:** Package production and package application are different authorities.  
**Method / Mechanics:** Use the current package producer owner; do not apply/commit/push.  
**Possible Result:** Valid replacement package + machine-readable apply instruction.  
**Derived From / Owners:** `planning/use-cases/UC-REPO-BUILD-REPLACEMENT-PACKAGE.md`, `planning/documentation/build-replacement-archive-workflow.md`.

### Step `SCN-06-S3` — verify applied result separately when/if another authority applies it

**Trigger / Situation:** A package has later been applied in an authorized target workspace.  
**AI Action:** Review/consistency-check the resulting current state as appropriate; do not infer promotion-to-main permission.  
**Why This Step:** A valid package or successful apply does not itself authorize promotion.  
**Method / Mechanics:** Verify exact delta and semantic consistency; route findings normally.  
**Possible Result:** Verified target state or bounded Findings; promotion remains a separate explicit authorization.  
**Derived From / Owners:** `planning/documentation/review-diff-review-workflow.md`, `planning/documentation/idtspe-methodology/active/idtspe-core/shared/consistency-review-use-case.md`.

[METHODOLOGY_SCENARIO]
{"id":"SCN-06","type":"TOOL_REPOSITORY","title":"Изменение готово — хочу собрать и проверить replacement package","entryRoute":"Tool/repository continuation after semantic/exact work","assumptions":["Selected source snapshot/branch is explicit","Package production does not authorize apply/commit/push/promotion"],"steps":[{"id":"SCN-06-S1","title":"Optionally review the intended file transition","semanticRefs":["TM-PRE-UPDATE-PLAN"]},{"id":"SCN-06-S2","title":"Produce a replacement package without applying it","semanticRefs":["planning/use-cases/UC-REPO-BUILD-REPLACEMENT-PACKAGE.md","planning/documentation/build-replacement-archive-workflow.md"]},{"id":"SCN-06-S3","title":"Verify applied result separately when authorized","semanticRefs":["planning/documentation/review-diff-review-workflow.md","planning/documentation/idtspe-methodology/active/idtspe-core/shared/consistency-review-use-case.md"]}]}
[/METHODOLOGY_SCENARIO]

## 11. SDS-Specific Use-Case Test

Current conclusion: no separate SDS methodology-use Use Case is justified.

The following are **not** documentation-methodology Use Cases:

```text
Plan Feature
Compose Scenario
Plan Screen
Discover Domain
Discover/plan Slice
Plan Shared Capability
Plan Evolution
Prototype
Practical Test
```

They are profile Target/Lens capabilities reached from generic IDTSPE Use Cases.

Create an SDS-specific Use Case only if a future scenario exposes a distinct independently useful Result about **how SDS methodology documentation is used**, not merely a new SDS planning result.

## 12. Maintenance / Scenario Revalidation Rule

When a Use Case/component owner changes materially:

1. find scenario steps whose semantic references include that owner;
2. rerun those scenarios as explanation/integration tests;
3. update scenario prose only when the realistic composition changed;
4. update derived Helper command-equivalent projection when the semantic mapping changed.

The scenario corpus may evolve without becoming runtime authority. A projection/helper must not write command metadata back into these canonical scenarios.
