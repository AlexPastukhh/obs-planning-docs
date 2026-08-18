# Repository Documentation Change And Reference Review Workflow

Status: active accepted project-local End-To-End Workflow / stable-target clarifications pending item reconciliation
Doc version: v1.2.0-stable-target-lifecycle-review
Scope: direct trigger-to-result workflow for changing ordinary repository Markdown, creating/navigating stable links and reviewing explicitly affected uses.


The accepted baseline remains ordinary file/section navigation plus explicit affected-use review. Historical `ITEM-*` references may still explain provenance, but they are no longer canonical current planning owners. New/changed planning meaning must be reviewed into actual current workflow/decision owners before repository mutation.

## 1. Trigger And Result

**Trigger:** a repository, folder, Markdown file or stable section is selected for direct documentation work, whether or not a solution-planning workflow ran first.

**Result:** complete changed Markdown with validated links, resolved or explicit affected-use review state and a reviewable Git diff, or an unresolved/deferred result.

## 2. Preconditions

- selected repository scope is explicit;
- current source files are readable;
- local base conflicts remain visible;
- repository write, commit and push permissions remain separate.

## 3. End-To-End Flow

```text
select repository/file/folder/stable section
  → read current ordinary Markdown
  → edit with an existing editor, reviewed replacement
    or separately accepted narrow helper
  → create or preserve links to:
      complete repository files;
      stable anchored sections/fragments;
      repository Notes
  → resolve relative paths across repository folder nesting
  → preserve target identity through content edits
    and movement inside the same file when the anchor is unchanged
  → expose missing, renamed or removed targets explicitly
  → detect changed targets carrying explicit
    review-on-change relations
  → review affected uses manually
  → optional bounded AI transfer
  → validate links and Markdown
  → inspect Git diff
  → reviewed repository state
    or explicit unresolved/deferred result.
```

## 4. Mandatory Stages

### Stage 1 — Select Scope And Exact Base

Identify complete files and exact repository/base state. A package must stop before changes when target blobs differ.

### Stage 2 — Read And Edit Ordinary Markdown

Use an existing editor, GitHub surface, complete replacement package or separately accepted helper. Saved content must remain useful without a custom runtime.

### Stage 3 — Create Or Preserve Stable Targets

Navigation targets are:

```text
complete repository file;
stable explicit anchor for a heading/section/fragment;
repository-owned Markdown Note.
```

Relative links may traverse parent, sibling and deeper repository folders.

A stable anchored target remains resolvable after its visible text changes or its position inside the same file changes, provided the file path and anchor identity remain valid.

### Stage 4 — Resolve Broken Or Changed Identity

When a target file/Note/anchor is missing, renamed or removed, show an explicit broken or unresolved result. Do not invent a redirect or silently bind to similar text.

### Stage 5 — Detect Explicit Review Relations

Ordinary links are navigation only. Only explicit adjacent review metadata enters affected-use analysis.

### Stage 6 — Review Affected Uses

For each affected use:

- inspect target change and use context;
- confirm current, update, remove/replace or leave unresolved;
- do not rewrite meaning automatically.

### Stage 7 — Optional AI Transfer

When requested, expand only explicitly includable relations into a temporary copy. Preserve source identities, stop bounded recursion/cycles and do not mutate saved Markdown.

### Stage 8 — Validate And Review Diff

Check Markdown/link integrity, exact changed path scope and the literal Git diff.

## 5. Branches And Failure Paths

| Situation | Result |
|---|---|
| Complete-file target resolves | open the file |
| Stable fragment target moved inside the same file with anchor unchanged | link remains valid |
| Visible fragment text changed with anchor unchanged | link remains valid; review obligation exists only when explicit |
| Link target missing | explicit broken-link result |
| Stable anchor renamed or removed | update link/anchor or leave unresolved |
| Review relation ambiguous | do not infer dependency; report ambiguity |
| Include recursion/cycle | stop bounded expansion and report cycle |
| Unresolved target | preserve visible unresolved result |
| Working base differs | stop before replacement |
| Existing tools are sufficient | do not create a helper |

## 6. Review Gates

| Gate | Review object | Required review |
|---|---|---|
| Scope/base | selected files and blobs | exact paths and base identity |
| Link | file/Note/section target | target resolves to intended identity |
| Impact | explicit affected uses | every use receives a disposition |
| Transfer | temporary expanded copy | expansion is bounded, sourced and non-mutating |
| Diff | complete file transition | exact change approved |

## 7. Relationship To Linked Notes

[`Linked Notes USE-CASE-MAP.md`](../../documentation/tools/tampermonkey/linked-notes/USE-CASE-MAP.md) now owns current Linked Notes Note semantics (`UC-LN-NOTES`), including creation, editing, reconciliation and save verification. The former local `linked-notes-end-to-end-workflow.md` is retained only as planning/compatibility history.

This workflow owns repository-document changes and link/impact review. A Note workflow may hand a repository-owned Note or link change into this workflow for validation and diff review. Neither workflow owns a mandatory hidden middle of the other.

## 8. Boundaries

This workflow does not require a managed Reference Object runtime, custom editor, Semantic Home, object-field schema, App Memory or automatic dependency graph.

Possible helpers are Implementation Ideas. Their output does not become canonical until reviewed into repository Markdown.

## 9. Relationship To Planning Workflow

[`planning-meaning-to-repository-workflow.md`](planning-meaning-to-repository-workflow.md) may hand current selected planning meaning to this workflow. This workflow may also start independently for direct documentation maintenance.

No stage authorizes commit or push without separate explicit permission.
