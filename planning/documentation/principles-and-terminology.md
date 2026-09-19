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

`Process` is reserved for orchestration that belongs to one or more Use Cases and exists to reach their independently useful Results. A sequence of steps inside another methodology component does not become a Process merely because it has order or repetition.

## Component Method

A **Component Method** is a reusable way for a methodology component to perform part of that component's own responsibility.

A Component Method does not own an independently useful Use-Case Result and is not a second name for Process. Its consumer/owner must be clear from context or naming. Examples include a Lens evaluation method, a Target-Module production method, or a Unit-local resolution method.

When a Component Method is extracted into a separate file, qualify the primary consumer when that prevents ambiguity, for example `*.lens-method.md`, `*.target-module-method.md`, or `*.unit-method.md`.

## Operation

An **Operation** is a bounded callable action that may be reused by one or more Processes or methodology components without owning their Result or semantic responsibility.

Examples include acquiring, cropping, annotating, measuring, normalizing, extracting, converting, or otherwise transforming an input when those actions are useful reusable mechanics rather than a Use Case or component-owned result.

An Operation may be invoked by a Process, Lens, Target Module, Unit, or other current owner. Reuse does not promote the Operation into a Process. When represented separately, its name should make the operational role clear, for example `*.operation.md`.

## Guidance

**Guidance** is reusable instructional or knowledge content for a named consumer. It helps that consumer perform its responsibility but does not itself own execution flow or the consumer's Result.

When Guidance is extracted, name the consumer when useful to preserve ownership, for example `*.unit-guidance.md` or `*.target-module-guidance.md`. Do not classify generic theory/knowledge as Guidance merely because a component can read it; use the knowledge/theory owner appropriate to that area.

## Checkpoint

A **Checkpoint** is a bounded review, validation, readiness, or integration point used inside a Process or methodology component.

A Checkpoint may define what must be examined and what state/result is expected at that point, but it does not become the owner of the larger Process or component lifecycle. When extracted, qualify its consumer when needed, for example `*.target-module-checkpoint.md`.

## Consumer-Qualified Naming Principle

Before selecting a new file/folder name or moving an existing artifact, classify:

```text
semantic role
+ primary consumer
+ natural semantic owner
→ representation/path/name
```

The semantic role is determined before the filename. New creation and structural migration should use names that reveal the role and, where ambiguity is plausible, the primary consumer.

Avoid catch-all architectural names such as `shared`, `helper`, or generic `workflow` when the actual role/consumer can be stated. Do not label component-local mechanics as `Process`, and do not use an unqualified generic `method` name when the consumer-specific method type is material to understanding ownership. Existing ambiguous names are migration/review findings when they materially obscure current ownership; changing a name must not silently change semantic authority.

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

The same principle applies recursively to supporting methodology components: registry entries are screened before detail is loaded; component applicability is checked before use; optional fields and Contextual Units are materialized only when useful. Visibility of predeclared Module-defined Units follows their owning methodology contract; materiality may control substantive work/disposition without making those Units silently disappear.

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
≠ every Module-defined Unit requires substantive resolution
≠ every optional field is produced
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
Supporting router / component registry when defined by the selected Process
(component-family/candidate routing)
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
- **supporting router / component registry** — optional downstream routing defined/reached by the selected Process; a specialized methodology may provide a directory/index for this purpose;
- **component registry** — which concrete components are plausible;
- **component owner** — specialized applicability/materiality and specialized work.

No layer becomes authority for downstream semantics merely because it routes to the downstream owner. Re-entry to a higher routing level is justified by a material situation/scope/authority change or stale orientation, not by every component operation or conversational turn.

## README

A **README** is a structural responsibility map.

It explains what the current area is and what its direct children are responsible for. It may provide a natural next read when useful.

README does not need a Use Case merely to justify its existence.

README should not duplicate detailed Use-Case Process, Principles & Terminology, or other semantic owner bodies.

## Responsibility Map

A **Responsibility Map** is a cross-cutting routing projection from a semantic responsibility/task to its current canonical owner.

It is useful when ownership spans several sibling areas/files and a reader would otherwise need to infer the owner from repository topology or duplicated prose. Existing application/architecture/testing responsibility maps are examples of this role.

