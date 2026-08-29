
# Research Capture — Directed End-To-End Worked Example

Status: active worked example aligned with the current IDTSPE Shell, Target Modules, Lenses, Artifact Placement and directed methodology workflow.

## What This Example Demonstrates

This example is not only a set of correct statements. It demonstrates how **persistent files accumulate while IDTSPE is invoked repeatedly over different or already-existing Targets**.

Canonical methodology owner for ordering:

```text
active/profiles/sds/shared/directed-methodology-workflow-and-next-step-resolution.md
```

## Important Reading Rule

The numbered `00..11` files are navigation/story chapters. They are **not** the exact chronological order of every Target invocation.

The actual worked traversal below is authoritative for this example.

## Worked Artifact Tree

```text
research-capture/
├── README.md
├── SDS-PLANNING-CONTEXT.md
├── SDS-PLANNING-STATE/
│   ├── SDS-EVOLUTION-MAP.md
│   ├── SDS-WORKSPACE-EVOLUTION.md
│   └── ideas/
│
├── need/
│   └── NEED-RC-01.md
│
├── application/
│   ├── APPLICATION-DEFINITION.md
│   └── PROTOTYPE-CAPTURE-01.md
│
├── scenarios/
│   ├── SCENARIO-CATALOG.md
│   ├── SCN-RC-CAPTURE.md
│   └── SCN-RC-REVIEW.md
│
├── screens/
│   └── SCREEN-MAP.md
│
├── domain/
│   ├── DOMAIN-DISCOVERY.md
│   ├── CaptureItem.md
│   ├── CaptureItem.evolution.md
│   ├── SourceContext.md
│   └── SourceContext.evolution.md
│
├── testing/
│   ├── TEST-STRATEGY.md
│   ├── TEST-COVERAGE.md
│   ├── domain/
│   │   ├── CaptureItem.test-design.md
│   │   └── SourceContext.test-design.md
│   ├── slices/
│   │   ├── SL-RC-01.test-design.md
│   │   └── SL-RC-02.test-design.md
│   └── practical/
│       └── PT-RC-CAPTURE.md
│
└── slices/
    ├── SLICE-STRATEGY.md
    ├── SL-RC-01.md
    ├── SL-RC-01.evolution.md
    └── SL-RC-02.md
```

Files are a **Full-profile worked projection**, not a mandate that every real project uses this many files.

## Actual IDTSPE Traversal

```text
1  Need / Reality
2  real-life solution Targets
3  TM-APPLICATION-DEFINITION
4  TM-PROTOTYPE — selected uncertainty needs early Evidence
5  Scenario boundary discovery / Target Formation — focused entry, no separate semantic Target
6  TM-SCENARIO-PLANNING / SCN-RC-CAPTURE
7  TM-SCENARIO-PLANNING / SCN-RC-REVIEW
8  TM-SCREEN — spatial ownership is material
9  TM-WEUC — EARLY_INTERPRETATION of current Evolution Map
10 TM-DOMAIN-DISCOVERY
11 TM-DOMAIN-DRAFT / CaptureItem
12 TM-TEST-DESIGN / CaptureItem
13 TM-DOMAIN-DRAFT / SourceContext
14 TM-TEST-DESIGN / SourceContext
15 TM-SLICE-STRATEGY
16 TM-TEST-STRATEGY — now shared coordination is meaningful
17 TM-IMPLEMENTATION-SLICE / SL-RC-01
18 TM-TEST-DESIGN / SL-RC-01
19 TM-IMPLEMENTATION-SLICE / SL-RC-02 — first semantic pass
20 TM-TEST-DESIGN / SL-RC-02 — TDD-style early proof design
21 TM-IMPLEMENTATION-SLICE / SL-RC-02 — REFINE same owner
22 TM-PRACTICAL-TEST — plan operated capture evidence
23 authorized realization / test execution
24 TM-TEST-COVERAGE
25 selective Revalidation / Consistency Review
26 TM-WEUC REFRESH only if actual work changed the global evolution picture
```

## Why Testing Appears In Several Places

Testing is not one late phase.

```text
Domain owner
→ local Domain Test Design
  unit proof by default for complex isolated rules

all material Domain proof plans ready
+ Slice portfolio known
→ shared Test Strategy when useful

Slice owner
→ Slice Test Design
  integration proof by default for vertical orchestration
```

`SL-RC-02` demonstrates TDD interleaving:

```text
Slice semantic contract
→ Test Design
→ REFINE same Slice file
→ realization
```

## Repeated IDTSPE Invocation

The same persistent file may be seen through IDTSPE several times.

Example:

```text
slices/SL-RC-02.md

invocation A:
  CREATE semantic Slice contract

TM-TEST-DESIGN runs

invocation B:
  REFINE same SL-RC-02 Target/artifact
  using selected proof design as planning constraint
```

No second Slice identity is created.

## Methodology Direction Is Visible

Every worked chapter should make the next likely step understandable.

Example:

```text
Current:
  TM-DOMAIN-DRAFT / CaptureItem

Exit Gate:
  selected Domain meaning + Verification Meaning available

Recommended next:
  TM-TEST-DESIGN / CaptureItem

Why:
  isolated invariant/state behavior is material and can be proved before Slice planning

Then:
  continue remaining Domain owners
```
