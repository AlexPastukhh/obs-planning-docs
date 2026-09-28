# APP-PH — OBS Planning Helper Application Definition proposal

**Proposal:** `PR-PH-APP-01` — OPEN / unselected candidate for `TM-APPLICATION-DEFINITION`. Every Unit and `KBF-PH-*` item below remains candidate meaning. The [resolution navigation](application-definition.resolution.md) projects Q/R/P status; this file is neither accepted upstream authority nor a claim that all proposed behavior is realized.

**Target Goal / Desired Outcome:** a person planning in ChatGPT can find and use current planning content with less manual repository navigation while keeping local catalog work and repository authority clear. This real-world value is still a candidate to test.

**Source Set:** user instruction to begin SDS documentation; [Helper README](README.md); [current application Scenarios](scenarios/README.md). No selected Fundamental Need or complete alternative-route comparison was found here.

**Module inventory:** [current Application Definition Target Module](../../../idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md) supplies `RU-APP-05`, `RU-APP-02`, `RU-APP-08`, `RU-APP-07`. Retired `RU-APP-03/04` are not instantiated.

## RU-APP-05 — Application Concept

**Methodology:** [Application Concept](../../../idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md#application-concept).

**Summary:** OBS Planning Helper is a Tampermonkey companion surface for people using planning methodology in ChatGPT. It aims to reduce the work of finding and invoking current content while making local and repository-backed catalog work explicit.

**How it roughly works:** It projects canonical repository/methodology sources into browsable commands, Scenarios and Prompts, keeps a local working snapshot for ordinary use and performs repository reads/writes only through explicit supported user actions.

**Disposition:** OPEN pending selection of the own-Application justification and key focus. The current implementation is evidence, not selection of this upstream Concept.

## RU-APP-02 — Existing-Solution / Reference Position

**Methodology:** [Existing-Solution / Reference Position](../../../idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md#existing-solutions--market--reference-research).

**Disposition:** OPEN (`Q-PH-APP-02`). Compare complete routes: ChatGPT/browser/repository workflow, adapted command palette, smaller hybrid and current Helper. The working implementation supports feasibility but does not by itself prove the custom route's necessity. External observations remain Evidence, not imported Requirements.

<a id="own-application-justification-key-behavior-focus"></a>
## RU-APP-08 — Own-Application Justification / Key Behavior Focus

**Methodology:** [Own-Application Justification / Key Behavior Focus](../../../idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md#own-application-justification-key-behavior-focus).

**Disposition:** OPEN (`Q-PH-APP-01/02`). Candidate justification: a small own surface may preserve canonical planning-source provenance and explicit local/repository state while reducing navigation and invocation friction. Whether available or hybrid routes cover this sufficiently, and whether local publish/recovery belongs in the same Application, are unresolved. The following focuses are candidate Application behavior, not selected Features or a Benefit catalog.

<a id="kbf-ph-current-content-01"></a>
### KBF-PH-CURRENT-CONTENT-01 — Find trustworthy current content

Make relevant command, methodology capability, working Scenario and Prompt content navigable with source/owner context. Grouping, favorites and order are presentation only; canonical registries, command definitions, Scenario owners and Prompt files retain their semantic authority. [Discovery Scenario](scenarios/SCN-PH-DISCOVER.md) supplies the concrete journey.

<a id="kbf-ph-invocation-02"></a>
### KBF-PH-INVOCATION-02 — Insert the intended invocation explicitly

Present a chosen current command's available context, composition and owner references and insert its invocation only on user action. The Helper does not select Targets, decide methodology applicability or execute commands; the chat participant/runtime interprets canonical content. [Use Scenario](scenarios/SCN-PH-USE.md) owns the journey.

<a id="kbf-ph-local-reconciliation-03"></a>
### KBF-PH-LOCAL-RECONCILIATION-03 — Reconcile local work and repository-backed content

Support usable local drafts/layout, explicit comparison, supported publication/reload and truthful recovery without turning cache or generated seeds into repository authority. Repository writes occur only through an explicit supported action. [Local](scenarios/SCN-PH-MANAGE-LOCAL.md), [check](scenarios/SCN-PH-CHECK-REPOSITORY.md), [publish](scenarios/SCN-PH-PUBLISH.md) and [recover](scenarios/SCN-PH-RECOVER.md) Scenarios own distinct paths.

The former `AB-PH-01..03` clauses are unselected source material redistributed here by natural owner. The former two real-life sketches are Scenario evidence/read paths, not a `RU-APP-04` Unit or newly selected Scenario results. Concrete path order, branching, `SPS-*` and any independent `SR-*` remain with Scenario owners; Feature/Screen responsibility remains downstream.

## RU-APP-07 — Realization Feasibility / Early Implementation Planning

**Methodology:** [Realization Feasibility](../../../idtspe-methodology/active/profiles/sds/target-modules/TM-APPLICATION-DEFINITION.md#realization-feasibility).

**Evidence:** [implementation README](README.md), [source](src/planning-helper-runtime.js) and eight [current Scenario documents](scenarios/README.md) support representative technical feasibility. Projection provenance, local versus repository state, explicit side effects and truthful conflict/recovery remain application-level planning pressures; later natural owners and tests resolve durable behavior/proof.

**Disposition:** OPEN for selected Application Definition. Implementation existence cannot decide whether all candidate focuses are worth custom software or whether another route is sufficient.

## Selection and temporal boundary

The proposal stays OPEN until the user selects/amends exact upstream meaning through its proper lifecycle. Selection would not prove every downstream capability realized. Future unrealized changes belong in Evolution Steps and their Target Owner Bodies; current Scenarios remain their own authority only for the behavior they actually declare.

## Core resolution state attached to this candidate

Q/R/P below attach to their smallest affected candidate Units. They do not add Result Units. [Resolution navigation](application-definition.resolution.md) points here without copying bodies.

<a id="q-ph-app-01"></a>
### Q-PH-APP-01 — Which justification and key behavior focus should be selected?

- **Type / status / priority:** Question / open / P1.
- **Affected meaning:** `PR-PH-APP-01 → APP-PH / RU-APP-05, RU-APP-08`.
- **Origin:** request to start SDS documentation; README and current Scenario catalog provide candidate evidence.
- **Meaning:** current behavior is documented, but selected upstream Need, own-Application justification and the boundary of the proposed key focuses are not. In particular, decide whether local draft/publish/recovery belongs with discovery/invocation.
- **Close when:** the user selects/amends the proposition or authoritative Application intent resolves it.

<a id="q-ph-app-02"></a>
### Q-PH-APP-02 — Are existing or hybrid routes sufficient?

- **Type / status / priority:** Question / needs evidence / P1.
- **Affected meaning:** `PR-PH-APP-01 → APP-PH / RU-APP-02`, with consequences for `RU-APP-05/08/07`.
- **Evidence needed:** compare realistic complete routes against candidate focus and authority boundary, including a smaller custom projection; do not use current implementation as self-justification.
- **Close when:** proportionate evidence supports a route or changes the candidate proposition.

<a id="r-ph-app-01"></a>
### R-PH-APP-01 — Projection may be mistaken for methodology authority

- **Type / status / priority:** Risk / open / P1.
- **Affected meaning:** `PR-PH-APP-01 → APP-PH / RU-APP-08, RU-APP-05`; current [projection authority](README.md#projection-authority).
- **Adverse possibility:** displayed command text, generated seeds, groups or local edits could be described as owning methodology/command semantics.
- **Current guard / proposed treatment:** the README states the projection boundary. Candidate wording is not accepted mitigation. Recheck if the focus is selected or downstream owners change.

### Proposal review and semantic impact

The previous Lens review of a Benefit-era proposal is historical provenance, not a closing CHECK of this four-Unit candidate. Selection readiness remains OPEN while `Q-PH-APP-01/02` lack answers. The current README/Scenarios and implementation are Sources/Evidence; the proposed `KBF-PH-*` items do not become current drivers before selection. [`P-PH-APP-01`](application-definition.resolution.md#p-ph-app-01) remains an open current documentation gap. A later selected result would hand concrete journey meaning to `SCN-PH-*` and behavior/spatial meaning to natural owners without copying Scenario authority.
