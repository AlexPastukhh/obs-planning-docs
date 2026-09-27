<a id="uc-doc-establish-project-methodology-baseline"></a>
# UC-DOC-ESTABLISH-PROJECT-METHODOLOGY-BASELINE — Establish / Advance Project Methodology Baseline

Responsibility ID: `DOC.PROJECT-METHODOLOGY-BASELINE`
Status: active Documentation Use Case

## Situation

Planning/documentation is persisted in a **separate project repository** and needs a stable, reviewable methodology basis instead of links to moving methodology `main`; or an already established project methodology baseline must be **explicitly advanced** to a newer reviewed methodology revision.

This Use Case owns one baseline capability with two explicit operations:

```text
ESTABLISH
ADVANCE
```

`ADVANCE` is an operation of this same Use Case, not a second Use Case and never an automatic consequence of methodology `main` moving.

## Result

The project has one identifiable project-specific methodology baseline branch in the methodology repository, bound to an exact reviewed methodology commit, and the project planning/documentation entry point prominently exposes the methodology basis used by persisted planning.

For an established baseline:

```text
Baseline branch
+ Starting commit
+ Current baseline commit
+ project Planning / Methodology Basis block
+ direct methodology-owner links through the stable baseline branch
```

For an advanced baseline, the **same baseline identity** is retained, the `Starting commit` remains historical provenance, and `Current baseline commit` changes only after affected project planning/documentation has been reviewed/revalidated against the candidate new methodology revision.

<a id="project-methodology-baseline-operation-selection"></a>
## Operation Selection

### `ESTABLISH`

Use when no project methodology baseline is currently established for the selected project/planning scope.

The operation:

1. resolves the exact methodology repository and exact commit that currently governs planning;
2. resolves one project-specific baseline branch identity under the current repository/project conventions;
3. creates that branch from the exact methodology commit, or reuses it only when the existing branch already resolves to the same accepted basis;
4. records both `Starting commit` and `Current baseline commit` as that exact commit;
5. adds/repairs the visible project methodology-basis block;
6. rewrites persisted direct methodology-owner links in the selected project planning/documentation scope from moving `main` or other unstable references to the project baseline branch while preserving exact owner path/anchor meaning;
7. verifies the baseline branch and resulting links before reporting success.

If the selected branch name already exists at a **different** methodology commit, do not silently move it under `ESTABLISH`; treat that as an existing baseline/branch conflict and require explicit resolution or `ADVANCE` semantics.

### Existing baseline without explicit advance intent

If a baseline is already established and the USER did not explicitly request an update/advance:

```text
methodology main/newer revision exists
≠ permission to move project baseline
```

Reuse/reaffirm the current baseline. It is valid to repair a missing/stale visible basis block or links so that they truthfully describe the **current** baseline, but do not change the branch target/current baseline commit merely because newer methodology exists.

<a id="project-methodology-baseline-advance"></a>
### `ADVANCE`

Use only when baseline advancement/update is explicitly requested.

Process:

1. read the current baseline branch, `Starting commit`, `Current baseline commit`, project planning entry point, and direct methodology-owner references;
2. resolve the exact candidate target methodology commit before mutating the baseline branch;
3. review the methodology delta that is material to the project, especially current owner paths/anchors and semantic rules referenced by persisted project planning;
4. revalidate affected project documentation against the candidate target revision **by commit SHA**, not by temporarily moving the baseline branch first;
5. repair project planning/documentation references or semantics required by that reviewed methodology change;
6. if a material semantic contradiction/Finding remains unresolved, do not advance the branch and report the operation as blocked/deferred;
7. after review/revalidation closes, advance the existing project baseline branch to the exact reviewed target commit;
8. keep `Starting commit` unchanged and update `Current baseline commit` to the new commit;
9. verify that persisted project methodology-owner links still resolve to the intended current owners through the stable branch.

Do not silently force-rewrite an unrelated/diverged branch history. A non-fast-forward or otherwise ambiguous branch transition requires explicit repository-level resolution rather than being hidden inside baseline maintenance.

<a id="project-methodology-basis-block"></a>
## `Planning / Methodology Basis` Representation

