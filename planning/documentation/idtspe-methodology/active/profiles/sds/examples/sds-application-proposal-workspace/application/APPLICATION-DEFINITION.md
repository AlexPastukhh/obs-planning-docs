# Application Definition — Methodology Workspace

Target: `APP-METHODOLOGY-WORKSPACE`  
Working name only; final product name is not selected.

Supporting development planning:
- [Evolution Steps Map](../evolution/EVOLUTION-STEPS-MAP.md)
- [Planning Resolution State](../planning/PRS.md)
- [Implementation / realization context](../context/IMPLEMENTATION-CONCERNS.md)

## RU-APP-05 — Application Concept

### Summary

A Git-backed methodology workspace that keeps ordinary Markdown as the primary human/AI representation while making important methodology knowledge structurally controlled and addressable, making that structure easier for AI to inspect and verify, and allowing planning commands to be composed deterministically before they are given to AI.

### How it roughly works

Important semantic fields, identities, relationships, and structural contracts are represented in a machine-checkable layer while substantial prose remains Markdown-oriented. For the first experiment, CUE is the selected structured-layer trial. A build step validates and resolves the structured model and renders familiar Markdown documents and useful derived projections into the repository.

Humans and AI continue to browse GitHub as a normal Markdown knowledge base. Cross-cutting inspection can use structured projections without manually duplicating canonical content. Later, command composition can use the same structured identities/contracts so dependency expansion and mechanical merge happen deterministically before AI semantic execution.

## RU-APP-02 — Existing-Solution / Reference Position

Current direction is **adapt/integrate rather than build the whole semantic engine from scratch**.

- **CUE** is the selected technology to trial first for structured knowledge: schemas/constraints, field-level structured values, references/computation, validation, and generated values.
- **Markdown** remains the primary human/AI consumption representation.
- A **thin Markdown renderer/build layer** is expected to bridge resolved structured data and final Markdown documents. Exact renderer/template technology remains open.
- **Git/GitHub** remains repository, history, review, and ordinary read surface.
- **NixOS module-system ideas** remain a reference for later Command Composition, especially typed merge/effective-configuration behavior; Nix itself is not selected as the application foundation.
- **Nickel, Dhall, and Jsonnet** remain comparison references, not selected foundations for the first Structured Knowledge spike.
- A database, custom DSL, dedicated server, and full UI are not required for the first useful version.

Custom software remains justified as a thin methodology-specific integration layer because existing configuration technologies provide useful primitives but not the whole desired behavior: methodology-specific structured contracts, Markdown preservation, trustworthy inspection, and later deterministic command composition.

## RU-APP-03 — Application Benefits

### AB-01 — Controlled structured knowledge without losing Markdown
Planning position: `SELECTED`

**User Need:**  
Maintain methodology knowledge with substantially more structural control than free-form text provides, without giving up the ordinary Markdown/GitHub representation convenient for humans and AI.

**User Receives:**  
A methodology repository whose important semantic elements can have stable identity, fixed/addressable fields, explicit references, canonical ownership, and deterministic validation while still being consumed as familiar Markdown documents.

**Benefit Promise Boundary / Constraints:**
- `BC-01` — The Application guarantees structural validation/reference consistency for the structured meaning it accepts and faithful projection of that accepted meaning into the configured Markdown representation.
- `BC-02` — Existing methodology semantic owners continue to own methodology meaning; representation/validation does not create a second semantic authority.
- `BC-03` — Long-form prose remains practical to author as Markdown-oriented content where rigid structure adds little value.
- `BC-04` — Derived maps/registries/views remain projections of canonical sources, not independent semantic owners.
- `BC-05` — Normal readers do not need to understand CUE merely to read the methodology.

### AB-02 — Reliable AI inspection and verification of methodology
Planning position: `SELECTED`

**User Need:**  
Let AI investigate, cross-check, and reason over methodology content without reconstructing every structural relationship or repeated fact from prose each time, while preserving the simple direct workflow in which AI can browse ordinary GitHub Markdown.

**User Receives:**  
Reliable structured facts/projections for inspection — addressable semantic fields, validated relationships, useful cross-cutting maps/queries, and provenance — while ordinary GitHub-hosted Markdown remains a first-class readable surface.

