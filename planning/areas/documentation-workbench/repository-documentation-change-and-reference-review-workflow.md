# Repository Documentation Change And Reference Review Workflow

Status: active accepted project-local End-To-End Workflow
Doc version: v1.0.0-repository-native
Scope: direct trigger-to-result workflow for changing ordinary repository Markdown, navigating stable links and reviewing explicitly affected uses.

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
select repository/file/folder/section
  → read current ordinary Markdown
  → edit with an existing editor, reviewed replacement
    or accepted narrow helper
  → preserve stable file/heading links
  → detect changed targets carrying explicit
    review-on-change relations
  → review affected uses manually
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

### Stage 3 — Resolve Stable Targets

Navigation targets are complete files or stable heading/section anchors. Relative links may traverse parent and sibling repository folders.

### Stage 4 — Detect Explicit Review Relations

Ordinary links are navigation only. Only explicit adjacent review metadata enters affected-use analysis.

### Stage 5 — Review Affected Uses

For each affected use:

- inspect target change and use context;
- confirm current, update, remove/replace or leave unresolved;
- do not rewrite meaning automatically.

### Stage 6 — Optional AI Transfer

When requested, expand only explicitly includable relations into a temporary copy. Do not mutate saved Markdown.

### Stage 7 — Validate And Review Diff

Check Markdown/link integrity, exact changed path scope and the literal Git diff.

## 5. Branches And Failure Paths

| Situation | Result |
|---|---|
| Link target missing | explicit broken-link result |
| Stable anchor changed | update link/anchor or leave unresolved |
| Review relation ambiguous | do not infer dependency; report ambiguity |
| Include recursion/cycle | stop bounded expansion and report cycle |
| Unresolved target | preserve visible unresolved result |
| Working base differs | stop before replacement |
| Existing tools are sufficient | do not create a helper |

## 6. Review Gates

| Gate | Required review |
|---|---|
| Scope/base | exact paths and blobs |
| Link | file/section target resolves |
| Impact | every explicit affected use receives a disposition |
| Transfer | expansion is bounded and non-mutating |
| Diff | exact complete file transition approved |

## 7. Boundaries

This workflow does not require a managed Reference Object runtime, custom editor, Semantic Home, object-field schema, App Memory or automatic dependency graph.

Possible helpers are Implementation Ideas. Their output does not become canonical until reviewed into repository Markdown.

## 8. Relationship To Planning Workflow

[`planning-meaning-to-repository-workflow.md`](planning-meaning-to-repository-workflow.md) may hand accepted meaning to this workflow. This workflow may also start independently for direct documentation maintenance.

Neither workflow supplies a hidden mandatory middle of the other.

No stage authorizes commit or push without separate explicit permission.
