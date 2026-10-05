# Read Relevant Methodology Examples

Status: active project command definition

[PLANNING_COMMAND_DEFINITION]
{
  "schemaVersion": 1,
  "id": "documentation.examples.read",
  "file": "read-methodology-examples.command.md",
  "command": "прочитай примеры методологии",
  "englishName": "read relevant methodology examples",
  "commandFamily": [
    "прочитай примеры методологии",
    "посмотри примеры методологии",
    "read methodology examples"
  ],
  "description": "Read relevant examples linked by the selected methodology owner.",
  "meaning": "Follow DOC.EXAMPLE-READING for the selected current methodology owner: inspect inline/linked examples, confirm their basis and status, and explain the material mapping or mismatch to the current task. Examples remain explanatory; current contracts and task Sources retain authority.",
  "activeContextBehavior": "Reuse the current selected Use Case/Target Module/Lens/Unit and bounded request. Do not form a Target, execute an example or generate new examples merely to satisfy reading. If no owner is known, resolve it from current context; no applicable example is a valid explicit result.",
  "traversalReadMode": "Read the current owner contract and its materially relevant inline/linked examples. Reuse trustworthy current reading with provenance; reread changed/uncertain examples. Do not scan the entire example library.",
  "ownerFiles": [
    "planning/documentation/principles-and-terminology.md"
  ],
  "expectedOutput": "Relevant example references and basis/status, concise mapping to the current result/Units, material adaptation or stale-example Finding when present, or an explicit no-applicable-example result.",
  "permissionMode": "read-only",
  "keyReminders": [
    "Read examples as explanation, not semantic authority or execution instructions.",
    "Keep copied project examples separate from live application truth.",
    "No Target formation, example generation, mutation, tests, commit or push is authorized."
  ],
  "userTarget": "<selected methodology owner / current result>",
  "palette": true,
  "refinements": [],
  "includes": [
    "planning/commands/recheck-methodology-use-cases.command.md"
  ],
  "ownerRefs": [
    {
      "responsibilityId": "DOC.EXAMPLE-READING",
      "path": "planning/documentation/principles-and-terminology.md",
      "anchor": "doc-example-reading",
      "why": "Owns bounded example reading, relevance/basis checks and the non-authoritative example boundary.",
      "role": "PRIMARY_OWNER",
      "readMode": "REQUIRED"
    }
  ]
}
[/PLANNING_COMMAND_DEFINITION]
