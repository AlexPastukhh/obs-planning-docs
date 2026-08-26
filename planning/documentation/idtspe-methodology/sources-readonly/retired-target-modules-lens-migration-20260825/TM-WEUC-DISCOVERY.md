# TM-WEUC-DISCOVERY — Contextual Workspace Evolution Use Cases

Entry Point: `tm.weuc.discovery`  
Role: evidence/analysis Target Module  
Repository provenance: Architecture Planning WEUC discovery/work-cost models.

## Purpose
Discover concrete current/future Workspace work that can materially affect architecture, Slice order or branch comparison.

## Upstream Source Contract

### Direct Semantic Sources
```text
the selected/current planning result whose Workspace evolution is being evaluated
relevant Scenario/Behavior/Domain/Slice/Architecture owner refs
```

### Inherited Lineage
```text
Need / selected solution / Application responsibility when they explain why the Workspace change matters
```

### Evidence / Current-State Sources
```text
current workspace owners/state
observed change history / maintenance events
observed work paths / actual friction
SDS Evolution Map items when present
layer Idea Registers as low-confidence discovery input only
```

### Constraint / Planning-State Sources
```text
accepted/candidate future Need/Scenario/capability evolution items with explicit confidence/horizon
future extension hypotheses with evidence
current delivery/architecture constraints
```

### Source Discovery Rule
This is the expected source archetype, not a closed whitelist. `TF-04 SOURCE_SET` may add another real authoritative/evidentiary/constraining Source when the current Target actually depends on it.

## Question Set Examples — Non-Exhaustive

Examples only. Current `TF-06 QUESTION_SET` may add/remove/split/merge questions.

```text
What useful future Workspace result is actually expected?
Who needs it and on what horizon?
What current work overlaps?
What is the expected work path?
What preparation-now cost vs deferred/rework cost exists?
What confidence/evidence supports the demand?
Is this future change only a loose Idea, or an accepted/candidate Evolution Item?
What version/horizon is actually known without inventing precision?
Which future Need/Scenario would create a concrete Workspace work path?
```

## Evolution-Map Lens

Prefer future-change evidence in this order:

```text
observed current/previous work
accepted/planned Evolution Item
credible candidate Evolution Item with evidence
loose layer Idea — discovery input only
```

A loose Idea alone does not justify preparation-now architecture.

## Output

Target-specific output only; generic IDTSPE state is stored by the generic Target envelope.
```text
WEUC type/instance
Need/demand basis
likelihood/horizon/value/confidence
workspace work path
work-cost/friction/risk
current-work overlap
prepare-now/defer comparison
architecture handoff
observed evidence later
```
## Guard
Future likelihood alone does not justify architecture; no invented probabilities.
