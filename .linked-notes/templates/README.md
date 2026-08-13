# Repository File Templates

This folder owns simple repository-native file templates for OBS Linked Notes.

## Template discovery

A template exists when a **direct child** of this folder:

1. has a filename ending in `.template.md`; and
2. starts with a valid `obs-template` metadata block.

Nested template folders are not scanned in the first format. `README.md` and other ordinary files are not templates.

## Format v1

The metadata block is the first content in the template file. In v1 it has one required field: `name`.

```text
<!-- obs-template
name: Character
-->
---
type: character
status: draft
tags: []
---

# Name

## Description
```

Rules:

- `name` is the human-readable name shown in `New file`;
- duplicate template names are invalid/ambiguous and are not offered for creation;
- unknown metadata fields are rejected in v1 instead of being silently reinterpreted;
- the `obs-template` metadata block is **not** part of a created document;
- after removing that block and its immediately following line break, the remaining template body is copied literally;
- ordinary YAML frontmatter, Markdown, HTML comments and Reference Object markers inside the body are normal template content and are preserved;
- a live `obs-ref:def` / `obs-ref:use` marker in a template body is still a real Reference Object marker in that repository file and participates in explicit Reference Object Check/Update; put marker examples inside fenced code if they must remain examples only;
- no variables, date substitution, AI interpolation or semantic rewriting are performed in v1.

## Creating a file

`New file` loads the valid templates from this folder. Choosing a template reads that exact file, validates it again and opens the normal new-file editor with the literal template body. Choosing a template itself is read-only. The repository is changed only if the user later performs the normal explicit file Create action.

`Refresh templates` explicitly reloads the folder. `Open templates folder` opens this folder in Files so templates can be edited as ordinary repository files.

## AI / agent instructions

When asked to create a document whose type matches a repository template:

1. inspect this folder for valid direct `*.template.md` files;
2. read the `name` metadata to select the matching template;
3. create the new document from the template body, excluding only the leading `obs-template` metadata block;
4. preserve all remaining body text literally unless the user explicitly asks to edit fields;
5. if the body contains `obs-ref:use` markers, preserve them exactly and follow [`../REFERENCE-OBJECTS.md`](../REFERENCE-OBJECTS.md).

Do not invent a missing template or silently treat an ordinary Markdown file as a template.
