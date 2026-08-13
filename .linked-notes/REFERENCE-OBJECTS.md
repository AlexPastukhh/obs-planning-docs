# Reference Objects Repository Contract

This file defines the repository-facing rules for OBS Linked Notes Reference Objects. It is intended to be readable by humans, AI agents and tools without requiring knowledge of the userscript implementation.

## Core model

A Reference Object has:

- one stable object ID such as `ro_damage`;
- one mutable human-readable name stored in `.linked-notes/reference-objects.json`;
- exactly one definition marker containing the canonical literal value;
- zero or more use markers containing materialized copies of that value.

Marker syntax:

```text
<!-- obs-ref:def id="ro_damage" -->25<!-- /obs-ref:def -->
<!-- obs-ref:use id="ro_damage" -->25<!-- /obs-ref:use -->
```

Marker-looking text inside fenced code blocks or inline code is example/code content, not a live Reference Object marker.

## Source of truth

The value inside the single `obs-ref:def` marker is canonical.

The value inside each `obs-ref:use` marker is a materialized copy. It is intentionally stored in the Markdown so GitHub, readers and AI agents can still see a useful document without executing Linked Notes.

A use is **not automatically live**. Changing the definition does not silently rewrite other files.

`.linked-notes/reference-objects.json` stores routing/index metadata only. It does not duplicate the canonical value.

## Finding an existing object

To resolve an existing Reference Object:

1. read `.linked-notes/reference-objects.json`;
2. find the object by its stable `id` or human-readable `name`;
3. read `definition.path`;
4. open that repository file;
5. find exactly one `obs-ref:def` marker with the same stable ID;
6. use the literal inner text of that definition marker as the current canonical value.

The display name may be renamed. The stable ID must not be changed merely because the name changes.

## Inserting a synchronized value into a file

When a value in a new or edited file is intended to stay synchronized with an existing Reference Object, do **not** insert only a plain copy of the value.

Resolve the object and current definition value, then insert a complete use marker:

```text
Damage: <!-- obs-ref:use id="ro_damage" -->25<!-- /obs-ref:use -->
```

The inner value must initially equal the current definition value. Keep the marker when editing or formatting the surrounding document.

If synchronization is not intended, ordinary plain text is correct and must not be wrapped merely because its value happens to equal a Reference Object.

Do not invent a new object ID to refer to an existing object. If a requested object cannot be resolved unambiguously, stop and ask/diagnose instead of guessing.

## Changing the source value

When the canonical source itself is intentionally changed, edit the inner text of the one `obs-ref:def` marker. Existing uses are then allowed to be temporarily stale.

Synchronization is explicit:

```text
change obs-ref:def
  → Check uses
      read-only comparison; no file is modified
  → stale uses are reported/highlighted
  → Update locally OR Update GitHub
      explicitly replace stale materialized values
```

`Check uses` must never be treated as an update command.

`Update locally` changes local pending materialized uses only. `Update GitHub` is a separate explicit remote action that rereads current repository state and uses the normal conflict/read-back safeguards.

There is no automatic/background propagation in this format.

## Editing existing uses

Do not manually change only the materialized inner value of `obs-ref:use` when the intent is to keep the reference valid. Change the definition if the source value should change, then use the explicit Check/Update workflow.

Do not delete or alter Reference Object markers merely for formatting.

## Definitions File

The current registry is `.linked-notes/reference-objects.json` with schema version 1. Each object stores:

```text
id
name
definition.path
uses[]:
  path
  line
  lineOccurrence
```

`uses[]` is a rebuildable navigation/index aid. The actual `obs-ref:use` markers in Markdown are evidence that uses exist. `line` and `lineOccurrence` may change when a file is edited and are not durable identity.

If registry/index data and actual markers disagree, report/validate the drift rather than silently treating the index as canonical.

## Creating a new object outside the UI

Prefer the Linked Notes `Create Reference Object` tool when available because it performs exact-occurrence selection and local-first registry updates.

If a repository edit is deliberately performed by an agent instead, creating a new object requires both parts to remain consistent:

1. choose a new unique stable `ro_*` ID;
2. wrap exactly one canonical source value with `obs-ref:def`;
3. add one matching object record to `.linked-notes/reference-objects.json` with its name, definition path and initial usage index;
4. do not create multiple definitions for the same ID;
5. validate the result before relying on it.

## Validation expectations

Validation should detect malformed/unclosed markers, duplicate definitions, unknown use IDs, missing definitions and registry/index drift. Validation is read-only unless a separate explicit repair/write action is requested.