```text
Responsibility Map
→ responsibility / task
→ current canonical owner
→ optional supporting/projection owner when useful
```

A Responsibility Map owns the **routing mapping**, not the semantic body it points to. The mapped owner remains authoritative for complete meaning. Do not copy full contracts into the map or let the map become a second semantic Source of Truth.

Boundary with neighboring navigation roles:

- **README** — structural/direct-child responsibility and navigation for one area;
- **Use-Case Registry** — functional capability/result routing;
- **Responsibility Map** — cross-file/cross-area semantic responsibility → canonical-owner routing.

A Responsibility Map may be manually maintained when small, but its critical owner mappings should be mechanically parity-checked when drift would materially confuse methodology routing.

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

## Methodology / Contextual Annotation Principle

When a produced planning/documentation result needs to show **how a material Unit or independently material block was formed**, bind it to the smallest sufficient reusable methodology owner set instead of copying methodology prose into the result.

```text
reusable method governs the scope
→ one concise Methodology annotation

no reusable method governs the genuinely local/supporting scope
→ one concise Contextual annotation

reusable owner should exist but is missing / ambiguous / conflicting
→ OPEN methodology-owner resolution / Finding
→ do not relabel the scope as merely Contextual
```

Persisted forms:

```md
**Methodology:** [exact reusable owner](...)
```

or:

```md
**Contextual:** <concise local reason>
```

Rules:

- one annotation at the **smallest sufficient scope** may govern ordinary child content;
- several materially applicable reusable owners stay on the same concise `Methodology:` line when practical;
- a `Methodology:` line identifies the reusable method owner; it must not restate or summarize that owner's reusable method merely to make the result self-contained;
- add another annotation only when a child block materially uses a different reusable method or has an independently useful contextual reason;
- do not mechanically annotate every Requirement, behavior/path row or table cell;
- annotation/navigation does not transfer semantic ownership of the produced result.

Methodology-owner binding is an execution concern of the applicable production method (for IDTSPE Target Units, the Core Unit contract). This principle owns the concise persisted representation, not the runtime lookup algorithm.

## Ordinary Readable Markdown Principle

Use ordinary portable Markdown headings, paragraphs, lists and tables for normal methodology/planning representation. HTML disclosure containers such as `<details>` are not the default representation and should be used only when a separately selected need justifies them.

Do not hide unresolved authority, status, omission, methodology binding or other material review meaning behind collapsible metadata.

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
- Responsibility Map answers **which current canonical owner owns this cross-cutting responsibility/task?**

None should duplicate the semantic body owned by the destination owner. Cross-scope navigation starts from README/area navigation; each area owns its own current functional or methodology-specific navigation model.

### Markdown Link Navigation Rule

For repository Markdown documentation, an ordinary **relative Markdown link** is the default lightweight relation when a normal reader materially benefits from moving directly from one addressable artifact to another. Prefer a direct link over a bare filename, path, ID or prose-only mention when the destination is part of the useful reading path. When one specific section is the useful destination, prefer a stable fragment link.

```text
Markdown link
= navigation / discoverability relation

Markdown link
≠ semantic ownership
≠ dependency authority
≠ synchronization contract
≠ review-on-change obligation
```

Do not turn every textual mention into a link. Use a shallow registry when a many-owner overview is more useful than many direct relations, and use Linked Notes or another tracked relation only when backlinks/query/synchronization behavior is independently justified. A broken path or fragment is a documentation defect, while a mechanically valid link may still be misleading when it points to stale, legacy or non-authoritative material.

## Progressive Complexity Principle

Use the smallest representation that preserves the required meaning.

Do not create a new file, owner type, registry layer, Process file, template, example, or schema merely because it could exist.

Create it when the current Use Case becomes clearer, more reusable, or more independently reviewable because of the split.

## Semantic Type Before File Principle

Documentation roles are semantic roles, not filename-driven ontology.

Use Case, Process, Principles & Terminology, Template, Example, README, Use-Case Registry, and Responsibility Map describe what meaning a representation owns or routes to.

A file exists because useful meaning needs representation. A file or folder does not create a capability merely by existing.