The project's main planning README or equivalent immediately visible planning/navigation entry must expose a compact block equivalent to:

```md
## Planning / Methodology Basis

Planning status: <current project planning status>
Methodology repository: https://github.com/AlexPastukhh/obs-planning-docs
Baseline branch: <project-specific baseline branch>
Starting commit: <immutable starting commit SHA>
Current baseline commit: <exact commit SHA currently exposed by the baseline branch>
Planning documentation: <project planning/documentation entry point>
```

Rules:

- keep this block prominent; it is navigation/provenance, not a second methodology owner;
- `Starting commit` records where this project's methodology baseline began and does not change on ordinary advance;
- `Current baseline commit` records the exact currently reviewed basis and changes only after successful `ADVANCE`;
- a branch name alone is not enough exact historical provenance;
- project-local status/entry-point wording may follow local conventions, but the methodology repository, branch and exact commit basis must remain unambiguous;
- do not copy reusable methodology bodies into the project README.

## Methodology Link Rule

Persisted direct references from a separate project repository to reusable methodology owners use the project baseline branch:

```text
https://github.com/AlexPastukhh/obs-planning-docs/blob/<baseline-branch>/planning/.../<owner>.md#<owner-anchor>
```

The branch supplies stable navigability; the recorded current commit supplies exact basis/provenance.

When an owner path/anchor changes between baseline commits, update the project reference to the new current owner as part of `ADVANCE` review rather than allowing the stable branch move to create a broken or semantically stale link.

## Process

1. Resolve/reuse current Documentation Use-Case applicability before action.
2. Identify the selected **project repository**, its main planning/documentation entry point, and the methodology repository that currently governs the project.
3. Read the existing project methodology-basis block and direct methodology-owner links when present.
4. Select `ESTABLISH` or `ADVANCE` using the rules above. Existing baseline + no explicit advance intent never implies `ADVANCE`.
5. Resolve all branch/commit facts from repository Evidence. Do not fabricate a branch, commit SHA, branch target or successful mutation.
6. Apply the selected operation in dependency-safe order: review/resolve exact methodology basis first, repository branch mutation only when authorized/capable, then project representation/link updates required by that operation.
7. Use [`UC-DOC-MAINTAIN-README`](UC-DOC-MAINTAIN-README.md) proportionally for the visible planning-basis navigation block; this Use Case owns what basis facts must be shown.
8. Validate exact owner paths/anchors for affected project methodology links.
9. Report the operation and actual final basis explicitly. A partial or unavailable repository/branch mutation is `BLOCKED`/`DEFERRED`, not success.

## Permission / Execution Boundary

This Use Case defines the operation but does not manufacture repository capabilities.

A concrete invocation may require two writable surfaces:

```text
methodology repository
→ create/update one project baseline branch reference

project repository/workspace
→ maintain the Planning / Methodology Basis block
→ maintain affected persisted methodology-owner links
```

If the active host/tooling cannot create/update the methodology branch reference or cannot write the selected project planning files, stop at the unavailable boundary and report it honestly. Do not point project links at a branch that was not confirmed to exist at the intended commit.

Commit/push/deploy authority remains separate from this methodology capability unless independently granted by the current execution environment/user authority.

## Guards

- One project baseline capability; `ADVANCE` is not a second Use Case.
- Methodology `main` movement never auto-advances a project baseline.
- Branch name alone is not exact provenance; retain commit SHA.
- `Starting commit` is historical provenance and is not overwritten during ordinary advance.
- Review/revalidation occurs against the candidate target commit before moving the baseline branch.
- A stable branch link is navigation, not semantic authority; the linked methodology owner retains methodology meaning.
- Do not create a local methodology copy merely to satisfy project links.
- Do not duplicate the methodology body in the project README.

> Semantic Owner Dependencies
> - `CONTEXTUALIZES` [Methodology / Contextual Annotation Principle — Project Methodology Baseline](../principles-and-terminology.md#doc-project-methodology-baseline) — `DOC.METHODOLOGY-CONTEXTUAL-ANNOTATION`.
> - `CONTEXTUALIZES` [Maintain README Navigation](UC-DOC-MAINTAIN-README.md) — visible project planning-basis navigation only.
