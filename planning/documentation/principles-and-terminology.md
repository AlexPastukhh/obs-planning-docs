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

`Process` is the canonical documentation term. `Workflow` may be used as ordinary prose or as a situation-specific Session term, but it is not a second reusable documentation file type beside Process.

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

A group heading is navigation only. It is not a Direction, capability owner, or additional ontology layer.

The minimal registry contract is:

```text
ID | Use Case | Owner
```

A registry does not duplicate Situation, Result, or Process bodies.

At repository level, the root registry should expose the complete current Use-Case landscape and the owner location of every Use Case. During staged migration, explicit compatibility routes may temporarily preserve unresolved legacy families.

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

Neither should duplicate the other's semantic body.

## Progressive Complexity Principle

Use the smallest representation that preserves the required meaning.

Do not create a new file, owner type, registry layer, Process file, template, example, or schema merely because it could exist.

Create it when the current Use Case becomes clearer, more reusable, or more independently reviewable because of the split.

## Semantic Type Before File Principle

Documentation roles are semantic roles, not filename-driven ontology.

Use Case, Process, Principles & Terminology, Template, Example, README, and Use-Case Registry describe what meaning a representation owns.

A file exists because useful meaning needs representation. A file or folder does not create a capability merely by existing.
