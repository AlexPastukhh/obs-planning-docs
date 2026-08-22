# AI Reviewability — Key Points / Review Priority Example

Status: current reusable response/output example
Scope: demonstrate the current material-answer review surface without the retired Level 1/2/3 model.

Canonical owner: [`../ai-reviewability-and-directed-planning-principles.md`](../ai-reviewability-and-directed-planning-principles.md)

This file demonstrates output shape only. It does not own planning semantics, command routing or permissions.

## Example

A material planning answer may begin with:

```markdown
## Key Points

- **KP-1 — Scenario boundary — Critical**
  The selected Scenario ends at the independently meaningful user-visible result; implementation operations remain downstream.

- **KP-2 — Domain rule — High**
  The invariant is owned by Domain meaning and must hold across every realizing Slice.

- **KP-3 — Local file placement — Normal**
  The exact file can change without changing wider behavior/domain meaning.
```

The body then provides the supporting checked facts, current owner meaning, reasoning, unresolved Q/R/P and selected conclusions.

## Why This Is Current

```text
Key Points
→ short complete projection of every material conclusion

Review Priority
→ blast radius / correction cost if wrong
→ Critical / High / Normal / Low
→ not confidence

built-in recheck
→ Current-Target Recheck
→ Direction / Integration Recheck
```

The answer does not need an answer-level label. A repeated ordinary recheck with no new evidence should normally find no material omission that should have been caught before return. `крит` remains a separate optional adversarial review.

## Do Not

- Do not recreate Level 1/2/3 terminology.
- Do not make Key Points a second semantic authority.
- Do not assign `Critical` merely because prose is complex.
- Do not omit supporting detail needed to review a material conclusion.
