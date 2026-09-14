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
| `UCSM-09` | Finding/Evidence/upstream change may require correction or make work stale | Finding Disposition → Resolution Escalation → direct correction / Proposal / targeted revalidation as applicable | can the system distinguish deterministic/local repair from current-owner and upstream semantic change without over-escalation |
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
**Method / Mechanics:** First distinguish current realized truth from unrealized target state. When SDS work plans a material state change/new owner, form/reuse the applicable `TM-EVOLUTION-STEP` as the future-state planning owner and use Application/Feature/Scenario/Screen/Domain/Slice/Shared modules as supporting production for its Target Owner Bodies. Then progress proportionally through useful SDS planning depth: `PL-L0` behavior/owner meaning, `PL-L1` durable implementation/proof constraints, `PL-L2` implementation architecture/responsibility, `PL-L3` transient exact reasoning, `PL-L4` literal realization. Levels may overlap, be skipped, or reopen narrowly. Depth movement is not automatically orchestrated by this Scenario.  
**Possible Result:** One or more bounded current-owner reviews or Evolution Step target-state bodies at the depth needed now, without treating selection as realization.  
**Derived From / Owners:** `UC-IDTSPE-COMPOSE-CURRENT-WORK`, `planning/documentation/idtspe-methodology/active/profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md`.

### Step `SCN-01-S3` — evaluate material surfaces

**Trigger / Situation:** A material Result Unit / decision surface exists.  
**AI Action:** Work through the applicable bounded Unit Resolution, use the applicable Lens registry checkpoint(s) and selected evaluators proportionally, and integrate only sufficiently resolved meaning into Current Result Content.  
**Why This Step:** Cross-cutting concerns should challenge the actual current surface without becoming another semantic owner.  
**Method / Mechanics:** Use the Unit Opening/In-Unit/Closing applicability envelope; keep unresolved candidate meaning in Unit Resolution; select zero or more additional Lenses as material; route Findings to the smallest correct subject/owner and integrate resolved meaning into Current Result Content.  
**Possible Result:** Current result meaning with material findings resolved/routed, or an explicit no-additional-lens outcome.  
**Derived From / Owners:** `planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md`, `planning/documentation/idtspe-methodology/active/idtspe-core/lenses/README.md`.

### Step `SCN-01-S3R` — challenge current meaning when independent review is useful

**Trigger / Situation:** Current meaning is material enough that an independent critical challenge would improve confidence before deeper commitment or realization.  
**AI Action:** Critically review the actual current Analysis Surface without manufacturing a mandatory review phase.  
**Why This Step:** Important decisions may benefit from adversarial checking, but review remains proportional and may be skipped when it adds no independent value.  
**Method / Mechanics:** Review current meaning/findings through the current review owner and applicable Lenses; route material Findings to their semantic owners rather than letting the Scenario own corrective rules.  
**Possible Result:** Confirmed current meaning, bounded Findings, or focused revalidation pressure.  
**Derived From / Owners:** `planning/documentation/review-diff-review-workflow.md`.

### Step `SCN-01-S3F` — disposition material findings before choosing the correction route

**Trigger / Situation:** Evaluation/review/execution evidence produces one or more material Finding Candidates.  
**AI Action:** Classify each material Finding through Core Finding Disposition, keeping impact priority separate from semantic Resolution Escalation.  
**Why This Step:** A severe defect may still have a deterministic correction, while a modest-looking defect may expose a current-owner or upstream semantic decision. USER attention should follow the actual resolution authority, not the prose severity alone.  
**Method / Mechanics:** Identify the smallest correct semantic subject, affected/current owner and earliest potentially affected upstream meaning; assign the smallest justified `RE-0..RE-4` escalation. Route Unit-local findings into the affected Unit Resolution; form a Contextual Unit only for a new bounded local responsibility; use another owner/Target Formation directly when that is the real subject. Route deterministic/local corrections directly, semantic changes through Proposal selection, and possible/confirmed upstream impact through targeted Revalidation before downstream compensation. Any material corrective Proposal receives canonical Proposal Semantic Change Impact Review before selection.  
**Possible Result:** A finding set whose correction route and USER-review depth are explicit without manufacturing architecture/product decisions for deterministic defects.  
**Derived From / Owners:** `planning/documentation/idtspe-methodology/active/idtspe-core/shared/finding-disposition-contract.md`, `planning/documentation/idtspe-methodology/active/ai-reviewability/README.md`, `planning/documentation/idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md`.

### Step `SCN-01-S4` — realize exactly when meaning is sufficient

