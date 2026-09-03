# Planning Findings / Q/R/P Completeness Review Workflow

Status: active supporting workflow for planning-concern review
Current semantic authority: [`planning-concerns-and-decisions-model.md`](planning-concerns-and-decisions-model.md) plus the selected methodology/Target owner.
This file is not a repository-level Use-Case owner.
Shared Concern semantics: [`planning-concerns-and-decisions-model.md`](planning-concerns-and-decisions-model.md)

## Purpose

Find missing, duplicate, stale, incorrectly separated/grouped or invalid material Planning Concerns relative to the current semantic plan without making Q/R/P the planning queue.

This workflow reviews completeness/quality of the current concern surface. It does not own the generic Question/Risk/Problem/Concern Group/Decision ontology.

## Owner-Attachment Gate

An active concern must identify:

1. concrete affected UC / Scenario / semantic owner;
2. affected Current/Target planned meaning;
3. Origin / Provenance;
4. material current Question/Risk/Problem state.

No owner/current planned state means the concern is not yet a valid active finding.

## Admission Gate

Cheaply test the candidate against current selected principles, owner meaning and evidence. An obvious consequence is integrated rather than registered. Generic hypothetical future questions without current evidence stay out of active Q/R/P.

Do not treat a closed historical Question as active merely because its retained answer/Decision trace remains useful.

## Shared-Resolution / Grouping Check

For every related cluster ask:

```text
Would one answer / evidence set / selected Decision materially resolve or change several of these Q/R/P?
```

If yes, prefer one Concern Group with linked member concerns instead of presenting each as an unrelated planning concern. Keep member Type/Priority/Concern Category/Status distinct.

Also detect the opposite error: two concerns in the same topical area should remain separate when they require independent resolutions.

## Priority / Category / Status Check

For each material active concern/group verify proportionally:

```text
Priority
→ P0/Critical | P1/High | P2/Normal | P3/Low using shared Review Priority semantics

Concern Category
→ appropriate primary review/filter lens; not owner routing

Status
→ valid for Question/Risk/Problem/Group lifecycle
```

Do not confuse priority with confidence or category. Check whether Group Priority truthfully represents the shared resolution surface while member priority remains visible.

## AI Comment / Resolution-Surface Check

A material AI-produced concern surface should normally do more than list labels. Check whether `AI Comment` usefully separates:

```text
what Current Plan/evidence already implies
realistic options
technical/logical preference when justified
what cannot be inferred / user-owned unknown
minimum useful user question only when it can change the decision
```

Do not require an AI Recommendation when grounds are insufficient. Do not accept a Recommendation mislabeled as a selected Decision.

## Residual / Retained Trace Check

Check lifecycle integrity:

```text
answered Question
→ no longer active

resolved Problem / eliminated Risk
→ no longer active

accepted/mitigated residual Risk or deferred/accepted-limitation Problem
→ remains active while material

material answer/rationale/Decision relation
→ may remain in retained trace even when the originating Question/Problem left active Q/R/P
```

Do not lose a residual Risk/Problem merely because a related Question was answered. Do not retain trivial closed investigative findings forever.

## Area Concern Register / Storage Check

When material concerns are physically distributed, verify that the area has one logical Concern Register and that each Concern/Group has one primary detailed storage location.

Check:

```text
register ID/title/owner/stored-at/priority/category/status
→ points to current detail

Idea / affected-owner references
→ link the same Concern/Group
→ do not maintain duplicate full bodies merely for discoverability
```

The current workflow/profile determines whether the register is a section or a separate file.

## Discovery Depth

Manual-first over the registered/current semantic graph. Broaden discovery only for an explicit completeness request, new evidence exposing a missing relation/contradiction, insufficient graph for current correctness, or accepted change requiring immediate known-dependent recheck.

## Review Order Lens

When several attached concerns are material in the current semantic scope, derive review order from:

```text
Concern Priority
+ dependency / blocking
+ affected-owner / blast radius
+ timing / Review Currency
```

Do not use a global Q/R/P order to select an unrelated planning unit. Review Order is not a second priority field.

## Lifecycle

Silence is not closure. Close only by explicit authority, unambiguous integrated later evidence, removal of the premise through selected plan change, or checked evidence that the concern is obsolete/invalid.

When closure occurs, update active projection, retained trace when material, Area Concern Register and Decision relations consistently.

## Exit

Return only material corrections:

```text
missing concerns/groups
incorrectly split/merged groups
duplicate/stale/obsolete concerns
priority/category/status corrections
missing AI Comment boundary / unsupported Recommendation→Decision promotion
residual/retained-trace corrections
Area Concern Register / storage-reference corrections
```

A valid result is `no material concern-surface correction found`.
