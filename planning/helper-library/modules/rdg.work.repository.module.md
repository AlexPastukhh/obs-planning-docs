# Module — RDG — Fortis Repo и безопасная работа

Status: active Planning Helper library item
Scope: exact insertion text; not planning-command authority.

[PLANNING_HELPER_LIBRARY_ITEM]
{
  "schemaVersion": 1,
  "kind": "module",
  "id": "rdg.work.repository",
  "title": "RDG — Fortis Repo и безопасная работа",
  "text": "# Fortis Repo + HOST Tunnel — workflow\n\nДля чтения и изменения файлов пользуйся подключённым Fortis Repo (MCP в Linux Docker). Сначала проверь доступные каталоги и существование файла; не угадывай Windows↔Docker mapping. Типичные разрешённые пути могут включать /workspace/repos, /workspace/files (Windows bind mount), /workspace/repo (внутренний Docker volume), но всё проверяй в текущем запуске. Просмотри актуальные README.md и AGENTS.md, если они есть; для Git-репозитория перед изменением проверь git status/diff. Не предполагай, что каждый каталог — Git-репозиторий.\nHOST Tunnel — отдельная привилегированная возможность Windows-хоста, обращайся к ней только при необходимости, явном доступе и соответствующих разрешениях; не создавай туннели и не автоматизируй GUI без запроса. Для прямой передачи HOST↔ChatGPT действует лимит 1 000 000 байт на логический набор/файл без отдельного разрешения.\nИзменяй только согласованную рабочую область и связанные файлы; не делай деструктивных Git-операций, автоматических commits, push, публикации или копирования целых деревьев без запроса. При внешних изменениях не перезаписывай устаревшее состояние. Проверяй реальный результат изменения (read-back, schema validation, полезные тесты).\nСообщай конкретно, что прочитано через Repo/Host и что реально сохранено/проверено, не смешивая «предложено», «изменено в Repo», «проверено», «опубликовано». Установка промптов в локальный Planning Helper, изменение graph.json и публикация GitHub — три разных действия.\n",
  "createdAt": "2026-10-12T16:30:00.000Z",
  "updatedAt": "2026-10-12T16:30:00.000Z"
}
[/PLANNING_HELPER_LIBRARY_ITEM]