**Trigger / Situation:** The selected meaning is sufficiently determined for a literal/integrable result.  
**AI Action:** Enter Exact Realization directly, or first produce an optional separately reviewable Pre-Update Plan when that has independent value.  
**Why This Step:** Exact work should not wait for a ceremonial pre-update phase, while risky/material mutation may benefit from a reviewable intended-change boundary.  
**Method / Mechanics:** Preserve accepted meaning, use transient exact reasoning as needed, respect mutation authority, and verify/repair only under the applicable host authority.  
**Possible Result:** A directly integrable literal result, or an optional reviewed intended-change plan followed by that result.  
**Derived From / Owners:** `TM-PRE-UPDATE-PLAN`, `TM-EXACT-REALIZATION`.

### Step `SCN-01-S4M` — materialize future owner truth only after realization/proof

**Trigger / Situation:** Exact/integration work has actually realized an SDS Evolution Step target state and the required Evidence/revalidation is sufficient to establish what became real.  
**AI Action:** Apply the Step's Target Owner Materialization Set to semantic authority: create/replace/retire only the current natural-owner bodies actually established by the realized result.  
**Why This Step:** Selected future meaning is planning authority, not current truth. Current owners should change only after implementation has made that meaning real.  
**Method / Mechanics:** Compare actual realized state/Evidence to the selected Step Target Owner Bodies; if materially consistent, materialize the applicable bodies; if not, surface a Finding/revalidation instead of copying the planned body blindly. Resolve physical file representation separately through Documentation / Representation + P-14.  
**Possible Result:** Updated current natural owners that reflect realized truth, with the Evolution Step retained as transition/decision lineage.  
**Derived From / Owners:** `TM-EVOLUTION-STEP`, `LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`.

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
    {"id":"SCN-01-S3R","title":"Challenge current meaning when independent review is useful","semanticRefs":["planning/documentation/review-diff-review-workflow.md"]},
    {"id":"SCN-01-S3F","title":"Disposition material findings before choosing the correction route","semanticRefs":["planning/documentation/idtspe-methodology/active/idtspe-core/shared/finding-disposition-contract.md#resolution-escalation","planning/documentation/idtspe-methodology/active/ai-reviewability/README.md"]},
    {"id":"SCN-01-S4","title":"Realize exactly when meaning is sufficient","semanticRefs":["TM-PRE-UPDATE-PLAN","TM-EXACT-REALIZATION"]},
    {"id":"SCN-01-S4M","title":"Materialize future owner truth only after realization/proof","semanticRefs":["TM-EVOLUTION-STEP","LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY"]},
    {"id":"SCN-01-S5","title":"Revalidate only affected meaning","semanticRefs":["UC-IDTSPE-REVALIDATE-CURRENT-WORK","planning/documentation/idtspe-methodology/active/idtspe-core/shared/consistency-review-use-case.md"]}
  ]
}
[/METHODOLOGY_SCENARIO]

`PL-L0..PL-L4` is a depth/readiness vocabulary, **not** a runtime phase state machine or approval ladder. Several levels may participate together and any level may reopen narrowly after new evidence.

## 6. `SCN-02` FOCUSED — Я хочу спланировать конкретное изменение или новую функциональность в приложении

**Type:** FOCUSED  
**Entry assumption:** normal Use-Case routing has already selected current IDTSPE composition and SDS is applicable. This scenario does not redefine that entry route.

### Step `SCN-02-S0` — host the unrealized change in an Evolution Step

**Trigger / Situation:** The requested application change/new capability is materially different from current realized state.  
**AI Action:** Establish/reuse one coherent `TM-EVOLUTION-STEP` boundary with expected Entry State and concrete driver; keep current natural owners as current truth.  
**Why This Step:** Future planning must not silently overwrite current Feature/Scenario/Domain/Slice/etc owners before implementation.  
**Method / Mechanics:** Treat absence as a valid Entry State for greenfield/new-owner work. Real alternatives remain Proposal/Planning Branch state; a Step may exist before final route selection when the future transition is concrete enough for addressability/review.  
**Possible Result:** A concrete future-transition owner with current Entry State, candidate/selected route context and explicit uncertainty where material.  
**Derived From / Owners:** `TM-EVOLUTION-STEP`, `TM-EVOLUTION-STEPS-MAP`, `LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`.

### Step `SCN-02-S1` — form only the target owner bodies the Step actually needs

