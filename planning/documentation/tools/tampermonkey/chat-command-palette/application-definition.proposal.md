# APP-PH — OBS Planning Helper Application Definition proposal

**Proposal:** `PR-PH-APP-01` — OPEN / unselected. This is a candidate `TM-APPLICATION-DEFINITION` Target Instance. Its enclosing Proposal status applies to every `RU-APP-*` and `AB-PH-*` item below. Candidate-local Q/R/P and review provenance are attached after the Result Units; the [resolution navigation](application-definition.resolution.md) projects their status and records the current documentation gap. Core lifecycle contracts govern Q/R/P and selection. This file is not the accepted Application Definition or a snapshot of all realized behavior.

**Target Goal / Desired Outcome:** during ChatGPT-assisted planning, a person can find and use current planning content with less manual repository navigation, while keeping local catalog work and repository authority clear. This is candidate real-world value to test, not a selected Need.

**Source Set:** user instruction to begin SDS documentation here; [current Helper README](README.md); [current application Scenario catalog](scenarios/README.md) and its `SCN-PH-*` owners. No separate Fundamental Need/Step-02 selection or external-route comparison was found in this area; the corresponding questions remain open in the resolution state.

**Module / Unit inventory:** [`TM-APPLICATION-DEFINITION`](../../../idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md): `RU-APP-05`, `RU-APP-02`, `RU-APP-03`, `RU-APP-04`, `RU-APP-07`. Concept is presented first with its stable ID; retired `RU-APP-01` is no longer instantiated. `RU-APP-06` is not a standalone Unit; each Benefit carries its own boundary/constraints.

## RU-APP-05 — Application Concept

