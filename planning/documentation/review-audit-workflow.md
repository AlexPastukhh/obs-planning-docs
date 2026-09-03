# Review Coverage And Quality Audit Workflow

Status: active reusable supporting Process
Used by: `review_audit.recheck` / `перепроверь` and current review owners when explicit coverage/sufficiency auditing is useful.

## Result

A truthful reusable report of what was actually reviewed, how sufficient the review was, what remained partial/unchecked, and what a repeat review improved.

## Output

Use proportionally:

```text
Checked
Not Checked / Partial
Review Quality / Sufficiency
Material Findings / Corrections
Review Delta vs previous relevant review
Next Useful Checks
```

For file-based work, name files actually inspected. Also name semantic units when material; file count alone is not semantic review evidence.

## Quality

Prefer direct judgments such as `sufficient`, `partial`, `weak evidence`, `not checked`, `needs recheck`, `current enough for requested claim`. Relevant dimensions may include scope, evidence adequacy, semantic depth, dependency/integration coverage and freshness. Do not invent one synthetic quality score.

## Repeat Review

```text
prior relevant review
→ changed?
→ previously unchecked?
→ partial / weak?
→ stale through dependency?
→ new evidence / finding / dependency?
→ still useful to verify now?
```

Target these first. Already-current units may still be sampled/rechecked for high risk, weak prior evidence, changed dependencies, explicit full repetition or validation sampling.

If no meaningful new work was possible, report that rather than presenting repetition as progress.

## Boundary

Audit reports review coverage; it does not replace the semantic review being audited and does not require a permanent Review-Unit ontology or large persistence subsystem.
