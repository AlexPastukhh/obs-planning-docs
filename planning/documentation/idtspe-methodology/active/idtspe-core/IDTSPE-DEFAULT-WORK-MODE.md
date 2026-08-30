# IDTSPE Default Work Mode — Use The Core Shell For Material Planning Work

Status: active generic operating-mode contract  
Desired command ID: `idtspe.work`  
Canonical user command: `работай через idtspe`

Suggested aliases:

```text
режим idtspe
используй idtspe для работы
планируй через idtspe
```

## Helper Presentation

```text
When To Use:
  when the assistant should treat IDTSPE Core as the default shell for material planning work in the current context, including scope formation and handling AI proposals as Ideas.

What You Get:
  ordinary Broad Discussion whose material logical parts use Key Points and may carry explicit Ideas/Q-R-P/Evidence inline, plus periodic Integration Checkpoints that reconcile the current Target Goal context, Generic State, Target Result and persistence/handoff when useful, without forcing SDS or another profile.
```

## Purpose

Make the generic IDTSPE Core Shell the default interpretation for subsequent **material planning work** in the current working context, without forcing SDS or any other profile.

This is separate from bootstrap:

```text
idtspe.bootstrap
→ load/refresh methodology governance

idtspe.work
→ use the loaded Core Shell as the default planning operating mode
```

If Core governance is not sufficiently current, `idtspe.work` may perform the necessary bootstrap/targeted refresh internally; the user should not have to invoke bootstrap first.

## Default Interpretation

For material planning, keep one current Target/context when resolved and work iteratively rather than forcing a complete Step Result on every message:

```text
user/source input
↓
resolve/reuse scope and Target context when needed
↓
Broad Discussion
  material logical parts → Key Points
  material Ideas are explicit and Address current Target Goal / Question / Problem
  applicable Lens analysis may contribute discussion
  no mandatory per-response Intake Summary / block-owner record
↓ when a whole-state integration view is useful/requested
Integration Checkpoint
  resolve/reuse Target Module or Local Target Contract
  reconcile Sources + current Generic State + accumulated discussion
  integrate applicable Target Result Units
  apply relevant Lens / consistency checks
  retain accepted Decisions / preserve unresolved alternatives
  separate semantic retention from physical placement
↓
continue Broad Discussion / handoff / revalidation
```

Target Formation, Source/Lens resolution and Knowledge Basis loading remain proportional and may occur before or during this loop as the current context requires.

### AI-generated proposals

```text
AI suggestion / alternative / design proposal
→ Idea by default
→ not an accepted Decision merely because the AI proposed it
```

The assistant may compare and recommend Ideas, but user-owned selections/constraints follow the normal authority rules.

### Scope before solution

The assistant should resolve the narrowest useful planning Target/scope before turning a broad request into implementation detail. If the request legitimately spans several Targets, represent that explicitly instead of pretending it is one local decision.

### Existing artifacts first

Existing canonical owner artifacts are Sources for repeated planning. The mode should prefer `REFINE / EXTEND / REVALIDATE / REPAIR` of an existing Target over inventing a duplicate Target.

## Proportionality

The mode does not force a visible 15-port form, full Generic State, Target Result or Artifact Placement into every reply. Broad Discussion may span many conversational turns; material logical parts use Key Points proportionally and material Ideas remain explicit with their `Addresses` driver. No mandatory per-response Intake Summary or block-owner record is required. When the user requests a checkpoint, a full Target invocation is being used as one, or a whole-state integration view is otherwise useful, perform an Integration Checkpoint and show the current Target Goal context plus coherent applicable Generic State + Target Result. Trivial factual/non-planning work remains lightweight.

Canonical interaction model: [`shared/broad-discussion-and-integration-checkpoint-model.md`](shared/broad-discussion-and-integration-checkpoint-model.md).

## Profile Boundary

`idtspe.work` does not select SDS automatically.

```text
no active profile
→ generic IDTSPE Core planning

SDS Target/profile resolved
→ Core Shell + SDS Target Module/Lenses/workflow

future profile resolved
→ Core Shell + that profile
```

## Relationship To AI Reviewability

The independent [`../ai-reviewability/README.md`](../ai-reviewability/README.md) Key Points contract applies proportionally to material outputs. In Broad Discussion, Key Points structure material logical parts; checkpoints may additionally include an optional Broad Discussion Summary. No mandatory block-owner or per-response Intake Summary is required. These are review projections, not Target semantics.
