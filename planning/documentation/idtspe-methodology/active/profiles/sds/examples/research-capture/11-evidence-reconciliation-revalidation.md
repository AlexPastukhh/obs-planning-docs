
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
LENS-TEST-PROOF-EVIDENCE coverage review
→ CREATE/UPDATE testing/TEST-COVERAGE.md
```

Coverage maps current semantic properties to **actual** Evidence, not planned filenames.

## Revalidation

Possible directions:

```text
Evidence supports current Decisions
→ Finding Candidate
→ Core Finding Disposition
→ reaffirm only when that lifecycle consequence is selected

one test exposes wrong Domain invariant
→ Finding Candidate
→ Core Finding Disposition
→ TM-DOMAIN-DRAFT REVALIDATE/REPAIR only when selected
→ TM-TEST-DESIGN REFINE after the accepted Domain correction when needed

integration path exposes wrong Slice orchestration assumption
→ Finding Candidate
→ Core Finding Disposition
→ TM-IMPLEMENTATION-SLICE REPAIR only when selected
→ Slice Test Design REFINE after the accepted Slice correction when needed

actual Workspace change invalidates projected evolution path
→ Finding Candidate + likely TM-WEUC owner hint
→ Core Finding Disposition
→ TM-WEUC REFRESH only when that owner/lifecycle consequence is selected
```

## Methodology Direction

For the worked happy path:

```text
Current methodology path:
  COMPLETE for the selected Slice portfolio

Next:
  await new Evolution Item / implementation change / Evidence
  and let Core Finding Disposition revalidate/reopen only the narrowest affected Target when warranted
```
