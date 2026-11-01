# Module — Fortis Observatory — краткое напоминание

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "module",
  "id": "fortis.observatory-telemetry",
  "title": "Fortis Observatory — краткое напоминание",
  "text": "При каждом запросе с [Fortis task context] реально отправляй события и полный ответ AI в Observatory через Fortis Repo.\n\nИспользуй только task_id, reporting_session_id и conversation_id из ТЕКУЩЕГО сообщения Notifier; не бери ID из старых сообщений.\n\nДля событий используй repo_task.py event: user_message, содержательные progress и completed/failed по факту. Для полного ответа — repo_task.py message --kind final (текст через UTF-8 STDIN). Готовые команды и точные параметры есть в [Fortis task context].\n\nНе цитируй сообщения и не передавай ключи в event summary. Оригинал пользователя отдельно сохраняет Notifier. STAGED_ONLY — очередь, не подтверждение приёма: проверяй историю/receipt. Если Repo недоступен, не заявляй об отправке.",
  "createdAt": "2026-10-19T00:00:00.000Z",
  "updatedAt": "2026-10-19T16:12:39.998Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
