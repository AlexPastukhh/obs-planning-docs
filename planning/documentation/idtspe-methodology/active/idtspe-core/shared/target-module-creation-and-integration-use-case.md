# UC-IDTSPE-MAINTAIN-TARGET-MODULE — Create / Review / Integrate Target Module

Status: active methodology Use Case proposal  
Purpose: establish or change one reusable Target Module and integrate it into generic IDTSPE without creating competing semantic authority.

---

# 1. Trigger

Use when:

```text
a recurring Target class has no reusable contract
an existing UC/workflow/template family should become IDTSPE-addressable
a Target Module is incomplete/stale/overlapping
several modules need composition/entry-point reconciliation
```

---

# 2. Inputs

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

# 3. Full IDTSPE For The Module Itself

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
  Knowledge Basis mode / knowledge-owner links
  RQ pack
  Lens Profile / reusable Lens refs / local pattern aids
  output schema
  validators
  handoffs
```

Material alternatives may use Planning Branches.

---

# 4. Algorithm

```text
1. establish recurring useful result
2. inspect existing semantic owners / reuse candidates
3. decide module boundary
4. define single Entry Point
5. map module to IDTSPE integration points
6. define Target Formation contributions
7. define Source Contract archetype
8. define Knowledge Basis mode: INLINE / REFERENCED / HYBRID
9. define embedded principles/rules and/or referenced knowledge owners + load policy
10. define RQ/question-generation pack
11. define Idea/pattern discovery aids
12. define Lens Profile: reuse Lens Library first; keep only genuinely local Lens prompts; add applicability gates
13. define Q/R/P prompts
14. define Decision surfaces
15. define semantic Output Schema
16. define supporting/submodule composition
17. define validators
18. define downstream Source handoff
19. define revalidation prompts
20. map current repository UCs/workflows/templates/commands
21. create at least one worked acceptance example
22. run module consistency/readiness review
```

---

# 5. Result

```text
one Target Module owner
+ catalog entry
+ stable Entry Point
+ integration map
+ output schema
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

# 6. Boundaries

Do not:

```text
rename every existing Use Case mechanically
create a module for every template section
turn patterns into mandatory architecture
create a new Target Module because a reusable Lens is missing — create/promote a Lens instead
confuse Target Module Knowledge Basis with current Target Sources or copy reusable Lens evaluation knowledge into it
force a one-off useful Target into a reusable module — keep a Local Target Contract until repetition justifies promotion
treat module output template as semantic authority
create one user command for every internal submodule
force supporting modules into separate Target Instances
```

---

# 7. Integration Into IDTSPE

A module may enter at different points:

```text
TF-02 Target Form candidate
TF-03 Scope aid
TF-04 Source Contract aid
Target Module Knowledge Basis via shared Knowledge Basis Contract
TF-06 Question Set
TF-06A Lens Set contribution / Lens Profile
TF-07 Idea Space
TF-08 Branch/Comparison policy
Output Projection
Validator pack
Downstream Source adapter
```

This flexibility is part of the contract.

---

# 8. Command / Tampermonkey Handoff

After module semantics are accepted and methodology-integrated:

```text
Target Module Entry Point
→ REQUIRED canonical user-level command surface
→ repository command/helper projection during repository integration
→ optional additional focused shortcuts only when independently useful
```

The repository implementation may reuse/extend an existing command rather than create a new file. The invariant is user-level reachability, not one-new-file-per-module.

Conditional modules still receive canonical commands; their gate may return “Target not justified” and route to the correct owner.

The UI should invoke useful module/target intents, not expose every internal helper/Lens. See `idtspe-command-surface-contract.md`.

---

# 9. Revalidation

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
