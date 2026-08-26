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
  proportional Target/scope resolution, typed Sources, applicable Lens/theory references, Ideas/Q-R-P/Decisions, persistence/handoff discipline, without forcing SDS or another profile.
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

For each material planning request:

```text
user/source input
↓
resolve scope / Target Formation
↓
identify current semantic owner(s) and typed Sources
↓
select applicable Lenses / theoretical references only when useful
↓
Questions / Ideas / optional Branches / Q-R-P
↓
Decisions when actually selected
↓
Target-specific output
↓
Artifact Placement when persistence matters
↓
profile-supplied next route when a profile is active
```

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

The mode does not force a visible 15-port form into every reply. Trivial factual/non-planning work remains lightweight. The Shell governs material planning reasoning and ownership even when the visible response is compact.

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

Material outputs may use the independent [`../ai-reviewability/README.md`](../ai-reviewability/README.md) Key Points review projection. Reviewability is a peer concern; it does not become part of Target semantics.
