# UC-IDTSPE-MAINTAIN-LENS — Create / Review / Integrate Reusable Lens

Status: active methodology Use Case  
Purpose: create, extract, merge, split or revise one reusable IDTSPE Lens/Lens Pack without turning it into a Target Module or project semantic authority.

## Trigger

Use when:
```text
one evaluation perspective repeats across Target families
an existing Target Module embeds reusable Lens knowledge
frequent cross-cutting reasoning has no stable owner
several Lens names overlap/duplicate one reasoning loop
an existing Lens has unclear applicability/output/escalation
```

## Inputs

Read proportionally:
```text
active/lenses registry/model
Target Module Lens Profiles
embedded Specialized Lens sections/prompts
Generic Phase Lenses
Branch comparison dimensions
WEUC/change/architecture models
Artifact/Test/Practical packs
real repeated planning cases
```

## Algorithm

```text
1. identify the reusable evaluation perspective
2. prove it is a Lens rather than RQ/Validator/Guard/Rule/Target
3. decide single Lens vs cohesive Lens Pack
4. classify activation:
     REQUIRED_CORE
     FREQUENT_CONDITIONAL
     TARGET_PROFILE_REUSABLE
     LOCAL_ONLY
5. define applicability gate
6. define typical Sources/Evidence
7. define prompts/sublenses
8. define findings produced
9. define Target/profile consumers
10. define composition with other Lenses
11. define guards/anti-patterns
12. define finding→Decision/Target escalation
13. migrate duplicate embedded knowledge
14. update Lens Registry
15. update Target Module Lens Profiles
16. update phase/command/projection routes when needed
17. run mechanical Lens consistency audit
```

## Result

```text
one canonical Lens/Lens Pack owner
+ registry entry
+ activation class/gate
+ consumer/profile mapping
+ migrated duplicate knowledge
+ consistency checks
```

## Boundaries

Do not:
```text
create a Lens for every RQ or checklist item
turn a Lens into semantic authority
create a Target Instance merely because a Lens activated
turn Lens prompts into automatic user questions
split tightly coupled sublenses only to create more files
leave reusable Lens knowledge duplicated inside one Target Module
```

## Promotion Rule

```text
local-only Lens
+ useful in a second Target family or repeated independent planning
→ review for promotion into active/idtspe-core/lenses/ or the owning profile's lenses/
```

## Escalation Rule

```text
Lens finding
→ current Target Idea/Evidence/QRP/Answer Decision
```

Only when the problem has independent useful output + distinct Sources/revalidation boundary:
```text
→ generic Target Formation
→ bounded local Target
```

## Artifact Placement Integration

Creation/maintenance must add/update structured `ARTIFACT_GUIDANCE` records in the Lens source. If the installed profile maintains an Artifact Materialization tree/projection, refresh that profile projection (for current SDS: `active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md`). The projection must cite/group source record IDs rather than invent placement rules; IDTSPE Core does not hard-code one universal profile registry path.