**Methodology:** [RU-APP-05 Unit definition](../../../idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md#application-concept).

**Summary:** OBS Planning Helper is a Tampermonkey companion surface for people using planning methodology in ChatGPT. It reduces the work of finding and invoking current planning content and makes local versus repository-backed catalog work explicit.

**How it roughly works:** It projects canonical repository/methodology sources into browsable commands, Scenarios and Prompts, keeps a local working snapshot for ordinary use and performs repository reads or writes only when the user invokes the corresponding action.

**Disposition:** OPEN until the contribution and Benefit set are selected. This concept does not define downstream Feature, Screen, Domain or implementation details.


## RU-APP-02 — Existing-Solution / Reference Position

**Methodology:** [RU-APP-02 Unit definition](../../../idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md#existing-solutions--market--reference-research).

**Disposition:** OPEN (`Q-PH-APP-02`). The current working implementation is feasibility evidence, not a build-versus-existing-solution conclusion. Compare whole routes for the Benefits below: existing ChatGPT/browser/repository workflows, an adapted command palette, a smaller hybrid and the current custom Helper. Keep any external observations as Evidence; do not import another product's behavior as a Requirement.

## RU-APP-03 — Application Benefits

**Methodology:** [RU-APP-03 Unit definition](../../../idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md#application-benefits).

**Disposition:** OPEN until the proposed Benefit set and its boundaries are selected (`Q-PH-APP-01`).

<a id="ab-ph-01"></a>
### AB-PH-01 — Find trustworthy planning content

**User Need:** A person planning in ChatGPT needs to locate the relevant current command, methodology capability, working Scenario or Prompt and understand its role before using it.

**User Receives:** A navigable view of current content with enough context, result, source and owner information to choose and inspect the right item without reconstructing the repository map manually.

**Responsibility Boundary / Constraints:**

- **Application-owned contribution:** discovery, grouping, search and display of source/owner provenance for the projected catalog.
- **External authority:** canonical methodology registries, direct command definitions, working Scenario owners and Prompt files own their respective meaning; the user chooses what to inspect and use.
- **Benefit constraint:** Favorites, order and presentation groups do not change semantic authority. See [SCN-PH-DISCOVER](scenarios/SCN-PH-DISCOVER.md) and [SCN-PH-USE](scenarios/SCN-PH-USE.md).

<a id="ab-ph-02"></a>
### AB-PH-02 — Use the intended command in the current chat

**User Need:** After choosing a planning capability, the user needs its current invocation body in ChatGPT with the visible dependency and owner context needed to use it correctly.

**User Receives:** The chosen command can be inspected and inserted into the chat from one surface, with canonical context/result/essence, command composition and owner references where the source provides them.

**Responsibility Boundary / Constraints:**

- **Application-owned contribution:** present the selected command's canonical invocation context and perform the explicit insertion action.
- **External authority:** direct command files and semantic owners determine invocation content and methodology behavior; the chat participant and IDTSPE runtime interpret and execute that content.
- **Benefit constraint:** Helper UI does not select Targets, decide methodology applicability or create independent command semantics. See [SCN-PH-USE](scenarios/SCN-PH-USE.md).

<a id="ab-ph-03"></a>
### AB-PH-03 — Work locally and reconcile with repository authority

**User Need:** The user needs to draft or arrange Helper content locally, inspect repository differences and deliberately save or recover repository-backed state without confusing local cache with durable semantic truth.

**User Receives:** Local drafts and personal layout remain usable without background repository traffic; explicit check, sync, reload, save and recovery actions show or change the intended side of the local/repository boundary.

**Responsibility Boundary / Constraints:**

- **Application-owned contribution:** local snapshot and presentation state, supported local draft operations and explicit repository transfer/recovery mechanics.
- **External authority:** the user chooses when to inspect, publish or recover; the repository's canonical files remain semantic sources and generated seeds remain derived.
- **Benefit constraint:** a local edit or import does not publish semantic changes, and repository writes happen only through an explicit supported action. See [SCN-PH-MANAGE-LOCAL](scenarios/SCN-PH-MANAGE-LOCAL.md), [SCN-PH-CHECK-REPOSITORY](scenarios/SCN-PH-CHECK-REPOSITORY.md), [SCN-PH-PUBLISH](scenarios/SCN-PH-PUBLISH.md) and [SCN-PH-RECOVER](scenarios/SCN-PH-RECOVER.md).

## RU-APP-04 — Representative Real-Life Scenarios

**Methodology:** [RU-APP-04 Unit definition](../../../idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md#representative-real-life-scenarios).

**Disposition:** OPEN with two candidate examples. Recheck them against the selected Benefits and their boundaries.

### RLS-PH-01 — Choose a command during planning

**Actor / real-world situation:** A user is discussing a planning task in ChatGPT and needs the current methodology route before continuing.

1. The user is trying to move a planning discussion forward and needs to identify the relevant current methodology capability.
2. **[Target contribution]** The Helper makes the relevant canonical planning content and its provenance available for inspection. **[[AB-PH-01](#ab-ph-01) manifests]**
3. The user decides which capability fits the discussion.
4. **[Target contribution]** The Helper places that capability's current invocation into the chat at the user's request. **[[AB-PH-02](#ab-ph-02) manifests]**
5. The user and chat runtime continue the planning work under the command's actual semantic owners; this surrounding work is outside the Helper's Application contribution.

### RLS-PH-02 — Restore a repository-backed catalog after local drift

**Actor / real-world situation:** A user has worked locally, then needs to know how local catalog state relates to the repository and restore repository-backed content when appropriate.

1. After local preparation or a new session, the user needs to resume planning with trustworthy catalog content and avoid losing useful local work.
2. **[Target contribution]** The Helper makes the local versus repository-backed state understandable. **[[AB-PH-03](#ab-ph-03) manifests]**
3. The user decides whether to keep local work, publish a supported record or recover repository-backed content.
4. **[Target contribution]** The Helper carries out the explicitly chosen catalog transfer or recovery within its documented authority boundary. **[[AB-PH-03](#ab-ph-03) manifests]**
5. The user resumes planning. Semantic correctness of the content remains with the user and canonical owners.

These RLS examples explain value in real use; detailed UI sequences and failure behavior remain with `SCN-PH-*`, not with the Application Definition.


## RU-APP-07 — Realization Feasibility

**Methodology:** [RU-APP-07 Unit definition](../../../idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md#realization-feasibility).

**Evidence:** The current [implementation README](README.md) and [source code](src/planning-helper-runtime.js) show an existing Helper implementation; eight [application Scenario owners](scenarios/README.md) define its documented behavior. This supports representative feasibility for the candidate concept, subject to current behavior validation.

**Disposition:** OPEN for a selected Application Definition. Existing implementation does not settle whether all proposed Benefit boundaries are desirable, whether another route is sufficient, or which downstream details should be retained or changed. Recheck if `RU-APP-02` evidence or later Scenario/implementation findings alter the contribution.

## Selection and temporal boundary

The candidate remains Proposal-scoped until an authorized selection integrates exact accepted meaning into one canonical Application Definition representation. Selection of upstream Application intent would not claim that every downstream capability is already realized. Any later unrealized Feature/Scenario/Screen/Domain/Slice/Shared changes require their own natural SDS owners and, where applicable, Evolution Steps.

## Core resolution state attached to this candidate

These items are attached to the smallest affected candidate `APP-PH / RU-APP-*` subjects. They are Core Q/R/P and review state, **not** extra `RU-APP-*` Result Units or selected Application meaning. The [resolution navigation](application-definition.resolution.md) references them without duplicating their bodies.

<a id="q-ph-app-01"></a>
### Q-PH-APP-01 — Which application contribution and Benefits should be selected?

- **Type / status / priority:** Question / open / P1.
- **Affected meaning:** `PR-PH-APP-01 → APP-PH / RU-APP-05, RU-APP-03`.
- **Origin:** User request to start SDS documentation with an Application Definition proposal; current Helper README and application Scenarios supply the candidate basis.
- **Meaning:** The current sources establish what the Helper does, but do not establish a selected upstream real-world Need/solution contribution or that the proposed whole-application contribution and three Benefit boundaries express the user's selected intent. In particular, confirm whether local draft/publish/recovery value belongs in the same Application contribution as discovery and invocation.
- **Addressed by:** `PR-PH-APP-01`. The candidate can be reviewed now; selection remains open.
- **Close when:** the user selects or amends the contribution and affected Benefits, or supplies existing authoritative Application intent that resolves the question.

<a id="q-ph-app-02"></a>
### Q-PH-APP-02 — Are existing or hybrid routes sufficient for the same Benefits?

- **Type / status / priority:** Question / needs evidence / P1.
- **Affected meaning:** `PR-PH-APP-01 → APP-PH / RU-APP-02`, with consequences for `RU-APP-05, RU-APP-03, RU-APP-07`.
- **Origin:** The Application Definition module requires a proportional build/buy/adapt/integrate challenge. The current README documents a working custom Helper, but not a same-Benefit route comparison.
- **Meaning:** A browser or ChatGPT-native workflow, repository tooling, another command palette, or a smaller hybrid may satisfy some or all proposed Benefits. The existing implementation is feasibility evidence; its existence does not by itself justify the full long-term Application boundary.
- **Evidence needed:** Compare realistic routes against the proposed Benefits and authority boundaries, including the option to keep a smaller custom projection. Research depth should match the decision impact.
- **Close when:** proportionate evidence supports a chosen route or changes the candidate's contribution/Benefits.

<a id="r-ph-app-01"></a>
### R-PH-APP-01 — Projection may be mistaken for methodology authority

- **Type / status / priority:** Risk / open / P1.
- **Affected meaning:** `PR-PH-APP-01 → APP-PH / RU-APP-03` Benefit boundaries and `RU-APP-05`; current [projection authority](README.md#projection-authority).
- **Origin:** Candidate Application Definition review against the current Helper authority contract.
- **Adverse possibility:** Later SDS documentation may describe displayed command text, generated seeds, groups or Helper-local edits as the semantic owner of methodology/commands.
- **Current guard / proposed treatment:** The current README states the projection boundary. The candidate repeats the Helper's bounded presentation, insertion and repository-operation responsibility in the relevant Benefits. That candidate wording is not an accepted mitigation. Recheck the risk when Benefit boundaries are selected or downstream Feature/Scenario docs are added.

### Proposal review and semantic impact

- **Review provenance:** `LENS-PROPOSAL-DECISION-RESOLUTION-CONTEXT` `ANALYZE` and `LENS-APPLICATION-BOUNDARY-FEASIBILITY` `ANALYZE` on the former six-Unit `APP-PH` result (historical provenance); the present five-Unit result has a structural Concept-first migration, with contribution represented by `RU-APP-05` and no new selection, using the README and `SCN-PH-*` catalog. Selection-readiness `CHECK` remains pending while `Q-PH-APP-01/02` are open; recheck after new user intent or existing-solution evidence.
- **QRPE view:** `Q-PH-APP-01`, `Q-PH-APP-02`, `R-PH-APP-01`, and [`P-PH-APP-01`](application-definition.resolution.md#p-ph-app-01); evidence is the current Helper README and application Scenarios. This is a review view, not another State kind.
- **Most upstream affected owner:** prospective Helper Application Definition. No accepted Application Definition is overwritten by this proposal.
- **Downstream consequence if selected:** existing `SCN-PH-*` behavior owners and later Feature/Screen/implementation planning can reference the selected `AB-PH-*` Benefits; selection alone does not rewrite those owners or prove realization.
- **Recommendation:** review the candidate's contribution and Benefit boundaries with the user, then compare alternatives proportionally. This recommendation is not selection.
