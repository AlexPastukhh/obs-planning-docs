# Ordered Reference Lists Repository Contract

Agent-facing feature status: **active**. Read this contract before creating, moving or editing `obs-order:*` markers.

## Syntax

```text
<!-- obs-order:list id="orl_0123456789ab" mode="natural" locale="und" -->
<!-- obs-order:item id="ori_0123456789ab" list="orl_0123456789ab" unit="line" ref="ro_0123456789ab" -->Rank: <!-- obs-ref:use id="ro_0123456789ab" -->2<!-- /obs-ref:use --><!-- /obs-order:item -->
```

Valid list modes are `number`, `alphabetical`, `natural` and `custom`. Valid item units are `line` and `paragraph`. Live markers inside fenced or inline code are ignored as examples.

## Required invariants

- each `orl_*` list ID and `ori_*` item ID is unique;
- every item refers to one existing list;
- Ordered Items never overlap or nest;
- each item contains exactly one live `obs-ref:use` whose ID equals the item `ref`;
- the use stays inside the item together with all surrounding text that should move;
- a line item occupies exactly one physical line excluding its line ending;
- a paragraph item occupies exactly one nonblank paragraph bounded by blank lines or file boundaries;
- items in one list use compatible Markdown container prefixes.

When editing manually or through an AI agent, compute the actual physical line/paragraph from the file. Do not preserve a `unit="paragraph"` claim after moving only part of that paragraph.

## Freshness and sorting

The checked current definition value of the nested Reference Object is the sort key. A list containing a stale or unresolved use may exist but must not be sorted until every use equals its current definition value.

`number` requires a leading number in every current value. `custom` is an explicit sequence of exact current values, never executable comparator code. Equal keys are stable.

Ordering moves complete paired item blocks and leaves non-item bytes in place. Ordering is a local operation; publish through the standard `Update current file` or `Update all` action.

## Safe agent behavior

Prefer the Linked Notes creation/order tools. If direct editing is required:

1. resolve and check every nested Reference Object under [`REFERENCE-OBJECTS.md`](REFERENCE-OBJECTS.md);
2. validate marker uniqueness/linkage and actual unit boundaries;
3. move complete paired items only;
4. preserve all surrounding non-item text;
5. do not invent a feature-specific GitHub publication step.
