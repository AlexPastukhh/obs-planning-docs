# Documentation Principles & Terminology

This file defines the shared language and stable semantic rules used by the Documentation Use Cases.

It is term-centered. There is no required `Relationships` section or field schema. A relation is explained under the term where it naturally matters, or as a cross-term principle when the relation itself has important rules.

## Use Case

A **Use Case** is an independently useful way of using the repository/documentation system to obtain a meaningful result.

A Use Case is the primary functional owner for its capability.

A Use Case has three required parts:

- **Situation** — when the need exists;
- **Result** — the useful end state;
- **Process** — how the result is obtained.

A Use Case may route into another Use Case, a reusable Process, a methodology, Theory, a tool, or a direct semantic owner.

A simple file lookup, reading a known owner, or obvious placement of a file is not a Use Case merely because an action occurs.

One file per Use Case is the default because a Use Case may contain substantial inline Process and local supporting meaning. Several small Use Cases may share a file when that is clearly simpler.

## Situation

**Situation** describes the recognizable need or context in which the Use Case should be used.

Situation should be sufficient to distinguish the Use Case from neighboring capabilities. It does not require a separate Trigger/Purpose schema when ordinary language is enough.

## Result

**Result** is the independently useful end state that justifies the Use Case.

A new Use Case is justified by a distinct useful result, not by a new file, command, process step, template, or implementation detail.

## Process

**Process** describes how the Use Case reaches its Result.

`Process` is the canonical documentation term. `Workflow` may be used as ordinary prose, but it is not a second reusable documentation file type beside Process and does not imply a separate Session-owned methodology workflow.

Process stays inline in the Use Case by default.

A separate Process file is justified when:

- the Process is too substantial to keep the Use Case readable; or
- the same Process is genuinely reused by several Use Cases; or
- the Process has an independently substantial review/change lifecycle.

A separate Process file remains supporting methodology. It must be reachable from at least one Use Case and must not redefine shared terminology that belongs in Principles & Terminology.

An extracted Process should reference the Principles & Terminology and other semantic owners it materially relies on instead of copying their meaning.

## Use-Case Registry

A **Use-Case Registry** is the current functional map of a Use-Case scope.

It groups Use Cases for readability and records where every current Use Case is canonically owned.

A group heading is navigation only. It is not a capability owner or additional ontology layer.

For a runtime-selectable registry, the compact routing contract is:

```text
ID | Use Case | Situation summary | Result summary | Owner
```

`Situation summary` and `Result summary` are routing metadata, not duplicate Use-Case bodies. They should be just detailed enough to decide whether the owner needs to be opened. The owner remains authoritative for complete `Situation / Result / Process`.

A provenance-only/legacy registry may retain a smaller `ID | Use Case | Owner` shape when no runtime applicability scan depends on it.

A registry must cover every current Use Case in its declared functional scope and point to each canonical owner. It does not aggregate neighboring Session, repository, application, or specialized-methodology capabilities merely because they exist in the same repository. Structural README/navigation routes between scopes. During staged migration, explicit compatibility routes may temporarily preserve unresolved legacy entries inside the affected scope.

## Use-Case Applicability Scan

A **Use-Case Applicability Scan** is the lightweight functional-entry check that determines which Use Cases are relevant to the current situation.

```text
current situation
→ Use-Case Registry Map
→ scoped Use-Case Registry row summaries
→ zero or more relevant Use Cases
→ read/follow only those Use-Case owners
```

The scan is logically repeated when the situation changes materially. It does not require rereading unchanged files on every conversational turn. Loaded registry metadata may be reused while current and trustworthy.

A Use-Case Applicability Scan chooses **ways of using the methodology/documentation system**. It must not duplicate the specialized planning/design/evaluation work of a methodology component reached by the selected Process.

A Use Case may compose several supporting methodology components. The existence of a component does not make it applicable, and applicability does not imply maximal use.

## Contextual Guidance Principle

Repository methodology is applied to the actual situation rather than executed as a ceremonial maximum.

```text
recommended ≠ selected
selected ≠ automatically executed
available ≠ applicable
applicable ≠ every optional detail must be produced
```

A Use-Case Process may therefore select, adapt, defer, use only as inspiration/theory, or reject a recommendation when the recommendation's own authority/boundary allows contextual interpretation. Normative authority/permission rules remain binding where they actually apply.

The same principle applies recursively to supporting methodology components: registry entries are screened before detail is loaded; component applicability is checked before use; optional units/fields are materialized only when useful.

## Use-Case Registry Map

A **Use-Case Registry Map** is a structural-functional map of scoped Use-Case Registries. It exists so a methodology environment with generic and specialized scopes can keep each registry locally owned while still providing one lightweight entry check.

The map contains registry-scope routing metadata, not Use-Case bodies and not specialized methodology-component entries.

## Registry Scan

A **Registry Scan** is a lightweight candidate-discovery operation over the routing/applicability metadata of a registry.

A scan may produce zero, one or several candidates. It does not by itself execute an entry, instantiate a Target/Lens/State/result, or justify loading sibling entries. The selected owner/component performs the next local applicability/materiality check.

```text
registry scanned
≠ every row selected

row matched
≠ owner/component executed

component selected
≠ local applicability passed

local applicability passed
≠ every optional Unit/field produced
```

This term applies to Use-Case Registries and specialized methodology-component registries. The metadata and next authority differ by registry type, but the scan/selection boundary remains the same.

## Functional Routing Ownership Chain

The methodology uses one semantic handoff chain so each routing decision has one owner:

