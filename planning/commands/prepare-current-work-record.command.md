# Prepare Current Work Record

Status: active focused Core current-work command; it exposes the WR-5 preparation before the contextual Question sweep.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "session.current_work.prepare",
  "file": "prepare-current-work-record.command.md",
  "command": "подготовь Work Record текущей задачи",
  "englishName": "prepare current work record",
  "commandFamily": [
    "подготовь Work Record текущей задачи",
    "prepare current work record"
  ],
  "description": "Prepare the selected subject's route, owner/component reads and observable Work Record coverage before Question sweep.",
  "meaning": "After S0, WR-2 triage, WR-3 subject and WR-4 route, prepare the same Work Record under Work Record Principles. For SHELL, reuse Compose Current Work and Port Composition Refresh; for DIRECT use the relevant direct owner and treat Shell-only requirements as not applicable. Read the selected Core/profile registries and necessary Lens/Target Module/owner bodies, record actual reads, applicability and basis, and expose material Question candidates. Do not execute the selected subject, apply a Lens merely because it was read, or close the record. The contextual Question sweep and final preparation audit/checkpoint follow this action.",
  "activeContextBehavior": "When included, perform only preparation before the caller's Question sweep. When invoked directly, the fundamental current-work Use Case still performs the subsequent sweep/audit/archive checkpoint for this same open subject. On a request to revisit preparation, reuse compatible coverage and recheck only the affected basis; never allocate a new S0 for the same subject.",
  "traversalReadMode": "Read current scoped Use-Case/Target Module/Lens registry summaries, then only selected component bodies and material owners. Record exact read/reuse/omission evidence. Do not scan all component bodies or infer a Target merely to prepare.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md",
    "planning/session/session-state-runtime-contract.md",
    "planning/documentation/idtspe-methodology/active/profiles/PROFILE-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-REGISTRY.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-REGISTRY.md"
  ],
  "expectedOutput": "The open Work Record records the selected subject/route, current SHELL Port Requirement Set when applicable, selected/read owners/components with basis and outstanding preparation/Question candidates; no task action or WR-7 closure occurs.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "S0 exists before Manifest triage; this command prepares the already-selected WR-3 subject.",
    "SHELL-only composition is conditional; DIRECT does not create a Shell pass.",
    "Registry scan, component selection/read and Lens application are different facts.",
    "Question sweep follows material reads and may send affected preparation back for recheck.",
    "The preparation archive/continuation pause is owned by Work Runtime, not by the include edge alone."
  ],
  "userTarget": "<current bounded WR-3 subject, including Manifest work>",
  "palette": true,
  "refinements": [],
  "methodologyBinding": {
    "methodologyRuntime": "IDTSPE",
    "profile": null,
    "surfaceKind": "ORCHESTRATION",
    "targetModuleId": null,
    "lensId": null,
    "parentSurface": null,
    "hostTargetPolicy": "NONE"
  },
  "includes": [
    "planning/commands/recheck-idtspe-port-composition.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "IDTSPE.WORK-RUNTIME",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/WORK-RECORD-PRINCIPLES.md",
      "anchor": "work-record-preparation",
      "why": "Owns selected-subject preparation, actual coverage, recheck and the default pause before execution.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.PORT-COMPOSITION-REFRESH",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/runtime/IDTSPE-RUNTIME-COMPOSITION-CONTRACT.md",
      "anchor": "idtspe-port-composition-refresh",
      "why": "Owns the conditional SHELL Port Requirement Set refresh before component reads and later execution.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    },
    {
      "responsibilityId": "SESSION.STATE-RUNTIME",
      "path": "planning/session/session-state-runtime-contract.md",
      "anchor": "session-state-runtime",
      "why": "Carries the prepared open record through archive checkpoints and re-entry.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.PROFILE-DISCOVERY",
      "path": "planning/documentation/idtspe-methodology/active/profiles/PROFILE-REGISTRY.md",
      "anchor": "idtspe-profile-discovery",
      "why": "Select only profiles relevant to the current subject before profile-local registry reads.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    },
    {
      "responsibilityId": "TARGET-MODULE.DISCOVERY",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-REGISTRY.md",
      "anchor": "target-module-discovery-registry",
      "why": "Route plausible reusable Target Module Models when Target Formation or explicit selection is material.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    },
    {
      "responsibilityId": "LENS.DISCOVERY",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/lenses/LENS-REGISTRY.md",
      "anchor": "lens-discovery-registry",
      "why": "Route current Lens candidates and selected operations without treating a registry scan as application.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "ON_DEMAND"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
