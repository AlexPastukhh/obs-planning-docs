<a id="domain-pack-model-and-derivation-guidance"></a>
# Domain Pack Model And Derivation Guidance

A Domain Pack is reusable domain-specific Knowledge Basis for Reference Knowledge work. It exists only when a concrete domain has been deliberately derived and registered; being able to name a domain does not create a Domain Pack.

```text
candidate domain name
≠ derived Domain Pack

Domain Pack
≠ Bank
≠ Entry kind
≠ Vocabulary Package
≠ Target Module
≠ Lens
```

A Domain Pack supplies subject-specific knowledge to generic Reference Knowledge responsibilities such as Entry resolution and Landscape inquiry without replacing their Target/Unit ownership.

## Semantic Responsibilities A Concrete Pack May Own

A concrete pack includes only responsibilities that are materially useful for that domain. The following are possible semantic surfaces, not a mandatory checklist or file schema.

### Domain Applicability And Boundary

Explain when the domain is useful, what subject concerns it can help interpret, where its competence ends, and when another Domain Pack or generic guidance should take over.

This boundary is required enough to prevent accidental universal application of the pack, but it may stay compact and inline in the pack entry when obvious.

### Entry / Subject Guidance

Reusable knowledge for one or more Entry Units may include:

- characteristic subject/identity boundaries;
- independently useful Entry-candidate patterns;
- decomposition questions and anti-explosion guards;
- classification/vocabulary pressure;
- common relation meanings or graph concerns;
- richer analysis questions/distinctions;
- domain-specific evidence/provenance cautions.

The pack does not own runtime Entry results. `TM-RK-10-ENTRY` and its Units remain the result owners.

### Classification / Vocabulary Guidance

A domain may have recurring semantic dimensions that help discover useful Tags or Relation Types.

```text
domain vocabulary guidance
≠ canonical Tag / Relation Type definitions
```

Concrete definitions remain owned by Vocabulary Packages and `TM-RK-20-VOCABULARY-EVOLUTION`. Domain guidance may expose vocabulary pressure without pre-creating taxonomy.

### Analysis Guidance

A domain may need reusable ways to inspect or interpret subjects more deeply. Keep ordinary subject-specific prompts/guidance in the pack when that is sufficient.

When the knowledge is truly a reusable evaluation perspective with its own Analysis Surface, operations, Findings and applicability, derive/register a Lens through the normal Lens contract instead of treating an arbitrary guidance file as a Lens.

A Domain Pack may reference zero, one or several registered Lenses. A pack is not required to own a Lens.

### Landscape Inquiry Guidance

A domain may supply candidate research directions that help `TM-RK-50-LANDSCAPE-ANALYSIS` ask better domain-specific questions.

Examples of possible directions include domain-specific forms of:

- comparison and recurring patterns;
- development through time;
- possible lineage, branching or recombination;
- coexistence, adoption, persistence, displacement or revival;
- transfer between neighboring domains;
- changing constraints/enabling conditions;
- domain-specific notions of meaningful improvement/change;
- other questions discovered while deriving the pack.

These are inquiry aids, not mandatory Landscape Units, questions or outputs. A concrete Landscape Target still follows available evidence, current purpose and proportional depth.

### Cross-Domain Handoff

Define recurring points where the pack should stop and another installed Domain Pack, generic Entry guidance or another semantic owner should take over. One Entry may use several packs when each has a material concern.

## Representation Guidance

Semantic responsibility does not imply a dedicated file. Use the smallest representation that keeps the concrete pack readable, reviewable and reusable.

A concrete pack will normally have a structural entry such as:

```text
domain-packs/<domain>/README.md
```

That entry should identify applicability/boundary and route to any extracted guidance. Additional files are optional and created only when the corresponding knowledge is substantial enough to benefit from independent review/reuse.

Possible forms include, for example:

```text
ENTRY-GUIDANCE.md
  combined subject identity/decomposition/classification/relation guidance
  when those concerns form one coherent body

DECOMPOSITION-GUIDANCE.md
  when decomposition/subject-boundary knowledge is independently substantial

VOCABULARY-GUIDANCE.md
  when recurring classification/relation dimensions are substantial enough
  to deserve their own owner

ANALYSIS-GUIDANCE.md
  when domain analysis knowledge is useful but does not constitute a reusable Lens

LANDSCAPE-INQUIRY-GUIDANCE.md
  when domain-specific research-question guidance is substantial and reusable

<domain-theory-or-knowledge>.md
  when a larger reusable Knowledge Basis has its own review/change lifecycle
```

These names are examples, not required schema. A small pack may consist only of `README.md` with inline guidance. A rich pack may have several extracted owners.

Reusable Lenses should normally live in the profile Lens area/registry and be referenced by the Domain Pack rather than being physically nested merely because the pack first motivated them.

## Inline / Extract Rule

Keep guidance inline while one concrete pack owner remains clear and readable. Extract a separate file only when one or more of these are materially true:

- the guidance is substantial enough to obscure the pack entry;
- it is independently reusable by several Units/Targets;
- it has an independent review/change lifecycle;
- separation materially improves authority/navigation clarity.

Do not create parallel empty/thin files merely to make all Domain Packs look alike.

## Deriving A Concrete Domain Pack

Derivation starts from real or expected Reference Knowledge work, not from a desired folder template.

```text
1. Establish domain need and boundary.
2. Inspect representative real subjects/examples and recurring work.
3. Identify repeated domain-specific problems in Entry resolution.
4. Identify useful domain-specific Landscape inquiry directions.
5. Identify classification/relation vocabulary pressure without inventing taxonomy prematurely.
6. Separate generic Reference Knowledge rules from genuinely domain-specific knowledge.
7. Identify cross-domain handoffs and overlap.
8. Determine whether any reusable evaluation perspective justifies a separate Lens.
9. Test the guidance against representative examples and counterexamples.
10. Choose inline vs extracted representation based on actual content.
11. Register the Domain Pack only after its concrete owner/guidance is sufficiently derived.
```

The process may discover that the proposed domain does not justify a separate pack, should be narrower/broader, or should share knowledge with another owner. Those are valid outcomes.

## Registration Gate

A row belongs in [Domain Pack Registry](../DOMAIN-PACK-REGISTRY.md#reference-knowledge-domain-pack-registry) only when all material conditions hold:

- a concrete pack owner exists;
- applicability/boundary is understandable;
- the pack contains meaningful domain-specific knowledge beyond generic Entry/Landscape guidance;
- its extracted files, if any, each have justified responsibility;
- cross-domain overlap/handoff is sufficiently clear for current use;
- any referenced Lens is independently registered/conformant;
- representative use shows that the pack improves Reference Knowledge work without importing production methodology as analysis authority.

Draft ideas, candidate domain names and hypothetical file trees do not enter the active registry.

## Production-Methodology Boundary

Domain knowledge for understanding existing reference subjects must be derived from the needs of reference analysis/research, relevant domain theory/evidence and representative subjects.

Do not mechanically reverse the Target Modules, Units or workflows used to create work in the domain. Production methodology may be evidence/knowledge when genuinely relevant, but it is not automatically the decomposition or analysis model for a Reference Knowledge Domain Pack.
