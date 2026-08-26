# BRANCH-COMP-RC-ROUTE01 — Capture Route Branch Comparison Coordinator

Status: active worked comparison owner

## Root

```text
Target:
  RC-ROUTE-01

Decision subject:
  route for low-friction research capture
```

## Shared Baseline Sources

```text
NEED-RC-01
TS-RC-ROUTE01
Question-Set Decision
Success Meaning
Current Workflow A/B
same constraints
```

## Candidates / Sibling Branches

```text
B existing clipping tool
  → BR-RC-CLIPPER.md

D own lightweight capture
  → BR-RC-OWN-CAPTURE.md
```

## Exploration Objective

```text
compare the routes using downstream review/handoff consequences,
not only local capture convenience
```

## Common Comparison Dimensions

```text
Need fit
Reuse
Capture interruption
Organize-later fit
New responsibilities
Maintenance
Evidence confidence
Q/R/P
Reversibility
WEUC
```

## Comparison

| Dimension | Existing Clipper | Own Capture |
|---|---|---|
| Need fit | medium | high |
| Reuse | high | medium |
| Capture interruption | medium | potentially low |
| Organize-later fit | weak/medium | high |
| New responsibility | low | material |
| Maintenance | low | higher |
| Evidence confidence | high on tool behavior | medium |
| WEUC | local N/A/negligible | material/moderate |
| Main risk | organization coupling | responsibility creep |

## Cross-Branch Q/R/P

```text
Q:
  own-capture interaction still needs practical Evidence

R:
  unequal Evidence confidence can bias comparison

R:
  maintenance burden may erase workflow benefit
```

## AI Recommendation

```text
own lightweight capture
```

Status:

```text
proposal only
```

## Root Decision

```text
D-RC-ROUTE01
Selected:
  own lightweight capture
```

## Revalidation

Future helper should reuse:

```text
this coordinator
BR-RC-CLIPPER
BR-RC-OWN-CAPTURE
```

when watch signals fire.
