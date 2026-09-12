# UC-IDTSPE-MAINTAIN-TARGET-MODULE — Create / Review / Integrate Target Module

Status: active methodology Use Case proposal  
Purpose: establish or change one reusable Target Module and integrate it into generic IDTSPE without creating competing semantic authority.

---

## Situation

Use when:

```text
a recurring Target class has no reusable contract
an existing UC/workflow/template family should become IDTSPE-addressable
a Target Module is incomplete/stale/overlapping
several modules need composition/entry-point reconciliation
```

---

## Inputs

Read proportionally:

```text
existing Use Cases
workflows
principles/models
templates
examples
commands
current IDTSPE models
actual repeated planning cases
consistency findings
```

Do not create a new module solely because a file/category exists.

---

## Full IDTSPE For The Module Itself

Creating a module is itself ordinary IDTSPE planning.

```text
Target:
  reusable Target Module contract

Target-Scope Decision:
  what recurring planning responsibility the module owns

Question-Set Decision:
  what must be resolved to make the module reusable/safe

Answer Decisions:
  entry point
  integration roles
  Source Contract
  Target Step Result family
  Result Units / important fields
  Resolution / Production Method
  Knowledge Basis / theory-reference links when useful
  RQ pack
  Lens Profile / reusable Lens refs / local pattern aids
  output/projection schema when useful
  validators
  handoffs
```

Material alternatives may use Planning Branches.

---

## Process

```text
1. establish the recurring useful Target Step Result
2. inspect existing semantic owners / reuse candidates
3. decide module boundary
4. define single Entry Point
5. define Result Units only where independent processing/addressability is useful
6. define explicit Opening / Closing Unit Checkpoint placement for every material Result Unit, inheriting the generic Unit Applicability Envelope; keep In-Unit Applicability Checks available whenever material
7. explain each important/non-obvious Unit and its fields
8. define the reusable Resolution / Production Method
9. map the module to current IDTSPE integration points
10. define Target Formation contributions
11. define Source Contract archetype
12. identify reusable theory/reference knowledge that materially supports this Target family, when any
13. keep useful references/provenance and add consumer-specific interpretation when raw theory is too broad
14. define RQ/question-generation pack
15. define Proposal/pattern discovery aids
16. define Lens Profile: reuse Lens Library first; keep only genuinely local Lens prompts; add applicability gates
17. define recurring Q/R/P discovery hints only when target-specific
18. define Decision surfaces
19. define semantic output/projection schema when useful
20. define Internal Object Contracts / supporting module composition
21. for every proposed Supporting Target Module, prove it can also be a coherent standalone recurring Target family; otherwise use a Result Unit / Internal Object Contract / shared Result-Unit method
22. define validators against Result Units/boundaries
23. define downstream Unit/output → Source handoff
24. define revalidation prompts
25. define representation guidance / current Artifact contract
26. map current repository UCs/workflows/templates/commands
27. create at least one worked acceptance example showing Result + State Units
28. run module consistency/readiness review
```

---

## Result

```text
one Target Module owner
+ catalog entry
+ stable Entry Point
+ integration map
+ Target Step-Result Contract / Result Units
+ explicit per-Unit Opening / Closing Applicability Checkpoints
+ Resolution / Production Method
+ output schema/projection when useful
+ validators
+ provenance mapping
+ command/Tampermonkey readiness route
```

If reuse already covers the need:

```text
no new module
→ integrate/reuse existing one
```

---

## Boundaries

Do not:

```text
rename every existing Use Case mechanically
create a module for every template section
turn patterns into mandatory architecture
create a new Target Module because a reusable Lens is missing — create/promote a Lens instead
confuse reusable theory/Knowledge Basis with current Target Sources or copy reusable Lens evaluation knowledge into the module
force a one-off useful Target into a reusable module — keep a Local Target Contract until repetition justifies promotion
treat module output template as semantic authority
create one user command for every internal submodule
force supporting modules into separate Target Instances
```

---

## Integration Into IDTSPE

A module may enter at different points:

```text
TF-02 Target Form candidate
TF-03 Scope aid
TF-04 Source Contract aid
Target Module Knowledge Basis via shared Knowledge Basis Contract
TF-06 Question Set
TF-06A Lens Set contribution / Lens Profile
TF-07 Proposal Space
TF-08 Branch/Comparison policy
Output Projection
Validator pack
Downstream Source adapter
```

This flexibility is part of the contract.

---

## Command / Tampermonkey Handoff

After module semantics are accepted and methodology-integrated:

```text
Target Module Entry Point
→ REQUIRED canonical user-level command surface
→ repository command/helper projection during repository integration
→ optional additional focused shortcuts only when independently useful
```

The repository implementation may reuse/extend an existing command rather than create a new file. The invariant is user-level reachability, not one-new-file-per-module.

Conditional modules still receive canonical commands; their gate may surface “Target not justified” as Target Formation input. Target Formation then resolves reuse/handoff to an existing owner or the appropriate methodology next step rather than letting the command route a semantic owner itself.

The UI should invoke useful module/target intents, not expose every internal helper/Lens. See `idtspe-command-surface-contract.md`.

---

## Revalidation

Revisit a Target Module when:

```text
real planning repeatedly needs questions/sources not represented
module output fails to hand off cleanly
modules overlap semantic responsibility
new generic IDTSPE mechanisms supersede module-local mechanisms
current repo workflow/template diverges from module contract
commands route around the semantic entry point
```

## Artifact Placement Integration

Creation/maintenance must add/update structured `ARTIFACT_PROPOSAL` records in the Target Module source. If the installed profile maintains an Artifact Materialization tree/projection, refresh that profile projection (for current SDS: `active/profiles/sds/ARTIFACT-PLACEMENT-MAP.md`). The projection must cite/group source record IDs rather than invent placement rules; IDTSPE Core does not hard-code one universal profile registry path.
