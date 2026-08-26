# Merge Part 2 — Q/R/P Trace + Theoretical Modules + AI Reviewability Consistency Audit

Status: **PASS — historical Part-2 checkpoint; subsequent Linked Notes / Documentation-Representation changes are owned by later current audits**

## Decisions Fixed In This Pass

```text
existing IDTSPE P-09 Q/R/P
→ keep as-is
→ add optional P0..P3 impact priority
→ add related Q/R/P groups
→ add Decision.Addresses / Decision.Exposes
→ no second Concern runtime

detailed old testing knowledge
→ do not prematurely merge
→ preserve exact ca768b61 source bodies as THM-TESTING-DETAIL-CA768B61

AI Reviewability
→ independent peer concern beside IDTSPE
→ preserve Key Points review projection

IDTSPE default work mode
→ idtspe.work / `работай через idtspe`
→ scope/Target formation by default for material planning
→ AI proposals count as Ideas until selected

Workspace Work / Workspace UC
→ old WEUC/UCDS generation
→ no separate generic Core owner
→ useful path/work-cost surfaces already handled by current L5
```

## Structural Checks At This Historical Checkpoint

- SDS Target Modules: **17 / 17 PASS**
- reusable Lenses: **17 = 10 Core + 7 SDS-specific PASS**
- these Lens/AP/AG counts are intentionally the Part-2 snapshot; see `FINAL-METHODOLOGY-AUDIT.md` for current installed totals: **PASS boundary**
- Theoretical Modules are a separate methodology type and do not change Target/Lens counts: **PASS**
- current theoretical registry contains `THM-TESTING-DETAIL-CA768B61`: **PASS**
- AI Reviewability is physically beside `idtspe-core/` and `profiles/`, not nested as a Lens/Target/Profile: **PASS**
- `idtspe.work` has its own Core operating-mode owner and is distinct from `idtspe.bootstrap`: **PASS**

## Q/R/P Checks

- `P-09 Q/R/P` remains in `IDTSPE-SHELL`: **PASS**
- lightweight extension is explicitly described as an extension of P-09/P-10, not introduction of Q/R/P: **PASS**
- impact priority `P0 / P1 / P2 / P3` exists: **PASS**
- related Q/R/P grouping supports cross-type Question/Risk/Problem linkage: **PASS**
- group is navigation/review projection, not semantic owner/register: **PASS**
- Decision `Addresses` and `Exposes` trace exists: **PASS**
- no mandatory old Concern Register runtime reintroduced: **PASS**

## Theoretical Testing Preservation

The following four source bodies are byte-identical to repository snapshot base `ca768b61b2c84d6cda6c27b4ace7c4fc87d404e7`:

```text
testing-planning-principles-and-terminology.md
api-integration-test-guidance.md
e2e-testing-guidance.md
test-object-patterns.md
```

Result: **4 / 4 PASS**.

Operational boundary:

```text
TM-TEST-* / LENS-TEST-PROOF-EVIDENCE
= processed current methodology

THM-TESTING-DETAIL-CA768B61
= raw reference theory
= conditional read
= cannot silently override processed methodology
```

## Artifact Placement Regression At This Historical Checkpoint

- AP records: **38**
- AG records: **37**
- total source records: **75**
- then-current flattened registry unique IDs: **75 / 75 exact ID parity**
- no new Artifact Placement record was invented merely for Theoretical Modules/AI Reviewability: **PASS**

## Navigation / Mechanical Checks

- current non-raw methodology relative links checked: **464 / 464 resolved**
- Markdown code fences: **PASS**
- raw theoretical source bodies are intentionally excluded from new-location relative-link validation because their embedded old links are preserved as snapshot evidence: **PASS boundary**
- fresh repository integration ledger now closes MB-01/04/05/07 and leaves MB-06 Reference Object explicitly open: **PASS**

## Repository Mutation Boundary

No repository source files were modified. This pass only changes the methodology workspace and migration ledger.
