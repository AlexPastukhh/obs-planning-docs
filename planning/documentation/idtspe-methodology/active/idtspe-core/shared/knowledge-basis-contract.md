# Knowledge Basis — Theory-to-Application Bridge

Status: active generic methodology guidance  
Purpose: keep reusable theory/reference knowledge separate from current project evidence while giving Target Modules and Lenses a lightweight way to select and interpret the theory that is useful for their work.

## 1. Core Meaning

A `Knowledge Basis` is the bridge between reusable theory/reference knowledge and one operational methodology consumer.

```text
Theory / reference knowledge
→ selected/referenced material
→ Knowledge Basis
→ Target Module or Lens Evaluation
```

Theory itself may be organized in any useful form: files, folders, sections, books, notes, external references, broad corpora or other knowledge structures. It does not need to be organized around IDTSPE Use Cases, Target Modules, Lenses or operational goals.

A Knowledge Basis may identify the relevant parts of that broader theory and, when useful, interpret them for the concrete purpose of its Target Module or Lens.

Example:

```text
General visual theory
  color/
  composition/
  light-and-shadow/

Screen-design Knowledge Basis
  Color
    reference → color/ or a narrower section
    applied interpretation → how color should support hierarchy/state for this Screen work

  Composition
    reference → composition/
    applied interpretation → what composition guidance matters for Screen layout
```

The Knowledge Basis is therefore consumer-aware. The underlying theory does not need to know who consumes it.

## 2. No Fixed Schema Or File Shape

Knowledge Basis has no required serialization, mode enum or mandatory field list.

It may be:

- a few applied notes directly inside a Target Module or Lens;
- a section that links to theory files or folders;
- a separate Knowledge Basis file referenced by the consumer;
- several files/layers when the applied knowledge is substantial;
- a mix of broad references and narrow references.

Existing `INLINE`, `REFERENCED` and `HYBRID` labels may remain as descriptive representation in existing owners, but they are not Generic conformance states and no migration is required merely to remove those labels.

The useful invariant is semantic, not structural:

```text
when reusable theory materially supports the consumer
→ keep enough reference/provenance to rediscover that theory when practical
→ keep enough applied interpretation to explain how it informs this consumer when that is not obvious
```

A broad folder/reference is acceptable when it is the economical stable pointer. A precise section/file reference is preferable when it materially improves retrieval without creating maintenance noise.

## 3. Applied Interpretation

A Knowledge Basis may simply point to theory when the application is obvious. When raw/general theory is too broad, the Knowledge Basis should extract or reinterpret the useful meaning for the consumer.

```text
Theory:
  colors have many possible relationships and perceptual effects

Applied Knowledge Basis for a visual evaluation:
  use color primarily to reinforce the hierarchy/state distinction relevant to this evaluation;
  do not rely on hue alone when the state must remain distinguishable without color.
```

Applied interpretation can be layered in whatever way helps the consumer, for example `Color`, `Composition`, `Shadow`, `Typography`, `Aggregate Boundary Theory`, or `Failure Semantics`. Those layers are ordinary organization, not methodology ontology.

## 4. Target Module And Lens Use

```text
Target Module Knowledge Basis
→ theory/reference knowledge selected and interpreted for producing/evaluating that recurring Target result

Lens Knowledge Basis
→ theory/reference knowledge selected and interpreted for applying that recurring evaluation perspective
```

A Target Module or Lens does not need a separate Knowledge Basis when no reusable theory/reference material adds value. Short obvious guidance may simply remain in its Evaluation/Method.

When a substantial reusable theoretical base exists, separating it from the operational Method is useful because:

- the theory can remain broad and reusable;
- the consumer can stay focused on application;
- several consumers can interpret the same theory differently without duplicating the underlying corpus.

## 5. Authority / Current-State Boundary

```text
Knowledge Basis
≠ current Target Source
≠ current project Evidence
≠ current Target result
≠ project truth
≠ Decision
```

Knowledge Basis explains how reusable knowledge may guide evaluation. Claims about the current project still need current Sources/Evidence or accepted meaning.

A theory reference is not proof that a current project satisfies or violates that theory.

## 6. Loading / Retrieval

Do not require bootstrap or normal work to read every theoretical body. Resolve theory proportionally to the current task.

```text
select Target Module / Lens
→ inspect its applied guidance / Knowledge Basis when useful
→ follow only the theory references needed for the current material question
```

No explicit `Reference Load Policy` field is required. If a consumer needs special retrieval guidance, ordinary prose is enough.

## 7. Theory Packages / Theoretical Modules

A `Theoretical Module` is one possible repository representation for preserving a coherent body of theory. It is not required for theory to participate in a Knowledge Basis. A Knowledge Basis may reference a Theoretical Module, a normal theory file, a folder, several sources or external material.

Theory remains theory; Knowledge Basis owns only the consumer-oriented selection/interpretation that makes that theory practical for the Target Module or Lens.
