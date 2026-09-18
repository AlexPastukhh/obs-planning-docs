<a id="example-tag-refactor"></a>
# Example — Tag Vocabulary Refactor

Current vocabulary:

```text
back-view
rear-view
```

Bank analysis shows they are used for the same intended meaning, and `rear-view` is selected for current use.

[Tag Quality / Taxonomy](../lenses/LENS-RK-TAG-QUALITY-AND-TAXONOMY.md#lens-rk-tag-quality-and-taxonomy) recommends:

```text
Current Tag:
  rear-view

Alias on rear-view [when useful]:
  back-view

Old back-view Tag:
  Status: DEPRECATED
  Successors:
    - rear-view
```

[Vocabulary Evolution](../target-modules/TM-RK-20-VOCABULARY-EVOLUTION.md#tm-rk-20-vocabulary-evolution) records the vocabulary change and evaluates consequences for current use/Landscape interpretation. Existing `back-view` Tag Assignments remain attached to the deprecated Tag; they are only reclassified separately when doing so is useful and authorized.

`back-view` as an alias is a search/display label, not a unique resolver key. If name/alias lookup surfaces both the deprecated canonical `back-view` definition and the current `rear-view` definition, the caller must choose by stable Tag ref; no silent label-based shadowing is implied.
