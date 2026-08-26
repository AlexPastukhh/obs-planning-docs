# Artifact Placement / File Proposal Integration Audit

Status: **PASS**

## Source / Registry Counts

- Target Modules: **17**
- reusable Lenses: **16**
- `AP-*` source records: **38**
- `AG-*` source records: **36**
- total unique guidance records: **74**
- registry rows: **74**

## Normalized Source Policy

Every source record now exposes:

```text
GUIDANCE                    human-readable qualifier
PERSISTENCE_GUIDANCE        REQUIRED | PREFERRED | OPTIONAL | EPHEMERAL | UNRESOLVED
PLACEMENT_DIRECTIVE         PLACE | ROUTE | ARBITRATE | ESCALATE
SEMANTIC_OWNER
REPRESENTATION              source-level proposed pattern
FILE_OR_ARTIFACT
CONTENT
RESOLVER                    P-14 / TF-10
```

The registry is field-for-field identical to the 74 source records for all placement-relevant fields.

## IDTSPE Response Contract

`P-14 / TF-10` renders an Artifact Placement View for every material IDTSPE instance, even when no file mutation is authorized.

Placement state is explicit:

```text
RESOLVED
UNRESOLVED_PERSISTENCE
UNRESOLVED_PLACEMENT
```

This distinguishes “we do not yet know whether it should survive” from “it should survive, but destination/representation is not resolved”.

## Ownership / Routing Checks

- semantic owner is resolved before a new canonical artifact can create physical placement: **PASS**
- Lens guidance cannot silently create a semantic owner: **PASS**
- registry is projection only, not authority: **PASS**
- material placement conflicts remain ordinary Answer Decisions: **PASS**
- file mutation remains separately authorized: **PASS**

## Important Target/Lens Placement Checks

- Scenario DATA + Behavior stay embedded in Scenario owner by default: **PASS**
- preliminary Screen Ideas route to global Scenario Ideas register: **PASS**
- standalone Requirement artifact is conditional on exceptional Requirement Target existence: **PASS**
- Frontend stays embedded in parent Slice by default; promoted Frontend Target gets its owner artifact: **PASS**
- `TM-WEUC` requires canonical `SDS-WORKSPACE-EVOLUTION.md`: **PASS**
- WEUC Lens routes global map-update candidates and prefers local `<owner>.evolution.md` companions when appropriate: **PASS**
- Domain/Slice evolution companions are preferred, not mandatory: **PASS**
- actual test/Evidence is referenced/preserved without becoming semantic authority: **PASS**

## Consistency Repair Performed

- retired active `Contextual WEUC Instance / WEUC Instance Register` model replaced by a compatibility pointer; historical full text moved to `sources-readonly/`: **PASS**
- deep Artifact/File Pack no longer recommends a parallel WEUC-instance register; global aggregation routes through `TM-WEUC → SDS-WORKSPACE-EVOLUTION.md`: **PASS**
- L5 naming normalized to `WEUC / Target Evolution / Architecture Fitness`: **PASS**
- non-canonical `CREATE?` action removed from the response contract: **PASS**

## Preservation / Mechanical Checks

- `baseline_module_lens_semantics_preserved`: **PASS**
- `all_relative_links_resolve`: **PASS**
- `markdown_fences_balanced`: **PASS**
- `scenario_internal_objects`: **PASS**
- `screen_map_preserved`: **PASS**
- `requirement_zero_valid`: **PASS**
- `slice_contract_preserved`: **PASS**
- `weuc_module_lens_split`: **PASS**
- `consistency_review_still_uc`: **PASS**

## Result

No remaining artifact-placement consistency issue was detected by the final physical + semantic audit.
