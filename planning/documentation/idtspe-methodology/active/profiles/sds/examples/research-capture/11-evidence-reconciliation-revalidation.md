
# Phase 11 — Evidence / Coverage / Revalidation — Research Capture

Status: active worked module-driven example

## Invocation — Test Coverage

Actual executed Evidence is now available:

```text
Domain unit runs
Slice integration runs
Practical capture run
```

```text
TM-TEST-COVERAGE
→ CREATE/UPDATE testing/TEST-COVERAGE.md
```

Coverage maps current semantic properties to **actual** Evidence, not planned filenames.

## Revalidation

Possible directions:

```text
Evidence supports current Decisions
→ reaffirm

one test exposes wrong Domain invariant
→ TM-DOMAIN-DRAFT REVALIDATE/REPAIR
→ TM-TEST-DESIGN REFINE for that Domain owner

integration path exposes wrong Slice orchestration assumption
→ TM-IMPLEMENTATION-SLICE REPAIR
→ Slice Test Design REFINE

actual Workspace change invalidates projected evolution path
→ TM-WEUC REFRESH
```

## Methodology Direction

For the worked happy path:

```text
Current methodology path:
  COMPLETE for the selected Slice portfolio

Next:
  await new Evolution Item / implementation change / Evidence
  and reopen only the narrowest affected Target
```
