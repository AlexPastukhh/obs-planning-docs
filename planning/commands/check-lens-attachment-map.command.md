# check lens attachment map

Status: active project command definition; semantic behavior remains in linked owners.

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "sds.lens_attachment_map.check",
  "file": "check-lens-attachment-map.command.md",
  "command": "составь карту атачментов линз",
  "englishName": "build lens attachment audit map",
  "commandFamily": [
    "составь карту атачментов линз",
    "покажи атачменты линз",
    "проверь карту атачментов линз",
    "build lens attachment audit map"
  ],
  "description": "Build a temporary Unit-to-Lens attachment audit map from current declarations",
  "meaning": "Read current Core and SDS Target Module Unit Lens Attachments and relevant Lens registries; produce an on-demand audit table in the answer. No maintained map file exists.",
  "activeContextBehavior": "Use the current repository or an explicitly supplied snapshot and state its identity and scope. Read concrete Unit declarations, resolve Lens links, and report findings with source links. This is a read-only audit, not a Target or file update.",
  "traversalReadMode": "Read current Core/SDS Target Module registries and selected concrete Target Module Unit Lens Attachments; use Lens registries and concrete Lens owners to interpret identities and triggers. Do not read a stored attachment map.",
  "ownerFiles": [
    "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-MODEL.md",
    "planning/documentation/idtspe-methodology/active/profiles/sds/registries/LENS-REGISTRY.md"
  ],
  "expectedOutput": "Temporary table grouped by Target Module and Unit: Unit source link, Lens ID/link, REQUIRED checkpoint phases or TRIGGERED strength, and any broken/ambiguous declaration. State basis, coverage and unreadable sources. Do not claim completeness for unread files. Nothing is saved unless separately requested.",
  "permissionMode": "read-only-planning",
  "keyReminders": [
    "Unit Lens Attachments are the source; this command creates only a temporary audit view.",
    "For a full-scope request, enumerate every active Core/SDS Target Module from registries, account for every Unit Lens Attachments block, then recheck each output row against its source link before answering.",
    "Keep REQUIRED and TRIGGERED distinct and do not turn registry discovery into an attachment.",
    "Include source links for every row and identify unreadable or ambiguous sources.",
    "No repair, file mutation, commit or push is authorized by this read-only command."
  ],
  "userTarget": "<current repository/snapshot or bounded Target Module, Unit or Lens scope>",
  "palette": true,
  "refinements": [],
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "TARGET-MODULE.META-MODEL",
      "path": "planning/documentation/idtspe-methodology/active/idtspe-core/target-modules/TARGET-MODULE-MODEL.md",
      "anchor": "target-module-meta-model",
      "why": "Defines Unit-local and rare Target-wide Lens Attachments.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    },
    {
      "responsibilityId": "SDS.LENS-DISCOVERY",
      "path": "planning/documentation/idtspe-methodology/active/profiles/sds/registries/LENS-REGISTRY.md",
      "anchor": "sds-lens-discovery",
      "why": "Routes SDS Lens identity and applicability checks.",
      "role": "REGISTRY",
      "readMode": "ON_DEMAND"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
