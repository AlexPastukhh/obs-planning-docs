# Prompt — Сессионный intake — явно

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "prompt",
  "id": "session-input-explicit-20261005",
  "title": "Сессионный intake — явно",
  "text": "Если для текущей работы уже активирован мной Session State, зафиксируй это сообщение и приложенные материалы как новый input/provenance event. Классифицируй только то, что нужно для продолжения текущего session context.\n\nНе запускай автоматически Manifest reconciliation, выбор primary subject, DIRECT/SHELL route, Work Record preparation, Question sweep или выполнение какой-либо команды только из-за intake. Если обнаружена отдельная существенная задача или неопределённость, кратко зафиксируй её как candidate/open item и остановись на границе intake, если я не попросил большего.\n\n[[module:output.file-link-filename]]",
  "createdAt": "2026-10-05T09:50:39.000Z",
  "updatedAt": "2026-10-09T00:01:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
