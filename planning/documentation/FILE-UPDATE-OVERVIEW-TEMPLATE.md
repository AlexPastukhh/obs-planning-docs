# File Update Overview Template

Status: active reusable output template
Doc version: v0.7.0-route-specific-package-reporting
Scope: exact reusable Markdown structure for `План файл-обновление`.

Use with:

```text
planning/documentation/file-update-overview-workflow.md
```

## Template

```markdown
## План файл-обновление

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

When a Q/R/P later names Related Idea(s), also apply the shared Idea ↔ Q/R/P discoverability rule in this Idea section: one Related Idea gets the full same-ID mirror; several Related Ideas each get only a lightweight same-ID reference to the one aggregate finding.

### Current Plan / Current conclusions

<Selected/current planning meaning that concrete Update Steps implement. This is the baseline referenced by aggregate units.>

### Questions / Risks / Problems

This aggregate section is present for every File Update Plan, including mechanical updates. It contains only material unresolved/adverse delta relative to the Current Plan.

```markdown
#### [Q/R/P-<ID>] — <finding title>

**Related Idea(s):** `IDEA-X` <!-- when applicable -->
**Current Plan:** <the selected file-update route relevant to this finding>
**Finding:** <unresolved question / residual risk / unresolved problem>
**Relation / Impact On Current Plan:** <why it still matters to the selected plan>
**Needed Resolution / Treatment:** <when applicable>
**Fallback:** <only when real>
**Fallback Relation:** fallback only; not Current Plan
**Blocking:** <yes / no, when useful>
```

At minimum every real unit states `Current Plan`, `Finding`, and `Relation / Impact On Current Plan`. If none: `No material unresolved issues identified.`

Do not put accepted Current Conclusions, ordinary Update Step boundaries, or already selected corrections/simplifications here.

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
- Questions / Risks / Problems is required for every File Update Plan; every real unit states Current Plan and its unresolved/adverse relation or impact, with Related Idea IDs when applicable.
- Idea-related Q/R/P uses one Finding ID and is mirrored/referenced from each affected Idea according to the shared cardinality rule.
- Potential Simplifications / Better Routes is conditional on a real unselected candidate change to Current Plan; each unit states Current Plan + Change To Current Plan.
- Accepted/resolved findings are integrated into Current Conclusions / Update Steps and removed from aggregate sections.
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
