# File Update Overview Template

Status: active reusable output template
Doc version: v0.8.0-pre-update
Scope: exact reusable Markdown structure for explicit `Pre-Update` / `План файл-обновление`.

Use with:

```text
planning/documentation/file-update-overview-workflow.md
```

## Template

```markdown
## Pre-Update / План файл-обновление

**Статус:** <planned / package created / review checked / blocked / other route-owned state>

### Command metadata

Include only when a command route is in scope.

| Field | Value |
|---|---|
| Canonical command | `<command>` |
| English name | `<canonical English display name>` |
| Permission mode | `<route-owned permission mode>` |

### Target

<What repository/documentation state this update should produce.>

**Continuation basis:** <selected semantic planning result / current owner / other explicit basis>

### Checked sources

- `<source actually checked>`

### Ideas / Idea Groups — When material

Use the shared Idea Review / Deep Planning structure only for material conceptual questions. Omit this section for a mechanical update.

For material alternatives:

```text
Idea <ID>
  Idea Variants
  Current Selected Variant
  Current Conclusion
```

Do not create file-edit variants as a copy of conceptual alternatives.

When a Planning Concern/Concern Group relates to Idea(s), reference the canonical Concern/Group ID + storage location from the Idea. Do not mirror the full body into both the Idea and aggregate/owner sections.

### Current Plan / Current conclusions

<Selected/current planning meaning that concrete Update Steps implement. This is the baseline referenced by aggregate units.>

### Planning Concerns / Q/R/P

This active concern surface is present for every File Update Plan, including mechanical updates. Use the shared `planning-concerns-and-decisions-model.md`.

```markdown
#### CG-<ID> / Q-<ID> / R-<ID> / P-<ID> — <title>

**Type:** Question / Risk / Problem <!-- omit on group header; keep on members -->
**Priority:** P0 / Critical | P1 / High | P2 / Normal | P3 / Low
**Concern Category:** <primary category>
**Status:** <type/group-appropriate status>
**Owner / affected meaning:** <owner>
**Current Plan:** <selected file-update route relevant to this concern>
**Origin / Provenance:** <when useful>
**Concern Group / Members:** <when applicable>
**Finding / Shared Resolution Surface:** <current concern/group meaning>
**Relation / Impact On Current Plan:** <why it matters>

**AI Comment:** <what follows from plan/evidence; options; justified technical preference; user-owned unknown; minimum useful user question when decision-changing>
**Recommendation:** <optional; only with sufficient grounds>
**Answer / Evidence:** <when applicable>
**Decision refs:** <when actually selected/material>
**Residual state / treatment:** <when applicable>
**Stored At:** <when detail lives elsewhere>
```

Group related Q/R/P when one answer/evidence/Decision substantially addresses them. Member Type/Priority/Concern Category/Status stays visible.

If none: `No material unresolved issues identified.` Resolved trivial items leave active Q/R/P; material retained trace and residual Risk/Problem follow the shared model. One logical Concern/Group has one detailed storage location; Ideas/other files reference it.

### Potential Simplifications / Better Routes — When material

```markdown
#### [S-<ID>] — <candidate better route>

**Related Idea(s):** `IDEA-X` <!-- when applicable -->
**Current Plan:** <the selected file-update route>
**Candidate Better Route:** <not-yet-selected route>
**Change To Current Plan:** <what would change if accepted>
**Why Potentially Better:** <reason>
**Tradeoff / Evidence:** <when material>
**Status:** candidate / unresolved / needs decision
```

Omit this section when no material unselected simplification exists. Once accepted, move the route into Current Conclusions / Update Steps and remove it from this section.

### Registered Parallel-Work Scopes / Logs — When mutation/package work is relevant

```text
Affected Scope(s):
  <registered scope IDs>

Canonical Log For This Work:
  <scope-root/action-log.md>

Reference-Only Logs:
  <other affected logs / none>
