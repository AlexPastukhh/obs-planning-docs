# Maintain Project Methodology Baseline

Status: active project command definition
Scope: one concrete Documentation capability route for establishing or explicitly advancing a project's stable methodology baseline.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "documentation.methodology-baseline.maintain",
  "file": "maintain-project-methodology-baseline.command.md",
  "command": "зафиксируй baseline методологии проекта",
  "englishName": "maintain project methodology baseline",
  "commandFamily": [
    "зафиксируй baseline методологии проекта",
    "зафиксируй базлайн методологии проекта",
    "обнови baseline методологии проекта",
    "обнови базлайн методологии проекта",
    "продвинь baseline методологии проекта",
    "продвинь базлайн методологии проекта",
    "establish project methodology baseline",
    "advance project methodology baseline",
    "maintain project methodology baseline"
  ],
  "description": "Establish or explicitly advance one project's stable methodology baseline and visible planning provenance.",
  "meaning": "Invoke UC-DOC-ESTABLISH-PROJECT-METHODOLOGY-BASELINE as one capability. When no baseline exists, run ESTABLISH: bind an exact methodology commit to one project-specific baseline branch and maintain the project's visible Planning / Methodology Basis plus stable methodology-owner links. When a baseline already exists, do not move it unless the USER explicitly requested update/advance; an explicit update runs the same Use Case's ADVANCE operation only after affected project planning/documentation has been reviewed/revalidated against the exact target methodology commit. Starting commit remains provenance; current baseline commit changes only after successful advance.",
  "activeContextBehavior": "Use the selected project repository/workspace and current methodology repository basis. If the project already has a baseline and the request is only to fix/establish/reaffirm it, preserve the branch target and repair only stale/missing provenance/navigation for that current basis. Treat phrases such as 'обнови/продвинь baseline' as explicit ADVANCE intent. Never infer advance merely from a newer methodology main. Repository branch mutation and project-file mutation must be actually available/authorized; otherwise return BLOCKED/DEFERRED without fabricating success.",
  "traversalReadMode": "Read the baseline Use Case, the project methodology-basis block/current planning entry point, current direct methodology-owner links, and exact methodology branch/commit facts. For ADVANCE, inspect only the methodology delta and project artifacts materially affected by the candidate target revision.",
  "ownerFiles": [
    "planning/documentation/use-cases/UC-DOC-ESTABLISH-PROJECT-METHODOLOGY-BASELINE.md",
    "planning/documentation/principles-and-terminology.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "DOC.PROJECT-METHODOLOGY-BASELINE",
      "path": "planning/documentation/use-cases/UC-DOC-ESTABLISH-PROJECT-METHODOLOGY-BASELINE.md",
      "anchor": "uc-doc-establish-project-methodology-baseline",
      "why": "Owns the single project methodology-baseline capability, including ESTABLISH, explicit ADVANCE, review/revalidation and visible project provenance.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "DOC.METHODOLOGY-CONTEXTUAL-ANNOTATION",
      "path": "planning/documentation/principles-and-terminology.md",
      "anchor": "doc-project-methodology-baseline",
      "why": "Owns the stable separate-project methodology-link and baseline provenance rule that this operation realizes.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    }
  ],
  "expectedOutput": "For ESTABLISH: one confirmed project-specific methodology baseline branch at the exact selected commit, with starting/current commit provenance, prominent Planning / Methodology Basis and affected methodology-owner links using the stable branch. For explicit ADVANCE: reviewed/revalidated project planning, the same baseline branch advanced to the exact approved commit, unchanged starting commit and updated current baseline commit. If required repository/project mutation is unavailable or review remains unresolved, explicit BLOCKED/DEFERRED state rather than false success.",
  "permissionMode": "bounded-repository-write-no-commit-push",
  "keyReminders": [
    "This is one Use Case with ESTABLISH and explicit ADVANCE operations; do not split baseline advance into a second Use Case.",
    "A newer methodology main never auto-advances the project baseline.",
    "Review/revalidate affected project planning against the exact candidate commit before moving an established baseline branch.",
    "Keep Starting commit unchanged during ordinary advance; update Current baseline commit only after successful advance.",
    "Do not point project documentation at an unconfirmed/nonexistent baseline branch.",
    "Branch/ref writes and selected project planning-document writes are bounded to this operation; do not commit or push."
  ],
  "userTarget": "<project repository/workspace and optional explicit target methodology revision>",
  "palette": true,
  "refinements": [],
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md"
  ]
}
[/PLANNING_COMMAND_DEFINITION]