**Trigger / Situation:** The Step needs application/behavior/journey/spatial meaning.  
**AI Action:** Use Application / Feature / Scenario / Screen Target Modules only for material perspectives, in supporting role inside the Step.  
**Why This Step:** These contracts define natural owner shapes, but their future bodies are not current owner authority yet.  
**Method / Mechanics:** Start from whichever perspective is informative; co-form/revalidate peer Target Bodies as pressure appears. Future BRs remain in the Target Feature Body.  
**Possible Result:** Complete-enough Target Application/Feature/Scenario/Screen Bodies for the current planning depth without duplicate current authority.  
**Derived From / Owners:** `TM-EVOLUTION-STEP`, `TM-APPLICATION-DEFINITION`, `TM-FEATURE`, `TM-SCENARIO-PLANNING`, `TM-SCREEN`.

### Step `SCN-02-S2` — discover Domain meaning and integrate it into Target Domain Bodies

**Trigger / Situation:** Identity/state/lifecycle/invariant/consistency ownership becomes material.  
**AI Action:** Use Domain Discovery and DDD evaluation; when durable post-Step Domain responsibility is justified, shape a Target Domain Body inside the Step.  
**Why This Step:** Discovery is transient and selected future Domain meaning is still unrealized.  
**Method / Mechanics:** Discover bounded candidates transiently; evaluate ownership/consistency; allow zero/one/several future Domain bodies. Future IR-DOMAIN/PFR meaning remains in those bodies.  
**Possible Result:** Zero/one/several Target Domain Bodies backed by bounded discovery, without premature current Domain-owner creation.  
**Derived From / Owners:** `TM-DOMAIN-DISCOVERY`, `LENS-DOMAIN-MODELING-DDD`, `TM-DOMAIN-OWNER`, `TM-EVOLUTION-STEP`.

### Step `SCN-02-S3` — discover implementation Slice candidates and integrate selected future responsibility

**Trigger / Situation:** End-to-end implementation responsibility/boundary becomes useful.  
**AI Action:** Use Slice Discovery for bounded candidates; use Verticality/Integration evaluation as material; shape Target Slice/Shared Bodies when durable post-Step responsibility is justified.  
**Why This Step:** Multiple candidates do not require a portfolio/strategy Target and future consumers do not create current Shared owners.  
**Method / Mechanics:** Repeat Slice Discovery as needed; keep alternatives branch-scoped until selection; put future IR-SLICE/IR-SHARED in the corresponding target bodies.  
**Possible Result:** Transient Slice discovery plus selected/candidate Target Slice/Shared Bodies inside the Step.  
**Derived From / Owners:** `TM-IMPLEMENTATION-SLICE`, `LENS-SLICE-VERTICALITY-INTEGRATION`, `TM-SLICE-OWNER`, `TM-SHARED-IMPLEMENTATION-CAPABILITY`, `TM-EVOLUTION-STEP`.

### Step `SCN-02-S4` — simplify, resolve uncertainty and prove proportionally

**Trigger / Situation:** Complexity, uncertainty, proof, change impact or practical evidence becomes material.  
**AI Action:** Apply only relevant Core/SDS Lenses and Evidence Targets while planning continues.  
**Why This Step:** Selection, confidence and realization are separate; proof/evidence should constrain planning without turning every unknown into ceremony.  
**Method / Mechanics:** Use Unit applicability checkpoints and selected Lens/Target owners. Keep uncertainty attached to the smallest useful subject with an Evidence/assumption basis; do not invent numeric confidence.  
**Possible Result:** Simpler target bodies, explicit material unknowns/evidence needs, and a Step ready for deeper planning/Exact when sufficient.  
**Derived From / Owners:** `LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY`, `LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY`, `LENS-DEPENDENCY-CHANGE-IMPACT`, `LENS-TEST-PROOF-EVIDENCE`, `TM-PROTOTYPE`, `TM-PRACTICAL-TEST`.