```

When logging is active, include the required cumulative post-apply log state in the concrete package/file steps. Do not reconstruct pre-start history.

### Update Step <ID> — <name>

**Objective:** <what this step accomplishes>

**Input state / dependencies:** <required prior state or earlier steps>

**Expected resulting state:** <state after this step passes>

#### Actions

1. <first concrete action>
2. <next concrete action>
3. <review, migration gate or explicit deferral when applicable>

#### Files changed in this step

| Change | File | R | Что меняется на этом шаге | Почему на этом шаге |
|---|---|---|---|---|
| New | `<path>` | <responsibility> | <complete planned addition> | <reason> |
| Updated | `<path>` | <responsibility> | <complete planned change> | <reason> |
| Renamed | `<old>` → `<new>` | <responsibility> | <move/change> | <why now> |
| Deleted | `<path>` | <former responsibility> | <removal> | <why safe now> |

**Step boundaries:**

- <not changed or deferred in this step>

**Checks / exit criteria:**

- <check>

**Next dependent step:** <next step or none>

### Update Step <next ID> — <name>

<Repeat only when another ordered step is useful.>

### Aggregate file matrix — Optional

| File | Steps | Final planned state | Responsibility | Remaining check |
|---|---|---|---|---|
| `<path>` | `<step IDs>` | `<new/updated/renamed/deleted>` | <R> | <check/none> |

### Global boundaries

| Type | File / artifact | R | Почему |
|---|---|---|---|
| Not changed | `<path>` | <responsibility> | <reason> |
| Not created | `<path>` | <future responsibility> | <reason> |

### Source and delivery check

Use this section only when package/source/delivery classification is relevant. Select rows that match the concrete command route; omit irrelevant rows.

| Check | Result |
|---|---|
| Selected source snapshot | <current repository / explicitly selected archive or snapshot / unresolved / not applicable> |
| Source identity | <repo ref / archive identity / unavailable / not applicable> |
| Source certainty / exact base | <verified / partial / blocked / not applicable> |
| Package/output owner | <command/owner workflow / not applicable> |
| Package delivery | <created / planned / blocked / not applicable> |
| Application responsibility | <this route / external consumer / user/manual / not applicable> |
| Review responsibility | <this route / external consumer / not applicable> |
| Finalization responsibility | <this route / external consumer / out of scope / not applicable> |
| Route-specific base verification | <pending / passed / blocked / not applicable> |
| Route-specific review artifact | <pending / available / reviewed / not applicable> |
| Commit/push permission | <not granted / route-owned explicit state / not applicable> |

### Следующее действие

<next concrete action>
```

## Rules

```text
- Use normal Markdown in chat output, not an outer code fence.
- Keep table cells short.
- Perform Idea analysis only when conceptual uncertainty is material; do not manufacture it for mechanical updates.
- `Current Selected Variant` is the normal selected-variant term; use `fallback` only when genuinely a fallback.
- Planning Concerns / Q/R/P active surface is required for every File Update Plan (or explicit empty result) and follows the shared Concern/Decision model.
- Group one-resolution-surface Q/R/P; keep Priority and Concern Category separate; AI Comment must not invent user-owned preferences; Recommendation is optional; Decision requires actual selection.
- One logical Concern/Group has one detailed storage location; Ideas/other owners reference its ID/location instead of duplicating full bodies.
- Potential Simplifications / Better Routes is conditional on a real unselected candidate change to Current Plan; each unit states Current Plan + Change To Current Plan.
- Resolved trivial findings leave active Q/R/P and selected meaning is integrated into Current Conclusions / Update Steps; material retained Decision/Concern trace and residual R/P remain when useful.
- Ordered steps are primary when dependencies or migration order matter.
- Numbered Actions state what is done and in what order.
- The per-step file table retains the old changed-file view:
  path, responsibility, change and reason for that step.
- Do not force the reader to infer the action sequence from table row order.
- Keep Actions and file-table rows synchronized without duplicating every sentence.
- A one-step update may use one step only.
- A small step may use one action and one file row.
- The aggregate matrix is optional and derived from step tables.
- Omit Command metadata for non-command updates.
- Omit source/delivery rows when not relevant.
- Add legacy diff/clipboard/paste-review details only when the selected command route explicitly requires them.
- Do not use this block as a generic conclusion.
```
