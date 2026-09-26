# UC-IDTSPE-MAINTAIN-LENS — Create / Review / Integrate Reusable Lens

Status: active methodology Use Case

<a id="uc-idtspe-maintain-lens"></a>
Responsibility ID: `IDTSPE.UC.MAINTAIN-LENS`
Purpose: create, extract, merge, split or revise one reusable IDTSPE Lens/Lens Pack without turning it into a Target Module or project semantic authority.

## Situation

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
Unit-local / rare Target-wide Lens Attachments
embedded Specialized Lens sections/prompts
Generic Phase Lenses
Branch comparison dimensions
WEUC/change/architecture models
Artifact/Test/Practical packs
real repeated planning cases
current concrete TM/Lens dependency declarations
current Unit Lens Attachments in the affected scope
```

## Pre-change Relation Review

Before a material Lens or dependency change, inspect current declared dependencies, affected Unit `Lens Attachments` blocks and Lens registries. A temporary audit table can help enumerate a bounded scope, with source links and explicit coverage. There is no standing attachment or dependency map. Context-emergent applicability remains discoverable through active Lens registries and this Lens's applicability contract.

## Process

```text
1. identify the reusable evaluation perspective
2. prove it is a Lens rather than RQ/Validator/Guard/Rule/Target
3. decide single Lens vs cohesive Lens Pack
4. define Purpose / evaluation objective
5. define Analysis Surface
6. define Applicability & Temporal Trigger Contract:
     Base Applicability / Usefulness
     Opening Triggers
     During-work Invalidators / Recheck Triggers
     Closing Triggers
     Confident-False / Stop Conditions
     False-negative Risks
7. define supported Lens operations:
     ANALYZE
     CHECK
     REFINE
     CHALLENGE
8. define evaluation questions / workflow / dimensions where useful
9. define Typical Findings / Findings-and-Outcomes contract
10. verify `APPLIED — no material finding` is valid
11. verify `NOT_APPLICABLE` semantics wherever application is not forced
12. keep likely owner/materiality/lifecycle fields as hints, not authority
13. verify material findings hand off to generic Finding Disposition
14. identify reusable theory/reference knowledge that materially supports the Lens, when any
15. retain useful references/provenance and interpret broad theory when the Lens needs an applied bridge
16. define guards / anti-patterns / representation implications
17. update registry discovery summary; registry metadata remains routing projection only
18. review predictable Unit/Target attachment consumers from concrete Unit owners; an on-demand attachment audit may help with a wider scope; retain registry/applicability discovery for context-emergent consumers, without moving attachment authority into the Lens
19. migrate duplicate embedded Lens knowledge / duplicate Target-result artifact guidance
20. update aliases / command / projection routes when needed
21. run temporal-trigger + registry + attachment consistency audit
```

Cross-Lens composition consistency is a separate audit concern. One Lens must remain independently executable and does not call another Lens merely because their concerns overlap.

## Result

```text
one canonical Lens/Lens Pack owner
+ registry entry / discovery summary
+ complete Operational Evaluation Contract
+ explicit Analysis Surface / supported operations
+ Applicability & Temporal Trigger Contract
+ Findings / Outcomes contract
+ Knowledge Basis / theory-reference links when useful
+ non-authoritative attachment-consumer/discovery references when useful
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
→ Core Finding Disposition
→ appropriate current/other-owner State/lifecycle destination
```

Only when the problem has independent useful output + distinct Sources/revalidation boundary:
```text
→ Target Formation candidate
→ Target Formation decides reuse existing Target / handoff existing owner / form new bounded local Target
```

## Dependency And Attachment Review

When a Lens adds or changes a material cross-owner `Semantic Owner Dependency`, inspect the affected current declarations and revalidate their consumers. Ordinary Markdown links remain navigation only. Review predictable attached Unit/Target surfaces from concrete Unit `Lens Attachments` blocks; when scope is broad, request a temporary audit table with links to those declarations. No standing dependency or attachment map requires maintenance. Context-emergent Lens use continues through registry discovery and applicability checks.

## Artifact Placement Integration

Creation/maintenance must add/update structured `ARTIFACT_GUIDANCE` records in the Lens source. If the installed profile maintains an Artifact Materialization tree/projection, refresh that profile projection (for current SDS: `active/profiles/sds/representation/ARTIFACT-PLACEMENT-MAP.md`). The projection must cite/group source record IDs rather than invent placement rules; IDTSPE Core does not hard-code one universal profile registry path.
