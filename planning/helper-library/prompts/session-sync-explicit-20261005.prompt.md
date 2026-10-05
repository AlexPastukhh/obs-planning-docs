# Prompt — Session State — синхронизация

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "prompt",
  "id": "session-sync-explicit-20261005",
  "title": "Session State — синхронизация",
  "text": "Синхронизируй уже активный мной Session State с фактическим текущим состоянием. Обнови только материальные navigation/Manifest/PRS/context/Work Record references, которые действительно изменились. Не создавай отсутствующие сущности ради полноты структуры.\n\nЕсли нужен переносимый archive, rematerialize его из фактического состояния; если архив не нужен, не создавай его. Session-State write authority не расширяет repository mutation authority. Кратко сообщи, что синхронизировано и что осталось внешней canonical reference.",
  "createdAt": "2026-10-05T09:50:39Z",
  "updatedAt": "2026-10-05T09:50:39Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
