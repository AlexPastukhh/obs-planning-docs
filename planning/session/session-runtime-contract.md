<a id="session-runtime-contract"></a>
# Session Interaction Runtime Contract

Responsibility ID: `SESSION.RUNTIME-CONTRACT`

Status: active generic USER↔AI interaction contract.

Purpose: define clean-chat entry, visible meaningful work steps, automatic progression, steering and real gates without creating a second planning/methodology runtime beside always-active IDTSPE.

## 0. Ambient Bootstrap And Inheritance

This contract is **must-understand at session bootstrap or safe context restoration**, not must-traverse on every invocation. Once established, its interaction rules remain ambient across ordinary commands, Documentation work, IDTSPE work and profile-specific work.

```text
Session interaction contract is in force
        ↓ inherited by
command / natural-language request
        ↓ direct semantic routing
current Documentation / IDTSPE / profile / repository owner
```

A command must not route through Session merely to inherit progress, steering or authorization rules. Explicitly reload this contract only when interaction context was lost/staled or those rules cannot be reconstructed safely.

## 1. Clean-Chat Entry

A natural-language USER request is sufficient.

```text
USER request
→ ambient methodology Use-Case applicability recheck
   → Methodology Use-Case Registry Map + only plausible scoped registry rows
→ select the relevant current area / semantic-entry route through README/navigation
   ├─ repository-specific operation: planning/use-case-registry.md
   └─ specialized area work: that area's current functional navigation
→ always-active IDTSPE proportional composition where planning/resolution work is material
→ ordinary work
```

The ambient applicability recheck is always performed for current Planning/repository work, but it is a compact registry-surface check, not a requirement to execute every Use Case or traverse every functional branch. Reuse trustworthy registry metadata while still reaffirming applicability, then open only the functional branch whose Situation/scope plausibly matches the request.

Helper commands/prompts may provide shortcuts, but are optional projections and do not change semantic ownership.

The USER does not need to select a Methodology Use-Case Scenario, enable IDTSPE, or choose a Target before Broad Discussion can begin.

## 2. Meaningful Work Steps

For substantial work, AI may decompose the already-authorized task into natural numbered steps. Each substantial step has one clear goal and an exit condition; large steps may have substeps.

At meaningful transitions report proportionally:

```text
Goal / intended action + why
→ work
→ material result / changed understanding / finding
→ unresolved item when material
→ next natural step
```

A stable/lightweight step may be one sentence. Do not expose a stream of low-level tool operations as the methodology workflow.

## 3. Automatic Progression

```text
current work step reaches its exit condition
+ next step remains inside USER-authorized task
+ no real gate exists
→ continue automatically
```

Do not ask "continue?" merely because another ordinary step begins.

## 4. Progress Visibility

If one meaningful step runs long enough that the USER would otherwise lose orientation, provide an occasional concise update describing useful partial progress and current focus.

Progress updates are transient interaction signals, not State Units or Checkpoints. During IDTSPE work they may project facts already recorded by `Turn Work Record`, but Session owns the conversational timing/shape while `IDTSPE.WORK-RUNTIME` owns the observable Turn Work Record plan/state/trace semantics.

## 4A. Current Work Manifest Re-entry Projection

For substantial multi-pass/session work, Session may expose the IDTSPE-owned **Current Work Manifest** as the primary re-entry/navigation artifact: current USER goal/focus, cross-pass planned actions, material artifact inventory, review/revalidation refs and next action.

Session does not own or independently mutate the Manifest semantics. It projects/uses the current IDTSPE work-context state and may provide conversational progress from it. Progress Updates remain transient interaction signals; the Manifest is retained cross-pass coordination when material.

```text
Session Runtime ≠ Current Work Manifest semantic owner
Session Runtime ≠ second planning runtime
```

## 5. USER Steering

The USER may redirect the work at any time. Re-evaluate the relevant Use Cases, methodology components and affected planning state when direction changes materially.

Preserve unaffected accepted meaning; do not restart the whole methodology merely because one branch changed.

## 6. Proposal-First Mutation Boundary

AI may inspect, research, analyze, compare, classify findings and prepare proposals autonomously inside the requested work.

Before an actual repository/application/documentation/methodology mutation, surface the intended change when the USER has not already authorized that exact mutation scope. Formal IDTSPE Proposal state is used only when candidate meaning benefits from Core addressability/lifecycle/review.

## 6A. USER-Gated Proposal-Driven Interaction

When the USER explicitly requests proposal-driven gating (for example through the direct `пропозал` command or equivalent natural language), apply the canonical USER-gated proposal-driven interaction policy from [`principles-and-terminology.md`](principles-and-terminology.md) to the current task.

```text
cheap read-only investigation needed to frame the next GIP
→ allowed autonomously

GIP grounding insufficient because material USER-only information/choice is missing
→ ask minimum useful USER question directly
→ intake USER answer
→ frame/refine the GIP

important decision / materially different approach
substantial or expensive work batch / large read-search-test-build-tool batch
artifact creation or change / mutation outside already approved exact scope
→ GIP
→ USER approve/select/revise/reject/defer as applicable
→ execute only the selected GIP scope
```

A grounding clarification is a real USER gate when required, but it is not a GIP wrapper. Do not manufacture questions, alternatives or approval requests when trustworthy Sources/current USER input are already sufficient. The policy changes interaction gating only; IDTSPE still owns formal `Proposal`, Q/R/P, `Decision`, Target and Result semantics.

The stricter policy remains active for the current task until the USER explicitly cancels or weakens it, or the task ends.

## 7. Work Steps vs Planning Depth

Work steps are an interaction/runtime axis. Planning depth is methodology/profile semantics. One work step may remain at one depth, traverse several depths, or perform revalidation across them.

A depth transition is not an approval gate by itself.

## 8. IDTSPE Integration

Broad Discussion, planning state, Targets, Lenses and Integration Checkpoints are IDTSPE-owned. Session runtime governs Work Steps/Progress Updates and USER steering. IDTSPE `Turn Work Record` owns the observable methodology work plan/state/route; Session may project that trace conversationally without becoming its semantic owner.

A situational IDTSPE Integration Checkpoint may be performed whenever its Use Case applies; Session does not maintain a competing generic Checkpoint object.

<a id="session-state-runtime-integration"></a>
## Session State / Turn Work Record integration

For substantive work, Session bootstraps/reuses [`SESSION.STATE-RUNTIME`](session-state-runtime-contract.md#session-state-runtime) and one current Turn Work Record before substantive execution. Progress Updates remain transient conversational projections of observable facts already present in that record.

Re-entry order is `README.md` → accepted `WORK-MANIFEST.md` → bounded `resolution/PRS.md` when present → current/retained Work Record/context refs. Session owns interaction timing/shape only.

Material prospective Manifest meaning that AI derives and the USER has not already selected requires the formal Core Proposal + complete candidate target Manifest + PRS route. A Generic AI Proposal may present/reference that formal state but never substitutes for it. Exact USER-selected target meaning may integrate directly with authority trace and recoverable prior revision.

Response completion for substantive Session-State work follows `WR-7` and normally rematerializes the portable Session State archive.
