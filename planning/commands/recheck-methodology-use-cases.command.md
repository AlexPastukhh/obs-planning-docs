# Recheck Methodology Use-Case Registry Applicability

Status: active project command definition
Scope: one concrete OBS Planning command route. Reusable behavior remains in linked owner files.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "commandFamily": [
    "перепроверь use cases"
  ],
  "description": "Reaffirm the fundamental AI working authority boundary and refresh the current methodology Use-Case applicability composition without executing every Use Case.",
  "meaning": "Run the canonical fundamental methodology entry: reaffirm UC-IDTSPE-AI-WORKING-BOUNDARY, then inspect the Methodology Use-Case Registry Map and only plausibly applicable scoped registry rows, retain still-applicable Use Cases, add newly applicable ones and release no-longer-applicable ones. This command guarantees the methodology pass for USER invocation; it does not execute every selected Use Case and is not an internal AI command mechanism.",
  "activeContextBehavior": "This is the ambient command-composition prefix for every Planning Command. Reuse trustworthy authority/registry metadata, but do not skip either the fundamental AI working boundary or the applicability recheck itself.",
  "traversalReadMode": "Read the included command route and canonical owner files proportionally. Reuse current trustworthy owner/process context; reread only stale, uncertain or newly material owners.",
  "ownerFiles": [
    "planning/documentation/use-cases/UC-DOC-RESOLVE-CURRENT-USE-CASES.md",
    "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/ai-working-boundary/UC-IDTSPE-AI-WORKING-BOUNDARY.md",
    "planning/documentation/use-case-registry-map.md"
  ],
  "expectedOutput": "Reaffirmed fundamental AI working authority boundary plus the current selected methodology Use-Case composition and any material selection/release changes; specialized Use-Case work is not executed merely by the scan.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "The fundamental AI working boundary plus registry applicability recheck are mandatory for every Planning Command invocation.",
    "Planning Commands guarantee USER-invoked traversal; the AI does not call commands internally when following methodology.",
    "Registry recheck means compact applicability scanning, not deep execution of every Use Case.",
    "The applicability resolver may reuse current registry metadata while still reaffirming current applicability.",
    "This command does not grant mutation, commit or push permission."
  ],
  "userTarget": "<current request / work context>",
  "palette": true,
  "refinements": [],
  "id": "methodology.use_cases.recheck",
  "file": "recheck-methodology-use-cases.command.md",
  "command": "перепроверь use cases",
  "englishName": "recheck methodology Use-Case registry applicability",
  "includes": [],
  "ownerRefs": [
    {
      "responsibilityId": "DOC.USE-CASE-APPLICABILITY-RESOLUTION",
      "path": "planning/documentation/use-cases/UC-DOC-RESOLVE-CURRENT-USE-CASES.md",
      "anchor": "doc-use-case-applicability-process",
      "why": "Owns the registry-level applicability recheck that every Planning Command performs without executing every Use Case.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "IDTSPE.UC.AI-WORKING-BOUNDARY",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/use-cases/ai-working-boundary/UC-IDTSPE-AI-WORKING-BOUNDARY.md",
      "anchor": "uc-idtspe-ai-working-boundary",
      "why": "Reaffirms the mandatory AI authority/interaction boundary that accompanies every methodology Use-Case applicability pass.",
      "role": "SUPPORTING_CONTRACT",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "DOC.USE-CASE-REGISTRY-MAP",
      "path": "planning/documentation/use-case-registry-map.md",
      "anchor": "doc-use-case-registry-map",
      "why": "Routes the applicability scan to only plausibly relevant scoped registries.",
      "role": "ROUTING",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