[METHODOLOGY_SCENARIO]
{
  "id":"SCN-02",
  "type":"FOCUSED",
  "title":"Я хочу спланировать конкретное изменение или новую функциональность в приложении",
  "entryRoute":"Starts after normal Use-Case routing; SDS is applicable",
  "assumptions":["UC-IDTSPE-COMPOSE-CURRENT-WORK already governs composition"],
  "steps":[
    {"id":"SCN-02-S0","title":"Host the unrealized change in an Evolution Step","semanticRefs":["TM-EVOLUTION-STEP","TM-EVOLUTION-STEPS-MAP","LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY"]},
    {"id":"SCN-02-S1","title":"Form only the target owner bodies the Step actually needs","semanticRefs":["TM-EVOLUTION-STEP","TM-APPLICATION-DEFINITION","TM-FEATURE","TM-SCENARIO-PLANNING","TM-SCREEN"]},
    {"id":"SCN-02-S2","title":"Discover Domain meaning and integrate Target Domain Bodies","semanticRefs":["TM-DOMAIN-DISCOVERY","LENS-DOMAIN-MODELING-DDD","TM-DOMAIN-OWNER","TM-EVOLUTION-STEP"]},
    {"id":"SCN-02-S3","title":"Discover Slice candidates and integrate selected future responsibility","semanticRefs":["TM-IMPLEMENTATION-SLICE","LENS-SLICE-VERTICALITY-INTEGRATION","TM-SLICE-OWNER","TM-SHARED-IMPLEMENTATION-CAPABILITY","TM-EVOLUTION-STEP"]},
    {"id":"SCN-02-S4","title":"Simplify, resolve uncertainty and prove proportionally","semanticRefs":["LENS-SIMPLICITY-IMPLEMENTATION-ECONOMY","LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY","LENS-DEPENDENCY-CHANGE-IMPACT","LENS-TEST-PROOF-EVIDENCE","TM-PROTOTYPE","TM-PRACTICAL-TEST"]}
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

### Step `SCN-03-S1D` — disposition findings by impact and resolution escalation

**Trigger / Situation:** The critical review produced material Findings rather than only confirmation.  
**AI Action:** Classify each Finding by `Review Priority` and the separate `Resolution Escalation` axis, then identify the actual semantic resolution owner.  
**Why This Step:** `High/Critical` describes blast radius if wrong; it does not mean a new architecture/product Decision is required. Conversely, a local-looking problem may require current-owner or upstream semantic change.  
**Method / Mechanics:** Use Core Finding Disposition to select the smallest justified route: `RE-0` deterministic correction, `RE-1` local realization choice, `RE-2` current-owner semantic change, `RE-3` upstream revalidation, or `RE-4` upstream semantic change. State plainly how much USER review/selection is actually needed.  
**Possible Result:** Findings separated into self-correctable/local routes and genuine semantic decision/revalidation routes.  
**Derived From / Owners:** `planning/documentation/idtspe-methodology/active/idtspe-core/shared/finding-disposition-contract.md`, `planning/documentation/idtspe-methodology/active/ai-reviewability/README.md`.

### Step `SCN-03-S1P` — review a real semantic correction as Proposal only when needed

**Trigger / Situation:** A Finding is `RE-2` or `RE-4`, or otherwise exposes materially different candidate semantic answers that require selection.  
**AI Action:** Review the corrective candidate(s) through the canonical Proposal/Decision lifecycle at the actual current/upstream owner.  
**Why This Step:** USER decision effort belongs on the semantic choice that changes accepted meaning, not on every defect report.  
**Method / Mechanics:** Keep the Finding/Q/R/P provenance, compare only real candidate answers, recommend when evidence justifies it, and require actual selection before changing accepted planning meaning. If SDS correction meaning is selected but still unrealized, integrate it into the applicable Evolution Step Target Body rather than rewriting current owner truth immediately. `RE-0/RE-1` does not become a formal Proposal merely to satisfy ceremony.  
**Possible Result:** A selected/revised/deferred semantic correction in its correct current/future host, or an explicit unresolved decision surface.  
**Derived From / Owners:** `planning/documentation/idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md`, `planning/documentation/idtspe-methodology/active/idtspe-core/shared/qrp-lifecycle-and-review-contract.md`.

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
{"id":"SCN-03","type":"FOCUSED","title":"У меня уже есть план или решение — хочу критически его проверить","entryRoute":"Starts with an existing current Analysis Surface after normal routing","assumptions":[],"steps":[{"id":"SCN-03-S1","title":"Challenge the actual current surface","semanticRefs":["LENS-NEED-VALUE-SCOPE","LENS-AUTHORITY-SOT-REUSE","LENS-UNCERTAINTY-ASSUMPTION-REVERSIBILITY","LENS-DEPENDENCY-CHANGE-IMPACT","planning/documentation/review-diff-review-workflow.md"]},{"id":"SCN-03-S1D","title":"Disposition findings by impact and resolution escalation","semanticRefs":["planning/documentation/idtspe-methodology/active/idtspe-core/shared/finding-disposition-contract.md#resolution-escalation","planning/documentation/idtspe-methodology/active/ai-reviewability/README.md"]},{"id":"SCN-03-S1P","title":"Review a real semantic correction as Proposal only when needed","semanticRefs":["planning/documentation/idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md","planning/documentation/idtspe-methodology/active/idtspe-core/shared/qrp-lifecycle-and-review-contract.md"]},{"id":"SCN-03-S2","title":"Repair/revalidate narrowly","semanticRefs":["UC-IDTSPE-REVALIDATE-CURRENT-WORK","planning/documentation/idtspe-methodology/active/idtspe-core/shared/consistency-review-use-case.md"]},{"id":"SCN-03-S3","title":"Audit review coverage when requested","semanticRefs":["planning/documentation/review-audit-workflow.md"]}]}
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

### Step `SCN-04-S1R` — resolve representation only when persistence is material

**Trigger / Situation:** Exact realization raises a material question about whether meaning should persist and where it belongs.  
**AI Action:** Apply the Documentation / Representation Lens only when the persistence/artifact boundary is independently useful.  
**Why This Step:** Exact work should not create unnecessary documents, but material durable meaning still needs an explicit representation decision.  
**Method / Mechanics:** Evaluate `NO_PERSISTENCE`, implementation-native representation, reuse of an existing owner, consolidation, or a justified new/split artifact; do not let the Scenario own persistence semantics.  
**Possible Result:** A bounded representation decision feeding Exact without creating a mandatory documentation phase.  
**Derived From / Owners:** `LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`.

### Step `SCN-04-S2` — realize the accepted meaning literally

**Trigger / Situation:** Exact/literal output is requested and host authority permits the applicable realization actions.  
**AI Action:** Use Exact Realization; plan transient details internally as needed.  
**Why This Step:** Literal integration belongs to Exact, not to a persistent planning shell.  
**Method / Mechanics:** Preserve accepted meaning, produce the directly integrable result, verify/repair within authority, and surface conflicts as Findings/Revalidation rather than silently redesigning.  
**Possible Result:** Exact code/config/docs/package result and supporting Evidence where executed.  
**Derived From / Owners:** `TM-EXACT-REALIZATION`.

### Step `SCN-04-S2M` — materialize SDS target bodies only when realization is established

**Trigger / Situation:** Exact/integration work actually realized an Evolution Step and sufficient proof/revalidation establishes the post-Step state.  
**AI Action:** Apply Target Owner Materialization to semantic current authority; do not treat the selected Step body as already current before this point.  
**Why This Step:** Exact output is a candidate/realization result; current natural owners must reflect what actually became real.  
**Method / Mechanics:** Compare implementation/Evidence against the Step Target Bodies, materialize `CREATE/REPLACE/RETIRE` owner semantics only when established, and route physical placement separately through P-14.  
**Possible Result:** Current owners synchronized to realized truth, or a material Finding if the realization diverges from the selected Step.  
**Derived From / Owners:** `TM-EVOLUTION-STEP`, `LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY`.

### Step `SCN-04-S3` — revalidate only when exact work exposes material contradiction

**Trigger / Situation:** Exact work or verification exposes a material conflict with accepted meaning.  
**AI Action:** Revalidate the affected semantic owner before continuing conflicting realization.  
**Why This Step:** Mutation pressure does not grant authority to silently change semantics.  
**Method / Mechanics:** Route the Finding upstream, preserve unaffected exact work where safe, then resume after accepted resolution.  
**Possible Result:** Corrected semantic basis and resumed exact work.  
**Derived From / Owners:** `UC-IDTSPE-REVALIDATE-CURRENT-WORK`.

[METHODOLOGY_SCENARIO]
{"id":"SCN-04","type":"FOCUSED","title":"Решения готовы — хочу перейти к точной реализации","entryRoute":"Starts after accepted meaning is sufficiently determined","assumptions":["Mutation authority remains owned by the active host/session contract"],"steps":[{"id":"SCN-04-S1","title":"Optionally review the intended update","semanticRefs":["TM-PRE-UPDATE-PLAN"]},{"id":"SCN-04-S1R","title":"Resolve representation only when persistence is material","semanticRefs":["LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY"]},{"id":"SCN-04-S2","title":"Realize the accepted meaning literally","semanticRefs":["TM-EXACT-REALIZATION"]},{"id":"SCN-04-S2M","title":"Materialize SDS target bodies only when realization is established","semanticRefs":["TM-EVOLUTION-STEP","LENS-ARTIFACT-BOUNDARY-ADDRESSABILITY"]},{"id":"SCN-04-S3","title":"Revalidate material contradiction only","semanticRefs":["UC-IDTSPE-REVALIDATE-CURRENT-WORK"]}]}
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

## 10. `SCN-07` FOCUSED — Нашёлся баг или файндинг — понять, можно ли исправить локально или надо поднимать решение

**Type:** FOCUSED  
**Entry assumption:** a material Finding Candidate already exists from review, Evidence, validation, exact work, testing, user clarification or another producer. The scenario is generic Core; active profiles contribute only when the finding actually reaches their semantics.

### Step `SCN-07-S1` — establish the finding and smallest justified escalation

**Trigger / Situation:** A concrete defect/contradiction/risk/observation may require correction, but the required authority depth is not yet known.  
**AI Action:** Disposition the Finding and classify both impact and semantic resolution escalation.  
**Why This Step:** The user needs to know whether this is an obvious fix, a local implementation choice, a current-owner semantic change, or an upstream issue before spending attention on proposals.  
**Method / Mechanics:** Check current owner/Evidence, distinguish `Review Priority` from `Resolution Escalation`, identify the most-upstream affected meaning/depth and assign the smallest justified `RE-0..RE-4`. Do not turn a deterministic defect into a fake architecture decision.  
**Possible Result:** A grounded correction route plus a plain statement of required USER review depth.  
**Derived From / Owners:** `planning/documentation/idtspe-methodology/active/idtspe-core/shared/finding-disposition-contract.md#resolution-escalation`, `planning/documentation/idtspe-methodology/active/ai-reviewability/README.md`.

### Step `SCN-07-S2` — keep deterministic/local repair inside accepted meaning

**Trigger / Situation:** The Finding is `RE-0` or `RE-1`; accepted current/upstream meaning remains valid.  
**AI Action:** Preserve existing Decisions/Requirements/owner boundaries and continue with the deterministic correction or bounded local realization choice.  
**Why This Step:** A defect can be important while still not requiring architecture/product redesign or another methodology dispatch command after classification.  
**Method / Mechanics:** For `RE-0`, use the uniquely justified correction. For `RE-1`, compare only material local realization alternatives if useful. Ambient Session authorization/proposal-driven policy still governs actual material action when active, but that interaction policy is not itself the semantic action of this Scenario step and formal IDTSPE Proposal State is normally unnecessary.  
**Possible Result:** Deterministic/local correction ready for the normal realization/mutation boundary, with no new semantic Decision.  
**Derived From / Owners:** `planning/documentation/idtspe-methodology/active/idtspe-core/shared/finding-disposition-contract.md`.

### Step `SCN-07-S3` — resolve current-owner semantic change through Unit Resolution + Proposal selection

**Trigger / Situation:** The Finding is `RE-2`: correction requires changing a Decision, durable must-hold/Requirement, owner boundary or other accepted meaning of the current semantic owner.  
**AI Action:** Route the finding into the affected Unit/owner resolution surface and review the real corrective Proposal(s), including Semantic Change Impact, before dependent realization continues.  
**Why This Step:** The decision belongs to the owner whose accepted meaning changes; the finding producer does not gain authority to rewrite it.  
**Method / Mechanics:** Preserve driver/provenance, ground the Proposal through any genuinely required USER-only clarification, review only real alternatives, make USER-owned unknowns visible, and select/revise/defer through the canonical lifecycle. Selection identifies the desired semantic correction. Under SDS, when that correction is still unrealized, integrate it into the applicable Evolution Step Target Owner Body; current implemented owner truth changes only after realization/materialization.  
**Possible Result:** Selected corrective future/current planning meaning in the correct temporal host, or a bounded unresolved decision.  
**Derived From / Owners:** `planning/documentation/idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md`, `planning/documentation/idtspe-methodology/active/idtspe-core/shared/qrp-lifecycle-and-review-contract.md`.

### Step `SCN-07-S4` — revalidate upstream before compensating downstream

**Trigger / Situation:** The Finding is `RE-3`, or evidence cannot yet rule out an upstream semantic cause.  
**AI Action:** Revalidate the earliest affected upstream owner before selecting any upstream semantic change.  
**Why This Step:** `RE-3` means upstream change is plausible, not yet selected or proven. Lower-level architecture/implementation complexity must not compensate for a possibly invalid upstream contract.  
**Method / Mechanics:** Revalidate the narrowest earliest affected owner, preserve unaffected accepted meaning and determine whether the upstream meaning actually remains valid. If it remains valid, return to the narrowest downstream correction route. If actual upstream semantic change is required, continue to `SCN-07-S4P`.  
**Possible Result:** Upstream meaning confirmed, or a grounded `RE-4` semantic-change surface.  
**Derived From / Owners:** `UC-IDTSPE-REVALIDATE-CURRENT-WORK`.

### Step `SCN-07-S4P` — change upstream accepted meaning only after RE-4 is established

**Trigger / Situation:** Direct disposition produced `RE-4`, or `SCN-07-S4` revalidation established that an upstream Decision/Requirement/owner meaning must actually change.  
**AI Action:** Review and select the upstream corrective Proposal(s) at the real upstream owner.  
**Why This Step:** Upstream revalidation and upstream semantic selection are different actions; the USER should inspect the Proposal only after a real upstream change surface exists.  
**Method / Mechanics:** Preserve the Finding/revalidation evidence, expose affected downstream consequences, compare only real candidate answers and use canonical Proposal/Decision/Q/R/P semantics before accepted upstream desired meaning changes. Under SDS, an upstream change that still requires implementation is hosted in the relevant Evolution Step Target Body rather than immediately replacing current realized owner truth.  
**Possible Result:** Selected/revised/deferred upstream desired-state change in its correct temporal host, or an explicit material decision block.  
**Derived From / Owners:** `planning/documentation/idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md`, `planning/documentation/idtspe-methodology/active/idtspe-core/shared/qrp-lifecycle-and-review-contract.md`.

### Step `SCN-07-S5` — interpret SDS Requirement/depth semantics only when actually implicated

**Trigger / Situation:** SDS is active and the finding concerns durable owner-local must-hold meaning, or the distinction between behavior/Requirement/implementation architecture materially affects disposition.  
**AI Action:** Consult the SDS Requirement/depth owners after Core has identified that profile-specific semantics are actually relevant.  
**Why This Step:** Generic Finding escalation must not become SDS-specific, but SDS provides the natural owner vocabulary when the finding reaches `BR-*`, `IR-*`, `PFR-*` or `PL-L0..L4` meaning.  
**Method / Mechanics:** Use owner-local Requirement discovery only when durable must-hold meaning may need add/refine/replace/retire; route future `BR/IR/PFR` into the corresponding Evolution Step Target Body until realization/materialization; treat planning depth as reasoning/readiness context, not as a rule that every detail at level X is an architecture Decision at level X.  
**Possible Result:** No Requirement change, a future Target-Body Requirement/Decision candidate, a realized-current-owner correction route, or an upstream revalidation route.  
**Derived From / Owners:** `LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY`, `planning/documentation/idtspe-methodology/active/profiles/sds/shared/requirement-ownership-and-exception-rule.md`, `planning/documentation/idtspe-methodology/active/profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md`.

## 11. `SCN-08` FOCUSED — Есть Proposal / вариант решения — понять последствия и довести до разрешения

**Type:** FOCUSED  
**Entry assumption:** a real Proposal/candidate route exists; a Finding is not required.

### Step `SCN-08-S1` — establish the candidate and real driver

**Trigger / Situation:** USER/AI/Unit work has produced a material candidate answer/route.  
**AI Action:** Preserve Proposal identity and its actual Goal/Question/Problem driver; ground only missing material USER-only facts/authority.  
**Possible Result:** One responsible unselected Proposal ready for review.  
**Derived From / Owners:** `planning/documentation/idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md`.

### Step `SCN-08-S2` — review semantic change impact

**Trigger / Situation:** The Proposal is material enough that selection consequences may affect current/upstream/downstream meaning.  
**AI Action:** Run canonical Proposal Semantic Change Impact Review proportionally; use applicable Lenses only as evaluators.  
**Method / Mechanics:** Check affected Unit/owner, accepted-meaning change, upstream owner, Requirement/Source/Evidence/downstream/revalidation/temporal consequences and whether durable Decision trace would add future value. Do not assign `RE-*` to the Proposal.  
**Possible Result:** A reviewed candidate with known consequences, or newly surfaced Finding Candidate(s).  
**Derived From / Owners:** `planning/documentation/idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md`, `planning/documentation/idtspe-methodology/active/idtspe-core/lenses/README.md`.

### Step `SCN-08-S3` — disposition newly discovered contradictions only

**Trigger / Situation:** Proposal review newly exposes a material contradiction, unsupported assumption, owner conflict or stale upstream basis.  
**AI Action:** Route that newly surfaced meaning through canonical Finding Disposition and targeted Revalidation as needed.  
**Why This Step:** Known intended impact already stated by a Proposal is not a Finding automatically.  
**Possible Result:** Refined candidate, upstream revalidation, another owner route or bounded additional Unit/Target responsibility.  
**Derived From / Owners:** `planning/documentation/idtspe-methodology/active/idtspe-core/shared/finding-disposition-contract.md`, `UC-IDTSPE-REVALIDATE-CURRENT-WORK`.

### Step `SCN-08-S4` — select and integrate without over-retaining trace

**Trigger / Situation:** Candidate meaning is sufficiently reviewed and applicable selection authority is available.  
**AI Action:** Select/revise/reject/defer through the canonical Proposal lifecycle; integrate selected meaning into affected Unit Result Content / owner.  
**Method / Mechanics:** Material selection has Decision semantics. Retain a separate explicit/durable Decision trace only when rationale/trade-off/revalidation value should survive. Under SDS, selected but unrealized meaning remains in the applicable Evolution Step Target Body until realization/materialization.  
**Possible Result:** Current Result Content / selected future result meaning plus only useful retained resolution trace.  
**Derived From / Owners:** `planning/documentation/idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md`, `planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md`.

[METHODOLOGY_SCENARIO]
{"id":"SCN-08","type":"FOCUSED","title":"Есть Proposal / вариант решения — понять последствия и довести до разрешения","entryRoute":"Starts from a real material Proposal; Finding origin is optional","assumptions":["Canonical Proposal/Decision lifecycle owns candidate/selection semantics"],"steps":[{"id":"SCN-08-S1","title":"Establish the candidate and driver","semanticRefs":["planning/documentation/idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md"]},{"id":"SCN-08-S2","title":"Review semantic change impact","semanticRefs":["planning/documentation/idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md","planning/documentation/idtspe-methodology/active/idtspe-core/lenses/README.md"]},{"id":"SCN-08-S3","title":"Disposition newly discovered contradictions only","semanticRefs":["planning/documentation/idtspe-methodology/active/idtspe-core/shared/finding-disposition-contract.md","UC-IDTSPE-REVALIDATE-CURRENT-WORK"]},{"id":"SCN-08-S4","title":"Select and integrate proportionally","semanticRefs":["planning/documentation/idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md","planning/documentation/idtspe-methodology/active/idtspe-core/shared/idtspe-unit-and-target-step-result-model.md"]}]}
[/METHODOLOGY_SCENARIO]

[METHODOLOGY_SCENARIO]
{"id":"SCN-07","type":"FOCUSED","title":"Нашёлся баг или файндинг — понять, можно ли исправить локально или надо поднимать решение","entryRoute":"Starts from a material Finding Candidate after normal routing; generic Core first, active profile only when implicated","assumptions":["Finding producer is not semantic resolution authority"],"steps":[{"id":"SCN-07-S1","title":"Establish the finding and smallest justified escalation","semanticRefs":["planning/documentation/idtspe-methodology/active/idtspe-core/shared/finding-disposition-contract.md#resolution-escalation","planning/documentation/idtspe-methodology/active/ai-reviewability/README.md"]},{"id":"SCN-07-S2","title":"Keep deterministic/local repair inside accepted meaning","semanticRefs":["planning/documentation/idtspe-methodology/active/idtspe-core/shared/finding-disposition-contract.md"]},{"id":"SCN-07-S3","title":"Resolve current-owner semantic change through Unit Resolution + Proposal selection","semanticRefs":["planning/documentation/idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md","planning/documentation/idtspe-methodology/active/idtspe-core/shared/qrp-lifecycle-and-review-contract.md"]},{"id":"SCN-07-S4","title":"Revalidate upstream before compensating downstream","semanticRefs":["UC-IDTSPE-REVALIDATE-CURRENT-WORK"]},{"id":"SCN-07-S4P","title":"Change upstream accepted meaning only after RE-4 is established","semanticRefs":["planning/documentation/idtspe-methodology/active/idtspe-core/shared/proposal-and-decision-lifecycle-contract.md","planning/documentation/idtspe-methodology/active/idtspe-core/shared/qrp-lifecycle-and-review-contract.md"]},{"id":"SCN-07-S5","title":"Interpret SDS Requirement/depth semantics only when actually implicated","semanticRefs":["LENS-IMPLEMENTATION-REQUIREMENTS-DISCOVERY","planning/documentation/idtspe-methodology/active/profiles/sds/shared/requirement-ownership-and-exception-rule.md"]}]}
[/METHODOLOGY_SCENARIO]

## 12. SDS-Specific Use-Case Test

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

## 13. Maintenance / Scenario Revalidation Rule

When a Use Case/component owner changes materially:

1. find scenario steps whose semantic references include that owner;
2. rerun those scenarios as explanation/integration tests;
3. update scenario prose only when the realistic composition changed;
4. update derived Helper command-equivalent projection when the semantic mapping changed.

The scenario corpus may evolve without becoming runtime authority. A projection/helper must not write command metadata back into these canonical scenarios.
