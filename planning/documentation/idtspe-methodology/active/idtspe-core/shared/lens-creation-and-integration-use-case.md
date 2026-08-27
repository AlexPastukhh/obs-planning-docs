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
6. define Context Reads
7. define Focused Reads / Analysis Focus
8. define which Core-owned State Unit kinds may receive findings
9. define Fill / Refine and Challenge / Reopen effects
10. define which already-declared Result Units/fields may be affected after normal resolution
11. define External Routing + No-New-Result-Unit Guard
12. define Knowledge Basis through [`knowledge-basis-contract.md`](knowledge-basis-contract.md): INLINE / REFERENCED / HYBRID
13. define embedded principles/rules and/or referenced knowledge owners + load policy
14. define prompts/sublenses/evaluation workflow
15. define findings produced
16. define Target/profile consumers
17. define composition with other Lenses
18. define guards/anti-patterns
19. define finding→Decision/Target escalation
20. define Artifact/File Implications; add AG only for Lens-produced supporting/routing meaning
21. migrate duplicate embedded knowledge / duplicate Target-result artifact guidance
22. update Lens Registry + applicability summary
23. update Target Module Lens Profiles when attachment policy changes
24. update phase/command/projection routes when needed
25. run mechanical Lens consistency audit
```

## Result

```text
one canonical Lens/Lens Pack owner
+ registry entry / applicability summary
+ activation class/gate
+ Operational Evaluation Contract
+ explicit Unit Interaction / Routing
+ Knowledge Basis mode / knowledge-owner links
+ consumer/profile mapping
+ migrated duplicate knowledge/guidance
+ consistency checks
```

## Boundaries

Do not:
```text
create a Lens for every RQ or checklist item
turn a Lens into semantic authority
let a Lens define Core State Unit kinds or Target Result Unit kinds
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
