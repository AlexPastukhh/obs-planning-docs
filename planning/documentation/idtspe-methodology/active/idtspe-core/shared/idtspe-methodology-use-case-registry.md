# IDTSPE Methodology Use-Case Registry

Status: active methodology capability registry proposal

| ID | Name | Purpose | Trigger / input | Result | Boundaries | Main owner |
|---|---|---|---|---|---|---|
| `UC-IDTSPE-REVIEW-CONSISTENCY` | Review Cross-Owner Consistency | check changed/reopened owners and surface semantic/projection drift for Core Finding Disposition | owner/Decision/relation changed or consistency gate requested | findings + affected-owner / State / revalidation disposition | review is not a semantic Target; findings do not become routing/reopen authority | `consistency-review-use-case.md` |
| `UC-IDTSPE-MAINTAIN-TARGET-MODULE` | Create / Review / Integrate Target Module | establish or change one reusable Target Module and integrate it into generic IDTSPE/SDS profiles without duplicating semantic authority | recurring Target class lacks a reusable module, or existing UC/workflow/template family needs module integration/review | accepted Target Module contract + shared-contract Knowledge Basis + entry point + catalog/profile integration + validator/provenance/command-readiness handoff | does not create project semantic Target meaning; does not mechanically replace reusable UCs; no repository mutation permission | `target-module-creation-and-integration-use-case.md` |
| `UC-IDTSPE-MAINTAIN-LENS` | Create / Review / Integrate Reusable Lens | establish or change one reusable Lens/Lens Pack and integrate it into generic IDTSPE/Target Module Lens Profiles | repeated evaluation perspective, embedded reusable Lens knowledge, overlap/duplication or missing cross-cutting Lens | accepted Lens contract + shared-contract Knowledge Basis + registry/profile/projection integration | Lens ≠ Target/Decision/Validator/Guard; no project semantic authority; no automatic user questions | `lens-creation-and-integration-use-case.md` |

## Capability / Module Boundary

```text
Use Case
= capability / trigger / useful result / boundary / owner route

Target Module
= reusable methodology contract used by the capability/IDTSPE Target

Lens
= reusable evaluation perspective applied across Targets/Ideas/Branches/Decisions
```

Example future integration:

```text
UC-PLAN-SCENARIO
→ tm.scenario.draft
→ TM-SCENARIO-DRAFT
```

The command remains an optional invocation shortcut above that route.
