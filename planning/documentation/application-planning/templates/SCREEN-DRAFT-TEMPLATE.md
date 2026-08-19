# Screen Draft Template

Status: active reusable recommended template
Purpose: plan one application Screen/surface as a spatial/visual owner without duplicating Scenario behavior.

Detailed workspace contract: [`../detailed-planning/README.md`](../detailed-planning/README.md)

## Workspace Shape

```text
SCR-X/
├── README.md
├── screen.md
├── ideas/
└── visual/
```

Do not create Screen-local `data/` or `behavior/` folders. Screen planning owns spatial/visual boundaries; Scenario/shared Scenario owners retain DATA and behavior truth.

## Screen

| Field | Value |
|---|---|
| Screen ID | <stable ID> |
| Title | <title> |
| Status | preliminary / reviewed / accepted-current / needs-review |
| Spatial responsibility | <what application surface/space this owner defines> |
| Related Scenarios | <Scenario links> |
| Prototype origin/evidence | <PSCR/Prototype result when useful> |
| Related spatial/visual Requirements | <links when material> |
| Related Screens | <when useful> |

### Spatial Boundaries
<What belongs inside/outside this Screen.>

### Zones / Regions
<Major spatial areas and their purpose. Do not turn every small region into a new owner automatically.>

### Scenario Coverage

| Scenario | Screen Role | Zones / Visual States Used |
|---|---|---|
| <SCN-X> | entry / primary / supporting / result / other | <zones/states> |

Every material Screen → Scenario relation must also be discoverable from the Scenario owner's Screens Used / flow references. This does not transfer behavioral authority to the Screen.

### Spatial / Visual Requirements
<Selected layout hierarchy, placement, visibility/arrangement rules and other spatial meaning. These are Screen requirements; behavioral conditions/transitions remain Scenario/Behavior truth.>

### Visual States
<Material visual/layout states. Behavioral transitions remain owned by Scenarios.>

### Visual References
<Link wireframes, mockups, annotated screenshots, spatial maps and other `visual/` owners.>

## Cross-File Dependencies / Reference Object Candidates — When Material

| Source Owner | Meaning Used Here | Use Here | Usage Mode | RO Candidate | Materialized RO |
|---|---|---|---|---|---|
| <owner> | <canonical fragment/reference> | <Screen use> | semantic link / paraphrase / exact-literal candidate | yes / no | no / existing `ro_*` |

Do not turn ordinary Scenario → Screen semantic relations into Reference Objects. A consumer-side candidate note does not redefine the source meaning.

## Current Decisions
<Use the shared detailed-planning Current Decisions contract.>

## Questions / Risks / Problems
<Use the shared contract; each real unit includes Current Draft Plan + Finding + Relation / Impact On Current Draft Plan. When Related Idea(s) exist, apply the shared Idea ↔ Q/R/P mirror/reference rule.>

## Potential Simplifications / Better Routes — When Material
<Only unselected changes to the current Screen/spatial draft.>

## Boundary Rule

```text
Scenario → behavior / actor understanding / result / acceptance
Screen   → spatial composition / zones / visual states
```

If a visual artifact implies a behavioral rule, ensure that behavioral truth is owned/referenced from the appropriate Scenario/Behavior owner rather than remaining accidental Screen-only truth. Frontend Slice plans own implementation mechanisms that realize selected Screen requirements; they do not redefine this spatial authority.
