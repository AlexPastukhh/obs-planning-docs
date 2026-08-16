# Ordered Reference List Workflow

Status: legacy planning/compatibility reference / not current Linked Notes authority
Scope: lists whose item order is derived from current Reference Object values while preserving complete Markdown line/paragraph blocks.

> **Current Linked Notes ownership migrated.** This retained file is planning/history/compatibility context, not a current behavior or Use-Case owner. Current semantics live in [`USE-CASE-MAP.md`](../../documentation/tools/tampermonkey/linked-notes/USE-CASE-MAP.md) and [`USE-CASE-REGISTRY.md`](../../documentation/tools/tampermonkey/linked-notes/USE-CASE-REGISTRY.md). When this retained body conflicts with current Linked Notes docs, the current Linked Notes corpus wins.

## Model

An Ordered Reference List is declared inline and owns one or more paired Ordered Item markers. Every item contains exactly one `obs-ref:use` marker and may contain surrounding text that moves with it.

```text
<!-- obs-order:list id="orl_0123456789ab" mode="natural" locale="und" -->
<!-- obs-order:item id="ori_0123456789ab" list="orl_0123456789ab" unit="line" ref="ro_0123456789ab" -->Priority: <!-- obs-ref:use id="ro_0123456789ab" -->10<!-- /obs-ref:use --><!-- /obs-order:item -->
```

The Reference Object use remains nested inside the item. No separate list registry is canonical; the inline list/item markers are sufficient to validate and rebuild the feature.

## Create

From an open text file, `Create Ordered List`:

1. parses all live `obs-ref:use` occurrences outside Markdown code;
2. resolves their Reference Object names;
3. checks each occurrence against the current definition value;
4. displays every use with line, value and current/stale/unresolved status;
5. lets the user select uses and choose `Line` or `Paragraph` for each;
6. wraps the complete computed unit in an Ordered Item and inserts one list declaration;
7. stages the resulting file locally.

Stale or unresolved uses may be wrapped. The wizard does not update them automatically and reports that ordering remains blocked.

Each selected unit must contain exactly one Reference Object use, must not overlap another selected unit or existing Ordered Item, and all selected units must have a compatible Markdown container prefix.

## Order locally

`Order locally` first checks every referenced object again. Ordering is blocked when any item is stale/unresolved, any marker is malformed, an item does not occupy exactly its declared physical line/paragraph, an item contains a different/multiple use, or item container prefixes are incompatible.

The sort key is the checked current Reference Object definition value:

- `number`: each value must start with a signed/unsigned number; otherwise the entire action is blocked;
- `alphabetical`: locale-aware, non-numeric, case-insensitive comparison;
- `natural`: locale-aware comparison with numeric chunks;
- `custom`: an explicit ordered list of exact current values; no JavaScript, `eval`, expression or arbitrary comparator runs.

Equal keys preserve original item order. Complete item blocks move between existing item slots; bytes outside the item ranges remain unchanged. The result is staged locally. There is no `Order GitHub` action.

## Manual/AI editing invariant

An agent editing markers without the application must validate the declared structural unit from actual file text:

- `unit="line"`: the complete paired item occupies exactly one physical line, excluding its line ending;
- `unit="paragraph"`: the complete paired item occupies exactly one nonblank Markdown paragraph bounded by blank lines or file boundaries;
- the paired item contains exactly one live `obs-ref:use` with the same `ref` ID;
- item ranges do not overlap or nest;
- list/item IDs are unique and correctly linked.

Do not label a fragment as a paragraph merely because the intended content is conceptually paragraph-like.

Repository-facing details are canonical in [`.linked-notes/ORDERED-REFERENCE-LISTS.md`](../../../.linked-notes/ORDERED-REFERENCE-LISTS.md).
