# Prompt — Work Record — сохранить артефактом

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "prompt",
  "id": "work-record-artifact-explicit-20261005",
  "title": "Work Record — сохранить артефактом",
  "text": "Если для текущей работы уже явно активирован Work Record и я явно прошу сохранить его как файл/артефакт, материализуй или обнови такую representation через применимые правила размещения/персистентности. Не создавай Work Record, Session State или Shell только ради физического файла.\n\nСемантическим владельцем остаётся явно активированный Work Record; файл — только representation. Если внешнее/долговечное размещение требует отдельного разрешения или невозможно, сообщи BLOCKED/DEFERRED вместо расширения полномочий.\n\n[[module:output.file-link-filename]]",
  "createdAt": "2026-10-05T09:50:39.000Z",
  "updatedAt": "2026-10-09T00:01:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
