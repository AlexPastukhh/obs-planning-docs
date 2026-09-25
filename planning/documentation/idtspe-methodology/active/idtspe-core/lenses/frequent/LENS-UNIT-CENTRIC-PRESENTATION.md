<a id="lens-unit-centric-presentation"></a>
# LENS-UNIT-CENTRIC-PRESENTATION — Unit-Centric Presentation

Lens ID: `LENS-UNIT-CENTRIC-PRESENTATION`
Activation: `FREQUENT_CONDITIONAL`
Status: active generic Core Lens

## Purpose

Keep Units as the main visible reading path of a Target presentation. Evaluate and refine progressive disclosure of supporting context without changing content ownership, completeness or resolution semantics. This Lens owns its presentation criteria and embedded Knowledge Basis.

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Lens Meta-Model](../LENS-MODEL.md#lens-meta-model) — `LENS.META-MODEL`.
> - `CONTEXTUALIZES` [Target Work Unit](../../runtime/target-work/UNIT-AND-TARGET-STEP-RESULT-MODEL.md#twu-unit-contract) — `TWU.UNIT-CONTRACT`.
> - `CONTEXTUALIZES` [Finding Disposition](../../resolution/findings/FINDING-DISPOSITION.md#resolution-finding-disposition) — `RESOLUTION.FINDING-DISPOSITION`.

## Applicability Gate

Select this Lens when creating or materially revising a user-facing Target presentation with substantial supporting content outside its Units, or when the user requests a presentation check. Apply equally to chat output, Markdown documents and checkpoint projections; persistence is not a prerequisite. Target context must already exist or be naturally supplied by the analysis surface; do not manufacture a Target to run this Lens.

For automatic presentation-boundary checks, select CHECK when this gate is met, or reuse a current check for the same operation, surface and relevant basis. Explicit applications preserve the selected supported operation (ANALYZE, CHECK, REFINE or CHALLENGE); automatic CHECK does not replace it or count as coverage of another operation. A compact presentation may be NOT_APPLICABLE for automatic selection when no material presentation issue exists. An explicit request to check a supplied Target presentation still performs CHECK and may conclude CHECKED_NO_CHANGE; short length alone is not grounds to skip that request. Missing or unsuitable Target presentation is reported explicitly rather than invented. Registry discovery does not execute every Lens on every turn.

## Analysis Surface / Inputs

- Primary surface: the actual Target presentation, Unit headings, Unit bodies and supporting blocks.
- Conditional surface: navigation, source/owner context, methodology notes, examples, history and pass traces surrounding Units.
- Relevant State: status, blockers, Questions, Risks, Proposals and authority limitations needed for the user's next action; these may naturally belong outside Units.
- Context: intended audience, current operation, rendering capabilities and existing source/anchor links.

## Supported Operations / Evaluation Workflow

- ANALYZE: identify the primary Unit reading path, supporting blocks and essential visible information.
- CHECK: apply the criteria below to the actual presentation, including the selected renderer when available.
- REFINE: propose precise regrouping, summaries and disclosure boundaries while retaining content and owner links.
- CHALLENGE: test whether a collapsed block conceals something required to understand the result or act safely, or whether unnecessary expansion distracts from Units.

## Presentation Criteria

1. Keep the Target title, concise status, Unit headings and substantive Unit content visible by default. Units may use their existing tables/subsections and explicit omission dispositions.
2. Supporting blocks outside Units exceeding roughly two short logical lines default to closed HTML `<details>` with a descriptive `<summary>`. Judge content volume, not viewport wrapping or deliberately long source lines. Short context may also be grouped in a useful disclosure; do not create a separate disclosure for every sentence.
3. Typical supporting blocks: extended methodology/context explanations, reading/example basis, history and additional navigation/ownership notes. Group coherent material, commonly before or after Units as appropriate; this is not a mandatory fixed two-block template.
4. Do not automatically collapse a Unit or its tables because it is long. Content naturally owned by a Unit stays in that Unit; do not reclassify it as supporting context merely to hide it. Genuine ownership questions route through Finding Disposition.
5. Keep blockers, consequential authority limits, required user actions/questions and material unresolved consequences visible even when their natural owner is outside Units. Detailed rationale may be collapsed, with a short visible statement or direct owner reference preserving what the user must know.
6. Disclosure changes visibility only. Preserve required content, semantic ownership, Unit identity/status, source references and useful addressability. A summary is a navigation label, not a competing copy of authoritative content. Closed content still belongs to the AI's required read/review surface.
7. Use a meaningful summary such as `Methodology / source context`; avoid vague labels like `Other`. Keep HTML balanced and place blank lines around Markdown content inside details. Avoid unnecessary nested disclosures. Test fragment navigation into collapsed content when the renderer matters; expose critical entry anchors or provide a visible route when needed.
8. If a destination does not render details, use a concise visible explanation plus an accessible linked detail location, or an explicit secondary detail section. Never discard required information or claim disclosure works without checking the intended renderer. Do not create a file solely to satisfy formatting.

## Findings / Outputs

Return a proportional presentation assessment with precise affected locations and suggested adjustments. Typical Finding Candidates: supporting context obscures Units; essential status/action is hidden; Unit content is incorrectly collapsed or displaced; disclosure loses content/addressability; rendering makes details inaccessible. A checked presentation may have no material findings.

Candidates use Core Finding Disposition for owner, priority, resolution and downstream consequences; this Lens does not create another lifecycle. Applying the Lens does not grant mutation permission. REFINE can supply a proposed presentation; writing files follows the active authorized update workflow.

## Composition / Revalidation

Target Formation/Resolution references this Lens at the user-facing presentation boundary. Normal P-06/Core Lens Registry discovery and Unit opening/closing checkpoints may select it when their actual surface meets the gate. Recheck when presentation structure/volume, essential status, user attention needs or rendering capability changes materially; reuse unchanged checks.

Documentation / Representation remains responsible for persistence and representation class; P-14 retains placement. AI Reviewability retains its independent review-priority/Key Points contract. This Lens adds only disclosure criteria and does not redefine those owners or introduce Helper dependencies into Core.

## Artifact / File Implications

No dedicated Target, file, new Unit kind or mandatory presentation metadata is required. Keep the result on its existing surface. Route any independently material persistence need through existing owner/P-14 machinery.

## Knowledge Basis

Mode: `INLINE`

Embedded principles: progressive disclosure, readable Unit hierarchy, preservation of essential visible state, stable source/owner navigation, proportionality and renderer-aware presentation. All criteria are above; callers reference this Lens rather than copying its checklist.

## Worked Presentation Example

Illustrative layout only; the placeholder Unit below is not a new Unit definition. Adapt names and content to the actual Target Module or local Target contract.

```markdown
# Target title

Status: planning incomplete. Implementation authority has not been granted.

<details>
<summary>Methodology / source context</summary>

Extended supporting context and links to existing owners.
This block does not replace content owned by the Units below.

</details>

## Existing Unit ID — Existing Unit name

The Unit's substantive content remains visible, including its tables.

<details>
<summary>Examples / navigation notes</summary>

Additional reading and reference links.

</details>
```

## Provenance

USER requested Unit-focused reading with substantial non-Unit material in details, then explicitly selected an independent Lens. The supplied `study-and-simulation-evolution-planning-v2.zip` demonstrated the layout across Application Definition, Evolution, Feature, Scenario and PRS documents. The example supplies presentation evidence only, not semantic authority; essential authority limits remain visible in the adapted example above.
