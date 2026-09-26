<a id="idtspe-methodology-integrity-test-maintenance-process"></a>
# Methodology Integrity Test Maintenance Process

Responsibility ID: `IDTSPE.METHODOLOGY-INTEGRITY-TEST-MAINTENANCE`

Status: active reusable Core Process

## Purpose

Create, review or revise methodology hard-integrity tests so they catch accidental partial changes while remaining derived from canonical authority and tolerant of legitimate methodology evolution.

Canonical testing rules: [`Methodology Integrity Testing Contract`](../knowledge-bases/testing/METHODOLOGY-INTEGRITY-TESTING-CONTRACT.md#testing-methodology-integrity) — `TESTING.METHODOLOGY-INTEGRITY`.

## Process

1. Identify the exact methodology relation/projection/consumer being protected.
2. Resolve the canonical semantic authority before reading the current test as an oracle.
3. Classify the requested proof:
   - hard integrity;
   - exact projection parity;
   - behavioral proof;
   - softer architecture/review lint.
4. For a hard guard, prove that expected state can be derived from an existing structured declaration. If not, keep the concern in review/Lens space rather than inventing authority in the test.
5. Identify the smallest reusable reference mechanics needed: path, exact case, anchor, owner identity, duplicate detection.
6. Keep relation-specific semantics separate: dependency, attachment, command ownerRef, bootstrap read, generated catalog, or another explicitly typed relation.
7. Define the strongest minimal assertion that catches the material inconsistency without freezing unrelated inventory/counts/wording.
8. State the **delegated / not-proved-here boundary** when another layer/owner proves a related property.
9. Evaluate Escape Risk: construct at least one material broken-state control that must fail when feasible.
10. Evaluate Refactor Risk: construct at least one legitimate semantic-preserving change that must continue to pass when feasible.
11. If a shared parser/resolver is introduced or changed, test that parser/resolver directly before using it as a projection oracle.
12. Give hard failures an actionable invariant code, source and repair guidance. Include the repository comment reminding maintainers not to weaken/update the test merely to make it pass.
13. Realize literal test/helper changes through the applicable Exact Realization owner. Under active SDS codebase work this normally means `TM-CODE-REALIZATION`; generic non-code exact changes may use `TM-EXACT-REALIZATION`.
14. Run focused positive/negative controls plus affected map/catalog/build checks.
15. Run the broader repository verification appropriate to the changed surface.
16. If a failure reveals a real semantic/projection inconsistency rather than a test defect, route it through normal Finding/revalidation ownership rather than silently rewriting another owner.

## Result

```text
canonical authority identified
+ hard-vs-lint boundary resolved
+ minimal derived integrity invariant
+ explicit not-proved-here boundary when material
+ focused parser/resolver proof when shared mechanics changed
+ positive + negative controls proportional to risk
+ actionable failure diagnostics/comments
+ exact test/helper realization route
+ current verification Evidence
```

## Guards

```text
maintenance Process ≠ semantic owner of the protected rule
current test implementation ≠ oracle for canonical methodology meaning
projection/map ≠ authority for its source declaration
shared resolver ≠ shared untyped semantic graph
failure ≠ instruction to edit expected values
```
