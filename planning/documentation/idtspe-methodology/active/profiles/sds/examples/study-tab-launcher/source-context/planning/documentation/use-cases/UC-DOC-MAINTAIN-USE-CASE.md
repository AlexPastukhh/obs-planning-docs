# UC-DOC-MAINTAIN-USE-CASE — Establish / Change Repository Use Case

## Situation

A recurring repository/documentation capability appears to be missing, duplicated, incorrectly bounded, split across several owners, or no longer independently useful.

## Result

The capability is represented by the smallest correct current Use-Case set, every surviving Use Case has `Situation`, `Result`, and `Process`, and the applicable Use-Case Registry points to the canonical owner of each Use Case.

## Process

1. Read the applicable Use-Case Registry and inspect neighboring Use Cases before creating a new one.
2. Identify the independently useful Result.
3. If the need is only a file lookup, obvious placement, supporting Process step, template, example, or implementation detail, keep it under an existing Use Case instead of creating a new Use Case.
4. Reuse an existing Use Case when the Result is the same. Change or extend its Process when only realization changes.
5. Create a new Use Case when the Result is independently meaningful and can be requested/reused as its own capability.
6. Split or merge Use Cases when that produces clearer independently useful results and boundaries.
7. Use one file per Use Case by default.
8. Write only the fixed core first:
   - `Situation`
   - `Result`
   - `Process`
9. Add extra sections only when the concrete Use Case needs them.
10. Keep Process inline by default. Use [`UC-DOC-MAINTAIN-PROCESS`](UC-DOC-MAINTAIN-PROCESS.md) when an extracted reusable Process becomes justified.
11. Add Principles & Terminology, Template, or Example owners only when the Use Case actually needs them.
12. Update the applicable Use-Case Registry.
13. Update README only when structural responsibilities changed.
14. Mark superseded Use Cases/owners legacy before removal when migration/provenance still matters.

Template: [`../templates/USE-CASE-TEMPLATE.md`](../templates/USE-CASE-TEMPLATE.md)

Shared meaning: [`../principles-and-terminology.md`](../principles-and-terminology.md)