**Benefit Promise Boundary / Constraints:**
- `BC-01` — The Application guarantees that structural facts/projections it presents as established are grounded in the validated basis and expose enough provenance/authority information to distinguish derived representation from semantic owner truth.
- `BC-02` — AI remains responsible for semantic reasoning/judgment where reasoning is required; deterministic structure removes avoidable reconstruction work rather than replacing analysis.
- `BC-03` — Ordinary GitHub-hosted Markdown remains a first-class AI read path; structured tooling/API is not mandatory merely to inspect methodology meaning.
- `BC-04` — Markdown production/preservation remains primarily part of `AB-01`; `AB-02` relies on that representation instead of defining a competing document surface.
- `BC-05` — Generated AI-friendly projections never become competing semantic owners.

### AB-03 — Deterministic composition of AI commands
Planning position: `SELECTED`

**User Need:**  
Select the planning commands needed for a task without relying on AI to correctly discover, recursively expand, deduplicate, order, and reconcile every command dependency and repeated contract fragment.

**User Receives:**  
One compact effective AI command built from selected commands, with transitive `includes` expanded, shared dependencies deduplicated, execution order preserved, repeated contributions reconciled, and incompatible composition surfaced before AI execution.

**Benefit Promise Boundary / Constraints:**
- `BC-01` — The Application guarantees deterministic command-composition mechanics for validated command definitions.
- `BC-02` — AI owns semantic execution/reasoning after composition; dependency expansion and mechanical merge are not delegated back to AI.
- `BC-03` — Composition preserves source-command permissions, semantic ownership, dependency ordering, provenance, and deferred-call semantics where applicable.
- `BC-04` — Command Composition remains selected application scope but is not the first implementation spike; Structured Knowledge is trialed first.

## RU-APP-04 — Scenario / Evolution Coverage References

This Unit is navigation/coverage only. Full unrealized Scenario bodies are owned by their Evolution Steps; Application Definition does not duplicate real-life journeys.

| Benefit | Planned Scenario / Evolution coverage | Coverage meaning |
|---|---|---|
| `AB-01` | `EVO-MW-01 / SCN-MW-MAINTAIN-AND-VERIFY-KNOWLEDGE` | Planned real-life path for turning one canonical methodology edit into a valid synchronized repository state or truthful failure. |
| `AB-02` | `EVO-MW-01 / SCN-MW-MAINTAIN-AND-VERIFY-KNOWLEDGE`, `EVO-MW-01 / SCN-MW-INSPECT-METHODOLOGY` | Planned verification and independent inspection journeys with provenance back to ordinary Markdown owners. |
| `AB-03` | `EVO-MW-02 / SCN-MW-COMPOSE-COMMANDS-FOR-AI` | Planned deterministic command-composition journey before external AI semantic execution. |

Canonical development-plan routing is [EVOLUTION-STEPS-MAP.md](../evolution/EVOLUTION-STEPS-MAP.md). This Application Definition is the upstream intent/Benefit basis; it is not a Step-owned Target Application Body.

## RU-APP-07 — Realization Feasibility

Current conclusion: **feasible enough for a bounded spike; final architecture is not yet proven.**

A first useful vertical slice does not require a database, server, or UI:

1. represent a small set of structured methodology objects in CUE;
2. keep substantial prose as Markdown-oriented fragments;
3. validate and resolve the model;
4. render ordinary Markdown owners;
5. render one cross-cutting derived view such as a Lens Attachment Map;
6. run build/validation in GitHub CI;
7. verify that humans and AI can use the resulting repository without caring about the underlying structured layer.

Material feasibility concerns are tracked in [IMPLEMENTATION-CONCERNS.md](../context/IMPLEMENTATION-CONCERNS.md). Highest-value unknowns remain the exact structured/prose ownership split, rendering fidelity, stable reference/address semantics, authoring ergonomics, and whether reverse-dependency/impact behavior needs an additional thin index beyond CUE.

## Current development handoff

This Application Definition is the upstream accepted planning basis for development intent.

Material unrealized downstream behavior is planned through [EVOLUTION-STEPS-MAP.md](../evolution/EVOLUTION-STEPS-MAP.md) and concrete Evolution Steps:

- `EVO-MW-01-STRUCTURED-KNOWLEDGE` — next planned transition for `AB-01` / `AB-02`;
- `EVO-MW-02-COMMAND-COMPOSITION` — deferred transition for `AB-03`, dependent on the structured substrate.

At the current planning depth, Scenario Target Bodies exist inside those Steps and are still in Feature Discovery / Application Behavior Planning maturity. No Feature Target Body is formed yet.

The next evidence direction is a bounded Structured Knowledge Hybrid B spike. It is a trial preference, not proof of the source/renderer split or authorization to implement. The Proposal and current planning Questions remain in PRS.
