# Create Proposal Workspace Archive

Status: active project command definition
Scope: one portable proposal-workspace materialization route. It packages the current bounded planning workspace without redefining Proposal, Q/R/P, Decision, Carry-Forward or PRS semantics.

Canonical semantic result: [Planning Resolution State](../documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PLANNING-RESOLUTION-STATE.md#tm-planning-resolution-state). Physical archive representation: [Artifact Placement / Proposal Workspace Archive](../documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md#representation-proposal-workspace-archive).

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "proposal_archive.create",
  "file": "build-proposal-archive.command.md",
  "command": "создай архив пропозалов",
  "englishName": "create proposal workspace archive",
  "commandFamily": [
    "создай архив пропозалов",
    "создай архив с пропозалами",
    "дай архив proposal",
    "дай архив пропозал",
    "собери proposal archive",
    "proposal archive",
    "давай пропозал архив",
    "сделай пропозал архив",
    "собери пропозал архив"
  ],
  "description": "materialize one portable PRS-centered proposal workspace archive",
  "meaning": "Materialize the current bounded proposal workspace into one portable archive. Reuse the current Planning Resolution State as the archive's planning/resume surface. If no PRS is currently formed, resolve that absence through the existing Carry-Forward qualification and TM-PLANNING-RESOLUTION-STATE owner: form/reuse a PRS only when the canonical owners say the bounded surviving state needs one; otherwise do not invent an empty PRS or second archive register. Include only the addressable Proposal/workspace artifacts needed by the resulting PRS and selected scope. Proposal, Q/R/P, Decision and carry-forward membership/status remain owned by their existing semantic owners; this command never reclassifies them. Archive paths, persistence and packaging are representation only and never imply acceptance. A Proposal Workspace Archive is not a Replacement Package and MUST NOT use PACKAGE.json, base-files/, replacement-files/ or OBS-ACTION apply protocol structure.",
  "activeContextBehavior": "Use the current bounded workspace/PRS and checked source basis. When no PRS exists, first follow RESOLUTION.CARRY-FORWARD qualification and TM-PLANNING-RESOLUTION-STATE formation/reuse instead of fabricating archive-local planning state; materialize only after a canonical PRS exists for the bounded workspace. If an existing Proposal Workspace Archive is the selected source, read its PRS entry point and continue ordinary methodology work from the current semantic state; no separate 'continue archive' command is required. Invoke this command only when a portable archive artifact must be created or rematerialized. When the underlying proposal concerns documentation change, route that semantic work through [UC-DOC-PLAN-DOCUMENTATION-CHANGE](../documentation/use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md); archive creation itself creates no new Use Case or lifecycle.",
  "traversalReadMode": "Read the current PRS plus only the proposal/workspace artifacts and representation context required by the selected archive scope.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PLANNING-RESOLUTION-STATE.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md",
    "planning/documentation/use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md"
  ],
  "expectedOutput": "One portable Proposal Workspace Archive with an obvious PRS planning/resume entry point, addressable Proposal/workspace artifacts required by the current PRS/scope, and representation-only archive basis/navigation. No duplicated Proposal/Q/R/P/Decision lifecycle, no semantic acceptance inferred from file paths, and no Replacement Package payload.",
  "permissionMode": "artifact-no-commit-push",
  "keyReminders": [
    "PRS is the planning/resume surface; do not invent a second archive planning register.",
    "If no PRS exists, use Carry-Forward qualification and the PRS Target Module to decide formation/reuse before materialization; never create an empty PRS merely to satisfy archive layout.",
    "Read Proposal/Q/R/P/Decision status and retention from their existing semantic owners through PRS; do not restate or replace those rules here.",
    "Archive layout/persistence is representation only; a proposal file or final-shaped path does not become accepted authority by being present.",
    "When an archive is already the selected source, ordinary methodology work resumes from PRS without a special continuation command.",
    "This command creates/rematerializes a Proposal Workspace Archive, not a Replacement Package.",
    "Never include PACKAGE.json or replacement-package base-files/replacement-files protocol structure.",
    "Do not apply locally, commit or push."
  ],
  "userTarget": "<current PRS / proposal-workspace scope to materialize>",
  "palette": true,
  "refinements": [],
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "RESOLUTION.CARRY-FORWARD",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/resolution/RESOLUTION-CARRY-FORWARD-CONTRACT.md",
      "anchor": "resolution-carry-forward-qualification",
      "why": "Owns whether surviving bounded resolution state qualifies for continuation and whether a PRS should be formed/reused before archive materialization.",
      "role": "VALIDATION_HANDOFF",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "TARGET-MODULE.PLANNING-RESOLUTION-STATE",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TM-PLANNING-RESOLUTION-STATE.md",
      "anchor": "tm-planning-resolution-state",
      "why": "Owns the bounded PRS result used as the proposal workspace planning/resume surface; archive materialization must consume rather than redefine it.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "REPRESENTATION.ARTIFACT-PLACEMENT",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/representation/ARTIFACT-PLACEMENT-AND-IDTSPE-RESPONSE-CONTRACT.md",
      "anchor": "representation-proposal-workspace-archive",
      "why": "Owns the physical Proposal Workspace Archive representation boundary, navigation and non-authority rules.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "UC-DOC-PLAN-DOCUMENTATION-CHANGE",
      "path": "planning/documentation/use-cases/UC-DOC-PLAN-DOCUMENTATION-CHANGE.md",
      "anchor": "uc-doc-plan-documentation-change-plan-repository-documentation-change",
      "why": "Conditional semantic route when the proposal workspace concerns a documentation change; archive creation itself is not documentation-change authority.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