```text
current situation
       │
       ▼
Use-Case Registry Map
(scope candidates)
       │
       ▼
Scoped Use-Case Registry
(Use-Case candidates)
       │
       ▼
Selected Use Case owner
(Situation / Result / Process authority)
       │
       │ selected Process may route further
       ▼
Methodology Registry Directory / supporting router
(component-registry family candidates)
       │
       ▼
Concrete component registry
(component candidates)
       │
       ▼
Concrete component owner
(local applicability + specialized semantics)
       │
       ▼
natural semantic result / owner
```

The chain describes **ownership and handoff responsibility**, not a mandatory runtime sequence. A selected Process may skip layers when it already knows the required owner/component, and a scan may validly select nothing additional.

Ownership boundaries:

- **Use-Case Registry Map** — which functional Use-Case scopes are plausible;
- **Use-Case Registry** — which independently useful capabilities in that scope are plausible;
- **Use Case Process** — what actions are required to obtain its Result and which supporting owners it reaches;
- **Methodology Registry Directory** — which specialized registry family may help an already-selected Process;
- **component registry** — which concrete components are plausible;
- **component owner** — specialized applicability/materiality and specialized work.

No layer becomes authority for downstream semantics merely because it routes to the downstream owner. Re-entry to a higher routing level is justified by a material situation/scope/authority change or stale orientation, not by every component operation or conversational turn.

## README

A **README** is a structural responsibility map.

It explains what the current area is and what its direct children are responsible for. It may provide a natural next read when useful.

README does not need a Use Case merely to justify its existence.

README should not duplicate detailed Use-Case Process, Principles & Terminology, or other semantic owner bodies.

## Principles & Terminology

A **Principles & Terminology** file defines the vocabulary and stable semantic rules of an area.

Its content is centered on terms:

- what a term is;
- what it is not when confusion is plausible;
- the rules and invariants that define it;
- relations to neighboring terms when those relations are needed to understand it.

Not every term needs the same subsections.

When a rule genuinely governs several terms, it may be written once as a cross-term principle instead of being duplicated under every term.

Principles & Terminology defines meaning; it does not own step-by-step operational Process.

## Semantic Owner

A **Semantic Owner** is the one complete current owner of a responsibility or meaning.

Several files may reference or demonstrate the same meaning, but they must not become competing authorities.

When existing text mixes responsibilities, classify the meaning first and only then decide whether it should stay inline, move, or be extracted.

## Reusable Contract

A **Reusable Contract** is stable reusable meaning that can guide multiple concrete uses.

A reusable contract is not a closed exhaustive schema.

Concrete use may add situational meaning such as:

- clarification;
- a question;
- a local rule or exception;
- an additional Process step;
- a Source/reference;
- a local check;
- an extra result block;
- another relation needed by the concrete case.

Local extension does not automatically update the reusable owner.

Repeated usefulness is a signal to review whether the reusable owner should be extended.

## Template

A **Template** is shape only.

It may be associated with a Use Case or an extracted Process, but it does not own the rules that explain why the shape is correct.

If a template needs semantic explanation, that explanation belongs in the relevant Use Case, Process, or Principles & Terminology owner.

A template must be reachable from at least one operational Use Case.

## Example

An **Example** demonstrates a result, Process, template, owner, or other concrete behavior.

An example does not own rules.

Its filename and header should make clear what it demonstrates.

An example must be reachable from at least one operational Use Case or from a semantic owner that is itself reachable from a Use Case.

## Theory

**Theory** is reusable knowledge that may be read independently of operational planning.

Theory is not required to have a Use Case merely to justify its existence.

Operational work may select and interpret relevant Theory through whatever planning/methodology mechanism is appropriate. Theory itself does not become a planning runtime or Use-Case owner.

## Inline-First Principle

Keep meaning inline while one owner remains clear and readable.

Extract a separate file only when independent review, substantial size, genuine reuse, or a distinct change responsibility makes the split useful.

A richer case adds situational sections; it does not require parallel `Mini`, `Modular`, `Full`, or similar contracts.

## Use-Case Reachability Principle

Operational reusable methodology should be justified by actual use.

Therefore:

- Use Case — functional entry and owner;
- Principles & Terminology — supports one or more Use Cases;
- extracted Process — supports one or more Use Cases;
- Template — supports a Use Case or its Process;
- Example — demonstrates a Use Case or one of its reachable owners.

README and independent Theory are deliberate exceptions.

Do not create supporting methodology files that no current Use Case can reach.

## Natural Relationship Principle

Do not maintain mirrored relationship inventories merely for structural completeness.

If `A` uses `B`, explain that relation where it helps define `A`, `B`, or the governing cross-term principle.

Do not require both `A → B` and `B → A` records unless both independently add meaning.

If a relationship has enough stable rules to become a real concept, define that concept as a term rather than introducing a generic relationship table.

## Navigation Principle

Structural navigation and functional navigation are different:

- README answers **what is here and what is it responsible for?**
- Use-Case Registry answers **what meaningful results can I obtain and where does each Use Case live?**

Neither should duplicate the other's semantic body. Cross-scope navigation starts from README/area navigation; each area owns its own current functional or methodology-specific navigation model.

## Progressive Complexity Principle

Use the smallest representation that preserves the required meaning.

Do not create a new file, owner type, registry layer, Process file, template, example, or schema merely because it could exist.

Create it when the current Use Case becomes clearer, more reusable, or more independently reviewable because of the split.

## Semantic Type Before File Principle

Documentation roles are semantic roles, not filename-driven ontology.

Use Case, Process, Principles & Terminology, Template, Example, README, and Use-Case Registry describe what meaning a representation owns.

A file exists because useful meaning needs representation. A file or folder does not create a capability merely by existing.
