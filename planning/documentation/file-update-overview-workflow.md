# File Update Overview Workflow

Status: active reusable documentation-layer workflow
Doc version: v0.8.0-pre-update-continuation
Scope: how to produce explicit `Pre-Update` / `План файл-обновление` for non-trivial file, documentation, code or package work while separating conceptual semantic planning from concrete file actions.

Use with:

```text
planning/documentation/FILE-UPDATE-OVERVIEW-TEMPLATE.md
planning/documentation/idea-review-and-planning-workflow.md when conceptual uncertainty is material
planning/command-routing.md
```

Practical example: [`examples/PLAN-FILE-UPDATE-COMMAND-EXAMPLE.md`](examples/PLAN-FILE-UPDATE-COMMAND-EXAMPLE.md)

When a concrete command route is in scope, also read that command definition and its ownerFiles. Package/source/application/review behavior is route-specific and must not be reconstructed from a generic archive assumption.

## 1. Purpose

`Pre-Update` / `пред-апдейт` is the user-facing continuation label for the existing File Update Plan capability:

```text
selected semantic planning result
→ explicit Pre-Update
→ exact repository owners/files/actions/dependencies/checks
→ still plan-only
```

It is not a new semantic Use Case, not a rename of Application SDS Step 3 or Workspace UCDS Step 3, and not permission to materialize changes.

Use this workflow when an answer plans, creates, reviews or applies changes to files or packages.

A file-update overview should make the planned repository transition understandable:

```text
current state / Target / Checked Sources
  → Idea analysis when material
  → Current Conclusions / Current Selected Variant
  → Planning Concerns / Q/R/P + Concern Groups when material
  → ordered update steps
  → explicit actions inside each step
  → per-step affected-file tables
  → checked resulting state
```

Do not use it as a generic conclusion for ordinary discussion.

## 2. Required Content

A non-trivial plan includes:

```text
- status;
- command metadata when a command route is in scope;
- target and checked sources;
- Ideas / Idea Groups when material;
- Current Conclusions / Current Selected Variant when alternatives are material;
- one active Planning Concerns / Q/R/P section (single concerns and/or Concern Groups) using the shared model;
- ordered update steps;
- numbered actions inside each non-trivial step;
- files changed by each step;
- per-file responsibility, change and reason;
- dependencies and expected resulting state;
- boundaries / intentionally unchanged artifacts;
- checks and exit criteria;
- package/source/delivery status when relevant;
- affected registered parallel-work scope(s) and canonical/reference logs when mutation/package work is relevant;
- next action.
```

## 3. Conceptual Idea Boundary

Use the shared Idea methodology when the update contains a material conceptual question, alternative, conflict, unresolved responsibility, risky assumption or meaningful simplification decision.

```text
Idea
→ Idea Variants when material
→ Current Selected Variant
→ Current Conclusion
→ concrete Update Steps
```

A material unresolved alternative may remain as a Planning Concern with Related Idea provenance. Use one detailed concern storage location plus references; do not create `File Edit Variant A/B` or duplicate full Idea/QRP mirrors.

When the update is a mechanical consequence of already selected meaning:

```text
do not manufacture Idea analysis
→ proceed to concrete Update Steps.
```

Use `Current Selected Variant` as the normal term. Use `fallback` only when the variant is genuinely a fallback.

## 4. Planning Concerns / Q/R/P

Every File Update Plan exposes an active concern surface, including a valid empty result, and consumes [`planning-concerns-and-decisions-model.md`](planning-concerns-and-decisions-model.md).

For File Update planning:

```text
Current Plan
= the one current selected file-update route represented by Current Conclusions + ordered Update Steps
```

A material concern/group records enough to locate the affected plan and understand its current state. Use Priority / Concern Category / Status when material; group Q/R/P that share one resolution surface. AI Comment should explain what follows from current plan/evidence and what remains user-owned instead of inventing a preference. Recommendation is optional; selected Decision trace is separate.

Related Ideas reference the Concern/Group ID/location. Do not maintain full mirrored bodies inside Ideas.

If none: `No material unresolved issues identified.` Resolved trivial items leave active Q/R/P; material retained answer/Decision trace and residual Risk/Problem follow the shared lifecycle.

Physical storage is contextual. A small File Update Plan may keep the Area Concern Register and concern bodies inline; a larger planning area may route detail to the real owner and keep only register/reference state here.

## 4.1 Potential Simplifications / Better Routes — When Material

Use this section only for a material **not-yet-selected** better route that would change Current Plan. Each unit states Current Plan, Candidate Better Route, Change To Current Plan, Why Potentially Better and Status; reference Related Idea IDs when applicable.

Once a simplification is selected, integrate it into Current Conclusions / Update Steps and remove it from this section. Do not duplicate ordinary concrete Update Steps here.

## 5. Ordered Update Steps

Ordered steps are the primary representation for broad or dependency-sensitive updates.

Each step should state:

```text
Step ID and name
Objective
Input state / preconditions
Dependencies on earlier steps
Expected resulting state
Numbered actions
Files changed in this step
Per-file responsibility
What changes
Why the file changes in this step
Step boundaries and deferred work
Checks / exit criteria
Next dependent step
```

### Actions And Per-Step File Tables

The two representations have different responsibilities:

```text
Actions:
  state what must be done and in what order;

Per-step file table:
  state which files are affected by the step,
  each file's responsibility, what changes and why.
```

Use a numbered action list for concrete operations. Keep actions short enough to scan.

Use the existing file-change table inside the same step:

| Change | File | R | What changes in this step | Why in this step |
|---|---|---|---|---|

The action list and file table must agree. Do not maintain them as competing plans.

An action may:

```text
- update one or several files;
- create a new artifact;
- perform a review or migration check without changing a file;
- gate a later cleanup or rename;
- explicitly defer work.
```

When useful, a file-table cell may cite action numbers, but action IDs are optional.

One file may appear in several planning steps when different logical actions affect it. During implementation, coordinate the final replacement for that path so the package contains one complete intended result.

## 6. Aggregate File Matrix

An aggregate matrix is optional.

It may summarize:

```text
- every affected file;
- the steps that touch it;
- first and final responsibility;
- final planned state;
- unresolved checks.
```

The matrix is derived from the ordered steps and their per-step file tables. It is not a separately maintained source of truth.

For small updates, one step, one action list and one file table may be sufficient.

## 7. Planned-Mode Boundary

```text
A planned `Pre-Update` / `План файл-обновление` is not permission to edit files.
It may propose new, updated, renamed or deleted paths.
Implementation requires a separate authorized action, such as
`давай архив` / `build replacement archive`.
```

Fallbacks in planning answers never authorize deletion, rename, archive creation, commit, push or unrelated scope expansion.

## 8. Command Metadata

When the update concerns a command route, include:

```text
canonical command;
canonical English name from the command definition;
permission mode.
```

The metadata does not replace the command definition or root router.

## 9. Package Source And Delivery Reporting

For package work, resolve package/source/application/review semantics through:

```text
planning/command-routing.md
  → selected planning/commands/*.command.md
  → that command's ownerFiles
```

Do not default to a legacy PowerShell/diff lifecycle merely because the result is an archive.

Report only the dimensions that matter to the selected route, such as:

```text
- selected source snapshot;
- source identity;
- source certainty / exact-base availability;
- package/output owner;
- package or archive delivery status;
- application responsibility;
- review responsibility;
- finalization responsibility;
- route-specific local base verification status when applicable;
- route-specific review artifact status when applicable.
```

A producer-only package route may legitimately report:

```text
package created
application delegated to external/local consumer
review delegated to consumer workflow
finalization out of command scope
```

A legacy reviewable package route may instead require apply/diff/clipboard/paste-review reporting. Include those rows only when the selected route explicitly owns them.

Do not copy a selected command's package algorithm into this workflow.

## 10. Checks

Before finalizing the overview:

```text
- Conceptual alternatives are represented as Idea Variants, not file-edit variants.
- Current Selected Variant / Current Conclusion is the conceptual basis for concrete steps.
- Unresolved refinements do not silently enter file actions.
- Active Planning Concerns / Q/R/P exists (or explicit empty result); every real concern/group follows the shared owner, including owner/current-plan attachment, Priority/Concern Category/Status when material, and grouping by shared resolution surface.
- One logical Concern/Group has one detailed storage location; Ideas/other owners reference it rather than duplicate full bodies.
- Material Potential Simplifications / Better Routes, when present, are unselected changes to Current Plan and state Current Plan + Change To Current Plan, with Related Idea IDs when applicable.
- Resolved trivial findings leave active Q/R/P; selected meaning is integrated into Current Conclusions / Update Steps, while material retained Decision/Concern trace and residual R/P are preserved according to the shared model.
- Mechanical updates do not contain synthetic Idea analysis.
- Every planned file belongs to at least one update step.
- Every non-trivial step has a numbered action list.
- Every step has an objective and resulting state.
- Action order is understandable without inferring it from table row order.
- Actions and per-step file rows describe the same intended transition.
- Dependencies and cleanup gates are visible.
- Per-file reasons are stated in the context of the step.
- Aggregate rows, when present, match the step tables.
- Deletion and rename appear only after their migration checks.
- Planned mode remains distinct from implementation permission.
- Package/source/application/review rows match the selected command route rather than a generic archive assumption.
```

## 11. Do Not

```text
- Do not create File Edit Variant A/B for conceptual uncertainty.
- Do not turn Possible Idea Refinement into an accepted file edit automatically.
- Do not hide material active concerns only inside one unrelated Idea; use the selected concern storage owner + Area Concern Register/reference.
- Do not use active Q/R/P as a confirmation/reasoning log for already selected Current Plan.
- Do not leave trivial resolved Questions/Problems in active Q/R/P, but do not drop material residual Risk/Problem or required retained Decision trace.
- Do not manufacture Idea analysis for mechanical updates.
- Do not hide file-change risks in prose only.
- Do not hide the action sequence only inside a file table.
- Do not duplicate the same plan in unsynchronized action and file lists.
- Do not use unordered change groups when order materially affects safety.
- Do not maintain an aggregate matrix as a competing owner.
- Do not treat a plan as approval to edit, create, rename, delete, archive, commit or push.
- Do not reference project-specific package docs unless the selected project/command route owns them.
- Do not invent a command English name when the command definition owns one.
- Do not duplicate package source-selection rules.
- Do not treat clipboard diff, pasted review or local apply as universal package requirements.
```

## Registered Scope / Log Planning

For a concrete mutation/package plan, read the project root Scope Registry when available and state the affected registered scopes. If several scopes are affected, identify the one canonical scope log for the work and the other logs that receive cross-scope references.

When logging is active, the concrete package plan must include complete target-state log updates for material Idea Reviews, later material clarifications, prior ReviewDiff corrections and the package's `APPLIED` relation. Do not plan a package that leaves its logs for an assumed later cleanup package.
